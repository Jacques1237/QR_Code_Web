export type QRType = 'url' | 'text' | 'phone' | 'wifi' | 'email' | 'social';

export interface WifiConfig {
  ssid: string;
  password: string;
  encryption: 'WPA' | 'WEP' | 'nopass';
  hidden?: boolean;
}

export interface QROptions {
  type: QRType;
  content: string;
  color: string;
  size: number;
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
  logo?: string;
  wifiConfig?: WifiConfig;
}