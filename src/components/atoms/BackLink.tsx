import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link, Typography, Box } from "@mui/material";

interface BackLinkProps {
  to: string;
  label: string;
}

const BackLink: React.FC<BackLinkProps> = ({ to, label }) => (
  <Link
    component={RouterLink}
    to={to}
    underline="none"
    color="text.secondary"
    sx={{
      display: "inline-flex",
      alignItems: "center",
      gap: 1,
      fontWeight: 600,
      mb: 2,
    }}
  >
    <Box
      component="span"
      sx={{ display: "inline-flex", alignItems: "center", color: "text.secondary" }}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="15 18 9 12 15 6" />
      </svg>
    </Box>
    <Typography variant="body2" color="text.secondary">
      {label}
    </Typography>
  </Link>
);

export default BackLink;
