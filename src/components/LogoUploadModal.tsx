import React, { useState, useRef } from 'react';
import { Upload, X, RotateCcw, Check, Sparkles, Image as ImageIcon } from 'lucide-react';
import { TeamLogo } from './TeamLogo';

interface LogoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  customLogoUrl: string | null;
  onSaveLogo: (url: string | null, name: string) => void;
}

export const LogoUploadModal: React.FC<LogoUploadModalProps> = ({
  isOpen,
  onClose,
  customLogoUrl,
  onSaveLogo,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(customLogoUrl);
  const [fileName, setFileName] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileProcess = (file: File) => {
    setErrorMsg('');
    if (!file.type.startsWith('image/')) {
      setErrorMsg('Please upload a valid image file (PNG, SVG, JPG, WebP).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg('Image size exceeds 5MB limit. Please upload a smaller file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreviewUrl(result);
      setFileName(file.name);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleApply = () => {
    onSaveLogo(previewUrl, fileName || 'team_logo');
    onClose();
  };

  const handleResetToDefault = () => {
    setPreviewUrl(null);
    setFileName('');
    onSaveLogo(null, '');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-[#0a0e17] border border-slate-700/80 rounded-2xl shadow-2xl p-6 overflow-hidden">
        {/* Subtle accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-amber-500 to-cyan-500" />

        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-xl font-semibold text-white tracking-tight">Team Logo Stage</h2>
            <p className="text-xs text-slate-400 mt-0.5">Upload your custom emblem or inspect the default mission crest</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Preview Comparative Grid */}
        <div className="mt-5 p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-around">
          <div className="text-center">
            <span className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2">
              Header View
            </span>
            <div className="flex justify-center">
              <TeamLogo customLogoUrl={previewUrl} size="sm" />
            </div>
          </div>

          <div className="h-10 w-px bg-slate-800" />

          <div className="text-center">
            <span className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2">
              Hero Stage
            </span>
            <div className="flex justify-center">
              <TeamLogo customLogoUrl={previewUrl} size="lg" withGlow />
            </div>
          </div>
        </div>

        {/* Dropzone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`mt-4 border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
            dragActive
              ? 'border-cyan-400 bg-cyan-950/20'
              : 'border-slate-700/80 hover:border-slate-600 bg-slate-900/40 hover:bg-slate-900/70'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/svg+xml,image/webp"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFileProcess(e.target.files[0]);
              }
            }}
          />

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center text-cyan-400 mb-3">
              <Upload className="w-5 h-5" />
            </div>
            <p className="text-sm font-medium text-slate-200">
              Drag and drop your team logo here, or <span className="text-cyan-400 underline underline-offset-2">browse</span>
            </p>
            <p className="text-xs text-slate-500 mt-1">Supports PNG, SVG, JPG, WebP up to 5MB</p>
          </div>
        </div>

        {fileName && (
          <div className="mt-3 flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/30 border border-emerald-800/50 px-3 py-2 rounded-lg">
            <ImageIcon className="w-4 h-4 shrink-0" />
            <span className="truncate">Loaded: {fileName}</span>
          </div>
        )}

        {errorMsg && (
          <p className="mt-3 text-xs text-rose-400 bg-rose-950/30 border border-rose-900/50 px-3 py-2 rounded-lg">
            {errorMsg}
          </p>
        )}

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800">
          <button
            type="button"
            onClick={handleResetToDefault}
            className="flex items-center gap-1.5 px-3 py-2 text-xs text-slate-400 hover:text-slate-200 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset to Official Crest
          </button>

          <div className="flex items-center gap-2 ml-auto">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleApply}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold rounded-lg shadow-md transition-colors"
            >
              <Check className="w-3.5 h-3.5" />
              Apply Logo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
