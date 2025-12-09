import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Loader2 } from 'lucide-react'

const companyArray = [];

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    });
    const [loading, setLoading]= useState(false);
    const navigate = useNavigate();

    const { companies } = useSelector(store => store.company);
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company)=> company.name.toLowerCase() === value);
        setInput({...input, companyId:selectedCompany._id});
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            if (!input.title || !input.description || !input.location || !input.companyId) {
                toast.error("Please fill all required fields");
                return;
            }
            setLoading(true);
            console.log("Posting job:", input);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input,{
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            });
            console.log("Response:", res);
            if(res.data.success){
                toast.success(res.data.message);
                setInput({
                    title: "",
                    description: "",
                    requirements: "",
                    salary: "",
                    location: "",
                    jobType: "",
                    experience: "",
                    position: 0,
                    companyId: ""
                });
                setTimeout(() => navigate("/admin/jobs"), 500);
            } else {
                toast.error(res.data.message || "Failed to post job");
            }
        } catch (error) {
            console.log("Error:", error);
            toast.error(error?.response?.data?.message || "Error posting job");
        } finally{
            setLoading(false);
        }
    }

    return (
        <div className='bg-gradient-to-br from-blue-50 via-blue-50 to-blue-50 min-h-screen'>
            <Navbar />

            <div className='flex items-center justify-center w-full my-4 md:my-5 px-4'>
                
                <form onSubmit = {submitHandler} className='p-4 md:p-8 max-w-4xl w-full border-2 border-blue-200 shadow-2xl rounded-lg md:rounded-2xl bg-white'>
                    {/* Back Button */}
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 p-2 mb-4 md:mb-6 rounded-lg text-xs md:text-sm text-white bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-700 hover:to-blue-700 transition-all"
                    >
                        <ArrowLeft className="h-4 md:h-5 w-4 md:w-5" />
                        <span className="font-medium">Back</span>
                    </button>

                    <h1 className='text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6'>Post a New Job</h1>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4'>
                        
                        <div>
                            <Label className='font-semibold text-gray-700 text-sm md:text-base'>Job Title *</Label>
                            <Input
                                type="text"
                                name="title"
                                placeholder="e.g., Senior Developer"
                                value={input.title}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-blue-500 border-gray-200 mt-1 text-sm"
                            />
                        </div>
                        <div>
                            <Label className='font-semibold text-gray-700 text-sm md:text-base'>Description *</Label>
                            <Input
                                type="text"
                                name="description"
                                placeholder="Job description"
                                value={input.description}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-blue-500 border-gray-200 mt-1 text-sm"
                            />
                        </div>
                        <div>
                            <Label className='font-semibold text-gray-700 text-sm md:text-base'>Requirements</Label>
                            <Input
                                type="text"
                                name="requirements"
                                placeholder="e.g., React, Node.js, MongoDB"
                                value={input.requirements}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-blue-500 border-gray-200 mt-1 text-sm"
                            />
                        </div>
                        <div>
                            <Label className='font-semibold text-gray-700 text-sm md:text-base'>Salary (LPA) *</Label>
                            <Input
                                type="number"
                                name="salary"
                                value={input.salary}
                                placeholder="e.g., 12"
                                onChange={changeEventHandler}
                                className="focus-visible:ring-blue-500 border-gray-200 mt-1 text-sm"
                            />
                        </div>
                        <div>
                            <Label className='font-semibold text-gray-700 text-sm md:text-base'>Location *</Label>
                            <Input
                                type="text"
                                name="location"
                                placeholder="e.g., New York"
                                value={input.location}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-blue-500 border-gray-200 mt-1 text-sm"
                            />
                        </div>
                        <div>
                            <Label className='font-semibold text-gray-700 text-sm md:text-base'>Job Type *</Label>
                            <Input
                                type="text"
                                name="jobType"
                                placeholder="e.g., Full-time"
                                value={input.jobType}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-blue-500 border-gray-200 mt-1 text-sm"
                            />
                        </div>
                        <div>
                            <Label className='font-semibold text-gray-700 text-sm md:text-base'>Experience Level (years)</Label>
                            <Input
                                type="number"
                                name="experience"
                                placeholder="e.g., 2"
                                value={input.experience}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-blue-500 border-gray-200 mt-1 text-sm"
                            />
                        </div>
                        <div>
                            <Label className='font-semibold text-gray-700 text-sm md:text-base'>No. of Positions *</Label>
                            <Input
                                type="number"
                                name="position"
                                placeholder="e.g., 3"
                                value={input.position}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-blue-500 border-gray-200 mt-1 text-sm"
                            />
                        </div>
                        {
                            companies.length > 0 && (
                                <div className='col-span-1 md:col-span-2'>
                                    <Label className='font-semibold text-gray-700 text-sm md:text-base'>Select Company *</Label>
                                    <Select onValueChange={selectChangeHandler}>
                                        <SelectTrigger className="border-gray-200 mt-1 text-sm">
                                            <SelectValue placeholder="Select a Company" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {
                                                    companies.map((company) => {
                                                        return (
                                                            <SelectItem key={company._id} value={company?.name?.toLowerCase()}>{company.name}</SelectItem>
                                                        )
                                                    })
                                                }

                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            )
                        }
                    </div> 
                    {
                        loading ? <Button className="w-full my-4 md:my-6 bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-700 hover:to-blue-700 text-sm md:text-base"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4 md:my-6 bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-700 hover:to-blue-700 text-white font-semibold py-2 md:py-3 rounded-lg text-sm md:text-base">Post Job</Button>
                    }
                    {
                        companies.length === 0 && <p className='text-xs md:text-sm text-red-600 font-semibold text-center my-3 bg-red-50 p-3 rounded-lg'>*Please register a company first, before posting a job</p>
                    }
                </form>
                
            </div>
        </div>
    )
}

export default PostJob