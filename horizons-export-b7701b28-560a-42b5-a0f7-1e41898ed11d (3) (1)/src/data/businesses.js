export const mockBusinesses = [
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
  },
   {
    id: 11,
    name: "Posada Bitcoin Andina",
    category: "Hotel",
    description: "Acogedora posada en los Andes venezolanos, perfecta para el ecoturismo. Aceptamos BTC para una estadía relajante.",
    address: "Mucuchíes, Mérida",
    coordinates: { lat: 8.7550, lng: -70.9145 },
    phone: "+58 274-555-1123",
    hours: "24 horas",
    rating: 4.7,
    reviews: 88,
    acceptedCryptos: ["Bitcoin", "USDT"],
    plan: "Premium",
    verified: true,
    images: [
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=500&q=80" 
    ],
    owner: "Familia Méndez"
  },
  {
    id: 12,
    name: "Cripto Tours Canaima",
    category: "Agencia de Viajes",
    description: "Excursiones al Salto Ángel y el Parque Nacional Canaima. Paga tu aventura con criptomonedas.",
    address: "Santa Elena de Uairén, Bolívar",
    coordinates: { lat: 4.6011, lng: -61.1139 },
    phone: "+58 289-555-4455",
    hours: "8:00 AM - 6:00 PM",
    rating: 4.9,
    reviews: 130,
    acceptedCryptos: ["Bitcoin", "Ethereum", "Dash"],
    plan: "Premium",
    verified: true,
    images: [
      "https://images.unsplash.com/photo-1500835556837-99ac94a94552?w=500&q=80" 
    ],
    owner: "Daniel Silva"
  },
  {
    id: 13,
    name: "Diseñador Web CriptoFreelance",
    category: "Profesional",
    description: "Diseñador gráfico y desarrollador web freelance. Proyectos modernos y adaptados a tus necesidades, pagos en cripto.",
    address: "Remoto (Venezuela)",
    coordinates: { lat: 10.0, lng: -66.0 }, 
    phone: "+58 412-555-6677",
    hours: "Flexible",
    rating: 4.8,
    reviews: 65,
    acceptedCryptos: ["Bitcoin", "Ethereum", "USDT", "Litecoin"],
    plan: "Básico",
    verified: true,
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80" 
    ],
    owner: "Laura Vargas"
  },
  {
    id: 14,
    name: "Técnico CriptoRefrigeración",
    category: "Técnico",
    description: "Servicio técnico especializado en reparación y mantenimiento de aires acondicionados y sistemas de refrigeración. Aceptamos cripto.",
    address: "Maracay, Aragua",
    coordinates: { lat: 10.2462, lng: -67.5958 },
    phone: "+58 243-555-8899",
    hours: "8:00 AM - 5:00 PM",
    rating: 4.6,
    reviews: 92,
    acceptedCryptos: ["Bitcoin", "Dash"],
    plan: "Básico",
    verified: false,
    images: [
      "https://images.unsplash.com/photo-1617980934951-583f7e1888c6?w=500&q=80" 
    ],
    owner: "José Alfonzo"
  },
  {
    id: 15,
    name: "Cripto Panadería El Trigal",
    category: "Restaurante",
    description: "Panadería artesanal con productos frescos horneados diariamente. Aceptamos Bitcoin para tu pan de cada día.",
    address: "Av. Las Delicias, Maracay",
    coordinates: { lat: 10.2550, lng: -67.6050 },
    phone: "+58 243-555-1212",
    hours: "6:00 AM - 8:00 PM",
    rating: 4.7,
    reviews: 115,
    acceptedCryptos: ["Bitcoin", "USDT"],
    plan: "Básico",
    verified: true,
    images: [
      "https://images.unsplash.com/photo-1568254183919-78a4f43a2877?w=500&q=80"
    ],
    owner: "Familia Pérez"
  },
  {
    id: 16,
    name: "Librería El CriptoLector",
    category: "Educación",
    description: "Amplia selección de libros y material educativo. Paga tus lecturas con criptomonedas.",
    address: "Plaza Bolívar, Mérida",
    coordinates: { lat: 8.5950, lng: -71.1450 },
    phone: "+58 274-555-3434",
    hours: "9:00 AM - 6:00 PM",
    rating: 4.6,
    reviews: 78,
    acceptedCryptos: ["Bitcoin", "Ethereum", "Dash"],
    plan: "Básico",
    verified: false,
    images: [
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500&q=80"
    ],
    owner: "Ana Lucía Rivas"
  },
  {
    id: 17,
    name: "Cripto Gym Fitness Center",
    category: "Deportes",
    description: "Gimnasio moderno con equipos de última generación y clases grupales. Paga tu membresía con cripto.",
    address: "CCCT, Caracas",
    coordinates: { lat: 10.4880, lng: -66.8520 },
    phone: "+58 212-555-5656",
    hours: "6:00 AM - 10:00 PM",
    rating: 4.8,
    reviews: 205,
    acceptedCryptos: ["Bitcoin", "USDT", "Litecoin"],
    plan: "Premium",
    verified: true,
    images: [
      "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=500&q=80"
    ],
    owner: "Carlos Fitness"
  },
  {
    id: 18,
    name: "Spa CriptoRelax",
    category: "Belleza",
    description: "Centro de bienestar y spa que ofrece masajes, tratamientos faciales y corporales. Aceptamos criptomonedas para tu relajación.",
    address: "Lechería, Anzoátegui",
    coordinates: { lat: 10.1850, lng: -64.6900 },
    phone: "+58 281-555-7878",
    hours: "10:00 AM - 7:00 PM",
    rating: 4.9,
    reviews: 150,
    acceptedCryptos: ["Bitcoin", "Ethereum", "USDT"],
    plan: "Premium",
    verified: true,
    images: [
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=500&q=80"
    ],
    owner: "Sofía Mendoza"
  },
  {
    id: 19,
    name: "Cripto Pet Shop",
    category: "Mascotas",
    description: "Tienda de mascotas con alimentos, accesorios y servicios veterinarios. Paga por el bienestar de tu mascota con cripto.",
    address: "San Cristóbal, Táchira",
    coordinates: { lat: 7.7650, lng: -72.2250 },
    phone: "+58 276-555-9090",
    hours: "9:00 AM - 6:00 PM",
    rating: 4.7,
    reviews: 99,
    acceptedCryptos: ["Bitcoin", "Dash", "Dogecoin"],
    plan: "Básico",
    verified: true,
    images: [
      "https://images.unsplash.com/photo-1522276498395-f4f68f7f8454?w=500&q=80"
    ],
    owner: "Luis Vet"
  },
  {
    id: 20,
    name: "Inmobiliaria CriptoHogar",
    category: "Inmobiliaria",
    description: "Compra, venta y alquiler de propiedades en Venezuela pagando con criptomonedas. Asesoría personalizada.",
    address: "Oficina Virtual (Nacional)",
    coordinates: { lat: 9.0, lng: -67.0 }, 
    phone: "+58 424-555-1010",
    hours: "9:00 AM - 5:00 PM",
    rating: 4.8,
    reviews: 120,
    acceptedCryptos: ["Bitcoin", "Ethereum", "USDT"],
    plan: "Empresarial",
    verified: true,
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=500&q=80"
    ],
    owner: "Inversiones CriptoHogar C.A."
  },
  {
    id: 21,
    name: "CriptoFloristería Pétalos",
    category: "Regalos y Eventos",
    description: "Arreglos florales para toda ocasión. Sorprende pagando con tus criptomonedas favoritas.",
    address: "Chacao, Caracas",
    coordinates: { lat: 10.4961, lng: -66.8589 },
    phone: "+58 212-555-2121",
    hours: "8:00 AM - 7:00 PM",
    rating: 4.6,
    reviews: 72,
    acceptedCryptos: ["Bitcoin", "USDT", "Ethereum"],
    plan: "Básico",
    verified: true,
    images: [
      "https://images.unsplash.com/photo-1457089328109-e5d9bd499191?w=500&q=80"
    ],
    owner: "Rosa Jiménez"
  },
  {
    id: 22,
    name: "Consultor CriptoFinanzas",
    category: "Profesional",
    description: "Asesoría financiera personalizada para inversiones en criptoactivos y gestión de portafolios digitales.",
    address: "Remoto (Nacional)",
    coordinates: { lat: 9.5, lng: -66.5 },
    phone: "+58 414-555-2233",
    hours: "Previa Cita",
    rating: 4.9,
    reviews: 55,
    acceptedCryptos: ["Bitcoin", "Ethereum", "USDT"],
    plan: "Premium",
    verified: true,
    images: [
      "https://images.unsplash.com/photo-1624996379697-f01d168b1a55?w=500&q=80"
    ],
    owner: "David Montero"
  },
  {
    id: 23,
    name: "Tatuajes CriptoInk",
    category: "Belleza",
    description: "Estudio de tatuajes profesional con artistas de renombre. Paga tu arte corporal con cripto.",
    address: "Sabana Grande, Caracas",
    coordinates: { lat: 10.4928, lng: -66.8783 },
    phone: "+58 212-555-3344",
    hours: "11:00 AM - 8:00 PM",
    rating: 4.7,
    reviews: 98,
    acceptedCryptos: ["Bitcoin", "Dash"],
    plan: "Básico",
    verified: true,
    images: [
      "https://images.unsplash.com/photo-1605497788044-5a32c6ba0908?w=500&q=80"
    ],
    owner: "Andrés 'Shadow' Art"
  },
  {
    id: 24,
    name: "Academia Cripto Aprende",
    category: "Educación",
    description: "Cursos y talleres sobre blockchain, trading de criptomonedas y desarrollo Web3. Formación para el futuro.",
    address: "Online y Valencia",
    coordinates: { lat: 10.1860, lng: -68.0000 },
    phone: "+58 241-555-4455",
    hours: "Varía según curso",
    rating: 4.8,
    reviews: 150,
    acceptedCryptos: ["Bitcoin", "Ethereum", "USDT"],
    plan: "Premium",
    verified: true,
    images: [
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&q=80"
    ],
    owner: "Lcda. Laura Educadora"
  },
  {
    id: 25,
    name: "Cripto Bar de Tapas",
    category: "Restaurante",
    description: "Deliciosas tapas españolas y ambiente festivo. Disfruta de la buena comida pagando con cripto.",
    address: "Paseo Las Mercedes, Caracas",
    coordinates: { lat: 10.4910, lng: -66.8570 },
    phone: "+58 212-555-5566",
    hours: "5:00 PM - 1:00 AM",
    rating: 4.5,
    reviews: 110,
    acceptedCryptos: ["Bitcoin", "USDT", "Litecoin"],
    plan: "Básico",
    verified: true,
    images: [
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500&q=80"
    ],
    owner: "Chef Antonio"
  },
  {
    id: 26,
    name: "CriptoMotos Racing Parts",
    category: "Automotriz",
    description: "Venta de repuestos y accesorios para motocicletas. Pagos en cripto para los amantes de las dos ruedas.",
    address: "Av. Sucre, Catia, Caracas",
    coordinates: { lat: 10.5150, lng: -66.9350 },
    phone: "+58 212-555-6677",
    hours: "9:00 AM - 5:00 PM",
    rating: 4.3,
    reviews: 45,
    acceptedCryptos: ["Bitcoin", "Dash"],
    plan: "Freemium",
    verified: false,
    images: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&q=80"
    ],
    owner: "Miguel 'El Rápido'"
  },
  {
    id: 27,
    name: "Reparación Celulares CriptoFix",
    category: "Técnico",
    description: "Servicio técnico especializado en reparación de smartphones y tablets. Aceptamos cripto para tus reparaciones.",
    address: "Plaza Venezuela, Caracas",
    coordinates: { lat: 10.4990, lng: -66.8880 },
    phone: "+58 212-555-7788",
    hours: "10:00 AM - 7:00 PM",
    rating: 4.6,
    reviews: 82,
    acceptedCryptos: ["Bitcoin", "USDT"],
    plan: "Básico",
    verified: true,
    images: [
      "https://images.unsplash.com/photo-1581390114939-946f9a892a67?w=500&q=80"
    ],
    owner: "Sara Tech"
  },
  {
    id: 28,
    name: "Mascotas Felices CriptoVet",
    category: "Mascotas",
    description: "Clínica veterinaria y peluquería canina. Cuida a tu mejor amigo pagando con criptomonedas.",
    address: "El Hatillo, Caracas",
    coordinates: { lat: 10.4200, lng: -66.8200 },
    phone: "+58 212-555-8899",
    hours: "9:00 AM - 6:00 PM",
    rating: 4.9,
    reviews: 130,
    acceptedCryptos: ["Bitcoin", "Ethereum", "Dogecoin"],
    plan: "Premium",
    verified: true,
    images: [
      "https://images.unsplash.com/photo-1548681528-6a5c45b66b42?w=500&q=80"
    ],
    owner: "Dr. Amigo Animal"
  },
  {
    id: 29,
    name: "Cripto Alquiler de Sonido Pro",
    category: "Regalos y Eventos",
    description: "Alquiler de equipos de sonido profesional para fiestas y eventos. Paga tu rumba con cripto.",
    address: "Servicio a Domicilio, Gran Caracas",
    coordinates: { lat: 10.4500, lng: -66.8700 },
    phone: "+58 426-555-9900",
    hours: "Según evento",
    rating: 4.7,
    reviews: 60,
    acceptedCryptos: ["Bitcoin", "USDT", "Dash"],
    plan: "Básico",
    verified: false,
    images: [
      "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=500&q=80"
    ],
    owner: "DJ Beats"
  },
  {
    id: 30,
    name: "Ferretería Cripto Construye",
    category: "Hogar",
    description: "Materiales de construcción, herramientas y todo para el hogar. Ahora aceptando criptomonedas.",
    address: "Av. San Martín, Caracas",
    coordinates: { lat: 10.5000, lng: -66.9200 },
    phone: "+58 212-555-0011",
    hours: "7:30 AM - 5:00 PM",
    rating: 4.4,
    reviews: 88,
    acceptedCryptos: ["Bitcoin", "Litecoin"],
    plan: "Básico",
    verified: true,
    images: [
      "https://images.unsplash.com/photo-1505798577917-a65157d3320a?w=500&q=80"
    ],
    owner: "Familia Constructora"
  }
];