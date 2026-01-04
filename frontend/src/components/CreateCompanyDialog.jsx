import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setCompanies } from '@/redux/companySlice';
import { Loader2 } from 'lucide-react';

const CreateCompanyDialog = ({ open, setOpen }) => {
    const [companyName, setCompanyName] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleCreateCompany = async () => {
        if (!companyName.trim()) {
            toast.error('Please enter company name');
            return;
        }

        setLoading(true);
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, 
                { companyName: companyName.trim() },
                { withCredentials: true }
            );
            
            if (res.data.success) {
                dispatch(setCompanies([res.data.company]));
                toast.success('Company created successfully!');
                setCompanyName('');
                setOpen(false);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to create company');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-md bg-white rounded-2xl border border-sky-200/50 shadow-2xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-slate-900">Create Your Company</DialogTitle>
                    <DialogDescription className="text-slate-600 mt-2">
                        Enter your company name to get started
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div>
                        <label className="block text-sm font-semibold text-slate-900 mb-2">Company Name</label>
                        <Input
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            placeholder="e.g., Acme Corporation"
                            className="h-11 border-2 border-sky-200/50 focus-visible:ring-sky-500 text-base rounded-lg"
                            onKeyPress={(e) => e.key === 'Enter' && handleCreateCompany()}
                        />
                    </div>
                </div>

                <div className="flex gap-3 justify-end">
                    <Button
                        variant="outline"
                        onClick={() => setOpen(false)}
                        className="border-sky-300 text-sky-700 hover:bg-sky-50 rounded-lg h-10 px-6 font-semibold"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleCreateCompany}
                        disabled={loading}
                        className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white rounded-lg h-10 px-6 font-semibold shadow-lg shadow-sky-200/50"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                Creating...
                            </>
                        ) : (
                            'Create Company'
                        )}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CreateCompanyDialog;
