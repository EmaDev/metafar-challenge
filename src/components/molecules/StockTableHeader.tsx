import React from 'react';
import { Box } from '@mui/material';
import { HeaderContainer, HeaderCell } from '../styled/stockTableHeader.styled';

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
