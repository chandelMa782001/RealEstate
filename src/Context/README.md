# Context API Usage Guide

## AppContext

The AppContext provides global state management for the application.

### Available State and Functions

#### User Authentication
- `user` - Current user object
- `isAuthenticated` - Boolean indicating if user is logged in
- `login(userData)` - Login function
- `logout()` - Logout function
- `signup(userData)` - Signup function

#### Modal Management
- `isLoginModalOpen` - Boolean for login modal state
- `setIsLoginModalOpen(boolean)` - Toggle login modal
- `isSignupModalOpen` - Boolean for signup modal state
- `setIsSignupModalOpen(boolean)` - Toggle signup modal

#### Favorites
- `favorites` - Array of favorite property IDs
- `addToFavorites(propertyId)` - Add property to favorites
- `removeFromFavorites(propertyId)` - Remove property from favorites

#### Recently Viewed
- `recentlyViewed` - Array of recently viewed property IDs
- `addToRecentlyViewed(propertyId)` - Add property to recently viewed

### Usage Example

```javascript
import { useAppContext } from '../context/AppContext';

const MyComponent = () => {
  const { 
    user, 
    isAuthenticated, 
    login, 
    logout,
    isLoginModalOpen,
    setIsLoginModalOpen,
    favorites,
    addToFavorites
  } = useAppContext();

  const handleLogin = () => {
    const userData = { name: 'John Doe', email: 'john@example.com' };
    login(userData);
  };

  const handleAddFavorite = (propertyId) => {
    addToFavorites(propertyId);
  };

  return (
    <div>
      {isAuthenticated ? (
        <p>Welcome, {user.name}!</p>
      ) : (
        <button onClick={() => setIsLoginModalOpen(true)}>Login</button>
      )}
    </div>
  );
};
```

### Data Persistence

The context automatically saves and loads data from localStorage:
- User data
- Favorites
- Recently viewed properties

This ensures data persists across page refreshes.
