import { Card, Dialog, Typography } from "@mui/material";
import React, { Component }  from "react";

export class ListDestination extends Component {
    constructor(props){
        super(props);
        this.state ={

        }
    }
    render(){
        return(
            <>
            <Dialog open={onOpen} onClose={handleClone}>
                <div className="list-destination">
                    <Card className="card-content">
                        <Typography>
                            
                        </Typography>

                    </Card>

                </div>

            </Dialog>
            </>
        )
    }
}