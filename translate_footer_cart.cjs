const fs = require('fs');
const az = JSON.parse(fs.readFileSync('src/locales/az.json', 'utf8'));
const en = JSON.parse(fs.readFileSync('src/locales/en.json', 'utf8'));
const ru = JSON.parse(fs.readFileSync('src/locales/ru.json', 'utf8'));

az.footer = {
  desc: "Ən yaxşı dənələrdən ustalıqla hazırlanmış qəhvə. Gününüzün mükəmməl başlanğıcı və ən xoş fasiləniz üçün buradayıq.",
  links_title: "Keçidlər",
  contact_title: "Əlaqə",
  address: "Nizami küçəsi 123,<br/>Bakı, Azərbaycan",
  rights: "COFFEELAND. Bütün hüquqlar qorunur.",
  privacy: "Məxfilik Siyasəti",
  terms: "İstifadə Şərtləri"
};

en.footer = {
  desc: "Masterfully crafted coffee from the finest beans. We are here for the perfect start to your day and your most pleasant breaks.",
  links_title: "Links",
  contact_title: "Contact",
  address: "123 Nizami Street,<br/>Baku, Azerbaijan",
  rights: "COFFEELAND. All rights reserved.",
  privacy: "Privacy Policy",
  terms: "Terms of Use"
};

ru.footer = {
  desc: "Мастерски сваренный кофе из лучших зерен. Мы здесь для идеального начала вашего дня и самых приятных перерывов.",
  links_title: "Ссылки",
  contact_title: "Контакты",
  address: "Улица Низами 123,<br/>Баку, Азербайджан",
  rights: "COFFEELAND. Все права защищены.",
  privacy: "Политика Конфиденциальности",
  terms: "Условия Использования"
};

az.cart = {
  title: "Səbətiniz",
  empty: "Səbətiniz boşdur.",
  total: "Cəmi:",
  checkout: "Sifarişi Təsdiqlə",
  clear: "Hamısını sil",
  alert_success: "Sifariş tamamlandı!",
  alert_error: "Sifariş yaradılarkən xəta baş verdi. Zəhmət olmasa bir daha cəhd edin."
};

en.cart = {
  title: "Your Cart",
  empty: "Your cart is empty.",
  total: "Total:",
  checkout: "Confirm Order",
  clear: "Clear All",
  alert_success: "Order completed!",
  alert_error: "An error occurred while creating the order. Please try again."
};

ru.cart = {
  title: "Ваша Корзина",
  empty: "Ваша корзина пуста.",
  total: "Итого:",
  checkout: "Подтвердить Заказ",
  clear: "Очистить Все",
  alert_success: "Заказ завершен!",
  alert_error: "Произошла ошибка при создании заказа. Пожалуйста, попробуйте снова."
};

fs.writeFileSync('src/locales/az.json', JSON.stringify(az, null, 2));
fs.writeFileSync('src/locales/en.json', JSON.stringify(en, null, 2));
fs.writeFileSync('src/locales/ru.json', JSON.stringify(ru, null, 2));
console.log("Written Footer and Cart!");
