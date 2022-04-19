import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Stack } from '@mui/material';

export default function FormUpdateAirline() {
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
          
          id="standard-required"
          label="Id"
          defaultValue="data"
          variant="standard"
        />
        <TextField
          
          id="standard-disabled"
          label="Name"
          defaultValue="data"
          variant="standard"
        />
        <TextField
          id="standard-password-input"
          label="Code"
          defaultValue="data"
          variant="standard"
        />
        <TextField
          id="standard-read-only-input"
          label="Country"
          defaultValue="data"
          variant="standard"
        />
        <TextField
          id="standard-number"
          label="Logo"
          defaultValue="data"
          variant="standard"
        />
      </div>
    </Box>
    <div className="stack">
    <Stack direction="row" spacing={3}>
        <Button variant="outlined" color="primary">
              Update
            </Button>
    </Stack>
    </div>
    
      </>
  );
}