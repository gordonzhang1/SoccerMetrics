import React from "react";
import VideoPlayer from "./VideoPlayer";
import AnalysisSidebar from "./AnalysisSidebar";

interface HomeProps {
  videoUrl?: string;
  score?: number;
  recommendations?: Array<{
    id: string;
    title: string;
    description: string;
  }>;
}

const Home: React.FC<HomeProps> = ({
  videoUrl = "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  score = 75,
  recommendations = [
    {
      id: "1",
      title: "Improve Follow Through",
      description:
        "Extend your kicking leg fully after contact with the ball for better power and accuracy.",
    },
    {
      id: "2",
      title: "Plant Foot Position",
      description:
        "Position your plant foot closer to the ball for better stability and control.",
    },
    {
      id: "3",
      title: "Hip Rotation",
      description:
        "Increase hip rotation during the shot to generate more power in your kicks.",
    },
  ],
}) => {
  return (
    <div className="flex h-screen w-full bg-gray-950">
      {/* Main content area with video player */}
      <div className="flex-1 p-6">
        <div className="h-full rounded-lg overflow-hidden shadow-2xl">
          <VideoPlayer
            videoUrl={videoUrl}
            autoPlay={false}
            onTimeUpdate={(time) => console.log("Time update:", time)}
            onDurationChange={(duration) => console.log("Duration:", duration)}
          />
        </div>
      </div>

      {/* Analysis sidebar */}
      <AnalysisSidebar score={score} recommendations={recommendations} />
    </div>
  );
};

export default Home;
