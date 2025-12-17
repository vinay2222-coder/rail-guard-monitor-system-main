
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import { cn } from "@/lib/utils";
import { TrainFront } from "lucide-react";
import SensorChart from "@/components/SensorChart";
import { toast } from "@/components/ui/sonner";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxATOsAmyev1LRKE6dNEudGwxk2ewCTdw",
  authDomain: "ias-project-509e8.firebaseapp.com",
  databaseURL: "https://ias-project-509e8-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ias-project-509e8",
  storageBucket: "ias-project-509e8.appspot.com",
  messagingSenderId: "43744386567",
  appId: "1:43744386567:web:a389d1b2d91d9b5071d4a2",
  measurementId: "G-D4WT9H2WEW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

interface SensorData {
  frontus: string;
  backus: string;
  gate1: string;
  gate2: string;
  timestamp?: number;
}

const Dashboard = () => {
  const [sensorData, setSensorData] = useState<SensorData>({
    frontus: "Unknown",
    backus: "Unknown",
    gate1: "Unknown",
    gate2: "Unknown"
  });
  
  const [chartData, setChartData] = useState<{
    labels: string[];
    frontData: number[];
    backData: number[];
  }>({
    labels: [],
    frontData: [],
    backData: []
  });
  
  useEffect(() => {
    const sensorRef = ref(db, "sensor");
    
    const unsubscribe = onValue(sensorRef, (snapshot) => {
      const data = snapshot.val();
      
      if (data) {
        const newData = {
          frontus: data.frontus || "Unknown",
          backus: data.backus || "Unknown",
          gate1: data.gate1 || "Unknown",
          gate2: data.gate2 || "Unknown",
          timestamp: Date.now()
        };
        
        setSensorData(newData);
        
        // Handle status change notifications
        if (newData.frontus !== sensorData.frontus) {
          toast(`Front Sensor: ${newData.frontus}`, {
            icon: "🚂"
          });
        }
        
        if (newData.backus !== sensorData.backus) {
          toast(`Back Sensor: ${newData.backus}`, {
            icon: "🚂"
          });
        }
        
        // Update chart data
        const now = new Date().toLocaleTimeString();
        setChartData(prev => {
          const labels = [...prev.labels, now].slice(-20);
          const frontData = [...prev.frontData, newData.frontus === "train passing" ? 1 : 0].slice(-20);
          const backData = [...prev.backData, newData.backus === "train passing" ? 1 : 0].slice(-20);
          
          return { labels, frontData, backData };
        });
        
        // Store the log in local storage for the logs page
        const log = {
          timestamp: Date.now(),
          frontus: newData.frontus,
          backus: newData.backus,
          gate1: newData.gate1,
          gate2: newData.gate2
        };
        
        const logs = JSON.parse(localStorage.getItem("railwayLogs") || "[]");
        logs.unshift(log);
        localStorage.setItem("railwayLogs", JSON.stringify(logs.slice(0, 50)));
      }
    });
    
    return () => unsubscribe();
  }, [sensorData.frontus, sensorData.backus]);

  const getStatusClass = (type: string, value: string) => {
    if (type === "sensor") {
      return value === "train passing" ? "bg-status-train animate-status-pulse" : "bg-status-no-train";
    } else if (type === "gate") {
      return value === "open" ? "bg-status-open" : "bg-status-closed";
    }
    return "bg-gray-400";
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center mb-8">
        🚦 Railway Gate Monitoring
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="shadow-md transition-all duration-300 hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Front Sensor</CardTitle>
            <TrainFront className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center pt-4">
              <div className={cn(
                "px-4 py-2 rounded-full font-semibold text-white",
                getStatusClass("sensor", sensorData.frontus)
              )}>
                {sensorData.frontus}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md transition-all duration-300 hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Back Sensor</CardTitle>
            <TrainFront className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center pt-4">
              <div className={cn(
                "px-4 py-2 rounded-full font-semibold text-white",
                getStatusClass("sensor", sensorData.backus)
              )}>
                {sensorData.backus}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md transition-all duration-300 hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Gate 1</CardTitle>
            <div className="h-6 w-6 overflow-hidden">
              <img
                src="/lovable-uploads/bdfc3d38-ed7c-4ec6-ae84-2768a0a63bd9.png"
                alt="Railway Gate"
                className="h-full w-full object-contain"
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center pt-4">
              <div className={cn(
                "px-4 py-2 rounded-full font-semibold text-white animate-status-pulse",
                getStatusClass("gate", sensorData.gate1)
              )}>
                {sensorData.gate1}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md transition-all duration-300 hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Gate 2</CardTitle>
            <div className="h-6 w-6 overflow-hidden">
              <img
                src="/lovable-uploads/bdfc3d38-ed7c-4ec6-ae84-2768a0a63bd9.png"
                alt="Railway Gate"
                className="h-full w-full object-contain"
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center pt-4">
              <div className={cn(
                "px-4 py-2 rounded-full font-semibold text-white animate-status-pulse",
                getStatusClass("gate", sensorData.gate2)
              )}>
                {sensorData.gate2}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-10 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Safety Status</h2>
        <SensorChart 
          data={chartData} 
          gate1Status={sensorData.gate1}
          gate2Status={sensorData.gate2}
        />
      </div>
    </div>
  );
};

export default Dashboard;
