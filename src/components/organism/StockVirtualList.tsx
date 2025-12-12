import * as React from "react";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  WarningAmber as ErrorIcon,
  SearchOff as EmptyIcon,
} from "@mui/icons-material";
import { useQueryClient } from "@tanstack/react-query";
import { StockCard } from "../molecules/StockCard";
import { StockTableRow } from "../molecules/StockTableRow";
import { StockTableHeader } from "../molecules/StockTableHeader";
import { IStock } from "../../types";
import { queryKeys } from "../../hooks/queries/queryKeys";
import { fetchStockMeta } from "../../services/stockService";
import { fetchTimeSeries } from "../../services/stockService";
import { getCurrentDay, getDateWithOffset } from "../../helpers";
import StockListSkeleton from "../molecules/skeletons/StockListSkeleton";

interface StockVirtualListProps {
  items: IStock[];
  isLoading: boolean;
  isError: boolean;
}

type VirtualListData = {
  items: IStock[];
  onHover?: (symbol: string) => void;
};

export const StockVirtualList: React.FC<StockVirtualListProps> = ({ items, isLoading, isError }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const queryClient = useQueryClient();
  const hoverTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const prefetchMeta = React.useCallback(
    (symbol: string) =>
      queryClient.prefetchQuery({
        queryKey: queryKeys.stocks.meta(symbol),
        queryFn: () => fetchStockMeta(symbol),
        staleTime: 5 * 60 * 1000,
      }),
    [queryClient]
  );

  const prefetchSeries = React.useCallback(
    (symbol: string) => {
      const startDate = getDateWithOffset(2);
      const endDate = getCurrentDay();
      const interval = "15min";
      return queryClient.prefetchQuery({
        queryKey: queryKeys.stocks.timeSeries(symbol, interval, startDate, endDate),
        queryFn: () => fetchTimeSeries(symbol, interval, startDate, endDate),
        staleTime: 5 * 60 * 1000,
      });
    },
    [queryClient]
  );

  if (isLoading) {
    return <StockListSkeleton isMobile={isMobile} />;
  }

  if (isError) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="50vh" color="error.main">
        <ErrorIcon sx={{ fontSize: 48, mb: 2 }} />
        <Typography variant="h6">Error cargando datos</Typography>
        <Typography variant="body2">Por favor intenta más tarde.</Typography>
      </Box>
    );
  }

  if (items.length === 0) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="50vh" color="text.secondary">
        <EmptyIcon sx={{ fontSize: 48, mb: 2 }} />
        <Typography variant="h6">No se encontraron resultados</Typography>
      </Box>
    );
  }

  const RowComponent = isMobile ? StockCard : StockTableRow;
  const itemSize = isMobile ? 140 : 52; // Altura en px (ajustada para MUI)
  const itemData: VirtualListData = {
    items,
    onHover: (symbol) => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = setTimeout(() => {
        prefetchMeta(symbol);
        prefetchSeries(symbol);
      }, 250);
    },
  };

  return (
    <Box 
      width="100%" 
      height="65vh" // Altura del contenedor virtualizado
      sx={{ bgcolor: 'background.paper', borderRadius: 1, overflow: 'hidden', boxShadow: 1 }}
    >
      {!isMobile && <StockTableHeader />}

      <Box flex={1} height="100%">
        <AutoSizer>
          {({ height, width }) => (
            <FixedSizeList
              height={height - (isMobile ? 0 : 53)} // Restamos la altura del Header en desktop (~53px)
              width={width}
              itemCount={items.length}
              itemSize={itemSize}
              itemData={itemData}
              overscanCount={5} // Renderiza 5 extra para scroll suave
            >
              {RowComponent as unknown as React.ComponentType<ListChildComponentProps<VirtualListData>>}
            </FixedSizeList>
          )}
        </AutoSizer>
      </Box>
    </Box>
  );
};
