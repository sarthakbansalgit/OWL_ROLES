import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2, Upload } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { setCompany } from '@/redux/companySlice'
import { toast } from 'sonner'

const UpdateCompanyDialog = ({ open, setOpen, company }) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    
    const [input, setInput] = useState({
        name: company?.name || "",
        description: company?.description || "",
        website: company?.website || "",
        location: company?.location || "",
        file: null
    });

    const [previewLogo, setPreviewLogo] = useState(company?.logo || null);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setInput({ ...input, file });
            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewLogo(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        
        if (!input.name.trim()) {
            toast.error('Company name is required');
            return;
        }

        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            setLoading(true);
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${company._id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });

            if (res.data.success) {
                // Re-fetch company data
                const companyRes = await axios.get(`${COMPANY_API_END_POINT}/get/${company._id}`, {
                    withCredentials: true
                });
                if (companyRes.data.success) {
                    dispatch(setCompany(companyRes.data.company));
                }
                toast.success('Company updated successfully');
                setOpen(false);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || 'Failed to update company');
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open}>
            <DialogContent className="sm:max-w-[600px]" onInteractOutside={() => setOpen(false)}>
                <DialogHeader>
                    <DialogTitle>Update Company Information</DialogTitle>
                </DialogHeader>
                <form onSubmit={submitHandler}>
                    <div className='grid gap-6 py-4'>
                        {/* Company Name */}
                        <div className='grid gap-2'>
                            <Label htmlFor="name">Company Name *</Label>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                value={input.name}
                                onChange={changeEventHandler}
                                placeholder="Enter company name"
                                className="col-span-3"
                            />
                        </div>

                        {/* Description */}
                        <div className='grid gap-2'>
                            <Label htmlFor="description">Description</Label>
                            <textarea
                                id="description"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                placeholder="Enter company description"
                                rows="4"
                                className="col-span-3 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Website */}
                        <div className='grid gap-2'>
                            <Label htmlFor="website">Website</Label>
                            <Input
                                id="website"
                                name="website"
                                type="url"
                                value={input.website}
                                onChange={changeEventHandler}
                                placeholder="https://example.com"
                                className="col-span-3"
                            />
                        </div>

                        {/* Location */}
                        <div className='grid gap-2'>
                            <Label htmlFor="location">Location</Label>
                            <Input
                                id="location"
                                name="location"
                                type="text"
                                value={input.location}
                                onChange={changeEventHandler}
                                placeholder="Enter company location"
                                className="col-span-3"
                            />
                        </div>

                        {/* Logo Upload */}
                        <div className='grid gap-2'>
                            <Label htmlFor="file">Company Logo</Label>
                            <div className='border-2 border-dashed border-gray-300 rounded-lg p-4'>
                                {previewLogo && (
                                    <div className="mb-4">
                                        <img 
                                            src={previewLogo} 
                                            alt="Logo preview" 
                                            className="h-20 w-20 object-cover rounded-lg"
                                        />
                                    </div>
                                )}
                                <label htmlFor="file" className='cursor-pointer flex items-center justify-center gap-2 text-blue-600 hover:text-blue-700'>
                                    <Upload className="h-5 w-5" />
                                    <span>Click to upload or drag and drop</span>
                                </label>
                                <Input
                                    id="file"
                                    name="file"
                                    type="file"
                                    onChange={fileChangeHandler}
                                    className="hidden"
                                    accept="image/*"
                                />
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button 
                            type="button" 
                            variant="outline"
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button 
                            type="submit" 
                            disabled={loading}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                    Updating...
                                </>
                            ) : (
                                'Update Company'
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateCompanyDialog;
