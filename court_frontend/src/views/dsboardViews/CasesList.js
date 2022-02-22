import React, { useEffect } from "react";
import { useState } from "react";
import { Container, Typography, Stack } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { blue, grey } from "@mui/material/colors";
import Case from "../../components/Case";

import SearchBar from "../../components/SearchBar";
import { Skeleton, Divider } from "@mui/material";
//import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => {
  return {
    btn: {
      background: `${blue[400]} !important`,
      border: 0,
      borderRadius: 3,
      color: `${grey[900]} !important`,
      height: 48,
      padding: "0 30px",
      "&:hover": {
        color: "black !important",
        background: `${blue[500]} !important`,
      },
    },
    title: {
      textDecoration: "underline",
      marginBottom: 20,
    },
    field: {
      marginTop: 20,
      marginBottom: 25,
      display: "block",
      width: 300,
    },
    headd: {
      paddingTop: 20,
      paddingBottom: 25,
    },
  };
});

const CasesList = ({ query, search, items, loading }) => {
  const [expanded, setExpanded] = useState(false);
  const placeHolderText = "Search Cases";
  const [cases, setCases] = useState(items);

  useEffect(() => {
    setCases(items);
  }, [items, setCases]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleSearch = (e) => {
    // console.log(cases, "cases");
    if (e.nativeEvent.inputType === "deleteContentBackward") {
      let newArr = items.filter((el) => {
        return (
          el.file_number.includes(e.target.value) ||
          el.title.toLowerCase().includes(e.target.value.toLowerCase())
        );
      });
      setCases(newArr);
    } else {
      let newArr = cases.filter((el) => {
        return (
          el.file_number.includes(e.target.value) ||
          el.title.toLowerCase().includes(e.target.value.toLowerCase())
        );
      });
      setCases(newArr);
    }
  };

  const classes = useStyles();

  return (
    <Container sx={{ height: 530 }}>
      <Typography
        className={classes.headd}
        variant="h4"
        color="primary"
        align="center"
      >
        Recent Cases
      </Typography>
      <Stack direction="row" spacing={2} justifyContent="center">
        <SearchBar
          handleSearch={handleSearch}
          query={query}
          placeHolderText={placeHolderText}
        />
      </Stack>
      <Stack
        spacing={2}
        sx={{ maxWidth: 600, maxHeight: 370, overflow: "auto" }}
        mt={2}
        p={2}
      >
        {cases && cases.length ? (
          cases
            //.sort((a, b) => a.status_date - b.status_date)
            .slice(0, 20)
            .map((item, index) => (
              <Case
                key={item.id}
                item={item}
                index={index}
                loading={loading}
                handleChange={handleChange}
                expanded={expanded}
              />
            ))
        ) : (
          <Stack spacing={2}>
            <Skeleton
              animation="pulse"
              variant="rectangular"
              width="auto"
              height={80}
              sx={{ opacity: "50%" }}
            />
            <Divider />
          </Stack>
        )}
        {/* {items.length < 1 && } */}
      </Stack>
    </Container>
  );
};

export default CasesList;
