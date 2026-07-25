import React, { useState } from 'react';
import { SWIFT_ARCHITECTURE_MD, SWIFT_SENIOR_HOME_CODE, SWIFT_CAREGIVER_DASHBOARD_CODE, SWIFT_SCANNER_VIEWMODEL_CODE } from '../data/swiftCodeTemplates';
import { Copy, Check, FileCode, Layers, Server, Code } from 'lucide-react';

export const SwiftCodeViewer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'arch' | 'senior' | 'caregiver' | 'scanner_vm'>('arch');
  const [copied, setCopied] = useState<string | null>(null);

  const getActiveCode = () => {
    switch (activeTab) {
      case 'arch':
        return SWIFT_ARCHITECTURE_MD;
      case 'senior':
        return SWIFT_SENIOR_HOME_CODE;
      case 'caregiver':
        return SWIFT_CAREGIVER_DASHBOARD_CODE;
      case 'scanner_vm':
        return SWIFT_SCANNER_VIEWMODEL_CODE;
      default:
        return '';
    }
  };

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-[#1A1C1C] text-gray-200 rounded-2xl overflow-hidden border-2 border-[#404944] shadow-2xl">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#2F3131] border-b border-[#404944] overflow-x-auto">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block"></span>
          </div>
          <span className="text-xs font-mono text-gray-400 pl-2 border-l border-gray-600">Xcode 16.0 / iOS 18 / SwiftUI</span>
        </div>

        <button
          onClick={() => handleCopy(activeTab, getActiveCode())}
          className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-[#326853] hover:bg-[#88C0A7] hover:text-[#164F3C] text-white transition-all shadow-sm active:scale-95"
        >
          {copied === activeTab ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Swift Code</span>
            </>
          )}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex bg-[#242626] border-b border-[#404944] overflow-x-auto text-xs font-mono">
        <button
          onClick={() => setActiveTab('arch')}
          className={`flex items-center space-x-2 px-4 py-2.5 border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'arch'
              ? 'border-[#88C0A7] text-[#88C0A7] bg-[#1A1C1C] font-bold'
              : 'border-transparent text-gray-400 hover:text-gray-200 hover:bg-[#2A2C2C]'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>1. 项目架构说明 (Architecture)</span>
        </button>

        <button
          onClick={() => setActiveTab('senior')}
          className={`flex items-center space-x-2 px-4 py-2.5 border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'senior'
              ? 'border-[#88C0A7] text-[#88C0A7] bg-[#1A1C1C] font-bold'
              : 'border-transparent text-gray-400 hover:text-gray-200 hover:bg-[#2A2C2C]'
          }`}
        >
          <FileCode className="w-4 h-4 text-emerald-400" />
          <span>2. SeniorHomeView.swift (老年人首页)</span>
        </button>

        <button
          onClick={() => setActiveTab('caregiver')}
          className={`flex items-center space-x-2 px-4 py-2.5 border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'caregiver'
              ? 'border-[#88C0A7] text-[#88C0A7] bg-[#1A1C1C] font-bold'
              : 'border-transparent text-gray-400 hover:text-gray-200 hover:bg-[#2A2C2C]'
          }`}
        >
          <FileCode className="w-4 h-4 text-blue-400" />
          <span>3. CaregiverDashboardView.swift (子女端看板)</span>
        </button>

        <button
          onClick={() => setActiveTab('scanner_vm')}
          className={`flex items-center space-x-2 px-4 py-2.5 border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'scanner_vm'
              ? 'border-[#88C0A7] text-[#88C0A7] bg-[#1A1C1C] font-bold'
              : 'border-transparent text-gray-400 hover:text-gray-200 hover:bg-[#2A2C2C]'
          }`}
        >
          <Server className="w-4 h-4 text-amber-400" />
          <span>4. ManualMedicationEntryViewModel.swift (手動/家属録入)</span>
        </button>
      </div>

      {/* Code / Markdown Content */}
      <div className="flex-1 overflow-auto p-4 font-mono text-xs sm:text-sm leading-relaxed bg-[#1A1C1C] selection:bg-[#326853]">
        <pre className="whitespace-pre-wrap font-mono text-emerald-300/90">
          <code>{getActiveCode()}</code>
        </pre>
      </div>
    </div>
  );
};
