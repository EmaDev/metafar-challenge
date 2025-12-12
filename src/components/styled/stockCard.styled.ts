import { styled } from "@mui/material/styles";
import { Card } from "@mui/material";

export const CardWrapper = styled("div")({
  padding: "8px",
  boxSizing: "border-box",
});

export const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  transition: "transform 0.2s, box-shadow 0.2s",
  "&:hover": {
    transform: "scale(1.02)",
    boxShadow: theme.shadows[4],
  },
}));
