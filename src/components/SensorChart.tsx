
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, CheckCircle } from "lucide-react";

interface SensorChartProps {
  data: {
    labels: string[];
    frontData: number[];
    backData: number[];
  };
  gate1Status: string;
  gate2Status: string;
}

const SensorChart = ({ gate1Status, gate2Status }: SensorChartProps) => {
  // Check if both gates are closed - indicating train is detected
  const isTrainDetected = gate1Status === "closed" && gate2Status === "closed";

  return (
    <div className="w-full h-80 flex items-center justify-center">
      <Card className={`w-full max-w-2xl p-6 shadow-lg ${isTrainDetected ? 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800' : 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800'}`}>
        <CardContent className="flex items-center justify-center py-8 px-4">
          <div className="flex flex-col items-center text-center">
            {isTrainDetected ? (
              <>
                <AlertCircle className="h-16 w-16 text-red-500 mb-4 animate-status-pulse" />
                <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">
                  Train Detected
                </h2>
                <p className="text-xl text-gray-700 dark:text-gray-300">
                  Not safe to pass, please wait
                </p>
              </>
            ) : (
              <>
                <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                <h2 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
                  please be safe
                </h2>
                <p className="text-xl text-gray-700 dark:text-gray-300">
                  check the gates for safe passage
                </p>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SensorChart;
