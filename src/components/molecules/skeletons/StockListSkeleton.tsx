import React from "react";
import { Box, Skeleton } from "@mui/material";

interface StockListSkeletonProps {
  isMobile: boolean;
  items?: number;
}

const StockListSkeleton: React.FC<StockListSkeletonProps> = ({
  isMobile,
  items = 10,
}) => {
  const itemHeight = isMobile ? 130 : 50;

  return (
    <Box p={3}>
      {Array.from({ length: items }).map((_, index) => (
        <Skeleton
          key={index}
          variant="rectangular"
          height={itemHeight - 10}
          sx={{ mb: 1, borderRadius: 1 }}
        />
      ))}
    </Box>
  );
};

export default StockListSkeleton;
