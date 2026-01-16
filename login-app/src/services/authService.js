const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const authService = {
  async googleAuth(token) {
    try {
      const response = await fetch(`${API_URL}/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
      });
      if (!response.ok) throw new Error('Backend error');
      return response.json();
    } catch (error) {
      throw error;
    }
  },

  async githubAuth(code) {
    try {
      const response = await fetch(`${API_URL}/auth/github`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      });
      if (!response.ok) throw new Error('Backend error');
      return response.json();
    } catch (error) {
      throw error;
    }
  }
};
