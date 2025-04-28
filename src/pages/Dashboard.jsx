import { useState, useEffect } from 'react';
import { createProject, getProjects, createTask, getTasks, updateTask, deleteTask } from '../services/api';

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newProject, setNewProject] = useState('');
  const [newTask, setNewTask] = useState({ title: '', description: '' });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const res = await getProjects();
    setProjects(res);
  };

  const fetchTasks = async (projectId) => {
    const res = await getTasks(projectId);
    setTasks(res);
  };

  const handleProjectCreate = async (e) => {
    e.preventDefault();
    await createProject(newProject);
    setNewProject('');
    fetchProjects();
  };

  const handleProjectSelect = async (project) => {
    setSelectedProject(project);
    fetchTasks(project._id);
  };

  const handleTaskCreate = async (e) => {
    e.preventDefault();
    await createTask(newTask, selectedProject._id);
    setNewTask({ title: '', description: '' });
    fetchTasks(selectedProject._id);
  };

  const handleStatusChange = async (taskId, currentStatus) => {
    let newStatus;
    if (currentStatus === "Pending") newStatus = "In Progress";
    else if (currentStatus === "In Progress") newStatus = "Completed";
    else newStatus = "Completed"; // Completed stays completed

    await updateTask(taskId, { status: newStatus });
    fetchTasks(selectedProject._id);
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      await deleteTask(taskId);
      fetchTasks(selectedProject._id);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4 text-purple-700">Dashboard</h2>

      {/* Create Project */}
      <form onSubmit={handleProjectCreate} className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="New Project Name"
          value={newProject}
          onChange={(e) => setNewProject(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />
        <button type="submit" className="bg-purple-600 text-white px-4 rounded hover:bg-purple-700">
          Create
        </button>
      </form>

      {/* Project List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {projects.map((project) => (
          <div
            key={project._id}
            className="border p-4 rounded shadow hover:bg-purple-50 cursor-pointer"
            onClick={() => handleProjectSelect(project)}
          >
            <h3 className="text-xl font-semibold text-purple-600">{project.name}</h3>
          </div>
        ))}
      </div>

      {/* Selected Project's Tasks */}
      {selectedProject && (
        <div className="mt-8">
          <h3 className="text-2xl font-bold text-purple-700 mb-4">{selectedProject.name} - Tasks</h3>

          {/* Create Task */}
          <form onSubmit={handleTaskCreate} className="flex gap-2 mb-6">
            <input
              type="text"
              placeholder="Task Title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              className="border p-2 rounded w-1/2"
              required
            />
            <input
              type="text"
              placeholder="Task Description"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              className="border p-2 rounded w-1/2"
              required
            />
            <button type="submit" className="bg-purple-600 text-white px-4 rounded hover:bg-purple-700">
              Add
            </button>
          </form>

          {/* List Tasks */}
          <div className="grid gap-3">
            {tasks.map((task) => (
              <div key={task._id} className="border p-4 rounded shadow flex justify-between items-center bg-gray-50">
                <div>
                  <h4 className="font-semibold text-lg">{task.title}</h4>
                  <p className="text-sm text-gray-700">{task.description}</p>
                  <p className="text-xs text-gray-500 mt-1">Status: {task.status}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleStatusChange(task._id, task.status)}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 text-xs"
                  >
                    Next Status
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-xs"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
