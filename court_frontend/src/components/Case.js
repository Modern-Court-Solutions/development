import * as React from "react";
import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { grey } from "@mui/material/colors";
import Divider from "@mui/material/Divider";
import LaunchIcon from "@mui/icons-material/Launch";
import { Tooltip, IconButton } from "@mui/material";
import CaseDialog from "./CaseDialog";

const Case = ({ item, index, handleChange, expanded }) => {
  const [open, setOpen] = useState(false);
  return (
    <React.StrictMode>
      <div>
        {item.id && (
          <Accordion
            expanded={expanded === `panel${index}`}
            onChange={handleChange(`panel${index}`)}
            elevation={4}
            sx={{ backgroundColor: `${grey[100]}` }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id={`panel${index}bh-header`}
            >
              <Typography sx={{ width: "30%", flexShrink: 0 }} mr={5}>
                {item.title}
              </Typography>
              <Typography
                sx={{ width: "20%", flexShrink: 0, color: "text.secondary" }}
                mr={5}
              >
                File Number: {item.file_number}
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                Judge: {item.judge.f_name} {item.judge.l_name}
              </Typography>
              <Tooltip title="Open Case Details">
                <IconButton
                  color="primary"
                  sx={{ marginLeft: "auto" }}
                  onClick={(e) => {
                    console.log(item);
                    setOpen(true);
                  }}
                >
                  <LaunchIcon />
                </IconButton>
              </Tooltip>
              {open ? <CaseDialog setOpen={setOpen} item={item} /> : null}
            </AccordionSummary>
            <AccordionDetails>
              <Divider />
              <Typography pb={1} pt={1}>
                Case Type: {item.case_type.case_type}
              </Typography>
              <Divider />
              {item.case_notes.map((note) => (
                <div key={note.id}>
                  <Typography pt={1}>{note.title}</Typography>
                  <Typography sx={{ color: "text.secondary" }}>
                    {note.note}
                  </Typography>
                </div>
              ))}
            </AccordionDetails>
          </Accordion>
        )}
      </div>
    </React.StrictMode>
  );
};

export default Case;
