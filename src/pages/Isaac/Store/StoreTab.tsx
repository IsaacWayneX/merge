'use client'

import { useState, useRef } from 'react'
import { Search, Plus, Trash2, X, Upload, ChevronLeft, Star } from 'lucide-react'

interface Product {
  name: string
  description: string
  features: string
  category: string
  images: string[]
  color: string
  sizes: string[]
  price: number
  inStock: boolean
  rating: number
}

interface Category {
  id: string
  name: string
}

export default function StoreTab() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddProductModal, setShowAddProductModal] = useState(false)
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [showSecondModal, setShowSecondModal] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('Women')
  const [newProduct, setNewProduct] = useState<Partial<Product>>({})
  const [categories, setCategories] = useState<Category[]>([
    { id: '1', name: 'Women' },
    { id: '2', name: 'Men' },
    { id: '3', name: 'Gadgets' },
    { id: '4', name: 'Beauty/care' },
    { id: '5', name: 'Footstuff' },
    { id: '6', name: 'Cars' },
  ])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [showSizePicker, setShowSizePicker] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null)

  const products = Array(10).fill({
    id: '1',
    name: 'Grey fitted shirt',
    price: 40.00,
    inStock: true,
    rating: 5.0
  })

  const handleAddCategory = (categoryName: string) => {
    const newCategory = { id: String(categories.length + 1), name: categoryName };
    setCategories([...categories, newCategory]);
    setNewProduct({ ...newProduct, category: categoryName });
    setShowCategoryModal(false);
    setShowAddProductModal(false);
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const imageUrls = Array.from(files).map(file => URL.createObjectURL(file))
      setNewProduct({ ...newProduct, images: imageUrls })
    }
  }

  const handlePublish = () => {
    const formData = new FormData();
    formData.append('name', newProduct.name || '');
    formData.append('description', newProduct.description || '');
    formData.append('features', newProduct.features || '');
    formData.append('category', newProduct.category || '');
    formData.append('colors', JSON.stringify(selectedColors));
    formData.append('sizes', JSON.stringify(newProduct.sizes || []));
    formData.append('price', String(newProduct.price || 0));
    newProduct.images?.forEach((image, index) => {
      formData.append(`image${index + 1}`, image);
    });

    console.log('Published Product:', Object.fromEntries(formData));
    setShowSecondModal(false);
    setShowAddProductModal(false);
    setNewProduct({});
    setSelectedColors([]);
  };

  return (
    <>
      <div className="space-y-4">
        {/* Search and Filter Bar */}
        <div className="flex items-center gap-4">
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 bg-[#5E17EB] text-white rounded-md appearance-none cursor-pointer pr-10 relative"
            style={{
              backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 1rem center',
              backgroundSize: '1em'
            }}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search this category"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
          <button
            onClick={() => setShowAddProductModal(true)}
            className="px-4 py-2 bg-[#5E17EB] text-white rounded-md flex items-center gap-2"
          >
            Add product
            <Plus size={20} />
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-5 gap-4">
          {products.map((product, index) => (
            <div key={index} className="bg-white rounded-2xl shadow overflow-hidden">
              <div className="relative">
                <img 
                  src="/placeholder.svg?height=300&width=300"
                  alt={product.name} 
                  className="w-full aspect-square object-cover"
                />
                <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100">
                  <Trash2 size={20} className="text-gray-600" />
                </button>
              </div>
              <div className="flex flex-col">
                <select 
                  defaultValue="inStock"
                  className="w-full px-4 py-3 bg-[#5E17EB] text-white appearance-none cursor-pointer relative text-center font-medium rounded-b-2xl"
                  style={{
                    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 1rem center',
                    backgroundSize: '1em'
                  }}
                >
                  <option value="inStock">In stock</option>
                  <option value="outOfStock">Out of stock</option>
                </select>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                    <div className="flex items-center">
                      <Star size={16} className="text-yellow-400 fill-yellow-400" />
                      <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
                    </div>
                  </div>
                  <p className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Product Modal - First Step */}
      {showAddProductModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-lg w-[400px]">
            <div className="p-4">
              <div className="flex justify-between items-center mb-6">
                <select
                  className="px-4 py-2 bg-[#5E17EB] text-white rounded-md appearance-none cursor-pointer pr-10 relative min-w-[120px]"
                  style={{
                    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 0.5rem center',
                    backgroundSize: '1em'
                  }}
                  onChange={(e) => {
                    if (e.target.value === 'create') {
                      setShowCategoryModal(true);
                    } else {
                      setNewProduct({ ...newProduct, category: e.target.value });
                    }
                  }}
                  value={newProduct.category || ''}
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                  <option value="create" >+ Create new category</option>
                </select>
                <button onClick={() => setShowAddProductModal(false)}>
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Product name"
                    className="w-full p-3 border border-gray-200 rounded-md"
                    value={newProduct.name || ''}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Product description"
                    className="w-full p-3 border border-gray-200 rounded-md"
                    value={newProduct.description || ''}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Create a list of features for this product"
                    className="w-full p-3 border border-gray-200 rounded-md min-h-[120px]"
                    value={newProduct.features || ''}
                    onChange={(e) => setNewProduct({ ...newProduct, features: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="p-4 mt-4">
              <button
                onClick={() => {
                  setShowAddProductModal(false)
                  setShowSecondModal(true)
                }}
                className="w-full py-3 bg-[#5E17EB] text-white rounded-md font-medium"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Category Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-lg w-[400px]">
            <div className="p-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-medium">Category name</h2>
                <button onClick={() => setShowCategoryModal(false)}>
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Enter category name"
                  className="w-full p-3 border border-gray-200 rounded-md"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                />
              </div>
            </div>
            <div className="p-4 mt-4">
              <button
                onClick={() => {
                  if (newCategoryName.trim()) {
                    handleAddCategory(newCategoryName.trim());
                    setNewCategoryName('');
                  }
                }}
                className="w-full py-3 bg-[#5E17EB] text-white rounded-md font-medium"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Product Modal - Second Step */}
      {showSecondModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-lg w-[400px]">
            <div className="p-4">
              <div className="flex justify-between items-center mb-6">
                <button 
                  onClick={() => {
                    setShowSecondModal(false)
                    setShowAddProductModal(true)
                  }} 
                  className="flex items-center text-gray-600"
                >
                  <ChevronLeft size={20} className="mr-2" />
                  Edit store front
                </button>
                <button onClick={() => setShowSecondModal(false)}>
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-4">
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center">
                    <input
                      type="file"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                      ref={fileInputRef}
                    />
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full h-20 flex items-center justify-center"
                    >
                      <Upload className="text-gray-400" size={24} />
                      <p className="text-sm text-gray-500 ml-2">Click to upload</p>
                    </button>
                  </div>
                  <div className="flex gap-2 overflow-x-auto">
                    {newProduct.images?.map((image, index) => (
                      <div key={index} className="w-16 h-16 flex-shrink-0">
                        <img src={image || "/placeholder.svg"} alt={`Preview ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
                      </div>
                    ))}
                    {newProduct.images && newProduct.images.length < 3 && (
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="w-16 h-16 bg-gray-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-200"
                      >
                        <Plus className="text-gray-400" size={20} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Color Category Section */}
                <div className="space-y-2">
                  <button
                    onClick={() => setShowColorPicker(!showColorPicker)}
                    className="w-full p-3 border border-gray-200 rounded-md flex justify-between items-center"
                  >
                    <span>Add colour category</span>
                    <Plus size={20} />
                  </button>
                  {showColorPicker && (
                    <div className="space-y-3">
                      <div className="relative w-full h-12 mb-3">
                        <div 
                          className="absolute inset-0 rounded-lg"
                          style={{
                            background: 'linear-gradient(to right, #FF0000, #FF7F00, #FFFF00, #00FF00, #0000FF, #4B0082, #8F00FF)'
                          }}
                        />
                        <input
                          type="color"
                          className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                          onChange={(e) => {
                            if (!selectedColors.includes(e.target.value)) {
                              setSelectedColors(colors => [...colors, e.target.value])
                            }
                          }}
                        />
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {selectedColors.map((color, index) => (
                          <div 
                            key={index}
                            className="flex items-center gap-1 bg-gray-100 rounded-md p-1 pr-2"
                          >
                            <div 
                              className="w-6 h-6 rounded" 
                              style={{ backgroundColor: color }}
                            />
                            <button
                              onClick={() => setSelectedColors(colors => 
                                colors.filter((_, i) => i !== index)
                              )}
                              className="text-gray-500 hover:text-gray-700"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Size Category Section */}
                <div className="space-y-2">
                  <button
                    onClick={() => setShowSizePicker(!showSizePicker)}
                    className="w-full p-3 border border-gray-200 rounded-md flex justify-between items-center"
                  >
                    <span>Add size category</span>
                    <Plus size={20} />
                  </button>
                  {showSizePicker && (
                    <div className="flex gap-2">
                      {['S', 'M', 'L', 'XL'].map((size) => (
                        <label key={size} className="flex-1">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={selectedSizes.includes(size)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedSizes(prev => [...prev, size]);
                              } else {
                                setSelectedSizes(prev => prev.filter(s => s !== size));
                              }
                            }}
                          />
                          <div className="h-10 rounded-md border border-gray-200 flex items-center justify-center cursor-pointer peer-checked:bg-[#5E17EB] peer-checked:text-white">
                            {size}
                          </div>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <input
                    type="number"
                    placeholder="Product price"
                    className="w-full p-3 border border-gray-200 rounded-md"
                    value={newProduct.price || ''}
                    onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                  />
                </div>
              </div>
            </div>
            <div className="p-4 mt-4">
              <button
                onClick={handlePublish}
                className="w-full py-3 bg-[#5E17EB] text-white rounded-md font-medium"
              >
                Publish
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

