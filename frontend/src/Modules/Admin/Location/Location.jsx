import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

const columns = [
    { id: 'id', label: 'Id', minWidth: 80 },
    { id: 'city', label: 'City', minWidth: 170 },
    { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
    {
      id: 'province',
      label: 'Province',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'cityCode',
      label: 'CityCode',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'airportName',
      label: 'AirportName',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
  ];

  function createData(id, city , code, province, cityCode, airportName) {
    return { id, city, code, province, cityCode, airportName };
  }
  
  const rows = [
    createData('1','India', 'IN', 'alo', 3287263,'VnAirline'),
    createData('1','China', 'CN', '1403500365', 9596961,'VnAirline'),
    createData('1','Italy', 'IT', '60483973', 301340,'VnAirline'),
    createData('1','United States', 'US', '327167434', 9833520,'VnAirline'),
    createData('1','Canada', 'CA', '37602103', 9984670,'VnAirline'),
    createData('1','Australia', 'AU', '25475400', 7692024,'VnAirline'),
    createData('1','Germany', 'DE', '83019200', 357578,'VnAirline'),
    createData('1','Ireland', 'IE', '4857000', 70273,'VnAirline'),
    createData('1','Mexico', 'MX', '126577691', 1972550,'VnAirline'),
    createData('1','Japan', 'JP', '126317000', 377973,'VnAirline'),
    createData('1','France', 'FR', '67022000', 640679,'VnAirline'),
    createData('1','United Kingdom', 'GB', '67545757', 242495,'VnAirline'),
    createData('1','Russia', 'RU', '146793744', 17098246,'VnAirline'),
    createData('1','Nigeria', 'NG', '200962417', 923768,'VnAirline'),
    createData('1','Brazil', 'BR', '210147125', 8515767,'VnAirline'),
  ];

export default function LocationTable() {
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
      <Paper sx={{ width: '100%' }}>
      <Typography variant="h4" component="div" gutterBottom>
        Location
      </Typography>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={3}>
                Country
              </TableCell>
              <TableCell align="center" colSpan={3}>
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
      </>
    
  );
}