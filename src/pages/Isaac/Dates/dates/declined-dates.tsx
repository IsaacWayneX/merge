import { Search, ChevronLeft, Settings } from "lucide-react"
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
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 component-border">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full">
            <ChevronLeft className="w-6 h-6 text-gray-900" />
          </button>
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-600" />
            <input
              type="search"
              placeholder="Search"
              className="w-full rounded-md border border-gray-300 pl-10 pr-4 py-2 text-sm text-gray-900 focus:border-[#5E17EB] focus:outline-none focus:ring-1 focus:ring-[#5E17EB]"
            />
          </div>
        </div>
        <button className="rounded-full p-2 hover:bg-gray-100">
          <Settings className="h-6 w-6 text-gray-800" />
        </button>
      </div>

      <div className="rounded-lg border bg-white overflow-hidden">
        <div className="border-b p-6">
          <h2 className="text-xl font-bold text-gray-900">Declined dates</h2>
        </div>

        <div className="divide-y">
          <div className="grid grid-cols-[2fr,1fr,1fr] px-6 py-4 border-b bg-gray-50">
            <div className="text-sm font-bold text-gray-900">Users</div>
            <div className="text-sm font-bold text-gray-900">Location</div>
            <div className="text-sm font-bold text-gray-900">Action</div>
          </div>

          {declinedDates.map((date) => (
            <div key={date.id} className="grid grid-cols-[2fr,1fr,1fr] px-6 py-4 items-center">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  {date.users.map((user, index) => (
                    <img
                      key={index}
                      src={user.image || "/placeholder.svg"}
                      alt={user.name}
                      className="h-12 w-12 rounded-full border-2 border-white object-cover"
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  {date.users.map((user, index) => (
                    <div key={index} className="flex items-center gap-1 rounded-full bg-[#F3E8FF] px-3 py-1.5">
                      <span className="text-sm font-semibold text-[#5E17EB]">{user.name}</span>
                      {user.isStarred && <span className="text-[#5E17EB] text-base">★</span>}
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-sm font-medium text-gray-900">{date.location}</div>
              <div>
                <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-1.5 text-sm font-semibold text-red-700">
                  Declined
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

