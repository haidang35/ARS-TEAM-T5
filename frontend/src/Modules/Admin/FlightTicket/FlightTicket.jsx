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
import { Link, useLocation } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import flightTicketService from './Share/Service/FlightTicketService';

const columns = [
  { id: 'id', label: 'Id', minWidth: 80 },
  { id: 'flightcode', label: 'Flightcode', minWidth: 100 },
  { id: 'departureTime', label: 'DepartureTime', minWidth: 50 },
  {
    id: 'arrivalTime',
    label: 'arrivalTime',
    minWidth: 150,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'departureId',
    label: 'DepartureId',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'destinationId',
    label: 'DestinationId',
    minWidth: 100,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'capacity',
    label: 'Capacity',
    minWidth: 130,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'airlineId',
    label: 'AirlineId',
    minWidth: 130,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'ticketId',
    label: 'TicketId',
    minWidth: 130,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'aircraft',
    label: 'aircraft',
    minWidth: 130,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'status',
    label: 'status',
    minWidth: 130,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'createdAt',
    label: 'CreatedAt',
    minWidth: 130,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'updatedAt',
    label: 'UpdatedAt',
    minWidth: 130,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'edit', label: 'Edit', minWidth: 80,
    align: 'right',
  }

];

function createData(id, flightcode , departureTime, arrivalTime, departureId, destinationId, capacity, businessSeats, deluxeSeats, economySeats,exitSeats, aircraft, seatsReseved,seatsAvaliable, airlineId, ticketId, status, createdAt, updatedAt) {
  return { id, flightcode , departureTime, arrivalTime, departureId, destinationId, capacity, businessSeats, deluxeSeats, economySeats,exitSeats, aircraft, seatsReseved,seatsAvaliable, airlineId, ticketId, status, createdAt, updatedAt };
}

const rows = [
  createData('1', 'Vietnam Airline', 'VN', 'Viet Nam', 'Bong sen vang',),
  createData('2', 'Bamboo Airways', 'QH', 'Viet Nam', 'Cay tre',),
  createData('3', 'Vietravel Airlines', 'VU', 'Viet Nam', 'Viettravel')
];

export default function FlightTicketListList() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [flightTicketList, setFlightTicketList] = useState([]);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    getflightTicketList();
    getMsg();
  }, []);

  const getflightTicketList = async () => {
    await flightTicketService
      .getflightTicketList()
      .then((res) => {
        console.log(res)
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
    if(typeof location.state !== 'undefined') {
      let isHasMessage = false;
       Object.keys(location.state).forEach(key => {
         if(key === 'message') isHasMessage = true;
       });
       if(isHasMessage) {
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
                  <TableCell align="right" colSpan={2 }>
                    <Link to={"/admin/flight-ticket/create"}>
                      <Button variant="contained"  startIcon={< AddCircleIcon />}>
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
                {flightTicketList
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((flightticket) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={flightticket.id}>
                        <TableCell>
                          {flightticket.Id}
                        </TableCell>
                        <TableCell>
                          {flightticket.Flightcode }
                        </TableCell>
                        <TableCell>
                          {flightticket.DepartureTime}
                        </TableCell>
                        <TableCell>
                          {flightticket.ArrivalTime}
                        </TableCell>
                        <TableCell>
                          {flightticket.DestinationId}
                        </TableCell>
                        <TableCell>
                          {flightticket.Capacity}
                        </TableCell>
                        <TableCell>
                          {flightticket.Aircraft}
                        </TableCell>
                        <TableCell>
                          {flightticket.Status}
                        </TableCell>
                        <TableCell>
                          {flightticket.CreatedAt}
                        </TableCell>
                        <TableCell>
                          {flightticket.UpdatedAt}
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