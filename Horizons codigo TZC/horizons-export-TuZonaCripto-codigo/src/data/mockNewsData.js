import React from 'react';

export const newsCategories = [
  { id: 'all', name: 'Todas' },
  { id: 'crypto', name: 'Criptomonedas' },
  { id: 'ai', name: 'Inteligencia Artificial' },
  { id: 'tech', name: 'Tecnología' },
  { id: 'aml', name: 'Prevención de Legitimación de Capitales' },
];

const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);
const twoDaysAgo = new Date(today);
twoDaysAgo.setDate(today.getDate() - 2);

// Helper para generar URLs de placehold.co con algo de variedad
const getPlaceholderUrl = (text, id) => {
  const bgColor = ['3498db', 'e74c3c', '2ecc71', 'f1c40f', '9b59b6', '1abc9c', 'd35400', '2c3e50'][id % 8];
  const textColor = 'ffffff';
  return `https://placehold.co/800x600/${bgColor}/${textColor}?text=${encodeURIComponent(text)}&font=montserrat`;
};


export const mockNewsItems = [
  {
    id: '1',
    title: 'Bitcoin alcanza nuevo máximo histórico mientras la adopción institucional crece',
    source: 'CriptoNoticias Hoy',
    date: today.toISOString(),
    category: 'crypto',
    slug: 'bitcoin-maximo-historico-adopcion',
    content: 'El precio de Bitcoin superó los $75,000 USD hoy, impulsado por anuncios de grandes instituciones financieras que están integrando BTC en sus carteras de inversión. Analistas predicen que esta tendencia continuará.',
    imageUrl: getPlaceholderUrl('Cripto Noticia 1', 1),
    tags: ['Bitcoin', 'Inversión', 'Mercado Cripto']
  },
  {
    id: '2',
    title: 'Innovadora IA generativa crea música y arte con calidad humana',
    source: 'IA Avanzada Semanal',
    date: yesterday.toISOString(),
    category: 'ai',
    slug: 'ia-generativa-musica-arte',
    content: 'Una nueva startup ha revelado un modelo de IA capaz de componer piezas musicales complejas y generar obras de arte visual indistinguibles de las creadas por humanos. Esto abre debates sobre la creatividad y los derechos de autor.',
    imageUrl: getPlaceholderUrl('IA Noticia 2', 2),
    tags: ['IA Generativa', 'Arte Digital', 'Música IA']
  },
  {
    id: '3',
    title: 'Reguladores globales se reúnen para discutir el marco de la Prevención de Lavado de Dinero en DeFi',
    source: 'Finanzas Transparentes Global',
    date: twoDaysAgo.toISOString(),
    category: 'aml',
    slug: 'regulacion-aml-defi',
    content: 'Representantes de organismos reguladores de más de 20 países se han reunido para establecer directrices comunes sobre cómo aplicar las normativas de Prevención de Lavado de Dinero (AML) al creciente sector de las Finanzas Descentralizadas (DeFi).',
    imageUrl: getPlaceholderUrl('AML Noticia 3', 3),
    tags: ['AML', 'DeFi', 'Regulación Financiera']
  },
  {
    id: '4',
    title: 'La Web3 y el Metaverso: Próximas fronteras de la interacción digital',
    source: 'Tecno Futuro',
    date: today.toISOString(),
    category: 'tech',
    slug: 'web3-metaverso-fronteras-digitales',
    content: 'Expertos en tecnología analizan cómo la Web3 y el Metaverso están convergiendo para crear nuevas experiencias inmersivas, transformando desde el entretenimiento hasta el trabajo remoto y la educación.',
    imageUrl: getPlaceholderUrl('Tecnología Noticia 4', 4),
    tags: ['Web3', 'Metaverso', 'Tecnología Inmersiva']
  },
  {
    id: '5',
    title: 'Ethereum considera nuevas actualizaciones para mejorar la escalabilidad y reducir las tarifas de gas',
    source: 'Diario Ethereum',
    date: yesterday.toISOString(),
    category: 'crypto',
    slug: 'ethereum-actualizaciones-escalabilidad',
    content: 'La Fundación Ethereum está evaluando varias propuestas de mejora (EIPs) destinadas a aumentar la capacidad de la red y disminuir significativamente los costos de transacción, vitales para su ecosistema de DApps.',
    imageUrl: getPlaceholderUrl('Cripto Noticia 5', 5),
    tags: ['Ethereum', 'Escalabilidad', 'Gas Fees']
  },
  {
    id: '6',
    title: 'El impacto de la computación cuántica en la seguridad de las criptomonedas',
    source: 'Seguridad Digital Profunda',
    date: twoDaysAgo.toISOString(),
    category: 'tech',
    slug: 'computacion-cuantica-cripto-seguridad',
    content: 'A medida que avanza la computación cuántica, surgen preocupaciones sobre su potencial para romper los algoritmos de cifrado actuales que protegen las criptomonedas. Investigadores trabajan en soluciones cuántico-resistentes.',
    imageUrl: getPlaceholderUrl('Tecnología Noticia 6', 6),
    tags: ['Computación Cuántica', 'Ciberseguridad', 'Criptografía']
  },
   {
    id: '7',
    title: 'Avances en IA para la detección temprana de fraudes financieros',
    source: 'Observatorio AML',
    date: today.toISOString(),
    category: 'aml',
    slug: 'ia-deteccion-fraude-financiero',
    content: 'Nuevos algoritmos de IA están demostrando una eficacia sin precedentes en la identificación de patrones sospechosos y la prevención de fraudes financieros y legitimación de capitales, incluso antes de que ocurran.',
    imageUrl: getPlaceholderUrl('AML Noticia 7', 7),
    tags: ['IA', 'AML', 'Fraude Financiero']
  },
  {
    id: '8',
    title: 'NFTs evolucionan: De coleccionables digitales a utilidades en el mundo real',
    source: 'Cripto Tendencias',
    date: yesterday.toISOString(),
    category: 'crypto',
    slug: 'nfts-evolucion-utilidades',
    content: 'Los Tokens No Fungibles (NFTs) están trascendiendo su uso como simples coleccionables de arte digital. Ahora se exploran aplicaciones para entradas a eventos, propiedad de activos reales, y más.',
    imageUrl: getPlaceholderUrl('Cripto Noticia 8', 8),
    tags: ['NFTs', 'Tokenización', 'Web3']
  }
];