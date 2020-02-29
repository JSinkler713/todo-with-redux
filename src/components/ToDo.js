import React, { useState } from "react";
import ToDoItem from "./ToDoItem";
import "./ToDo.css";

const ToDo = (props) => {
  //using redux
  const { list, redux_add, redux_delete } = props;
  const [todo, setTodo] = useState("");

  const generateId = () => {
    if (list && list.length > 1) {
      return Math.max(...list.map((t) => t.id)) + 1;
    } else {
      return 1;
    }
  };

  const createNewToDoItem = () => {
    //validate todo
    if (!todo) {
      alert("Please enter a todo!");
      return;
    }
    const newId = generateId();
    //using redux
    redux_add({ id: newId, text: todo });
    setTodo("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      createNewToDoItem();
    }
  };

  const handleInput = (e) => {
    setTodo(e.target.value);
  };

  const deleteItem = (todoId) => {
    //using redux
    redux_delete(todoId)
  };

  return (
    <div className="ToDo">
      <h1 className="ToDo-Header">React To Do w/ Redux</h1>
      <div className="ToDo-Container">
        <div className="ToDo-Content">
          {list.map((item, i) => {
            return <ToDoItem key={i} item={item} deleteItem={deleteItem} />;
          })}
        </div>

        <div className="ToDoInput">
          <input type="text" value={todo} onChange={handleInput} onKeyPress={handleKeyPress} />
          <button className="ToDo-Add" onClick={createNewToDoItem}>
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToDo;
