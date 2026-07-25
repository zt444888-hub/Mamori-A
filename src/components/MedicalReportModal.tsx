import React from 'react';
import { Activity } from 'lucide-react';

interface MedicalReportModalProps {
  show: boolean;
  onClose: () => void;
  bpReportData: any;
  seniorName: string;
  bpHistory: any[];
  handlePushBpReportToLine: () => void;
  handleStartCall: (type: 'phone' | 'video', name: string, avatar: string) => void;
}

export const MedicalReportModal: React.FC<MedicalReportModalProps> = ({
  show,
  onClose,
  bpReportData,
  seniorName,
  bpHistory,
  handlePushBpReportToLine,
  handleStartCall,
}) => {
  if (!show || !bpReportData) return null;

  return (
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
            onClick={onClose} 
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

        {/* Doctor Question Guide */}
        <div className="space-y-1.5 text-xs bg-amber-50/60 p-3 rounded-2xl border border-amber-200">
          <span className="font-bold text-amber-950 block text-[11px]">👨‍⚕️ 医生诊疗问讯提纲建议 (就诊时展示):</span>
          <ul className="space-y-1 pl-1 text-[11px] text-amber-900">
            {bpReportData.doctorQuestionGuide.map((q: string, i: number) => (
              <li key={i} className="flex items-start space-x-1.5">
                <span className="font-bold text-amber-700 shrink-0">{i + 1}.</span>
                <span>{q}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            type="button"
            onClick={handlePushBpReportToLine}
            className="py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all active:scale-95 flex items-center justify-center space-x-1"
          >
            <span>📲 推送至子女 LINE</span>
          </button>
          <button
            type="button"
            onClick={() => handleStartCall('phone', 'かかりつけ医 (鈴木クリニック)', 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300')}
            className="py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all active:scale-95 flex items-center justify-center space-x-1"
          >
            <span>📞 1键拨打社区诊所电话</span>
          </button>
        </div>

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl active:scale-95 transition-all"
        >
          关闭报告
        </button>
      </div>
    </div>
  );
};
