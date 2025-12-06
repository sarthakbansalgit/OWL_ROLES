import React from 'react';
import { Button } from '@mui/material';
import { USER_API_END_POINT } from '@/utils/constant';

const handleDownloadReport = async () => {
    try {
        const response = await fetch(`${USER_API_END_POINT}/report`, {
            method: 'GET',
            credentials: 'include', 
        });

        if (response.ok) {
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `user_report.pdf`;
            document.body.appendChild(a);
            a.click();
            a.remove();
        } else {
            console.error('Failed to download report');
        }
    } catch (error) {
        console.error('Error downloading report:', error);
    }
};


export const ReportDownloadButton = () => (
    <div className=' bg-black text-white rounded-2xl w-[14vw]'>
        <Button onClick={handleDownloadReport} >
            <span className='text-white text-[14px]'>Download Report (PDF)</span>
        </Button>
    </div>
);
