function BoardColumn({
  column,
  tasks,
  onAddTask,
  onUpdateTask,
  onDeleteTask,
  onDropTask,
}) {
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const taskId = e.dataTransfer.getData("text/plain");
    if (taskId) {
      onDropTask(taskId, column.id);
    }
  };

  const handleSaveNewTask = () => {
    if (newTitle.trim()) {
      onAddTask(newTitle, newDesc, column.id);
      setNewTitle("");
      setNewDesc("");
      setIsAdding(false);
    }
  };

  return (
    <div
      className={`board-column ${isDragOver ? "drag-over" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="column-header group-hover-trigger">
        <h2 className="title">
          <div className={`dot ${column.dotColor}`}></div>
          {column.title}
          <span className="badge">{tasks.length}</span>
        </h2>
        <button className="btn btn-more focus-opacity">
          <IconMoreHorizontal size={18} />
        </button>
      </div>

      <div
        className={`column-content ${isDragOver ? "content-drag-over" : ""}`}
      >
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            columnColor={column.borderColor}
            onUpdate={onUpdateTask}
            onDelete={onDeleteTask}
          />
        ))}

        {isAdding ? (
          <div className="add-task-form">
            <input
              autoFocus
              type="text"
              placeholder="O que precisa ser feito?"
              className="input-text title-input"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSaveNewTask()}
            />
            <textarea
              placeholder="Adicione uma descrição mais detalhada..."
              className="input-text desc-input"
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
            />
            <div className="form-actions border-top">
              <button onClick={handleSaveNewTask} className="btn-primary">
                Salvar
              </button>
              <button
                onClick={() => setIsAdding(false)}
                className="btn-secondary"
              >
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsAdding(true)}
            className="btn-add-task hover-trigger"
          >
            <IconPlus size={18} className="icon-subtle" />
            Adicionar tarefa
          </button>
        )}
      </div>
    </div>
  );
}
