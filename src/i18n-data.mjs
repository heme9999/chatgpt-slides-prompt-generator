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
    navTroubleshooting: 'Troubleshooting Guide',
    savedLabel: 'Saved',
    // Hero Release Pill
    releasePill:
      'Compatible with ChatGPT Slides — Space Canvas (Create > Slide) & Work Workflows, PowerPoint (.pptx), PDF & Google Slides Export',
    // Form UI
    formLegend: '1. Configure Your ChatGPT Slides Presentation',
    noApiBadge: 'Free Prompt Builder · Client-Side Assembly · Instant Copy',
    topicLabel: 'Presentation Topic',
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
    audienceLabel: 'Target Audience',
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
    goalLabel: 'Presentation Goal',
    goalOptions: [
      { value: 'Persuade & Win Approval / Close Deal', label: 'Persuade & Win Approval / Close Deal' },
      { value: 'Secure Seed / Series A / Grant Funding', label: 'Secure Seed / Series A / Grant Funding' },
      { value: 'Align Stakeholders on Project Status & Risks', label: 'Align Stakeholders on Project Status & Risks' },
      { value: 'Educate & Train Audience on Core Concepts', label: 'Educate & Train Audience on Core Concepts' },
      { value: 'Present Empirical Research & Methodology', label: 'Present Empirical Research & Methodology' },
      { value: 'Deliver Quarterly Financial & KPI Review', label: 'Deliver Quarterly Financial & KPI Review' },
      { value: 'Launch New Product & Go-To-Market Plan', label: 'Launch New Product & Go-To-Market Plan' }
    ],
    slidesLabel: 'Slide Count',
    slidesSuffix: 'Slides',
    styleLabel: 'Presentation Style & Tone',
    stylePrefix: 'Style',
    styleLabels: {
      executive: { label: 'Executive & McKinsey-Style (Action Titles)', shortLabel: 'Executive' },
      keynote: { label: 'Apple Keynote Minimalist (High Impact)', shortLabel: 'Apple Minimal' },
      persuasive: { label: 'Persuasive & ROI-Driven (Sales / Pitch)', shortLabel: 'Persuasive Sales' },
      analytical: { label: 'Data-Driven & Analytical (Research / Finance)', shortLabel: 'Data-Driven' },
      educational: { label: 'Pedagogical & Structured (Teaching / Workshop)', shortLabel: 'Educational' },
      storytelling: { label: 'Narrative Arc & Visionary (Keynote / Launch)', shortLabel: 'Storytelling' }
    },
    langLabel: 'Output Language',
    sourceLabel: 'Data Source Context',
    sourceLabels: {
      prompt_only: { label: 'Prompt Only (Topic & Requirements)', desc: 'Synthesize based strictly on configured parameters' },
      file: { label: 'Attached File / PDF / Doc', desc: 'Instructs ChatGPT to extract metrics from files you attach in chat' },
      outline: { label: 'Pasted Outline / Raw Notes', desc: 'Instructs ChatGPT to structure slides around notes you paste in chat' },
      research: { label: 'Web Search / Deep Research', desc: 'Instructs ChatGPT to run web search for fresh benchmarks with citations' }
    },
    optionsLabel: 'Slide Requirements',
    optExec: 'Executive Summary Slide',
    optCharts: 'Suggest Appropriate Charts',
    optCitations: 'Flag Claims for Verification',
    optNotes: 'Add Speaker Notes',
    outputTitle: '2. Ready-to-Copy ChatGPT Slides Prompt',
    outputEditNotice:
      'You can edit directly before copying or downloading. Modifying form controls or loading saved prompts will re-generate and overwrite this text. The storyboard outline reflects form parameters and does not synchronize with manual edits.',
    copyBtn: 'Copy Prompt',
    openBtn: 'Open ChatGPT ↗',
    switchStyleBtn: 'Switch Style',
    downloadBtn: 'Download .TXT',
    saveLocalBtn: 'Save Locally',
    saveParamsNotice:
      '💡 Saved items store configured form parameters and re-generate the outline upon loading; manual text edits are not preserved.',
    promptLanguageNotice:
      'Prompts use structured English directives to maximize ChatGPT instruction following, specifying your chosen language for all slide content.',
    deliveryNotice:
      '1. Click "Copy Prompt" → 2. Click "Open ChatGPT" → 3. In ChatGPT Work or Space (Create > Slide), paste your prompt.',
    fallbackLinkPrefix: 'Direct link: ',
    ariaWorkspace: 'ChatGPT Slides Prompt Generator Workspace',
    ariaNav: 'Primary Navigation',
    ariaLangSwitcher: 'Language Switcher',
    ariaSavedDrawer: 'Saved Prompts Library',
    ariaOutput: 'Generated ChatGPT Slides Prompt',
    ariaCategoryFilter: 'Filter templates by category',
    messages: {
      topicUpdated: 'Prompt updated for your topic',
      sampleLoaded: 'Loaded sample topic',
      downloadDone: 'Downloaded prompt as .TXT',
      styleSwitched: 'Switched style to: ',
      savedSuccess: 'Saved configured parameters to browser library (re-generates from parameters upon loading)',
      loadedSuccess: 'Loaded saved prompt into editor',
      topicValidation: 'Please enter a presentation topic or pick a sample chip above.',
      topicErrorTip: 'Tip: Enter a presentation topic (or click a sample chip) for a tailored prompt.',
      copySuccessToast: '✓ Prompt copied to clipboard! Paste into ChatGPT.',
      copyManualFallbackToast: 'Clipboard access was blocked. Please select and copy the prompt text manually below.',
      legacySavedWarning: 'Legacy saved prompt: missing template metadata.',
      usedByYou: 'Used {n}× by you'
    },
    proTipLabel: 'Pro Tip:',
    defaultProTip:
      'After clicking "Copy Prompt" and opening ChatGPT, attach any source PDF/Excel file in chat so ChatGPT Slides populates real numbers and speaker notes.',
    storyboardTitle: 'Live Slide-by-Slide Structure Preview',
    storyboardExportNote: 'Exports to .PPTX · PDF · Google Slides',
    // Saved Drawer
    drawerTitle: '🔖 Saved Prompts Library',
    drawerClose: 'Close ✕',
    drawerHint: 'Drag right to dismiss · Stored strictly in your browser (localStorage); clear your browser data or delete items individually at any time.',
    drawerEmpty:
      'No saved prompts yet. Click "Save Locally" on any generator to store your favorite prompt configurations in your browser (no login required).',
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
      'Generate a structured, collaborative presentation for ChatGPT Slides and export to PowerPoint, PDF, or Google Slides in four steps:',
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
        desc: 'Toggle automatic chart recommendations, speaker pacing scripts, and verification flags so ChatGPT marks unverified claims with [VERIFY].'
      },
      {
        title: 'Copy to ChatGPT & Export',
        desc: 'Click Copy Prompt, open ChatGPT via the direct link, paste into Work chat or Space (Create > Slide), and export to .pptx, PDF, or Google Slides.'
      }
    ],
    featTitle: 'Key Features of Our ChatGPT Slides Prompt Builder',
    featDesc:
      'Designed to help users craft precise presentation prompts for OpenAI’s ChatGPT Slides canvas workflow, adhering to presentation consulting best practices.',
    features: [
      {
        title: '🎯 One Clear Message Per Slide',
        desc: 'Prevents ChatGPT from dumping walls of text onto slides. Enforces crisp action titles and scannable visual hierarchy.'
      },
      {
        title: '📊 Smart Chart & Diagram Prompts',
        desc: 'Instructs ChatGPT Slides to recommend appropriate visualizations like waterfall bridges, 2x2 matrices, and market share charts.'
      },
      {
        title: '🎙️ Presenter View Speaker Notes',
        desc: 'Generates spoken transitions, pacing cues, and objection-handling notes that carry over when exported to PowerPoint or Google Slides.'
      },
      {
        title: '🛡️ Hallucination & Citation Guardrails',
        desc: 'Requires ChatGPT to flag uncertain statistics with [VERIFY] and cite uploaded documents or web research sources.'
      },
      {
        title: '🔒 Pure Client-Side Generation & Privacy Boundary',
        desc: 'Prompt composition and local saved items run entirely inside your browser (stored in browser localStorage). We do not operate user databases or collect personal data. Prompts pasted into ChatGPT are processed by OpenAI subject to OpenAI’s privacy policies.'
      },
      {
        title: '📤 PowerPoint, PDF & Google Slides Ready',
        desc: 'Optimized for OpenAI’s native export pipeline (OpenAI Help Article 20001605).'
      }
    ],
    compTitle: 'Why Structured Prompts Outperform Generic Slide Requests',
    compDesc:
      'Asking ChatGPT "Make me a 10-slide presentation about X" produces generic bullet lists. Compare how structured prompt architecture improves output quality:',
    compHeaders: ['Dimension', 'Generic Prompt ("Make slides about X")', 'SlidePrompt.ai Structured Blueprint'],
    compRows: [
      ['Slide Headlines', 'Vague topic labels ("Market Overview", "Financials")', 'Insight-led action titles ("Enterprise Automation Cuts OpEx by 38% Within 60 Days")'],
      ['Visual Density', 'Overcrowded paragraphs that overflow .pptx boxes', 'Strict "One clear message per slide" + concise proof points'],
      ['Data & Charts', 'Plain text numbers buried in sentences', 'Explicit chart specs (Waterfall, 2x2 Matrix, Cohort Bar) with axis labels'],
      ['Fact Accuracy', 'Blends guesses with real facts without notice', 'Flags any claim requiring verification with [VERIFY] & source attribution'],
      ['Export Readiness', 'Missing speaker notes; requires manual rewriting', 'Complete Presenter View speaker notes ready for PowerPoint & Google Slides']
    ],
    faqTitle: 'Frequently Asked Questions',
    // Footer
    footerDesc:
      'Free client-side prompt engineering studio for OpenAI’s ChatGPT Slides. Independent prompt generator tool; no login required.',
    footerCol1: 'Core Tools & Guides',
    footerCol2: 'Popular Business Prompts',
    footerCol3: 'Academic, Tech & Niche',
    footerCopy: 'Independent prompt builder; not affiliated with OpenAI. Presentation creation in ChatGPT Slides is available for eligible accounts with Space access (Pro, Business, Enterprise) subject to OpenAI rollout.',
    footerRefLabel: 'Official Documentation:'
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
    navTroubleshooting: '疑難排解指南',
    savedLabel: '已儲存',
    // Hero Release Pill
    releasePill:
      '適用於 ChatGPT Slides — Space 畫布 (Create > Slide) 與 Work 協作流程，支援 PowerPoint (.pptx)、PDF 與 Google 簡報匯出',
    // Form UI
    formLegend: '1. 設定您的 ChatGPT Slides 簡報參數',
    noApiBadge: '免費提示詞工具 · 純前端運算 · 即時複製',
    topicLabel: '演示主題',
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
    audienceLabel: '目標受眾',
    audienceOptions: [
      { value: 'C-Suite & Executive Board (CEO, CFO, VP)', label: '高管與董事會決策層 (CEO, CFO, VP)' },
      { value: 'Enterprise Buyers & Decision Makers', label: '企業採購與業務決策者' },
      { value: 'Venture Capitalists & Angel Investors', label: '創投機構與天使投資人 (VC / Angels)' },
      { value: 'Cross-Functional Product & Engineering Team', label: '跨部門產品與工程研發團隊' },
      { value: 'Academic Peers & Research Committee', label: '學術同儕與研究評審委員會' },
      { value: 'Students & Workshop Participants', label: '學生與工作坊學員' },
      { value: 'Clients & Agency Stakeholders', label: '外部客戶與專案利害關係人' },
      { value: 'General Conference Audience', label: '大型研討會與公開演講聽眾' }
    ],
    goalLabel: '演示目的',
    goalOptions: [
      { value: 'Persuade & Win Approval / Close Deal', label: '說服決策並贏得批准 / 促成成交' },
      { value: 'Secure Seed / Series A / Grant Funding', label: '爭取種子輪 / A 輪融資或計畫補助' },
      { value: 'Align Stakeholders on Project Status & Risks', label: '對齊專案進度、里程碑與風險控管' },
      { value: 'Educate & Train Audience on Core Concepts', label: '教學培訓並協助受眾掌握核心概念' },
      { value: 'Present Empirical Research & Methodology', label: '發表實證研究方法與數據分析結論' },
      { value: 'Deliver Quarterly Financial & KPI Review', label: '匯報季度財務表現與核心 KPI 達成率' },
      { value: 'Launch New Product & Go-To-Market Plan', label: '發布新產品與市場進入策略 (GTM)' }
    ],
    slidesLabel: '簡報頁數',
    slidesSuffix: '頁簡報',
    styleLabel: '簡報風格與語氣',
    stylePrefix: '風格',
    styleLabels: {
      executive: { label: '高管決策與麥肯錫顧問風（結論先行標題）', shortLabel: '高管決策風' },
      keynote: { label: 'Apple 發表會極簡高視覺衝擊風', shortLabel: 'Apple 極簡' },
      persuasive: { label: '高轉化商業說服與 ROI 導向（銷售/募資）', shortLabel: '商業說服風' },
      analytical: { label: '數據驅動與嚴謹實證分析風（研究/財報）', shortLabel: '數據分析風' },
      educational: { label: '循序漸進教學與互動引導風（課程/培訓）', shortLabel: '教學培訓風' },
      storytelling: { label: '故事敘事與願景感召風（主題演講/發布會）', shortLabel: '故事敘事風' }
    },
    langLabel: '輸出語言',
    sourceLabel: '資料來源',
    sourceLabels: {
      prompt_only: { label: '僅依提示詞（主題與要求）', desc: '完全根據上方設定的主題、受眾與結構要求生成簡報' },
      file: { label: '附加檔案 / PDF / 報表', desc: '指示 ChatGPT 依據您在對話中上傳的檔案提煉數據（不臆測未提供數字）' },
      outline: { label: '自訂大綱 / 原始筆記', desc: '指示 ChatGPT 根據您在對話中貼上的條列式筆記展開為完整簡報' },
      research: { label: '聯網搜尋 / 深度檢索', desc: '指示 ChatGPT 透過聯網檢索最新產業數據並加註引用來源' }
    },
    optionsLabel: '進階簡報要求',
    optExec: '包含執行摘要頁',
    optCharts: '建議合適的圖表',
    optCitations: '標註需查核的數據與來源',
    optNotes: '加入演講者備註',
    outputTitle: '2. 可直接複製到 ChatGPT 的完整提示詞',
    outputEditNotice:
      '可手動編輯後複製或下載；調整表單或載入收藏會重新生成並覆蓋文本。大綱預覽反映表單生成結果，不隨手動編輯同步。',
    copyBtn: '複製提示詞',
    openBtn: '打開 ChatGPT ↗',
    switchStyleBtn: '換一種風格',
    downloadBtn: '下載 .TXT',
    saveLocalBtn: '保存到本地',
    saveParamsNotice:
      '💡 收藏以保存表單參數為準，載入時依參數重新生成大綱，不保留手動編輯文本。',
    promptLanguageNotice:
      '為確保 ChatGPT 精確遵從指令，提示詞架構採用結構化英文指令，並明確指定以您選定的語言輸出所有簡報內文與講者備忘。',
    deliveryNotice:
      '1. 點擊「複製提示詞」 → 2. 點擊「打開 ChatGPT」 → 3. 在 ChatGPT 的 Work 對話或 Space（點擊 Create > Slide）貼上提示詞。',
    fallbackLinkPrefix: '直接訪問連結：',
    ariaWorkspace: 'ChatGPT Slides 簡報提示詞產生器工作區',
    ariaNav: '主導航欄',
    ariaLangSwitcher: '語言切換器',
    ariaSavedDrawer: '已儲存的提示詞庫',
    ariaOutput: '產生的 ChatGPT Slides 簡報提示詞',
    ariaCategoryFilter: '依分類篩選簡報模板',
    messages: {
      topicUpdated: '已依據您的簡報主題更新提示詞',
      sampleLoaded: '已載入範例主題',
      downloadDone: '已下載 .TXT 提示詞檔案',
      styleSwitched: '已切換簡報風格為：',
      savedSuccess: '已將表單參數儲存至本地庫（載入時將依參數重新生成）',
      loadedSuccess: '已將收藏提示詞載入編輯器',
      topicValidation: '請輸入簡報主題或點選上方熱門範例。',
      topicErrorTip: '提示：輸入主題或點選範例標籤以產生專屬提示詞。',
      copySuccessToast: '✓ 提示詞已複製到剪貼簿！請前往 ChatGPT 貼上。',
      copyManualFallbackToast: '剪貼簿存取受限，請直接手動選取並複製下方已醒目提示的提示詞文字。',
      legacySavedWarning: '舊版收藏缺少模板資訊，無法跨模板載入。',
      usedByYou: '您已使用 {n} 次'
    },
    proTipLabel: '專家提示：',
    defaultProTip:
      '點擊「複製提示詞」並打開 ChatGPT 後，可在對話框一併上傳 PDF 或 Excel 檔案，讓 ChatGPT Slides 自動帶入真實數據與講者備忘稿。',
    storyboardTitle: '即時簡報大綱結構預覽',
    storyboardExportNote: '支援匯出 .PPTX · PDF · Google 簡報',
    // Saved Drawer
    drawerTitle: '🔖 已儲存的提示詞庫',
    drawerClose: '關閉 ✕',
    drawerHint: '向右滑動即可關閉 · 資料僅儲存於當前瀏覽器 (localStorage)，非帳號雲端同步；可隨時逐筆刪除或清除瀏覽紀錄。',
    drawerEmpty: '目前尚無儲存的提示詞。點擊產生器上的「保存到本地」即可將常用簡報配置收藏於瀏覽器（免登入）。',
    drawerLoad: '載入到編輯器',
    drawerDelete: '刪除',
    // Below-Fold Directory
    dirTitle: '47 個 ChatGPT Slides 專屬場景簡報提示詞模板',
    dirDesc: '選擇符合您角色與場景的簡報藍圖。每個模板皆預載分頁結構、圖表建議與講者備忘稿規則。',
    dirBtn: '查看全部 47 個模板 →',
    blueprintSuffix: ' 頁簡報藍圖 →',
    // Below-Fold SEO Sections
    howTitlePrefix: '如何使用',
    howDesc: '按照以下 4 個步驟，在 ChatGPT Slides 生成結構化簡報，並匯出為 PowerPoint、PDF 或 Google 簡報：',
    howSteps: [
      {
        title: '輸入簡報主題與目標受眾',
        desc: '填寫您的演示主題、核心決策受眾（高管董事會、創投、企業客戶或學生）以及本次簡報的核心目標。'
      },
      {
        title: '選擇頁數與敘事風格',
        desc: '拖動滑桿設定 5 至 20 頁簡報篇幅，並選擇麥肯錫結論先行、Apple 極簡發表會或數據分析等風格。'
      },
      {
        title: '勾選圖表建議與講者備註',
        desc: '開啟自動圖表配置建議、逐字口播講稿以及 [VERIFY] 事實查核標記，避免 AI 編造未經證實的數據。'
      },
      {
        title: '複製至 ChatGPT 並匯出',
        desc: '點擊「複製提示詞」，透過普通連結前往 ChatGPT，在 Work 對話或 Space (Create > Slide) 貼上提示詞，微調後匯出。'
      }
    ],
    featTitle: 'ChatGPT Slides 簡報提示詞產生器核心特點',
    featDesc: '專為 OpenAI 的 ChatGPT Slides 畫布工作流設計，協助使用者產出符合商務顧問規範的高品質指令。',
    features: [
      {
        title: '🎯 每頁聚焦單一核心結論',
        desc: '防止 ChatGPT 生成冗長文字堆砌。引導使用結論先行標題與精煉論據。'
      },
      {
        title: '📊 圖表與視覺化配置建議',
        desc: '指示 ChatGPT Slides 在數據頁推薦瀑布圖、2x2 競爭矩陣、市場規模圖與趨勢圖。'
      },
      {
        title: '🎙️ 演講者備忘稿 (Speaker Notes)',
        desc: '為每一頁生成口播講稿與問答重點，匯出至 PowerPoint 後可直接於演講者檢視使用。'
      },
      {
        title: '🛡️ 數據來源與查核標記',
        desc: '提示詞包含查核要求，指示 ChatGPT 將待確認的統計數據標記為 [VERIFY] 並註明引用來源。'
      },
      {
        title: '🔒 純前端運算與清晰隱私邊界',
        desc: '提示詞組裝與本地收藏完全在您的瀏覽器端運行（儲存於瀏覽器 localStorage，可隨時刪除）。本站不設會員資料庫亦不收集個人資訊。貼入 ChatGPT 後的內容依 OpenAI 隱私權政策與帳號設定處理。'
      },
      {
        title: '📤 支援 PowerPoint、PDF 與 Google 簡報匯出',
        desc: '針對 OpenAI 官方簡報匯出格式最佳化（參考 OpenAI 官方說明文件 20001605）。'
      }
    ],
    compTitle: '為什麼結構化提示詞勝於隨意提問？',
    compDesc: '如果只對 ChatGPT 輸入簡短要求，往往會得到籠統清單。對比結構化指令帶來的差異：',
    compHeaders: ['比較維度', '普通指令（「幫我做關於 X 的簡報」）', 'SlidePrompt.ai 結構化簡報指令'],
    compRows: [
      ['投影片標題', '模糊的主題標籤（「市場概況」、「財務分析」）', '結論先行觀點標題（「導入企業 AI 自動化可在 60 天內降低 38% 營運成本」）'],
      ['版面文字密度', '文字長句過多，匯出時排版容易溢位', '嚴格執行「每頁一核心訊息」與條理佐證，結構清晰'],
      ['數據與圖表', '將數字埋在長篇段落文字中', '明確指定圖表類型（瀑布圖、2x2 矩陣、長條圖）與座標軸說明'],
      ['事實準確度', '可能混雜未經查證的估計數值', '要求將需人工核實的數據標註 [VERIFY] 並提示引用來源'],
      ['匯出可用性', '缺少講者備忘稿，下載後需花時間重新整理', '包含演講者口播稿，匯出 PowerPoint 與 Google 簡報即可配合講稿使用']
    ],
    faqTitle: '常見問題解答 (FAQ)',
    // Footer
    footerDesc:
      '專為 OpenAI ChatGPT Slides 設計的免費前端提示詞工具。獨立工具，免登入，一鍵產生專業簡報架構指令。',
    footerCol1: '核心工具與指南',
    footerCol2: '熱門商務簡報模板',
    footerCol3: '學術、教育與垂直領域',
    footerCopy: '獨立開發之提示詞產生工具，與 OpenAI 無隸屬關係。ChatGPT Slides 簡報功能目前向具備 Space 權限之 Pro、Business、Enterprise 方案帳號逐步開放。',
    footerRefLabel: '官方文件參考：'
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
    navTroubleshooting: 'Guía de Solución',
    savedLabel: 'Guardados',
    // Hero Release Pill
    releasePill:
      'Compatible con ChatGPT Slides — Lienzo Space (Create > Slide) y Flujos de Work, Exportación a PowerPoint (.pptx), PDF y Google Slides',
    // Form UI
    formLegend: '1. Configura tu Presentación de ChatGPT Slides',
    noApiBadge: 'Herramienta Gratuita · Procesamiento Local · Copia Rápida',
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
      prompt_only: { label: 'Solo prompt (Tema y requisitos)', desc: 'Sintetizar estrictamente a partir de los parámetros configurados' },
      file: { label: 'Archivo adjunto / PDF / Doc', desc: 'Indica a ChatGPT extraer datos de los archivos adjuntos en el chat' },
      outline: { label: 'Esquema pegado / Notas', desc: 'Indica a ChatGPT estructurar diapositivas a partir de las notas pegadas' },
      research: { label: 'Búsqueda web / Investigación', desc: 'Indica a ChatGPT buscar datos actuales y citar fuentes' }
    },
    optionsLabel: 'Requisitos de las Diapositivas',
    optExec: 'Diapositiva de Resumen Ejecutivo',
    optCharts: 'Sugerir Gráficos Adecuados',
    optCitations: 'Marcar Datos por Verificar ([VERIFY])',
    optNotes: 'Añadir Notas del Orador',
    outputTitle: '2. Prompt Listo para Copiar en ChatGPT',
    outputEditNotice:
      'Puede editar directamente antes de copiar o descargar. Al modificar controles o cargar guardados se regenerará y sobrescribirá el texto. El guión gráfico refleja los parámetros del formulario y no se sincroniza con ediciones manuales.',
    copyBtn: 'Copiar Prompt',
    openBtn: 'Abrir ChatGPT ↗',
    switchStyleBtn: 'Cambiar Estilo',
    downloadBtn: 'Descargar .TXT',
    saveLocalBtn: 'Guardar Localmente',
    saveParamsNotice:
      '💡 Los guardados almacenan los parámetros configurados y regeneran el esquema al cargarse; no se conservan ediciones manuales de texto.',
    promptLanguageNotice:
      'Las directivas del prompt están estructuradas en inglés para maximizar la precisión de ChatGPT, indicando el idioma seleccionado para el contenido.',
    deliveryNotice:
      '1. Haz clic en "Copiar Prompt" → 2. Haz clic en "Abrir ChatGPT" → 3. En Work o Space de ChatGPT (Create > Slide), pega el prompt.',
    fallbackLinkPrefix: 'Enlace directo: ',
    ariaWorkspace: 'Espacio de trabajo del generador de prompts para ChatGPT Slides',
    ariaNav: 'Navegación principal',
    ariaLangSwitcher: 'Selector de idioma',
    ariaSavedDrawer: 'Biblioteca de prompts guardados',
    ariaOutput: 'Prompt generado para ChatGPT Slides',
    ariaCategoryFilter: 'Filtrar plantillas por categoría',
    messages: {
      topicUpdated: 'Prompt actualizado con tu tema',
      sampleLoaded: 'Tema de ejemplo cargado en el editor',
      downloadDone: 'Prompt descargado en formato .TXT',
      styleSwitched: 'Estilo cambiado a: ',
      savedSuccess: 'Parámetros guardados en la biblioteca (se regenerará a partir de parámetros al cargar)',
      loadedSuccess: 'Prompt cargado en el editor',
      topicValidation: 'Por favor ingresa un tema de presentación o selecciona un ejemplo.',
      topicErrorTip: 'Consejo: Ingresa un tema (o haz clic en un ejemplo) para un prompt a medida.',
      copySuccessToast: '✓ ¡Prompt copiado al portapapeles! Pégalo en ChatGPT.',
      copyManualFallbackToast: 'Acceso al portapapeles bloqueado. Selecciona y copia manualmente el texto a continuación.',
      legacySavedWarning: 'Prompt antiguo guardado: faltan metadatos de plantilla.',
      usedByYou: 'Usado {n}× por ti'
    },
    proTipLabel: 'Consejo Pro:',
    defaultProTip:
      'Tras hacer clic en "Copiar Prompt" y abrir ChatGPT, adjunta tu archivo PDF o Excel en el chat para que ChatGPT Slides utilice cifras reales y notas.',
    storyboardTitle: 'Vista Previa de la Estructura de Diapositivas',
    storyboardExportNote: 'Exportable a .PPTX · PDF · Google Slides',
    // Saved Drawer
    drawerTitle: '🔖 Biblioteca de Prompts Guardados',
    drawerClose: 'Cerrar ✕',
    drawerHint: 'Arrastra a la derecha para cerrar · Guardado únicamente en tu navegador (localStorage), no sincronizado en la nube; puedes eliminar elementos en cualquier momento.',
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
      'Genera una presentación para ChatGPT Slides y expórtala a PowerPoint, PDF o Google Slides en 4 pasos:',
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
        desc: 'Haz clic en Copiar Prompt, abre ChatGPT mediante el enlace directo, pega en el chat de Work o en Space (Create > Slide) y descarga.'
      }
    ],
    featTitle: 'Características Clave de Nuestro Generador para ChatGPT Slides',
    featDesc:
      'Diseñado para crear prompts precisos adaptados al flujo de trabajo de ChatGPT Slides y a buenas prácticas de presentación ejecutiva.',
    features: [
      {
        title: '🎯 Un Mensaje Claro por Diapositiva',
        desc: 'Evita diapositivas saturadas de texto con titulares claros y puntos concisos.'
      },
      {
        title: '📊 Recomendación de Gráficos',
        desc: 'Indica a ChatGPT Slides qué gráficos sugerir (waterfall, matrices 2x2, gráficos de barras o comparativos).'
      },
      {
        title: '🎙️ Notas del Orador para Presentación',
        desc: 'Genera transiciones habladas y notas que se conservan al exportar a PowerPoint y Google Slides.'
      },
      {
        title: '🛡️ Control de Afirmaciones y Citas',
        desc: 'Pide marcar datos no verificados con [VERIFY] y citar documentos adjuntos o búsquedas realizadas.'
      },
      {
        title: '🔒 Generación en el Navegador y Límites de Privacidad',
        desc: 'La composición de prompts y las plantillas guardadas se ejecutan íntegramente en tu navegador (almacenadas en localStorage local). No gestionamos bases de datos de usuarios ni recopilamos datos personales. Al pegar el prompt en ChatGPT, la información se procesa según las políticas de privacidad de OpenAI.'
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
      ['Densidad Visual', 'Párrafos largos propensos a desbordarse al exportar', 'Regla de "Un mensaje por diapositiva" con puntos de apoyo concisos'],
      ['Datos y Gráficos', 'Cifras dispersas en párrafos de texto', 'Especificación de gráfico y ejes en diapositivas con datos cuantitativos'],
      ['Precisión', 'Mezcla estimaciones no señaladas con datos', 'Marca datos pendientes de confirmar con [VERIFY] y pide citar fuentes'],
      ['Exportación', 'Sin notas del orador; requiere redacción manual', 'Notas del orador completas listas para PowerPoint y Google Slides']
    ],
    faqTitle: 'Preguntas Frecuentes (FAQ)',
    // Footer
    footerDesc:
      'Generador gratuito de prompts para ChatGPT Slides de OpenAI. Herramienta independiente; sin registro obligatorio.',
    footerCol1: 'Herramientas y Guías',
    footerCol2: 'Prompts de Negocios',
    footerCol3: 'Educación, Ciencia y Nichos',
    footerCopy: 'Herramienta independiente; no afiliada con OpenAI. La creación de presentaciones en ChatGPT Slides está disponible para cuentas elegibles con acceso a Space (Pro, Business, Enterprise) de forma progresiva.',
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
    navTroubleshooting: 'トラブルシューティング',
    savedLabel: '保存済み',
    // Hero Release Pill
    releasePill:
      'ChatGPT Slides 対応 — Space キャンバス (Create > Slide) および Work ワークフロー、PowerPoint (.pptx) / PDF / Googleスライド出力向けプロンプト作成',
    // Form UI
    formLegend: '1. プレゼンテーション条件を入力',
    noApiBadge: '無料プロンプトツール · ブラウザ内生成 · 即座にコピー',
    topicLabel: 'プレゼンのテーマ',
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
    audienceLabel: '対象オーディエンス',
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
      prompt_only: { label: 'プロンプトのみ（トピックと要件）', desc: '指定されたテーマ・対象読者・要件に基づいてスライドを構成' },
      file: { label: '添付ファイル / PDF / 資料', desc: 'チャットに添付するファイルからデータや構成を抽出するよう指示' },
      outline: { label: '貼り付けた構成案 / メモ', desc: 'チャットに貼り付ける箇条書きメモを完全なスライドに展開するよう指示' },
      research: { label: 'ウェブ検索 / 調査', desc: '最新の市場データや裏付けを検索して引用元を明記するよう指示' }
    },
    optionsLabel: '追加オプション（図表・出典・ノート）',
    optExec: 'エグゼクティブサマリーを含める',
    optCharts: '適切なグラフ・図表を提案',
    optCitations: '要検証の数値に [VERIFY] と出典を明記',
    optNotes: 'スピーカーノート（発表原稿）を追加',
    outputTitle: '2. 生成された ChatGPT 向けプロンプト',
    outputEditNotice:
      'コピーまたはダウンロードする前に直接編集できます。フォーム設定の変更や保存項目の読み込みにより再生成され上書きされます。ストーリーボードは大綱設定を反映し、手動編集とは同期しません。',
    copyBtn: 'プロンプトをコピー',
    openBtn: 'ChatGPTを開く ↗',
    switchStyleBtn: 'スタイル切替',
    downloadBtn: 'TXT保存',
    saveLocalBtn: 'ブラウザに保存',
    saveParamsNotice:
      '💡 保存機能はフォーム設定パラメータを保持し、読み込み時に再生成します。手動編集テキストは保存されません。',
    promptLanguageNotice:
      'ChatGPTの指示遵守精度を最大化するためプロンプト構成は英語で記述され、スライド本文と発表者ノートは指定した言語で出力されます。',
    deliveryNotice:
      '1. 「プロンプトをコピー」をクリック → 2. 「ChatGPTを開く」をクリック → 3. ChatGPTのWorkまたはSpace（Create > Slide）に貼り付け。',
    fallbackLinkPrefix: '直接リンク：',
    ariaWorkspace: 'ChatGPT Slides プロンプト作成ワークスペース',
    ariaNav: 'メインナビゲーション',
    ariaLangSwitcher: '言語切替',
    ariaSavedDrawer: '保存済みプロンプト一覧',
    ariaOutput: '生成された ChatGPT Slides プロンプト',
    ariaCategoryFilter: 'カテゴリーでテンプレートを絞り込む',
    messages: {
      topicUpdated: 'トピックに合わせてプロンプトを更新しました',
      sampleLoaded: 'サンプルテーマを読み込みました',
      downloadDone: 'プロンプトをTXTとして保存しました',
      styleSwitched: 'スタイルを切り替えました: ',
      savedSuccess: 'フォーム設定をブラウザに保存しました（読み込み時にパラメータから再生成されます）',
      loadedSuccess: '保存したプロンプトを読み込みました',
      topicValidation: 'プレゼンのテーマを入力するか、上のサンプルを選択してください。',
      topicErrorTip: 'ヒント：テーマを入力（またはサンプルを選択）すると最適なプロンプトが作成されます。',
      copySuccessToast: '✓ プロンプトをコピーしました！ChatGPTに貼り付けてください。',
      copyManualFallbackToast: 'クリップボードへのアクセスが制限されました。下の選択されたテキストを手動でコピーしてください。',
      legacySavedWarning: '旧バージョンの保存データです（テンプレート情報が不足しています）。',
      usedByYou: '使用回数: {n}回'
    },
    proTipLabel: '活用ヒント：',
    defaultProTip:
      '「プロンプトをコピー」してChatGPTを開いた後、チャットにPDFやExcel資料を添付すると、実際の数値を反映したスライドと発表原稿が生成されます。',
    storyboardTitle: 'スライド構成リアルタイムプレビュー',
    storyboardExportNote: '.PPTX · PDF · Googleスライド出力対応',
    // Saved Drawer
    drawerTitle: '🔖 保存済みプロンプト一覧',
    drawerClose: '閉じる ✕',
    drawerHint: '右へドラッグして閉じる · ブラウザ内 (localStorage) にのみ保存されアカウント同期ではありません。いつでも個別に削除できます。',
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
      'ChatGPT SlidesでPowerPoint・PDF・Googleスライドに出力できるプレゼンプロンプトを4ステップで作成します：',
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
        title: 'ChatGPTに貼り付けて出力',
        desc: '「プロンプトをコピー」を押し、直接リンクからChatGPTを開いてWorkチャットまたはSpace（Create > Slide）に貼り付けます。'
      }
    ],
    featTitle: 'ChatGPT Slides プロンプト作成ツールの特徴',
    featDesc:
      'ChatGPT Slidesキャンバス機能に最適化された構成ルールに基づき、プレゼン資料作成の指示文を整理します。',
    features: [
      {
        title: '🎯 1スライド・1メッセージの原則',
        desc: '文字だらけのスライドを防止。結論を言い切るアクションタイトルと要点に整理します。'
      },
      {
        title: '📊 最適なグラフ・図解の自動指定',
        desc: 'ウォーターフォール図、2x2マトリクス、市場規模など、データに合った図表を指示します。'
      },
      {
        title: '🎙️ 発表者ビュー対応スピーカーノート',
        desc: 'PowerPointやGoogleスライドに書き出した際もそのまま使える、トークスクリプトと想定問答を生成します。'
      },
      {
        title: '🛡️ 出典明記と検証フラグ',
        desc: '不確実な数値には [VERIFY] タグを付けさせ、添付資料やWeb検索の根拠明記を義務付けます。'
      },
      {
        title: '🔒 ブラウザ内処理とプライバシーの明確化',
        desc: 'プロンプトの組み立てや保存機能はお使いのブラウザ内（localStorage）で完結します。当サイトはユーザー登録や個人情報の収集を行いません。ChatGPTにプロンプトを貼り付けた後は、OpenAIの利用規約およびプライバシーポリシーに基づいて処理されます。'
      },
      {
        title: '📤 PowerPoint・PDF・Googleスライド対応',
        desc: 'OpenAI公式のスライド書き出し仕様（ヘルプ記事 20001605）を前提に設計されています。'
      }
    ],
    compTitle: 'なぜ「構造化プロンプト」でスライドの質が変わるのか？',
    compDesc:
      '単に「〇〇について10枚のスライドを作って」と頼むのと、構造化プロンプトを使う場合の違いを比較してください：',
    compHeaders: ['比較項目', '通常の指示（「〇〇のスライドを作って」）', 'SlidePrompt.ai 構造化プロンプト'],
    compRows: [
      ['スライド見出し', '抽象的なラベル（「市場概要」「財務計画」など）', '結論ファーストの見出し（「AI自動化により60日以内に運用コストを38%削減」）'],
      ['文字量とレイアウト', '長文の箇条書きが並び、PPTX書き出し時に枠から溢れやすい', '「1スライド1メッセージ」＋簡潔な根拠で視覚的バランスを保持'],
      ['データと図表', '数値が文章の中に埋もれて伝わりにくい', 'グラフ種類（滝グラフ・2x2マトリクス等）と軸ラベルを明示'],
      ['ファクトチェック', '架空の数値と事実の区別がつかない場合がある', '要確認データに [VERIFY] を付与し、参照元の明記を指示'],
      ['発表準備の手間', 'ノートが空欄で手直しが必要', 'そのまま読めるスピーカーノート付きでプレゼン準備時間を短縮']
    ],
    faqTitle: 'よくある質問 (FAQ)',
    // Footer
    footerDesc:
      'OpenAIのChatGPT Slides向けプロンプト作成ツール。ログイン不要でPowerPointやGoogleスライド用構成プロンプトを作成。',
    footerCol1: '主要ツール＆ガイド',
    footerCol2: 'ビジネス定番プロンプト',
    footerCol3: '研究・教育・専門分野',
    footerCopy: '当サイトは独立したプロンプト作成ツールであり、OpenAIとは提携していません。ChatGPT Slidesのプレゼン作成機能はSpaceアクセス権を持つ対象プラン（Pro、Business、Enterprise）に順次展開されています。',
    footerRefLabel: '公式ドキュメント：'
  }
};

// Localized Page Metadata & Content for the 6 Top-Navigation Hub Pages in ES, JA, and zh-TW
export const LOCALIZED_HUB_PAGES = {
  'zh-TW': {
    generator: {
      metaTitle: 'ChatGPT Slides 提示詞產生器 - 免費簡報指令模板工具 (支援 PPTX)',
      metaDesc:
        '專為 ChatGPT Slides 打造的免費簡報提示詞產生器。自訂簡報主題、受眾、頁數、圖表建議與講者備忘稿，支援匯出 PowerPoint、PDF 與 Google 簡報！',
      h1: 'ChatGPT Slides 簡報提示詞產生器',
      subtitle:
        '專為 OpenAI 的 ChatGPT Slides 協作簡報功能設計。無需 API Key、免註冊，輸入主題與受眾即可生成結構化簡報指令，適配 PowerPoint (.pptx)、PDF 與 Google Slides 匯出。'
    },
    templates: {
      metaTitle: '47+ ChatGPT Slides 簡報提示詞模板庫（銷售、募資、研究報告）',
      metaDesc:
        '免費瀏覽 47+ 個 ChatGPT Slides 簡報提示詞模板，涵蓋商業銷售、新創 Pitch Deck、季度檢討 QBR、學術研究與教學課件，一鍵複製即可生成 PPTX！',
      h1: 'ChatGPT Slides 簡報提示詞模板庫（47+ 專業場景藍圖）',
      subtitle:
        '精選 47 個實用的 ChatGPT Slides 簡報結構藍圖。點擊任一模板即可自訂頁數、風格、圖表建議與演講者備忘稿。'
    },
    pitchDeck: {
      metaTitle: 'ChatGPT Slides 募資簡報 (Pitch Deck) 提示詞產生器 | 免費模板',
      metaDesc:
        '專為新創種子輪與 A 輪打造的 ChatGPT Slides 募資簡報提示詞產生器。內建痛點分析、TAM/SAM/SOM 市場規模、商業模式與財務預測 10 頁結構！',
      h1: 'ChatGPT Slides 新創募資簡報 (Pitch Deck) 提示詞產生器',
      subtitle:
        '遵循紅杉資本與 Y Combinator 偏好的 10 頁募資簡報架構，一鍵生成包含市場規模圖表與講者備忘稿的 ChatGPT Slides 指令。',
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
        '解決 ChatGPT Slides 匯出 PowerPoint 文字溢位與排版問題！使用防跑版簡報提示詞產生器，保留完整標題層級與演講者備忘稿。',
      h1: 'ChatGPT Slides 匯出 PowerPoint (.PPTX) 提示詞產生器與防跑版指南',
      subtitle:
        '減少從 ChatGPT Slides 匯出至 Microsoft PowerPoint、PDF 或 Google 簡報時的文字超框現象，自動將長篇解說移入演講者檢視備忘稿。',
      defaultTopic: '針對 PowerPoint (.pptx) 排版優化的年度企業策略簡報'
    },
    troubleshooting: {
      metaTitle: 'ChatGPT Slides 無法顯示？排查步驟與標準提示詞',
      metaDesc:
        '了解 ChatGPT Slides 找不到或未出現的原因。核對帳號方案（Pro、Business、Enterprise Space 權限）、桌面瀏覽器環境與官方 Work/Space 入口。',
      h1: 'ChatGPT Slides 無法顯示？排查說明與標準提示詞',
      subtitle:
        '如果帳號中尚未看見 Slides 畫布功能或匯出選項，請先確認您的方案是否具備 Space 權限（Pro、Business、Enterprise），並在桌面端瀏覽器測試。',
      defaultTopic: '季度高管業務檢討報告（ChatGPT Slides 標準提示詞）'
    }
  },

  es: {
    generator: {
      metaTitle: 'Generador de Prompts para ChatGPT Slides (Gratis y Online)',
      metaDesc:
        'Crea prompts profesionales para ChatGPT Slides gratis. Define tema, audiencia, número de diapositivas, gráficos y notas del orador para PowerPoint.',
      h1: 'Generador de Prompts para ChatGPT Slides',
      subtitle:
        'Genera presentaciones colaborativas en ChatGPT Slides listas para exportar a PowerPoint (.pptx), PDF y Google Slides sin API ni registro obligatorio.'
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
        'Genera un Pitch Deck para ChatGPT Slides. Incluye problema, solución, mercado TAM/SAM/SOM, tracción, modelo de negocio y exportación a PowerPoint.',
      h1: 'Generador de Prompts de Pitch Deck para ChatGPT Slides',
      subtitle:
        'Estructura tu presentación para inversores con narrativa clara, gráficos de mercado TAM/SAM/SOM y notas para preguntas de VCs.',
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
      metaTitle: '¿ChatGPT Slides No Aparece? Pasos de Verificación y Prompt Estándar',
      metaDesc:
        'Comprueba por qué ChatGPT Slides puede no estar visible. Revisa planes con acceso Space (Pro, Business, Enterprise), navegador web de escritorio y Work/Space.',
      h1: '¿ChatGPT Slides No Aparece? Pasos de Verificación y Prompt Estándar',
      subtitle:
        'Si no ves el lienzo de Slides o el botón de exportación, comprueba si tu cuenta tiene acceso Space (Pro, Business, Enterprise) en navegador de escritorio.',
      defaultTopic: 'Revisión Ejecutiva de Negocio (Prompt Estándar para ChatGPT Slides)'
    }
  },

  ja: {
    generator: {
      metaTitle: 'ChatGPT Slides プロンプト作成ツール（無料・登録不要・PPTX対応）',
      metaDesc:
        'ChatGPT Slides専用プロンプト生成ツール。テーマ・対象読者・スライド枚数・図表・スピーカーノートを指定してPowerPointやGoogleスライドへ出力！',
      h1: 'ChatGPT Slides 専用プロンプト生成ツール（無料）',
      subtitle:
        'OpenAIのChatGPT Slides向けに最適化されたプレゼン構成プロンプトをワンクリック生成。PowerPoint (.pptx)・PDF・Googleスライド出力に対応。'
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
        'PowerPointやGoogleスライドへエクスポートした際の文字はみ出しを防ぎ、1スライド1メッセージのレイアウトと発表原稿を出力します。',
      defaultTopic: 'PowerPoint (.pptx) 書き出しに最適化した全社DX推進戦略プレゼンテーション'
    },
    troubleshooting: {
      metaTitle: 'ChatGPT Slidesが表示されない場合の確認ポイントと標準プロンプト',
      metaDesc:
        'ChatGPT Slidesが表示されない要因と確認手順を解説。Space権限を持つ対象プラン（Pro、Business、Enterprise）の段階的提供状況やデスクトップブラウザ環境を確認してください。',
      h1: 'ChatGPT Slidesが表示されない場合の確認手順と標準プロンプト',
      subtitle:
        'Slidesキャンバスや書き出しメニューが表示されない場合は、Space機能対応プラン（Pro、Business、Enterprise）とデスクトップ環境を確認してください。',
      defaultTopic: '四半期経営レビュー報告（ChatGPT Slides用標準プロンプト）'
    }
  }
};
