import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Paper } from "@mui/material";
import transposeEvents from "../composables/transposeEvents";
import EventInfo from "../components/EventInfo";

const BigCalendar = ({ items }) => {
  moment.locale("en-US");
  const localizer = momentLocalizer(moment);
  const token = localStorage.getItem("token");
  let navigate = useNavigate();
  const [currentEvent, setCurrentEvent] = useState({});

  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  useEffect(() => {
    if (items && events.length == 0) {
      setEvents([...transposeEvents(items)]);
    }
  }, [items]);

  return (
    <Paper
      elevation={0}
      sx={{
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
        height: "95vh !important",
        width: "90vw !important",
        margin: "0px !important",
        padding: "0px !important",
        color: "black",
        opacity: "100%",
        fontWeight: 800,
        backgroundColor: "transparent",
      }}
    >
      {open ? <EventInfo eventInfo={currentEvent} setOpen={setOpen} /> : null}
      <Paper
        elevation={10}
        style={{
          padding: 20,
          height: "95vh !important",
          width: "90vw !important",
          marginTop: 100,
        }}
      >
        {events.length ? (
          <Calendar
            localizer={localizer}
            events={events}
            step={60}
            // defaultView="month"
            views={["month", "day", "agenda"]}
            startAccessor="start"
            endAccessor="end"
            defaultDate={new Date()}
            onSelectEvent={(e) => {
              console.log(e);
              setOpen(true);
              setCurrentEvent(e);
            }}
          />
        ) : null}
      </Paper>
    </Paper>
  );
};

export default BigCalendar;
