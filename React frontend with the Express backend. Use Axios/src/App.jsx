import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000',
});

function readStoredAuth() {
  const token = localStorage.getItem('axios-express-token');
  const user = localStorage.getItem('axios-express-user');
  return {
    token,
    user: user ? JSON.parse(user) : null,
  };
}

export default function App() {
  const [email, setEmail] = useState('amina@example.com');
  const [password, setPassword] = useState('Password123!');
  const [auth, setAuth] = useState(() => readStoredAuth());
  const [message, setMessage] = useState('');
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  const isLoggedIn = Boolean(auth.token);

  useEffect(() => {
    if (auth.token) {
      localStorage.setItem('axios-express-token', auth.token);
      localStorage.setItem('axios-express-user', JSON.stringify(auth.user));
      api.defaults.headers.common.Authorization = `Bearer ${auth.token}`;
    } else {
      localStorage.removeItem('axios-express-token');
      localStorage.removeItem('axios-express-user');
      delete api.defaults.headers.common.Authorization;
      setProfile(null);
    }
  }, [auth]);

  useEffect(() => {
    if (auth.token) {
      api.defaults.headers.common.Authorization = `Bearer ${auth.token}`;
    }
  }, [auth.token]);

  async function handleLogin(event) {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await api.post('/api/auth/login', { email, password });
      setAuth({ token: response.data.token, user: response.data.user });
      setMessage('Login successful. Token stored locally.');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  }

  async function fetchProtectedProfile() {
    if (!auth.token) return;
    setLoading(true);
    setMessage('');

    try {
      const response = await api.get('/api/private');
      setProfile(response.data);
      setMessage('Protected data loaded successfully.');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Could not load protected data.');
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    setAuth({ token: '', user: null });
    setProfile(null);
    setMessage('Logged out.');
  }

  const statusText = useMemo(
    () => (isLoggedIn ? `Signed in as ${auth.user?.name}` : 'Not signed in'),
    [auth.user?.name, isLoggedIn],
  );

  return (
    <main className="layout">
      <section className="panel">
        <p className="eyebrow">Axios + Express</p>
        <h1>Frontend login with JWT-backed protected API calls.</h1>
        <p className="subtitle">This React app logs in against the Express auth backend, stores the token, and fetches protected data through Axios.</p>

        <div className="status-row">
          <span>{statusText}</span>
          {isLoggedIn ? <button className="ghost" type="button" onClick={handleLogout}>Logout</button> : null}
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          <label>
            Email
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
          </label>
          <label>
            Password
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
          </label>
          <button className="primary" type="submit" disabled={loading}>{loading ? 'Working...' : 'Login'}</button>
          <button className="secondary" type="button" onClick={fetchProtectedProfile} disabled={!isLoggedIn || loading}>Load protected data</button>
        </form>

        {message ? <p className="message">{message}</p> : null}

        <div className="data-card">
          <h2>Protected endpoint response</h2>
          <pre>{profile ? JSON.stringify(profile, null, 2) : 'No protected data loaded yet.'}</pre>
        </div>
      </section>
    </main>
  );
}