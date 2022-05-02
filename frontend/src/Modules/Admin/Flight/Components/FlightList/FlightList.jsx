import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "./FlightList.scss";
import axios from "axios";
import flightService from "../../Shared/Services/FlightService";
import IconButton from "@mui/material/IconButton";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { Link, useLocation } from "react-router-dom";
import DeleteFlight from "../DeleteFlight/DeleteFlight";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";  

const columns = [
  { id: "id", label: "Id", minWidth: 80 },
  {
    id: "flightCode",
    label: "FlightCode",
    minWidth: 100,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "departure",
    label: "Departure",
    minWidth: 150,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "destination",
    label: "Destination",
    minWidth: 100,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "airline ",
    label: "Airline",
    minWidth: 100,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "status ",
    label: "Status",
    minWidth: 100,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "edit",
    label: "Edit",
    minWidth: 80,
    align: "left",
  },
];

function createData(flightCode, departure, destination, airline, status) {
  return { flightCode, departure, destination, airline, status };
}

const rows = [
  createData("1", "Vietnam Airline", "VN", "Viet Nam", "Bong sen vang"),
  createData("2", "Bamboo Airways", "QH", "Viet Nam", "Cay tre"),
  createData("3", "Vietravel Airlines", "VU", "Viet Nam", "Viettravel"),
];

export default function FlightList() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [flightList, setFlightList] = useState([]);
  const [flightListAPI, setFlightListAPI] = useState([]);
  const [msg, setMsg] = useState("");
  const [searchValue, setSearchValue] = useState("");



  useEffect(() => {
    getFlightList();
    getMsg();
  }, []);
  
  useEffect(() =>{
    setFlightList(flightListAPI.filter((flight) => {
      return(flight.FlightCode.toLowerCase()).includes(searchValue.toLowerCase())
    }));
  },[searchValue]);

  const getFlightList = async () => {
    await flightService
      .getFlightList()
      .then((res) => {
        setFlightList(res.data);
        setFlightListAPI(res.data);
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
    if (typeof location.state !== "undefined") {
      let isHasMessage = false;
      Object.keys(location.state).forEach((key) => {
        if (key === "message") isHasMessage = true;
      });
      if (isHasMessage) {
        setMsg(location.state.message);
      }
    }
  };
  const onDeleteFlight = async (flight) => {
    await flightService
      .deleteFlight(flight.Id)
      .then((res) => {
        console.log("success", res.data);
        //Handle when success
        getFlightList();
        setMsg({
          type: "success",
          content: `Delete flight  ${flight.FlightCode} successful !`,
        });
      })
      .catch((err) => {
        console.log(err);
        //Handle when catching error
        setMsg({
          type: "error",
          content: `Delete flight  ${flight.FlightCode} failed !`,
        });
      });
  };

  return (
    <>
      <div id="Flight">
        <Paper sx={{ width: "100%" }}>
          <Typography variant="h4" component="div" gutterBottom>
            Flight
          </Typography>
          <TableContainer sx={{ maxHeight: 440 }}>
            {msg !== "" ? (
              <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert severity={msg.type}>{msg.content}</Alert>
              </Stack>
            ) : (
              ""
            )}

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
                        placeholder="Search Flight Code"
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
                    <Link to={"/admin/flights/create"}>
                      <Button variant="contained" startIcon={<AddCircleIcon />}>
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
                {flightList.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                ).map((flight) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={flight.code}
                    >
                      <TableCell>{flight.Id}</TableCell>
                      <TableCell>{flight.FlightCode}</TableCell>
                      <TableCell>{flight.Departure.City.Name}</TableCell>
                      <TableCell>{flight.Destination.City.Name}</TableCell>
                      <TableCell>{flight.Airline.Name}</TableCell>
                      <TableCell>
                        {flight.Status === 1 ? (
                          <Button variant="contained" color="error">
                            Deactive
                          </Button>
                        ) : (
                          <Button variant="contained" color="success">
                            Active
                          </Button>
                        )}
                      </TableCell>
                      <TableCell>
                        <Link to={`/admin/flights/${flight.Id}`}>
                          <IconButton aria-label="edit-icon">
                            <EditIcon />
                          </IconButton>
                        </Link>
                        <DeleteFlight
                          flight={flight}
                          onDeleteFlight={onDeleteFlight}
                        />
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
