import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  Toolbar,
  Box,
} from "@mui/material";
import Dashboard from "./views/Dashboard";
import Login from "./views/auth/Login";
import Cases from "./views/Cases";
import NotFoundPage from "./views/NotFoundPage";
import Appdrawer from "./components/Drawer";
import MainAppBar from "./components/AppBar";
import { useEffect, useState } from "react";
import BigCalendar from "./views/Calendar";
import useGetCollection from "./composables/getCollection";

const mdTheme = createTheme();

function App() {
  const [displayAppbar, setDisplayAppbar] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      setDisplayAppbar(true);
    } else {
      setDisplayAppbar(false);
    }
  }, [token]);

  const [search, setSearch] = useState("");
  const [query, setQuery] = useState({
    status: 3,
    judge: "",
  });
  const [offset, setOffSet] = useState(0);

  const [items, setItems] = useState([]);

  const { loading, error, hasMore } = useGetCollection(
    items,
    setItems,
    search,
    query,
    offset
  );

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        <Router>
          {displayAppbar ? (
            <>
              <React.StrictMode>
                <MainAppBar />
                <Appdrawer setDisplayAppbar={setDisplayAppbar} />
              </React.StrictMode>
            </>
          ) : null}
          <Box
            component="main"
            sx={{
              display: "flex",
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
            }}
          >
            <Toolbar />
            <Routes>
              <Route
                exact
                path="/"
                element={
                  <Dashboard
                    items={items}
                    query={query}
                    setQuery={setQuery}
                    loading={loading}
                  />
                }
              />
              <Route exact path="/login" element={<Login />} />
              <Route
                exact
                path="/cases"
                element={
                  <Cases
                    items={items}
                    query={query}
                    setQuery={setQuery}
                    loading={loading}
                  />
                }
              />
              <Route
                exact
                path="/calendar"
                element={<BigCalendar items={items} />}
              />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Box>
        </Router>
      </Box>
    </ThemeProvider>
  );
}

export default App;
