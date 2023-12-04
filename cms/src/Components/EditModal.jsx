import {Button, Form, Modal} from "react-bootstrap";
import {useForm} from "react-hook-form";
import {useEffect} from "react";
import {editUsers} from "../Services";
import {toast} from "react-toastify";

function EditModal({show, setShow, data, setReload, reload}) {
    const {
        register,
        handleSubmit,
        watch,
        formState: {errors},
        reset
    } = useForm()

    const onSubmit = async (updated_data) => {
        try {
            let updateData = {
                id: data?.id,
                ...updated_data
            }
            let res = await editUsers(updateData)
            handleClose()
            setReload(reload+1)
            toast.success(res?.data?.msg)
        } catch (e) {
            toast.error(e?.response?.data?.msg)
        }
    }
    const handleClose = () => setShow(false);

    useEffect(() => {
        reset({
            name: data?.name,
            contact_info: data?.contact_info,
            notes: data?.notes
        })
    }, [data])
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Customer</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="name" {...register('name', {
                                required: true
                            })} />
                        </Form.Group>
                        {errors.email?.type === "required" && (
                            <p style={{color: 'red'}}>Email Address is required</p>
                        )}
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control type="text" placeholder="+923333333333"  {...register('contact_info', {
                                required: true
                            })}/>
                        </Form.Group>
                        {errors.contact_info?.type === "required" && (
                            <p style={{color: 'red'}}>Phone Number is required</p>
                        )}
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Notes</Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder={"Anything"}  {...register('notes', {
                                required: true
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

export default EditModal