const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'src', 'locales');
const langs = ['az', 'en', 'ru'];

const adminData = {
  az: {
    customers: {
      title: "Müştərilər",
      th_id: "ID",
      th_name: "Ad / Soyad",
      th_email: "E-poçt",
      th_address: "Ünvan",
      th_joined: "Qeydiyyat Tarixi",
      th_orders_count: "Sifariş Sayı",
      th_actions: "Əməliyyat",
      not_found: "Müştəri tapılmadı",
      del_title: "Diqqət!",
      del_msg: "Siz bu müştərinizi silmək istədiyinizə əminsinizmi?",
      btn_no: "Xeyr",
      btn_yes: "Bəli",
      err_title: "Xəta!",
      btn_close: "Bağla",
      err_delete: "Silinərkən xəta baş verdi"
    },
    inventory: {
      title: "Anbar / Məmulatlar",
      btn_new: "Yeni Məmulatlar",
      th_name: "Məmulat Adı",
      th_stock: "Ehtiyat (Stok)",
      th_unit: "Ölçü Vahidi",
      th_actions: "Əməliyyat",
      not_found: "Anbarda heç bir məmulat yoxdur",
      modal_edit_title: "Məmulatı Yenilə",
      modal_add_title: "Yeni Məmulatlar",
      lbl_name: "Məmulat Adı",
      plc_name: "Məsələn: Südlü Şokolad",
      lbl_unit: "Ölçü Vahidi",
      lbl_stock: "Mövcud Stok",
      btn_cancel: "Ləğv et",
      btn_save: "Yadda Saxla",
      unit_kg: "Kiloqram (Kq)",
      unit_gr: "Qram (q)",
      unit_l: "Litr (L)",
      unit_ml: "Millilitr (ml)",
      unit_pcs: "Ədəd (Əd)",
      err_general: "Xəta baş verdi",
      del_confirm: "Bu məmulatı anbardan silməyə əminsiniz?"
    }
  },
  en: {
    customers: {
      title: "Customers",
      th_id: "ID",
      th_name: "Full Name",
      th_email: "Email",
      th_address: "Address",
      th_joined: "Registration Date",
      th_orders_count: "Orders Count",
      th_actions: "Actions",
      not_found: "Customer not found",
      del_title: "Attention!",
      del_msg: "Are you sure you want to delete this customer?",
      btn_no: "No",
      btn_yes: "Yes",
      err_title: "Error!",
      btn_close: "Close",
      err_delete: "Error occurred while deleting"
    },
    inventory: {
      title: "Inventory / Ingredients",
      btn_new: "New Ingredients",
      th_name: "Ingredient Name",
      th_stock: "Stock",
      th_unit: "Unit",
      th_actions: "Actions",
      not_found: "No ingredients in inventory",
      modal_edit_title: "Update Ingredient",
      modal_add_title: "New Ingredients",
      lbl_name: "Ingredient Name",
      plc_name: "E.g: Milk Chocolate",
      lbl_unit: "Unit of Measurement",
      lbl_stock: "Available Stock",
      btn_cancel: "Cancel",
      btn_save: "Save",
      unit_kg: "Kilogram (Kg)",
      unit_gr: "Gram (g)",
      unit_l: "Liter (L)",
      unit_ml: "Milliliter (ml)",
      unit_pcs: "Pieces (Pcs)",
      err_general: "An error occurred",
      del_confirm: "Are you sure you want to delete this ingredient from inventory?"
    }
  },
  ru: {
    customers: {
      title: "Клиенты",
      th_id: "ID",
      th_name: "Имя / Фамилия",
      th_email: "Эл. почта",
      th_address: "Адрес",
      th_joined: "Дата регистрации",
      th_orders_count: "Количество заказов",
      th_actions: "Действия",
      not_found: "Покупатель не найден",
      del_title: "Внимание!",
      del_msg: "Вы уверены, что хотите удалить этого клиента?",
      btn_no: "Нет",
      btn_yes: "Да",
      err_title: "Ошибка!",
      btn_close: "Закрыть",
      err_delete: "Произошла ошибка при удалении"
    },
    inventory: {
      title: "Инвентарь / Ингредиенты",
      btn_new: "Новые ингредиенты",
      th_name: "Название ингредиента",
      th_stock: "Запас",
      th_unit: "Единица измерения",
      th_actions: "Действия",
      not_found: "В инвентаре нет ингредиенлов",
      modal_edit_title: "Обновить ингредиент",
      modal_add_title: "Новый ингредиент",
      lbl_name: "Название",
      plc_name: "Например: Молочный шоколад",
      lbl_unit: "Единица",
      lbl_stock: "Доступный запас",
      btn_cancel: "Отмена",
      btn_save: "Сохранить",
      unit_kg: "Килограмм (Кг)",
      unit_gr: "Грамм (г)",
      unit_l: "Литр (Л)",
      unit_ml: "Миллилитр (мл)",
      unit_pcs: "Штук (Шт)",
      err_general: "Произошла ошибка",
      del_confirm: "Вы уверены, что хотите удалить этот ингредиент из инвентаря?"
    }
  }
};

langs.forEach(lng => {
  const filePath = path.join(localesDir, `${lng}.json`);
  if (fs.existsSync(filePath)) {
    const raw = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(raw);
    data.admin.customers = adminData[lng].customers;
    data.admin.inventory = adminData[lng].inventory;
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  } else {
      console.log(`Could not find ${filePath}`);
  }
});

console.log('Locales updated for Customers/Inventory!');
