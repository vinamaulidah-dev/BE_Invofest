import express from "express";
import cors from "cors";

// Gunakan require agar Vercel mendeteksi jalurnya secara otomatis saat runtime
const eventRoutes = require("./src/routes/eventRoute");
const categoryRoutes = require("./src/routes/categoryRoute");
const pembicaraRoutes = require("./src/routes/pembicaraRoute");
const authRoutes = require("./src/routes/authRoute");

const app = express();
const port = process.env.PORT || 3000;

// CORS diaktifkan untuk meloloskan localhost dan domain front-end kamu
app.use(cors({
  origin: ["https://fe-invofest.vercel.app", "http://localhost:5173"], 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, World! Backend Invofest Berhasil Running.');
});

// Daftarkan rute-rute utama API kamu
app.use('/events', eventRoutes.default || eventRoutes);
app.use('/categories', categoryRoutes.default || categoryRoutes);
app.use('/pembicara', pembicaraRoutes.default || pembicaraRoutes);
app.use('/api/auth', authRoutes.default || authRoutes);

if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

export default app;