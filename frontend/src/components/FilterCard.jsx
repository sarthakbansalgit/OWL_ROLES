import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const fitlerData = [
    {
        fitlerType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        fitlerType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
    },
    {
        fitlerType: "Salary",
        array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
    },
]

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();
    const changeHandler = (value) => {
        setSelectedValue(value);
    }
    
    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue));
    }, [selectedValue, dispatch]);

    return (
        <div className='w-full bg-white rounded-lg md:rounded-2xl p-4 md:p-6 shadow-lg border border-blue-100'>
            <h1 className='font-bold text-lg md:text-2xl text-gray-900 mb-3 md:mb-4'>🔍 Filter Jobs</h1>
            <hr className='mb-4 md:mb-6 border-gray-200' />
            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                {fitlerData.map((data, index) => (
                    <div key={`filter-type-${index}`} className='mb-4 md:mb-6'>
                        <h2 className='font-bold text-base md:text-lg text-gray-900 mb-2 md:mb-3'>{data.fitlerType}</h2>
                        <div className='space-y-2 md:space-y-3'>
                            {data.array.map((item, idx) => {
                                const itemId = `id${index}-${idx}`
                                return (
                                    <div key={`filter-item-${index}-${idx}`} className='flex items-center space-x-2 md:space-x-3 p-2 rounded-lg hover:bg-blue-50 transition-colors'>
                                        <RadioGroupItem value={item} id={itemId} className='text-blue-600' />
                                        <Label htmlFor={itemId} className='cursor-pointer text-gray-700 font-medium text-sm md:text-base'>{item}</Label>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                ))}
            </RadioGroup>
        </div>
    )
}

export default FilterCard