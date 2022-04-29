import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from "axios";
import { Link, useLocation } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import PreviewIcon from '@mui/icons-material/Preview';
import bookingService from '../../Shared/Service/BookingService';
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import DirectionsIcon from "@mui/icons-material/Directions";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import airlineService from '../../../Airline/Shared/Services/AirlineService';


const columns = [
  { id: 'id', label: 'Id', minWidth: 80 },
  { id: 'userId', label: 'User', minWidth: 100 },
  { id: 'bookingCode', label: 'BookingCode', minWidth: 100 },
  
  {
    id: 'contactPhone',
    label: 'ContactPhone',
    minWidth: 100,
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'status',
    label: 'Status',
    minWidth: 100,
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'createdAt',
    label: 'CreatedAt',
    minWidth: 100,
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'edit', label: 'Edit', minWidth: 80,
    align: 'left',
  }

];

function createData(id, userId, bookingCode,  contactPhone, status, createdAt, edit) {
  return { id, userId, bookingCode,contactPhone, status, createdAt, edit };
}

const rows = [
  createData('1', 'Vietnam Airline', 'VN', 'Viet Nam', 'Bong sen vang',),
  createData('2', 'Bamboo Airways', 'QH', 'Viet Nam', 'Cay tre',),
  createData('3', 'Vietravel Airlines', 'VU', 'Viet Nam', 'Viettravel')
];

const FILTER_TYPE = {
  AIRLINE: 1,
}

export default function BookingList() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [bookingList, setBookingList] = useState([]);
  const [bookingListAPI, setBookingListAPI] = useState([]);
  const [bookingTicket, setBookingTicket] = useState([]);
  const [msg, setMsg] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterByAirlineId, setFilterByAirId] = useState(0);
  const [airlineList, setAirlineList] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    getBookingList();
    getMsg();
  }, []);


  useEffect(() => {
    const bookingList = bookingListAPI.filter((booking) => {
      if(filterType === FILTER_TYPE.AIRLINE) {
        return booking.BookingTickets[0].Ticket.Flight.AirlineId == filterByAirlineId
      }
    });
    setBookingList(bookingList);
  }, [filterByAirlineId]);

  useEffect(() =>{
    setBookingList(bookingListAPI.filter((booking) => {
      return(booking.BookingCode.toLowerCase()).includes(searchValue.toLowerCase())
    }));
  },[searchValue]);

  const getBookingList = async () => {
    await bookingService
      .getBookingList()
      .then((res) => {
        setBookingList(res.data);
        setBookingListAPI(res.data);
        console.log("🚀 ~ file: BookingList.jsx ~ line 124 ~ .then ~ res.data", res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  let location = useLocation();

  const getMsg = () => {
    if (typeof location.state !== 'undefined') {
      let isHasMessage = false;
      Object.keys(location.state).forEach(key => {
        if (key === 'message') isHasMessage = true;
      });
      if (isHasMessage) {
        setMsg(location.state.message);
      }
    }
  }

 const handleChangeFilterType = async (ev) => {
  setFilterType(ev.target.value);
  if(ev.target.value == FILTER_TYPE.AIRLINE) {
    await airlineService.getAirlineList()
      .then((res) => {
        setAirlineList(res.data);
      })
  }
 }

  return (
    <>
      <div id='booking'>
    
        <Paper sx={{ width: '100%' }}>
          <Typography variant="h4" component="div" gutterBottom>
            Booking
          </Typography>
      
          <TableContainer sx={{ maxHeight: 440 }}>
            {
              msg !== '' ? <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert severity={msg.type}>{msg.content}</Alert>
              </Stack> : ''
            }
               
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                <TableCell align="center" colSpan={3}>
                    <Paper
                      component="form"
                      sx={{
                        p: "2px 4px",
                        display: "flex",
                        alignItems: "center",
                        width: 300,
                      }}
                    >
                      <IconButton sx={{ p: "10px" }} aria-label="menu">
                        <MenuIcon />
                      </IconButton>
                      <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search BookingCode"
                        inputProps={{ "aria-label": "search google maps" }}
                        value={searchValue}
                        onChange={(ev) => setSearchValue(ev.target.value)}
                      />
                      <IconButton
                        type="button"
                        sx={{ p: "10px" }}
                        aria-label="search"
                      >
                        <SearchIcon />
                      </IconButton>
                      <Divider
                        sx={{ height: 28, m: 0.5 }}
                        orientation="vertical"
                      />
                    </Paper>
                  </TableCell>
                <TableCell colSpan={6} align="center">
                    <FormControl sx={{ m: 1, width: 300, right: 150 }}>
                      <InputLabel id="demo-multiple-name-label">
                        Select
                      </InputLabel>
                      <Select
                        id="select"
                        value={filterType}
                        onChange={handleChangeFilterType}
                        input={<OutlinedInput label="Select" />}
                      >
                        <MenuItem
                            value={FILTER_TYPE.AIRLINE}
                          >
                            Airlines 
                          </MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, width: 300, right: 150 }}>
                      <InputLabel id="demo-multiple-name-label">
                        Airline
                      </InputLabel>
                      <Select
                        id="airline"
                        value={filterByAirlineId}
                        onChange={(ev) => setFilterByAirId(+ev.target.value) }
                        input={<OutlinedInput label="Select" />}
                      >
                        {airlineList.map((airline) => (
                          <MenuItem
                            key={airline.Id}
                            value={airline.Id}
                          >
                            {airline.Name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, top: 10, right: 150 }}>
                      <Button variant="contained" startIcon={<SearchIcon />}>
                        Search
                      </Button>
                    </FormControl>
                  </TableCell>

                 
                  <TableCell align="right" colSpan={4}>
                  View 
                  </TableCell>
                </TableRow>
                <TableRow >
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ top: 57, minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {bookingList
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((booking) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={booking.Id}>
                        <TableCell>
                          {booking.Id}
                        </TableCell>
                        <TableCell>
                          {booking.ContactName }  
                        </TableCell>
                        <TableCell>
                          {booking.BookingCode}
                        </TableCell>
                        <TableCell>
                          {booking.ContactPhone}
                        </TableCell>
                        <TableCell>
                          {booking.Status === 1 ? 'Deactive' :'Active'}
                        </TableCell>
                        <TableCell>
                          {booking.CreatedAt}
                        </TableCell>
                        <TableCell>
                          <Link to={`/admin/bookings/details/${booking.Id}`}>
                            <IconButton aria-label="edit-icon">
                              <PreviewIcon/>
                            </IconButton>
                            <Link to={`/admin/bookings/${booking.Id}`}>
                            <IconButton aria-label="edit-icon">
                              <EditIcon />
                            </IconButton>
                          </Link>
                          </Link>
                        </TableCell>
                      </TableRow>

                    );
                  })}
              </TableBody>

            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </>

  );
}