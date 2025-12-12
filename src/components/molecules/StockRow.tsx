import React from 'react';
import { Typography, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

interface StockRowProps {
  symbol: string;
  name: string;
  currency: string;
  type: string;
  style?: React.CSSProperties;
}

export const StockRow: React.FC<StockRowProps> = ({ symbol, name, currency, type, style }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        ...style,
        display: 'grid',
        gridTemplateColumns: '1fr 2fr 1fr 1fr', // 4 Columnas
        alignItems: 'center',
        px: 2,
        borderBottom: '1px solid #e0e0e0',
        '&:hover': { backgroundColor: '#f5f5f5' },
        height: 50, // Altura fija ayuda a la virtualización
        boxSizing: 'border-box'
      }}
    >
      <Link to={`/stock/${symbol}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <Typography variant="body2" fontWeight="bold">{symbol}</Typography>
      </Link>
      <Typography variant="body2" noWrap title={name}>{name}</Typography>
      <Typography variant="body2">{currency}</Typography>
      <Typography variant="body2">{type}</Typography>
    </Paper>
  );
};
