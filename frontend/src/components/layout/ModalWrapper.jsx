import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

const ModalWrapper = ({ open, onClose, title, children, actions }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      sx={{
        "& .MuiBackdrop-root": {
          backdropFilter: "blur(6px)", // blur effect
          backgroundColor: "rgba(0,0,0,0.4)",
        },
      }}
    >
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent dividers>{children}</DialogContent>
      <DialogActions>
        {actions || <Button onClick={onClose}>Close</Button>}
      </DialogActions>
    </Dialog>
  );
};

export default ModalWrapper;
