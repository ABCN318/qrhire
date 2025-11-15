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
  localStorage.setItem('applicants', JSON.stringify(applicants));
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

