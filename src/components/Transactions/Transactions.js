import React from 'react';
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas';
import { Paper, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Button } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';

import { useSelector } from 'react-redux'
import useStyles from './styles';

const Transactions = ({ setCurrentId, setIsEdit, setIsViewDetails }) => {
    
    const classes = useStyles();
    const transactions = useSelector((state) => state.posts);
    const user = JSON.parse(localStorage.getItem('profile'));

    const printStatement = () => {
        const input = document.getElementById('pdfDiv');
        html2canvas(input).then((canvas) => {
            let imgWidth = 200;
            let imgHeight = canvas.height * imgWidth/canvas.width;
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF( 'p', 'mm', 'a4');
            let position = 20;
            pdf.addImage( imgData,'JPEG', 0, position, imgWidth, imgHeight);
            pdf.save("statement.pdf");
        })
    }
    
  
    return(
        
        <div>
            <Paper style={{overflow: 'hidden', width: '100%'}}>
            <TableContainer id="pdfDiv" >
                <Table stickyHeader={true} aria-label="a dense table" >
                    <TableHead >
                        <TableRow style={{ padding: '0px', margin: '0px' }}>
                            <TableCell style={{paddingLeft: "50px", paddingTop: '7px', paddingBottom: '7px'}}>Member Number</TableCell>
                            <TableCell style={{ paddingTop: '0px', paddingBottom: '0px' }}>Date Paid</TableCell>
                            { user.result.role === 'admin' &&

                                <TableCell style={{ paddingTop: '0px', paddingBottom: '0px' }}>Name</TableCell>

                            }
                            <TableCell style={{ paddingTop: '0px', paddingBottom: '0px' }}>Amount</TableCell>
                            { user.result.role === 'admin' &&
                            <TableCell style={{ paddingTop: '0px', paddingBottom: '0px' }}>View</TableCell>
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {                        
                            transactions.map((t, index) => {
                                return <TableRow style={{ paddingTop: '0px', paddingBottom: '0px' }} key={index}>
                                    <TableCell style={{paddingLeft: "50px", paddingTop: '0px', paddingBottom: '0px'}}>{t.memberNo}</TableCell>
                                    <TableCell style={{ paddingTop: '0px', paddingBottom: '0px' }}>{t.datePaid}</TableCell >
                                    { user.result.role === 'admin' &&

                                        <TableCell style={{ paddingTop: '0px', paddingBottom: '0px' }}>{t.name}</TableCell>

                                    }
                                    <TableCell style={{ paddingTop: '0px', paddingBottom: '0px' }}>{t.amount}</TableCell>

                                    { user.result.role === 'admin' && 

                                        <TableCell style={{ paddingTop: '0px', paddingBottom: '0px' }}>{<Button onClick={() => {
                                            setCurrentId(t._id) 
                                            setIsEdit(false) 
                                            setIsViewDetails(true)
                                        }}>< Visibility style={{ height: '15px'}}  /></Button>}</TableCell>
                                        
                                    }
                                </TableRow>
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            </Paper>
            <Button className={classes.button} variant="contained" size="small" color="primary" onClick={printStatement}>Print Statement</Button>
        </div>
    )
}

export default Transactions;