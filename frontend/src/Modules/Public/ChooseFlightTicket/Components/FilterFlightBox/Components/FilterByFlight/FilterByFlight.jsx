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
    const [value1, setValue1] = React.useState([0, 24]);
    const [value2, setValue2] = React.useState([0, 24]);

    const handleChange1 = (event, newValue, activeThumb) => {
        console.log(newValue);
        if (!Array.isArray(newValue)) {
            return;
        }
       setValue1(newValue);
    };


    const handleChange2 = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }
        setValue2(newValue);

       
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
                                max={24}
                            />
                            <h5 className="h5">{value1[0]}:00
                                <ArrowRightAltIcon ></ArrowRightAltIcon>
                                {value1[1]}:00
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
                                max={24}
                            />
                            <h5 className="h5">{value2[0]}:00
                                <ArrowRightAltIcon ></ArrowRightAltIcon>
                                {value2[1]}:00
                            </h5>
                        </Box>





                    </FormControl>

                </Box>
            </div>

        </>
    )
}
