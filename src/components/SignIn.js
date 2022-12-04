import styles from '../styles/components/SignIn.module.css';

import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Input from './Input';
import { NhostClient, useSignInEmailPassword, } from '@nhost/react';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signInEmailPassword, isError, isSuccess } = useSignInEmailPassword()

  const nhost = new NhostClient({
    subdomain: process.env.REACT_APP_NHOST_SUBDOMAIN,
    region: process.env.REACT_APP_NHOST_REGION
  })

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    signInEmailPassword(email, password)
  };
  if (isSuccess) {
    return <Navigate to={'/'} replace={true} />
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles['logo-wrapper']}>
          <img src={process.env.PUBLIC_URL + 'logo.svg'} alt="logo" />
        </div>
        {console.log(nhost)}
        <form onSubmit={handleOnSubmit} className={styles.form}>
          <Input
            type="email"
            label="Email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            label="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />

          <button type='submit' className={styles.button}>
            Sign in
          </button>
        </form>
      </div>

      <p className={styles.text}>
        No account yet?{' '}
        <Link to="/sign-up" className={styles.link}>
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default SignIn;
