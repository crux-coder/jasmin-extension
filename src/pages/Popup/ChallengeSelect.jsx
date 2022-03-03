import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function ChallengeSelect({ challenges }) {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={challenges}
      fullWidth
      size="small"
      groupBy={(option) => option.section}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
        <TextField {...params} label="Select Challenge" />
      )}
    />
  );
}
