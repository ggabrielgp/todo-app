import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useContext } from "react/cjs/react.development";
import Context from "../context/TaskContext";

const onlyLettersAndSpaces = (str) => {
    return /^[A-Za-z\s]*$/.test(str);
}

const Tarea = ({ task }) => {
    const navigate = useNavigate();
    const context = useContext(Context);
    const { taskList, setList } = context;

    return (
        <div className="content">
            <div className="m-5 p-5">
                <Formik
                    initialValues={task || {
                        nombre: '',
                        descripcion: ''
                    }}
                    onSubmit={(values, actions) => {
                     
                        if (task) {
                            taskList.length && taskList.map(t => {
                                if (t.id === values.id) {
                                    t.nombre = values.nombre;
                                    t.descripcion = values.descripcion;
                                }
                            })
                            actions.setSubmitting(false);
                            navigate("/");
                        } else {
                            let copy = [...taskList];
                            let newTask = {
                                id: taskList.length + 1,
                                nombre: values.nombre,
                                descripcion: values.descripcion
                            }
                            copy.push(newTask);
                            setList(copy);
                            navigate("/");
                        }
                    }}
                    validate={values => {
                        const errors = {}
                        if (!values.nombre) {
                            errors.nombre = 'Requerido'
                        } else if (!onlyLettersAndSpaces(values.nombre)) {
                            errors.nombre = 'El nombre solo debe contener letras'
                        }
                        return errors
                    }}
                >
                    {
                        ({ touched, errors, handleChange, handleSubmit, isSubmitting, values }) =>
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-12 text-left">
                                        <p>¿Que tienes que hacer?</p>
                                    </div>

                                    <div className="col-12 text-center">
                                        <input style={{ width: '100%' }} placeholder="Nombre" name="nombre" onChange={handleChange} value={values.nombre} ></input>
                                        <p style={{ color: 'tomato' }}>{errors.nombre && touched.nombre && errors.nombre}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 text-center">
                                        <textarea style={{ width: '100%' }} placeholder="Descripción" name="descripcion" onChange={handleChange} value={values.descripcion}></textarea>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6"></div>
                                    <div className="col-6 text-right pt-3">
                                        <button type="submit" className="btn new-task text-center" disabled={isSubmitting}>{task ? "Actualizar" : "Agregar +"}</button>
                                    </div>
                                </div>
                            </form>
                    }
                </Formik>
            </div>
        </div >

    )
}

export default Tarea;