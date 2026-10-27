# DEV@Deakin - Task D1: Subscription & Session Management

This repository contains the implementation for **SIT313 Secure Frontend Applications - Task D1 (Subscription)**. This project builds upon the DEV@Deakin platform by introducing user session management, tiered subscription plans, and an upgrade workflow integrated with Firebase Firestore.



##  Key Features

* **User Authentication & Session Management**: Tracks user login and logout states using token/session storage and global state (`useContext`).
* **Subscription Model (Free vs. Premium)**: Compares platform features between a Free Community tier and a Premium Developer tier.
* **Conditional Upgrade Workflow**: 
  * Only logged-in users can trigger the upgrade flow.
  * Free tier users can access the payment modal.
  * Already upgraded (Paid) users receive an active subscription indicator.
* **Payment Validation Modal**: Captures and validates cardholder name, card number, expiry date (MM/YY), and CVC.
* **Real-Time State & Firestore Sync**: Updates the user's `subscriptionPlan` status to `paid` in Firestore and updates the UI badge to `PREMIUM`.



## Tech Stack

* **Frontend**: React, Vite, React Router DOM, Lucide React
* **Backend / Database**: Firebase (Authentication & Cloud Firestore) / Express.js
* **State Management**: React Context API (`AuthContext`)
