import React, { useState } from 'react';
import './FeedbackForm.css';

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    feedback: '',
    email: '',
    category: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        alert('Feedback submitted successfully!');
        setFormData({ username: '', feedback: '', email: '', category: '' });
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong while submitting feedback.');
    }
  };

  return (
    <form className="lansingpageform" onSubmit={handleSubmit}>
      <div className="forminputdiv heading">
        <h1 style={{ color: 'black', paddingRight: '15px' }}>
          Form fillup for feedback
        </h1>
      </div>

      {/* Username */}
      <div className="forminputdiv">
        <label className="labelreq" htmlFor="username">
          Username:
        </label>
        <input
          className="forminputfields forminputfieldsreq"
          placeholder="Your name"
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>

      {/* Feedback */}
      <div className="forminputdiv">
        <label className="labelreq" htmlFor="feedback">
          Feedback:
        </label>
        <textarea
          className="forminputfields forminputfieldsreq"
          id="feedback"
          name="feedback"
          placeholder="Enter feedback"
          rows="4"
          cols="40"
          value={formData.feedback}
          onChange={handleChange}
          required
        ></textarea>
      </div>

      {/* Email */}
      <div className="forminputdiv">
        <label className="labelreq" htmlFor="email">
          Email Address:
        </label>
        <input
          className="forminputfields forminputfieldsreq"
          type="email"
          placeholder="Your email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      {/* Category */}
      <div className="forminputdiv">
        <label className="labelreq" htmlFor="category">
          Category:
        </label>
        <select
          className="forminputfields"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">--Select category--</option>
          <option value="Bug report">Bug report</option>
          <option value="Feature">Feature</option>
          <option value="Suggestion">Suggestion</option>
        </select>
      </div>

      {/* Submit Button */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default FeedbackForm;



