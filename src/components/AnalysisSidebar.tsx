import React from "react";
import ScoreGauge from "./ScoreGauge";
import RecommendationsPanel from "./RecommendationsPanel";

interface AnalysisSidebarProps {
  score?: number;
  kneeAngle?: number;
  ankleAngle?: number;
  plantKneeAngle?: number;
  plantAnkleAngle?: number;
  bodyStraightAngle?: number;
  recommendations?: Array<{
    id: string;
    title: string;
    description: string;
  }>;
}

const AnalysisSidebar: React.FC<AnalysisSidebarProps> = ({
  score = 75,
  kneeAngle,
  ankleAngle,
  plantKneeAngle,
  plantAnkleAngle,
  bodyStraightAngle,
  recommendations = [
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
  ],
}) => {
  return (
    <div className="w-[400px] h-full bg-gray-900 border-l border-gray-800 p-6 flex flex-col gap-8 overflow-y-auto">
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-semibold text-white mb-6">
          Shot Analysis
        </h2>
        <ScoreGauge score={score} size="md" showLabel={true} />
      </div>
      <div className="flex-1">
        <RecommendationsPanel
          recommendations={recommendations}
          isExpanded={true}
        />
      </div>
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-semibold text-white mb-6">
            Angles at impact
        </h2>
        <div>
          <ul className="space-y-2 text-white">
            <li>
              <strong>Knee Angle:</strong> {kneeAngle}°
            </li>
            <li>
              <strong>Ankle Angle:</strong> {ankleAngle}°
            </li>
            <li>
              <strong>Plant Knee Angle:</strong> {plantKneeAngle}°
            </li>
            <li>
              <strong>Plant Ankle Angle:</strong> {plantAnkleAngle}°
            </li>
            <li>
              <strong>Body Angle:</strong> {bodyStraightAngle}°
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AnalysisSidebar;
