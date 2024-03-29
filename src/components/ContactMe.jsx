import React, { useState } from "react";
import {
  TextField,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Button
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton"
import emailjs from "@emailjs/browser";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import { contactFormSkeleton } from "../utils/utils";

const ContactMe = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [contactForm, setContactForm] = useState(contactFormSkeleton);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false)

  const serviceID = process.env.REACT_APP_SERVICE_ID;
  const templateID = process.env.REACT_APP_TEMPLATE_ID;
  const publicKey = process.env.REACT_APP_PUBLIC_KEY;

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setContactForm(contactFormSkeleton);
  };

  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setContactForm({ ...contactForm, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      emailjs
        .send(serviceID, templateID, contactForm, publicKey)
        .then((res) => {
          setIsOpen(false);
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
            setLoading(false)
          }, "3000");
        });
    } catch (e) {
      setIsOpen(false);
      setError(true);
      setTimeout(() => {
        setError(false);
        setLoading(false)
      }, "3000");
    }
  };

  return (
    <div>
      <Button sx={{ fontSize: 'x-large' }} onClick={handleClick}>
        {" "}
        Contact me via Email{" "}
      </Button>
      <Dialog open={success}>
        <DialogTitle>Thank you!</DialogTitle>
        <DialogContent>I'll reply to you as soon as possible!</DialogContent>
      </Dialog>
      <Dialog open={error}>
        <DialogTitle>Woops!</DialogTitle>
        <DialogContent>Something went wrong!</DialogContent>
      </Dialog>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        fullWidth
        sx={{ padding: "20px" }}
      >
        <form onSubmit={handleSubmit}>
          <DialogContent
            sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <TextField
              fullWidth
              required
              name="user_email"
              value={contactForm.user_email}
              variant="filled"
              label="Your Email"
              onChange={handleChange}
            />
            <TextField
              name="user_name"
              required
              value={contactForm.user_name}
              variant="filled"
              label="Your Name"
              onChange={handleChange}
            />
            <TextField
              required
              name="user_message"
              value={contactForm.user_message}
              multiline
              minRows={5}
              onChange={handleChange}
              label="Write your message.."
            />
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center" }}>
            <LoadingButton loading={loading} size="large" startIcon={<SendIcon />} type="submit" loadingPosition="start">
              Send email
            </LoadingButton>
            <Button
              size="large"
              startIcon={<CloseIcon />}
              name="close"
              onClick={handleClose}
            >
              close
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default ContactMe;
