
CommerceWebsite:

A full-stack modern e-commerce web application built with **React**, **Node.js**, **Express**, and **MySQL**. It features user authentication, product browsing, cart management, and a checkout flow.

---

Features:

Authentication:
- User registration & login with JWT
- Protected routes for cart, checkout, and orders
- Persistent login using `localStorage`

Products:
- Browse available products
- Add items to cart
- Dynamic total calculation

Cart & Checkout:
- Update quantity or remove items
- Cart state managed using React Context
- Checkout button with confirmation flow

Orders (WIP):
- Order history for logged-in users

---

Technologies Used:

| Frontend | Backend |
|----------|---------|
| React 18 | Node.js + Express |
| React Router | MySQL + Sequelize/Raw SQL |
| Material UI (MUI) | JWT Authentication |
| Axios | CORS, Swagger for API docs |

---

Project Structure:

```
commercewebsite/
├── commerce/
│   ├── commerce-frontend/   # React frontend
│   └── commerce-backend/    # Node.js/Express backend
```

---

How to run:

Clone and Install

```bash
git clone https://github.com/SamuelJoseph23/commercewebsite.git
cd commerce/commerce-backend
npm install

cd ../commerce-frontend
npm install
```

---

Environment Variables:

Create a `.env` file in `commerce-backend/`:

```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=commerce
JWT_SECRET=your-secret-key
```

---

Run the App:

In separate terminals:

**Backend**:

```bash
cd commerce/commerce-backend
npm start
```

**Frontend**:

```bash
cd commerce/commerce-frontend
npm start
```

Frontend runs at `http://localhost:3001`  
Backend runs at `http://localhost:3000`

---

Screenshots:
Home Page:
![Home Page Screenshot](https://i.postimg.cc/52xnzcTC/Home.png)
Registration:
![Registration Page Screenshot](https://i.postimg.cc/NGHJqkR5/Registration.png)
Products:
![Products Page Screenshot](https://i.postimg.cc/Nf8dLGJt/Products.png)
Cart:
![Cart Page Screenshot](https://i.postimg.cc/hPRCSQ0M/Cart.png)

Author:

Samuel Joseph – [@SamuelJoseph23](https://github.com/SamuelJoseph23)
