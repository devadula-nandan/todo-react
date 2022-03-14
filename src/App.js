import Todo from "./Todo";
import ResponsiveNavBar from "./Nav";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./NotFound";
import Login from "./Login";
import Logout from "./Logout";
import React, { useState, useEffect } from "react";
export const isLoggedContext = React.createContext(false);
export default function App(props) {
  const [isLogged, setIsLogged] = useState(false);
  useEffect(() => {
    if (isLogged === false) {
      fetch("https://nandan1996-todo-flask-api.herokuapp.com/verify.session", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          const { message } = data;
          if (message === "True") {
            setIsLogged(true);
          } else {
            setIsLogged(false);
          }
        });
    }
  }, [isLogged]);
  return (
    <isLoggedContext.Provider value={isLogged}>
      <Router>
        <div>
          <ResponsiveNavBar />
          <Routes>
            <Route path="/" element={<Todo />} />
            <Route path="login" element={<Login />} />
            <Route path="logout" element={<Logout />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </isLoggedContext.Provider>
  );
}

// class App extends Component {
//   state = {
//     isLogged: false,
//     todos: [],
//   };
//   componentDidMount() {
//     if (!this.state.isLogged) {
//       fetch("https://nandan1996-todo-flask-api.herokuapp.com/verify.session", {
//         method: "GET",
//         credentials: "include",
//         headers: {
//           "Content-type": "application/json; charset=UTF-8",
//         },
//       })
//         .then((res) => res.json())
//         .then((data) => {
//           const { message } = data;
//           if (message === "True") {
//             this.setState({
//               isLogged: true,
//             });
//           } else {
//             window.location.href = "/login";
//           }
//         });
//     }
//   }
//   shouldComponentUpdate(nextProps, nextState) {
//     if (nextState.isLogged !== this.state.isLogged) {
//       return true;
//     }
//     return false;
//   }

//   componentDidUpdate() {
//     if (this.state.isLogged) {
//       this.getTodos();
//     }
//   }

//   getTodos = () => {
//     fetch("https://nandan1996-todo-flask-api.herokuapp.com/get.todo", {
//       // Adding method type
//       method: "POST",
//       credentials: "include",

//       // Adding body or contents to send
//       body: JSON.stringify({
//         active: true,
//       }),

//       // Adding headers to the request
//       headers: {
//         "Content-type": "application/json; charset=UTF-8",
//       },
//     })
//       .then((res) => {
//         if (res.ok) {
//           return res.json();
//         } else {
//           alert(res.status, res.statusText, res.url, res.ok, res.type, res.body, res.bodyUsed);
//           throw new Error("Something went wrong");
//         }
//       })
//       .then((json) => {
//         const { message, results } = json;
//         alert(message);
//         this.setState({ todos: results });
//       });
//   };

//   removeTodo = (id) => {
//     const { todos } = this.state;
//     this.setState({
//       todos: todos.filter((todo) => todo.id !== id),
//     });
//     fetch("https://nandan1996-todo-flask-api.herokuapp.com/delete.todo", {
//       // Adding method type
//       method: "POST",
//       credentials: "include",

//       // Adding body or contents to send
//       body: JSON.stringify({
//         id: id,
//         session_id: this.state.sessionId,
//       }),

//       // Adding headers to the request
//       headers: {
//         "Content-type": "application/json; charset=UTF-8",
//       },
//     })
//       .then((res) => res.json())
//       .then((json) => {
//         alert(json);
//       });
//   };

//   addTodo = (data) => {
//     const { todos } = this.state;
//     alert(data.deadline);
//     let x = data.deadline;
//     if (data.deadline) {
//       data.deadline = new Date(data.deadline).toString();
//     }
//     const newTodos = [data, ...todos];
//     this.setState({
//       todos: newTodos,
//     });
//     if (data.deadline === null) {
//       data.deadline = "";
//     } else {
//       data.deadline = x;
//     }

//     fetch("https://nandan1996-todo-flask-api.herokuapp.com/add.todo", {
//       // Adding method type
//       method: "POST",
//       credentials: "include",

//       // Adding body or contents to send
//       body: JSON.stringify({
//         deadline: data.deadline,
//         priority: data.priority,
//         text: data.text,
//         title: data.title,
//       }),

//       // Adding headers to the request
//       headers: {
//         "Content-type": "application/json; charset=UTF-8",
//       },
//     })
//       .then((res) => {
//         if (res.ok) {
//           return res.json();
//         } else {
//           throw new Error("Something went wrong");
//         }
//       })
//       .then((json) => {
//         alert(json);
//         const { id } = json;
//         data["id"] = id;

//         return true;
//       });
//   };
//   render() {
//     return (
//       <>
//         <ResponsiveNavBar />
//         <div className="md:container md:mx-auto px-3 sm:px-7 pt-4 lg:px-8">
//           {this.state.session && (
//             <div>
//               <AddBar addTodo={this.addTodo} />
//               <Todo todos={this.state.todos} removeTodo={this.removeTodo} />
//             </div>
//           )}
//         </div>
//       </>
//     );
//   }
// }
// export default App;
