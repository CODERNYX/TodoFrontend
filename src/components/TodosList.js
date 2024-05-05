import React,{useEffect} from "react";
import allTodos, { deleteTodo } from "./apicalls";
import axios from "axios";
const TodosList = ({todos, setTodos, setEditTodo}) => {
    const handleComplete = async (todo) => {
        console.log(todo)
        await setTodos(
            todos.map((item) => {
                if (item.id === todo.id){
                    if(!item.completed){
                        axios.put(`http://localhost:8080/todos/todos/${item.id}/complete`)
                        return { ...item, completed: !item.completed };
                    }
                    else{
                        axios.put(`http://localhost:8080/todos/${item.id}/incomplete`)
                    }
                }
                return item;
            })
        );
    }; 

    useEffect(() =>{
        allTodos().then((response) => {
            setTodos(response.data);
        })
    })


    const handleEdit = ({id}) => {
        const findTodo = todos.find ((todo) => todo.id === id);
        setEditTodo(findTodo);
    };

    const handleDelete = (id) => {
        console.log(id)
        deleteTodo(id);
    };

    const preventTyping = (event) => {
        event.preventDefault();
    };

    return (
        <div>
            {todos.map((todo) => (
                <li className="list-item" key={todo.id}>
                    <input
                        type="text"
                        value={todo.task}
                        className={`list ${todo.completed ? "complete" : ""}`}
                        onChange={preventTyping}
                    />
                    <div>
                        <button className="button-complete task-button" onClick={() => handleComplete(todo)}>
                            <i className="fa fa-check-circle"></i>
                        </button>
                        <button className="button-edit task-button" onClick={() => handleEdit(todo)}>
                            <i className="fa fa-edit"></i>
                        </button>
                        <button className="button-delete task-button" onClick={() => handleDelete(todo.id)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </div>
                </li>
            ))}
        </div>
        );
};

export default TodosList;