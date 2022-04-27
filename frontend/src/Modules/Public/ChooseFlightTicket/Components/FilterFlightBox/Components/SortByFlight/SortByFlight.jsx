import React, { Component } from "react";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import "./SortByFlight.scss";
import FlightIcon from '@mui/icons-material/Flight';


export class SortByFlight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortFlight: null,
    };
  }
  handleChangeFlightPrice = (value) => {
    this.setState({
      sortFlight: value,
    });
    this.props.onSortFlight(value);
  };
  render() {
    const { sortFlight } = this.state;

    return (
      <>
        <div id="sort-by-flight">
          <Box className="box">
            <FormControl>
              <div className="side-bar-filter">
                <div className="title-bar">
                    <FlightIcon className="icon-filter" />
                  <FormLabel className="radio-buttons">
                    SORT BY FLIGHT
                  </FormLabel>
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
                      <FormControlLabel
                        value="Flight price"
                        control={
                          <Radio
                            checked={sortFlight == 0}
                            onChange={() => this.handleChangeFlightPrice(0)}
                            value={sortFlight}
                            className="radio-check"
                          />
                        }
                        label="Flight price (From low to high)"
                      />
                      <FormControlLabel
                        value="Flight price low"
                        control={
                          <Radio
                            checked={sortFlight == 1}
                            onChange={() => this.handleChangeFlightPrice(1)}
                            value={sortFlight}
                            className="radio-check"
                          />
                        }
                        label="Flight price (From high to low)"
                      />

                      <FormControlLabel
                        value="Depart hour"
                        control={
                          <Radio
                            checked={sortFlight == 2}
                            onChange={() => this.handleChangeFlightPrice(2)}
                            value={sortFlight}
                            className="radio-check"
                          />
                        }
                        label="Depart hour"
                      />

                      <FormControlLabel
                        value="flight"
                        control={
                          <Radio
                            checked={sortFlight == 3}
                            onChange={() => this.handleChangeFlightPrice(3)}
                            value={sortFlight}
                            className="radio-check"
                          />
                        }
                        label="Flight time"
                      />
                    </RadioGroup>
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
