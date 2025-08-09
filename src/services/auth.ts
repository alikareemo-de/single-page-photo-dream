
interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  cellPhoneNumber?: string;
  dateOfBirth?: string;
  country?: string;
  city?: string;
  address?: string;
}

interface RegisterData {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  cellPhoneNumber?: string;
  dateOfBirth?: string;
  country?: string;
  city?: string;
  address?: string;
}

interface SignInData {
  username: string;
  password: string;
}

// Mock database for demo purposes
const users: User[] = [
  {
    id: "1",
    username: "johnsmith",
    firstName: "John",
    lastName: "Smith",
    email: "john@example.com",
    cellPhoneNumber: "+1 (555) 123-4567"
  },
  {
    id: "2",
    username: "janedoe",
    firstName: "Jane",
    lastName: "Doe",
    email: "jane@example.com"
  }
];

// Mock session storage
let currentUser: User | null = null;

// Simulating API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const registerUser = async (data: RegisterData): Promise<User> => {
  // Simulate API call
  await delay(800);
  
  // Check if user exists
  if (users.some(user => user.username === data.username)) {
    throw new Error("Username already exists");
  }

  if (users.some(user => user.email === data.email)) {
    throw new Error("Email already registered");
  }

  // Create new user
  const newUser: User = {
    id: (users.length + 1).toString(),
    username: data.username,
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    cellPhoneNumber: data.cellPhoneNumber,
    dateOfBirth: data.dateOfBirth,
    country: data.country,
    city: data.city,
    address: data.address
  };

  // Add to mock database
  users.push(newUser);
  
  // Set as current user
  currentUser = newUser;
  
  // Store in localStorage for persistent session
  localStorage.setItem("currentUser", JSON.stringify(newUser));
  
  return newUser;
};

export const signInUser = async (data: SignInData): Promise<User> => {
  // Simulate API call
  await delay(800);

  // Check credentials
  const user = users.find(u => u.username === data.username);
  
  if (!user) {
    throw new Error("User not found");
  }

  // In a real app, you would check password hash
  // For demo, we're just simulating a successful login
  
  // Set as current user
  currentUser = user;
  
  // Store in localStorage for persistent session
  localStorage.setItem("currentUser", JSON.stringify(user));
  
  return user;
};

export const getCurrentUser = (): User | null => {
  if (currentUser) {
    return currentUser;
  }
  
  // Check localStorage for saved session
  const savedUser = localStorage.getItem("currentUser");
  if (savedUser) {
    currentUser = JSON.parse(savedUser);
    return currentUser;
  }
  
  return null;
};

export const signOutUser = (): void => {
  currentUser = null;
  localStorage.removeItem("currentUser");
};

export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null;
};
