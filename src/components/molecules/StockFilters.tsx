import React from 'react';
import { Box, TextField, InputAdornment, IconButton, Tooltip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

interface StockFiltersProps {
  searchName: string;
  setSearchName: (val: string) => void;
  searchSymbol: string;
  setSearchSymbol: (val: string) => void;
}

export const StockFilters: React.FC<StockFiltersProps> = ({
  searchName,
  setSearchName,
  searchSymbol,
  setSearchSymbol
}) => {
  const clearFilters = () => {
    setSearchName('');
    setSearchSymbol('');
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
      <TextField
        label="Buscar por Nombre"
        variant="outlined"
        fullWidth
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        label="Buscar por Símbolo"
        variant="outlined"
        fullWidth
        value={searchSymbol}
        onChange={(e) => setSearchSymbol(e.target.value)}
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          ),
        }}
      />
      <Box display="flex" alignItems="center">
        <Tooltip title="Limpiar filtros">
          <IconButton onClick={clearFilters} color="default">
            <ClearIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};
