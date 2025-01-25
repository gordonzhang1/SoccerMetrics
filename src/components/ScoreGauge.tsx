import React from "react";
import { Progress } from "./ui/progress";
import { cn } from "@/lib/utils";

interface ScoreGaugeProps {
  score?: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

const ScoreGauge = ({
  score = 75,
  size = "lg",
  showLabel = true,
}: ScoreGaugeProps) => {
  // Map size to dimensions
  const sizeMap = {
    sm: "w-40 h-40",
    md: "w-60 h-60",
    lg: "w-80 h-80",
  };

  // Calculate color based on score
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div
      className={cn(
        "relative flex items-center justify-center bg-gray-900 rounded-full",
        sizeMap[size],
      )}
    >
      {/* Circular progress background */}
      <div className="absolute inset-2 rounded-full bg-gray-800" />

      {/* Score display */}
      <div className="relative flex flex-col items-center justify-center">
        <span className={cn("text-4xl font-bold", getScoreColor(score))}>
          {score}
        </span>
        {showLabel && (
          <span className="text-gray-400 text-sm mt-2">Shot Score</span>
        )}
      </div>

      {/* Circular progress indicator */}
      <svg
        className="absolute inset-0 w-full h-full -rotate-90"
        viewBox="0 0 100 100"
      >
        <circle
          className="text-gray-800 stroke-current"
          strokeWidth="4"
          fill="none"
          r="45"
          cx="50"
          cy="50"
        />
        <circle
          className={cn(
            "stroke-current transition-all duration-300",
            getScoreColor(score),
          )}
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          r="45"
          cx="50"
          cy="50"
          strokeDasharray={`${score * 2.83} 283`}
        />
      </svg>

      {/* Linear progress bar for additional visual feedback */}
      <div className="absolute -bottom-8 left-0 w-full px-4">
        <Progress value={score} className="h-2" />
      </div>
    </div>
  );
};

export default ScoreGauge;
