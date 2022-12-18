/** @format */

import { Navigate, Outlet } from "react-router-dom";
import { useCurrentUser, useIsLoggedIn } from "../config/hooks";
import { logout } from "../redux/authSlice";
import { useDispatch } from "react-redux";

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Avatar,
  DialogActions,
  Button,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState } from "react";
const Layout = () => {
  const dispatch = useDispatch();
  const [anchorEL, setAnchorEl] = useState(null);
  const currentUser = useCurrentUser();
  const isLoggedIn = useIsLoggedIn();
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  if (isLoggedIn == null) return <h1>Loading...</h1>;
  else if (isLoggedIn === false) return <Navigate replace to={"/sign-in"} />;

  return (
    <>
      <AppBar position="apsolute">
        <Toolbar sx={{ px: "5px" }}>
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
            Home
          </Typography>
          <IconButton
            color="inherit"
            onClick={(e) => {
              setAnchorEl(e.currentTarget);
            }}
          >
            <AccountCircleIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEL}
            open={Boolean(anchorEL)}
            onClose={() => {
              setAnchorEl(null);
            }}
          >
            <MenuItem
              onClick={() => {
                setProfileDialogOpen(true);
                setAnchorEl(null);
              }}
            >
              Profile
            </MenuItem>
            <MenuItem
              onClick={() => {
                setAnchorEl(null);
                dispatch(logout());
              }}
            >
              Sign Out
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Dialog
        open={profileDialogOpen}
        onClose={() => {
          setProfileDialogOpen(false);
        }}
      >
        <DialogTitle sx={{ textAlign: "center", color: "purple" }}>
          Profile
        </DialogTitle>
        <DialogContent>
          <Box
            display={"flex"}
            sx={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Avatar />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                columnGap: "px",
                padding: "10px",
              }}
            >
              <Typography>{currentUser.displayName}</Typography>
              <Typography>{currentUser.email}</Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setProfileDialogOpen(false);
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Outlet />
    </>
  );
};

export default Layout;
