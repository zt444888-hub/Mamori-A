import React, { useState, useEffect, useRef } from 'react';
import { ScreenId } from '../types';
import { 
  CheckCircle, Pill, Clock, Sun, Heart, Navigation, 
  Settings, Phone, Video, ShieldAlert, ShieldCheck, FileText, Calendar, 
  UserCheck, AlertTriangle, ArrowLeft, RefreshCw, Send, Check, Sparkles, MessageCircle, Eye, ChevronRight, HelpCircle,
  Mic, MicOff, Volume2, VolumeX, PhoneOff, QrCode, Ticket, Gift, ShoppingBag, Award, Activity
} from 'lucide-react';

interface iOSSimulatorProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  accessibilityLargeText: boolean;
  onToggleAccessibility: () => void;
}

export const IOSSimulator: React.FC<iOSSimulatorProps> = ({
  currentScreen,
  onNavigate,
  accessibilityLargeText,
  onToggleAccessibility,
}) => {
  // Dynamic Medications State (Manual / Family Controlled / AI Scan)
  const [medications, setMedications] = useState<Array<{
    id: string;
    name: string;
    dosage: string;
    time: string;
    photoUrl?: string;
    addedBy: string;
    taken: boolean;
    dietaryWarnings?: string[];
    drugInteractions?: string[];
  }>>([
    {
      id: '1',
      name: '降圧薬 (アムロジピン塩酸塩 5mg)',
      dosage: '朝食後 1錠',
      time: '08:00 AM',
      photoUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300',
      addedBy: '子女（太郎）',
      taken: false,
      dietaryWarnings: [
        '⚠️ 切勿与葡萄柚（グレープフルーツ）及葡萄柚汁同服！会引发血压急剧下降及头晕',
        '🍶 服用前后严禁饮酒 (酒精增强血管扩张导致跌倒风险)'
      ],
      drugInteractions: [
        "💊 他の降圧薬（ARB/ACE阻害薬等）との重複服用は医師に相談してください",
        "🛑 请用温开水送服，切勿与浓茶或咖啡同服"
      ]
    },
    {
      id: '2',
      name: '整腸剤 (ビオフェルミン)',
      dosage: '毎食後 1錠',
      time: '12:30 PM',
      photoUrl: '',
      addedBy: '本人手動',
      taken: false,
      dietaryWarnings: [
        '🥛 抗生剤と併用する場合は2時間以上間隔を空けて服用してください'
      ],
      drugInteractions: []
    }
  ]);

  // Caregiver Add Medication Modal / Form state
  const [showCaregiverAddModal, setShowCaregiverAddModal] = useState(false);
  const [showCaregiverSettingsModal, setShowCaregiverSettingsModal] = useState(false);
  
  // Caregiver Profile State
  const [caregiverName] = useState('太郎');
  const [caregiverAvatarUrl] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300');

  // Senior / Parent Profile State (高齢者・お母さんのアイコン＆お名前)
  const [seniorName, setSeniorName] = useState('お母さん (マサコ)');
  const [seniorAvatarUrl, setSeniorAvatarUrl] = useState('https://lh3.googleusercontent.com/aida-public/AB6AXuCA0Z6JdMFe4AwdVRb8tgnq-eug_XR2ieqOm1DLGq6rCZr5b1JErYSrv7FyFSxtSJYKBL-b1ZLl89Q9vg67-tWu0tIZCkg0xJvuCTAeQNj22-Ion-Rw7J8K5Kc7-pv0sj9IadY1x7VxsmauxxuSR4M7Lj6oR1KEGRQZPSuPvuDBFbzJL-cjXY4JFQ-1spQOOJTisof4f9iyZEgnfsnPtJoaDV2rcCGemIz7HI9cu1yQ272upYR_SLUkqlslLHgD9vH6-MUqaW4W');
  const [showSeniorProfileEditModal, setShowSeniorProfileEditModal] = useState(false);
  const [tempSeniorName, setTempSeniorName] = useState('');
  const [tempSeniorAvatarUrl, setTempSeniorAvatarUrl] = useState('');

  const [caregiverMedName, setCaregiverMedName] = useState('');
  const [caregiverMedDosage, setCaregiverMedDosage] = useState('朝食後 1錠');
  const [caregiverMedTime, setCaregiverMedTime] = useState('08:00 AM');
  const [caregiverMedPhoto, setCaregiverMedPhoto] = useState('https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300');

  // Medication Edit State
  const [editingMedId, setEditingMedId] = useState<string | null>(null);
  const [editMedName, setEditMedName] = useState('');
  const [editMedDosage, setEditMedDosage] = useState('朝食後 1錠');
  const [editMedTime, setEditMedTime] = useState('08:00 AM');

  // Pairing & Connection Logic State
  const [pairingCode] = useState('ANS-8829');
  const [inputPairingCode, setInputPairingCode] = useState('');
  const [isLinkedWithParent, setIsLinkedWithParent] = useState(true);

  // New Anti-Fraud Guardian States
  const [blockedCallCount, setBlockedCallCount] = useState(2);
  const [showFraudInquiryModal, setShowFraudInquiryModal] = useState(false);
  const [inquiryQuery, setInquiryQuery] = useState('');
  const [inquiryResult, setInquiryResult] = useState<{
    status: 'danger' | 'warning' | 'safe';
    title: string;
    advice: string;
    riskLevel?: number;
    scamType?: string;
    keyIndicators?: string[];
    emergencyAction?: string;
    isRealAI?: boolean;
  } | null>(null);
  const [fraudModalTab, setFraudModalTab] = useState<'quick' | 'photo' | 'voice' | 'history'>('quick');
  const [inquiryHistory, setInquiryHistory] = useState([
    {
      id: 1,
      time: '本日 14:05',
      query: '警察署から「口座が犯罪に使われた、キャッシュカードを預かる」と言われた',
      result: '🚨 100% 詐欺: 警察官や銀行員がキャッシュカードを預かることは絶対ありません。',
      status: 'danger' as const,
      riskLevel: 98
    },
    {
      id: 2,
      time: '昨日 10:12',
      query: '電力会社から「未払い料金があるため本日中に振込」とSMSが届いた',
      result: '⚠️ 架空料金請求詐欺: 公式サポート以外への振り込みは危険です。',
      status: 'warning' as const,
      riskLevel: 82
    }
  ]);

  // New Optimization Dimensions States (Dimension 1, 2, 3, 4)
  const [receivedHanamaru, setReceivedHanamaru] = useState(false);
  const [seniorHealthPoints, setSeniorHealthPoints] = useState(420);
  const [isSpeakingMed, setIsSpeakingMed] = useState<string | null>(null);

  // Native iOS Real-World Architecture Demo State (CallKit & SMS Filter & LINE Push)
  const [isProtectionActive, setIsProtectionActive] = useState(true);
  const [showNativeIosDemoModal, setShowNativeIosDemoModal] = useState(false);
  const [showUltraSimpleSeniorModal, setShowUltraSimpleSeniorModal] = useState(false);
  const [nativeDemoTab, setNativeDemoTab] = useState<'callkit' | 'sms' | 'line' | 'arch'>('callkit');

  // Low-Interference Senior Call/SMS & Auto Push to Child State
  const [childLinePushToast, setChildLinePushToast] = useState<{
    show: boolean;
    title: string;
    detail: string;
    time: string;
    type: 'call' | 'sms';
  } | null>(null);

  const [highRiskPushLogs, setHighRiskPushLogs] = useState([
    {
      id: 'push-1',
      type: 'call' as const,
      callerOrSender: '080-3819-2231 (東京都麹町)',
      contentOrTopic: '冒充警视厅/口座涉及洗钱要转账',
      riskScore: 98,
      riskLevel: 'CRITICAL' as const,
      fraudCategory: 'オレオレ詐欺 / 假冒警察转账',
      seniorInterventionStatus: '🟢 老人端0干扰：CallKit 后台静默拒接',
      childPushStatus: '已推送到子女 LINE & APP',
      timestamp: '10:14 AM'
    },
    {
      id: 'push-2',
      type: 'sms' as const,
      callerOrSender: 'NTT法務部 (未知短信号码)',
      contentOrTopic: '【NTT未払い金】本日中に支払わないと法的措置。http://phish-tokyo.net/pay',
      riskScore: 96,
      riskLevel: 'HIGH_RISK' as const,
      fraudCategory: '架空料金請求 / 恶意钓鱼网址',
      seniorInterventionStatus: '🟢 老人端0干扰：短信过滤自动移至隔离箱',
      childPushStatus: '已推送到子女 LINE & APP',
      timestamp: '09:30 AM'
    }
  ]);

  const triggerChildLinePushToast = (title: string, detail: string, type: 'call' | 'sms') => {
    setChildLinePushToast({
      show: true,
      title,
      detail,
      time: 'たった今',
      type
    });
    setTimeout(() => {
      setChildLinePushToast(null);
    }, 6000);
  };

  const handleSimulateLowInterferenceHighRiskCall = () => {
    triggerToast('📞 收到未知来电 080-9988-1234... Gemini 静默识别中 (老人端免打扰) 🛡️');
    setBlockedCallCount(prev => prev + 1);

    const newPush = {
      id: `push-${Date.now()}`,
      type: 'call' as const,
      callerOrSender: '080-9988-1234 (東京都杉並区不審番号)',
      contentOrTopic: '假冒警视厅/通知口座涉案冻结索要密码',
      riskScore: 99,
      riskLevel: 'CRITICAL' as const,
      fraudCategory: 'オレオレ詐欺 (假冒警察案)',
      seniorInterventionStatus: '🟢 老人端0干扰：CallKit 后台静默挂断',
      childPushStatus: '已推送到子女 LINE & APP',
      timestamp: 'たった今'
    };

    setHighRiskPushLogs(prev => [newPush, ...prev]);

    const newActivityLog = {
      id: Date.now(),
      time: 'たった今',
      title: '🚨 高风险电话已静默阻断并推送子女 LINE',
      desc: '080-9988-1234 (冒充警视厅) 已被 iOS CallKit 自动拒接，已发送包含录音摘要的 LINE 通知给子女(佐藤美咲)。',
      type: 'security' as const
    };
    setActivityLogs(prev => [newActivityLog, ...prev]);

    triggerChildLinePushToast(
      '🚨【子女 LINE 实时推送】母亲手机收到高风险诈骗电话',
      '来电: 080-9988-1234 (冒充警视厅索要卡号密码)。已全自动静默挂断，未打扰老人！',
      'call'
    );
  };

  const handleSimulateLowInterferenceHighRiskSms = () => {
    triggerToast('📩 收到短信【电力公司扣费失败...】Gemini 自动识别钓鱼网址，已移至静默隔离区 🛡️');

    const newPush = {
      id: `push-${Date.now()}`,
      type: 'sms' as const,
      callerOrSender: '東京電力未払い案内 (未知号段)',
      contentOrTopic: '【東京電力】電気料金が未払いです。本日中に以下URLからカード決済してください。http://tokyo-elec-pay.xyz',
      riskScore: 97,
      riskLevel: 'HIGH_RISK' as const,
      fraudCategory: '架空料金請求SMS (假冒电力急缴)',
      seniorInterventionStatus: '🟢 老人端0干扰：短信过滤系统自动移入垃圾箱',
      childPushStatus: '已推送到子女 LINE & APP',
      timestamp: 'たった今'
    };

    setHighRiskPushLogs(prev => [newPush, ...prev]);

    const newActivityLog = {
      id: Date.now(),
      time: 'たった今',
      title: '📩 高风险钓鱼短信已隔离并推送子女 LINE',
      desc: '包含非法钓鱼网址的催缴短信已被系统静默隔离，已推送到子女 LINE，保护老人免受点击风险。',
      type: 'security' as const
    };
    setActivityLogs(prev => [newActivityLog, ...prev]);

    triggerChildLinePushToast(
      '📩【子女 LINE 实时推送】母亲手机收到高风险钓鱼短信',
      '内容: 東京電力未払い急催SMS (含非法网址)。系统已全自动静默隔离至垃圾箱！',
      'sms'
    );
  };

  const speakMessage = (text: string, lang = 'zh-CN') => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Health Points & Coupons Modal State (シニア健康ポイント・商品券)
  const [showPointsModal, setShowPointsModal] = useState(false);
  const [activePointsTab, setActivePointsTab] = useState<'exchange' | 'my_coupons' | 'history'>('exchange');
  const [redeemedCoupons, setRedeemedCoupons] = useState([
    {
      id: 'c1',
      title: '杉並区 共通商品券 500円分',
      store: '区内スーパー・調剤薬局全店共通',
      code: 'ANS-SGI-8829',
      redeemedDate: '2026-07-20',
      expiryDate: '2026-12-31',
      barcode: '||||| ||| |||| || |||||',
      used: false
    }
  ]);

  // Interactive Telephone & Video Call State (電話・ビデオ通話)
  const [activeCall, setActiveCall] = useState<{
    type: 'phone' | 'video';
    recipientName: string;
    recipientAvatar: string;
    isMuted: boolean;
    isSpeakerOn: boolean;
    status: 'calling' | 'connected' | 'ended';
    duration: number;
  } | null>(null);

  // Call timer effect
  useEffect(() => {
    let interval: any;
    if (activeCall && activeCall.status === 'connected') {
      interval = setInterval(() => {
        setActiveCall(prev => prev ? { ...prev, duration: prev.duration + 1 } : null);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeCall?.status]);

  const handleStartCall = (type: 'phone' | 'video', name = seniorName, avatar = seniorAvatarUrl) => {
    setActiveCall({
      type,
      recipientName: name,
      recipientAvatar: avatar,
      isMuted: false,
      isSpeakerOn: true,
      status: 'calling',
      duration: 0
    });

    setTimeout(() => {
      setActiveCall(prev => prev ? { ...prev, status: 'connected' } : null);
    }, 1500);
  };

  const handleEndCall = () => {
    if (activeCall) {
      const mins = Math.floor(activeCall.duration / 60);
      const secs = activeCall.duration % 60;
      triggerToast(`通話を終了しました (${mins > 0 ? `${mins}分` : ''}${secs}秒) 📞`);
    }
    setActiveCall(null);
  };

  const handleRedeemCoupon = (title: string, costPoints: number, store: string) => {
    if (seniorHealthPoints < costPoints) {
      triggerToast(`❌ ポイントが不足しています (必要: ${costPoints} Pt / 保有: ${seniorHealthPoints} Pt)`);
      return;
    }

    setSeniorHealthPoints(prev => prev - costPoints);
    const newCoupon = {
      id: Date.now().toString(),
      title,
      store,
      code: `ANS-CPN-${Math.floor(1000 + Math.random() * 9000)}`,
      redeemedDate: new Date().toISOString().split('T')[0],
      expiryDate: '2026-12-31',
      barcode: '||||| || |||||| ||| ||||',
      used: false
    };

    setRedeemedCoupons(prev => [newCoupon, ...prev]);
    setActivePointsTab('my_coupons');
    triggerToast(`🎉 「${title}」と交換しました！マイ商品券に追加されました 🎟️`);

    const newLog = {
      id: Date.now(),
      time: 'たった今',
      title: `健康ポイント交換: ${title}`,
      desc: `${costPoints} Pt を消費して商品券を発行しました。`,
      type: 'medication' as const
    };
    setActivityLogs(prev => [newLog, ...prev]);
  };

  const handleMarkCouponUsed = (id: string) => {
    setRedeemedCoupons(prev => prev.map(c => c.id === id ? { ...c, used: true } : c));
    triggerToast('商品券を「使用済み」に更新しました 🏷️');
  };

  // 🩸 Blood Pressure & Vitals State
  const [sysBloodPressure, setSysBloodPressure] = useState(145); // Set default to 145 mmHg to demonstrate 3-day continuous high BP!
  const [diaBloodPressure, setDiaBloodPressure] = useState(90);  // 舒张压（低压）
  const [pulseRate, setPulseRate] = useState(74);               // 心率
  const [lastBPTime, setLastBPTime] = useState('本日 08:30');
  const [showBloodPressureModal, setShowBloodPressureModal] = useState(false);

  // 🩺 3-Day BP History & Continuous Medical Consultation Report State
  const [bpHistory] = useState([
    { date: '07/23 (2日前)', sys: 148, dia: 92, pulse: 76 },
    { date: '07/24 (昨日)', sys: 142, dia: 88, pulse: 72 },
    { date: '07/25 (本日)', sys: 145, dia: 90, pulse: 74 }
  ]);
  const [showBpReportModal, setShowBpReportModal] = useState(false);
  const [bpReportData, setBpReportData] = useState<{
    diagnosisLevel: string;
    riskAssessment: string;
    symptomsChecklist: string[];
    doctorQuestions: string[];
    lifestyleGuidance: string[];
    lineNotificationText: string;
  } | null>(null);

  // Handler: Generate 3-Day Continuous BP Medical Consultation Report
  const handleGenerateBpReport = async () => {
    setIsAiLoading(true);
    try {
      const response = await fetch('/api/ai/generate-bp-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          history: bpHistory,
          currentSys: sysBloodPressure,
          currentDia: diaBloodPressure,
          pulse: pulseRate
        })
      });
      const data = await response.json();
      setBpReportData(data);
      setShowBpReportModal(true);
      triggerToast(data.isRealAI ? '🤖 Gemini AI 就医问诊建议报告已生成！' : '🩺 3日高血压就医问诊建议报告已生成！');
    } catch (err) {
      console.error(err);
      triggerToast('报告生成失败，请重试');
    } finally {
      setIsAiLoading(false);
    }
  };

  // Handler: Push Medical Consultation Report to Caregiver LINE
  const handlePushBpReportToLine = () => {
    const newLog = {
      id: Date.now(),
      time: 'たった今',
      title: 'AI高血圧就医問診報告書をLINE送信 🩺',
      desc: `お母さんの3日間連続高血圧 (本日 ${sysBloodPressure}/${diaBloodPressure} mmHg) に伴い、医師受診用サマリー報告書をご家族(佐藤美咲)にLINE自動送信しました。`,
      type: 'medication' as const
    };
    setActivityLogs(prev => [newLog, ...prev]);
    setLineNotificationSent(true);
    triggerToast('📲 LINEでご家族(佐藤美咲)へ就医問診報告書を自動送信しました！');
  };

  // 🛡️ Real-Time Voice Speech Recognition & Anti-Scam Siren States
  const [isSpeechListening, setIsSpeechListening] = useState(false);
  const [liveSpeechTranscript, setLiveSpeechTranscript] = useState('');
  const [detectedScamKeyword, setDetectedScamKeyword] = useState<string | null>(null);
  const [showHangupEmergencyOverlay, setShowHangupEmergencyOverlay] = useState(false);
  const [isSirenActive, setIsSirenActive] = useState(false);
  const recognitionRef = useRef<any>(null);

  // 110 Police Siren Synthesizer using Web Audio API
  const togglePoliceSiren = () => {
    if (isSirenActive) {
      setIsSirenActive(false);
      triggerToast('🚨 110警報音を停止しました');
      return;
    }

    try {
      setIsSirenActive(true);
      triggerToast('🚨 110番大音量警報音を再生中！(周囲・詐欺犯への威嚇警告)');
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      
      const now = ctx.currentTime;
      osc.frequency.setValueAtTime(770, now);
      for (let i = 0; i < 8; i++) {
        osc.frequency.exponentialRampToValueAtTime(960, now + i * 0.8 + 0.4);
        osc.frequency.exponentialRampToValueAtTime(770, now + i * 0.8 + 0.8);
      }
      gain.gain.setValueAtTime(0.35, now);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      setTimeout(() => {
        osc.stop();
        ctx.close();
        setIsSirenActive(false);
      }, 6400);
    } catch (err) {
      console.error(err);
      setIsSirenActive(false);
    }
  };

  // Broadcast Alert to Nearby Community Volunteer / Minsei-委員 (民生委员/治安站)
  const handleBroadcastCommunityEmergency = () => {
    const newLog = {
      id: Date.now(),
      time: 'たった今',
      title: '📢 地域民生委員・近隣防犯ステーション緊急連動！',
      desc: `お母さんの端末で高危険度(リスク95%)の不審電話・詐欺求証を検知。地区民生委員(山田様)・近隣見守りボランティアおよびご家族LINEへ緊急支援要請を一斉送信しました。`,
      type: 'security' as const
    };
    setActivityLogs(prev => [newLog, ...prev]);
    setLineNotificationSent(true);
    triggerToast('📢 近隣民生委員・治安ステーション & ご家族LINEへ緊急SOS要請を一斉一括配信しました！');
  };

  // Real-time Speech Recognition Handler with Web Speech API
  const toggleRealtimeSpeechListening = () => {
    if (isSpeechListening) {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch(e) {}
      }
      setIsSpeechListening(false);
      triggerToast('🎙️ 通話音声のリアルタイムAIリスニングを停止しました');
      return;
    }

    setIsSpeechListening(true);
    setLiveSpeechTranscript('通話音声のリアルタイムAI解析を開始しました... (マイクから音声を入力してください)');
    triggerToast('🎙️ 通話音声リアルタイムAIリスニングを開始！高危険ワードを自動検知します');

    const dangerKeywords = ['振込', '口座', 'キャッシュカード', '暗証番号', '名義貸し', '還付金', '大使館', '使館', '領事館', '领事馆', '警察', '逮捕', '保密', '秘密', '安全账户', '扣押', '未払い', '法的措置', '顺丰', '快递', '公安', '转账'];

    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRec) {
      try {
        const rec = new SpeechRec();
        rec.continuous = true;
        rec.interimResults = true;
        rec.lang = 'ja-JP';

        rec.onresult = (event: any) => {
          let currentText = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            currentText += event.results[i][0].transcript;
          }
          setLiveSpeechTranscript(currentText);

          for (const kw of dangerKeywords) {
            if (currentText.includes(kw)) {
              setDetectedScamKeyword(kw);
              setShowHangupEmergencyOverlay(true);
              togglePoliceSiren();
              break;
            }
          }
        };

        rec.onerror = () => {};
        rec.onend = () => {
          if (isSpeechListening) {
            try { rec.start(); } catch(e) {}
          }
        };

        rec.start();
        recognitionRef.current = rec;
      } catch (err) {
        console.error(err);
      }
    } else {
      // Fallback: Simulate active speech stream catching scam keywords
      setTimeout(() => {
        const simulatedText = '「中国驻日本大使馆/顺丰快递通知：您的涉案包裹已被扣押，涉嫌非法洗钱案件，请极度保密并配合资金核查转账...」';
        setLiveSpeechTranscript(simulatedText);
        setDetectedScamKeyword('大使馆 / 资金核查转账 / 保密');
        setShowHangupEmergencyOverlay(true);
        togglePoliceSiren();
      }, 2500);
    }
  };

  // 👟 Steps & Apple HealthKit Integration State
  const [dailySteps, setDailySteps] = useState(3420);
  const [stepGoal, setStepGoal] = useState(5000);
  const [isHealthKitConnected, setIsHealthKitConnected] = useState(true);
  const [lastStepSyncTime, setLastStepSyncTime] = useState('本日 12:15');
  const [showStepsModal, setShowStepsModal] = useState(false);

  // 🤖 Full Gemini AI Integration State
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [showAiNurseModal, setShowAiNurseModal] = useState(false);
  const [aiNurseAdvice, setAiNurseAdvice] = useState<string | null>(null);

  const handleUpdateBloodPressure = (e: React.FormEvent) => {
    e.preventDefault();
    const nowStr = `本日 ${new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}`;
    setLastBPTime(nowStr);
    setShowBloodPressureModal(false);
    triggerToast(`🩺 血圧を更新しました (${sysBloodPressure}/${diaBloodPressure} mmHg, 心拍 ${pulseRate}) ご家族へ共有完了！`);

    // Add to activity log for caregiver
    const newLog = {
      id: Date.now(),
      time: nowStr,
      title: `体調バイタル測定: 血圧 ${sysBloodPressure}/${diaBloodPressure} mmHg`,
      desc: `心拍数: ${pulseRate} bpm · 状態: 正常域 (${seniorName})`,
      type: 'activity' as const
    };
    setActivityLogs(prev => [newLog, ...prev]);
  };

  const handleSyncHealthKitSteps = () => {
    const randomAdd = Math.floor(100 + Math.random() * 400);
    const newTotal = dailySteps + randomAdd;
    setDailySteps(newTotal);
    const nowStr = `本日 ${new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}`;
    setLastStepSyncTime(nowStr);
    triggerToast(`🍎 Apple HealthKit (iOS 運動) から最新歩数を同期しました！ (+${randomAdd} 歩 ➔ 計 ${newTotal.toLocaleString()} 歩)`);
  };

  // SOS Countdown Confirmation State
  const [showSOSModal, setShowSOSModal] = useState(false);
  const [sosCountdown, setSosCountdown] = useState(5);

  // Screen 2 Manual Form state
  const [manualMedName, setManualMedName] = useState('');
  const [manualMedDosage, setManualMedDosage] = useState('朝食後 1錠');
  const [manualMedTime, setManualMedTime] = useState('08:00 AM');
  const [manualRegistrant, setManualRegistrant] = useState<'senior' | 'caregiver'>('caregiver');
  const [manualPhotoUrl, setManualPhotoUrl] = useState('https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300');

  // Hospital Visit Records State (通院記録)
  const [showHospitalRecordsModal, setShowHospitalRecordsModal] = useState(false);
  const [showAddHospitalRecordForm, setShowAddHospitalRecordForm] = useState(false);
  const [hospitalRecords, setHospitalRecords] = useState([
    {
      id: 'h1',
      hospitalName: '日本赤十字病院',
      department: '循環器内科',
      date: '2026-08-10',
      time: '10:00 AM',
      doctor: '佐藤 医師',
      notes: '定期血圧チェック・降圧薬(アムロジピン)処方更新',
      status: 'upcoming' as const
    },
    {
      id: 'h2',
      hospitalName: 'さくらクリニック',
      department: '一般内科',
      date: '2026-07-15',
      time: '02:30 PM',
      doctor: '田中 医師',
      notes: '血液検査結果確認。経過良好。整腸剤追加処方',
      status: 'completed' as const
    }
  ]);
  const [newHospitalName, setNewHospitalName] = useState('');
  const [newHospitalDepartment, setNewHospitalDepartment] = useState('循環器内科');
  const [newHospitalDate, setNewHospitalDate] = useState('2026-08-20');
  const [newHospitalTime, setNewHospitalTime] = useState('10:00 AM');
  const [newHospitalDoctor, setNewHospitalDoctor] = useState('');
  const [newHospitalNotes, setNewHospitalNotes] = useState('');

  // Schedule & Calendar State (予定表)
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showAddScheduleForm, setShowAddScheduleForm] = useState(false);
  const [scheduleEvents, setScheduleEvents] = useState([
    {
      id: 's1',
      title: '循環器内科 定期通院',
      date: '2026-08-10',
      time: '10:00 AM',
      category: '通院' as const,
      notes: '診察券とお薬手帳を持参'
    },
    {
      id: 's2',
      title: '訪問看護スタッフ来訪',
      date: '2026-08-05',
      time: '02:00 PM',
      category: '訪問看護' as const,
      notes: 'バイタルチェック・安否確認'
    },
    {
      id: 's3',
      title: 'デイサービス お迎え',
      date: '2026-08-01',
      time: '09:00 AM',
      category: 'デイサービス' as const,
      notes: '着替えとタオルを準備'
    }
  ]);
  const [newScheduleTitle, setNewScheduleTitle] = useState('');
  const [newScheduleDate, setNewScheduleDate] = useState('2026-08-12');
  const [newScheduleTime, setNewScheduleTime] = useState('11:00 AM');
  const [newScheduleCategory, setNewScheduleCategory] = useState<'通院' | '訪問看護' | 'デイサービス' | '服薬チェック' | 'その他'>('通院');
  const [newScheduleNotes, setNewScheduleNotes] = useState('');

  // Other State
  const [medicationTaken, setMedicationTaken] = useState(false);
  const [lineNotificationSent, setLineNotificationSent] = useState(false);
  const [lineDailyEnabled, setLineDailyEnabled] = useState(true);
  const [selectedRole, setSelectedRole] = useState<'senior' | 'caregiver'>('senior');
  const [selectedPlan, setSelectedPlan] = useState<'yearly' | 'monthly'>('yearly');
  const [showToast, setShowToast] = useState<string | null>(null);

  // Dynamic Activity Logs shared across screens
  const [activityLogs, setActivityLogs] = useState([
    {
      id: 1,
      time: '12:30 PM',
      title: '防犯AI - 不審な電話を1件ブロック',
      desc: '特殊詐欺の疑いがある番号(+81 03-XXXX-9912)を自動遮断しました。',
      type: 'security' as const
    },
    {
      id: 2,
      time: '08:00 AM',
      title: '朝の薬 (定時服薬完了)',
      desc: 'お母さんがボタンを押して正常に服薬完了しました。',
      type: 'medication' as const
    }
  ]);

  // Toast trigger helper
  const triggerToast = (msg: string) => {
    setShowToast(msg);
    setTimeout(() => setShowToast(null), 3000);
  };

  // 1-Tap Hanamaru Stamp Sending (Caregiver -> Senior)
  const handleSendHanamaruStamp = () => {
    setReceivedHanamaru(true);
    const newLog = {
      id: Date.now(),
      time: 'たった今',
      title: '花丸スタンプ送信 💮',
      desc: 'お母さんに「よく頑張りました！」の花丸スタンプと応援メッセージを送りました。',
      type: 'medication' as const
    };
    setActivityLogs(prev => [newLog, ...prev]);
    triggerToast('お母さんに花丸スタンプ 💮 を送信しました！お母さんの画面にリアルタイム表示されます。');
  };

  // Senior Speech Audio Readout (Dimension 2)
  const handleSpeakMedication = (name: string, dosage: string) => {
    setIsSpeakingMed(name);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(`お薬のお手伝いです。${name}、${dosage}です。ぬるま湯でお飲みください。`);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.85; // slightly slower for senior clarity
      utterance.onend = () => setIsSpeakingMed(null);
      utterance.onerror = () => setIsSpeakingMed(null);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setIsSpeakingMed(null), 2500);
    }
    triggerToast(`🔊 音声案内中: 「${name} ${dosage}」`);
  };

  // Electronic Prescription QR / AI Photo Scan (Dimension 1)
  const handleScanElectronicPrescriptionQR = async (imageBase64?: string) => {
    setIsAiLoading(true);
    try {
      const response = await fetch('/api/ai/scan-prescription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64: imageBase64 || '' })
      });
      const data = await response.json();

      const qrImportedMed = {
        id: Date.now().toString(),
        name: data.name || 'アムロジピン塩酸塩錠 5mg (降圧剤)',
        dosage: data.dosage || '朝食後 1錠',
        time: data.time || '08:00 AM',
        photoUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300',
        addedBy: data.isRealAI ? 'Gemini 3.6 Flash AI解析' : '電子処方箋(調剤薬局連携)',
        taken: false,
        dietaryWarnings: data.dietaryWarnings || [
          '⚠️ 切勿与葡萄柚（グレープフルーツ）及葡萄柚汁同服！会引发血压急剧下降及头晕',
          '🍶 服用前后严禁饮酒 (酒精增强血管扩张导致跌倒风险)'
        ],
        drugInteractions: data.drugInteractions || [
          '💊 他の降圧薬との重複服用に注意',
          '🛑 请用温开水送服，勿用浓茶或咖啡'
        ]
      };
      setMedications(prev => [qrImportedMed, ...prev]);
      
      const newLog = {
        id: Date.now(),
        time: 'たった今',
        title: `AI処方箋解析完了: ${qrImportedMed.name}`,
        desc: `調剤薬局AI連携システムより「${qrImportedMed.name}」が自動反映されました。`,
        type: 'medication' as const
      };
      setActivityLogs(prev => [newLog, ...prev]);
      triggerToast(data.isRealAI ? `🤖 Gemini AI解析完了: 「${qrImportedMed.name}」を追加しました！` : '【電子処方箋】調剤薬局 QR より「ジャヌビア錠」が自動反映されました！');
    } catch (err) {
      console.error(err);
      triggerToast('処方箋スキャン中にエラーが発生しました');
    } finally {
      setIsAiLoading(false);
    }
  };

  // 1-Tap Fraud Verification Handler ("这是诈骗吗？" / 防犯AI求証)
  const handlePerformFraudInquiry = async (queryText: string, imageBase64?: string) => {
    const text = queryText || inquiryQuery;
    if (!text.trim() && !imageBase64) return;

    setIsAiLoading(true);
    try {
      const response = await fetch('/api/ai/fraud-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ queryText: text, imageBase64 })
      });
      const data = await response.json();

      const res = {
        status: (data.status || 'danger') as 'danger' | 'warning' | 'safe',
        title: data.title || '🚨 100% 詐欺（特殊詐欺・アポ電）の危険があります！',
        advice: data.advice || '警察官・銀行員・公務員が電話や訪問でカードを預かることはありません！すぐに電話を切ってください。',
        riskLevel: typeof data.riskLevel === 'number' ? data.riskLevel : 95,
        scamType: data.scamType || '特殊詐欺・なりすまし',
        keyIndicators: data.keyIndicators || ['キャッシュカードを預かると言われた', '暗証番号を聞いてくる', '誰にも相談するなと言われた'],
        emergencyAction: data.emergencyAction || '今すぐ電話を切り、警察相談専用ダイヤル（#9110）またはご家族に連絡してください！',
        isRealAI: data.isRealAI
      };

      setInquiryResult(res);

      const newHistoryItem = {
        id: Date.now(),
        time: 'たった今',
        query: text || (imageBase64 ? '📷 添付画像・不審文書スキャン' : '音声・不審照会'),
        result: `${res.title}: ${res.advice}`,
        status: res.status,
        riskLevel: res.riskLevel
      };
      setInquiryHistory(prev => [newHistoryItem, ...prev]);

      // Send LINE Alert to Caregiver
      const newLog = {
        id: Date.now(),
        time: 'たった今',
        title: `防犯AI求証 (${data.isRealAI ? 'Gemini 3.6 Vision' : 'ルールエンジン'}): 「${(text || '画像解析').slice(0, 15)}...」`,
        desc: `お母さんが1-Tap詐欺求証を実行しました。判定: ${res.title} (危険度: ${res.riskLevel}%)。LINEにご家族通知を送信しました。`,
        type: 'security' as const
      };
      setActivityLogs(prev => [newLog, ...prev]);
      setLineNotificationSent(true);

      // 🚨 ZERO-TOUCH PROTECTION: Auto-trigger Giant Emergency Hangup Overlay & Loud Voice Readout for High Risk!
      if (res.riskLevel >= 80 || res.status === 'danger') {
        setDetectedScamKeyword(res.scamType || text.slice(0, 35));
        setShowHangupEmergencyOverlay(true);
        togglePoliceSiren();

        if ('speechSynthesis' in window) {
          window.speechSynthesis.cancel();
          const voiceMsg = new SpeechSynthesisUtterance(`警告！检测到诈骗危险。${res.advice}！已自动向家属发送紧急提醒！`);
          voiceMsg.lang = 'zh-CN';
          voiceMsg.rate = 0.85;
          window.speechSynthesis.speak(voiceMsg);
        }
      }

      triggerToast(data.isRealAI ? '🤖 Gemini AI防犯判定完了！ご家族LINEにも即時自動報告されました。' : '🚨 AI防犯判定結果を表示中！ご家族のLINEにも自動で緊急報告されました。');
    } catch (err) {
      console.error(err);
      triggerToast('AI求証判定中にエラーが発生しました');
    } finally {
      setIsAiLoading(false);
    }
  };

  // AI Nurse / Health Assistant Handler (AI看護師・健康アドバイス)
  const handleAskAiNurse = async (customPrompt?: string) => {
    setIsAiLoading(true);
    setShowAiNurseModal(true);
    try {
      const response = await fetch('/api/ai/health-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: customPrompt || '今日の血圧と服薬状況に基づくアドバイスをお願いします',
          sysBP: sysBloodPressure,
          diaBP: diaBloodPressure,
          pulse: pulseRate
        })
      });
      const data = await response.json();
      setAiNurseAdvice(data.reply);
      triggerToast(data.isRealAI ? '🤖 Gemini AI看護師のアドバイスを取得しました' : '🩺 AI看護師アドバイスを表示中');
    } catch (err) {
      console.error(err);
      setAiNurseAdvice('申し訳ありません。AI看護師との接続に失敗しました。');
    } finally {
      setIsAiLoading(false);
    }
  };

  // Toggle single medication or all
  const handleToggleMedicationItem = (id: string) => {
    setMedications(prev => prev.map(m => m.id === id ? { ...m, taken: !m.taken } : m));
    setMedicationTaken(true);
    setLineNotificationSent(true);
    setSeniorHealthPoints(prev => prev + 10); // Gain Health Points for自治体

    const med = medications.find(m => m.id === id);
    const medName = med ? med.name : 'お薬';

    const newLog = {
      id: Date.now(),
      time: '08:30 AM',
      title: `服薬完了: ${medName}`,
      desc: 'お母さんがボタンを押して正常に服薬完了しました。LINEに自動通知され、健康ポイント+10Pt獲得！',
      type: 'medication' as const
    };

    setActivityLogs(prev => [newLog, ...prev]);
    triggerToast(`「${medName}」服薬完了！LINE通知され、自治体健康ポイント +10Pt 獲得 💮`);
  };

  // Take all medications handler
  const handleTakeAllMedications = () => {
    setMedications(prev => prev.map(m => ({ ...m, taken: true })));
    setMedicationTaken(true);
    setLineNotificationSent(true);

    const newLog = {
      id: Date.now(),
      time: '08:30 AM',
      title: '本日のお薬 (全件服薬完了)',
      desc: 'お母さんが一括服薬完了ボタンを押しました。LINEに自動通知完了。',
      type: 'medication' as const
    };

    setActivityLogs(prev => [newLog, ...prev]);
    triggerToast('本日のお薬をすべて服薬完了！LINE通知されました 💮');
  };

  // Reset state for testing
  const handleResetMedication = () => {
    setMedications(prev => prev.map(m => ({ ...m, taken: false })));
    setMedicationTaken(false);
    setLineNotificationSent(false);
    triggerToast('服薬ステータスをリセットしました');
  };

  // Delete Medication Handler
  const handleDeleteMedication = (id: string) => {
    const medToDelete = medications.find(m => m.id === id);
    setMedications(prev => prev.filter(m => m.id !== id));
    
    if (editingMedId === id) setEditingMedId(null);

    const newLog = {
      id: Date.now(),
      time: 'たった今',
      title: `お薬削除: ${medToDelete?.name || ''}`,
      desc: '服薬リストからお薬が正常に削除されました。',
      type: 'medication' as const
    };
    setActivityLogs(prev => [newLog, ...prev]);
    triggerToast('お薬をリストから削除しました');
  };

  // Start Editing Medication
  const handleStartEditMedication = (med: { id: string; name: string; dosage: string; time: string }) => {
    setEditingMedId(med.id);
    setEditMedName(med.name);
    setEditMedDosage(med.dosage);
    setEditMedTime(med.time);
  };

  // Save Editing Medication
  const handleSaveEditMedication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMedId) return;

    setMedications(prev => prev.map(m => m.id === editingMedId ? {
      ...m,
      name: editMedName,
      dosage: editMedDosage,
      time: editMedTime
    } : m));

    setEditingMedId(null);
    triggerToast('お薬の情報を更新しました 💮');
  };

  // Pairing logic handler
  const handlePairFamily = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputPairingCode.trim().toUpperCase() === pairingCode || inputPairingCode.trim() === '8829') {
      setIsLinkedWithParent(true);
      triggerToast('🎉 お母さん (マサコ) とのLINE連携が完了しました！');
    } else {
      triggerToast('❌ 連携コードが正しくありません (デモコード: ANS-8829)');
    }
  };

  // Add Medication from Caregiver Dashboard
  const handleAddMedicationFromCaregiver = (e: React.FormEvent) => {
    e.preventDefault();
    const nameToUse = caregiverMedName.trim() || '降圧薬';
    const newMed = {
      id: Date.now().toString(),
      name: nameToUse,
      dosage: caregiverMedDosage,
      time: caregiverMedTime,
      photoUrl: caregiverMedPhoto,
      addedBy: '子女（代理登録）',
      taken: false
    };

    setMedications(prev => [newMed, ...prev]);
    setShowCaregiverAddModal(false);
    setCaregiverMedName('');

    const newLog = {
      id: Date.now(),
      time: 'たった今',
      title: `子女がお薬を追加: ${nameToUse}`,
      desc: `Caregiver Portal から ${nameToUse} (${caregiverMedDosage}) を追加しました。親の画面に即時反映。`,
      type: 'medication' as const
    };

    setActivityLogs(prev => [newLog, ...prev]);
    triggerToast(`お母さんのお薬「${nameToUse}」を追加しました！高齢者端に即時反映されました 💮`);
  };

  // Senior / Parent Profile Editing Handlers (高齢者・お母さんのアイコン＆お名前変更)
  const handleOpenSeniorProfileEdit = () => {
    setTempSeniorName(seniorName);
    setTempSeniorAvatarUrl(seniorAvatarUrl);
    setShowSeniorProfileEditModal(true);
  };

  const handleSaveSeniorProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempSeniorName.trim()) {
      setSeniorName(tempSeniorName.trim());
    }
    if (tempSeniorAvatarUrl) {
      setSeniorAvatarUrl(tempSeniorAvatarUrl);
    }
    setShowSeniorProfileEditModal(false);
    triggerToast(`高齢者（${tempSeniorName.trim() || seniorName}）のプロフィールを更新しました！ 👵`);
  };

  const handleFileUploadSeniorAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setTempSeniorAvatarUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handler: Add Hospital Visit Record
  const handleAddHospitalRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHospitalName.trim()) return;
    const newRecord = {
      id: Date.now().toString(),
      hospitalName: newHospitalName.trim(),
      department: newHospitalDepartment || '一般内科',
      date: newHospitalDate || '2026-08-20',
      time: newHospitalTime || '10:00 AM',
      doctor: newHospitalDoctor.trim() || '主治医',
      notes: newHospitalNotes.trim() || '定期受診',
      status: 'upcoming' as const
    };
    setHospitalRecords(prev => [newRecord, ...prev]);
    setShowAddHospitalRecordForm(false);
    setNewHospitalName('');
    setNewHospitalDoctor('');
    setNewHospitalNotes('');

    const newLog = {
      id: Date.now(),
      time: 'たった今',
      title: `通院予定追加: ${newRecord.hospitalName}`,
      desc: `${newRecord.date} ${newRecord.time} (${newRecord.department}) の通院予約を登録しました。`,
      type: 'medication' as const
    };
    setActivityLogs(prev => [newLog, ...prev]);
    triggerToast(`🏥 通院記録「${newRecord.hospitalName}」を追加しました！`);
  };

  // Handler: Delete Hospital Record
  const handleDeleteHospitalRecord = (id: string) => {
    setHospitalRecords(prev => prev.filter(r => r.id !== id));
    triggerToast('通院記録を削除しました 🗑️');
  };

  // Handler: Add Schedule Event
  const handleAddScheduleEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newScheduleTitle.trim()) return;
    const newEvent = {
      id: Date.now().toString(),
      title: newScheduleTitle.trim(),
      date: newScheduleDate || '2026-08-12',
      time: newScheduleTime || '11:00 AM',
      category: newScheduleCategory,
      notes: newScheduleNotes.trim() || ''
    };
    setScheduleEvents(prev => [newEvent, ...prev]);
    setShowAddScheduleForm(false);
    setNewScheduleTitle('');
    setNewScheduleNotes('');

    const newLog = {
      id: Date.now(),
      time: 'たった今',
      title: `予定追加: ${newEvent.title}`,
      desc: `${newEvent.date} ${newEvent.time} に予定を登録しました。`,
      type: 'medication' as const
    };
    setActivityLogs(prev => [newLog, ...prev]);
    triggerToast(`📅 予定「${newEvent.title}」を登録しました！`);
  };

  // Handler: Delete Schedule Event
  const handleDeleteScheduleEvent = (id: string) => {
    setScheduleEvents(prev => prev.filter(s => s.id !== id));
    triggerToast('予定を削除しました 🗑️');
  };

  // Add Medication from Manual Screen 2
  const handleAddMedicationManual = (e: React.FormEvent) => {
    e.preventDefault();
    const nameToUse = manualMedName.trim() || '日常薬';
    const newMed = {
      id: Date.now().toString(),
      name: nameToUse,
      dosage: manualMedDosage,
      time: manualMedTime,
      photoUrl: manualPhotoUrl,
      addedBy: manualRegistrant === 'caregiver' ? '子女登録' : '本人登録',
      taken: false
    };

    setMedications(prev => [newMed, ...prev]);
    setManualMedName('');

    const newLog = {
      id: Date.now(),
      time: 'たった今',
      title: `手動でお薬登録: ${nameToUse}`,
      desc: `${manualRegistrant === 'caregiver' ? 'ご家族' : 'ご本人'}により手動登録されました。`,
      type: 'medication' as const
    };

    setActivityLogs(prev => [newLog, ...prev]);
    triggerToast(`お薬「${nameToUse}」を登録しました！`);
    onNavigate('senior_home');
  };

  // Simulate spam call test
  const handleSimulateSpamCall = () => {
    const newLog = {
      id: Date.now(),
      time: '14:15 PM',
      title: '防犯AI - 疑似詐欺電話を遮断',
      desc: '「未納料金があります」と語るAI自動音声通話を判定・ブロックしました。',
      type: 'security' as const
    };
    setActivityLogs(prev => [newLog, ...prev]);
    triggerToast('【防犯AI】不審電話を自動ブロックし、LINE通知しました 🛡️');
  };

  const SHIBA_IMAGE_URL = "https://lh3.googleusercontent.com/aida-public/AB6AXuDSr_IgJ_y9OZVtDICVaiMpXa1bLjLq5rJ5sWPKP2K_E1V7lZ9W0Ma8oHal4KWBrOy5FcxSlRZ6hSmxs7rCU7bEmmUQzaPMXxb1FFe-vIAOGrk7ifwUKYN5xl0HPROCkEYdYGbqPMV-msg4WUytdR31WMMqdZddIzQ0vsD6PbgYMVZ5ZPKe4yGy3-Bg0xK_9UkiMYJ1oajkvltl-666YV2LVMPsBe_1MFEMKH_3Xo86m4hPMDNIjUv6PrHYptUIPF1W2v2fzxEh";
  const SHIBA_POLICE_URL = "https://lh3.googleusercontent.com/aida-public/AB6AXuC02zqZ9wAQjpFPDzqLeYLF0z_MqwpCA8WQqEia9Hb21FngxkxwKxozSBhi4E7aZARtZmS4Fl514RLMCoH6-6P7joHIo982akQ-CNRcYZmMZY33UuXpVxA90aOp19hupFAL74ArteSUOPqboK09yhV0IvqIXRnQIyHPg9lhCztky5sDTWrdOtRFHmmCFfQXW6N4evMaTdbJ2IgShJcZ7jx4z7o9VwKQU1_naM4snBhbZozJ8AnB7drvL7Czzse8-4KSmet1j2f8";
  const MOTHER_IMAGE_URL = "https://lh3.googleusercontent.com/aida-public/AB6AXuCA0Z6JdMFe4AwdVRb8tgnq-eug_XR2ieqOm1DLGq6rCZr5b1JErYSrv7FyFSxtSJYKBL-b1ZLl89Q9vg67-tWu0tIZCkg0xJvuCTAeQNj22-Ion-Rw7J8K5Kc7-pv0sj9IadY1x7VxsmauxxuSR4M7Lj6oR1KEGRQZPSuPvuDBFbzJL-cjXY4JFQ-1spQOOJTisof4f9iyZEgnfsnPtJoaDV2rcCGemIz7HI9cu1yQ272upYR_SLUkqlslLHgD9vH6-MUqaW4W";
  const STAMP_IMAGE_URL = "https://lh3.googleusercontent.com/aida-public/AB6AXuDAF8Xy5jad3VAMqJVJz5LgMvKF-VgSZqMWb5ogkFktx23M3VRBOvprZ4XhxYCjjIQtL6wj6mv3FFAkWfTh8xEceQaFzm0eblQQFW-C7rDezBo2vshI8oD3OU7HIYZU5f4hI8FLfX3SlVu77ZmZkOmRfGPvDkZBigz1SIHJFFUyKLHy_4P5Bz-TSt3jOVkcQE1zRtlDPDhnfFHRefAmh34K31C5Dc5oR1UXOx8jSiffhaG5LGn8EbngiQu04WuyaTG1Z6OcZV7g";
  const PRESCRIPTION_IMAGE_URL = "https://lh3.googleusercontent.com/aida-public/AB6AXuCUvnE8SzOvpMBXuQsukr5y5TGVHkReA5xTZKQr6zirYGJwGgWY2Grhy6X0meCRbRCbYWhmJUGMyBFSKCXakwecj3TaIHjFGJkpIlgynsXF962vbHIuyPDN6f9wjWXRqb_7-JnOgOsTWfKoo-9Yj-hKQgz8VsWEd7Fau0BAPuvFqGZHQwL2wIrg2xfZoFy3Cc52Tioakq3hpIAYmnAw-9hNwzuJayKH8QABgD3CawaGcNVeXnD8WX-UQvSTcskaR22FkZUfDhXd";
  const FAMILY_HERO_URL = "https://lh3.googleusercontent.com/aida-public/AB6AXuB0eeEx0NekAdKYhnJ3D6uh6jyBA5NJ5PHI4Nimg2kR1e5nt6NBWt-E9Ku_rzD42zM4hisJ924tDTWmTGU58JCQUJHKGyKM6kYUazubMCwqiXvZ9qv7Ra3qMwaEsNpj8X8xkI7GfZ-oFmNkKU25tj1TyrkkRH8i_meunaI1b2djkSlN78HY1dsqctpIkGKq7VCG394CvXnuoc1yhlUgbrrHtBCfFspt4tUgqM3pw9jN0UcrnWC0KhsJv7oUFgS-ecjhaGC4-oHa";

  return (
    <div className="flex flex-col items-center">
      {/* Phone Frame Device */}
      <div className="relative w-[380px] sm:w-[410px] h-[830px] bg-[#1A1C1C] rounded-[52px] p-3 shadow-2xl border-4 border-[#2F3131] flex flex-col justify-between overflow-hidden select-none">
        {/* iOS Dynamic Island / Notch */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-50 flex items-center justify-between px-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#111] border border-gray-800"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-[#0d271f] border border-[#326853]"></div>
        </div>

        {/* Screen Container */}
        <div className={`relative w-full h-full bg-[#F9F9F9] rounded-[42px] overflow-hidden flex flex-col pt-10 pb-6 transition-all duration-200 ${accessibilityLargeText ? 'text-lg' : 'text-base'}`}>
          
          {/* Toast Notification Banner inside Phone */}
          {showToast && (
            <div className="absolute top-12 left-4 right-4 bg-[#326853] text-white px-4 py-2.5 rounded-2xl shadow-xl z-50 flex items-center justify-between text-xs font-bold border-2 border-[#88C0A7] animate-bounce">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-[#88C0A7]" />
                <span>{showToast}</span>
              </div>
            </div>
          )}

          {/* Child LINE Floating Real-Time Push Notification Toast */}
          {childLinePushToast && (
            <div className="absolute top-12 left-3 right-3 bg-[#06C755] text-white p-3 rounded-2xl shadow-2xl z-50 border-2 border-white animate-fade-in text-left">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-1.5 font-bold text-xs">
                  <span className="bg-white text-[#06C755] px-1.5 py-0.2 rounded font-black text-[10px]">LINE</span>
                  <span className="truncate max-w-[200px]">{childLinePushToast.title}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setChildLinePushToast(null)}
                  className="text-white hover:text-gray-200 font-bold text-xs px-1"
                >
                  ✕
                </button>
              </div>
              <p className="text-[10px] text-white/95 mt-1 leading-snug font-medium">
                {childLinePushToast.detail}
              </p>
            </div>
          )}

          {/* iOS Status Bar */}
          <div className="absolute top-0 left-0 right-0 h-10 px-7 flex items-center justify-between text-xs font-bold text-gray-800 z-40 bg-[#F9F9F9]/80 backdrop-blur-sm">
            <span>09:41</span>
            <div className="flex items-center space-x-1.5">
              <span className="material-symbols-outlined text-sm">signal_cellular_4_bar</span>
              <span className="material-symbols-outlined text-sm">wifi</span>
              <span className="material-symbols-outlined text-sm">battery_full</span>
            </div>
          </div>

          {/* SCREEN CONTENT AREA */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden">

            {/* SCREEN 1: 老年人首页 (SENIOR HOME - DYNAMIC MEDICATION LIST) */}
            {currentScreen === 'senior_home' && (
              <div className="p-5 space-y-6 pb-24">
                {/* Header App Bar */}
                <div className="flex items-center justify-between border-b-2 border-[#C0C9C2] pb-3">
                  <div className="flex items-center space-x-2.5">
                    <img src={SHIBA_IMAGE_URL} alt="Mascot" className="w-10 h-10 rounded-full border-2 border-[#88C0A7] object-cover" />
                    <h1 className="text-xl font-bold text-[#326853] font-serif">安心ライフ</h1>
                  </div>
                  <button onClick={() => onNavigate('legal')} className="p-2 hover:bg-[#F3F3F3] rounded-full text-[#326853]">
                    <Settings className="w-6 h-6" />
                  </button>
                </div>

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

                {/* ANTI-FRAUD GUARDIAN PROTECTION TOGGLE & STATUS CARD (首页防诈防护开启控制) */}
                <div className={`rounded-[22px] p-4 border-2 shadow-lg transition-all space-y-3.5 ${
                  isProtectionActive 
                    ? 'bg-[#102B21] text-white border-[#326853]' 
                    : 'bg-gray-800 text-gray-200 border-gray-700'
                }`}>
                  {/* Title & Interactive Big Protection Toggle Switch */}
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

                    {/* Big Interactive Toggle Switch */}
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

                  {/* Status Banner */}
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

                  {/* Quick Action Simulation Buttons */}
                  <div className="space-y-1.5 pt-0.5">
                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        type="button"
                        onClick={handleSimulateLowInterferenceHighRiskCall}
                        className="py-2 px-1.5 bg-red-900/80 hover:bg-red-800 text-white font-bold text-[10px] rounded-lg border border-red-500/80 flex items-center justify-center space-x-1 active:scale-95 transition-all shadow-xs"
                      >
                        <span>📞 模拟高风险来电</span>
                        <span className="text-[8px] bg-red-950 px-1 rounded text-red-200">静默推子女</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleSimulateLowInterferenceHighRiskSms}
                        className="py-2 px-1.5 bg-amber-900/80 hover:bg-amber-800 text-white font-bold text-[10px] rounded-lg border border-amber-500/80 flex items-center justify-center space-x-1 active:scale-95 transition-all shadow-xs"
                      >
                        <span>📩 模拟高风险短信</span>
                        <span className="text-[8px] bg-amber-950 px-1 rounded text-amber-200">静默推子女</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Hanamaru Stamp Received Notification from Caregiver */}
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

                {/* Senior Health Routine & Medication Compliance Tool Banner */}
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
                      className="text-xs bg-[#88C0A7]/20 text-[#164F3C] font-bold px-2.5 py-1 rounded-lg border border-[#88C0A7] hover:bg-[#88C0A7]/40"
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

                          {/* Action Row: Voice Readout & Edit/Delete */}
                          <div className="flex items-center space-x-3 pt-1 text-xs">
                            <button
                              onClick={() => handleSpeakMedication(med.name, med.dosage)}
                              className={`font-bold flex items-center space-x-1 px-2 py-0.5 rounded-md transition-all ${
                                isSpeakingMed === med.name ? 'bg-amber-100 text-amber-800 animate-pulse' : 'bg-[#EBF5F0] text-[#326853] hover:bg-[#88C0A7]/30'
                              }`}
                            >
                              <span>🔊 音声で聞き直す</span>
                            </button>
                            <span className="text-gray-300">|</span>
                            <button
                              onClick={() => handleStartEditMedication(med)}
                              className="text-[#326853] font-bold hover:underline"
                            >
                              ✏️ 編集
                            </button>
                            <span className="text-gray-300">|</span>
                            <button
                              onClick={() => handleDeleteMedication(med.id)}
                              className="text-red-500 font-bold hover:underline"
                            >
                              🗑 削除
                            </button>
                          </div>

                          {/* Dietary & Food Precautions (药品饮食禁忌) */}
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

                          {/* Drug Interactions (药品相互作用提示) */}
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

                        {/* Optional Pill Box Photo Thumbnail (Visual Cover) */}
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

                      {/* Action Button */}
                      <button
                        onClick={() => handleToggleMedicationItem(med.id)}
                        className={`w-full h-14 rounded-[18px] font-bold text-white flex items-center justify-center space-x-2 transition-all shadow-[0_3px_0_0_#17503C] active:translate-y-0.5 active:shadow-none ${
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

                  {/* Batch Complete All Button */}
                  {medications.some(m => !m.taken) && (
                    <button
                      onClick={handleTakeAllMedications}
                      className="w-full h-12 bg-[#F4DFCB] text-[#241A0E] font-bold text-xs rounded-[18px] border-2 border-[#6B5C4C]/30 flex items-center justify-center space-x-2 shadow-sm active:scale-95"
                    >
                      <CheckCircle className="w-4 h-4 text-[#326853]" />
                      <span>今日のお薬をまとめて服薬完了にする</span>
                    </button>
                  )}

                  {medications.every(m => m.taken) && (
                    <button
                      onClick={handleResetMedication}
                      className="w-full text-center text-xs text-[#326853] font-bold underline hover:text-[#164F3C] pt-1"
                    >
                      テスト用：服薬ステータスをリセット
                    </button>
                  )}
                </div>

                {/* LINE Feedback Banner */}
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
            )}

            {/* SCREEN 2: 极简手動/家属録入頁 (MINIMAL MANUAL MEDICATION ENTRY - NO AI) */}
            {currentScreen === 'scanner' && (
              <div className="p-5 space-y-5 pb-24">
                <div className="flex items-center justify-between border-b-2 border-[#C0C9C2] pb-3">
                  <button onClick={() => onNavigate('senior_home')} className="p-1 rounded-full text-[#326853]">
                    <ArrowLeft className="w-6 h-6" />
                  </button>
                  <h1 className="text-lg font-bold text-[#326853]">お薬の手動登録</h1>
                  <div className="w-6"></div>
                </div>

                {/* Electronic Prescription QR Integration Card (Dimension 1) */}
                <div className="bg-white rounded-[20px] p-4 border-2 border-[#88C0A7] shadow-sm space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#164F3C] flex items-center space-x-1.5">
                      <Sparkles className="w-4 h-4 text-[#326853]" />
                      <span>電子処方箋・調剤薬局 QR 連携</span>
                    </span>
                    <span className="text-[10px] bg-[#88C0A7]/30 text-[#164F3C] font-bold px-2 py-0.5 rounded-md">
                      マイナ保険証対応
                    </span>
                  </div>
                  <p className="text-[11px] text-[#404944] leading-relaxed">
                    調剤薬局で発行された電子処方箋の QR コードをかざすと、薬名・用量が正確に一括自動反映されます。
                  </p>
                  <button
                    type="button"
                    onClick={handleScanElectronicPrescriptionQR}
                    className="w-full py-2.5 bg-[#88C0A7]/20 border-2 border-[#88C0A7] text-[#164F3C] font-bold text-xs rounded-xl hover:bg-[#88C0A7]/40 flex items-center justify-center space-x-2 transition-all"
                  >
                    <span>📱 処方箋 QR コードをかざして自動入力</span>
                  </button>
                </div>

                {/* NO AI Notice Banner */}
                <div className="bg-[#EBF5F0] border-2 border-[#88C0A7] rounded-[20px] p-4 text-xs space-y-1.5 text-[#164F3C]">
                  <div className="flex items-center space-x-2 font-bold text-sm text-[#326853]">
                    <Pill className="w-4 h-4" />
                    <span>安心・確実な手動登録</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-[#404944]">
                    AI解析による誤判定の心配がありません。ご家族やご本人が正確なお薬名と用法を確実に指定できます。
                  </p>
                </div>

                {/* Manual Entry Form */}
                <form onSubmit={handleAddMedicationManual} className="bg-white rounded-[20px] p-5 border-2 border-[#6B5C4C] shadow-sm space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1A1C1C] mb-1">
                      お薬の名前 <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder="例: 降圧薬 (アムロジピン)" 
                      value={manualMedName}
                      onChange={(e) => setManualMedName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border-2 border-[#C0C9C2] text-sm font-bold text-[#1A1C1C] focus:border-[#326853] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#1A1C1C] mb-1">飲むタイミング</label>
                      <select 
                        value={manualMedDosage}
                        onChange={(e) => setManualMedDosage(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border-2 border-[#C0C9C2] text-xs font-bold text-[#1A1C1C] focus:border-[#326853] focus:outline-none bg-white"
                      >
                        <option value="朝食後 1錠">朝食後 1錠</option>
                        <option value="昼食後 1錠">昼食後 1錠</option>
                        <option value="夕食後 1錠">夕食後 1錠</option>
                        <option value="就寝前 1錠">就寝前 1錠</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#1A1C1C] mb-1">予定時間</label>
                      <input 
                        type="text" 
                        value={manualMedTime}
                        onChange={(e) => setManualMedTime(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border-2 border-[#C0C9C2] text-xs font-bold text-[#1A1C1C] focus:border-[#326853] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1A1C1C] mb-1.5">登録者の区分</label>
                    <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                      <button
                        type="button"
                        onClick={() => setManualRegistrant('caregiver')}
                        className={`py-2 rounded-xl border-2 transition-all ${
                          manualRegistrant === 'caregiver' ? 'bg-[#326853] text-white border-[#326853]' : 'bg-[#F3F3F3] text-[#404944] border-[#C0C9C2]'
                        }`}
                      >
                        👨‍👩‍👧 ご家族 (子女)
                      </button>
                      <button
                        type="button"
                        onClick={() => setManualRegistrant('senior')}
                        className={`py-2 rounded-xl border-2 transition-all ${
                          manualRegistrant === 'senior' ? 'bg-[#326853] text-white border-[#326853]' : 'bg-[#F3F3F3] text-[#404944] border-[#C0C9C2]'
                        }`}
                      >
                        👴 ご本人 (お母さん)
                      </button>
                    </div>
                  </div>

                  {/* Visual Cover Photo Selection (No AI Parsing) */}
                  <div className="border-t border-[#C0C9C2] pt-3">
                    <label className="block text-xs font-bold text-[#1A1C1C] mb-1">
                      薬箱のカバー写真 (視覚的な目印用)
                    </label>
                    <p className="text-[10px] text-gray-500 mb-2">
                      ※AI解析は行いません。お母さんがカードを見て一目で薬箱を識別できるように写真を登録できます。
                    </p>

                    <div className="flex items-center space-x-3 bg-[#F9F9F9] p-3 rounded-xl border border-[#C0C9C2]">
                      <img src={manualPhotoUrl} alt="Pill Box Cover" className="w-14 h-14 rounded-lg object-cover border border-[#88C0A7]" />
                      <div className="flex-1 space-y-1">
                        <p className="text-xs font-bold text-[#326853]">薬箱サンプルカバー設定済み</p>
                        <button
                          type="button"
                          onClick={() => triggerToast("カメラ撮影モード (疑似) : 写真を更新しました")}
                          className="text-[11px] text-[#326853] font-bold underline hover:text-[#164F3C]"
                        >
                          📷 薬箱の写真を撮り直す
                        </button>
                      </div>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full h-14 bg-[#326853] hover:bg-[#275342] text-white font-bold text-base rounded-[20px] shadow-md border-b-4 border-[#164F3C] flex items-center justify-center space-x-2 active:translate-y-1 active:border-b-0 transition-all pt-1"
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span>このお薬を登録する</span>
                  </button>
                </form>
              </div>
            )}

            {/* SCREEN 3: 子女端看板 (CAREGIVER DASHBOARD - FAMILY OVERVIEW) */}
            {currentScreen === 'caregiver_dashboard' && (
              <div className="p-5 space-y-4 pb-24">
                <div className="flex items-center justify-between border-b-2 border-[#C0C9C2] pb-3">
                  <div className="flex items-center space-x-2">
                    <img src={seniorAvatarUrl} alt="Mother" className="w-9 h-9 rounded-full border-2 border-[#88C0A7] object-cover" />
                    <h1 className="text-lg font-bold text-[#326853] font-serif">Caregiver Dashboard</h1>
                  </div>
                  <button 
                    onClick={() => setShowCaregiverSettingsModal(true)}
                    className="p-2 text-[#326853] hover:bg-[#88C0A7]/20 rounded-full transition-all active:scale-95"
                    title="子女端設定"
                  >
                    <Settings className="w-5 h-5" />
                  </button>
                </div>

                {/* Parent Real-Time Status Card (Click to Edit Senior Profile) */}
                <div className="bg-white rounded-[20px] p-4 border-2 border-[#C0C9C2] shadow-sm space-y-3.5 relative overflow-hidden">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-2.5">
                    <button 
                      onClick={handleOpenSeniorProfileEdit}
                      className="flex items-center space-x-3 text-left group hover:bg-[#88C0A7]/10 p-1.5 -m-1.5 rounded-xl transition-all flex-1"
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
                      className="bg-[#EBF5F0] hover:bg-[#d5eadf] text-[#164F3C] p-1.5 rounded-lg flex items-center justify-center space-x-1 border border-[#88C0A7]/50 active:scale-95 transition-all text-left"
                    >
                      <CheckCircle className="w-3 h-3 text-[#326853] shrink-0" />
                      <span className="truncate">服薬: {medications.every(m => m.taken) ? '全完了' : `${medications.filter(m => m.taken).length}/${medications.length}`}</span>
                    </button>

                    <button 
                      type="button"
                      onClick={() => setShowBloodPressureModal(true)}
                      className="bg-rose-50 hover:bg-rose-100 text-rose-900 p-1.5 rounded-lg flex items-center justify-center space-x-1 border border-rose-200 active:scale-95 transition-all text-left group"
                      title="タップして血圧を記録・編集"
                    >
                      <span className="truncate">🩺 {sysBloodPressure}/{diaBloodPressure}</span>
                      <span className="text-[8px] bg-rose-200 text-rose-900 px-1 rounded font-bold">編集</span>
                    </button>

                    <button 
                      type="button"
                      onClick={() => setShowStepsModal(true)}
                      className="bg-amber-50 hover:bg-amber-100 text-amber-900 p-1.5 rounded-lg flex items-center justify-center space-x-1 border border-amber-200 active:scale-95 transition-all text-left group"
                      title="タップしてiOS Apple Health同期を確認"
                    >
                      <span className="truncate">👟 {dailySteps.toLocaleString()}步</span>
                      <span className="text-[8px] bg-amber-200 text-amber-900 px-1 rounded font-bold">iOS</span>
                    </button>
                  </div>

                  {/* Quick Call Actions */}
                  <div className="grid grid-cols-2 gap-2.5 pt-1">
                    <button onClick={() => handleStartCall('phone', seniorName, seniorAvatarUrl)} className="h-10 bg-[#F4DFCB] hover:bg-[#ebd0b7] text-[#241A0E] font-bold text-xs rounded-xl border border-[#6B5C4C]/20 flex items-center justify-center space-x-1.5 active:scale-95 transition-all shadow-xs">
                      <Phone className="w-3.5 h-3.5 text-[#326853]" />
                      <span>電話かける</span>
                    </button>
                    <button onClick={() => handleStartCall('video', seniorName, seniorAvatarUrl)} className="h-10 bg-[#326853] hover:bg-[#275342] text-white font-bold text-xs rounded-xl flex items-center justify-center space-x-1.5 shadow-sm active:scale-95 transition-all">
                      <Video className="w-3.5 h-3.5" />
                      <span>ビデオ通話</span>
                    </button>
                  </div>
                </div>

                {/* DAUGHTER REAL-TIME HIGH-RISK PUSH STREAM (0-INTERFERENCE FOR SENIOR, AUTO PUSH TO DAUGHTER) */}
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
                            className="py-1.5 bg-[#06C755] hover:bg-[#05b34c] text-white font-bold text-[10px] rounded-lg text-center active:scale-95 transition-all shadow-xs"
                          >
                            📞 1键回拨母亲确认
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              triggerToast(`已将 ${item.callerOrSender} 加入全局自动拉黑数据库！`);
                            }}
                            className="py-1.5 bg-gray-800 hover:bg-gray-900 text-white font-bold text-[10px] rounded-lg text-center active:scale-95 transition-all shadow-xs"
                          >
                            🚫 加入黑名单
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* OPTIMIZED FUNCTION SHORTCUT GRID (功能分流导航) */}
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    onClick={() => onNavigate('security_alert')}
                    className="bg-white p-3.5 rounded-[18px] border-2 border-[#E57373] hover:bg-red-50/40 text-left space-y-1.5 shadow-xs transition-all active:scale-98"
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
                    className="bg-white p-3.5 rounded-[18px] border-2 border-[#88C0A7] hover:bg-emerald-50/40 text-left space-y-1.5 shadow-xs transition-all active:scale-98"
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
                    className="w-full h-11 bg-[#E0A96D] hover:bg-[#c99257] text-white font-bold text-xs rounded-xl flex items-center justify-center space-x-2 shadow-xs active:scale-95 transition-all"
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
                      className="px-3 py-1.5 bg-[#326853] text-white font-bold text-[10px] rounded-lg"
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
                    className="bg-white hover:bg-[#88C0A7]/10 p-3 rounded-2xl border-2 border-[#C0C9C2] hover:border-[#326853] flex items-center justify-between transition-all active:scale-95 text-left shadow-2xs group"
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

                  <button
                    onClick={() => setShowScheduleModal(true)}
                    className="bg-white hover:bg-[#88C0A7]/10 p-3 rounded-2xl border-2 border-[#C0C9C2] hover:border-[#326853] flex items-center justify-between transition-all active:scale-95 text-left shadow-2xs group"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="p-1.5 bg-[#88C0A7]/20 text-[#164F3C] rounded-lg group-hover:bg-[#326853] group-hover:text-white transition-colors">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="block font-bold text-xs text-[#164F3C]">予定表</span>
                        <span className="text-[10px] text-gray-500 font-normal">{scheduleEvents.length} 件予定 &gt;</span>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* SCREEN: お薬・処方箋リモート管理 (MEDICATION MANAGEMENT) */}
            {currentScreen === 'medication' && (
              <div className="p-5 space-y-4 pb-24 text-left">
                {/* Screen Header */}
                <div className="flex items-center justify-between border-b-2 border-[#C0C9C2] pb-3">
                  <button onClick={() => onNavigate('caregiver_dashboard')} className="p-1 rounded-full text-[#326853]">
                    <ArrowLeft className="w-6 h-6" />
                  </button>
                  <h1 className="text-base font-bold text-[#164F3C] flex items-center space-x-1.5">
                    <Pill className="w-5 h-5 text-[#326853]" />
                    <span>お薬・処方箋リモート管理</span>
                  </h1>
                  <span className="text-[10px] bg-[#88C0A7]/30 text-[#164F3C] font-bold px-2 py-0.5 rounded-full border border-[#88C0A7]">
                    リアルタイム同期
                  </span>
                </div>

                {/* PARENT MEDICATION MANAGEMENT CARD */}
                <div className="bg-white rounded-[20px] p-4 border-2 border-[#88C0A7] shadow-xs space-y-3.5">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                    <div>
                      <h2 className="font-bold text-sm text-[#164F3C]">お母さん (マサコ) の服用中のお薬</h2>
                      <p className="text-[10px] text-gray-500">登録件数: {medications.length} 件</p>
                    </div>
                    <button 
                      onClick={() => setShowCaregiverAddModal(!showCaregiverAddModal)}
                      className="px-3 py-1.5 bg-[#326853] hover:bg-[#275342] text-white font-bold text-xs rounded-xl flex items-center space-x-1 shadow-xs active:scale-95"
                    >
                      <Pill className="w-3.5 h-3.5" />
                      <span>＋ お薬を追加</span>
                    </button>
                  </div>

                  {/* Add Medication Form / Modal */}
                  {showCaregiverAddModal && (
                    <form onSubmit={handleAddMedicationFromCaregiver} className="bg-[#EBF5F0] border-2 border-[#326853] rounded-2xl p-3.5 space-y-3 animate-fade-in text-xs">
                      <div className="flex items-center justify-between border-b border-[#88C0A7] pb-2">
                        <span className="font-bold text-[#164F3C] text-xs">💊 親のお薬をリモート追加</span>
                        <button type="button" onClick={() => setShowCaregiverAddModal(false)} className="text-gray-500 hover:text-gray-700 font-bold">✕</button>
                      </div>

                      <div>
                        <label className="block font-bold text-gray-700 mb-1">お薬の名称 (例: 降圧薬)</label>
                        <input 
                          type="text" 
                          required
                          placeholder="例: 降圧薬 (アムロジピン 5mg)"
                          value={caregiverMedName}
                          onChange={(e) => setCaregiverMedName(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-gray-300 font-bold text-[#1A1C1C] focus:border-[#326853] focus:outline-none bg-white"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block font-bold text-gray-700 mb-1">服用タイミング</label>
                          <select 
                            value={caregiverMedDosage}
                            onChange={(e) => setCaregiverMedDosage(e.target.value)}
                            className="w-full px-2.5 py-2 rounded-xl border border-gray-300 font-bold text-[#1A1C1C] focus:border-[#326853] focus:outline-none bg-white"
                          >
                            <option value="朝食後 1錠">朝食後 1錠</option>
                            <option value="昼食後 1錠">昼食後 1錠</option>
                            <option value="夕食後 1錠">夕食後 1錠</option>
                            <option value="就寝前 1錠">就寝前 1錠</option>
                          </select>
                        </div>

                        <div>
                          <label className="block font-bold text-gray-700 mb-1">予定時間</label>
                          <input 
                            type="text" 
                            value={caregiverMedTime}
                            onChange={(e) => setCaregiverMedTime(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl border border-gray-300 font-bold text-[#1A1C1C] focus:border-[#326853] focus:outline-none bg-white"
                          />
                        </div>
                      </div>

                      <button 
                        type="submit"
                        className="w-full py-2 bg-[#326853] text-white font-bold text-xs rounded-xl shadow-xs hover:bg-[#275342] transition-all"
                      >
                        保存して親の画面に即時反映
                      </button>
                    </form>
                  )}

                  {/* Edit Medication Inline Form */}
                  {editingMedId && (
                    <form onSubmit={handleSaveEditMedication} className="bg-amber-50 border-2 border-amber-400 rounded-2xl p-3.5 space-y-3 animate-fade-in text-xs">
                      <div className="flex items-center justify-between border-b border-amber-300 pb-2">
                        <span className="font-bold text-amber-900 text-xs">✏️ お薬の編集</span>
                        <button type="button" onClick={() => setEditingMedId(null)} className="text-gray-500 font-bold">✕</button>
                      </div>

                      <div>
                        <label className="block font-bold text-gray-700 mb-1">お薬の名称</label>
                        <input 
                          type="text" 
                          required
                          value={editMedName}
                          onChange={(e) => setEditMedName(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-gray-300 font-bold text-[#1A1C1C] bg-white"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block font-bold text-gray-700 mb-1">服用タイミング</label>
                          <input 
                            type="text" 
                            value={editMedDosage}
                            onChange={(e) => setEditMedDosage(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl border border-gray-300 font-bold text-[#1A1C1C] bg-white"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-gray-700 mb-1">時間</label>
                          <input 
                            type="text" 
                            value={editMedTime}
                            onChange={(e) => setEditMedTime(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl border border-gray-300 font-bold text-[#1A1C1C] bg-white"
                          />
                        </div>
                      </div>

                      <button type="submit" className="w-full py-2 bg-amber-600 text-white font-bold text-xs rounded-xl">
                        変更を保存
                      </button>
                    </form>
                  )}

                  {/* List of active parent medications */}
                  <div className="space-y-2 pt-1">
                    {medications.map((m) => (
                      <div key={m.id} className="bg-[#FAF8F5] p-3 rounded-xl border border-gray-200 flex items-center justify-between text-xs">
                        <div className="space-y-0.5">
                          <p className="font-bold text-[#1A1C1C]">{m.name}</p>
                          <p className="text-[10px] text-gray-500">{m.dosage} ({m.time}) · {m.addedBy}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                            m.taken ? 'bg-[#88C0A7] text-[#164F3C]' : 'bg-[#FFDAD6] text-[#BA1A1A]'
                          }`}>
                            {m.taken ? '服薬完了' : '未服薬'}
                          </span>
                          <button 
                            onClick={() => handleStartEditMedication(m)}
                            className="text-[#326853] font-bold hover:underline text-[11px]"
                          >
                            ✏️
                          </button>
                          <button 
                            onClick={() => handleDeleteMedication(m.id)}
                            className="text-red-500 font-bold hover:underline text-[11px]"
                          >
                            🗑
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Electronic Prescription Scan Simulator */}
                  <button
                    onClick={handleScanElectronicPrescriptionQR}
                    className="w-full py-2.5 bg-[#EBF5F0] hover:bg-[#d8ebd2] text-[#164F3C] font-bold text-xs rounded-xl border border-[#88C0A7] flex items-center justify-center space-x-1.5 transition-all"
                  >
                    <span>📷 電子処方箋 QR スキャン取込 (調剤薬局連携)</span>
                  </button>
                </div>

                {/* FAMILY PHARMACY & RESIDUAL DRUG REDUCTION */}
                <div className="bg-white rounded-[20px] p-4 border-2 border-[#88C0A7] shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#164F3C] flex items-center space-x-1.5">
                      <Pill className="w-4 h-4 text-[#326853]" />
                      <span>かかりつけ調剤薬局＆残薬解消連携</span>
                    </span>
                    <span className="text-[10px] bg-[#88C0A7]/30 text-[#164F3C] font-bold px-2 py-0.5 rounded-md">
                      日本調剤・ウエルシア連携
                    </span>
                  </div>

                  <div className="bg-[#F9F9F9] p-3 rounded-xl border border-gray-200 text-xs space-y-1">
                    <div className="flex justify-between font-bold text-[#1A1C1C]">
                      <span>提携調剤薬局:</span>
                      <span className="text-[#326853]">日本調剤 杉並西荻窪薬局</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>今月の残薬調整節減額:</span>
                      <span className="font-bold text-[#164F3C]">¥14,200 (医療費抑制貢献)</span>
                    </div>
                  </div>

                  <button
                    onClick={() => triggerToast("かかりつけ薬局へLINEで残薬情報と処方箋予約を送信しました 🏥")}
                    className="w-full py-2.5 bg-[#06C755] text-white font-bold text-xs rounded-xl flex items-center justify-center space-x-1.5 shadow-xs hover:bg-[#05b34c]"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>残薬確認とLINE処方箋調剤予約を送信</span>
                  </button>
                </div>

                {/* DOCTOR PDF REPORT EXPORT */}
                <button 
                  onClick={() => alert("医師に見せる服薬・健康レポート(PDF)を正常に作成しました")}
                  className="w-full h-12 bg-[#326853] text-white font-bold text-xs rounded-xl flex items-center justify-center space-x-2 shadow-xs active:scale-98"
                >
                  <FileText className="w-4 h-4" />
                  <span>医師に見せる服薬レポートを出力 (PDF)</span>
                </button>
              </div>
            )}

            {/* SCREEN 4: 角色选择 & LINE ログ displayed (ONBOARDING) */}
            {currentScreen === 'onboarding' && (
              <div className="p-5 space-y-6 pb-24 text-center">
                <div className="pt-4 space-y-2">
                  <img src={SHIBA_IMAGE_URL} alt="Mascot" className="w-28 h-28 mx-auto object-contain" />
                  <h1 className="text-2xl font-bold text-[#1A1C1C]">安心ライフへようこそ</h1>
                  <p className="text-sm text-gray-600">毎日を、もっと安全に。<br/>心豊かな暮らしをサポートします。</p>
                </div>

                <div className="space-y-3 pt-2 text-left">
                  <p className="text-center font-bold text-sm text-[#326853]">どちらの役割で使いますか？</p>

                  <div 
                    onClick={() => setSelectedRole('senior')}
                    className={`p-4 rounded-[20px] border-3 cursor-pointer flex items-center space-x-4 transition-all ${
                      selectedRole === 'senior' ? 'bg-[#B5EFD4] border-[#326853]' : 'bg-[#F3F3F3] border-[#C0C9C2]'
                    }`}
                  >
                    <div className="w-14 h-14 rounded-full bg-[#88C0A7] flex items-center justify-center shrink-0">
                      <UserCheck className="w-8 h-8 text-[#164F3C]" />
                    </div>
                    <div>
                      <p className="font-bold text-lg text-[#1A1C1C]">私が使います</p>
                      <p className="text-xs text-gray-600">大きい文字でお薬管理</p>
                    </div>
                  </div>

                  <div 
                    onClick={() => setSelectedRole('caregiver')}
                    className={`p-4 rounded-[20px] border-3 cursor-pointer flex items-center space-x-4 transition-all ${
                      selectedRole === 'caregiver' ? 'bg-[#F4DFCB] border-[#326853]' : 'bg-[#F3F3F3] border-[#C0C9C2]'
                    }`}
                  >
                    <div className="w-14 h-14 rounded-full bg-[#F4DFCB] flex items-center justify-center shrink-0">
                      <Heart className="w-8 h-8 text-[#716252]" />
                    </div>
                    <div>
                      <p className="font-bold text-lg text-[#1A1C1C]">家族のサポート</p>
                      <p className="text-xs text-gray-600">離れた親を見守る</p>
                    </div>
                  </div>
                </div>

                {/* Optional Caregiver Pairing Code Section */}
                {selectedRole === 'caregiver' && (
                  <div className="bg-white p-4 rounded-[20px] border-2 border-[#6B5C4C] space-y-2 text-left animate-fade-in">
                    <label className="block text-xs font-bold text-[#1A1C1C]">
                      親の端末の6桁連携コード (任意)
                    </label>
                    <div className="flex space-x-2">
                      <input 
                        type="text" 
                        placeholder="例: ANS-8829" 
                        value={inputPairingCode}
                        onChange={(e) => setInputPairingCode(e.target.value)}
                        className="flex-1 px-3 py-2 rounded-xl border-2 border-[#C0C9C2] text-xs font-mono font-bold uppercase focus:border-[#326853] focus:outline-none"
                      />
                      <button 
                        type="button"
                        onClick={handlePairFamily}
                        className="px-3 py-2 bg-[#326853] text-white font-bold text-xs rounded-xl"
                      >
                        検証
                      </button>
                    </div>
                    <p className="text-[10px] text-gray-500">
                      ※親の画面の「家族LINE連携」に表示されている6桁のコードです。
                    </p>
                  </div>
                )}

                <div className="space-y-3 pt-2">
                  <button 
                    onClick={() => {
                      if (selectedRole === 'senior') onNavigate('senior_home');
                      else onNavigate('caregiver_dashboard');
                    }}
                    className="w-full h-14 bg-[#06C755] text-white font-bold text-lg rounded-[20px] flex items-center justify-center space-x-2 shadow-md active:translate-y-0.5"
                  >
                    <MessageCircle className="w-6 h-6 fill-white text-[#06C755]" />
                    <span>LINEでログインして始める</span>
                  </button>

                  <button 
                    onClick={() => onNavigate('senior_home')}
                    className="text-xs text-gray-500 font-bold hover:underline"
                  >
                    あとで設定する
                  </button>
                </div>
              </div>
            )}

            {/* SCREEN 5: 服药履历 & 花丸 Stamp (HISTORY) */}
            {currentScreen === 'history' && (
              <div className="p-5 space-y-5 pb-24">
                <div className="flex items-center justify-between border-b-2 border-[#C0C9C2] pb-3">
                  <button onClick={() => onNavigate('senior_home')} className="p-1 rounded-full text-[#326853]">
                    <ArrowLeft className="w-6 h-6" />
                  </button>
                  <h1 className="text-lg font-bold text-[#326853]">服薬履歴・カレンダー</h1>
                  <div className="w-6"></div>
                </div>

                {/* Attendance Rate Banner */}
                <div className="bg-[#F4DFCB]/40 p-4 rounded-[20px] border-2 border-[#6B5C4C]/20 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-[#6B5C4C] uppercase">ATTENDANCE RATE</p>
                      <p className="text-2xl font-bold text-[#241A0E]">
                        今月の服薬率: {medications.every(m => m.taken) ? '100%' : '96%'}
                      </p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-[#326853]" />
                  </div>
                  <div className="w-full h-3 bg-white rounded-full overflow-hidden border border-gray-200">
                    <div className="h-full bg-[#88C0A7] transition-all duration-500" style={{ width: medications.every(m => m.taken) ? '100%' : '96%' }}></div>
                  </div>
                  <p className="text-xs text-gray-600 font-medium">
                    {medications.every(m => m.taken) ? '素晴らしい！本日のお薬もすべて服薬完了しました！' : '素晴らしいですね！毎日欠かさず続けられています。'}
                  </p>
                </div>

                {/* Calendar Grid with Hanamaru Stamps */}
                <div className="bg-white rounded-[20px] border-2 border-[#C0C9C2] p-3 text-center">
                  <p className="font-bold text-sm text-[#326853] mb-2">2026年 7月</p>
                  <div className="grid grid-cols-7 text-xs font-bold text-gray-500 border-b pb-1 mb-2">
                    <span className="text-red-500">日</span><span>月</span><span>火</span><span>水</span><span>木</span><span>金</span><span className="text-blue-500">土</span>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-xs">
                    {/* Empty offset for Wednesday start */}
                    <div></div><div></div><div></div>
                    {Array.from({ length: 28 }).map((_, i) => {
                      const dayNumber = i + 1;
                      const isToday24th = dayNumber === 24;
                      const hasStamp = isToday24th ? medications.every(m => m.taken) : dayNumber !== 16;
                      return (
                        <div key={i} className={`h-10 border rounded-lg flex flex-col items-center justify-center relative ${isToday24th ? 'border-[#326853] border-2 bg-emerald-50/50 font-bold' : 'bg-gray-50'}`}>
                          <span className={`text-[10px] ${isToday24th ? 'text-[#326853]' : 'text-gray-500'} font-bold`}>{dayNumber}</span>
                          {hasStamp && (
                            <img src={STAMP_IMAGE_URL} alt="Stamp" className="w-6 h-6 absolute object-contain opacity-90 animate-fade-in" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <button 
                  onClick={() => alert("医師に見せるレポート(PDF)を正常に作成しました")}
                  className="w-full h-14 bg-[#326853] text-white font-bold text-sm rounded-[20px] flex items-center justify-center space-x-2 shadow-md active:translate-y-0.5"
                >
                  <FileText className="w-5 h-5" />
                  <span>医師に見せるレポートを出力 (PDF)</span>
                </button>
              </div>
            )}

            {/* SCREEN 6: AI 防诈门神 (ANTI-FRAUD GUARDIAN) */}
            {currentScreen === 'security_alert' && (
              <div className="p-5 space-y-4 pb-24 text-left">
                {/* Screen Header */}
                <div className="flex items-center justify-between border-b-2 border-[#C0C9C2] pb-3">
                  <button onClick={() => onNavigate('caregiver_dashboard')} className="p-1 rounded-full text-[#326853]">
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

                    {/* Big Interactive Toggle Switch */}
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
                      className="px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white font-bold text-[10px] rounded-lg shadow-xs active:scale-95 transition-all flex items-center space-x-1"
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
                      className="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white font-bold text-[10px] rounded-lg shadow-xs active:scale-95 transition-all flex items-center space-x-1"
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
            )}

            {/* SCREEN 7: 7天免费体验与订阅 (PAYWALL) */}
            {currentScreen === 'subscription' && (
              <div className="p-5 space-y-5 pb-24 text-center">
                <div className="flex items-center justify-between border-b-2 border-[#C0C9C2] pb-3">
                  <button onClick={() => onNavigate('senior_home')} className="p-1 rounded-full text-[#326853]">
                    <ArrowLeft className="w-6 h-6" />
                  </button>
                  <h1 className="text-lg font-bold text-[#326853] font-serif">Anshin Life Premium</h1>
                  <HelpCircle className="w-5 h-5 text-[#326853]" />
                </div>

                <img src={FAMILY_HERO_URL} alt="Family" className="w-full h-36 object-cover rounded-2xl shadow-sm" />

                <div>
                  <h2 className="text-2xl font-bold text-[#1A1C1C]">家族みんなに、安心を</h2>
                  <p className="text-xs text-gray-600 mt-1">大切な家族の毎日を、もっと安全に、もっと身近に。</p>
                </div>

                {/* Plans */}
                <div className="grid grid-cols-2 gap-3 text-left">
                  <div 
                    onClick={() => setSelectedPlan('yearly')}
                    className={`p-4 rounded-[20px] border-2 cursor-pointer relative ${
                      selectedPlan === 'yearly' ? 'bg-white border-[#D4AF37] shadow-md' : 'bg-gray-100 border-gray-300'
                    }`}
                  >
                    <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-white text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                      30%お得 / 最人気
                    </span>
                    <p className="text-xs font-bold text-[#6B5C4C] mt-1">年額プラン</p>
                    <p className="text-xl font-bold text-[#1A1C1C]">¥7,800 <span className="text-xs font-normal">/年</span></p>
                    <p className="text-[10px] text-gray-500 mt-1">月換算 ¥650</p>
                  </div>

                  <div 
                    onClick={() => setSelectedPlan('monthly')}
                    className={`p-4 rounded-[20px] border-2 cursor-pointer ${
                      selectedPlan === 'monthly' ? 'bg-white border-[#D4AF37] shadow-md' : 'bg-gray-100 border-gray-300'
                    }`}
                  >
                    <p className="text-xs font-bold text-[#6B5C4C]">月額プラン</p>
                    <p className="text-xl font-bold text-[#1A1C1C]">¥980 <span className="text-xs font-normal">/月</span></p>
                    <p className="text-[10px] text-gray-500 mt-1">いつでも解約可能</p>
                  </div>
                </div>

                <button 
                  onClick={() => alert("7日間の無料体験が開始されました！")}
                  className="w-full h-14 bg-[#88C0A7] text-[#164F3C] font-bold text-base rounded-[20px] border-b-4 border-[#164F3C]/30 shadow-md active:translate-y-0.5"
                >
                  7日間の無料体験を始める
                </button>

                <p className="text-[10px] text-gray-500 leading-tight">
                  無料体験終了24時間前までにキャンセルすれば費用は発生しません。
                </p>
              </div>
            )}

            {/* SCREEN 8: 特定商取引法 & 隐私政策 (LEGAL & TERMS) */}
            {currentScreen === 'legal' && (
              <div className="p-5 space-y-4 pb-24 text-left">
                <div className="flex items-center justify-between border-b-2 border-[#C0C9C2] pb-3">
                  <button onClick={() => onNavigate('senior_home')} className="p-1 rounded-full text-[#326853]">
                    <ArrowLeft className="w-6 h-6" />
                  </button>
                  <h1 className="text-sm font-bold text-[#326853]">特定商取引法に基づく表記</h1>
                  <div className="w-6"></div>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed">
                  安心ライフをご利用いただきありがとうございます。お客様の権利と安全を守るための重要情報を以下に記載しております。
                </p>

                <div className="bg-white rounded-[20px] p-4 border-2 border-[#C0C9C2] space-y-3 text-xs">
                  <div className="flex justify-between border-b pb-1.5">
                    <span className="font-bold text-gray-500">事業者名</span>
                    <span className="font-bold text-[#1A1C1C]">株式会社安心ライフ</span>
                  </div>
                  <div className="flex justify-between border-b pb-1.5">
                    <span className="font-bold text-gray-500">問い合わせ</span>
                    <span className="text-[#326853] underline font-bold">support@anshinlife.jp</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold text-gray-500">決済方法</span>
                    <span className="font-bold text-[#1A1C1C]">App Store 決済</span>
                  </div>
                </div>

                {/* Apple HealthKit Encryption Badge */}
                <div className="bg-[#A3B6CC]/20 border border-[#A3B6CC] rounded-xl p-3 flex items-center space-x-2 text-xs text-[#36485A]">
                  <CheckCircle className="w-5 h-5 text-[#4E6073] shrink-0" />
                  <span className="font-bold">Apple HealthKitデータはローカルで暗号化されています</span>
                </div>
              </div>
            )}

          </div>

          {/* DYNAMIC ROLE-ADAPTIVE BOTTOM TAB BAR */}
          <div className="absolute bottom-0 inset-x-0 h-16 bg-white border-t-2 border-[#C0C9C2] px-3 flex items-center justify-around z-40">
            {currentScreen === 'caregiver_dashboard' || currentScreen === 'security_alert' || currentScreen === 'medication' || currentScreen === 'subscription' || currentScreen === 'legal' ? (
              /* Caregiver View Tabs */
              <>
                <button 
                  onClick={() => onNavigate('caregiver_dashboard')}
                  className={`flex flex-col items-center text-[10px] font-bold ${currentScreen === 'caregiver_dashboard' ? 'text-[#326853]' : 'text-gray-400'}`}
                >
                  <Heart className="w-5 h-5" />
                  <span>家族</span>
                </button>

                <button 
                  onClick={() => onNavigate('security_alert')}
                  className={`flex flex-col items-center text-[10px] font-bold ${currentScreen === 'security_alert' ? 'text-[#326853]' : 'text-gray-400'}`}
                >
                  <ShieldAlert className="w-5 h-5" />
                  <span>防犯</span>
                </button>

                <button 
                  onClick={() => onNavigate('medication')}
                  className={`flex flex-col items-center text-[10px] font-bold ${currentScreen === 'medication' ? 'text-[#326853]' : 'text-gray-400'}`}
                >
                  <Pill className="w-5 h-5" />
                  <span>お薬管理</span>
                </button>

                <button 
                  onClick={() => onNavigate('subscription')}
                  className={`flex flex-col items-center text-[10px] font-bold ${currentScreen === 'subscription' ? 'text-[#326853]' : 'text-gray-400'}`}
                >
                  <Sparkles className="w-5 h-5" />
                  <span>プレミアム</span>
                </button>
              </>
            ) : (
              /* Senior View Tabs */
              <>
                <button 
                  onClick={() => onNavigate('senior_home')}
                  className={`flex flex-col items-center text-[10px] font-bold ${currentScreen === 'senior_home' ? 'text-[#326853]' : 'text-gray-400'}`}
                >
                  <Navigation className="w-5 h-5" />
                  <span>ホーム</span>
                </button>

                <button 
                  onClick={() => onNavigate('scanner')}
                  className={`flex flex-col items-center text-[10px] font-bold ${currentScreen === 'scanner' ? 'text-[#326853]' : 'text-gray-400'}`}
                >
                  <Pill className="w-5 h-5" />
                  <span>お薬登録</span>
                </button>

                <button 
                  onClick={() => onNavigate('history')}
                  className={`flex flex-col items-center text-[10px] font-bold ${currentScreen === 'history' ? 'text-[#326853]' : 'text-gray-400'}`}
                >
                  <Calendar className="w-5 h-5" />
                  <span>履歴</span>
                </button>
              </>
            )}
          </div>

          {/* 1-TAP FRAUD VERIFICATION MODAL OVERLAY (AI防犯・求証センタートップ) */}
          {showFraudInquiryModal && (
            <div className="absolute inset-0 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3.5 z-50 animate-fade-in">
              <div className="bg-white w-full rounded-[24px] p-4 border-2 border-red-500 shadow-2xl space-y-3 max-h-[92%] overflow-y-auto text-left">
                {/* Modal Header */}
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center space-x-2">
                    <div className="p-1.5 bg-red-100 text-red-700 rounded-xl">
                      <ShieldAlert className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-[#BA1A1A] flex items-center space-x-1.5">
                        <span>「これって詐欺...？」防犯AI求証</span>
                        <span className="text-[9px] bg-red-700 text-white font-mono font-bold px-1.5 py-0.2 rounded">Gemini 3.6</span>
                      </h3>
                      <p className="text-[10px] text-gray-500">警視庁特殊詐欺DB & Gemini Vision AI リアルタイム照合</p>
                    </div>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => { setShowFraudInquiryModal(false); setInquiryResult(null); }} 
                    className="text-gray-400 font-bold text-lg hover:text-gray-600 p-1"
                  >
                    ✕
                  </button>
                </div>

                {/* Sub Navigation Tabs */}
                <div className="grid grid-cols-4 gap-1 bg-gray-100 p-1 rounded-xl text-[10px] font-bold text-center">
                  <button
                    type="button"
                    onClick={() => setFraudModalTab('quick')}
                    className={`py-1.5 rounded-lg transition-all ${
                      fraudModalTab === 'quick' ? 'bg-amber-600 text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    🤖 AI代接门神
                  </button>
                  <button
                    type="button"
                    onClick={() => setFraudModalTab('photo')}
                    className={`py-1.5 rounded-lg transition-all ${
                      fraudModalTab === 'photo' ? 'bg-amber-600 text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    📷 拍照看护
                  </button>
                  <button
                    type="button"
                    onClick={() => setFraudModalTab('voice')}
                    className={`py-1.5 rounded-lg transition-all ${
                      fraudModalTab === 'voice' ? 'bg-amber-600 text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    🎤 实时听照
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

                {/* TAB 1: Zero-Touch AI Gatekeeper (AI 代接门神) */}
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
                          {inquiryResult.keyIndicators.map((ind, i) => (
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
                            setShowFraudInquiryModal(false);
                            handleStartCall('phone', '警察相談ダイヤル (#9110)', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300');
                          }}
                          className="py-1.5 bg-white text-red-700 font-bold rounded-lg text-[10px] text-center shadow-xs hover:bg-red-50 transition-all active:scale-95"
                        >
                          📞 #9110 警察へ電話
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setShowFraudInquiryModal(false);
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
                    onClick={() => { setShowFraudInquiryModal(false); setInquiryResult(null); }}
                    className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl active:scale-95 transition-all"
                  >
                    閉じる
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* GIANT RED EMERGENCY HANGUP OVERLAY */}
          {showHangupEmergencyOverlay && (
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

                {detectedScamKeyword && (
                  <div className="bg-red-50 border-2 border-red-300 p-2.5 rounded-2xl text-left space-y-0.5">
                    <p className="text-[10px] font-bold text-red-800">⚠️ 通話音声から検出された高危険ワード:</p>
                    <p className="text-xs font-black text-red-950 font-mono">「{detectedScamKeyword}」</p>
                  </div>
                )}

                <div className="space-y-2 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setShowHangupEmergencyOverlay(false);
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
          )}

          {/* 3-DAY CONTINUOUS BP REPORT MODAL OVERLAY */}
          {showBpReportModal && bpReportData && (
            <div className="absolute inset-0 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3.5 z-50 animate-fade-in">
              <div className="bg-white w-full rounded-[24px] p-4 border-2 border-red-500 shadow-2xl space-y-3.5 max-h-[92%] overflow-y-auto text-left">
                {/* Header */}
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 bg-red-100 text-red-700 rounded-xl">
                      <Activity className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-red-950 flex items-center space-x-1.5">
                        <span>AI 看护师：连续 3 日高血压就医问诊建议报告</span>
                      </h3>
                      <p className="text-[10px] text-gray-500">根据老人连续3天血压趋势 (收缩压 &gt; 140 mmHg) 智能生成</p>
                    </div>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => setShowBpReportModal(false)} 
                    className="text-gray-400 font-bold text-lg hover:text-gray-600 p-1"
                  >
                    ✕
                  </button>
                </div>

                {/* Patient Summary Card */}
                <div className="bg-red-50 p-3 rounded-2xl border border-red-200 space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-red-950">患者: {seniorName} (78岁)</span>
                    <span className="text-[10px] bg-red-600 text-white font-bold px-2 py-0.5 rounded-full">诊断: {bpReportData.diagnosisLevel}</span>
                  </div>
                  <p className="text-[11px] text-red-900 font-medium leading-snug">{bpReportData.riskAssessment}</p>
                </div>

                {/* 3-Day History Table */}
                <div className="space-y-1 text-xs">
                  <span className="font-bold text-gray-700 block text-[11px]">📊 连续 3 日血压测定记录:</span>
                  <div className="grid grid-cols-3 gap-1.5">
                    {bpHistory.map((item, idx) => (
                      <div key={idx} className="bg-gray-50 p-2 rounded-xl border border-gray-200 text-center space-y-0.5">
                        <span className="text-[10px] text-gray-500 block font-bold">{item.date}</span>
                        <span className="text-xs font-extrabold text-red-600 font-mono block">{item.sys} / {item.dia}</span>
                        <span className="text-[9px] text-gray-600 block">心率 {item.pulse} bpm</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Symptoms Checklist */}
                {bpReportData.symptomsChecklist && bpReportData.symptomsChecklist.length > 0 && (
                  <div className="space-y-1 bg-amber-50 p-3 rounded-2xl border border-amber-200 text-xs">
                    <span className="font-bold text-amber-950 block text-[11px]">⚠️ 伴随症状排查与问诊观察:</span>
                    <ul className="space-y-1">
                      {bpReportData.symptomsChecklist.map((symptom, i) => (
                        <li key={i} className="text-[11px] text-amber-900 font-medium flex items-center space-x-1.5">
                          <span className="text-amber-600 font-bold">▫️</span>
                          <span>{symptom}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Questions for Doctor */}
                {bpReportData.doctorQuestions && bpReportData.doctorQuestions.length > 0 && (
                  <div className="space-y-1 bg-blue-50 p-3 rounded-2xl border border-blue-200 text-xs">
                    <span className="font-bold text-blue-950 block text-[11px]">🩺 建议向诊所医生提问的要点备忘 (就医备忘录):</span>
                    <ul className="space-y-1">
                      {bpReportData.doctorQuestions.map((q, i) => (
                        <li key={i} className="text-[11px] text-blue-900 font-medium flex items-center space-x-1.5">
                          <span className="text-blue-600 font-bold">❓</span>
                          <span>{q}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Lifestyle Guidance */}
                {bpReportData.lifestyleGuidance && bpReportData.lifestyleGuidance.length > 0 && (
                  <div className="space-y-1 bg-emerald-50 p-3 rounded-2xl border border-emerald-200 text-xs">
                    <span className="font-bold text-emerald-950 block text-[11px]">🥗 AI看护师生活与饮食降压指导:</span>
                    <ul className="space-y-1">
                      {bpReportData.lifestyleGuidance.map((guide, i) => (
                        <li key={i} className="text-[11px] text-emerald-900 font-medium flex items-center space-x-1.5">
                          <span className="text-emerald-600 font-bold">✓</span>
                          <span>{guide}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Actions */}
                <div className="space-y-2 pt-1">
                  <button
                    type="button"
                    onClick={handlePushBpReportToLine}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center space-x-1.5"
                  >
                    <span>📲 一键推送本报告至家属 LINE (佐藤美咲)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowBpReportModal(false)}
                    className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl transition-all"
                  >
                    关闭
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* EDIT MEDICATION MODAL OVERLAY */}
          {editingMedId && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
              <form onSubmit={handleSaveEditMedication} className="bg-white w-full rounded-[24px] p-5 border-2 border-[#326853] shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <h3 className="font-bold text-base text-[#326853] flex items-center space-x-1.5">
                    <Pill className="w-5 h-5 text-[#88C0A7]" />
                    <span>お薬情報の編集</span>
                  </h3>
                  <button type="button" onClick={() => setEditingMedId(null)} className="text-gray-400 font-bold text-lg hover:text-gray-600">✕</button>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1A1C1C] mb-1">お薬の名前</label>
                  <input 
                    type="text" 
                    required
                    value={editMedName}
                    onChange={(e) => setEditMedName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border-2 border-[#C0C9C2] text-sm font-bold text-[#1A1C1C] focus:border-[#326853] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <label className="block font-bold text-[#1A1C1C] mb-1">飲むタイミング</label>
                    <select 
                      value={editMedDosage}
                      onChange={(e) => setEditMedDosage(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border-2 border-[#C0C9C2] font-bold text-[#1A1C1C] focus:border-[#326853] focus:outline-none bg-white"
                    >
                      <option value="朝食後 1錠">朝食後 1錠</option>
                      <option value="昼食後 1錠">昼食後 1錠</option>
                      <option value="夕食後 1錠">夕食後 1錠</option>
                      <option value="就寝前 1錠">就寝前 1錠</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-[#1A1C1C] mb-1">予定時間</label>
                    <input 
                      type="text" 
                      value={editMedTime}
                      onChange={(e) => setEditMedTime(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border-2 border-[#C0C9C2] font-bold text-[#1A1C1C] focus:border-[#326853] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2 pt-2">
                  <button 
                    type="button" 
                    onClick={() => setEditingMedId(null)}
                    className="flex-1 py-3 bg-[#F3F3F3] text-gray-700 font-bold text-xs rounded-xl"
                  >
                    キャンセル
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-3 bg-[#326853] text-white font-bold text-xs rounded-xl shadow-md hover:bg-[#275342]"
                  >
                    変更を保存
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* CAREGIVER SETTINGS MODAL OVERLAY */}
          {showCaregiverSettingsModal && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
              <div className="bg-white w-full rounded-[24px] p-5 border-2 border-[#326853] shadow-2xl space-y-4 max-h-[90%] overflow-y-auto text-left">
                {/* Modal Header */}
                <div className="flex items-center justify-between border-b pb-2.5">
                  <h3 className="font-bold text-base text-[#164F3C] flex items-center space-x-1.5">
                    <Settings className="w-5 h-5 text-[#326853]" />
                    <span>子女端・見守り連携設定</span>
                  </h3>
                  <button 
                    type="button" 
                    onClick={() => setShowCaregiverSettingsModal(false)} 
                    className="text-gray-400 font-bold text-lg hover:text-gray-600 p-1"
                  >
                    ✕
                  </button>
                </div>

                {/* Section 0: Senior (Parent) Profile Settings */}
                <div className="bg-[#EBF5F0] p-3.5 rounded-2xl border-2 border-[#88C0A7] space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <img src={seniorAvatarUrl} alt={seniorName} className="w-11 h-11 rounded-full border-2 border-[#326853] object-cover shadow-xs" />
                      <div>
                        <div className="flex items-center space-x-1">
                          <span className="font-bold text-[#164F3C] text-sm">{seniorName}</span>
                          <span className="text-[10px] bg-[#88C0A7]/40 text-[#164F3C] font-bold px-1.5 py-0.2 rounded-md">見守り対象</span>
                        </div>
                        <span className="text-[10px] text-gray-500">高齢者（親）のアイコン・お名前</span>
                      </div>
                    </div>
                    <button 
                      type="button"
                      onClick={() => {
                        setShowCaregiverSettingsModal(false);
                        handleOpenSeniorProfileEdit();
                      }}
                      className="px-3 py-1.5 bg-[#326853] text-white font-bold text-[11px] rounded-xl shadow-xs hover:bg-[#275342] flex items-center space-x-1 active:scale-95"
                    >
                      <span>✏️ 編集</span>
                    </button>
                  </div>
                </div>

                {/* Section 1: LINE Push Notifications */}
                <div className="bg-[#FAF8F5] p-3.5 rounded-2xl border border-gray-200 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <MessageCircle className="w-4 h-4 text-[#06C755]" />
                      <span className="font-bold text-[#1A1C1C]">LINEプッシュ通知設定</span>
                    </div>
                    <button 
                      type="button"
                      onClick={() => {
                        setLineDailyEnabled(!lineDailyEnabled);
                        triggerToast(`LINE通知を${!lineDailyEnabled ? '有効' : '無効'}に切り替えました`);
                      }}
                      className={`px-3 py-1 rounded-full font-bold text-[10px] transition-all ${
                        lineDailyEnabled ? 'bg-[#06C755] text-white' : 'bg-gray-300 text-gray-700'
                      }`}
                    >
                      {lineDailyEnabled ? 'オン' : 'オフ'}
                    </button>
                  </div>
                  <p className="text-[11px] text-gray-600 leading-snug">
                    お母さんの服薬状況や防犯アラートをLINE公式アカウントから即時プッシュ通知します。
                  </p>
                </div>

                {/* Section 2: Parent Device Pairing */}
                <div className="bg-[#FAF8F5] p-3.5 rounded-2xl border border-gray-200 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Heart className="w-4 h-4 text-[#326853]" />
                      <span className="font-bold text-[#1A1C1C]">親機ペアリング情報</span>
                    </div>
                    <span className="text-[10px] bg-[#88C0A7]/30 text-[#164F3C] font-bold px-2 py-0.5 rounded-md">
                      接続正常
                    </span>
                  </div>
                  <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-gray-200 font-mono text-xs">
                    <div>
                      <p className="text-[10px] text-gray-400 font-sans">ペアリングコード</p>
                      <p className="font-bold text-[#326853] text-sm">{pairingCode}</p>
                    </div>
                    <button 
                      type="button"
                      onClick={() => triggerToast("通信テスト成功: お母さんのスマホと正常に同期中 📱")}
                      className="px-3 py-1 bg-[#326853] text-white text-[10px] font-bold rounded-lg"
                    >
                      通信テスト
                    </button>
                  </div>
                </div>

                {/* Section 3: Anti-Fraud Guardian Sensitivity */}
                <div className="bg-[#FAF8F5] p-3.5 rounded-2xl border border-gray-200 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <ShieldAlert className="w-4 h-4 text-[#BA1A1A]" />
                      <span className="font-bold text-[#1A1C1C]">防犯電話Guardian感度</span>
                    </div>
                    <span className="text-[10px] bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded-md">
                      高感度モード
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-600 leading-snug">
                    未知の電話番号からの着信時、警視庁特殊詐欺DBと自動照合し不審電話を即座ブロックします。
                  </p>
                </div>

                {/* Section 4: Emergency Contacts & Primary Pharmacy */}
                <div className="bg-[#FAF8F5] p-3.5 rounded-2xl border border-gray-200 space-y-1.5 text-xs">
                  <span className="font-bold text-[#1A1C1C] block mb-1">緊急連絡先＆かかりつけ薬局</span>
                  <div className="flex justify-between text-gray-600 text-[11px] items-center">
                    <span>主介護者 (子女):</span>
                    <span className="font-bold text-[#326853]">
                      {caregiverName} (090-XXXX-8829)
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600 text-[11px]">
                    <span>かかりつけ薬局:</span>
                    <span className="font-bold text-[#326853]">日本調剤 杉並西荻窪薬局</span>
                  </div>
                </div>

                {/* Quick Switch to Senior View */}
                <button
                  type="button"
                  onClick={() => {
                    setShowCaregiverSettingsModal(false);
                    onNavigate('senior_home');
                  }}
                  className="w-full py-2.5 bg-[#F4DFCB] text-[#241A0E] font-bold text-xs rounded-xl border border-[#6B5C4C]/30 flex items-center justify-center space-x-1.5 active:scale-98"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>老年人端 (お母さんの画面) を確認・テスト</span>
                </button>

                {/* Close Button */}
                <button 
                  type="button" 
                  onClick={() => setShowCaregiverSettingsModal(false)}
                  className="w-full py-3 bg-[#326853] text-white font-bold text-xs rounded-xl shadow-md hover:bg-[#275342]"
                >
                  設定を保存して閉じる
                </button>
              </div>
            </div>
          )}

          {/* SENIOR PROFILE EDIT MODAL OVERLAY (高齢者・親のアイコン＆お名前変更) */}
          {showSeniorProfileEditModal && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
              <form onSubmit={handleSaveSeniorProfile} className="bg-white w-full rounded-[24px] p-5 border-2 border-[#326853] shadow-2xl space-y-4 max-h-[90%] overflow-y-auto text-left">
                {/* Modal Header */}
                <div className="flex items-center justify-between border-b pb-2.5">
                  <h3 className="font-bold text-base text-[#164F3C] flex items-center space-x-1.5">
                    <span>👵 高齢者（お母さん）プロフィール変更</span>
                  </h3>
                  <button 
                    type="button" 
                    onClick={() => setShowSeniorProfileEditModal(false)} 
                    className="text-gray-400 font-bold text-lg hover:text-gray-600 p-1"
                  >
                    ✕
                  </button>
                </div>

                {/* Avatar Preview & Upload */}
                <div className="flex flex-col items-center space-y-3 pt-1">
                  <div className="relative group">
                    <img 
                      src={tempSeniorAvatarUrl || seniorAvatarUrl} 
                      alt="Senior Avatar" 
                      className="w-20 h-20 rounded-full border-4 border-[#88C0A7] object-cover shadow-md" 
                    />
                    <label className="absolute bottom-0 right-0 bg-[#326853] hover:bg-[#275342] text-white p-1.5 rounded-full cursor-pointer shadow-md border-2 border-white transition-all active:scale-95">
                      <span className="text-xs">📷</span>
                      <input type="file" accept="image/*" onChange={handleFileUploadSeniorAvatar} className="hidden" />
                    </label>
                  </div>
                  <p className="text-[10px] text-gray-500">写真をタップして端末から画像アップロード</p>

                  {/* Preset Avatars for Senior */}
                  <div className="w-full space-y-1">
                    <label className="block text-[11px] font-bold text-gray-600 text-center">プリセット画像から選択:</label>
                    <div className="flex items-center justify-center space-x-2 pt-1">
                      {[
                        { label: 'お母さん 1', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCA0Z6JdMFe4AwdVRb8tgnq-eug_XR2ieqOm1DLGq6rCZr5b1JErYSrv7FyFSxtSJYKBL-b1ZLl89Q9vg67-tWu0tIZCkg0xJvuCTAeQNj22-Ion-Rw7J8K5Kc7-pv0sj9IadY1x7VxsmauxxuSR4M7Lj6oR1KEGRQZPSuPvuDBFbzJL-cjXY4JFQ-1spQOOJTisof4f9iyZEgnfsnPtJoaDV2rcCGemIz7HI9cu1yQ272upYR_SLUkqlslLHgD9vH6-MUqaW4W' },
                        { label: '女性シニア 1', url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300' },
                        { label: 'おばあちゃん', url: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=300' },
                        { label: 'お父さん', url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300' },
                        { label: 'マスコット', url: SHIBA_IMAGE_URL }
                      ].map((preset, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setTempSeniorAvatarUrl(preset.url)}
                          className={`p-0.5 rounded-full border-2 transition-all ${
                            tempSeniorAvatarUrl === preset.url ? 'border-[#326853] scale-110 shadow-sm' : 'border-transparent opacity-70 hover:opacity-100'
                          }`}
                          title={preset.label}
                        >
                          <img src={preset.url} alt={preset.label} className="w-9 h-9 rounded-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Name Input */}
                <div className="space-y-1.5 pt-2">
                  <label className="block font-bold text-xs text-gray-700">高齢者のお名前（表示名）</label>
                  <input 
                    type="text" 
                    required
                    placeholder="例: お母さん (マサコ), お父さん, 田中マサコ"
                    value={tempSeniorName}
                    onChange={(e) => setTempSeniorName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border-2 border-gray-300 font-bold text-[#1A1C1C] focus:border-[#326853] focus:outline-none bg-white text-xs"
                  />
                </div>

                {/* Image URL Direct Input Optional */}
                <div className="space-y-1.5">
                  <label className="block font-bold text-[11px] text-gray-500">画像URL（直接指定する場合）</label>
                  <input 
                    type="url" 
                    placeholder="https://..."
                    value={tempSeniorAvatarUrl}
                    onChange={(e) => setTempSeniorAvatarUrl(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 font-normal text-gray-700 focus:border-[#326853] focus:outline-none bg-white text-[11px]"
                  />
                </div>

                {/* Submit Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button 
                    type="button" 
                    onClick={() => setShowSeniorProfileEditModal(false)}
                    className="py-2.5 bg-gray-100 text-gray-700 font-bold text-xs rounded-xl hover:bg-gray-200"
                  >
                    キャンセル
                  </button>
                  <button 
                    type="submit"
                    className="py-2.5 bg-[#326853] text-white font-bold text-xs rounded-xl shadow-md hover:bg-[#275342]"
                  >
                    保存する
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* HOSPITAL VISIT RECORDS MODAL OVERLAY (通院記録) */}
          {showHospitalRecordsModal && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
              <div className="bg-white w-full rounded-[24px] p-5 border-2 border-[#326853] shadow-2xl space-y-4 max-h-[90%] overflow-y-auto text-left">
                {/* Modal Header */}
                <div className="flex items-center justify-between border-b pb-2.5">
                  <div className="flex items-center space-x-2">
                    <div className="p-1.5 bg-[#88C0A7]/20 text-[#164F3C] rounded-lg">
                      <FileText className="w-5 h-5 text-[#326853]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-[#164F3C]">🏥 高齢者 通院記録・診察メモ</h3>
                      <p className="text-[10px] text-gray-500">ご家族で共有する通院履歴と今後の予約</p>
                    </div>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => {
                      setShowHospitalRecordsModal(false);
                      setShowAddHospitalRecordForm(false);
                    }} 
                    className="text-gray-400 font-bold text-lg hover:text-gray-600 p-1"
                  >
                    ✕
                  </button>
                </div>

                {/* Top Action Bar */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-700">全 {hospitalRecords.length} 件の記録</span>
                  <button
                    type="button"
                    onClick={() => setShowAddHospitalRecordForm(!showAddHospitalRecordForm)}
                    className="px-3 py-1.5 bg-[#326853] hover:bg-[#275342] text-white font-bold text-xs rounded-xl flex items-center space-x-1 shadow-xs active:scale-95 transition-all"
                  >
                    <span>{showAddHospitalRecordForm ? '✕ 閉じる' : '＋ 新しい通院予定を追加'}</span>
                  </button>
                </div>

                {/* Add Hospital Record Form */}
                {showAddHospitalRecordForm && (
                  <form onSubmit={handleAddHospitalRecord} className="bg-[#EBF5F0] border-2 border-[#326853] rounded-2xl p-3.5 space-y-3 animate-fade-in text-xs">
                    <h4 className="font-bold text-[#164F3C] text-sm flex items-center space-x-1">
                      <span>🏥 新しい通院予定の登録</span>
                    </h4>

                    <div className="space-y-1">
                      <label className="block font-bold text-gray-700 text-[11px]">病院名・医療機関</label>
                      <input
                        type="text"
                        required
                        placeholder="例: 日本赤十字病院, さくらクリニック"
                        value={newHospitalName}
                        onChange={(e) => setNewHospitalName(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-gray-300 font-bold text-gray-800 bg-white focus:border-[#326853] focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block font-bold text-gray-700 text-[11px]">診療科</label>
                        <select
                          value={newHospitalDepartment}
                          onChange={(e) => setNewHospitalDepartment(e.target.value)}
                          className="w-full px-2.5 py-2 rounded-xl border border-gray-300 font-bold text-gray-800 bg-white focus:border-[#326853] focus:outline-none"
                        >
                          <option value="循環器内科">循環器内科</option>
                          <option value="一般内科">一般内科</option>
                          <option value="整形外科">整形外科</option>
                          <option value="眼科">眼科</option>
                          <option value="皮膚科">皮膚科</option>
                          <option value="歯科">歯科</option>
                          <option value="その他">その他</option>
                        </select>
                      </div>
                      <div>
                        <label className="block font-bold text-gray-700 text-[11px]">担当医師名（任意）</label>
                        <input
                          type="text"
                          placeholder="例: 佐藤 医師"
                          value={newHospitalDoctor}
                          onChange={(e) => setNewHospitalDoctor(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-gray-300 font-bold text-gray-800 bg-white focus:border-[#326853] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block font-bold text-gray-700 text-[11px]">通院予定日</label>
                        <input
                          type="date"
                          required
                          value={newHospitalDate}
                          onChange={(e) => setNewHospitalDate(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-gray-300 font-bold text-gray-800 bg-white focus:border-[#326853] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-gray-700 text-[11px]">予定時刻</label>
                        <input
                          type="text"
                          placeholder="例: 10:00 AM"
                          value={newHospitalTime}
                          onChange={(e) => setNewHospitalTime(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-gray-300 font-bold text-gray-800 bg-white focus:border-[#326853] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block font-bold text-gray-700 text-[11px]">診察メモ・ご家族連絡事項</label>
                      <textarea
                        rows={2}
                        placeholder="例: 検査結果確認、処方箋受け取り、タクシー手配済み"
                        value={newHospitalNotes}
                        onChange={(e) => setNewHospitalNotes(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-gray-300 font-normal text-gray-800 bg-white focus:border-[#326853] focus:outline-none resize-none"
                      />
                    </div>

                    <div className="flex justify-end space-x-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setShowAddHospitalRecordForm(false)}
                        className="px-3 py-2 bg-gray-200 text-gray-700 font-bold rounded-xl text-xs hover:bg-gray-300"
                      >
                        キャンセル
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-[#326853] text-white font-bold rounded-xl text-xs shadow-md hover:bg-[#275342]"
                      >
                        登録する
                      </button>
                    </div>
                  </form>
                )}

                {/* List of Hospital Records */}
                <div className="space-y-3">
                  {hospitalRecords.length === 0 ? (
                    <div className="p-6 text-center text-gray-400 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                      通院記録がまだ登録されていません。
                    </div>
                  ) : (
                    hospitalRecords.map((record) => (
                      <div 
                        key={record.id}
                        className="bg-[#FAF8F5] p-3.5 rounded-2xl border border-gray-200 shadow-2xs space-y-2 relative"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center space-x-2">
                              <h4 className="font-bold text-sm text-[#1A1C1C]">{record.hospitalName}</h4>
                              <span className="text-[10px] bg-[#88C0A7]/30 text-[#164F3C] font-bold px-2 py-0.5 rounded-md">
                                {record.department}
                              </span>
                            </div>
                            <p className="text-[11px] text-gray-500 font-bold mt-0.5">
                              📅 {record.date} ({record.time}) · 担当: {record.doctor}
                            </p>
                          </div>
                          <div className="flex items-center space-x-1">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              record.status === 'upcoming' 
                                ? 'bg-amber-100 text-amber-800 border border-amber-300' 
                                : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            }`}>
                              {record.status === 'upcoming' ? '受診予定' : '受診完了'}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleDeleteHospitalRecord(record.id)}
                              className="text-gray-400 hover:text-red-600 p-1 rounded-md"
                              title="削除"
                            >
                              🗑️
                            </button>
                          </div>
                        </div>

                        {record.notes && (
                          <div className="bg-white p-2.5 rounded-xl border border-gray-200 text-xs text-gray-700 leading-snug">
                            <span className="font-bold text-[#326853]">📝 メモ: </span>
                            {record.notes}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* SCHEDULE & CALENDAR MODAL OVERLAY (予定表) */}
          {showScheduleModal && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
              <div className="bg-white w-full rounded-[24px] p-5 border-2 border-[#326853] shadow-2xl space-y-4 max-h-[90%] overflow-y-auto text-left">
                {/* Modal Header */}
                <div className="flex items-center justify-between border-b pb-2.5">
                  <div className="flex items-center space-x-2">
                    <div className="p-1.5 bg-[#88C0A7]/20 text-[#164F3C] rounded-lg">
                      <Calendar className="w-5 h-5 text-[#326853]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-[#164F3C]">📅 高齢者 生活カレンダー・予定表</h3>
                      <p className="text-[10px] text-gray-500">デイサービス・訪問看護・通院の共有スケジュール</p>
                    </div>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => {
                      setShowScheduleModal(false);
                      setShowAddScheduleForm(false);
                    }} 
                    className="text-gray-400 font-bold text-lg hover:text-gray-600 p-1"
                  >
                    ✕
                  </button>
                </div>

                {/* Top Action Bar */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-700">登録済み予定 {scheduleEvents.length} 件</span>
                  <button
                    type="button"
                    onClick={() => setShowAddScheduleForm(!showAddScheduleForm)}
                    className="px-3 py-1.5 bg-[#326853] hover:bg-[#275342] text-white font-bold text-xs rounded-xl flex items-center space-x-1 shadow-xs active:scale-95 transition-all"
                  >
                    <span>{showAddScheduleForm ? '✕ 閉じる' : '＋ 新しい予定を追加'}</span>
                  </button>
                </div>

                {/* Add Schedule Form */}
                {showAddScheduleForm && (
                  <form onSubmit={handleAddScheduleEvent} className="bg-[#EBF5F0] border-2 border-[#326853] rounded-2xl p-3.5 space-y-3 animate-fade-in text-xs">
                    <h4 className="font-bold text-[#164F3C] text-sm flex items-center space-x-1">
                      <span>📅 新しい予定の作成</span>
                    </h4>

                    <div className="space-y-1">
                      <label className="block font-bold text-gray-700 text-[11px]">予定タイトル</label>
                      <input
                        type="text"
                        required
                        placeholder="例: 訪問看護スタッフ来訪, デイサービスお迎え"
                        value={newScheduleTitle}
                        onChange={(e) => setNewScheduleTitle(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-gray-300 font-bold text-gray-800 bg-white focus:border-[#326853] focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block font-bold text-gray-700 text-[11px]">分類カテゴリ</label>
                        <select
                          value={newScheduleCategory}
                          onChange={(e) => setNewScheduleCategory(e.target.value as any)}
                          className="w-full px-2.5 py-2 rounded-xl border border-gray-300 font-bold text-gray-800 bg-white focus:border-[#326853] focus:outline-none"
                        >
                          <option value="通院">通院</option>
                          <option value="訪問看護">訪問看護</option>
                          <option value="デイサービス">デイサービス</option>
                          <option value="服薬チェック">服薬チェック</option>
                          <option value="その他">その他</option>
                        </select>
                      </div>
                      <div>
                        <label className="block font-bold text-gray-700 text-[11px]">日付</label>
                        <input
                          type="date"
                          required
                          value={newScheduleDate}
                          onChange={(e) => setNewScheduleDate(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-gray-300 font-bold text-gray-800 bg-white focus:border-[#326853] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block font-bold text-gray-700 text-[11px]">時間</label>
                        <input
                          type="text"
                          placeholder="例: 11:00 AM"
                          value={newScheduleTime}
                          onChange={(e) => setNewScheduleTime(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-gray-300 font-bold text-gray-800 bg-white focus:border-[#326853] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-gray-700 text-[11px]">メモ・特記事項</label>
                        <input
                          type="text"
                          placeholder="例: 着替え準備, お薬手帳"
                          value={newScheduleNotes}
                          onChange={(e) => setNewScheduleNotes(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-gray-300 font-bold text-gray-800 bg-white focus:border-[#326853] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setShowAddScheduleForm(false)}
                        className="px-3 py-2 bg-gray-200 text-gray-700 font-bold rounded-xl text-xs hover:bg-gray-300"
                      >
                        キャンセル
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-[#326853] text-white font-bold rounded-xl text-xs shadow-md hover:bg-[#275342]"
                      >
                        保存する
                      </button>
                    </div>
                  </form>
                )}

                {/* List of Schedule Events */}
                <div className="space-y-3">
                  {scheduleEvents.length === 0 ? (
                    <div className="p-6 text-center text-gray-400 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                      登録されている予定はありません。
                    </div>
                  ) : (
                    scheduleEvents.map((event) => (
                      <div 
                        key={event.id}
                        className="bg-[#FAF8F5] p-3.5 rounded-2xl border border-gray-200 shadow-2xs space-y-1.5 relative flex items-start justify-between"
                      >
                        <div className="space-y-1 flex-1 pr-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-bold bg-[#326853] text-white px-2 py-0.5 rounded-md font-mono">
                              {event.date}
                            </span>
                            <span className="text-[10px] bg-[#88C0A7]/30 text-[#164F3C] font-bold px-2 py-0.5 rounded-md">
                              {event.category}
                            </span>
                          </div>
                          <h4 className="font-bold text-sm text-[#1A1C1C]">{event.title}</h4>
                          <p className="text-[11px] text-gray-500 font-bold">⏰ {event.time}</p>
                          {event.notes && (
                            <p className="text-[11px] text-gray-600 bg-white p-2 rounded-xl border border-gray-200">
                              💬 {event.notes}
                            </p>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => handleDeleteScheduleEvent(event.id)}
                          className="text-gray-400 hover:text-red-600 p-1 rounded-md shrink-0"
                          title="削除"
                        >
                          🗑️
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* INTERACTIVE CALL OVERLAY (REAL-TIME PHONE & VIDEO CALL SIMULATION) */}
          {activeCall && (
            <div className="absolute inset-0 bg-[#0A1612]/95 backdrop-blur-md flex flex-col justify-between p-6 z-50 text-white animate-fade-in">
              {/* Header / Recipient Status */}
              <div className="text-center pt-8 space-y-2">
                <span className="inline-block px-3 py-1 bg-[#326853]/40 border border-[#88C0A7]/40 text-[#88C0A7] text-xs font-bold rounded-full">
                  {activeCall.type === 'video' ? '📹 HD ビデオ通話' : '📞 高音質音声通話'}
                </span>
                <p className="text-xs text-emerald-400 font-mono font-bold">
                  {activeCall.status === 'calling' ? '呼び出し中...' : (
                    <span>
                      通話中 · {String(Math.floor(activeCall.duration / 60)).padStart(2, '0')}:{String(activeCall.duration % 60).padStart(2, '0')}
                    </span>
                  )}
                </p>
              </div>

              {/* Center Main Visual (Video feed or Avatar) */}
              <div className="flex flex-col items-center justify-center space-y-4 my-auto">
                {activeCall.type === 'video' ? (
                  <div className="relative w-48 h-60 rounded-3xl overflow-hidden border-4 border-[#88C0A7] shadow-2xl bg-black">
                    <img 
                      src={activeCall.recipientAvatar} 
                      alt={activeCall.recipientName} 
                      className="w-full h-full object-cover animate-pulse" 
                    />
                    <div className="absolute top-2 left-2 bg-black/60 px-2 py-0.5 rounded text-[10px] text-white font-bold flex items-center space-x-1">
                      <span className="w-2 h-2 bg-emerald-400 rounded-full animate-ping"></span>
                      <span>{activeCall.recipientName}</span>
                    </div>
                    {/* Small Picture-in-Picture Self Feed */}
                    <div className="absolute bottom-2 right-2 w-14 h-18 rounded-xl border-2 border-white overflow-hidden bg-gray-800 shadow-md">
                      <img src={caregiverAvatarUrl} alt="Self" className="w-full h-full object-cover" />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center space-y-3">
                    <div className="relative">
                      <div className="absolute -inset-4 rounded-full bg-[#88C0A7]/20 animate-ping"></div>
                      <img 
                        src={activeCall.recipientAvatar} 
                        alt={activeCall.recipientName} 
                        className="w-28 h-28 rounded-full border-4 border-[#88C0A7] object-cover shadow-2xl relative" 
                      />
                    </div>
                    <h2 className="text-xl font-bold text-white">{activeCall.recipientName}</h2>
                    <p className="text-xs text-gray-300">安心ライフ 見守りファミリー回線</p>
                  </div>
                )}
              </div>

              {/* Bottom Controls Bar */}
              <div className="space-y-6 pb-6">
                <div className="flex items-center justify-center space-x-6">
                  {/* Mute Button */}
                  <button
                    type="button"
                    onClick={() => setActiveCall(prev => prev ? { ...prev, isMuted: !prev.isMuted } : null)}
                    className={`p-4 rounded-full transition-all active:scale-90 ${
                      activeCall.isMuted ? 'bg-amber-500 text-white' : 'bg-white/20 hover:bg-white/30 text-white'
                    }`}
                  >
                    {activeCall.isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                  </button>

                  {/* Speaker Button */}
                  <button
                    type="button"
                    onClick={() => setActiveCall(prev => prev ? { ...prev, isSpeakerOn: !prev.isSpeakerOn } : null)}
                    className={`p-4 rounded-full transition-all active:scale-90 ${
                      activeCall.isSpeakerOn ? 'bg-[#88C0A7] text-[#0A1612]' : 'bg-white/20 hover:bg-white/30 text-white'
                    }`}
                  >
                    {activeCall.isSpeakerOn ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
                  </button>

                  {/* Toggle Video/Phone */}
                  <button
                    type="button"
                    onClick={() => setActiveCall(prev => prev ? { ...prev, type: prev.type === 'phone' ? 'video' : 'phone' } : null)}
                    className="p-4 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all active:scale-90"
                  >
                    <Video className="w-6 h-6" />
                  </button>
                </div>

                {/* Red End Call Button */}
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={handleEndCall}
                    className="w-16 h-16 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-xl transition-all active:scale-90"
                    title="通話を終了"
                  >
                    <PhoneOff className="w-7 h-7" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* SENIOR HEALTH ROUTINE & UTILITY TOOLS MODAL OVERLAY (毎日の服薬・健康日課ツール) */}
          {showPointsModal && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
              <div className="bg-white w-full rounded-[24px] p-5 border-2 border-[#326853] shadow-2xl space-y-4 max-h-[90%] overflow-y-auto text-left">
                {/* Modal Header */}
                <div className="flex items-center justify-between border-b pb-2.5">
                  <div className="flex items-center space-x-2">
                    <div className="p-1.5 bg-[#88C0A7]/20 text-[#164F3C] rounded-lg">
                      <Award className="w-5 h-5 text-[#326853]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-[#164F3C]">🏆 毎日の服薬・健康日課ツール</h3>
                      <p className="text-[10px] text-gray-500">ご高齢者の安全な服薬習慣・体調記録・家族連携</p>
                    </div>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => setShowPointsModal(false)} 
                    className="text-gray-400 font-bold text-lg hover:text-gray-600 p-1"
                  >
                    ✕
                  </button>
                </div>

                {/* Routine Summary Banner */}
                <div className="bg-[#EBF5F0] border-2 border-[#326853] rounded-2xl p-3.5 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] font-bold text-[#326853] block">今月の服薬達成率</span>
                    <span className="text-xl font-bold text-[#164F3C] font-mono">96.8% <span className="text-xs text-[#326853] font-normal">(28日中 27日完了)</span></span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-[#326853] block">現在の連続記録</span>
                    <span className="text-sm font-bold bg-[#326853] text-white px-2.5 py-0.5 rounded-full inline-block">7日連続 達成 🌟</span>
                  </div>
                </div>

                {/* Navigation Tabs */}
                <div className="grid grid-cols-3 gap-1 bg-[#F3F3F3] p-1 rounded-xl text-xs font-bold text-center">
                  <button
                    type="button"
                    onClick={() => setActivePointsTab('exchange')}
                    className={`py-1.5 rounded-lg transition-all ${
                      activePointsTab === 'exchange' ? 'bg-white text-[#326853] shadow-xs' : 'text-gray-500'
                    }`}
                  >
                    📅 服薬カレンダー
                  </button>
                  <button
                    type="button"
                    onClick={() => setActivePointsTab('my_coupons')}
                    className={`py-1.5 rounded-lg transition-all ${
                      activePointsTab === 'my_coupons' ? 'bg-white text-[#326853] shadow-xs' : 'text-gray-500'
                    }`}
                  >
                    📝 体調バイタル入力
                  </button>
                  <button
                    type="button"
                    onClick={() => setActivePointsTab('history')}
                    className={`py-1.5 rounded-lg transition-all ${
                      activePointsTab === 'history' ? 'bg-white text-[#326853] shadow-xs' : 'text-gray-500'
                    }`}
                  >
                    🏅 家族の応援メモ
                  </button>
                </div>

                {/* TAB 1: Medication Compliance Calendar */}
                {activePointsTab === 'exchange' && (
                  <div className="space-y-3 animate-fade-in text-xs">
                    <div className="flex items-center justify-between">
                      <p className="text-[11px] font-bold text-gray-700">2026年 7月 服薬達成記録表</p>
                      <span className="text-[10px] text-[#326853] font-bold">🟢 服薬完了  ⚪ 予定日</span>
                    </div>

                    {/* Simulated Calendar Grid */}
                    <div className="bg-[#FAF8F5] p-3 rounded-2xl border border-gray-200 grid grid-cols-7 gap-1.5 text-center font-mono text-xs">
                      {['日', '月', '火', '水', '木', '金', '土'].map((d, i) => (
                        <div key={i} className="font-bold text-gray-400 text-[10px] pb-1">{d}</div>
                      ))}
                      {Array.from({ length: 28 }).map((_, idx) => {
                        const dayNum = idx + 1;
                        const isToday = dayNum === 24;
                        const isDone = dayNum <= 24;
                        return (
                          <div 
                            key={idx} 
                            className={`p-1.5 rounded-xl border flex flex-col items-center justify-center ${
                              isToday 
                                ? 'bg-[#326853] text-white font-bold border-[#164F3C] ring-2 ring-[#88C0A7]' 
                                : isDone 
                                  ? 'bg-[#EBF5F0] border-[#88C0A7] text-[#164F3C]' 
                                  : 'bg-white border-gray-200 text-gray-400'
                            }`}
                          >
                            <span className="text-[10px]">{dayNum}</span>
                            <span className="text-xs">{isDone ? '✅' : '⚪'}</span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="bg-[#EBF5F0] p-3 rounded-xl border border-[#88C0A7] space-y-1">
                      <p className="font-bold text-[#164F3C] text-[11px]">💡 服薬管理のアドバイス</p>
                      <p className="text-gray-600 text-[10px] leading-relaxed">
                        毎日決まった時間にコップ1杯のお水で服用することで、飲み忘れを防止できます。ご家族のアプリへもリアルタイムで服薬完了が通知されます。
                      </p>
                    </div>
                  </div>
                )}

                {/* TAB 2: Vital & Health Checker Tool */}
                {activePointsTab === 'my_coupons' && (
                  <div className="space-y-3 animate-fade-in text-xs">
                    <p className="text-[11px] font-bold text-gray-700">今日の体調・バイタル記録ツール</p>

                    <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        triggerToast('🩺 本日の体調データ（血圧・体温）を記録し、ご家族に共有しました！');
                      }}
                      className="bg-[#FAF8F5] p-3.5 rounded-2xl border border-gray-200 space-y-3"
                    >
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block font-bold text-gray-700 text-[10px]">最高血圧 (mmHg)</label>
                          <input
                            type="number"
                            defaultValue={124}
                            className="w-full px-3 py-2 rounded-xl border border-gray-300 font-bold text-gray-800 bg-white focus:border-[#326853] focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-gray-700 text-[10px]">最低血圧 (mmHg)</label>
                          <input
                            type="number"
                            defaultValue={78}
                            className="w-full px-3 py-2 rounded-xl border border-gray-300 font-bold text-gray-800 bg-white focus:border-[#326853] focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block font-bold text-gray-700 text-[10px]">体温 (°C)</label>
                          <input
                            type="number"
                            step="0.1"
                            defaultValue={36.5}
                            className="w-full px-3 py-2 rounded-xl border border-gray-300 font-bold text-gray-800 bg-white focus:border-[#326853] focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-gray-700 text-[10px]">今日の気分・体調</label>
                          <select className="w-full px-2 py-2 rounded-xl border border-gray-300 font-bold text-gray-800 bg-white focus:border-[#326853] focus:outline-none">
                            <option value="good">😊 絶好調・元気</option>
                            <option value="normal">🙂 普通・安定</option>
                            <option value="tired">疲れた・少しだるい</option>
                          </select>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2.5 bg-[#326853] hover:bg-[#275342] text-white font-bold rounded-xl shadow-xs active:scale-95 transition-all text-xs"
                      >
                        体調記録をご家族に送信する
                      </button>
                    </form>

                    {/* Previous Logs */}
                    <div className="space-y-1.5 pt-1">
                      <p className="text-[10px] font-bold text-gray-500">直近の測定履歴</p>
                      <div className="p-2.5 bg-white rounded-xl border border-gray-200 flex justify-between items-center text-[11px]">
                        <div>
                          <span className="font-bold text-[#164F3C]">本日 08:30 測定</span>
                          <span className="text-gray-500 block text-[10px]">血圧: 124/78 mmHg · 体温: 36.5°C</span>
                        </div>
                        <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">正常値</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 3: Family Encouragement Badges */}
                {activePointsTab === 'history' && (
                  <div className="space-y-3 animate-fade-in text-xs">
                    <p className="text-[11px] font-bold text-gray-700">ご家族から贈られた応援バッジとメッセージ</p>

                    <div className="space-y-2">
                      <div className="p-3 bg-[#EBF5F0] rounded-2xl border border-[#88C0A7] flex items-start space-x-3">
                        <span className="text-3xl shrink-0">🏅</span>
                        <div className="space-y-0.5">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-bold text-sm text-[#164F3C]">1週間連続 服薬マスターバッジ</h4>
                            <span className="text-[9px] bg-[#326853] text-white font-bold px-1.5 py-0.2 rounded">7日連続</span>
                          </div>
                          <p className="text-gray-700 text-[11px]">「お母さん、毎日ちゃんとお薬飲めてて安心したよ！いつもありがとう。」</p>
                          <p className="text-[10px] text-gray-400 font-bold text-right">— 子女 (佐藤 美咲)</p>
                        </div>
                      </div>

                      <div className="p-3 bg-[#EBF5F0] rounded-2xl border border-[#88C0A7] flex items-start space-x-3">
                        <span className="text-3xl shrink-0">🛡️</span>
                        <div className="space-y-0.5">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-bold text-sm text-[#164F3C]">安心防犯守護バッジ</h4>
                            <span className="text-[9px] bg-[#326853] text-white font-bold px-1.5 py-0.2 rounded">自動防御中</span>
                          </div>
                          <p className="text-gray-700 text-[11px]">「防犯電話Guardianが稼働中なので、知らない電話も安全に守られています。」</p>
                          <p className="text-[10px] text-gray-400 font-bold text-right">— 家族見守りシステム</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* DEDICATED BLOOD PRESSURE EDIT MODAL OVERLAY (血压编辑弹窗) */}
          {showBloodPressureModal && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
              <div className="bg-white w-full rounded-[24px] p-5 border-2 border-rose-500 shadow-2xl space-y-4 text-left">
                {/* Modal Header */}
                <div className="flex items-center justify-between border-b pb-2.5">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 bg-rose-100 text-rose-700 rounded-xl">
                      <Heart className="w-5 h-5 text-rose-600 fill-rose-500" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-gray-900">🩺 血圧・バイタル記録の編集</h3>
                      <p className="text-[10px] text-gray-500">最新の測定値を手元で編集・更新できます</p>
                    </div>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => setShowBloodPressureModal(false)} 
                    className="text-gray-400 font-bold text-lg hover:text-gray-600 p-1"
                  >
                    ✕
                  </button>
                </div>

                {/* Blood Pressure Input Form */}
                <form onSubmit={handleUpdateBloodPressure} className="space-y-3.5 text-xs">
                  <div className="bg-rose-50/70 p-3 rounded-2xl border border-rose-200 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-rose-800 block">前回の記録</span>
                      <span className="text-sm font-bold text-rose-950 font-mono">{sysBloodPressure} / {diaBloodPressure} <span className="text-xs">mmHg</span></span>
                    </div>
                    <span className="text-[10px] text-rose-700 font-bold bg-white px-2 py-1 rounded-lg border border-rose-200">
                      前回: {lastBPTime}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="block font-bold text-gray-800 text-[11px]">
                        最高血圧 (高圧 / Sys)
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          value={sysBloodPressure}
                          onChange={(e) => setSysBloodPressure(Number(e.target.value))}
                          className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 font-mono font-bold text-base text-gray-900 bg-white focus:border-rose-500 focus:outline-none"
                          min={60}
                          max={220}
                          required
                        />
                        <span className="absolute right-3 top-3 text-[10px] text-gray-400 font-mono">mmHg</span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block font-bold text-gray-800 text-[11px]">
                        最低血圧 (低压 / Dia)
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          value={diaBloodPressure}
                          onChange={(e) => setDiaBloodPressure(Number(e.target.value))}
                          className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 font-mono font-bold text-base text-gray-900 bg-white focus:border-rose-500 focus:outline-none"
                          min={40}
                          max={140}
                          required
                        />
                        <span className="absolute right-3 top-3 text-[10px] text-gray-400 font-mono">mmHg</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block font-bold text-gray-800 text-[11px]">
                      心拍数 (Pulse Rate)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={pulseRate}
                        onChange={(e) => setPulseRate(Number(e.target.value))}
                        className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 font-mono font-bold text-base text-gray-900 bg-white focus:border-rose-500 focus:outline-none"
                        min={40}
                        max={180}
                        required
                      />
                      <span className="absolute right-3 top-3 text-[10px] text-gray-400 font-mono">bpm</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 space-y-1">
                    <p className="font-bold text-gray-700 text-[10px]">💡 判定ステータス</p>
                    <p className="text-emerald-700 font-bold text-[11px]">
                      {sysBloodPressure <= 130 && diaBloodPressure <= 85 ? '🟢 正常血圧 (健康域)' : '⚠️ 稍微偏高 / 要注意'}
                    </p>
                    <p className="text-gray-500 text-[9px]">保存するとご家族見守り画面（Caregiver View）にも即座に反映されます。</p>
                  </div>

                  <div className="flex space-x-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setShowBloodPressureModal(false)}
                      className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl active:scale-95 transition-all text-xs"
                    >
                      キャンセル
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl shadow-xs active:scale-95 transition-all text-xs"
                    >
                      保存して共有
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* DEDICATED STEPS & APPLE HEALTHKIT SYNC MODAL OVERLAY (iOS 运动步数同步弹窗) */}
          {showStepsModal && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
              <div className="bg-white w-full rounded-[24px] p-5 border-2 border-amber-500 shadow-2xl space-y-4 text-left">
                {/* Modal Header */}
                <div className="flex items-center justify-between border-b pb-2.5">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 bg-amber-100 text-amber-800 rounded-xl">
                      <Activity className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-gray-900">👟 iOSヘルスケア (HealthKit) 歩数連携</h3>
                      <p className="text-[10px] text-gray-500">iPhone / Apple Watch の歩数データと自動同期</p>
                    </div>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => setShowStepsModal(false)} 
                    className="text-gray-400 font-bold text-lg hover:text-gray-600 p-1"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-3.5 text-xs">
                  {/* Status Banner */}
                  <div className="bg-amber-50 p-3.5 rounded-2xl border border-amber-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-amber-900 uppercase flex items-center space-x-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-ping"></span>
                        <span>iOS HealthKit 連動中</span>
                      </span>
                      <span className="text-[10px] text-amber-700 font-mono font-bold">最終同期: {lastStepSyncTime}</span>
                    </div>

                    <div className="flex items-baseline justify-between pt-1">
                      <div>
                        <span className="text-2xl font-bold font-mono text-amber-950">{dailySteps.toLocaleString()}</span>
                        <span className="text-xs text-amber-800 ml-1 font-bold">歩 / 目標 {stepGoal.toLocaleString()} 歩</span>
                      </div>
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-200">
                        {Math.round((dailySteps / stepGoal) * 100)}% 達成
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2.5 bg-amber-200/60 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-amber-500 rounded-full transition-all duration-500" 
                        style={{ width: `${Math.min(100, Math.round((dailySteps / stepGoal) * 100))}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* iOS Health Sync Info */}
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl">🍎</span>
                      <div>
                        <h4 className="font-bold text-gray-800 text-[11px]">iOS「ヘルスケア」アプリとの自動同期机制</h4>
                        <p className="text-[10px] text-gray-500">iPhoneのモーションセンサーおよびApple Watchからリアルタイムで歩数データを取得します。</p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-gray-200 flex items-center justify-between">
                      <span className="text-[10px] font-bold text-gray-600">自動同期スイッチ</span>
                      <button
                        type="button"
                        onClick={() => {
                          setIsHealthKitConnected(!isHealthKitConnected);
                          triggerToast(!isHealthKitConnected ? '🍎 Apple HealthKit 連動を有効化しました' : '⏸️ Apple HealthKit 連動を一時停止しました');
                        }}
                        className={`px-3 py-1 text-[10px] font-bold rounded-full transition-all ${
                          isHealthKitConnected ? 'bg-emerald-600 text-white' : 'bg-gray-300 text-gray-600'
                        }`}
                      >
                        {isHealthKitConnected ? 'ON (自動連動中)' : 'OFF'}
                      </button>
                    </div>
                  </div>

                  {/* Manual Refresh Button */}
                  <button
                    type="button"
                    onClick={handleSyncHealthKitSteps}
                    className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl shadow-xs active:scale-95 transition-all text-xs flex items-center justify-center space-x-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>今すぐiOSから最新歩数を再同期する</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowStepsModal(false)}
                    className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl active:scale-95 transition-all text-xs"
                  >
                    閉じる
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* AI NURSE / HEALTH ASSISTANT MODAL OVERLAY (Gemini AI 智能护理助手) */}
          {showAiNurseModal && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
              <div className="bg-white w-full rounded-[24px] p-5 border-2 border-emerald-600 shadow-2xl space-y-4 text-left">
                {/* Modal Header */}
                <div className="flex items-center justify-between border-b pb-2.5">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
                      <span className="text-xl">🩺</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-gray-900 flex items-center space-x-1">
                        <span>まもり AI 看護師アドバイザー</span>
                        <span className="text-[9px] bg-emerald-700 text-white font-mono font-bold px-1.5 py-0.2 rounded">Gemini 3.6</span>
                      </h3>
                      <p className="text-[10px] text-gray-500">血圧・体調・服薬データに基づくパーソナライズ指導</p>
                    </div>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => setShowAiNurseModal(false)} 
                    className="text-gray-400 font-bold text-lg hover:text-gray-600 p-1"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-3.5 text-xs">
                  {/* Current Vitals Brief */}
                  <div className="bg-emerald-50 p-3 rounded-2xl border border-emerald-200 flex items-center justify-between text-[11px]">
                    <div>
                      <span className="text-gray-500 block text-[10px] font-bold">参照中のバイタル情報</span>
                      <span className="font-bold text-emerald-950 font-mono">血圧 {sysBloodPressure}/{diaBloodPressure} mmHg · 脈拍 {pulseRate} bpm</span>
                    </div>
                    <span className="text-emerald-800 font-bold bg-white px-2 py-0.5 rounded-lg border border-emerald-200">
                      正常域
                    </span>
                  </div>

                  {/* AI Response Box */}
                  <div className="p-3.5 bg-[#FAF8F5] rounded-2xl border border-emerald-300 min-h-[100px] space-y-2 relative">
                    <div className="flex items-center space-x-2 text-[#164F3C] font-bold text-xs">
                      <span>🤖 AI看護師のメッセージ</span>
                      {isAiLoading && (
                        <span className="text-[10px] text-emerald-600 animate-pulse font-normal">（Gemini AI が分析中...）</span>
                      )}
                    </div>

                    {isAiLoading ? (
                      <div className="py-6 text-center text-gray-400 space-y-2">
                        <div className="w-6 h-6 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto animate-pulse"></div>
                        <p className="text-[11px]">AIが血圧データと服薬スケジュールを解析中...</p>
                      </div>
                    ) : (
                      <p className="text-gray-800 leading-relaxed text-[11px] font-medium whitespace-pre-wrap">
                        {aiNurseAdvice || 'こんにちは！本日も血圧は安定しています。決まったお時間のお薬を忘れずにお飲みくださいね。気になる症状があればいつでもご質問ください。'}
                      </p>
                    )}
                  </div>

                  {/* AI Quick Prompts */}
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold text-gray-500">AI看護師へワンタップで相談:</label>
                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleAskAiNurse('今日の血圧が高めか低めかアドバイスしてください')}
                        className="p-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 rounded-xl text-left font-bold text-[10px] transition-all"
                      >
                        📊 血圧評価とアドバイス
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAskAiNurse('飲み忘れを防ぐための生活の工夫を教えて')}
                        className="p-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 rounded-xl text-left font-bold text-[10px] transition-all"
                      >
                        💊 服薬アドバイス
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowAiNurseModal(false)}
                    className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl active:scale-95 transition-all text-xs"
                  >
                    閉じる
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* NATIVE iOS REAL-WORLD CALLKIT & SMS FILTER DEMO MODAL */}
          {showNativeIosDemoModal && (
            <div className="absolute inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 z-50 animate-fade-in text-left">
              <div className="bg-[#121212] text-white w-full max-h-[92%] overflow-y-auto rounded-[28px] p-4 border-2 border-[#326853] shadow-2xl space-y-3.5">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-800 pb-2.5">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-[#326853] text-[#88C0A7] flex items-center justify-center font-bold text-sm">
                      
                    </div>
                    <div>
                      <h3 className="font-extrabold text-xs text-emerald-400 flex items-center space-x-1">
                        <span>真实 iOS 物理环境运行原理演示</span>
                      </h3>
                      <p className="text-[10px] text-gray-400">iOS CallKit 锁屏来电/短信自动拦截 & 子女 LINE 实时通报</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowNativeIosDemoModal(false)}
                    className="text-gray-400 font-bold text-base hover:text-white p-1"
                  >
                    ✕
                  </button>
                </div>

                {/* Architecture Principle Note */}
                <div className="bg-[#1C2A24] p-3 rounded-2xl border border-[#326853] text-[11px] space-y-1 text-emerald-100">
                  <p className="font-bold text-emerald-300 flex items-center space-x-1">
                    <span>💡 现实环境解答：老人接电话时根本无法/不需要打开APP！</span>
                  </p>
                  <p className="text-[10px] leading-relaxed text-gray-300">
                    在真实 iOS (iPhone) 环境中，诈骗拦截完全依靠 <strong>iOS 系统级 Extension (CallKit 与 ILMessageFilter)</strong> 在后台自动运行。老人无需做任何操作，甚至无需打开 APP！
                  </p>
                </div>

                {/* Navigation Tabs */}
                <div className="grid grid-cols-4 gap-1 bg-gray-900 p-1 rounded-xl text-[10px] font-bold text-center border border-gray-800">
                  <button
                    type="button"
                    onClick={() => setNativeDemoTab('callkit')}
                    className={`py-1.5 rounded-lg transition-all ${
                      nativeDemoTab === 'callkit' ? 'bg-[#326853] text-white shadow-xs font-black' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    📞 锁屏来电
                  </button>
                  <button
                    type="button"
                    onClick={() => setNativeDemoTab('sms')}
                    className={`py-1.5 rounded-lg transition-all ${
                      nativeDemoTab === 'sms' ? 'bg-[#326853] text-white shadow-xs font-black' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    📩 信息过滤
                  </button>
                  <button
                    type="button"
                    onClick={() => setNativeDemoTab('line')}
                    className={`py-1.5 rounded-lg transition-all ${
                      nativeDemoTab === 'line' ? 'bg-[#326853] text-white shadow-xs font-black' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    💬 子女LINE
                  </button>
                  <button
                    type="button"
                    onClick={() => setNativeDemoTab('arch')}
                    className={`py-1.5 rounded-lg transition-all ${
                      nativeDemoTab === 'arch' ? 'bg-[#326853] text-white shadow-xs font-black' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    ⚙️ 系统架构
                  </button>
                </div>

                {/* TAB 1: CALLKIT LOCKSCREEN */}
                {nativeDemoTab === 'callkit' && (
                  <div className="space-y-3 animate-fade-in">
                    <div className="bg-black p-4 rounded-3xl border border-gray-800 space-y-4 shadow-inner text-center">
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-gray-400">iOS Native CallKit System View</span>
                        <h4 className="text-xl font-mono text-white tracking-widest font-bold">080-3819-2231</h4>
                        <span className="text-[11px] text-gray-400">東京都 麹町 (不審番号)</span>
                      </div>

                      {/* CallKit Banner */}
                      <div className="bg-red-950/90 border-2 border-red-500 text-red-200 p-2.5 rounded-2xl text-xs space-y-1 shadow-lg text-left">
                        <div className="flex items-center space-x-1.5 font-bold text-red-400">
                          <span className="text-base animate-pulse">⚠️</span>
                          <span>警視庁特殊詐欺DB連動：迷惑電話の疑い</span>
                        </div>
                        <p className="text-[10px] text-red-300">
                          まもりAI CallKit 自动判定：此号码已被警视厅列入“俺俺诈骗/银行卡骗局”黑名单。已自动开启 AI 门神代接与录音。
                        </p>
                      </div>

                      {/* Mock Call Actions */}
                      <div className="flex justify-around pt-2">
                        <div className="flex flex-col items-center space-y-1">
                          <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white text-xl shadow-lg animate-bounce">
                            📞
                          </div>
                          <span className="text-[10px] text-gray-300 font-bold">拒绝 / 挂断</span>
                        </div>
                        <div className="flex flex-col items-center space-y-1">
                          <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center text-white text-xl shadow-lg">
                            🤖
                          </div>
                          <span className="text-[10px] text-emerald-300 font-bold">AI 门神自动代接中</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-900 p-2.5 rounded-xl border border-gray-800 text-[10px] text-gray-300 space-y-1">
                      <span className="font-bold text-emerald-400 block">✨ 老人端零负担表现:</span>
                      <p>当诈骗电话响起时，iPhone 屏幕直接显示【警视厅/まもりAI 警告标识】。老人无需打开任何APP，只需直接按红键挂断，或让 AI 门神代接录音，全过程完全无需手动操作！</p>
                    </div>
                  </div>
                )}

                {/* TAB 2: SMS FILTER */}
                {nativeDemoTab === 'sms' && (
                  <div className="space-y-3 animate-fade-in">
                    <div className="bg-black p-3.5 rounded-3xl border border-gray-800 space-y-3 text-xs">
                      <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                        <span className="font-bold text-gray-300">iPhone メッセージ (Messages)</span>
                        <span className="text-[9px] bg-red-900 text-red-200 px-2 py-0.5 rounded-full font-bold">
                          ILMessageFilterExtension 启用
                        </span>
                      </div>

                      <div className="bg-gray-900 p-2.5 rounded-2xl border border-gray-800 space-y-2">
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="font-bold text-red-400">🚫 迷惑メッセージ (自动隔离)</span>
                          <span className="text-gray-500 font-mono">10:14</span>
                        </div>
                        <p className="text-gray-200 text-[11px] leading-snug">
                          【NTT法務部】未払い料金が発生しております。本日中に連絡がない場合は法的措置に移行します。http://phish-tokyo.net/pay
                        </p>
                        <div className="bg-red-950 p-2 rounded-xl border border-red-800 text-[10px] text-red-300 space-y-0.5">
                          <span className="font-bold block text-red-400">🤖 Gemini LLM 识别判定结果:</span>
                          <p>高风险钓鱼短信 (恶意日文敬语威逼 + 假冒官方 URL)。已被 iOS SMS Filter 自动移至垃圾箱，不打扰老人！</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-900 p-2.5 rounded-xl border border-gray-800 text-[10px] text-gray-300 space-y-1">
                      <span className="font-bold text-emerald-400 block">✨ 恶意钓鱼短信自动拦截:</span>
                      <p>利用 iOS 短信过滤扩展，所有钓鱼链接、恶意催缴短信在到达收件箱前就被静音隔离，从源头切断老人受骗风险。</p>
                    </div>
                  </div>
                )}

                {/* TAB 3: DAUGHTER LINE NOTIFICATION */}
                {nativeDemoTab === 'line' && (
                  <div className="space-y-3 animate-fade-in">
                    <div className="bg-[#8C9DAE] p-3.5 rounded-3xl space-y-3 text-xs">
                      <div className="bg-[#06C755] text-white p-2 rounded-xl font-bold flex items-center justify-between text-[11px]">
                        <span>LINE (佐藤美咲さんの画面)</span>
                        <span className="text-[9px] bg-white text-[#06C755] px-1.5 py-0.2 rounded font-mono">Official Bot</span>
                      </div>

                      <div className="bg-white text-gray-900 p-3 rounded-2xl border-2 border-[#06C755] space-y-2 shadow-md">
                        <div className="flex items-center space-x-1.5 text-red-600 font-extrabold text-xs">
                          <span>🚨 【まもりAI】防犯緊急アラート</span>
                        </div>

                        <p className="text-[11px] leading-snug font-medium text-gray-800">
                          お母様（マサコさん）のiPhoneで『未払い料金請求SMS』および不審電話（080-3819-2231）をiOS CallKitで自動拒否しました。
                        </p>

                        <div className="bg-gray-100 p-2 rounded-xl text-[10px] space-y-1 text-gray-700 font-mono">
                          <p>▸ 检出类型: 架空料金請求 (詐欺URL)</p>
                          <p>▸ 处理状态: 已自动拒接并移入垃圾箱</p>
                          <p>▸ AI 风险评分: 98/100 (极危险)</p>
                        </div>

                        <div className="grid grid-cols-2 gap-1.5 pt-1">
                          <button
                            type="button"
                            onClick={() => triggerToast('📞 已发起对母亲(マサコさん)的直接通话...')}
                            className="py-2 bg-[#06C755] text-white font-bold text-[10px] rounded-xl text-center shadow-xs active:scale-95"
                          >
                            📞 1秒呼叫母亲确认
                          </button>
                          <button
                            type="button"
                            onClick={() => triggerToast('📄 已调取 AI 门神通话转写记录...')}
                            className="py-2 bg-gray-200 text-gray-800 font-bold text-[10px] rounded-xl text-center active:scale-95"
                          >
                            📄 查看语音转写
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-900 p-2.5 rounded-xl border border-gray-800 text-[10px] text-gray-300 space-y-1">
                      <span className="font-bold text-emerald-400 block">✨ 远程子女安心看护:</span>
                      <p>老人被拦截的同时，子女的 LINE 微信群立刻收到详细通报，子女可一键反拨母亲电话或查看录音，构建双重安全防护网。</p>
                    </div>
                  </div>
                )}

                {/* TAB 4: SYSTEM ARCHITECTURE */}
                {nativeDemoTab === 'arch' && (
                  <div className="space-y-3 animate-fade-in text-xs">
                    <div className="bg-gray-900 p-3 rounded-2xl border border-gray-800 space-y-2 text-gray-200">
                      <h4 className="font-bold text-emerald-400 text-xs">🛠️ iOS 原生 App & 后端架构图:</h4>
                      <div className="bg-black/90 p-2.5 rounded-xl border border-gray-800 font-mono text-[10px] space-y-1 text-emerald-300">
                        <p>1. [iOS Native Client] Swift CallKit + ILMessageFilter Extension</p>
                        <p>2. [Local DB] 警視庁/警察庁 迷惑電話 DB (每天半夜自动更新)</p>
                        <p>3. [Cloud AI Server] Node.js Express + Gemini 3.6 Flash API</p>
                        <p>4. [Notification Engine] LINE Messaging API Webhook Push</p>
                      </div>
                    </div>

                    <div className="bg-[#1C2A24] p-3 rounded-2xl border border-[#326853] space-y-1.5 text-gray-300 text-[11px]">
                      <span className="font-bold text-emerald-300">✅ 核心优势结论:</span>
                      <ul className="list-disc list-inside space-y-1 text-[10px] text-gray-200">
                        <li><strong>老人端 0 门槛:</strong> 不打字、不看文字、不上网、不用在接电话时打开 APP。</li>
                        <li><strong>系统级防范:</strong> 在 iOS 系统底层拦截，绝非简单的“应用内试用”。</li>
                        <li><strong>家属极速通报:</strong> 绑定子女 LINE 账号，出现风险 1秒内推送提醒。</li>
                      </ul>
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => setShowNativeIosDemoModal(false)}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl active:scale-95 transition-all text-xs shadow-md"
                >
                  关闭演示，返回 iOS 模拟器
                </button>
              </div>
            </div>
          )}

          {/* ULTRA-SIMPLE SENIOR ALERT MODAL */}
          {showUltraSimpleSeniorModal && (
            <div className="absolute inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 z-50 animate-fade-in text-left">
              <div className="bg-[#121212] text-white w-full max-h-[92%] overflow-y-auto rounded-[28px] p-4 border-2 border-amber-500 shadow-2xl space-y-3.5">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-800 pb-2.5">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-amber-500 text-amber-950 flex items-center justify-center font-bold text-sm">
                      📢
                    </div>
                    <div>
                      <h3 className="font-extrabold text-xs text-amber-400">
                        老年人端：3 种最简单极简提醒方案
                      </h3>
                      <p className="text-[10px] text-gray-400">零操作 · 视力听力友好 · 1秒防诈</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowUltraSimpleSeniorModal(false)}
                    className="text-gray-400 font-bold text-base hover:text-white p-1"
                  >
                    ✕
                  </button>
                </div>

                {/* 3 Ultra-Simple Solutions Cards */}
                <div className="space-y-3 text-xs">
                  {/* Solution 1: Voice Announcement */}
                  <div className="bg-gray-900 border-2 border-red-500/80 p-3 rounded-2xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-black text-red-400 text-xs flex items-center space-x-1">
                        <span>📢 方案一：大音量自动语音播报 (老花眼首选)</span>
                      </span>
                      <span className="text-[9px] bg-red-950 text-red-300 border border-red-800 px-2 py-0.5 rounded-full font-mono">
                        不用看屏幕
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-300 leading-snug">
                      电话响起或收到钓鱼短信时，手机扬声器自动以最大音量朗读警告（无需看字、无需眼神聚焦）：
                    </p>
                    <div className="bg-black/80 p-2.5 rounded-xl border border-gray-800 text-[11px] text-red-300 font-bold font-mono">
                      「🚨 警报！这是假冒警察的骗子电话！请立刻按红键挂断！已自动向女儿美咲发送提醒！」
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        speakMessage('🚨 警报！这是假冒警察的骗子电话！请立刻按红键挂断！已自动向女儿发送提醒！', 'zh-CN');
                        triggerToast('🔊 正在以最大音量播放模拟语音提示...');
                      }}
                      className="w-full py-2 bg-red-600 hover:bg-red-700 text-white font-black text-xs rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center space-x-1"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>点击试听大音量语音播报效果</span>
                    </button>
                  </div>

                  {/* Solution 2: Red/Green Traffic Light Fullscreen Card */}
                  <div className="bg-gray-900 border-2 border-emerald-500/80 p-3 rounded-2xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-black text-emerald-400 text-xs flex items-center space-x-1">
                        <span>🔴🟢 方案二：红绿灯巨型全屏色块 (色块级辨识)</span>
                      </span>
                      <span className="text-[9px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded-full font-mono">
                        一看颜色就懂
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-300 leading-snug">
                      把复杂文字全部隐藏！只有 3 种极度醒目的颜色：
                    </p>
                    <div className="grid grid-cols-2 gap-1.5 text-[10px] font-bold">
                      <div className="bg-red-600 text-white p-2 rounded-xl text-center shadow-xs">
                        🔴 纯红全屏 = 诈骗！
                        <span className="block text-[9px] font-normal opacity-90">直接按红按钮挂断</span>
                      </div>
                      <div className="bg-emerald-600 text-white p-2 rounded-xl text-center shadow-xs">
                        🟢 纯绿全屏 = 家属！
                        <span className="block text-[9px] font-normal opacity-90">女儿美咲来电放心接</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setDetectedScamKeyword('假冒警视厅/大使馆电话');
                        setShowHangupEmergencyOverlay(true);
                        togglePoliceSiren();
                        setShowUltraSimpleSeniorModal(false);
                      }}
                      className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-amber-950 font-black text-xs rounded-xl shadow-md transition-all active:scale-95"
                    >
                      点击试看“红绿灯巨型警报全屏”
                    </button>
                  </div>

                  {/* Solution 3: 1-Tap SMS Forward Card */}
                  <div className="bg-gray-900 border-2 border-amber-500/80 p-3 rounded-2xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-black text-amber-400 text-xs flex items-center space-x-1">
                        <span>📲 方案三：短信极简卡片 + 一键问女儿</span>
                      </span>
                      <span className="text-[9px] bg-amber-950 text-amber-300 border border-amber-800 px-2 py-0.5 rounded-full font-mono">
                        1秒决策
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-300 leading-snug">
                      收到诱导短信时，自动过滤所有网址链接，只显示【1个巨型问号卡片】：
                    </p>
                    <div className="bg-amber-950/80 border border-amber-500 p-2.5 rounded-xl space-y-2">
                      <div className="flex items-center justify-between text-[11px] text-amber-200 font-bold">
                        <span>⚠️ 收到假的未缴费催缴短信</span>
                        <span className="text-[9px] text-red-400">千万别点网址</span>
                      </div>
                      <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                        <button
                          type="button"
                          onClick={() => triggerToast('🗑️ 已删除该诈骗短信！')}
                          className="py-2 bg-red-600 text-white font-bold rounded-lg text-center"
                        >
                          🔴 1键删除
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setLineNotificationSent(true);
                            triggerToast('💬 已把短信内容一键转发给女儿(美咲)核实！');
                          }}
                          className="py-2 bg-emerald-600 text-white font-bold rounded-lg text-center"
                        >
                          🟢 1键问女儿
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowUltraSimpleSeniorModal(false)}
                  className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-amber-950 font-bold rounded-xl active:scale-95 transition-all text-xs shadow-md"
                >
                  关闭极简方案说明
                </button>
              </div>
            </div>
          )}
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-400 rounded-full z-50"></div>
        </div>
      </div>
    </div>
  );
};
