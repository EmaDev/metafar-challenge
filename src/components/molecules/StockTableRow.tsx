import React from "react";
import { Box, Typography } from "@mui/material";
import { IStock } from "../../types";
import { ListChildComponentProps } from "react-window";
import { getStockTypeMeta } from "../../utils/helpers";
import { RowContainer } from "../styled/stockTableRow.styled";

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
