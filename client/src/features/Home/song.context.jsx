import { createContext, useState } from "react";

export const SongContext = createContext();

export const SongProvider = ({ children }) => {
  const [song, setSong] = useState({
    url: "https://ik.imagekit.io/Kevaldhamecha/moodify/songs/Aaraaro_Aararo__From__quot_Bholaa_quot____DownloadMing.WS__le1SLbxG0.mp3",
    posterUrl:
      "https://ik.imagekit.io/Kevaldhamecha/moodify/poster/Aaraaro_Aararo__From__quot_Bholaa_quot____DownloadMing.WS__GbzMnFOVq.jpeg",
    title: "Aaraaro Aararo (From Bholaa) [DownloadMing.WS]",
    mood: "happy",
  });
  const [loading, setLoading] = useState(false);

  return (
    <SongContext.Provider value={{ song, setSong, loading, setLoading }}>
      {children}
    </SongContext.Provider>
  );
};
