import React, { useState } from "react";
import "../css/ContactUs.css"; // Style file for Contact Us page

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formSuccess, setFormSuccess] = useState(null);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSuccess(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-us">
      <h1>Contact Us</h1>
      {formSuccess === true ? (
        <p className="success-message">Thank you for contacting us!</p>
      ) : formSuccess === false ? (
        <p className="error-message">There was an error sending your message. Please try again.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button type="submit">Send Message</button>
        </form>
      )}
    </div>
  );
};

export default ContactUs;
