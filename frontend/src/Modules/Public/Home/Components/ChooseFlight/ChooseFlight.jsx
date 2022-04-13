import React, { Component } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FlightIcon from '@mui/icons-material/Flight';
import SvgIcon from '@mui/material/SvgIcon';



export class ChooseFlight extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {

        return (
            <>
            <div id="choose-flight"> 
            <Box
                    component="form"
                    sx={{
                        backgroundColor: 'primary.dark',
                        width: 1500,
                        height: 300,

                        '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <div className="content-flight">
                        <label>Hà Nội, Việt Nam (HAN)

                            Đà Nẵng, Vietnam (DNA)

                            Fri , 15-04-2022</label>
                        <span class="material-icons-outlined">
                            flight
                        </span>
                    </div>

                </Box>
            </div>
            <div className="item-box">


            </div>
             
                
            </>
        )
    }
}