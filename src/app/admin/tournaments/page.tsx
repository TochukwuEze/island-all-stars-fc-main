"use client";

import { useState, useEffect } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Trash2, Edit, Plus, X, Trophy } from "lucide-react";
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
import { TournamentHistory, getTournaments, addTournament, updateTournament, deleteTournament } from "@/lib/tournamentStore";

export default function AdminTournamentsPage() {
  const [items, setItems] = useState<TournamentHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    year: new Date().getFullYear(),
    winner: "",
    sponsorName: "",
    sponsorLogo: "",
    details: "",
    images: [] as string[],
    videoUrl: "",
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const data = await getTournaments();
      setItems(data);
    } catch (error) {
      console.error("Failed to fetch tournaments", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "year" ? parseInt(value) || new Date().getFullYear() : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.winner || !formData.details) {
      alert("Please provide the winner and details.");
      return;
    }

    try {
      let success = false;
      if (editingId) {
        success = await updateTournament(editingId, formData);
      } else {
        success = await addTournament(formData);
      }

      if (success) {
        setIsModalOpen(false);
        fetchItems();
        resetForm();
      } else {
        alert("Failed to save tournament. Make sure the year is unique.");
      }
    } catch (error) {
      console.error("Error saving tournament", error);
      alert("Error saving tournament");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const success = await deleteTournament(id);
      if (success) {
        fetchItems();
      } else {
        alert("Failed to delete tournament");
      }
    } catch (error) {
      console.error("Error deleting tournament", error);
      alert("Error deleting tournament");
    }
  };

  const openEditModal = (item: TournamentHistory) => {
    setEditingId(item.id);
    setFormData({
      year: item.year,
      winner: item.winner,
      sponsorName: item.sponsorName || "",
      sponsorLogo: item.sponsorLogo || "",
      details: item.details,
      images: item.images || [],
      videoUrl: item.videoUrl || "",
    });
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      year: new Date().getFullYear(),
      winner: "",
      sponsorName: "",
      sponsorLogo: "",
      details: "",
      images: [],
      videoUrl: "",
    });
  };

  const handleRemoveImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="p-6 md:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-black text-[#001429] uppercase tracking-tight">
            Manage Tournaments
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Add, edit, or remove tournament history records.
          </p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 bg-[#FF4D00] text-white px-5 py-2.5 rounded-xl font-bold uppercase tracking-wider text-xs hover:bg-[#e64500] transition-colors shadow-sm"
        >
          <Plus size={16} />
          Add Tournament
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primaryColor"></div>
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border border-gray-100 border-dashed">
          <Trophy className="mx-auto h-12 w-12 text-gray-300 mb-3" />
          <p className="text-gray-500 font-medium">No tournaments found</p>
          <button
            onClick={() => {
              resetForm();
              setIsModalOpen(true);
            }}
            className="mt-4 text-primaryColor font-bold text-sm hover:underline"
          >
            Add your first tournament
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm flex flex-col hover:shadow-md transition-shadow"
            >
              <div className="relative h-48 bg-gray-100 group">
                {item.images && item.images.length > 0 ? (
                  <img
                    src={item.images[0]}
                    alt={item.winner}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    <Trophy size={48} />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-sm">
                  <button
                    onClick={() => openEditModal(item)}
                    className="p-2 bg-white text-[#001429] rounded-full hover:bg-gray-100 hover:scale-110 transition-all shadow-lg"
                  >
                    <Edit size={18} />
                  </button>
                  <AlertDialog>
                    <AlertDialogTrigger className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 hover:scale-110 transition-all shadow-lg cursor-pointer">
                      <Trash2 size={18} />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Tournament</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete the {item.year} tournament record? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(item.id)}
                          className="bg-red-600 hover:bg-red-700 text-white"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
              
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-black text-xl text-[#001429] uppercase line-clamp-1">
                    {item.winner}
                  </h3>
                  <span className="bg-yellow-100 text-yellow-800 text-[10px] font-bold px-2 py-1 rounded uppercase">
                    {item.year}
                  </span>
                </div>
                
                {item.sponsorName && (
                  <div className="flex items-center gap-2 mb-3">
                    {item.sponsorLogo && (
                      <img src={item.sponsorLogo} alt={item.sponsorName} className="w-5 h-5 rounded-full object-cover border border-gray-200" />
                    )}
                    <span className="text-[10px] font-bold text-gray-500 uppercase">Sponsored by {item.sponsorName}</span>
                  </div>
                )}

                <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1">
                  {item.details}
                </p>

                <div className="flex items-center justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest pt-4 border-t border-gray-100">
                  <span>{item.images?.length || 0} Photos</span>
                  {item.videoUrl && <span className="text-blue-500">Includes Video</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black uppercase tracking-tight text-[#001429]">
              {editingId ? "Edit Tournament" : "Add Tournament"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Year
                </label>
                <input
                  type="number"
                  name="year"
                  required
                  value={formData.year}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primaryColor focus:bg-white transition-all text-sm font-semibold"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Winner Team Name
                </label>
                <input
                  type="text"
                  name="winner"
                  required
                  value={formData.winner}
                  onChange={handleInputChange}
                  placeholder="e.g. Team A"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primaryColor focus:bg-white transition-all text-sm font-semibold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Sponsor Name (Optional)
                </label>
                <input
                  type="text"
                  name="sponsorName"
                  value={formData.sponsorName}
                  onChange={handleInputChange}
                  placeholder="e.g. Globex Inc"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primaryColor focus:bg-white transition-all text-sm font-semibold"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex justify-between">
                  <span>Sponsor Logo (Optional)</span>
                </label>
                {formData.sponsorLogo ? (
                  <div className="relative w-24 h-24 bg-gray-100 rounded-xl overflow-hidden group border border-gray-200">
                    <img src={formData.sponsorLogo} alt="Sponsor Logo" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, sponsorLogo: "" }))}
                      className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <CldUploadWidget
                    uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "unsigned_preset"}
                    options={{ maxFiles: 1, resourceType: "image" }}
                    onSuccess={(result: any) => {
                      if (result?.info?.secure_url) {
                        setFormData((prev) => ({
                          ...prev,
                          sponsorLogo: result.info.secure_url,
                        }));
                      }
                    }}
                  >
                    {({ open }) => (
                      <button
                        type="button"
                        onClick={() => open()}
                        className="w-full py-3 bg-gray-50 border border-dashed border-gray-300 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors text-sm font-semibold flex items-center justify-center gap-2"
                      >
                        <Plus size={16} /> Upload Sponsor Logo
                      </button>
                    )}
                  </CldUploadWidget>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Tournament Details & Description
              </label>
              <textarea
                name="details"
                required
                value={formData.details}
                onChange={handleInputChange}
                rows={4}
                placeholder="Describe how the team won..."
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primaryColor focus:bg-white transition-all text-sm font-semibold"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Video URL (Optional, max 1)
              </label>
              <input
                type="text"
                name="videoUrl"
                value={formData.videoUrl}
                onChange={handleInputChange}
                placeholder="e.g. YouTube Embed URL"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primaryColor focus:bg-white transition-all text-sm font-semibold"
              />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Gallery Images (Max 5)
                </label>
                <CldUploadWidget
                  uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "unsigned_preset"}
                  options={{ maxFiles: 5 - formData.images.length, resourceType: "image", multiple: true }}
                  onSuccess={(result: any) => {
                    if (result?.info?.secure_url && formData.images.length < 5) {
                      setFormData((prev) => ({
                        ...prev,
                        images: [...prev.images, result.info.secure_url].slice(0, 5),
                      }));
                    }
                  }}
                >
                  {({ open }) => (
                    <button
                      type="button"
                      onClick={() => open()}
                      disabled={formData.images.length >= 5}
                      className="text-xs font-bold text-primaryColor disabled:text-gray-400 disabled:cursor-not-allowed hover:underline"
                    >
                      + Upload Images
                    </button>
                  )}
                </CldUploadWidget>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {formData.images.map((img, idx) => (
                  <div key={idx} className="relative aspect-video bg-gray-100 rounded-xl overflow-hidden group">
                    <img src={img} alt="Gallery item" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700 hover:scale-110"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
                {formData.images.length < 5 && (
                  <div className="aspect-video bg-gray-50 border border-dashed border-gray-200 rounded-xl flex items-center justify-center text-gray-400 text-xs font-medium">
                    {5 - formData.images.length} slots left
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2.5 rounded-xl font-bold uppercase tracking-wider text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl font-bold uppercase tracking-wider text-xs bg-[#001429] hover:bg-[#001429]/90 text-white transition-colors"
              >
                {editingId ? "Save Changes" : "Add Tournament"}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
