import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDatePicker from '@mui/lab/StaticDatePicker';

export default function Calendar() {
  const [value, setValue] = React.useState(new Date());

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} sx={{ width: 800 }}>
      <StaticDatePicker
        sx={{
          width: 800,
          innerWidth: 800,
          outerWidth: 800,
          innerHeight: 800,
          outerHeight: 800,
        }}
        displayStaticWrapperAs="desktop"
        openTo="year"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          console.log(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
