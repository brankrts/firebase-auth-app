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
import { useSelector, useDispatch } from "react-redux";
import {
  changeEmail,
  changeName,
  changePassword,
  register,
} from "../redux/authSlice";
import LockOutLined from "@mui/icons-material/LockOutlined";
const SignUp = () => {
  const name = useSelector((state) => state.auth.name);
  const email = useSelector((state) => state.auth.email);
  const password = useSelector((state) => state.auth.password);
  const error = useSelector((state) => state.auth.error);
  const isLoading = useSelector((state) => state.auth.isLoading);

  const dispatch = useDispatch();

  const handleEmailChange = (e) => {
    dispatch(changeEmail(e.currentTarget.value));
  };
  const handleNameChange = (e) => {
    dispatch(changeName(e.currentTarget.value));
  };
  const handlePasswordChange = (e) => {
    dispatch(changePassword(e.currentTarget.value));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register({ name, email, password }));
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
        <Box sx={{ mt: "10px" }} onSubmit={handleSubmit} component="form">
          <Avatar
            sx={{
              mx: "auto",
              bgcolor: "secondary.main",
            }}
          >
            <LockOutLined />
          </Avatar>
          <Typography variant="h3" sx={{ textAlign: "center" }}>
            Sign up
          </Typography>
          <TextField
            label="Full Name"
            autoComplete="name"
            margin="normal"
            required
            fullWidth
            autoFocus
            onChange={handleNameChange}
            value={name}
          />
          <TextField
            label="Email"
            autoComplete="email"
            margin="normal"
            required
            fullWidth
            onChange={handleEmailChange}
            value={email}
          />
          <TextField
            required
            fullWidth
            label="Password"
            margin="normal"
            value={password}
            type="password"
            onChange={handlePasswordChange}
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
            {isLoading ? "LOADING..." : "SIGN UP"}
          </Button>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <Link component={RouterLink} to="/sign-in">
              Already have account? Sign in
            </Link>
          </Box>
        </Box>
      </Container>
    </>
  );
};
export default SignUp;
