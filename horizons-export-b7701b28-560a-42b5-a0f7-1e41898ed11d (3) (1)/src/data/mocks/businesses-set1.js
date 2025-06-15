export const set1 = [
  {
    id: 1,
    name: "Café Bitcoin Caracas",
    category: "Restaurante",
    description: "Café especializado en granos venezolanos que acepta pagos en Bitcoin y otras criptomonedas. Ambiente acogedor para la comunidad cripto.",
    address: "Av. Francisco de Miranda, Caracas",
    coordinates: { lat: 10.4806, lng: -66.9036 },
    phone: "+58 212-555-0123",
    hours: "7:00 AM - 10:00 PM",
    rating: 4.8,
    reviews: 156,
    acceptedCryptos: ["Bitcoin", "Ethereum", "USDT", "Dash"],
    plan: "Premium",
    verified: true,
    images: [
      "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=500&q=80", 
      "https://images.unsplash.com/photo-1511920183353-12ba2d5f1f68?w=500&q=80"
    ],
    owner: "María González",
    website: "https://cafebitcoincaracas.com",
    social: {
      instagram: "@cafebitcoincaracas",
      twitter: "@cafebitcoin_ccs"
    }
  },
  {
    id: 2,
    name: "TechCripto Maracaibo",
    category: "Tecnología",
    description: "Tienda especializada en hardware para minería y equipos tecnológicos. Reparación de equipos y asesoría en criptomonedas.",
    address: "Calle 77, Maracaibo, Zulia",
    coordinates: { lat: 10.6666, lng: -71.6124 },
    phone: "+58 261-555-0456",
    hours: "9:00 AM - 6:00 PM",
    rating: 4.6,
    reviews: 89,
    acceptedCryptos: ["Bitcoin", "Ethereum", "Litecoin"],
    plan: "Básico",
    verified: true,
    images: [
      "https://images.unsplash.com/photo-1580894908361-967195033215?w=500&q=80" 
    ],
    owner: "Carlos Rodríguez",
    website: "https://techcripto.com.ve"
  },
  {
    id: 3,
    name: "Farmacia CriptoSalud",
    category: "Salud",
    description: "Farmacia moderna que acepta criptomonedas para medicamentos y productos de salud. Servicio 24/7 con delivery.",
    address: "Centro Comercial Sambil, Valencia",
    coordinates: { lat: 10.1621, lng: -67.9927 },
    phone: "+58 241-555-0789",
    hours: "24 horas",
    rating: 4.9,
    reviews: 234,
    acceptedCryptos: ["Bitcoin", "USDT", "Dash", "Ethereum"],
    plan: "Premium",
    verified: true,
    images: [
      "https://images.unsplash.com/photo-1587370560942-ad2a04eabb6d?w=500&q=80" 
    ],
    owner: "Dr. Ana Martínez"
  },
  {
    id: 4,
    name: "AutoCripto Barquisimeto",
    category: "Automotriz",
    description: "Taller mecánico especializado en vehículos que acepta pagos en criptomonedas. Servicios de mantenimiento y reparación.",
    address: "Av. Libertador, Barquisimeto, Lara",
    coordinates: { lat: 10.0647, lng: -69.3301 },
    phone: "+58 251-555-0321",
    hours: "8:00 AM - 5:00 PM",
    rating: 4.4,
    reviews: 67,
    acceptedCryptos: ["Bitcoin", "Dash"],
    plan: "Básico",
    verified: true,
    images: [
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=500&q=80" 
    ],
    owner: "Luis Hernández"
  },
  {
    id: 5,
    name: "Boutique CriptoModa",
    category: "Moda",
    description: "Boutique de ropa exclusiva que acepta criptomonedas. Diseños únicos y tendencias internacionales.",
    address: "Las Mercedes, Caracas",
    coordinates: { lat: 10.4922, lng: -66.8755 },
    phone: "+58 212-555-0654",
    hours: "10:00 AM - 8:00 PM",
    rating: 4.7,
    reviews: 123,
    acceptedCryptos: ["Bitcoin", "Ethereum", "USDT"],
    plan: "Premium",
    verified: true,
    images: [
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=500&q=80" 
    ],
    owner: "Isabella Morales"
  },
  {
    id: 6,
    name: "Consultorio Dr. CriptoMed",
    category: "Salud",
    description: "Consultorio médico privado que acepta pagos en criptomonedas. Especialidades en medicina general y preventiva.",
    address: "Altamira, Caracas",
    coordinates: { lat: 10.4969, lng: -66.8531 },
    phone: "+58 212-555-0987",
    hours: "8:00 AM - 4:00 PM",
    rating: 4.8,
    reviews: 178,
    acceptedCryptos: ["Bitcoin", "USDT", "Ethereum"],
    plan: "Premium",
    verified: true,
    images: [
      "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=500&q=80" 
    ],
    owner: "Dr. Roberto Silva"
  },
  {
    id: 7,
    name: "Hotel Cripto Paraíso",
    category: "Hotel",
    description: "Hotel de lujo en Margarita que ofrece pagos en criptomonedas. Disfruta de tus vacaciones pagando con BTC, ETH y más.",
    address: "Playa El Agua, Isla Margarita",
    coordinates: { lat: 11.1350, lng: -63.8342 },
    phone: "+58 295-555-1122",
    hours: "24 horas",
    rating: 4.9,
    reviews: 312,
    acceptedCryptos: ["Bitcoin", "Ethereum", "USDT", "Litecoin"],
    plan: "Empresarial",
    verified: true,
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&q=80", 
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=500&q=80"
    ],
    owner: "Familia Rossi",
    website: "https://hotelcriptoparaiso.com",
    social: {
      instagram: "@hotelcriptoparaiso"
    }
  },
  {
    id: 8,
    name: "Viajes CriptoAventura",
    category: "Agencia de Viajes",
    description: "Agencia de viajes que organiza tours y paquetes turísticos por Venezuela aceptando criptomonedas.",
    address: "Mérida, Estado Mérida",
    coordinates: { lat: 8.5897, lng: -71.1450 },
    phone: "+58 274-555-0333",
    hours: "9:00 AM - 7:00 PM",
    rating: 4.7,
    reviews: 95,
    acceptedCryptos: ["Bitcoin", "Dash", "USDT"],
    plan: "Premium",
    verified: true,
    images: [
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=500&q=80" 
    ],
    owner: "Sofia Contreras"
  },
  {
    id: 9,
    name: "Abogado CriptoLegal",
    category: "Profesional",
    description: "Bufete de abogados especializados en derecho tecnológico y criptomonedas. Asesoría legal para individuos y empresas.",
    address: "Torre Gerencial, El Rosal, Caracas",
    coordinates: { lat: 10.4970, lng: -66.8600 },
    phone: "+58 212-555-0444",
    hours: "9:00 AM - 5:00 PM",
    rating: 4.9,
    reviews: 75,
    acceptedCryptos: ["Bitcoin", "Ethereum"],
    plan: "Premium",
    verified: true,
    images: [
      "https://images.unsplash.com/photo-1605664041954-0a7a4c25935c?w=500&q=80" 
    ],
    owner: "Dr. Ricardo López"
  },
  {
    id: 10,
    name: "Soporte Técnico PC Cripto",
    category: "Técnico",
    description: "Servicio técnico especializado en reparación y mantenimiento de computadoras, laptops y equipos de minería. Pagos en cripto.",
    address: "Av. Bolívar Norte, Valencia",
    coordinates: { lat: 10.2178, lng: -68.0077 },
    phone: "+58 241-555-0555",
    hours: "8:00 AM - 6:00 PM (Lunes a Sábado)",
    rating: 4.5,
    reviews: 110,
    acceptedCryptos: ["Bitcoin", "Litecoin", "Dash", "USDT"],
    plan: "Básico",
    verified: false,
    images: [
      "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=500&q=80" 
    ],
    owner: "Pedro Pérez"
  }
];