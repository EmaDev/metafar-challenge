import React from "react";
import { Box, Typography, styled } from "@mui/material";
import { IStock } from "../../types";
import { ListChildComponentProps } from "react-window";
import { Link as RouterLink } from "react-router-dom";
import { getStockTypeMeta } from "../../helpers";

const RowContainer = styled(RouterLink)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),
  borderBottom: `1px solid ${theme.palette.divider}`,
  boxSizing: "border-box",
  cursor: "pointer",
  transition: "background-color 0.2s",
  color: "inherit",
  textDecoration: "none",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    textDecoration: "none",
  },
}));

export const StockTableRow: React.FC<
  ListChildComponentProps<{ items: IStock[]; onHover?: (symbol: string) => void }>
> = ({ index, style, data }) => {
  const stock = data.items[index];
  const typeMeta = stock ? getStockTypeMeta(stock.type) : null;
  
  if (!stock) return <div style={style} />;

  return (
    <RowContainer
      style={style}
      onMouseEnter={() => data.onHover?.(stock.symbol)}
      to={`/stock/${stock.symbol}`}
    >
      <Box width="25%">
        <Typography
          variant="body2"
          fontWeight="bold"
          sx={{ fontFamily: "monospace", color: "inherit", textDecoration: "none" }}
        >
          {stock.symbol}
        </Typography>
      </Box>
      <Box width="50%">
        <Typography variant="body2" noWrap sx={{ pr: 2 }}>
          {stock.name}
        </Typography>
      </Box>
      <Box width="15%">
        <Typography variant="body2" color="text.secondary">
          {stock.currency}
        </Typography>
      </Box>
      <Box width="10%">
        <Typography
          variant="body2"
          fontWeight={700}
          noWrap
          sx={{
            color: typeMeta?.color || "text.secondary",
            backgroundColor: typeMeta?.backgroundColor || "transparent",
            px: 1,
            py: 0.5,
            borderRadius: 999,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {typeMeta?.label || stock.type}
        </Typography>
      </Box>
    </RowContainer>
  );
};
