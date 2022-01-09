import React, { useEffect, useState } from 'react'
import { Route, useNavigate, } from 'react-router-dom';
import { useContext } from 'react';
import { Routes } from 'react-router-dom';
import Context from '../context/TaskContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import Popup from '../components/Popup';

const Home = ({ setCurrent }) => {
    const navigate = useNavigate();
    const [startMsg, setStartMsg] = useState("Estás al día con tus tareas");
    const context = useContext(Context);
    const { taskList, setList } = context;

    useEffect(() => {
        setCurrent(null)
        if (taskList.length) {
            setStartMsg("Cosas por hacer")
        } else {
            setStartMsg("Estás al día con tus tareas");
        }
    }, [taskList])

    return (
        <>
        <Popup/>
            {!taskList?.length ?
                <div className='text-center'>
                    <p>{startMsg}</p>
                    <div className='task-content text-center'>
                        <button className='btn new-task' onClick={() => <Routes>{navigate("/tarea")}</Routes>}>Crear tarea</button>
                    </div>
                </div>
                :
                <>
                    <p>{startMsg}</p>
                    <div className='task-content'>
                        <ul className="list-group">
                            {taskList.map(t => {
                                return (
                                    <React.Fragment key={t.id}>
                                        <li className="list-group-item" key={t.id}>
                                            <div className='row'>
                                                <div className='col-1 m-0'>
                                                    <input className="form-check-input" type="checkbox" value="" aria-label="..." />
                                                </div>
                                                <div className='col-8 m-0'>
                                                    <span className="list-name">{t.nombre}</span>
                                                </div>
                                                <div className='col-1 m-0 text-right'>
                                                    <span onClick={(e) => {
                                                        let values = t;
                                                        console.log(t);
                                                        setCurrent(values);
                                                        navigate("/tarea");
                                                    }
                                                    }>
                                                        <FontAwesomeIcon className='pointer' size='1x' icon={faPencilAlt} color='#FFC82C' />
                                                    </span>
                                                </div>
                                                <div className='col-1 m-0 text-right'>
                                                    <span onClick={() => {
                                                        
                                                    }}>
                                                        <FontAwesomeIcon className='pointer' size='1x' icon={faTrash} color='#BE2424' />
                                                    </span>
                                                </div>
                                            </div>
                                        </li>
                                        <hr />
                                    </React.Fragment>
                                )
                            })}
                        </ul>
                    </div>
                    <button className='btn new-task circle-btn text-center' onClick={() => <Routes>{navigate("/tarea")}</Routes>}>+</button>
                </>
            }
        </>
    )
}

export default Home;