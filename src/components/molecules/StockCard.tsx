import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  styled,
  CardActionArea
} from "@mui/material";
import { IStock } from "../../types";
import { ListChildComponentProps } from "react-window";
import { Link as RouterLink } from "react-router-dom";
import { getStockTypeMeta } from "../../helpers";

const CardWrapper = styled('div')({
  padding: '8px',
  boxSizing: 'border-box',
});

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    transform: 'scale(1.02)',
    boxShadow: theme.shadows[4],
  },
}));

export const StockCard: React.FC<
  ListChildComponentProps<{ items: IStock[]; onHover?: (symbol: string) => void }>
> = ({ index, style, data }) => {
  const stock = data.items[index];
  const typeMeta = stock ? getStockTypeMeta(stock.type) : null;

  if (!stock) return <div style={style} />;

  return (
    <div style={style} onMouseEnter={() => data.onHover?.(stock.symbol)}>
      <CardWrapper style={{ height: '100%' }}>
        <StyledCard
          variant="outlined"
        >
          <CardActionArea
            component={RouterLink}
            to={`/stock/${stock.symbol}`}
            sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch', justifyContent: 'center' }}
          >
            <CardContent sx={{ pb: '16px !important' }}>
              <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
                <Box>
                  <Typography variant="h6" component="div" color="primary" fontWeight="bold">
                    {stock.symbol}
                  </Typography>
                  <Typography variant="body2" color="text.primary" noWrap sx={{ maxWidth: 200 }}>
                    {stock.name}
                  </Typography>
                </Box>
                <Chip label={stock.currency} size="small" variant="outlined" />
              </Box>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                  textTransform: "uppercase",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Chip
                  label={typeMeta?.label || stock.type}
                  size="small"
                  sx={{
                    height: 22,
                    fontWeight: 700,
                    color: typeMeta?.color,
                    backgroundColor: typeMeta?.backgroundColor,
                    textTransform: "none",
                  }}
                />
              </Typography>
            </CardContent>
          </CardActionArea>
        </StyledCard>
      </CardWrapper>
    </div>
  );
};
