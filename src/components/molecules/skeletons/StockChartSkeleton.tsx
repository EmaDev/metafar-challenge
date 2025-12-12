import React from "react";
import { Box, Skeleton, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const Card = styled(Box)(({ theme }) => ({
  borderRadius: 16,
  backgroundColor: "#ffffff",
  boxShadow: "0 18px 48px rgba(15, 23, 42, 0.08)",
  padding: theme.spacing(3),
}));

const StockChartSkeleton: React.FC = () => {
  return (
    <Card>
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
    </Card>
  );
};

export default StockChartSkeleton;
