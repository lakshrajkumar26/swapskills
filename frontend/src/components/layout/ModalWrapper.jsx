import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ModalWrapper = ({ open, onClose, title, children, actions }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      sx={{
        "& .MuiPaper-root": {
          borderRadius: "20px", // rounded corners
          background: "linear-gradient(135deg, #1E1E2F, #2A2A40)", // dark gradient bg
          color: "#fff",
        },
        "& .MuiBackdrop-root": {
          backdropFilter: "blur(8px)", // stronger blur
          backgroundColor: "rgba(0,0,0,0.6)",
        },
      }}
    >
      {/* Header */}
      {title && (
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontWeight: "bold",
            fontSize: "1.2rem",
            color: "#9b87f5",
          }}
        >
          {title}
          <IconButton
            onClick={onClose}
            sx={{ color: "#aaa", "&:hover": { color: "#fff" } }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
      )}

      {/* Content */}
      <DialogContent dividers sx={{ borderColor: "rgba(255,255,255,0.1)" }}>
        {children}
      </DialogContent>

      {/* Footer */}
      <DialogActions
        sx={{
          borderTop: "1px solid rgba(255,255,255,0.1)",
          px: 3,
          py: 2,
        }}
      >
        {/* {actions || (
          <Button
            onClick={onClose}
            sx={{
              px: 4,
              py: 1,
              borderRadius: "10px",
              background:
                "linear-gradient(135deg, #7C3AED 0%, #3B82F6 100%)",
              color: "white",
              textTransform: "none",
              "&:hover": {
                background:
                  "linear-gradient(135deg, #6D28D9 0%, #2563EB 100%)",
              },
            }}
          >
            Close
          </Button>
        )} */}
      </DialogActions>
    </Dialog>
  );
};

export default ModalWrapper;
