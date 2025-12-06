/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import './tableList.scss';

// mui table
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

// mui circular progress for loading state
import CircularProgress from '@mui/material/CircularProgress';
import { COMPANY_API_END_POINT } from '@/utils/constant';

// Import Delete icon and Dialog components
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { toast } from 'sonner';

// Make the API call to the backend
function TableList() {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState({
        open: false,
        companyId: null,
        companyName: ''
    });

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await fetch(`${COMPANY_API_END_POINT}/companies/all`); // Assuming this is the correct route
                const data = await response.json();
                if (data.success) {
                    setCompanies(data.companies);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching companies:', error);
                setLoading(false);
            }
        };

        fetchCompanies();
    }, []);

    const handleDeleteClick = (companyId, companyName) => {
        setDeleteDialog({
            open: true,
            companyId,
            companyName
        });
    };

    const handleCloseDialog = () => {
        setDeleteDialog({
            open: false,
            companyId: null,
            companyName: ''
        });
    };

    const handleConfirmDelete = async () => {
        if (!deleteDialog.companyId) return;
        
        setDeleteLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${COMPANY_API_END_POINT}/delete/${deleteDialog.companyId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                credentials: 'include'
            });
            
            const data = await response.json();
            
            if (data.success) {
                setCompanies(companies.filter(company => company._id !== deleteDialog.companyId));
                toast.success(data.message || 'Company deleted successfully');
            } else {
                toast.error(data.message || 'Failed to delete company');
            }
        } catch (error) {
            console.error('Error deleting company:', error);
            toast.error('An error occurred while deleting the company');
        } finally {
            setDeleteLoading(false);
            handleCloseDialog();
        }
    };

    return (
        <>
            <TableContainer component={Paper} className="table_list">
                {loading ? (
                    <CircularProgress />
                ) : (
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell className="table_cell">Company Id</TableCell>
                                <TableCell className="table_cell">Company</TableCell>
                                <TableCell className="table_cell">Location</TableCell>
                                <TableCell className="table_cell">Created By</TableCell>
                                <TableCell className="table_cell">Website</TableCell>
                                <TableCell className="table_cell">Created On</TableCell>
                                <TableCell className="table_cell">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {companies.map((company) => (
                                <TableRow key={company._id}>
                                    <TableCell component="th" scope="row" className="table_cell">
                                    <img src={company.logo || 'https://img.icons8.com/?size=100&id=7819&format=png&color=C850F2'} alt={company.name} className="company_logo_img h-10" />
                                        <div>{company._id}</div>
                                    </TableCell>
                                    <TableCell className="table_cell">{company.name}</TableCell>
                                    <TableCell className="table_cell">{company.location || 'N/A'}</TableCell>
                                    <TableCell className="table_cell">{company.userId?.fullname || 'Unknown'}</TableCell>
                                    <TableCell className="table_cell">{company.website || 'N/A'}</TableCell>
                                    <TableCell className="table_cell">{new Date(company.createdAt).toLocaleDateString()}</TableCell>
                                    <TableCell className="table_cell">
                                        <Tooltip title="Delete Company">
                                            <IconButton 
                                                aria-label="delete" 
                                                color="error"
                                                onClick={() => handleDeleteClick(company._id, company.name)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </TableContainer>

            {/* Confirmation Dialog */}
            <Dialog
                open={deleteDialog.open}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Confirm Delete Company"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete the company "{deleteDialog.companyName}"? 
                        This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button 
                        onClick={handleConfirmDelete} 
                        color="error" 
                        autoFocus
                        disabled={deleteLoading}
                    >
                        {deleteLoading ? <CircularProgress size={24} /> : "Delete"}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default TableList;
