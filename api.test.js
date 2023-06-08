const axios = require('axios');
const { getAllActivities, getActivityById } = require('./server');

jest.mock('axios');

describe('API Tests', () => {
  // ... existing test cases ...

  it('Get activity by ID', async () => {
    const mockErrorResponse = { response: { status: 500 } };
    axios.get.mockRejectedValueOnce(mockErrorResponse);

    await expect(getActivityById(1)).rejects.toThrow('Internal Server Error');
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      'https://www.boredapi.com/api/activity/1'
    );
  });
});
