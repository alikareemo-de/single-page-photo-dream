// User info validation API
const API_BASE_URL = '/api';

export const checkUserInfo = async (userId: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/check-info/${userId}`);
    
    if (!response.ok) {
      throw new Error(`Failed to check user info: ${response.statusText}`);
    }
    
    const result = await response.json();
    return result.isComplete || false;
  } catch (error) {
    console.error('Error checking user info:', error);
    throw error;
  }
};