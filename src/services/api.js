import axios from 'axios';

// Create axios instance
const API = axios.create({
  baseURL: 'http://localhost:7777/api',  // Make sure your backend is running on 7777 port
});

// Automatically add token to request headers
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// User Login
export const loginUser = async (email, password) => {
  try {
    const { data } = await API.post('/auth/login', { email, password });
    localStorage.setItem('token', data.token);
    return true;
  } catch (error) {
    alert('Login Failed');
    return false;
  }
};

// User Signup
export const signupUser = async (formData) => {
  try {
    const { data } = await API.post('/auth/signup', formData);
    localStorage.setItem('token', data.token);
    return true;
  } catch (error) {
    alert('Signup Failed');
    return false;
  }
};

// Get All Projects
export const getProjects = async () => {
  const { data } = await API.get('/projects');
  return data;
};

// Create a New Project
export const createProject = async (name) => {
  await API.post('/projects', { name });
};

// Get Tasks for a Project
export const getTasks = async (projectId) => {
  const { data } = await API.get(`/tasks/${projectId}`);
  return data;
};

// Create a Task inside a Project
export const createTask = async (task, projectId) => {
  await API.post('/tasks', { ...task, projectId });
};

// Update a Task (new)
export const updateTask = async (taskId, updatedTask) => {
  await API.put(`/tasks/${taskId}`, updatedTask);
};

// Delete a Task (new)
export const deleteTask = async (taskId) => {
  await API.delete(`/tasks/${taskId}`);
};
