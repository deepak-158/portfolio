// Alternative form submission methods for Contact form
export const submitFormAlternative = async (formData) => {
  console.log('🔄 Attempting alternative form submission...');
  console.log('📝 Fallback form data received:', formData);
  
  // Method 1: Try with JSON data (preferred by most modern APIs)
  try {
    console.log('📤 Method 1: JSON submission...');
    
    const jsonData = {
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      _subject: `Portfolio Contact: ${formData.subject}`,
      _captcha: false
    };
    
    console.log('📋 JSON data:', jsonData);
    
    const response = await fetch('https://formspree.io/f/mkgboqdl', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify(jsonData)
    });

    if (response.ok) {
      console.log('✅ Alternative JSON method successful');
      const result = await response.json();
      return result;
    } else {
      console.warn(`⚠️ JSON method failed with status: ${response.status}`);
      const errorText = await response.text();
      console.warn('Response:', errorText);
    }
  } catch (error) {
    console.warn('⚠️ Alternative JSON method failed:', error);
  }
  // Method 2: Try with FormData and minimal headers
  try {
    console.log('📤 Method 2: FormData with minimal headers...');
    const formDataObj = new FormData();
    formDataObj.append('name', formData.name);
    formDataObj.append('email', formData.email);
    formDataObj.append('subject', formData.subject);
    formDataObj.append('message', formData.message);
    formDataObj.append('_subject', `Portfolio Contact: ${formData.subject}`);
    formDataObj.append('_captcha', 'false');

    // Log FormData contents
    console.log('📋 FormData contents (Method 2):');
    for (let [key, value] of formDataObj.entries()) {
      console.log(`  ${key}: ${value}`);
    }

    const response = await fetch('https://formspree.io/f/mkgboqdl', {
      method: 'POST',
      mode: 'cors',
      body: formDataObj
    });

    if (response.ok) {
      console.log('✅ Alternative method 2 successful');
      const result = await response.text();
      return result;
    } else {
      console.warn(`⚠️ Method 2 failed with status: ${response.status}`);
    }
  } catch (error) {
    console.warn('⚠️ Alternative method 2 failed:', error);
  }

  // Method 3: Try with JSON payload
  try {
    console.log('📤 Method 3: JSON payload...');
    const response = await fetch('https://formspree.io/f/mkgboqdl', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        _subject: `Portfolio Contact: ${formData.subject}`,
        _captcha: false
      })
    });

    if (response.ok) {
      console.log('✅ Alternative method 3 successful');
      const result = await response.json();
      return result;
    } else {
      console.warn(`⚠️ Method 3 failed with status: ${response.status}`);
    }
  } catch (error) {
    console.warn('⚠️ Alternative method 3 failed:', error);
  }

  // Method 4: Try with no-cors mode (fire and forget)
  try {
    console.log('📤 Method 4: No-CORS mode...');
    const formDataObj = new FormData();
    formDataObj.append('name', formData.name);
    formDataObj.append('email', formData.email);
    formDataObj.append('subject', formData.subject);
    formDataObj.append('message', formData.message);
    formDataObj.append('_subject', `Portfolio Contact: ${formData.subject}`);
    formDataObj.append('_captcha', 'false');

    await fetch('https://formspree.io/f/mkgboqdl', {
      method: 'POST',
      mode: 'no-cors',
      body: formDataObj
    });

    console.log('✅ No-CORS submission completed (response not accessible)');
    return 'Submitted via no-cors mode';
  } catch (error) {
    console.warn('⚠️ Alternative method 4 failed:', error);
  }
  // Method 5: Traditional form submission as last resort
  try {
    console.log('📤 Method 5: Traditional form submission...');
    const form = document.createElement('form');
    form.action = 'https://formspree.io/f/mkgboqdl';
    form.method = 'POST';
    form.target = '_blank'; // Open in new tab to prevent page redirect
    form.style.display = 'none';

    const fields = {
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      _subject: `Portfolio Contact: ${formData.subject}`,
      _captcha: 'false'
    };

    Object.keys(fields).forEach(key => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = fields[key];
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
    
    // Clean up
    setTimeout(() => {
      if (document.body.contains(form)) {
        document.body.removeChild(form);
      }
    }, 1000);

    console.log('✅ Traditional form submission initiated');
    return 'Form submitted via traditional method';

  } catch (error) {
    console.error('❌ Traditional form submission failed:', error);
  }

  // If all methods fail
  console.error('❌ All alternative methods failed');
  throw new Error('All submission methods failed');
};

// Test network connectivity
export const testNetworkConnection = async () => {
  try {
    const response = await fetch('https://httpbin.org/get', {
      method: 'GET',
      mode: 'cors'
    });
    return response.ok;  } catch (error) {
    console.warn('Network test failed:', error);
    return false;
  }
};
