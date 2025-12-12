import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

export const HeaderContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(1.5, 3),
  backgroundColor: theme.palette.grey[100],
  borderBottom: `1px solid ${theme.palette.divider}`,
  position: "sticky",
  top: 0,
  zIndex: 10,
  width: "100%",
  boxSizing: "border-box",
}));

export const HeaderCell = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.text.secondary,
  fontSize: "0.875rem",
}));
