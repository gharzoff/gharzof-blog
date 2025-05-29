import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../services/api';

const CreatePost = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    image: null,
    tags: [],
  });
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, tagRes] = await Promise.all([
          axios.get('/categories/'),
          axios.get('/tags/')
        ]);
        setCategories(catRes.data);
        setTags(tagRes.data);
      } catch (err) {
        console.error('Kategoriya yoki taglarni yuklashda xatolik:', err);
      }
    };
    fetchData();
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleTagsChange = e => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(opt => opt.value);
    setFormData(prev => ({ ...prev, tags: selectedOptions }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const form = new FormData();
    form.append('title', formData.title);
    form.append('content', formData.content);
    form.append('category', formData.category);
    if (formData.image) {
      form.append('image', formData.image);
    }
    formData.tags.forEach(tag => form.append('tags', tag));

    try {
      await axios.post('/posts/', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      navigate('/');
    } catch (err) {
      if (err.response && err.response.data) {
        setErrors(err.response.data);
      } else {
        console.error('Post yuborishda xatolik:', err);
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create New Post</h2>
      <form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light" encType="multipart/form-data">
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            name="title"
            className={`form-control ${errors.title ? 'is-invalid' : ''}`}
            value={formData.title}
            onChange={handleChange}
            required
          />
          {errors.title && <div className="invalid-feedback">{errors.title}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Content</label>
          <textarea
            name="content"
            className={`form-control ${errors.content ? 'is-invalid' : ''}`}
            rows="5"
            value={formData.content}
            onChange={handleChange}
            required
          />
          {errors.content && <div className="invalid-feedback">{errors.content}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Category</label>
          <select
            name="category"
            className={`form-select ${errors.category ? 'is-invalid' : ''}`}
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          {errors.category && <div className="invalid-feedback">{errors.category}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Tags</label>
          <select
            multiple
            className={`form-select ${errors.tags ? 'is-invalid' : ''}`}
            value={formData.tags}
            onChange={handleTagsChange}
          >
            {tags.map(tag => (
              <option key={tag.id} value={tag.id}>{tag.name}</option>
            ))}
          </select>
          {errors.tags && <div className="invalid-feedback">{errors.tags}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Image</label>
          <input type="file" className="form-control" onChange={handleImageChange} />
          {preview && (
            <div className="mt-2">
              <img src={preview} alt="Preview" className="img-thumbnail" style={{ maxHeight: '200px' }} />
            </div>
          )}
          {errors.image && <div className="text-danger mt-1">{errors.image}</div>}
        </div>

        <button type="submit" className="btn btn-success w-100">Publish Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
