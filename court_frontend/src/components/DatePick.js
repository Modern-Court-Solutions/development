import React from "react";
import TextField from "@mui/material/TextField";
import StaticDateRangePicker from "@mui/lab/StaticDateRangePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { useState } from "react";

export default function StaticDatePicker({ setRestriced, value, setValue }) {
  //const [value, setValue] = useState([new Date(), null]);
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    console.log(value);
    setOpen(false);
  };

  return (
    <div>
      <Grid container spacing={0}>
        <Grid item alignItems="flex-end">
          <Button variant="outlined" onClick={handleClickOpen}>
            Custom Date Range
          </Button>
          <List>
            <Grid container spacing={0}>
              <Grid item>
                <List dense={true}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <DateRangeIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Next 7 Days" />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </List>{" "}
        </Grid>
      </Grid>
      <div>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Dialog open={open} onClose={handleClose} maxWidth="false">
            <DialogTitle>Date Range</DialogTitle>
            <StaticDateRangePicker
              displayStaticWrapperAs="desktop"
              disableCloseOnSelect={false}
              calendars={2}
              disablePast={setRestriced}
              value={value}
              onChange={(newValue) => {
                setValue([new Date(), newValue]);
              }}
              renderInput={(startProps, endProps) => (
                <React.Fragment>
                  <TextField {...startProps} />
                  <Box sx={{ mx: 2 }}> to </Box>
                  <TextField {...endProps} />
                </React.Fragment>
              )}
            />

            <DialogActions>
              <Button autoFocus onClick={handleClose}>
                Save changes
              </Button>
            </DialogActions>
          </Dialog>
        </LocalizationProvider>
      </div>
    </div>
  );
}
