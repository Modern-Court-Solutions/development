import { Box, CssBaseline, Container, Paper } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AllCases from "../components/AllCases";

const mdTheme = createTheme();

const Cases = ({ items, query, setQuery, loading }) => {
  return (
    <ThemeProvider theme={mdTheme}>
      <Box
        sx={{
          marginTop: 10,
          display: "flex",
          justifyContent: "center",
          marginLeft: "5vw",
        }}
        maxWidth={false}
      >
        <CssBaseline />
        <Container sx={{ mt: 4, mb: 4 }}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              width: "70vw",
              minWidth: "418px",
            }}
            elevation={6}
          >
            <AllCases
              items={items}
              query={query}
              setQuery={setQuery}
              loading={loading}
            />
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Cases;
