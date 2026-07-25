import React from 'react';
import { PhoneOff } from 'lucide-react';

interface HangupEmergencyOverlayProps {
  show: boolean;
  onClose: () => void;
  setIsSpeechListening: (listening: boolean) => void;
  recognitionRef: React.MutableRefObject<any>;
  triggerToast: (msg: string) => void;
  handleBroadcastCommunityEmergency: () => void;
  togglePoliceSiren: () => void;
  isSirenActive: boolean;
}

export const HangupEmergencyOverlay: React.FC<HangupEmergencyOverlayProps> = ({
  show,
  onClose,
  setIsSpeechListening,
  recognitionRef,
  triggerToast,
  handleBroadcastCommunityEmergency,
  togglePoliceSiren,
  isSirenActive,
}) => {
  if (!show) return null;

  return (
    <div className="absolute inset-0 bg-red-600/95 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in text-center">
      <div className="bg-white w-full rounded-[28px] p-5 border-4 border-yellow-400 shadow-2xl space-y-4 text-gray-900">
        <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto border-4 border-red-500 shadow-lg">
          <PhoneOff className="w-8 h-8 text-red-600 animate-bounce" />
        </div>

        <div className="space-y-1">
          <span className="bg-red-600 text-white font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
            🚨 危険！特殊詐欺・犯罪電話を検知！
          </span>
          <h2 className="text-xl font-black text-red-700 pt-2">
            今すぐ電話を切ってください！
          </h2>
          <p className="text-xs font-bold text-gray-600">
            （请立即挂断电话！切勿转账或透露个人账号密码）
          </p>
        </div>

        <div className="space-y-2 pt-1">
          <button
            type="button"
            onClick={() => {
              onClose();
              setIsSpeechListening(false);
              if (recognitionRef.current) {
                try { recognitionRef.current.stop(); } catch(e) {}
              }
              triggerToast('📵 電話を切りました！詐欺未遂としてLINEご家族と警察(#9110)に報告しました');
              handleBroadcastCommunityEmergency();
            }}
            className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-black text-base rounded-2xl shadow-xl transition-all active:scale-95 flex items-center justify-center space-x-2 border-2 border-red-300 cursor-pointer"
          >
            <PhoneOff className="w-6 h-6" />
            <span>今すぐ電話を切る (立即挂断)</span>
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={togglePoliceSiren}
              className={`py-2.5 font-extrabold text-xs rounded-xl transition-all active:scale-95 cursor-pointer ${
                isSirenActive ? 'bg-amber-400 text-black border-2 border-black' : 'bg-gray-900 text-white'
              }`}
            >
              {isSirenActive ? '🔊 110警報音停止' : '🚨 110警報音発動'}
            </button>
            <button
              type="button"
              onClick={handleBroadcastCommunityEmergency}
              className="py-2.5 bg-amber-500 hover:bg-amber-600 text-black font-extrabold text-xs rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer"
            >
              📢 民生委員SOS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
