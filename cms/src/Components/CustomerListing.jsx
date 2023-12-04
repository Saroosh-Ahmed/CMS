import {getUsers} from "../Services";
import {useEffect, useState} from "react";
import {Button, Table} from "react-bootstrap";
import EditModal from "./EditModal";
import ViewCustomer from "./ViewCustomer";
import {toast} from "react-toastify";
import DeleteModal from "./DeleteModal";

function CustomerListing({reload, setReload}) {
    const [data, setData] = useState([])
    const [show, setShow] = useState(false)
    const [viewShow, setViewShow] = useState(false)
    const [deleteShow, setDeleteShow] = useState(false)
    const [selectData, setSelectData] = useState({})
    const getAllCustomers = async () => {
        try {
            let res = await getUsers()
            setData(res?.data)
        } catch (e) {
            toast.error(e?.response?.data?.msg)
        }
    }

    const handleOpen = data => {
        setSelectData(data)
        setShow(true)
    }

    const handleOpenView = data => {
        setSelectData(data)
        setViewShow(true)
    }
    const handleOpenDelete = data => {
        setSelectData(data)
        setDeleteShow(true)
    }
    useEffect(() => {
        getAllCustomers()
    }, [reload])
    return (
        <>
            <EditModal show={show} setShow={setShow} data={selectData} reload={reload} setReload={setReload}/>
            <ViewCustomer show={viewShow} setShow={setViewShow} data={selectData}/>
            <DeleteModal show={deleteShow} setShow={setDeleteShow} data={selectData} reload={reload} setReload={setReload}/>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Notes</th>
                    <th>Contact</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {data.length > 0 && data.map((dt,index) => {
                    return (<>
                        <tr>
                            <td>{dt?.id}</td>
                            <td>{dt?.name}</td>
                            <td>{dt?.notes}</td>
                            <td>{dt?.contact_info}</td>
                            <td className="d-flex justify-content-around">
                                <Button className="m-0" variant={'light'} onClick={() => {
                                    handleOpen(dt)
                                }}>Edit</Button>
                                <Button className="m-0" variant={'light'} onClick={() => {
                                    handleOpenDelete(dt)
                                }}>Delete</Button>
                                <Button className="m-0" variant={'light'} onClick={() => {
                                    handleOpenView(dt)
                                }}>View</Button>
                            </td>
                        </tr>
                    </>)
                })}
                </tbody>
            </Table>
        </>
    )
}

export default CustomerListing