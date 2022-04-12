import Box from '@mui/material/Box';
import "./SearchTicketBox.scss";
import TextField from '@mui/material/TextField';
import { Component } from 'react';
import Stack from '@mui/material/Stack';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';






export class SearchTicketBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      value : '',

      locations: [
        {
          id: 1,
          province: 'Ha Noi'
        },
        {
          id: 2,
          province: 'Ho Chi Minh'
        }
      ],
      searchData: {
        departure: '',
        destination: ''
      }
      
    }
  }

  Dialog = () => {
    this.setState({
      open: true
    });
  }

  handleChange = (newValue) => {
    this.setState({
       value : newValue,
    });
  };
  
  render() {
    const { value } = this.state;
    const { departure, destination } = this.state.searchData;

    return (
      <>
        <div id="search-Ticket-Box">
          <Box
            className="search-Ticket"


          />
          <div className="text-Field">
            <TextField id="outlined-basic" label="" value={departure.province} variant="outlined" onClick={this.Dialog} />
            <TextField id="outlined-basic" label="" value={departure.province} variant="outlined" onClick={this.Dialog} />
          </div>
         <div>
         <Stack spacing={3}>
        <DesktopDatePicker
          label="Date desktop"
          inputFormat="dd/MM/yyyy"
          value={value} 
          onChange={this.handleChange}  
          renderInput={(params) => <TextField {...params} />}
        />
         </Stack>
         </div>
        </div>
      </>

    );
  }
}
