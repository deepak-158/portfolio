// Enhanced form submission utility for Formspree
export const submitContactForm = async (formData) => {
  console.log('🚀 Starting Formspree submission with data:', formData);

  // Validate form data
  const validation = validateFormData(formData);
  if (!validation.isValid) {
    throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
  }

  // Submit to Formspree
  try {
    console.log('📤 Submitting to Formspree...');
    const result = await submitToFormspree(formData);
    console.log('✅ Formspree submission successful!');
    return { success: true, method: 'Formspree', result };
  } catch (error) {
    console.error('❌ Formspree submission failed:', error.message);
    throw new Error('Form submission failed. Please try again later or contact directly via email.');
  }
};

// Validation function
const validateFormData = (data) => {
  const errors = [];
  
  if (!data.name || data.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email)) {
    errors.push('Valid email address is required');
  }
  
  if (!data.subject || data.subject.trim().length < 3) {
    errors.push('Subject must be at least 3 characters long');
  }
  
  if (!data.message || data.message.trim().length < 10) {
    errors.push('Message must be at least 10 characters long');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Formspree submission
const submitToFormspree = async (formData) => {
  const submitData = new FormData();
  submitData.append('name', formData.name);
  submitData.append('email', formData.email);
  submitData.append('subject', formData.subject);
  submitData.append('message', formData.message);
  submitData.append('_subject', `Portfolio Contact: ${formData.subject}`);
  submitData.append('_captcha', 'false');
  submitData.append('_next', window.location.origin + '/contact?success=true');

  const response = await fetch('https://formspree.io/f/mkgboqdl', {
    method: 'POST',
    body: submitData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Formspree error (${response.status}): ${errorText}`);
  }

  return await response.text();
};

// Export for use in components
export { validateFormData };

// Development testing function
export const testAllMethods = async () => {
  const testData = {
    name: 'Test User',
    email: 'test@example.com',
    subject: 'Test Submission',
    message: 'This is a test message to verify all form submission methods work correctly.'
  };

  console.log('🧪 Testing all submission methods...');
  
  try {
    const result = await submitContactForm(testData);
    console.log('✅ Test successful:', result);
    return result;
  } catch (error) {
    console.error('❌ Test failed:', error);
    throw error;
  }
};
