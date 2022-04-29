import React, { Component } from "react";
import TextField from '@mui/material/TextField';
import "./SearchFlightTicket.scss";
import { Search } from "@mui/icons-material";
import { Button } from "@mui/material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';



export class SeachFlightTicket extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <>
                <div id="search">
                    <div className="warp-container">
                        <div className="content">
                            Search Flight's Information
                        </div>
                        <FormControl className="flight" >
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                name="radio-buttons-group"
                            >
                                <FormControlLabel value="female" control={<Radio />} label="Flight" />
                            </RadioGroup>
                        </FormControl>
                    <div className="search-form">
                        <TextField className="input"
                            label="Search Flight"
                        />
                        <Button
                           
                            className="btn-search-form"
                            variant="contained"
                        >
                            Search 
                        </Button>
                    </div>
                </div>
                </div>

            </>
        )
    }
}