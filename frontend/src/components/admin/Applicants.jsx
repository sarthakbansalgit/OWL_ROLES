import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAllApplicants } from '@/redux/applicationSlice'
import { Skeleton } from '@mui/material'

const Applicants = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const { applicants } = useSelector(store => store.application)
    const [isLoading, setIsLoading] = useState(true)
    const [applicantsRefresh, setApplicantsRefresh] = useState(false)

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                setIsLoading(true)
                const res = await axios.get(
                    `${APPLICATION_API_END_POINT}/${params.id}/applicants`, 
                    { withCredentials: true }
                )
                dispatch(setAllApplicants(res.data.job))
            } catch (error) {
                console.error('Error fetching applicants:', error)
            } finally {
                setIsLoading(false)
            }
        }
        
        fetchAllApplicants()
    }, [params.id, applicantsRefresh, dispatch])

    const triggerRefresh = () => setApplicantsRefresh(prev => !prev)

    return (
        <div className='min-h-screen bg-gray-50'>
            <Navbar />
            
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
                {/* Header Section */}
                <div className='mb-8 border-sm pb-6'>
                    <h1 className='text-3xl font-bold text-gray-900'>
                        Applicants
                        {!isLoading && (
                            <span className='ml-2 text-gray-500'>
                                ({applicants?.applications?.length || 0})
                            </span>
                        )}
                    </h1>
                    <p className='mt-2 text-gray-600'>
                        Manage and review all applicants for this position
                    </p>
                </div>

                {/* Loading State */}
                {isLoading ? (
                    <div className='space-y-4'>
                        <Skeleton className='h-12 w-full' />
                        <Skeleton className='h-12 w-full' />
                        <Skeleton className='h-12 w-full' />
                    </div>
                ) : (
                    /* Applicants Table */
                    <div className='bg-white rounded-lg shadow-sm border'>
                        <ApplicantsTable triggerRefresh={triggerRefresh} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default Applicants