# API Integration Setup

## Backend Configuration
- **Backend URL**: `http://maigrate-project-be.onrender.com`
- **Register Endpoint**: `/api/auth/register`
- **Environment Variable**: `VITE_API_BASE_URL` (configured in `.env`)

## Files Updated/Created

### 1. API Configuration
- **`src/apiServcies/axios.js`**: Updated to use correct environment variable and added interceptors
- **`src/apiServcies/authApi.js`**: Created complete auth API service with all endpoints
- **`utils/apiUtils.js`**: Created utility functions for API handling

### 2. Constants
- **`Constant/Constants.jsx`**: Added API configuration constants

### 3. Components Updated
- **`src/component/SignupModal.jsx`**: Integrated with register API
- **`src/component/LoginModal.jsx`**: Integrated with login API
- **`src/Context/AppContext.jsx`**: Updated to handle token-based authentication

## API Endpoints Available

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile
- `PUT /api/auth/change-password` - Change password
- `POST /api/auth/forgot-password` - Forgot password
- `POST /api/auth/reset-password` - Reset password

## Usage Examples

### Register User
```javascript
import { authAPI } from '../apiServcies/authApi';

const registerUser = async (userData) => {
  try {
    const response = await authAPI.register({
      name: 'John Doe',
      email: 'john@example.com',
      mobile: '9876543210',
      password: 'SecurePass123'
    });
    console.log('Registration successful:', response);
  } catch (error) {
    console.error('Registration failed:', error);
  }
};
```

### Login User
```javascript
const loginUser = async (credentials) => {
  try {
    const response = await authAPI.login({
      email: 'john@example.com',
      password: 'SecurePass123'
    });
    console.log('Login successful:', response);
  } catch (error) {
    console.error('Login failed:', error);
  }
};
```

## Features Implemented

1. **Automatic Token Management**: Tokens are automatically stored and included in requests
2. **Error Handling**: Comprehensive error handling with user-friendly messages
3. **Authentication State**: Context-based authentication state management
4. **Form Integration**: Login and signup forms integrated with real API
5. **Auto Logout**: Automatic logout on token expiration (401 errors)

## Testing

Use the `ApiTest` component to test API endpoints:
```javascript
import ApiTest from './src/components/ApiTest';
// Add <ApiTest /> to your app for testing
```

## Next Steps

1. Test the registration and login functionality
2. Add more API endpoints as needed (properties, builders, etc.)
3. Implement proper error boundaries
4. Add loading states throughout the app
5. Consider adding refresh token functionality