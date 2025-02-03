import { Search, ChevronLeft } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

const bookedDates = [
  {
    id: 1,
    location: "Puzzles Abuja",
    participants: ["Joseph"],
    security: { primary: true, secondary: false },
    logistics: { primary: false, secondary: false },
    isSolo: true,
  },
  {
    id: 2,
    location: "Puzzles Abuja",
    participants: ["Maria", "Joseph"],
    security: { primary: true, secondary: true },
    logistics: { primary: true, secondary: true },
    isSolo: false,
  },
  {
    id: 3,
    location: "Puzzles Abuja",
    participants: ["Maria", "Joseph"],
    security: { primary: true, secondary: true },
    logistics: { primary: true, secondary: true },
    isSolo: false,
  },
  {
    id: 4,
    location: "Puzzles Abuja",
    participants: ["Maria", "Joseph"],
    security: { primary: true, secondary: true },
    logistics: { primary: true, secondary: true },
    isSolo: false,
  },
]

export default function BookedDates() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 component-border">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full">
            <ChevronLeft className="w-8 h-8 text-gray-900" />
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
        {/* <Link to={`cars`}>
        <button className="rounded-full p-2 hover:bg-gray-100">
          <Settings className="h-6 w-6 text-gray-800" />
        </button>
        </Link> */}
      </div>

      <div className="rounded-lg border bg-white overflow-hidden">
        <div className="border-b p-6">
          <h2 className="text-xl font-bold text-gray-900">Dates booked</h2>
        </div>

        <div className="divide-y">
          {bookedDates.map((date) => (
            <div key={date.id} className="flex items-center justify-start p-6 gap-8">
              <div className="flex items-center space-x-4 flex-grow">
                <div className="flex -space-x-2">
                  {date.isSolo ? (
                    <img
                      src={
                        date.participants[0] === "Maria"
                          ? "https://cdn2.stylecraze.com/wp-content/uploads/2013/06/Different-Beautiful-American-Girls.jpg.webp"
                          : "https://images.unsplash.com/photo-1672675225389-4d7b6f231f5b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG5pZ2VyaWFuJTIwbWFufGVufDB8fDB8fHww"
                      }
                      alt="Profile"
                      className="h-12 w-12 rounded-full border-2 border-white object-cover"
                    />
                  ) : (
                    <>
                      <img
                        src="https://cdn2.stylecraze.com/wp-content/uploads/2013/06/Different-Beautiful-American-Girls.jpg.webp"
                        alt="Profile"
                        className="h-12 w-12 rounded-full border-2 border-white object-cover"
                      />
                      <img
                        src="https://images.unsplash.com/photo-1672675225389-4d7b6f231f5b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG5pZ2VyaWFuJTIwbWFufGVufDB8fDB8fHww"
                        alt="Profile"
                        className="h-12 w-12 rounded-full border-2 border-white object-cover"
                      />
                    </>
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900">{date.location}</h3>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {date.participants.map((participant) => (
                      <span
                        key={participant}
                        className="rounded-full bg-[#F3E8FF] px-3 py-1 text-sm font-semibold text-[#5E17EB]"
                      >
                        {participant}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-8 flex-grow">
                <div>
                  <div className="mb-1 text-sm font-bold text-gray-900">Security details</div>
                  <div className="flex gap-2">
                    <span className="rounded-full bg-[#F3E8FF] px-3 py-1 text-sm font-semibold text-[#5E17EB]">
                      {date.security.primary ? "Yes" : "No"}
                    </span>
                    {date.security.secondary && (
                      <span className="rounded-full bg-[#F3E8FF] px-3 py-1 text-sm font-semibold text-[#5E17EB]">
                        No
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <div className="mb-1 text-sm font-bold text-gray-900">Logistics</div>
                  <div className="flex gap-2">
                    <span className="rounded-full bg-[#F3E8FF] px-3 py-1 text-sm font-semibold text-[#5E17EB]">
                      {date.logistics.primary ? "Yes" : "No"}
                    </span>
                    {date.logistics.secondary && (
                      <span className="rounded-full bg-[#F3E8FF] px-3 py-1 text-sm font-semibold text-[#5E17EB]">
                        No
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <Link
                to={`${date.id}`}
                className="rounded-md bg-[#5E17EB] px-6 py-2 text-sm font-bold text-white hover:bg-[#4C11D1] transition-colors ml-auto"
              >
                View details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

