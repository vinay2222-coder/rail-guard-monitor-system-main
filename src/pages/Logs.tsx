
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface LogEntry {
  timestamp: number;
  frontus: string;
  backus: string;
  gate1: string;
  gate2: string;
}

const Logs = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  
  useEffect(() => {
    // Get logs from localStorage
    const storedLogs = JSON.parse(localStorage.getItem("railwayLogs") || "[]");
    setLogs(storedLogs.slice(0, 10)); // Show only the last 10 logs
  }, []);
  
  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };
  
  const getEventDescription = (log: LogEntry) => {
    if (log.frontus === "train passing" && log.backus !== "train passing") {
      return "Train Detected at Front Sensor";
    } else if (log.frontus === "train passing" && log.backus === "train passing") {
      return "Train Passing Through Crossing";
    } else if (log.frontus !== "train passing" && log.backus === "train passing") {
      return "Train Detected at Back Sensor";
    } else if (log.gate1 === "closed" && log.gate2 === "closed") {
      return "Gates Closed";
    } else if (log.gate1 === "open" && log.gate2 === "open") {
      return "Gates Opened";
    }
    return "Status Update";
  };
  
  const getStatusBadgeColor = (event: string) => {
    if (event.includes("Train Detected")) {
      return "bg-yellow-500 hover:bg-yellow-600";
    } else if (event.includes("Train Passing")) {
      return "bg-red-500 hover:bg-red-600";
    } else if (event.includes("Gates Closed")) {
      return "bg-orange-500 hover:bg-orange-600";
    } else if (event.includes("Gates Opened")) {
      return "bg-green-500 hover:bg-green-600";
    }
    return "bg-blue-500 hover:bg-blue-600";
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Railway Gate Monitoring - Log</h1>
      
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>System Activity Log</CardTitle>
        </CardHeader>
        <CardContent>
          {logs.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500">No log entries available. The logs will appear as events occur.</p>
            </div>
          ) : (
            <Table>
              <TableCaption>Last {logs.length} events from the monitoring system</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[180px]">Timestamp</TableHead>
                  <TableHead>Event</TableHead>
                  <TableHead className="w-[150px]">Front Sensor</TableHead>
                  <TableHead className="w-[150px]">Back Sensor</TableHead>
                  <TableHead className="w-[100px]">Gate 1</TableHead>
                  <TableHead className="w-[100px]">Gate 2</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs.map((log, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{formatTimestamp(log.timestamp)}</TableCell>
                    <TableCell>
                      <Badge className={getStatusBadgeColor(getEventDescription(log))}>
                        {getEventDescription(log)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={log.frontus === "train passing" ? "destructive" : "outline"}>
                        {log.frontus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={log.backus === "train passing" ? "destructive" : "outline"}>
                        {log.backus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={log.gate1 === "open" ? "success" : "outline"}>
                        {log.gate1}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={log.gate2 === "open" ? "success" : "outline"}>
                        {log.gate2}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Logs;
