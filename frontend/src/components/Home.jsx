import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Info1 from './Info1'
import InfoLast from './InfoLast'
import { Link } from 'react-router-dom'


const Home = () => {
  useGetAllJobs();
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate("/admin/companies");
    }
  }, []);
  return (
    <div className='bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 min-h-screen'>
      <Navbar/>
      <HeroSection />
      <CategoryCarousel />
      <LatestJobs />
      <Info1/>
      <InfoLast/>
      <Footer />
    </div>
  )
}

export default Home