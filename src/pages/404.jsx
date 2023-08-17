import { Link } from "react-router-dom";
import { Button, Grid, Typography } from "@mui/material";

const NotFound = () => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ minHeight: "100vh" }}
    >
      <Grid item sx={{ textAlign: "center" }}>
        <Typography sx={{ fontSize: "1.1rem" }} color="primary">
          404
        </Typography>
        <Typography sx={{ fontSize: "3rem", fontWeight: 700 }}>
          Page not found
        </Typography>
        <Typography sx={{ fontSize: "1rem", mt: 1 }}>
          Sorry, we couldn’t find the page you’re looking for.
        </Typography>
        <Link
          to={{
            pathname: "/",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            sx={{ width: "200px", mt: 3, borderRadius: "8px" }}
          >
            Go Back to Home
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
};

export default NotFound;
