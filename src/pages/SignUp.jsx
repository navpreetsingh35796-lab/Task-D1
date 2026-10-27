import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import bcrypt from 'bcryptjs';
import { db } from '../firebase';

function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    const { name, email, password, confirmPassword } = formData;

    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      setError('All fields are required.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    try {
      setLoading(true);

      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('email', '==', email.trim().toLowerCase()));
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        setError('An account with this email already exists.');
        setLoading(false);
        return;
      }

      // Hash password using bcryptjs
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);

      // Save user to Firestore
      await addDoc(usersRef, {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password: hashedPassword,
        createdAt: new Date().toISOString()
      });

      // Redirect to login page
      navigate('/login');
    } catch (err) {
      setError('Registration error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h3 style={{ textAlign: 'center', marginBottom: '24px', color: '#1e3a8a' }}>
          Create a DEV@Deakin Account
        </h3>

        {error && <div style={errorStyle}>{error}</div>}

        <form onSubmit={handleRegister}>
          <div style={fieldGroup}>
            <label style={labelStyle}>Name*</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              style={inputStyle} 
              required 
            />
          </div>

          <div style={fieldGroup}>
            <label style={labelStyle}>Email*</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              style={inputStyle} 
              required 
            />
          </div>

          <div style={fieldGroup}>
            <label style={labelStyle}>Password*</label>
            <input 
              type="password" 
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              style={inputStyle} 
              required 
            />
          </div>

          <div style={fieldGroup}>
            <label style={labelStyle}>Confirm password*</label>
            <input 
              type="password" 
              name="confirmPassword" 
              value={formData.confirmPassword} 
              onChange={handleChange} 
              style={inputStyle} 
              required 
            />
          </div>

          <button type="submit" disabled={loading} style={btnStyle}>
            {loading ? 'Creating...' : 'Create'}
          </button>
        </form>
      </div>
    </div>
  );
}

const containerStyle = { display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '40px 16px' };
const cardStyle = { width: '100%', maxWidth: '440px', padding: '32px', border: '1px solid #d1d5db', borderRadius: '8px', background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' };
const fieldGroup = { marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '6px' };
const labelStyle = { fontSize: '14px', fontWeight: '500', color: '#374151' };
const inputStyle = { padding: '9px 12px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '14px', outline: 'none' };
const btnStyle = { width: '100%', padding: '10px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' };
const errorStyle = { color: '#b91c1c', backgroundColor: '#fee2e2', padding: '10px', borderRadius: '4px', marginBottom: '16px', fontSize: '13px' };

export default SignUp;