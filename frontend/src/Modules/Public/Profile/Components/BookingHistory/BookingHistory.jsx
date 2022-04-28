import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./BookingHistory.scss";
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';


export class BookingHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            openAlert: false,
            

        }
    }

    handleClickOpen = () => {
        this.setState({
            open: true
        })
    }

    handleClose = () => {
        this.setState({
            open: false,
        })
    }

    handleCancel = () => {
        this.setState({
            openAlert: true
        });
        this.handleClose();
    }

    handleCloseMessage = () =>{
        this.setState({
            openAlert: false
        });
    }




    render() {
        const { open, openAlert } = this.state;
        return (
            <>
                <div className="user-booking-list">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Booking History</h4>
                        </div>
                        <div className="card-content">
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-lg">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Booking date</th>
                                                <th>Route</th>
                                                <th>Flight</th>
                                                <th>Total</th>
                                                <th>Payment status</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="text-bold-500">
                                                    1
                                                </td>
                                                <td className="text-bold-500">
                                                    04-04-2022
                                                </td>
                                                <td className="text-bold-500">
                                                    Hà Nội - Hồ Chí Minh
                                                </td>
                                                <td className="text-bold-500">
                                                    VNA1111
                                                </td>
                                                <td className="text-bold-500">
                                                    1.210.000 ₫
                                                </td>
                                                <td>
                                                    Paid
                                                </td>
                                                <td>
                                                    <div className="btn-box-control">
                                                        <Link
                                                            to={{
                                                                pathname: "/customer-info/viewdetailsbooking"

                                                            }}
                                                        >
                                                            <Button fullWidth variant="contained">View Details</Button>

                                                        </Link>

                                                        <Button variant="outlined" color="error" onClick={this.handleClickOpen}>
                                                            Cancel
                                                        </Button>
                                                        <Dialog
                                                            open={open}
                                                            onClose={this.handleClose}
                                                            aria-labelledby="alert-dialog-title"
                                                            aria-describedby="alert-dialog-description"
                                                        >
                                                            <DialogTitle id="alert-dialog-title">
                                                                Warning
                                                            </DialogTitle>
                                                            <DialogContent>
                                                                <DialogContentText id="alert-dialog-description">
                                                                    Are you sure delete booking
                                                                </DialogContentText>
                                                            </DialogContent>
                                                            <DialogActions>
                                                                <Button onClick={this.handleClose}>Disagree</Button>
                                                                <Button onClick={this.handleCancel} autoFocus>
                                                                    Agree
                                                                </Button>
                                                            </DialogActions>
                                                        </Dialog>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Stack spacing={2} sx={{ width: '100%' }}>
                    <Snackbar open={openAlert} onClose={this.handleCloseMessage}  autoHideDuration={3000}>
                        <Alert onClose={this.handleCloseMessage} severity="success" sx={{ width: '100%' }}>
                            This is a success message!
                        </Alert>
                    </Snackbar>
                </Stack>
            </>
        )
    }
}