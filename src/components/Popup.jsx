import './Popup.css';
import { Modal, Button } from 'react-bootstrap';
import Context from '../context/TaskContext';
import { useContext } from 'react/cjs/react.development';

const Popup = ({ show, setShow, currentObj }) => {
    const context = useContext(Context);

    const { taskList, setList } = context;
    if (!currentObj) return null
    return (
        <>
            <Modal
                show={show}
                onHide={() => setShow(false)}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Body>
                    <p>¿Estás seguro de eliminar la tarea {currentObj.nombre}?
                    </p>
                    <div className='text-right'>
                        <Button className='btn btn-eliminar' onClick={() => {
                            setShow(false);
                            setList(taskList.filter(task => task !== currentObj))
                        }}>
                            Eliminar
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Popup;