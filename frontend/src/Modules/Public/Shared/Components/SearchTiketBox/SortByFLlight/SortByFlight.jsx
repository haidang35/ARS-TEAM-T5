import React, { Component } from "react";
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import "./SortByFlight.scss"
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';


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
                        sx={{
                            width: 300,
                            height: 300,
                        }}
                    >
                        
                         <FormControl>
                             <div className="side-bar-filter">
                                 <div className="title-bar">
                                     {/* <div className="sort-flights"> */}
                                     <AirplaneTicketIcon className="icon" />
                        <FormLabel
                         className="radio-buttons">Sort By Flight</FormLabel>
                         
                         </div>
                         </div>
                         {/* </div> */}
                         <div className="content">
                             <div className="radio-check">
                                 <div className="item-check">
                        <RadioGroup
                            aria-labelledby="radio-buttons"
                            defaultValue="female"
                            name="radio-buttons-group"
                        >
                            <FormControlLabel value="female" control={<Radio />} label="Flight price (From low to high)" />
                            <FormControlLabel value="male" control={<Radio />} label="Flight price (From high to low)" />
                            <FormControlLabel value="other" control={<Radio />} label="Depart hour" />
                            <FormControlLabel value="flight" control={<Radio />} label="Flight time" />
                            

                        </RadioGroup>
                        </div>
                        </div>
                        </div>
                    </FormControl>
                    
                    </Box>
                   
                </div>

            </>
        )
    }
}