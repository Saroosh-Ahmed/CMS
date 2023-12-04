import {Button, Form, Modal} from "react-bootstrap";
import {useForm} from "react-hook-form";
import {useEffect} from "react";

function ViewCustomer({show, setShow, data}) {
    const {
        register,
        handleSubmit,
        watch,
        formState: {errors},
        reset
    } = useForm()

    useEffect(() => {
        reset({
            name: data?.name,
            contact_info: data?.contact_info,
            notes: data?.notes
        })
    }, [data])
    const handleClose = () => setShow(false);
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>View Customer</Modal.Title>
                </Modal.Header>
                <Form>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Name</Form.Label>
                            <Form.Control disabled={true} type="text" placeholder="name" {...register('name', {
                                required: true
                            })} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control disabled={true} type="text"
                                          placeholder="+923333333333"  {...register('contact_info', {
                                required: true
                            })}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Notes</Form.Label>
                            <Form.Control disabled={true} as="textarea" rows={3}
                                          placeholder={"Anything"}  {...register('notes', {
                                required: false
                            })}/>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

        </>
    )
}

export default ViewCustomer