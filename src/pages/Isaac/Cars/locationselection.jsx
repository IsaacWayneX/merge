import React, { useState, useEffect } from "react"
import Modal from "react-modal"
import { Search } from "lucide-react"

const API_KEY = "AIzaSyCKGOncl1C9CKmSzx9ExmibDumfVSJWl6s"

const LocationSelectionModal = ({ isVisible, onClose, onSelectLocation }) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [locations, setLocations] = useState([])
  const [loading, setLoading] = useState(false)
  const [autocompleteService, setAutocompleteService] = useState(null)

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const script = document.createElement("script")
      script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`
      script.async = true
      script.defer = true
      document.head.appendChild(script)

      script.onload = () => {
        const service = new window.google.maps.places.AutocompleteService()
        setAutocompleteService(service)
      }
    }

    if (!window.google) {
      loadGoogleMapsScript()
    } else {
      const service = new window.google.maps.places.AutocompleteService()
      setAutocompleteService(service)
    }
  }, [])

  useEffect(() => {
    const searchLocations = async () => {
      if (!searchQuery || !autocompleteService) return

      setLoading(true)

      try {
        const request = {
          input: searchQuery,
          types: ["geocode"],
        }

        autocompleteService.getPlacePredictions(request, (predictions, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
            const formattedLocations = predictions.map((prediction) => ({
              place_id: prediction.place_id,
              description: prediction.description,
              structured_formatting: prediction.structured_formatting,
            }))
            setLocations(formattedLocations)
          } else {
            console.error("Error fetching location predictions:", status)
          }
        })
      } catch (error) {
        console.error("Error fetching locations:", error)
      } finally {
        setLoading(false)
      }
    }

    const timeoutId = setTimeout(() => searchLocations(), 500)
    return () => clearTimeout(timeoutId)
  }, [searchQuery, autocompleteService])

  const extractAddressComponents = (addressComponents) => {
    const componentMap = {}
    addressComponents.forEach((component) => {
      const type = component.types[0]
      componentMap[type] = component.long_name
      if (type === "administrative_area_level_1") {
        componentMap.state_short = component.short_name
      }
      if (type === "country") {
        componentMap.country_short = component.short_name
      }
    })

    return {
      city: componentMap.locality || componentMap.administrative_area_level_2 || "",
      state: componentMap.administrative_area_level_1 || "",
      country: componentMap.country || "",
      latitude: "",
      longitude: "",
    }
  }

  const handleLocationSelect = async (location) => {
    try {
      const geocoder = new window.google.maps.Geocoder()
      const placeDetails = await new Promise((resolve, reject) => {
        geocoder.geocode({ placeId: location.place_id }, (results, status) => {
          if (status === window.google.maps.GeocoderStatus.OK && results && results[0]) {
            resolve(results[0])
          } else {
            reject(new Error("Failed to retrieve location details."))
          }
        })
      })

      const { geometry, address_components } = placeDetails
      const { location: coords } = geometry

      // Extract address components
      const addressInfo = extractAddressComponents(address_components)

      // Pass the location data directly to parent component
      onSelectLocation({
        ...addressInfo,
        latitude: coords.lat().toString(),
        longitude: coords.lng().toString(),
      })

      onClose()
    } catch (error) {
      console.error("Error processing location selection:", error)
    }
  }

  return (
    <Modal
      isOpen={isVisible}
      onRequestClose={onClose}
      className="relative bg-white rounded-lg shadow-lg max-w-md w-full mx-auto p-4 max-h-[60vh] overflow-hidden"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60"
      style={{
        overlay: { zIndex: 1100 },
      }}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center space-x-2 mb-3 border-b border-gray-200 pb-2">
          <Search size={18} className="text-gray-500" />
          <input
            type="text"
            className="w-full outline-none bg-transparent placeholder-gray-400 text-gray-700 text-sm"
            placeholder="Search locations"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-2">
            <div className="border-t-4 border-teal-500 rounded-full w-5 h-5 animate-spin"></div>
          </div>
        ) : (
          <div className="overflow-y-auto max-h-[45vh] -mx-4 px-4">
            <ul className="space-y-2">
              {locations.map((location) => (
                <li
                  key={location.place_id}
                  onClick={() => handleLocationSelect(location)}
                  className="cursor-pointer hover:bg-gray-50 p-2 rounded-md text-gray-700 text-sm"
                >
                  {location.description}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Modal>
  )
}

export default LocationSelectionModal