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

const columns = [
  { id: 'id', label: 'Id', minWidth: 80 },
  {
    id: 'flight',
    label: 'Flight',
    minWidth: 100,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'ticketType',
    label: 'Ticket Type',
    minWidth: 150,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'arrivalTime',
    label: 'ArrivalTime',
    minWidth: 100,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'availableClass ',
    label: 'Available Class',
    minWidth: 100,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'price ',
    label: 'Price',
    minWidth: 100,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'status ',
    label: 'Status',
    minWidth: 100,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'edit', label: 'Edit', minWidth: 80,
    align: 'right',
  }

];

function createData( flight,ticketType, arrivalTime, availableClass, price, status) {
  return { flight, ticketType, arrivalTime, availableClass, price, status };
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
  const [msg, setMsg] = useState('');

  useEffect(() => {
    getFlightTicketList();
    getMsg();
  }, []);

  const getFlightTicketList = async () => {
    await flightTicketService
      .getFlightTicketList()
      .then((res) => {
        setFlightTicketList(res.data);
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

  return (
    <>
      <div id='flightticket'>
        <Paper sx={{ width: '100%' }}>
          <Typography variant="h4" component="div" gutterBottom>
            Flight Ticket
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
                  .map((flightticket) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={flightticket.code}>
                        <TableCell>
                          {flightticket.Id}
                        </TableCell>
                         <TableCell>
                          {flightticket.Flight.FlightCode}
                        </TableCell>
                        <TableCell>
                          {flightticket.TicketType}
                        </TableCell>
                        <TableCell>
                          {flightticket.AvailableClass}
                        </TableCell>
                        <TableCell>
                          {flightticket.Price}
                        </TableCell>
                        <TableCell>
                          {flightticket.Status}
                        </TableCell>
                        <TableCell>
                          <EditIcon className='edit-icon' />
                          <DeleteIcon className='delete-icon' />
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