import { useEffect, useSyncExternalStore } from "react";
import {
  getArtistPhoto,
  initializeArtistPhoto,
  subscribeToArtistPhoto,
} from "../lib/artistPhoto";
import type { ArtistPhoto } from "../lib/artistPhoto";

export type { ArtistPhoto, PhotoMode } from "../lib/artistPhoto";

/** Shared artwork updates the hero and headliner tile together, without a page reload. */
export function useArtistPhoto(): ArtistPhoto {
  const photo = useSyncExternalStore(subscribeToArtistPhoto, getArtistPhoto, getArtistPhoto);
  useEffect(() => {
    void initializeArtistPhoto();
  }, []);
  return photo;
}
