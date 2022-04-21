import React from "react";
import { Component } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import "./LetterRow.scss";

class LetterRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      letters: [
        {
          id: 1,
          title: "A",
        },
        {
          id: 2,
          title: "B",
        },
        {
          id: 3,
          title: "C",
        },
        {
          id: 4,
          title: "D",
        },
        {
          id: 5,
          title: "E",
        },
        {
          id: 6,
          title: "F",
        },
      ],
    };
  }

  render() {
    const { letters } = this.state;
    return (
      <>
        <div id="letter-row">
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              {letters.map((letter) => {
                return (
                  <Grid item xs={2} key={letter.id}>
                    <Typography className="letter-item" variant="span" component="div">
                      {letter.title}
                    </Typography>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </div>
      </>
    );
  }
}
export default LetterRow;
