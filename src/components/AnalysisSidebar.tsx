import React from "react";
import ScoreGauge from "./ScoreGauge";
import RecommendationsPanel from "./RecommendationsPanel";

interface AnalysisSidebarProps {
  score?: number;
  recommendations?: Array<{
    id: string;
    title: string;
    description: string;
  }>;
}

const AnalysisSidebar: React.FC<AnalysisSidebarProps> = ({
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
    <div className="w-[400px] h-full bg-gray-900 border-l border-gray-800 p-6 flex flex-col gap-8 overflow-y-auto">
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-semibold text-white mb-6">
          Shot Analysis
        </h2>
        <ScoreGauge score={score} size="lg" showLabel={true} />
      </div>

      <div className="flex-1">
        <RecommendationsPanel
          recommendations={recommendations}
          isExpanded={true}
        />
      </div>
    </div>
  );
};

export default AnalysisSidebar;
