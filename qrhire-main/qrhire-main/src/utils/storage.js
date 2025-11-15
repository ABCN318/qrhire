// Simple JSON file-based storage for applicants
// In a real app, this would use a backend API, but for simplicity we use localStorage

export const saveApplicant = (applicant) => {
  const applicants = getApplicants();
  const newApplicant = {
    ...applicant,
    id: Date.now().toString(),
    appliedAt: new Date().toISOString()
  };
  applicants.push(newApplicant);
  const oldValue = localStorage.getItem('applicants');
  localStorage.setItem('applicants', JSON.stringify(applicants));
  
  // Dispatch custom event to notify other components (same tab)
  // This works across routes in the same tab
  window.dispatchEvent(new CustomEvent('applicantSaved', {
    detail: { applicant: newApplicant, applicants: applicants }
  }));
  
  // Also dispatch a storage-like event for better compatibility
  // Note: Native storage events only fire for cross-tab changes,
  // but this custom event helps with same-tab route changes
  try {
    const storageEvent = new StorageEvent('storage', {
      key: 'applicants',
      newValue: JSON.stringify(applicants),
      oldValue: oldValue,
      storageArea: localStorage,
      url: window.location.href
    });
    window.dispatchEvent(storageEvent);
  } catch (e) {
    // StorageEvent constructor might not work in all browsers
    // The custom event above should still work
  }
  
  return newApplicant;
};

export const getApplicants = () => {
  const stored = localStorage.getItem('applicants');
  return stored ? JSON.parse(stored) : [];
};

export const deleteApplicant = (id) => {
  const applicants = getApplicants();
  const filtered = applicants.filter(app => app.id !== id);
  localStorage.setItem('applicants', JSON.stringify(filtered));
  return filtered;
};

export const clearAllApplicants = () => {
  localStorage.removeItem('applicants');
};

