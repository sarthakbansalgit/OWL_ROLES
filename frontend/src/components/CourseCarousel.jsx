"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight, Clock, BookmarkPlus } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Added CourseCard component -  replace with your actual component or import
function CourseCard({ course }) {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardHeader className="p-0 relative">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-[168px] object-cover"
        />
        {course.badge && (
          <Badge className="absolute top-2 left-2 bg-blue-600">
            {course.badge}
          </Badge>
        )}
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg mb-2 line-clamp-2">
          {course.title}
        </CardTitle>
        <CardDescription className="text-sm mb-2">
          {course.author}
        </CardDescription>
        <div className="flex items-center text-sm text-gray-500 gap-4">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {course.duration}
          </span>
          <span>{course.level}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button variant="ghost" size="sm">
          Preview
        </Button>
        <Button variant="ghost" size="sm">
          <BookmarkPlus className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}


export function CourseCarousel({ title, courses, layout = "grid", showControls = true }) {
  const containerRef = React.useRef(null)

  const scroll = (direction) => {
    if (containerRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400
      containerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        {layout === "carousel" && showControls && (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('left')}
              className="h-8 w-8 rounded-full"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('right')}
              className="h-8 w-8 rounded-full"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
      <div
        ref={containerRef}
        className={`${
          layout === "carousel" 
            ? "flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory" 
            : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        }`}
        style={layout === "carousel" ? { scrollbarWidth: 'none', msOverflowStyle: 'none' } : {}}
      >
        {courses.map((course, index) => (
          <div 
            key={index} 
            className={layout === "carousel" ? "flex-none w-[300px] snap-start" : ""}
          >
            <CourseCard course={course} />
          </div>
        ))}
      </div>
    </div>
  )
}

