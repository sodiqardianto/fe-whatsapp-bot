import {
  Activity,
  Check,
  AlertTriangle,
  Users,
  Smartphone,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import QRCodePlaceholder from "@/components/QRCodePlaceholder";

export default function Home() {
  const stats = [
    {
      title: "Pesan Terkirim",
      value: "1,234",
      icon: Check,
      color: "text-green-500",
    },
    {
      title: "Pesan Gagal",
      value: "56",
      icon: AlertTriangle,
      color: "text-red-500",
    },
    {
      title: "Kontak Aktif",
      value: "789",
      icon: Users,
      color: "text-blue-500",
    },
    {
      title: "Perangkat Terhubung",
      value: "2",
      icon: Smartphone,
      color: "text-purple-500",
    },
  ];

  const activityLogs = [
    {
      id: 1,
      action: "Pesan terkirim ke Budi",
      time: "5 menit yang lalu",
      status: "success",
    },
    {
      id: 2,
      action: "Scan QR Code berhasil",
      time: "10 menit yang lalu",
      status: "success",
    },
    {
      id: 3,
      action: "Pesan gagal terkirim ke Ani",
      time: "30 menit yang lalu",
      status: "error",
    },
    {
      id: 4,
      action: "Import 50 kontak",
      time: "1 jam yang lalu",
      status: "success",
    },
    {
      id: 5,
      action: "Perangkat terputus",
      time: "2 jam yang lalu",
      status: "warning",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-500">Selamat datang di WhatsApp Gateway</p>
      </div>

      {/* Statistik */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6 flex items-center space-x-4">
              <div className={`p-3 rounded-full ${stat.color} bg-opacity-10`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        {/* Status Koneksi & QR Code */}
        <Card>
          <CardHeader>
            <CardTitle>Status Koneksi</CardTitle>
            <CardDescription>
              Scan QR code untuk menghubungkan perangkat
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="text-center">
              <QRCodePlaceholder size={200} />
              <p className="mt-4 text-sm text-gray-500">
                Status:{" "}
                <span className="text-green-500 font-medium">Terhubung</span>
              </p>
              <p className="text-xs text-gray-400">
                Perangkat: WA Business +62812345678
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Log Aktivitas */}
        <Card>
          <CardHeader>
            <CardTitle>Log Aktivitas</CardTitle>
            <CardDescription>Aktivitas terbaru di sistem</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activityLogs.map((log) => (
                <div
                  key={log.id}
                  className="flex items-center space-x-3 text-sm"
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      log.status === "success"
                        ? "bg-green-500"
                        : log.status === "error"
                        ? "bg-red-500"
                        : "bg-yellow-500"
                    }`}
                  />
                  <div className="flex-1">
                    <p>{log.action}</p>
                    <p className="text-gray-400">{log.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
