import React, { Component } from "react";
import "./ViewMode.scss";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export class ViewMode extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <div id="view-mode">
          <Box className="box">
            <FormControl>
              <div className="side-bar-filter">
                <div className="title-bar">
                  <FormLabel className="radio-buttons">VIEW MODEL</FormLabel>
                </div>
              </div>
              <div className="content">
                <div className="radio-check">
                  <div className="item-check">
                    <FormGroup
                      aria-labelledby="radio-buttons"
                      defaultValue="female"
                      name="radio-buttons-group"
                    >
                      <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label="Basic fare for adults"
                      />
                      <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label="Ticket price includes taxes and fees"
                      />
                    </FormGroup>
                  </div>
                </div>
              </div>
            </FormControl>
          </Box>
        </div>
      </>
    );
  }
}
