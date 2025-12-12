import { Box, CircularProgress, Typography } from "@mui/material";
export const Fallback = (
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