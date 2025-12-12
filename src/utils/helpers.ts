export function getCurrentDay() {
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().slice(0, 16);

  return formattedDate;
}

export function getDateWithOffset(days: number) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().slice(0, 16);
}

const typeBadgeMap: Record<
  string,
  { label: string; color: string; backgroundColor: string }
> = {
  // 1. Acciones Comunes (La mayoría) - Azul corporativo
  "common stock": {
    label: "Acción Ordinaria",
    color: "#1565C0", // Azul fuerte
    backgroundColor: "#E3F2FD", // Azul muy claro
  },

  // 2. Acciones Preferentes - Verde (asociado a dividendos/dinero)
  "preferred stock": {
    label: "Acción Preferente",
    color: "#2E7D32", // Verde bosque
    backgroundColor: "#E8F5E9",
  },

  // 3. ADRs (Inversión extranjera) - Púrpura
  "american depositary receipt": {
    label: "ADR",
    color: "#7B1FA2", // Púrpura
    backgroundColor: "#F3E5F5",
  },
  "depositary receipt": {
    label: "Certificado de Depósito",
    color: "#6A1B9A", // Púrpura oscuro
    backgroundColor: "#F3E5F5",
  },

  // 4. REITs (Bienes Raíces) - Rojo/Terracota (ladrillo)
  "reit": {
    label: "REIT",
    color: "#C62828", // Rojo oscuro
    backgroundColor: "#FFEBEE",
  },

  // 5. Warrants (Derivados/Riesgo) - Naranja
  "warrant": {
    label: "Warrant",
    color: "#EF6C00", // Naranja
    backgroundColor: "#FFF3E0",
  },

  // 6. ETNs (Notas de deuda) - Verde Azulado (Teal)
  "exchange-traded note": {
    label: "ETN",
    color: "#00695C", // Teal
    backgroundColor: "#E0F2F1",
  },

  // 7. Unidades (Paquetes de acción + warrant) - Cian
  "unit": {
    label: "Unidad (Unit)",
    color: "#0277BD", // Azul claro
    backgroundColor: "#E1F5FE",
  },

  // 8. Sociedades Limitadas (Estructura legal) - Ámbar/Oro
  "limited partnership": {
    label: "Ltd. Partnership",
    color: "#F57F17", // Ámbar oscuro
    backgroundColor: "#FFFDE7",
  },

  // 9. Derechos (Rights) - Gris (Transitorio)
  "right": {
    label: "Derecho de Suscripción",
    color: "#424242", // Gris oscuro
    backgroundColor: "#F5F5F5",
  },
};

const currencyLabelMap: Record<string, string> = {
  usd: "Dólar estadounidense",
  eur: "Euro",
  gbp: "Libra esterlina",
  cad: "Dólar canadiense",
  chf: "Franco suizo",
  jpy: "Yen japonés",
};

export function getStockTypeMeta(type?: string) {
  const key = type?.toLowerCase().trim() || "";
  return (
    typeBadgeMap[key] || {
      label: type || "Otro",
      color: "#0f172a",
      backgroundColor: "#eef2ff",
    }
  );
}

export function getCurrencyLabel(currency?: string) {
  const key = currency?.toLowerCase().trim() || "";
  return currencyLabelMap[key] || currency || "—";
}
