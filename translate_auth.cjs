const fs = require('fs');
const az = JSON.parse(fs.readFileSync('src/locales/az.json', 'utf8'));
const en = JSON.parse(fs.readFileSync('src/locales/en.json', 'utf8'));
const ru = JSON.parse(fs.readFileSync('src/locales/ru.json', 'utf8'));

az.auth = {
  login_title: "Daxil Ol", login_sub: "Hesabınıza daxil olun",
  email_label: "E-poçt", email_placeholder: "sizin@email.com",
  pass_label: "Şifrə", pass_placeholder: "Şifrənizi daxil edin",
  btn_login: "Daxil Ol", no_account: "Hesabınız yoxdur?", register_link: "Qeydiyyatdan keçin",
  err_email_req: "E-poçt tələb olunur", err_email_invalid: "Düzgün e-poçt daxil edin",
  err_pass_req: "Şifrə tələb olunur", err_pass_min: "Şifrə minimum 6 simvol olmalıdır",
  register_title: "Qeydiyyat", register_sub: "Yeni hesab yaradın",
  fname_label: "Ad", fname_placeholder: "Adınız", fname_pop: "Ad minimum 3 hərf olmalıdır",
  lname_label: "Soyad", lname_placeholder: "Soyadınız", lname_pop: "Soyad minimum 5 hərf olmalıdır",
  address_label: "Ünvan", address_placeholder: "Ünvanınız (məs: Bakı ş., Nizami küç. 42)", address_pop: "Ünvan minimum 5 simvol olmalıdır",
  pass_conf_label: "Şifrə Təkrarı", pass_conf_placeholder: "Şifrəni yenidən daxil edin", pass_pop: "Şifrə: Minimum 8 simvol, 1 böyük hərf, 1 rəqəm",
  err_email_format: "E-poçt @ işarəsi olmalıdır və doğru formatda olmalıdır",
  err_pass_weak: "Şifrə çox zəifdir. Min. 8 simvol, 1 böyük hərf, 1 rəqəm olmalıdır",
  err_pass_match: "Şifrələr uyğun deyil", strength: "Şifrə Gücü",
  btn_register: "Qeydiyyatdan Keç", has_account: "Artıq hesabınız var?", login_link: "Daxil olun",
  alert_success: "Qeydiyyat uğurludur!"
};

en.auth = {
  login_title: "Login", login_sub: "Sign in to your account",
  email_label: "Email", email_placeholder: "your@email.com",
  pass_label: "Password", pass_placeholder: "Enter your password",
  btn_login: "Login", no_account: "Don't have an account?", register_link: "Sign up",
  err_email_req: "Email is required", err_email_invalid: "Enter a valid email",
  err_pass_req: "Password is required", err_pass_min: "Password must be at least 6 characters",
  register_title: "Register", register_sub: "Create a new account",
  fname_label: "First Name", fname_placeholder: "Your First Name", fname_pop: "First name must be at least 3 characters",
  lname_label: "Last Name", lname_placeholder: "Your Last Name", lname_pop: "Last name must be at least 5 characters",
  address_label: "Address", address_placeholder: "Your address (e.g., 123 Main St)", address_pop: "Address must be at least 5 characters",
  pass_conf_label: "Confirm Password", pass_conf_placeholder: "Enter your password again", pass_pop: "Password: Min 8 chars, 1 uppercase, 1 number",
  err_email_format: "Email must be a valid format with an @ symbol",
  err_pass_weak: "Password is too weak. Must have min 8 chars, 1 uppercase, 1 number",
  err_pass_match: "Passwords do not match", strength: "Password Strength",
  btn_register: "Sign Up", has_account: "Already have an account?", login_link: "Log in",
  alert_success: "Registration successful!"
};

ru.auth = {
  login_title: "Войти", login_sub: "Войдите в свой аккаунт",
  email_label: "Эл. почта", email_placeholder: "ваш@email.com",
  pass_label: "Пароль", pass_placeholder: "Введите ваш пароль",
  btn_login: "Войти", no_account: "Нет аккаунта?", register_link: "Зарегистрируйтесь",
  err_email_req: "Требуется эл. почта", err_email_invalid: "Введите корректный эл. адрес",
  err_pass_req: "Требуется пароль", err_pass_min: "Пароль должен содержать минимум 6 символов",
  register_title: "Регистрация", register_sub: "Создайте новый аккаунт",
  fname_label: "Имя", fname_placeholder: "Ваше имя", fname_pop: "Имя должно содержать минимум 3 символа",
  lname_label: "Фамилия", lname_placeholder: "Ваше фамилия", lname_pop: "Фамилия должна содержать минимум 5 символов",
  address_label: "Адрес", address_placeholder: "Ваш адрес (например, ул. Ленина 123)", address_pop: "Адрес должен содержать минимум 5 символов",
  pass_conf_label: "Подтвердите пароль", pass_conf_placeholder: "Введите пароль еще раз", pass_pop: "Пароль: Мин. 8 символов, 1 заглавная буква, 1 цифра",
  err_email_format: "Эл. почта должна быть в правильном формате с символом @",
  err_pass_weak: "Пароль слишком слабый. Мин. 8 символов, 1 заглавная буква, 1 цифра",
  err_pass_match: "Пароли не совпадают", strength: "Надежность пароля",
  btn_register: "Зарегистрироваться", has_account: "Уже есть аккаунт?", login_link: "Войти",
  alert_success: "Регистрация прошла успешно!"
};

fs.writeFileSync('src/locales/az.json', JSON.stringify(az, null, 2));
fs.writeFileSync('src/locales/en.json', JSON.stringify(en, null, 2));
fs.writeFileSync('src/locales/ru.json', JSON.stringify(ru, null, 2));
console.log("Written Auth!");
