# Forgot Password API Troubleshooting Guide

## Issue: Server Timeout Error

The error "Server is taking too long to respond" typically occurs with free hosting services like Render.com when the server goes to sleep due to inactivity.

## Root Cause Analysis

### 1. **Free Hosting Service Behavior**
- **Render.com** (and similar free hosting services) put applications to sleep after 15 minutes of inactivity
- When a request comes to a sleeping server, it takes 30-60 seconds to "wake up"
- The first request often times out, but subsequent requests work normally

### 2. **Current Configuration**
- Base URL: `https://maigreat-project-be.onrender.com`
- Default timeout: 60 seconds (increased from 30 seconds)
- Retry mechanism: 2 attempts with 2-second delay

## Solutions Implemented

### 1. **Increased Timeout**
```javascript
// axios.js - Increased global timeout
timeout: 60000, // 60 seconds

// authApi.js - Specific endpoint timeout
timeout: 90000 // 90 seconds for forgot password endpoints
```

### 2. **Retry Mechanism**
```javascript
// Automatic retry for timeout errors
if (error.code === 'ECONNABORTED' && retryCount < maxRetries) {
  await new Promise(resolve => setTimeout(resolve, 2000));
  return dealerAPI.forgotPassword(email, retryCount + 1);
}
```

### 3. **Better Error Messages**
- Explains that server might be starting up
- Provides realistic time expectations
- Suggests waiting and trying again

### 4. **User Feedback**
- Shows "Sending OTP... This may take up to 60 seconds" message
- Loading indicators during API calls
- Progress feedback for each step

## Testing the APIs

### Manual Testing Steps:

1. **Test Server Status**
   - Use the `ServerStatusChecker` component
   - Check if server responds to basic requests

2. **Test Forgot Password Flow**
   - Use the `ForgotPasswordTest` component
   - Test with email: `manishchandel9720987840@gmail.com`
   - Expected OTP format: 6 digits (e.g., `123456`)

3. **Production Testing**
   - First request might timeout (server waking up)
   - Wait 2-3 minutes and try again
   - Subsequent requests should work normally

## API Endpoints

### 1. Forgot Password
```
POST https://maigreat-project-be.onrender.com/api/dealer/forgot-password
Content-Type: application/json

{
  "email": "manishchandel9720987840@gmail.com"
}
```

### 2. Verify OTP
```
POST https://maigreat-project-be.onrender.com/api/dealer/verify-otp
Content-Type: application/json

{
  "email": "manishchandel9720987840@gmail.com",
  "otp": "123456"
}
```

## Recommendations

### For Development:
1. **Keep Server Warm**: Make periodic requests to keep server active
2. **Use Paid Hosting**: Consider upgrading to paid hosting for production
3. **Implement Health Check**: Add a `/api/health` endpoint for monitoring

### For Users:
1. **First-Time Usage**: Expect 30-60 second delay on first request
2. **Retry Strategy**: If timeout occurs, wait 2-3 minutes and try again
3. **Peak Hours**: Server responds faster during active usage periods

### For Production:
1. **Server Monitoring**: Implement uptime monitoring
2. **Caching Strategy**: Use Redis or similar for session management
3. **Load Balancing**: Consider multiple server instances

## Current Status

✅ **Implemented Features:**
- Forgot password API integration
- OTP verification flow
- Retry mechanism for timeouts
- Better error handling and user feedback
- Increased timeout values

⚠️ **Known Limitations:**
- First request may timeout on free hosting
- Server wake-up time: 30-60 seconds
- No server-side session persistence verification

🔄 **Next Steps:**
1. Test with actual server responses
2. Verify OTP email delivery
3. Implement password reset completion
4. Add server health monitoring

## Error Codes Reference

| Error Code | Meaning | Solution |
|------------|---------|----------|
| `ECONNABORTED` | Request timeout | Wait and retry |
| `ERR_NETWORK` | Network connectivity | Check internet connection |
| `404` | Endpoint not found | Verify API URL |
| `400` | Invalid request data | Check email format/OTP |
| `500` | Server error | Server-side issue, try later |

## Contact Information

If the issue persists after following this guide:
1. Check server logs on Render.com dashboard
2. Verify API endpoints are deployed correctly
3. Test with Postman or similar tool
4. Contact backend developer for server-side debugging