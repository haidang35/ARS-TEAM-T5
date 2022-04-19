import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Stack } from '@mui/material';

export default function FormCreateFlight() {
  return (
      <>
          <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          required
          id="standard-required"
          label="Id"
          
          variant="standard"
        />
        <TextField
          required
          id="standard-disabled"
          label="Code"
         
          variant="standard"
        />
        <TextField
          required
          id="standard-password-input"
          label="Province"
          
          variant="standard"
        />
        <TextField
          required
          id="standard-read-only-input"
          label="CityCode"
          
          variant="standard"
        />
        <TextField
          required  
          id="standard-number"
          label="AirportNam
          e"
          variant="standard"
        />
      </div>
    </Box>
    <div className="stack">
    <Stack direction="row" spacing={3}>
        <Button variant="outlined" color="error">
              Create
            </Button>
    </Stack>
    </div>
    
      </>
  );
}