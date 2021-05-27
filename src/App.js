import React, { Component } from "react";
import "./styles.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      todos: [],
      tempId: 0,
      editItem: ""
    };
  }

  onType = (e) => {
    this.setState({ input: e.target.value });
  };

  onAdd = () => {
    const { input, todos, tempId } = this.state;
    let cId = 0;
    if (tempId === 0) {
      cId = Math.floor(Math.random() * 100);
    } else {
      cId = tempId;
    }
    const newList = {
      name: input,
      id: cId,
      isDone: false
    };

    const newTodo = [...todos, newList];
    this.setState({ todos: newTodo, input: "", editItem: false, tempId: 0 });
  };

  onDelete = (item) => {
    const newList = this.state.todos.filter((el) => el.name !== item);
    this.setState({ todos: newList });
  };

  onDone = (item) => {
    const todos = this.state.todos.map((el) => {
      if (item === el.name) {
        el.isDone = true;
      }
      return el;
    });
    this.setState({ todos });
  };

  onEdit = (id) => {
    const { todos } = this.state;
    const newList = todos.filter((el) => el.id !== id);
    const selectedItem = todos.find((el) => el.id === id);
    this.setState({
      todos: newList,
      input: selectedItem.name,
      editItem: true,
      tempId: id
    });
  };

  clearAll = () => {
    this.setState({ todos: [] });
  };
  doneItems = () => {
    const completed = this.state.todos.filter((el) => el.isDone === "true");
    this.setState({ todos: completed });
  };
  render() {
    const { input, editItem, todos } = this.state;
    console.log(todos);
    return (
      <div>
        <input value={input} onChange={this.onType} />
        <button className={editItem ? "edit btn" : "btn"} onClick={this.onAdd}>
          {" "}
          {editItem ? "Edit Item" : "Add to List"}
        </button>
        {/* <div className="mainBtns">
          <button className="active">All</button>
          <button>Active</button>
          <button onClick={() => this.doneItems(this.state.todos.isDone)}>
            Done
          </button>
          <button onClick={this.clearAll}>Clear All</button>
        </div> */}
        <h4>Todo List: </h4>
        <ul>
          {todos.map((todo) => {
            const cName = todo.isDone ? "todo done" : "todo";
            return (
              <li>
                <span className={cName}>{todo.name}</span>

                <button
                  className="doneBtn button"
                  onClick={() => this.onDone(todo.name)}
                >
                  Done
                </button>
                <button
                  className="delete button"
                  onClick={() => this.onDelete(todo.name)}
                >
                  {" "}
                  Delete
                </button>
                <button
                  className="edit button"
                  onClick={() => this.onEdit(todo.id)}
                >
                  {" "}
                  Edit
                </button>
              </li>
            );
          })}
          <button className="clearBtn" onClick={this.clearAll}>
            Clear List
          </button>
        </ul>
      </div>
    );
  }
}
export default App;
