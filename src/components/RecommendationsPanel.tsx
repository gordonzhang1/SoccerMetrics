import React from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

interface Recommendation {
  id: string;
  title: string;
  description: string;
}

interface RecommendationsPanelProps {
  recommendations?: Recommendation[];
  isExpanded?: boolean;
}

const defaultRecommendations: Recommendation[] = [
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
];

const RecommendationsPanel = ({
  recommendations = defaultRecommendations,
  isExpanded = true,
}: RecommendationsPanelProps) => {
  const [isOpen, setIsOpen] = React.useState(isExpanded);

  return (
    <Card className="w-full bg-gray-900 p-4 rounded-lg shadow-lg">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">
            Coaching Recommendations
          </h2>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
              {isOpen ? (
                <ChevronUp className="h-4 w-4 text-gray-400" />
              ) : (
                <ChevronDown className="h-4 w-4 text-gray-400" />
              )}
            </Button>
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent>
          <div className="space-y-4">
            {recommendations.map((rec) => (
              <div
                key={rec.id}
                className="p-3 bg-gray-800 rounded-md hover:bg-gray-700 transition-colors"
              >
                <h3 className="text-lg font-medium text-white mb-1">
                  {rec.title}
                </h3>
                <p className="text-gray-300 text-sm">{rec.description}</p>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default RecommendationsPanel;
