import React from "react";
import { Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { StockTable } from "..";
import PageContainer from "../layout/PageContainer";

const Background = styled("div")(({ theme }) => ({
  minHeight: "100vh",
  backgroundColor: "transparent",
  [theme.breakpoints.up("md")]: {
    backgroundColor: "#f4f5f7",
    padding: theme.spacing(7, 3, 4),
  },
}));

const ContentCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 18,
  backgroundColor: "#ffffff",
  boxShadow: "0 18px 48px rgba(15, 23, 42, 0.08)",
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(5),
  },
}));

const HeaderRow = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: theme.spacing(3),
  gap: theme.spacing(2),
}));

const HomePage: React.FC = () => {
  return (
    <Background>
      <PageContainer>
        <ContentCard elevation={0}>
          <HeaderRow>
            <div>
              <Typography variant="h5" fontWeight={700} gutterBottom>
                Información del mercado de valores
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Resumen de los instrumentos disponibles. Haga clic en una acción
                para ver los detalles.
              </Typography>
            </div>
          </HeaderRow>

          <StockTable />
        </ContentCard>
      </PageContainer>
    </Background>
  );
};

export default HomePage;
