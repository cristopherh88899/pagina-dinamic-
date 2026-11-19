// ===== TABLA PEDIDOS =====
db.query(`CREATE TABLE IF NOT EXISTS pedidos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cliente VARCHAR(100),
  compra VARCHAR(255),
  total DECIMAL(10,2),
  estado VARCHAR(20) DEFAULT 'pendiente'
)`);

// GET pedidos
app.get('/api/pedidos', (req, res) => {
  db.query('SELECT * FROM pedidos ORDER BY id DESC', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// POST pedido
app.post('/api/pedidos', (req, res) => {
  const { cliente, compra, total, estado } = req.body;
  if (!cliente || !compra) return res.status(400).json({ error: 'Falta cliente o compra' });
  db.query('INSERT INTO pedidos (cliente, compra, total, estado) VALUES (?, ?, ?, ?)',
    [cliente, compra, total, estado || 'pendiente'],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: result.insertId, cliente, compra, total, estado });
    });
});

// DELETE pedido
app.delete('/api/pedidos/:id', (req, res) => {
  db.query('DELETE FROM pedidos WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ ok: true });
  });
});
