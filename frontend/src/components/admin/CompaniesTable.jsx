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
        <div className='rounded-2xl border border-sky-300/50 shadow-xl bg-white/95 overflow-hidden backdrop-blur card-3d scale-in'>
            {/* Desktop Table */}
            <div className='hidden md:block overflow-x-auto'>
                <Table>
                    <TableHeader className='bg-gradient-to-r from-sky-100 via-blue-100 to-indigo-100 border-b-2 border-sky-300/60'>
                        <TableRow className='hover:bg-sky-50'>
                            <TableHead className='w-[80px] text-slate-700 font-bold text-sm'>Logo</TableHead>
                            <TableHead className='min-w-[200px] text-slate-700 font-bold text-sm'>Company Name</TableHead>
                            <TableHead className='min-w-[200px] text-slate-700 font-bold text-sm'>Website</TableHead>
                            <TableHead className='min-w-[120px] text-slate-700 font-bold text-sm'>Created</TableHead>
                            <TableHead className='text-right w-[120px] text-slate-700 font-bold text-sm'>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    
                    <TableBody>
                        {filteredCompanies?.map((company, idx) => (
                            <TableRow key={company._id} className={`group hover:bg-sky-50/80 transition-all duration-300 border-b border-sky-200/50 hover:border-sky-300 stagger-item-${(idx % 5) + 1} slide-in-up`}>
                                <TableCell>
                                    <Avatar className='w-12 h-12 border-3 border-sky-300/60 card-3d group-hover:scale-110 transition-transform'>
                                        <AvatarImage 
                                            src={company.logo} 
                                            className='object-cover'
                                        />
                                        <AvatarFallback className='bg-gradient-to-br from-sky-100 to-blue-100 text-sky-700 font-bold text-sm'>
                                            {company.name[0]}
                                        </AvatarFallback>
                                    </Avatar>
                                </TableCell>
                                
                                <TableCell className='font-bold text-slate-900 text-base group-hover:text-sky-600 transition-colors'>
                                    {company.name}
                                </TableCell>

                                <TableCell>
                                    {company?.website ? (
                                        <a 
                                            href={company.website} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            className="text-sky-600 hover:text-sky-800 hover:underline text-sm truncate font-medium"
                                        >
                                            {company.website}
                                        </a>
                                    ) : (
                                        <span className="text-slate-400 text-sm">NA</span>
                                    )}
                                </TableCell>
                                
                                <TableCell className='text-slate-600 text-sm font-semibold'>
                                    {format(new Date(company.createdAt), 'MMM dd')}
                                </TableCell>
                                
                                <TableCell className='text-right'>
                                    <Popover>
                                        <PopoverTrigger className='p-2 hover:bg-sky-200 rounded-full transition card-3d hover:scale-110'>
                                            <MoreHorizontal className='w-5 h-5 text-slate-600 group-hover:text-sky-600 transition-colors' />
                                        </PopoverTrigger>
                                        
                                        <PopoverContent className='w-48 p-3 rounded-xl shadow-2xl border border-sky-300/60 bg-white'>
                                            <div className='space-y-2'>
                                                <button 
                                                    onClick={() => navigate(`/admin/companies/${company._id}`)}
                                                    className='w-full flex items-center gap-3 px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-400 to-blue-500 text-white transition-all font-semibold text-sm card-3d hover:shadow-[0_10px_40px_rgba(56,189,248,0.4)] hover:scale-105 active:scale-95'
                                                >
                                                    <Edit2 className='w-4 h-4' />
                                                    <span>Edit</span>
                                                </button>

                                                <button 
                                                    onClick={() => navigate(`/admin/jobs`)}
                                                    className='w-full flex items-center gap-3 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-400 to-indigo-500 text-white transition-all font-semibold text-sm card-3d hover:shadow-[0_10px_40px_rgba(99,102,241,0.4)] hover:scale-105 active:scale-95'
                                                >
                                                    <Eye className="h-4 w-4"/>
                                                    <span>View Jobs</span>
                                                </button>
                                                
                                                <button
                                                    onClick={() => setDeleteDialogState({
                                                        open: true,
                                                        companyId: company._id
                                                    })}
                                                    className='w-full flex items-center gap-3 px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-400 to-red-500 text-white transition-all font-semibold text-sm card-3d hover:shadow-[0_10px_40px_rgba(239,68,68,0.4)] hover:scale-105 active:scale-95'
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
            <div className='md:hidden space-y-4 p-5'>
                {filteredCompanies?.map((company, idx) => (
                    <div key={company._id} className={`bg-gradient-to-br from-white to-sky-50/50 border border-sky-300/50 rounded-xl p-5 hover:shadow-lg transition-all card-3d stagger-item-${(idx % 3) + 1} slide-in-up hover:border-sky-400`}>
                        <div className='flex items-center justify-between mb-4'>
                            <div className='flex items-center gap-4'>
                                <Avatar className='w-12 h-12 border-3 border-sky-300/60 card-3d'>
                                    <AvatarImage src={company.logo} className='object-cover'/>
                                    <AvatarFallback className='bg-gradient-to-br from-sky-100 to-blue-100 text-sky-700 font-bold text-sm'>
                                        {company.name[0]}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className='font-bold text-slate-900 text-sm'>{company.name}</h3>
                                    <p className='text-xs text-slate-500 font-medium'>{format(new Date(company.createdAt), 'MMM dd, yyyy')}</p>
                                </div>
                            </div>
                            <Popover>
                                <PopoverTrigger className='p-2 hover:bg-sky-200 rounded-full transition card-3d'>
                                    <MoreHorizontal className='w-5 h-5 text-slate-600' />
                                </PopoverTrigger>
                                <PopoverContent className='w-44 p-2 rounded-xl shadow-xl border border-sky-300/60'>
                                    <div className='space-y-2'>
                                        <button onClick={() => navigate(`/admin/companies/${company._id}`)} className='w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs bg-gradient-to-r from-sky-400 to-blue-500 text-white font-semibold card-3d hover:scale-105 active:scale-95'>
                                            <Edit2 className='w-4 h-4' /> Edit
                                        </button>
                                        <button onClick={() => navigate(`/admin/jobs`)} className='w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs bg-gradient-to-r from-blue-400 to-indigo-500 text-white font-semibold card-3d hover:scale-105 active:scale-95'>
                                            <Eye className='w-4 h-4' /> Jobs
                                        </button>
                                        <button onClick={() => setDeleteDialogState({open: true, companyId: company._id})} className='w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs bg-gradient-to-r from-rose-400 to-red-500 text-white font-semibold card-3d hover:scale-105 active:scale-95'>
                                            <Trash2 className='w-4 h-4' /> Delete
                                        </button>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>
                        {company?.website && (
                            <a href={company.website} target="_blank" rel="noopener noreferrer" className='text-xs text-sky-600 hover:text-sky-700 hover:underline truncate block font-semibold'>
                                {company.website}
                            </a>
                        )}
                    </div>
                ))}
            </div>
            
            {filteredCompanies.length === 0 && (
                <div className='p-16 text-center slide-in-down'>
                    <p className='text-slate-500 text-lg font-bold mb-2'>📭 No companies found</p>
                    <p className='text-slate-400 text-base'>Try adjusting your search criteria</p>
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