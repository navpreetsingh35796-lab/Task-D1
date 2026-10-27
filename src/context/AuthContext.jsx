import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sync auth state from localStorage and Firestore
  useEffect(() => {
    const syncUser = async () => {
      try {
        // Read stored token/user from your Express login session
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        if (storedUser || token) {
          const parsedUser = storedUser ? JSON.parse(storedUser) : { email: 'navpreet' };
          setCurrentUser(parsedUser);

          // Get document ID (either stored _id, id, or uid)
          const userId = parsedUser._id || parsedUser.id || parsedUser.uid || 'lt6SHMmTwJddrdNWqdP3';

          if (db && userId) {
            const userRef = doc(db, 'users', userId);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
              setUserProfile(userSnap.data());
            } else {
              setUserProfile({
                email: parsedUser.email || 'navpreetsingh35796@gmail.com',
                subscriptionPlan: 'free'
              });
            }
          }
        } else {
          setCurrentUser(null);
          setUserProfile(null);
        }
      } catch (err) {
        console.error("Auth sync error:", err);
      } finally {
        setLoading(false);
      }
    };

    syncUser();
  }, []);

  // Upgrade Plan Function (Requirement 4)
  const upgradeToPaid = async () => {
    if (!currentUser) throw new Error("Must be logged in to upgrade.");

    const userId = currentUser._id || currentUser.id || currentUser.uid || 'lt6SHMmTwJddrdNWqdP3';
    
    if (db && userId) {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        subscriptionPlan: 'paid',
        upgradedAt: new Date().toISOString()
      });
    }

    setUserProfile((prev) => ({ ...prev, subscriptionPlan: 'paid' }));
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setCurrentUser(null);
    setUserProfile(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, userProfile, upgradeToPaid, logout, setCurrentUser, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);