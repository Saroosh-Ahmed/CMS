import {Button, Modal} from "react-bootstrap";
import {toast} from "react-toastify";
import {createUsers, deleteUsers} from "../Services";

function DeleteModal({show, setShow, data, setReload, reload}) {
    const handleDelete = async () => {
        try {
            let res = await deleteUsers({id: data?.id})
            setShow(false);
            setReload(reload + 1)
            toast.success(res?.data?.msg)
        } catch (e) {
            toast.error(e?.response?.data?.msg)
        }
    }

    const handleClose = () => setShow(false)

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Customer</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this record?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleDelete}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DeleteModal