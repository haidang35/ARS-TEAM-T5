import { Button, MenuItem } from "@mui/material";
import React, { Component } from "react";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Autocomplete from '@mui/material/Autocomplete';
import "./Location.scss";
import publicService from "../../../Shared/Services/PublicService";
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';

const departure = [
  
]


export class Location extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locations: [],
        }
    }

    componentDidMount() {
        this.getLocationsList();
    }

    getLocationsList = async () => {
        await publicService.getLocationsList().then((res) => {
            this.setState({
                locations: res.data,
            })
        })
    }

    onCloseDialog = () => {
        this.props.onCloseDialog();
    }

    selectLocation = (location) => {
        this.props.selectLocation(location);
    }

    handleChangeLocation = (ev, newValue) => {
        this.props.selectLocation({
            province: newValue.label
        })
    }
    render() {
        const { locations } = this.state;
        const { open } = this.props;
        return (
            <>
                <div id="location-home">
                    <div className="location-form">
                        <Dialog
                            open={open}
                            onClose={this.onCloseDialog}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                            id="location-dialog-home"
                        >
                            <DialogTitle className="alert-dialog-title">
                                {"Select "}
                            </DialogTitle>

                            <Autocomplete
                                className="box"
                                disablePortal
                                onChange={this.handleChangeLocation}
                                options={departure}
                                renderInput={(params) =>
                                <TextField {...params} label="City,airport code" />}
                            />
                            <DialogContent>
                                <div className="choose-country">
                                    <Button variant="contained" color="primary">
                                        Việt Nam
                                    </Button>
                                </div>
                                <List>
                                    {
                                        locations.map((location) => {
                                            return (
                                                <ListItem disablePadding key={location.id} onClick={() => this.selectLocation(location)}>
                                                    <ListItemButton>
                                                        <ListItemIcon>
                                                        <AirplaneTicketIcon />
                                                        </ListItemIcon>
                                                        <ListItemText primary={location.City.Name} />
                                                    </ListItemButton>
                                                </ListItem>
                                            )
                                        })
                                    }
                                </List>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.onCloseDialog}>Cancel</Button>
                            </DialogActions>
                        </Dialog>
                    </div>

                </div>
            </>
        )
    }
}
