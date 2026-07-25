import React from 'react';
import { ArrowLeft, Pill, MessageCircle, FileText } from 'lucide-react';
import { ScreenId } from '../types';

interface CaregiverMedicationScreenProps {
  onNavigate: (screen: ScreenId) => void;
  seniorName: string;
  medications: Array<{
    id: string;
    name: string;
    dosage: string;
    time: string;
    addedBy: string;
    taken: boolean;
  }>;
  showCaregiverAddModal: boolean;
  setShowCaregiverAddModal: (show: boolean) => void;
  handleAddMedicationFromCaregiver: (e: React.FormEvent) => void;
  caregiverMedName: string;
  setCaregiverMedName: (val: string) => void;
  caregiverMedDosage: string;
  setCaregiverMedDosage: (val: string) => void;
  caregiverMedTime: string;
  setCaregiverMedTime: (val: string) => void;
  editingMedId: string | null;
  setEditingMedId: (id: string | null) => void;
  handleSaveEditMedication: (e: React.FormEvent) => void;
  editMedName: string;
  setEditMedName: (val: string) => void;
  editMedDosage: string;
  setEditMedDosage: (val: string) => void;
  editMedTime: string;
  setEditMedTime: (val: string) => void;
  handleStartEditMedication: (med: any) => void;
  handleDeleteMedication: (id: string) => void;
  handleScanElectronicPrescriptionQR: () => void;
  triggerToast: (msg: string) => void;
}

export const CaregiverMedicationScreen: React.FC<CaregiverMedicationScreenProps> = ({
  onNavigate,
  seniorName,
  medications,
  showCaregiverAddModal,
  setShowCaregiverAddModal,
  handleAddMedicationFromCaregiver,
  caregiverMedName,
  setCaregiverMedName,
  caregiverMedDosage,
  setCaregiverMedDosage,
  caregiverMedTime,
  setCaregiverMedTime,
  editingMedId,
  setEditingMedId,
  handleSaveEditMedication,
  editMedName,
  setEditMedName,
  editMedDosage,
  setEditMedDosage,
  editMedTime,
  setEditMedTime,
  handleStartEditMedication,
  handleDeleteMedication,
  handleScanElectronicPrescriptionQR,
  triggerToast,
}) => {
  return (
    <div className="p-5 space-y-4 pb-24 text-left">
      <div className="flex items-center justify-between border-b-2 border-[#C0C9C2] pb-3">
        <button onClick={() => onNavigate('caregiver_dashboard')} className="p-1 rounded-full text-[#326853] cursor-pointer">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-base font-bold text-[#326853] font-serif flex items-center space-x-1.5">
          <Pill className="w-5 h-5 text-[#88C0A7]" />
          <span>お薬・処方箋管理</span>
        </h1>
        <span className="text-[10px] bg-[#88C0A7]/30 text-[#164F3C] font-bold px-2 py-0.5 rounded-full border border-[#88C0A7]">
          リアルタイム同期
        </span>
      </div>

      {/* PARENT MEDICATION MANAGEMENT CARD */}
      <div className="bg-white rounded-[20px] p-4 border-2 border-[#88C0A7] shadow-xs space-y-3.5">
        <div className="flex items-center justify-between border-b border-gray-100 pb-2">
          <div>
            <h2 className="font-bold text-sm text-[#164F3C]">{seniorName} の服用中のお薬</h2>
            <p className="text-[10px] text-gray-500">登録件数: {medications.length} 件</p>
          </div>
          <button 
            onClick={() => setShowCaregiverAddModal(!showCaregiverAddModal)}
            className="px-3 py-1.5 bg-[#326853] hover:bg-[#275342] text-white font-bold text-xs rounded-xl flex items-center space-x-1 shadow-xs active:scale-95 cursor-pointer"
          >
            <Pill className="w-3.5 h-3.5" />
            <span>＋ お薬を追加</span>
          </button>
        </div>

        {/* Add Medication Form */}
        {showCaregiverAddModal && (
          <form onSubmit={handleAddMedicationFromCaregiver} className="bg-[#EBF5F0] border-2 border-[#326853] rounded-2xl p-3.5 space-y-3 animate-fade-in text-xs">
            <div className="flex items-center justify-between border-b border-[#88C0A7] pb-2">
              <span className="font-bold text-[#164F3C] text-xs">💊 親のお薬をリモート追加</span>
              <button type="button" onClick={() => setShowCaregiverAddModal(false)} className="text-gray-500 hover:text-gray-700 font-bold cursor-pointer">✕</button>
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">お薬の名称 (例: 降压药)</label>
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
              className="w-full py-2 bg-[#326853] text-white font-bold text-xs rounded-xl shadow-xs hover:bg-[#275342] transition-all cursor-pointer"
            >
              保存して親の画面に即时反映
            </button>
          </form>
        )}

        {/* Edit Medication Inline Form */}
        {editingMedId && (
          <form onSubmit={handleSaveEditMedication} className="bg-amber-50 border-2 border-amber-400 rounded-2xl p-3.5 space-y-3 animate-fade-in text-xs">
            <div className="flex items-center justify-between border-b border-amber-300 pb-2">
              <span className="font-bold text-amber-900 text-xs">✏️ お薬の編集</span>
              <button type="button" onClick={() => setEditingMedId(null)} className="text-gray-500 font-bold cursor-pointer">✕</button>
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

            <button type="submit" className="w-full py-2 bg-amber-600 text-white font-bold text-xs rounded-xl cursor-pointer">
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
                  className="text-[#326853] font-bold hover:underline text-[11px] cursor-pointer"
                >
                  ✏️
                </button>
                <button 
                  onClick={() => handleDeleteMedication(m.id)}
                  className="text-red-500 font-bold hover:underline text-[11px] cursor-pointer"
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
          className="w-full py-2.5 bg-[#EBF5F0] hover:bg-[#d8ebd2] text-[#164F3C] font-bold text-xs rounded-xl border border-[#88C0A7] flex items-center justify-center space-x-1.5 transition-all cursor-pointer"
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
          className="w-full py-2.5 bg-[#06C755] text-white font-bold text-xs rounded-xl flex items-center justify-center space-x-1.5 shadow-xs hover:bg-[#05b34c] cursor-pointer"
        >
          <MessageCircle className="w-4 h-4" />
          <span>残薬確認とLINE処方箋調剤予約を送信</span>
        </button>
      </div>

      {/* DOCTOR PDF REPORT EXPORT */}
      <button 
        onClick={() => alert("医師に見せる服薬・健康レポート(PDF)を正常に作成しました")}
        className="w-full h-12 bg-[#326853] text-white font-bold text-xs rounded-xl flex items-center justify-center space-x-2 shadow-xs active:scale-98 cursor-pointer"
      >
        <FileText className="w-4 h-4" />
        <span>医師に見せる服薬レポートを出力 (PDF)</span>
      </button>
    </div>
  );
};
