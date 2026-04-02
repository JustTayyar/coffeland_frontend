const fs = require('fs');
const az = JSON.parse(fs.readFileSync('src/locales/az.json', 'utf8'));
const en = JSON.parse(fs.readFileSync('src/locales/en.json', 'utf8'));
const ru = JSON.parse(fs.readFileSync('src/locales/ru.json', 'utf8'));

az.about = {
  hero: { title: "Hekayəmiz", sub: "Bir fincan qəhvədən daha çoxu" },
  story: {
    badge1: "2026", badge2: "Quruluş", sub: "Başlanğıc", title: "Tutqudan Reallığa",
    p1: "2026-cü ildə Bakının qəlbində kiçik bir arzu ilə başladıq: insanlara sadəcə kofein deyil, həm də ilham verən bir təcrübə bəxş etmək. Biz inanırıq ki, hər qəhvə dənəsi bir hekayə danışır – torpağın, günəşin və onu yetişdirən əllərin hekayəsini.",
    p2: "Bizim missiyamız, dünyanın ən keyfiyyətli arabika dənələrini birbaşa fermerlərdən əldə edərək, onları ənənəvi üsullarla qovurmaq və sizə təqdim etməkdir.",
    stat1: "Müştəri", stat2: "Qəhvə Növü", stat3: "Təbii"
  },
  values: {
    title: "Bizim Dəyərlərimiz", sub: "Hər fincanda hiss etdiyiniz mükəmməlliyin arxasındakı prinsiplər",
    v1: { title: "Davamlılıq", desc: "Təbiətə zərər vermədən, ekoloji təmiz qablaşdırma və istehsal üsullarından istifadə edirik." },
    v2: { title: "Keyfiyyət", desc: "Hər zaman ən təzə və ən yüksək keyfiyyətli məhsulları seçirik. Kompromis yoxdur." },
    v3: { title: "İcma", desc: "Qəhvə evimiz sadəcə mağaza deyil, dostların görüşdüyü, fikirlərin paylaşıldığı bir məkandır." }
  },
  team: {
    title: "Peşəkar Komandamız", sub: "Sizə hər gün xidmət edən, işinə aşiq olan simalar",
    role1: "Baş Barista", role2: "Menecer", role3: "Qəhvə Ustası (Roaster)",
    desc1: "Qəhvə dəmləmə və latte art üzrə 8 illik təcrübəyə malikdir.",
    desc2: "Müştəri məmnuniyyəti və qüsursuz xidmətdən cavabdehdir.",
    desc3: "Qəhvə dənələrini ən düzgün profildə qovuran sənətkardır."
  }
};

en.about = {
  hero: { title: "Our Story", sub: "More than just a cup of coffee" },
  story: {
    badge1: "2026", badge2: "Founded", sub: "The Beginning", title: "From Passion to Reality",
    p1: "We started in 2026 in the heart of Baku with a small dream: to give people not just caffeine, but an inspiring experience. We believe every coffee bean tells a story – of the soil, the sun, and the hands that grew it.",
    p2: "Our mission is to source the finest arabica beans directly from farmers, roast them using traditional methods, and present them to you.",
    stat1: "Customers", stat2: "Coffee Types", stat3: "Organic"
  },
  values: {
    title: "Our Values", sub: "The principles behind the perfection in every cup",
    v1: { title: "Sustainability", desc: "We use eco-friendly packaging and production methods without harming nature." },
    v2: { title: "Quality", desc: "We always choose the freshest and highest quality products. No compromises." },
    v3: { title: "Community", desc: "Our coffee house is not just a shop, it's a place where friends meet and ideas are shared." }
  },
  team: {
    title: "Our Professional Team", sub: "Passionate faces serving you every day",
    role1: "Head Barista", role2: "Manager", role3: "Roaster",
    desc1: "8 years of experience in coffee brewing and latte art.",
    desc2: "Responsible for customer satisfaction and flawless service.",
    desc3: "The artisan who roasts coffee beans to the perfect profile."
  }
};

ru.about = {
  hero: { title: "Наша История", sub: "Больше, чем просто чашка кофе" },
  story: {
    badge1: "2026", badge2: "Основание", sub: "Начало", title: "От Страсти к Реальности",
    p1: "Мы начали в 2026 году в самом сердце Баку с небольшой мечты: подарить людям не просто кофеин, а вдохновляющий опыт. Мы верим, что каждое кофейное зерно рассказывает историю – о земле, солнце и руках, которые его вырастили.",
    p2: "Наша миссия – получать лучшие зерна арабики напрямую от фермеров, обжаривать их традиционными методами и предлагать вам.",
    stat1: "Клиентов", stat2: "Сортов Кофе", stat3: "Органический"
  },
  values: {
    title: "Наши Ценности", sub: "Принципы, стоящие за совершенством в каждой чашке",
    v1: { title: "Устойчивость", desc: "Мы используем экологически чистую упаковку и методы производства, не нанося вреда природе." },
    v2: { title: "Качество", desc: "Мы всегда выбираем самые свежие и качественные продукты. Никаких компромиссов." },
    v3: { title: "Сообщество", desc: "Наша кофейня – это не просто магазин, это место, где встречаются друзья и делятся идеями." }
  },
  team: {
    title: "Наша Профессиональная Команда", sub: "Увлеченные лица, которые обслуживают вас каждый день",
    role1: "Главный Бариста", role2: "Менеджер", role3: "Мастер по Обжарке",
    desc1: "8 лет опыта в приготовлении кофе и латте-арт.",
    desc2: "Отвечает за удовлетворенность клиентов и безупречный сервис.",
    desc3: "Ремесленник, обжаривающий кофейные зерна до идеального профиля."
  }
};

az.menu = {
  all: "Bütün",
  add: "Səbətə At"
};

en.menu = {
  all: "All",
  add: "Add to Cart"
};

ru.menu = {
  all: "Все",
  add: "В Корзину"
};

fs.writeFileSync('src/locales/az.json', JSON.stringify(az, null, 2));
fs.writeFileSync('src/locales/en.json', JSON.stringify(en, null, 2));
fs.writeFileSync('src/locales/ru.json', JSON.stringify(ru, null, 2));
console.log("Written About and Menu!");
