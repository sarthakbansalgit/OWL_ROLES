import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button' 
import { useNavigate } from 'react-router-dom' 
import { useDispatch } from 'react-redux' 
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { setSearchJobByText } from '@/redux/jobSlice'
import { Briefcase, Plus, Search, TrendingUp } from 'lucide-react'

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);
  return (
    <div className='relative min-h-screen bg-gradient-to-b from-slate-50 via-white to-blue-50 overflow-hidden'>
      {/* Animated background elements */}
      <div className='auth-aurora fixed inset-0 opacity-40' />
      <div className='auth-aurora auth-aurora--two fixed inset-0 opacity-30' />
      <div className='auth-orb auth-orb--one fixed opacity-20' />
      <div className='auth-orb auth-orb--three fixed opacity-15' />
      
      <Navbar />
      <div className='max-w-7xl mx-auto my-10 md:my-14 px-4 md:px-6 lg:px-8 relative z-10'>
        {/* Header Section */}
        <div className='mb-12 md:mb-14 slide-in-down'>
          <div className='flex items-center gap-4 mb-4'>
            <div className='h-14 w-14 rounded-2xl bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 flex items-center justify-center shadow-lg'>
              <Briefcase className='h-7 w-7 text-white' />
            </div>
            <div>
              <h1 className='text-4xl md:text-5xl font-black text-slate-900 leading-tight drop-shadow-lg'>Jobs Management</h1>
              <p className='text-slate-600 text-lg font-medium mt-1'>Post, manage, and track all job openings across your institution</p>
            </div>
          </div>
        </div>

        {/* Search & Create Section */}
        <div className='flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 md:gap-6 mb-12 bg-gradient-to-r from-white via-sky-50 to-white rounded-3xl p-8 md:p-10 shadow-xl border border-sky-300/50 slide-in-left card-3d backdrop-blur-xl'>
          <div className='flex-1 relative'>
            <Search className='absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-sky-600' />
            <Input
              className="w-full pl-14 h-13 border-2 border-sky-300/60 focus-visible:ring-sky-500 text-base font-medium text-slate-900 placeholder:text-slate-500 rounded-2xl bg-white/80 focus:bg-white transition-all shadow-md"
              placeholder="🔍 Filter by job title, company name, location..."
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <Button onClick={() => navigate("/admin/jobs/create")} className='w-full md:w-auto bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-600 text-white font-bold text-base py-4 md:py-4 px-8 md:px-10 rounded-3xl shadow-[0_20px_100px_rgba(56,189,248,0.4)] hover:shadow-[0_30px_140px_rgba(56,189,248,0.6)] transition-all card-3d hover:scale-105 active:scale-95 h-13 flex items-center justify-center gap-2 whitespace-nowrap'>
            <Plus className='h-6 w-6' />
            Post New Job
          </Button>
        </div>
        <AdminJobsTable />
      </div>
    </div>
  )
}

export default AdminJobs