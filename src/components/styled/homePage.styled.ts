import { styled } from "@mui/material/styles";
import { Paper } from "@mui/material";

export const HomeBackground = styled("div")(({ theme }) => ({
  minHeight: "100vh",
  padding: theme.spacing(3, 1.5, 2),
  [theme.breakpoints.up("md")]: {
    backgroundColor: "#f4f5f7",
    padding: theme.spacing(7, 3, 4),
  },
}));

export const HomeContentCard = styled(Paper)(({ theme }) => ({
  borderRadius: 16,
  padding: theme.spacing(3),
  boxShadow: "0 12px 32px rgba(15,23,42,0.08)",
}));

export const HomeHeaderRow = styled("div")(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));
