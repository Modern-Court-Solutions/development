import React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Tooltip } from "@mui/material";
import { grey, blue } from "@mui/material/colors";
import HamburgerFilterMenu from "./HamburgerFilterMenu";
import { useState } from "react";

const SearchBar = ({ handleSearch, placeHolderText }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.target);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Paper
      component="form"
      variant="outlined"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: "95%",
        backgroundColor: grey[50],
        borderColor: blue[900],
      }}
    >
      {/* <Tooltip title="Filter"> */}
      <div>
        <Tooltip title="Filters">
          <IconButton
            sx={{ p: "10px" }}
            aria-label="menu"
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={(e) => {
              handleClick(e);
            }}
          >
            <MenuIcon />
          </IconButton>
        </Tooltip>
        <HamburgerFilterMenu
          open={open}
          id="basic-menu"
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
          anchorEl={anchorEl}
          handleClose={handleClose}
        />
      </div>
      {/* </Tooltip> */}

      <InputBase
        onKeyDown={(e) => {
          if (e.code === "Backspace") {
            handleSearch(e);
          }
        }}
        onChange={handleSearch}
        sx={{ ml: 1, flex: 1 }}
        placeholder={placeHolderText}
        inputProps={{ "aria-label": "search cases" }}
      />
      <Divider orientation="vertical"></Divider>
      <IconButton
        disabled
        sx={{ p: "10px" }}
        aria-label="search"
        onChange={handleSearch}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};
export default SearchBar;
