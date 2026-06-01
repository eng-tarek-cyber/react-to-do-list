import "./ToDo.css";

function TaskCard({ item, onDelete, onEdit, onToggleComplete }) {
  return (
    <div
      className={`task-card ${item.isCompleted ? "task-card--completed" : ""}`}
    >
      <div className="task-card__body">
        <h3
          className={`task-card__title ${
            item.isCompleted ? "task-card__title--completed" : ""
          }`}
        >
          {item.title}
        </h3>
        <p
          className={`task-card__details ${
            item.isCompleted ? "task-card__details--completed" : ""
          }`}
        >
          {item.details || "اضغط تعديل لإضافة تفاصيل للمهمة"}
        </p>
      </div>

      <div className="task-card__actions">
        <button
          type="button"
          onClick={() => onToggleComplete(item.id)}
          className={`task-btn ${
            item.isCompleted ? "task-btn--complete-done" : "task-btn--complete"
          }`}
        >
          {item.isCompleted ? "تراجع" : "✓ تم"}
        </button>

        <button
          type="button"
          onClick={() => onEdit(item)}
          className="task-btn task-btn--edit"
        >
          ✎ تعديل
        </button>

        <button
          type="button"
          onClick={() => onDelete(item)}
          className="task-btn task-btn--delete"
        >
          🗑️ حذف
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
