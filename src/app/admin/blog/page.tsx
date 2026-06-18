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

interface BlogItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  date: string;
  excerpt: string;
  content: string;
  image: string | null;
  videoUrl: string | null;
}

export default function AdminBlogPage() {
  const [blogItems, setBlogItems] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<"image" | "video">("image");

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "",
    date: new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    excerpt: "",
    content: "",
    image: "",
    videoUrl: "",
  });

  useEffect(() => {
    fetchBlogItems();
  }, []);

  const fetchBlogItems = async () => {
    try {
      const res = await fetch("/api/blog");
      if (res.ok) {
        const data = await res.json();
        setBlogItems(data);
      }
    } catch (error) {
      console.error("Failed to fetch blog items", error);
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
    if (name === "title" && !editingId) {
      // Auto-generate slug when typing title for new entries
      const generatedSlug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      setFormData((prev) => ({ ...prev, [name]: value, slug: generatedSlug }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (mediaType === "image" && !formData.image) {
      alert("Please upload an image or switch to video media type.");
      return;
    }
    if (mediaType === "video" && !formData.videoUrl) {
      alert("Please provide a valid YouTube URL.");
      return;
    }

    try {
      const url = editingId ? `/api/blog/${editingId}` : "/api/blog";
      const method = editingId ? "PUT" : "POST";

      const submissionData = {
        ...formData,
        image: mediaType === "image" ? formData.image : null,
        videoUrl: mediaType === "video" ? formData.videoUrl : null,
      };

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchBlogItems();
        resetForm();
      } else {
        alert("Failed to save blog post");
      }
    } catch (error) {
      console.error("Error saving blog post", error);
      alert("Error saving blog post");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/blog/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        fetchBlogItems();
      } else {
        alert("Failed to delete blog post");
      }
    } catch (error) {
      console.error("Error deleting blog post", error);
      alert("Error deleting blog post");
    }
  };

  const openEditModal = (item: BlogItem) => {
    setEditingId(item.id);
    setMediaType(item.videoUrl ? "video" : "image");
    setFormData({
      title: item.title,
      slug: item.slug,
      category: item.category,
      date: item.date,
      excerpt: item.excerpt || "",
      content: item.content,
      image: item.image || "",
      videoUrl: item.videoUrl || "",
    });
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setEditingId(null);
    setMediaType("image");
    setFormData({
      title: "",
      slug: "",
      category: "",
      date: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      excerpt: "",
      content: "",
      image: "",
      videoUrl: "",
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
          <h1 className="text-3xl font-bold">Manage Blog</h1>
          <p className="text-gray-500 mt-1">
            Create, edit, or delete club blog posts
          </p>
        </div>
        <button
          onClick={openNewModal}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
        >
          <Plus size={20} />
          Create Post
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12">Loading blog posts...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {blogItems.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg p-4 shadow-sm bg-white flex flex-col"
            >
              <div className="flex gap-4">
                <div className="relative w-24 h-24 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  ) : item.videoUrl ? (
                    <div className="w-full h-full flex items-center justify-center bg-zinc-900 text-white">
                      <Video size={24} />
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No Media
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
                  <p className="mt-1 text-blue-600 text-xs font-medium">
                    {item.category}
                  </p>
                  <p className="text-gray-500 text-xs mt-1">{item.date}</p>
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
                        onClick={() => handleDelete(item.id)}
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
          {blogItems.length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-500 bg-gray-50 rounded-lg border border-dashed">
              No blog posts found. Click "Create Post" to add some.
            </div>
          )}
        </div>
      )}

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl! max-h-[90vh] overflow-y-auto rounded-lg! border-0!">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              {editingId ? "Edit Post" : "Create Post"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Headline / Title *
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. Ways to improve communication on the field"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  URL Slug *
                </label>
                <input
                  type="text"
                  name="slug"
                  required
                  value={formData.slug}
                  onChange={handleInputChange}
                  className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                  placeholder="e.g. ways-to-improve-communication"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Category *
                </label>
                <select
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Category</option>
                  <option value="Club News">Club News</option>
                  <option value="Football News">Football News</option>
                  <option value="Activities">Activities</option>
                  <option value="Wellness & Fitness">Wellness & Fitness</option>
                  <option value="Matches">Matches</option>
                  <option value="Community">Community</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Date Published
                </label>
                <input
                  type="text"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. October 15, 2024"
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
                    name="mediaType"
                    value="image"
                    checked={mediaType === "image"}
                    onChange={() => setMediaType("image")}
                    className="w-4 h-4 text-blue-600"
                  />
                  <ImageIcon size={18} />
                  <span className="text-sm font-medium">
                    Image (Cloudinary)
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="mediaType"
                    value="video"
                    checked={mediaType === "video"}
                    onChange={() => setMediaType("video")}
                    className="w-4 h-4 text-blue-600"
                  />
                  <Video size={18} />
                  <span className="text-sm font-medium">YouTube Video URL</span>
                </label>
              </div>
            </div>

            <div className="space-y-2">
              {mediaType === "image" ? (
                <>
                  <label className="block text-sm font-medium text-gray-700">
                    Upload Featured Image *
                  </label>
                  {formData.image ? (
                    <div className="relative w-48 h-32 rounded-lg overflow-hidden border">
                      <Image
                        src={formData.image}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, image: "" })}
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
                            image: result.info.secure_url,
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
                </>
              ) : (
                <>
                  <label className="block text-sm font-medium text-gray-700">
                    YouTube Video URL *
                  </label>
                  <input
                    type="url"
                    name="videoUrl"
                    value={formData.videoUrl}
                    onChange={handleInputChange}
                    className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://www.youtube.com/watch?v=..."
                  />
                  <p className="text-xs text-gray-500">
                    Paste the full YouTube URL here.
                  </p>
                </>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Post Excerpt *
              </label>
              <textarea
                name="excerpt"
                required
                rows={3}
                value={formData.excerpt}
                onChange={handleInputChange}
                className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Write a brief excerpt/summary for the blog index..."
              ></textarea>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Post Content *
              </label>
              <textarea
                name="content"
                required
                rows={6}
                value={formData.content}
                onChange={handleInputChange}
                className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Write the full post content here..."
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
                {editingId ? "Save Changes" : "Publish Post"}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
