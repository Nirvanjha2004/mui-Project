import apiClient from '../client';

interface TestResult {
  testId: string;
  answers: {
    questionId: string;
    answer: string | string[];
  }[];
  timeTaken: number;
}

const testService = {
  // Get all tests
  getAllTests: () => apiClient.get('/tests'),

  // Get test by ID
  getTestById: (id: string) => apiClient.get(`/tests/${id}`),

  // Create test (admin only)
  createTest: (testData: any) => apiClient.post('/tests', testData),

  // Update test (admin only)
  updateTest: (id: string, testData: any) => apiClient.put(`/tests/${id}`, testData),

  // Delete test (admin only)
  deleteTest: (id: string) => apiClient.delete(`/tests/${id}`),

  // Submit test result
  submitTestResult: (resultData: TestResult) => apiClient.post('/tests/submit', resultData),
};

export default testService;
