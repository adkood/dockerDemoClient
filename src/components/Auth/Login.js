import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store';

function Login() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://dockerdemoserver.onrender.com/api/login', {
        email: formData.email,
        password: formData.password
      },{
        withCredentials: true
      });

      if (response.status === 200) {
        alert('Login successful!');
        dispatch(authActions.login());
        dispatch(authActions.setId(response.data.data.user._id));
        dispatch(authActions.setToken(response.data.token));
      } else {
        alert('Login Failed!');
        console.error('Login failed!');
      }
    } catch (error) {
      console.error('Error occurred during login:', error);
    }
  };

  return (
    <div style={{ textAlign: 'center',borderRadius: "5px", width: '500px',padding: "20px", margin: '0 auto', boxShadow: "2px 2px 4px 1px grey"}}>
      <form onSubmit={handleSubmit}>
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
        <button type="submit" style={{ width: '100%', padding: '10px', borderRadius: '5px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>Login</button>
      </form>
    </div>
  );
}

export default Login;
