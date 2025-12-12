import { Paper, PaperProps } from "@mui/material";
import { styled } from "@mui/material/styles";

const SectionCard = styled((props: PaperProps) => (
  <Paper elevation={0} {...props} />
))(({ theme }) => ({
  borderRadius: 16,
  padding: theme.spacing(3),
  backgroundColor: "#ffffff",
  boxShadow: "0 18px 48px rgba(15, 23, 42, 0.08)",
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(4),
  },
}));

export default SectionCard;
