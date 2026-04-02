const fs = require('fs');
const az = JSON.parse(fs.readFileSync('src/locales/az.json', 'utf8'));
const en = JSON.parse(fs.readFileSync('src/locales/en.json', 'utf8'));
const ru = JSON.parse(fs.readFileSync('src/locales/ru.json', 'utf8'));

az.profile = {
  guest: "Qonaq İstifadəçi",
  status_pending: "Gözləyir",
  status_preparing: "Hazırlanır",
  status_completed: "Tamamlandı",
  tab_info: "Məlumatlarım",
  tab_orders: "Sifarişlərim",
  tab_favs: "Seçilmişlər",
  tab_settings: "Tənzimləmələr",
  logout: "Çıxış et",
  fname: "Ad", lname: "Soyad",
  email: "E-poçt", address: "Ünvan",
  not_provided: "Qeyd olunmayıb",
  btn_edit: "Məlumatları Yenilə",
  alert_success: "Məlumatlar uğurla yeniləndi!",
  new_email: "Yeni E-poçt",
  del_address: "Çatdırılma Ünvanı",
  address_placeholder: "Ünvanınızı buraya daxil edin",
  new_pass: "Yeni Şifrə",
  new_pass_placeholder: "Yeni şifrənizi təyin edin",
  pass_conf: "Şifrənin Təkrarı",
  pass_conf_placeholder: "Yeni şifrəni bir daha yazın",
  btn_save: "Yadda Saxla"
};

az.orders = {
  title: "Sifarişlərim",
  sub: "Keçmiş sifarişlərinizə baxın və izləyin",
  empty_title: "Hələ sifariş yoxdur",
  empty_sub: "Menyumuzdan ləzzətli məhsullar seçib ilk sifarişinizi verin!",
  btn_menu: "Menyuya Keç",
  history: "Sifariş Tarixçəsi",
  order_count: "sifariş",
  order_lbl: "Sifariş",
  no_date: "Tarix yoxdur",
  products: "Məhsullar",
  product_lbl: "Məhsul #",
  total: "Cəmi",
  completed: "Tamamlandı",
  pending: "Gözləyir"
};

en.profile = {
  guest: "Guest User",
  status_pending: "Pending",
  status_preparing: "Preparing",
  status_completed: "Completed",
  tab_info: "My Info",
  tab_orders: "My Orders",
  tab_favs: "Favorites",
  tab_settings: "Settings",
  logout: "Logout",
  fname: "First Name", lname: "Last Name",
  email: "Email", address: "Address",
  not_provided: "Not provided",
  btn_edit: "Update Info",
  alert_success: "Information updated successfully!",
  new_email: "New Email",
  del_address: "Delivery Address",
  address_placeholder: "Enter your address here",
  new_pass: "New Password",
  new_pass_placeholder: "Set your new password",
  pass_conf: "Confirm Password",
  pass_conf_placeholder: "Type the new password again",
  btn_save: "Save"
};

en.orders = {
  title: "My Orders",
  sub: "View and track your previous orders",
  empty_title: "No orders yet",
  empty_sub: "Choose delicious products from our menu and place your first order!",
  btn_menu: "Go to Menu",
  history: "Order History",
  order_count: "orders",
  order_lbl: "Order",
  no_date: "No date",
  products: "Products",
  product_lbl: "Product #",
  total: "Total",
  completed: "Completed",
  pending: "Pending"
};

ru.profile = {
  guest: "Гость",
  status_pending: "В ожидании",
  status_preparing: "Готовится",
  status_completed: "Завершен",
  tab_info: "Моя Информация",
  tab_orders: "Мои Заказы",
  tab_favs: "Избранное",
  tab_settings: "Настройки",
  logout: "Выйти",
  fname: "Имя", lname: "Фамилия",
  email: "Эл. почта", address: "Адрес",
  not_provided: "Не указано",
  btn_edit: "Обновить",
  alert_success: "Информация успешно обновлена!",
  new_email: "Новая эл. почта",
  del_address: "Адрес доставки",
  address_placeholder: "Введите ваш адрес здесь",
  new_pass: "Новый пароль",
  new_pass_placeholder: "Установите новый пароль",
  pass_conf: "Подтверждение пароля",
  pass_conf_placeholder: "Введите новый пароль еще раз",
  btn_save: "Сохранить"
};

ru.orders = {
  title: "Мои Заказы",
  sub: "Просмотр и отслеживание ваших предыдущих заказов",
  empty_title: "Пока нет заказов",
  empty_sub: "Выберите вкусные продукты из нашего меню и сделайте свой первый заказ!",
  btn_menu: "Перейти в Меню",
  history: "История Заказов",
  order_count: "заказов",
  order_lbl: "Заказ",
  no_date: "Нет даты",
  products: "Продукты",
  product_lbl: "Продукт #",
  total: "Итого",
  completed: "Завершен",
  pending: "В ожидании"
};

fs.writeFileSync('src/locales/az.json', JSON.stringify(az, null, 2));
fs.writeFileSync('src/locales/en.json', JSON.stringify(en, null, 2));
fs.writeFileSync('src/locales/ru.json', JSON.stringify(ru, null, 2));
console.log("Written Dashboard!");
