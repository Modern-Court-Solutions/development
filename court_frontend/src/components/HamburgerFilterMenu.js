import { Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import ConfirmationDialog from "./FilterMenuDialog";

export default function HamburgerFilterMenu({ anchorEl, handleClose, open }) {
  const [opDialog, setOpenDialog] = useState(false);
  const [value, setValue] = useState("");

  const handleClickListItem = () => {
    setOpenDialog(true);
  };

  return (
    <div>
      <Menu anchorEl={anchorEl} onClose={handleClose} open={open}>
        <MenuItem
          onClick={() => {
            handleClickListItem();
            handleClose();
          }}
        >
          Set Filter for Judges
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClickListItem();
            handleClose();
          }}
        >
          Set Filter 2
        </MenuItem>
      </Menu>
      <ConfirmationDialog
        open={opDialog}
        setOpen={setOpenDialog}
        value={value}
        setValue={setValue}
      />
    </div>
  );
}
