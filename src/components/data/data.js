const products = [
  {
    id: 1,
    translations: {
      en: { name: 'Premium Fence', description: 'High-quality fence material suitable for any environment.' },
      ru: { name: 'Премиум Забор', description: 'Высококачественный забор, подходящий для любой среды.' },
      uz: { name: 'Premium Qoplama', description: 'Har qanday muhit uchun mos yuqori sifatli qoplama materiallari.' },
    },
    price: 120,
    pricePerSqm: 15,
    image: '/images/premium-fence.jpg',
  },
  {
    id: 2,
    translations: {
      en: { name: 'Eco-Friendly Wall', description: 'Made from 100% recycled materials, this wall panel is durable and green.' },
      ru: { name: 'Экологичная Стена', description: 'Сделанная из 100% переработанных материалов, эта стеновая панель прочная и экологически чистая.' },
      uz: { name: 'Ekologik Toza Devor', description: '100% qayta ishlangan materiallardan tayyorlangan, ushbu devor paneli mustahkam va ekologik toza.' },
    },
    price: 80,
    pricePerSqm: 10,
    image: '/images/eco-friendly-wall.jpg',
  },
  {
    id: 3,
    translations: {
      en: { name: 'Luxury Garden Gate', description: 'Elegant gate with a premium finish to elevate your garden.' },
      ru: { name: 'Роскошные Садовые Ворота', description: 'Элегантные ворота с премиум отделкой для улучшения вашего сада.' },
      uz: { name: 'Luxus Bog‘ Darvoza', description: 'Bog‘ingizni go‘zal qilish uchun zamonaviy va yuqori sifatli darvoza.' },
    },
    price: 200,
    pricePerSqm: 25,
    image: '/images/luxury-garden-gate.jpg',
  },
  {
    id: 4,
    translations: {
      en: { name: 'Modern Patio Deck', description: 'Stylish deck with water-resistant finish.' },
      ru: { name: 'Современная Патио Доска', description: 'Стильная палуба с водоотталкивающей отделкой.' },
      uz: { name: 'Zamonaviy Patio Deck', description: 'Suvga chidamli qoplama bilan zamonaviy qoplama.' },
    },
    price: 150,
    pricePerSqm: 18,
    image: '/images/modern-patio-deck.jpg',
  },
  {
    id: 5,
    translations: {
      en: { name: 'Solar Roof Panel', description: 'Energy-efficient solar panel with easy installation.' },
      ru: { name: 'Солнечная Крыша Панель', description: 'Энергоэффективная солнечная панель с легкой установкой.' },
      uz: { name: 'Quyosh Energiya Panellari', description: 'Oson o‘rnatiladigan energiya tejaydigan quyosh paneli.' },
    },
    price: 300,
    pricePerSqm: 30,
    image: '/images/solar-roof-panel.jpg',
  },
  {
    id: 6,
    translations: {
      en: { name: 'Decorative Stone Wall', description: 'Adds elegance and durability to your garden or home exterior.' },
      ru: { name: 'Декоративная Каменная Стена', description: 'Придает элегантность и прочность вашему саду или внешнему виду дома.' },
      uz: { name: 'Dekorativ To‘g‘on', description: 'Bog‘ingiz yoki uyingiz tashqi ko‘rinishiga nafislik va mustahkamlik qo‘shadi.' },
    },
    price: 250,
    pricePerSqm: 22,
    image: '/images/decorative-stone-wall.jpg',
  },
  {
    id: 7,
    translations: {
      en: { name: 'Synthetic Grass Turf', description: 'Eco-friendly synthetic grass for lawns and gardens.' },
      ru: { name: 'Синтетический Газон', description: 'Экологически чистая синтетическая трава для газонов и садов.' },
      uz: { name: 'Sintetik O‘t', description: 'Gazonga va bog‘larga mo‘ljallangan ekologik toza sintetik o‘t.' },
    },
    price: 100,
    pricePerSqm: 12,
    image: '/images/synthetic-grass-turf.jpg',
  },
  {
    id: 8,
    translations: {
      en: { name: 'Pergola Canopy', description: 'Sturdy and stylish canopy for outdoor areas.' },
      ru: { name: 'Перголы Тент', description: 'Прочные и стильные навесы для открытых пространств.' },
      uz: { name: 'Pergola Tenti', description: 'Ochko‘za joylar uchun mustahkam va zamonaviy tendir.' },
    },
    price: 180,
    pricePerSqm: 20,
    image: '/images/pergola-canopy.jpg',
  },
  {
    id: 9,
    translations: {
      en: { name: 'Outdoor Lighting System', description: 'Energy-efficient LED lighting for outdoor areas.' },
      ru: { name: 'Система Уличного Освещения', description: 'Энергоэффективное светодиодное освещение для открытых пространств.' },
      uz: { name: 'Tashqi Yoritish Tizimi', description: 'Ochiq joylar uchun energiya tejaydigan LED yoritgichi.' },
    },
    price: 50,
    pricePerSqm: 5,
    image: '/images/outdoor-lighting-system.jpg',
  },
  {
    id: 10,
    translations: {
      en: { name: 'Privacy Fence Panels', description: 'Tall, durable panels that provide privacy.' },
      ru: { name: 'Панели Забора Для Уединения', description: 'Высокие, прочные панели, обеспечивающие уединение.' },
      uz: { name: 'Maxfiylik Uchun Qoplamalar', description: 'Maxfiylikni ta’minlovchi baland va mustahkam panellar.' },
    },
    price: 140,
    pricePerSqm: 16,
    image: '/images/privacy-fence-panels.jpg',
  },
  {
    id: 11,
    translations: {
      en: { name: 'Glass Railing System', description: 'Stylish glass railings perfect for modern homes.' },
      ru: { name: 'Стеклянная Перила', description: 'Стильные стеклянные перила, идеально подходящие для современных домов.' },
      uz: { name: 'Shisha Tizimi', description: 'Zamonaviy uylar uchun mukammal shisha railings.' },
    },
    price: 220,
    pricePerSqm: 27,
    image: '/images/glass-railing-system.jpg',
  },
  {
    id: 12,
    translations: {
      en: { name: 'Composite Decking', description: 'Weather-resistant decking with a wood-like finish.' },
      ru: { name: 'Композитные Доски', description: 'Устойчивый к погодным условиям настил с отделкой под дерево.' },
      uz: { name: 'Kompozit Qoplamalar', description: 'Yog‘in havosi ta’siriga chidamli va yog‘ochga o‘xshash qoplama.' },
    },
    price: 160,
    pricePerSqm: 19,
    image: '/images/composite-decking.jpg',
  },
  {
    id: 13,
    translations: {
      en: { name: 'Bamboo Fencing', description: 'Eco-friendly bamboo fence for sustainable projects.' },
      ru: { name: 'Бамбуковые Заборы', description: 'Экологически чистый бамбуковый забор для устойчивых проектов.' },
      uz: { name: 'Bambuk Qoplama', description: 'Barqaror loyihalar uchun ekologik toza bambuk qoplamasi.' },
    },
    price: 130,
    pricePerSqm: 14,
    image: '/images/bamboo-fencing.jpg',
  },
  {
    id: 14,
    translations: {
      en: { name: 'Cedar Wood Siding', description: 'Natural cedar wood siding for durable, long-lasting results.' },
      ru: { name: 'Кедровый Сайдинг', description: 'Естественный кедровый сайдинг для прочных, долговечных результатов.' },
      uz: { name: 'Kedr Qoplamasi', description: 'Mustahkam va uzoq muddatli natijalar uchun tabiiy kedr qoplamasi.' },
    },
    price: 240,
    pricePerSqm: 28,
    image: '/images/cedar-wood-siding.jpg',
  },
  {
    id: 15,
    translations: {
      en: { name: 'Metal Security Gates', description: 'Strong metal gates for added security.' },
      ru: { name: 'Металлические Секьюрити Ворота', description: 'Прочные металлические ворота для дополнительной безопасности.' },
      uz: { name: 'Metall Xavfsizlik Darvozalari', description: 'Qo‘shimcha xavfsizlik uchun kuchli metall darvozalar.' },
    },
    price: 280,
    pricePerSqm: 35,
    image: '/images/metal-security-gates.jpg',
  },
  {
    id: 16,
    translations: {
      en: { name: 'Recycled Plastic Lumber', description: 'Durable lumber made from recycled plastics.' },
      ru: { name: 'Переработанная Пластиковая Доска', description: 'Прочные доски, сделанные из переработанного пластика.' },
      uz: { name: 'Qayta Ishlangan Plastmass Dastaklar', description: 'Qayta ishlangan plastmassalardan tayyorlangan mustahkam dastaklar.' },
    },
    price: 170,
    pricePerSqm: 20,
    image: '/images/recycled-plastic-lumber.jpg',
  },
  {
    id: 17,
    translations: {
      en: { name: 'Natural Stone Tiles', description: 'Beautiful stone tiles that enhance any space.' },
      ru: { name: 'Натуральные Каменные Плитки', description: 'Красивые каменные плитки, которые улучшают любое пространство.' },
      uz: { name: 'Tabiiy Tosh Poshaklar', description: 'Har qanday makonni yaxshilaydigan chiroyli tosh plitalar.' },
    },
    price: 230,
    pricePerSqm: 26,
    image: '/images/natural-stone-tiles.jpg',
  },
  {
    id: 18,
    translations: {
      en: { name: 'Brick Paving Stones', description: 'Durable paving stones for driveways and patios.' },
      ru: { name: 'Кирпичные Плитки', description: 'Прочные плитки для подъездов и патио.' },
      uz: { name: 'Tosh Qoplamalar', description: 'Avtomobil yo‘llari va patio uchun mustahkam plitalar.' },
    },
    price: 140,
    pricePerSqm: 15,
    image: '/images/brick-paving-stones.jpg',
  },
  {
    id: 19,
    translations: {
      en: { name: 'Vinyl Flooring', description: 'Stylish vinyl flooring for indoor and outdoor spaces.' },
      ru: { name: 'Виниловые Полы', description: 'Стильные виниловые полы для внутренних и наружных помещений.' },
      uz: { name: 'Vinil Pol', description: 'Ichki va tashqi makonlar uchun zamonaviy vinil pol.' },
    },
    price: 90,
    pricePerSqm: 10,
    image: '/images/vinyl-flooring.jpg',
  },
  {
    id: 20,
    translations: {
      en: { name: 'Landscape Fabric', description: 'Durable landscape fabric for weed control.' },
      ru: { name: 'Ландшафтная Ткань', description: 'Прочная ландшафтная ткань для контроля сорняков.' },
      uz: { name: 'Landschaft Tkani', description: 'Begonlardan himoya qilish uchun mustahkam llandshaft to‘qimasi.' },
    },
    price: 60,
    pricePerSqm: 7,
    image: '/images/landscape-fabric.jpg',
  }
];
export default products;
