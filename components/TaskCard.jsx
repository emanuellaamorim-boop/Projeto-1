const { useState } = React;

function TaskCard({ task, columnColor, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDesc, setEditDesc] = useState(task.description || "");

  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", task.id);
    e.dataTransfer.effectAllowed = "move";
    setTimeout(() => {
      e.target.classList.add("task-dragging");
    }, 0);
  };

  const handleDragEnd = (e) => {
    e.target.classList.remove("task-dragging");
  };

  const handleSave = () => {
    if (editTitle.trim()) {
      onUpdate(task.id, { title: editTitle, description: editDesc });
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <div className="task-card is-editing">
        <input
          autoFocus
          type="text"
          className="input-text title-input"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
        />
        <textarea
          className="input-text desc-input"
          value={editDesc}
          onChange={(e) => setEditDesc(e.target.value)}
        />
        <div className="actions-row">
          <div className="flex-gap">
            <button
              onClick={handleSave}
              className="btn btn-save"
              title="Salvar"
            >
              <IconCheck size={16} />
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="btn btn-cancel"
              title="Cancelar"
            >
              <IconX size={16} />
            </button>
          </div>
          <button
            onClick={() => onDelete(task.id)}
            className="btn btn-delete"
            title="Apagar Tarefa"
          >
            <IconTrash2 size={16} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className="task-card"
    >
      <div className={`status-indicator ${columnColor}`}></div>

      <div className="task-header">
        <h3 className="task-title">{task.title}</h3>
        <button
          onClick={() => setIsEditing(true)}
          className="btn btn-edit-hover hover-opacity"
        >
          <IconEdit2 size={14} />
        </button>
      </div>

      {task.description && <p className="task-desc">{task.description}</p>}

      <div className="task-footer">
        <div className="flex-gap">
          {task.description && <div className="attachment-indicator"></div>}
        </div>
        <div className="drag-handle hover-opacity">
          <IconGripVertical size={14} />
        </div>
      </div>
    </div>
  );
}
