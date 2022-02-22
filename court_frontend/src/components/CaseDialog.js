import * as React from "react";
import { format } from "date-fns";
import parseISO from "date-fns/parseISO";
import DialogTitle from "@mui/material/DialogTitle";
import { Dialog, Typography, Divider, Container } from "@mui/material";

function CaseDialog({ item, setOpen }) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      onClose={(e) => {
        handleClose();
      }}
      open={true}
      maxWidth="false"
    >
      <div
        sx={{ paddingBottom: 5 }}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <DialogTitle>{item.title} </DialogTitle>
        <Typography align="center" variant="subtitle1">
          File Number: {item.file_number}
        </Typography>
        <Divider />
        <Container sx={{ marginTop: 2, marginBottom: 2 }}>
          <Typography>Status: {item.status.status}</Typography>
          <Typography>Case Type: {item.case_type.case_type}</Typography>
          <Typography>
            Date Filed: {format(parseISO(item.date_filed), "MM/dd/yyyy")}
          </Typography>
          <Typography>
            Judge: {item.judge.f_name} {item.judge.l_name}
          </Typography>
        </Container>
      </div>
    </Dialog>
  );
}
export default CaseDialog;
