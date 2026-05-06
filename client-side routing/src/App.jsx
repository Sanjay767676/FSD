import { Link, Route, Routes, useParams } from 'react-router-dom';

const pages = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
];

function Home() {
  return (
    <section className="card">
      <p className="eyebrow">Navigation</p>
      <h1>Client-side routing keeps the page fast and fluid.</h1>
      <p>This demo uses React Router to move between pages without full reloads and includes a route parameter example.</p>
      <div className="tile-row">
        <Link className="button" to="/about">Read About</Link>
        <Link className="button secondary" to="/contact">Contact Us</Link>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="card">
      <p className="eyebrow">About</p>
      <h2>Single-page navigation</h2>
      <p>Routing updates the URL, swaps components, and keeps state inside the React app.</p>
      <Link className="button" to="/product/react-router">See a route with params</Link>
    </section>
  );
}

function Contact() {
  return (
    <section className="card">
      <p className="eyebrow">Contact</p>
      <h2>Reach out anytime</h2>
      <p>Email: hello@example.com</p>
      <p>Phone: +1 555 0100</p>
    </section>
  );
}

function ProductDetail() {
  const { slug } = useParams();
  return (
    <section className="card">
      <p className="eyebrow">Route params</p>
      <h2>Page for: {slug}</h2>
      <p>This value came from the URL using <code>/product/:slug</code>.</p>
      <Link className="button secondary" to="/">Back home</Link>
    </section>
  );
}

export default function App() {
  return (
    <main className="shell">
      <header className="topbar">
        <span className="brand">Router Demo</span>
        <nav>
          {pages.map((page) => (
            <Link key={page.path} to={page.path}>{page.label}</Link>
          ))}
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:slug" element={<ProductDetail />} />
      </Routes>
    </main>
  );
}