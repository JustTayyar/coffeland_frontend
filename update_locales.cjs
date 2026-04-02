const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'src', 'locales');
const langs = ['az', 'en', 'ru'];

const adminData = {
  az: {
    sidebar: {
      panel: "İdarəetmə Paneli",
      stats: "Statistika",
      products: "Məhsullar",
      blogs: "Bloqlar",
      customers: "Müştərilər",
      workers: "Əməkdaşlar",
      inventory: "Anbar",
      settings: "Ayarlar",
      logout: "Çıxış",
      light_mode: "Açıq rejim",
      dark_mode: "Tünd rejim"
    },
    dashboard: {
      welcome: "Xoş Gəlmisiniz",
      subtitle: "Aşağıda sizin mağazanın anlıq statistikasını görə bilərsiniz.",
      active_products: "Aktiv Məhsullar",
      customers: "Müştərilər",
      orders_today: "Bugünkü Sifarişlər",
      orders_preparing: "Hazırlanan Sifarişlər",
      orders_completed_all: "Tamamlanmış Sifarişlər (Ümumi)",
      orders_cancelled_today: "Ləğv Edilmiş (Bugün)",
      orders_cancelled_all: "Ləğv Edilib (Ümumi)",
      revenue_today: "Gəlir (Bugün)",
      revenue_all: "Ümumi Qazanc (Bütün Zamanlar)",
      top_selling: "Ən Çox Satılan",
      pieces: "ədəd",
      recent_orders: "Son Sifarişlər (Canlı İzləmə)",
      no_recent_orders: "Son sifariş yoxdur.",
      th_order: "Sifariş",
      th_customer: "Müştəri",
      th_datetime: "Tarix / Saat",
      th_amount: "Məbləğ",
      th_total_items: "Cəmi Məhsul",
      th_status: "Status",
      status_cancelled: "Ləğv edildi",
      status_completed: "Tamamlandı",
      loading: "Yüklənir..."
    }
  },
  en: {
    sidebar: {
      panel: "Control Panel",
      stats: "Statistics",
      products: "Products",
      blogs: "Blogs",
      customers: "Customers",
      workers: "Workers",
      inventory: "Inventory",
      settings: "Settings",
      logout: "Logout",
      light_mode: "Light mode",
      dark_mode: "Dark mode"
    },
    dashboard: {
      welcome: "Welcome",
      subtitle: "Below you can see the real-time statistics of your store.",
      active_products: "Active Products",
      customers: "Customers",
      orders_today: "Orders Today",
      orders_preparing: "Orders Preparing",
      orders_completed_all: "Completed Orders (Total)",
      orders_cancelled_today: "Cancelled (Today)",
      orders_cancelled_all: "Cancelled (Total)",
      revenue_today: "Revenue (Today)",
      revenue_all: "Total Revenue (All Time)",
      top_selling: "Top Selling",
      pieces: "pcs",
      recent_orders: "Recent Orders (Live)",
      no_recent_orders: "No recent orders.",
      th_order: "Order",
      th_customer: "Customer",
      th_datetime: "Date / Time",
      th_amount: "Amount",
      th_total_items: "Total Items",
      th_status: "Status",
      status_cancelled: "Cancelled",
      status_completed: "Completed",
      loading: "Loading..."
    }
  },
  ru: {
    sidebar: {
      panel: "Панель управления",
      stats: "Статистика",
      products: "Продукты",
      blogs: "Блоги",
      customers: "Клиенты",
      workers: "Сотрудники",
      inventory: "Инвентарь",
      settings: "Настройки",
      logout: "Выйти",
      light_mode: "Светлый режим",
      dark_mode: "Темный режим"
    },
    dashboard: {
      welcome: "Добро пожаловать",
      subtitle: "Ниже вы можете видеть статистику вашего магазина в реальном времени.",
      active_products: "Активные продукты",
      customers: "Клиенты",
      orders_today: "Заказы сегодня",
      orders_preparing: "Готовящиеся заказы",
      orders_completed_all: "Завершенные заказы (Всего)",
      orders_cancelled_today: "Отмененные (Сегодня)",
      orders_cancelled_all: "Отмененные (Всего)",
      revenue_today: "Выручка (Сегодня)",
      revenue_all: "Общая выручка (За все время)",
      top_selling: "Самый продаваемый",
      pieces: "шт.",
      recent_orders: "Последние заказы (Вживую)",
      no_recent_orders: "Нет последних заказов.",
      th_order: "Заказ",
      th_customer: "Клиент",
      th_datetime: "Дата / Время",
      th_amount: "Сумма",
      th_total_items: "Всего товаров",
      th_status: "Статус",
      status_cancelled: "Отменен",
      status_completed: "Завершен",
      loading: "Загрузка..."
    }
  }
};

langs.forEach(lng => {
  const filePath = path.join(localesDir, `${lng}.json`);
  if (fs.existsSync(filePath)) {
    const raw = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(raw);
    data.admin = { ...data.admin, ...adminData[lng] };
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  } else {
      console.log(`Could not find ${filePath}`);
  }
});

console.log('Locales updated!');
