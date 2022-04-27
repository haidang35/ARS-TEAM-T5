import React, { Component } from "react";
import "./ViewMode.scss";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FlightIcon from "@mui/icons-material/Flight";
import { VIEW_MODE } from "../../../../FlightTicket";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export class ViewMode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewMode: VIEW_MODE.BASIC_FARE_FOR_ADULTS,
    };
  }

  handleChangeViewMode = (ev) => {
    this.props.onChangeViewMode(ev.target.value);
    this.setState({
      viewMode: parseInt(ev.target.value),
    });
  };

  render() {
    const { viewMode } = this.state;
    return (
      <>
        <div id="view-mode">
          <Box className="box">
            <FormControl>
              <div className="side-bar-filter">
                <div className="title-bar">
                  <FlightIcon className="icon-filter" />
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
                        control={
                          <Checkbox
                            value={VIEW_MODE.BASIC_FARE_FOR_ADULTS}
                            checked={
                              viewMode === VIEW_MODE.BASIC_FARE_FOR_ADULTS
                            }
                            onChange={this.handleChangeViewMode}
                          />
                        }
                        label="Basic fare for adults"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            value={VIEW_MODE.INCLUDE_TAX_AND_FEES}
                            checked={
                              viewMode === VIEW_MODE.INCLUDE_TAX_AND_FEES
                            }
                            onChange={this.handleChangeViewMode}
                          />
                        }
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
