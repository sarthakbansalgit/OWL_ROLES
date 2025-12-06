"use client";

import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./shared/Navbar";
import { Button } from "@/components/ui/button";
import { CourseCarousel } from "./CourseCarousel";
import { SkillsList } from "./SkillsList";
import { Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Footer from "./shared/Footer";

import newWebp from '@/assets/learn/new.webp'
import new1Jpg from '@/assets/learn/new1.jpg'
import new2Jpg from '@/assets/learn/new2.jpg'
import new3Jpg from '@/assets/learn/new3.jpg'
import new4Jpg from '@/assets/learn/new4.jpg'
import new5Jpg from '@/assets/learn/new5.jpg'
import reactPng from '@/assets/learn/react.png'
import nodeWebp from '@/assets/learn/node.webp'
import uiuxWebp from '@/assets/learn/uiux.webp'
import dockerPng from '@/assets/learn/docker.png'
import graphqlJpg from '@/assets/learn/graphql.jpg'
import flutterPng from '@/assets/learn/flutter.png'
import vueJpg from '@/assets/learn/vue.jpg'
import rustWebp from '@/assets/learn/rust.webp'
import waWebp from '@/assets/learn/wa.webp'
import sveltePng from '@/assets/learn/svelte.png'

const LearnJob = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-8 sm:px-6 lg:px-12 py-16">
        {/* Hero Section */}
        <section className="mb-20 flex flex-wrap lg:flex-nowrap justify-between items-center gap-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold mb-6 leading-tight">
              Grow your skills and advance your career with Owl Roles Learning
            </h1>
            <p className="text-gray-600 flex items-center gap-2 text-lg mb-10">
              <Users className="h-6 w-6" />
              Millions of members are learning on Owl Roles
            </p>
            <div className="flex gap-6">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => navigate("/pricing")}
              >
                Start my free month
              </Button>

            </div>
          </div>
          <div className="hidden lg:block">
            
          </div>
        </section>

        {/* Featured Learning Paths */}
        <section className="mb-20">
         
          <Tabs defaultValue="featured" className="mb-12">
            
            <TabsContent value="featured">
              <CourseCarousel
                title="Featured Courses"
                courses={featuredCourses}
                layout="carousel"
              />
            </TabsContent>
            <TabsContent value="trending">
              <CourseCarousel
                title="Trending Courses"
                courses={trendingCourses}
                layout="carousel"
              />
            </TabsContent>
            <TabsContent value="new">
              <CourseCarousel
                title="New Courses"
                courses={newCourses}
                layout="carousel"
              />
            </TabsContent>
          </Tabs>
        </section>

        {/* Top Picks Section */}
        <section className="mb-20">
          <CourseCarousel
            title="Top picks for you"
            courses={topPicks}
            layout="grid"
          />
        </section>

        {/* Skills Section */}
        <section className="mb-20">
          <SkillsList skills={popularSkills} />
        </section>

        {/* Weekly Top Courses */}
        <section className="mb-20">
          <CourseCarousel
            title="This week's top courses"
            courses={weeklyTopCourses}
            layout="carousel"
          />
        </section>

        {/* New Releases */}
        <section className="mb-20">
          <CourseCarousel
            title="New Releases"
            courses={newReleases}
            layout="grid"
          />
        </section>
      </div>
      <Footer className="py-10 bg-gray-50 border-t border-gray-200" />
    </div>
  );
};

// Sample data for placeholders (replace with real data)
const featuredCourses = [
  {
    title: "Advanced Machine Learning Specialization",
    author: "Dr. AI Expert",
    duration: "40h 30m",
    level: "Advanced",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80",
    badge: "Featured"
  },
  {
    title: "Full Stack Web Development Bootcamp",
    author: "Web Master",
    duration: "60h 45m",
    level: "Intermediate",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80",
    badge: "Featured"
  },
  {
    title: "iOS App Development with Swift",
    author: "Apple Expert",
    duration: "35h 20m",
    level: "Beginner",
    image: "https://images.unsplash.com/photo-1621839673705-6617adf9e890?w=800&q=80",
    badge: "Featured"
  },
  {
    title: "Blockchain Development Fundamentals",
    author: "Crypto Expert",
    duration: "25h 15m",
    level: "Intermediate",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80",
    badge: "Featured"
  },
  {
    title: "Data Science with Python",
    author: "Data Guru",
    duration: "45h 30m",
    level: "Intermediate",
    image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&q=80",
    badge: "Featured"
  },
  {
    title: "Cloud Architecture on AWS",
    author: "Cloud Expert",
    duration: "30h 45m",
    level: "Advanced",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    badge: "Featured"
  }
]

const trendingCourses = [
    {
        title: "AI and Machine Learning Fundamentals",
        author: "Dr. Alan Turing",
        duration: "8h 15m",
        level: "Intermediate",
        image: newWebp,
        trending: true
    },
    {
        title: "Blockchain Development",
        author: "Satoshi Nakamoto",
        duration: "6h 30m",
        level: "Advanced",
        image: new1Jpg,
        trending: true
    },
    {
        title: "UX/UI Design Principles",
        author: "Lisa Creative",
        duration: "5h 45m",
        level: "Beginner",
        image: new2Jpg,
        trending: true
    }
];

const topPicks = [
  {
    title: "React and Next.js Masterclass",
    author: "Frontend Expert",
    duration: "28h 45m",
    level: "Intermediate",
    image: reactPng,
    badge: "Popular"
  },
  {
    title: "Node.js Backend Development",
    author: "Backend Guru",
    duration: "32h 15m",
    level: "Advanced",
    image: nodeWebp,
    badge: "Hot"
  },
  {
    title: "UI/UX Design Principles",
    author: "Design Master",
    duration: "24h 30m",
    level: "Beginner",
    image: uiuxWebp,
    badge: "New"
  }
]

const popularSkills = [
  { name: "JavaScript", count: 150 },
  { name: "Python", count: 120 },
  { name: "React", count: 100 },
  { name: "Node.js", count: 80 },
  { name: "Data Science", count: 70 },
  { name: "Machine Learning", count: 65 }
]

const weeklyTopCourses = [
  {
    title: "Docker and Kubernetes Essential Training",
    author: "DevOps Pro",
    duration: "15h 30m",
    level: "Intermediate",
    image: dockerPng,
    badge: "Trending"
  },
  {
    title: "GraphQL API Development",
    author: "API Expert",
    duration: "12h 45m",
    level: "Advanced",
    image: graphqlJpg,
    badge: "Hot"
  },
  {
    title: "Flutter Mobile App Development",
    author: "Mobile Dev Master",
    duration: "28h 15m",
    level: "Intermediate",
    image: flutterPng,
    badge: "Popular"
  },
  {
    title: "Vue.js 3 Complete Guide",
    author: "Frontend Guru",
    duration: "20h 30m",
    level: "Beginner",
    image: vueJpg,
    badge: "New"
  }
]

const newCourses = [
    {
        title: "Quantum Computing for Beginners",
        author: "Dr. Quantum",
        duration: "4h 30m",
        level: "Beginner",
        image: new3Jpg,
        new: true
    },
    {
        title: "5G Network Technologies",
        author: "Network Ninja",
        duration: "7h 15m",
        level: "Intermediate",
        image: new4Jpg,
        new: true
    },
    {
        title: "Cybersecurity Essentials",
        author: "Hack Preventer",
        duration: "6h 00m",
        level: "All Levels",
        image: new5Jpg,
        new: true
    }
];

const newReleases = [
  {
    title: "Rust Programming Language",
    author: "Systems Expert",
    duration: "18h 45m",
    level: "Advanced",
    image: rustWebp,
    badge: "New"
  },
  {
    title: "WebAssembly Fundamentals",
    author: "Web Performance Guru",
    duration: "14h 30m",
    level: "Intermediate",
    image: waWebp,
    badge: "New"
  },
  {
    title: "Svelte and SvelteKit",
    author: "Frontend Master",
    duration: "16h 15m",
    level: "Intermediate",
    image: sveltePng,
    badge: "New"
  }
]

export default LearnJob;
