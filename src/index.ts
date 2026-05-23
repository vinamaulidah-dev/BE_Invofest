import express from "express";
import cors from "cors";
import eventRoutes from "./routes/eventRoute.js";
import categoryRoutes from "./routes/categoryRoute.js";
import pembicaraRoutes from "./routes/pembicaraRoute.js";

// @ts-ignore
import authRoutes from "./routes/authRoute.js"; // Membungkam eror TypeScript agar garis merah hilang

const app = express();
const port = process.env.PORT || 3000;

// CORS Whitelist untuk mengizinkan localhost Frontend dan Vercel Production
app.use(cors({
  origin: ["https://fe-invofest.vercel.app", "http://localhost:5173"], 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, World! Backend Invofest Berhasil Running.');
});

// Daftarkan rute API utama
app.use('/events', eventRoutes);
app.use('/categories', categoryRoutes);
app.use('/pembicara', pembicaraRoutes);
app.use('/api/auth', authRoutes); // Jalur registrasi & login resmi dibuka

if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

export default app;