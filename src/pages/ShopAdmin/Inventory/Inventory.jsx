import React, { useState, useEffect, useRef } from 'react';
import { AdminIngredientService } from '../../../services/api';
import { FaEdit, FaTrash, FaPlus, FaTimes, FaBoxOpen, FaChevronDown } from 'react-icons/fa';
import Loading from '../../../components/Loading/Loading';
import './Inventory.css';
import { useTranslation } from 'react-i18next';

// Xüsusi Dropdown komponenti
const CustomSelect = ({ value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value) || options[0];

  return (
    <div className="custom-select-container" ref={dropdownRef}>
      <div 
        className={`custom-select-trigger ${isOpen ? 'active' : ''}`} 
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedOption.label}</span>
        <FaChevronDown className={`custom-select-icon ${isOpen ? 'open' : ''}`} />
      </div>
      {isOpen && (
        <div className="custom-select-menu">
          {options.map((option) => (
            <div
              key={option.value}
              className={`custom-select-option ${option.value === value ? 'selected' : ''}`}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function Inventory() {
  const { t } = useTranslation();
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIngredient, setCurrentIngredient] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    unit: 'kq',
    stock: 0
  });

  const unitOptions = [
    { value: 'kq', label: t('admin.inventory.unit_kg') },
    { value: 'qr', label: t('admin.inventory.unit_gr') },
    { value: 'litr', label: t('admin.inventory.unit_l') },
    { value: 'ml', label: t('admin.inventory.unit_ml') },
    { value: 'eded', label: t('admin.inventory.unit_pcs') },
  ];

  const fetchIngredients = async () => {
    setLoading(true);
    try {
      const res = await AdminIngredientService.getAll();
      setIngredients(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIngredients();
  }, []);

  const openAddModal = () => {
    setCurrentIngredient(null);
    setFormData({ name: '', unit: 'kq', stock: 0 });
    setIsModalOpen(true);
  };

  const openEditModal = (ing) => {
    setCurrentIngredient(ing);
    setFormData({
      name: ing.name,
      unit: ing.unit,
      stock: ing.stock
    });
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentIngredient) {
        await AdminIngredientService.update(currentIngredient.id, formData);
      } else {
        await AdminIngredientService.create(formData);
      }
      setIsModalOpen(false);
      fetchIngredients();
    } catch (err) {
      console.error('API Error:', err.response?.data);
      alert(t('admin.inventory.err_general'));
    }
  };

  const handleDelete = async (id) => {
    if(window.confirm(t('admin.inventory.del_confirm'))) {
      try {
        await AdminIngredientService.delete(id);
        fetchIngredients();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="inventory-page">
      <div className="inventory-page-header">
        <h2>{t('admin.inventory.title')}</h2>
        <button className="inventory-btn-primary" onClick={openAddModal}>
          <FaPlus /> {t('admin.inventory.btn_new')}
        </button>
      </div>

      <div className="inventory-table-container">
        {loading ? (
          <Loading />
        ) : (
          <table className="inventory-table">
            <thead>
              <tr>
                <th>{t('admin.inventory.th_name')}</th>
                <th>{t('admin.inventory.th_stock')}</th>
                <th>{t('admin.inventory.th_unit')}</th>
                <th>{t('admin.inventory.th_actions')}</th>
              </tr>
            </thead>
            <tbody>
              {ingredients.map(ing => (
                <tr key={ing.id}>
                  <td>{ing.name}</td>
                  <td>{Number(ing.stock)}</td>
                  <td>{ing.unit}</td>
                  <td>
                    <div className="inventory-action-btns">
                      <button className="inventory-btn-edit" onClick={() => openEditModal(ing)}><FaEdit /></button>
                      <button className="inventory-btn-delete" onClick={() => handleDelete(ing.id)}><FaTrash /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {ingredients.length === 0 && (
                <tr>
                  <td colSpan="4" style={{textAlign: 'center', padding: '20px'}}>{t('admin.inventory.not_found')}</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {isModalOpen && (
        <div className="inventory-modal-overlay">
          <div className="inventory-modal-content">
            <div className="inventory-modal-header">
              <h3>{currentIngredient ? t('admin.inventory.modal_edit_title') : t('admin.inventory.modal_add_title')}</h3>
              <button className="inventory-modal-close-btn" type="button" onClick={closeModal}><FaTimes /></button>
            </div>
            <form onSubmit={handleSubmit} className="inventory-modal-form">
              <div className="inventory-modal-form-grid">
                <div className="inventory-form-group full-width">
                  <label>{t('admin.inventory.lbl_name')}</label>
                  <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder={t('admin.inventory.plc_name')} />
                </div>
                
                <div className="inventory-form-group">
                  <label>{t('admin.inventory.lbl_unit')}</label>
                  <CustomSelect 
                    value={formData.unit} 
                    options={unitOptions}
                    onChange={(val) => setFormData({...formData, unit: val})} 
                  />
                </div>

                <div className="inventory-form-group">
                  <label>{t('admin.inventory.lbl_stock')}</label>
                  <input type="number" step="0.01" required value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} />
                </div>
              </div>

              <div className="inventory-modal-actions">
                <button type="button" className="inventory-btn-secondary" onClick={closeModal}>{t('admin.inventory.btn_cancel')}</button>
                <button type="submit" className="inventory-btn-primary">{t('admin.inventory.btn_save')}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
