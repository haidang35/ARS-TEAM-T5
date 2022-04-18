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
const minDistance = 10;



export default function FilterByFlight() {
    const [value1, setValue1] = React.useState([20, 37]);

    const handleChange1 = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }
        if (activeThumb === 0) {
            setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
        } else {
            setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
        }
    };

    const [value2, setValue2] = React.useState([20, 37]);

    const handleChange2 = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (newValue[1] - newValue[0] < minDistance) {
            if (activeThumb === 0) {
                const clamped = Math.min(newValue[0], 100 - minDistance);
                setValue2([clamped, clamped + minDistance]);
            } else {
                const clamped = Math.max(newValue[1], minDistance);
                setValue2([clamped - minDistance, clamped]);
            }
        } else {
            setValue2(newValue);
        }
    };

    return (
        <>
            <div id="filter-by-flight">
                <Box
                    className="box"
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
                        <Box>
                            <Slider
                                getAriaLabel={() => 'Minimum distance'}
                                value={value1}
                                onChange={handleChange1}
                                valueLabelDisplay="auto"
                                getAriaValueText={valuetext}
                                disableSwap
                            />
                            <h5 className="h5">00:00
                                <ArrowRightAltIcon ></ArrowRightAltIcon>
                                24:00
                            </h5>
                            <br />
                            <h4 className="h4-2">Landing hour</h4>

                            <Slider
                                getAriaLabel={() => 'Minimum distance shift'}
                                value={value2}
                                onChange={handleChange2}
                                valueLabelDisplay="auto"
                                getAriaValueText={valuetext}
                                disableSwap
                            />
                            <h5 className="h5">00:00
                                <ArrowRightAltIcon ></ArrowRightAltIcon>
                                24:00
                            </h5>
                        </Box>





                    </FormControl>

                </Box>
            </div>

        </>
    )
}
