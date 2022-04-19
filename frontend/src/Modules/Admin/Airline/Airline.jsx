import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const columns = [
  { id: 'id', label: 'Id', minWidth: 80 },
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'code', label: 'Code', minWidth: 100 },
  {
    id: 'country',
    label: 'Country',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'logo',
    label: 'Logo',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'createdAt',
    label: 'CreatedAt',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'updatedAt',
    label: 'UpdatedAt',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
];

function createData(id, name, code, country, logo, createdAt, updatedAt) {
  return { id, name, code, country, logo, createdAt, updatedAt };
}

const rows = [
  createData('1', 'VnAirline', 'VN001', 'VietNam', 'Ari123', '16/4/2022', '16/4/2022'),
  createData('2', 'VnAirline', 'VN002', 'Canada', 'Ari123', '16/4/2022', '16/4/2022'),
  createData('3', 'VnAirline', 'VN003', 'Russia', 'Ari123', '16/4/2022', '16/4/2022'),
  createData('4', 'BamBoo', 'BM004', 'VietNam', 'Ari123', '16/4/2022', '16/4/2022'),
  createData('5', 'VnAirline', 'VN004', 'Italy', 'Ari123', '16/4/2022', '16/4/2022'),
  createData('6', 'BamBoo', 'BM006', 'VietNam', 'Ari123', '16/4/2022', '16/4/2022'),
  createData('7', 'VnAirline', 'VN005', 'Brazil', 'Ari123', '16/4/2022', '16/4/2022'),
  createData('8', 'Vietjet', 'VJ008', 'VietNam', 'Ari123', '16/4/2022', '16/4/2022'),
  createData('9', 'VnAirline', 'VN006', '126577691', 'Ari123', '16/4/2022', '16/4/2022'),
  createData('10', 'Vietjet', 'VJ0010', 'VietNam', 'Ari123', '16/4/2022', '16/4/2022'),
  createData('11', 'Vietjet', 'VJ0011', 'VietNam', 'Ari123', '16/4/2022', '16/4/2022'),
  createData('12', 'Vietjet', 'VJ0012', 'VietNam', 'Ari123', '16/4/2022', '16/4/2022'),
  createData('13', 'VnAirline', 'VN007', 'Lao', 'Ari123', '16/4/2022', '16/4/2022'),
  createData('14', 'VnAirline', 'VN008', 'Campuchia', 'Ari123', '16/4/2022', '16/4/2022'),
  createData('15', 'VnAirline', 'VN009', 'Thailan', 'Ari123', '16/4/2022', '16/4/2022'),
];

export default function AirlineTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <>
      <div id="airline-admin">
        <Stack direction="row" spacing={3} sx={{ marginLeft: 100 }}>
          <div className="button" >
            <Link to="/admin/airlines/update-airline"> <Button color="secondary" sx={{ border: 1 }}>Update</Button></Link>
            <Link to="/admin/airline/create-airline"><Button variant="contained" color="success">
              Create
            </Button></Link>
            <Button variant="outlined" color="error">
              Delete
            </Button>
          </div>
        </Stack>
        <div className="table-airline">
          <Paper sx={{ width: '100%' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" colSpan={3}>
                      Country
                    </TableCell>
                    <TableCell align="center" colSpan={4}>
                      Details
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
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === 'number'
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            );
                          })}
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
      </div>
    </>

  );
}