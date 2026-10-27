import React, { useState } from 'react';

export default function PaymentModal({ isOpen, onClose, onPaymentSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    cardNumber: '',
    expiry: '',
    cvc: ''
  });
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateCard = () => {
    const { name, cardNumber, expiry, cvc } = formData;
    if (!name.trim()) return "Cardholder name is required.";
    const cleanCard = cardNumber.replace(/\s+/g, '');
    if (!/^\d{16}$/.test(cleanCard)) return "Enter a valid 16-digit card number.";
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) return "Expiry must be in MM/YY format.";
    if (!/^\d{3,4}$/.test(cvc)) return "CVC must be 3 or 4 digits.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateCard();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError('');
    setProcessing(true);

    try {
      // Simulate payment processing delay
      await new Promise((res) => setTimeout(res, 1200));
      await onPaymentSuccess();
      onClose();
    } catch (err) {
      setError(err.message || "Payment failed. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div style={modalOverlayStyle}>
      <div style={modalCardStyle}>
        <h3>Upgrade to DEV@Deakin Premium</h3>
        <p style={{ color: '#666', fontSize: '0.9rem' }}>
          Get unlimited posts, custom themes, and exclusive developer tutorials for $9.99/mo.
        </p>

        {error && <div style={{ color: '#d9534f', marginBottom: '10px' }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={fieldStyle}>
            <label>Name on Card</label>
            <input 
              name="name" 
              placeholder="Navpreet Singh" 
              value={formData.name} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div style={fieldStyle}>
            <label>Card Number</label>
            <input 
              name="cardNumber" 
              maxLength="16" 
              placeholder="4532 0150 0000 0000" 
              value={formData.cardNumber} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ ...fieldStyle, flex: 1 }}>
              <label>Expiry (MM/YY)</label>
              <input 
                name="expiry" 
                maxLength="5" 
                placeholder="12/28" 
                value={formData.expiry} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div style={{ ...fieldStyle, flex: 1 }}>
              <label>CVC</label>
              <input 
                name="cvc" 
                maxLength="4" 
                placeholder="123" 
                value={formData.cvc} 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '15px' }}>
            <button type="button" onClick={onClose} disabled={processing} style={cancelBtnStyle}>
              Cancel
            </button>
            <button type="submit" disabled={processing} style={payBtnStyle}>
              {processing ? "Processing..." : "Pay $9.99 & Upgrade"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const modalOverlayStyle = {
  position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
};

const modalCardStyle = {
  background: '#fff', padding: '24px', borderRadius: '8px', maxWidth: '420px', width: '90%', boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
};

const fieldStyle = {
  display: 'flex', flexDirection: 'column', marginBottom: '12px', textAlign: 'left', fontSize: '0.85rem', fontWeight: 'bold'
};

const payBtnStyle = {
  background: '#0284c7', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold'
};

const cancelBtnStyle = {
  background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '10px 16px', borderRadius: '6px', cursor: 'pointer'
};