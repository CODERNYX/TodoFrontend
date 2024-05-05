import axios from "axios";


export function deleteTodo(id){
    console.log(id);
    return axios.delete(`http://localhost:8080/todos/todos/${id}`)
}


export default async function allTodos() {
    return await axios.get(`http://localhost:8080/todos`)
}