import type React from "react"
import { useState } from "react"
import { ChevronLeft, X, ImageIcon, ChevronDown } from "lucide-react"
import Security from "./security"

interface CarFormData {
  category: string
  brand: string
  price: string
  location: string
  image?: File
}

export default function CarsManagement() {
  const [activeTab, setActiveTab] = useState("cars")
  const [isAddCarModalOpen, setIsAddCarModalOpen] = useState(false)
  const [deleteConfirmation, setDeleteConfirmation] = useState<number | null>(null)
  const [editingCar, setEditingCar] = useState<any | null>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isAddBrandModalOpen, setIsAddBrandModalOpen] = useState(false) // Added state variable

  const cars = [
    { id: 1, name: "Toyoya SUV", price: "$200", brand: "Toyota", category: "High budget", location: "New York" },
    {
      id: 2,
      name: "Mercedes C300",
      price: "$200",
      brand: "Mercedes",
      category: "High budget",
      location: "Los Angeles",
    },
    {
      id: 3,
      name: "Toyota corolla LE",
      price: "$200",
      brand: "Toyota",
      category: "Middle budget",
      location: "Chicago",
    },
    {
      id: 4,
      name: "Chevrolet Camaro",
      price: "$200",
      brand: "Chevrolet",
      category: "Middle budget",
      location: "Houston",
    },
    { id: 5, name: "Mercedes glk 350", price: "$200", brand: "Mercedes", category: "High budget", location: "Miami" },
    { id: 6, name: "Hyundai", price: "$200", brand: "Hyundai", category: "Low budget", location: "Seattle" },
  ]

  const brands = ["Toyota", "Mercedes", "Chevrolet", "Hyundai"]

  const handleAddCar = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data: CarFormData = {
      category: formData.get("category") as string,
      brand: formData.get("brand") as string,
      price: formData.get("price") as string,
      location: formData.get("location") as string,
      image: formData.get("image") as unknown as File,
    }
    // Here you would typically send the formData to your backend
    console.log(data)
    setIsAddCarModalOpen(false)
    setEditingCar(null)
    setSelectedImage(null)
  }

  const handleAddBrand = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    // Here you would typically send the formData to your backend
    console.log(Object.fromEntries(formData))
    setIsAddBrandModalOpen(false)
  }

  const handleDelete = (id: number) => {
    // Here you would typically send a delete request to your backend
    console.log(`Deleting car with id: ${id}`)
    setDeleteConfirmation(null)
  }

  return (
    <div className="min-h-screen bg-white border border-gray-200">
      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-6">
            <button
              onClick={() => setActiveTab("cars")}
              className={`pb-1 ${activeTab === "cars" ? "text-black font-medium border-b-2 border-black" : "text-gray-500 hover:text-gray-700"}`}
            >
              Cars
            </button>
            <button
              onClick={() => setActiveTab("security")}
              className={`pb-1 ${activeTab === "security" ? "text-black font-medium border-b-2 border-black" : "text-gray-500 hover:text-gray-700"}`}
            >
              Security
            </button>
          </div>
          {activeTab === "cars" && (
            <button
              onClick={() => setIsAddCarModalOpen(true)}
              className="bg-[#E9E3FF] text-[#6C38FF] px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#DCD3FF]"
            >
              Add Cars
              <span className="text-xl">+</span>
            </button>
          )}
        </div>

        {activeTab === "cars" ? (
          <div className="w-full">
            <div className="grid grid-cols-3 bg-gray-50 p-4 border-y border-gray-200">
              <div className="text-gray-600 font-medium">Car</div>
              <div className="text-gray-600 font-medium">Price</div>
              <div className="text-gray-600 font-medium">Action</div>
            </div>

            <div className="divide-y divide-gray-200">
              {cars.map((car) => (
                <div key={car.id} className="grid grid-cols-3 p-4 items-center relative">
                  <div className="flex items-center gap-4">
                    <img src="/placeholder.svg" alt={car.name} className="w-20 h-15 rounded-lg object-cover" />
                    <span className="font-medium">{car.name}</span>
                  </div>
                  <div>{car.price}</div>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setDeleteConfirmation(car.id)}
                      className="bg-[#E9E3FF] text-[#6C38FF] px-4 py-2 rounded-lg hover:bg-[#DCD3FF]"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => {
                        setEditingCar(car)
                        setIsAddCarModalOpen(true)
                      }}
                      className="bg-[#6C38FF] text-white px-6 py-2 rounded-lg hover:bg-[#5B2FD9]"
                    >
                      Edit
                    </button>
                  </div>
                  {deleteConfirmation === car.id && (
                    <div className="absolute right-0 top-[-60px] bg-white border border-gray-200 rounded-lg p-4 shadow-lg">
                      <p className="mb-2">Are you sure you want to delete this car?</p>
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setDeleteConfirmation(null)}
                          className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleDelete(car.id)}
                          className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <Security />
        )}
      </div>

      {isAddCarModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-6 w-[400px]">
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setIsAddCarModalOpen(false)
                  setEditingCar(null)
                  setSelectedImage(null)
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddCar} className="space-y-6">
              <div>
                <label className="block text-sm text-gray-600 mb-2">Category</label>
                <div className="relative">
                  <select
                    name="category"
                    className="w-full p-3 border border-gray-200 rounded-lg appearance-none pr-10 bg-white"
                    defaultValue={editingCar?.category || ""}
                  >
                    <option value="">Select category</option>
                    <option value="High budget">High budget</option>
                    <option value="Middle budget">Middle budget</option>
                    <option value="Low budget">Low budget</option>
                  </select>
                  <ChevronDown className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">Car Brand</label>
                <div className="relative">
                  <select
                    name="brand"
                    className="w-full p-3 border border-gray-200 rounded-lg appearance-none pr-10 bg-white"
                    defaultValue={editingCar?.brand || ""}
                  >
                    <option value="">Add Brand</option>
                    {brands.map((brand) => (
                      <option key={brand} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">Rental price</label>
                <input
                  type="text"
                  name="price"
                  placeholder="$200.00"
                  className="w-full p-3 border border-gray-200 rounded-lg bg-white"
                  defaultValue={editingCar?.price || ""}
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">Location</label>
                <div className="relative">
                  <select
                    name="location"
                    className="w-full p-3 border border-gray-200 rounded-lg appearance-none pr-10 bg-white"
                    defaultValue={editingCar?.location || ""}
                  >
                    <option value="">Select location</option>
                    <option value="Abuja, Nigeria">Abuja, Nigeria</option>
                    <option value="Lagos, Nigeria">Lagos, Nigeria</option>
                    <option value="Port Harcourt, Nigeria">Port Harcourt, Nigeria</option>
                  </select>
                  <ChevronDown className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">Upload car image</label>
                <div className="relative">
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    className="hidden"
                    id="car-image"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        setSelectedImage(URL.createObjectURL(file))
                      }
                    }}
                  />
                  {selectedImage ? (
                    <div className="relative inline-block">
                      <img
                        src={selectedImage || "/placeholder.svg"}
                        alt="Selected car"
                        className="w-32 h-24 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedImage(null)
                          const input = document.getElementById("car-image") as HTMLInputElement
                          if (input) input.value = ""
                        }}
                        className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-sm"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <label
                      htmlFor="car-image"
                      className="w-32 h-24 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-50"
                    >
                      <ImageIcon className="w-8 h-8 text-gray-300" />
                    </label>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#6C38FF] text-white py-3 rounded-lg hover:bg-[#5B2FD9] transition-colors"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      )}

      {isAddBrandModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add Brand</h2>
              <button onClick={() => setIsAddBrandModalOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleAddBrand}>
              <div className="mb-4">
                <label className="block mb-2">Brand Name</label>
                <input type="text" name="brandName" className="w-full p-2 border rounded" />
              </div>
              <button type="submit" className="w-full bg-[#6C38FF] text-white px-4 py-2 rounded-lg hover:bg-[#5B2FD9]">
                Add Brand
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

