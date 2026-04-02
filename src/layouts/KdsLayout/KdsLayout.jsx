import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AuthService } from '../../services/api';
import './KdsLayout.css';

export default function KdsLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    // Cihazda qalması üçün localStorage istifadə edirik
    const isKdsAuth = localStorage.getItem('kds_auth');
    if (isKdsAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleKdsLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await AuthService.login({ email, password });
      const userData = response.data.user;
      
      // Yalnız admin və ya worker KDS-ə girə bilər
      if (userData.role === 'admin' || userData.role === 'worker') {
        localStorage.setItem('kds_auth', 'true');
        if (response.data.token) {
          localStorage.setItem('kds_token', response.data.token);
        }
        setIsAuthenticated(true);
      } else {
        setError('Sizin KDS sisteminə giriş icazəniz yoxdur.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Email və ya şifrə yanlışdır.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKdsLogout = () => {
    localStorage.removeItem('kds_auth');
    localStorage.removeItem('kds_token');
    setIsAuthenticated(false);
  };

  const handleBackToAdmin = () => {
    const adminUserRaw = localStorage.getItem('admin_user');
    if (adminUserRaw) {
      try {
        const adminUser = JSON.parse(adminUserRaw);
        if (adminUser.role === 'admin') {
          navigate('/admin');
          return;
        }
      } catch (e) {
        console.error("Admin user parse error", e);
      }
    }
    navigate('/admin/auth/login');
  };

  // Əgər giriş edilməyibsə login ekranını göstər
  if (!isAuthenticated) {
    return (
      <div className="kds-auth-container">
        <div className="kds-auth-box">
          <h2>KDS Girişi</h2>
          <p>Mətbəx və Bar idarəetmə sisteminə daxil olmaq üçün təsdiqləyin.</p>
          
          {error && <div className="kds-auth-error">{error}</div>}

          <form onSubmit={handleKdsLogin}>
            <div className="kds-form-group">
              <label>Email</label>
              <input 
                type="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                required 
                autoFocus
              />
            </div>
            <div className="kds-form-group">
              <label>Şifrə</label>
              <input 
                type="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                required 
              />
            </div>
            <button type="submit" className="kds-login-btn" disabled={isLoading}>
              {isLoading ? 'Yoxlanılır...' : 'Daxil Ol'}
            </button>
            <button type="button" className="kds-back-btn" onClick={handleBackToAdmin}>
              Admin Panelə Qayıt
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Giriş uğurludursa KDS interfeysini göstər
  return (
    <div style={{ width: '100vw', height: '100vh', margin: 0, padding: 0, backgroundColor: '#111827', overflow: 'hidden', position: 'relative' }}>
      {/* İstəyə bağlı olaraq KDS-dən çıxış düyməsi əlavə edilə bilər */}
      <button 
        onClick={handleKdsLogout} 
        style={{
          position: 'absolute', top: '15px', right: '15px', zIndex: 100,
          background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', border: '1px solid #ef4444',
          padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold'
        }}
      >
        KDS Çıxış
      </button>

      <Outlet />
    </div>
  );
}
