import apiClient from '../client';

const leaderboardService = {
  // Get overall leaderboard
  getOverallLeaderboard: (limit?: number) => 
    apiClient.get('/leaderboard', { params: { limit } }),
  
  // Get test-specific leaderboard
  getTestLeaderboard: (testId: string, limit?: number) => 
    apiClient.get(`/leaderboard/test/${testId}`, { params: { limit } }),
  
  // Get user ranking
  getUserRanking: (userId: string, testId?: string) => 
    apiClient.get(`/leaderboard/user/${userId}`, { params: { testId } }),
};

export default leaderboardService;
