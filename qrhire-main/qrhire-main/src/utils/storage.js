// Cloud storage using Vercel serverless function
// This allows data to be shared across different devices/browsers

const API_URL = '/api/applicants';

// Fallback to localStorage if API fails
const useLocalStorage = true;

export const saveApplicant = async (applicant) => {
  const newApplicant = {
    ...applicant,
    id: Date.now().toString(),
    appliedAt: new Date().toISOString()
  };

  try {
    // Get existing applicants
    const existingApplicants = await getApplicants();
    const updatedApplicants = [...existingApplicants, newApplicant];

    // Save to cloud API
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newApplicant)
    });

    if (!response.ok) {
      throw new Error('Failed to save to API');
    }

    // Also save to localStorage as backup
    if (useLocalStorage) {
      localStorage.setItem('applicants', JSON.stringify(updatedApplicants));
    }
    
    // Dispatch event for same-tab updates
    window.dispatchEvent(new CustomEvent('applicantSaved', {
      detail: { applicant: newApplicant, applicants: updatedApplicants }
    }));

    return newApplicant;
  } catch (error) {
    console.error('Error saving to API:', error);
    
    // Fallback to localStorage
    const applicants = JSON.parse(localStorage.getItem('applicants') || '[]');
    applicants.push(newApplicant);
    localStorage.setItem('applicants', JSON.stringify(applicants));
    
    window.dispatchEvent(new CustomEvent('applicantSaved', {
      detail: { applicant: newApplicant, applicants: applicants }
    }));

    return newApplicant;
  }
};

export const getApplicants = async () => {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch from API');
    }

    const applicants = await response.json();

    // Also update localStorage as backup
    if (useLocalStorage) {
      localStorage.setItem('applicants', JSON.stringify(applicants));
    }

    return applicants || [];
  } catch (error) {
    console.error('Error fetching from API:', error);
    
    // Fallback to localStorage
    const stored = localStorage.getItem('applicants');
    return stored ? JSON.parse(stored) : [];
  }
};

export const deleteApplicant = async (id) => {
  try {
    const applicants = await getApplicants();
    const filtered = applicants.filter(app => app.id !== id);

    // Update cloud API
    const response = await fetch(`${API_URL}?id=${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to delete from API');
    }

    // Also update localStorage
    if (useLocalStorage) {
      localStorage.setItem('applicants', JSON.stringify(filtered));
    }

    return filtered;
  } catch (error) {
    console.error('Error deleting from API:', error);
    
    // Fallback to localStorage
    const applicants = JSON.parse(localStorage.getItem('applicants') || '[]');
    const filtered = applicants.filter(app => app.id !== id);
    localStorage.setItem('applicants', JSON.stringify(filtered));

    return filtered;
  }
};

export const clearAllApplicants = async () => {
  try {
    // Clear cloud API
    const response = await fetch(API_URL, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to clear API');
    }

    // Also clear localStorage
    if (useLocalStorage) {
      localStorage.removeItem('applicants');
    }
  } catch (error) {
    console.error('Error clearing API:', error);
    
    // Fallback to localStorage
    localStorage.removeItem('applicants');
  }
};

