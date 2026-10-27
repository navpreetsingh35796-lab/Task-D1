import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import PaymentModal from '../components/PaymentModal';

export default function PricingPage() {
  const { currentUser, userProfile, upgradeToPaid } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState(null);

  const isPaid = userProfile?.subscriptionPlan === 'paid';

  const handleUpgradeClick = () => {
    if (!currentUser) {
      setAlertMsg("Please log in to your account first before upgrading your subscription.");
      return;
    }
    if (isPaid) {
      setAlertMsg("You are already on the Paid plan!");
      return;
    }
    setModalOpen(true);
  };

  const handlePaymentSuccess = async () => {
    await upgradeToPaid();
    setAlertMsg("Congratulations! Your account has been upgraded to the Premium Plan.");
  };

  return (
    <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px', textAlign: 'center' }}>
      <h2>Flexible Subscription Plans</h2>
      <p style={{ color: '#64748b' }}>Select the plan that matches your development and community sharing needs.</p>

      {alertMsg && (
        <div style={{ padding: '12px', background: '#e0f2fe', color: '#0369a1', borderRadius: '6px', marginBottom: '20px' }}>
          {alertMsg}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginTop: '30px' }}>
        
        {/* Free Tier */}
        <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', textAlign: 'left' }}>
          <h3>Free Community</h3>
          <p style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: '12px 0' }}>$0 <span style={{ fontSize: '1rem', color: '#64748b' }}>/ month</span></p>
          <ul style={{ listStyle: 'none', padding: 0, lineHeight: '2' }}>
            <li>✔ Browse all public question & article posts</li>
            <li>✔ Post up to 5 questions per month</li>
            <li>✔ Standard Markdown code block formatting</li>
            <li>✖ Direct message peer developers</li>
            <li>✖ Rich image attachment uploads (&gt; 2MB)</li>
          </ul>
          <button disabled style={{ width: '100%', padding: '10px', marginTop: '20px', background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '6px' }}>
            Current Base Plan
          </button>
        </div>

        {/* Paid Tier */}
        <div style={{ border: '2px solid #0284c7', borderRadius: '12px', padding: '24px', textAlign: 'left', position: 'relative' }}>
          <span style={{ position: 'absolute', top: '-12px', right: '20px', background: '#0284c7', color: '#fff', padding: '2px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold' }}>
            RECOMMENDED
          </span>
          <h3>Premium Developer</h3>
          <p style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: '12px 0' }}>$9.99 <span style={{ fontSize: '1rem', color: '#64748b' }}>/ month</span></p>
          <ul style={{ listStyle: 'none', padding: 0, lineHeight: '2' }}>
            <li>✔ Unlimited Question & Tutorial articles</li>
            <li>✔ Priority answer ranking on DEV@Deakin feeds</li>
            <li>✔ Up to 25MB attachment and asset uploads</li>
            <li>✔ Full access to exclusive author tutorials</li>
            <li>✔ Verified "Premium Developer" profile badge</li>
          </ul>

          <button 
            onClick={handleUpgradeClick}
            disabled={isPaid}
            style={{ 
              width: '100%', 
              padding: '10px', 
              marginTop: '20px', 
              background: isPaid ? '#10b981' : '#0284c7', 
              color: '#fff', 
              border: 'none', 
              borderRadius: '6px', 
              cursor: isPaid ? 'default' : 'pointer',
              fontWeight: 'bold'
            }}
          >
            {isPaid ? "✔ Active Subscription" : "Upgrade Plan"}
          </button>
        </div>

      </div>

      <PaymentModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        onPaymentSuccess={handlePaymentSuccess} 
      />
    </div>
  );
}