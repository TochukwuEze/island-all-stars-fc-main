"use client";

import { useState, useEffect } from "react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { Trash2, Edit, Plus, X, Video, ImageIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { VideoItem as GalleryItem } from "@/types";

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    year: new Date().getFullYear(),
    description: "",
    src: "",
    thumbnail: "",
    type: "photo" as "photo" | "video",
  });

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async () => {
    try {
      const res = await fetch("/api/gallery");
      if (res.ok) {
        const data = await res.json();
        setItems(data);
      }
    } catch (error) {
      console.error("Failed to fetch gallery items", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "year" ? parseInt(value) || new Date().getFullYear() : value,
    }));
  };

  const handleMediaTypeChange = (type: "photo" | "video") => {
    setFormData((prev) => ({ ...prev, type }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.type === "photo" && !formData.src) {
      alert("Please upload a photo.");
      return;
    }
    if (formData.type === "video" && (!formData.src || !formData.thumbnail)) {
      alert("Please provide a valid YouTube URL and a thumbnail image.");
      return;
    }

    try {
      const url = editingId ? `/api/gallery/${editingId}` : "/api/gallery";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchGalleryItems();
        resetForm();
      } else {
        alert("Failed to save gallery item");
      }
    } catch (error) {
      console.error("Error saving gallery item", error);
      alert("Error saving gallery item");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/gallery/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        fetchGalleryItems();
      } else {
        alert("Failed to delete gallery item");
      }
    } catch (error) {
      console.error("Error deleting gallery item", error);
      alert("Error deleting gallery item");
    }
  };

  const openEditModal = (item: GalleryItem) => {
    setEditingId(item.id);
    setFormData({
      title: item.title,
      category: item.category,
      year: item.year || new Date().getFullYear(),
      description: item.description || "",
      src: item.src || "",
      thumbnail: item.thumbnail,
      type: item.type,
    });
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      title: "",
      category: "",
      year: new Date().getFullYear(),
      description: "",
      src: "",
      thumbnail: "",
      type: "photo",
    });
  };

  const openNewModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Manage Gallery</h1>
          <p className="text-gray-500 mt-1">
            Create, edit, or delete gallery photos and videos
          </p>
        </div>
        <button
          onClick={openNewModal}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
        >
          <Plus size={20} />
          Add Item
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12">Loading gallery...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg p-4 shadow-sm bg-white flex flex-col"
            >
              <div className="flex gap-4">
                <div className="relative w-24 h-24 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                  {item.thumbnail ? (
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No Media
                    </div>
                  )}
                  {item.type === "video" && (
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <Video size={24} className="text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3
                    className="font-semibold text-sm truncate"
                    title={item.title}
                  >
                    {item.title}
                  </h3>
                  <p className="text-blue-600 text-sm font-medium">
                    {item.category}
                  </p>
                  <p className="text-gray-500 text-xs mt-1">{item.year}</p>
                </div>
              </div>

              <div className="mt-auto pt-2 flex gap-2 justify-end">
                <button
                  onClick={() => openEditModal(item)}
                  className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors cursor-pointer"
                  title="Edit"
                >
                  <Edit size={18} />
                </button>
                <AlertDialog>
                  <AlertDialogTrigger
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-white border-gray-100 rounded-xl">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-xl font-black text-[#001429] uppercase">
                        Confirm Deletion
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-sm font-semibold text-gray-500">
                        Are you sure you want to delete "{item.title}"? This
                        action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="font-bold uppercase tracking-wider text-xs rounded-xl cursor-pointer">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => item.id && handleDelete(item.id)}
                        className="font-bold uppercase tracking-wider text-xs rounded-xl bg-red-600 text-white hover:bg-red-700 cursor-pointer"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-500 bg-gray-50 rounded-lg border border-dashed">
              No gallery items found. Click "Add Item" to add some.
            </div>
          )}
        </div>
      )}

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl! max-h-[90vh] overflow-y-auto rounded-lg! border-0!">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              {editingId ? "Edit Gallery Item" : "Add Gallery Item"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. Match Day Intensity"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Category *
                </label>
                <input
                  type="text"
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. Match, Training, Fans"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Year
                </label>
                <input
                  type="number"
                  name="year"
                  required
                  value={formData.year}
                  onChange={handleInputChange}
                  className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. 2024"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Media Type *
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="type"
                    value="photo"
                    checked={formData.type === "photo"}
                    onChange={() => handleMediaTypeChange("photo")}
                    className="w-4 h-4 text-blue-600"
                  />
                  <ImageIcon size={18} />
                  <span className="text-sm font-medium">Photo</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="type"
                    value="video"
                    checked={formData.type === "video"}
                    onChange={() => handleMediaTypeChange("video")}
                    className="w-4 h-4 text-blue-600"
                  />
                  <Video size={18} />
                  <span className="text-sm font-medium">Video (YouTube)</span>
                </label>
              </div>
            </div>

            {formData.type === "photo" && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Upload Photo *
                </label>
                {formData.src ? (
                  <div className="relative w-48 h-32 rounded-lg overflow-hidden border">
                    <Image
                      src={formData.src}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, src: "", thumbnail: "" })
                      }
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <CldUploadWidget
                    uploadPreset={
                      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ||
                      "unsigned_preset"
                    }
                    onSuccess={(result) => {
                      if (
                        typeof result.info === "object" &&
                        result.info !== null
                      ) {
                        setFormData({
                          ...formData,
                          src: result.info.secure_url,
                          thumbnail: result.info.secure_url,
                        });
                      }
                    }}
                  >
                    {({ open }) => {
                      return (
                        <button
                          type="button"
                          onClick={() => open()}
                          className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-md px-4 py-8 w-full text-gray-600 hover:bg-gray-50 hover:border-gray-400 transition-colors"
                        >
                          Click to upload image to Cloudinary
                        </button>
                      );
                    }}
                  </CldUploadWidget>
                )}
              </div>
            )}

            {formData.type === "video" && (
              <>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    YouTube Embed URL *
                  </label>
                  <input
                    type="url"
                    name="src"
                    value={formData.src}
                    onChange={handleInputChange}
                    className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. https://www.youtube.com/embed/..."
                  />
                  <p className="text-xs text-gray-500">
                    Use the embed URL format for videos.
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Video Thumbnail URL *
                  </label>
                  <input
                    type="url"
                    name="thumbnail"
                    value={formData.thumbnail}
                    onChange={handleInputChange}
                    className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. https://img.youtube.com/vi/.../hqdefault.jpg"
                  />
                </div>
              </>
            )}

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Description (Optional)
              </label>
              <textarea
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
                className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Write a brief description..."
              ></textarea>
            </div>

            <div className="pt-4 border-t flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {editingId ? "Save Changes" : "Publish Item"}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
