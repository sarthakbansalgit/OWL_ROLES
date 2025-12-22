import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'
import { Building2, Plus, Search } from 'lucide-react';

const Companies = () => {
    const { refreshCompanies } = useGetAllCompanies();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchCompanyByText(input));
    }, [input, dispatch]);
    
    return (
        <div className='relative min-h-screen bg-gradient-to-b from-slate-50 via-white to-blue-50 overflow-hidden'>
            {/* Animated background elements */}
            <div className='auth-aurora fixed inset-0 opacity-30' />
            <div className='auth-aurora auth-aurora--two fixed inset-0 opacity-20' />
            <div className='auth-orb auth-orb--one fixed opacity-15' />
            
            <Navbar />
            <div className='max-w-7xl mx-auto my-8 md:my-12 px-4 relative z-10'>
                {/* Header Section */}
                <div className='mb-10 md:mb-12 slide-in-down'>
                    <div className='flex items-center gap-3 mb-3'>
                        <Building2 className='h-8 w-8 text-sky-600' />
                        <h1 className='text-4xl md:text-5xl font-bold text-slate-900 drop-shadow-lg'>Companies Directory</h1>
                    </div>
                    <p className='text-slate-600 text-lg font-medium'>Manage and view all registered companies across your institution</p>
                </div>

                {/* Search & Create Section */}
                <div className='flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 md:gap-6 mb-10 bg-gradient-to-r from-white via-sky-50 to-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg border border-sky-300/50 slide-in-left card-3d backdrop-blur-xl'>
                    <div className='flex-1 relative'>
                        <Search className='absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-sky-600' />
                        <Input
                            className="w-full pl-12 h-12 border-2 border-sky-300/60 focus-visible:ring-sky-500 text-base font-medium text-slate-900 placeholder:text-slate-500 rounded-xl bg-white/80 focus:bg-white transition-all"
                            placeholder="🔍 Search by company name..."
                            onChange={(e) => setInput(e.target.value)}
                        />
                    </div>
                    <Button 
                        onClick={() => navigate("/admin/companies/create")} 
                        className='w-full md:w-auto bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-600 hover:from-sky-600 hover:via-blue-600 hover:to-indigo-700 text-white font-bold text-base py-3 md:py-3 px-8 md:px-8 rounded-xl shadow-lg hover:shadow-xl transition-all card-3d hover:scale-105 h-12 flex items-center justify-center gap-2'>
                        <Plus className='h-5 w-5' />
                        Register Company
                    </Button>
                </div>
                <CompaniesTable refreshCompanies={refreshCompanies} />
            </div>
        </div>
    )
}

export default Companies