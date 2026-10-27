import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import bcrypt from 'bcryptjs';
import { db } from '../firebase';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError('Please provide both email and password.');
      return;
    }

    try {
      setLoading(true);

      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('email', '==', email.trim().toLowerCase()));
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        setError('Invalid email or password. Please try again or sign up for an account.');
        setLoading(false);
        return;
      }

      const userData = snapshot.docs[0].data();
      const passwordMatches = bcrypt.compareSync(password, userData.password);

      if (!passwordMatches) {
        setError('Invalid email or password. Please try again or sign up for an account.');
        setLoading(false);
        return;
      }

      // Successful login -> Redirect to Home
      navigate('/');
    } catch (err) {
      setError('Login error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '8px' }}>
          <Link to="/signup" style={signupBtnStyle}>
            Sign up
          </Link>
        </div>

        {error && <div style={errorStyle}>{error}</div>}

        <form onSubmit={handleLogin}>
          <div style={fieldGroup}>
            <label style={labelStyle}>Your email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              style={inputStyle} 
              required 
            />
          </div>

          <div style={fieldGroup}>
            <label style={labelStyle}>Your password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              style={inputStyle} 
              required 
            />
          </div>

          <button type="submit" disabled={loading} style={btnStyle}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}

const containerStyle = { display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '60px 16px' };
const cardStyle = { width: '100%', maxWidth: '380px', padding: '28px', border: '1px solid #d1d5db', borderRadius: '8px', background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' };
const signupBtnStyle = { textDecoration: 'none', color: '#2563eb', border: '1px solid #2563eb', padding: '4px 10px', borderRadius: '4px', fontSize: '13px', fontWeight: '500' };
const fieldGroup = { marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '6px' };
const labelStyle = { fontSize: '14px', fontWeight: '500', color: '#374151' };
const inputStyle = { padding: '9px 12px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '14px', outline: 'none' };
const btnStyle = { width: '100%', padding: '10px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' };
const errorStyle = { color: '#b91c1c', backgroundColor: '#fee2e2', padding: '10px', borderRadius: '4px', marginBottom: '16px', fontSize: '13px' };

export default Login;