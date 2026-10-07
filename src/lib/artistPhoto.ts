import { ARTIST_PHOTO } from "./event";

export type PhotoMode = "standin" | "frame" | "subject";

export interface ArtistPhoto {
  src: string;
  isReal: boolean;
  mode: PhotoMode;
  source: "project" | "placeholder";
}

let snapshot: ArtistPhoto = {
  src: ARTIST_PHOTO.fallback,
  isReal: true,
  mode: "frame",
  source: "project",
};
let initialization: Promise<void> | null = null;
const listeners = new Set<() => void>();

function imageSize(src: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const timeout = window.setTimeout(
      () => reject(new Error("The image could not be loaded.")),
      10000
    );
    image.onload = () => {
      window.clearTimeout(timeout);
      resolve({ width: image.naturalWidth, height: image.naturalHeight });
    };
    image.onerror = () => {
      window.clearTimeout(timeout);
      reject(new Error("Missing image."));
    };
    image.src = src;
  });
}

function modeFor(src: string, width: number, height: number): PhotoMode {
  // The baked-in portrait is composed for full-bleed cover framing.
  if (src.includes("hero-ecee-black")) return "standin";
  return width / height > 1.35 ? "frame" : "subject";
}

async function projectPhoto(): Promise<ArtistPhoto> {
  for (const src of ARTIST_PHOTO.candidates) {
    try {
      const { width, height } = await imageSize(src);
      return { src, isReal: true, mode: modeFor(src, width, height), source: "project" };
    } catch {
      // A missing asset must not block later candidates or the fallback.
    }
  }
  return { src: ARTIST_PHOTO.fallback, isReal: true, mode: "frame", source: "project" };
}

export function initializeArtistPhoto(): Promise<void> {
  if (!initialization) {
    initialization = (async () => {
      const photo = await projectPhoto();
      snapshot = photo;
      listeners.forEach((listener) => listener());
    })();
  }
  return initialization;
}

export function getArtistPhoto(): ArtistPhoto {
  return snapshot;
}

export function subscribeToArtistPhoto(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
