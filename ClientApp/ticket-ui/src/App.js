
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [tickets, setTickets] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');

  const fetchTickets = async () => {
    try {
      const params = {};
      if (statusFilter) params.status = statusFilter;
      if (priorityFilter) params.priority = priorityFilter;

      const res = await axios.get('http://localhost:5000/tickets', { params });
      setTickets(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [statusFilter, priorityFilter]);

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/tickets/${id}`, { status: newStatus });
      fetchTickets();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1>Ticket Dashboard</h1>
      <div className="filters">
        <select onChange={(e) => setStatusFilter(e.target.value)} value={statusFilter}>
          <option value="">Filter by Status</option>
          <option value="open">Open</option>
          <option value="in">In Progress</option>
        </select>
        <select onChange={(e) => setPriorityFilter(e.target.value)} value={priorityFilter}>
          <option value="">Filter by Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Priority</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map(ticket => (
            <tr key={ticket._id}>
              <td>{ticket.title}</td>
              <td>{ticket.desc}</td>
              <td>{ticket.priority}</td>
              <td>
                <select value={ticket.status} onChange={(e) => updateStatus(ticket._id, e.target.value)}>
                  <option value="open">Open</option>
                  <option value="in">In Progress</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
