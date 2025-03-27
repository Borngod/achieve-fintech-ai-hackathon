import app from "./app.js";

// Set the port from environment variable or default to 3000
const PORT = process.env.PORT || 3020;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
