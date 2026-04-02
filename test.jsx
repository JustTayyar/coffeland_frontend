import React, { useState, useEffect, useRef } from 'react';
import { AdminBlogService } from '../../../services/api';
import './Blogs.css';
import { FaEdit, FaTrash, FaPlus, FaTimes, FaCalendarAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Loading from '../../../components/Loading/Loading';

REPLACE_TARGETexport default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);
  
  const [formData, setFormData] = useState({
    title_az: '',
    category_az: '',
    content_az: '',
    image_name: '',
    image_file: null,
    date: new Date().toISOString().split('T')[0]
  });

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await AdminBlogService.getAll();
      setBlogs(res.data.data);
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
    setFormData({ title_az: '', category_az: '', content_az: '', image_name: '', image_file: null, date: new Date().toISOString().split('T')[0] });
    setIsModalOpen(true);
  };

  const openEditModal = (blog) => {
    setCurrentBlog(blog);
    setFormData({
      title_az: blog.title_az,
      category_az: blog.category_az,
      content_az: blog.content_az,
      image_name: blog.image_name || '',
      image_file: null,
      date: blog.date || ''
    });
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
      alert('Xəta baş verdi');
    }
  };

  const handleDelete = async (id) => {
    if(window.confirm('Bu bloqu silməyə əminsiniz?')) {
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
        <h2>Bloqlar</h2>
        <button className="admin-btn-primary" onClick={openAddModal}>
          <FaPlus /> Yeni Bloq
        </button>
      </div>

      <div className="admin-table-container">
        {loading ? (
          <Loading />
        ) : (
          <table className="admin-table2">
            <thead>
              <tr>
                <th>ID</th>
                <th style={{textAlign:"center !import"}}>Başlıq</th>
                <th>Kateqoriya</th>
                <th>Tarix</th>
                <th>Əməliyyat</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map(b => (
                <tr key={b.id}>
                  <td>#{b.id}</td>
                  <td>{b.title_az}</td>
                  <td>{b.category_az}</td>
                  <td>{b.date}</td>
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
                  <td colSpan="5" style={{textAlign: 'center', padding: '20px'}}>Bloq tapılmadı</td>
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
              <h3>{currentBlog ? 'Bloqu Redaktə Et' : 'Yeni Bloq Əlavə Et'}</h3>
              <button className="admin-modal-close-btn" onClick={closeModal} type="button"><FaTimes /></button>
            </div>
            <form onSubmit={handleSubmit} className="admin-modal-form">
              <div className="admin-modal-form-grid">
                <div className="admin-form-group full-width">
                  <label>Başlıq</label>
                  <input type="text" style={{padding:'16px 16px'}} required value={formData.title_az} onChange={e => setFormData({...formData, title_az: e.target.value})} placeholder="Bloqun başlığı" />
                </div>
                
                <div className="admin-form-group">
                  <label>Kateqoriya</label>
                  <input type="text" style={{padding:'16px 16px'}} required value={formData.category_az} onChange={e => setFormData({...formData, category_az: e.target.value})} placeholder="Kofe haqqında" />
                </div>
                
                <div className="admin-form-group">
                  <label>Tarix</label>
                  <PremiumDatePicker 
                    value={formData.date} 
                    onChange={val => setFormData({...formData, date: val})} 
                  />
                </div>

                <div className="admin-form-group full-width">
                  <label>Bloq Şəkli (JPEG, JPG, PNG, WEBP)</label>
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
                        {formData.image_file ? formData.image_file.name : (formData.image_name ? formData.image_name.split('/').pop() : 'Şəkil yükləyin')}
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="admin-form-group">
                <label>Məzmun</label>
                <textarea rows="6" required value={formData.content_az} onChange={e => setFormData({...formData, content_az: e.target.value})} placeholder="Bloqun məzmunu buraya yazılır..."></textarea>
              </div>

              <div className="admin-modal-actions">
                <button type="button" className="admin-btn-secondary" onClick={closeModal}>Ləğv et</button>
                <button type="submit" className="admin-btn-primary">Yadda Saxla</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

