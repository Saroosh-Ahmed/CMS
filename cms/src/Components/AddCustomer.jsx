import {Button,  Form, Modal} from "react-bootstrap";
import {useState} from "react";
import { useForm } from "react-hook-form"
import {createUsers} from "../Services";
import {toast} from "react-toastify";


function AddCustomer({reload, setReload}) {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset
    } = useForm()

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onSubmit = async (data) => {
        try {
            let res = await createUsers(data)
            handleClose()
            setReload(reload + 1)
            reset()
            toast.success(res?.data?.msg)
        } catch (e) {
            toast.error(e?.response?.data?.msg)
        }
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Add Customer
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Customer</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="name" {...register('name', {
                                required: true
                            })} />
                        </Form.Group>
                        {errors.name?.type === "required" && (
                            <p style={{color: 'red'}}>Name is required</p>
                        )}
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control type="text" placeholder="+923333333333"  {...register('contact_info',{
                                required: true
                            })}/>
                        </Form.Group>
                        {errors.contact_info?.type === "required" && (
                            <p style={{color: 'red'}}>Phone Number is required</p>
                        )}
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Notes</Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder={"Anything"}  {...register('notes', {
                                required: false
                            })}/>
                        </Form.Group>
                        {errors.notes?.type === "required" && (
                            <p style={{color: 'red'}}>Notes is required</p>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button type={"submit"} variant="primary">
                            Submit
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default AddCustomer