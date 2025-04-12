import { ChevronLeft, ChevronRight, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CalendarPage() {
  // Obtener fecha actual
  const currentDate = new Date()
  const currentMonth = currentDate.toLocaleString("default", { month: "long" })
  const currentYear = currentDate.getFullYear()

  return (
    <div className="container p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Calendar</h1>
        <div className="flex items-center space-x-2">
          <Select defaultValue="month">
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="View" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Day</SelectItem>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="month">Month</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Event
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">
                  {currentMonth} {currentYear}
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="icon">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="text-center font-medium text-sm py-2">
                    {day}
                  </div>
                ))}
                {generateCalendarDays().map((day, index) => (
                  <div
                    key={index}
                    className={`min-h-[80px] p-1 border rounded-md ${
                      day.isCurrentMonth ? "bg-card" : "bg-muted"
                    } ${day.isToday ? "border-primary" : "border-border"}`}
                  >
                    <div className={`text-right text-sm ${day.isToday ? "font-bold text-primary" : ""}`}>{day.day}</div>
                    {day.events.map((event, eventIndex) => (
                      <div
                        key={eventIndex}
                        className={`mt-1 p-1 text-xs rounded truncate ${
                          event.type === "assignment"
                            ? "bg-orange-500/20 text-orange-500"
                            : event.type === "quiz"
                              ? "bg-purple-500/20 text-purple-500"
                              : "bg-blue-500/20 text-blue-500"
                        }`}
                      >
                        {event.title}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="border-b border-border pb-3 last:border-0">
                    <div className="flex items-start">
                      <div
                        className={`w-3 h-3 mt-1.5 mr-3 rounded-full ${
                          event.type === "assignment"
                            ? "bg-orange-500"
                            : event.type === "quiz"
                              ? "bg-purple-500"
                              : "bg-blue-500"
                        }`}
                      />
                      <div>
                        <p className="font-medium text-sm">{event.title}</p>
                        <p className="text-xs text-muted-foreground">{event.course}</p>
                        <p className="text-xs font-medium mt-1">
                          {event.date} • {event.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Filters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input type="checkbox" id="assignments" className="mr-2" defaultChecked />
                  <label htmlFor="assignments" className="text-sm">
                    Assignments
                  </label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="quizzes" className="mr-2" defaultChecked />
                  <label htmlFor="quizzes" className="text-sm">
                    Quizzes
                  </label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="lectures" className="mr-2" defaultChecked />
                  <label htmlFor="lectures" className="text-sm">
                    Lectures
                  </label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="deadlines" className="mr-2" defaultChecked />
                  <label htmlFor="deadlines" className="text-sm">
                    Deadlines
                  </label>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-sm font-medium mb-2">Courses</p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" id="cs101" className="mr-2" defaultChecked />
                    <label htmlFor="cs101" className="text-sm">
                      Introduction to Computer Science
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="math201" className="mr-2" defaultChecked />
                    <label htmlFor="math201" className="text-sm">
                      Advanced Mathematics
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="mkt101" className="mr-2" defaultChecked />
                    <label htmlFor="mkt101" className="text-sm">
                      Digital Marketing Fundamentals
                    </label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

// Función para generar los días del calendario (simplificada)
function generateCalendarDays() {
  // Esta es una versión simplificada para demostración
  // En una implementación real, calcularíamos los días correctamente basados en el mes actual
  const days = []

  // Días del mes anterior (ejemplo)
  for (let i = 26; i <= 31; i++) {
    days.push({
      day: i,
      isCurrentMonth: false,
      isToday: false,
      events: [],
    })
  }

  // Días del mes actual
  for (let i = 1; i <= 30; i++) {
    const events = []

    // Agregar algunos eventos de ejemplo
    if (i === 5) {
      events.push({ title: "Quiz: Variables", type: "quiz" })
    }
    if (i === 10) {
      events.push({ title: "Assignment Due", type: "assignment" })
    }
    if (i === 15) {
      events.push({ title: "Live Lecture", type: "lecture" })
      events.push({ title: "Group Project", type: "assignment" })
    }
    if (i === 20) {
      events.push({ title: "Midterm Exam", type: "quiz" })
    }

    days.push({
      day: i,
      isCurrentMonth: true,
      isToday: i === new Date().getDate(),
      events,
    })
  }

  // Días del mes siguiente (ejemplo)
  for (let i = 1; i <= 6; i++) {
    days.push({
      day: i,
      isCurrentMonth: false,
      isToday: false,
      events: [],
    })
  }

  return days
}

const upcomingEvents = [
  {
    id: 1,
    title: "Week 3 Quiz",
    course: "Introduction to Computer Science",
    date: "Tomorrow",
    time: "11:59 PM",
    type: "quiz",
  },
  {
    id: 2,
    title: "Problem Set 4",
    course: "Advanced Mathematics",
    date: "Friday",
    time: "11:59 PM",
    type: "assignment",
  },
  {
    id: 3,
    title: "Live Lecture: Marketing Strategies",
    course: "Digital Marketing Fundamentals",
    date: "Monday",
    time: "10:00 AM",
    type: "lecture",
  },
  {
    id: 4,
    title: "Group Project Deadline",
    course: "Introduction to Computer Science",
    date: "Next Wednesday",
    time: "11:59 PM",
    type: "assignment",
  },
  {
    id: 5,
    title: "Midterm Exam",
    course: "Advanced Mathematics",
    date: "May 20",
    time: "2:00 PM",
    type: "quiz",
  },
]
