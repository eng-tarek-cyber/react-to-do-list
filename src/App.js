import { useState, useEffect } from "react";
import "./App.css";
import "./todo-theme.css";
import ToDoList from "./ToDoList";
import ToDoContext from "./ToDoContext";

const THEME_KEY = "theme";
const TASKS_KEY = "tasks";

function loadTasksFromStorage() {
  try {
    const stored = localStorage.getItem(TASKS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function loadThemeFromStorage() {
  const stored = localStorage.getItem(THEME_KEY);
  const theme = stored === "dark" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", theme);
  return theme;
}

function App() {
  const [tasks, setTasks] = useState(loadTasksFromStorage);
  const [theme, setTheme] = useState(loadThemeFromStorage);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ToDoContext.Provider value={{ tasks, setTasks, theme, toggleTheme }}>
      <ToDoList />
    </ToDoContext.Provider>
  );
}

export default App;
