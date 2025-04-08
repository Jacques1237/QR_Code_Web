import React, { useState } from 'react';
import { QROptions, QRType, WifiConfig } from '../types';
import { Hash, Link, MessageSquare, Phone, Wifi, Mail, Share2, Image } from 'lucide-react';

const typeIcons = {
  url: <Link className="w-5 h-5" />,
  text: <MessageSquare className="w-5 h-5" />,
  phone: <Phone className="w-5 h-5" />,
  wifi: <Wifi className="w-5 h-5" />,
  email: <Mail className="w-5 h-5" />,
  social: <Share2 className="w-5 h-5" />,
};

interface Props {
  onGenerate: (options: QROptions) => void;
}

export function QRForm({ onGenerate }: Props) {
  const [type, setType] = useState<QRType>('url');
  const [content, setContent] = useState('');
  const [color, setColor] = useState('#000000');
  const [size, setSize] = useState(300);
  const [errorLevel, setErrorLevel] = useState<'L' | 'M' | 'Q' | 'H'>('M');
  const [logo, setLogo] = useState<string>('');
  
  // WiFi specific state
  const [wifiConfig, setWifiConfig] = useState<WifiConfig>({
    ssid: '',
    password: '',
    encryption: 'WPA',
    hidden: false,
  });

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogo(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let finalContent = content;
    if (type === 'wifi') {
      // Format WiFi content according to standard
      finalContent = `WIFI:T:${wifiConfig.encryption};S:${wifiConfig.ssid};P:${wifiConfig.password};H:${wifiConfig.hidden ? 'true' : 'false'};;`;
    }

    onGenerate({
      type,
      content: finalContent,
      color,
      size,
      errorCorrectionLevel: errorLevel,
      logo: logo || undefined,
      wifiConfig: type === 'wifi' ? wifiConfig : undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-6">
      <div className="grid grid-cols-3 gap-4">
        {Object.entries(typeIcons).map(([key, icon]) => (
          <button
            key={key}
            type="button"
            onClick={() => setType(key as QRType)}
            className={`p-4 rounded-lg flex flex-col items-center justify-center gap-2 transition-colors ${
              type === key
                ? 'bg-blue-500 text-white'
                : 'bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white'
            }`}
          >
            {icon}
            <span className="text-sm capitalize">{key}</span>
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {type === 'wifi' ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-white">
                Network Name (SSID)
              </label>
              <input
                type="text"
                value={wifiConfig.ssid}
                onChange={(e) => setWifiConfig({ ...wifiConfig, ssid: e.target.value })}
                placeholder="Enter network name..."
                className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-white">
                Password
              </label>
              <input
                type="password"
                value={wifiConfig.password}
                onChange={(e) => setWifiConfig({ ...wifiConfig, password: e.target.value })}
                placeholder="Enter password..."
                className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                required={wifiConfig.encryption !== 'nopass'}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-white">
                Encryption Type
              </label>
              <select
                value={wifiConfig.encryption}
                onChange={(e) => setWifiConfig({ ...wifiConfig, encryption: e.target.value as 'WPA' | 'WEP' | 'nopass' })}
                className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              >
                <option value="WPA">WPA/WPA2</option>
                <option value="WEP">WEP</option>
                <option value="nopass">No Password</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="hidden-network"
                checked={wifiConfig.hidden}
                onChange={(e) => setWifiConfig({ ...wifiConfig, hidden: e.target.checked })}
                className="rounded border-gray-300 dark:border-gray-700"
              />
              <label htmlFor="hidden-network" className="text-sm dark:text-white">
                Hidden Network
              </label>
            </div>
          </div>
        ) : (
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={`Enter ${type}...`}
            className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            required
          />
        )}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-white">Color</label>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full h-10 rounded-lg cursor-pointer"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-white">Size</label>
            <input
              type="range"
              min="100"
              max="1000"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="w-full"
            />
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{size}px</div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 dark:text-white">
            Error Correction
          </label>
          <select
            value={errorLevel}
            onChange={(e) => setErrorLevel(e.target.value as 'L' | 'M' | 'Q' | 'H')}
            className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          >
            <option value="L">Low</option>
            <option value="M">Medium</option>
            <option value="Q">Quartile</option>
            <option value="H">High</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 dark:text-white">
            Logo (optional)
          </label>
          <div className="flex items-center gap-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="hidden"
              id="logo-upload"
            />
            <label
              htmlFor="logo-upload"
              className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg cursor-pointer hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 dark:text-white"
            >
              <Image className="w-4 h-4" />
              Upload Logo
            </label>
            {logo && (
              <img
                src={logo}
                alt="Logo preview"
                className="w-10 h-10 object-contain rounded"
              />
            )}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Recommended: small, square image (PNG or SVG)
          </p>
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-3 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Generate QR Code
      </button>
    </form>
  );
}