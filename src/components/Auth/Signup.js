import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import  { authActions } from '../../store';

function Signup() {

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      console.error('Passwords do not match!');
      return;
    }

    try {
      const response = await axios.post('https://dockerdemoserver.onrender.com/api/signup', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        passwordConfirm: formData.confirmPassword,
      },{
        withCredentials: true
      });

      if (response.status === 201) {
        console.log('Signup successful!');
        alert('Signup successfull!');
        dispatch(authActions.login());
        dispatch(authActions.setId(response.data.data.user._id));
        dispatch(authActions.setToken(response.data.token));
      } else {
        console.error('Signup failed!');
        alert('Signup failed!');
      }
    } catch (error) {
      console.error('Error occurred during signup:', error);
    }
  };

  return (
    <div style={{ textAlign: 'center', width: '500px',padding: "20px", margin: '0 auto',  boxShadow: "2px 2px 4px 1px grey"}}>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', border: "1px solid grey", borderRadius: '5px' }}
            required
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px',border: "1px solid grey", borderRadius: '5px' }}
            required
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px',border: "1px solid grey", borderRadius: '5px' }}
            required
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px',border: "1px solid grey", borderRadius: '5px' }}
            required
          />
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', borderRadius: '5px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>Signup</button>
      </form>
    </div>
  );
}

export default Signup;
