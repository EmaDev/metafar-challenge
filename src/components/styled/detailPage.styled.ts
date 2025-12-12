import { styled } from "@mui/material/styles";
import { Grid } from "@mui/material";

export const DetailBackground = styled("div")(({ theme }) => ({
  minHeight: "100vh",
  padding: theme.spacing(3, 1.5, 2),
  [theme.breakpoints.up("md")]: {
    backgroundColor: "#f4f5f7",
    padding: theme.spacing(7, 3, 4),
  },
}));

export const DetailFiltersRow = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  [theme.breakpoints.up("md")]: {
    marginTop: theme.spacing(3),
  },
}));
