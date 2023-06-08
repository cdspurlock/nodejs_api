const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000; // You can change the port number if needed

// Fetch all activities
app.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://www.boredapi.com/api/activity');
    const activities = response.data;
    res.json(activities);
  } catch (error) {
    console.error('Error fetching activities:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Fetch a single activity by ID
app.get('/activity/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(`https://www.boredapi.com/api/activity/${id}`);
    const activity = response.data;
    res.json(activity);
  } catch (error) {
    console.error(`Error fetching activity with ID ${id}:`, error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
