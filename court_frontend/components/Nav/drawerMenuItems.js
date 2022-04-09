import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";
import TodayIcon from "@mui/icons-material/Today";
import GavelIcon from "@mui/icons-material/Gavel";
import WorkIcon from "@mui/icons-material/Work";
import Link from "next/link";

const mdTheme = createTheme();

export const mainListItems = (
  <ThemeProvider theme={mdTheme}>
    <div>
      <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
      </Link>

      <Link href="/cases" style={{ textDecoration: "none", color: "inherit" }}>
        <ListItem button>
          <ListItemIcon>
            <WorkIcon />
          </ListItemIcon>
          <ListItemText primary="Cases" />
        </ListItem>
      </Link>

      <Link
        href="/calendar"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <ListItem button>
          <ListItemIcon>
            <TodayIcon />
          </ListItemIcon>
          <ListItemText primary="Calendar" />
        </ListItem>
      </Link>
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Attorneys" />
      </ListItem>

      <ListItem button>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Archived Cases" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Reports" />
      </ListItem>
    </div>
  </ThemeProvider>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last year" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year to date" />
    </ListItem>
  </div>
);
