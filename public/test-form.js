// Simple test script to test form submission
console.log('🧪 Starting form submission test...');

async function testFormspreeDirectly() {
  const testData = {
    name: 'Test User',
    email: 'test@example.com',
    subject: 'Test Subject',
    message: 'This is a test message from the test script'
  };

  console.log('📤 Testing Formspree submission...');

  try {
    // Test with FormData (recommended)
    const formData = new FormData();
    formData.append('name', testData.name);
    formData.append('email', testData.email);
    formData.append('subject', testData.subject);
    formData.append('message', testData.message);
    formData.append('_subject', 'Test Contact Form Submission');
    formData.append('_captcha', 'false');

    const response = await fetch('https://formspree.io/f/mkgboqdl', {
      method: 'POST',
      body: formData,
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    if (response.ok) {
      const responseText = await response.text();
      console.log('✅ Success! Response:', responseText);
      return true;
    } else {
      const errorText = await response.text();
      console.error('❌ Failed! Error:', errorText);
      return false;
    }
  } catch (error) {
    console.error('❌ Network error:', error);
    return false;
  }
}

// Run the test
testFormspreeDirectly().then(success => {
  if (success) {
    console.log('🎉 Form submission test PASSED!');
  } else {
    console.log('💥 Form submission test FAILED!');
  }
});

// Make it available globally for manual testing
window.testFormspreeDirectly = testFormspreeDirectly;
