import { Search, ChevronLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"

const declinedDates = [
  {
    id: 1,
    users: [
      {
        name: "Maria",
        image: "https://cdn2.stylecraze.com/wp-content/uploads/2013/06/Different-Beautiful-American-Girls.jpg.webp",
        isStarred: false,
      },
      {
        name: "Joseph",
        image:
          "https://images.unsplash.com/photo-1672675225389-4d7b6f231f5b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG5pZ2VyaWFuJTIwbWFufGVufDB8fDB8fHww",
        isStarred: true,
      },
    ],
    location: "Puzzles Abuja",
  },
  {
    id: 2,
    users: [
      {
        name: "Maria",
        image: "https://cdn2.stylecraze.com/wp-content/uploads/2013/06/Different-Beautiful-American-Girls.jpg.webp",
        isStarred: false,
      },
      {
        name: "Joseph",
        image:
          "https://images.unsplash.com/photo-1672675225389-4d7b6f231f5b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG5pZ2VyaWFuJTIwbWFufGVufDB8fDB8fHww",
        isStarred: true,
      },
    ],
    location: "Puzzles Abuja",
  },
  {
    id: 3,
    users: [
      {
        name: "Maria",
        image: "https://cdn2.stylecraze.com/wp-content/uploads/2013/06/Different-Beautiful-American-Girls.jpg.webp",
        isStarred: false,
      },
      {
        name: "Joseph",
        image:
          "https://images.unsplash.com/photo-1672675225389-4d7b6f231f5b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG5pZ2VyaWFuJTIwbWFufGVufDB8fDB8fHww",
        isStarred: true,
      },
    ],
    location: "Puzzles Abuja",
  },
  {
    id: 4,
    users: [
      {
        name: "Maria",
        image: "https://cdn2.stylecraze.com/wp-content/uploads/2013/06/Different-Beautiful-American-Girls.jpg.webp",
        isStarred: false,
      },
      {
        name: "Joseph",
        image:
          "https://images.unsplash.com/photo-1672675225389-4d7b6f231f5b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG5pZ2VyaWFuJTIwbWFufGVufDB8fDB8fHww",
        isStarred: true,
      },
    ],
    location: "Puzzles Abuja",
  },
  {
    id: 5,
    users: [
      {
        name: "Maria",
        image: "https://cdn2.stylecraze.com/wp-content/uploads/2013/06/Different-Beautiful-American-Girls.jpg.webp",
        isStarred: false,
      },
      {
        name: "Joseph",
        image:
          "https://images.unsplash.com/photo-1672675225389-4d7b6f231f5b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG5pZ2VyaWFuJTIwbWFufGVufDB8fDB8fHww",
        isStarred: true,
      },
    ],
    location: "Puzzles Abuja",
  },
]

export default function DeclinedDates() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full">
              <ChevronLeft className="w-6 h-6 text-gray-900" />
            </button>
          </div>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              placeholder="Search"
              className="w-full rounded-md border border-gray-300 pl-10 pr-4 py-2 text-sm focus:border-[#5E17EB] focus:outline-none focus:ring-1 focus:ring-[#5E17EB]"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg border">
          <div className="grid grid-cols-[2fr,1fr,1fr] px-6 py-3 border-b">
            <div className="text-sm font-medium text-gray-500">Users</div>
            <div className="text-sm font-medium text-gray-500">Location</div>
            <div className="text-sm font-medium text-gray-500">Action</div>
          </div>

          <div className="divide-y">
            {declinedDates.map((date) => (
              <div key={date.id} className="grid grid-cols-[2fr,1fr,1fr] px-6 py-4 items-center">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {date.users.map((user, index) => (
                      <img
                        key={index}
                        src={user.image || "/placeholder.svg"}
                        alt={user.name}
                        className="h-10 w-10 rounded-full border-2 border-white object-cover"
                      />
                    ))}
                  </div>
                  <div className="flex gap-2">
                    {date.users.map((user, index) => (
                      <div key={index} className="flex items-center gap-1 rounded-full bg-[#F3E8FF] px-3 py-1">
                        <span className="text-sm font-medium text-[#5E17EB]">{user.name}</span>
                        {user.isStarred && <span className="text-[#5E17EB]">★</span>}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="text-sm text-gray-900">{date.location}</div>
                <div>
                  <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700">
                    Declined
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

