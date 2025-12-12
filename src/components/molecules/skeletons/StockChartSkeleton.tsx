import React from "react";
import { Box, Skeleton, Stack, Typography } from "@mui/material";
import { ChartSkeletonCard } from "../../styled/stockChartSkeleton.styled";

const StockChartSkeleton: React.FC = () => {
  return (
    <ChartSkeletonCard>
      <Stack spacing={2}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Skeleton variant="text" width={180} height={32} />
          <Skeleton variant="circular" width={32} height={32} />
        </Box>
        <Typography variant="body2" color="text.secondary">
          Preparando gráfico...
        </Typography>
        <Skeleton variant="rectangular" height={320} sx={{ borderRadius: 2 }} />
      </Stack>
    </ChartSkeletonCard>
  );
};

export default StockChartSkeleton;
