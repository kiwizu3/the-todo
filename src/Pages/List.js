import React, { useState, useEffect, useCallback } from 'react';
// import SweetPagination from "sweetpagination";

const url = "https://jsonplaceholder.typicode.com/todos";
const List = () => {

    const [newText, setNewText] = useState("");
    const [tasks, setTasks] = useState([]);
    const [isExpand, setIsExpand] = useState(false);
    const [modalData, setModalData] = useState("");
    // const [currentPageData, setCurrentPageData] = useState(new Array(2).fill());
    const handleChange = useCallback((e) => {

        setNewText(e.target.value)
    }, [setNewText])

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
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

        fetch(url, {
            method: "POST",
            mode: "cors",
            body: JSON.stringify(newTodo)
        }).then(response => {
            // console.log(response.json());
            // On success update state
            setTasks([newTodo, ...tasks])
        }); // parses response to JSON
    }, [newText, tasks, setTasks])

    const viewExpanded = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const mUrl = "https://jsonplaceholder.typicode.com/todos/" + e.currentTarget.id
        const response = await fetch(mUrl);
        const data = await response.json();
        setModalData(data.title)
        setIsExpand(true)
    }

    const modalClose = () => {
        setModalData("");
        setIsExpand(false);
    }


    return (
        <>
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
                        {tasks.map((task) => {
                            return (
                                <>
                                    <div className="card border-0 shadow p-2 mb-3" id={task.id} key={task.id} onClick={viewExpanded}>
                                        <p className="fw-bold mb-0">{task.title}</p>
                                    </div>
                                </>
                            )
                        })}
                        {/* <SweetPagination
                            currentPageData={setCurrentPageData}
                            getData={tasks}
                            dataPerPage={10}
                        /> */}
                    </div>
                </div>

            </div>



            <div className={`modal fade ${isExpand ? "show d-block" : ""}`} id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body">
                            {modalData}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={modalClose}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default List;
