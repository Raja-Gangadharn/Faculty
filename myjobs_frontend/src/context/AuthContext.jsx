import { createContext, useContext, useState, useEffect } from 'react';
import { getUserRole, logout as authLogout } from '../services/authService';

// Create the context
export const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    isFaculty: false,
    isRecruiter: false,
    isVerified: false,
    userId: null,
    email: '',
    firstName: '',
    lastName: '',
    isLoading: true,
  });

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = () => {
      const userData = getUserRole();
      setAuthState({
        ...userData,
        isLoading: false,
      });
    };

    initializeAuth();

    // Listen for storage events to sync auth state across tabs
    const handleStorageChange = () => {
      initializeAuth();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Login function
  const login = (userData) => {
    setAuthState({
      isAuthenticated: true,
      isFaculty: userData.is_faculty || false,
      isRecruiter: userData.is_recruiter || false,
      isVerified: userData.is_verified || false,
      userId: userData.id,
      email: userData.email,
      firstName: userData.first_name || '',
      lastName: userData.last_name || '',
      isLoading: false,
    });
  };

  // Logout function
  const logout = () => {
    // Set loading state first
    setAuthState(prev => ({
      ...prev,
      isLoading: true
    }));

    // Perform logout
    authLogout();

    // Update auth state
    setAuthState({
      isAuthenticated: false,
      isFaculty: false,
      isRecruiter: false,
      isVerified: false,
      userId: null,
      email: '',
      firstName: '',
      lastName: '',
      isLoading: false,
    });
  };

  // Update user data
  const updateUser = (userData) => {
    setAuthState(prev => ({
      ...prev,
      ...userData,
    }));
  };

  // Verify email
  const verifyEmail = () => {
    setAuthState(prev => ({
      ...prev,
      isVerified: true,
    }));
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        logout,
        updateUser,
        verifyEmail,
      }}
    >
      {!authState.isLoading && children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;