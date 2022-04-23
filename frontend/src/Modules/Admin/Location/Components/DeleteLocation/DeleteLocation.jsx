import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import locationsService from "../../Shared/Services/LocationService";
import { Redirect } from "react-router-dom";

export default function DeleteLocation({ location, onDeleteLocation }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    
  };

  const deleteLocation = async () => {
    onDeleteLocation(location);
    handleClose();
  }

  return (
    <div>
        <IconButton aria-label="delete"onClick={handleClickOpen}>
          <DeleteIcon />
        </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <p>{`Delete location ${location.City.Province.Name}   ?`}</p>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete location {location.City.Province.Name}  ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="error" onClick={handleClose}>Disagree</Button>
          <Button variant="outlined"  onClick={deleteLocation} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}