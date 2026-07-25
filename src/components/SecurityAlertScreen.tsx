import React from 'react';
import { ArrowLeft, ShieldAlert } from 'lucide-react';
import { ScreenId } from '../types';

interface SecurityAlertScreenProps {
  onNavigate: (screen: ScreenId) => void;
  isProtectionActive: boolean;
  setIsProtectionActive: (active: boolean) => void;
  triggerToast: (msg: string) => void;
  highRiskPushLogs: Array<{
    id: number;
    type: 'call' | 'sms';
    timestamp: string;
    callerOrSender: string;
    fraudCategory: string;
    riskScore: number;
    contentOrTopic: string;
    seniorInterventionStatus: string;
    childPushStatus: string;
  }>;
  handleSimulateLowInterferenceHighRiskCall: () => void;
  handleSimulateLowInterferenceHighRiskSms: () => void;
}

export const SecurityAlertScreen: React.FC<SecurityAlertScreenProps> = ({
  onNavigate,
  isProtectionActive,
  setIsProtectionActive,
  triggerToast,
  highRiskPushLogs,
  handleSimulateLowInterferenceHighRiskCall,
  handleSimulateLowInterferenceHighRiskSms,
}) => {
  return (
    <div className="p-5 space-y-4 pb-24 text-left">
      {/* Screen Header */}
      <div className="flex items-center justify-between border-b-2 border-[#C0C9C2] pb-3">
        <button onClick={() => onNavigate('caregiver_dashboard')} className="p-1 rounded-full text-[#326853] cursor-pointer">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-base font-bold text-[#326853] flex items-center space-x-1.5">
          <ShieldAlert className="w-5 h-5 text-emerald-600" />
          <span>防诈门神 · 安全防护</span>
        </h1>
        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-300">
          后台自动守护中
        </span>
      </div>

      {/* 1. CORE PROTECTION TOGGLE BUTTON */}
      <div className={`p-4 rounded-[24px] shadow-md border-2 transition-all space-y-3 ${
        isProtectionActive 
          ? 'bg-gradient-to-r from-[#1C4334] to-[#255441] text-white border-[#326853]' 
          : 'bg-gray-800 text-gray-300 border-gray-700'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-xl shadow-inner ${
              isProtectionActive ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40' : 'bg-gray-700 text-gray-400'
            }`}>
              🛡️
            </div>
            <div>
              <h2 className="font-black text-sm flex items-center space-x-1.5">
                <span>{isProtectionActive ? '防诈防护已全面开启' : '防诈防护已暂停'}</span>
                {isProtectionActive && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>}
              </h2>
              <p className="text-[10px] text-gray-300">
                {isProtectionActive ? 'iOS CallKit 电话拦截 & 短信静默过滤生效中' : '点击右侧按钮立即重新开启保护'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setIsProtectionActive(!isProtectionActive);
              triggerToast(
                !isProtectionActive 
                  ? '🛡️ 防诈门神系统已重启开启防护！' 
                  : '⚠️ 防诈门神已暂时关停'
              );
            }}
            className={`w-14 h-8 rounded-full p-1 transition-colors duration-300 flex items-center shrink-0 border shadow-inner cursor-pointer ${
              isProtectionActive 
                ? 'bg-emerald-500 border-emerald-300 justify-end' 
                : 'bg-gray-600 border-gray-500 justify-start'
            }`}
          >
            <div className="w-6 h-6 rounded-full bg-white shadow-md transform transition-transform font-bold text-[10px] flex items-center justify-center text-gray-800">
              {isProtectionActive ? 'ON' : 'OFF'}
            </div>
          </button>
        </div>

        <div className="bg-black/30 p-2.5 rounded-xl text-[10px] text-emerald-200/90 space-y-1 border border-white/10">
          <p className="font-bold">✨ 老人端 0 负担机制：</p>
          <p className="text-gray-200">无需老人按键或回复，发现高风险电话/短信将在后台自动阻断并实时推送给子女 LINE。</p>
        </div>
      </div>

      {/* 2. HIGH RISK CALL LOGS */}
      <div className="bg-white rounded-[22px] p-4 border-2 border-red-300 shadow-xs space-y-3">
        <div className="flex items-center justify-between border-b border-gray-100 pb-2">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-xl bg-red-100 text-red-600 flex items-center justify-center font-bold text-sm">
              📞
            </div>
            <div>
              <h2 className="font-extrabold text-xs text-red-950">
                高风险来电记录
              </h2>
              <p className="text-[9px] text-gray-500">自动拒接 & 直达子女端推送</p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSimulateLowInterferenceHighRiskCall}
            className="px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white font-bold text-[10px] rounded-lg shadow-xs active:scale-95 transition-all flex items-center space-x-1 cursor-pointer"
          >
            <span>＋ 模拟拦截测试</span>
          </button>
        </div>

        {highRiskPushLogs.filter(item => item.type === 'call').length > 0 ? (
          <div className="space-y-2">
            {highRiskPushLogs.filter(item => item.type === 'call').map((item) => (
              <div key={item.id} className="p-2.5 rounded-xl bg-red-50/80 border border-red-200 text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-red-900 text-[11px] font-mono">
                    {item.callerOrSender}
                  </span>
                  <span className="text-[9px] bg-red-600 text-white font-bold px-1.5 py-0.2 rounded-full">
                    {item.riskScore}分 极高风险
                  </span>
                </div>

                <div className="text-[10px] space-y-0.5 text-gray-700">
                  <p>▸ 诈骗类型: <strong className="text-red-800">{item.fraudCategory}</strong></p>
                  <p className="text-gray-600 bg-white/80 p-1 rounded border border-gray-200 font-mono">▸ 鉴定特征: {item.contentOrTopic}</p>
                </div>

                <div className="flex items-center justify-between text-[9px] pt-1 border-t border-red-200/60 font-mono">
                  <span className="text-emerald-800 font-bold">{item.seniorInterventionStatus}</span>
                  <span className="text-gray-400">{item.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 text-center text-xs text-gray-400 bg-gray-50 rounded-xl">
            暂无高风险来电记录
          </div>
        )}
      </div>

      {/* 3. HIGH RISK SMS LOGS */}
      <div className="bg-white rounded-[22px] p-4 border-2 border-amber-300 shadow-xs space-y-3">
        <div className="flex items-center justify-between border-b border-gray-100 pb-2">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm">
              📩
            </div>
            <div>
              <h2 className="font-extrabold text-xs text-amber-950">
                高风险短信记录
              </h2>
              <p className="text-[9px] text-gray-500">钓鱼网址隔离 & 自动推至子女端</p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSimulateLowInterferenceHighRiskSms}
            className="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white font-bold text-[10px] rounded-lg shadow-xs active:scale-95 transition-all flex items-center space-x-1 cursor-pointer"
          >
            <span>＋ 模拟隔离测试</span>
          </button>
        </div>

        {highRiskPushLogs.filter(item => item.type === 'sms').length > 0 ? (
          <div className="space-y-2">
            {highRiskPushLogs.filter(item => item.type === 'sms').map((item) => (
              <div key={item.id} className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200 text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-950 text-[11px]">
                    {item.callerOrSender}
                  </span>
                  <span className="text-[9px] bg-amber-600 text-white font-bold px-1.5 py-0.2 rounded-full">
                    {item.riskScore}分 钓鱼诱导
                  </span>
                </div>

                <div className="text-[10px] space-y-0.5 text-gray-700">
                  <p>▸ 短信类别: <strong className="text-amber-900">{item.fraudCategory}</strong></p>
                  <p className="text-gray-700 bg-white/80 p-1 rounded border border-amber-200 font-mono text-[9px] leading-relaxed">▸ 内容: {item.contentOrTopic}</p>
                </div>

                <div className="flex items-center justify-between text-[9px] pt-1 border-t border-amber-200/60 font-mono">
                  <span className="text-emerald-800 font-bold">{item.seniorInterventionStatus}</span>
                  <span className="text-gray-400">{item.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 text-center text-xs text-gray-400 bg-gray-50 rounded-xl">
            暂无高风险短信记录
          </div>
        )}
      </div>
    </div>
  );
};
