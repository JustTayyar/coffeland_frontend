const fs = require('fs');
const az = JSON.parse(fs.readFileSync('src/locales/az.json', 'utf8'));
const en = JSON.parse(fs.readFileSync('src/locales/en.json', 'utf8'));
const ru = JSON.parse(fs.readFileSync('src/locales/ru.json', 'utf8'));

az.auth.email_pop = "E-poçt @ işarəsi olmalıdır";
az.auth.pass_pop2 = "Min. 8 simvol, 1 böyük hərf, 1 durğu işarəsi";
az.auth.pass_conf_placeholder = "Şifrəni təkrar daxil edin";
az.auth.pass_match_success = "Şifrəniz uyğundur ✓";

en.auth.email_pop = "Email must contain an @ symbol";
en.auth.pass_pop2 = "Min. 8 chars, 1 uppercase, 1 special char";
en.auth.pass_conf_placeholder = "Enter password again";
en.auth.pass_match_success = "Passwords match ✓";

ru.auth.email_pop = "Email должен содержать символ @";
ru.auth.pass_pop2 = "Мин. 8 символов, 1 заглавная, 1 спец. символ";
ru.auth.pass_conf_placeholder = "Введите пароль повторно";
ru.auth.pass_match_success = "Пароли совпадают ✓";

fs.writeFileSync('src/locales/az.json', JSON.stringify(az, null, 2));
fs.writeFileSync('src/locales/en.json', JSON.stringify(en, null, 2));
fs.writeFileSync('src/locales/ru.json', JSON.stringify(ru, null, 2));
console.log("Written missing Auth texts!");
