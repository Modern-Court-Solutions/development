import * as React from "react";
import { StyledEngineProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

export default function GlobalCssPriority({ children }) {
  return (
    <StyledEngineProvider injectFirst>
      <CssBaseline />
      {children}
    </StyledEngineProvider>
  );
}
