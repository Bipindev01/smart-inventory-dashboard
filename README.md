# Smart Inventory Dashboard

A full-stack inventory management dashboard built with **React (Vite)** and **Node.js + Express**.  
It allows managers to monitor products, update stock in real-time, and receive **low-stock alerts**.

---

## ✅ Features

- View products in a responsive grid layout
- Increase / decrease stock using `+` and `-`
- Prevent negative stock (frontend + backend validation)
- Low stock warning UI (badge + red border)
- Per-product loading state while updating stock
- JSON file persistence (no database required)

---

## 🛠 Tech Stack

**Frontend:** React (Vite), JavaScript, CSS  
**Backend:** Node.js, Express, CORS  
**Storage:** JSON file (`backend/data/products.json`)

---

## 📁 Project Structure

```

smart-inventory-dashboard/
backend/
frontend/

````

---

## ▶️ Run Locally

### 1) Start Backend
```bash
cd backend
npm install
npm run dev
````

Backend runs at:

* [http://localhost:5000](http://localhost:5000)
* [http://localhost:5000/products](http://localhost:5000/products)

---

### 2) Start Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

* [http://localhost:5173](http://localhost:5173)

---

## 🔑 Environment Variable

Create this file:

📌 `frontend/.env`

```env
VITE_API_URL=http://localhost:5000
```

> After updating `.env`, restart the frontend server.

---

## 🔌 API Endpoints

### GET `/products`

Returns the list of products.

### POST `/update-stock`

Updates stock quantity.

Body:

```json
{
  "id": 1,
  "newQuantity": 10
}
```

Validation:

* `newQuantity < 0` returns an error

---

## 🚀 Deployment (Optional)

* Backend: Render
* Frontend: Vercel

Set the deployed backend URL in Vercel env variables:

```
VITE_API_URL=https://your-backend-url.onrender.com
```

---

## 👤 Author

**Bipin Dev B**

```
