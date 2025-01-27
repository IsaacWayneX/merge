import { useState, useEffect } from "react"
import { X } from "lucide-react"

interface Attendee {
  id: number
  name: string
  image: string
  tickets: number
}

interface TicketsModalProps {
  isOpen: boolean
  onClose: () => void
  eventId: number
  eventTitle: string
}

const dummyAttendees: Attendee[] = [
  {
    id: 1,
    name: "Ada",
    image: "https://cdn2.stylecraze.com/wp-content/uploads/2013/06/Different-Beautiful-American-Girls.jpg.webp",
    tickets: 1,
  },
  {
    id: 2,
    name: "Michelle",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCG5fSW2o3mPb4IkYaCadpDrLJGQ6FuPGO_VkcfUcB_UFhdKikVk_THjtbrLpVUuMAfKo&usqp=CAU",
    tickets: 1,
  },
  {
    id: 3,
    name: "Daniel",
    image:
      "https://images.unsplash.com/photo-1672675225389-4d7b6f231f5b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG5pZ2VyaWFuJTIwbWFufGVufDB8fDB8fHww",
    tickets: 1,
  },
  {
    id: 4,
    name: "Embassy",
    image:
      "https://images.unsplash.com/photo-1680443418917-df6db955b9e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fG5pZ2VyaWFuJTIwbWFufGVufDB8fDB8fHww",
    tickets: 1,
  },
  {
    id: 5,
    name: "Francis",
    image:
      "https://images.unsplash.com/photo-1680443418917-df6db955b9e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fG5pZ2VyaWFuJTIwbWFufGVufDB8fDB8fHww",
    tickets: 1,
  },
]

export default function TicketsModal({ isOpen, onClose, eventId, eventTitle }: TicketsModalProps) {
  const [attendees, setAttendees] = useState<Attendee[]>([])

  useEffect(() => {
    if (isOpen) {
      fetchAttendees()
    }
  }, [isOpen, eventId])

  const fetchAttendees = async () => {
    // Simulating API call
    await new Promise((resolve) => setTimeout(resolve, 500))
    setAttendees(dummyAttendees)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">{eventTitle}</h3>
          <button onClick={onClose} className="text-gray-800 hover:text-gray-900">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="space-y-4">
          {attendees.map((attendee) => (
            <div key={attendee.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={attendee.image || "/placeholder.svg"}
                  alt={attendee.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="font-medium text-gray-900">{attendee.name}</span>
              </div>
              <span className="text-gray-800">{attendee.tickets}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function getAttendeesCount(eventId: number): number {
  // In a real application, this would make an API call
  // For now, we'll return the length of dummyAttendees
  return dummyAttendees.length
}

