import { PaperclipIcon, Search, Send, SmileIcon } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

export default function MessagesPage() {
  return (
    <div className="container p-6">
      <h1 className="text-2xl font-bold mb-6">Messages</h1>

      <div className="bg-card rounded-lg shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 h-[calc(100vh-200px)]">
          {/* Lista de conversaciones */}
          <div className="border-r border-border">
            <div className="p-3 border-b border-border">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search messages..." className="pl-8" />
              </div>
            </div>
            <div className="overflow-y-auto h-[calc(100%-56px)]">
              {conversations.map((conversation, index) => (
                <div key={conversation.id}>
                  <div
                    className={`p-3 flex items-center space-x-3 hover:bg-muted cursor-pointer ${
                      index === 0 ? "bg-primary/10" : ""
                    }`}
                  >
                    <Avatar>
                      <AvatarImage src={conversation.avatar} alt={conversation.name} />
                      <AvatarFallback>{getInitials(conversation.name)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-sm truncate">{conversation.name}</p>
                        <p className="text-xs text-muted-foreground">{conversation.time}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground truncate">{conversation.lastMessage}</p>
                        {conversation.unread > 0 && (
                          <div className="bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {conversation.unread}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {index < conversations.length - 1 && <Separator />}
                </div>
              ))}
            </div>
          </div>

          {/* Área de chat */}
          <div className="col-span-2 flex flex-col">
            <div className="p-3 border-b border-border flex items-center space-x-3">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Dr. Smith" />
                <AvatarFallback>DS</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">Dr. Smith</p>
                <p className="text-xs text-muted-foreground">Introduction to Computer Science</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground rounded-br-none"
                        : "bg-muted rounded-bl-none"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p
                      className={`text-xs mt-1 text-right ${
                        message.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                      }`}
                    >
                      {message.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 border-t border-border">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon">
                  <PaperclipIcon className="h-5 w-5 text-muted-foreground" />
                </Button>
                <Input placeholder="Type a message..." className="flex-1" />
                <Button variant="ghost" size="icon">
                  <SmileIcon className="h-5 w-5 text-muted-foreground" />
                </Button>
                <Button size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Función para obtener iniciales de un nombre
function getInitials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
}

const conversations = [
  {
    id: 1,
    name: "Dr. Smith",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Let me know if you have any questions about the assignment.",
    time: "10:30 AM",
    unread: 2,
  },
  {
    id: 2,
    name: "Prof. Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "The deadline has been extended to Friday.",
    time: "Yesterday",
    unread: 0,
  },
  {
    id: 3,
    name: "Jane Doe",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Can we schedule a meeting to discuss the project?",
    time: "Yesterday",
    unread: 0,
  },
  {
    id: 4,
    name: "CS101 Group",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Alex: I've uploaded the code to the repository.",
    time: "Monday",
    unread: 0,
  },
  {
    id: 5,
    name: "Math Study Group",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Sarah: Are we meeting tomorrow?",
    time: "Monday",
    unread: 0,
  },
  {
    id: 6,
    name: "Academic Advisor",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Your course registration has been approved.",
    time: "Last week",
    unread: 0,
  },
  {
    id: 7,
    name: "Library Services",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Your requested books are ready for pickup.",
    time: "Last week",
    unread: 0,
  },
]

const messages = [
  {
    id: 1,
    sender: "other",
    content: "Hello! I noticed you missed the last lecture. Is everything okay?",
    time: "10:15 AM",
  },
  {
    id: 2,
    sender: "user",
    content: "Hi Dr. Smith, yes I'm fine. I had a doctor's appointment that couldn't be rescheduled.",
    time: "10:18 AM",
  },
  {
    id: 3,
    sender: "other",
    content:
      "No problem at all. I've uploaded the lecture notes to the course page. Let me know if you have any questions.",
    time: "10:20 AM",
  },
  {
    id: 4,
    sender: "user",
    content: "Thank you! I'll review them today. Also, I wanted to ask about the upcoming assignment.",
    time: "10:22 AM",
  },
  {
    id: 5,
    sender: "other",
    content: "Sure, what would you like to know about it?",
    time: "10:25 AM",
  },
  {
    id: 6,
    sender: "user",
    content:
      'I\'m a bit confused about the requirements for the second part. Could you clarify what you mean by "implement a recursive solution"?',
    time: "10:28 AM",
  },
  {
    id: 7,
    sender: "other",
    content:
      "Of course! For that part, I'm looking for you to solve the problem using a function that calls itself to break down the problem into smaller instances. We covered this in Week 3. Let me know if you have any questions about the assignment.",
    time: "10:30 AM",
  },
]
