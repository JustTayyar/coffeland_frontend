import axios from 'axios';

// Backend (Laravel) URL-i. 
// Gələcəkdə canlıya (production) çıxanda bunu .env faylından oxudacağıq.
const API_BASE_URL = 'https://coffeland-backend.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request Interceptor - Tokeni avtomatik əlavə et
api.interceptors.request.use(
  (config) => {
    const url = config.url || '';
    
    // KDS sorğuları üçün localStorage-dan kds_token istifadə et
    const kdsToken = localStorage.getItem('kds_token');
    
    // Admin panel sorğuları üçün admin_token istifadə et
    const adminToken = localStorage.getItem('admin_token');
    
    // Müştəri sorğuları üçün token istifadə et
    const customerToken = localStorage.getItem('token');

    if (url.includes('/admin/') && kdsToken) {
      config.headers.Authorization = `Bearer ${kdsToken}`;
    } else if (url.includes('/admin/') && adminToken) {
      config.headers.Authorization = `Bearer ${adminToken}`;
    } else if (customerToken) {
      config.headers.Authorization = `Bearer ${customerToken}`;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor - Qlobal xəta tutucu (Məsələn 401 gələrsə logindən çıxart)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && !error.config.url.includes('/login')) {
      const path = window.location.pathname;
      
      if (path.startsWith('/admin') || path.startsWith('/kds')) {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
        localStorage.removeItem('kds_token');
        localStorage.removeItem('kds_auth');
        window.location.href = '/admin/auth/login';
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const OrderService = {
  // Müştəri sifariş verdikdə
  createOrder: (orderData) => {
    return api.post('/orders', orderData);
  },

  // İstifadəçinin sifarişlərini çəkdikdə
  getUserOrders: (userId) => {
    return api.get(`/orders?user_id=${userId}`);
  },

  // Admin sifarişləri çəkdikdə (Əgər shop_id göndərilməsə hamısını gətirir)
  getAdminOrders: (shopId = '') => {
    return api.get(`/admin/orders?shop_id=${shopId}`);
  },
  // İstifadəçi sifarişi izlədikdə
  getOrderStatus: (orderId) => {
    return api.get(`/orders/${orderId}`);
  },
  // Admin statusu dəyişdikdə
  updateOrderStatus: (orderId, status) => {
    return api.put(`/admin/orders/${orderId}/status`, { status });
  },

  // Sifarişi tamamilə sildikdə
  deleteOrder: (orderId) => {
    return api.delete(`/admin/orders/${orderId}`);
  }
};

export const AuthService = {
  register: (data) => {
    return api.post('/register', data);
  },
  login: (data) => {
    return api.post('/login', data);
  }
};

export const BlogService = {
  getAllBlogs: () => {
    return api.get('/blogs');
  },
  getBlogById: (id) => {
    return api.get(`/blogs/${id}`);
  }
};

export const ProductService = {
  getAllProducts: () => {
    return api.get('/products');
  },
  getProductById: (id) => {
    return api.get(`/products/${id}`);
  }
};

export const AdminDashboardService = {
  getStats: () => {
    return api.get('/admin/dashboard');
  }
};

export default api;
export const AdminProductService = {
  getAll: () => api.get('/admin/products'),
  create: (data) => api.post('/admin/products', data),
  update: (id, data) => api.put(`/admin/products/${id}`, data),
  delete: (id) => api.delete(`/admin/products/${id}`)
};

export const AdminBlogService = {
  getAll: () => api.get('/admin/blogs'),
  create: (data) => api.post('/admin/blogs', data),
  update: (id, data) => api.put(`/admin/blogs/${id}`, data),
  delete: (id) => api.delete(`/admin/blogs/${id}`)
};

export const AdminCustomerService = {
  getAll: () => api.get('/admin/customers'),
  delete: (id) => api.delete(`/admin/customers/${id}`)
};

export const AdminWorkerService = {
  getAll: () => api.get('/admin/workers'),
  create: (data) => api.post('/admin/workers', data),
  update: (id, data) => api.put(`/admin/workers/${id}`, data),
  delete: (id) => api.delete(`/admin/workers/${id}`)
};



export const AdminProfileService = {
  getProfile: () => api.get('/admin/profile'),
  updateProfile: (data) => api.put('/admin/profile', data)
};

export const AdminIngredientService = {
  getAll: () => api.get('/admin/ingredients'),
  create: (data) => api.post('/admin/ingredients', data),
  update: (id, data) => api.put(`/admin/ingredients/${id}`, data),
  delete: (id) => api.delete(`/admin/ingredients/${id}`)
};
