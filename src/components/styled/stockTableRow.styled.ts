import { styled } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";

export const RowContainer = styled(RouterLink)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),
  borderBottom: `1px solid ${theme.palette.divider}`,
  boxSizing: "border-box",
  cursor: "pointer",
  transition: "background-color 0.2s",
  color: "inherit",
  textDecoration: "none",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    textDecoration: "none",
  },
}));
