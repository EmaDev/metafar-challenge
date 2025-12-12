import * as React from "react";
import { Box, Button, Typography, Paper } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import HomeIcon from "@mui/icons-material/Home";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error capturado:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "#f8fafc",
            p: 2,
          }}
        >
          <Paper
            elevation={0}
            sx={{
              maxWidth: 480,
              width: "100%",
              p: 4,
              borderRadius: 3,
              boxShadow: "0 18px 48px rgba(15,23,42,0.08)",
              textAlign: "center",
            }}
          >
            <Typography variant="h5" fontWeight={700} gutterBottom>
              Ups, algo salió mal
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Ocurrió un error inesperado. Podés intentar recargar la página o regresar al inicio.
            </Typography>
            <Box sx={{ display: "flex", gap: 1.5, justifyContent: "center", mt: 2 }}>
              <Button
                variant="contained"
                startIcon={<RefreshIcon />}
                onClick={() => window.location.reload()}
              >
                Recargar
              </Button>
              <Button
                variant="outlined"
                startIcon={<HomeIcon />}
                onClick={() => (window.location.href = "/")}
              >
                Ir al inicio
              </Button>
            </Box>
          </Paper>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
