import React, { Component } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/Inbox';
import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import publicService from "../../../Services/PublicService";

const departure = [
    { label: 'Hà Nội' },
    { label: 'Hồ Chí Minh' },
    { label: 'Đà Lạt' },
    { label: 'Nha Trang' },
    { label: 'Đà Nẵng' }
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
                <div id="location">
                    <Dialog
                        open={open}
                        onClose={this.onCloseDialog}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        id="location-dialog-home"

                    >
                        <DialogTitle className="alert-dialog-title">
                            {"Destination"}
                        </DialogTitle>
                        <Autocomplete
                             className="box"
                             disablePortal
                             id="combo-box-demo"
                             onChange={this.handleChangeLocation}
                             options={ departure }
                             renderInput={(params) => <TextField {...params} label="City,airport code" />}
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
                                                        <InboxIcon />
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

            </>
        )
    }
}
