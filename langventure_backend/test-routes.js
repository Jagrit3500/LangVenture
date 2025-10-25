const BASE_URL = 'http://localhost:5000';

console.log('🧪 Testing LangVenture API Routes\n');

async function testRoute(method, endpoint, body = null, token = null) {
  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    const data = await response.json();
    
    const status = response.ok ? '✅' : '❌';
    console.log(`${status} ${method} ${endpoint} - Status: ${response.status}`);
    
    return { success: response.ok, data, status: response.status };
  } catch (error) {
    console.log(`❌ ${method} ${endpoint} - Error: ${error.message}`);
    return { success: false, error: error.message };
  }
}

async function runTests() {
  let authToken = null;
  
  console.log('1️⃣  Health Check');
  await testRoute('GET', '/api/health');
  
  console.log('\n2️⃣  Root Endpoint');
  await testRoute('GET', '/');
  
  console.log('\n3️⃣  User Registration');
  const registerResult = await testRoute('POST', '/api/auth/register', {
    username: 'testuser',
    email: 'test@example.com',
    password: 'password123'
  });
  if (registerResult.success) {
    authToken = registerResult.data.token;
    console.log('   Token received:', authToken ? '✅' : '❌');
  }
  
  console.log('\n4️⃣  User Login');
  const loginResult = await testRoute('POST', '/api/auth/login', {
    email: 'test@example.com',
    password: 'password123'
  });
  if (loginResult.success) {
    authToken = loginResult.data.token;
  }
  
  console.log('\n5️⃣  Get All Paths');
  await testRoute('GET', '/api/paths');
  
  console.log('\n6️⃣  Get Single Path (food-travel)');
  await testRoute('GET', '/api/paths/food-travel');
  
  if (authToken) {
    console.log('\n7️⃣  Get User Profile (Protected)');
    await testRoute('GET', '/api/user/me', null, authToken);
    
    console.log('\n8️⃣  Create Challenge (Protected)');
    await testRoute('POST', '/api/user/challenge', {
      challengeText: 'Translate: Hello, how are you?',
      userResponse: 'Hola, ¿cómo estás?'
    }, authToken);
    
    console.log('\n9️⃣  Get User Challenges (Protected)');
    await testRoute('GET', '/api/user/challenges', null, authToken);
  }
  
  console.log('\n🔟 Translation API');
  await testRoute('POST', '/api/translate', {
    q: 'Hello world',
    source: 'en',
    target: 'es'
  });
  
  console.log('\n✅ All tests completed!');
}

runTests().catch(console.error);
