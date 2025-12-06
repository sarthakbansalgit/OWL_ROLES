
import React, { useContext, useState } from 'react';

// import sass file
import './navbar.scss';

// import images
import admin from '../../../../assets/superuser-dashboard/admin_pic.jpg';

function Navbar() {
    return (
        <div className="navbar">
            <div className="navbar_main flex flex-row-reverse">

                <div className="item_lists">
                        <div className="item   ">
                        <img className="admin_pic" src={admin} alt="admin" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
