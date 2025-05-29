import React, { useEffect, useState } from 'react';
import axios from '../services/api';
import { useNavigate } from 'react-router-dom';
import Error404 from './Error404';
import { BASE_URL } from '../constants';


const EditProfile = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [removeImage, setRemoveImage] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getProfileInfo = async () => {
    try {
      const { data } = await axios.get('/auth/profile/');
      setUser(data);
      setUsername(data.username);
      setBio(data.bio);
      if (data.profile_image) {
        setPreview(BASE_URL + data.profile_image);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfileInfo();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
      setRemoveImage(false); // Yangi rasm tanlanganda o‘chirish flagi tozalansin
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreview(null);
    setRemoveImage(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', username);
    formData.append('bio', bio);
    if (image) formData.append('profile_image', image);
    if (removeImage) formData.append('remove_image', 'true');

    try {
      await axios.patch('/auth/profile/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Profile updated successfully!');
      navigate('/profile');
    } catch (error) {
      console.error(error);
      alert('Something went wrong. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  if (!user) {
    return <Error404 />;
  }

  return (
    <div className="container py-5" style={{ maxWidth: '600px' }}>
      <h2 className="mb-4">Hisobni tahrirlash</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="border rounded p-4 shadow">
        {/* Username */}
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        {/* Bio */}
        <div className="mb-3">
          <label htmlFor="bio" className="form-label">Bio</label>
          <textarea
            className="form-control"
            id="bio"
            rows="4"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Write something about yourself..."
          />
        </div>

        {/* Image */}
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Profile Image</label>
          <input
            type="file"
            className="form-control"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        {/* Preview */}
        {preview && (
          <div className="mb-3 text-center">
            <img
              src={preview}
              alt="Preview"
              className="img-thumbnail"
              style={{ maxHeight: '200px', objectFit: 'cover' }}
            />
            <div className="mt-2">
              <button type="button" className="btn btn-sm btn-danger" onClick={handleRemoveImage}>
                Rasmni olib tashlash
              </button>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary">
            Saqlash
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate('/profile')}
          >
            Bekor qilish
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
