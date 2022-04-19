import { Button  } from "@mui/material";
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
import InboxIcon from '@mui/icons-material/Inbox';
import "./Location.scss";


export class Location extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locations: [
                {
                    id: 1,
                    province: 'Đà Nẵng '
                },
                {
                    id: 2,
                    province: 'Hà Nội '
                }

            ],
        }
    }

    onCloseDialog = () => {
        this.props.onCloseDialog();
    }

    selectLocation = (location) => {
        this.props.selectLocation(location);
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
                                {"Select departure"}
                            </DialogTitle>
                            <TextField id="outlined-basic" label="City,airport code" variant="outlined" />
                            <DialogContent>
                                <List>
                                    {
                                        locations.map((location) => {
                                            return (
                                                <ListItem disablePadding key={location.id} onClick={() => this.selectLocation(location)}>
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
                                <Button onClick={this.onCloseDialog}>Cancel</Button>
                            </DialogActions>
                        </Dialog>
                    </div>

                </div>
            </>
        )
    }
}