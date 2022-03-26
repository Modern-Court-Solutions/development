import { useEffect, useState } from "react";
import { format } from "date-fns";
import parseISO from "date-fns/parseISO";
import DialogTitle from "@mui/material/DialogTitle";
import { Dialog, Typography, Divider, Container, Paper } from "@mui/material";
import { formatDate } from "../composables/formatDate";

const EventInfo = ({ eventInfo, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    console.log(new Date(eventInfo.info.start));
  }, []);

  return (
    <Dialog
      onClose={(e) => {
        handleClose();
      }}
      open={true}
      maxWidth="false"
      sx={{ padding: 5 }}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Paper sx={{ padding: 3 }}>
          <DialogTitle>
            {` ${eventInfo.title.split("-")[0]} - ${eventInfo.info.name}`}
          </DialogTitle>
          <Typography align="center" variant="subtitle1">
            Associated case: {eventInfo.title}
          </Typography>
          <Divider />
          <Container sx={{ marginTop: 2, marginBottom: 2 }}>
            <Typography>
              Date: {formatDate(new Date(eventInfo.info.start))}
            </Typography>
          </Container>
        </Paper>
      </div>
    </Dialog>
  );
};

export default EventInfo;
