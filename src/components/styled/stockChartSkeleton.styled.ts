import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const ChartSkeletonCard = styled(Box)(({ theme }) => ({
  borderRadius: 16,
  backgroundColor: "#ffffff",
  boxShadow: "0 18px 48px rgba(15, 23, 42, 0.08)",
  padding: theme.spacing(3),
}));
