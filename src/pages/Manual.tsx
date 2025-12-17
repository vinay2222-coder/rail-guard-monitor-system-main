
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Manual = () => {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Railway Gate Monitoring - Manual</h1>
      
      <div className="max-w-3xl mx-auto">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Introduction</CardTitle>
            <CardDescription>
              Overview of the Railway Gate Monitoring System
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              The Railway Gate Monitoring System is designed to enhance safety at railway crossings by providing real-time monitoring of train presence and gate status. The system uses ultrasonic sensors to detect trains and automatically controls the railway gates.
            </p>
            <p>
              This dashboard provides a visual interface to monitor the system status and view historical data of train passages.
            </p>
          </CardContent>
        </Card>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Setup</CardTitle>
            <CardDescription>
              How the system is configured
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <h3 className="font-semibold text-lg">Sensor Placement</h3>
            <p>
              Two ultrasonic sensors are placed on either side of the railway crossing:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Front Sensor:</strong> Detects an approaching train before it reaches the crossing.</li>
              <li><strong>Back Sensor:</strong> Detects when the train has passed the crossing completely.</li>
            </ul>
            
            <Separator className="my-4" />
            
            <h3 className="font-semibold text-lg">Firebase Configuration</h3>
            <p>
              The system uses Firebase Realtime Database to store and retrieve sensor data. The configuration includes:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Database URL:</strong> https://ias-project-509e8-default-rtdb.asia-southeast1.firebasedatabase.app</li>
              <li><strong>Data Structure:</strong> The database stores sensor readings under the "sensor" node with fields for frontus, backus, gate1, and gate2.</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Rules & Operation</CardTitle>
            <CardDescription>
              How the system works and determines status
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <h3 className="font-semibold text-lg">Train Detection Process</h3>
            <ol className="list-decimal pl-6 space-y-2">
              <li>When a train approaches, the front sensor detects it and changes status to "train passing".</li>
              <li>Upon train detection, both gates automatically close to prevent vehicles from crossing.</li>
              <li>As the train passes the crossing completely, the back sensor detects it and shows "train passing".</li>
              <li>After the train has passed both sensors, they return to "no train" status.</li>
              <li>When both sensors show "no train", the gates open automatically.</li>
            </ol>
            
            <Separator className="my-4" />
            
            <h3 className="font-semibold text-lg">Status Indicators</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              <div>
                <h4 className="font-medium">Sensor Status:</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li><span className="inline-block w-3 h-3 rounded-full bg-status-train mr-2"></span> <strong>train passing</strong>: Train detected</li>
                  <li><span className="inline-block w-3 h-3 rounded-full bg-status-no-train mr-2"></span> <strong>no train</strong>: No train detected</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium">Gate Status:</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li><span className="inline-block w-3 h-3 rounded-full bg-status-open mr-2"></span> <strong>open</strong>: Gate is open, safe to cross</li>
                  <li><span className="inline-block w-3 h-3 rounded-full bg-status-closed mr-2"></span> <strong>closed</strong>: Gate is closed, do not cross</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Troubleshooting</CardTitle>
            <CardDescription>
              Common issues and solutions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <h3 className="font-semibold text-lg">Common Issues</h3>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong>Sensor shows "Unknown":</strong>
                <p className="text-sm mt-1">The sensor is not reporting data or the connection to Firebase is lost. Check the sensor power and network connection.</p>
              </li>
              <li>
                <strong>Gates don't change status:</strong>
                <p className="text-sm mt-1">The gate mechanism may be stuck or disconnected. Check the gate power supply and mechanical components.</p>
              </li>
              <li>
                <strong>Chart not updating:</strong>
                <p className="text-sm mt-1">Refresh the page or check your internet connection. The chart relies on real-time data from Firebase.</p>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Manual;
