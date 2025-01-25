import React, { useState } from "react";
import VideoPlayer from "./VideoPlayer";
import AnalysisSidebar from "./AnalysisSidebar";
import { Upload, AlertCircle } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { Alert, AlertDescription } from "./ui/alert";

interface HomeProps {
  score?: number;
  recommendations?: Array<{
    id: string;
    title: string;
    description: string;
  }>;
}

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB

const Home: React.FC<HomeProps> = ({
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
  const { toast } = useToast();
  const [videoUrl, setVideoUrl] = useState<string>(
    "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Reset states
    setError("");

    // Validate file type
    if (!file.type.startsWith("video/")) {
      setError("Please upload a valid video file");
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      setError("File size must be less than 100MB");
      return;
    }

    try {
      setIsLoading(true);
      const videoUrl = URL.createObjectURL(file);
      setVideoUrl(videoUrl);
      toast({
        title: "Video uploaded successfully",
        description: file.name,
      });
    } catch (err) {
      setError("Failed to load video. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-gray-950">
      {/* Main content area with video player */}
      <div className="flex-1 p-6">
        <div className="mb-4 space-y-4">
          <div className="flex justify-between items-center">
            <label
              htmlFor="video-upload"
              className={`cursor-pointer inline-flex items-center gap-2 ${isLoading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"} text-white px-4 py-2 rounded-lg transition-colors`}
            >
              <Upload className="w-4 h-4" />
              <input
                id="video-upload"
                type="file"
                accept="video/*"
                onChange={handleFileUpload}
                disabled={isLoading}
                className="hidden"
              />
              {isLoading ? "Loading..." : "Upload Video"}
            </label>
            <span className="text-sm text-gray-400">
              Maximum file size: 100MB
            </span>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>
        <div className="h-[calc(100%-5rem)] rounded-lg overflow-hidden shadow-2xl">
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
