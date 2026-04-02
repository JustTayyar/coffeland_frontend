import React, { useState, useEffect, useRef } from 'react';
import { AdminBlogService } from '../../../services/api';
import './Blogs.css';
import { FaEdit, FaTrash, FaPlus, FaTimes} from 'react-icons/fa';
import Loading from '../../../components/Loading/Loading';
import DatePicker from '../../../components/DatePicker/DatePicker';
import { useTranslation } from 'react-i18next';


export default function Blogs() {
  const { t, i18n } = useTranslation();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);
  const [activeTab, setActiveTab] = useState('az');
  
  const [formData, setFormData] = useState({
    title_az: '', title_en: '', title_ru: '',
    category_az: '', category_en: '', category_ru: '',
    content_az: '', content_en: '', content_ru: '',
    image_name: '',
    image_file: null,
    date: new Date().toISOString().split('T')[0]
  });

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await AdminBlogService.getAll();
      const sortedBlogs = res.data.data.sort((a, b) => a.id - b.id);
      setBlogs(sortedBlogs);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const openAddModal = () => {
    setCurrentBlog(null);
    setFormData({ 
      title_az: '', title_en: '', title_ru: '', 
      category_az: '', category_en: '', category_ru: '', 
      content_az: '', content_en: '', content_ru: '', 
      image_name: '', image_file: null, date: new Date().toISOString().split('T')[0] 
    });
    setActiveTab('az');
    setIsModalOpen(true);
  };

  const openEditModal = (blog) => {
    setCurrentBlog(blog);
    setFormData({
      title_az: blog.title_az || '', title_en: blog.title_en || '', title_ru: blog.title_ru || '',
      category_az: blog.category_az || '', category_en: blog.category_en || '', category_ru: blog.category_ru || '',
      content_az: blog.content_az || '', content_en: blog.content_en || '', content_ru: blog.content_ru || '',
      image_name: blog.image_name || '',
      image_file: null,
      date: blog.date || ''
    });
    setActiveTab('az');
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentBlog) {
        await AdminBlogService.update(currentBlog.id, formData);
      } else {
        await AdminBlogService.create(formData);
      }
      setIsModalOpen(false);
      fetchBlogs();
    } catch (err) {
      console.error(err);
      alert(t('admin.blogs.err_general'));
    }
  };

  const handleDelete = async (id) => {
    if(window.confirm(t('admin.blogs.del_confirm'))) {
      try {
        await AdminBlogService.delete(id);
        fetchBlogs();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h2>{t('admin.blogs.title')}</h2>
        <button className="admin-btn-primary" onClick={openAddModal}>
          <FaPlus /> {t('admin.blogs.btn_new')}
        </button>
      </div>

      <div className="admin-table-container">
        {loading ? (
          <Loading />
        ) : (
          <table className="admin-table2">
            <thead>
              <tr>
                <th>{t('admin.blogs.th_id')}</th>
                <th style={{textAlign:"center !import"}}>{t('admin.blogs.th_title')}</th>
                <th>{t('admin.blogs.th_category')}</th>
                <th>{t('admin.blogs.th_date')}</th>
                <th>{t('admin.blogs.th_actions')}</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map(b => (
                <tr key={b.id}>
                  <td>#{b.id}</td>
                  <td>{b[`title_${i18n.language}`] || b.title_az}</td>
                  <td>{b[`category_${i18n.language}`] || b.category_az}</td>
                  <td>{b.date ? b.date.split('-').reverse().join('-') : ''}</td>
                  <td>
                    <div className="admin-action-btns">
                      <button className="btn-edit" onClick={() => openEditModal(b)}><FaEdit /></button>
                      <button className="btn-delete" onClick={() => handleDelete(b.id)}><FaTrash /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {blogs.length === 0 && (
                <tr>
                  <td colSpan="5" style={{textAlign: 'center', padding: '20px'}}>{t('admin.blogs.not_found')}</td>
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
              <h3>{currentBlog ? t('admin.blogs.modal_edit_title') : t('admin.blogs.modal_add_title')}</h3>
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
                  <label>{t('admin.blogs.lbl_title')} ({activeTab.toUpperCase()})</label>
                  <input type="text" required={activeTab === 'az'} value={formData[`title_${activeTab}`]} onChange={e => setFormData({...formData, [`title_${activeTab}`]: e.target.value})} placeholder={t('admin.blogs.plc_title')} />
                </div>
                
                <div className="admin-form-group">
                  <label>{t('admin.blogs.lbl_category')} ({activeTab.toUpperCase()})</label>
                  <input type="text" required={activeTab === 'az'} value={formData[`category_${activeTab}`]} onChange={e => setFormData({...formData, [`category_${activeTab}`]: e.target.value})} placeholder={t('admin.blogs.plc_category')} />
                </div>
                
                <div className="admin-form-group">
                  <label>{t('admin.blogs.lbl_date')}</label>
                  <DatePicker 
                    value={formData.date} 
                    onChange={val => setFormData({...formData, date: val})} 
                  />
                </div>

                <div className="admin-form-group span-3">
                  <label>{t('admin.blogs.lbl_image')}</label>
                  <div className="premium-file-input-wrapper">
                    <input 
                      type="file" 
                      accept=".jpeg, .jpg, .png, .webp, image/jpeg, image/png, image/webp" 
                      id="blog-image-upload"
                      className="premium-file-input"
                      onChange={e => {
                        const file = e.target.files[0];
                        if (file) {
                          setFormData({...formData, image_file: file});
                        }
                      }} 
                    />
                    <label htmlFor="blog-image-upload" className="premium-file-label">
                      <span style={{ color: '#B45309', textAlign: 'center', width: '100%' }}>
                        {formData.image_file ? formData.image_file.name : (formData.image_name ? formData.image_name.split('/').pop() : t('admin.blogs.lbl_upload_img'))}
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="admin-form-group">
                <label>{t('admin.blogs.lbl_content')} ({activeTab.toUpperCase()})</label>
                <textarea rows="4" required={activeTab === 'az'} value={formData[`content_${activeTab}`]} onChange={e => setFormData({...formData, [`content_${activeTab}`]: e.target.value})} placeholder={t('admin.blogs.plc_content')}></textarea>
              </div>

              <div className="admin-modal-actions">
                <button type="button" className="admin-btn-secondary" onClick={closeModal}>{t('admin.blogs.btn_cancel')}</button>
                <button type="submit" className="admin-btn-primary">{t('admin.blogs.btn_save')}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}




