import React, { useEffect, useState } from 'react';
import axios from '../services/api';
import { useNavigate } from 'react-router-dom';
import Error404 from './Error404';
import { BASE_URL } from '../constants';
import PostCard from '../components/PostCard';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getProfileInfo = async () => {
    try {
      const { data } = await axios.get('/auth/profile/');
      setUser(data);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfileInfo();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status" />
      </div>
    );
  }

  if (!user) {
    return <Error404 />;
  }

  return (
    <div className="container py-4">
      {/* Profile Info */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="row g-0">
          <div className="col-md-3 d-flex justify-content-center align-items-center p-4">
            <img
              src={BASE_URL + user.profile_image}
              alt={user.username}
              className="rounded-circle border shadow-sm"
              style={{ width: '150px', height: '150px', objectFit: 'cover' }}
            />
          </div>
          <div className="col-md-9">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start flex-wrap">
                <div>
                  <h3 className="card-title">{user.username}</h3>
                  <p className="text-muted mb-1">
                    <i className="bi bi-calendar2-check me-1" />
                    Joined: {new Date(user.date_joined).toLocaleDateString()}
                  </p>
                  <p className="text-secondary">{user.bio || 'No bio yet.'}</p>
                  <span className="badge bg-primary me-2">
                    <i className="bi bi-file-earmark-text me-1" />
                    Posts: {user.posts_count}
                  </span>
                  <span className="badge bg-success">
                    <i className="bi bi-heart-fill me-1" />
                    Likes: {user.liked_posts.length}
                  </span>
                </div>
                <button
                  className="btn btn-outline-primary mt-2 mt-md-2"
                  onClick={() => navigate('/edit-profile')}
                >
                  <i className="bi bi-pencil-square me-1"></i>Tahrirlash
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* User Posts */}
      <section className="mb-5">
        <h4 className="mb-3"><i className="bi bi-pencil-square me-2" />Postlaringiz</h4>
        <div className="row g-4">
          {user.posts.length > 0 ? (
            user.posts.map((post) => (
              <div className="col-md-4" key={post.id}>
                <PostCard item={post} />
              </div>
            ))
          ) : (
            <p className="text-muted">Siz hali post yaratmagansiz!</p>
          )}
        </div>
      </section>

      {/* Liked Posts */}
      <section>
        <h4 className="mb-3"><i className="bi bi-heart-fill me-2 text-danger" />Yoqtirgan postlaringiz</h4>
        <div className="row g-4">
          {user.liked_posts.length > 0 ? (
            user.liked_posts.map((post) => (
              <div className="col-md-4" key={post.id}>
                <PostCard item={post} />
              </div>
            ))
          ) : (
            <p className="text-muted">Yoqtirgan postlaringiz hali mavjud emas!</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Profile;
