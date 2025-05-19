interface QRCodePlaceholderProps {
  size?: number;
}

export default function QRCodePlaceholder({
  size = 150,
}: QRCodePlaceholderProps) {
  return (
    <div
      style={{ width: size, height: size }}
      className="bg-white border border-gray-200 flex items-center justify-center"
    >
      <div className="text-center">
        <div className="border-2 border-dashed border-gray-300 p-6 rounded">
          <p className="text-sm text-gray-500">QR Code</p>
          <p className="text-xs text-gray-400 mt-1">WhatsApp Gateway</p>
        </div>
      </div>
    </div>
  );
}
