
### Live Demo 🚀

* **Frontend:**
  [https://site-crawler-omega.vercel.app](https://site-crawler-omega.vercel.app)

* **Backend (API):**
  [https://site-crawler-backend.onrender.com](https://site-crawler-backend.onrender.com)

* **API Docs (Swagger):**
  [https://site-crawler-backend.onrender.com/docs](https://site-crawler-backend.onrender.com/docs)

---

### Deal availability
I treat a deal as "available" when `deal_status !== "Invested"`.

---


### Tech Stack 🧰

#### Frontend

* React + TypeScript
* Vite
* Chakra UI
* Deployed on **Vercel**

#### Backend

* Python 3
* FastAPI
* Requests
* Deployed on **Render**

---

### Features ✨

* Select external platform (FO1 / FO2)
* Login using external credentials
* Fetch and display available deals
* View and download files per deal
* Graceful handling of authentication errors and token expiration
* CORS-safe communication between frontend and backend

---

### Project Structure 🗂️

```
site-crawler/
├── frontend/   # React + Vite application
└── backend/    # FastAPI application
```

---

### Possible Improvements 🔮

- Persist authentication state securely (e.g., HttpOnly cookies or encrypted storage) 🔐
- Add refresh-token flow for expired external tokens ♻️
- Add basic unit tests for service and API layers 🧪
