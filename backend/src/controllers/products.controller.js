import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PRODUCTS_FILE = path.join(__dirname, '../../data/products.json');

// Helper function to read products from JSON file
const readProducts = async () => {
  try {
    const data = await fs.readFile(PRODUCTS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading products file:', error);
    throw new Error('Failed to read products data');
  }
};

// Helper function to write products to JSON file
const writeProducts = async (products) => {
  try {
    await fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 2));
  } catch (error) {
    console.error('Error writing products file:', error);
    throw new Error('Failed to save products data');
  }
};

// GET /products - Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await readProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve products' });
  }
};

// POST /update-stock - Update product stock
export const updateStock = async (req, res) => {
  try {
    const { id, newQuantity } = req.body;

    // Validate input types
    if (typeof id !== 'number' || typeof newQuantity !== 'number') {
      return res.status(400).json({ 
        error: 'Invalid input: id and newQuantity must be numbers' 
      });
    }

    // Validate non-negative stock
    if (newQuantity < 0) {
      return res.status(400).json({ 
        error: 'Stock quantity cannot be negative' 
      });
    }

    // Read current products
    const products = await readProducts();

    // Find the product
    const productIndex = products.findIndex(p => p.id === id);

    if (productIndex === -1) {
      return res.status(404).json({ 
        error: 'Product not found' 
      });
    }

    // Update stock quantity
    products[productIndex].stockQuantity = newQuantity;

    // Save to file
    await writeProducts(products);

    // Return success response
    res.json({
      message: 'Stock updated successfully ✅',
      product: products[productIndex]
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update stock' });
  }
};