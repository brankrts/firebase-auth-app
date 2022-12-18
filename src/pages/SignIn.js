/** @format */

import {
  TextField,
  CssBaseline,
  Button,
  Box,
  Container,
  Link,
  Avatar,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { login } from "../redux/authSlice";
import { changeEmail, changePassword } from "../redux/authSlice";
import { useSelector, useDispatch } from "react-redux";
import LockOutLined from "@mui/icons-material/LockOutlined";
const SignIn = () => {
  const email = useSelector((state) => state.auth.email);
  const isLoading = useSelector((state) => state.auth.isLoading);

  const password = useSelector((state) => state.auth.password);
  const error = useSelector((state) => state.auth.error);

  const dispatch = useDispatch();

  const handleEmailChange = (e) => {
    dispatch(changeEmail(e.currentTarget.value));
  };

  const handlePasswordChange = (e) => {
    dispatch(changePassword(e.currentTarget.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <>
      <CssBaseline />
      <Container
        maxWidth="md"
        sx={{
          height: "500px",
          padding: "20px",
          boxDirection: "border-box",
        }}
      >
        <Box onSubmit={handleSubmit} sx={{ mt: "10px" }} component="form">
          <Avatar
            sx={{
              mx: "auto",
              bgcolor: "secondary.main",
            }}
          >
            <LockOutLined />
          </Avatar>
          <Typography variant="h3" sx={{ textAlign: "center" }}>
            Sign in
          </Typography>
          <TextField
            label="Email"
            autoComplete="email"
            margin="normal"
            required
            fullWidth
            autoFocus
            onChange={handleEmailChange}
            value={email}
          />
          <TextField
            required
            fullWidth
            label="Password"
            margin="normal"
            type="password"
            onChange={handlePasswordChange}
            value={password}
          />
          {error && (
            <Typography sx={{ color: "red", textAlign: "center" }}>
              {error}
            </Typography>
          )}
          <Button
            disabled={isLoading}
            type="submit"
            variant="contained"
            fullWidth
            sx={{ fontSize: "20px", mt: "10px" }}
          >
            {isLoading ? "LOADING..." : "SIGN IN"}
          </Button>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            <Link component={RouterLink} to="/forgot-password">
              Forgot Password
            </Link>
            <Link component={RouterLink} to="/sign-up">
              Don't have an account? Sign up
            </Link>
          </Box>
        </Box>
      </Container>
    </>
  );
};
export default SignIn;
