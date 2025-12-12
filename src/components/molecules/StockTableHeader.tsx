import React from 'react';
import { Box, Typography, styled } from '@mui/material';

const HeaderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1.5, 3),
  backgroundColor: theme.palette.grey[100],
  borderBottom: `1px solid ${theme.palette.divider}`,
  position: 'sticky',
  top: 0,
  zIndex: 10,
  width: '100%',
  boxSizing: 'border-box',
}));

const HeaderCell = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.text.secondary,
  fontSize: '0.875rem',
}));

export const StockTableHeader: React.FC = () => {
  return (
    <HeaderContainer>
      <Box width="25%">
        <HeaderCell>Símbolo</HeaderCell>
      </Box>
      <Box width="50%">
        <HeaderCell>Nombre</HeaderCell>
      </Box>
      <Box width="15%">
        <HeaderCell>Moneda</HeaderCell>
      </Box>
      <Box width="10%">
        <HeaderCell>Tipo</HeaderCell>
      </Box>
    </HeaderContainer>
  );
};