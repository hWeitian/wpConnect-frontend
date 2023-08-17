import { Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import LogoSquare from "../assets/logo-square.png";
import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ minHeight: "100vh" }}
    >
      <Grid item sx={{ textAlign: "center" }}>
        <img
          src={LogoSquare}
          alt="Application Logo"
          width={170}
          style={{ marginTop: "9px", marginLeft: "10px" }}
        />
        <Typography sx={{ fontSize: "1.2rem", fontWeight: 700, mt: 3 }}>
          Authentication required
        </Typography>
        <Typography sx={{ fontSize: "1rem" }}>
          Please log in to access this page
        </Typography>
        <Button
          onClick={() => loginWithRedirect()}
          variant="contained"
          color="primary"
          sx={{ width: "200px", mt: 3, fontWeight: 700 }}
        >
          Log in
        </Button>
      </Grid>
    </Grid>
  );
};

export default Login;
