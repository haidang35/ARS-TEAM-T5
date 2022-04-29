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
import userService from '../../Shared/Services/UserService';
import DeleteUser from '../DeleteUser/DeleteUser';
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";


const columns = [
  { id: 'id', label: 'Id', minWidth: 80 },
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'phoneNumber', label: 'PhoneNumber', minWidth: 100 },
  {
    id: 'email',
    label: 'Email',
    minWidth: 150,
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'address',
    label: 'Address',
    minWidth: 100,
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'edit', label: 'Edit', minWidth: 80,
    align: 'left',
  }

];

function createData(id, name, phoneNumber, email, address, edit) {
  return { id, name, phoneNumber, email, address,  edit };
}

const rows = [
  createData('1', 'Vietnam Airline', 'VN', 'Viet Nam', 'Bong sen vang',),
  createData('2', 'Bamboo Airways', 'QH', 'Viet Nam', 'Cay tre',),
  createData('3', 'Vietravel Airlines', 'VU', 'Viet Nam', 'Viettravel')
];

export default function UserList() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [userList, setUserList] = useState([]);
  const [userListApi, setUserListApi] = useState([]);
  const [msg, setMsg] = useState('');
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    getUserList();
    getMsg();
  }, []);
  useEffect(() => {
    setUserList(userListApi.filter((user) => {
      return (user.Name.toLowerCase()).includes(searchValue.toLowerCase());
    }));
  }, [searchValue]);

  const getUserList = async () => {
    await userService
     .getUserList()
     .then((res) => {
        setUserList(res.data);
        setUserListApi(res.data);
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
  const onDeleteUser = async (user) => {
    await  userService.deleteUser(user.Id)
    .then((res) => {
        console.log('success', res.data);
        //Handle when success
        getUserList();
        setMsg({
          type: 'success',
          content: `Delete user  ${user.Name} successful !`
        });
       
    })
    .catch((err) => {
        console.log(err);
        //Handle when catching error
        setMsg({
          type: 'error',
          content: `Delete user ${user.Name} failed !`
        });
    })
  }

  return (
    <>
      <div id='airline'>
        <Paper sx={{ width: '100%' }}>
          <Typography variant="h4" component="div" gutterBottom>
            User
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
                        width: 250,
                      }}
                    >
                      <IconButton sx={{ p: "10px" }} aria-label="menu">
                        <MenuIcon />
                      </IconButton>
                      <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search  Username "
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
                    <Link to={"/admin/users/create"}>
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
                {userList
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={user.Id}>
                        <TableCell>
                          {user.Id}
                        </TableCell>
                        <TableCell>
                          {user.Name}
                        </TableCell>
                        <TableCell>
                          {user.PhoneNumber}
                        </TableCell>
                        <TableCell>
                          {user.Email}
                        </TableCell>
                        <TableCell>
                          {user.Address}
                        </TableCell>
                        <TableCell>
                          <Link to={`/admin/users/${user.Id}`}>
                            <IconButton aria-label="edit-icon">
                              <EditIcon />
                            </IconButton>
                          </Link>
                          <DeleteUser user={user} onDeleteUser={onDeleteUser} />
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