import { CreditCard, Zap, Truck, ShieldCheck, Shield, Megaphone, Car, Lightbulb, CheckCircle, DollarSign, Users, BarChart } from 'lucide-react';

export const moduleDetails = {
  criptoflow: {
    id: 'criptoflow',
    path: '/proximamente/criptoflow',
    icon: CreditCard,
    title: 'CriptoFlow',
    subtitle: 'Financiamiento Cripto "Compra Ahora, Paga Después"',
    shortDescription: 'Un sistema "Compra Ahora, Paga Después" (BNPL) que te permitirá financiar tus compras en stablecoins en los comercios aliados de TuZonaCripto.',
    gradient: 'from-red-500 to-orange-500',
    heroImage: 'futuristic financial transaction interface',
    mainDescription: 'CriptoFlow revoluciona la forma en que compras, ofreciendo un sistema de financiamiento instantáneo directamente en el punto de venta. Imagina poder adquirir ese producto o servicio que tanto deseas y pagarlo en cómodas cuotas con tus stablecoins. Nuestro sistema inteligente de análisis de riesgo evalúa tu perfil para ofrecerte una línea de crédito justa y transparente, sin papeleos ni largas esperas. Es el poder de las finanzas descentralizadas aplicado a tus compras diarias, dándote mayor flexibilidad y poder adquisitivo.',
    features: [
      { icon: CheckCircle, title: 'Aprobación Instantánea', text: 'Recibe una decisión de crédito en segundos gracias a nuestro algoritmo de IA.' },
      { icon: DollarSign, title: 'Cuotas Flexibles', text: 'Elige el plan de pago que mejor se adapte a tu presupuesto, todo en stablecoins.' },
      { icon: Users, title: 'Amplia Red de Comercios', text: 'Utiliza CriptoFlow en una creciente red de negocios verificados en toda Venezuela.' },
      { icon: BarChart, title: 'Gestión Transparente', text: 'Controla tus pagos y tu línea de crédito desde tu dashboard personal en TuZonaCripto.' },
    ],
    gallery: [
      { src: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1', alt: 'Persona pagando en un terminal con un teléfono', description: 'Paga a tu ritmo con financiamiento instantáneo en el punto de venta.' },
      { src: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3', alt: 'Mujer feliz sosteniendo bolsas de compras', description: 'Accede a una línea de crédito flexible para tus compras diarias y deseos.' },
      { src: 'https://images.unsplash.com/photo-1593538481358-158318145a43', alt: 'Primer plano de una aplicación de banca móvil que muestra un plan de pago', description: 'Gestiona tus cuotas y tu crédito de forma transparente desde la app.' },
    ]
  },
  criptopay: {
    id: 'criptopay',
    path: '/proximamente/criptopay',
    icon: Zap,
    title: 'CriptoPay',
    subtitle: 'Tu Pasarela de Pagos Cripto Universal',
    shortDescription: 'Tu solución para realizar pagos directos e inmediatos con tus criptomonedas en nuestro marketplace, y mucho más.',
    gradient: 'from-red-600 to-pink-600',
    heroImage: 'global digital payment network',
    mainDescription: 'CriptoPay es más que una simple pasarela de pagos; es tu llave de acceso al comercio global desde Venezuela. Con CriptoPay, podrás pagar de forma instantánea en cualquier comercio de la red TuZonaCripto, pero también te permitirá adquirir servicios digitales internacionales como Netflix, Spotify o Google Play. Olvídate de las limitaciones y las barreras. CriptoPay integra múltiples criptomonedas y ofrece conversiones en tiempo real para que tus transacciones sean rápidas, seguras y sin complicaciones.',
    features: [
      { icon: CheckCircle, title: 'Pagos Instantáneos', text: 'Transacciones confirmadas en segundos, tanto en línea como en tiendas físicas.' },
      { icon: DollarSign, title: 'Soporte Multi-Cripto', text: 'Paga con una amplia variedad de criptomonedas populares y stablecoins.' },
      { icon: Users, title: 'Acceso a Servicios Globales', text: 'Suscríbete y paga servicios internacionales sin necesidad de una tarjeta de crédito tradicional.' },
      { icon: BarChart, title: 'Seguridad de Nivel Bancario', text: 'Tus fondos y datos están protegidos con encriptación de última generación.' },
    ],
    gallery: [
      { src: 'https://images.unsplash.com/photo-1580674287405-80cd2594e3e3', alt: 'Escaneando un código QR para pago en una cafetería', description: 'Paga en segundos escaneando un código QR en comercios aliados.' },
      { src: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d', alt: 'Logotipos de servicios de streaming como Netflix y Spotify en un teléfono inteligente', description: 'Accede a servicios globales y paga tus suscripciones sin fronteras.' },
      { src: 'https://images.unsplash.com/photo-1639322537228-f710d846310a', alt: 'Múltiples logotipos de criptomonedas', description: 'Utiliza una amplia variedad de criptomonedas para tus pagos diarios.' },
    ]
  },
  criptogo: {
    id: 'criptogo',
    path: '/proximamente/criptogo',
    icon: Truck,
    title: 'CriptoGo',
    subtitle: 'Servicio de Delivery Integrado',
    shortDescription: 'Lleva tus compras del marketplace de TuZonaCripto directamente a tu puerta. Un servicio de entrega eficiente y confiable.',
    gradient: 'from-red-700 to-rose-700',
    heroImage: 'futuristic delivery drone cityscape',
    mainDescription: 'Con CriptoGo, cerramos el ciclo de tu experiencia de compra. Una vez que adquieres un producto en nuestro marketplace, nuestro sistema de logística se activa para llevártelo a donde estés. A través de alianzas estratégicas con las mejores empresas de delivery del país, garantizamos entregas rápidas, seguras y con seguimiento en tiempo real. Compra con tus criptos, financia con CriptoFlow y recibe tu pedido con CriptoGo. La máxima comodidad está a solo un clic de distancia.',
    features: [
      { icon: CheckCircle, title: 'Cobertura Nacional', text: 'Llegamos a las principales ciudades de Venezuela con una red logística en expansión.' },
      { icon: DollarSign, title: 'Seguimiento en Tiempo Real', text: 'Monitorea el estado de tu envío desde la salida del comercio hasta tu puerta.' },
      { icon: Users, title: 'Entregas Aseguradas', text: 'Todos los envíos están protegidos contra pérdidas o daños para tu tranquilidad.' },
      { icon: BarChart, title: 'Integración Perfecta', text: 'Solicita tu delivery directamente al momento de la compra, sin pasos adicionales.' },
    ],
    gallery: [
      { src: 'https://images.unsplash.com/photo-1586571842103-97a3a41444a1', alt: 'Repartidor entregando un paquete en la puerta', description: 'Recibe tus compras del marketplace directamente en tu hogar u oficina.' },
      { src: 'https://images.unsplash.com/photo-1615911938857-a53902616a68', alt: 'Rastreando una entrega en un mapa de teléfono inteligente', description: 'Sigue tu pedido en tiempo real desde que sale de la tienda.' },
      { src: 'https://images.unsplash.com/photo-1576495199011-b687110d59a8', alt: 'Almacén con paquetes listos para ser despachados', description: 'Una red logística eficiente para garantizar entregas rápidas y seguras.' },
    ]
  },
  tokentzc: {
    id: 'tokentzc',
    path: '/proximamente/tokentzc',
    icon: ShieldCheck,
    title: 'Token TZC & CriptoSafe',
    subtitle: 'El Corazón de Nuestro Ecosistema',
    shortDescription: 'Nuestro token de utilidad nativo, que te dará acceso a beneficios exclusivos y un nuevo concepto de ahorro y prepago.',
    gradient: 'from-red-400 to-red-600',
    heroImage: 'glowing digital token icon',
    mainDescription: 'El Token TZC es la pieza central que impulsa y unifica todo el ecosistema de TuZonaCripto. No es solo una moneda, es una llave que desbloquea un mundo de beneficios. Con CriptoSafe, podrás usar TZC para prepagar y asegurar servicios esenciales como salud, educación o seguros, protegiendo tu poder de compra de la inflación. Además, al usar la plataforma, serás recompensado con TZC, que podrás usar para obtener descuentos, acceder a funciones premium y participar en la gobernanza futura del ecosistema. Es tu pasaporte a una economía digital más justa y participativa.',
    features: [
      { icon: CheckCircle, title: 'Ahorro Inteligente (CriptoSafe)', text: 'Pre-paga servicios y congela precios para protegerte de la inflación.' },
      { icon: DollarSign, title: 'Recompensas por Lealtad', text: 'Gana TZC por cada compra, reseña o interacción dentro de la plataforma.' },
      { icon: Users, title: 'Beneficios Exclusivos', text: 'Accede a descuentos especiales, promociones y eventos solo para holders de TZC.' },
      { icon: BarChart, title: 'Gobernanza Comunitaria', text: 'En el futuro, participa en las decisiones clave del desarrollo de la plataforma.' },
    ],
    gallery: [
      { src: 'https://images.unsplash.com/photo-1639757964253-3a7c8d564232', alt: 'Token digital brillante con circuitos', description: 'El Token TZC, la llave para desbloquear beneficios exclusivos en el ecosistema.' },
      { src: 'https://images.unsplash.com/photo-1640373818923-a1d78a47471d', alt: 'Billetera digital mostrando recompensas y puntos de fidelidad', description: 'Gana recompensas en TZC por tu lealtad y participación activa.' },
      { src: 'https://images.unsplash.com/photo-1518546305921-5206263437fe', alt: 'Una alcancía protegida por un escudo', description: 'Protege tu poder de compra con CriptoSafe, nuestro sistema de ahorro y prepago.' },
    ]
  },
  criptoras: {
    id: 'criptoras',
    path: '/proximamente/criptoras',
    icon: Shield,
    title: 'CriptoRAS',
    subtitle: 'Cumplimiento y Seguridad IA',
    shortDescription: 'Nuestro módulo de inteligencia artificial dedicado a garantizar la seguridad y transparencia de todas las operaciones.',
    gradient: 'from-indigo-500 to-purple-600',
    heroImage: 'ai security system scanning data',
    mainDescription: 'La confianza es la base de nuestro ecosistema. CriptoRAS (Risk Assessment System) es nuestro guardián digital, un avanzado sistema de inteligencia artificial que trabaja 24/7 para proteger a nuestra comunidad. Analiza patrones de transacciones en tiempo real para detectar y prevenir actividades sospechosas, como el fraude o el lavado de dinero. Además, asegura que todos los comercios y usuarios cumplan con las normativas vigentes, creando un entorno seguro y transparente para todos. Con CriptoRAS, puedes operar con la total tranquilidad de que estás en una plataforma confiable y protegida.',
    features: [
      { icon: CheckCircle, title: 'Monitoreo 24/7', text: 'Análisis constante de transacciones para detectar anomalías y prevenir fraudes.' },
      { icon: DollarSign, title: 'Verificación de Identidad (KYC/KYB)', text: 'Procesos de verificación robustos para comercios y usuarios, garantizando la legitimidad.' },
      { icon: Users, title: 'Cumplimiento Normativo', text: 'Adaptación a las regulaciones locales e internacionales para una operación transparente.' },
      { icon: BarChart, title: 'Reportes de Actividad Sospechosa', text: 'Generación de alertas y reportes para una acción rápida ante posibles amenazas.' },
    ],
    gallery: [
      { src: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74', alt: 'Visualización abstracta de seguridad de datos con líneas de código', description: 'Nuestra IA monitorea transacciones 24/7 para prevenir fraudes.' },
      { src: 'https://images.unsplash.com/photo-1550645612-83f5d594b671', alt: 'Escaneo de huellas dactilares para verificación de identidad en una pantalla', description: 'Procesos de verificación robustos para un ecosistema seguro y confiable.' },
      { src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71', alt: 'Panel de seguridad con gráficos y tablas en una computadora', description: 'Análisis de datos en tiempo real para garantizar el cumplimiento y la transparencia.' },
    ]
  },
  criptoads: {
    id: 'criptoads',
    path: '/proximamente/criptoads',
    icon: Megaphone,
    title: 'CriptoAds',
    subtitle: 'Marketing Digital para Comercios Cripto',
    shortDescription: 'Un conjunto de herramientas y servicios de marketing digital para que los comercios validados amplíen su alcance.',
    gradient: 'from-green-500 to-emerald-600',
    heroImage: 'digital marketing campaign dashboard',
    mainDescription: 'En TuZonaCripto, el éxito de nuestros comercios aliados es nuestro éxito. CriptoAds es una suite de marketing digital diseñada específicamente para ellos. Desde aparecer destacados en los resultados de búsqueda de nuestro mapa hasta la creación de campañas de email marketing y notificaciones push dirigidas a nuestra base de usuarios. Ofrecemos herramientas de análisis para medir el impacto de cada campaña, permitiendo a los negocios optimizar su inversión y atraer a la creciente comunidad de usuarios cripto de manera efectiva y medible.',
    features: [
      { icon: CheckCircle, title: 'Listados Destacados', text: 'Aparece en las primeras posiciones en el mapa y las búsquedas por categoría.' },
      { icon: DollarSign, title: 'Campañas Dirigidas', text: 'Envía promociones y anuncios a segmentos específicos de usuarios por ubicación o intereses.' },
      { icon: Users, title: 'Gestión de Reseñas', text: 'Herramientas para incentivar y gestionar las opiniones de los clientes.' },
      { icon: BarChart, title: 'Análisis de Rendimiento', text: 'Dashboards con métricas clave para entender el retorno de tu inversión publicitaria.' },
    ],
    gallery: [
      { src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f', alt: 'Panel de análisis de marketing en una computadora portátil', description: 'Mide el impacto de tus campañas con dashboards de análisis detallados.' },
      { src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4', alt: 'Un listado de negocio resaltado en un mapa en una tableta', description: 'Destaca tu negocio en nuestro mapa y aumenta tu visibilidad.' },
      { src: 'https://images.unsplash.com/photo-1543286386-713bdd548da4', alt: 'Gráficos de crecimiento y estadísticas en una pantalla', description: 'Atrae a la creciente comunidad cripto de manera efectiva y medible.' },
    ]
  },
  criptorides: {
    id: 'criptorides',
    path: '/proximamente/criptorides',
    icon: Car,
    title: 'CriptoRides',
    subtitle: 'Transporte que Acepta Criptomonedas',
    shortDescription: 'Una plataforma para conectar a usuarios con servicios de transporte tipo Uber, Ridery o Yummy que aceptan criptomonedas.',
    gradient: 'from-blue-500 to-cyan-500',
    heroImage: 'self driving car on a city street at night',
    mainDescription: 'La revolución cripto llega a la movilidad urbana. CriptoRides es el puente que conecta a pasajeros con conductores de las principales plataformas de transporte que aceptan pagos en criptomonedas. A través de nuestra app, podrás solicitar un viaje y pagar directamente desde tu wallet de TuZonaCripto de forma rápida y segura. Fomentamos la adopción masiva de cripto en un servicio esencial del día a día, ofreciendo más opciones tanto a usuarios como a conductores.',
    features: [
      { icon: CheckCircle, title: 'Integración con Plataformas Populares', text: 'Conecta con conductores de servicios que ya usas y confías.' },
      { icon: DollarSign, title: 'Pagos Fáciles y Seguros', text: 'Paga tu viaje con TZC u otras criptomonedas directamente desde la app.' },
      { icon: Users, title: 'Calificaciones y Reseñas', text: 'Sistema de reputación para garantizar la calidad y seguridad del servicio.' },
      { icon: BarChart, title: 'Programa de Incentivos', text: 'Recompensas en TZC para pasajeros y conductores por usar la plataforma.' },
    ],
    gallery: [
      { src: 'https://images.unsplash.com/photo-1579362674362-5774a311d794', alt: 'Persona usando una aplicación de transporte compartido en un teléfono', description: 'Solicita un viaje y paga con criptomonedas desde una sola app.' },
      { src: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b', alt: 'Vista de una calle de la ciudad desde el interior de un coche', description: 'Conéctate con conductores de las principales plataformas de transporte.' },
      { src: 'https://images.unsplash.com/photo-1611604548018-d56bbd85d68d', alt: 'Persona completando un pago en su teléfono dentro de un coche', description: 'Una experiencia de pago segura y sin fricciones para tus viajes diarios.' },
    ]
  },
  criptolab: {
    id: 'criptolab',
    path: '/proximamente/criptolab',
    icon: Lightbulb,
    title: 'CriptoLab',
    subtitle: 'Tu Centro de Conocimiento y Educación',
    shortDescription: 'Tu centro de aprendizaje sobre el mundo cripto. Ofreceremos cursos, podcasts, entrevistas, noticias y análisis.',
    gradient: 'from-amber-500 to-yellow-500',
    heroImage: 'virtual reality classroom for learning',
    mainDescription: 'El conocimiento es poder, especialmente en el dinámico mundo de las criptomonedas. CriptoLab es nuestra iniciativa educativa para empoderar a la comunidad. Desde cursos interactivos para principiantes hasta análisis de mercado para traders avanzados, CriptoLab será tu fuente de información confiable. Produciremos podcasts con líderes de la industria, publicaremos artículos de investigación y ofreceremos webinars en vivo para que te mantengas siempre a la vanguardia. La educación es clave para una adopción masiva y segura, y CriptoLab es nuestro compromiso con ello.',
    features: [
      { icon: CheckCircle, title: 'Cursos Interactivos', text: 'Rutas de aprendizaje gamificadas para todos los niveles, desde cero hasta experto.' },
      { icon: DollarSign, title: 'Contenido Multimedia', text: 'Accede a podcasts, entrevistas en video y webinars con expertos de la industria.' },
      { icon: Users, title: 'Análisis de Mercado', text: 'Noticias curadas y análisis en profundidad para ayudarte a tomar decisiones informadas.' },
      { icon: BarChart, title: 'Comunidad de Aprendizaje', text: 'Foros y grupos de discusión para compartir conocimientos y resolver dudas con otros usuarios.' },
    ],
    gallery: [
      { src: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f', alt: 'Personas aprendiendo en un aula moderna y colaborativa', description: 'Cursos interactivos y rutas de aprendizaje para todos los niveles.' },
      { src: 'https://images.unsplash.com/photo-1558522195-e1a911434644', alt: 'Equipo de grabación de podcast con micrófonos y auriculares', description: 'Accede a podcasts, entrevistas y webinars con líderes de la industria.' },
      { src: 'https://images.unsplash.com/photo-1542744095-291d1f67b221', alt: 'Persona estudiando gráficos financieros en una pantalla', description: 'Mantente informado con noticias y análisis de mercado para tomar mejores decisiones.' },
    ]
  }
};