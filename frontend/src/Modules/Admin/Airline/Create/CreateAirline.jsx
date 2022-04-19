import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Stack } from '@mui/material';

export default function FormCreateAirline() {
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
          
          id="standard-disabled"
          label="Name"
         
          variant="standard"
        />
        <TextField
          id="standard-password-input"
          label="Code"
          
          variant="standard"
        />
        <TextField
          id="standard-read-only-input"
          label="Country"
          
          variant="standard"
        />
        <TextField
          id="standard-number"
          label="Logo"
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