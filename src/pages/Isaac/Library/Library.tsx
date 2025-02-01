import { useState, useEffect } from 'react';
import { Search, Bell, Plus, X } from 'lucide-react';
import apiClient from "../utils/apiClient";

interface Book {
  id: number
  title: string
  author: string
  price: number
  rating: number
  cover_url: string
  category: string
}

interface Category {
  value: string
  label: string
}

const dummyBooks: Book[] = Array(30).fill(null).map((_, index) => ({
  id: index + 1,
  title: "Batman vs Superman",
  author: "DC Comics",
  price: 19.99,
  rating: 5,
  cover_url: "https://i.ebayimg.com/images/g/cMIAAOSwDahiErVI/s-l1200.jpg",
  category: "Comics"
}))

export default function Library() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [books, setBooks] = useState<Book[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [selectedBookCategory, setSelectedBookCategory] = useState<Category | null>(null)
  const [selectedEditCategory, setSelectedEditCategory] = useState<Category | null>(null)

  const [newCategory, setNewCategory] = useState('')
  const [newBookTitle, setNewBookTitle] = useState('')
  const [newBookAuthor, setNewBookAuthor] = useState('')
  const [newBookPrice, setNewBookPrice] = useState('')
  const [newBookRating, setNewBookRating] = useState(0)
  const [newBookFile, setNewBookFile] = useState<File | null>(null)
  const [newCoverImage, setNewCoverImage] = useState<File | null>(null)

  const [editingBook, setEditingBook] = useState<Book | null>(null)
  const [searchTerm, setSearchTerm] = useState('')


  useEffect(() => {
    fetchBooks()
    fetchCategories()
  }, [])

  const fetchBooks = async () => {
    try {
        setIsLoading(true);
        const response = await apiClient.get("/admin/book/all");

        setBooks(response.data.data || []);
    } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        setBooks(dummyBooks);
    } finally {
        setIsLoading(false);
    }
};

const fetchCategories = async () => {
  try {
      const response = await apiClient.get("/admin/book/all-categories");

      const formattedCategories = (response.data.data || []).map((cat: any) => ({
          value: cat.id,
          label: cat.name,
      }));

      setCategories(formattedCategories);
    } catch (err) {
      setError("There seems to be a problem");
  }
};

const handleAddCategory = async () => {
  if (newCategory.trim() === "") return;

  try {
      await apiClient.post("/admin/book/new-category", {
          name: newCategory,
          description: newCategory,
      });

      await fetchCategories();
      setNewCategory("");
      setIsCategoryModalOpen(false);
    } catch (err) {
      setError("Wahala Wahala Wahala!");
  }
};

 
const handleAddBook = async () => {
  if (!newBookTitle || !newBookFile || !newCoverImage || !selectedBookCategory) return;

  try {
      const formData = new FormData();
      formData.append("title", newBookTitle);
      formData.append("author", newBookAuthor);
      formData.append("price", newBookPrice);
      formData.append("rating", newBookRating.toString());
      formData.append("file", newBookFile);
      formData.append("imgFile", newCoverImage);
      formData.append("category_id", selectedBookCategory.value);

      await apiClient.post("/admin/book/new", formData, {
          headers: {
              "Content-Type": "multipart/form-data",
          },
      });

      await fetchBooks();
      setNewBookTitle("");
      setNewBookAuthor("");
      setNewBookPrice("");
      setNewBookRating(0);
      setNewBookFile(null);
      setNewCoverImage(null);
      setSelectedBookCategory(null);
      setIsModalOpen(false);
    } catch (err) {
      setError("Wahala Wahala Wahala!");
  }
};

const handleSaveEdit = async () => {
  if (!editingBook || !newBookTitle) return;

  try {
      const formData = new FormData();
      formData.append("id", editingBook.id.toString());
      formData.append("title", newBookTitle);
      formData.append("author", newBookAuthor);
      formData.append("price", newBookPrice);
      formData.append("rating", newBookRating.toString());

      if (newBookFile) formData.append("file", newBookFile);
      if (newCoverImage) formData.append("imgFile", newCoverImage);
      if (selectedEditCategory) formData.append("category_id", selectedEditCategory.value);

      await apiClient.patch("/admin/book/edit", formData, {
          headers: {
              "Content-Type": "multipart/form-data",
          },
      });

      await fetchBooks();
      setEditingBook(null);
      setNewBookTitle("");
      setNewBookAuthor("");
      setNewBookPrice("");
      setNewBookRating(0);
      setNewBookFile(null);
      setNewCoverImage(null);
      setSelectedEditCategory(null);
      setShowEditModal(false);
    } catch (err) {
      setError("Wahala Wahala Wahala!");
  }
};

const handleDeleteBook = async (id: number) => {
  try {
      await apiClient.delete("/admin/book/delete", {
          data: { id }, // `data` is used for DELETE requests with a body
      });

      await fetchBooks();
    } catch (err) {
      setError("Wahala Wahala Wahala!");
  }
};

  const handleEditBook = (book: Book) => {
    setEditingBook(book)
    setNewBookTitle(book.title)
    setNewBookAuthor(book.author)
    setNewBookPrice(book.price.toString())
    setNewBookRating(book.rating)
    const bookCategory = categories.find(cat => cat.value === book.category)
    setSelectedEditCategory(bookCategory || null)
    setShowEditModal(true)
  }

  const displayBooks = books.length > 0 ? books : dummyBooks

  return (
    <div className="w-full bg-gray-100 min-h-screen">
      <div className="bg-white shadow-md p-6">
        <header className="flex justify-between items-center mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              placeholder="Search category"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Bell className="text-gray-600 cursor-pointer" />
        </header>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setError(null)}>
              <X className="h-6 w-6 text-red-500" />
            </span>
          </div>
        )}

        <div className="flex justify-between items-center mb-6">
          <select
            className="bg-indigo-100 text-indigo-800 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
            value={selectedCategory?.value || ''}
            onChange={(e) => {
              const category = categories.find(cat => cat.value === e.target.value)
              if (category) {
                setSelectedCategory(category)
              } else if (e.target.value === 'create-category') {
                setIsCategoryModalOpen(true)
              }
            }}
          >
            <option value="">Select Category</option>
            {categories.map(category => (
              <option key={category.value} value={category.value}>{category.label}</option>
            ))}
            <option value="create-category">Create Category</option>
          </select>
          <button
            className="bg-indigo-600 text-white py-2 px-4 rounded-md flex items-center hover:bg-indigo-700 transition duration-300"
            onClick={() => setIsModalOpen(true)}
          >
            Add book
             <Plus className="mr-2" size={16} />
          </button>
        </div>

        {isLoading ? (
          <div className="text-center py-10 text-gray-600 text-xl">Loading...</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {displayBooks
              .filter(book => 
                book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                book.author.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((book) => (
                <div key={book.id} className="relative group flex flex-col">
                  <div className="aspect-[3/4] relative rounded-lg overflow-hidden bg-gray-200">
                    <img 
                      src={book.cover_url || "/placeholder.svg"}
                      alt={book.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2">
                      <button
                        className="w-24 bg-white text-gray-900 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition duration-300"
                        onClick={() => handleEditBook(book)}
                      >
                        Edit
                      </button>
                      <button
                        className="w-24 bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition duration-300"
                        onClick={() => {
                          if (window.confirm(`Are you sure you want to delete "${book.title}"?`)) {
                            handleDeleteBook(book.id)
                          }
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-center text-gray-800 font-medium truncate px-2">{book.title}</p>
                </div>
              ))
            }
          </div>
        )}
      </div>

      {/* Add Book Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Add New Book</h2>
              <X className="cursor-pointer text-gray-900" onClick={() => setIsModalOpen(false)} />
            </div>
            <input
              type="text"
              placeholder="Book Title"
              value={newBookTitle}
              onChange={(e) => setNewBookTitle(e.target.value)}
              className="w-full p-2 mb-4 border rounded text-gray-900 placeholder-gray-500"
            />
            <input
              type="text"
              placeholder="Author"
              value={newBookAuthor}
              onChange={(e) => setNewBookAuthor(e.target.value)}
              className="w-full p-2 mb-4 border rounded text-gray-900 placeholder-gray-500"
            />
            <select
              value={selectedBookCategory?.value || ''}
              onChange={(e) => {
                const category = categories.find(cat => cat.value === e.target.value)
                setSelectedBookCategory(category || null)
              }}
              className="w-full p-2 mb-4 border rounded text-gray-900"
            >
              <option value="">Select Category</option>
              {categories.map(category => (
                <option key={category.value} value={category.value}>{category.label}</option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Price"
              value={newBookPrice}
              onChange={(e) => setNewBookPrice(e.target.value)}
              className="w-full p-2 mb-4 border rounded text-gray-900 placeholder-gray-500"
            />
            <input
              type="file"
              onChange={(e) => setNewBookFile(e.target.files?.[0] || null)}
              className="w-full p-2 mb-4 border rounded text-gray-900"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setNewCoverImage(e.target.files?.[0] || null)}
              className="w-full p-2 mb-4 border rounded text-gray-900"
            />
            <button
              onClick={handleAddBook}
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300"
            >
              Save
            </button>
          </div>
        </div>
      )}

      {/* Edit Book Modal */}
      {showEditModal && editingBook && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Edit Book</h2>
              <X className="cursor-pointer text-gray-900" onClick={() => setShowEditModal(false)} />
            </div>
            <input
              type="text"
              placeholder="Book Title"
              value={newBookTitle}
              onChange={(e) => setNewBookTitle(e.target.value)}
              className="w-full p-2 mb-4 border rounded text-gray-900 placeholder-gray-500"
            />
            <input
              type="text"
              placeholder="Author"
              value={newBookAuthor}
              onChange={(e) => setNewBookAuthor(e.target.value)}
              className="w-full p-2 mb-4 border rounded text-gray-900 placeholder-gray-500"
            />
            <select
              value={selectedEditCategory?.value || ''}
              onChange={(e) => {
                const category = categories.find(cat => cat.value === e.target.value)
                setSelectedEditCategory(category || null)
              }}
              className="w-full p-2 mb-4 border rounded text-gray-900"
            >
              <option value="">Select Category</option>
              {categories.map(category => (
                <option key={category.value} value={category.value}>{category.label}</option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Price"
              value={newBookPrice}
              onChange={(e) => setNewBookPrice(e.target.value)}
              className="w-full p-2 mb-4 border rounded text-gray-900 placeholder-gray-500"
            />
            <input
              type="file"
              onChange={(e) => setNewBookFile(e.target.files?.[0] || null)}
              className="w-full p-2 mb-4 border rounded text-gray-900"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setNewCoverImage(e.target.files?.[0] || null)}
              className="w-full p-2 mb-4 border rounded text-gray-900"
            />
            <button
              onClick={handleSaveEdit}
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}

      {/* Add Category Modal */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Add New Category</h2>
              <X className="cursor-pointer text-gray-900" onClick={() => setIsCategoryModalOpen(false)} />
            </div>
            <input
              type="text"
              placeholder="Category Name"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="w-full p-2 mb-4 border rounded text-gray-900 placeholder-gray-500"
            />
            <button
              onClick={handleAddCategory}
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300"
            >
              Create
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

