const axios = require('axios');
const { getAllActivities, getActivityById } = require('./apiService');

// Mock the axios.get method
jest.mock('axios');

describe('API Tests', () => {
  test('Get all activities', async () => {
    const mockResponse = {
      data: [
        { 
          activity: 'Do yoga',
          type: 'recreational',
          participants: 1,
          price: 0.2,
          accessibility: 0.1
        },
        { 
          activity: 'Read a book',
          type: 'educational',
          participants: 1,
          price: 0,
          accessibility: 0.2
        },
      ],
    };

    axios.get.mockResolvedValue(mockResponse);

    const activities = await getAllActivities();

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith('https://www.boredapi.com/api/activity');
    expect(activities).toEqual(mockResponse.data);
  });

  test('Get activity by ID', async () => {
    const mockResponse = {
      data: { 
        activity: 'Do yoga',
        type: 'recreational',
        participants: 1,
        price: 0.2,
        accessibility: 0.1
      },
    };

    axios.get.mockResolvedValue(mockResponse);

    const activity = await getActivityById(1);

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith('https://www.boredapi.com/api/activity/1');
    expect(activity).toEqual(mockResponse.data);
  });
});
