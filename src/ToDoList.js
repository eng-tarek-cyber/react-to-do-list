import { v4 as uuidv4 } from "uuid";
import ToDoContext from "./ToDoContext";
import { useState, useContext, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import * as React from "react";

import TaskCard from "./ToDo";
import "./ToDoList.css";

function ToDoList() {
  const { tasks, setTasks, theme, toggleTheme } = useContext(ToDoContext);
  const isDark = theme === "dark";
  const [addition, setAddition] = useState("");
  const [open, setOpen] = React.useState(false);
  const [selectedTodo, setSelectedTodo] = React.useState(null);
  const [filterType, setFilterType] = useState("all");
  const [openDelete, setOpenDelete] = React.useState(false);
  const [todoToDelete, setTodoToDelete] = React.useState(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const muiTheme = React.useMemo(
    () =>
      createTheme({
        palette: { mode: isDark ? "dark" : "light" },
      }),
    [isDark]
  );

  const handleOpenDelete = (todo) => {
    setTodoToDelete(todo);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
    setTodoToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (todoToDelete) {
      setTasks((prevTasks) => prevTasks.filter((t) => t.id !== todoToDelete.id));
      handleCloseDelete();
    }
  };

  const handleClose = () => setOpen(false);

  const handleOpenEdit = (todo) => {
    setSelectedTodo(todo);
    setOpen(true);
  };

  const handleSaveEdit = () => {
    if (!selectedTodo) return;
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === selectedTodo.id ? selectedTodo : task
      )
    );
    setOpen(false);
  };

  function handleAddTask() {
    if (addition.trim() !== "") {
      const newTask = {
        id: uuidv4(),
        title: addition,
        details: "لا توجد تفاصيل إضافية بعد.",
        isCompleted: false,
      };
      setTasks((prev) => [...prev, newTask]);
      setAddition("");
    }
  }

  let tasksToBeRendered = tasks;
  if (filterType === "completed") {
    tasksToBeRendered = tasks.filter((item) => item.isCompleted);
  } else if (filterType === "non-completed") {
    tasksToBeRendered = tasks.filter((item) => !item.isCompleted);
  }

  const filterClass = (type, activeClass) =>
    `filter-btn ${filterType === type ? activeClass : ""}`;

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <div className="todo-page">
        <div dir="rtl" className="todo-container">
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={isDark ? "التبديل إلى الوضع الفاتح" : "التبديل إلى الوضع الداكن"}
            title={isDark ? "وضع فاتح" : "وضع داكن"}
          >
            {isDark ? "☀️" : "🌙"}
          </button>

          <div className="todo-header">
            <h1 className="todo-title">✨ مهامي اليومية</h1>
          </div>
          <hr className="todo-divider" />

          <div className="todo-filters">
            <button
              type="button"
              onClick={() => setFilterType("all")}
              className={filterClass("all", "filter-btn--active-all")}
            >
              الكل
            </button>
            <button
              type="button"
              onClick={() => setFilterType("completed")}
              className={filterClass("completed", "filter-btn--active-completed")}
            >
              المنجز
            </button>
            <button
              type="button"
              onClick={() => setFilterType("non-completed")}
              className={filterClass("non-completed", "filter-btn--active-pending")}
            >
              الغير منجز
            </button>
          </div>

          <div className="todo-list-section">
            {tasksToBeRendered.length === 0 ? (
              <p className="todo-empty">لا توجد مهام.</p>
            ) : (
              tasksToBeRendered.map((item) => (
                <TaskCard
                  key={item.id}
                  item={item}
                  onDelete={handleOpenDelete}
                  onToggleComplete={(id) =>
                    setTasks((prevTasks) =>
                      prevTasks.map((t) =>
                        t.id === id ? { ...t, isCompleted: !t.isCompleted } : t
                      )
                    )
                  }
                  onEdit={handleOpenEdit}
                />
              ))
            )}
          </div>

          <div className="todo-add-row">
            <input
              className="todo-input"
              value={addition}
              onChange={(e) => setAddition(e.target.value)}
              placeholder="✍️ مهمة جديدة..."
              onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
            />
            <button
              type="button"
              className="todo-add-btn"
              disabled={!addition.trim()}
              onClick={handleAddTask}
            >
              إضافة
            </button>
          </div>
        </div>

        <Dialog open={open} keepMounted onClose={handleClose}>
          <DialogTitle className="dialog-title-rtl">تعديل المهمة</DialogTitle>
          <DialogContent sx={{ width: { xs: "100%", sm: 400 } }}>
            <TextField
              fullWidth
              margin="dense"
              label="العنوان"
              variant="outlined"
              value={selectedTodo?.title || ""}
              onChange={(e) =>
                setSelectedTodo((prev) => ({ ...prev, title: e.target.value }))
              }
            />
            <TextField
              fullWidth
              margin="dense"
              label="التفاصيل"
              variant="outlined"
              multiline
              rows={3}
              value={selectedTodo?.details || ""}
              onChange={(e) =>
                setSelectedTodo((prev) => ({ ...prev, details: e.target.value }))
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>إلغاء</Button>
            <Button
              onClick={handleSaveEdit}
              variant="contained"
              className="dialog-actions-save"
            >
              حفظ
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openDelete} keepMounted onClose={handleCloseDelete}>
          <DialogTitle className="dialog-title-rtl dialog-title-danger">
            ⚠️ تنبيه
          </DialogTitle>
          <DialogContent sx={{ width: { xs: "100%", sm: 360 } }}>
            <DialogContentText className="dialog-content-rtl">
              هل أنت متأكد من حذف &quot;<strong>{todoToDelete?.title}</strong>
              &quot;؟
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDelete}>إلغاء</Button>
            <Button
              onClick={handleConfirmDelete}
              variant="contained"
              className="dialog-actions-delete"
            >
              احذف
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </ThemeProvider>
  );
}

export default ToDoList;
