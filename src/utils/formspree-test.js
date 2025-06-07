// Test utility for Formspree form submission
export const testFormspreeSubmission = async (testData = null) => {
  const defaultData = {
    name: 'Test User',
    email: 'test@example.com',
    subject: 'Test Subject',
    message: 'This is a test message to verify form submission works correctly.'
  };

  const data = testData || defaultData;

  console.log('🧪 Testing Formspree submission with data:', data);

  try {
    // Method 1: Using FormData (recommended for Formspree)
    console.log('📤 Attempting FormData submission...');
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('subject', data.subject);
    formData.append('message', data.message);
    formData.append('_subject', 'Test Contact Form Submission from Portfolio');
    formData.append('_captcha', 'false');

    const response = await fetch('https://formspree.io/f/mkgboqdl', {
      method: 'POST',
      body: formData,
    });

    console.log('📊 Response status:', response.status);
    console.log('📊 Response headers:', Object.fromEntries(response.headers.entries()));

    if (response.ok) {
      const responseText = await response.text();
      console.log('✅ FormData submission successful!');
      console.log('📄 Response:', responseText);
      return { success: true, method: 'FormData', response: responseText };
    } else {
      const errorText = await response.text();
      console.error('❌ FormData submission failed');
      console.error('📄 Error response:', errorText);
      
      // Try Method 2: JSON submission
      console.log('📤 Attempting JSON submission...');
      const jsonResponse = await fetch('https://formspree.io/f/mkgboqdl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
          _subject: 'Test Contact Form Submission from Portfolio',
          _captcha: false
        })
      });

      console.log('📊 JSON Response status:', jsonResponse.status);
      
      if (jsonResponse.ok) {
        const jsonResponseText = await jsonResponse.text();
        console.log('✅ JSON submission successful!');
        console.log('📄 Response:', jsonResponseText);
        return { success: true, method: 'JSON', response: jsonResponseText };
      } else {
        const jsonErrorText = await jsonResponse.text();
        console.error('❌ JSON submission also failed');
        console.error('📄 JSON Error response:', jsonErrorText);
        return { success: false, formDataError: errorText, jsonError: jsonErrorText };
      }
    }
  } catch (error) {
    console.error('❌ Network error during form submission:', error);
    return { success: false, networkError: error.message };
  }
};

// Debug function to check form field values
export const debugFormData = (formData) => {
  console.log('🔍 Debugging form data:');
  console.log('- Name:', formData.name, typeof formData.name);
  console.log('- Email:', formData.email, typeof formData.email);
  console.log('- Subject:', formData.subject, typeof formData.subject);
  console.log('- Message:', formData.message, typeof formData.message);
  
  // Check for empty fields
  const emptyFields = [];
  if (!formData.name.trim()) emptyFields.push('name');
  if (!formData.email.trim()) emptyFields.push('email');
  if (!formData.subject.trim()) emptyFields.push('subject');
  if (!formData.message.trim()) emptyFields.push('message');
  
  if (emptyFields.length > 0) {
    console.warn('⚠️ Empty fields detected:', emptyFields);
  } else {
    console.log('✅ All required fields have values');
  }
  
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    console.warn('⚠️ Invalid email format:', formData.email);
  } else {
    console.log('✅ Email format is valid');
  }
};

// Make functions available globally for testing
if (typeof window !== 'undefined') {
  window.testFormspreeSubmission = testFormspreeSubmission;
  window.debugFormData = debugFormData;
}