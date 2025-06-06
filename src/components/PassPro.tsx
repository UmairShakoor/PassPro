import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import { Eye, EyeOff, Lock, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const PassPro = () => {
  const [inputText, setInputText] = useState('');
  const [encryptionKey, setEncryptionKey] = useState('');
  const [outputText, setOutputText] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');

  const encrypt = () => {
    if (!inputText.trim()) {
      toast.error('Please enter text to encrypt');
      return;
    }
    if (!encryptionKey.trim()) {
      toast.error('Please enter an encryption key');
      return;
    }

    try {
      const encrypted = CryptoJS.AES.encrypt(inputText, encryptionKey).toString();
      setOutputText(encrypted);
      setShowOutput(true);
      toast.success('Text encrypted successfully!');
    } catch (error) {
      toast.error('Encryption failed. Please try again.');
      console.error('Encryption error:', error);
    }
  };

  const decrypt = () => {
    if (!inputText.trim()) {
      toast.error('Please enter text to decrypt');
      return;
    }
    if (!encryptionKey.trim()) {
      toast.error('Please enter the decryption key');
      return;
    }

    try {
      const decrypted = CryptoJS.AES.decrypt(inputText, encryptionKey);
      const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
      
      if (!decryptedText) {
        toast.error('Decryption failed. Please check your key and encrypted text.');
        return;
      }
      
      setOutputText(decryptedText);
      setShowOutput(true);
      toast.success('Text decrypted successfully!');
    } catch (error) {
      toast.error('Decryption failed. Please check your key and encrypted text.');
      console.error('Decryption error:', error);
    }
  };

  const clearAll = () => {
    setInputText('');
    setEncryptionKey('');
    setOutputText('');
    setShowOutput(false);
    toast.info('All fields cleared');
  };

  const copyToClipboard = async () => {
    if (!outputText) {
      toast.error('No output to copy');
      return;
    }
    
    try {
      await navigator.clipboard.writeText(outputText);
      toast.success('Copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy to clipboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black font-space-mono">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4 gap-3">
            <img src="/assets/favicon-DqF7S5zm.ico" alt="Sheild" className="h-12"/>
            <h1 className="text-4xl md:text-5xl font-bold text-white">Pass Pro</h1>
          </div>
          <p className="text-xl text-blue-200">Secure Password Encrypter & Decrypter</p>
        </div>

        {/* Mode Selection */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-800/50 rounded-lg p-1 shadow-lg border border-blue-500/30 backdrop-blur-sm">
            <button
              onClick={() => setMode('encrypt')}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                mode === 'encrypt'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-blue-300 hover:text-blue-100'
              }`}
            >
              <svg viewBox="0 0 448 512" className="h-4 w-4 inline mr-2" fill="white"><path d="M144 144l0 48 160 0 0-48c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192l0-48C80 64.5 144.5 0 224 0s144 64.5 144 144l0 48 16 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 256c0-35.3 28.7-64 64-64l16 0z"/></svg>
              Encrypt
            </button>
            <button
              onClick={() => setMode('decrypt')}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                mode === 'decrypt'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-blue-300 hover:text-blue-100'
              }`}
            >
              <svg viewBox="0 0 448 512" className="h-4 w-4 inline mr-2" fill="white"><path d="M144 144c0-44.2 35.8-80 80-80c31.9 0 59.4 18.6 72.3 45.7c7.6 16 26.7 22.8 42.6 15.2s22.8-26.7 15.2-42.6C331 33.7 281.5 0 224 0C144.5 0 80 64.5 80 144l0 48-16 0c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-192c0-35.3-28.7-64-64-64l-240 0 0-48z"/></svg>
              Decrypt
            </button>
          </div>
        </div>

        {/* Main Content */}
        <Card className="shadow-xl border border-blue-500/30 bg-gray-800/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
            <CardTitle className="text-2xl font-bold text-center">
              {mode === 'encrypt' ? 'Encrypt Your Text' : 'Decrypt Your Text'}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {/* Input Text */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-blue-200">
                {mode === 'encrypt' ? 'Text to Encrypt:' : 'Encrypted Text:'}
              </label>
              <Textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={
                  mode === 'encrypt'
                    ? 'Enter your password or sensitive text here...'
                    : 'Paste your encrypted text here...'
                }
                className="min-h-[120px] font-space-mono text-sm bg-gray-900/50 border-blue-500/30 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400 resize-none"
              />
            </div>

            {/* Encryption Key */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-blue-200">
                {mode === 'encrypt' ? 'Encryption Key:' : 'Decryption Key:'}
              </label>
              <div className="relative">
                <Input
                  type={showKey ? 'text' : 'password'}
                  value={encryptionKey}
                  onChange={(e) => setEncryptionKey(e.target.value)}
                  placeholder={
                    mode === 'encrypt' 
                      ? "Enter a strong encryption key..." 
                      : "Enter your secrete key that you used at Encryption time.."
                  }
                  className="pr-10 font-space-mono bg-gray-900/50 border-blue-500/30 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400"
                />
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-400 transition-colors"
                >
                  {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {mode === 'encrypt' && (
                <p className="text-xs text-gray-400">
                  Use a strong, unique key. Remember this key - it cannot be recovered!
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={mode === 'encrypt' ? encrypt : decrypt}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                disabled={!inputText.trim() || !encryptionKey.trim()}
              >
                {mode === 'encrypt' ? (
                  <>
                    <svg viewBox="0 0 448 512" className="h-4 w-4 inline mr-2" fill="white"><path d="M144 144l0 48 160 0 0-48c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192l0-48C80 64.5 144.5 0 224 0s144 64.5 144 144l0 48 16 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 256c0-35.3 28.7-64 64-64l16 0z"/></svg>
                    Encrypt Text
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 448 512" className="h-4 w-4 inline mr-2" fill="white"><path d="M144 144c0-44.2 35.8-80 80-80c31.9 0 59.4 18.6 72.3 45.7c7.6 16 26.7 22.8 42.6 15.2s22.8-26.7 15.2-42.6C331 33.7 281.5 0 224 0C144.5 0 80 64.5 80 144l0 48-16 0c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-192c0-35.3-28.7-64-64-64l-240 0 0-48z"/></svg>
                    Decrypt Text
                  </>
                )}
              </Button>
              <Button
                onClick={clearAll}
                variant="outline"
                className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                Clear All
              </Button>
            </div>

            {/* Output */}
            {showOutput && (
              <div className="space-y-2 animate-fade-in">
                <label className="text-sm font-semibold text-blue-200">
                  {mode === 'encrypt' ? 'Encrypted Result:' : 'Decrypted Result:'}
                </label>
                <div className="relative">
                  <Textarea
                    value={outputText}
                    readOnly
                    className="min-h-[120px] font-space-mono text-sm bg-gray-900/50 border-blue-500/30 text-white resize-none"
                  />
                  <Button
                    onClick={copyToClipboard}
                    size="sm"
                    className="absolute top-2 right-2 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Copy
                  </Button>
                </div>
              </div>
            )}

            {/* Security Notice */}
            <div className="bg-blue-950/50 border border-blue-500/30 rounded-lg p-4">
              <h3 className="font-semibold text-blue-300 mb-2">🔒 Security Notice</h3>
              <ul className="text-sm text-blue-200 space-y-1">
                <li>• All encryption/decryption happens in your browser</li>
                <li>• No data is sent to any server or stored anywhere</li>
                <li>• Keep your encryption keys safe - they cannot be recovered</li>
                <li>• Use strong, unique keys for maximum security</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <footer className="mt-12 text-center space-y-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center text-blue-200 space-y-2 md:space-y-0">
            <div className="flex items-center justify-center md:justify-start">
              <span>Made with</span>
              <span className="text-red-500 mx-1 text-lg">♥</span>
              <span>by <a href="https://umairshakoor.vercel.app/" rel="noopener noreferrer" target="_blank" className="footerLink">Umair Shakoor</a></span>
            </div>
            <div className="text-gray-400">
              &copy; 2025 Pass Pro. All Rights Reserved
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default PassPro;
