import { useContext } from "react";
import { getSongs } from "../services/song.api";
import { SongContext } from "../song.context";

export const useSong = () => {
  const { song, setSong, loading, setLoading } = useContext(SongContext);

  const handleGetSong = async (mood) => {
    setLoading(true);
    const data = await getSongs({ mood });
    setSong(data.song);
    setLoading(false);
  };

  return { song, loading, handleGetSong };
};
