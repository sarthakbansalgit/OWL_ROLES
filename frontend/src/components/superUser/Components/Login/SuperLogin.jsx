import React, { useEffect, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';
// import AdminHome from '@/AdminHome'; // Import AdminHome component
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const SuperLogin = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "superUser", 
    });
    const { loading, user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(setLoading(true));

        const xhr = new XMLHttpRequest();
        xhr.open("POST", `${USER_API_END_POINT}/login`, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.withCredentials = true;

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                dispatch(setLoading(false));

                if (xhr.status === 200) {
                    const resData = JSON.parse(xhr.responseText);
                    if (resData.success) {
                        dispatch(setUser(resData.user));
                        navigate("/admin"); // Navigate to AdminHome upon login
                        toast.success(resData.message);
                    } else {
                        toast.error(resData.message || "Login failed");
                    }
                } else {
                    const errorRes = JSON.parse(xhr.responseText);
                    toast.error(errorRes.message || "Something went wrong");
                }
            }
        };

        xhr.onerror = function () {
            dispatch(setLoading(false));
            toast.error("Network Error");
        };

        xhr.send(JSON.stringify(input));
    };

    useEffect(() => {
        if (user && user.role === "superUser") {
            navigate("/supreme/adminHome"); 
        }
    }, [user, navigate]);

    return (
        <div className='superLoginBg h-screen m-0 p-0'>
            <div className='flex items-center justify-center max-w-7xl mx-auto '>
                <form onSubmit={submitHandler} className='w-1/2 bg-black text-white border border-gray-200 shadow shadow-zinc-300 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5'>Super User Login</h1>
                    <div className='my-2'>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="ajharsh@gmail.com"
                            className='text-black'
                        />
                    </div>

                    <div className='my-2'>
                        <Label>Password</Label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="Password"
                            className='text-black'
                        />
                    </div>
                    {
                        loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4">Login</Button>
                    }
                </form>
            </div>
        </div>
    )
}

export default SuperLogin;
