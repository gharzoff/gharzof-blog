import React, { useState } from 'react';
import axios from '../services/api';

const RequestResetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false)


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const domain = window.location.origin;
      const res = await axios.post('/auth/reset-password/', { email, domain });
      setLoading(false)
      setMessage({ type: 'success', text: res.data.detail });
    } catch (err) {
      setLoading(false)
      setMessage({
        type: 'danger',
        text: err.response?.data?.detail || 'Xatolik yuz berdi.',
      });
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h3 className="mb-4">Parolni tiklash</h3>
      {message && (
        <div className={`alert alert-${message.type}`}>{message.text}</div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="example@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-primary w-100" type="submit">
          {loading ? 'Loading...' : 'Tiklash havolasini yuborish'}
        </button>
      </form>
    </div>
  );
};

export default RequestResetPassword;
