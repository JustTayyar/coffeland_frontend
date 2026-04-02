import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layouts/MainLayout';
import BlogLayout from './layouts/BlogLayout';
import ShopAdminLayout from './layouts/ShopAdminLayout/ShopAdminLayout';        
import KdsLayout from './layouts/KdsLayout/KdsLayout';

import Home from './pages/Home/Home';
import About from './pages/About/About';
import Menu from './pages/Menu/Menu';
import Favorites from './pages/Favorites/Favorites';
import Orders from './pages/Orders/Orders';
import AuthPage from './pages/Auth/AuthPage';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import Profile from './pages/Profile/Profile';

import AdminLogin from './pages/ShopAdmin/Auth/Login';
import ShopDashboard from './pages/ShopAdmin/Dashboard/Dashboard';
import ShopProducts from './pages/ShopAdmin/Products/Products';
import ShopBlogs from './pages/ShopAdmin/Blogs/Blogs';
import ShopCustomers from './pages/ShopAdmin/Customers/Customers';
import ShopWorkers from './pages/ShopAdmin/Workers/Workers';
import ShopInventory from './pages/ShopAdmin/Inventory/Inventory';
import ShopKDS from './pages/ShopAdmin/KDS/KDS';
import ShopSettings from './pages/ShopAdmin/Settings/Settings';

import Privacy from './pages/Privacy/Privacy';
import Terms from './pages/Terms/Terms';
import Contact from './pages/Contact/Contact';
import Blogs from './pages/Blogs/Blogs';
import BlogDetail from './pages/BlogDetail/BlogDetail';
import Error from './components/Error/Error';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Customer Routes with MainLayout (Navbar, Footer) */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="menu" element={<Menu />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="orders" element={<Orders />} />
          <Route path="login" element={<AuthPage />} />
          <Route path="register" element={<AuthPage />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="profile" element={<Profile />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<Error />} />
        </Route>

        {/* Blog Routes with BlogLayout */}
        <Route path="/blogs" element={<BlogLayout />}>
          <Route index element={<Blogs />} />
          <Route path=":id" element={<BlogDetail />} />
        </Route>

        {/* Admin/User Login Route */}
        <Route path="/admin/auth/login" element={<AdminLogin />} />

        {/* KDS Route (Full Screen, separate from Admin Layout) */}
        <Route path="/kds" element={<KdsLayout />}>
          <Route index element={<ShopKDS />} />
        </Route>

        {/* Admin Routes with ShopAdminLayout (RBAC included inside layout) */}
        <Route path="/admin" element={<ShopAdminLayout />}>
          <Route index element={<ShopDashboard />} />
          <Route path="products" element={<ShopProducts />} />
          <Route path="blogs" element={<ShopBlogs />} />
          <Route path="customers" element={<ShopCustomers />} />
          <Route path="workers" element={<ShopWorkers />} />          
          <Route path="inventory" element={<ShopInventory />} />
          <Route path="settings" element={<ShopSettings />} />        </Route>
      </Routes>
    </Router>
  );
}

export default App;

