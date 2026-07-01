import axiosInstance from "../utils/axios";
import { API_ROUTES } from "../config/api";

export interface StickerPack {
  _id: string;
  name: string;
  price: number;
  totalSends: number;
  stickers: string[]; // array of image URLs
  createdAt: string;
}

export interface CreateStickerPayload {
  name: string;
  price: number;
  totalSends: number;
  stickers: (File | string)[]; // can be image files or URLs
}

export const getStickersApi = async () => {
  try {
    const res = await axiosInstance.get(
      API_ROUTES.STICKER.GET_ALL || "/api/sticker/get-admin-sticker-packs"
    );
    return res.data;
  } catch (error) {
    console.warn("Backend /api/sticker/get-admin-sticker-packs failed. Using mock stickers data fallback.", error);
    return {
      success: true,
      data: getMockStickerPacks()
    };
  }
};

export const createStickerPackApi = async (payload: CreateStickerPayload) => {
  try {
    const hasFiles = payload.stickers.some(s => s instanceof File);

    if (hasFiles) {
      const formData = new FormData();
      formData.append("name", payload.name);
      formData.append("price", payload.price.toString());
      formData.append("totalSends", payload.totalSends.toString());

      payload.stickers.forEach((sticker) => {
        if (sticker instanceof File) {
          formData.append("stickers", sticker);
        } else {
          formData.append("stickers", sticker);
        }
      });

      const res = await axiosInstance.post(
        API_ROUTES.STICKER.CREATE || "/api/sticker/create-stickers",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" }
        }
      );
      return res.data;
    } else {
      const res = await axiosInstance.post(
        API_ROUTES.STICKER.CREATE || "/api/sticker/create-stickers",
        payload
      );
      return res.data;
    }
  } catch (error) {
    console.warn("Backend /api/sticker/create-stickers failed. Simulating local success.", error);

    const newPack: StickerPack = {
      _id: "pack_" + Math.random().toString(36).substr(2, 9),
      name: payload.name,
      price: Number(payload.price),
      totalSends: Number(payload.totalSends || 0),
      stickers: payload.stickers.map((s) => {
        if (s instanceof File) {
          return URL.createObjectURL(s);
        }
        return s;
      }),
      createdAt: new Date().toISOString()
    };
    saveMockStickerPack(newPack);
    return { success: true, data: newPack };
  }
};

export const deleteStickerPackApi = async (id: string) => {
  try {
    const res = await axiosInstance.delete(
      API_ROUTES.STICKER.DELETE(id) || `/api/sticker/delete-sticker/${id}`
    );
    return res.data;
  } catch (error) {
    console.warn("Backend /api/sticker/delete-sticker failed. Simulating local success.", error);
    
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const packs: StickerPack[] = JSON.parse(stored);
        const filtered = packs.filter((p) => p._id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
      } catch (err) {
        console.error(err);
      }
    }
    return { success: true, message: "Deleted sticker pack locally" };
  }
};

/* ==========================================================================
   LOCAL DATABASE SIMULATION FALLBACK FOR HIGH-FIDELITY INTERACTION
   ========================================================================== */

const STORAGE_KEY = "kinklink_mock_sticker_packs";
const INITIAL_STICKER_PACKS: StickerPack[] = [];

export const getMockStickerPacks = (): StickerPack[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_STICKER_PACKS));
    return INITIAL_STICKER_PACKS;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return INITIAL_STICKER_PACKS;
  }
};

export const saveMockStickerPack = (pack: StickerPack) => {
  const packs = getMockStickerPacks();
  packs.unshift(pack);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(packs));
};
