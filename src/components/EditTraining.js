import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

function EditTraining(props) {
    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState({
        date: '',
        duration: '',
        activity: '',
        
    })

    const handleClickOpen = () => {
        setTraining(props.params.data);
        setTraining({
            date: props.params.data.date,
            duration: props.params.data.duration,
            activity: props.params.data.activity,
            
        })
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        props.updateTraining(props.params.value, training);
        handleClose();
    }

    const inputChanged = (event) => {
        setTraining({...training, [event.target.name]: event.target.value})
    }

    return (
        <div>
            <Button size="small" onClick={handleClickOpen}>
                Edit
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Training</DialogTitle>
                <DialogContent>
                <TextField
                    name="date"
                    value={training.date}
                    onChange={inputChanged}
                    margin="dense"
                    label="Date"
                    fullWidth
                    variant="standard"
                    />
                     <TextField
                    name="duration"
                    value={training.duration}
                    onChange={inputChanged}
                    margin="dense"
                    label="Duration"
                    fullWidth
                    variant="standard"
                    />
                     <TextField
                    name="activity"
                    value={training.activity}
                    onChange={inputChanged}
                    margin="dense"
                    label="Activity"
                    fullWidth
                    variant="standard"
                    />
                    
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default EditTraining;