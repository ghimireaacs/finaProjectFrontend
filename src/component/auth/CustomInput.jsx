import { ThemeProvider } from "@mui/material/styles";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  
 
} from "@mui/material";
// import createTheme from "@mui/material/styles/createTheme";
import { createTheme } from '@mui/material/styles';


import React from "react";
const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "15px",
        },
      },
    },
  },
});

export const CustomInput = ({ ...input }) => {
  return (
    <>
      <ThemeProvider theme={theme}>
        
        <TextField
          margin= {input.label && "normal"}
          required
          fullWidth
          {...input}
          autoComplete="current-password"
          variant="outlined"
         
        />
      </ThemeProvider>
    </>
  );
};

export const CustomSelect = ({ input, value, onChange }) => {
  const { option, label, ...rest } = input;

  return (
    <>
      <Box sx={{ minWidth: 120 }}>
        <ThemeProvider theme={theme}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">{label}</InputLabel>
            <Select value={value} label={label} {...rest} onChange={onChange}>
              {option?.map((item) => {
                return (
                  <MenuItem key={item.name} value={item.name}>
                    {item.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </ThemeProvider>
      </Box>
    </>
  );
};
