import express from "express";
import cors from "cors";
import eventRoutes from "./src/routes/eventRoute.ts";
import categoryRoutes from "./src/routes/categoryRoute.ts";
import pembicaraRoutes from "./src/routes/pembicaraRoute.ts";
import authRoutes from "./src/routes/authRoute.ts"; // Arahkan langsung ke file .ts aslinya

const app = express();
const port = process.env.PORT || 3000;

// CORS aman untuk frontend localhost dan Vercel production kamu
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
app.use('/api/auth', authRoutes); // Jalur auth resmi dibuka

if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

export default app;