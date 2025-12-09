import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { LogOut, User2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';
import DropDown from '../ui/drop-down';
// import UserFallBack from "@assets/user.png"

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    return (
        <nav className='bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200'>
            {/* Top Banner - responsive */}
            {user && user.role === 'recruiter' ? (
                <div className='flex gap-2 justify-center items-center py-2 md:py-3 bg-gradient-to-r from-blue-100 to-blue-100 border-b border-blue-200 px-4 flex-wrap'>
                    <span className='hidden sm:inline'>🚀</span>
                    <span className='text-blue-700 font-semibold text-xs md:text-sm'>Recruiter Dashboard Active</span>
                    <Popover>
                        <PopoverTrigger asChild>
                            <button className='ml-2 px-3 md:px-4 py-1 md:py-2 rounded-full bg-white border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition text-xs md:text-sm'>
                                Pro Features →
                            </button>
                        </PopoverTrigger>
                        <PopoverContent className="bg-white text-gray-900 p-4 rounded-xl border border-blue-200 shadow-lg">
                            <div className="flex items-center gap-2">
                                <span>⭐</span>
                                <p className="text-sm font-medium">Logout to visit homepage</p>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            ) : (
                <div className='flex gap-2 justify-center items-center py-2 md:py-3 bg-gradient-to-r from-blue-100 to-blue-100 border-b border-blue-200 px-4 flex-wrap'>
                    <span className='hidden sm:inline'>🚀</span>
                    <span className='text-blue-700 font-semibold text-xs md:text-sm'>Discover Amazing Opportunities</span>
                    <Link to='/pricing'>
                        <button className='ml-2 px-3 md:px-4 py-1 md:py-2 rounded-full bg-white border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition text-xs md:text-sm'>
                            Explore Pro →
                        </button>
                    </Link>
                </div>
            )}

            {/* Main Navbar */}
            <div className='flex items-center justify-between mx-auto max-w-7xl h-14 md:h-16 px-4'>
                {/* Logo */}
                <div>
                    {user && user.role === 'recruiter' ? (
                        <Popover>
                            <PopoverTrigger asChild>
                                <h1 className='font-bold text-xl md:text-3xl bg-gradient-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent cursor-pointer'>Owl Roles</h1>
                            </PopoverTrigger>
                            <PopoverContent className="bg-white text-gray-900 p-3 rounded-xl border border-blue-200 shadow-lg">
                                <div className="flex items-center gap-2">
                                    <span>😊</span>
                                    <p className="text-sm font-medium">Logout to visit homepage</p>
                                </div>
                            </PopoverContent>
                        </Popover>
                    ) : (
                        <Link to='/'><h1 className='font-bold text-xl md:text-3xl bg-gradient-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent'>Owl Roles</h1></Link>
                    )}
                </div>

                {/* Navigation Links - hidden on mobile */}
                <div className='hidden md:flex items-center gap-12'>
                    <ul className='flex font-semibold items-center gap-8'>
                        {user && user.role === 'recruiter' ? (
                            <>
                                <li className='text-gray-700 hover:text-blue-600 transition-colors cursor-pointer'><Link to="/admin/companies">Companies</Link></li>
                                <li className='text-gray-700 hover:text-blue-600 transition-colors cursor-pointer'><Link to="/admin/jobs">Jobs</Link></li>
                                <li className='text-gray-700 hover:text-blue-600 transition-colors cursor-pointer'><DropDown/></li>
                            </>
                        ) : (
                            <>
                                <li className='text-gray-700 hover:text-blue-600 transition-colors cursor-pointer'><Link to="/">Home</Link></li>
                                <li className='text-gray-700 hover:text-blue-600 transition-colors cursor-pointer'><Link to="/browse">Browse</Link></li>
                                <li className='text-gray-700 hover:text-blue-600 transition-colors cursor-pointer'><DropDown/></li>
                            </>
                        )}
                    </ul>

                    {/* Auth Section - desktop */}
                    {!user ? (
                        <div className='flex items-center gap-3'>
                            <Link to="/login"><Button variant="outline" className='border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold text-sm'>Login</Button></Link>
                            <Link to="/signup"><Button className="bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-700 hover:to-blue-700 text-white font-semibold text-sm shadow-lg shadow-black/40 hover:shadow-xl hover:shadow-black/50 transition-all duration-300">Signup</Button></Link>
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className="cursor-pointer border-3 border-blue-600 hover:border-blue-600 transition">
                                    <AvatarImage 
                                        src={user?.profile?.profilePhoto || "https://tse3.mm.bing.net/th/id/OIP.Wkn4_kVHLYYZOOy7FMnFXwHaHa?pid=ImgDet&w=188&h=188&c=7&dpr=1.5"} 
                                        alt="profile-img" 
                                    />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="w-80 bg-white border border-gray-200 rounded-2xl shadow-xl p-4">
                                <div className="space-y-4">
                                    {/* Profile Section */}
                                    <div className="flex gap-3 items-center">
                                        <Avatar className="w-12 h-12 border-2 border-blue-300">
                                            <AvatarImage 
                                                src={user?.profile?.profilePhoto || "https://tse3.mm.bing.net/th/id/OIP.Wkn4_kVHLYYZOOy7FMnFXwHaHa?pid=ImgDet&w=188&h=188&c=7&dpr=1.5"} 
                                                alt="@user" 
                                            />
                                        </Avatar>
                                        <div>
                                            <h4 className="font-bold text-gray-900 text-lg">{user?.fullname}</h4>
                                            <p className="text-gray-600 text-sm line-clamp-2">
                                                {user?.profile?.bio || user?.email}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Divider */}
                                    <div className="border-t border-gray-200" />

                                    {/* Menu Items */}
                                    <div className="space-y-2">
                                        {user?.role === 'student' && (
                                            <Link 
                                                to="/profile" 
                                                className="flex items-center justify-between p-3 rounded-lg hover:bg-blue-50 transition-colors"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <User2 className="w-5 h-5 text-blue-600" />
                                                    <span className="text-sm text-gray-900 font-medium">View Profile</span>
                                                </div>
                                                <span className="text-gray-400">→</span>
                                            </Link>
                                        )}

                                        <button 
                                            onClick={logoutHandler}
                                            className="w-full flex items-center text-white bg-black hover:bg-gray-900 gap-3 p-3 rounded-lg transition-all font-medium"
                                        >
                                            <LogOut className="w-5 h-5" />
                                            <span className="text-sm">Logout</span>
                                        </button>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>

                {/* Mobile Menu */}
                <div className='md:hidden flex items-center gap-2'>
                    {!user ? (
                        <div className='flex items-center gap-2'>
                            <Link to="/login"><Button variant="outline" className='border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold text-xs px-2 py-1'>Login</Button></Link>
                            <Link to="/signup"><Button className="bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-700 hover:to-blue-700 text-white font-semibold text-xs px-2 py-1 shadow-lg shadow-black/40 hover:shadow-xl hover:shadow-black/50 transition-all duration-300">Sign</Button></Link>
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className="cursor-pointer border-2 border-blue-600 hover:border-blue-600 transition w-10 h-10">
                                    <AvatarImage 
                                        src={user?.profile?.profilePhoto || "https://tse3.mm.bing.net/th/id/OIP.Wkn4_kVHLYYZOOy7FMnFXwHaHa?pid=ImgDet&w=188&h=188&c=7&dpr=1.5"} 
                                        alt="profile-img" 
                                    />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="w-72 bg-white border border-gray-200 rounded-2xl shadow-xl p-4">
                                <div className="space-y-4">
                                    <div className="flex gap-3 items-center">
                                        <Avatar className="w-10 h-10 border-2 border-blue-300">
                                            <AvatarImage 
                                                src={user?.profile?.profilePhoto || "https://tse3.mm.bing.net/th/id/OIP.Wkn4_kVHLYYZOOy7FMnFXwHaHa?pid=ImgDet&w=188&h=188&c=7&dpr=1.5"} 
                                                alt="@user" 
                                            />
                                        </Avatar>
                                        <div>
                                            <h4 className="font-bold text-gray-900">{user?.fullname}</h4>
                                            <p className="text-gray-600 text-xs line-clamp-1">
                                                {user?.email}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="border-t border-gray-200" />
                                    <div className="space-y-2">
                                        <Link to="/" className="block p-2 text-gray-700 hover:bg-blue-50 rounded text-sm">Home</Link>
                                        {user?.role !== 'recruiter' && <Link to="/browse" className="block p-2 text-gray-700 hover:bg-blue-50 rounded text-sm">Browse</Link>}
                                        {user?.role === 'recruiter' && <Link to="/admin/companies" className="block p-2 text-gray-700 hover:bg-blue-50 rounded text-sm">Companies</Link>}
                                        {user?.role === 'recruiter' && <Link to="/admin/jobs" className="block p-2 text-gray-700 hover:bg-blue-50 rounded text-sm">Jobs</Link>}
                                        {user?.role === 'student' && <Link to="/profile" className="block p-2 text-gray-700 hover:bg-blue-50 rounded text-sm">Profile</Link>}
                                        <button onClick={logoutHandler} className="w-full p-2 text-white bg-black hover:bg-gray-900 rounded text-sm font-medium">Logout</button>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;