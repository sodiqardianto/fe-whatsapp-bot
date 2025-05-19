"use client";
import QRCodePlaceholder from "@/components/QRCodePlaceholder";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { RefreshCw } from "lucide-react";
import { useState } from "react";

export default function Devices() {
  const [devices, setDevices] = useState([
    { id: 2, name: "WA Personal", phone: "+6289876543210", status: "offline" },
  ]);
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
                <QRCodePlaceholder />
                <Button variant="outline" className="mt-4" onClick={() => {}}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Generate Session
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
