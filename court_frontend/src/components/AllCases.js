import React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Stack } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { blue, grey } from "@mui/material/colors";
import Case from "./Case";
import useGetCollection from "../composables/getCollection";
import SearchBar from "../components/SearchBar";
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

const AllCases = ({ items, query, setQuery, loading }) => {
  const [expanded, setExpanded] = useState(false);
  const [cases, setCases] = useState(items);

  useEffect(() => {
    setCases(items);
  }, [items, setCases]);
  const placeHolderText = "Search Cases";

  let navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleSearch = (e) => {
    setArrayNumber(20);
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

  const [hasMore, setHasMore] = useState(true);
  const [arrayNumber, setArrayNumber] = useState(20);

  useEffect(() => {
    if (arrayNumber <= cases.length) {
      setHasMore(true);
    }
  }, [hasMore, arrayNumber]);

  const observer = useRef();
  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((elements) => {
        if (elements[0].isIntersecting && hasMore) {
          setArrayNumber((prevArrayNumber) => prevArrayNumber + 20);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore, loading]
  );

  const classes = useStyles();
  return (
    <Container sx={{ height: "80vh" }}>
      <Typography
        className={classes.headd}
        variant="h4"
        color="primary"
        align="center"
      >
        Cases
      </Typography>
      <Stack direction="row" spacing={2} justifyContent="center">
        <SearchBar
          handleSearch={handleSearch}
          query={query}
          placeHolderText={placeHolderText}
        />
      </Stack>
      <Stack spacing={2} sx={{ height: "60vh", overflow: "auto" }} mt={2} p={2}>
        {cases.length
          ? cases.slice(0, arrayNumber).map((item, index) => {
              if (index + 1 === arrayNumber) {
                return (
                  <div ref={lastElementRef} key={item.id}>
                    <Case
                      key={item.id}
                      item={item}
                      index={index}
                      loading={loading}
                      handleChange={handleChange}
                      expanded={expanded}
                    />
                  </div>
                );
              } else {
                return (
                  <Case
                    key={item.id}
                    item={item}
                    index={index}
                    loading={loading}
                    handleChange={handleChange}
                    expanded={expanded}
                  />
                );
              }
            })
          : null}
        {cases.length < 1 && (
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
      </Stack>
    </Container>
  );
};

export default AllCases;
