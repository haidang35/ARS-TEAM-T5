import { Button, Checkbox, FormControlLabel, Typography } from "@mui/material";
import React, { Component } from "react";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Search from "@mui/icons-material/Search";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';


export class FlightSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tripType: 1,
            adults: 1,
            children: 0,
            infants: 0,
            open: false,
            locations: [
                {
                    id: 1,
                    province: 'Ha Noi'
                },
                {
                    id: 2,
                    province: 'Ho Chi Minh'
                }
            ],
            searchData: {
                departure: '',
                destination: ''
            }
        }
    }

    handleChangeTripType = (ev) => {
        this.setState({
            tripType: ev.target.value,
        });
    };

    handleClose = () => {
        this.setState({
            open: false
        });
    }

    handleOpenDialog = () => {
        this.setState({
            open: true
        });
    }

    onSelectLocation = (location) => {
        let { searchData } = this.state;
        searchData['departure'] = location;
        this.setState({ 
            searchData,
            open: false
         });
    }

    render() {
        const { open, locations } = this.state;
        const { departure, destination } = this.state.searchData;
        return (
            <>
                <div className="header-left">
                    <Typography variant="h1" className="title">
                        WHERE WOULD YOU LIKE TO GO ?
                    </Typography>
                    <div className="formcheck">
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="checkedB"
                                    color="primary"
                                    className="check-box"
                                    checked={
                                        this.state.tripType == 1
                                            ? true
                                            : false
                                    }
                                    alue={1}
                                    onChange={
                                        this
                                            .handleChangeTripType
                                    }
                                />
                            }
                            label="Round trip"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="checkedB"
                                    color="primary"
                                    className="check-box"
                                    checked={
                                        this.state.tripType == 1
                                            ? true
                                            : false
                                    }
                                    alue={1}
                                    onChange={
                                        this
                                            .handleChangeTripType
                                    }
                                />
                            }
                            label="One Way"
                        />
                        <div>
                            <TextField id="outlined-basic" label="" value={departure.province} variant="outlined" onClick={this.handleOpenDialog} />
                            <TextField id="outlined-basic" label="" variant="outlined" />
                        </div>
                        <Stack component="form" noValidate spacing={3} className="datetime">
                            <TextField
                                id="date"
                                label="Date"
                                type="date"
                                defaultValue="2022-04-11"
                                sx={{ width: 220 }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Stack>
                        <div className="passenger-type">
                            <div className="row">
                                <div className="col-sm-4">
                                    <div className="choose-quantity">
                                        <label className="title-passenger">
                                            Adults
                                        </label>
                                        <div className="content">
                                            <RemoveCircleOutline
                                                onClick={() =>
                                                    this.changeQuantityPassenger(
                                                        1,
                                                        0
                                                    )
                                                }
                                                className="icon"
                                            />
                                            <span className="quantity">
                                                {
                                                    this.state
                                                        .adults
                                                }
                                            </span>
                                            <AddCircleOutline
                                                onClick={() =>
                                                    this.changeQuantityPassenger(
                                                        1,
                                                        1
                                                    )
                                                }
                                                className="icon"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="choose-quantity">
                                        <label className="title-passenger">
                                            Children
                                        </label>
                                        <div className="content">
                                            <RemoveCircleOutline
                                                onClick={() =>
                                                    this.changeQuantityPassenger(
                                                        2,
                                                        0
                                                    )
                                                }
                                                className="icon"
                                            />
                                            <span className="quantity">
                                                {
                                                    this.state
                                                        .children
                                                }
                                            </span>
                                            <AddCircleOutline
                                                onClick={() =>
                                                    this.changeQuantityPassenger(
                                                        2,
                                                        1
                                                    )
                                                }
                                                className="icon"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="choose-quantity">
                                        <label className="title-passenger">
                                            Infants
                                        </label>
                                        <div className="content">
                                            <RemoveCircleOutline
                                                onClick={() =>
                                                    this.changeQuantityPassenger(
                                                        3,
                                                        0
                                                    )
                                                }
                                                className="icon"
                                            />
                                            <span className="quantity">
                                                {
                                                    this.state
                                                        .infants
                                                }
                                            </span>
                                            <AddCircleOutline
                                                onClick={() =>
                                                    this.changeQuantityPassenger(
                                                        3,
                                                        1
                                                    )
                                                }
                                                className="icon"
                                            />
                                        </div>
                                    </div>
                                    <div className="search">
                                        <Button
                                            variant="contained"
                                            className="btn-search-form"
                                            startIcon={<Search />}
                                        >
                                            Search flights
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Dialog
                    open={open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Departure"}
                    </DialogTitle>
                    <DialogContent>
                        <List>
                            {
                                locations.map((location) => {
                                    return (
                                        <ListItem disablePadding key={location.id} onClick={() => this.onSelectLocation(location)}>
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <InboxIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={location.province} />
                                            </ListItemButton>
                                        </ListItem>
                                    )
                                })
                            }
                        </List>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose}>Disagree</Button>
                        <Button onClick={this.handleClose} autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        )
    }
}