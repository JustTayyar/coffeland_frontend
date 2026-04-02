import React, { useState, useEffect } from 'react';
import { AdminCustomerService } from '../../../services/api';
import './Customers.css';
import Loading from '../../../components/Loading/Loading';
import { FaTrash } from 'react-icons/fa';

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);
  const [errorModalMessage, setErrorModalMessage] = useState('');

  const fetchCustomers = async () => {
    try {
      const res = await AdminCustomerService.getAll();
      setCustomers(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const openDeleteModal = (id) => {
    setCustomerToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setCustomerToDelete(null);
  };

  const confirmDelete = async () => {
    if (!customerToDelete) return;
    try {
      await AdminCustomerService.delete(customerToDelete);
      fetchCustomers();
      closeDeleteModal();
    } catch (err) {
      console.error(err);
      closeDeleteModal();
      setErrorModalMessage(err.response?.data?.message || 'Silinərkən xəta baş verdi');
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header costumers-header">
        <h2>Müştərilər</h2>
      </div>

      <div className="admin-table-container">
        {loading ? (
          <Loading />
        ) : (
          <table className="admin-table2">
            <thead>
              <tr>
                <th>ID</th>
                <th>Ad / Soyad</th>
                <th>E-poçt</th>
                <th>Ünvan</th>
                <th>Qeydiyyat Tarixi</th>
                <th>Sifariş Sayı</th>
                <th>Əməliyyat</th>
              </tr>
            </thead>
            <tbody>
              {customers.map(c => (
                <tr key={c.id}>
                  <td>#{c.id}</td>
                  <td>{c.name || c.firstname}</td>
                  <td>{c.email}</td>
                  <td>{c.address || '--'}</td>
                  <td>{new Date(c.created_at).toLocaleDateString('en-GB').replace(/\//g, '-')}</td>
                  <td>
                    <span className="customer-orders-badge">{c.orders_count || 0}</span>
                  </td>
                  <td>
                    <div className="admin-action-btns">
                      <button className="btn-delete" onClick={() => openDeleteModal(c.id)}><FaTrash /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {customers.length === 0 && (
                <tr>
                  <td colSpan="7" style={{textAlign: 'center', padding: '20px'}}>Müştəri tapılmadı</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {isDeleteModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-content" style={{ maxWidth: '400px', textAlign: 'center', padding: '35px' }}>
            <div style={{ fontSize: '3rem', color: '#ef4444', marginBottom: '15px' }}><FaTrash /></div>
            <h3 style={{ color: '#fff', marginBottom: '15px', fontSize: '1.4rem', fontWeight: 600 }}>Diqqət!</h3>
            <p style={{ color: '#d4d4d8', marginBottom: '30px', fontSize: '1.05rem', lineHeight: '1.5' }}>
              Siz bu müştərinizi silmək istədiyinizə əminsinizmi?
            </p>
            <div className="admin-modal-actions" style={{ justifyContent: 'center', marginTop: '0', paddingTop: '0', borderTop: 'none' }}>
              <button type="button" className="admin-btn-secondary" onClick={closeDeleteModal}>Xeyr</button>
              <button type="button" className="admin-btn-danger" onClick={confirmDelete}>Bəli</button>
            </div>
          </div>
        </div>
      )}

      {errorModalMessage && (
        <div className="admin-modal-overlay" style={{ zIndex: 10000 }}>
          <div className="admin-modal-content" style={{ maxWidth: '400px', textAlign: 'center', padding: '35px' }}>
            <div style={{ fontSize: '3rem', color: '#ef4444', marginBottom: '15px' }}>⚠️</div>
            <h3 style={{ color: '#fff', marginBottom: '15px', fontSize: '1.4rem', fontWeight: 600 }}>Xəta!</h3>
            <p style={{ color: '#d4d4d8', marginBottom: '30px', fontSize: '1.05rem', lineHeight: '1.5' }}>
              {errorModalMessage}
            </p>
            <div className="admin-modal-actions" style={{ justifyContent: 'center', marginTop: '0', paddingTop: '0', borderTop: 'none' }}>
              <button type="button" className="admin-btn-primary" onClick={() => setErrorModalMessage('')}>Bağla</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
