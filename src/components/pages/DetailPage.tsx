import React, { useState, lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Stack,
  Switch,
  TextField,
  Typography,
  Alert,
  Chip,
  CircularProgress,
} from "@mui/material";
import { BackLink, SectionCard } from "../atoms";
import StockSummaryCard from "../molecules/StockSummaryCard";
import PageContainer from "../layout/PageContainer";
import { getCurrentDay, getDateWithOffset } from "../../utils/helpers";
import { useStockMeta } from "../../hooks/queries/useStockMeta";
import { useTimeSeries } from "../../hooks/queries/useTimeSeries";
import StockChartSkeleton from "../molecules/skeletons/StockChartSkeleton";
import { IChartProps } from "../molecules/StockChart";
import { DetailBackground, DetailFiltersRow } from "../styled/detailPage.styled";

const StockChart = lazy<React.FC<IChartProps>>(() => import("../molecules/StockChart"));

const DetailPage: React.FC = () => {
  const { symbol = "MELI" } = useParams<{ symbol?: string }>();
  const [interval, setInterval] = useState<string>("15min");
  const [startDate, setStartDate] = useState<string>(getDateWithOffset(2));
  const [endDate, setEndDate] = useState<string>(getCurrentDay());
  const [autoRefresh, setAutoRefresh] = useState<boolean>(false);
  const {
    data: stockMeta,
    isLoading: loadingMeta,
    isError: metaError,
  } = useStockMeta(symbol);
  const {
    data: stockData,
    isLoading: loadingSeries,
    isFetching: fetchingSeries,
    isError: seriesError,
    error: seriesErrorObj,
    refetch,
  } = useTimeSeries(symbol, interval, startDate, endDate, {
    refetchInterval: autoRefresh
      ? interval === "1min"
        ? 15000
        : interval === "5min"
        ? 30000
        : 60000
      : false,
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    refetch();
  }

  return (
    <DetailBackground>
      <PageContainer>
        <BackLink to="/" label="Volver a la descripción general" />

        <Stack spacing={2.5}>
          {loadingMeta ? (
            <SectionCard>
              <Typography color="text.secondary">
                Cargando información de la acción...
              </Typography>
            </SectionCard>
          ) : metaError ? (
            <SectionCard>
              <Typography color="error">
                No pudimos cargar la información de la acción.
              </Typography>
            </SectionCard>
          ) : (
            <StockSummaryCard
              stock={stockMeta || undefined}
              symbol={symbol}
            />
          )}

          <SectionCard>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant="h6" fontWeight={700}>
                Rendimiento histórico
              </Typography>
              {fetchingSeries && (
                <Chip
                  color="primary"
                  size="small"
                  icon={<CircularProgress size={14} color="inherit" />}
                  label="Actualizando..."
                  sx={{ fontWeight: 700 }}
                />
              )}
            </Stack>
            <Typography variant="body2" color="text.secondary">
              Analizar el rendimiento de las acciones a lo largo del tiempo.
            </Typography>
            {seriesError && (
              <Alert severity="error" sx={{ mt: 1 }}>
                {seriesErrorObj instanceof Error
                  ? seriesErrorObj.message
                  : "No pudimos obtener los datos de la serie temporal."}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit}>
              <DetailFiltersRow container spacing={1.5}>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Desde"
                    type="datetime-local"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Hasta"
                    type="datetime-local"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    select
                    fullWidth
                    label="Intervalo"
                    value={interval}
                    onChange={(e) => setInterval(e.target.value)}
                  >
                    <MenuItem value="1min">1 minuto</MenuItem>
                    <MenuItem value="5min">5 minutos</MenuItem>
                    <MenuItem value="15min">15 minutos</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} md={1} display="flex" alignItems="stretch">
                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    sx={{ minHeight: 56 }}
                    disabled={loadingSeries}
                  >
                    {loadingSeries ? "Cargando..." : "Aplicar"}
                  </Button>
                </Grid>
                <Grid item xs={12} md={12}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Switch
                      checked={autoRefresh}
                      onChange={(_, checked) => setAutoRefresh(checked)}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {autoRefresh
                        ? "Actualización automática activada"
                        : "Actualización manual"}
                    </Typography>
                  </Stack>
                </Grid>
              </DetailFiltersRow>
            </Box>

            <Box mt={2}>
              {stockData ? (
                <Suspense fallback={<StockChartSkeleton />}>
                  <StockChart stockData={stockData} />
                </Suspense>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  Selecciona un rango de fechas e intervalo para ver el gráfico.
                  {seriesError ? " No pudimos obtener los datos." : ""}
                </Typography>
              )}
            </Box>
          </SectionCard>
        </Stack>
      </PageContainer>
    </DetailBackground>
  );
};

export default DetailPage;
