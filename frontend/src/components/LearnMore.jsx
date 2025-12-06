import React from 'react';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';
import { Link } from 'react-router-dom';
import { Rocket, Bell, Users, BookOpen, BarChart, MessageCircle } from 'lucide-react';

const features = [
  { icon: Rocket, title: 'Jobs search made easy', description: 'Find jobs effortlessly with tailored filters and smart recommendations.' },
  { icon: Bell, title: 'Job Alerts To Stay Updated', description: 'Receive notifications for new job postings that match your profile.' },
  { icon: Users, title: 'Companies Collab Benefits', description: 'Discover companies that prioritize inclusivity and collaboration.' },
  { icon: MessageCircle, title: 'Stay Connected With Experts', description: 'Join a network of experts to get career advice and support.' },
  { icon: BookOpen, title: 'Grow & Upskill With Us', description: 'Access resources and programs to advance your career skills.' },
  { icon: BarChart, title: 'Experience Sharing Communities', description: 'Engage in communities to share experiences and learn together.' }
];

const jobTips = [
  'Tailor your resume to each job application, highlighting relevant skills and experiences.',
  'Build a strong LinkedIn profile and connect with recruiters in your field.',
  'Consider freelance or internship opportunities to gain experience if you’re just starting out.',
  'Practice common interview questions and prepare examples that showcase your skills.',
  'Stay consistent and apply to several positions regularly to increase your chances.'
];

const LearnMore = () => {
  return (
    <div className='relative min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-black text-white'>
      <Navbar />
      
      <main className='flex-grow pt-24 pb-32 px-4 sm:px-8 max-w-7xl mx-auto w-full'>
        {/* Hero Section */}
        <div className='text-center mb-16'>
          <h1 className='text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400'>
            About Owl Roles
          </h1>
          <p className='text-lg text-gray-300 max-w-3xl mx-auto'>
            Owl Roles is committed to creating an inclusive and accessible job search platform for everyone. 
            We believe in empowering job seekers through innovative tools that transform the job search experience.
          </p>
        </div>

        {/* Feature Grid */}
        <section className='mb-20'>
          <h2 className='text-3xl font-bold mb-12 text-center'>Our Features</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {features.map(({ icon: Icon, title, description }, index) => (
              <div 
                key={index}
                className='group p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 shadow-xl hover:border-purple-500 transition-all duration-300'
              >
                <div className='mb-4 text-purple-400'>
                  <Icon className='w-10 h-10' />
                </div>
                <h3 className='text-xl font-semibold mb-2'>{title}</h3>
                <p className='text-gray-400'>{description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tips Section */}
        <section className='mb-20'>
          <h2 className='text-3xl font-bold mb-12 text-center'>Accelerate Your Job Search</h2>
          <div className='bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 p-8'>
            <ul className='space-y-6'>
              {jobTips.map((tip, index) => (
                <li 
                  key={index}
                  className='flex items-start before:content-["▹"] before:text-purple-400 before:mr-4 before:mt-1 text-gray-300 hover:text-white transition-colors'
                >
                  {tip}
                </li>
              ))}
            </ul>
            <p className='mt-8 text-lg text-gray-300'>
              By following these strategies, you'll significantly enhance your job search effectiveness. 
              Owl Roles provides the tools and community support to keep you motivated and on track.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <div className='text-center'>
          <Link to='/jobs'>
            <button className='px-8 py-4 bg-gradient-to-r from-purple-600 to-green-800 rounded-xl text-lg font-semibold hover:scale-101 transition-transform shadow-lg hover:shadow-purple-500/20'>
              Explore Job Listings →
            </button>
          </Link>
        </div>
      </main>

      <Footer className='mt-auto' />
    </div>
  );
}

export default LearnMore;