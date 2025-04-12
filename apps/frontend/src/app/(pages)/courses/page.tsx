import Link from "next/link"
import { Filter, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CoursesPage() {
  return (
    <div className="container p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">My Courses</h1>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search courses..." className="pl-8 w-64" />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <Tabs defaultValue="in-progress" className="mb-8">
        <TabsList>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="all">All Courses</TabsTrigger>
        </TabsList>
        <TabsContent value="in-progress">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {courses
              .filter((course) => course.status === "in-progress")
              .map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="completed">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {courses
              .filter((course) => course.status === "completed")
              .map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="all">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function CourseCard({ course }) {
  return (
    <Card className="overflow-hidden">
      <div
        className="h-32 relative"
        style={{
          background: course.color || "linear-gradient(to right, #3b82f6, #2563eb)",
        }}
      >
        <div className="absolute bottom-2 left-2 bg-background/90 text-xs font-medium px-2 py-1 rounded">
          {course.category}
        </div>
        {course.status === "completed" && (
          <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-medium px-2 py-1 rounded">
            Completed
          </div>
        )}
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{course.title}</CardTitle>
        <CardDescription className="text-xs">{course.instructor}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Progress</span>
            <span className="font-medium">{course.progress}%</span>
          </div>
          <Progress value={course.progress} className="h-2" />
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button asChild variant="ghost" size="sm" className="w-full">
          <Link href={`/courses/${course.id}`}>
            {course.status === "completed" ? "Review Course" : "Continue Course"}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

const courses = [
  {
    id: 1,
    title: "Introduction to Computer Science",
    instructor: "Dr. Smith",
    category: "Computer Science",
    lastAccessed: "Yesterday",
    progress: 65,
    status: "in-progress",
    color: "linear-gradient(to right, #3b82f6, #2563eb)",
  },
  {
    id: 2,
    title: "Advanced Mathematics",
    instructor: "Prof. Johnson",
    category: "Mathematics",
    lastAccessed: "2 days ago",
    progress: 42,
    status: "in-progress",
    color: "linear-gradient(to right, #8b5cf6, #6d28d9)",
  },
  {
    id: 3,
    title: "Digital Marketing Fundamentals",
    instructor: "Jane Doe",
    category: "Business",
    lastAccessed: "1 week ago",
    progress: 78,
    status: "in-progress",
    color: "linear-gradient(to right, #ec4899, #be185d)",
  },
  {
    id: 4,
    title: "Introduction to Psychology",
    instructor: "Dr. Williams",
    category: "Psychology",
    lastAccessed: "2 weeks ago",
    progress: 100,
    status: "completed",
    color: "linear-gradient(to right, #10b981, #059669)",
  },
  {
    id: 5,
    title: "Web Development Basics",
    instructor: "Mark Johnson",
    category: "Computer Science",
    lastAccessed: "1 month ago",
    progress: 100,
    status: "completed",
    color: "linear-gradient(to right, #f59e0b, #d97706)",
  },
]
