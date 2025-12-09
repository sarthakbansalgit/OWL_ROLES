import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'

const Companies = () => {
    const { refreshCompanies } = useGetAllCompanies();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchCompanyByText(input));
    }, [input, dispatch]);
    
    return (
        <div className='bg-gradient-to-br from-blue-50 via-blue-50 to-blue-50 min-h-screen'>
            <Navbar />
            <div className='max-w-7xl mx-auto my-6 md:my-10 px-4'>
                {/* Header Section */}
                <div className='mb-8 md:mb-10'>
                    <h1 className='text-2xl md:text-4xl font-bold text-gray-900 mb-2'>🏢 Companies</h1>
                    <p className='text-gray-600 text-sm md:text-base'>Manage and view all registered companies</p>
                </div>

                {/* Search & Create Section */}
                <div className='flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 md:gap-6 mb-8 bg-white rounded-lg md:rounded-2xl p-4 md:p-6 shadow-lg border border-blue-100'>
                    <Input
                        className="flex-1 border-gray-200 focus-visible:ring-blue-500 text-sm md:text-base"
                        placeholder="🔍 Filter by company name"
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button onClick={() => navigate("/admin/companies/create")} className='w-full md:w-auto bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-700 hover:to-blue-700 text-white font-semibold text-sm md:text-base py-2 md:py-3 px-4 md:px-6 rounded-lg'>
                        ➕ Register Company
                    </Button>
                </div>
                <CompaniesTable refreshCompanies={refreshCompanies} />
            </div>
        </div>
    )
}

export default Companies