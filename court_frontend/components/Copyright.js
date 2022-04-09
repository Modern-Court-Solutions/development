import { Typography, Link } from "@mui/material";

const Copyright = ({ COMPANY_NAME }) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      sx={{ marginTop: "100%" }}
    >
      {"Copyright © "}
      <Link color="inherit" href="">
        {COMPANY_NAME}
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default Copyright;
