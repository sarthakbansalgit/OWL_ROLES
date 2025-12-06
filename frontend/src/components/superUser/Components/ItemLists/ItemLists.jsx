// import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import HailOutlinedIcon from '@mui/icons-material/HailOutlined';
import React from 'react';
import { Link } from 'react-router-dom';
import './itemlists.scss';

function ItemLists({ type, count }) {
    let data;

    switch (type) {
        case 'Applicants':
            data = {
                title: 'Applicants',
                isMoney: false,
                count: count, // Use the count prop
                icon: (
                    <PermIdentityIcon
                        style={{
                            color: '#FF74B1',
                            backgroundColor: '#FFD6EC',
                        }}
                        className="icon"
                    />
                ),
                link: 'See all users',
                linkto: '/supreme/applicants',
            };
            break;
        case 'Recruiter':
            data = {
                title: 'Recruiters',
                isMoney: false,
                count: count, // Use the count prop
                icon: (
                    <HailOutlinedIcon
                        style={{
                            color: '#74B1FF',
                            backgroundColor: '#D6ECFF',
                        }}
                        className="icon"
                    />
                ),
                link: 'See all recruiters',
                linkto: '/supreme/recruiters',
            };
            break;

        case 'Companies':
            data = {
                title: 'Companies',
                isMoney: false,
                count: count, // Use the count prop
                icon: (
                    <BusinessOutlinedIcon
                        style={{
                            color: '#367E18',
                            backgroundColor: '#A7FFE4',
                        }}
                        className="icon"
                    />
                ),
                link: 'See all Companies',
                linkto: '/supreme/Companies',
            };
            break;
        default:
            break;
    }

    return (
        <div className="item_listss">
            <div className="name">
                <p>{data.title}</p>
                {/* <span className="persentage positive">
                    <KeyboardArrowUpIcon />
                    20 %
                </span> */}
            </div>

            <div className="counts">
                {data.isMoney && <BusinessOutlinedIcon />}
                {data.count}
            </div>

            <div className="see_item">
                <Link to={data.linkto}>
                    <p>{data.link}</p>
                </Link>
                {data.icon}
            </div>
        </div>
    );
}

export default ItemLists;
