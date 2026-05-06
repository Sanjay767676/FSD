import { useMemo, useState } from 'react';

const initialProducts = [
  { id: 1, name: 'Canvas Backpack', category: 'Accessories', price: 49, stock: 8 },
  { id: 2, name: 'Wireless Headphones', category: 'Audio', price: 129, stock: 4 },
  { id: 3, name: 'Desk Lamp', category: 'Home', price: 39, stock: 12 },
  { id: 4, name: 'Travel Mug', category: 'Lifestyle', price: 24, stock: 20 },
];

function ProductCard({ product, onAdd, onRemove, selected }) {
  return (
    <article className={`product-card ${selected ? 'selected' : ''}`}>
      <p className="category">{product.category}</p>
      <h3>{product.name}</h3>
      <p className="price">${product.price}</p>
      <p className="stock">Stock: {product.stock}</p>
      <div className="actions">
        <button type="button" onClick={() => onAdd(product)}>Add</button>
        <button className="ghost" type="button" onClick={() => onRemove(product.id)}>Remove</button>
      </div>
    </article>
  );
}

export default function App() {
  const [products, setProducts] = useState(initialProducts);
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState([]);

  const categories = ['All', ...new Set(initialProducts.map((product) => product.category))];

  const visibleProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesQuery = product.name.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [products, query, selectedCategory]);

  function handleAddToCart(product) {
    setCart((currentCart) => {
      const existing = currentCart.find((item) => item.id === product.id);
      if (existing) {
        return currentCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }

      return [...currentCart, { ...product, quantity: 1 }];
    });
  }

  function handleRemoveProduct(id) {
    setProducts((currentProducts) => currentProducts.filter((product) => product.id !== id));
    setCart((currentCart) => currentCart.filter((item) => item.id !== id));
  }

  function handleClearCart() {
    setCart([]);
  }

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <main className="shop-shell">
      <section className="hero">
        <p className="eyebrow">Functional components</p>
        <h1>Product listing built with React state and events.</h1>
        <p>This page filters products, reacts to user input, and keeps a simple cart in component state.</p>
      </section>

      <section className="toolbar">
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search products"
        />
        <div className="filters">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={selectedCategory === category ? 'active' : ''}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <section className="grid">
        {visibleProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAdd={handleAddToCart}
            onRemove={handleRemoveProduct}
            selected={cart.some((item) => item.id === product.id)}
          />
        ))}
      </section>

      <aside className="cart">
        <div className="cart-head">
          <h2>Cart</h2>
          <button type="button" className="ghost" onClick={handleClearCart}>Clear cart</button>
        </div>
        {cart.length === 0 ? (
          <p>No items selected yet.</p>
        ) : (
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                {item.name} x {item.quantity}
              </li>
            ))}
          </ul>
        )}
        <p className="total">Total: ${cartTotal}</p>
      </aside>
    </main>
  );
}