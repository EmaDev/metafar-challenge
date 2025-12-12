import * as React from "react";
import { Container, Typography, Alert } from "@mui/material";
import useDebounce from "../../hooks/useDebounce";
import { useStockList } from "../../hooks/queries/useStockList";
import { useStockSearch } from "../../hooks/queries/useStockSearch";
import { StockFilters } from "../molecules/StockFilters";
import { StockVirtualList } from "../organism/StockVirtualList";

const StockTable: React.FC = () => {
  const [searchName, setSearchName] = React.useState("");
  const [searchSymbol, setSearchSymbol] = React.useState("");
  const debouncedName = useDebounce(searchName, 500);
  const debouncedSymbol = useDebounce(searchSymbol, 500);
  const { data, isLoading, isError, isFetching } = useStockList();
  const { data: searchData, isFetching: searching, isError: searchError } = useStockSearch(debouncedSymbol);

  const stocks = React.useMemo(() => {
    if (debouncedSymbol && searchData?.data) return searchData.data;
    return data?.data || [];
  }, [data?.data, searchData?.data, debouncedSymbol]);

  const filteredStocks = React.useMemo(() => {
    if (!debouncedName && !debouncedSymbol) return stocks;

    const lowerName = debouncedName.toLowerCase();
    const lowerSymbol = debouncedSymbol.toLowerCase();

    return stocks.filter((stock) => {
      const nameMatch = stock.name ? stock.name.toLowerCase().includes(lowerName) : false;
      const symbolMatch = stock.symbol ? stock.symbol.toLowerCase().includes(lowerSymbol) : false;
      return nameMatch && symbolMatch;
    });
  }, [stocks, debouncedName, debouncedSymbol]);

  return (
    <Container
      maxWidth="xl"
      disableGutters
      sx={{ py: 3, px: { xs: 1.5, sm: 2, md: 3 }, overflowX: "hidden" }}
    >
      <StockFilters
        searchName={searchName}
        setSearchName={setSearchName}
        searchSymbol={searchSymbol}
        setSearchSymbol={setSearchSymbol}
      />
      <Typography variant="body1" color="text.secondary" paragraph>
        {isLoading || searching
          ? "Cargando datos..."
          : `Mostrando ${filteredStocks.length} resultados${isFetching ? " (actualizando...)" : ""}`}
      </Typography>

      {(isError || searchError) && (
        <Alert severity="error" sx={{ mb: 2 }}>
          No pudimos cargar las acciones. Intenta nuevamente más tarde.
        </Alert>
      )}

      <StockVirtualList
        items={filteredStocks}
        isLoading={isLoading}
        isError={isError}
      />
    </Container>
  );
};

export default StockTable;
