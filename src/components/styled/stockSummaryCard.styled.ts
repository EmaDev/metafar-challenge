import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";

export const MetaRow = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1.5),
  marginTop: theme.spacing(0.5),
  marginBottom: theme.spacing(1.5),
  flexWrap: "wrap",
}));

export const Description = styled(Typography)(({ theme }) => ({
  color: "#4b5563",
  lineHeight: 1.6,
  maxWidth: 900,
  fontSize: 15,
  [theme.breakpoints.up("md")]: {
    fontSize: 16,
  },
}));
