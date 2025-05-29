import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../services/api';

const ResetPassword = () => {
  const { uid, token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`/auth/reset-password-confirm/${uid}/${token}/`, { password });
      setLoading(false);
      setMessage({ type: 'success', text: 'Parol muvaffaqiyatli tiklandi!' });
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setLoading(false);
      setMessage({
        type: 'danger',
        text: err.response?.data?.detail || 'Token is invalid or expired.',
      });
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h3 className="mb-4">Yangi parol kiriting</h3>
      {message && (
        <div className={`alert alert-${message.type}`}>{message.text}</div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Yangi parol</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-success w-100" type="submit">
          Parolni tiklash
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
