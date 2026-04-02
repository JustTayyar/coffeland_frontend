import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { AuthService } from '../../../services/api';
import './Auth.css';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { adminLogin } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await AuthService.login({ email, password });
      const userData = response.data.user;
      
      if (response.data.token) {
        localStorage.setItem('admin_token', response.data.token);
      }

      // Əgər giriş uğurludursa və admin və ya worker-dirsə yönləndir
      if (userData.role === 'admin') {
        adminLogin(userData);
        navigate('/admin');
      } else if (userData.role === 'worker') {
        adminLogin(userData);
        navigate('/kds');
      } else {
        setError('Siz admin və ya işçi deyilsiniz!');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'İstifadəçi adı və ya şifrə yanlışdır.');
    }
  };

  return (
    <div className="admin-auth-container">
      <div className="admin-auth-box">
        <h2>Panel Girişi</h2>
        <p>Admin üçün giriş</p>
        
        {error && <div className="admin-auth-error">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Şifrə</label>
            <input 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="admin-login-btn">Daxil Ol</button>
        </form>
      </div>
    </div>
  );
}
