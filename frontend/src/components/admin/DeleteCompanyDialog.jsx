import React, { useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';
import { COMPANY_API_END_POINT } from '@/utils/constant';

const DeleteCompanyDialog = ({ open, setOpen, companyId, onDeleteSuccess }) => {
    const [loading, setLoading] = useState(false);

    const deleteHandler = async () => {
        if (!companyId) {
            toast.error('No company selected for deletion');
            return;
        }
        
        try {
            setLoading(true);
            const res = await axios.delete(`${COMPANY_API_END_POINT}/delete/${companyId}`, {
                withCredentials: true,
            });

            if (res.data.success) {
                toast.success('Company deleted successfully');
                if (typeof setOpen === 'function') {
                    setOpen(false); 
                } else if (typeof setOpen === 'object' && setOpen.open !== undefined) {
                    setOpen({ open: false, companyId: null });
                }
                
                // Call the success callback to refresh the list
                if (onDeleteSuccess && typeof onDeleteSuccess === 'function') {
                    onDeleteSuccess();
                }
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Failed to delete company');
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        if (typeof setOpen === 'function') {
            setOpen(false);
        } else if (typeof setOpen === 'object' && setOpen.open !== undefined) {
            setOpen({ open: false, companyId: null });
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Are you sure you want to delete this company?</DialogTitle>
                    <p className='text-sm pt-4'>*Deleting this company cannot be recovered and all the data related to it will be lost permanently</p>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={handleClose} disabled={loading}>
                        Cancel
                    </Button>
                    <Button onClick={deleteHandler} disabled={loading}>
                        {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : 'Confirm'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteCompanyDialog;