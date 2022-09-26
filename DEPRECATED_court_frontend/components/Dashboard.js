import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Container, Grid, Paper } from "@mui/material";
// import Deposits from "./dsboardViews/Deposits";
// import StaticDatePicker from "../components/DatePick";
import { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
const mdTheme = createTheme();

export default function Dashboard({ items, query, setQuery, loading }) {
  const [dates, setDates] = useState([new Date(), null]);

  return (
    <ThemeProvider theme={mdTheme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ mt: 11 }}>
        <Backdrop
          open={false}
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Grid container spacing={3}>
          {/* Chart */}
          <Grid item xs={12} md={8} lg={9}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 240,
              }}
            >
              {/* <StaticDatePicker
                  setRestriced={true}
                  value={dates}
                  setValue={setDates}
                /> */}
            </Paper>
          </Grid>
          {/* We could set number of cases here? */}
          <Grid item xs={12} md={4} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 240,
              }}
            >
              {/* <Deposits /> */}
            </Paper>
          </Grid>
          {/* Recent Cases here */}
          <Grid item xs={"auto"}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                maxWidth: 700,
                minWidth: 700,
              }}
              elevation={6}
            >
              {/* <CasesList
                  items={items}
                  query={query}
                  setQuery={setQuery}
                  loading={loading}
                /> */}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
