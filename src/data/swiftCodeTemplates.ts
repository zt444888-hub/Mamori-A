export const SWIFT_ARCHITECTURE_MD = `# 《安心 Life》（まもり AI）iOS SwiftUI 架构设计规范

本架构基于 **MVVM + Clean Architecture** 模式，专为日本高龄化市场设计，满足**高无障碍适配 (Accessibility)**、**Japandi 极简日式视觉 (Ultra-Accessible Japandi)** 以及 **iOS 硬件 API 高效集成**。

---

## 📁 项目目录结构 (Directory Layout)

\`\`\`
AnshinLife/
├── App/
│   ├── AnshinLifeApp.swift               // 应用入口 & Dynamic Type 全局配置
│   └── AppState.swift                    // 全局应用状态 (角色切换、LINE 登录 Session)
│
├── Models/
│   ├── MedicationSchedule.swift          // 药品与服药计划数据模型
│   ├── ActivityLog.swift                 // 活动日志 (服药履历 / 防犯拦截)
│   ├── CaregiverStatus.swift             // 被看护老人健康与服药状态
│   ├── ManualMedicationItem.swift        // 手动与子女代理录入药品数据模型
│   └── UserProfile.swift                 // 用户与关联亲属 Profile
│
├── ViewModels/
│   ├── SeniorHomeViewModel.swift         // 老年人首页逻辑 (服药打卡、LINE 自动通知触发)
│   ├── CaregiverDashboardViewModel.swift // 子女端看板逻辑 (帮父母远程添加药物、LINE 每日推送)
│   ├── ManualMedicationEntryViewModel.swift // 极简手動/家属録入 ViewModel (精准手持录入)
│   ├── MedicationHistoryViewModel.swift  // 服药月历 ViewModel (花丸 Stamp 计算与 PDF 导出)
│   └── SecurityAlertViewModel.swift      // AI 诈骗电话拦截弹窗逻辑
│
├── Services/
│   ├── LINENotificationService.swift     // LINE Messaging API 消息代发服务
│   ├── ElectronicPrescriptionService.swift// 日本電子処方箋・調剤薬局 QR 連携サービス
│   ├── SeniorHealthPointService.swift    // 地域自治体健康ポイント＆残薬削減計算
│   ├── SpeechSynthService.swift          // AVSpeechSynthesizer 高龄者音声読み上げサービス
│   ├── HealthKitService.swift            // Apple HealthKit 步数与血压读取服务
│   └── CallFilterService.swift           // CallDirectory 诈骗电话自动拦截扩展
│
├── Views/
│   ├── Senior/
│   │   ├── SeniorHomeView.swift          // 【页面 1：老年人首页】
│   │   └── Components/
│   │       ├── LargeMedicationCard.swift // 大字号触控服药卡片
│   │       └── WeatherGreetingHeader.swift// 柴犬 Mascot 问候标语
│   ├── Caregiver/
│   │   ├── CaregiverDashboardView.swift  // 【页面 3：子女端看板】
│   │   └── Components/
│   │       ├── ParentProfileHeader.swift // 父母状态卡片
│   │       ├── RemoteAddMedicationCard.swift // 帮父母添加药物远程配置
│   │       └── LINESummaryCard.swift     // LINE 每日 19:00 推送配置卡片
│   ├── Entry/
│   │   └── ManualMedicationEntryView.swift// 【页面 2：手動/家属録入頁】
│   ├── History/
│   │   └── MedicationHistoryView.swift   // 【页面 5：服药履历月历页】
│   └── Modals/
│       ├── SecurityAlertModalView.swift  // 【页面 6：AI 防犯电话拦截弹窗】
│       ├── SubscriptionPaywallView.swift // 【页面 7：7天免费体验与订阅页】
│       └── LegalTermsView.swift          // 【页面 8：特定商取引法与隐私政策页】
│
└── DesignSystem/
    ├── Color+Japandi.swift               // Japandi 色彩系统 (#326853, #06C755, #88C0A7 等)
    ├── Typography+Accessibility.swift    // Accessibility 动态大字号排版系统
    └── Components/
        ├── JapandiCardModifier.swift    // 20px 圆角与 2pt 实体边框 Modifier
        └── PhysicalPressButton.swift    // 物理按压反馈 ButtonStyle
\`\`\`
`;

export const SWIFT_SENIOR_HOME_CODE = `//
//  SeniorHomeView.swift
//  AnshinLife
//
//  【页面 1：老年人首页】
//  专为老年人设计的无障碍极简界面
//

import SwiftUI

struct SeniorHomeView: View {
    @StateObject private var viewModel = SeniorHomeViewModel()
    @Environment(\\.dynamicTypeSize) var dynamicTypeSize
    
    var body: some View {
        NavigationStack {
            ZStack(alignment: .bottom) {
                // 背景色：Japandi 柔和 Off-White (#F9F9F9)
                Color.japandiBackground
                    .ignoresSafeArea()
                
                ScrollView {
                    VStack(spacing: 28) {
                        // 1. 顶部问候与柴犬 Mascot 区域
                        headerGreetingSection
                        
                        // 2. 核心服药打卡大卡片
                        mainMedicationCard
                        
                        // 3. LINE 状态反馈卡片
                        if viewModel.isNotificationSent {
                            lineFeedbackBanner
                                .transition(.move(edge: .top).combined(with: .opacity))
                        }
                        
                        // 4. 健康数据 Bento 网格 (血圧 & 步数)
                        healthStatsBentoGrid
                    }
                    .padding(.horizontal, 24)
                    .padding(.top, 16)
                    .padding(.bottom, 120) // 留出底部 TabBar 空间
                }
                
                // 5. 底部固定导航栏
                customBottomNavBar
            }
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarLeading) {
                    HStack(spacing: 8) {
                        Image("shiba_avatar")
                            .resizable()
                            .scaledToFill()
                            .frame(width: 40, height: 40)
                            .clipShape(Circle())
                            .overlay(Circle().stroke(Color.japandiPrimaryContainer, lineWidth: 2))
                        
                        Text("安心ライフ")
                            .font(.system(size: 22, weight: .bold, design: .rounded))
                            .foregroundColor(.japandiPrimary)
                    }
                }
                
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button(action: { viewModel.openSettings() }) {
                        Image(systemName: "gearshape")
                            .font(.system(size: 22, weight: .bold))
                            .foregroundColor(.japandiPrimary)
                            .frame(width: 48, height: 48)
                    }
                    .accessibilityLabel("设定与配置")
                }
            }
        }
    }
    
    // MARK: - Subviews
    
    private var headerGreetingSection: some View {
        HStack(alignment: .bottom) {
            VStack(alignment: .leading, spacing: 6) {
                Text("お元気ですか？")
                    .font(.system(size: 32, weight: .bold))
                    .foregroundColor(.japandiOnSurface)
                    .accessibilityAddTraits(.isHeader)
                
                HStack(spacing: 6) {
                    Image(systemName: "sun.max.fill")
                        .foregroundColor(.japandiPrimaryContainer)
                    Text("今日は晴れですね")
                        .font(.system(size: 18, weight: .medium))
                        .foregroundColor(.japandiOnSurfaceVariant)
                }
            }
            
            Spacer()
            
            // 柴犬吉祥物插图
            Image("shiba_mascot")
                .resizable()
                .scaledToFit()
                .frame(width: 100, height: 100)
                .shadow(color: Color.black.opacity(0.05), radius: 4, x: 0, y: 2)
        }
    }
    
    private var mainMedicationCard: some View {
        VStack(spacing: 20) {
            HStack(alignment: .top) {
                VStack(alignment: .leading, spacing: 6) {
                    HStack(spacing: 6) {
                        Image(systemName: "clock")
                        Text("\(viewModel.nextMedication.scheduledTime) の予定")
                    }
                    .font(.system(size: 16, weight: .bold))
                    .foregroundColor(.japandiOnSurfaceVariant)
                    
                    Text(viewModel.nextMedication.name)
                        .font(.system(size: 32, weight: .bold))
                        .foregroundColor(.japandiOnSurface)
                }
                
                Spacer()
                
                // 药品 Pill 图标
                ZStack {
                    Circle()
                        .fill(viewModel.nextMedication.isTaken ? Color.japandiPrimaryContainer.opacity(0.3) : Color.japandiErrorContainer)
                        .frame(width: 64, height: 64)
                    
                    Image(systemName: viewModel.nextMedication.isTaken ? "checkmark.circle.fill" : "pill.fill")
                        .font(.system(size: 32))
                        .foregroundColor(viewModel.nextMedication.isTaken ? .japandiPrimary : .japandiError)
                }
            }
            
            // 服药状态指示
            HStack(spacing: 12) {
                Image(systemName: viewModel.nextMedication.isTaken ? "checkmark.seal.fill" : "exclamationmark.timer")
                    .font(.system(size: 24))
                    .foregroundColor(viewModel.nextMedication.isTaken ? .japandiPrimary : .japandiError)
                
                Text(viewModel.nextMedication.isTaken ? "服薬完了しました" : "まだ飲んでいません")
                    .font(.system(size: 20, weight: .medium))
                    .foregroundColor(.japandiOnSurfaceVariant)
                
                Spacer()
            }
            .padding(16)
            .background(Color.japandiSurfaceLow)
            .cornerRadius(12)
            
            // 主行动按钮：超大无障碍按压按钮 (高度 72pt)
            Button(action: {
                withAnimation(.spring(response: 0.3, dampingFraction: 0.7)) {
                    viewModel.markMedicationAsTaken()
                }
            }) {
                HStack(spacing: 12) {
                    Image(systemName: viewModel.nextMedication.isTaken ? "checkmark.circle.fill" : "checkmark.circle")
                        .font(.system(size: 28, weight: .bold))
                    
                    Text(viewModel.nextMedication.isTaken ? "服薬完了" : "服薬した")
                        .font(.system(size: 24, weight: .bold))
                }
                .foregroundColor(.white)
                .frame(maxWidth: .infinity)
                .frame(height: 72)
                .background(viewModel.nextMedication.isTaken ? Color.gray : Color.japandiPrimary)
                .cornerRadius(20)
                .overlay(
                    RoundedRectangle(cornerRadius: 20)
                        .stroke(Color.japandiOnPrimaryContainer.opacity(0.3), lineWidth: 2)
                )
                .shadow(color: Color.black.opacity(0.1), radius: 0, x: 0, y: 4)
            }
            .disabled(viewModel.nextMedication.isTaken)
            .buttonStyle(PhysicalPressButtonStyle())
            .accessibilityHint("点击记录服药，并自动发送 LINE 消息告知子女")
        }
        .padding(24)
        .background(Color.white)
        .cornerRadius(20)
        .overlay(
            RoundedRectangle(cornerRadius: 20)
                .stroke(Color.japandiOutlineVariant, lineWidth: 2)
        )
    }
    
    private var lineFeedbackBanner: some View {
        HStack(spacing: 16) {
            ZStack {
                Circle()
                    .fill(Color.japandiOnSecondaryContainer)
                    .frame(width: 52, height: 52)
                
                Image(systemName: "paperplane.fill")
                    .font(.system(size: 22))
                    .foregroundColor(.japandiSecondaryFixed)
            }
            
            VStack(alignment: .leading, spacing: 4) {
                Text("LINEで子供に送信完了")
                    .font(.system(size: 18, weight: .bold))
                    .foregroundColor(.japandiOnSecondaryFixedVariant)
                
                Text("安心を届けました")
                    .font(.system(size: 16, weight: .regular))
                    .foregroundColor(.japandiOnSecondaryContainer)
            }
            
            Spacer()
        }
        .padding(18)
        .background(Color.japandiSecondaryContainer)
        .cornerRadius(20)
        .overlay(
            RoundedRectangle(cornerRadius: 20)
                .stroke(Color.japandiOutlineVariant, lineWidth: 2)
        )
    }
    
    private var healthStatsBentoGrid: some View {
        HStack(spacing: 16) {
            // 血圧卡片
            VStack(alignment: .leading, spacing: 12) {
                Image(systemName: "heart.fill")
                    .font(.system(size: 28))
                    .foregroundColor(.japandiPrimaryContainer)
                
                VStack(alignment: .leading, spacing: 2) {
                    Text("血圧")
                        .font(.system(size: 16, weight: .bold))
                        .foregroundColor(.japandiOnSurfaceVariant)
                    
                    Text("\(viewModel.bloodPressureSystolic) / \(viewModel.bloodPressureDiastolic)")
                        .font(.system(size: 22, weight: .bold))
                        .foregroundColor(.japandiPrimary)
                }
            }
            .padding(20)
            .frame(maxWidth: .infinity, alignment: .leading)
            .background(Color.white)
            .cornerRadius(20)
            .overlay(
                RoundedRectangle(cornerRadius: 20)
                    .stroke(Color.japandiOutlineVariant, lineWidth: 2)
            )
            
            // 歩数卡片
            VStack(alignment: .leading, spacing: 12) {
                Image(systemName: "figure.walk")
                    .font(.system(size: 28))
                    .foregroundColor(.japandiPrimaryContainer)
                
                VStack(alignment: .leading, spacing: 2) {
                    Text("歩数")
                        .font(.system(size: 16, weight: .bold))
                        .foregroundColor(.japandiOnSurfaceVariant)
                    
                    Text("\(viewModel.stepCount) 歩")
                        .font(.system(size: 22, weight: .bold))
                        .foregroundColor(.japandiPrimary)
                }
            }
            .padding(20)
            .frame(maxWidth: .infinity, alignment: .leading)
            .background(Color.white)
            .cornerRadius(20)
            .overlay(
                RoundedRectangle(cornerRadius: 20)
                    .stroke(Color.japandiOutlineVariant, lineWidth: 2)
            )
        }
    }
    
    private var customBottomNavBar: some View {
        HStack {
            Spacer()
            
            VStack(spacing: 4) {
                Image(systemName: "house.fill")
                    .font(.system(size: 26))
                Text("ホーム")
                    .font(.system(size: 14, weight: .bold))
            }
            .foregroundColor(.japandiPrimary)
            .overlay(
                Rectangle()
                    .frame(height: 4)
                    .foregroundColor(.japandiPrimary)
                    .offset(y: -24),
                alignment: .top
            )
            
            Spacer()
            
            NavigationLink(destination: Text("服薬履历")) {
                VStack(spacing: 4) {
                    Image(systemName: "clock.arrow.circlepath")
                        .font(.system(size: 26))
                    Text("履歴")
                        .font(.system(size: 14, weight: .medium))
                }
                .foregroundColor(.japandiOnSurfaceVariant)
            }
            
            Spacer()
        }
        .frame(height: 88)
        .background(Color.white)
        .overlay(
            Rectangle()
                .frame(height: 2)
                .foregroundColor(.japandiOutlineVariant),
            alignment: .top
        )
    }
}
`;

export const SWIFT_CAREGIVER_DASHBOARD_CODE = `//
//  CaregiverDashboardView.swift
//  AnshinLife
//
//  【页面 3：子女端看板】
//  远程查看父母服药与安否状态、LINE 每日推送设置及防犯记录
//

import SwiftUI

struct CaregiverDashboardView: View {
    @StateObject private var viewModel = CaregiverDashboardViewModel()
    
    var body: some View {
        NavigationStack {
            ZStack(alignment: .bottom) {
                Color.japandiBackground
                    .ignoresSafeArea()
                
                ScrollView {
                    VStack(spacing: 28) {
                        // 1. 父母状态卡片 (Mother Masako)
                        parentProfileHeaderCard
                        
                        // 2. 本日活动履历 (Activity Timeline)
                        activityTimelineSection
                        
                        // 3. LINE 每日通知设置卡片 (19:00 Daily Summary)
                        lineNotificationSettingCard
                        
                        // 4. 快捷功能网格 (通院记录、购物代行、日程表、咨询室)
                        quickAccessGrid
                    }
                    .padding(.horizontal, 24)
                    .padding(.top, 16)
                    .padding(.bottom, 120)
                }
                
                // 5. 子女端底部导航栏
                caregiverBottomNavBar
            }
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarLeading) {
                    HStack(spacing: 12) {
                        Image("mother_portrait_small")
                            .resizable()
                            .scaledToFill()
                            .frame(width: 40, height: 40)
                            .clipShape(Circle())
                            .overlay(Circle().stroke(Color.japandiPrimaryContainer, lineWidth: 2))
                        
                        Text("Caregiver Dashboard")
                            .font(.system(size: 22, weight: .bold, design: .serif))
                            .foregroundColor(.japandiPrimary)
                    }
                }
                
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button(action: {}) {
                        Image(systemName: "bell")
                            .font(.system(size: 22))
                            .foregroundColor(.japandiPrimary)
                    }
                }
            }
        }
    }
    
    // MARK: - Subviews
    
    private var parentProfileHeaderCard: some View {
        VStack(spacing: 20) {
            HStack(spacing: 20) {
                // 母亲照片
                Image("mother_portrait_large")
                    .resizable()
                    .scaledToFill()
                    .frame(width: 88, height: 88)
                    .clipShape(Circle())
                    .overlay(Circle().stroke(Color.japandiPrimaryContainer, lineWidth: 4))
                    .shadow(color: Color.black.opacity(0.08), radius: 6, x: 0, y: 3)
                
                VStack(alignment: .leading, spacing: 8) {
                    HStack {
                        Text("お母さん (マサコ)")
                            .font(.system(size: 24, weight: .bold))
                            .foregroundColor(.japandiOnSurface)
                        
                        Spacer()
                        
                        HStack(spacing: 4) {
                            Image(systemName: "house.fill")
                                .font(.system(size: 12))
                            Text("自宅")
                                .font(.system(size: 14, weight: .bold))
                        }
                        .padding(.horizontal, 10)
                        .padding(.vertical, 4)
                        .background(Color.japandiSurfaceContainer)
                        .foregroundColor(.japandiPrimary)
                        .cornerRadius(12)
                    }
                    
                    // 状态 Badge
                    HStack(spacing: 6) {
                        Image(systemName: "check_circle_fill")
                            .foregroundColor(.japandiOnPrimaryContainer)
                        Text("本日の服薬：完了")
                            .font(.system(size: 16, weight: .bold))
                            .foregroundColor(.japandiOnPrimaryContainer)
                    }
                    .padding(.horizontal, 12)
                    .padding(.vertical, 8)
                    .background(Color.japandiPrimaryContainer)
                    .cornerRadius(12)
                }
            }
            
            // 电话与视频通话按钮
            HStack(spacing: 16) {
                Button(action: { viewModel.makePhoneCall() }) {
                    HStack {
                        Image(systemName: "phone.fill")
                        Text("電話かける")
                    }
                    .font(.system(size: 16, weight: .bold))
                    .foregroundColor(.japandiOnSecondaryFixed)
                    .frame(maxWidth: .infinity)
                    .frame(height: 52)
                    .background(Color.japandiSecondaryFixed)
                    .cornerRadius(16)
                    .overlay(
                        RoundedRectangle(cornerRadius: 16)
                            .stroke(Color.japandiSecondary.opacity(0.3), lineWidth: 2)
                    )
                }
                
                Button(action: { viewModel.startVideoCall() }) {
                    HStack {
                        Image(systemName: "video.fill")
                        Text("ビデオ通話")
                    }
                    .font(.system(size: 16, weight: .bold))
                    .foregroundColor(.white)
                    .frame(maxWidth: .infinity)
                    .frame(height: 52)
                    .background(Color.japandiPrimary)
                    .cornerRadius(16)
                }
            }
        }
        .padding(24)
        .background(Color.white)
        .cornerRadius(20)
        .overlay(
            RoundedRectangle(cornerRadius: 20)
                .stroke(Color.japandiOutlineVariant, lineWidth: 2)
        )
    }
    
    private var activityTimelineSection: some View {
        VStack(alignment: .leading, spacing: 16) {
            HStack {
                Label("本日の活動履歴", systemImage: "clock.arrow.circlepath")
                    .font(.system(size: 20, weight: .bold))
                    .foregroundColor(.japandiOnSurface)
                
                Spacer()
                
                Button("すべて見る") {}
                    .font(.system(size: 14, weight: .bold))
                    .foregroundColor(.japandiPrimary)
            }
            
            VStack(spacing: 16) {
                // Item 1: 服药确认
                HStack(alignment: .top, spacing: 16) {
                    ZStack {
                        Circle()
                            .fill(Color.japandiPrimaryContainer)
                            .frame(width: 40, height: 40)
                        Image(systemName: "checkmark")
                            .font(.system(size: 18, weight: .bold))
                            .foregroundColor(.japandiOnPrimaryContainer)
                    }
                    
                    VStack(alignment: .leading, spacing: 4) {
                        Text("08:00 AM")
                            .font(.system(size: 14, weight: .bold))
                            .foregroundColor(.japandiOutline)
                        Text("朝の薬")
                            .font(.system(size: 18, weight: .bold))
                            .foregroundColor(.japandiOnSurface)
                        Text("定時服薬が確認されました。")
                            .font(.system(size: 15))
                            .foregroundColor(.japandiOnSurfaceVariant)
                    }
                    Spacer()
                }
                
                Divider()
                
                // Item 2: AI 防犯电话拦截
                HStack(alignment: .top, spacing: 16) {
                    ZStack {
                        Circle()
                            .fill(Color.japandiSecondaryFixed)
                            .frame(width: 40, height: 40)
                        Image(systemName: "shield.fill")
                            .font(.system(size: 18))
                            .foregroundColor(.japandiOnSecondaryFixed)
                    }
                    
                    VStack(alignment: .leading, spacing: 4) {
                        Text("12:30 PM")
                            .font(.system(size: 14, weight: .bold))
                            .foregroundColor(.japandiOutline)
                        Text("防犯AI")
                            .font(.system(size: 18, weight: .bold))
                            .foregroundColor(.japandiOnSurface)
                        
                        VStack(alignment: .leading, spacing: 4) {
                            Text("不審な電話を1件ブロックしました")
                                .font(.system(size: 15, weight: .bold))
                            Text("特殊詐欺の疑いがある番号を自動遮断。")
                                .font(.system(size: 14))
                                .foregroundColor(.japandiOnSurfaceVariant)
                        }
                        .padding(12)
                        .background(Color.japandiSurfaceLow)
                        .cornerRadius(12)
                        .overlay(
                            RoundedRectangle(cornerRadius: 12)
                                .stroke(Color.japandiOutlineVariant, lineWidth: 1)
                        )
                    }
                    Spacer()
                }
            }
        }
        .padding(24)
        .background(Color.white)
        .cornerRadius(20)
        .overlay(
            RoundedRectangle(cornerRadius: 20)
                .stroke(Color.japandiOutlineVariant, lineWidth: 2)
        )
    }
    
    private var lineNotificationSettingCard: some View {
        VStack(spacing: 16) {
            // LINE 专属绿色 Header
            HStack {
                Image(systemName: "message.fill")
                    .font(.system(size: 24))
                Text("LINE通知連携")
                    .font(.system(size: 20, weight: .bold))
                Spacer()
            }
            .padding(.horizontal, 20)
            .padding(.vertical, 14)
            .background(Color.lineGreen)
            .foregroundColor(.white)
            
            VStack(spacing: 16) {
                Toggle(isOn: $viewModel.isDailyReportEnabled) {
                    VStack(alignment: .leading, spacing: 4) {
                        Text("毎日19:00に日報を受信")
                            .font(.system(size: 18, weight: .bold))
                        Text("お母さんの1日の様子をまとめます。")
                            .font(.system(size: 14))
                            .foregroundColor(.japandiOnSurfaceVariant)
                    }
                }
                .tint(Color.lineGreen)
                
                // 预览卡片
                HStack(spacing: 12) {
                    Image("shiba_avatar")
                        .resizable()
                        .frame(width: 48, height: 48)
                    
                    VStack(alignment: .leading, spacing: 2) {
                        Text("通知プレビュー")
                            .font(.system(size: 14, weight: .bold))
                            .foregroundColor(.japandiPrimary)
                        Text("「お母さんは今日も元気に過ごされました！服薬もバッチリです。」")
                            .font(.system(size: 14))
                            .foregroundColor(.japandiOnSurface)
                            .italic()
                    }
                }
                .padding(14)
                .background(Color.japandiSurfaceLow)
                .cornerRadius(12)
                .overlay(
                    RoundedRectangle(cornerRadius: 12)
                        .stroke(Color.japandiOutlineVariant, lineWidth: 1)
                )
            }
            .padding(20)
        }
        .background(Color.white)
        .cornerRadius(20)
        .clipShape(RoundedRectangle(cornerRadius: 20))
        .overlay(
            RoundedRectangle(cornerRadius: 20)
                .stroke(Color.japandiOutlineVariant, lineWidth: 2)
        )
    }
    
    private var quickAccessGrid: some View {
        LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible())], spacing: 16) {
            quickActionButton(title: "通院記録", icon: "cross.case.fill")
            quickActionButton(title: "買い物代行", icon: "cart.fill")
            quickActionButton(title: "予定表", icon: "calendar")
            quickActionButton(title: "相談室", icon: "bubble.left.and.bubble.right.fill")
        }
    }
    
    private func quickActionButton(title: String, icon: String) -> some View {
        VStack(spacing: 8) {
            Image(systemName: icon)
                .font(.system(size: 28))
                .foregroundColor(.japandiPrimary)
            Text(title)
                .font(.system(size: 16, weight: .bold))
                .foregroundColor(.japandiOnSurface)
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 20)
        .background(Color.white)
        .cornerRadius(16)
        .overlay(
            RoundedRectangle(cornerRadius: 16)
                .stroke(Color.japandiOutlineVariant, lineWidth: 2)
        )
    }
    
    private var caregiverBottomNavBar: some View {
        HStack {
            Spacer()
            
            VStack(spacing: 4) {
                Image(systemName: "person.2.fill")
                    .font(.system(size: 24))
                Text("Family")
                    .font(.system(size: 13, weight: .bold))
            }
            .foregroundColor(.japandiPrimary)
            
            Spacer()
            
            VStack(spacing: 4) {
                Image(systemName: "shield.fill")
                    .font(.system(size: 24))
                Text("AI Security")
                    .font(.system(size: 13, weight: .medium))
            }
            .foregroundColor(.japandiOnSurfaceVariant)
            
            Spacer()
            
            VStack(spacing: 4) {
                Image(systemName: "gearshape.fill")
                    .font(.system(size: 24))
                Text("Settings")
                    .font(.system(size: 13, weight: .medium))
            }
            .foregroundColor(.japandiOnSurfaceVariant)
            
            Spacer()
        }
        .frame(height: 72)
        .background(Color.white)
        .overlay(
            Rectangle()
                .frame(height: 2)
                .foregroundColor(.japandiOutlineVariant),
            alignment: .top
        )
    }
}
`;

export const SWIFT_SCANNER_VIEWMODEL_CODE = `//
//  ManualMedicationEntryViewModel.swift
//  AnshinLife
//
//  【页面 2：极简手動/家属録入頁 ViewModel】
//  纯手工/家属远程精准录入药品，支持极简照相作为封面标记（无 AI 识别/无 OCR 依赖）
//

import SwiftUI
import Combine

struct ManualMedicationItem: Identifiable, Codable {
    var id = UUID()
    let drugName: String       // 处方药/日常药名称 (例: 降圧薬 アムロジピン)
    let dosage: String         // 剂量与用法 (例: 朝食後 1錠)
    let scheduledTime: String  // 予定时间 (例: 08:00 AM)
    let registrantType: String // 注册身份: "子女（代理）" 或 "ご本人"
    let coverPhotoData: Data?  // 视觉封面照片 (非 AI 识别，仅用于在卡片上提供目印照片)
}

@MainActor
final class ManualMedicationEntryViewModel: ObservableObject {
    @Published var drugName: String = ""
    @Published var dosage: String = "朝食後 1錠"
    @Published var scheduledTime: String = "08:00 AM"
    @Published var isCaregiverRegistering: Bool = true
    @Published var selectedPhotoData: Data? = nil
    
    @Published var isSaving: Bool = false
    @Published var isSavedSuccess: Bool = false
    @Published var statusToastMessage: String? = nil
    
    private let lineService: LINENotificationServiceProtocol
    
    init(lineService: LINENotificationServiceProtocol = MockLINENotificationService()) {
        self.lineService = lineService
    }
    
    /// 保存并注册新药物（无 AI OCR 误判风险，零门槛）
    func registerMedication() async {
        guard !drugName.trimmingCharacters(in: .whitespaces).isEmpty else { return }
        
        isSaving = true
        
        let newItem = ManualMedicationItem(
            drugName: drugName,
            dosage: dosage,
            scheduledTime: scheduledTime,
            registrantType: isCaregiverRegistering ? "子女代理" : "ご本人",
            coverPhotoData: selectedPhotoData
        )
        
        // 模拟本地 SwiftData / CoreData 持久化保存
        try? await Task.sleep(nanoseconds: 300_000_000)
        
        // 自动触发 LINE 消息推送给子女/家属群
        let notificationText = "【安心 Life】新しいお薬「\(newItem.drugName)」(\(newItem.dosage)) が手動登録されました。"
        await lineService.sendLINENotification(toCaregiverId: "CARE_USER_998", text: notificationText)
        
        self.isSaving = false
        self.isSavedSuccess = true
        self.statusToastMessage = "お薬「\(newItem.drugName)」を登録しました！"
    }
}

protocol LINENotificationServiceProtocol {
    func sendLINENotification(toCaregiverId: String, text: String) async -> Bool
}

final class MockLINENotificationService: LINENotificationServiceProtocol {
    func sendLINENotification(toCaregiverId: String, text: String) async -> Bool {
        print("[LINE Notification Service] Pushed message to Caregiver ID: \(toCaregiverId)")
        print("[LINE Content]: \(text)")
        return true
    }
}
`;
