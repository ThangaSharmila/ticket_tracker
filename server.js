
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); // For environment variables

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ticketdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// ✅ Ticket Schema
const ticketSchema = new mongoose.Schema({
    title: { type: String, required: true },
    desc: { type: String, required: true },
    priority: { type: String, enum: ['low', 'medium', 'high'], required: true },
    status: { type: String, enum: ['open', 'in'], default: 'open' }
});

const Ticket = mongoose.model('Ticket', ticketSchema);

// ✅ Create Ticket
app.post('/tickets', async (req, res) => {
    try {
        const { title, desc, priority, status } = req.body;
        if (!title || !desc || !priority) {
            return res.status(400).json({ message: 'Title, description, and priority are required' });
        }
        const ticket = new Ticket({ title, desc, priority, status });
        await ticket.save();
        res.status(201).json(ticket);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Get All Tickets (with optional filters)
app.get('/tickets', async (req, res) => {
    try {
        const { status, priority } = req.query;
        let filter = {};
        if (status) filter.status = status;
        if (priority) filter.priority = priority;
        const tickets = await Ticket.find(filter);
        res.json(tickets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Update Ticket Status
app.put('/tickets/:id', async (req, res) => {
    try {
        const { status } = req.body;
        if (!status) return res.status(400).json({ message: 'Status is required' });
        const ticket = await Ticket.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
        res.json(ticket);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Delete Ticket
app.delete('/tickets/:id', async (req, res) => {
    try {
        const ticket = await Ticket.findByIdAndDelete(req.params.id);
        if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
        res.json({ message: 'Ticket deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
