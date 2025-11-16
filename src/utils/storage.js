// API-based storage for applicants
// Uses backend API to store data in SQLite database

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export const saveApplicant = async (applicant) => {
  try {
    const response = await fetch(`${API_BASE_URL}/applicants`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(applicant),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Server error' }));
      throw new Error(error.error || 'Failed to save applicant');
    }

    const newApplicant = await response.json();
    return newApplicant;
  } catch (error) {
    console.error('Error saving applicant:', error);
    // Check if it's a network error (server not running)
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError') || error.name === 'TypeError') {
      throw new Error('Cannot connect to server. Please make sure the backend server is running on port 3001.');
    }
    throw error;
  }
};

export const getApplicants = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/applicants`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch applicants');
    }

    const applicants = await response.json();
    return applicants;
  } catch (error) {
    console.error('Error fetching applicants:', error);
    // Return empty array on error to prevent app crash
    return [];
  }
};

export const deleteApplicant = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/applicants/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to delete applicant');
    }

    // Return updated list
    return await getApplicants();
  } catch (error) {
    console.error('Error deleting applicant:', error);
    throw error;
  }
};

export const clearAllApplicants = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/applicants`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to clear applicants');
    }

    return [];
  } catch (error) {
    console.error('Error clearing applicants:', error);
    throw error;
  }
};

