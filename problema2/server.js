const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Ruta del archivo JSON
const productsFilePath = path.join(__dirname, 'products.json');

// Función para leer productos del archivo JSON
const readProductsFromFile = () => {
  const data = fs.readFileSync(productsFilePath);
  return JSON.parse(data);
};

// Función para escribir productos en el archivo JSON
const writeProductsToFile = (products) => {
  fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
};

// Rutas

// Obtener todos los productos
app.get('/GET/products', (req, res) => {
  const products = readProductsFromFile();
  
  res.json(products);
});

// Agregar un nuevo producto
app.post('/POST/products', (req, res) => {
  const products = readProductsFromFile();
  const newProduct = req.body;
  console.log(newProduct);
  newProduct.id = products.length ? products[products.length - 1].id + 1 : 1; // Asignar un ID
  products.push(newProduct);
  writeProductsToFile(products);
  res.status(201).json(newProduct);
});

// Actualizar un producto
app.put('/PUT/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  let products = readProductsFromFile();
  const index = products.findIndex((p) => p.id === id);
  
  if (index !== -1) {
    products[index] = { id, ...req.body };
    writeProductsToFile(products);
    res.json(products[index]);
  } else {
    res.status(404).send('Producto no encontrado');
  }
});

// Eliminar un producto
app.delete('/DELETE/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  let products = readProductsFromFile();
  products = products.filter((p) => p.id !== id);
  writeProductsToFile(products);
  res.status(204).send(); // Sin contenido
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});