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
import { Link, useLocation, useParams } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import PreviewIcon from "@mui/icons-material/Preview";
import bookingTicketService from '../../Shared/Services/BookingTicket';


const columns = [
  { id: 'id', label: 'Id', minWidth: 80 },
  { id: 'seatFlightCode', label: 'SeatFlightCode', minWidth: 170 },
  { id: 'passengerName', label: 'PassengerName', minWidth: 100 },
  {
    id: 'passengerBirthday',
    label: 'PassengerBirthday',
    minWidth: 150,
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'seatFlightFee',
    label: 'SeatFlightFee',
    minWidth: 100,
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'edit', label: 'Edit', minWidth: 80,
    align: 'left',
  }

];

function createData(id, seatFlightCode, passengerName, passengerBirthday, seatFlightFee ,edit) {
  return {id, seatFlightCode, passengerName,passengerBirthday, seatFlightFee ,edit };
}

const rows = [
  createData('1', 'Vietnam Airline', 'VN', 'Viet Nam', 'Bong sen vang',),
  createData('2', 'Bamboo Airways', 'QH', 'Viet Nam', 'Cay tre',),
  createData('3', 'Vietravel Airlines', 'VU', 'Viet Nam', 'Viettravel')
];

export default function BookingTicketList() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [bookingTicketList, setBookingTicketList] = useState([]);
  const [msg, setMsg] = useState('');
  const { id } = useParams()
  
  useEffect(() => {
     
    getBookingTicketList();
    // getMsg();
  }, []);

  const getBookingTicketList = async () => {
    const params = {
        bookingId: id
    }
    await bookingTicketService
      .getBookingTicketList(params)
      .then((res) => {
        setBookingTicketList(res.data);
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

//   let location = useLocation();

//   const getMsg = () => {
//     if (typeof location.state !== 'undefined') {
//       let isHasMessage = false;
//       Object.keys(location.state).forEach(key => {
//         if (key === 'message') isHasMessage = true;
//       });
//       if (isHasMessage) {
//         setMsg(location.state.message);
//       }
//     }
//   }
//   const onDeleteAirline = async (airline) => {
//     await  airlineService.deleteAirline(airline.Id)
//     .then((res) => {
//         console.log('success', res.data);
//         //Handle when success
//         getAirlineList();
//         setMsg({
//           type: 'success',
//           content: `Delete airline  ${airline.Name} successful !`
//         });
       
//     })
//     .catch((err) => {
//         console.log(err);
//         //Handle when catching error
//         setMsg({
//           type: 'error',
//           content: `Delete airline ${airline.Name} failed !`
//         });
//     })
//   }

  return (
    <>
      <div id='airline'>
        <Paper sx={{ width: '100%' }}>
          <Typography variant="h4" component="div" gutterBottom>
            Booking Ticket
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
                  <TableCell align="right" colSpan={3}>
                      <Button variant="contained" startIcon={< AddCircleIcon />}>
                        Add New
                      </Button>
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
                {bookingTicketList
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((bookingTicket) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={bookingTicket.Id}>
                        <TableCell>
                          {bookingTicket.Id}
                        </TableCell>
                        <TableCell>
                          {bookingTicket.SeatFlightCode}
                        </TableCell>
                        <TableCell>
                          {bookingTicket.PassengerName}
                        </TableCell>
                        <TableCell>
                          {bookingTicket.PassengerBirthday}
                        </TableCell>
                        <TableCell>
                          {bookingTicket.SeatFlightFee}
                        </TableCell>
                        <TableCell>
                          <Link to={`/admin/booking-tickets/details/${bookingTicket.Id}`}>
                            <IconButton aria-label="edit-icon">
                              <PreviewIcon />
                            </IconButton>
                            <Link to={`/admin/booking-tickets/${bookingTicket.Id}`}>
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