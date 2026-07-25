import React, { useState } from 'react';
import { ScreenId } from './types';
import { IOSSimulator } from './components/iOSSimulator';
import { SwiftCodeViewer } from './components/SwiftCodeViewer';
import { 
  Smartphone, Code, Layers, Eye, Sparkles, 
  CheckCircle, Heart, ShieldAlert, Pill, Calendar, 
  MessageCircle, FileText, UserCheck, HelpCircle
} from 'lucide-react';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('senior_home');
  const [viewMode, setViewMode] = useState<'simulator' | 'code' | 'split'>('split');
  const [accessibilityLargeText, setAccessibilityLargeText] = useState(false);

  const screensList: { id: ScreenId; name: string; tag: string; icon: any }[] = [
    { id: 'senior_home', name: '👴 老年人端：首页', tag: 'Senior Mode', icon: UserCheck },
    { id: 'scanner', name: '👴 老年人端：服药登记', tag: 'Manual Entry', icon: Pill },
    { id: 'history', name: '👴 老年人端：服药日历', tag: 'Calendar Stamps', icon: Calendar },
    { id: 'caregiver_dashboard', name: '👨‍👩‍👧 子女端：关怀看板', tag: 'Caregiver Portal', icon: Heart },
    { id: 'security_alert', name: '👨‍👩‍👧 子女端：防诈拦截日志', tag: 'Security Alert', icon: ShieldAlert },
    { id: 'medication', name: '👨‍👩‍👧 子女端：远程药盒管理', tag: 'Caregiver Meds', icon: Pill },
    { id: 'subscription', name: '👨‍👩‍👧 子女端：7天体验与订阅', tag: 'Paywall', icon: Sparkles },
    { id: 'legal', name: '⚖️ 法律声明与规约', tag: 'Legal Disclosure', icon: FileText },
    { id: 'onboarding', name: '📲 角色绑定 & LINE', tag: 'Onboarding', icon: MessageCircle },
  ];

  return (
    <div className="min-h-screen bg-[#F2F4F3] text-[#1A1C1C] flex flex-col font-sans">
      {/* Global Header */}
      <header className="bg-white border-b-2 border-[#C0C9C2] px-6 py-4 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-[#326853] text-[#88C0A7] flex items-center justify-center font-bold text-xl shadow-md">
              ま
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-extrabold text-[#326853]">《安心 Life》（まもり AI）</h1>
                <span className="text-xs bg-[#88C0A7]/30 text-[#164F3C] font-bold px-2.5 py-0.5 rounded-full">
                  iOS SwiftUI Architecture
                </span>
              </div>
              <p className="text-xs text-[#404944] font-medium">
                面向日本市场的 iOS 高龄化关怀与服药管理 App · Japandi 极简无障碍设计
              </p>
            </div>
          </div>

          {/* View Mode & Role Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Quick Role Switcher */}
            <div className="flex items-center bg-[#F4DFCB] p-1 rounded-xl border-2 border-[#6B5C4C]/30 shadow-sm">
              <button
                onClick={() => setCurrentScreen('senior_home')}
                className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  currentScreen === 'senior_home' || currentScreen === 'scanner' || currentScreen === 'history'
                    ? 'bg-[#326853] text-white shadow-sm'
                    : 'text-[#241A0E] hover:bg-white/50'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>👴 老年人端</span>
              </button>

              <button
                onClick={() => setCurrentScreen('caregiver_dashboard')}
                className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  currentScreen === 'caregiver_dashboard' || currentScreen === 'security_alert' || currentScreen === 'medication' || currentScreen === 'subscription' || currentScreen === 'legal'
                    ? 'bg-[#06C755] text-white shadow-sm ring-2 ring-emerald-300'
                    : 'text-[#241A0E] hover:bg-white/50'
                }`}
              >
                <Heart className="w-3.5 h-3.5" />
                <span>👨‍👩‍👧 子女端 (Caregiver)</span>
              </button>
            </div>

            {/* Senior Accessibility Toggle */}
            <button
              onClick={() => setAccessibilityLargeText(!accessibilityLargeText)}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border-2 ${
                accessibilityLargeText
                  ? 'bg-[#326853] text-white border-[#326853] shadow-md'
                  : 'bg-white text-[#326853] border-[#88C0A7] hover:bg-[#88C0A7]/10'
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>{accessibilityLargeText ? 'Accessibility: 大字号开启' : 'Accessibility: 标准字号'}</span>
            </button>

            {/* View Switching Buttons */}
            <div className="bg-[#EEEEEE] p-1 rounded-xl flex space-x-1 border border-[#C0C9C2]">
              <button
                onClick={() => setViewMode('simulator')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'simulator' ? 'bg-white text-[#326853] shadow-sm' : 'text-[#404944] hover:text-[#1A1C1C]'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span>iOS 模拟器</span>
              </button>

              <button
                onClick={() => setViewMode('split')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'split' ? 'bg-white text-[#326853] shadow-sm' : 'text-[#404944] hover:text-[#1A1C1C]'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>双栏分屏 (Simulator + Swift)</span>
              </button>

              <button
                onClick={() => setViewMode('code')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'code' ? 'bg-white text-[#326853] shadow-sm' : 'text-[#404944] hover:text-[#1A1C1C]'
                }`}
              >
                <Code className="w-4 h-4" />
                <span>Swift 源码查看</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Screen Selector Toolbar */}
      <div className="bg-[#E8E8E8] border-b border-[#C0C9C2] px-6 py-2.5 overflow-x-auto">
        <div className="max-w-7xl mx-auto flex items-center space-x-2">
          <span className="text-xs font-bold text-[#404944] shrink-0 mr-2">8大核心页面模拟:</span>
          {screensList.map((screen) => {
            const IconComp = screen.icon;
            const isActive = currentScreen === screen.id;
            return (
              <button
                key={screen.id}
                onClick={() => setCurrentScreen(screen.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 border-2 ${
                  isActive
                    ? 'bg-[#326853] text-white border-[#326853] shadow-sm'
                    : 'bg-white text-[#1A1C1C] border-[#C0C9C2] hover:bg-[#F3F3F3]'
                }`}
              >
                <IconComp className={`w-3.5 h-3.5 ${isActive ? 'text-[#88C0A7]' : 'text-[#326853]'}`} />
                <span>{screen.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 overflow-hidden">
        {viewMode === 'simulator' && (
          <div className="flex justify-center items-center py-4">
            <IOSSimulator
              currentScreen={currentScreen}
              onNavigate={setCurrentScreen}
              accessibilityLargeText={accessibilityLargeText}
              onToggleAccessibility={() => setAccessibilityLargeText(!accessibilityLargeText)}
            />
          </div>
        )}

        {viewMode === 'code' && (
          <div className="h-[760px]">
            <SwiftCodeViewer />
          </div>
        )}

        {viewMode === 'split' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full items-start">
            {/* Left: iOS Simulator */}
            <div className="lg:col-span-5 flex justify-center">
              <IOSSimulator
                currentScreen={currentScreen}
                onNavigate={setCurrentScreen}
                accessibilityLargeText={accessibilityLargeText}
                onToggleAccessibility={() => setAccessibilityLargeText(!accessibilityLargeText)}
              />
            </div>

            {/* Right: Swift Code & Architecture Viewer */}
            <div className="lg:col-span-7 h-[830px]">
              <SwiftCodeViewer />
            </div>
          </div>
        )}
      </main>

      {/* Footer Info */}
      <footer className="bg-white border-t border-[#C0C9C2] py-4 px-6 text-center text-xs text-[#404944]">
        <p className="font-medium">
          《安心 Life》（まもり AI）© 2026 Anshin Life Inc. · iOS 18 SwiftUI & MVVM Architecture Design Suite
        </p>
      </footer>
    </div>
  );
}
