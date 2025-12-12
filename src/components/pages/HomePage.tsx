import React from "react";
import { Paper, Typography } from "@mui/material";
import { StockTable } from "..";
import PageContainer from "../layout/PageContainer";
import {
  HomeBackground,
  HomeContentCard,
  HomeHeaderRow,
} from "../styled/homePage.styled";

const HomePage: React.FC = () => {
  return (
    <HomeBackground>
      <PageContainer>
        <HomeContentCard component={Paper} elevation={0}>
          <HomeHeaderRow>
            <div>
              <Typography variant="h5" fontWeight={700} gutterBottom>
                Información del mercado de valores
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Resumen de los instrumentos disponibles. Haga clic en una acción
                para ver los detalles.
              </Typography>
            </div>
          </HomeHeaderRow>

          <StockTable />
        </HomeContentCard>
      </PageContainer>
    </HomeBackground>
  );
};

export default HomePage;
