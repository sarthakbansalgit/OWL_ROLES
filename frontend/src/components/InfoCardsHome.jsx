import React from 'react'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"

const InfoCardsHome = () => {
  const features = [
    {
      icon: "https://img.icons8.com/?size=100&id=112468&format=png&color=7950F2",
      title: "Easy Job Search",
      desc: "Search & find your dream jobs with ease. Powerful filters and advanced search capabilities to find exactly what you're looking for."
    },
    {
      icon: "https://img.icons8.com/?size=100&id=53426&format=png&color=7950F2",
      title: "Companies Collaboration",
      desc: "Connect with top companies hiring. Direct access to company profiles, reviews, and insider information to make informed decisions."
    },
    {
      icon: "https://img.icons8.com/?size=100&id=o8REW0inhzbM&format=png&color=7950F2",
      title: "Learn Industry Concepts",
      desc: "Hand-picked courses and resources to help you maximize your knowledge and actually land that dream job. Learn with us!"
    },
    {
      icon: "https://img.icons8.com/?size=100&id=122812&format=png&color=7950F2",
      title: "Active Communities",
      desc: "Connect with like-minded professionals through blogs and discussions. Share experiences, grow your network, and find mentors!"
    }
  ]

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-6xl mx-auto px-4'>
      {features.map((feature, idx) => (
        <div key={idx} className='bg-white rounded-lg md:rounded-2xl p-4 md:p-6 shadow-md hover:shadow-lg border border-blue-100 transition-all hover:border-blue-300'>
          <div className='flex gap-3 md:gap-4 items-start'>
            <Avatar className='w-12 md:w-14 h-12 md:h-14 flex-shrink-0'>
              <AvatarImage src={feature.icon} alt={feature.title} />
              <AvatarFallback>IC</AvatarFallback>
            </Avatar>
            <div className='flex-1'>
              <h3 className='font-bold text-base md:text-lg text-gray-900 mb-1 md:mb-2'>
                {feature.title}
              </h3>
              <p className='text-gray-600 text-xs md:text-sm leading-relaxed'>
                {feature.desc}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default InfoCardsHome
