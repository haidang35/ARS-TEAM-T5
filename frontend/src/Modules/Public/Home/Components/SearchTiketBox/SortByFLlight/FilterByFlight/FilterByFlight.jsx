import React, { Component } from "react";
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import "./FilterByFlight.scss";
import Slider from '@mui/material/Slider';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';


function valuetext(value) {
    return `${value}°C`;
}



export class FilterByFlight extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <>
                <div id="filter-by-flight">


                    <Box
                        className="box"
                        sx={{
                            width: 300,
                            height: 500,
                        }}

                    >
                        <FormControl>
                            <div className="side-bar-filter">
                                <div className="title-bar">
                                    <FormLabel
                                        className="radio-buttons">FILTER BY FLIGHT</FormLabel>
                                </div>
                            </div>
                            <br />

                            <div className="h4">
                                <h4>Select airline</h4>
                            </div>
                            <br />

                            <div className="content">
                                <div className="radio-check">
                                    <div className="item-check">

                                        <FormGroup aria-labelledby="radio-buttons"
                                            defaultValue="female"
                                            name="radio-buttons-group">
                                            <FormControlLabel control={<Checkbox defaultChecked />} label="Select all airlines" />

                                        </FormGroup>


                                    </div>
                                </div>
                            </div>
                            <br />
                            <div className="h4">
                                <h5>Filter by flight time</h5>
                            </div>
                            <br />
                            <h4 className="h4-2">Depart hour</h4>
                            <Box sx={{ width: 300 }}>
                                <Slider
                                    getAriaLabel={() => 'Temperature range'}
                                    // value={value}
                                    // onChange={handleChange}
                                    valueLabelDisplay="auto"
                                    getAriaValueText={valuetext}
                                />
                            </Box>
                            <h5 className="h5">00:00
                            <ArrowRightAltIcon ></ArrowRightAltIcon>
                            24:00
                            </h5>
                            <br />

                            <h4 className="h4-2">Landing hour</h4>
                            <Box sx={{ width: 300 }}>
                                <Slider
                                    getAriaLabel={() => 'Temperature range'}
                                    // value={value}
                                    // onChange={handleChange}
                                    valueLabelDisplay="auto"
                                    getAriaValueText={valuetext}
                                />
                            </Box>
                            <h5 className="h5">00:00
                            <ArrowRightAltIcon ></ArrowRightAltIcon>
                            24:00
                            </h5>
                            

                        </FormControl>

                    </Box>
                </div>

            </>
        )
    }
}