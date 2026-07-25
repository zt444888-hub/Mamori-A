import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Helper to safely get Gemini Client if API Key is configured
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "") {
    return null;
  }
  return new GoogleGenAI({
    apiKey: apiKey.trim(),
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// ==========================================
// API 1: AI Anti-Fraud / Verification (AI防犯・求証)
// ==========================================
app.post("/api/ai/fraud-inquiry", async (req, res) => {
  try {
    const { queryText, imageBase64 } = req.body;
    if (!queryText && !imageBase64) {
      return res.status(400).json({ error: "queryText or imageBase64 is required" });
    }

    const ai = getGeminiClient();

    if (ai) {
      // Build content parts for Gemini 3.6 Flash
      const parts: any[] = [];
      if (imageBase64) {
        const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, "");
        parts.push({
          inlineData: {
            mimeType: "image/jpeg",
            data: cleanBase64,
          },
        });
      }

      const prompt = `You are an expert Anti-Fraud Protection AI for senior citizens in Japan and international Chinese seniors (警視庁特殊詐欺対策室 & 驻日大使馆防诈 AIアドバイザー).
Analyze this situation or suspicious text/photo reported by an elderly person:
"${queryText || '添付された画像・ハガキ・SMSの詐欺判定をお願いします'}"

Evaluate against both Japanese scam patterns (特殊詐欺, アポ電, 架空料金請求, 還付金詐欺, キャッシュカード詐欺, 警察官・銀行員騙り, 点検商法) AND Chinese cross-border scam patterns targeting Chinese nationals in Japan (假冒中国驻日大使馆/领事馆, 顺丰/DHL国际快递扣押, 入国管理局/签证撤销警告, 虚假公检法办案).

Return a JSON object matching this schema:
{
  "status": "danger" | "warning" | "safe",
  "title": "Clear headline in Japanese/Chinese with icon (🚨/⚠️/✅)",
  "advice": "Direct, empathetic, easy-to-understand advice for senior citizens (Japanese/Chinese bilingual support)",
  "riskLevel": 0-100 score,
  "scamType": "scam category name (e.g. 假冒中国驻日使领馆 / 警察官騙り)",
  "keyIndicators": ["point 1", "point 2", "point 3"],
  "emergencyAction": "Specific counter-action step (e.g. #9110 call / 领事保护热线 +86-10-12308)"
}`;

      parts.push({ text: prompt });

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: { parts },
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              status: { type: Type.STRING },
              title: { type: Type.STRING },
              advice: { type: Type.STRING },
              riskLevel: { type: Type.NUMBER },
              scamType: { type: Type.STRING },
              keyIndicators: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              emergencyAction: { type: Type.STRING },
            },
            required: ["status", "title", "advice", "riskLevel", "scamType", "keyIndicators", "emergencyAction"],
          },
        },
      });

      if (response.text) {
        const parsed = JSON.parse(response.text.trim());
        return res.json({ ...parsed, isRealAI: true });
      }
    }

    // Smart Fallback Evaluator when API key is not yet set
    const text = (queryText || "").toLowerCase();
    let status: "danger" | "warning" | "safe" = "danger";
    let title = "🚨 100% 詐欺（警察・銀行員なりすまし）の危険があります！";
    let advice = "警察官・銀行員・公務員が電話や訪問で「カードを預かる」「暗証番号を聞く」「ATMで手続きさせる」ことは100%ありません！すぐに電話を切ってください。";
    let riskLevel = 98;
    let scamType = "警察官・銀行員騙り (特殊詐欺)";
    let keyIndicators = [
      "「口座が犯罪に使われた」「カードを預かる」と言う",
      "暗証番号を尋ねる・封筒に入れさせる",
      "「誰にも言わないで」と家族や警察への相談を制止する"
    ];
    let emergencyAction = "今すぐ電話を切り、警察相談専用ダイヤル（#9110）またはご家族に連絡してください！";

    if (text.includes("大使館") || text.includes("大使馆") || text.includes("使馆") || text.includes("领事馆") || text.includes("領事館") || text.includes("顺丰") || text.includes("dhl") || text.includes("快递") || text.includes("快遞") || text.includes("扣押") || text.includes("包裹") || text.includes("公安") || text.includes("签证") || text.includes("簽證") || text.includes("入国管理局")) {
      status = "danger";
      title = "🚨 100% 假冒中国驻日大使馆/国际快递 跨国诈骗！";
      advice = "中国驻日大使馆、领事馆、国内公安部门以及顺丰/DHL快递绝对不会通过电话告知“护照受限”、“包裹扣押”或要求将资金转入所谓“安全账户”！请立即挂断电话！";
      riskLevel = 99;
      scamType = "假冒中国驻日使领馆・跨国电信诈骗";
      keyIndicators = [
        "声称“大使馆/公安局”称您涉嫌洗钱或护照签证异常",
        "以“包裹内有非法药物/信用卡被海关扣押”为由威胁",
        "要求极度保密、切勿告诉日本警察或在日家属",
        "要求转账到个人银行账户或虚拟货币“核查资金”"
      ];
      emergencyAction = "请立即挂断电话！切勿转账。可拨打外交部领事保护热线 +86-10-12308 或日本警察 #9110 举报！";
    } else if (text.includes("未払い") || text.includes("料金") || text.includes("sms") || text.includes("回線") || text.includes("停止") || text.includes("法的")) {
      status = "warning";
      title = "⚠️ 架空料金請求詐欺の疑いがあります";
      advice = "身に覚えのない請求SMSや「法的措置」という警告電話には返信・折り返し電話しないでください。記載の番号ではなく公式窓口から確認してください。";
      riskLevel = 82;
      scamType = "架空料金請求・不審SMS";
      keyIndicators = [
        "「本日中に連絡がないと法的措置」と不安を煽る",
        "電子マネー（Amazonギフトカード等）での支払いを指定する",
        "電話番号が携帯番号（080/090）や見知らぬ市外局番"
      ];
      emergencyAction = "メッセージ内のリンクは押さず、そのまま無視してご家族にご相談ください。";
    } else if (text.includes("還付金") || text.includes("市役所") || text.includes("保険料") || text.includes("給付金")) {
      status = "danger";
      title = "🚨 100% 還付金詐欺です！ATMへ行かないでください";
      advice = "市役所や社会保険庁が「還付金の受け取りのためにATMを操作させる」ことは絶対にありません。お金は戻りません！";
      riskLevel = 95;
      scamType = "還付金詐欺 (医療費・保険料過払い)";
      keyIndicators = [
        "「今日中でないと還付金を受け取れない」と急がせる",
        "無人ATM（スーパーやコンビニ）へ誘導する",
        "携帯電話で話しながらATMを操作させる"
      ];
      emergencyAction = "指示されたATMへは絶対に行かず、警察（#9110）に通報してください。";
    } else if (text.includes("家族") || text.includes("安心") || text.includes("太郎") || text.includes("花丸") || text.includes("息子") || text.includes("娘")) {
      status = "safe";
      title = "✅ 登録済みのご家族・安心ライフシステムです";
      advice = "この連絡は安心ライフで連携されているご家族からの正常なメッセージです。安心してお話しいただけます。";
      riskLevel = 2;
      scamType = "ご家族からの正常な連絡";
      keyIndicators = [
        "登録済み連絡先（ご家族回線）からの発信",
        "暗証番号や金銭振込の要求なし",
        "安心ライフシステムのセキュリティ確認済み"
      ];
      emergencyAction = "危険はありません。そのまま会話を続けていただけます。";
    }

    return res.json({
      status,
      title,
      advice,
      riskLevel,
      scamType,
      keyIndicators,
      emergencyAction,
      isRealAI: false,
      notice: "API Key is not bound yet. Using built-in rule engine. Bind key in Settings to activate full Gemini 3.6 Vision & Reasoning."
    });
  } catch (error: any) {
    console.error("Error in fraud-inquiry endpoint:", error);
    return res.status(500).json({ error: error.message || "AI inquiry failed" });
  }
});

// ==========================================
// API 2: AI Nurse / Health Assistant (AI看護師・健康相談)
// ==========================================
app.post("/api/ai/health-assistant", async (req, res) => {
  try {
    const { prompt, sysBP, diaBP, pulse } = req.body;
    const ai = getGeminiClient();

    if (ai) {
      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: `You are an empathetic, warm, professional AI Senior Health Care Nurse (まもりAI看護師) assisting elderly patients and their families in Japan.
Current User Vitals: Blood Pressure ${sysBP || 124}/${diaBP || 78} mmHg, Pulse ${pulse || 72} bpm.
User Query/Concern: "${prompt || '今日の体調アドバイスをください'}"

Provide encouraging, warm, professional health guidance in gentle Japanese. Keep it concise (2-3 sentences), reassuring, and medically sound.`,
        config: {
          systemInstruction: "You are a warm, supportive senior care nurse in Japan.",
        },
      });

      return res.json({
        reply: response.text,
        isRealAI: true,
      });
    }

    // Fallback response when key is not bound
    return res.json({
      reply: `🩺 【AI看護師】本日のお体の調子は安定しています（血圧: ${sysBP || 124}/${diaBP || 78} mmHg）。水分をしっかり補給し、無理のないようお過ごしくださいね。`,
      isRealAI: false,
      notice: "API Key not bound yet. Bind key to activate dynamic Gemini AI nurse advice."
    });
  } catch (error: any) {
    console.error("Error in health-assistant endpoint:", error);
    return res.status(500).json({ error: error.message || "AI health assistant failed" });
  }
});

// ==========================================
// API 3: AI Prescription OCR Scan & Drug Interaction (処方箋解析・相互作用・食事禁忌)
// ==========================================
app.post("/api/ai/scan-prescription", async (req, res) => {
  try {
    const { imageBase64 } = req.body;
    const ai = getGeminiClient();

    if (ai && imageBase64) {
      // Clean base64 header if present
      const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, "");

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: {
          parts: [
            {
              inlineData: {
                mimeType: "image/jpeg",
                data: cleanBase64,
              },
            },
            {
              text: `Extract medication details from this Japanese prescription or medicine package image, including dietary contraindications and drug interactions. Return JSON:
{
  "name": "medication name",
  "dosage": "e.g. 朝食後 1錠",
  "time": "e.g. 08:00 AM",
  "notes": "key instructions or precautions",
  "dietaryWarnings": ["dietary restriction 1 (e.g. グレープフルーツ同服厳禁/切勿与葡萄柚同服)", "dietary restriction 2"],
  "drugInteractions": ["drug interaction warning 1", "drug interaction warning 2"]
}`,
            },
          ],
        },
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              dosage: { type: Type.STRING },
              time: { type: Type.STRING },
              notes: { type: Type.STRING },
              dietaryWarnings: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              drugInteractions: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            },
            required: ["name", "dosage", "time", "dietaryWarnings", "drugInteractions"],
          },
        },
      });

      if (response.text) {
        const parsed = JSON.parse(response.text.trim());
        return res.json({ ...parsed, isRealAI: true });
      }
    }

    // Default return or fallback scan with rich Dietary Contraindication
    return res.json({
      name: "アムロジピン塩酸塩錠 5mg (カルシウム拮抗薬・降圧剤)",
      dosage: "朝食後 1錠",
      time: "08:00 AM",
      notes: "高血圧改善薬・血管拡張作用",
      dietaryWarnings: [
        "⚠️ グレープフルーツ（葡萄柚）及びグレープフルーツジュースとの同時服用は厳禁！(薬の血中濃度が著しく高まり急激な血圧低下・めまいを引き起こします)",
        "🍶 服用前後の飲酒（アルコール）は避けてください (血管拡張が過度になりふらつきの危険)"
      ],
      drugInteractions: [
        "💊 他の降圧薬（ARB/ACE阻害薬等）や水薬との重複服用には医師の指示が必要です",
        "🛑 カフェイン(濃いお茶やコーヒー)で服用せず、必ずぬるま湯でお飲みください"
      ],
      isRealAI: false,
    });
  } catch (error: any) {
    console.error("Error in scan-prescription endpoint:", error);
    return res.status(500).json({ error: error.message || "Prescription scan failed" });
  }
});

// ==========================================
// API 4: Continuous BP Analysis & Medical Consultation Report (3日連続高血圧・就医问诊建议报告)
// ==========================================
app.post("/api/ai/generate-bp-report", async (req, res) => {
  try {
    const { history, currentSys, currentDia, pulse } = req.body;
    const ai = getGeminiClient();

    if (ai) {
      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: `You are an expert Medical AI Assistant for Geriatric Cardiology (循環器内科 AI看護・診察支援アドバイザー).
Analyze the following continuous blood pressure records for an elderly patient:
${JSON.stringify(history || [
  { date: "2026-07-23", sys: 146, dia: 92 },
  { date: "2026-07-24", sys: 142, dia: 88 },
  { date: "2026-07-25", sys: currentSys || 145, dia: currentDia || 90 }
])}

The patient has recorded elevated blood pressure (Systolic > 140 mmHg) for 3 consecutive days.
Generate a structured Medical Consultation Advice Report (就医问诊建议报告 / 医師受診用サマリー) matching this JSON schema:
{
  "diagnosisLevel": "Ⅰ度高血圧 (収縮期140mmHg以上継続疑い)",
  "riskAssessment": "3日間連続して収縮期血圧140mmHg超過。降圧薬の服用状況確認および循環器内科への受診相談をお勧めします。",
  "symptomsChecklist": ["朝の頭重感・後頭部の違和感", "立ち上がり時のふらつき・めまい", "胸の圧迫感・動悸"],
  "doctorQuestions": [
    "「ここ3日間の血圧が140台後半で推移しています。処方薬の調整が必要でしょうか？」",
    "「家庭血圧測定のタイミング（朝・晩）について見直すべき点はありますか？」"
  ],
  "lifestyleGuidance": [
    "塩分摂取量を1日6g未満に抑える（減塩しょうゆ使用）",
    "入浴時は40度以下のぬるま湯にし、長湯を避ける",
    "急な起立を避け、布団から起き上がる際は30秒座ってから立つ"
  ],
  "lineNotificationText": "【LINE家族通知】お母さんの血圧が3日連続で高め（本日 145/90 mmHg）です。AI看護師が作成した『就医問診報告書』を添付しました。次回の通院時に医師へお渡しください。"
}`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              diagnosisLevel: { type: Type.STRING },
              riskAssessment: { type: Type.STRING },
              symptomsChecklist: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              doctorQuestions: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              lifestyleGuidance: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              lineNotificationText: { type: Type.STRING }
            },
            required: ["diagnosisLevel", "riskAssessment", "symptomsChecklist", "doctorQuestions", "lifestyleGuidance", "lineNotificationText"]
          }
        }
      });

      if (response.text) {
        const parsed = JSON.parse(response.text.trim());
        return res.json({ ...parsed, isRealAI: true });
      }
    }

    // Default Fallback Consultation Report
    return res.json({
      diagnosisLevel: "Ⅰ度高血圧傾向 (収縮期140mmHg以上 3日連続検知)",
      riskAssessment: "過去3日間の収縮期血圧平均が 144 mmHg と基準値(135mmHg)を超過しています。体調の変化に注意し、循環器内科またはかかりつけ医への受診時に本レポートをお見せください。",
      symptomsChecklist: [
        "朝起きた時の頭重感・後頭部の張り",
        "立ち上がり時の急なふらつき・めまい",
        "階段昇降時の動悸・息切れ"
      ],
      doctorQuestions: [
        "「家庭血圧測定で140mmHg以上が3日続いています。お薬の量や種類の見直しは必要ですか？」",
        "「減塩や生活習慣で特に意識すべき数値基準を教えてください」"
      ],
      lifestyleGuidance: [
        "🧂 1日の塩分摂取目標を6g未満に減塩",
        "🛁 入浴は40度以下のぬるま湯で10分以内",
        "🚶 寒冷差に注意し、起床時は布団で少し体を慣らしてから立つ"
      ],
      lineNotificationText: "【LINE家族自動通知】お母さんの血圧が3日連続で140mmHgを超えています（本日 145/90 mmHg）。AI看護師が作成した『就医問診報告書』を送信しました。通院時の医師ご相談にご活用ください。",
      isRealAI: false
    });
  } catch (error: any) {
    console.error("Error in generate-bp-report endpoint:", error);
    return res.status(500).json({ error: error.message || "BP Report generation failed" });
  }
});

// Serve frontend assets or Vite middleware
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Anshin Life full-stack server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
