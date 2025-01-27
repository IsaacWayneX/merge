import { useState, type FormEvent } from "react";
import { Trash2, X, Upload, Star } from "lucide-react";
import { Document, Page } from "react-pdf";

interface Place {
  id: number
  name: string
  location: string
  category: string
  rating: number
  images: string[]
  weekdayHours: string
  weekendHours: string
  menuPdf?: string
}

const dummyCategories = ["Restaurant", "Bar", "Club", "Cafe", "Lounge"]

const dummyPlaces: Place[] = [
  {
    id: 1,
    name: "Puzzzles Abuja",
    location: "Gwarimpa, Abuja",
    category: "Restaurant",
    rating: 4,
    images: [
      "https://www.yum.com/wps/wcm/connect/yumbrands/77ac5d27-1357-4792-9953-54b11f5ae7dd/yum-com-24-product-PH.jpg?MOD=AJPERES&CACHEID=ROOTWORKSPACE.Z18_5QC4HBC039RJ406SQH4UBH3695-77ac5d27-1357-4792-9953-54b11f5ae7dd-oXSxcXb",
    ],
    weekdayHours: "9:00 AM - 10:00 PM",
    weekendHours: "10:00 AM - 11:00 PM",
  },
  {
    id: 2,
    name: "Coal City Bukka",
    location: "Gwarimpa, Abuja",
    category: "Restaurant",
    rating: 5,
    images: [
      "https://images.timbu.com/contents-11243d64aac14aaebb90558e1f19176e/5fdfaf56-462b-4f92-ae77-9580ae194e49.png",
    ],
    weekdayHours: "8:00 AM - 9:00 PM",
    weekendHours: "9:00 AM - 10:00 PM",
  },
]

export default function Places1() {
  const [showActionModal, setShowActionModal] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showBannerModal, setShowBannerModal] = useState(false)
  const [showHoursModal, setShowHoursModal] = useState(false)
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null)
  const [rating, setRating] = useState(0)
  const [bannerFiles, setBannerFiles] = useState<File[]>([])
  const [menuFile, setMenuFile] = useState<File | null>(null)
  const [menuPreviewUrl, setMenuPreviewUrl] = useState<string>("")
  const [isEditMode, setIsEditMode] = useState(false)

  const openActionModal = (place: Place) => {
    setSelectedPlace(place)
    setShowActionModal(true)
  }

  const handleAddPlace = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    // Append all form fields
    const placePayload = new FormData()
    placePayload.append("name", formData.get("name") as string)
    placePayload.append("location", formData.get("location") as string)
    placePayload.append("category", formData.get("category") as string)
    placePayload.append("description", formData.get("description") as string)
    placePayload.append("rating", rating.toString())

    setShowAddModal(false)
    setShowBannerModal(true)
  }

  const handleBannerUpload = () => {
    if (bannerFiles.length === 0) return
    setShowBannerModal(false)
    setShowHoursModal(true)
  }

  const handleHoursAndMenu = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    // Here you would typically send all data to your API
    // await createPlace(formData)

    setShowHoursModal(false)
    resetForm()
  }

  const handleCreateCategory = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    // Here you would typically send category data to your API
    // await createCategory(formData.get("category"))

    setShowCategoryModal(false)
  }

  const resetForm = () => {
    setRating(0)
    setBannerFiles([])
    setMenuFile(null)
    setMenuPreviewUrl("")
    setIsEditMode(false)
  }

  const handleMenuUpload = (file: File) => {
    setMenuFile(file)
    const url = URL.createObjectURL(file)
    setMenuPreviewUrl(url)
  }

  return (
    <div className="bg-white min-h-screen w-full">
      {/* Add Place Button */}
      <button
        onClick={() => setShowAddModal(true)}
        className="mb-6 bg-[#5E17EB] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#4B11C2]"
      >
        <span>Add Place</span>
        <span>+</span>
      </button>

      {/* Places Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {dummyPlaces.map((place) => (
          <div key={place.id} className="bg-white rounded-lg overflow-hidden">
            <div className="flex h-32">
              {/* Left: Banner Image */}
              <div className="w-1/2 rounded-lg overflow-hidden">
                <img
                  src={place.images[0] || "/placeholder.svg"}
                  alt={place.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              {/* Right: Place Details */}
              <div className="w-1/2 p-4 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-1 text-gray-900">{place.name}</h3>
                  <p className="text-gray-700 text-sm">{place.location}</p>
                </div>
                <button onClick={() => openActionModal(place)} className="self-end p-2 hover:bg-gray-100 rounded-full">
                  <Trash2 className="h-5 w-5 text-gray-700" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Action Modal */}
      {showActionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Place Actions</h3>
              <button onClick={() => setShowActionModal(false)}>
                <X className="h-5 w-5 text-gray-700" />
              </button>
            </div>
            <div className="space-y-3">
              <button
                onClick={() => {
                  setIsEditMode(true)
                  setShowAddModal(true)
                  setShowActionModal(false)
                }}
                className="w-full py-2 text-left hover:bg-gray-100 rounded px-2 text-gray-800"
              >
                Edit
              </button>
              <button className="w-full py-2 text-left text-red-600 hover:bg-gray-100 rounded px-2">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Place Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{isEditMode ? "Edit Place" : "Add New Place"}</h3>
              <button onClick={() => setShowAddModal(false)}>
                <X className="h-5 w-5 text-gray-700" />
              </button>
            </div>
            <form onSubmit={handleAddPlace} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <div className="relative">
                  <select
                    name="category"
                    required
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5E17EB] text-gray-800 appearance-none"
                  >
                    {dummyCategories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="button"
                  onClick={() => setShowCategoryModal(true)}
                  className="mt-1 text-[#5E17EB] text-sm hover:underline"
                >
                  Create new category
                </button>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Place Name</label>
                <input
                  name="name"
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Place Description</label>
                <textarea
                  name="description"
                  required
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5E17EB] text-gray-800"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="text-gray-400 hover:text-[#5E17EB]"
                    >
                      {star <= rating ? (
                        <Star className="h-6 w-6 fill-[#5E17EB] text-[#5E17EB]" />
                      ) : (
                        <Star className="h-6 w-6" />
                      )}
                    </button>
                  ))}
                </div>
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
              <h3 className="text-lg font-semibold text-gray-900">Upload Place Images</h3>
              <button onClick={() => setShowBannerModal(false)}>
                <X className="h-5 w-5 text-gray-700" />
              </button>
            </div>
            <div className="space-y-4">
              {[0, 1, 2].map((index) => (
                <div
                  key={index}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer"
                  onClick={() => document.getElementById(`banner-upload-${index}`)?.click()}
                >
                  <input
                    id={`banner-upload-${index}`}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        const newFiles = [...bannerFiles]
                        newFiles[index] = file
                        setBannerFiles(newFiles)
                      }
                    }}
                  />
                  <Upload className="mx-auto h-12 w-12 text-gray-700 mb-4" />
                  <p className="text-gray-700">
                    {bannerFiles[index] ? bannerFiles[index].name : `Click to upload banner image ${index + 1}`}
                  </p>
                </div>
              ))}
            </div>
            <button
              onClick={handleBannerUpload}
              className="w-full bg-[#5E17EB] text-white py-2 rounded-lg mt-4 hover:bg-[#4B11C2]"
              disabled={bannerFiles.length === 0}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Hours and Menu Modal */}
      {showHoursModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Opening Hours & Menu</h3>
              <button onClick={() => setShowHoursModal(false)}>
                <X className="h-5 w-5 text-gray-700" />
              </button>
            </div>
            <form onSubmit={handleHoursAndMenu} className="space-y-4">
              <div>
                <div className="inline-block px-2 py-1 rounded bg-[#5E17EB]/10 mb-1">
                  <span className="text-sm font-medium text-[#5E17EB]">Weekdays</span>
                </div>
                <input
                  name="weekdayHours"
                  type="text"
                  required
                  placeholder="e.g. 9:00 AM - 10:00 PM"
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5E17EB] text-gray-800"
                />
              </div>
              <div>
                <div className="inline-block px-2 py-1 rounded bg-[#5E17EB]/10 mb-1">
                  <span className="text-sm font-medium text-[#5E17EB]">Weekends</span>
                </div>
                <input
                  name="weekendHours"
                  type="text"
                  required
                  placeholder="e.g. 10:00 AM - 11:00 PM"
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5E17EB] text-gray-800"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Menu PDF</label>
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer"
                  onClick={() => document.getElementById("menu-upload")?.click()}
                >
                  <input
                    id="menu-upload"
                    type="file"
                    accept="application/pdf"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleMenuUpload(file)
                    }}
                  />
                  <Upload className="mx-auto h-12 w-12 text-gray-700 mb-4" />
                  <p className="text-gray-700">{menuFile ? menuFile.name : "Click to upload menu PDF"}</p>
                </div>
                {menuPreviewUrl && (
                  <div className="mt-4 border rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">PDF Preview</h4>
                    <Document file={menuPreviewUrl}>
                      <Page pageNumber={1} width={300} />
                    </Document>
                  </div>
                )}
              </div>
              <button type="submit" className="w-full bg-[#5E17EB] text-white py-2 rounded-lg hover:bg-[#4B11C2]">
                Save
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Create Category Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Create Category</h3>
              <button onClick={() => setShowCategoryModal(false)}>
                <X className="h-5 w-5 text-gray-700" />
              </button>
            </div>
            <form onSubmit={handleCreateCategory} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
                <input
                  name="category"
                  type="text"
                  required
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5E17EB] text-gray-800"
                />
              </div>
              <button type="submit" className="w-full bg-[#5E17EB] text-white py-2 rounded-lg hover:bg-[#4B11C2]">
                Create
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

