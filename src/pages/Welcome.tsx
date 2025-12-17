
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Welcome = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const handleEnter = () => {
    setLoading(true);
    setTimeout(() => {
      navigate("/dashboard");
    }, 500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-md w-full p-6 space-y-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-blue-600 mb-2">
            Railway Gate Guardian
          </h1>
          
          <p className="text-gray-600 mb-8">
            Advanced monitoring system for railway crossings that ensures safety
            through real-time sensor data and responsive gate controls
          </p>
          
          <div className="grid grid-cols-2 gap-4 my-10">
            <FeatureCard 
              title="Train Detection" 
              color="bg-blue-500"
              icon={<TrainIcon className="text-white" />}
              description="Real-time train detection using ultrasonic sensors"
            />
            <FeatureCard 
              title="Gate Control" 
              color="bg-green-500"
              icon={<GateIcon className="text-white" />}
              description="Automatic gate operation for safety"
            />
            <FeatureCard 
              title="Alert System" 
              color="bg-red-500"
              icon={<AlertIcon className="text-white" />}
              description="Visual and audible alerts for approaching trains"
            />
            <FeatureCard 
              title="Data Logging" 
              color="bg-yellow-500"
              icon={<LogIcon className="text-white" />}
              description="Comprehensive event logging and history"
            />
          </div>
          
          <Button 
            onClick={handleEnter} 
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md flex items-center justify-center text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {loading ? "Loading..." : (
              <>
                Enter Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

// Feature card component
interface FeatureCardProps {
  title: string;
  color: string;
  icon: React.ReactNode;
  description: string;
}

const FeatureCard = ({ title, color, icon, description }: FeatureCardProps) => (
  <div className="flex flex-col items-center bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
    <div className={`w-12 h-12 ${color} rounded-full flex items-center justify-center mb-3 shadow-inner`}>
      {icon}
    </div>
    <h3 className="text-sm font-semibold mb-1">{title}</h3>
    <p className="text-xs text-gray-500 text-center">{description}</p>
  </div>
);

// Simple SVG icons for the feature indicators
const TrainIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <path d="M4 12h16" />
    <path d="M12 4v16" />
  </svg>
);

const GateIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 6L6 18" />
    <path d="M6 6l12 12" />
  </svg>
);

const AlertIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 8v4" />
    <path d="M12 16h.01" />
    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" />
  </svg>
);

const LogIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6" />
    <path d="M16 13H8" />
    <path d="M16 17H8" />
    <path d="M10 9H8" />
  </svg>
);

export default Welcome;
