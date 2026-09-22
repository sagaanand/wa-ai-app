import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Workspace } from '../types/app';

interface SignupData {
  fullName: string;
  businessName: string;
  email: string;
  phone: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  workspace: Workspace | null;
  isLoading: boolean;
  signup: (data: SignupData) => Promise<{ success: boolean; error?: string }>;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateUserProfile: (data: Partial<User>) => void;
  updateWorkspace: (data: Partial<Workspace>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hash password with salt using Web Crypto SHA-256
async function hashPassword(password: string, salt: string): Promise<string> {
  const enc = new TextEncoder();
  const data = enc.encode(password + salt + 'nn_secure_salt_2026');
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

interface StoredUserRecord {
  user: User;
  workspace: Workspace;
  passwordHash: string;
  salt: string;
}

const STORAGE_USERS_KEY = 'nn_users_db_v1';
const STORAGE_SESSION_KEY = 'nn_active_session_v1';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize and check existing session
  useEffect(() => {
    try {
      // 1. Ensure pre-seeded demo user exists for easy testing if needed
      const rawUsers = localStorage.getItem(STORAGE_USERS_KEY);
      let users: Record<string, StoredUserRecord> = rawUsers ? JSON.parse(rawUsers) : {};

      if (!users['demo@namnilam.com']) {
        const demoUserId = 'usr_demo_01';
        const demoWorkspaceId = 'ws_demo_01';
        const salt = 'salt_demo_9876';

        // Precompute hash for Password123!
        hashPassword('Password123!', salt).then((hash) => {
          users['demo@namnilam.com'] = {
            user: {
              id: demoUserId,
              email: 'demo@namnilam.com',
              fullName: 'Anand Kumar',
              businessName: 'Nam Nilam Realty',
              phone: '+91 97876 00221',
              workspaceId: demoWorkspaceId,
              createdAt: new Date().toISOString(),
            },
            workspace: {
              id: demoWorkspaceId,
              name: 'Nam Nilam Realty',
              ownerId: demoUserId,
              currency: 'INR',
              location: 'Tamil Nadu, India',
              description: 'AI-Powered Property Enquiries & Customer Support',
              createdAt: new Date().toISOString(),
            },
            passwordHash: hash,
            salt,
          };
          localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
        });
      }

      // 2. Check active session
      const savedSession = localStorage.getItem(STORAGE_SESSION_KEY);
      if (savedSession) {
        const sessionData = JSON.parse(savedSession);
        if (sessionData.user && sessionData.workspace) {
          setUser(sessionData.user);
          setWorkspace(sessionData.workspace);
        }
      }
    } catch (e) {
      console.error('Failed to restore auth session:', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signup = async (data: SignupData): Promise<{ success: boolean; error?: string }> => {
    try {
      const emailClean = data.email.trim().toLowerCase();
      const rawUsers = localStorage.getItem(STORAGE_USERS_KEY);
      const users: Record<string, StoredUserRecord> = rawUsers ? JSON.parse(rawUsers) : {};

      if (users[emailClean]) {
        return { success: false, error: 'An account with this email already exists.' };
      }

      const userId = `usr_${Date.now()}`;
      const workspaceId = `ws_${Date.now()}`;
      const salt = `salt_${Math.random().toString(36).substring(2, 10)}`;
      const passwordHash = await hashPassword(data.password, salt);

      const newUser: User = {
        id: userId,
        email: emailClean,
        fullName: data.fullName.trim(),
        businessName: data.businessName.trim(),
        phone: data.phone.trim(),
        workspaceId,
        createdAt: new Date().toISOString(),
      };

      const newWorkspace: Workspace = {
        id: workspaceId,
        name: data.businessName.trim() || 'My Business Workspace',
        ownerId: userId,
        currency: 'INR',
        location: 'India',
        description: `${data.businessName.trim()} WhatsApp AI Assistant`,
        createdAt: new Date().toISOString(),
      };

      users[emailClean] = {
        user: newUser,
        workspace: newWorkspace,
        passwordHash,
        salt,
      };

      localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
      localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify({ user: newUser, workspace: newWorkspace }));

      setUser(newUser);
      setWorkspace(newWorkspace);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Signup failed' };
    }
  };

  const login = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const emailClean = email.trim().toLowerCase();
      const rawUsers = localStorage.getItem(STORAGE_USERS_KEY);
      const users: Record<string, StoredUserRecord> = rawUsers ? JSON.parse(rawUsers) : {};

      const record = users[emailClean];
      if (!record) {
        return { success: false, error: 'No account found with this email address.' };
      }

      const inputHash = await hashPassword(pass, record.salt);
      if (inputHash !== record.passwordHash) {
        return { success: false, error: 'Invalid password. Please check your credentials.' };
      }

      localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify({ user: record.user, workspace: record.workspace }));
      setUser(record.user);
      setWorkspace(record.workspace);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Login failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_SESSION_KEY);
    setUser(null);
    setWorkspace(null);
  };

  const updateUserProfile = (data: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);

    // Update in storage
    const rawUsers = localStorage.getItem(STORAGE_USERS_KEY);
    if (rawUsers) {
      const users = JSON.parse(rawUsers);
      if (users[user.email]) {
        users[user.email].user = updated;
        localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
      }
    }
    localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify({ user: updated, workspace }));
  };

  const updateWorkspace = (data: Partial<Workspace>) => {
    if (!workspace || !user) return;
    const updated = { ...workspace, ...data };
    setWorkspace(updated);

    // Update in storage
    const rawUsers = localStorage.getItem(STORAGE_USERS_KEY);
    if (rawUsers) {
      const users = JSON.parse(rawUsers);
      if (users[user.email]) {
        users[user.email].workspace = updated;
        localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
      }
    }
    localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify({ user, workspace: updated }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        workspace,
        isLoading,
        signup,
        login,
        logout,
        updateUserProfile,
        updateWorkspace,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
