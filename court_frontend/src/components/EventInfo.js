import { useEffect } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import { Dialog, Typography, Divider, Container, Paper } from "@mui/material";
import { formatDate } from "../composables/formatDate";
import { formatTime } from "../composables/formatTime";
import NotesMap from "./NotesMap";

const EventInfo = ({ eventInfo, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    console.log(new Date(eventInfo.info.start));
    eventInfo.info.event_notes.map((el, index) => {
      console.log(el.note, index);
    });
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
          {formatDate(new Date(eventInfo.info.start)) !==
          formatDate(new Date(eventInfo.info.end)) ? (
            <Container sx={{ marginTop: 2, marginBottom: 2 }}>
              <Typography>
                Start Date: {formatDate(new Date(eventInfo.info.start))}
              </Typography>
              <Typography>
                Start Time: {formatTime(new Date(eventInfo.info.start))}{" "}
              </Typography>

              <Typography>
                End Date: {formatDate(new Date(eventInfo.info.end))}
              </Typography>
              <Typography>
                End Time: {formatTime(new Date(eventInfo.info.end))}{" "}
              </Typography>
            </Container>
          ) : (
            <Container sx={{ marginTop: 2, marginBottom: 2 }}>
              <Typography>
                Date: {formatDate(new Date(eventInfo.info.start))}
              </Typography>
              <Typography>
                Start Time: {formatTime(new Date(eventInfo.info.start))}{" "}
              </Typography>
              <Typography>
                End Time: {formatTime(new Date(eventInfo.info.end))}{" "}
              </Typography>
            </Container>
          )}
          <Divider></Divider>

          <NotesMap notes={eventInfo.info.event_notes} />
        </Paper>
      </div>
    </Dialog>
  );
};

export default EventInfo;
