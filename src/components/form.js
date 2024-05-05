import axios from "axios";
import React, { useEffect } from "react";

const Form = ({ input, setInput, todos, setTodos, editTodo, setEditTodo }) => {
    const updateTodo = (task, id, completed) => {
        // // const newTodo = todos.map((todo) =>
        //     todo.id === id ? { task, id, completed } : todo
        // );
        const newTodo = todos.find(todo => todo.id === id);
        console.log(todos);
        newTodo.task = input;
        console.log(newTodo.task);
        console.log(newTodo.id);
        axios.put(`http://localhost:8080/todos/todos/${id}`, newTodo)
        setEditTodo("");
    };

    useEffect(() => {
        if (editTodo) {
            setInput(editTodo.task);
        } else {
            setInput("");
        }
    }, [setInput, editTodo]);

    const onInputChange = (event) => {
        setInput(event.target.value);
    };

    const onFormSubmit = (event) => {
        event.preventDefault();
        if (!editTodo) {
            // setTodos([...todos, { id: uuidV4(), task: input, completed: false }]);
            axios.post(`http://localhost:8080/todos`, { task: input, completed: false })
            setInput("");
        } else {
            console.log(editTodo.id)
            updateTodo(input, editTodo.id, editTodo.completed);
        }
    };

    return (
        <form onSubmit={onFormSubmit}>
            <input
                type="text"
                placeholder="Enter a Todo..."
                className="task-input"
                value={input}
                required
                onChange={onInputChange}
            />
            <button className="button-add" type="submit">
                {editTodo ? "Edit" : "Add"}
            </button>
        </form>
    );
};

export default Form;