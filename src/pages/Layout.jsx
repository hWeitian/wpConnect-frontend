import { useState } from "react";
import {
  Drawer,
  Box,
  Toolbar,
  ListItem,
  ListItemButton,
  ListItemText,
  List,
  AppBar,
  Avatar,
  IconButton,
  Typography,
  Button,
  ListItemIcon,
  Tooltip,
  Menu,
  MenuItem,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import Logo from "../assets/logo.png";
import { Outlet, Link, useLocation } from "react-router-dom";
import Conferences from "./Conferences";
import { useAuth0 } from "@auth0/auth0-react";
import Feedback from "../components/Feedback";

const drawerWidth = 240;

const Layout = () => {
  const [feedbackSeverity, setFeedbackSeverity] = useState("success");
  const [openFeedback, setOpenFeedback] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState("");
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { logout } = useAuth0();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const currentPath = useLocation().pathname;

  const mainNav = [
    [
      "Conferences",
      "",
      <HomeIcon className={currentPath === `/` ? "icons-selected" : "icons"} />,
    ],
    [
      "Contacts",
      "contacts",
      <PermContactCalendarIcon
        className={currentPath === `/contacts` ? "icons-selected" : "icons"}
      />,
    ],
  ];

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <AppBar
          position="fixed"
          color="white"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
          }}
        >
          <Toolbar>
            <Box sx={{ flexGrow: 1 }}>
              <img
                src={Logo}
                alt="Application Logo"
                width={170}
                style={{ marginTop: "9px", marginLeft: "10px" }}
              />
            </Box>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  sx={{
                    bgcolor: "#FFEECA",
                    color: "#000000",
                    fontSize: "0.98rem",
                    fontWeight: 400,
                  }}
                >
                  WT
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem
                onClick={() =>
                  logout({ logoutParams: { returnTo: window.location.origin } })
                }
              >
                Logout
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: "auto" }}>
            <List sx={{ mt: 2 }}>
              {mainNav.map(
                (item, index) => (
                  <ListItem key={`${item}-${index}`}>
                    <Link to={`/${item[1]}`} className="nav-link">
                      <ListItemButton
                        selected={
                          currentPath === `/${item[1]}` ||
                          (item[3] && currentPath === `/${item[3][1]}`)
                        }
                      >
                        <ListItemIcon>{item[2]}</ListItemIcon>
                        <ListItemText primary={item[0]} />
                      </ListItemButton>
                    </Link>
                  </ListItem>
                )
                // )
              )}
            </List>
          </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          {currentPath === "/" ? (
            <Conferences />
          ) : (
            <Outlet
              context={[setOpenFeedback, setFeedbackMsg, setFeedbackSeverity]}
            />
          )}
        </Box>
      </Box>
      <Feedback
        severity={feedbackSeverity}
        handleOpen={setOpenFeedback}
        open={openFeedback}
      >
        {feedbackMsg}
      </Feedback>
    </>
  );
};

export default Layout;
