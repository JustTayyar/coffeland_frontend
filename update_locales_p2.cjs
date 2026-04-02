const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'src', 'locales');
const langs = ['az', 'en', 'ru'];

const adminData = {
  az: {
    products: {
      title: "Məhsullar",
      btn_new: "Yeni Məhsul",
      search_placeholder: "Məhsul adına görə axtarış...",
      th_id: "ID",
      th_image: "Şəkil",
      th_name: "Ad",
      th_category: "Kateqoriya",
      th_subcategory: "Alt Kateqoriya",
      th_price: "Qiymət",
      th_actions: "Əməliyyat",
      no_image: "Şəkil yoxdur",
      not_found: "Məhsul tapılmadı",
      modal_edit_title: "Məhsulu Redaktə Et",
      modal_add_title: "Yeni Məhsul Əlavə Et",
      lbl_name: "Məhsul Adı",
      plc_name: "Məhsulun adı",
      lbl_category: "Kateqoriya",
      lbl_select_main: "Ana Kateqoriya Seçin",
      lbl_subcategory: "Alt Kateqoriya",
      lbl_select_sub_first: "Əvvəlcə Kateqoriya Seçin",
      lbl_select_sub: "Alt Kateqoriya Seçin",
      lbl_price: "Qiymət (₼)",
      lbl_image: "Məhsul Şəkli (Yalnız PNG)",
      lbl_upload_png: "PNG yükləyin",
      lbl_desc: "Açıqlama",
      plc_desc: "Məhsul haqqında qısa məlumat...",
      btn_cancel: "Ləğv et",
      btn_save: "Yadda Saxla",
      del_title: "Diqqət!",
      del_msg: "Siz bu məhsulu silmək istədiyinizə əminsinizmi?",
      btn_no: "Xeyr",
      btn_yes: "Bəli",
      err_cat_required: "Ana kateqoriya seçilməlidir!",
      err_general: "Xəta baş verdi"
    },
    blogs: {
      title: "Bloqlar",
      btn_new: "Yeni Bloq",
      th_id: "ID",
      th_title: "Başlıq",
      th_category: "Kateqoriya",
      th_date: "Tarix",
      th_actions: "Əməliyyat",
      not_found: "Bloq tapılmadı",
      modal_edit_title: "Bloqu Redaktə Et",
      modal_add_title: "Yeni Bloq Əlavə Et",
      lbl_title: "Başlıq",
      plc_title: "Bloqun başlığı",
      lbl_category: "Kateqoriya",
      plc_category: "Kofe haqqında",
      lbl_date: "Tarix",
      lbl_image: "Bloq Şəkli (JPEG, JPG, PNG, WEBP)",
      lbl_upload_img: "Şəkil yükləyin",
      lbl_content: "Məzmun",
      plc_content: "Bloqun məzmunu buraya yazılır...",
      btn_cancel: "Ləğv et",
      btn_save: "Yadda Saxla",
      del_confirm: "Bu bloqu silməyə əminsiniz?",
      err_general: "Xəta baş verdi"
    }
  },
  en: {
    products: {
      title: "Products",
      btn_new: "New Product",
      search_placeholder: "Search by product name...",
      th_id: "ID",
      th_image: "Image",
      th_name: "Name",
      th_category: "Category",
      th_subcategory: "Sub Category",
      th_price: "Price",
      th_actions: "Actions",
      no_image: "No image",
      not_found: "Product not found",
      modal_edit_title: "Edit Product",
      modal_add_title: "Add New Product",
      lbl_name: "Product Name",
      plc_name: "Name of the product",
      lbl_category: "Category",
      lbl_select_main: "Select Main Category",
      lbl_subcategory: "Subcategory",
      lbl_select_sub_first: "Select Category First",
      lbl_select_sub: "Select Subcategory",
      lbl_price: "Price (₼)",
      lbl_image: "Product Image (PNG Only)",
      lbl_upload_png: "Upload PNG",
      lbl_desc: "Description",
      plc_desc: "Short info about the product...",
      btn_cancel: "Cancel",
      btn_save: "Save",
      del_title: "Attention!",
      del_msg: "Are you sure you want to delete this product?",
      btn_no: "No",
      btn_yes: "Yes",
      err_cat_required: "Main category must be selected!",
      err_general: "An error occurred"
    },
    blogs: {
      title: "Blogs",
      btn_new: "New Blog",
      th_id: "ID",
      th_title: "Title",
      th_category: "Category",
      th_date: "Date",
      th_actions: "Actions",
      not_found: "Blog not found",
      modal_edit_title: "Edit Blog",
      modal_add_title: "Add New Blog",
      lbl_title: "Title",
      plc_title: "Blog title",
      lbl_category: "Category",
      plc_category: "About coffee",
      lbl_date: "Date",
      lbl_image: "Blog Image (JPEG, JPG, PNG, WEBP)",
      lbl_upload_img: "Upload image",
      lbl_content: "Content",
      plc_content: "Blog content goes here...",
      btn_cancel: "Cancel",
      btn_save: "Save",
      del_confirm: "Are you sure you want to delete this blog?",
      err_general: "An error occurred"
    }
  },
  ru: {
    products: {
      title: "Продукты",
      btn_new: "Новый продукт",
      search_placeholder: "Поиск по названию...",
      th_id: "ID",
      th_image: "Изображение",
      th_name: "Название",
      th_category: "Категория",
      th_subcategory: "Подкатегория",
      th_price: "Цена",
      th_actions: "Действия",
      no_image: "Нет изобр.",
      not_found: "Продукт не найден",
      modal_edit_title: "Редактировать продукт",
      modal_add_title: "Добавить продукт",
      lbl_name: "Название продукта",
      plc_name: "Название",
      lbl_category: "Категория",
      lbl_select_main: "Выберите категорию",
      lbl_subcategory: "Подкатегория",
      lbl_select_sub_first: "Сначала выберите кат.",
      lbl_select_sub: "Выберите подкатегорию",
      lbl_price: "Цена (₼)",
      lbl_image: "Изображение (только PNG)",
      lbl_upload_png: "Загрузить PNG",
      lbl_desc: "Описание",
      plc_desc: "Краткая информация...",
      btn_cancel: "Отмена",
      btn_save: "Сохранить",
      del_title: "Внимание!",
      del_msg: "Вы уверены, что хотите удалить этот продукт?",
      btn_no: "Нет",
      btn_yes: "Да",
      err_cat_required: "Категория должна быть выбрана!",
      err_general: "Произошла ошибка"
    },
    blogs: {
      title: "Блоги",
      btn_new: "Новый блог",
      th_id: "ID",
      th_title: "Заголовок",
      th_category: "Категория",
      th_date: "Дата",
      th_actions: "Действия",
      not_found: "Блог не найден",
      modal_edit_title: "Редактировать блог",
      modal_add_title: "Новый блог",
      lbl_title: "Заголовок",
      plc_title: "Заголовок блога",
      lbl_category: "Категория",
      plc_category: "О кофе",
      lbl_date: "Дата",
      lbl_image: "Изображение (JPEG, JPG, PNG, WEBP)",
      lbl_upload_img: "Загрузить фото",
      lbl_content: "Контент",
      plc_content: "Содержимое блога...",
      btn_cancel: "Отмена",
      btn_save: "Сохранить",
      del_confirm: "Вы уверены, что хотите удалить этот блог?",
      err_general: "Произошла ошибка"
    }
  }
};

langs.forEach(lng => {
  const filePath = path.join(localesDir, `${lng}.json`);
  if (fs.existsSync(filePath)) {
    const raw = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(raw);
    data.admin.products = adminData[lng].products;
    data.admin.blogs = adminData[lng].blogs;
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  } else {
      console.log(`Could not find ${filePath}`);
  }
});

console.log('Locales updated for Products/Blogs!');
