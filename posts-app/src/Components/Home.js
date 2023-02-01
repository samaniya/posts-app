import React, { useEffect, useState } from 'react'
import '../App.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import { Alert, Button, Snackbar, TableFooter } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';




function Home() {
  
    const [post, setPosts] = useState([]);
    const [open, setOpen] = useState(false);
    const [vertical, SetVertical] = useState('top');
    const [horizontal, setHorizontal] = useState('right');
    const getPost = async ()=>{
        const URL = 'http://localhost:3003/posts/';
        var result = await fetch(`${URL}`);
            result = await result.json();
            console.log(result);
            setPosts(result);
    }

    useEffect(()=>{
        getPost();
    },[]);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    const handleClose =()=>{
      setOpen(false);
  }

    const handleDelete = async (id) =>{
        let response = await axios.delete("http://localhost:3003/posts/" +id);
       if(response){
        //alert('Data has been deleted successfully'),
        setOpen(true);
        getPost();
        console.log(open);

    }
    
    }

  return (
    <div className='list'>
      
    <h4>Posts List</h4>
   <Link to={`/add-post`} className="custom-link">Add Post</Link>
    <TableContainer component={Paper} className="">
    <Table sx={{ minWidth: 650 }} className="App-table" aria-label="simple table App-table">
      <TableHead className='table-head'>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Title</TableCell>
          <TableCell>Description</TableCell>
          <TableCell>Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {post.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((post) => (
          <TableRow
            key={post.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {post.id}
            </TableCell>
            <TableCell >{post.title}</TableCell>
            <TableCell >{post.body}</TableCell>
            <TableCell className='butns'>
              <Link to={`/post/${post.id}`} className="edit-link">Edit</Link>
              <Button 
                 style={{
                      borderRadius: 28,
                      backgroundColor: "rgb(182 65 33)",
                      padding: "10px 20px",
                      fontSize: "11px"
                      }} 
                      variant="contained" 
                      onClick={()=>handleDelete(post.id)}
              >
              Delete
              </Button>
            
            </TableCell>
            
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="span"
            count={post.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
        </TableFooter>
    </Table>
  </TableContainer>
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

export default Home