import React from 'react';
import { Pill, Clock, Sun, CheckCircle, Heart, Navigation, Send } from 'lucide-react';
import { ScreenId } from '../types';

interface SeniorHomeScreenProps {
  accessibilityLargeText: boolean;
  SHIBA_IMAGE_URL: string;
  STAMP_IMAGE_URL: string;
  isProtectionActive: boolean;
  setIsProtectionActive: (active: boolean) => void;
  triggerToast: (msg: string) => void;
  blockedCallCount: number;
  handleSimulateLowInterferenceHighRiskCall: () => void;
  handleSimulateLowInterferenceHighRiskSms: () => void;
  receivedHanamaru: boolean;
  setShowPointsModal: (show: boolean) => void;
  medications: Array<{
    id: string;
    name: string;
    dosage: string;
    time: string;
    photoUrl?: string;
    addedBy: string;
    taken: boolean;
    dietaryWarnings?: string[];
    drugInteractions?: string[];
  }>;
  onNavigate: (screen: ScreenId) => void;
  handleSpeakMedication: (name: string, dosage: string) => void;
  isSpeakingMed: string | null;
  handleStartEditMedication: (med: any) => void;
  handleDeleteMedication: (id: string) => void;
  handleToggleMedicationItem: (id: string) => void;
  handleTakeAllMedications: () => void;
  handleResetMedication: () => void;
  lineNotificationSent: boolean;
  setShowBloodPressureModal: (show: boolean) => void;
  sysBloodPressure: number;
  diaBloodPressure: number;
  setShowStepsModal: (show: boolean) => void;
  stepGoal: string;
  dailySteps: number;
}

export const SeniorHomeScreen: React.FC<SeniorHomeScreenProps> = ({
  accessibilityLargeText,
  SHIBA_IMAGE_URL,
  STAMP_IMAGE_URL,
  isProtectionActive,
  setIsProtectionActive,
  triggerToast,
  blockedCallCount,
  handleSimulateLowInterferenceHighRiskCall,
  handleSimulateLowInterferenceHighRiskSms,
  receivedHanamaru,
  setShowPointsModal,
  medications,
  onNavigate,
  handleSpeakMedication,
  isSpeakingMed,
  handleStartEditMedication,
  handleDeleteMedication,
  handleToggleMedicationItem,
  handleTakeAllMedications,
  handleResetMedication,
  lineNotificationSent,
  setShowBloodPressureModal,
  sysBloodPressure,
  diaBloodPressure,
  setShowStepsModal,
  stepGoal,
  dailySteps,
}) => {
  return (
    <div className="p-5 space-y-4 pb-24 text-left">
      {/* Greeting & Shiba Mascot */}
      <div className="flex items-end justify-between pt-1">
        <div>
          <h2 className={`${accessibilityLargeText ? 'text-3xl' : 'text-2xl'} font-bold text-[#1A1C1C]`}>
            お元気ですか？
          </h2>
          <div className="flex items-center space-x-1.5 text-[#404944] font-medium mt-1">
            <Sun className="w-5 h-5 text-[#88C0A7]" />
            <span>今日は晴れですね</span>
          </div>
        </div>
        <img src={SHIBA_IMAGE_URL} alt="Shiba" className="w-20 h-20 object-contain drop-shadow-sm" />
      </div>

      {/* ANTI-FRAUD GUARDIAN PROTECTION TOGGLE & STATUS CARD */}
      <div className={`rounded-[22px] p-4 border-2 shadow-lg transition-all space-y-3.5 ${
        isProtectionActive 
          ? 'bg-[#102B21] text-white border-[#326853]' 
          : 'bg-gray-800 text-gray-200 border-gray-700'
      }`}>
        <div className="flex items-center justify-between pb-1 border-b border-white/10">
          <div className="flex items-center space-x-2.5">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg shadow-inner ${
              isProtectionActive ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40' : 'bg-gray-700 text-gray-400'
            }`}>
              🛡️
            </div>
            <div>
              <h3 className="font-black text-sm flex items-center space-x-1.5">
                <span>{isProtectionActive ? '防诈门神守护已开启' : '防诈防护已暂停'}</span>
                {isProtectionActive && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>}
              </h3>
              <p className="text-[10px] text-gray-300">
                {isProtectionActive ? 'iOS CallKit 电话拦截 & 短信静默过滤生效中' : '点击右侧开关重新开启保护'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setIsProtectionActive(!isProtectionActive);
              triggerToast(
                !isProtectionActive 
                  ? '🛡️ 防诈门神系统已开启防护！' 
                  : '⚠️ 防诈门神已暂时关停'
              );
            }}
            className={`w-14 h-8 rounded-full p-1 transition-colors duration-300 flex items-center shrink-0 border shadow-inner ${
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

        <div className="bg-black/30 p-2.5 rounded-xl text-[10px] text-emerald-200/90 space-y-1 border border-white/10 text-left">
          <div className="flex items-center justify-between font-bold text-[#88C0A7]">
            <span>✨ 零操作·自动拦截守护</span>
            <span className="text-[9px] bg-[#1C4334] px-2 py-0.5 rounded text-white font-mono">
              已拦截 {blockedCallCount} 次骗局
            </span>
          </div>
          <p className="text-gray-200 leading-snug">
            高风险电话与短信在后台全自动拦截隔离，免去老人打字回复，秒级同步推送给子女 LINE。
          </p>
        </div>

        <div className="space-y-1.5 pt-0.5">
          <div className="grid grid-cols-2 gap-1.5">
            <button
              type="button"
              onClick={handleSimulateLowInterferenceHighRiskCall}
              className="py-2 px-1.5 bg-red-900/80 hover:bg-red-800 text-white font-bold text-[10px] rounded-lg border border-red-500/80 flex items-center justify-center space-x-1 active:scale-95 transition-all shadow-xs cursor-pointer"
            >
              <span>📞 模拟高风险来电</span>
              <span className="text-[8px] bg-red-950 px-1 rounded text-red-200">静默推子女</span>
            </button>

            <button
              type="button"
              onClick={handleSimulateLowInterferenceHighRiskSms}
              className="py-2 px-1.5 bg-amber-900/80 hover:bg-amber-800 text-white font-bold text-[10px] rounded-lg border border-amber-500/80 flex items-center justify-center space-x-1 active:scale-95 transition-all shadow-xs cursor-pointer"
            >
              <span>📩 模拟高风险短信</span>
              <span className="text-[8px] bg-amber-950 px-1 rounded text-amber-200">静默推子女</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hanamaru Stamp Received Notification */}
      {receivedHanamaru && (
        <div className="bg-[#FFF4E5] rounded-[22px] p-4 border-2 border-[#E0A96D] shadow-md flex items-center space-x-3.5 animate-bounce">
          <img src={STAMP_IMAGE_URL} alt="Hanamaru Stamp" className="w-12 h-12 object-contain shrink-0" />
          <div className="flex-1">
            <p className="font-bold text-sm text-[#241A0E] flex items-center space-x-1">
              <span>太郎さんから花丸スタンプ 💮</span>
            </p>
            <p className="text-xs text-[#6B5C4C] font-medium mt-0.5">
              「いつもお薬をしっかり飲んでえらいね！元気でいてね」
            </p>
          </div>
        </div>
      )}

      {/* Senior Health Routine Tool Banner */}
      <button
        type="button"
        onClick={() => setShowPointsModal(true)}
        className="w-full bg-[#EBF5F0] hover:bg-[#d5eadf] rounded-[20px] p-3.5 border-2 border-[#88C0A7] flex items-center justify-between text-xs shadow-xs text-left transition-all active:scale-98 group cursor-pointer"
      >
        <div className="flex items-center space-x-2.5">
          <span className="text-2xl group-hover:scale-110 transition-transform">🏆</span>
          <div>
            <p className="text-[10px] font-bold text-[#326853] uppercase flex items-center space-x-1">
              <span>毎日の服薬・健康日課ツール</span>
              <span className="text-[9px] bg-[#326853]/15 text-[#164F3C] px-1.5 py-0.2 rounded-md font-bold">タップで達成記録を開く</span>
            </p>
            <p className="font-bold text-sm text-[#164F3C]">継続記録: <span className="text-base text-[#326853] font-bold">7日連続 服薬達成中</span></p>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <span className="text-[10px] bg-[#326853] group-hover:bg-[#255040] text-white font-bold px-2.5 py-1 rounded-full shadow-xs flex items-center space-x-1">
            <span>カレンダー・記録</span>
            <span>&gt;</span>
          </span>
        </div>
      </button>

      {/* Senior Active Medications Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-[#326853] flex items-center space-x-1.5">
            <Pill className="w-5 h-5 text-[#88C0A7]" />
            <span>本日服用するお薬 ({medications.filter(m => !m.taken).length}件未完了)</span>
          </h3>
          <button 
            onClick={() => onNavigate('scanner')}
            className="text-xs bg-[#88C0A7]/20 text-[#164F3C] font-bold px-2.5 py-1 rounded-lg border border-[#88C0A7] hover:bg-[#88C0A7]/40 cursor-pointer"
          >
            ＋ 手動でお薬追加
          </button>
        </div>

        {medications.map((med) => (
          <div key={med.id} className={`bg-white rounded-[20px] p-5 border-2 ${med.taken ? 'border-[#88C0A7] bg-emerald-50/20' : 'border-[#C0C9C2]'} shadow-sm space-y-3.5 transition-all`}>
            <div className="flex items-start justify-between">
              <div className="space-y-1 flex-1">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold text-[#404944] bg-[#F3F3F3] px-2 py-0.5 rounded-md flex items-center space-x-1">
                    <Clock className="w-3 h-3 text-[#326853]" />
                    <span>{med.time}</span>
                  </span>
                  <span className="text-xs text-[#164F3C] font-bold bg-[#88C0A7]/30 px-2 py-0.5 rounded-md">
                    {med.addedBy}
                  </span>
                </div>

                <h4 className={`${accessibilityLargeText ? 'text-2xl' : 'text-xl'} font-bold text-[#1A1C1C]`}>
                  {med.name}
                </h4>
                <p className="text-xs font-bold text-[#404944]">{med.dosage}</p>

                <div className="flex items-center space-x-3 pt-1 text-xs">
                  <button
                    onClick={() => handleSpeakMedication(med.name, med.dosage)}
                    className={`font-bold flex items-center space-x-1 px-2 py-0.5 rounded-md transition-all cursor-pointer ${
                      isSpeakingMed === med.name ? 'bg-amber-100 text-amber-800 animate-pulse' : 'bg-[#EBF5F0] text-[#326853] hover:bg-[#88C0A7]/30'
                    }`}
                  >
                    <span>🔊 音声で聞き直す</span>
                  </button>
                  <span className="text-gray-300">|</span>
                  <button
                    onClick={() => handleStartEditMedication(med)}
                    className="text-[#326853] font-bold hover:underline cursor-pointer"
                  >
                    ✏️ 編集
                  </button>
                  <span className="text-gray-300">|</span>
                  <button
                    onClick={() => handleDeleteMedication(med.id)}
                    className="text-red-500 font-bold hover:underline cursor-pointer"
                  >
                    🗑 削除
                  </button>
                </div>

                {med.dietaryWarnings && med.dietaryWarnings.length > 0 && (
                  <div className="mt-2 bg-amber-50/90 border-l-4 border-amber-500 p-2.5 rounded-r-xl space-y-1">
                    <p className="text-[10px] font-bold text-amber-900 flex items-center space-x-1">
                      <span>⚠️ 饮食与服药禁忌 (Dietary Precautions)</span>
                    </p>
                    {med.dietaryWarnings.map((warn, i) => (
                      <p key={i} className="text-[10px] text-amber-800 font-medium leading-snug">
                        {warn}
                      </p>
                    ))}
                  </div>
                )}

                {med.drugInteractions && med.drugInteractions.length > 0 && (
                  <div className="mt-1.5 bg-blue-50/90 border-l-4 border-blue-500 p-2.5 rounded-r-xl space-y-1">
                    <p className="text-[10px] font-bold text-blue-900 flex items-center space-x-1">
                      <span>💊 药品相互作用与服药须知 (Drug Interaction)</span>
                    </p>
                    {med.drugInteractions.map((inter, i) => (
                      <p key={i} className="text-[10px] text-blue-800 font-medium leading-snug">
                        {inter}
                      </p>
                    ))}
                  </div>
                )}
              </div>

              {med.photoUrl ? (
                <div className="relative group shrink-0">
                  <img src={med.photoUrl} alt="Medication Box" className="w-16 h-16 rounded-xl object-cover border-2 border-[#88C0A7] shadow-sm" />
                  <span className="absolute -bottom-1 -right-1 bg-[#326853] text-white text-[9px] font-bold px-1 rounded-md">
                    目印写真
                  </span>
                </div>
              ) : (
                <div className="w-16 h-16 rounded-xl bg-[#F3F3F3] border-2 border-dashed border-[#C0C9C2] flex flex-col items-center justify-center text-[10px] text-[#404944] font-bold text-center shrink-0">
                  <Pill className="w-5 h-5 text-[#88C0A7] mb-0.5" />
                  <span>目印写真なし</span>
                </div>
              )}
            </div>

            <button
              onClick={() => handleToggleMedicationItem(med.id)}
              className={`w-full h-14 rounded-[18px] font-bold text-white flex items-center justify-center space-x-2 transition-all shadow-[0_3px_0_0_#17503C] active:translate-y-0.5 active:shadow-none cursor-pointer ${
                med.taken ? 'bg-[#88C0A7] text-[#164F3C] shadow-none' : 'bg-[#326853] hover:bg-[#275342]'
              }`}
            >
              <CheckCircle className="w-6 h-6" />
              <span className={accessibilityLargeText ? 'text-xl' : 'text-base'}>
                {med.taken ? '服薬完了 (タップで戻す)' : '服薬した'}
              </span>
            </button>
          </div>
        ))}

        {medications.some(m => !m.taken) && (
          <button
            onClick={handleTakeAllMedications}
            className="w-full h-12 bg-[#F4DFCB] text-[#241A0E] font-bold text-xs rounded-[18px] border-2 border-[#6B5C4C]/30 flex items-center justify-center space-x-2 shadow-sm active:scale-95 cursor-pointer"
          >
            <CheckCircle className="w-4 h-4 text-[#326853]" />
            <span>今日のお薬をまとめて服薬完了にする</span>
          </button>
        )}

        {medications.every(m => m.taken) && (
          <button
            onClick={handleResetMedication}
            className="w-full text-center text-xs text-[#326853] font-bold underline hover:text-[#164F3C] pt-1 cursor-pointer"
          >
            テスト用：服薬ステータスをリセット
          </button>
        )}
      </div>

      {lineNotificationSent && (
        <div className="bg-[#F4DFCB] rounded-[20px] p-4 border-2 border-[#C0C9C2] flex items-center space-x-3 animate-fade-in">
          <div className="w-12 h-12 rounded-full bg-[#716252] text-[#F4DFCB] flex items-center justify-center shrink-0">
            <Send className="w-6 h-6" />
          </div>
          <div>
            <p className="font-bold text-[#241A0E]">LINEでご家族に通知完了</p>
            <p className="text-xs text-[#716252]">服薬完了がリアルタイムで共有されました</p>
          </div>
        </div>
      )}

      {/* Health Metrics Bento */}
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3.5">
          <button
            type="button"
            onClick={() => setShowBloodPressureModal(true)}
            className="bg-white hover:bg-emerald-50/50 rounded-[20px] p-4 border-2 border-[#88C0A7] flex flex-col justify-between h-28 text-left transition-all active:scale-98 shadow-xs cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <Heart className="w-7 h-7 text-red-500 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] bg-red-100 text-red-800 font-bold px-1.5 py-0.5 rounded-md">
                {sysBloodPressure >= 140 ? '高血圧警告 🚨' : '記録'}
              </span>
            </div>
            <div>
              <p className="text-xs font-bold text-[#404944]">血圧 (測定値)</p>
              <p className="text-xl font-extrabold text-[#326853]">
                {sysBloodPressure} / {diaBloodPressure} <span className="text-xs font-normal text-gray-500">mmHg</span>
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setShowStepsModal(true)}
            className="bg-white hover:bg-emerald-50/50 rounded-[20px] p-4 border-2 border-[#C0C9C2] flex flex-col justify-between h-28 text-left transition-all active:scale-98 shadow-xs cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <Navigation className="w-7 h-7 text-[#88C0A7] group-hover:scale-110 transition-transform" />
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded-md">
                目標 {stepGoal}
              </span>
            </div>
            <div>
              <p className="text-xs font-bold text-[#404944]">本日歩数</p>
              <p className="text-xl font-extrabold text-[#326853]">{dailySteps.toLocaleString()} <span className="text-xs font-normal text-gray-500">歩</span></p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
