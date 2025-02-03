import { useState } from "react"
import { Plus, Bell, X, ChevronLeft } from "lucide-react"
import SubscriptionUsers from "./subscription-users"

interface Plan {
  id: number
  name: string
  price: number
}

const initialPlans: Plan[] = [
  { id: 1, name: "Weekly", price: 10 },
  { id: 2, name: "Monthly", price: 30 },
  { id: 3, name: "Yearly", price: 300 },
]

export default function Subscriptions() {
  const [plans, setPlans] = useState<Plan[]>(initialPlans)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isViewUsersOpen, setIsViewUsersOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)
  const [newPlan, setNewPlan] = useState({ name: "", price: "" })
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null)
  const [editPrice, setEditPrice] = useState("")

  const handleSave = () => {
    if (newPlan.name && newPlan.price) {
      const newPlanObj = {
        id: plans.length + 1,
        name: newPlan.name,
        price: Number.parseFloat(newPlan.price),
      }
      setPlans([...plans, newPlanObj])
      setNewPlan({ name: "", price: "" })
      setIsAddModalOpen(false)
    }
  }

  const handleEdit = (plan: Plan) => {
    setEditingPlan(plan)
    setEditPrice(plan.price.toString())
    setIsEditModalOpen(true)
  }

  const handleDelete = (planId: number) => {
    setPlans(plans.filter((plan) => plan.id !== planId))
  }

  const handleEditSave = () => {
    if (editingPlan && editPrice) {
      const updatedPlans = plans.map((plan) =>
        plan.id === editingPlan.id ? { ...plan, price: Number.parseFloat(editPrice) } : plan,
      )
      setPlans(updatedPlans)
      setIsEditModalOpen(false)
      setEditingPlan(null)
    }
  }

  const handleViewUsers = (plan: Plan) => {
    setSelectedPlan(plan)
    setIsViewUsersOpen(true)
  }

  if (isViewUsersOpen && selectedPlan) {
    return (
      <SubscriptionUsers
        planName={selectedPlan.name}
        onBack={() => {
          setIsViewUsersOpen(false)
          setSelectedPlan(null)
        }}
      />
    )
  }

  return (
    <div className="p-6 min-h-screen w-full component-border">
      {/* Add Plan Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-lg">
            <div className="flex items-center justify-between p-4 border-b">
              <button onClick={() => setIsAddModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <ChevronLeft size={20} className="text-gray-600" />
              </button>
              <span className="text-lg">Add plan</span>
              <button onClick={() => setIsAddModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <X size={20} className="text-gray-600" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="block text-sm text-gray-600">Plan name</label>
                <input
                  type="text"
                  value={newPlan.name}
                  onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C27FF] text-gray-600"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm text-gray-600">Price</label>
                <input
                  type="number"
                  value={newPlan.price}
                  onChange={(e) => setNewPlan({ ...newPlan, price: e.target.value })}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C27FF] text-gray-600"
                />
              </div>

              <button
                onClick={handleSave}
                className="w-full bg-[#6C27FF] text-white py-2 rounded-lg hover:bg-[#5820CC] transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Plan Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-lg">
            <div className="flex items-center justify-between p-4 border-b">
              <button onClick={() => setIsEditModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <ChevronLeft size={20} className="text-gray-600" />
              </button>
              <span className="text-lg">Edit Subscription</span>
              <button onClick={() => setIsEditModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <X size={20} className="text-gray-600" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="block text-sm text-gray-600">Price</label>
                <input
                  type="number"
                  value={editPrice}
                  onChange={(e) => setEditPrice(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C27FF] text-gray-600"
                />
              </div>

              <button
                onClick={handleEditSave}
                className="w-full bg-[#6C27FF] text-white py-2 rounded-lg hover:bg-[#5820CC] transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="space-y-4 ">
      <div className="flex justify-between items-center mb-8 ">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-[#6C27FF] px-4 py-2 text-white hover:bg-[#5820CC] transition-colors"
        >
          <span>Add plan</span>
          <Plus size={20} />
        </button>

        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <Bell size={20} className="text-gray-600" />
        </button>
      </div>

      <div className="space-y-4 ">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="flex items-center justify-between rounded-lg border border-gray-200 p-4 hover:border-gray-300 transition-colors"
          >
            <div className="flex flex-col">
              <span className="text-gray-900">{plan.name}</span>
              <span className="text-sm text-gray-500">${plan.price}</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleViewUsers(plan)}
                className="rounded-lg bg-[#6C27FF]/10 px-4 py-2 text-[#6C27FF] hover:bg-[#6C27FF]/20 transition-colors"
              >
                View users
              </button>
              <button
                onClick={() => handleEdit(plan)}
                className="rounded-lg bg-[#6C27FF] px-4 py-2 text-white hover:bg-[#5820CC] transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(plan.id)}
                className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  )
}

