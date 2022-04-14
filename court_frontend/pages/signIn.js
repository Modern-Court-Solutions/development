import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Copyright from "../components/Copyright";
import { useRouter } from "next/router";
import { useSignIn } from "../hooks/user";
import ErrorSnackBar from "../components/ErrorSnackBar";
import { useState } from "react";

const theme = createTheme();

export const getStaticProps = () => {
  const COMPANY_NAME = process.env.COMPANY_NAME;
  return {
    props: {
      COMPANY_NAME,
    },
  };
};

const Login = ({ COMPANY_NAME }) => {
  const router = useRouter();
  const { signInError, signInLoading, signIn } = useSignIn();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  //TODO if existing and valid user, nav to '/'
  const handleSubmit = async (event) => {
    setLoading(true);
    setError(false);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    try {
      const valid = await signIn(email, password);

      if (valid) {
        router.push("/");
      } else {
        throw new Error();
      }
    } catch (err) {
      setError(true);
    }
    setLoading(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {error && <ErrorSnackBar severity="error" />}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {error && (
              <Typography sx={{ color: "red" }}>
                Incorrect Login Credentials
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright COMPANY_NAME={COMPANY_NAME} sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

export default Login;
