import React, { useState } from 'react';
import { QRForm } from './components/QRForm';
import { QRCodeDisplay } from './components/QRCode';
import { QROptions } from './types';
import { Github, Moon, Sun } from 'lucide-react';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentQR, setCurrentQR] = useState<QROptions | null>(null);

  const handleGenerate = (options: QROptions) => {
    setCurrentQR(options);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
          <h1 className="text-4xl font-bold mb-4 dark:text-white">
            QR Code Generator
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Generate QR codes instantly for URLs, text, phone numbers, Wi-Fi credentials,
            and more. No tracking, completely free and privacy-focused. 
          </p>
        </header>

        <main className="flex flex-col items-center gap-8">
          <QRForm onGenerate={handleGenerate} />
          {currentQR && <QRCodeDisplay options={currentQR} />}

          <section className="w-full max-w-2xl mt-12">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">FAQ</h2>
            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 dark:text-white">
                  What is a QR code?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  A QR code is a two-dimensional barcode that can store data and be
                  quickly read by digital devices like smartphones.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 dark:text-white">
                  Is this service free?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Yes, this QR code generator is completely free to use with no
                  limitations. We don't show ads or track your data.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 dark:text-white">
                  What's error correction?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Error correction allows a QR code to be readable even if it's
                  partially damaged or obscured. Higher levels make the code more
                  resistant to damage but also larger.
                </p>
              </div>
            </div>
          </section>
        </main>

        <footer className="mt-12 text-center text-gray-600 dark:text-gray-300">
          <div className="flex justify-center gap-4 mb-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <Github className="w-6 h-6" />
            </a>
          </div>
          <p>
            Made with ❤️ for the open-source community. No tracking, just QR
            codes.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;