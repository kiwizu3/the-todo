import React, { useState, useEffect, useCallback } from 'react';


const url = "https://jsonplaceholder.typicode.com/todos";
const List = () => {

    const [newText, setNewText] = useState("");
    const [tasks, setTasks] = useState([]);



    const handleChange = useCallback((e) => {

        setNewText(e.target.value)
    }, [setNewText])

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setTasks(data);
            })
    }, [])


    const addTodo = useCallback(() => {

        const newTodo = {
            userId: 1,
            id: +new Date(),
            title: newText,
            completed: false
        }

        console.log(newTodo)
        fetch(url, {
            method: "POST",
            mode: "cors",
            body: JSON.stringify(newTodo)
        }).then(response => {
            console.log(response.json());
            // On success update state
            setTasks([newTodo, ...tasks])
        }); // parses response to JSON
    }, [newText, tasks, setTasks])

    const taskList = tasks.map((task) => {
        return (
            <>
                <div className="card border-0 shadow p-2 mb-3" key={task.id}>
                    <p className="fw-bold mb-0">{task.title}</p>
                </div>
            </>
        )
    })

    console.log(newText)
    return (
        <div className="container">

            <div className="row justify-content-center">
                <div className="col-lg-6 col-md-8 col-sm-12">
                    <div className="card mb-3 shadow bg-muted d-flex flex-row justify-content-center border-0">
                        <input onChange={handleChange}
                            className="w-75 border-0 ps-2" type="text"
                            placeholder="what do you want to do today?"
                        />

                        <button className="btn btn-dark border-0 ms-3 w-25 rounded-0" onClick={addTodo}>New Todo +</button>
                    </div>
                    {taskList}
                </div>
            </div>

        </div>
    );
}

export default List;
