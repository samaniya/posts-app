import React, { useEffect, useState } from 'react';
import { Alert, Button, Snackbar } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const EditPost = () => {
  const [title, setTitle] = useState('');
  const [body, setDescription] = useState('');
  const [result, setResult] = useState({});
  const [open, setOpen] = useState(false);
  const [vertical, SetVertical] = useState('top');
  const [horizontal, setHorizontal] = useState('right');

  const navigate = useNavigate();

  const params = useParams();
  const getDetails= async()=>{
     let response = await axios.get('http://localhost:3003/posts/'+params.id);
      response  = response.data; 
      setTitle(response.title)
      setDescription(response.body)
      setResult(response);
                          
  }

  useEffect(()=>{
     getDetails();
  },[]);

  const data = {
    title:title,
    body:body
};
 
const handleClose =()=>{
  setOpen(false);
}
  const handleUpdate = async (id) =>{
        console.log(data);
        const response = await axios.put(`http://localhost:3003/posts/${id}`, data)
                         .then(res=>{
                            setOpen(true);
                            setTimeout(()=>{
                               navigate('/');
                            },2000)
                         })
                         
  }

  return (
    <div>
    <h3>Edit Post</h3>
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
        <Button variant='contained' onClick={()=>handleUpdate(result.id)}>
            Submit
        </Button>
        
    </form>
    { 
      open == true ?
      <Snackbar open={open} anchorOrigin={{ vertical, horizontal }} autoHideDuration={6000000} onClose={handleClose}>
           <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
              Post has been updated successfully!
           </Alert>
      </Snackbar>:''
    }
    </div>
    
  )
}

export default EditPost