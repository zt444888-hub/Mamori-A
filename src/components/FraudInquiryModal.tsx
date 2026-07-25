import React from 'react';
import { Phone, PhoneOff } from 'lucide-react';

interface FraudInquiryModalProps {
  show: boolean;
  onClose: () => void;
  fraudModalTab: 'quick' | 'photo' | 'voice' | 'history';
  setFraudModalTab: (tab: 'quick' | 'photo' | 'voice' | 'history') => void;
  handlePerformFraudInquiry: (text: string, photoUrl?: string) => void;
  setDetectedScamKeyword: (kw: string) => void;
  setShowHangupEmergencyOverlay: (show: boolean) => void;
  togglePoliceSiren: () => void;
  setActivityLogs: React.Dispatch<React.SetStateAction<any[]>>;
  setLineNotificationSent: (sent: boolean) => void;
  triggerToast: (msg: string) => void;
  isSpeechListening: boolean;
  toggleRealtimeSpeechListening: () => void;
  liveSpeechTranscript: string;
  setLiveSpeechTranscript: (t: string) => void;
  inquiryHistory: any[];
  inquiryResult: any;
  setInquiryResult: (res: any) => void;
  handleStartCall: (type: 'phone' | 'video', name: string, avatar: string) => void;
  caregiverName: string;
  caregiverAvatarUrl: string;
  isSirenActive: boolean;
  handleBroadcastCommunityEmergency: () => void;
}

export const FraudInquiryModal: React.FC<FraudInquiryModalProps> = ({
  show,
  onClose,
  fraudModalTab,
  setFraudModalTab,
  handlePerformFraudInquiry,
  setDetectedScamKeyword,
  setShowHangupEmergencyOverlay,
  togglePoliceSiren,
  setActivityLogs,
  setLineNotificationSent,
  triggerToast,
  isSpeechListening,
  toggleRealtimeSpeechListening,
  liveSpeechTranscript,
  setLiveSpeechTranscript,
  inquiryHistory,
  inquiryResult,
  setInquiryResult,
  handleStartCall,
  caregiverName,
  caregiverAvatarUrl,
  isSirenActive,
  handleBroadcastCommunityEmergency,
}) => {
  if (!show) return null;

  return (
    <div className="absolute inset-0 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3.5 z-50 animate-fade-in">
      <div className="bg-white w-full rounded-[24px] p-4 border-2 border-amber-500 shadow-2xl space-y-3.5 max-h-[92%] overflow-y-auto text-left">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b pb-2">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-amber-100 text-amber-900 rounded-xl">
              <span className="text-xl">🛡️</span>
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-gray-900 flex items-center space-x-1.5">
                <span>AI 防诈求证与警报门神</span>
              </h3>
              <p className="text-[10px] text-gray-500">不用手动打字！不审电话/SMS/信件一键自动识别</p>
            </div>
          </div>
          <button 
            type="button" 
            onClick={onClose} 
            className="text-gray-400 font-bold text-lg hover:text-gray-600 p-1"
          >
            ✕
          </button>
        </div>

        {/* Modal Tabs */}
        <div className="grid grid-cols-4 gap-1 p-1 bg-gray-100 rounded-xl text-[11px] font-bold text-center">
          <button
            type="button"
            onClick={() => setFraudModalTab('quick')}
            className={`py-1.5 rounded-lg transition-all ${
              fraudModalTab === 'quick' ? 'bg-amber-600 text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            🤖 代接门神
          </button>
          <button
            type="button"
            onClick={() => setFraudModalTab('photo')}
            className={`py-1.5 rounded-lg transition-all ${
              fraudModalTab === 'photo' ? 'bg-amber-600 text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            📷 拍照识别
          </button>
          <button
            type="button"
            onClick={() => setFraudModalTab('voice')}
            className={`py-1.5 rounded-lg transition-all ${
              fraudModalTab === 'voice' ? 'bg-amber-600 text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            🎙️ 通话听取
          </button>
          <button
            type="button"
            onClick={() => setFraudModalTab('history')}
            className={`py-1.5 rounded-lg transition-all ${
              fraudModalTab === 'history' ? 'bg-amber-600 text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            📋 拦截日志
          </button>
        </div>

        {/* TAB 1: Zero-Touch AI Gatekeeper */}
        {fraudModalTab === 'quick' && (
          <div className="space-y-3 text-xs animate-fade-in">
            <div className="bg-amber-50 border-2 border-amber-300 p-3 rounded-2xl space-y-1.5 text-amber-950">
              <div className="flex items-center space-x-2">
                <span className="text-xl">🤖</span>
                <div>
                  <h4 className="font-extrabold text-xs">老年人零负担：AI 门神全自动代接</h4>
                  <p className="text-[10px] text-amber-800">无需手动搜索打字！陌生电话打入时，AI 门神自动回答并过滤坏人。</p>
                </div>
              </div>
            </div>

            {/* AI Gatekeeper Status Showcase */}
            <div className="bg-gray-900 text-white p-3.5 rounded-2xl space-y-3 border border-gray-700 shadow-md">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-emerald-400 flex items-center space-x-1">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-ping"></span>
                  <span>AI 防诈门神 24h 护航中</span>
                </span>
                <span className="text-[10px] bg-gray-800 text-gray-300 px-2 py-0.5 rounded-full font-mono">
                  免打字免操作
                </span>
              </div>

              <div className="bg-black/80 p-2.5 rounded-xl border border-gray-800 text-[11px] font-mono space-y-1.5">
                <p className="text-[10px] text-gray-400 font-sans font-bold">🎙️ AI 代接开场语音提示:</p>
                <p className="text-emerald-300 leading-snug">
                  「您好，我是AI门神护卫。张阿姨手机开启了防诈看护。请说明身份与事由，涉及转账、卡号、公安或大使馆将自动录音并通知家属...」
                </p>
              </div>

              <div className="space-y-1.5">
                <p className="text-[10px] font-bold text-gray-300">⚡️ 一键模拟体验（零操作防诈演示）:</p>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      handlePerformFraudInquiry('你好，我是中国驻日本大使馆/顺丰快递。通知您的护照及扣押包裹涉嫌洗钱，请配合资金核查转账。');
                    }}
                    className="p-2 bg-red-900/60 hover:bg-red-800 text-white rounded-xl text-left border border-red-500 transition-all active:scale-95"
                  >
                    <span className="block text-[11px] font-extrabold">🇨🇳 假冒大使馆来电</span>
                    <span className="text-[9px] text-red-300">自动触发报警挂断</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      handlePerformFraudInquiry('警視庁捜査一課のタナカです。あなた名義のキャッシュカードが犯罪に使われました。暗証番号を教えてください。');
                    }}
                    className="p-2 bg-amber-900/60 hover:bg-amber-800 text-white rounded-xl text-left border border-amber-500 transition-all active:scale-95"
                  >
                    <span className="block text-[11px] font-extrabold">🚨 假冒警察索密码</span>
                    <span className="text-[9px] text-amber-300">自动拦截并通报女儿</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 1-Tap Emergency Senior Buttons */}
            <div className="space-y-1 pt-1">
              <label className="block text-[10px] font-bold text-gray-700">老年人常用防范急救大按钮:</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setDetectedScamKeyword('陌生来电索要卡号密码');
                    setShowHangupEmergencyOverlay(true);
                    togglePoliceSiren();
                  }}
                  className="py-3 bg-red-600 hover:bg-red-700 text-white font-black text-xs rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center space-x-1"
                >
                  <PhoneOff className="w-4 h-4" />
                  <span>一键挂断 + 警报音</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const newLog = {
                      id: Date.now(),
                      time: 'たった今',
                      title: '📞 老人一键呼叫家属(美咲)',
                      desc: 'お母さんがホーム画面からワンタップで家属(美咲)へ緊急電話発信を行いました。',
                      type: 'security' as const
                    };
                    setActivityLogs(prev => [newLog, ...prev]);
                    setLineNotificationSent(true);
                    triggerToast('📞 一键呼叫家属(佐藤美咲)中... 已同步推送 LINE 紧急提醒！');
                  }}
                  className="py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center space-x-1"
                >
                  <Phone className="w-4 h-4" />
                  <span>一键呼叫女儿 (美咲)</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Photo / OCR Document Scan */}
        {fraudModalTab === 'photo' && (
          <div className="space-y-3 text-xs animate-fade-in">
            <p className="text-[11px] text-gray-600 leading-snug">
              届いた不審なSMS画面、督促ハガキ、契約書、封筒の写真をアップロードすると、Gemini Vision AIが文面や差出人を即座解析します。
            </p>

            <div className="border-2 border-dashed border-red-300 bg-red-50/40 p-4 rounded-2xl text-center space-y-2">
              <div className="text-3xl">📷</div>
              <p className="font-bold text-red-950 text-xs">疑わしいハガキやSMS画面を撮影</p>
              <p className="text-[10px] text-gray-500">文字・印鑑・URL・電話番号をAIが解析します</p>

              <label className="inline-block px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl cursor-pointer text-xs shadow-sm transition-all">
                <span>カメラ起動 / 画像選択</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = () => {
                        handlePerformFraudInquiry('画像スキャン解析', reader.result as string);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="hidden"
                />
              </label>
            </div>

            <div className="space-y-1.5 pt-1">
              <label className="block text-[10px] font-bold text-gray-500">サンプル画像で試す (1-Tap):</label>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={() => handlePerformFraudInquiry('【サンプル解析】電力料金未払い警告SMSの画面。記載URL: http://fake-power.xyz')}
                  className="p-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl text-left font-bold text-[10px] text-gray-800"
                >
                  📲 不審SMS画面サンプル
                </button>
                <button
                  type="button"
                  onClick={() => handlePerformFraudInquiry('【サンプル解析】「重要・医療費還付金のお知らせ」ハガキの画像')}
                  className="p-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl text-left font-bold text-[10px] text-gray-800"
                >
                  📮 還付金ハガキサンプル
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Voice & Call Analysis */}
        {fraudModalTab === 'voice' && (
          <div className="space-y-3 text-xs animate-fade-in">
            <p className="text-[11px] text-gray-600 leading-snug">
              スピーカー通話の音声をリアルタイムでAIが抄録。高リスクキーワード（振込・口座・警察・大使館・保密・扣押・安全账户）を検知すると巨型「切断警告」を自動表示します。
            </p>

            <div className="p-4 bg-gray-900 text-white rounded-2xl text-center space-y-3 border-2 border-red-500 shadow-md">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-1.5">
                  <span className={`w-2.5 h-2.5 rounded-full ${isSpeechListening ? 'bg-red-500 animate-ping' : 'bg-gray-500'}`}></span>
                  <span className="text-xs font-bold text-red-400 font-mono">
                    {isSpeechListening ? '🎙️ 通話AIリアルタイムリスニング中' : '通話AIリスニング (Standby)'}
                  </span>
                </div>
                {isSpeechListening && (
                  <span className="text-[9px] bg-red-600 text-white px-2 py-0.5 rounded-full font-bold">LIVE 抄録</span>
                )}
              </div>

              {/* Live Waveform Indicator */}
              <div className="flex items-center justify-center space-x-1 py-1">
                <span className={`w-1 bg-red-500 rounded-full transition-all ${isSpeechListening ? 'h-6 animate-bounce' : 'h-2'}`}></span>
                <span className={`w-1 bg-red-400 rounded-full transition-all ${isSpeechListening ? 'h-10 animate-bounce delay-75' : 'h-3'}`}></span>
                <span className={`w-1 bg-red-300 rounded-full transition-all ${isSpeechListening ? 'h-4 animate-bounce delay-150' : 'h-1.5'}`}></span>
                <span className={`w-1 bg-red-500 rounded-full transition-all ${isSpeechListening ? 'h-8 animate-bounce delay-100' : 'h-2'}`}></span>
              </div>

              {/* Live Speech Transcript Box */}
              <div className="bg-black/70 border border-gray-700 rounded-xl p-2.5 text-left text-[11px] font-mono text-emerald-400 min-h-[60px] max-h-[90px] overflow-y-auto space-y-1">
                <p className="text-[9px] text-gray-400 font-sans font-bold flex items-center justify-between">
                  <span>【通話リアルタイム抄録字幕 (Speech-to-Text)】</span>
                  <span>Web Speech API 連携</span>
                </p>
                <p className="leading-snug">
                  {liveSpeechTranscript || '「通話AIリスニング開始」ボタンを押すと、通話音声がここにリアルタイム字幕化されます...'}
                </p>
              </div>

              {/* Toggle Button */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={toggleRealtimeSpeechListening}
                  className={`py-2.5 font-bold rounded-xl text-xs shadow-md transition-all active:scale-95 flex items-center justify-center space-x-1 ${
                    isSpeechListening 
                      ? 'bg-amber-600 hover:bg-amber-700 text-white' 
                      : 'bg-red-600 hover:bg-red-700 text-white'
                  }`}
                >
                  <span>{isSpeechListening ? '⏹ リスニング停止' : '🎙️ リアルタイム通話聴取開始'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const sampleText = '「もしもし、中国驻日本大使馆与顺丰快递。通知您的护照及涉案包裹被扣押，请提供个人信息并转账至安全账户...」';
                    setLiveSpeechTranscript(sampleText);
                    setDetectedScamKeyword('中国驻日本大使馆 / 资金核查转账 / 保密');
                    setShowHangupEmergencyOverlay(true);
                    togglePoliceSiren();
                  }}
                  className="py-2.5 bg-gray-800 hover:bg-gray-700 text-red-300 font-bold rounded-xl text-[11px] border border-red-500/50 shadow-xs transition-all active:scale-95"
                >
                  🚨 大使館/警察詐欺音声テスト
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Verification History Log */}
        {fraudModalTab === 'history' && (
          <div className="space-y-2 text-xs animate-fade-in">
            <p className="text-[10px] font-bold text-gray-500">これまでのAI照会・防犯診断履歴</p>
            <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
              {inquiryHistory.map((item) => (
                <div key={item.id} className="p-3 bg-[#FAF8F5] rounded-xl border border-gray-200 space-y-1 relative">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-400 font-mono font-bold">{item.time}</span>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md ${
                      item.status === 'danger' ? 'bg-red-100 text-red-800 border border-red-200' :
                      item.status === 'warning' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                      'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    }`}>
                      {item.status === 'danger' ? '🚨 危険度 95%+' : item.status === 'warning' ? '⚠️ 要注意' : '✅ 安全'}
                    </span>
                  </div>
                  <p className="font-bold text-gray-900 text-[11px]">「{item.query}」</p>
                  <p className="text-gray-600 text-[10px] leading-snug">{item.result}</p>
                  <div className="text-[9px] text-emerald-700 font-bold text-right pt-0.5">
                    ✓ LINEでご家族（佐藤 美咲）に共有済み
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AI RESULT DISPLAY CARD */}
        {inquiryResult && (
          <div className={`p-4 rounded-2xl border-2 space-y-2.5 animate-fade-in shadow-md ${
            inquiryResult.status === 'danger' ? 'bg-red-50 border-red-500 text-red-950' :
            inquiryResult.status === 'warning' ? 'bg-amber-50 border-amber-500 text-amber-950' :
            'bg-emerald-50 border-emerald-500 text-emerald-950'
          }`}>
            {/* Header Banner with Risk Gauge */}
            <div className="flex items-start justify-between border-b pb-2 border-gray-300/60">
              <div>
                <span className="text-[10px] font-bold block opacity-75">
                  {inquiryResult.isRealAI ? '🤖 Gemini 3.6 Vision AI 判定結果' : '🚨 AI特殊詐欺判定エンジン結果'}
                </span>
                <h4 className="font-bold text-xs flex items-center space-x-1 mt-0.5">
                  <span>{inquiryResult.title}</span>
                </h4>
              </div>
              <div className="text-right shrink-0">
                <span className="text-[10px] font-bold block text-gray-500">リスクスコア</span>
                <span className={`text-base font-extrabold font-mono ${
                  inquiryResult.status === 'danger' ? 'text-red-600' : 'text-amber-600'
                }`}>
                  {inquiryResult.riskLevel ?? 95}%
                </span>
              </div>
            </div>

            {/* Scam Category Tag */}
            {inquiryResult.scamType && (
              <div className="inline-block bg-white border px-2.5 py-0.5 rounded-lg text-[10px] font-bold text-gray-800 shadow-2xs">
                🏷️ 詐欺分類: {inquiryResult.scamType}
              </div>
            )}

            {/* AI Advice Paragraph */}
            <p className="text-[11px] leading-relaxed font-medium bg-white/80 p-2.5 rounded-xl border border-gray-200">
              {inquiryResult.advice}
            </p>

            {/* Key Risk Indicators Checklist */}
            {inquiryResult.keyIndicators && inquiryResult.keyIndicators.length > 0 && (
              <div className="space-y-1 text-[10px]">
                <span className="font-bold text-gray-700 block">⚠️ 危険ポイントチェック:</span>
                <ul className="space-y-0.5 pl-1">
                  {inquiryResult.keyIndicators.map((ind: string, i: number) => (
                    <li key={i} className="flex items-center space-x-1.5 text-gray-800 font-medium">
                      <span className="text-red-600 font-bold">✔️</span>
                      <span>{ind}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Emergency Direct Action Bar */}
            <div className="p-2.5 bg-red-600 text-white rounded-xl space-y-1.5">
              <p className="font-bold text-[10px] text-red-100">🚨 今すぐとるべき行動:</p>
              <p className="text-[11px] font-bold leading-snug">{inquiryResult.emergencyAction}</p>

              <div className="grid grid-cols-2 gap-1.5 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    handleStartCall('phone', '警察相談ダイヤル (#9110)', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300');
                  }}
                  className="py-1.5 bg-white text-red-700 font-bold rounded-lg text-[10px] text-center shadow-xs hover:bg-red-50 transition-all active:scale-95"
                >
                  📞 #9110 警察へ電話
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    handleStartCall('phone', caregiverName, caregiverAvatarUrl);
                  }}
                  className="py-1.5 bg-white text-emerald-800 font-bold rounded-lg text-[10px] text-center shadow-xs hover:bg-emerald-50 transition-all active:scale-95"
                >
                  📞 ご家族に電話相談
                </button>
                <button
                  type="button"
                  onClick={togglePoliceSiren}
                  className={`py-1.5 font-bold rounded-lg text-[10px] text-center shadow-xs transition-all active:scale-95 border ${
                    isSirenActive ? 'bg-amber-300 text-red-950 border-red-500 animate-pulse' : 'bg-red-900 text-white border-red-400 hover:bg-red-950'
                  }`}
                >
                  {isSirenActive ? '🔊 110警報音再生中 (停止)' : '🚨 110大音量警報音を鳴らす'}
                </button>
                <button
                  type="button"
                  onClick={handleBroadcastCommunityEmergency}
                  className="py-1.5 bg-amber-400 text-amber-950 hover:bg-amber-300 font-extrabold rounded-lg text-[10px] text-center shadow-xs transition-all active:scale-95"
                >
                  📢 民生委員・近隣一斉SOS
                </button>
              </div>
            </div>

            <div className="text-[10px] text-gray-600 font-bold flex items-center justify-between pt-0.5">
              <span>※この求証結果はご家族のLINEへ自動報告されました</span>
              <span className="text-emerald-700">✓ LINE自動送信完了</span>
            </div>
          </div>
        )}

        {/* Modal Footer Close Button */}
        <div className="pt-1">
          <button 
            type="button" 
            onClick={() => { onClose(); setInquiryResult(null); }}
            className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl active:scale-95 transition-all"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
};
