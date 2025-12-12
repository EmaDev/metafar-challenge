import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material";

const HomePage = React.lazy(() => import("./components/pages/HomePage"));
const DetailPage = React.lazy(() => import("./components/pages/DetailPage"));

const App:React.FC = () => {
  const Fallback = (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        bgcolor: "#f8fafc",
      }}
    >
      <CircularProgress color="primary" />
      <Typography variant="body2" color="text.secondary">
        Cargando interfaz...
      </Typography>
    </Box>
  );

  return (
    <BrowserRouter>
      <Suspense fallback={Fallback}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/stock/:symbol" element={<DetailPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
