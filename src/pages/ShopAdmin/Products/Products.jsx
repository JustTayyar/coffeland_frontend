import React, { useState, useEffect, useRef } from 'react';
import { AdminProductService } from '../../../services/api';
import './Products.css';
import { FaEdit, FaTrash, FaPlus, FaChevronDown, FaTimes } from 'react-icons/fa';
import Loading from '../../../components/Loading/Loading';
import { useTranslation } from 'react-i18next';

const categoryMap = {
  "İçkilər": [
    "Klassik Kofe", "Soyuq kofelər", "Çaylar", "Şirələr", 
    "Milkshake və Smoothie", "Digər isti içkilər", "Soft drinks", "Su"
  ],
  "Qidalar": [
    "Səhər yeməkləri", "Sendviç və Toastlar", "Desertlər",
    "Salatlar", "Yüngül yeməklər", "Şirin səhər yeməkləri"
  ]
};

export default function Products() {
  const { t, i18n } = useTranslation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [activeTab, setActiveTab] = useState('az');
  
  // Custom dropdown state
  const [searchQuery, setSearchQuery] = useState('');
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);

  const [formData, setFormData] = useState({
    name_az: '', name_en: '', name_ru: '',
    category: '',
    price: '',
    description_az: '', description_en: '', description_ru: '',
    image_url: '',
    image_file: null,
    sub_category: ''
  });

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await AdminProductService.getAll();
      setProducts(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (!event.target.closest('.premium-dropdown-container')) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const openAddModal = () => {
    setCurrentProduct(null);
    setFormData({ name_az: '', name_en: '', name_ru: '', category: '', price: '', description_az: '', description_en: '', description_ru: '', image_url: '', image_file: null, sub_category: '' });
    setActiveTab('az');
    setIsModalOpen(true);
    setOpenDropdown(null);
  };

  const openEditModal = (prod) => {
    setCurrentProduct(prod);
    setFormData({
      name_az: prod.name_az || prod.name || '',
      name_en: prod.name_en || '',
      name_ru: prod.name_ru || '',
      category: prod.category,
      price: prod.price,
      description_az: prod.description_az || prod.description || '',
      description_en: prod.description_en || '',
      description_ru: prod.description_ru || '',
      image_url: prod.image_url || '',
      image_file: null,
      sub_category: prod.sub_category || ''
    });
    setActiveTab('az');
    setIsModalOpen(true);
    setOpenDropdown(null);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!formData.category) return alert(t('admin.products.err_cat_required'));
    
    const submitData = {
      ...formData,
      name: formData.name_az || formData.name_en || formData.name_ru || 'Untitled',
      description: formData.description_az || ''
    };
    
    try {
      if (currentProduct) {
        await AdminProductService.update(currentProduct.id, submitData);
      } else {
        await AdminProductService.create(submitData);
      }
      setIsModalOpen(false);
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert(t('admin.products.err_general'));
    }
  };

  const openDeleteModal = (id) => {
    setProductToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setProductToDelete(null);
  };

  const confirmDelete = async () => {
    if(!productToDelete) return;
    try {
      await AdminProductService.delete(productToDelete);
      fetchProducts();
      closeDeleteModal();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header" style={{ marginBottom: '15px' }}>
        <h2>{t('admin.products.title')}</h2>
        <button className="admin-btn-primary" onClick={openAddModal}>
          <FaPlus /> {t('admin.products.btn_new')}
        </button>
      </div>

      <div className="admin-search-container" style={{ marginBottom: '24px' }}>
        <input 
          type="text" 
          placeholder={t('admin.products.search_placeholder')} 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="admin-search-input"
          style={{
            width: '100%',
            padding: '14px 20px',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            background: 'rgba(0, 0, 0, 0.25)',
            color: '#fff',
            fontSize: '1rem',
            transition: 'all 0.3s ease',
          }}
        />
      </div>

      <div className="admin-table-container">
        {loading ? (
          <Loading />
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>{t('admin.products.th_id')}</th>
                <th>{t('admin.products.th_image')}</th>
                <th>{t('admin.products.th_name')}</th>
                <th>{t('admin.products.th_category')}</th>
                <th>{t('admin.products.th_subcategory')}</th>
                <th>{t('admin.products.th_price')}</th>
                <th>{t('admin.products.th_actions')}</th>
              </tr>
            </thead>
            <tbody>
              {products.filter(p => (p[`name_${i18n.language}`] || p.name).toLowerCase().includes(searchQuery.toLowerCase())).map(p => (
                <tr key={p.id}>
                  <td>#{p.id}</td>
                  <td>
                    {p.image_url ? (
                      <img 
                        src={p.image_url.replace('/images/products/', '/images/').replace(/\.(jpg|jpeg)$/i, '.png')} 
                        alt={p.name} 
                        className="admin-td-img" 
                      />
                    ) : (
                      <div className="admin-td-noimg">{t('admin.products.no_image')}</div>
                    )}
                  </td>
                  <td>{p[`name_${i18n.language}`] || p.name}</td>
                  <td style={{textTransform: 'capitalize'}}>{p.category}</td>
                  <td>{p.sub_category || '-'}</td>
                  <td>{Number(p.price).toFixed(2)} ₼</td>
                  <td>
                    <div className="admin-action-btns">
                      <button className="btn-edit" onClick={() => openEditModal(p)}><FaEdit /></button>
                      <button className="btn-delete" onClick={() => openDeleteModal(p.id)}><FaTrash /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {products.filter(p => (p[`name_${i18n.language}`] || p.name).toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                <tr>
                  <td colSpan="7" style={{textAlign: 'center', padding: '20px'}}>{t('admin.products.not_found')}</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {isModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-content">
            <div className="admin-modal-header">
              <h3>{currentProduct ? t('admin.products.modal_edit_title') : t('admin.products.modal_add_title')}</h3>
              <button className="admin-modal-close-btn" onClick={closeModal} type="button"><FaTimes /></button>
            </div>
            <form onSubmit={handleSubmit} className="admin-modal-form">
              <div className="admin-lang-tabs">
                <button type="button" className={`lang-tab ${activeTab === 'az' ? 'active' : ''}`} onClick={() => setActiveTab('az')}>AZ</button>
                <button type="button" className={`lang-tab ${activeTab === 'en' ? 'active' : ''}`} onClick={() => setActiveTab('en')}>EN</button>
                <button type="button" className={`lang-tab ${activeTab === 'ru' ? 'active' : ''}`} onClick={() => setActiveTab('ru')}>RU</button>
              </div>

              <div className="admin-modal-form-grid">
              <div className="admin-form-group">
                <label>{t('admin.products.lbl_name')} ({activeTab.toUpperCase()})</label>
                <input style={{padding:'15px'}} type="text" required={activeTab === 'az'} value={formData[`name_${activeTab}`]} onChange={e => setFormData({...formData, [`name_${activeTab}`]: e.target.value})} placeholder={t('admin.products.plc_name')} />
              </div>
              
              <div className="admin-form-group" ref={dropdownRef}>
                <label>{t('admin.products.lbl_category')}</label>
                <div className="premium-dropdown-container">
                  <div 
                    className={`premium-dropdown-selected ${openDropdown === 'main' ? 'open' : ''}`} 
                    onClick={() => setOpenDropdown(openDropdown === 'main' ? null : 'main')}
                  >
                    <span>{formData.category || t('admin.products.lbl_select_main')}</span>
                    <FaChevronDown className="premium-dropdown-icon" />
                  </div>
                  {openDropdown === 'main' && (
                    <div className="premium-dropdown-menu">
                      <div 
                        className={`premium-dropdown-item ${formData.category === 'İçkilər' ? 'active' : ''}`}
                        onClick={() => { setFormData({...formData, category: 'İçkilər', sub_category: ''}); setOpenDropdown(null); }}
                      >İçkilər</div>
                      <div 
                        className={`premium-dropdown-item ${formData.category === 'Qidalar' ? 'active' : ''}`}
                        onClick={() => { setFormData({...formData, category: 'Qidalar', sub_category: ''}); setOpenDropdown(null); }}
                      >Qidalar</div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="admin-form-group">
                <label>{t('admin.products.lbl_subcategory')}</label>
                <div className="premium-dropdown-container">
                  <div 
                    className={`premium-dropdown-selected ${openDropdown === 'sub' ? 'open' : ''} ${!formData.category ? 'disabled' : ''}`} 
                    onClick={(e) => { 
                      if(!formData.category) return;
                      e.stopPropagation(); 
                      setOpenDropdown(openDropdown === 'sub' ? null : 'sub')
                    }}
                    style={{ opacity: formData.category ? 1 : 0.5, cursor: formData.category ? 'pointer' : 'not-allowed' }}
                  >
                    <span>
                      {!formData.category 
                        ? t('admin.products.lbl_select_sub_first') 
                        : (formData.sub_category || t('admin.products.lbl_select_sub'))}
                    </span>
                    <FaChevronDown className="premium-dropdown-icon" />
                  </div>
                  {openDropdown === 'sub' && formData.category && (
                    <div className="premium-dropdown-menu">
                      {categoryMap[formData.category].map(sub => (
                        <div 
                          key={sub}
                          className={`premium-dropdown-item ${formData.sub_category === sub ? 'active' : ''}`}
                          onClick={() => { setFormData({...formData, sub_category: sub}); setOpenDropdown(null); }}
                        >
                          {sub}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="admin-form-group">
                <label>{t('admin.products.lbl_price')}</label>
                <input style={{padding:'15px'}} type="number" step="0.01" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} placeholder="0.00" />
              </div>
              
              <div className="admin-form-group span-2">
                <label>{t('admin.products.lbl_image')}</label>
                <div className="premium-file-input-wrapper">
                  <input 
                    type="file" 
                    accept=".png, image/png" 
                    id="product-image-upload"
                    className="premium-file-input"
                    onChange={e => {
                      const file = e.target.files[0];
                      if (file) {
                        setFormData({...formData, image_file: file});
                      }
                    }} 
                  />
                  <label htmlFor="product-image-upload" className="premium-file-label">
                    <span style={{ color: '#B45309', textAlign: 'center', width: '100%' }}>
                      {formData.image_file ? formData.image_file.name : (formData.image_url ? formData.image_url.split('/').pop() : t('admin.products.lbl_upload_png'))}
                    </span>
                  </label>
                </div>
              </div>
              </div> {/* End of grid */}
              
              <div className="admin-form-group">
                <label>{t('admin.products.lbl_desc')} ({activeTab.toUpperCase()})</label>
                <textarea rows="3" value={formData[`description_${activeTab}`]} onChange={e => setFormData({...formData, [`description_${activeTab}`]: e.target.value})} placeholder={t('admin.products.plc_desc')}></textarea>
              </div>
              
              <div className="admin-modal-actions">
                <button type="button" className="admin-btn-secondary" onClick={closeModal}>{t('admin.products.btn_cancel')}</button>
                <button type="submit" className="admin-btn-primary">{t('admin.products.btn_save')}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-content" style={{ maxWidth: '400px', textAlign: 'center', padding: '35px' }}>
            <div style={{ fontSize: '3rem', color: '#ef4444', marginBottom: '15px' }}><FaTrash /></div>
            <h3 style={{ color: '#fff', marginBottom: '15px', fontSize: '1.4rem', fontWeight: 600 }}>{t('admin.products.del_title')}</h3>
            <p style={{ color: '#d4d4d8', marginBottom: '30px', fontSize: '1.05rem', lineHeight: '1.5' }}>
              {t('admin.products.del_msg')}
            </p>
            <div className="admin-modal-actions" style={{ justifyContent: 'center', marginTop: '0', paddingTop: '0', borderTop: 'none' }}>
              <button type="button" className="admin-btn-secondary" onClick={closeDeleteModal}>{t('admin.products.btn_no')}</button>
              <button type="button" className="admin-btn-danger" onClick={confirmDelete}>{t('admin.products.btn_yes')}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}





