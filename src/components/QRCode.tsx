import React, { useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { QROptions } from '../types';
import { Download } from 'lucide-react';

interface Props {
  options: QROptions;
}

export function QRCodeDisplay({ options }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const drawQRCode = async () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      // Always use high error correction when logo is present
      const errorLevel = options.logo ? 'H' : options.errorCorrectionLevel;

      // Generate QR code
      await QRCode.toCanvas(
        canvas,
        options.content,
        {
          width: options.size,
          color: {
            dark: options.color,
            light: '#ffffff',
          },
          errorCorrectionLevel: errorLevel,
          margin: 1, // Reduce margin to maximize QR code size
        }
      );

      // Add logo if provided
      if (options.logo) {
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const img = new Image();
        img.src = options.logo;
        
        img.onload = () => {
          // Calculate logo size (20% of QR code size)
          const logoSize = options.size * 0.2;
          const logoX = (options.size - logoSize) / 2;
          const logoY = (options.size - logoSize) / 2;

          // Create a path for the logo background
          ctx.beginPath();
          ctx.arc(logoX + logoSize / 2, logoY + logoSize / 2, logoSize / 2 + 2, 0, Math.PI * 2);
          ctx.fillStyle = '#FFFFFF';
          ctx.fill();

          // Draw logo with rounded corners
          ctx.save();
          ctx.beginPath();
          ctx.arc(logoX + logoSize / 2, logoY + logoSize / 2, logoSize / 2, 0, Math.PI * 2);
          ctx.closePath();
          ctx.clip();

          // Draw the logo
          ctx.drawImage(img, logoX, logoY, logoSize, logoSize);
          ctx.restore();
        };
      }
    };

    drawQRCode();
  }, [options]);

  const downloadQR = (format: 'png' | 'svg') => {
    if (!canvasRef.current) return;

    if (format === 'png') {
      const link = document.createElement('a');
      link.download = 'qr-code.png';
      link.href = canvasRef.current.toDataURL();
      link.click();
    } else {
      // For SVG, we need to use high error correction if logo is present
      const errorLevel = options.logo ? 'H' : options.errorCorrectionLevel;
      
      QRCode.toString(options.content, {
        type: 'svg',
        color: {
          dark: options.color,
          light: '#ffffff',
        },
        errorCorrectionLevel: errorLevel,
        margin: 1,
      }, (error, string) => {
        if (error) {
          console.error(error);
          return;
        }
        const link = document.createElement('a');
        link.download = 'qr-code.svg';
        link.href = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(string || '')}`;
        link.click();
      });
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <canvas ref={canvasRef} className="rounded-lg shadow-lg" />
      <div className="flex gap-2">
        <button
          onClick={() => downloadQR('png')}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white"
        >
          <Download className="w-4 h-4" />
          PNG
        </button>
        <button
          onClick={() => downloadQR('svg')}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white"
        >
          <Download className="w-4 h-4" />
          SVG
        </button>
      </div>
    </div>
  );
}