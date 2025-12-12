import { styled } from "@mui/material/styles";

const PageContainer = styled("div")(({ theme }) => ({
  width: "100%",
  maxWidth: 1200,
  margin: "0 auto",
  padding: theme.spacing(1.5, 1.25),
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(3),
  },
}));

export default PageContainer;
