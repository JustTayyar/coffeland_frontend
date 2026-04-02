const fs = require('fs');
const az = JSON.parse(fs.readFileSync('src/locales/az.json', 'utf8'));
const en = JSON.parse(fs.readFileSync('src/locales/en.json', 'utf8'));
const ru = JSON.parse(fs.readFileSync('src/locales/ru.json', 'utf8'));

az.favorites = {
  title: "Seçilmişlər", sub: "Bəyəndiyiniz qəhvələr bir yerdə",
  empty_title: "Hələ heç nəyi bəyənməmisiniz",
  empty_sub: "Menyumuza göz atın və sevimli qəhvələrinizi seçilmişlərə əlavə edin.",
  btn_menu: "Menyuya Bax"
};

en.favorites = {
  title: "Favorites", sub: "Your favorite coffees in one place",
  empty_title: "You haven't liked anything yet",
  empty_sub: "Browse our menu and add your favorite coffees to favorites.",
  btn_menu: "View Menu"
};

ru.favorites = {
  title: "Избранное", sub: "Ваш любимый кофе в одном месте",
  empty_title: "Вам еще ничего не понравилось",
  empty_sub: "Посмотрите наше меню и добавьте свой любимый кофе в избранное.",
  btn_menu: "Смотреть Меню"
};

fs.writeFileSync('src/locales/az.json', JSON.stringify(az, null, 2));
fs.writeFileSync('src/locales/en.json', JSON.stringify(en, null, 2));
fs.writeFileSync('src/locales/ru.json', JSON.stringify(ru, null, 2));
console.log("Written Favorites!");
