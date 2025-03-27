import express, { json, urlencoded } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet'; 

const app = express();


// Enable CORS for all routes
app.use(cors());
// Log HTTP requests for debugging
app.use(morgan('dev'));
// Secure the app by setting various HTTP headers
app.use(helmet());
// Parse incoming JSON requests
app.use(json());
// Parse incoming URL-encoded requests
app.use(urlencoded({ extended: true }));

// Routes
// Root route: responds with a simple message
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Example POST route: echoes back the request body
app.post('/echo', (req, res) => {
  res.json(req.body);
});

// Example PUT route: simulates updating a resource
app.put('/update/:id', (req, res) => {
  const { id } = req.params;
  const data = req.body;
  res.json({ message: `Updated resource with ID ${id}`, data });
});

// Example DELETE route: simulates deleting a resource
app.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  res.json({ message: `Deleted resource with ID ${id}` });
});

// 404 handler for undefined routes
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!', error: err.message });
});



export default app;