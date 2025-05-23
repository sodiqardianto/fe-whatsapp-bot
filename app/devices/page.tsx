"use client";
import QRCodePlaceholder from "@/components/QRCodePlaceholder";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/lib/axios";
import { RefreshCw } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { io, Socket } from "socket.io-client";

interface Device {
  id: number;
  name: string;
  phone: string;
  status: "online" | "offline";
}

interface QRData {
  qrCode: string;
  deviceId: number;
}

interface DeviceStatusData {
  deviceId: number;
  status: "online" | "offline";
}

interface SocketError {
  message: string;
}

export default function Devices() {
  const [devices, setDevices] = useState<Device[]>([
    { id: 2, name: "WA Personal", phone: "+6289876543210", status: "offline" },
  ]);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // Initialize socket connection
    const socketInstance = io(
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
      {
        path: "/socket.io",
        transports: ["websocket"],
      }
    );

    // Socket event listeners
    socketInstance.on("connect", () => {
      console.log("Socket connected");
    });

    socketInstance.on("qr", (data: QRData) => {
      console.log("QR Code received:", data);
      if (data.qrCode) {
        setQrCode(data.qrCode);
        toast.success("QR Code generated successfully");
      }
    });

    socketInstance.on("ready", (data: DeviceStatusData) => {
      console.log("Device ready:", data);
      setQrCode(null);
      toast.success("Device connected successfully");
      // Update device status
      setDevices((prevDevices) =>
        prevDevices.map((device) =>
          device.id === data.deviceId ? { ...device, status: "online" } : device
        )
      );
    });

    socketInstance.on("disconnected", (data: DeviceStatusData) => {
      console.log("Device disconnected:", data);
      toast.warning("Device disconnected");
      // Update device status
      setDevices((prevDevices) =>
        prevDevices.map((device) =>
          device.id === data.deviceId
            ? { ...device, status: "offline" }
            : device
        )
      );
    });

    socketInstance.on("error", (error: SocketError) => {
      console.error("Socket error:", error);
      toast.error(error.message || "An error occurred");
    });

    setSocket(socketInstance);

    // Cleanup on unmount
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const handleGenerateSession = async (deviceId: number) => {
    try {
      setLoading(true);
      const { data } = await api.get("/whatsapp/qr");

      console.log(data);
      if (data.status === "qr" && data.qrCode) {
        setQrCode(data.qrCode);
        toast.success("QR Code generated successfully");
      }
    } catch (error: any) {
      console.error("Error generating session:", error);
      toast.error(
        error.response?.data?.message || "Failed to generate QR code"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Devices</h1>
        <p className="text-gray-500">Manage your devices here</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {devices.map((device) => (
          <Card key={device.id}>
            <CardContent className="flex justify-center py-4">
              <div className="text-center">
                {qrCode ? (
                  <div className="flex flex-col items-center">
                    <Image
                      src={qrCode}
                      alt="WhatsApp QR Code"
                      width={200}
                      height={200}
                      className="mb-4"
                    />
                    <p className="text-sm text-gray-500 mb-2">
                      Scan this QR code with WhatsApp
                    </p>
                  </div>
                ) : (
                  <QRCodePlaceholder />
                )}
                <div className="flex flex-col items-center gap-2">
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => handleGenerateSession(device.id)}
                    disabled={loading}
                  >
                    <RefreshCw
                      className={`mr-2 h-4 w-4 ${
                        loading ? "animate-spin" : ""
                      }`}
                    />
                    {loading ? "Generating..." : "Generate Session"}
                  </Button>
                  <span
                    className={`text-sm ${
                      device.status === "online"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    Status: {device.status}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
