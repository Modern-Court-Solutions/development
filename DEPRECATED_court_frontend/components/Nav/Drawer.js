import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import { List, Divider, Toolbar, ListItem } from "@mui/material";
import { mainListItems, secondaryListItems } from "./drawerMenuItems";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MuiDrawer from "@mui/material/Drawer";
import { useRouter } from "next/router";
const drawerWidth = 240;

const mdTheme = createTheme();

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    overflowX: "hidden",
    width: drawerWidth,
    height: "100vh",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: 300,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: 300,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

export default function Appdrawer() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  return (
    <ThemeProvider theme={mdTheme}>
      <Drawer
        className="shadow-lg"
        sx={{ zIndex: 0, overflow: "hidden" }}
        variant="permanent"
        open={open}
        onMouseEnter={() => {
          setOpen(true);
        }}
        onMouseLeave={() => {
          setOpen(false);
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
            backgroundColor: "#1976d2",
            borderRight: "none !important",
          }}
        ></Toolbar>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
        <List>{secondaryListItems}</List>
        <ListItem
          button
          sx={{ marginTop: "auto", paddingBottom: 5 }}
          onClick={() => {
            //handle logout
            router.push("/signIn");
          }}
        >
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </Drawer>
    </ThemeProvider>
  );
}
