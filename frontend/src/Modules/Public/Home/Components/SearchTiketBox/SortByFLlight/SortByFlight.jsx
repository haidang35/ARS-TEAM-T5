import React, { Component } from "react";
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import "./SortByFlight.scss"
import { ViewMode } from "../ViewMode/ViewMode";

export class SortByFlight extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }

    }
    render() {
        return (
            <>
                <div id="sort-by-flight">
                    <Box
                        className="box"
                    >
                        <FormControl>
                            <div className="side-bar-filter">
                                <div className="title-bar">
                                    <FormLabel
                                        className="radio-buttons">Sort By Flight</FormLabel>
                                </div>
                            </div>
                            <div className="content">
                                <div className="radio-check">
                                    <div className="item-check">
                                        <RadioGroup
                                            aria-labelledby="radio-buttons"
                                            defaultValue="female"
                                            name="radio-buttons-group"
                                        >
                                            <FormControlLabel value="Flight price" control={<Radio />} label="Flight price (From low to high)" />
                                            <FormControlLabel value="Flight price low" control={<Radio />} label="Flight price (From high to low)" />
                                            <FormControlLabel value="Depart hour" control={<Radio />} label="Depart hour" />
                                            <FormControlLabel value="flight" control={<Radio />} label="Flight time" />
                                        </RadioGroup>
                                    </div>
                                </div>
                            </div>
                        </FormControl>
                    </Box>
                </div>
                <ViewMode />
            </>
        )
    }
}