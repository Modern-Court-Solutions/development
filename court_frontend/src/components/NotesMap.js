import { Container, Typography } from "@mui/material";

const NotesMap = (notes) => {
  return (
    <Container>
      <Typography sx={{ marginTop: 1 }}>Notes:</Typography>
      {notes["notes"].map((el, index) => (
        <Typography key={index}>{el.note}</Typography>
      ))}
    </Container>
  );
};

export default NotesMap;
