export const subscriptionPlans = [
  {
    id: "freemium",
    name: "Freemium",
    price: 0,
    currency: "USDT",
    duration: "mensual",
    features: [
      "Listado básico en el directorio",
      "Información de contacto limitada",
      "Hasta 1 foto",
      "Ubicación en el mapa",
      "Soporte comunitario"
    ],
    popular: false
  },
  {
    id: "basico",
    name: "Básico",
    price: 25,
    currency: "USDT",
    duration: "mensual",
    features: [
      "Listado completo en el directorio",
      "Información de contacto completa",
      "Hasta 3 fotos",
      "Ubicación en el mapa y geolocalización",
      "Soporte por email"
    ],
    popular: false
  },
  {
    id: "premium",
    name: "Premium",
    price: 60,
    currency: "USDT",
    duration: "mensual",
    features: [
      "Todo lo del plan Básico",
      "Destacado en búsquedas y categoría",
      "Hasta 10 fotos y video corto",
      "Reseñas y calificaciones visibles",
      "Estadísticas básicas de visitas",
      "Badge de verificado",
      "Soporte prioritario por email y chat"
    ],
    popular: true
  },
  {
    id: "empresarial",
    name: "Empresarial",
    price: 150,
    currency: "USDT",
    duration: "mensual",
    features: [
      "Todo lo del plan Premium",
      "Múltiples ubicaciones (hasta 3)",
      "Fotos y videos ilimitados",
      "Promociones destacadas en la home",
      "API de integración (próximamente)",
      "Manager de cuenta dedicado",
      "Reportes avanzados de rendimiento"
    ],
    popular: false
  }
];