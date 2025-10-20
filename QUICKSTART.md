# 🚀 Quick Reference - E-Commerce Platform

## 📦 Local Development

### Start Backend
```bash
cd server
npm install
npm start
```
**Runs on:** http://localhost:5001

### Start Frontend
```bash
cd client/my-react-app
npm install
npm run dev
```
**Runs on:** http://localhost:5173

### Quick Setup (One Command)
```bash
./setup.sh
```

---

## 🌐 Environment Variables

### Frontend (.env.local)
```bash
VITE_API_URL=http://localhost:5001
```

### Backend (.env)
```bash
PORT=5001
MONGO_URI=mongodb+srv://...
SESSION_SECRET=your-secret
STRIPE_SECRET_KEY=sk_test_...
CLIENT_URL=http://localhost:5173
```

---

## 🚀 Deployment URLs

### Deploy Commands

**Backend (Render):**
- Root Directory: `server`
- Build: `npm install`
- Start: `npm start`

**Frontend (Vercel):**
- Root Directory: `client/my-react-app`
- Build: `npm run build`
- Framework: Vite

---

## 🔍 Useful Endpoints

### Health Check
```
GET /health
```

### Products
```
GET /api/products
GET /api/products/:id
GET /api/products?search=query
```

### Authentication
```
POST /api/user/register
POST /api/user/login
POST /api/user/logout
```

### Cart
```
GET  /api/cart
POST /api/cart/items
DELETE /api/cart/items
```

### Admin
```
GET  /api/admin/products
POST /api/admin/products
```

---

## 🧪 Test Data

### Stripe Test Card
```
Card: 4242 4242 4242 4242
Expiry: Any future date
CVC: Any 3 digits
ZIP: Any 5 digits
```

---

## 📁 Important Files

| File | Purpose |
|------|---------|
| `client/my-react-app/src/config/api.js` | API configuration |
| `server/server.js` | Backend entry point |
| `.env.example` | Environment variable templates |
| `DEPLOYMENT.md` | Full deployment guide |
| `CONFIGURATION.md` | Configuration summary |

---

## 🐛 Quick Debugging

### Check Backend Running
```bash
curl http://localhost:5001/health
```

### Check Frontend Build
```bash
cd client/my-react-app
npm run build
```

### View Backend Logs
```bash
# In server directory
npm start
```

### View Network Requests
- Open browser DevTools
- Go to Network tab
- Filter by "Fetch/XHR"

---

## 📚 Documentation

- **Setup:** See README.md
- **Deployment:** See DEPLOYMENT.md
- **Configuration:** See CONFIGURATION.md
- **API Docs:** See README.md - API Endpoints section

---

## 💡 Common Issues

| Issue | Solution |
|-------|----------|
| CORS errors | Check CLIENT_URL in backend .env |
| API not found | Verify VITE_API_URL in frontend .env |
| Session not working | Ensure credentials: 'include' in fetch |
| Build fails | Delete node_modules, run npm install |

---

## 🎯 Project Structure

```
ecommerce/
├── client/my-react-app/  # Frontend (React + Vite)
├── server/               # Backend (Node + Express)
├── vercel.json          # Frontend deployment config
├── render.yaml          # Backend deployment config
├── setup.sh             # Quick setup script
└── DEPLOYMENT.md        # Deployment guide
```

---

**Need help?** Check DEPLOYMENT.md or CONFIGURATION.md for detailed information.
