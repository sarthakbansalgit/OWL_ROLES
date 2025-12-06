import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal, Trash2 } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import DeleteCompanyDialog from './DeleteCompanyDialog'
import { format } from 'date-fns'

const CompaniesTable = ({ refreshCompanies }) => {
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filteredCompanies, setFilteredCompanies] = useState(companies);
    const [deleteDialogState, setDeleteDialogState] = useState({
        open: false,
        companyId: null
    });
    const navigate = useNavigate();
    
    useEffect(() => {
        const filtered = companies.filter(company => 
            !searchCompanyByText || 
            company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
        );
        setFilteredCompanies(filtered);
    }, [companies, searchCompanyByText]);
    
    return (
        <div className='rounded-lg md:rounded-2xl border border-gray-100 shadow-lg bg-white overflow-hidden'>
            {/* Desktop Table */}
            <div className='hidden md:block overflow-x-auto'>
                <Table>
                    <TableHeader className='bg-gradient-to-r from-purple-50 to-pink-50 border-b-2 border-purple-100'>
                        <TableRow className='hover:bg-purple-50'>
                            <TableHead className='w-[80px] text-gray-700 font-bold'>Logo</TableHead>
                            <TableHead className='min-w-[200px] text-gray-700 font-bold'>Company Name</TableHead>
                            <TableHead className='min-w-[200px] text-gray-700 font-bold'>Website</TableHead>
                            <TableHead className='min-w-[120px] text-gray-700 font-bold'>Created</TableHead>
                            <TableHead className='text-right w-[120px] text-gray-700 font-bold'>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    
                    <TableBody>
                        {filteredCompanies?.map((company) => (
                            <TableRow key={company._id} className='group hover:bg-purple-50 transition-colors border-b border-gray-100'>
                                <TableCell>
                                    <Avatar className='w-12 h-12 border-3 border-purple-200'>
                                        <AvatarImage 
                                            src={company.logo} 
                                            className='object-cover'
                                        />
                                        <AvatarFallback className='bg-gradient-to-br from-purple-100 to-pink-100 text-purple-700 font-bold'>
                                            {company.name[0]}
                                        </AvatarFallback>
                                    </Avatar>
                                </TableCell>
                                
                                <TableCell className='font-semibold text-gray-900'>
                                    {company.name}
                                </TableCell>

                                <TableCell>
                                    {company?.website ? (
                                        <a 
                                            href={company.website} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            className="text-purple-600 hover:text-purple-800 hover:underline text-sm truncate"
                                        >
                                            {company.website}
                                        </a>
                                    ) : (
                                        <span className="text-gray-400 text-sm">NA</span>
                                    )}
                                </TableCell>
                                
                                <TableCell className='text-gray-600 text-sm'>
                                    {format(new Date(company.createdAt), 'MMM dd')}
                                </TableCell>
                                
                                <TableCell className='text-right'>
                                    <Popover>
                                        <PopoverTrigger className='p-2 hover:bg-purple-100 rounded-full transition'>
                                            <MoreHorizontal className='w-5 h-5 text-gray-600' />
                                        </PopoverTrigger>
                                        
                                        <PopoverContent className='w-48 p-2 rounded-xl shadow-xl border border-purple-200 bg-white'>
                                            <div className='space-y-2'>
                                                <button 
                                                    onClick={() => navigate(`/admin/companies/${company._id}`)}
                                                    className='w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors text-sm font-medium'
                                                >
                                                    <Edit2 className='w-4 h-4' />
                                                    <span>Edit</span>
                                                </button>

                                                <button 
                                                    onClick={() => navigate(`/admin/jobs`)}
                                                    className='w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-purple-50 text-gray-700 hover:text-purple-600 transition-colors text-sm font-medium'
                                                >
                                                    <Eye className="h-4 w-4"/>
                                                    <span>View Jobs</span>
                                                </button>
                                                
                                                <button
                                                    onClick={() => setDeleteDialogState({
                                                        open: true,
                                                        companyId: company._id
                                                    })}
                                                    className='w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-50 text-red-600 hover:text-red-700 transition-colors text-sm font-medium'
                                                >
                                                    <Trash2 className='w-4 h-4' />
                                                    <span>Delete</span>
                                                </button>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Mobile Card View */}
            <div className='md:hidden space-y-4 p-4'>
                {filteredCompanies?.map((company) => (
                    <div key={company._id} className='bg-white border border-purple-100 rounded-lg p-4 hover:shadow-md transition-shadow'>
                        <div className='flex items-center justify-between mb-3'>
                            <div className='flex items-center gap-3'>
                                <Avatar className='w-10 h-10 border-2 border-purple-200'>
                                    <AvatarImage src={company.logo} className='object-cover'/>
                                    <AvatarFallback className='bg-gradient-to-br from-purple-100 to-pink-100 text-purple-700 font-bold text-sm'>
                                        {company.name[0]}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className='font-semibold text-gray-900 text-sm'>{company.name}</h3>
                                    <p className='text-xs text-gray-500'>{format(new Date(company.createdAt), 'MMM dd, yyyy')}</p>
                                </div>
                            </div>
                            <Popover>
                                <PopoverTrigger className='p-2 hover:bg-purple-100 rounded-full'>
                                    <MoreHorizontal className='w-5 h-5 text-gray-600' />
                                </PopoverTrigger>
                                <PopoverContent className='w-40 p-2 rounded-lg shadow-lg border border-purple-200'>
                                    <div className='space-y-1'>
                                        <button onClick={() => navigate(`/admin/companies/${company._id}`)} className='w-full flex items-center gap-2 px-2 py-1.5 rounded text-xs hover:bg-blue-50 text-blue-600'>
                                            <Edit2 className='w-3 h-3' /> Edit
                                        </button>
                                        <button onClick={() => navigate(`/admin/jobs`)} className='w-full flex items-center gap-2 px-2 py-1.5 rounded text-xs hover:bg-purple-50 text-purple-600'>
                                            <Eye className='w-3 h-3' /> Jobs
                                        </button>
                                        <button onClick={() => setDeleteDialogState({open: true, companyId: company._id})} className='w-full flex items-center gap-2 px-2 py-1.5 rounded text-xs hover:bg-red-50 text-red-600'>
                                            <Trash2 className='w-3 h-3' /> Delete
                                        </button>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>
                        {company?.website && (
                            <a href={company.website} target="_blank" rel="noopener noreferrer" className='text-xs text-purple-600 hover:underline truncate block'>
                                {company.website}
                            </a>
                        )}
                    </div>
                ))}
            </div>
            
            {filteredCompanies.length === 0 && (
                <div className='p-12 text-center'>
                    <p className='text-gray-500 text-base mb-2'>📭 No companies found</p>
                    <p className='text-gray-400 text-sm'>Try adjusting your search criteria</p>
                </div>
            )}

            <DeleteCompanyDialog
                open={deleteDialogState.open}
                setOpen={() => setDeleteDialogState(prev => ({ ...prev, open: false }))}
                companyId={deleteDialogState.companyId}
                onDeleteSuccess={refreshCompanies}
            />
        </div>
    )
}

export default CompaniesTable