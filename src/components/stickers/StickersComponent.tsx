import { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import { Modal } from "../ui/modal";
import {
  IoAddOutline,
  IoRefreshOutline,
  IoCloseOutline,
  IoImageOutline,
  IoCloudUploadOutline,
  IoTrashOutline
} from "react-icons/io5";
import {
  getStickersApi,
  createStickerPackApi,
  deleteStickerPackApi,
  StickerPack
} from "../../api/stickerapi";

export default function StickersComponent() {
  const [packs, setPacks] = useState<StickerPack[]>([]);
  const getStickerUrl = (url: string) => {
    if (!url) return "";
    if (
      url.startsWith("http://") ||
      url.startsWith("https://") ||
      url.startsWith("blob:") ||
      url.startsWith("data:")
    ) {
      return url;
    }
    const cleanPath = url.startsWith("/") ? url.substring(1) : url;
    if (cleanPath.startsWith("uploads/")) {
      return `${import.meta.env.VITE_API_BASE_URL}/${cleanPath}`;
    }
    return `${import.meta.env.VITE_API_BASE_URL}/uploads/stickers/${cleanPath}`;
  };
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [totalSends, setTotalSends] = useState("0");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchPacks = async () => {
    setLoading(true);
    try {
      const res = await getStickersApi();
      if (res.success) {
        setPacks(res.data || []);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load sticker packs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPacks();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      
      // Limit file types to images
      const imageFiles = filesArray.filter(f => f.type.startsWith("image/"));
      if (imageFiles.length !== filesArray.length) {
        toast.error("Only image files are allowed");
      }

      setSelectedFiles(prev => [...prev, ...imageFiles]);
      
      const newUrls = imageFiles.map(file => URL.createObjectURL(file));
      setPreviewUrls(prev => [...prev, ...newUrls]);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files) {
      const filesArray = Array.from(e.dataTransfer.files);
      const imageFiles = filesArray.filter(f => f.type.startsWith("image/"));
      
      if (imageFiles.length !== filesArray.length) {
        toast.error("Only image files are allowed");
      }

      setSelectedFiles(prev => [...prev, ...imageFiles]);
      
      const newUrls = imageFiles.map(file => URL.createObjectURL(file));
      setPreviewUrls(prev => [...prev, ...newUrls]);
    }
  };

  const handleRemovePreview = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setPreviewUrls(prev => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return toast.error("Please enter a pack name");
    if (!price || Number(price) < 0) return toast.error("Please enter a valid price");
    if (selectedFiles.length === 0) return toast.error("Please upload at least one sticker");

    setSubmitting(true);
    try {
      const payload = {
        name,
        price: Number(price),
        totalSends: Number(totalSends) || 0,
        stickers: selectedFiles
      };

      const res = await createStickerPackApi(payload);
      if (res.success) {
        toast.success("Sticker pack created successfully!");
        setIsCreateModalOpen(false);
        // Reset form
        setName("");
        setPrice("");
        setTotalSends("0");
        setSelectedFiles([]);
        setPreviewUrls([]);
        fetchPacks();
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to create sticker pack");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeletePack = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this sticker pack?")) {
      return;
    }
    try {
      const res = await deleteStickerPackApi(id);
      if (res.success) {
        toast.success("Sticker pack deleted successfully");
        fetchPacks();
      } else {
        toast.error(res.message || "Failed to delete sticker pack");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete sticker pack");
    }
  };

  // Helper stats
  const totalPacks = packs.length;
  const totalSendsAll = packs.reduce((acc, p) => acc + (p.totalSends || 0), 0);
  const avgPrice = packs.length > 0 ? (packs.reduce((acc, p) => acc + p.price, 0) / packs.length).toFixed(2) : "0.00";

  return (
    <div className="p-6 space-y-6">
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Stickers Management
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Monitor and add creative stickers assets for direct messages and threads.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-brand-500 hover:bg-brand-600 text-white font-semibold text-sm shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <IoAddOutline className="text-lg" />
            Create Sticker Pack
          </button>

          <button
            onClick={fetchPacks}
            className="p-3 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-500 hover:text-gray-700 dark:hover:text-white transition-all shadow-sm hover:scale-[1.02]"
            title="Refresh list"
          >
            <IoRefreshOutline className={`text-lg ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* METRICS CARD SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white dark:bg-gray-900 rounded-[28px] border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-400 dark:text-gray-500">
            Total Sticker Packs
          </span>
          <span className="text-3xl font-extrabold text-gray-900 dark:text-white">
            {loading ? "..." : totalPacks}
          </span>
        </div>
        <div className="p-6 bg-white dark:bg-gray-900 rounded-[28px] border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-400 dark:text-gray-500">
            Total Sends Across Packs
          </span>
          <span className="text-3xl font-extrabold text-gray-900 dark:text-white">
            {loading ? "..." : totalSendsAll.toLocaleString()}
          </span>
        </div>
        <div className="p-6 bg-white dark:bg-gray-900 rounded-[28px] border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-400 dark:text-gray-500">
            Average Pack Price
          </span>
          <span className="text-3xl font-extrabold text-gray-900 dark:text-white">
            ${loading ? "..." : avgPrice}
          </span>
        </div>
      </div>

      {/* STICKER PACKS GRID CONTAINER */}
      {loading ? (
        <div className="flex flex-col justify-center items-center py-32 space-y-4 min-h-[400px]">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-500 border-t-transparent"></div>
          <span className="italic text-gray-400 dark:text-gray-500 text-sm">Loading stickers...</span>
        </div>
      ) : packs.length === 0 ? (
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[32px] p-20 text-center flex flex-col items-center justify-center min-h-[400px]">
          <div className="bg-gray-50 dark:bg-gray-850 p-6 rounded-full mb-4">
            <IoImageOutline className="text-5xl text-gray-300 dark:text-gray-600" />
          </div>
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">
            No Sticker Packs Found
          </h3>
          <p className="text-gray-400 dark:text-gray-500 text-sm max-w-sm mt-2">
            Create your first sticker pack with customized prices and visual image files.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packs.map((pack) => (
            <div
              key={pack._id}
              className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[32px] overflow-hidden shadow-sm hover:shadow-md hover:border-brand-200/20 dark:hover:border-brand-900/30 transition-all flex flex-col"
            >
              {/* Header card info */}
              <div className="p-6 pb-4 border-b border-gray-50 dark:border-gray-850/50 flex justify-between items-start">
                <div>
                  <h3 className="font-extrabold text-gray-900 dark:text-white text-lg tracking-tight">
                    {pack.name}
                  </h3>
                  <span className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 block">
                    Created: {new Date(pack.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3.5 py-1.5 bg-brand-500/10 dark:bg-brand-500/20 text-brand-500 dark:text-brand-400 rounded-xl font-bold text-sm">
                    ${pack.price.toFixed(2)}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleDeletePack(pack._id)}
                    className="p-2 text-gray-400 hover:text-red-500 dark:hover:text-red-400 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                    title="Delete Sticker Pack"
                  >
                    <IoTrashOutline className="text-lg" />
                  </button>
                </div>
              </div>

              {/* Showcase Grid of Included Stickers */}
              <div className="p-6 flex-grow">
                <div className="grid grid-cols-4 gap-3 bg-gray-50/50 dark:bg-gray-950/20 p-4 rounded-2xl border border-gray-100/50 dark:border-gray-900/30">
                  {pack.stickers.map((url, sIndex) => (
                    <div
                      key={sIndex}
                      className="aspect-square bg-white dark:bg-gray-850 rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden flex items-center justify-center p-1 group hover:scale-[1.05] transition-all cursor-zoom-in"
                    >
                      <img
                        src={getStickerUrl(url)}
                        alt={`${pack.name} sticker ${sIndex + 1}`}
                        className="max-h-full max-w-full object-contain"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Pack Stats */}
              <div className="px-6 py-4.5 bg-gray-50/30 dark:bg-gray-950/10 border-t border-gray-50 dark:border-gray-850/50 flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                <span>Stickers count: <strong className="font-bold text-gray-700 dark:text-gray-300">{pack.stickers.length}</strong></span>
                <span>Total sends: <strong className="font-bold text-gray-700 dark:text-gray-300">{pack.totalSends.toLocaleString()}</strong></span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CREATE STICKER PACK MODAL */}
      {isCreateModalOpen && (
        <Modal
          isOpen={isCreateModalOpen}
          onClose={() => !submitting && setIsCreateModalOpen(false)}
          className="max-w-xl"
        >
          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
            <div>
              <h2 className="text-xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                Create Sticker Pack
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Fill out parameters and drop image files to launch a new sticker bundle.
              </p>
            </div>

            <div className="space-y-4">
              {/* Pack Name */}
              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                  Pack Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Love Hearts, Playful Emotes..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={submitting}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-sm text-gray-800 dark:text-white"
                />
              </div>

              {/* Grid: Price and Total Sends */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                    Price ($ USD)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    min="0"
                    placeholder="e.g. 1.99"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    disabled={submitting}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-sm text-gray-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                    Initial Sends Metric
                  </label>
                  <input
                    type="number"
                    min="0"
                    placeholder="0"
                    value={totalSends}
                    onChange={(e) => setTotalSends(e.target.value)}
                    disabled={submitting}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-sm text-gray-800 dark:text-white"
                  />
                </div>
              </div>

              {/* UPLOADER INTERACTIVE DRAG-N-DROP ZONE */}
              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                  Upload Stickers (Multiple Images)
                </label>
                
                <div
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`w-full min-h-[140px] border-2 border-dashed rounded-3xl p-6 text-center cursor-pointer transition-all flex flex-col justify-center items-center gap-2 ${
                    dragActive
                      ? "border-brand-500 bg-brand-500/5"
                      : "border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 hover:bg-gray-100/50 dark:hover:bg-gray-900"
                  }`}
                >
                  <IoCloudUploadOutline className="text-4xl text-gray-400 dark:text-gray-600" />
                  <div>
                    <span className="text-sm font-semibold text-brand-500 hover:underline">
                      Click to upload
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {" "}or drag and drop
                    </span>
                  </div>
                  <span className="text-[11px] text-gray-400 dark:text-gray-500">
                    PNG, JPG, WebP (Sticker format, transparent bg recommended)
                  </span>
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    disabled={submitting}
                  />
                </div>
              </div>

              {/* Upload Previews Grid list */}
              {previewUrls.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider block">
                    Stickers to upload ({previewUrls.length})
                  </span>
                  
                  <div className="grid grid-cols-5 gap-3 max-h-[180px] overflow-y-auto p-2 bg-gray-50 dark:bg-gray-950 rounded-2xl border border-gray-100 dark:border-gray-850/50 custom-scrollbar">
                    {previewUrls.map((url, index) => (
                      <div
                        key={index}
                        className="relative aspect-square bg-white dark:bg-gray-900 rounded-xl border border-gray-150 dark:border-gray-800 flex items-center justify-center p-1 group"
                      >
                        <img
                          src={url}
                          alt={`sticker preview ${index}`}
                          className="max-h-full max-w-full object-contain"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemovePreview(index);
                          }}
                          className="absolute -top-1.5 -right-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full p-0.5 shadow-sm transition-all hover:scale-110"
                        >
                          <IoCloseOutline className="text-sm" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                disabled={submitting}
                className="px-5 py-3 rounded-2xl border border-gray-200 dark:border-gray-800 text-gray-500 hover:text-gray-700 dark:hover:text-white font-semibold text-sm transition-all hover:bg-gray-50 dark:hover:bg-gray-850"
              >
                Cancel
              </button>
              
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-3 rounded-2xl bg-brand-500 hover:bg-brand-600 disabled:bg-gray-300 dark:disabled:bg-gray-800 text-white font-semibold text-sm transition-all shadow-md flex items-center gap-2"
              >
                {submitting ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Saving Pack...
                  </>
                ) : (
                  "Create Pack"
                )}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
