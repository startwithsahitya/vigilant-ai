'use client';
import Head from 'next/head';
import { useState } from 'react';
import Image from 'next/image';
import styles from './RegisterPage.module.css';

export default function RegisterPage() {
  const [email, setEmail] = useState(''); // State for email
  const [password, setPassword] = useState(''); // State for password
  const [actionType, setActionType] = useState('register'); // State for action type
  const [selectedRole, setSelectedRole] = useState<'teacher' | 'student' | null>(null); // State for selected role
  const [isProcessing, setIsProcessing] = useState(false); // Loading state
  const [error, setError] = useState(''); // For displaying error messages

  const handleActionClick = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate input fields
    if (!email || !password || !selectedRole) {
      setError('Please provide both email, password, and role!');
      return;
    }

    setIsProcessing(true);
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, selectedRole }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Registration successful');
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch (err) {
      setError('Something went wrong');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <main className={styles.pageContainer}>
        {/* Logo Section */}
        <div className={styles.imageContainer}>
          <Image
            src="https://drive.google.com/uc?export=view&id=1EbCAvMXa3dGZJ0lWcx2FE9p_nwzYf0wX"
            alt="Register Icon"
            width={236 / 1.2}
            height={65 / 1.2}
          />
        </div>

        {/* Action Section */}
        <div className={styles.boxContainer}>
          <h1 className={styles.title}>Register</h1>

          {/* Role Selection Buttons */}
          <div className={styles.buttonContainer}>
            <button
              className={styles.button}
              onClick={() => { setSelectedRole('student'); setActionType('register'); }}
            >
              Student
            </button>
            <button
              className={styles.button}
              onClick={() => { setSelectedRole('teacher'); setActionType('register'); }}
            >
              Teacher
            </button>
          </div>

          {/* Display Role Selection Info */}
          {actionType === 'register' && selectedRole && (
            <p className={styles.roleInfo}>
              Registering as: <strong>{selectedRole}</strong>
            </p>
          )}

          {/* Input Form */}
          {actionType === 'register' && selectedRole && (
            <div className={styles.inputContainer}>
              <label className={styles.label} htmlFor="email">
                Enter Email
              </label>
              <input
                id="email"
                className={styles.input}
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />

              <label className={styles.label} htmlFor="password">
                Password
              </label>
              <input
                id="password"
                className={styles.input}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />

              {/* Submit Button */}
              <button
                className={styles.mainButton}
                onClick={handleActionClick}
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : 'Register'}
              </button>

              {/* Display error message */}
              {error && <p className={styles.error}>{error}</p>}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
