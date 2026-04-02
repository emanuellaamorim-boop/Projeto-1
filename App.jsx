const { useEffect } = React;

const COLUMNS = [
  {
    id: "todo",
    title: "A Fazer",
    dotColor: "bg-slate-400",
    borderColor: "border-slate-400",
  },
  {
    id: "in_progress",
    title: "Em Progresso",
    dotColor: "bg-amber-400",
    borderColor: "border-amber-400",
  },
  {
    id: "done",
    title: "Concluído",
    dotColor: "bg-emerald-500",
    borderColor: "border-emerald-500",
  },
];

const INITIAL_TASKS = [
  {
    id: "1",
    title: "Aprender React",
    description: "Estudar hooks, ciclo de vida e componentização avançada.",
    status: "todo",
  },
  {
    id: "2",
    title: "Criar Mini Trello",
    description: "Implementar drag and drop e persistência local.",
    status: "in_progress",
  },
  {
    id: "3",
    title: "Configurar ambiente",
    description: "Instalar Node.js, VSCode e extensões de produtividade.",
    status: "done",
  },
];

function App() {
  const [tasks, setTasks] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedTasks = localStorage.getItem("@miniTrello:tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    } else {
      setTasks(INITIAL_TASKS);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("@miniTrello:tasks", JSON.stringify(tasks));
    }
  }, [tasks, isLoaded]);

  const addTask = (title, description, status) => {
    const newTask = { id: crypto.randomUUID(), title, description, status };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (id, updatedData) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, ...updatedData } : task,
      ),
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const moveTask = (taskId, newStatus) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task,
      ),
    );
  };

  if (!isLoaded) return null;

  return (
    <div className="layout">
      {/* Cabeçalho */}
      <header className="header">
        <div className="header-left">
          <div className="logo-box">
            <IconLayout size={20} color="#fff" />
          </div>
          <h1 className="header-title">Quadro de Tarefas</h1>
        </div>
        <div className="header-right hidden-mobile">
          <div className="sync-badge">
            <span className="sync-dot animate-pulse"></span>
            Sincronizado Localmente
          </div>
          <div className="avatar hover-bg" title="JavaScript Native">
            JS
          </div>
        </div>
      </header>

      {/* Área do Board */}
      <main className="board-area">
        <div className="board-grid">
          {COLUMNS.map((column) => (
            <BoardColumn
              key={column.id}
              column={column}
              tasks={tasks.filter((t) => t.status === column.id)}
              onAddTask={addTask}
              onUpdateTask={updateTask}
              onDeleteTask={deleteTask}
              onDropTask={moveTask}
            />
          ))}

          <button className="new-column-btn">
            <IconPlus size={18} />
            Nova Coluna
          </button>
        </div>
      </main>
    </div>
  );
}
