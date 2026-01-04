import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setCompanies } from '@/redux/companySlice';
import { Loader2, Upload, X } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';

const UpdateRecruiterCompanyDialog = ({ open, setOpen, company }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        website: '',
        location: '',
        logo: null
    });
    const [logoPreview, setLogoPreview] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (company) {
            setFormData({
                name: company.name || '',
                description: company.description || '',
                website: company.website || '',
                location: company.location || '',
                logo: null
            });
            setLogoPreview(company.logo || '');
        }
    }, [company, open]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleLogoChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                logo: file
            }));
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpdateCompany = async () => {
        if (!formData.name.trim()) {
            toast.error('Company name is required');
            return;
        }

        setLoading(true);
        try {
            const data = new FormData();
            data.append('name', formData.name);
            data.append('description', formData.description);
            data.append('website', formData.website);
            data.append('location', formData.location);
            if (formData.logo) {
                data.append('file', formData.logo);
            }

            const res = await axios.put(
                `${COMPANY_API_END_POINT}/update/${company._id}`,
                data,
                { withCredentials: true }
            );

            if (res.data.success) {
                dispatch(setCompanies([res.data.company]));
                toast.success('Company updated successfully!');
                setOpen(false);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update company');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-2xl bg-white rounded-2xl border border-sky-200/50 shadow-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-slate-900">Edit Your Company</DialogTitle>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    {/* Logo Section */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-900 mb-3">Company Logo</label>
                        <div className="flex items-center gap-6">
                            <Avatar className="h-24 w-24 ring-2 ring-sky-300">
                                <AvatarImage src={logoPreview} className="object-cover" />
                                <AvatarFallback className="bg-sky-200 text-sky-700 text-lg font-bold">
                                    {formData.name?.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <label className="flex-1 cursor-pointer">
                                <div className="border-2 border-dashed border-sky-300 rounded-lg p-4 hover:border-sky-500 hover:bg-sky-50 transition-all text-center">
                                    <Upload className="h-6 w-6 text-sky-600 mx-auto mb-2" />
                                    <p className="text-sm font-semibold text-sky-700">Upload Logo</p>
                                    <p className="text-xs text-slate-500 mt-1">PNG, JPG up to 5MB</p>
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleLogoChange}
                                    className="hidden"
                                />
                            </label>
                            {logoPreview && (
                                <button
                                    onClick={() => {
                                        setLogoPreview('');
                                        setFormData(prev => ({ ...prev, logo: null }));
                                    }}
                                    className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                                >
                                    <X className="h-5 w-5 text-red-500" />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Name */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-900 mb-2">Company Name</label>
                        <Input
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Your company name"
                            className="h-11 border-2 border-sky-200/50 focus-visible:ring-sky-500 text-base rounded-lg"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-900 mb-2">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Tell us about your company..."
                            rows="4"
                            className="w-full p-3 border-2 border-sky-200/50 focus-visible:ring-sky-500 text-base rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Website */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-900 mb-2">Website</label>
                            <Input
                                name="website"
                                value={formData.website}
                                onChange={handleInputChange}
                                placeholder="https://example.com"
                                className="h-11 border-2 border-sky-200/50 focus-visible:ring-sky-500 text-base rounded-lg"
                            />
                        </div>

                        {/* Location */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-900 mb-2">Location</label>
                            <Input
                                name="location"
                                value={formData.location}
                                onChange={handleInputChange}
                                placeholder="e.g., New York, NY"
                                className="h-11 border-2 border-sky-200/50 focus-visible:ring-sky-500 text-base rounded-lg"
                            />
                        </div>
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
                        onClick={handleUpdateCompany}
                        disabled={loading}
                        className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white rounded-lg h-10 px-6 font-semibold shadow-lg shadow-sky-200/50"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                Saving...
                            </>
                        ) : (
                            'Save Changes'
                        )}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateRecruiterCompanyDialog;
