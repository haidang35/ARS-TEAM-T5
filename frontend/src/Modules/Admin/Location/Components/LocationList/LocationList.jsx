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
import UpdateIcon from '@mui/icons-material/Update';
import { Link, useLocation, useParams, withRouter } from 'react-router-dom';
import locationsService from '../../Shared/Services/LocationService';
import IconButton from '@mui/material/IconButton';
import DeleteLocation from '../DeleteLocation/DeleteLocation';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";



const columns = [
  { id: 'id', label: 'Id', minWidth: 80 },
  { id: 'city', label: 'City', minWidth: 100 },
  { id: 'province', label: 'Province', minWidth: 50 },

  {
    id: 'airportName',
    label: 'AirportName',
    minWidth: 100,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'country',
    label: 'Country',
    minWidth: 60,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'edit',
    label: 'Edit',
    minWidth: 100,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
];

function createData(id, city, province, airportName, country, edit) {
  return { id, city, province, airportName, country, edit };
}

export default function LocationList() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [locationList, setLocationList] = useState([]); 
  const [locationListApi, setLocationListApi] = useState([]); 
  const [msg, setMsg] = useState('');
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    getLocationList();
    getMsg();
  }, []);

  useEffect(() => {
    setLocationList(locationListApi.filter((location) => {
      return (location.City.Name.toLowerCase()).includes(searchValue.toLowerCase());
    }));
  }, [searchValue]);
  

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

  const getLocationList = async () => {
    await locationsService.getLocationList()
      .then((res) => {
        setLocationList(res.data);
        setLocationListApi(res.data);
      })
  }
  const onDeleteLocation = async (location) => {
    await locationsService.deleteLocation(location.Id)
    .then((res) => {
        console.log('success', res.data);
        //Handle when success
        getLocationList();
        setMsg({
          type: 'success',
          content: `Delete  location ${location.City.Province.Name} successful !`
        });
       
    })
    .catch((err) => {
        console.log(err);
        //Handle when catching error
        setMsg({
          type: 'error',
          content: `Delete location ${location.City.Province.Name} failed !`
        });
    })
  }

  return (
      <>
      <div id='location'>
        <Paper sx={{ width: '100%' }}>
          <Typography variant="h4" component="div" gutterBottom>
            Location
          </Typography>
          <TableContainer sx={{ maxHeight: 400 }}>
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
                        placeholder="Search  Location "
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
                  <TableCell align="right" colSpan={3}>
                    <Link to={"/admin/locations/create"}>
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
                      style={{ top: 57, minWidth: column.minWidth, textAlign: 'left' }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {locationList
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((location) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={location.code}>
                        <TableCell>
                          {location.Id}
                        </TableCell>
                        <TableCell>
                          {location.City.Name}
                        </TableCell>
                        <TableCell>
                          {location.City.Province.Name}
                        </TableCell>
                        <TableCell>
                          {location.AirPortName}
                        </TableCell>
                        <TableCell>
                          {location.City.Province.Country}
                        </TableCell>
                        <TableCell>
                          
                          <Link to={"/admin/locations/"+location.Id}>
                          <IconButton aria-label="edit-icon">
                              <EditIcon />
                            </IconButton>
                          </Link>
                          <DeleteLocation  location={location} onDeleteLocation={onDeleteLocation}/>
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
