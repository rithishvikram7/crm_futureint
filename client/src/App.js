import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [lead, setLead] = useState({
    name: "",
    email: "",
    phone: "",
    status: "New",
    notes: ""
  });

  const [leads, setLeads] = useState([]);

  const handleChange = (e) => {
    setLead({
      ...lead,
      [e.target.name]: e.target.value
    });
  };

  const fetchLeads = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/leads"
      );

      setLeads(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/leads",
        lead
      );

      setLead({
        name: "",
        email: "",
        phone: "",
        status: "New",
        notes: ""
      });

      fetchLeads();

      alert("Lead Saved Successfully");
    } catch (error) {
      console.error(error);
    }
  };

  const deleteLead = async (index) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/leads/${index}`
      );

      fetchLeads();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px"
        }}
      >
        <h2>🚀 Future CRM</h2>
        <p>Welcome, Admin</p>
      </div>

      <h1 className="title">
        Client Lead Management System
      </h1>

      <div className="stats">

        <div className="stat-card">
          <h3>Total Leads</h3>
          <h1>{leads.length}</h1>
        </div>

        <div className="stat-card">
          <h3>New Leads</h3>
          <h1>
            {
              leads.filter(
                (lead) => lead.status === "New"
              ).length
            }
          </h1>
        </div>

        <div className="stat-card">
          <h3>Converted</h3>
          <h1>
            {
              leads.filter(
                (lead) => lead.status === "Converted"
              ).length
            }
          </h1>
        </div>

      </div>

      <div className="form-card">

        <h2>Add New Lead</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={lead.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={lead.email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Enter Phone Number"
            value={lead.phone}
            onChange={handleChange}
            required
          />

          <select
            name="status"
            value={lead.status}
            onChange={handleChange}
          >
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Converted">Converted</option>
          </select>

          <textarea
            name="notes"
            placeholder="Enter Notes"
            value={lead.notes}
            onChange={handleChange}
          />

          <button type="submit">
            Add Lead
          </button>

        </form>

      </div>

      <h2 style={{ marginBottom: "15px" }}>
        Lead Dashboard
      </h2>

      <table>

        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Notes</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {leads.map((lead, index) => (
            <tr key={index}>

              <td>{lead.name}</td>

              <td>{lead.email}</td>

              <td>{lead.phone}</td>

              <td>
                <span
                  className={
                    lead.status === "New"
                      ? "status-new"
                      : lead.status === "Contacted"
                      ? "status-contacted"
                      : "status-converted"
                  }
                >
                  {lead.status}
                </span>
              </td>

              <td>{lead.notes}</td>

              <td>
                <button
                  className="delete-btn"
                  onClick={() =>
                    deleteLead(index)
                  }
                >
                  Delete
                </button>
              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default App;