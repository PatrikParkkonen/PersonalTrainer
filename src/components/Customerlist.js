import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';


import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

function Customerlist() {
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        fetchCustomers();
    }, [])

    useEffect(() => {
        console.log('customers >>', customers)
      }, [customers])

    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
    }

    const deleteCustomer = (url) => {
        if (window.confirm('Are you sure?')) {
        fetch(url, { method: 'DELETE'})
        .then(response => {
            if (response.ok) {
                fetchCustomers();
                setMsg('Customer deleted successfully');
                setOpen(true);
            }
            else {
                alert('Something went wrong');
            }
        })
        .catch(err => console.error(err))
    }
    }


    const addCustomer = (car) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(car)
        })
        .then(response => {
            if (response.ok) {
                fetchCustomers();
                setMsg('Adding successful');
                setOpen(true);
            }
            else {
                alert('Something went wrong')
            }
        })
        .catch(err => console.error(err))
    }


    const updateCustomer = (url, updatedCustomer) => {
         fetch(url, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(updatedCustomer)
            })
        .then(response => {
            if (response.ok) {
                    fetchCustomers();
                    setMsg('Customer edited successfully');
                    setOpen(true);
                }
            else {
                    alert('Editing failed');
                }   
                 })
            .catch(err => console.error(err))

    }

    


  


  

    const columns = [
        {field: 'firstname', sortable :true, filter: true},
        {field: 'lastname', sortable :true, filter: true},
        {field: 'streetaddress', sortable :true, filter: true, width: 240},
        {field: 'postcode', sortable :true, filter: true, width: 120},
        {field: 'city', sortable :true, filter: true, width: 120},
        {field: 'email', sortable :true, filter: true, width: 180},
        {field: 'phone', sortable :true, filter: true, width: 180},
        {
            headerName: '',
            field: '_links.self.href',
            width: 120,
            cellRendererFramework: params => <EditCustomer updateCustomer={updateCustomer} params={params} />
        },
        {
            headerName: '',
            field: '_links.self.href',
            width: 120,
            cellRendererFramework: params =>
                <Button size="big" onClick={() => deleteCustomer(params.value)} color="error">
                Delete
                </Button>
        }
    ]

    return(
        <React.Fragment>
            <AddCustomer addCustomer={addCustomer} />
        <div className="ag-theme-material" style={{height: 600, width: '80%', margin: 'auto'}}>
            <AgGridReact
             rowData={customers}
             columnDefs={columns}
             pagination={true}
             paginationPageSize={10}

             />
        </div>
        <Snackbar
         open={open}
         autoHideDuration={3000}
         onClose={() => setOpen(false)}
         message={msg}
        />
        </React.Fragment>
    );
}



export default Customerlist;