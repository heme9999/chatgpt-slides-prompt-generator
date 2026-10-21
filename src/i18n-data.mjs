// Complete UI & Page Localization Dictionary for EN, ES, JA, and zh-TW
export const UI_STRINGS = {
  en: {
    langCode: 'en',
    defaultOutputLang: 'English',
    // Top Header Navigation
    navGenerator: 'Prompt Generator',
    navTemplates: '47+ Templates',
    navPitch: 'Pitch Deck',
    navSales: 'Sales Deck',
    navPowerpoint: 'Export to PPTX',
    navTroubleshooting: 'Not Showing Fix',
    savedLabel: 'Saved',
    // Hero Release Pill
    releasePill:
      'Updated for ChatGPT Slides (Released Oct 16, 2026) — Supports Canvas Collaboration, PowerPoint (.pptx), PDF & Google Slides Export',
    // Form UI
    formLegend: '1. Configure Your ChatGPT Slides Presentation',
    noApiBadge: '100% Free · No API Key · Instant Copy',
    topicLabel: 'Presentation Topic (演示主题)',
    topicRequired: 'Required',
    topicPlaceholder: 'e.g., Q4 Enterprise AI Workflow Automation Strategy & ROI...',
    defaultTopic: 'Q4 Enterprise AI Workflow Automation Strategy & Quantified ROI',
    trySample: 'Try a sample:',
    sampleTopics: [
      'Series A Startup Pitch Deck for AI SaaS',
      'Q4 Enterprise Sales Executive Proposal',
      'Quarterly Business Review (QBR) & KPI Deck',
      'Clinical Research Methodology & Findings'
    ],
    audienceLabel: 'Target Audience (目标受众)',
    audienceOptions: [
      { value: 'C-Suite & Executive Board (CEO, CFO, VP)', label: 'C-Suite & Executive Board (CEO, CFO, VP)' },
      { value: 'Enterprise Buyers & Decision Makers', label: 'Enterprise Buyers & Decision Makers' },
      { value: 'Venture Capitalists & Angel Investors', label: 'Venture Capitalists & Angel Investors' },
      { value: 'Cross-Functional Product & Engineering Team', label: 'Cross-Functional Product & Engineering Team' },
      { value: 'Academic Peers & Research Committee', label: 'Academic Peers & Research Committee' },
      { value: 'Students & Workshop Participants', label: 'Students & Workshop Participants' },
      { value: 'Clients & Agency Stakeholders', label: 'Clients & Agency Stakeholders' },
      { value: 'General Conference Audience', label: 'General Conference Audience' }
    ],
    goalLabel: 'Presentation Goal (演示目的)',
    goalOptions: [
      { value: 'Persuade & Win Approval / Close Deal', label: 'Persuade & Win Approval / Close Deal' },
      { value: 'Secure Seed / Series A / Grant Funding', label: 'Secure Seed / Series A / Grant Funding' },
      { value: 'Align Stakeholders on Project Status & Risks', label: 'Align Stakeholders on Project Status & Risks' },
      { value: 'Educate & Train Audience on Core Concepts', label: 'Educate & Train Audience on Core Concepts' },
      { value: 'Present Empirical Research & Methodology', label: 'Present Empirical Research & Methodology' },
      { value: 'Deliver Quarterly Financial & KPI Review', label: 'Deliver Quarterly Financial & KPI Review' },
      { value: 'Launch New Product & Go-To-Market Plan', label: 'Launch New Product & Go-To-Market Plan' }
    ],
    slidesLabel: 'Slide Count (页数)',
    slidesSuffix: 'Slides',
    styleLabel: 'Presentation Style & Tone (风格)',
    stylePrefix: 'Style',
    styleLabels: {
      executive: { label: 'Executive & McKinsey-Style (Action Titles)', shortLabel: 'Executive' },
      keynote: { label: 'Apple Keynote Minimalist (High Impact)', shortLabel: 'Apple Minimal' },
      persuasive: { label: 'Persuasive & ROI-Driven (Sales / Pitch)', shortLabel: 'Persuasive Sales' },
      analytical: { label: 'Data-Driven & Analytical (Research / Finance)', shortLabel: 'Data-Driven' },
      educational: { label: 'Pedagogical & Structured (Teaching / Workshop)', shortLabel: 'Educational' },
      storytelling: { label: 'Narrative Arc & Visionary (Keynote / Launch)', shortLabel: 'Storytelling' }
    },
    langLabel: 'Output Language (语言)',
    sourceLabel: 'Data Source Context (数据来源)',
    sourceLabels: {
      chat: { label: 'Current Chat Context', desc: 'Synthesize directly from our conversation history' },
      file: { label: 'Uploaded File / PDF / Doc', desc: 'Extract structure & metrics from attached files' },
      outline: { label: 'Pasted Outline / Raw Notes', desc: 'Expand my bullet points into full slides' },
      research: { label: 'Web Search / Deep Research', desc: 'Gather fresh benchmarks & verify citations' }
    },
    optionsLabel: 'Slide Requirements (图表 / 引用 / 演讲者备注)',
    optExec: 'Executive Summary Slide',
    optCharts: 'Suggest Appropriate Charts (需要图表)',
    optCitations: 'Flag Claims for Verification (引用来源)',
    optNotes: 'Add Speaker Notes (演讲者备注)',
    outputTitle: '2. Ready-to-Copy ChatGPT Slides Prompt',
    copyBtn: 'Copy Prompt',
    openBtn: 'Open ChatGPT ↗',
    switchStyleBtn: 'Switch Style (换一种风格)',
    downloadBtn: 'Download .TXT',
    saveLocalBtn: 'Save Locally (保存到本地)',
    proTipLabel: 'Pro Tip:',
    defaultProTip:
      'After clicking "Copy Prompt" or "Open ChatGPT", attach any source PDF/Excel file in ChatGPT so the new ChatGPT Slides canvas populates real numbers and speaker notes.',
    storyboardTitle: 'Live Slide-by-Slide Structure Preview',
    storyboardExportNote: 'Exports to .PPTX · PDF · Google Slides',
    // Saved Drawer
    drawerTitle: '🔖 Saved Prompts Library',
    drawerClose: 'Close ✕',
    drawerHint: 'Drag right to dismiss · Stored locally in your browser.',
    drawerEmpty:
      'No saved prompts yet. Click "Save Locally" on any generator to store your favorite prompt configurations right in your browser (no login required).',
    drawerLoad: 'Load into Editor',
    drawerDelete: 'Delete',
    // Below-Fold Directory
    dirTitle: '47 Specialized ChatGPT Slides Prompt Templates',
    dirDesc:
      'Choose a role-specific presentation blueprint below. Every template pre-loads proven slide structures, chart suggestions, and speaker note rules.',
    dirBtn: 'View All 47 Templates →',
    blueprintSuffix: '-Slide Blueprint →',
    // Below-Fold SEO Sections
    howTitlePrefix: 'How to Use',
    howDesc:
      'Generate a structured, collaborative presentation in ChatGPT Slides (launched October 16, 2026) and export to PowerPoint, PDF, or Google Slides in four steps:',
    howSteps: [
      {
        title: 'Enter Topic & Audience',
        desc: 'Specify your presentation subject, target decision-makers (C-Suite, VCs, Clients, or Students), and primary persuasion or educational goal.'
      },
      {
        title: 'Select Slide Count & Style',
        desc: 'Slide the counter between 5 and 20 slides and pick a narrative tone—such as McKinsey Action Titles, Apple Keynote Minimalist, or Data-Driven Analytical.'
      },
      {
        title: 'Enable Charts & Speaker Notes',
        desc: 'Toggle automatic chart recommendations, speaker pacing scripts, and verification flags so ChatGPT marks any unverified claims with [VERIFY].'
      },
      {
        title: 'Copy to ChatGPT & Export',
        desc: 'Click Copy Prompt or Open ChatGPT, refine slides in the collaborative canvas, and export directly to .pptx, PDF, or Google Slides.'
      }
    ],
    featTitle: 'Key Features of Our ChatGPT Slides Prompt Builder',
    featDesc:
      'Built specifically for OpenAI’s October 2026 ChatGPT Slides canvas workflow—combining zero-latency Apple-grade interaction with presentation consulting best practices.',
    features: [
      {
        title: '🎯 One Clear Message Per Slide',
        desc: 'Prevents ChatGPT from dumping walls of text onto slides. Enforces crisp action titles and scannable 3-bullet visual hierarchy.'
      },
      {
        title: '📊 Smart Chart & Diagram Prompts',
        desc: 'Automatically instructs ChatGPT Slides to recommend waterfall bridges, 2x2 positioning matrices, TAM/SAM/SOM visuals, and cohort charts.'
      },
      {
        title: '🎙️ Presenter View Speaker Notes',
        desc: 'Generates word-for-word spoken transitions, pacing cues, and objection-handling answers that carry over when exported to PowerPoint or Google Slides.'
      },
      {
        title: '🛡️ Hallucination & Citation Guardrails',
        desc: 'Includes explicit verification rules requiring ChatGPT to flag uncertain statistics and cite uploaded PDFs or web research sources.'
      },
      {
        title: '🔒 100% Client-Side & Privacy Safe',
        desc: 'Zero backend servers, zero OpenAI API keys required, and no sign-up walls. All prompt assembly and saved templates stay in your local browser.'
      },
      {
        title: '📤 PowerPoint, PDF & Google Slides Ready',
        desc: 'Optimized for OpenAI’s native export pipeline (OpenAI Help Article 20001605).'
      }
    ],
    compTitle: 'Why Structured Prompts Outperform Generic ChatGPT Slide Requests',
    compDesc:
      'Asking ChatGPT "Make me a 10-slide presentation about X" produces generic, repetitive bullet lists. Compare how our structured prompt architecture transforms output quality:',
    compHeaders: ['Dimension', 'Generic Prompt ("Make slides about X")', 'SlidePrompt.ai Structured Blueprint'],
    compRows: [
      ['Slide Headlines', 'Vague topic labels ("Market Overview", "Financials")', 'Insight-led action titles ("Enterprise Automation Cuts OpEx by 38% Within 60 Days")'],
      ['Visual Density', 'Overcrowded 8-bullet paragraphs that overflow .pptx boxes', 'Strict "One clear message per slide" + 3 concise proof points'],
      ['Data & Charts', 'Plain text numbers buried in sentences', 'Explicit chart specs (Waterfall, 2x2 Matrix, Cohort Bar) with axis labels'],
      ['Fact Accuracy', 'Blends confident hallucinations with real facts', 'Flags any claim requiring verification with [VERIFY] & source attribution'],
      ['Export Readiness', 'Missing speaker notes; requires hours of manual reformatting', 'Complete Presenter View speaker notes ready for PowerPoint & Google Slides']
    ],
    faqTitle: 'Frequently Asked Questions',
    // Footer
    footerDesc:
      'Free client-side prompt engineering studio for OpenAI’s ChatGPT Slides (launched Oct 16, 2026). No API key, no sign-up, instant PowerPoint & Google Slides structure.',
    footerCol1: 'Core Tools & Guides',
    footerCol2: 'Popular Business Prompts',
    footerCol3: 'Academic, Tech & Niche',
    footerCopy: 'Independent prompt builder; not affiliated with OpenAI.',
    footerRefLabel: 'Reference:'
  },

  'zh-TW': {
    langCode: 'zh-TW',
    defaultOutputLang: '繁體中文',
    // Top Header Navigation
    navGenerator: '提示詞產生器',
    navTemplates: '47+ 簡報模板',
    navPitch: '募資簡報',
    navSales: '銷售簡報',
    navPowerpoint: '匯出 PPTX',
    navTroubleshooting: '無法顯示修復',
    savedLabel: '已儲存',
    // Hero Release Pill
    releasePill:
      '已適配 ChatGPT Slides（2026 年 10 月 16 日推出）— 支援 Canvas 協作簡報、匯出 PowerPoint (.pptx)、PDF 與 Google 簡報',
    // Form UI
    formLegend: '1. 設定您的 ChatGPT Slides 簡報參數',
    noApiBadge: '100% 免費 · 免 API Key · 即時生成',
    topicLabel: '演示主題 (Presentation Topic)',
    topicRequired: '必填',
    topicPlaceholder: '例如：2026 Q4 企業 AI 自動化工作流導入策略與 ROI 效益評估...',
    defaultTopic: '2026 Q4 企業 AI 自動化工作流轉型策略與投資回報率 (ROI) 分析',
    trySample: '試試熱門範例:',
    sampleTopics: [
      'AI SaaS 新創公司 A 輪募資簡報 (Pitch Deck)',
      'Q4 企業級 B2B 銷售提案與客戶價值分析',
      '季度業務檢討 (QBR) 與核心 KPI 達成報告',
      '臨床醫學研究方法與實驗數據成果發表'
    ],
    audienceLabel: '目標受眾 (Target Audience)',
    audienceOptions: [
      { value: 'C-Suite & Executive Board (CEO, CFO, VP)', label: '高管與董事會決策層 (CEO, CFO, VP)' },
      { value: 'Enterprise Buyers & Decision Makers', label: '企業採購與業務決策者 (Enterprise Buyers)' },
      { value: 'Venture Capitalists & Angel Investors', label: '創投機構與天使投資人 (VC / Angels)' },
      { value: 'Cross-Functional Product & Engineering Team', label: '跨部門產品與工程研發團隊 (Product & Eng)' },
      { value: 'Academic Peers & Research Committee', label: '學術同儕與研究評審委員會 (Academic)' },
      { value: 'Students & Workshop Participants', label: '學生與工作坊學員 (Students & Trainees)' },
      { value: 'Clients & Agency Stakeholders', label: '外部客戶與專案利害關係人 (Clients)' },
      { value: 'General Conference Audience', label: '大型研討會與公開演講聽眾 (Conference)' }
    ],
    goalLabel: '演示目的 (Goal)',
    goalOptions: [
      { value: 'Persuade & Win Approval / Close Deal', label: '說服決策並贏得批准 / 促成成交' },
      { value: 'Secure Seed / Series A / Grant Funding', label: '爭取種子輪 / A 輪融資或計畫補助' },
      { value: 'Align Stakeholders on Project Status & Risks', label: '對齊專案進度、里程碑與風險控管' },
      { value: 'Educate & Train Audience on Core Concepts', label: '教學培訓並協助受眾掌握核心概念' },
      { value: 'Present Empirical Research & Methodology', label: '發表實證研究方法與數據分析結論' },
      { value: 'Deliver Quarterly Financial & KPI Review', label: '匯報季度財務表現與核心 KPI 達成率' },
      { value: 'Launch New Product & Go-To-Market Plan', label: '發布新產品與市場進入策略 (GTM)' }
    ],
    slidesLabel: '簡報頁數 (Slide Count)',
    slidesSuffix: '頁簡報',
    styleLabel: '簡報風格 (Tone & Style)',
    stylePrefix: '風格',
    styleLabels: {
      executive: { label: '高管決策與麥肯錫顧問風 (結論先行標題)', shortLabel: '高管決策風' },
      keynote: { label: 'Apple 發表會極簡高視覺衝擊風 (Keynote)', shortLabel: 'Apple 極簡' },
      persuasive: { label: '高轉化商業說服與 ROI 導向 (銷售/募資)', shortLabel: '商業說服風' },
      analytical: { label: '數據驅動與嚴謹實證分析風 (研究/財報)', shortLabel: '數據分析風' },
      educational: { label: '循序漸進教學與互動引導風 (課程/培訓)', shortLabel: '教學培訓風' },
      storytelling: { label: '故事敘事與願景感召風 (主題演講/發布會)', shortLabel: '故事敘事風' }
    },
    langLabel: '輸出語言 (Language)',
    sourceLabel: '資料來源 (Data Source)',
    sourceLabels: {
      chat: { label: '當前對話上下文', desc: '直接根據 ChatGPT 對話紀錄提煉簡報重點' },
      file: { label: '上傳文件 / PDF / 報表', desc: '從上傳的附件檔案提取數據與結構（不虛構數字）' },
      outline: { label: '貼上大綱 / 原始筆記', desc: '將我的條列式草稿擴展為完整專業簡報' },
      research: { label: '聯網搜尋 / Deep Research', desc: '檢索最新產業基準數據並附上引用來源' }
    },
    optionsLabel: '進階要求（圖表 / 引用來源 / 演講者備註）',
    optExec: '包含執行摘要頁 (Executive Summary)',
    optCharts: '建議合適的圖表 (Suggest Charts)',
    optCitations: '標註需查核的數據與來源 (Citations)',
    optNotes: '加入演講者備註 (Speaker Notes)',
    outputTitle: '2. 可直接複製到 ChatGPT Slides 的完整提示詞',
    copyBtn: '複製提示詞 (Copy)',
    openBtn: '打開 ChatGPT ↗',
    switchStyleBtn: '換一種風格',
    downloadBtn: '下載 .TXT',
    saveLocalBtn: '保存到本地',
    proTipLabel: '專家提示：',
    defaultProTip:
      '點擊「複製提示詞」或「打開 ChatGPT」後，可在 ChatGPT 對話框一併上傳您的 PDF 或 Excel 檔案，讓 ChatGPT Slides 自動帶入真實數據與講者備忘稿。',
    storyboardTitle: '即時簡報大綱結構預覽',
    storyboardExportNote: '支援匯出 .PPTX · PDF · Google 簡報',
    // Saved Drawer
    drawerTitle: '🔖 已儲存的提示詞庫',
    drawerClose: '關閉 ✕',
    drawerHint: '向右滑動即可關閉 · 資料僅儲存在您的本地瀏覽器中。',
    drawerEmpty: '目前尚無儲存的提示詞。點擊產生器上的「保存到本地」即可將常用簡報配置收藏於瀏覽器（免登入）。',
    drawerLoad: '載入到編輯器',
    drawerDelete: '刪除',
    // Below-Fold Directory
    dirTitle: '47 個 ChatGPT Slides 專屬場景簡報提示詞模板',
    dirDesc: '選擇符合您角色與場景的簡報藍圖。每個模板皆預載經過實戰驗證的分頁結構、圖表建議與講者備忘稿規則。',
    dirBtn: '查看全部 47 個模板 →',
    blueprintSuffix: ' 頁簡報藍圖 →',
    // Below-Fold SEO Sections
    howTitlePrefix: '如何使用',
    howDesc: '只需 4 個步驟，即可在 ChatGPT Slides（2026 年 10 月 16 日推出）生成結構化協作簡報，並一鍵匯出為 PowerPoint、PDF 或 Google 簡報：',
    howSteps: [
      {
        title: '輸入簡報主題與目標受眾',
        desc: '填寫您的演示主題、核心決策受眾（高管董事會、創投、企業客戶或學生）以及本次簡報的核心目標。'
      },
      {
        title: '選擇頁數與敘事風格',
        desc: '拖動滑桿設定 5 至 20 頁簡報篇幅，並選擇麥肯錫結論先行、Apple 極簡發表會或數據分析等專業風格。'
      },
      {
        title: '勾選圖表建議與講者備註',
        desc: '開啟自動圖表配置建議、逐字口播講稿以及 [VERIFY] 事實查核標記，避免 AI 編造未經證實的數據。'
      },
      {
        title: '一鍵複製至 ChatGPT 並匯出',
        desc: '點擊「複製提示詞」或「打開 ChatGPT」，在協作畫布中微調後即可直接匯出 .pptx、PDF 或 Google 簡報。'
      }
    ],
    featTitle: 'ChatGPT Slides 簡報提示詞產生器核心優勢',
    featDesc: '專為 OpenAI 2026 年 10 月推出的 ChatGPT Slides 畫布工作流打造，結合零延遲互動體驗與頂尖顧問簡報方法論。',
    features: [
      {
        title: '🎯 每頁聚焦單一核心結論',
        desc: '防止 ChatGPT 把整段長文塞進投影片。強制採用「結論先行標題 (Action Title)」與最多 3 點精煉論據。'
      },
      {
        title: '📊 智慧圖表與視覺化配置建議',
        desc: '自動指示 ChatGPT Slides 在數據頁推薦瀑布圖、2x2 競爭矩陣、TAM/SAM/SOM 市場規模圖與趨勢圖。'
      },
      {
        title: '🎙️ 完整演講者備忘稿 (Speaker Notes)',
        desc: '為每一頁生成自然流暢的口播講稿、轉場提示與問答應對重點，匯出至 PowerPoint 後可直接於演講者檢視使用。'
      },
      {
        title: '🛡️ 防幻覺與數據來源查核機制',
        desc: '內建嚴格查核規則，要求 ChatGPT 將待確認的統計數據標記為 [VERIFY] 並註明文件或搜尋來源。'
      },
      {
        title: '🔒 100% 純前端執行・隱私安全',
        desc: '無需後端伺服器、免填 OpenAI API Key、免註冊帳號。所有提示詞組合與本地收藏皆保留在您的瀏覽器中。'
      },
      {
        title: '📤 完美支援 PowerPoint、PDF 與 Google 簡報',
        desc: '針對 OpenAI 官方簡報匯出管線深度優化（參考 OpenAI 官方說明文件 20001605）。'
      }
    ],
    compTitle: '為什麼結構化提示詞遠勝於普通一句話指令？',
    compDesc: '如果只對 ChatGPT 說「幫我做一份 10 頁關於 X 的簡報」，往往只會得到空洞重複的條列文字。對比結構化指令帶來的品質差異：',
    compHeaders: ['比較維度', '普通指令（「幫我做關於 X 的簡報」）', 'SlidePrompt.ai 結構化簡報指令'],
    compRows: [
      ['投影片標題', '模糊的主題標籤（「市場概況」、「財務分析」）', '結論先行觀點標題（「導入企業 AI 自動化可在 60 天內降低 38% 營運成本」）'],
      ['版面文字密度', '每頁塞滿 8 條長句，匯出 .pptx 時嚴重跑版溢位', '嚴格執行「每頁一核心訊息」+ 3 點精煉佐證，版面清爽'],
      ['數據與圖表', '將數字埋在長篇段落文字中，缺乏視覺層次', '明確指定圖表類型（瀑布圖、2x2 矩陣、長條圖）與座標軸標籤'],
      ['事實準確度', '容易把 AI 幻覺編造的數據當成事實寫入簡報', '自動將需人工核實的數據標註 [VERIFY] 並提示引用來源'],
      ['匯出可用性', '缺少講者備忘稿，下載後仍需花數小時手動重排', '自帶完整演講者口播稿，匯出 PowerPoint 與 Google 簡報即可直接上台']
    ],
    faqTitle: '常見問題解答 (FAQ)',
    // Footer
    footerDesc:
      '專為 OpenAI ChatGPT Slides（2026 年 10 月 16 日推出）設計的免費前端提示詞工具。免 API Key、免註冊，一鍵生成可匯出 PowerPoint 與 Google 簡報的專業指令。',
    footerCol1: '核心工具與指南',
    footerCol2: '熱門商務簡報模板',
    footerCol3: '學術、教育與垂直領域',
    footerCopy: '獨立開發之提示詞產生工具，與 OpenAI 無隸屬關係。',
    footerRefLabel: '官方指南參考：'
  },

  es: {
    langCode: 'es',
    defaultOutputLang: 'Español',
    // Top Header Navigation
    navGenerator: 'Generador',
    navTemplates: '47+ Plantillas',
    navPitch: 'Pitch Deck',
    navSales: 'Ventas',
    navPowerpoint: 'Exportar PPTX',
    navTroubleshooting: 'Solución Error',
    savedLabel: 'Guardados',
    // Hero Release Pill
    releasePill:
      'Actualizado para ChatGPT Slides (Lanzado el 16 oct 2026) — Compatible con Canvas Colaborativo y Exportación a PowerPoint (.pptx), PDF y Google Slides',
    // Form UI
    formLegend: '1. Configura tu Presentación de ChatGPT Slides',
    noApiBadge: '100% Gratis · Sin API Key · Copia Instantánea',
    topicLabel: 'Tema de la Presentación',
    topicRequired: 'Obligatorio',
    topicPlaceholder: 'Ej. Estrategia de Automatización IA B2B para el Q4 y ROI...',
    defaultTopic: 'Estrategia de Automatización de Flujos con IA Empresarial Q4 y Retorno de Inversión (ROI)',
    trySample: 'Ejemplos rápidos:',
    sampleTopics: [
      'Pitch Deck Serie A para Startup SaaS de IA',
      'Propuesta Ejecutiva de Ventas B2B Q4',
      'Revisión Trimestral de Negocio (QBR) y KPIs',
      'Metodología y Resultados de Investigación Clínica'
    ],
    audienceLabel: 'Audiencia Objetivo',
    audienceOptions: [
      { value: 'C-Suite & Executive Board (CEO, CFO, VP)', label: 'Directivos C-Suite y Junta Directiva (CEO, CFO, VP)' },
      { value: 'Enterprise Buyers & Decision Makers', label: 'Compradores Empresariales y Tomadores de Decisión' },
      { value: 'Venture Capitalists & Angel Investors', label: 'Inversores de Capital de Riesgo (VCs y Business Angels)' },
      { value: 'Cross-Functional Product & Engineering Team', label: 'Equipo de Producto e Ingeniería' },
      { value: 'Academic Peers & Research Committee', label: 'Comité Académico y de Investigación' },
      { value: 'Students & Workshop Participants', label: 'Estudiantes y Participantes de Taller' },
      { value: 'Clients & Agency Stakeholders', label: 'Clientes y Stakeholders de Proyecto' },
      { value: 'General Conference Audience', label: 'Audiencia General de Conferencia' }
    ],
    goalLabel: 'Objetivo de la Presentación',
    goalOptions: [
      { value: 'Persuade & Win Approval / Close Deal', label: 'Persuadir, Ganar Aprobación y Cerrar Venta' },
      { value: 'Secure Seed / Series A / Grant Funding', label: 'Conseguir Inversión Semilla / Serie A / Subvención' },
      { value: 'Align Stakeholders on Project Status & Risks', label: 'Alinear Avances del Proyecto, Hitos y Riesgos' },
      { value: 'Educate & Train Audience on Core Concepts', label: 'Educar y Capacitar en Conceptos Clave' },
      { value: 'Present Empirical Research & Methodology', label: 'Presentar Investigación Empírica y Metodología' },
      { value: 'Deliver Quarterly Financial & KPI Review', label: 'Presentar Informe Financiero Trimestral y KPIs' },
      { value: 'Launch New Product & Go-To-Market Plan', label: 'Lanzamiento de Producto y Estrategia Go-To-Market' }
    ],
    slidesLabel: 'Número de Diapositivas',
    slidesSuffix: 'Diapositivas',
    styleLabel: 'Estilo y Tono',
    stylePrefix: 'Estilo',
    styleLabels: {
      executive: { label: 'Ejecutivo Estilo McKinsey (Títulos de Acción)', shortLabel: 'Ejecutivo' },
      keynote: { label: 'Minimalista Estilo Apple Keynote (Alto Impacto)', shortLabel: 'Apple Minimal' },
      persuasive: { label: 'Persuasivo y Orientado a ROI (Ventas / Pitch)', shortLabel: 'Ventas ROI' },
      analytical: { label: 'Analítico y Basado en Datos (Investigación / Finanzas)', shortLabel: 'Analítico' },
      educational: { label: 'Pedagógico y Estructurado (Clases / Talleres)', shortLabel: 'Educativo' },
      storytelling: { label: 'Narrativo y Visionario (Keynote / Lanzamiento)', shortLabel: 'Storytelling' }
    },
    langLabel: 'Idioma de Salida',
    sourceLabel: 'Fuente de Datos',
    sourceLabels: {
      chat: { label: 'Contexto del Chat Actual', desc: 'Sintetizar directamente desde nuestra conversación' },
      file: { label: 'Archivo Subido / PDF / Doc', desc: 'Extraer métricas y tablas del documento adjunto' },
      outline: { label: 'Esquema o Notas Pegadas', desc: 'Convertir mis puntos clave en diapositivas completas' },
      research: { label: 'Búsqueda Web / Deep Research', desc: 'Buscar datos recientes y verificar fuentes' }
    },
    optionsLabel: 'Requisitos de las Diapositivas',
    optExec: 'Diapositiva de Resumen Ejecutivo',
    optCharts: 'Sugerir Gráficos Adecuados',
    optCitations: 'Marcar Datos por Verificar ([VERIFY])',
    optNotes: 'Añadir Notas del Orador',
    outputTitle: '2. Prompt Listo para Copiar en ChatGPT Slides',
    copyBtn: 'Copiar Prompt',
    openBtn: 'Abrir ChatGPT ↗',
    switchStyleBtn: 'Cambiar Estilo',
    downloadBtn: 'Descargar .TXT',
    saveLocalBtn: 'Guardar Localmente',
    proTipLabel: 'Consejo Pro:',
    defaultProTip:
      'Tras hacer clic en "Copiar Prompt" o "Abrir ChatGPT", adjunta tu archivo PDF o Excel en ChatGPT para que el lienzo de ChatGPT Slides utilice tus cifras reales.',
    storyboardTitle: 'Vista Previa de la Estructura de Diapositivas',
    storyboardExportNote: 'Exportable a .PPTX · PDF · Google Slides',
    // Saved Drawer
    drawerTitle: '🔖 Biblioteca de Prompts Guardados',
    drawerClose: 'Cerrar ✕',
    drawerHint: 'Arrastra a la derecha para cerrar · Guardado localmente en tu navegador.',
    drawerEmpty:
      'Aún no hay prompts guardados. Haz clic en "Guardar Localmente" para conservar tus configuraciones favoritas en el navegador (sin registro).',
    drawerLoad: 'Cargar en el Editor',
    drawerDelete: 'Eliminar',
    // Below-Fold Directory
    dirTitle: '47 Plantillas Especializadas para ChatGPT Slides',
    dirDesc:
      'Elige una estructura profesional según tu rol. Cada plantilla incluye secuencia de diapositivas probada, gráficos sugeridos y notas del orador.',
    dirBtn: 'Ver las 47 Plantillas →',
    blueprintSuffix: ' Diapositivas →',
    // Below-Fold SEO Sections
    howTitlePrefix: 'Cómo Usar',
    howDesc:
      'Genera una presentación colaborativa en ChatGPT Slides (lanzado el 16 de octubre de 2026) y expórtala a PowerPoint, PDF o Google Slides en 4 pasos:',
    howSteps: [
      {
        title: 'Define Tema y Audiencia',
        desc: 'Indica el tema de tu presentación, el público objetivo (directivos, inversores, clientes o alumnos) y el objetivo principal.'
      },
      {
        title: 'Elige Número de Diapositivas y Tono',
        desc: 'Ajusta entre 5 y 20 diapositivas y selecciona un estilo como Títulos de Acción McKinsey, Minimalista Apple Keynote o Analítico.'
      },
      {
        title: 'Activa Gráficos y Notas del Orador',
        desc: 'Habilita recomendaciones de gráficos, guion para el presentador y etiquetas [VERIFY] para evitar datos no verificados.'
      },
      {
        title: 'Copia en ChatGPT y Exporta',
        desc: 'Haz clic en Copiar Prompt o Abrir ChatGPT, edita en el lienzo colaborativo y descarga en formato .pptx, PDF o Google Slides.'
      }
    ],
    featTitle: 'Características Clave de Nuestro Generador para ChatGPT Slides',
    featDesc:
      'Diseñado específicamente para el flujo de trabajo de ChatGPT Slides de octubre de 2026 con respuesta instantánea y estructura ejecutiva.',
    features: [
      {
        title: '🎯 Un Mensaje Claro por Diapositiva',
        desc: 'Evita diapositivas saturadas de texto. Impone titulares de acción claros y un máximo de 3 puntos clave por lámina.'
      },
      {
        title: '📊 Recomendación Inteligente de Gráficos',
        desc: 'Indica a ChatGPT Slides qué gráficos usar (puentes waterfall, matrices 2x2, TAM/SAM/SOM o barras comparativas).'
      },
      {
        title: '🎙️ Notas del Orador para Vista de Presentador',
        desc: 'Genera transiciones habladas y respuestas a objeciones que se conservan al exportar a PowerPoint y Google Slides.'
      },
      {
        title: '🛡️ Control de Alucinaciones y Citas',
        desc: 'Exige marcar cualquier cifra dudosa con [VERIFY] y citar documentos adjuntos o fuentes verificables.'
      },
      {
        title: '🔒 100% en tu Navegador y Privado',
        desc: 'Sin servidores externos, sin clave API de OpenAI y sin registro. Tus prompts se procesan y guardan localmente.'
      },
      {
        title: '📤 Listo para PowerPoint, PDF y Google Slides',
        desc: 'Optimizado para la exportación nativa de OpenAI (Artículo de ayuda oficial 20001605).'
      }
    ],
    compTitle: 'Por Qué los Prompts Estructurados Superan a las Peticiones Genéricas',
    compDesc:
      'Pedir a ChatGPT "Haz una presentación de 10 diapositivas sobre X" produce listas genéricas. Compara la diferencia de calidad:',
    compHeaders: ['Dimensión', 'Prompt Genérico ("Haz diapositivas sobre X")', 'Estructura SlidePrompt.ai'],
    compRows: [
      ['Titulares', 'Etiquetas vagas ("Resumen de Mercado", "Finanzas")', 'Títulos con conclusión ("La Automatización IA Reduce Costos Operativos un 38% en 60 Días")'],
      ['Densidad Visual', 'Párrafos largos que se desbordan al exportar a .pptx', 'Regla estricta de "Un mensaje por diapositiva" + 3 pruebas concisas'],
      ['Datos y Gráficos', 'Cifras ocultas dentro de párrafos de texto', 'Especificación exacta de gráfico y ejes en cada diapositiva de datos'],
      ['Precisión', 'Mezcla estimaciones inventadas con datos reales', 'Marca datos pendientes de confirmar con [VERIFY] y pide fuentes'],
      ['Exportación', 'Sin notas del orador; requiere horas de edición manual', 'Notas del orador completas listas para PowerPoint y Google Slides']
    ],
    faqTitle: 'Preguntas Frecuentes (FAQ)',
    // Footer
    footerDesc:
      'Generador gratuito de prompts para ChatGPT Slides de OpenAI (lanzado el 16 de octubre de 2026). Sin API key ni registro; listo para PowerPoint y Google Slides.',
    footerCol1: 'Herramientas y Guías',
    footerCol2: 'Prompts de Negocios',
    footerCol3: 'Educación, Ciencia y Nichos',
    footerCopy: 'Herramienta independiente; no afiliada con OpenAI.',
    footerRefLabel: 'Referencia oficial:'
  },

  ja: {
    langCode: 'ja',
    defaultOutputLang: '日本語',
    // Top Header Navigation
    navGenerator: 'プロンプト作成',
    navTemplates: '47+ テンプレート',
    navPitch: 'ピッチデック',
    navSales: '営業資料',
    navPowerpoint: 'PPTX出力ガイド',
    navTroubleshooting: '表示不具合対策',
    savedLabel: '保存済み',
    // Hero Release Pill
    releasePill:
      'ChatGPT Slides（2026年10月16日公開）完全対応 — キャンバス共同編集・PowerPoint (.pptx) / PDF / Googleスライド出力に最適化',
    // Form UI
    formLegend: '1. プレゼンテーション条件を入力',
    noApiBadge: '完全無料 · APIキー不要 · 登録不要',
    topicLabel: 'プレゼンのテーマ (Topic)',
    topicRequired: '必須',
    topicPlaceholder: '例：2026年Q4 全社AI業務自動化推進戦略とROI試算...',
    defaultTopic: '2026年Q4 法人向けAI業務自動化ワークフロー導入戦略と投資対効果 (ROI) 試算',
    trySample: 'サンプルを試す:',
    sampleTopics: [
      'AI SaaSスタートアップ シリーズA資金調達ピッチデック',
      'エンタープライズ向けB2B営業提案・ROI試算書',
      '四半期ビジネスレビュー (QBR) ＆ KPI達成報告',
      '臨床研究の方法論と統計解析データの学会発表'
    ],
    audienceLabel: '対象オーディエンス (対象読者)',
    audienceOptions: [
      { value: 'C-Suite & Executive Board (CEO, CFO, VP)', label: '経営陣・取締役会 (CEO, CFO, VP)' },
      { value: 'Enterprise Buyers & Decision Makers', label: '法人導入決裁者・購買責任者' },
      { value: 'Venture Capitalists & Angel Investors', label: 'ベンチャーキャピタル・投資家 (VC)' },
      { value: 'Cross-Functional Product & Engineering Team', label: 'プロダクト・開発エンジニアチーム' },
      { value: 'Academic Peers & Research Committee', label: '学会・研究審査委員会' },
      { value: 'Students & Workshop Participants', label: '学生・研修ワークショップ参加者' },
      { value: 'Clients & Agency Stakeholders', label: 'クライアント・プロジェクト関係者' },
      { value: 'General Conference Audience', label: 'カンファレンス・一般聴衆' }
    ],
    goalLabel: 'プレゼンの目的',
    goalOptions: [
      { value: 'Persuade & Win Approval / Close Deal', label: '意思決定の承認獲得・商談成約' },
      { value: 'Secure Seed / Series A / Grant Funding', label: 'シード／シリーズA資金調達・助成金獲得' },
      { value: 'Align Stakeholders on Project Status & Risks', label: 'プロジェクト進捗・リスクの合意形成' },
      { value: 'Educate & Train Audience on Core Concepts', label: '重要コンセプトの教育・社内研修' },
      { value: 'Present Empirical Research & Methodology', label: '実証研究データと方法論の発表' },
      { value: 'Deliver Quarterly Financial & KPI Review', label: '四半期業績・財務KPIレビュー' },
      { value: 'Launch New Product & Go-To-Market Plan', label: '新製品発表会・GTM戦略の共有' }
    ],
    slidesLabel: 'スライド枚数',
    slidesSuffix: '枚',
    styleLabel: 'トーン＆スタイル',
    stylePrefix: 'スタイル',
    styleLabels: {
      executive: { label: 'エグゼクティブ・マッキンゼー流 (結論ファースト)', shortLabel: 'エグゼクティブ' },
      keynote: { label: 'Apple Keynote風ミニマル (高インパクト)', shortLabel: 'Appleミニマル' },
      persuasive: { label: 'ROI重視・セールス説得型 (営業・ピッチ)', shortLabel: 'セールス説得型' },
      analytical: { label: 'データ分析・エビデンス重視 (研究・財務)', shortLabel: 'データ分析型' },
      educational: { label: 'わかりやすい段階的解説 (授業・研修)', shortLabel: '教育・研修型' },
      storytelling: { label: 'ストーリーテリング・ビジョン共感型', shortLabel: 'ストーリー型' }
    },
    langLabel: '出力言語',
    sourceLabel: 'データソース・参照元',
    sourceLabels: {
      chat: { label: '現在のチャット履歴', desc: '会話の文脈から要点を整理してスライド化' },
      file: { label: 'アップロード資料 / PDF', desc: '添付ファイルの数値・表から正確に抽出' },
      outline: { label: '貼り付けた構成案・メモ', desc: '箇条書きメモを完成されたスライドに展開' },
      research: { label: 'Web検索 / Deep Research', desc: '最新市場データと出典を検索して引用' }
    },
    optionsLabel: '追加オプション（図表・出典・ノート）',
    optExec: 'エグゼクティブサマリーを含める',
    optCharts: '適切なグラフ・図表を提案',
    optCitations: '要検証の数値に [VERIFY] と出典を明記',
    optNotes: 'スピーカーノート（発表原稿）を追加',
    outputTitle: '2. 生成された ChatGPT Slides プロンプト',
    copyBtn: 'プロンプトをコピー',
    openBtn: 'ChatGPTを開く ↗',
    switchStyleBtn: 'スタイル切替',
    downloadBtn: 'TXT保存',
    saveLocalBtn: 'ブラウザに保存',
    proTipLabel: '活用ヒント：',
    defaultProTip:
      '「プロンプトをコピー」または「ChatGPTを開く」をクリックした後、ChatGPTにPDFやExcel資料を添付すると、実際の数値を反映したスライドと発表原稿が生成されます。',
    storyboardTitle: 'スライド構成リアルタイムプレビュー',
    storyboardExportNote: '.PPTX · PDF · Googleスライド出力対応',
    // Saved Drawer
    drawerTitle: '🔖 保存済みプロンプト一覧',
    drawerClose: '閉じる ✕',
    drawerHint: '右へドラッグして閉じる · お使いのブラウザ内にのみ保存されます。',
    drawerEmpty:
      '保存されたプロンプトはまだありません。「ブラウザに保存」をクリックすると、ログイン不要でお気に入りの設定を保存できます。',
    drawerLoad: 'エディタに読み込む',
    drawerDelete: '削除',
    // Below-Fold Directory
    dirTitle: '用途別 47種類のChatGPT Slidesプロンプトテンプレート',
    dirDesc:
      '営業・資金調達・研究発表・社内報告など、目的別の構成テンプレートを選択できます。すべて図表提案とスピーカーノート指示付きです。',
    dirBtn: '全47テンプレートを見る →',
    blueprintSuffix: '枚構成テンプレート →',
    // Below-Fold SEO Sections
    howTitlePrefix: '使い方ガイド：',
    howDesc:
      '2026年10月16日に公開されたChatGPT Slidesで、PowerPoint・PDF・Googleスライドに出力できる高品質なプレゼンを4ステップで作成します：',
    howSteps: [
      {
        title: 'テーマと対象読者を入力',
        desc: 'プレゼンの主題、想定する聴衆（経営陣、投資家、顧客、学生など）、達成したいゴールを選択します。'
      },
      {
        title: 'スライド枚数とスタイルを選択',
        desc: 'スライダーで5〜20枚を指定し、マッキンゼー流の結論ファーストやApple風ミニマルなどのトーンを選びます。'
      },
      {
        title: '図表提案と発表原稿を有効化',
        desc: 'グラフの自動提案、スピーカーノート、未確認データへの [VERIFY] ラベル付与をオンにします。'
      },
      {
        title: 'ChatGPTに貼り付けてPPTX出力',
        desc: '「プロンプトをコピー」または「ChatGPTを開く」を押し、キャンバス上で調整して .pptx・PDF・Googleスライドへ出力します。'
      }
    ],
    featTitle: 'ChatGPT Slides プロンプト作成ツールの特徴',
    featDesc:
      '2026年10月リリースのChatGPT Slidesキャンバス機能に特化。コンサル品質のスライド構成ルールをワンクリックで注入します。',
    features: [
      {
        title: '🎯 1スライド・1メッセージの原則',
        desc: '文字だらけのスライドを防止。結論を言い切るアクションタイトルと3つの根拠ポイントに整理します。'
      },
      {
        title: '📊 最適なグラフ・図解の自動指定',
        desc: 'ウォーターフォール図、2x2マトリクス、市場規模（TAM/SAM/SOM）など、データに合った図表を指示します。'
      },
      {
        title: '🎙️ 発表者ビュー対応スピーカーノート',
        desc: 'PowerPointやGoogleスライドに書き出した際もそのまま使える、自然なトークスクリプトと想定問答を生成します。'
      },
      {
        title: '🛡️ ハルシネーション防止と出典明記',
        desc: '不確実な統計数値には [VERIFY] タグを付けさせ、添付PDFやWeb検索の根拠を明示させます。'
      },
      {
        title: '🔒 100%ブラウザ完結・プライバシー保護',
        desc: '外部サーバー送信なし、OpenAI APIキー不要、会員登録不要。すべての処理はお使いのブラウザ内で完結します。'
      },
      {
        title: '📤 PowerPoint・PDF・Googleスライド対応',
        desc: 'OpenAI公式のスライド書き出し仕様（ヘルプ記事 20001605）に最適化されています。'
      }
    ],
    compTitle: 'なぜ「構造化プロンプト」でスライドの質が劇的に変わるのか？',
    compDesc:
      '単に「〇〇について10枚のスライドを作って」と頼むのと、構造化プロンプトを使う場合の違いを比較してください：',
    compHeaders: ['比較項目', '通常の指示（「〇〇のスライドを作って」）', 'SlidePrompt.ai 構造化プロンプト'],
    compRows: [
      ['スライド見出し', '抽象的なラベル（「市場概要」「財務計画」など）', '結論ファーストの見出し（「AI自動化により60日以内に運用コストを38%削減」）'],
      ['文字量とレイアウト', '長文の箇条書きが並び、PPTX書き出し時に枠から溢れる', '「1スライド1メッセージ」＋3つの簡潔な根拠でレイアウト崩れを防止'],
      ['データと図表', '数値が文章の中に埋もれて視覚的に伝わらない', 'グラフ種類（滝グラフ・2x2マトリクス等）と軸ラベルを明確に指示'],
      ['ファクトチェック', 'AIが作った架空の数値と事実が混在する', '要確認データに [VERIFY] を付与し、参照元の明記を義務付け'],
      ['発表準備の手間', 'ノートが空欄で、ダウンロード後に数時間の手直しが必要', 'そのまま読めるスピーカーノート付きで即座にプレゼン可能']
    ],
    faqTitle: 'よくある質問 (FAQ)',
    // Footer
    footerDesc:
      'OpenAIのChatGPT Slides（2026年10月16日公開）向け無料プロンプト作成ツール。APIキー不要・登録不要でPowerPointやGoogleスライド用構成を即座に生成。',
    footerCol1: '主要ツール＆ガイド',
    footerCol2: 'ビジネス定番プロンプト',
    footerCol3: '研究・教育・専門分野',
    footerCopy: '当サイトは独立したプロンプト作成ツールであり、OpenAIとは提携していません。',
    footerRefLabel: '公式リファレンス：'
  }
};

// Localized Page Metadata & Content for the 6 Top-Navigation Hub Pages in ES, JA, and zh-TW
export const LOCALIZED_HUB_PAGES = {
  'zh-TW': {
    generator: {
      metaTitle: 'ChatGPT Slides 提示詞產生器 - 免費簡報指令模板工具 (支援 PPTX)',
      metaDesc:
        '專為 2026 年 10 月推出的 ChatGPT Slides 打造的免費簡報提示詞產生器。一鍵設定簡報主題、受眾、頁數、圖表建議與講者備忘稿，輕鬆匯出 PowerPoint 與 Google 簡報！',
      h1: 'ChatGPT Slides 簡報提示詞產生器',
      subtitle:
        '專為 OpenAI 最新發布的 ChatGPT Slides 協作簡報功能設計。無需 API Key、免註冊，輸入主題與受眾即可生成結構化簡報指令，完美匯出 PowerPoint (.pptx)、PDF 與 Google Slides。'
    },
    templates: {
      metaTitle: '47+ ChatGPT Slides 簡報提示詞模板庫（銷售、募資、研究報告）',
      metaDesc:
        '免費瀏覽 47+ 個 ChatGPT Slides 簡報提示詞模板，涵蓋商業銷售、新創 Pitch Deck、季度檢討 QBR、學術研究與教學課件，一鍵複製即可生成 PPTX！',
      h1: 'ChatGPT Slides 簡報提示詞模板庫（47+ 專業場景藍圖）',
      subtitle:
        '精選 47 個經過實戰驗證的 ChatGPT Slides 簡報結構藍圖。點擊任一模板即可自訂頁數、風格、圖表建議與演講者備忘稿。'
    },
    pitchDeck: {
      metaTitle: 'ChatGPT Slides 募資簡報 (Pitch Deck) 提示詞產生器 | 免費模板',
      metaDesc:
        '專為新創種子輪與 A 輪打造的 ChatGPT Slides 募資簡報提示詞產生器。內建痛點分析、TAM/SAM/SOM 市場規模、商業模式與財務預測 10 頁結構！',
      h1: 'ChatGPT Slides 新創募資簡報 (Pitch Deck) 提示詞產生器',
      subtitle:
        '遵循紅杉資本 (Sequoia) 與 Y Combinator 投資人偏好的 10 頁募資簡報架構，一鍵生成包含市場規模圖表與講者備忘稿的 ChatGPT Slides 指令。',
      defaultTopic: 'AI 原生企業自動化 SaaS 平台 — A 輪募資簡報 (Series A Pitch Deck)'
    },
    salesDeck: {
      metaTitle: 'ChatGPT Slides 銷售簡報 (Sales Deck) 提示詞產生器 | B2B 提案',
      metaDesc:
        '免費生成高轉化率 B2B 銷售簡報提示詞。結合客戶痛點診斷、ROI 投資回報計算、成功案例與實施路線圖，輕鬆從 ChatGPT Slides 匯出 PowerPoint！',
      h1: 'ChatGPT Slides B2B 銷售簡報提示詞產生器',
      subtitle:
        '打造以客戶價值與 ROI 為核心的企業銷售提案簡報。自動規劃痛點成本分析、前後效益對比圖表與異議處理演講稿。',
      defaultTopic: '財富 500 強企業營運團隊專屬 AI 工作流自動化平台銷售提案'
    },
    powerpoint: {
      metaTitle: 'ChatGPT Slides 匯出 PowerPoint (.PPTX)、PDF 與 Google 簡報教學',
      metaDesc:
        '解決 ChatGPT Slides 匯出 PowerPoint 文字溢位與排版混亂問題！使用專屬防跑版簡報提示詞產生器，保留完整標題層級與演講者備忘稿。',
      h1: 'ChatGPT Slides 匯出 PowerPoint (.PPTX) 提示詞產生器與防跑版指南',
      subtitle:
        '消除從 ChatGPT Slides 匯出至 Microsoft PowerPoint、PDF 或 Google 簡報時的文字超框與格式錯亂，自動將長篇解說移入演講者檢視備忘稿。',
      defaultTopic: '針對 PowerPoint (.pptx) 完美排版優化的年度企業策略簡報'
    },
    troubleshooting: {
      metaTitle: 'ChatGPT Slides 無法顯示或找不到？5 個即時修復方法與觸發指令',
      metaDesc:
        '為什麼 ChatGPT 裡沒有出現 Slides 簡報畫布？檢查這 5 項帳號與模型設定，並複製能強制喚醒 ChatGPT Slides 協作畫布的標準觸發指令！',
      h1: 'ChatGPT Slides 無法顯示？5 步故障排除指南與畫布喚醒提示詞',
      subtitle:
        '看不到 2026 年 10 月新推出的 ChatGPT Slides 簡報畫布或 PPTX 下載按鈕？按照以下 60 秒檢測清單排查，並使用下方標準指令直接喚醒簡報模式。',
      defaultTopic: '季度高管業務檢討報告（強制喚醒 ChatGPT Slides 畫布模式專用指令）'
    }
  },

  es: {
    generator: {
      metaTitle: 'Generador de Prompts para ChatGPT Slides (Gratis y Online)',
      metaDesc:
        'Crea prompts profesionales para ChatGPT Slides gratis. Define tema, audiencia, número de diapositivas, gráficos y notas del orador para PowerPoint.',
      h1: 'Generador de Prompts para ChatGPT Slides',
      subtitle:
        'Genera presentaciones colaborativas en ChatGPT Slides (lanzado el 16 de octubre de 2026) listas para exportar a PowerPoint (.pptx), PDF y Google Slides sin API ni registro.'
    },
    templates: {
      metaTitle: '47+ Plantillas de Prompts para ChatGPT Slides (Ventas, Pitch, Educación)',
      metaDesc:
        'Explora 47+ plantillas gratuitas de prompts para ChatGPT Slides: presentaciones de ventas, pitch decks, informes financieros y clases. ¡Copia en un clic!',
      h1: 'Biblioteca de 47+ Plantillas para ChatGPT Slides',
      subtitle:
        'Elige entre 47 estructuras de presentación probadas para el lienzo de ChatGPT Slides. Personaliza número de diapositivas, tono, gráficos y notas del orador.'
    },
    pitchDeck: {
      metaTitle: 'Prompt de Pitch Deck para ChatGPT Slides (Plantilla para Startups)',
      metaDesc:
        'Genera un Pitch Deck ganador en ChatGPT Slides. Incluye problema, solución, mercado TAM/SAM/SOM, tracción, modelo de negocio y exportación a PowerPoint.',
      h1: 'Generador de Prompts de Pitch Deck para ChatGPT Slides',
      subtitle:
        'Estructura tu presentación para inversores (Semilla / Serie A) con narrativa estilo Sequoia, gráficos de mercado TAM/SAM/SOM y notas para preguntas de VCs.',
      defaultTopic: 'Plataforma SaaS de Automatización con IA B2B — Pitch Deck Serie A'
    },
    salesDeck: {
      metaTitle: 'Prompt de Presentación de Ventas para ChatGPT Slides (B2B)',
      metaDesc:
        'Crea presentaciones comerciales B2B de alta conversión en ChatGPT Slides. Estructura puntos de dolor, cálculo de ROI, casos de éxito y exportación .pptx.',
      h1: 'Generador de Prompts de Presentación de Ventas para ChatGPT Slides',
      subtitle:
        'Construye propuestas comerciales persuasivas centradas en el ROI, comparativas antes/después y manejo de objeciones listas para PowerPoint.',
      defaultTopic: 'Propuesta de Plataforma de Automatización IA para Operaciones Empresariales'
    },
    powerpoint: {
      metaTitle: 'Exportar ChatGPT Slides a PowerPoint (.PPTX), PDF y Google Slides',
      metaDesc:
        'Genera prompts de ChatGPT Slides optimizados para exportar a PowerPoint (.pptx), PDF y Google Slides sin texto desbordado y con notas del orador.',
      h1: 'Guía y Generador para Exportar ChatGPT Slides a PowerPoint (.PPTX)',
      subtitle:
        'Evita cajas de texto desbordadas y formatos rotos al descargar tus presentaciones de ChatGPT Slides en Microsoft PowerPoint, PDF o Google Slides.',
      defaultTopic: 'Presentación de Estrategia Ejecutiva Optimizada para Exportación Limpia a PowerPoint (.pptx)'
    },
    troubleshooting: {
      metaTitle: '¿ChatGPT Slides No Aparece? 5 Soluciones y Prompt Activador',
      metaDesc:
        'Soluciona por qué ChatGPT Slides no aparece en tu cuenta. Revisa permisos de Canvas, caché y copia el comando exacto que abre el lienzo de diapositivas.',
      h1: '¿ChatGPT Slides No Aparece? Guía de Solución y Prompt Activador del Lienzo',
      subtitle:
        '¿No ves el nuevo lienzo de ChatGPT Slides de octubre de 2026 ni el botón de exportar a PowerPoint? Sigue estos 5 pasos y usa el prompt activador.',
      defaultTopic: 'Revisión Ejecutiva de Negocio (Prompt Activador del Lienzo ChatGPT Slides)'
    }
  },

  ja: {
    generator: {
      metaTitle: 'ChatGPT Slides プロンプト作成ツール（無料・登録不要・PPTX対応）',
      metaDesc:
        '2026年10月公開のChatGPT Slides専用プロンプト生成ツール。テーマ・対象読者・スライド枚数・図表・スピーカーノートを指定してPowerPointやGoogleスライドへ出力！',
      h1: 'ChatGPT Slides 専用プロンプト生成ツール（無料）',
      subtitle:
        'OpenAIのChatGPT Slides（2026年10月16日リリース）向けに最適化されたプレゼン構成プロンプトをワンクリック生成。PowerPoint (.pptx)・PDF・Googleスライド出力に完全対応。'
    },
    templates: {
      metaTitle: '47+ ChatGPT Slides プロンプトテンプレート集（営業・ピッチ・研究）',
      metaDesc:
        '営業提案書、スタートアップ資金調達ピッチデック、QBR、研究発表、授業スライドなど47種類以上のChatGPT Slides無料プロンプトテンプレート集。',
      h1: 'ChatGPT Slides プロンプトテンプレート集（全47種類）',
      subtitle:
        'ビジネス・学術・教育のあらゆる場面に対応する47種類のスライド構成テンプレート。枚数・トーン・図表提案を自由にカスタマイズできます。'
    },
    pitchDeck: {
      metaTitle: 'ChatGPT Slides ピッチデック（資金調達資料）プロンプト作成ツール',
      metaDesc:
        '投資家向けピッチデックをChatGPT Slidesで作成。課題・解決策・TAM/SAM/SOM市場規模・トラクション・財務計画の10枚構成をPowerPointへ出力！',
      h1: 'ChatGPT Slides ピッチデック（資金調達プレゼン）プロンプト作成ツール',
      subtitle:
        'VC・投資家が重視する10枚構成（課題・市場規模・優位性・ユニットエコノミクス）と発表原稿をワンクリックで生成します。',
      defaultTopic: '法人向けAI業務自動化SaaSプラットフォーム — シリーズA資金調達ピッチデック'
    },
    salesDeck: {
      metaTitle: 'ChatGPT Slides 営業資料（セールスデック）プロンプト作成ツール',
      metaDesc:
        '成約率を高めるB2B営業プレゼン用ChatGPT Slidesプロンプトを無料生成。顧客課題の定量化、ROI試算、導入事例、導入ロードマップを構造化！',
      h1: 'ChatGPT Slides B2B営業プレゼン資料プロンプト作成ツール',
      subtitle:
        '顧客の課題整理から導入効果（ROI）の定量比較、導入ステップまで、決裁者を動かす営業スライド構成を生成します。',
      defaultTopic: 'エンタープライズ業務部門向けAIワークフロー自動化基盤のご提案'
    },
    powerpoint: {
      metaTitle: 'ChatGPT SlidesをPowerPoint (.PPTX)・PDF・Googleスライドに出力する方法',
      metaDesc:
        'ChatGPT SlidesからPowerPoint (.pptx) へ書き出す際の文字溢れ・レイアウト崩れを防止！スピーカーノート付きの最適化プロンプトを生成します。',
      h1: 'ChatGPT Slides PowerPoint (.PPTX) 出力最適化プロンプト＆書き出しガイド',
      subtitle:
        'PowerPointやGoogleスライドへエクスポートした際の文字はみ出しを防ぎ、1スライド1メッセージの美しいレイアウトと発表原稿を出力します。',
      defaultTopic: 'PowerPoint (.pptx) 書き出しに最適化した全社DX推進戦略プレゼンテーション'
    },
    troubleshooting: {
      metaTitle: 'ChatGPT Slidesが表示されない・使えない時の5つの対処法と起動プロンプト',
      metaDesc:
        'ChatGPT Slidesのキャンバス画面が出ない原因と解決策を解説。モデル選択や管理設定の確認手順と、確実にスライド画面を起動する専用プロンプト！',
      h1: 'ChatGPT Slidesが表示されない？5つの解決策＆キャンバス起動プロンプト',
      subtitle:
        '2026年10月公開のChatGPT Slides画面やPPTX出力ボタンが表示されない場合のチェックリストと、スライドモードを確実に呼び出す指示文です。',
      defaultTopic: '四半期経営レビュー報告（ChatGPT Slidesキャンバス起動用プロンプト）'
    }
  }
};
