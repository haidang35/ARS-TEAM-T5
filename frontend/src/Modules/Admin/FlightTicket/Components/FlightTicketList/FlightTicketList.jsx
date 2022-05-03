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
import flightTicketService from '../../Shared/Service/FlightTicketService';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { Link, useLocation } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import DeleteFlightTicket from '../DeleteFlightTicket/DeleteFlightTicket';
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";

const columns = [
  { id: 'id', label: 'Id', minWidth: 80 },
  {
    id: 'flight',
    label: 'Flight',
    minWidth: 100,
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'ticketType',
    label: 'Ticket Type',
    minWidth: 150,
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'availableClass ',
    label: 'Available Class',
    minWidth: 100,
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'price ',
    label: 'Price',
    minWidth: 100,
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'status ',
    label: 'Status',
    minWidth: 100,
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'edit', label: 'Edit', minWidth: 80,
    align: 'left',
  }

];

function createData( flight,ticketType, availableClass, price, status) {
  return { flight, ticketType, availableClass, price, status };
}

const rows = [
  createData('1', 'Vietnam Airline', 'VN', 'Viet Nam', 'Bong sen vang',),
  createData('2', 'Bamboo Airways', 'QH', 'Viet Nam', 'Cay tre',),
  createData('3', 'Vietravel Airlines', 'VU', 'Viet Nam', 'Viettravel')
];

export default function FlightTicketList() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [FlightTicketList, setFlightTicketList] = useState([]);
  const [flightTicketListApi, setFlightTicketListApi] = useState([]);
  const [msg, setMsg] = useState('');
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    getFlightTicketList();
    getMsg();
  }, []);
  useEffect(() => {
    setFlightTicketList(flightTicketListApi.filter((flightTicket) => {
      return (flightTicket.Flight.FlightCode.toLowerCase()).includes(searchValue.toLowerCase());
    }));
  }, [searchValue]);

  const getFlightTicketList = async () => {
    await flightTicketService
      .getFlightTicketList()
      .then((res) => {
        setFlightTicketList(res.data);
        setFlightTicketListApi(res.data);
        
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

  const onDeleteFlightTicket = async (flightTicket) => {
    await flightTicketService.deleteFlightTicket(flightTicket.Id)
    .then((res) => {
        console.log('success', res.data);
        //Handle when success
        getFlightTicketList();
        setMsg({
          type: 'success',
          content: `Delete flight ticket ${flightTicket.Flight.FlightCode} successful !`
        });
       
    })
    .catch((err) => {
        console.log(err);
        //Handle when catching error
        setMsg({
          type: 'error',
          content: `Delete flight ticket ${flightTicket.Flight.FlightCode} failed !`
        });
    })
  }

  return (
    <>
      <div id='flightticket'>
        <Paper sx={{ width: '100%' }}>
          <Typography variant="h4" component="div" gutterBottom>
            Flight Ticket
          </Typography>
          <TableContainer sx={{ maxHeight:1000}}>
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
                        width: 250,
                      }}
                    >
                      <IconButton sx={{ p: "10px" }} aria-label="menu">
                        <MenuIcon />
                      </IconButton>
                      <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search  Flight Ticket "
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
                  <TableCell align="right" colSpan={12}>
                    <Link to={"/admin/flight-tickets/create"}>
                      <Button variant="contained" startIcon={< AddCircleIcon />}>
                        Add New
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
                <TableRow>
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
                {FlightTicketList
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((flightTicket) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={flightTicket.code}>
                        <TableCell>
                          {flightTicket.Id}
                        </TableCell>
                         <TableCell>
                          {flightTicket.Flight.FlightCode}
                        </TableCell>
                        <TableCell>
                          {flightTicket.TicketType}
                        </TableCell>
                        <TableCell>
                          {flightTicket.AvailableClass}
                        </TableCell>
                        <TableCell>
                          {flightTicket.Price}
                        </TableCell>
                        <TableCell>
                        <TableCell>
                        {flightTicket.Status === 1 ? (
                          <Button variant="contained" color="error">
                            Deactive
                          </Button>
                        ) : (
                          <Button variant="contained" color="success">
                            Active
                          </Button>
                        )}
                      </TableCell>
                        </TableCell>
                        <TableCell>
                        <Link to={`/admin/flightTickets/${flightTicket.Id}`}>
                            <IconButton aria-label="edit-icon">
                              <EditIcon />
                            </IconButton>
                          </Link>
                          <DeleteFlightTicket flightTicket={flightTicket} onDeleteFlightTicket={onDeleteFlightTicket}/>
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