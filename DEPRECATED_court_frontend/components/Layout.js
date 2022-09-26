import AppBar from "./Nav/AppBar";
import AppDrawer from "./Nav/Drawer";
import Head from "next/head";
import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";
//import Title from './Title'
//nav

const Layout = ({ title, children, COURT_NAME }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </Head>
      <header>
        <AppBar COURT_NAME={COURT_NAME} />
      </header>
      <main>
        <Box
          sx={{
            display: "flex",
            backgroundColor: grey[100],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <AppDrawer />
          {children}
        </Box>
      </main>
    </>
  );
};

export default Layout;
