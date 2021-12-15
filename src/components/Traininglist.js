import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";


import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

function Traininglist() {
    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        fetchTrainings();
    }, [])



    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then(response => response.json())
        .then(data => setTrainings(data.content))
        .catch(err => console.error(err))
    }

    

    


  


  

    const columns = [
        {field: 'date', sortable :true, filter: true},
        {field: 'duration', sortable :true, filter: true},
        {field: 'activity', sortable :true, filter: true, width: 240},
        
        
    ]

    return(
        <React.Fragment>
            
        <div className="ag-theme-material" style={{height: 600, width: '80%', margin: 'auto'}}>
            <AgGridReact
             rowData={trainings}
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



export default Traininglist;