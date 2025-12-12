import React from "react";
import { Chip, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { getCurrencyLabel, getStockTypeMeta } from "../../helpers";
import { IStock } from "../../types";
import { SectionCard } from "../atoms";

interface StockSummaryCardProps {
  stock?: IStock | null;
  symbol: string;
}

const MetaRow = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1.5),
  marginTop: theme.spacing(0.5),
  marginBottom: theme.spacing(1.5),
  flexWrap: "wrap",
}));

const Description = styled(Typography)(({ theme }) => ({
  color: "#4b5563",
  lineHeight: 1.6,
  maxWidth: 900,
  fontSize: 15,
  [theme.breakpoints.up("md")]: {
    fontSize: 16,
  },
}));

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
