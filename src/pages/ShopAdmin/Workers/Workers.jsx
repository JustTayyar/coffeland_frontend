import React, { useState, useEffect } from 'react';
import { AdminWorkerService } from '../../../services/api';
import { FaEdit, FaTrash, FaPlus, FaTimes, FaUserTie } from 'react-icons/fa';
import Loading from '../../../components/Loading/Loading';
import './Workers.css';
import { useTranslation } from 'react-i18next';

export default function Workers() {
  const { t } = useTranslation();
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentWorker, setCurrentWorker] = useState(null);
  
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  });

  const fetchWorkers = async () => {
    setLoading(true);
    try {
      const res = await AdminWorkerService.getAll();
      setWorkers(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkers();
  }, []);

  const openAddModal = () => {
    setCurrentWorker(null);
    setFormData({ firstname: '', lastname: '', email: '', password: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (worker) => {
    setCurrentWorker(worker);
    setFormData({
      firstname: worker.firstname || worker.name?.split(' ')[0] || '',
      lastname: worker.lastname || worker.name?.split(' ')[1] || '',
      email: worker.email,
      password: ''
    });
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentWorker) {
        await AdminWorkerService.update(currentWorker.id, formData);
      } else {
        await AdminWorkerService.create(formData);
      }
      setIsModalOpen(false);
      fetchWorkers();
    } catch (err) {
      console.error('API Error:', err.response?.data);
      alert(t('admin.workers.err_prefix') + (err.response?.data?.message || t('admin.workers.err_unknown')));
    }
  };

  const handleDelete = async (id) => {
    if(window.confirm(t('admin.workers.del_confirm'))) {
      try {
        await AdminWorkerService.delete(id);
        fetchWorkers();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="worker-page">
      <div className="worker-page-header">
        <h2>{t('admin.workers.title')}</h2>
        <button className="worker-btn-primary" onClick={openAddModal}>
          <FaPlus /> {t('admin.workers.btn_new')}
        </button>
      </div>

      <div className="worker-table-container">
        {loading ? (
          <Loading />
        ) : (
          <table className="worker-table">
            <thead>
              <tr>
                <th>{t('admin.workers.th_id')}</th>
                <th>{t('admin.workers.th_name')}</th>
                <th>{t('admin.workers.th_email')}</th>
                <th>{t('admin.workers.th_date')}</th>
                <th>{t('admin.workers.th_actions')}</th>
              </tr>
            </thead>
            <tbody>
              {workers.map(w => (
                <tr key={w.id}>
                  <td>#{w.id}</td>
                  <td>{w.name}</td>
                  <td>{w.email}</td>
                  <td>{new Date(w.created_at).toLocaleDateString('en-GB').replace(/\//g, '-')}</td>
                  <td>
                    <div className="worker-action-btns">
                      <button className="worker-btn-edit" onClick={() => openEditModal(w)}><FaEdit /></button>
                      <button className="worker-btn-delete" onClick={() => handleDelete(w.id)}><FaTrash /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {workers.length === 0 && (
                <tr>
                  <td colSpan="5" style={{textAlign: 'center', padding: '20px'}}>{t('admin.workers.not_found')}</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {isModalOpen && (
        <div className="worker-modal-overlay">
          <div className="worker-modal-content">
            <div className="worker-modal-header">
              <h3>{currentWorker ? t('admin.workers.modal_edit_title') : t('admin.workers.modal_add_title')}</h3>
              <button className="worker-modal-close-btn" onClick={closeModal} type="button"><FaTimes /></button>
            </div>
            <form onSubmit={handleSubmit} className="worker-modal-form">
              <div className="worker-modal-form-grid">
                <div className="worker-form-group">
                  <label>{t('admin.workers.lbl_firstname')} <span style={{color:'red'}}>*</span></label>
                  <input type="text" required value={formData.firstname} onChange={e => setFormData({...formData, firstname: e.target.value})} placeholder={t('admin.workers.plc_firstname')} />
                </div>
                
                <div className="worker-form-group">
                  <label>{t('admin.workers.lbl_lastname')}</label>
                  <input type="text" value={formData.lastname} onChange={e => setFormData({...formData, lastname: e.target.value})} placeholder={t('admin.workers.plc_lastname')} />
                </div>
                
                <div className="worker-form-group full-width">
                  <label>{t('admin.workers.lbl_email')} <span style={{color:'red'}}>*</span></label>
                  <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder={t('admin.workers.plc_email')} />
                </div>

                <div className="worker-form-group full-width">
                  <label>{t('admin.workers.lbl_password')}</label>
                  <input type="password" required={!currentWorker} minLength={6} value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} placeholder={currentWorker ? t('admin.workers.plc_pass_edit') : t('admin.workers.plc_pass_new')} />
                </div>
              </div>

              <div className="worker-modal-actions">
                <button type="button" className="worker-btn-secondary" onClick={closeModal}>{t('admin.workers.btn_cancel')}</button>
                <button type="submit" className="worker-btn-primary">{t('admin.workers.btn_save')}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
