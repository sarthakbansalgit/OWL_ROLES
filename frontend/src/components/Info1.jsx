import React from 'react'
import { Button } from './ui/button'
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card"

  import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
  } from "@/components/ui/command"
import { Link } from 'react-router-dom'

import jobSeekerImage from "../assets/job-seeker-50.png"
import looperPattern from "/looper-pattern.svg"

const Info1 = () => {
  return (
    <div className="py-12 md:py-20 bg-gradient-to-b from-transparent via-blue-50 to-blue-50 w-full">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="mb-12 md:mb-16">
          <h1 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-2 md:mb-4" data-aos="fade-in">
            Accessibility <span className="bg-gradient-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent">out of the box.</span>
          </h1>
          <p className="text-sm md:text-lg lg:text-xl text-gray-600 font-medium max-w-2xl" data-aos="fade-in">
            Empowering everyone with <span className="font-bold">opportunities</span> - explore accessible and inclusive job listings tailored for all...
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-4 md:space-y-6" data-aos="fade-in">
            <div className="grid gap-3 md:gap-4">
              {[
                "Jobs search made easy",
                "Companies Collab Benefits",
                "Grow & Upskill With Us",
                "Job Alerts To Stay Updated",
                "Stay Connected With Experts",
                "Experience Sharing Communities"
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2 md:gap-3 p-3 md:p-4 bg-white rounded-lg shadow-md hover:shadow-lg border border-blue-100 transition-all">
                  <span className="text-lg md:text-2xl flex-shrink-0">✓</span>
                  <span className="text-sm md:text-base text-gray-800 font-medium">{feature}</span>
                </div>
              ))}
            </div>
            <Link to="/learn-more">
              <Button className="mt-4 md:mt-6 bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-700 hover:to-blue-700 text-white font-semibold py-2 md:py-3 px-4 md:px-6 rounded-lg text-sm md:text-base">
                Learn More →
              </Button>
            </Link>
          </div>

          {/* Right Card */}
          <div className="flex justify-center mt-8 md:mt-0">
            <div className="bg-gradient-to-br from-blue-500 via-blue-500 to-blue-600 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl text-white w-full max-w-sm">
              <div className="flex justify-end mb-3 md:mb-4">
                <HoverCard>
                  <HoverCardTrigger className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-blue-600 font-bold cursor-pointer text-sm">
                    ⓘ
                  </HoverCardTrigger>
                  <HoverCardContent className="bg-white text-gray-900 text-sm">
                    We helped thousands of users to get their dream job! 🎉
                  </HoverCardContent>
                </HoverCard>
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Quick Access</h3>
              <div className="space-y-2 md:space-y-3">
                <Link to="/profile" className="block p-2 md:p-3 bg-white/20 rounded-lg hover:bg-white/30 transition text-sm md:text-base">
                  → Applications
                </Link>
                <Link to="/jobs" className="block p-2 md:p-3 bg-white/20 rounded-lg hover:bg-white/30 transition text-sm md:text-base">
                  → Browse Jobs
                </Link>
                <Link to="/profile" className="block p-2 md:p-3 bg-white/20 rounded-lg hover:bg-white/30 transition text-sm md:text-base">
                  → Your Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Info1
