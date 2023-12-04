import './App.css';
import {Container} from "react-bootstrap";
import CustomerListing from "./Components/CustomerListing";
import AddCustomer from "./Components/AddCustomer";
import {ToastContainer} from "react-toastify";
import {useState} from "react";
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const [reload, setReload] = useState(0)
    return (
        <div>
            <ToastContainer/>

            <Container>
                <h1 className={"text-center"}>Customer Management System</h1>
                <AddCustomer reload={reload} setReload={setReload}/>
                <br/>
                <br/>
                <CustomerListing reload={reload} setReload={setReload}/>
            </Container>
        </div>
    );
}

export default App;
