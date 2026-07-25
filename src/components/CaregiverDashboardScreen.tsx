import React from 'react';
import { Settings, CheckCircle, Phone, Video, ShieldAlert, Pill, Sparkles, MessageCircle, Clock, Check, Send, FileText } from 'lucide-react';
import { ScreenId } from '../types';

interface CaregiverDashboardScreenProps {
  seniorAvatarUrl: string;
  seniorName: string;
  setShowCaregiverSettingsModal: (show: boolean) => void;
  handleOpenSeniorProfileEdit: () => void;
  setShowPointsModal: (show: boolean) => void;
  medications: Array<{
    id: string;
    name: string;
    dosage: string;
    time: string;
    photoUrl?: string;
    addedBy: string;
    taken: boolean;
  }>;
  setShowBloodPressureModal: (show: boolean) => void;
  sysBloodPressure: number;
  diaBloodPressure: number;
  setShowStepsModal: (show: boolean) => void;
  dailySteps: number;
  handleStartCall: (type: 'phone' | 'video', name: string, avatar: string) => void;
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
  triggerToast: (msg: string) => void;
  onNavigate: (screen: ScreenId) => void;
  blockedCallCount: number;
  handleSendHanamaruStamp: () => void;
  STAMP_IMAGE_URL: string;
  isLinkedWithParent: boolean;
  pairingCode: string;
  activityLogs: Array<{
    id: number;
    time: string;
    title: string;
    desc: string;
    type: 'medication' | 'security';
  }>;
  lineDailyEnabled: boolean;
  setLineDailyEnabled: (enabled: boolean) => void;
  SHIBA_IMAGE_URL: string;
  setShowHospitalRecordsModal: (show: boolean) => void;
  hospitalRecords: any[];
}

export const CaregiverDashboardScreen: React.FC<CaregiverDashboardScreenProps> = ({
  seniorAvatarUrl,
  seniorName,
  setShowCaregiverSettingsModal,
  handleOpenSeniorProfileEdit,
  setShowPointsModal,
  medications,
  setShowBloodPressureModal,
  sysBloodPressure,
  diaBloodPressure,
  setShowStepsModal,
  dailySteps,
  handleStartCall,
  highRiskPushLogs,
  triggerToast,
  onNavigate,
  blockedCallCount,
  handleSendHanamaruStamp,
  STAMP_IMAGE_URL,
  isLinkedWithParent,
  pairingCode,
  activityLogs,
  lineDailyEnabled,
  setLineDailyEnabled,
  SHIBA_IMAGE_URL,
  setShowHospitalRecordsModal,
  hospitalRecords,
}) => {
  return (
    <div className="p-5 space-y-4 pb-24 text-left">
      <div className="flex items-center justify-between border-b-2 border-[#C0C9C2] pb-3">
        <div className="flex items-center space-x-2">
          <img src={seniorAvatarUrl} alt="Mother" className="w-9 h-9 rounded-full border-2 border-[#88C0A7] object-cover" />
          <h1 className="text-lg font-bold text-[#326853] font-serif">Caregiver Dashboard</h1>
        </div>
        <button 
          onClick={() => setShowCaregiverSettingsModal(true)}
          className="p-2 text-[#326853] hover:bg-[#88C0A7]/20 rounded-full transition-all active:scale-95 cursor-pointer"
          title="子女端設定"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>

      {/* Parent Real-Time Status Card */}
      <div className="bg-white rounded-[20px] p-4 border-2 border-[#C0C9C2] shadow-sm space-y-3.5 relative overflow-hidden">
        <div className="flex items-center justify-between border-b border-gray-100 pb-2.5">
          <button 
            onClick={handleOpenSeniorProfileEdit}
            className="flex items-center space-x-3 text-left group hover:bg-[#88C0A7]/10 p-1.5 -m-1.5 rounded-xl transition-all flex-1 cursor-pointer"
            title="タップして高齢者（お母さん）のアイコンとお名前を変更"
          >
            <div className="relative shrink-0">
              <img 
                src={seniorAvatarUrl} 
                alt={seniorName} 
                className="w-14 h-14 rounded-full border-3 border-[#88C0A7] object-cover shadow-xs group-hover:scale-105 transition-transform" 
              />
              <span className="absolute -bottom-1 -right-1 bg-[#326853] text-white p-1 rounded-full border border-white text-[9px] shadow-xs">✏️</span>
            </div>
            <div className="space-y-0.5 flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <h2 className="text-base font-bold text-[#1A1C1C] truncate">{seniorName}</h2>
                <span className="text-[9px] bg-[#326853] text-white font-bold px-1.5 py-0.2 rounded-md shrink-0">
                  見守り対象
                </span>
              </div>
              <p className="text-[10px] text-[#326853] font-bold flex items-center space-x-1">
                <span>タップで名前・アイコンを変更 ✏️</span>
              </p>
            </div>
          </button>
          <span className="text-[10px] bg-[#EEEEEE] text-[#326853] font-bold px-2 py-0.5 rounded-full shrink-0 ml-1">
            自宅 · オンライン
          </span>
        </div>

        <div className="grid grid-cols-3 gap-1 text-[10px] font-bold">
          <button 
            type="button"
            onClick={() => setShowPointsModal(true)}
            className="bg-[#EBF5F0] hover:bg-[#d5eadf] text-[#164F3C] p-1.5 rounded-lg flex items-center justify-center space-x-1 border border-[#88C0A7]/50 active:scale-95 transition-all text-left cursor-pointer"
          >
            <CheckCircle className="w-3 h-3 text-[#326853] shrink-0" />
            <span className="truncate">服薬: {medications.every(m => m.taken) ? '全完了' : `${medications.filter(m => m.taken).length}/${medications.length}`}</span>
          </button>

          <button 
            type="button"
            onClick={() => setShowBloodPressureModal(true)}
            className="bg-rose-50 hover:bg-rose-100 text-rose-900 p-1.5 rounded-lg flex items-center justify-center space-x-1 border border-rose-200 active:scale-95 transition-all text-left group cursor-pointer"
            title="タップして血圧を記録・編集"
          >
            <span className="truncate">🩺 {sysBloodPressure}/{diaBloodPressure}</span>
            <span className="text-[8px] bg-rose-200 text-rose-900 px-1 rounded font-bold">編集</span>
          </button>

          <button 
            type="button"
            onClick={() => setShowStepsModal(true)}
            className="bg-amber-50 hover:bg-amber-100 text-amber-900 p-1.5 rounded-lg flex items-center justify-center space-x-1 border border-amber-200 active:scale-95 transition-all text-left group cursor-pointer"
            title="タップしてiOS Apple Health同期を確認"
          >
            <span className="truncate">👟 {dailySteps.toLocaleString()}步</span>
            <span className="text-[8px] bg-amber-200 text-amber-900 px-1 rounded font-bold">iOS</span>
          </button>
        </div>

        {/* Quick Call Actions */}
        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <button onClick={() => handleStartCall('phone', seniorName, seniorAvatarUrl)} className="h-10 bg-[#F4DFCB] hover:bg-[#ebd0b7] text-[#241A0E] font-bold text-xs rounded-xl border border-[#6B5C4C]/20 flex items-center justify-center space-x-1.5 active:scale-95 transition-all shadow-xs cursor-pointer">
            <Phone className="w-3.5 h-3.5 text-[#326853]" />
            <span>電話かける</span>
          </button>
          <button onClick={() => handleStartCall('video', seniorName, seniorAvatarUrl)} className="h-10 bg-[#326853] hover:bg-[#275342] text-white font-bold text-xs rounded-xl flex items-center justify-center space-x-1.5 shadow-sm active:scale-95 transition-all cursor-pointer">
            <Video className="w-3.5 h-3.5" />
            <span>ビデオ通話</span>
          </button>
        </div>
      </div>

      {/* DAUGHTER REAL-TIME HIGH-RISK PUSH STREAM */}
      <div className="bg-white rounded-[20px] p-4 border-2 border-red-400 shadow-xs space-y-3">
        <div className="flex items-center justify-between border-b border-gray-100 pb-2">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-xs shrink-0">
              🚨
            </div>
            <div>
              <h3 className="font-extrabold text-xs text-red-900 flex items-center space-x-1.5">
                <span>高风险来电/短信 自动推送流</span>
                <span className="text-[9px] bg-[#06C755] text-white font-bold px-1.5 py-0.2 rounded-full">LINE 自动同步</span>
              </h3>
              <p className="text-[9px] text-gray-500">老人端 0 干预 · 后台自动拦截并直达子女手机</p>
            </div>
          </div>
          <span className="text-[10px] bg-red-100 text-red-800 font-bold px-2 py-0.5 rounded-full shrink-0">
            {highRiskPushLogs.length} 件已推送
          </span>
        </div>

        {/* High Risk Push Stream List */}
        <div className="space-y-2 max-h-64 overflow-y-auto pr-0.5">
          {highRiskPushLogs.map((item) => (
            <div key={item.id} className="p-3 rounded-2xl bg-gradient-to-r from-red-50 to-amber-50/50 border border-red-200 text-xs space-y-2 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="font-black text-red-900 flex items-center space-x-1">
                  <span>{item.type === 'call' ? '📞 诈骗电话拦截' : '📩 钓鱼短信隔离'}</span>
                  <span className="text-gray-400 font-normal text-[10px]">({item.timestamp})</span>
                </span>
                <span className="text-[9px] bg-red-600 text-white font-bold px-2 py-0.5 rounded-full">
                  {item.riskScore}% 极高风险
                </span>
              </div>

              <div className="space-y-1 text-[11px] text-gray-800">
                <p className="font-bold text-gray-900">▸ 号码/发件人: <span className="font-mono text-red-700">{item.callerOrSender}</span></p>
                <p className="text-gray-700">▸ 诈骗类型: <span className="font-bold text-red-800">{item.fraudCategory}</span></p>
                <p className="text-gray-600 text-[10px] bg-white/70 p-1.5 rounded-lg border border-gray-200">▸ 触发特征: {item.contentOrTopic}</p>
              </div>

              <div className="bg-emerald-50/90 p-2 rounded-xl border border-emerald-200 text-[10px] space-y-0.5 font-mono">
                <p className="text-emerald-800 font-bold">老年人端: {item.seniorInterventionStatus}</p>
                <p className="text-[#06C755] font-bold">子女端推送: 💬 {item.childPushStatus}</p>
              </div>

              <div className="grid grid-cols-2 gap-1.5 pt-0.5">
                <button
                  type="button"
                  onClick={() => {
                    handleStartCall('phone', seniorName, seniorAvatarUrl);
                  }}
                  className="py-1.5 bg-[#06C755] hover:bg-[#05b34c] text-white font-bold text-[10px] rounded-lg text-center active:scale-95 transition-all shadow-xs cursor-pointer"
                >
                  📞 1键回拨母亲确认
                </button>
                <button
                  type="button"
                  onClick={() => {
                    triggerToast(`已将 ${item.callerOrSender} 加入全局自动拉黑数据库！`);
                  }}
                  className="py-1.5 bg-gray-800 hover:bg-gray-900 text-white font-bold text-[10px] rounded-lg text-center active:scale-95 transition-all shadow-xs cursor-pointer"
                >
                  🚫 加入黑名单
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* OPTIMIZED FUNCTION SHORTCUT GRID */}
      <div className="grid grid-cols-2 gap-2.5">
        <button
          onClick={() => onNavigate('security_alert')}
          className="bg-white p-3.5 rounded-[18px] border-2 border-[#E57373] hover:bg-red-50/40 text-left space-y-1.5 shadow-xs transition-all active:scale-98 cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="p-1.5 rounded-lg bg-red-100 text-[#BA1A1A]">
              <ShieldAlert className="w-4 h-4" />
            </span>
            <span className="text-[10px] bg-red-100 text-[#BA1A1A] font-bold px-1.5 py-0.2 rounded-full">
              遮断 {blockedCallCount} 件
            </span>
          </div>
          <p className="font-bold text-xs text-[#8B0000]">🛡️ 防犯・安全看板</p>
          <p className="text-[10px] text-gray-500">警視庁情報・求証ログ &gt;</p>
        </button>

        <button
          onClick={() => onNavigate('medication')}
          className="bg-white p-3.5 rounded-[18px] border-2 border-[#88C0A7] hover:bg-emerald-50/40 text-left space-y-1.5 shadow-xs transition-all active:scale-98 cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="p-1.5 rounded-lg bg-emerald-100 text-[#164F3C]">
              <Pill className="w-4 h-4" />
            </span>
            <span className="text-[10px] bg-emerald-100 text-[#164F3C] font-bold px-1.5 py-0.2 rounded-full">
              {medications.length} 件設定
            </span>
          </div>
          <p className="font-bold text-xs text-[#164F3C]">💊 お薬・処方箋管理</p>
          <p className="text-[10px] text-gray-500">リモート追加・薬局連携 &gt;</p>
        </button>
      </div>

      {/* 1-TAP HANAMARU STAMP INTERACTION */}
      <div className="bg-[#FFF8EE] rounded-[20px] p-4 border-2 border-[#E0A96D] shadow-xs space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="font-bold text-xs text-[#241A0E] flex items-center space-x-1.5">
            <Sparkles className="w-4 h-4 text-[#E0A96D]" />
            <span>1-Tap 温かい花丸スタンプ返し</span>
          </span>
          <span className="text-[10px] bg-[#E0A96D]/20 text-[#6B5C4C] font-bold px-2 py-0.5 rounded-md">
            介護ストレス軽減
          </span>
        </div>
        <p className="text-[11px] text-[#716252] leading-relaxed">
          監視や小言ではなく、服薬完了への感謝と誉め言葉をワンタップでお母さんに届けます。
        </p>
        <button
          onClick={handleSendHanamaruStamp}
          className="w-full h-11 bg-[#E0A96D] hover:bg-[#c99257] text-white font-bold text-xs rounded-xl flex items-center justify-center space-x-2 shadow-xs active:scale-95 transition-all cursor-pointer"
        >
          <img src={STAMP_IMAGE_URL} alt="Stamp" className="w-5 h-5 object-contain" />
          <span>お母さんに「花丸スタンプ 💮」を贈る</span>
        </button>
      </div>

      {/* PAIRING / LINKING CODE & LINE PUSH CONFIG */}
      <div className="bg-white rounded-[20px] p-4 border-2 border-[#6B5C4C] shadow-xs space-y-3">
        <div className="flex items-center justify-between border-b border-gray-100 pb-2">
          <span className="font-bold text-xs text-[#241A0E] flex items-center space-x-1.5">
            <MessageCircle className="w-4 h-4 text-[#06C755]" />
            <span>家族LINE連携コード設定</span>
          </span>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
            isLinkedWithParent ? 'bg-[#88C0A7]/30 text-[#164F3C]' : 'bg-amber-100 text-amber-800'
          }`}>
            {isLinkedWithParent ? 'LINE連携済み' : '未連携'}
          </span>
        </div>

        <div className="bg-[#F3F3F3] p-2.5 rounded-xl border border-dashed border-[#6B5C4C] text-center flex items-center justify-between">
          <div>
            <p className="text-[9px] font-bold text-gray-500 uppercase text-left">Parent Pairing Code</p>
            <p className="text-lg font-mono font-bold text-[#326853] tracking-wider">{pairingCode}</p>
          </div>
          <button 
            onClick={() => triggerToast("LINE連携コードをコピーしました")}
            className="px-3 py-1.5 bg-[#326853] text-white font-bold text-[10px] rounded-lg cursor-pointer"
          >
            コードコピー
          </button>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="bg-white rounded-[20px] p-4 border-2 border-[#C0C9C2] shadow-xs space-y-3">
        <div className="flex items-center justify-between border-b border-gray-100 pb-2">
          <div className="flex items-center space-x-1.5 text-[#1A1C1C] font-bold text-xs">
            <Clock className="w-4 h-4 text-[#326853]" />
            <span>本日の活動＆安全履歴</span>
          </div>
          <span className="text-[10px] text-[#326853] font-bold">最新順</span>
        </div>

        <div className="space-y-2.5 pt-0.5">
          {activityLogs.map((log) => (
            <div key={log.id} className="flex items-start space-x-2.5 text-xs border-b border-gray-100 pb-2 last:border-0">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 font-bold ${
                log.type === 'medication' ? 'bg-[#88C0A7] text-[#164F3C]' : 'bg-[#E57373] text-white'
              }`}>
                {log.type === 'medication' ? <Check className="w-3.5 h-3.5" /> : <ShieldAlert className="w-3.5 h-3.5" />}
              </div>
              <div className="flex-1">
                <span className="text-gray-400 font-bold text-[10px]">{log.time}</span>
                <p className="font-bold text-xs text-[#1A1C1C]">{log.title}</p>
                <p className="text-gray-500 text-[10px] mt-0.5">{log.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* LINE Push Config Card */}
      <div className="bg-white rounded-[20px] border-2 border-[#C0C9C2] overflow-hidden shadow-xs">
        <div className="bg-[#06C755] text-white px-4 py-2.5 flex items-center space-x-2 font-bold text-sm">
          <MessageCircle className="w-5 h-5 fill-white text-[#06C755]" />
          <span>LINE通知連携</span>
        </div>
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-sm text-[#1A1C1C]">毎日19:00に日報を受信</p>
              <p className="text-xs text-gray-500">お母さんの1日の様子をまとめます。</p>
            </div>
            <input 
              type="checkbox" 
              checked={lineDailyEnabled} 
              onChange={(e) => setLineDailyEnabled(e.target.checked)}
              className="w-6 h-6 accent-[#06C755] rounded"
            />
          </div>
          
          <div className="bg-[#F3F3F3] p-3 rounded-xl border border-gray-200 text-xs flex items-center space-x-2.5">
            <img src={SHIBA_IMAGE_URL} alt="Shiba" className="w-10 h-10 object-contain" />
            <div>
              <p className="font-bold text-[#326853]">通知プレビュー</p>
              <p className="text-gray-700 italic">「お母さんは今日も元気に過ごされました！服薬もバッチリです。」</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access Shortcuts */}
      <div className="grid grid-cols-2 gap-2.5 text-xs font-bold text-[#1A1C1C]">
        <button
          onClick={() => setShowHospitalRecordsModal(true)}
          className="bg-white hover:bg-[#88C0A7]/10 p-3 rounded-2xl border-2 border-[#C0C9C2] hover:border-[#326853] flex items-center justify-between transition-all active:scale-95 text-left shadow-2xs group cursor-pointer"
        >
          <div className="flex items-center space-x-2">
            <div className="p-1.5 bg-[#88C0A7]/20 text-[#164F3C] rounded-lg group-hover:bg-[#326853] group-hover:text-white transition-colors">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <span className="block font-bold text-xs text-[#164F3C]">通院記録</span>
              <span className="text-[10px] text-gray-500 font-normal">{hospitalRecords.length} 件記録 &gt;</span>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};
