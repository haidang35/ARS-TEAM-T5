import React, { Component } from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import "./FilterByFlight.scss";
import Slider from "@mui/material/Slider";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import FlightIcon from "@mui/icons-material/Flight";

function valuetext(value) {
  return `${value}°C`;
}
const minDistance = 10;

export default function FilterByFlight({
  filterFlightTicketByDepartHour,
  filterFlightTicketByLandingHour,
  airlineList,
  filterFlightTicketByAirline
}) {
  const [departHour, setValue1] = React.useState([0, 24]);
  const [landingHour, setValue2] = React.useState([0, 24]);
  const [scopeAirline, setScopeAirline] = React.useState(0);

  const handleChange1 = (event, newValue, activeThumb) => {
    filterFlightTicketByDepartHour(newValue);
    if (!Array.isArray(newValue)) {
      return;
    }
    setValue1(newValue);
  };

  const handleChange2 = (event, newValue, activeThumb) => {
    filterFlightTicketByLandingHour(newValue);
    if (!Array.isArray(newValue)) {
      return;
    }
    setValue2(newValue);
  };

  const handleScopeAirline = (ev) => {

    setScopeAirline(ev.target.value);
    filterFlightTicketByAirline(ev.target.value);
    
  };
  return (
    <>
      <div id="filter-by-flight">
        <Box className="box">
          <FormControl>
            <div className="side-bar-filter">
              <div className="title-bar">
                <FlightIcon className="icon-filter" />
                <FormLabel className="radio-buttons">
                  FILTER BY FLIGHT
                </FormLabel>
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
                  <FormGroup
                    aria-labelledby="radio-buttons"
                    defaultValue="female"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                        checked={scopeAirline == 0}
                          value={0}
                          onChange={handleScopeAirline}
                        />
                      }
                      label="Select all airlines"
                    />

                    {airlineList.map((item) => {
                      return (
                        <FormControlLabel
                          key={item.Id}
                          control={
                            <Checkbox
                              name="scopeAirline"
                              checked={scopeAirline == item.Id}
                              value={item.Id}
                              onChange={(ev) => handleScopeAirline(ev)}
                            />
                          }
                          label={item.Name}
                        />
                      );
                    })}
                  </FormGroup>
                </div>
              </div>
            </div>
            <br />
            <div className="h4">
              <h5>Filter by flight time</h5>
            </div>
            <br />
            <div className="filter-by-depart">
              <h4 className="h4-2">Depart hour</h4>
              <Box>
                <Slider
                  getAriaLabel={() => "Minimum distance"}
                  value={departHour}
                  onChange={handleChange1}
                  valueLabelDisplay="auto"
                  getAriaValueText={valuetext}
                  disableSwap
                  max={24}
                />
                <h5 className="h5">
                  {departHour[0]}:00
                  <ArrowRightAltIcon></ArrowRightAltIcon>
                  {departHour[1]}:00
                </h5>
                <br />
                <h4 className="h4-2">Landing hour</h4>

                <Slider
                  getAriaLabel={() => "Minimum distance shift"}
                  value={landingHour}
                  onChange={handleChange2}
                  valueLabelDisplay="auto"
                  getAriaValueText={valuetext}
                  disableSwap
                  max={24}
                />
                <h5 className="h5">
                  {landingHour[0]}:00
                  <ArrowRightAltIcon></ArrowRightAltIcon>
                  {landingHour[1]}:00
                </h5>
              </Box>
            </div>
          </FormControl>
        </Box>
      </div>
    </>
  );
}
