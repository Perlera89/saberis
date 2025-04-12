import Link from "next/link"
import { ArrowLeft, BookOpen, CheckCircle, ChevronDown, Download, FileText, PlayCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

export default function CoursePage({ params }) {
  const courseId = Number.parseInt(params.id)
  const course = courses.find((c) => c.id === courseId) || courses[0]

  return (
    <div className="container p-6">
      <div className="flex items-center mb-6">
        <Button asChild variant="ghost" size="sm" className="mr-2">
          <Link href="/courses">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Courses
          </Link>
        </Button>
        <Separator orientation="vertical" className="h-6 mx-2" />
        <div>
          <h1 className="text-xl font-bold">{course.title}</h1>
          <p className="text-sm text-muted-foreground">{course.instructor}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardContent className="p-0">
              <div className="aspect-video bg-muted flex items-center justify-center">
                <div className="text-center">
                  <PlayCircle className="h-16 w-16 text-primary mx-auto mb-2" />
                  <p className="text-sm font-medium">Current Lesson: Introduction to Variables</p>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="font-semibold">Your Progress</h2>
                  <span className="text-sm font-medium">{course.progress}% Complete</span>
                </div>
                <Progress value={course.progress} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <div className="mb-6">
            <h2 className="font-semibold text-lg mb-4">Course Content</h2>

            {modules.map((module, index) => (
              <div key={module.id} className="mb-4">
                <div className="flex items-center justify-between bg-card p-3 rounded-lg cursor-pointer">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                      <span className="text-sm font-medium text-primary">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-medium">{module.title}</h3>
                      <p className="text-xs text-muted-foreground">
                        {module.lessons.length} lessons • {module.duration}
                      </p>
                    </div>
                  </div>
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                </div>

                <div className="mt-1 ml-8 pl-3 border-l-2 border-border">
                  {module.lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className={`flex items-center p-3 rounded-lg my-2 ${
                        lesson.completed ? "bg-primary/10" : "bg-card"
                      }`}
                    >
                      <div className="mr-3">
                        {lesson.type === "video" && <PlayCircle className="h-5 w-5 text-primary" />}
                        {lesson.type === "reading" && <FileText className="h-5 w-5 text-primary" />}
                        {lesson.type === "download" && <Download className="h-5 w-5 text-primary" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{lesson.title}</p>
                        <p className="text-xs text-muted-foreground">{lesson.duration}</p>
                      </div>
                      {lesson.completed && <CheckCircle className="h-5 w-5 text-green-500" />}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Card className="mb-6">
            <CardContent className="p-4">
              <h2 className="font-semibold mb-4">About This Course</h2>
              <p className="text-sm text-muted-foreground mb-4">
                {course.description ||
                  "This comprehensive course covers all the fundamentals you need to know. Perfect for beginners and those looking to refresh their knowledge."}
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Duration</p>
                  <p className="font-medium">8 weeks</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Level</p>
                  <p className="font-medium">Beginner</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Modules</p>
                  <p className="font-medium">{modules.length}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Lessons</p>
                  <p className="font-medium">{modules.reduce((total, module) => total + module.lessons.length, 0)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h2 className="font-semibold mb-4">Resources</h2>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-primary hover:underline flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    Course Syllabus
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-primary hover:underline flex items-center">
                    <Download className="h-4 w-4 mr-2" />
                    Lecture Slides
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-primary hover:underline flex items-center">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Recommended Reading
                  </Link>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
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
    status: "in-progress",
    description:
      "Learn the fundamentals of computer science, including algorithms, data structures, and programming concepts. This course is designed for beginners with no prior experience.",
  },
  {
    id: 2,
    title: "Advanced Mathematics",
    instructor: "Prof. Johnson",
    category: "Mathematics",
    lastAccessed: "2 days ago",
    progress: 42,
    status: "in-progress",
  },
  {
    id: 3,
    title: "Digital Marketing Fundamentals",
    instructor: "Jane Doe",
    category: "Business",
    lastAccessed: "1 week ago",
    progress: 78,
    status: "in-progress",
  },
]

const modules = [
  {
    id: 1,
    title: "Getting Started with Programming",
    duration: "1 week",
    lessons: [
      {
        id: 101,
        title: "Course Introduction",
        type: "video",
        duration: "10 min",
        completed: true,
      },
      {
        id: 102,
        title: "Setting Up Your Development Environment",
        type: "reading",
        duration: "15 min",
        completed: true,
      },
      {
        id: 103,
        title: "Your First Program",
        type: "video",
        duration: "20 min",
        completed: true,
      },
      {
        id: 104,
        title: "Practice Files",
        type: "download",
        duration: "5 min",
        completed: true,
      },
    ],
  },
  {
    id: 2,
    title: "Variables and Data Types",
    duration: "1 week",
    lessons: [
      {
        id: 201,
        title: "Introduction to Variables",
        type: "video",
        duration: "15 min",
        completed: false,
      },
      {
        id: 202,
        title: "Working with Numbers",
        type: "video",
        duration: "20 min",
        completed: false,
      },
      {
        id: 203,
        title: "Strings and Text Manipulation",
        type: "reading",
        duration: "25 min",
        completed: false,
      },
      {
        id: 204,
        title: "Variables Exercise",
        type: "download",
        duration: "30 min",
        completed: false,
      },
    ],
  },
  {
    id: 3,
    title: "Control Flow",
    duration: "1 week",
    lessons: [
      {
        id: 301,
        title: "Conditional Statements",
        type: "video",
        duration: "25 min",
        completed: false,
      },
      {
        id: 302,
        title: "Loops and Iterations",
        type: "video",
        duration: "30 min",
        completed: false,
      },
      {
        id: 303,
        title: "Control Flow Practice",
        type: "download",
        duration: "45 min",
        completed: false,
      },
    ],
  },
]
