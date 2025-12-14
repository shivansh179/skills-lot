const API_BASE_URL = 'https://7123aaa2ebd7.ngrok-free.app/api';

export interface SignupData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: 'CLIENT' | 'TALENT';
}

export interface LoginData {
  email: string;
  password: string;
}

export interface UserData {
  id?: string;
  email?: string;
  fullName?: string;
  role?: string;
}

export interface AuthResponseData {
  token?: string;
  user?: UserData;
  role?: string;
  [key: string]: unknown; // Allow additional properties from API
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  data?: AuthResponseData;
  error?: string;
}

export async function signup(data: SignupData): Promise<AuthResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.message || result.error || 'Signup failed. Please try again.',
      };
    }

    return {
      success: true,
      data: result,
      message: 'Account created successfully!',
    };
  } catch (error) {
    console.error('Signup error:', error);
    return {
      success: false,
      error: 'Network error. Please check your connection and try again.',
    };
  }
}

export async function login(data: LoginData): Promise<AuthResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.message || result.error || 'Login failed. Please check your credentials.',
      };
    }

    // Store token in localStorage if returned
    if (result.token) {
      localStorage.setItem('authToken', result.token);
    }
    if (result.data?.token) {
      localStorage.setItem('authToken', result.data.token);
    }

    return {
      success: true,
      data: result,
      message: 'Login successful!',
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      error: 'Network error. Please check your connection and try again.',
    };
  }
}

export function getAuthToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('authToken');
  }
  return null;
}

export function logout(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('authToken');
  }
}

// Helper to extract user role from API response
export function getUserRole(data?: AuthResponseData): string | undefined {
  if (!data) return undefined;
  return data.user?.role || data.role || (data as Record<string, unknown>).userRole as string;
}

// Talent interfaces
export interface TalentProfile {
  id: string;
  fullName: string;
  email?: string;
  title?: string;
  bio?: string;
  hourlyRate?: number;
  skills?: string[];
  rating?: number;
  reviewCount?: number;
  jobsCompleted?: number;
  isOnline?: boolean;
  isVerified?: boolean;
  avatar?: string;
  location?: string;
  experience?: string;
}

export interface TalentSearchResponse {
  success: boolean;
  data?: TalentProfile[];
  message?: string;
  error?: string;
  totalCount?: number;
}

// Search talents by skills
export async function searchTalents(skills: string): Promise<TalentSearchResponse> {
  try {
    const token = getAuthToken();
    const response = await fetch(
      `${API_BASE_URL}/talents/search?skills=${encodeURIComponent(skills)}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.message || result.error || 'Failed to search talents.',
      };
    }

    // Handle different response formats
    const talents = Array.isArray(result) ? result : result.data || result.talents || [];

    return {
      success: true,
      data: talents,
      totalCount: talents.length,
    };
  } catch (error) {
    console.error('Search talents error:', error);
    return {
      success: false,
      error: 'Network error. Please check your connection.',
    };
  }
}

// Get top rated talents
export async function getTopRatedTalents(): Promise<TalentSearchResponse> {
  try {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/talents/top-rated`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.message || result.error || 'Failed to fetch top rated talents.',
      };
    }

    // Handle different response formats
    const talents = Array.isArray(result) ? result : result.data || result.talents || [];

    return {
      success: true,
      data: talents,
    };
  } catch (error) {
    console.error('Top rated talents error:', error);
    return {
      success: false,
      error: 'Network error. Please check your connection.',
    };
  }
}

// Availability interfaces
export interface AvailabilityData {
  date: string;
  dayOfWeek: string;
  availableHours: string[];
  hasSlots: boolean;
}

export interface AvailabilityResponse {
  success: boolean;
  message?: string;
  data?: AvailabilityData;
  error?: string;
}

// Get availability for a talent on a specific date
export async function getTalentAvailability(
  talentId: string | number,
  startDate: string // Format: YYYY-MM-DD
): Promise<AvailabilityResponse> {
  try {
    const token = getAuthToken();
    const response = await fetch(
      `${API_BASE_URL}/availability?talentId=${talentId}&startDate=${startDate}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.message || result.error || 'Failed to fetch availability.',
      };
    }

    return {
      success: result.success !== false,
      message: result.message,
      data: result.data,
    };
  } catch (error) {
    console.error('Availability error:', error);
    return {
      success: false,
      error: 'Network error. Please check your connection.',
    };
  }
}
