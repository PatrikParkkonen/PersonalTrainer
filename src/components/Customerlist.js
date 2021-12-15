import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";


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

    

    


  


  

    const columns = [
        {field: 'firstname', sortable :true, filter: true},
        {field: 'lastname', sortable :true, filter: true},
        {field: 'streetaddress', sortable :true, filter: true, width: 240},
        {field: 'postcode', sortable :true, filter: true, width: 120},
        {field: 'city', sortable :true, filter: true, width: 120},
        {field: 'email', sortable :true, filter: true, width: 180},
        {field: 'phone', sortable :true, filter: true, width: 180},
        
    ]

    return(
        <React.Fragment>
            
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