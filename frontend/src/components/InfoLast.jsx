import React from 'react'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'

import calenderIcon from "../assets/icons8-calender-58.png"
const InfoLast = () => {
  return (
    <div className='bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 py-12 md:py-20 w-full'>
      <div className='max-w-7xl mx-auto px-4'>
        {/* Header */}
        <div className='mb-12 md:mb-16'>
          <h2 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900" data-aos='fade-in'>
            Let's make your <span className='bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'>Dream True</span>
          </h2>
        </div>

        {/* Cards Grid */}
        <div className='grid md:grid-cols-2 gap-6 md:gap-8'>
          {[
            {
              title: "🚀 Getting Started",
              desc: "Kickstart your career journey with endless opportunities—find your perfect job match today!"
            },
            {
              title: "💼 Career Growth",
              desc: "Accelerate your professional development with mentorship and growth opportunities from industry experts."
            }
          ].map((item, idx) => (
            <div key={idx} data-aos='fade-right' className='bg-white rounded-lg md:rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl border border-purple-100 transition-all hover:border-purple-300'>
              <h3 className='text-lg md:text-2xl font-bold text-gray-900 mb-2 md:mb-3'>
                {item.title}
              </h3>
              <p className='text-gray-600 text-sm md:text-base lg:text-lg leading-relaxed'>
                "{item.desc}"
              </p>
              <div className='mt-4 md:mt-6'>
                <Link to="/jobs">
                  <Button className='bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold text-sm md:text-base'>
                    Explore Now →
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className='grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 mt-12 md:mt-16'>
          {[
            { number: "10K+", label: "Jobs Posted" },
            { number: "50K+", label: "Active Users" },
            { number: "5K+", label: "Successful Hires" }
          ].map((stat, idx) => (
            <div key={idx} className='bg-white rounded-lg md:rounded-xl p-4 md:p-6 shadow-md text-center border border-gray-200 hover:border-purple-300 transition'>
              <p className='text-2xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'>{stat.number}</p>
              <p className='text-gray-600 font-medium mt-1 md:mt-2 text-xs md:text-base'>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default InfoLast
