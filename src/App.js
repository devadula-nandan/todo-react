import Todo from "./Todo";
import AddBar from "./AddBar";
import ResponsiveNavBar from "./Nav";

export default function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [todos, setTodos] = useState([]);
  const verifySession = () => {
    fetch("https://nandan1996-todo-flask-api.herokuapp.com/verify.session", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        const { message } = json;
        if (message === "True") {
          setIsLogged(true);
        }
      });
  };
  verifySession();

  useEffect(() => {
    fetch("https://nandan1996-todo-flask-api.herokuapp.com/todos", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        const { todos } = json;
        setTodos(todos);
      });
  }, [isLogged]);

  const addTodo = (data) => {
    let x = data.deadline;
    if (data.deadline) {
      data.deadline = new Date(data.deadline).toString();
    }
    const newTodos = [data, ...todos];
    setTodos(newTodos);
    if (data.deadline === null) {
      data.deadline = "";
    } else {
      data.deadline = x;
    }

    fetch("https://nandan1996-todo-flask-api.herokuapp.com/add.todo", {
      // Adding method type
      method: "POST",
      credentials: "include",

      // Adding body or contents to send
      body: JSON.stringify({
        deadline: data.deadline,
        priority: data.priority,
        text: data.text,
        title: data.title,
      }),

      // Adding headers to the request
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then((json) => {
        alert(json);
        const { id } = json;
        data["id"] = id;

        return true;
      });
  };
  const removeTodo = (id) => {
    setTodos({
      todos: todos.filter((todo) => todo.id !== id),
    });
    fetch("https://nandan1996-todo-flask-api.herokuapp.com/delete.todo", {
      // Adding method type
      method: "POST",
      credentials: "include",

      // Adding body or contents to send
      body: JSON.stringify({
        id: id,
      }),

      // Adding headers to the request
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        alert(json);
      });
  };

  return (
    <>
      <ResponsiveNavBar />
      <div className="md:container md:mx-auto px-3 sm:px-7 pt-4 lg:px-8">
        {isLogged && (
          <div>
            <AddBar addTodo={addTodo} />
            <Todo todos={todos} removeTodo={removeTodo} />
          </div>
        )}
      </div>
    </>
  );
}
