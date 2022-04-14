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


export class Location extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locations: [
                {
                    id: 1,
                    province: 'da nang '
                },
                {
                    id: 2,
                    province: 'ha noi '
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
        return(
            <>
            <div id="location">
                    <Dialog
                        open={open}
                        onClose={this.onCloseDialog}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle className="alert-dialog-title">
                            {"Destination"}
                        </DialogTitle>
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
                                                    <ListItemText primary={location.province}/>
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