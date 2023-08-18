import { Snackbar, Alert } from "@mui/material";

const Feedback = ({ children, severity, open, handleOpen }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={() => handleOpen(false)}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <Alert
        onClose={() => handleOpen(false)}
        severity={severity}
        sx={{ width: "100%" }}
      >
        {children}
      </Alert>
    </Snackbar>
  );
};

export default Feedback;
