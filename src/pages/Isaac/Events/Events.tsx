import { useState, type FormEvent } from "react"
import { Trash2, X, Upload } from "lucide-react"
import TicketsModal, { getAttendeesCount } from "./TicketsModal"

interface Event {
  id: number
  title: string
  location: string
  date: string
  image: string
}

const dummyEvents: Event[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  title: "Summer music festival",
  location: "Gwarimpa, Abuja",
  date: "17 Oct, 2024",
  image:
    "https://c8.alamy.com/comp/2DKYB9K/summer-festival-banner-with-vintage-tropical-lettering-postcard-style-and-beach-background-suitable-for-banner-flyer-invitation-poster-web-site-o-2DKYB9K.jpg",
}))

export default function Events() {
  const [showActionModal, setShowActionModal] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showBannerModal, setShowBannerModal] = useState(false)
  const [showAttendeesModal, setShowAttendeesModal] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [bannerFile, setBannerFile] = useState<File | null>(null)

  const openActionModal = (event: Event) => {
    setSelectedEvent(event)
    setShowActionModal(true)
  }

  const openAttendeesModal = (event: Event) => {
    setSelectedEvent(event)
    setShowAttendeesModal(true)
  }

  const handleAddEvent = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    // Append all form fields
    const eventPayload = new FormData()
    eventPayload.append("title", formData.get("title") as string)
    eventPayload.append("location", formData.get("location") as string)
    eventPayload.append("date", formData.get("date") as string)
    eventPayload.append("price", formData.get("price") as string)
    eventPayload.append("description", formData.get("description") as string)

    setShowAddModal(false)
    setShowBannerModal(true)
  }

  const handleBannerUpload = async () => {
    if (!bannerFile) return

    const eventPayload = new FormData()
    eventPayload.append("banner", bannerFile)

    // Here you would typically send both form data and banner to your API
    // await createEvent(eventPayload)

    setShowBannerModal(false)
    setBannerFile(null)
  }

  return (
    <div className="bg-white min-h-screen w-full">
      {/* Add Event Button */}
      <button
        onClick={() => setShowAddModal(true)}
        className="mb-6 bg-[#5E17EB] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#4B11C2]"
      >
        <span>Add Event</span>
        <span>+</span>
      </button>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {dummyEvents.map((event) => (
          <div key={event.id} className="bg-white rounded-lg overflow-hidden">
            <div className="flex h-32">
              {/* Left: Banner Image */}
              <div className="w-1/3 rounded-lg overflow-hidden">
                <img
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              {/* Middle: Event Details */}
              <div className="w-1/2 p-4 flex flex-col justify-center">
                <h3 className="text-lg font-semibold mb-1 text-gray-900">{event.title}</h3>
                <p className="text-gray-700 text-sm mb-1">{event.location}</p>
                <p className="text-gray-600 text-sm">{event.date}</p>
              </div>

              {/* Right: Actions */}
              <div className="w-1/6 p-4 flex flex-col justify-between items-end">
                <button onClick={() => openActionModal(event)} className="p-2 hover:bg-gray-100 rounded-full">
                  <Trash2 className="h-5 w-5 text-gray-700" />
                </button>
                <button
                  onClick={() => openAttendeesModal(event)}
                  className="bg-[#5E17EB] text-white px-3 py-1 rounded-full text-sm font-medium"
                >
                  {getAttendeesCount(event.id)}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tickets Modal */}
      {selectedEvent && (
        <TicketsModal
          isOpen={showAttendeesModal}
          onClose={() => setShowAttendeesModal(false)}
          eventId={selectedEvent.id}
          eventTitle={selectedEvent.title}
        />
      )}

      {/* Action Modal */}
      {showActionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Event Actions</h3>
              <button onClick={() => setShowActionModal(false)}>
                <X className="h-5 w-5 text-gray-700" />
              </button>
            </div>
            <div className="space-y-3">
              <button className="w-full py-2 text-left hover:bg-gray-100 rounded px-2 text-gray-800">Edit</button>
              <button className="w-full py-2 text-left text-red-600 hover:bg-gray-100 rounded px-2">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Event Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Add New Event</h3>
              <button onClick={() => setShowAddModal(false)}>
                <X className="h-5 w-5 text-gray-700" />
              </button>
            </div>
            <form onSubmit={handleAddEvent} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Event Name</label>
                <input
                  name="title"
                  type="text"
                  required
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5E17EB] text-gray-800"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  name="location"
                  type="text"
                  required
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5E17EB] text-gray-800"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  name="date"
                  type="date"
                  required
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5E17EB] text-gray-800"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                <input
                  name="price"
                  type="number"
                  required
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5E17EB] text-gray-800"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Place Description</label>
                <textarea
                  name="description"
                  required
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5E17EB] text-gray-800"
                  rows={3}
                />
              </div>
              <button type="submit" className="w-full bg-[#5E17EB] text-white py-2 rounded-lg hover:bg-[#4B11C2]">
                Next
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Banner Upload Modal */}
      {showBannerModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Upload Event Banner</h3>
              <button onClick={() => setShowBannerModal(false)}>
                <X className="h-5 w-5 text-gray-700" />
              </button>
            </div>
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer"
              onClick={() => document.getElementById("banner-upload")?.click()}
            >
              <input
                id="banner-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setBannerFile(e.target.files?.[0] || null)}
              />
              <Upload className="mx-auto h-12 w-12 text-gray-700 mb-4" />
              <p className="text-gray-700">{bannerFile ? bannerFile.name : "Click to upload banner image"}</p>
            </div>
            <button
              onClick={handleBannerUpload}
              className="w-full bg-[#5E17EB] text-white py-2 rounded-lg mt-4 hover:bg-[#4B11C2]"
              disabled={!bannerFile}
            >
              Complete
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

