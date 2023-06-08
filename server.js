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
    res.status(error.response.status).json({ error: 'Internal Server Error' });
  }
});

// Only start the server if this file is directly run
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

// Export the functions for testing
module.exports = {
  getAllActivities: async () => {
    try {
      const response = await axios.get('https://www.boredapi.com/api/activity');
      return response.data;
    } catch (error) {
      console.error('Error fetching activities:', error);
      throw new Error('Internal Server Error');
    }
  },

  getActivityById: async (id) => {
    try {
      const response = await axios.get(`https://www.boredapi.com/api/activity/${id}`);
      if (response.status !== 200) {
        throw new Error('Internal Server Error');
      }
      return response.data;
    } catch (error) {
      console.error(`Error fetching activity with ID ${id}:`, error);
      throw new Error('Internal Server Error');
    }
  },
};
