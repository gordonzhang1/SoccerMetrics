import React, { useState } from "react";
import VideoPlayer from "./VideoPlayer";
import AnalysisSidebar from "./AnalysisSidebar";
import { Upload, AlertCircle } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { Alert, AlertDescription } from "./ui/alert";

interface Recommendation {
  id: string;
  title: string;
  description: string;
}

interface AnalysisResponse {
  videoUrl: string;
  score: number;
  recommendations: Recommendation[];
}

type FootType = "left" | "right";

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB

const Home: React.FC = () => {
  const { toast } = useToast();
  const [videoUrl, setVideoUrl] = useState<string>(
    "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [score, setScore] = useState<number>(75);
  const [selectedFoot, setSelectedFoot] = useState<FootType>("right");
  const [recommendations, setRecommendations] = useState<Recommendation[]>([
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
  ]);

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

      // Create form data
      const formData = new FormData();
      formData.append("video", file);
      formData.append("foot", selectedFoot);

      // Send to backend API
      const response = await fetch("https://api.example.com/analyze-shot", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to analyze video");
      }

      // Get analysis results
      const analysis: AnalysisResponse = await response.json();

      // Update UI with analysis results
      setVideoUrl(analysis.videoUrl);
      setScore(analysis.score);
      setRecommendations(analysis.recommendations);

      toast({
        title: "Analysis complete",
        description: "Your shot has been analyzed successfully.",
      });
    } catch (err) {
      setError("Failed to analyze video. Please try again.");
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
            <div className="flex items-center gap-4">
              <div className="flex bg-gray-800 rounded-lg p-1">
                <button
                  onClick={() => setSelectedFoot("left")}
                  className={`px-4 py-2 rounded-md transition-colors ${selectedFoot === "left" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"}`}
                >
                  Left Foot
                </button>
                <button
                  onClick={() => setSelectedFoot("right")}
                  className={`px-4 py-2 rounded-md transition-colors ${selectedFoot === "right" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"}`}
                >
                  Right Foot
                </button>
              </div>
              <label
                htmlFor="video-upload"
                className={`cursor-pointer inline-flex items-center gap-2 ${isLoading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"} text-white px-4 py-2 rounded-lg transition-colors`}
              >
                <Upload className="w-4 h-4" />
                <span>{isLoading ? "Loading..." : "Upload Video"}</span>
                <input
                  id="video-upload"
                  type="file"
                  accept="video/*"
                  onChange={handleFileUpload}
                  disabled={isLoading}
                  className="hidden"
                />
              </label>
            </div>
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
