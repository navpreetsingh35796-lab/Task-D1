import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Search } from 'lucide-react'; // your project has lucide-react installed

export default function Navbar() {
  const { currentUser, userProfile, logout } = useAuth();
  const navigate = useNavigate();
  const isPaid = userProfile?.subscriptionPlan === 'paid';

  const handleSignOut = async () => {
    try {
      await logout();
      navigate('/');
    } catch (err) {
      console.error("Sign out error:", err);
    }
  };

  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px 30px',
      backgroundColor: '#f8f9fa',
      borderBottom: '1px solid #e9ecef',
      fontFamily: 'sans-serif'
    }}>
      {/* Brand & Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#212529', fontWeight: 'bold', fontSize: '1.25rem' }}>
          DEV@Deakin
        </Link>
        <Link to="/pricing" style={{ textDecoration: 'none', color: '#495057', fontSize: '0.95rem', fontWeight: '500' }}>
          Pricing
        </Link>
      </div>

      {/* Search Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        flex: '0 1 500px',
        backgroundColor: '#fff',
        border: '1px solid #ced4da',
        borderRadius: '4px',
        padding: '6px 12px',
        margin: '0 15px'
      }}>
        <Search size={18} color="#6c757d" style={{ marginRight: '8px' }} />
        <input
          type="text"
          placeholder="Search..."
          style={{
            border: 'none',
            outline: 'none',
            width: '100%',
            fontSize: '0.9rem'
          }}
        />
      </div>

      {/* Right Controls: Post, Badge, Auth buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#495057', fontSize: '0.95rem' }}>
          Post
        </Link>

        {currentUser ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* D1 Required Plan Badge */}
            <span style={{
              backgroundColor: isPaid ? '#10b981' : '#6c757d',
              color: '#fff',
              fontSize: '0.75rem',
              fontWeight: 'bold',
              padding: '3px 8px',
              borderRadius: '12px',
              textTransform: 'uppercase'
            }}>
              {isPaid ? "PREMIUM" : "FREE TIER"}
            </span>

            <span style={{ fontSize: '0.85rem', color: '#495057' }}>
              {currentUser.email}
            </span>

            <button
              onClick={handleSignOut}
              style={{
                backgroundColor: 'transparent',
                border: '1px solid #ced4da',
                padding: '6px 14px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                color: '#212529'
              }}
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Link
              to="/login"
              style={{
                textDecoration: 'none',
                color: '#212529',
                border: '1px solid #ced4da',
                padding: '6px 14px',
                borderRadius: '4px',
                fontSize: '0.9rem',
                backgroundColor: '#fff'
              }}
            >
              Login
            </Link>
            <Link
              to="/signup"
              style={{
                textDecoration: 'none',
                color: '#fff',
                backgroundColor: '#007bff',
                padding: '6px 14px',
                borderRadius: '4px',
                fontSize: '0.9rem'
              }}
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}