import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import flightTicketService from "../../Shared/Service/FlightTicketService";
import { Redirect } from "react-router-dom";

export default function DeleteFlightTicket({ flightTicket, onDeleteFlightTicket }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    
  };

  const deleteFlightTicket = async () => {
    onDeleteFlightTicket(flightTicket);
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
          <p>{`Delete flight ticket ${flightTicket.Flight.FlightCode} ?`}</p>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this flight ticket {flightTicket.Flight.FlightCode} ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="error" onClick={handleClose}>Disagree</Button>
          <Button variant="outlined"  onClick={deleteFlightTicket} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
