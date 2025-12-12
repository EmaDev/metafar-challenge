import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { IStockData, IValuesStockData } from "../../types";
import { Box, Typography } from "@mui/material";
import { useMemo } from "react";

export interface IChartProps {
  stockData: IStockData;
}

const MAX_POINTS = 500;

const ChartScreen: React.FC<IChartProps> = ({ stockData }) => {
  const symbol = stockData.meta.symbol;

  const sampledValues = useMemo(() => {
    const values = stockData.values || [];
    if (values.length <= MAX_POINTS) return values;
    const step = Math.ceil(values.length / MAX_POINTS);
    return values.filter((_, idx) => idx % step === 0);
  }, [stockData.values]);

  if (!sampledValues.length) {
    return (
      <Box py={3}>
        <Typography variant="body2" color="text.secondary">
          No hay datos disponibles para este rango.
        </Typography>
      </Box>
    );
  }

  const seriesData = useMemo(
    () =>
      sampledValues.map((item: IValuesStockData) => [
        new Date(item.datetime).getTime(),
        parseFloat(item.close),
      ]),
    [sampledValues]
  );

  const useBoost = sampledValues.length > 800;

  const chartOptions = useMemo<Highcharts.Options>(
    () => ({
      title: {
        text: symbol,
      },
      chart: {
        zoomType: "x",
        backgroundColor: "transparent",
      },
      credits: {
        enabled: false,
      },
      xAxis: {
        type: "datetime",
        title: {
          text: "Fecha",
        },
      },
      yAxis: {
        title: {
          text: "Precio",
        },
      },
      tooltip: {
        shared: true,
        xDateFormat: "%Y-%m-%d %H:%M",
        valueDecimals: 2,
      },
      plotOptions: {
        series: {
          marker: { enabled: false },
          turboThreshold: 0,
          dataGrouping: {
            enabled: true,
            approximation: "average",
          },
        },
      },
      boost: {
        enabled: useBoost,
      },
      series: [
        {
          type: "line",
          name: "Cierre",
          data: seriesData,
        },
      ],
    }),
    [seriesData, symbol, useBoost]
  );

  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
};

export default ChartScreen;
