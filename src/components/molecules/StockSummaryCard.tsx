import React from "react";
import { Chip, Stack, Typography } from "@mui/material";
import { getCurrencyLabel, getStockTypeMeta } from "../../utils/helpers";
import { IStock } from "../../types";
import { SectionCard } from "../atoms";
import { MetaRow, Description } from "../styled/stockSummaryCard.styled";

interface StockSummaryCardProps {
  stock?: IStock | null;
  symbol: string;
}

const StockSummaryCard: React.FC<StockSummaryCardProps> = ({
  stock,
  symbol,
}) => {
  const typeMeta = getStockTypeMeta(stock?.type);
  const currency = getCurrencyLabel(stock?.currency);
  const name = stock?.name || symbol;

  return (
    <SectionCard>
      <Typography
        variant="h5"
        fontWeight={700}
        sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}
      >
        {name} ({symbol})
      </Typography>
      <MetaRow>
        <Chip
          size="small"
          label={typeMeta.label}
          sx={{
            color: typeMeta.color,
            backgroundColor: typeMeta.backgroundColor,
            fontWeight: 700,
          }}
        />
        <Typography variant="body2" color="text.secondary">
          Moneda: {currency}
        </Typography>
      </MetaRow>
      <Stack spacing={1}>
        <Description>
          Esta es una descripción detallada de {symbol} y su rendimiento historico a lo largo del tiempo.
        </Description>
      </Stack>
    </SectionCard>
  );
};

export default StockSummaryCard;
