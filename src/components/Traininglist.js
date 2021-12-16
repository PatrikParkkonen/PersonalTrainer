import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import EditTraining from './EditTraining';
import AddTraining from './AddTraining';


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

    const deleteTraining = (url) => {
        if (window.confirm('Are you sure?')) {
        fetch(url, { method: 'DELETE'})
        .then(response => {
            if (response.ok) {
                fetchTrainings();
                setMsg('Customer deleted successfully');
                setOpen(true);
            }
            else {
                alert('Jokin meni vikaan');
            }
        })
        .catch(err => console.error(err))
    }
    }


    const addTraining = (car) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(car)
        })
        .then(response => {
            if (response.ok) {
                fetchTrainings();
                setMsg('Adding successful');
                setOpen(true);
            }
            else {
                alert('Adding failed')
            }
        })
        .catch(err => console.error(err))
    }


    const updateTraining = (url, updatedTraining) => {
         fetch(url, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(updatedTraining)
            })
        .then(response => {
            if (response.ok) {
                    fetchTrainings();
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
        {field: 'date', sortable :true, filter: true},
        {field: 'duration', sortable :true, filter: true},
        {field: 'activity', sortable :true, filter: true, width: 240},
        {
            headerName: '',
            field: '_links.self.href',
            width: 120,
            cellRendererFramework: params => <EditTraining updateTraining={updateTraining} params={params} />
        },
        {
            headerName: '',
            field: '_links.self.href',
            width: 120,
            cellRendererFramework: params =>
                <Button size="big" onClick={() => deleteTraining(params.value)} color="error">
                Delete
                </Button>
        }
        
    ]

    return(
        <React.Fragment>
            <AddTraining addTraining={addTraining} />
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