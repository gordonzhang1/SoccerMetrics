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
  advice: Recommendation[];
  score: number;
  video: string; // base64-encoded string
  knee_angle: number;
  ankle_angle: number;
  plant_knee_angle: number;
  plant_ankle_angle: number;
  body_straight_angle: number;
}

type foot = "left" | "right";

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB

// Helper to convert base64 string to a Blob
function base64ToBlob(base64: string, contentType = ""): Blob {
  const byteCharacters = atob(base64);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: contentType });
}

const Home: React.FC = () => {
  const { toast } = useToast();
  const [videoUrl, setVideoUrl] = useState<string>(
    "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [kneeAngle, setKneeAngle] = useState<number>(0);
  const [ankleAngle, setAnkleAngle] = useState<number>(0);
  const [plantKneeAngle, setPlantKneeAngle] = useState<number>(0);
  const [plantAnkleAngle, setPlantAnkleAngle] = useState<number>(0);
  const [bodyStraightAngle, setBodyStraightAngle] = useState<number>(0);
  const [selectedFoot, setSelectedFoot] = useState<foot>("right");
  const [recommendations, setRecommendations] = useState<Recommendation[]>([
    {
      id: "1",
      title: "",
      description:
        "",
    },
    {
      id: "2",
      title: "",
      description:
        "",
    },
    {
      id: "3",
      title: "",
      description:
        "",
    },
  ]);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
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
      formData.append("file", file);
      formData.append("rightFoot", selectedFoot.toString());
      console.log(selectedFoot, 'selected foot')
      // Send to backend API
      const response = await fetch("http://127.0.0.1:5000/get_stuff", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to analyze video");
      }

      // Backend now returns JSON:
      // {
      //   "advice": [...],
      //   "score": 91.12683189019864,
      //   "video": "<base64-encoded-string>"
      // }
      const data: AnalysisResponse = await response.json();

      // Extract base64 video and convert to Blob
      const videoBlob = base64ToBlob(data.video, "video/mp4");
      const videoObjectUrl = URL.createObjectURL(videoBlob);

      // Update UI with analysis results
      setVideoUrl(videoObjectUrl);
      setScore(Math.round(data.score));
      setRecommendations(data.advice);
      setKneeAngle(data.knee_angle);
      setAnkleAngle(data.ankle_angle);
      setPlantKneeAngle(data.plant_knee_angle);
      setPlantAnkleAngle(data.plant_ankle_angle);
      setBodyStraightAngle(data.body_straight_angle);

      toast({
        title: "Analysis complete",
        description: "Your shot has been analyzed successfully.",
      });
    } catch (err) {
      setError("Failed to analyze video. Please try again.");
    } finally {
      setIsLoading(false);
    }

    // Clean up object URL if needed
    return () => {
      if (videoUrl.startsWith("blob:")) {
        URL.revokeObjectURL(videoUrl);
      }
    };
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
                  className={`px-4 py-2 rounded-md transition-colors ${
                    selectedFoot === "left"
                      ? "bg-blue-600 text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Left Foot
                </button>
                <button
                  onClick={() => setSelectedFoot("right")}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    selectedFoot === "right"
                      ? "bg-blue-600 text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Right Foot
                </button>
              </div>
              <label
                htmlFor="video-upload"
                className={`cursor-pointer inline-flex items-center gap-2 ${
                  isLoading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
                } text-white px-4 py-2 rounded-lg transition-colors`}
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
      <AnalysisSidebar score={score} recommendations={recommendations} kneeAngle={kneeAngle} ankleAngle={ankleAngle} plantAnkleAngle={plantAnkleAngle} plantKneeAngle={plantKneeAngle} bodyStraightAngle={bodyStraightAngle}/>
    </div>
  ); 
};

export default Home;