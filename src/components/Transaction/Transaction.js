import React from 'react';
import { Paper, TableContainer, Table, TableBody, TableRow, TableCell, Typography, Button, CardActions, Card } from '@material-ui/core';
import { useSelector } from 'react-redux';
import  DeleteIcon  from '@material-ui/icons/Delete'

import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { deletePost } from '../../actions/posts'

const Transaction = ({ currentId, setIsEdit, setIsViewDetails, setIsEnterTransaction }) => {

    const dispatch = useDispatch();
    const classes = useStyles();
    const post = useSelector((state) =>currentId ? state.posts.find((p) => p._id === currentId): null );
    
    const showTransaction = () => {
        setIsViewDetails(false);
    }

    
    return(
        
        <Paper>
        <Card  className={classes.paper} raised elevation={6}>
            <Typography variant="h6" className={classes.typography}> View Transaction </Typography>
        <TableContainer>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Member Number: {post?.memberNo} </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Date: {post?.datePaid} </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Name: {post?.name} </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Email: {post?.email}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Amount: {post?.amount}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
        <CardActions  className={classes.cardActions}>
            <Button className={classes.button} style={{ marginTop: '30px' }} color="primary" variant='outlined'  onClick={ () => {
                setIsEdit(true);
                setIsEnterTransaction(true);
                setIsViewDetails(false);

            } } >Edit Transaction</Button>      
                
            <Button color="secondary" style={{marginTop: '10px'}} onClick={() => dispatch(deletePost(post._id))}><DeleteIcon /> &nbsp; Delete</Button>

            <Button className={classes.button} style={{ marginTop: '30px' }} color="primary" variant='outlined' onClick={() => showTransaction()}>close</Button>

                      
        </CardActions>
        </Card>
        </Paper>
    )
}

export default Transaction;