"use client";

import { useState, useEffect } from "react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { Trash2, Edit, Plus, X } from "lucide-react";
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

interface Executive {
  id: string;
  name: string;
  role: string;
  slug: string;
  image: string;
  description: string | null;
  order: number;
}

export default function AdminExcosPage() {
  const [executives, setExecutives] = useState<Executive[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    slug: "",
    image: "",
    description: "",
    order: 0,
  });

  useEffect(() => {
    fetchExecutives();
  }, []);

  const fetchExecutives = async () => {
    try {
      const res = await fetch("/api/executives");
      if (res.ok) {
        const data = await res.json();
        setExecutives(data);
      }
    } catch (error) {
      console.error("Failed to fetch executives", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    if (name === "name" && !editingId) {
      // Auto-generate slug when typing name for new entries
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

    if (!formData.image) {
      alert("Please upload an image for the executive.");
      return;
    }

    try {
      const url = editingId
        ? `/api/executives/${editingId}`
        : "/api/executives";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          order: Number(formData.order),
        }),
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchExecutives();
        resetForm();
      } else {
        alert("Failed to save executive");
      }
    } catch (error) {
      console.error("Error saving executive", error);
      alert("Error saving executive");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/executives/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        fetchExecutives();
      } else {
        alert("Failed to delete executive");
      }
    } catch (error) {
      console.error("Error deleting executive", error);
      alert("Error deleting executive");
    }
  };

  const openEditModal = (exec: Executive) => {
    setEditingId(exec.id);
    setFormData({
      name: exec.name,
      role: exec.role,
      slug: exec.slug,
      image: exec.image,
      description: exec.description || "",
      order: exec.order,
    });
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      name: "",
      role: "",
      slug: "",
      image: "",
      description: "",
      order: 0,
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
          <h1 className="text-3xl font-bold">Manage EXCOS</h1>
          <p className="text-gray-500 mt-1">
            Add, edit or remove club executives
          </p>
        </div>
        <button
          onClick={openNewModal}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
        >
          <Plus size={20} />
          Add Executive
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12">Loading executives...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {executives.map((exec) => (
            <div
              key={exec.id}
              className="border rounded-lg p-4 shadow-sm bg-white flex flex-col"
            >
              <div className="flex gap-4">
                <div className="relative w-24 h-24 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                  {exec.image ? (
                    <Image
                      src={exec.image}
                      alt={exec.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm truncate">
                    {exec.name}
                  </h3>
                  <p className="mt-1 text-blue-600 text-xs font-medium">
                    {exec.role}
                  </p>
                  <p className="text-gray-500 text-xs mt-1">
                    Order: {exec.order}
                  </p>
                </div>
              </div>

              <div className="mt-auto pt-2 flex gap-2 justify-end">
                <button
                  onClick={() => openEditModal(exec)}
                  className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
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
                        Are you sure you want to delete {exec.name}? This action
                        cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="font-bold uppercase tracking-wider text-xs rounded-xl cursor-pointer">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(exec.id)}
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
          {executives.length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-500 bg-gray-50 rounded-lg border border-dashed">
              No executives found. Click "Add Executive" to create one.
            </div>
          )}
        </div>
      )}

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-xl! max-h-[90vh] overflow-y-auto rounded-lg! border-0!">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              {editingId ? "Edit Executive" : "Add Executive"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. Mr John Doe"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Role *
                </label>
                <input
                  type="text"
                  name="role"
                  required
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. President"
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
                  className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. mr-john-doe"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Display Order (Lower comes first)
                </label>
                <input
                  type="number"
                  name="order"
                  value={formData.order}
                  onChange={handleInputChange}
                  className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Profile Image *
              </label>

              {formData.image ? (
                <div className="relative w-32 h-32 rounded-lg overflow-hidden border">
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
                        Click to upload image (Cloudinary)
                      </button>
                    );
                  }}
                </CldUploadWidget>
              )}

              {/* Hidden input to store image URL securely without manual typing */}
              <input type="hidden" name="image" value={formData.image} />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
                className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Brief biography or description..."
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
                {editingId ? "Save Changes" : "Create Executive"}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
