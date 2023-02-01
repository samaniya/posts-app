import { stripBasename } from '@remix-run/router'
import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Alert, Button, Snackbar } from '@mui/material';

const AddPost = () => {
    const [title, setTitle] = useState('');
    const [body, setDescription] = useState('');
    const [open, setOpen] = useState(false);
    const [vertical, SetVertical] = useState('top');
    const [horizontal, setHorizontal] = useState('right');
    

    const navigate = useNavigate();

    const data = {
        title:title,
        body:body
    };

    const submit = async (e) =>{
        e.preventDefault();
      let response = await  axios.post("http://localhost:3003/posts/", data);
      if(response){
        setOpen(true);
        setTimeout(()=>{
          navigate('/');
        },2000);
        
      }else{
        alert('somethin went wrong')
      }

        
    }

    const handleClose =()=>{
        setOpen(false);
    }
  return (
    <div>
      <h3>Add Post</h3>
      
    <form className='forms'>
        <input 
           type="text"
           placeholder="Enter Post Title"
           className="form-group"
           value={title}
           onChange={(e)=>setTitle(e.target.value)}
        />
        <input 
           type="text"
           placeholder="Enter Post Description"
           className="form-group"
           value={body}
           onChange={(e)=>setDescription(e.target.value)}
        />
        <Button variant='contained' onClick={submit}>
            Submit
        </Button>
        
    </form>
    { 
      open == true ?
      <Snackbar open={open} anchorOrigin={{ vertical, horizontal }} autoHideDuration={2000} onClose={handleClose}>
           <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
              Post has been added successfully!
           </Alert>
      </Snackbar>:''
    }
    </div>
  )
}

export default AddPost