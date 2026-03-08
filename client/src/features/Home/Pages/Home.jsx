import React from "react";
import FaceExpression from "./../../Expression/components/FaceExpression";
import Player from "../components/Player";
import "../style/home.scss";
import { useSong } from "../hooks/useSong";

const Home = () => {
  const { handleGetSong } = useSong();
  return (
    <div className="home-page">
      <div className="face-section">
        <FaceExpression onClick={(expression) => handleGetSong(expression)} />
      </div>
      <div className="player-section">
        <Player />
      </div>
    </div>
  );
};

export default Home;
