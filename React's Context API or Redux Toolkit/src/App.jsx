import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { useAuth } from './state/AuthContext.jsx';
import ProtectedRoute from './state/ProtectedRoute.jsx';

function Home() {
  const { user, isAuthenticated, logout } = useAuth();
  return (
    <section className="panel hero">
      <p className="eyebrow">Global auth state</p>
      <h1>React Context keeps login state in one place.</h1>
      <p>
        This app stores authentication in Context, protects private routes, and changes the UI when
        a user logs in or out.
      </p>
      {isAuthenticated ? (
        <div className="welcome-card">
          <strong>Welcome back, {user.name}.</strong>
          <button className="secondary" type="button" onClick={logout}>Logout</button>
        </div>
      ) : (
        <div className="welcome-card">
          <strong>You are currently logged out.</strong>
          <Link className="button" to="/login">Go to Login</Link>
        </div>
      )}
    </section>
  );
}

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const result = login(form.get('email'), form.get('password'));

    if (result.ok) {
      navigate('/dashboard');
    } else {
      alert(result.message);
    }
  }

  return (
    <section className="panel form-panel">
      <p className="eyebrow">Login</p>
      <h2>Sign in to continue</h2>
      <form onSubmit={handleSubmit} className="form-grid">
        <label>
          Email
          <input name="email" type="email" defaultValue="amina@example.com" required />
        </label>
        <label>
          Password
          <input name="password" type="password" defaultValue="Password123!" required />
        </label>
        <button className="button" type="submit">Login</button>
      </form>
    </section>
  );
}

function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <section className="panel">
      <p className="eyebrow">Protected route</p>
      <h2>Dashboard</h2>
      <p>Only authenticated users can view this page.</p>
      <div className="details">
        <span>{user.name}</span>
        <span>{user.email}</span>
      </div>
      <button className="secondary" type="button" onClick={logout}>Logout</button>
    </section>
  );
}

export default function App() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div className="app-shell">
      <header className="topbar">
        <Link className="brand" to="/">Context Auth</Link>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/login">Login</Link>
          {isAuthenticated && <button className="link-button" type="button" onClick={logout}>Logout</button>}
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}