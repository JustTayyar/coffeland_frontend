const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'src', 'locales');
const langs = ['az', 'en', 'ru'];

const adminData = {
  az: {
    workers: {
      title: "KDS İşçiləri",
      btn_new: "Yeni İşçi (KDS)",
      th_id: "ID",
      th_name: "Ad / Soyad",
      th_email: "Email (Giriş)",
      th_date: "Tarix",
      th_actions: "Əməliyyat",
      not_found: "Sistemdə heç bir işçi (worker) yoxdur",
      modal_edit_title: "İşçini Redaktə Et",
      modal_add_title: "Yeni İşçi Əlavə Et",
      lbl_firstname: "Ad",
      plc_firstname: "İşçinin adı",
      lbl_lastname: "Soyad",
      plc_lastname: "Soyadı",
      lbl_email: "Email (Onun üçün login olacaq)",
      plc_email: "meselen: barista1@kofeshop.com",
      lbl_password: "Şifrə",
      plc_pass_edit: "Dəyişmək istəmirsinizsə boş saxlayın",
      plc_pass_new: "Ən az 6 simvol",
      btn_cancel: "Ləğv et",
      btn_save: "Yadda Saxla",
      err_prefix: "Xəta baş verdi: ",
      err_unknown: "Bilinməyən xəta",
      del_confirm: "Bu işçini sistemdən silməyə əminsiniz?"
    },
    settings: {
      title: "Profil Ayarları",
      lbl_email: "E-poçt (Giriş Login-iniz)",
      sub_title_pass: "Şifrəni Dəyişdir (Opsional)",
      lbl_current_pass: "Hazırkı Şifrə",
      plc_current_pass: "Mövcud şifrənizi yazın",
      lbl_new_pass: "Yeni Şifrə",
      plc_new_pass: "Ən az 6 simvol",
      lbl_new_pass_conf: "Yeni Şifrə (Təkrar)",
      plc_new_pass_conf: "Yeni şifrəni təkrar yazın",
      btn_update: "Məlumatları Yenilə",
      err_general: "Xəta baş verdi"
    }
  },
  en: {
    workers: {
      title: "KDS Workers",
      btn_new: "New Worker (KDS)",
      th_id: "ID",
      th_name: "Full Name",
      th_email: "Email (Login)",
      th_date: "Date",
      th_actions: "Actions",
      not_found: "There are no workers in the system",
      modal_edit_title: "Edit Worker",
      modal_add_title: "Add New Worker",
      lbl_firstname: "First Name",
      plc_firstname: "Worker's name",
      lbl_lastname: "Last Name",
      plc_lastname: "Surname",
      lbl_email: "Email (Will be used for login)",
      plc_email: "e.g: barista1@coffeeshop.com",
      lbl_password: "Password",
      plc_pass_edit: "Leave empty if you don't want to change",
      plc_pass_new: "At least 6 characters",
      btn_cancel: "Cancel",
      btn_save: "Save",
      err_prefix: "An error occurred: ",
      err_unknown: "Unknown error",
      del_confirm: "Are you sure you want to delete this worker from the system?"
    },
    settings: {
      title: "Profile Settings",
      lbl_email: "E-mail (Your Login)",
      sub_title_pass: "Change Password (Optional)",
      lbl_current_pass: "Current Password",
      plc_current_pass: "Enter your current password",
      lbl_new_pass: "New Password",
      plc_new_pass: "At least 6 characters",
      lbl_new_pass_conf: "New Password (Confirm)",
      plc_new_pass_conf: "Repeat the new password",
      btn_update: "Update Information",
      err_general: "An error occurred"
    }
  },
  ru: {
    workers: {
      title: "Работники KDS",
      btn_new: "Новый работник (KDS)",
      th_id: "ID",
      th_name: "Имя / Фамилия",
      th_email: "Email (Вход)",
      th_date: "Дата",
      th_actions: "Действия",
      not_found: "В системе нет работников",
      modal_edit_title: "Редактировать сотрудника",
      modal_add_title: "Добавить сотрудника",
      lbl_firstname: "Имя",
      plc_firstname: "Имя сотрудника",
      lbl_lastname: "Фамилия",
      plc_lastname: "Фамилия",
      lbl_email: "Email (Будет логином)",
      plc_email: "напр: barista1@coffeeshop.com",
      lbl_password: "Пароль",
      plc_pass_edit: "Оставьте пустым, если не хотите менять",
      plc_pass_new: "Не менее 6 символов",
      btn_cancel: "Отмена",
      btn_save: "Сохранить",
      err_prefix: "Произошла ошибка: ",
      err_unknown: "Неизвестная ошибка",
      del_confirm: "Вы уверены, что хотите удалить этого сотрудника из системы?"
    },
    settings: {
      title: "Настройки профиля",
      lbl_email: "Эл. почта (Ваш логин)",
      sub_title_pass: "Сменить пароль (Опционально)",
      lbl_current_pass: "Текущий пароль",
      plc_current_pass: "Введите текущий пароль",
      lbl_new_pass: "Новый пароль",
      plc_new_pass: "Не менее 6 символов",
      lbl_new_pass_conf: "Новый пароль (Подтверждение)",
      plc_new_pass_conf: "Повторите новый пароль",
      btn_update: "Обновить данные",
      err_general: "Произошла ошибка"
    }
  }
};

langs.forEach(lng => {
  const filePath = path.join(localesDir, `${lng}.json`);
  if (fs.existsSync(filePath)) {
    const raw = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(raw);
    data.admin.workers = adminData[lng].workers;
    data.admin.settings = adminData[lng].settings;
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  } else {
      console.log(`Could not find ${filePath}`);
  }
});

console.log('Locales updated for Workers/Settings!');
