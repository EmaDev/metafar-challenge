import * as React from "react";
import { Box, InputAdornment, TextField } from "@mui/material";

interface ISearchFieldProps {
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchIcon = () => (
  <Box
    component="span"
    sx={{ display: "inline-flex", color: "#9ca3af", alignItems: "center" }}
  >
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="7" />
      <line x1="16.65" y1="16.65" x2="21" y2="21" />
    </svg>
  </Box>
);

const SearchField: React.FC<ISearchFieldProps> = ({
  placeholder,
  value,
  onChange,
}) => (
  <TextField
    placeholder={placeholder}
    variant="outlined"
    value={value}
    onChange={onChange}
    fullWidth
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      ),
    }}
    sx={{
      "& .MuiOutlinedInput-root": {
        backgroundColor: "#f6f7f9",
        borderRadius: 2,
        "& fieldset": {
          borderColor: "transparent",
        },
        "&:hover fieldset": {
          borderColor: "#d1d5db",
        },
        "&.Mui-focused fieldset": {
          borderColor: "#9ca3af",
        },
      },
      "& .MuiOutlinedInput-input": {
        padding: "12px 0",
      },
    }}
  />
);

export default SearchField;
