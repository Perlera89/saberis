import Link from "next/link"
import { Clock, ExternalLink } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function Home() {
  return (
    <div className="w-full p-6">
      <section className="mb-4">
        <h2 className="text-lg font-semibold mb-4">Course Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course) => (
            <Card key={course.id} className="overflow-hidden">
              <div
                className="h-32 relative"
                style={{
                  background: course.color || "linear-gradient(to right, #3b82f6, #2563eb)",
                }}
              >
                <div className="absolute bottom-2 left-2 bg-background/90 text-xs font-medium px-2 py-1 rounded">
                  {course.category}
                </div>
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
                <div className="flex items-center text-muted-foreground text-xs mt-2">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>Last accessed: {course.lastAccessed}</span>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button asChild variant="ghost" size="sm" className="w-full">
                  <Link href={`/courses/${course.id}`}>Continue Course</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-4">Upcoming Activities</h2>
        <Card>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {activities.map((activity) => (
                <div key={activity.id} className="p-4 flex items-start justify-between">
                  <div>
                    <p className="font-medium text-sm">{activity.title}</p>
                    <p className="text-sm text-muted-foreground">{activity.course}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{activity.dueDate}</p>
                    <p className="text-xs text-muted-foreground">{activity.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t border-border">
            <Button variant="ghost" size="sm" className="w-full" asChild>
              <Link href="/calendar">
                View All Activities
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </section>
    </div>
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
    color: "linear-gradient(to right, #3b82f6, #2563eb)",
  },
  {
    id: 2,
    title: "Advanced Mathematics",
    instructor: "Prof. Johnson",
    category: "Mathematics",
    lastAccessed: "2 days ago",
    progress: 42,
    color: "linear-gradient(to right, #8b5cf6, #6d28d9)",
  },
  {
    id: 3,
    title: "Digital Marketing Fundamentals",
    instructor: "Jane Doe",
    category: "Business",
    lastAccessed: "1 week ago",
    progress: 78,
    color: "linear-gradient(to right, #ec4899, #be185d)",
  },
]

const activities = [
  {
    id: 1,
    title: "Week 3 Quiz",
    course: "Introduction to Computer Science",
    dueDate: "Tomorrow, 11:59 PM",
    type: "Quiz",
  },
  {
    id: 2,
    title: "Problem Set 4",
    course: "Advanced Mathematics",
    dueDate: "Friday, 11:59 PM",
    type: "Assignment",
  },
  {
    id: 3,
    title: "Marketing Campaign Analysis",
    course: "Digital Marketing Fundamentals",
    dueDate: "Next Monday, 11:59 PM",
    type: "Project",
  },
]
