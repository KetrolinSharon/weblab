const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
// Step 1: Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/employeeDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Step 2: Create Employee Schema
const employeeSchema = new mongoose.Schema({
  name: String,
  position: String,
  salary: Number
});
const Employee = mongoose.model('Employee', employeeSchema);

// Step 3: API Routes

// Get all employees
app.get('/employees', async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
});

// Add new employee
app.post('/employees', async (req, res) => {
  const emp = new Employee(req.body);
  await emp.save();
  res.json(emp);
});

// Update employee
app.put('/employees/:id', async (req, res) => {
  const emp = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(emp);
});

// Delete employee
app.delete('/employees/:id', async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.json({ message: 'Employee deleted' });
});

// Start server
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
