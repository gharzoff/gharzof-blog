import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../services/api';
import { BASE_URL } from '../constants/index';
import { useDispatch, useSelector } from 'react-redux';
import Error404 from './Error404'
import ValidationError from '../ui/ValidationError'
import { getArticleDetailFailure, getArticleDetailStart, getArticleDetailSuccess } from '../slice/article';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
  const { isLoading } = useSelector(state => state.article)
  const [post, setPost] = useState(null);
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
  const [removeImage, setRemoveImage] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await axios.get(`/posts/${id}/`);
        setPost(data);
        setFormData({
          title: data.title,
          content: data.content,
          category: data.category.id,
          tags: data.tags.map(tag => tag.id),
          image: null,
        });
        setPreview(BASE_URL + data.image);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    const fetchMeta = async () => {
      try {
        const [catRes, tagRes] = await Promise.all([
          axios.get('/categories/'),
          axios.get('/tags/'),
        ]);
        setCategories(catRes.data.results || catRes.data);
        setTags(tagRes.data.results || tagRes.data);
      } catch (err) {
        dispatch(g)
      }
    };

    fetchPost();
    fetchMeta();
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTagToggle = tagId => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tagId)
        ? prev.tags.filter(id => id !== tagId)
        : [...prev.tags, tagId],
    }));
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
      setRemoveImage(false);
    }
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({ ...prev, image: null }));
    setPreview(null);
    setRemoveImage(true);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const form = new FormData();
    form.append('title', formData.title);
    form.append('content', formData.content);
    form.append('category', formData.category);
    formData.tags.forEach(tag => form.append('tags', tag));
    if (formData.image) form.append('image', formData.image);
    if (removeImage) form.append('remove_image', 'true');
    dispatch(getArticleDetailStart())
    try {
      await axios.patch(`/posts/${id}/`, form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      dispatch(getArticleDetailSuccess())
      navigate(`/posts/${id}`);
    } catch (err) {
      dispatch(getArticleDetailFailure(err.response?.data))
      console.error('Post update failed:', err.response?.data || err);
    }
  };

  if (!post) return <div className="text-center mt-5">Loading...</div>;

  if (post?.author?.username !== user?.username) return <Error404 />

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Postni tahrirlash</h2>
      <ValidationError />
      <form onSubmit={handleSubmit} className="shadow-lg p-4 rounded bg-white border">
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Content</label>
          <textarea
            name="content"
            className="form-control"
            rows="6"
            value={formData.content}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Category</label>
          <select
            name="category"
            className="form-select"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">-- Select category --</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Tags</label>
          <div className="d-flex flex-wrap gap-2">
            {tags.map(tag => (
              <div key={tag.id} className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`tag-${tag.id}`}
                  checked={formData.tags.includes(tag.id)}
                  onChange={() => handleTagToggle(tag.id)}
                />
                <label className="form-check-label" htmlFor={`tag-${tag.id}`}>
                  {tag.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Image</label>
          {preview && (
            <div className="mb-2">
              <img
                src={preview}
                alt="Preview"
                className="img-thumbnail mb-2"
                style={{ maxHeight: '200px' }}
              />
              <br />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="btn btn-sm btn-outline-danger"
              >
                Rasmni olib tashlash
              </button>
            </div>
          )}
          <input type="file" className="form-control" onChange={handleImageChange} />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          { isLoading ? "Loading..." : "Saqlash"}
        </button>
      </form>
    </div>
  );
};

export default EditPost;
