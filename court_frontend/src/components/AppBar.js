import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import { Toolbar, Typography } from "@mui/material";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));
export default function MainAppBar() {
  return (
    <AppBar position="fixed" sx={{ zIndex: 1 }} open={true}>
      <Toolbar>
        <Typography
          component="h1"
          variant="h4"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}
        >
          District Court 3 - Court Management Software
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
