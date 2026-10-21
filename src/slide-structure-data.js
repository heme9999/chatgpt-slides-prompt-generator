// src/slide-structure-data.js
// Single source of truth for slide roles, category expansion pools, localized fallback titles, and deterministic slide outline selection.
// Shared by browser runtime (app.js), static build (build.mjs), and verification test suite (test-all.mjs).

export const FALLBACK_EXEC_TITLES = {
  'en': 'Executive Summary & Core Agenda',
  'zh-TW': '執行摘要與核心議程',
  'es': 'Resumen ejecutivo y agenda principal',
  'ja': 'エグゼクティブサマリーと主要アジェンダ'
};

export const SLIDE_PREFIXES = {
  'en': (n) => `Slide ${n}: `,
  'zh-TW': (n) => `投影片 ${n}：`,
  'es': (n) => `Diapositiva ${n}: `,
  'ja': (n) => `スライド ${n}：`
};

export const EXPANSION_POOLS = {
  pitch: {
    en: [
      { id: 'exp-pitch-tam', title: 'Market Opportunity & Sizing (TAM, SAM, SOM Methodology)' },
      { id: 'exp-pitch-unit-econ', title: 'Unit Economics, CAC Payback & Net Retention Cohorts' },
      { id: 'exp-pitch-moat', title: 'Competitive Advantage & Defensive Product Moat' },
      { id: 'exp-pitch-gtm', title: 'Go-To-Market Engine & Customer Acquisition Flywheel' },
      { id: 'exp-pitch-financials', title: 'Financial Projections & 24-Month Capital Milestones' },
      { id: 'exp-pitch-funds', title: 'Use of Funds & Strategic Hiring Allocation' },
      { id: 'exp-pitch-cap-table', title: 'Cap Table Overview & Round Structure Terms' },
      { id: 'exp-pitch-traction', title: 'Current Traction, Pipeline Velocity & Key Pilot Benchmarks' },
      { id: 'exp-pitch-scalability', title: 'Technology Scalability & Margin Expansion Roadmap' },
      { id: 'exp-pitch-appendix', title: 'Appendix: Customer Testimonials & Pilot Metrics' }
    ],
    'zh-TW': [
      { id: 'exp-pitch-tam', title: '市場機會與規模測算（TAM、SAM、SOM 分析模型）' },
      { id: 'exp-pitch-unit-econ', title: '單元經濟模型、獲客成本回收期與淨留存同群分析' },
      { id: 'exp-pitch-moat', title: '核心競爭壁壘與防禦性護城河分析' },
      { id: 'exp-pitch-gtm', title: '市場推廣引擎與客戶獲取飛輪策略' },
      { id: 'exp-pitch-financials', title: '財務預測與未來 24 個月關鍵資金里程碑' },
      { id: 'exp-pitch-funds', title: '募資資金用途與關鍵人才招募規劃' },
      { id: 'exp-pitch-cap-table', title: '股權結構概覽與本輪融資條款架構' },
      { id: 'exp-pitch-traction', title: '業務進展、銷售管線週轉速度與初期實測標竿' },
      { id: 'exp-pitch-scalability', title: '技術架構可擴展性與利潤率放大路徑' },
      { id: 'exp-pitch-appendix', title: '附錄：初期試點客戶反饋與實測成效數據' }
    ],
    es: [
      { id: 'exp-pitch-tam', title: 'Oportunidad y dimensionamiento del mercado (Metodología TAM, SAM, SOM)' },
      { id: 'exp-pitch-unit-econ', title: 'Economía unitaria, recuperación del CAC y cohortes de retención neta' },
      { id: 'exp-pitch-moat', title: 'Ventaja competitiva y foso defensivo del producto' },
      { id: 'exp-pitch-gtm', title: 'Motor de comercialización (GTM) y volante de adquisición de clientes' },
      { id: 'exp-pitch-financials', title: 'Proyecciones financieras e hitos de capital a 24 meses' },
      { id: 'exp-pitch-funds', title: 'Uso de fondos y asignación para contratación estratégica' },
      { id: 'exp-pitch-cap-table', title: 'Estructura accionaria y términos de la ronda de inversión' },
      { id: 'exp-pitch-traction', title: 'Tracción actual, velocidad del pipeline y métricas de prueba piloto' },
      { id: 'exp-pitch-scalability', title: 'Escalabilidad tecnológica y hoja de ruta de expansión de margen' },
      { id: 'exp-pitch-appendix', title: 'Apéndice: Testimonios de clientes y métricas de proyectos piloto' }
    ],
    ja: [
      { id: 'exp-pitch-tam', title: '市場機会と規模推計（TAM・SAM・SOM 分析手法）' },
      { id: 'exp-pitch-unit-econ', title: 'ユニットエコノミクス、CAC回収期間、ネットリテンション分析' },
      { id: 'exp-pitch-moat', title: '競合優位性と製品の防御的モート（参入障壁）' },
      { id: 'exp-pitch-gtm', title: 'GTM（市場投入）エンジンと顧客獲得フライホイール' },
      { id: 'exp-pitch-financials', title: '財務計画と今後24か月の資本マイルストーン' },
      { id: 'exp-pitch-funds', title: '調達資金の使途と戦略的採用計画' },
      { id: 'exp-pitch-cap-table', title: '資本政策の概要と本ラウンドの投資条件' },
      { id: 'exp-pitch-traction', title: '事業の牽引力（トラクション）、商談推移、導入実績' },
      { id: 'exp-pitch-scalability', title: '技術のスケーラビリティと営業利益率の拡大計画' },
      { id: 'exp-pitch-appendix', title: '付録：顧客からの評価コメントと実証実験メトリクス' }
    ]
  },
  sales: {
    en: [
      { id: 'exp-sales-trends', title: 'Industry Macro Trends & Why Legacy Workflows Fail' },
      { id: 'exp-sales-roi', title: 'Comprehensive ROI Calculator & Payback Period Breakdown' },
      { id: 'exp-sales-case', title: 'In-Depth Customer Success Case Study & Quantified Proof' },
      { id: 'exp-sales-security', title: 'Security Architecture, Compliance & Enterprise Governance' },
      { id: 'exp-sales-implementation', title: 'Implementation Timeline: 30-60-90 Day Rollout Plan' },
      { id: 'exp-sales-pricing', title: 'Commercial Packaging, Tiered Pricing & Licensing Options' },
      { id: 'exp-sales-support', title: 'Customer Success Onboarding & Dedicated Support SLA' },
      { id: 'exp-sales-comparison', title: 'Direct Competitive Matrix: Feature & Performance Comparison' },
      { id: 'exp-sales-change', title: 'Change Management Plan & Internal Team Enablement' },
      { id: 'exp-sales-appendix', title: 'Appendix: Security Whitepaper & SLA Guarantees' }
    ],
    'zh-TW': [
      { id: 'exp-sales-trends', title: '產業宏觀趨勢與傳統作業流程失效原因分析' },
      { id: 'exp-sales-roi', title: '全面投資回報率 (ROI) 試算與回本週期深度拆解' },
      { id: 'exp-sales-case', title: '指標客戶深度成功案例與量化成效驗證' },
      { id: 'exp-sales-security', title: '資安架構、法規遵循與企業級治理標準' },
      { id: 'exp-sales-implementation', title: '系統導入時程：30-60-90 天逐步推進落地規劃' },
      { id: 'exp-sales-pricing', title: '商業合作方案、分級定價與授權模式選型' },
      { id: 'exp-sales-support', title: '客戶成功導入支援體系與專屬 SLA 服務承諾' },
      { id: 'exp-sales-comparison', title: '市場同類方案規格評估與核心性能對照矩陣' },
      { id: 'exp-sales-change', title: '變革管理策略與內部組織賦能培訓計畫' },
      { id: 'exp-sales-appendix', title: '附錄：企業資安白皮書與 SLA 服務合約規範' }
    ],
    es: [
      { id: 'exp-sales-trends', title: 'Tendencias macro del sector y por qué fallan los flujos tradicionales' },
      { id: 'exp-sales-roi', title: 'Calculadora completa de ROI y desglose del período de recuperación' },
      { id: 'exp-sales-case', title: 'Estudio de caso en profundidad y validación cuantificada' },
      { id: 'exp-sales-security', title: 'Arquitectura de seguridad, cumplimiento y gobernanza corporativa' },
      { id: 'exp-sales-implementation', title: 'Cronograma de implementación: plan de despliegue a 30-60-90 días' },
      { id: 'exp-sales-pricing', title: 'Paquetes comerciales, precios por niveles y opciones de licencia' },
      { id: 'exp-sales-support', title: 'Incorporación de éxito del cliente y SLA de soporte dedicado' },
      { id: 'exp-sales-comparison', title: 'Matriz competitiva directa: comparativa de funciones y rendimiento' },
      { id: 'exp-sales-change', title: 'Plan de gestión del cambio y capacitación interna del equipo' },
      { id: 'exp-sales-appendix', title: 'Apéndice: Informe de seguridad y garantías de SLA' }
    ],
    ja: [
      { id: 'exp-sales-trends', title: '業界マクロトレンドと従来型ワークフローが機能しない理由' },
      { id: 'exp-sales-roi', title: '包括的ROI試算モデルと投資回収期間の詳細分析' },
      { id: 'exp-sales-case', title: '主要顧客の詳細導入事例と定量的成果の実証' },
      { id: 'exp-sales-security', title: 'セキュリティ設計、コンプライアンス、エンタープライズ統制' },
      { id: 'exp-sales-implementation', title: '導入スケジュール：30-60-90日ステップアップ導入計画' },
      { id: 'exp-sales-pricing', title: '商用プラン体系、階層別料金、ライセンス形態' },
      { id: 'exp-sales-support', title: 'カスタマーサクセスオンボーディング体制と専任SLA保証' },
      { id: 'exp-sales-comparison', title: '競合ソリューション比較表：機能性と運用実績の対比' },
      { id: 'exp-sales-change', title: '組織変革管理（チェンジマネジメント）と社内浸透研修' },
      { id: 'exp-sales-appendix', title: '付録：セキュリティホワイトペーパーとSLA規約詳細' }
    ]
  },
  operations: {
    en: [
      { id: 'exp-ops-tech-arch', title: 'Technical Architecture & System Data Flow Schematics' },
      { id: 'exp-ops-risk', title: 'Comprehensive Risk Assessment & Mitigation Contingency Plan' },
      { id: 'exp-ops-resourcing', title: 'Resource Allocation, Team Capacity & Hiring Plan' },
      { id: 'exp-ops-budget', title: 'Detailed Budget Allocation, OpEx vs. CapEx & Variance Analysis' },
      { id: 'exp-ops-governance', title: 'Governance Model, Decision Gates & Escalation Matrix' },
      { id: 'exp-ops-quality', title: 'Quality Assurance, Testing Regimen & Release Readiness' },
      { id: 'exp-ops-change', title: 'Change Management, User Adoption & Training Schedule' },
      { id: 'exp-ops-kpi', title: 'Operational KPIs, Dashboard Metrics & SLA Tracking' },
      { id: 'exp-ops-vendor', title: 'Vendor Management & External Dependency Map' },
      { id: 'exp-ops-appendix', title: 'Appendix: Technical Schematics & Runbook Links' }
    ],
    'zh-TW': [
      { id: 'exp-ops-tech-arch', title: '技術架構設計與系統資料串流拓撲圖' },
      { id: 'exp-ops-risk', title: '專案風險評估矩陣與對應緩解預案' },
      { id: 'exp-ops-resourcing', title: '資源配置規劃、團隊產能分配與編制擴充' },
      { id: 'exp-ops-budget', title: '詳細預算科目劃分、資本性/營運支出與差異分析' },
      { id: 'exp-ops-governance', title: '專案治理模式、里程碑審核點與問題升級機制' },
      { id: 'exp-ops-quality', title: '品質保證機制、全面測試規範與上線驗收標準' },
      { id: 'exp-ops-change', title: '組織變革管理、全員推廣進度與教育訓練排程' },
      { id: 'exp-ops-kpi', title: '日常運營 KPI、即時監控儀表板指標與 SLA 追蹤' },
      { id: 'exp-ops-vendor', title: '外部供應商管理與第三方技術依賴關係圖' },
      { id: 'exp-ops-appendix', title: '附錄：技術拓撲細節與系統運維手冊連結' }
    ],
    es: [
      { id: 'exp-ops-tech-arch', title: 'Arquitectura técnica y esquemas de flujo de datos del sistema' },
      { id: 'exp-ops-risk', title: 'Evaluación exhaustiva de riesgos y plan de mitigación' },
      { id: 'exp-ops-resourcing', title: 'Asignación de recursos, capacidad del equipo y plan de contrataciones' },
      { id: 'exp-ops-budget', title: 'Presupuesto detallado, análisis de gastos de capital y operativos' },
      { id: 'exp-ops-governance', title: 'Modelo de gobernanza, puertas de decisión y matriz de escalamiento' },
      { id: 'exp-ops-quality', title: 'Aseguramiento de la calidad, pruebas y preparación del lanzamiento' },
      { id: 'exp-ops-change', title: 'Gestión del cambio, adopción de usuarios y calendario de formación' },
      { id: 'exp-ops-kpi', title: 'KPI operativos, métricas de panel y seguimiento de SLA' },
      { id: 'exp-ops-vendor', title: 'Gestión de proveedores y mapa de dependencias externas' },
      { id: 'exp-ops-appendix', title: 'Apéndice: Esquemas técnicos y enlaces al manual de operaciones' }
    ],
    ja: [
      { id: 'exp-ops-tech-arch', title: '技術アーキテクチャ設計とシステムデータフロー構成図' },
      { id: 'exp-ops-risk', title: '包括的リスク評価マトリクスと予防・緩和計画' },
      { id: 'exp-ops-resourcing', title: 'リソース配分計画、チーム稼働キャパシティ、要員計画' },
      { id: 'exp-ops-budget', title: '予算詳細配分、CapEx/OpEx比較、コスト差異分析' },
      { id: 'exp-ops-governance', title: 'プロジェクト統制モデル、品質ゲート審査、課題エスカレーション基準' },
      { id: 'exp-ops-quality', title: '品質保証（QA）体制、検証試験計画、リリース判定基準' },
      { id: 'exp-ops-change', title: 'チェンジマネジメント、利用定着化施策、教育トレーニング日程' },
      { id: 'exp-ops-kpi', title: '運用KPIモニタリング、ダッシュボード指標、SLA達成状況' },
      { id: 'exp-ops-vendor', title: '外部ベンダー管理計画とサードパーティ依存関係マップ' },
      { id: 'exp-ops-appendix', title: '付録：技術詳細資料および運用手順書リンク' }
    ]
  },
  research: {
    en: [
      { id: 'exp-research-literature', title: 'Comprehensive Literature Review & Baseline Comparison' },
      { id: 'exp-research-setup', title: 'Experimental Setup, Benchmark Datasets & Data Lineage' },
      { id: 'exp-research-stats', title: 'Statistical Significance, Confidence Intervals & Error Bounds' },
      { id: 'exp-research-ablation', title: 'Comparative Analysis, Ablation Studies & Edge Cases' },
      { id: 'exp-research-ethics', title: 'Ethical Considerations & Reproducibility Protocol' },
      { id: 'exp-research-limitations', title: 'Limitations, Threats to Internal Validity & Biases' },
      { id: 'exp-research-future', title: 'Future Research Directions & Open Research Questions' },
      { id: 'exp-research-methodology', title: 'Deep Dive: Mathematical Formulation & Algorithm Details' },
      { id: 'exp-research-robustness', title: 'Robustness Checks & Out-of-Distribution Generalization' },
      { id: 'exp-research-appendix', title: 'Appendix: Extended Data Tables & Hyperparameter Settings' }
    ],
    'zh-TW': [
      { id: 'exp-research-literature', title: '文獻綜述、相關研究成果與既有基準對比分析' },
      { id: 'exp-research-setup', title: '實驗環境配置、基準評測資料集與資料溯源' },
      { id: 'exp-research-stats', title: '統計顯著性檢定、信賴區間與誤差範圍分析' },
      { id: 'exp-research-ablation', title: '橫向對比實驗、消融實驗（Ablation）與邊界案例測試' },
      { id: 'exp-research-ethics', title: '研究倫理審查聲明與研究可重現性規範' },
      { id: 'exp-research-limitations', title: '研究局限性、內部/外部有效性挑戰與潛在偏差' },
      { id: 'exp-research-future', title: '後續研究方向、拓展潛力與未解學術議題' },
      { id: 'exp-research-methodology', title: '深度推導：數學模型形式化定義與演算法細節' },
      { id: 'exp-research-robustness', title: '模型穩健性檢驗與分佈外（OOD）泛化能力評估' },
      { id: 'exp-research-appendix', title: '附錄：擴展實驗數據清單與超參數設定詳表' }
    ],
    es: [
      { id: 'exp-research-literature', title: 'Revisión bibliográfica completa y comparación con el estado del arte' },
      { id: 'exp-research-setup', title: 'Configuración experimental, conjuntos de datos de prueba y linaje' },
      { id: 'exp-research-stats', title: 'Significancia estadística, intervalos de confianza y márgenes de error' },
      { id: 'exp-research-ablation', title: 'Análisis comparativo, estudios de ablación y casos extremos' },
      { id: 'exp-research-ethics', title: 'Consideraciones éticas y protocolo de reproducibilidad' },
      { id: 'exp-research-limitations', title: 'Limitaciones, amenazas a la validez interna y sesgos potenciales' },
      { id: 'exp-research-future', title: 'Líneas futuras de investigación y preguntas abiertas' },
      { id: 'exp-research-methodology', title: 'Análisis detallado: formulación matemática y algoritmo' },
      { id: 'exp-research-robustness', title: 'Comprobaciones de robustez y generalización fuera de distribución' },
      { id: 'exp-research-appendix', title: 'Apéndice: Tablas de datos extendidas e hiperparámetros' }
    ],
    ja: [
      { id: 'exp-research-literature', title: '先行研究レビューと従来手法との比較分析' },
      { id: 'exp-research-setup', title: '実験環境のセットアップ、基準データセット、データ系列' },
      { id: 'exp-research-stats', title: '統計的有意性、信頼区間、誤差範囲の分析' },
      { id: 'exp-research-ablation', title: '比較考察、アブレーション実験（構成要素検証）、境界例評価' },
      { id: 'exp-research-ethics', title: '研究倫理上の考慮事項と再現性プロトコル' },
      { id: 'exp-research-limitations', title: '研究の限界と内的・外的妥当性への影響要因' },
      { id: 'exp-research-future', title: '今後の研究方針と未解決の学術課題' },
      { id: 'exp-research-methodology', title: '詳細分析：数式モデルの定式化とアルゴリズム手順' },
      { id: 'exp-research-robustness', title: 'ロバスト性検証と分布外（OOD）汎化性能評価' },
      { id: 'exp-research-appendix', title: '付録：拡張データ一覧表とハイパーパラメータ詳細設定' }
    ]
  },
  education: {
    en: [
      { id: 'exp-edu-concept', title: 'Core Conceptual Model & First Principles' },
      { id: 'exp-edu-example', title: 'Worked Practical Example & Step-by-Step Breakdown' },
      { id: 'exp-edu-reflection', title: 'Interactive Reflection & Real-Time Polling Checkpoint' },
      { id: 'exp-edu-pitfalls', title: 'Common Misconceptions, Pitfalls & Anti-Patterns' },
      { id: 'exp-edu-exercise', title: 'Hands-on Lab Exercise & Peer Discussion Prompt' },
      { id: 'exp-edu-cases', title: 'Application to Real-World Case Studies' },
      { id: 'exp-edu-synthesis', title: 'Key Takeaways & Conceptual Anchor Synthesis' },
      { id: 'exp-edu-rubric', title: 'Assessment Rubric, Mastery Criteria & Feedback Guide' },
      { id: 'exp-edu-extensions', title: 'Differentiated Extension Tasks for Advanced Learners' },
      { id: 'exp-edu-appendix', title: 'Recommended Reading, Code Repositories & Exercises' }
    ],
    'zh-TW': [
      { id: 'exp-edu-concept', title: '核心概念模型與第一性原理拆解' },
      { id: 'exp-edu-example', title: '經典實例解析與逐步操作示範' },
      { id: 'exp-edu-reflection', title: '課堂互動思考與即時理解度測驗' },
      { id: 'exp-edu-pitfalls', title: '常見迷思、學習誤區與典型錯誤模式解析' },
      { id: 'exp-edu-exercise', title: '動手實作演練與小組同儕討論任務' },
      { id: 'exp-edu-cases', title: '產業真實場景應用與案例深度探討' },
      { id: 'exp-edu-synthesis', title: '課程重點總結與知識體系錨定' },
      { id: 'exp-edu-rubric', title: '學習成效評量指標、熟練度標準與回饋準則' },
      { id: 'exp-edu-extensions', title: '進階學習者專屬之差異化延伸挑戰題' },
      { id: 'exp-edu-appendix', title: '延伸閱讀清單、開源專案與自我練習資源' }
    ],
    es: [
      { id: 'exp-edu-concept', title: 'Modelo conceptual central y primeros principios' },
      { id: 'exp-edu-example', title: 'Ejemplo práctico guiado y desglose paso a paso' },
      { id: 'exp-edu-reflection', title: 'Reflexión interactiva y punto de sondeo en tiempo real' },
      { id: 'exp-edu-pitfalls', title: 'Errores comunes, conceptos erróneos y malas prácticas' },
      { id: 'exp-edu-exercise', title: 'Ejercicio práctico de taller y debate en parejas' },
      { id: 'exp-edu-cases', title: 'Aplicación a estudios de caso del mundo real' },
      { id: 'exp-edu-synthesis', title: 'Conclusiones clave y síntesis de anclaje conceptual' },
      { id: 'exp-edu-rubric', title: 'Rúbrica de evaluación, criterios de dominio y retroalimentación' },
      { id: 'exp-edu-extensions', title: 'Actividades de ampliación diferenciadas para nivel avanzado' },
      { id: 'exp-edu-appendix', title: 'Lecturas recomendadas, repositorios de código y ejercicios' }
    ],
    ja: [
      { id: 'exp-edu-concept', title: '中核概念モデルと第一原理からのブレークダウン' },
      { id: 'exp-edu-example', title: '実践的な応用例とステップバイステップの解説' },
      { id: 'exp-edu-reflection', title: 'インタラクティブな振り返りとリアルタイム理解度確認' },
      { id: 'exp-edu-pitfalls', title: 'よくある誤解、陥りやすい落とし穴、アンチパターン' },
      { id: 'exp-edu-exercise', title: 'ハンズオン演習課題とグループディスカッション' },
      { id: 'exp-edu-cases', title: '実社会の事例研究への応用とケーススタディ' },
      { id: 'exp-edu-synthesis', title: '重要ポイントの整理と理解の定着化まとめ' },
      { id: 'exp-edu-rubric', title: '習熟度評価ルーブリックとフィードバック評価基準' },
      { id: 'exp-edu-extensions', title: '上級学習者向けの応用発展課題' },
      { id: 'exp-edu-appendix', title: '参考文献リスト、関連ソースコード、自主学習用教材' }
    ]
  },
  general: {
    en: [
      { id: 'exp-gen-benchmark', title: 'Industry Benchmarks & Comparative Macro Landscape' },
      { id: 'exp-gen-workstreams', title: 'Detailed Workstream Breakdown & Operational Ownership' },
      { id: 'exp-gen-stakeholders', title: 'Cross-Functional Stakeholder Impact Matrix' },
      { id: 'exp-gen-sensitivity', title: 'Sensitivity Analysis: Base Case, Upside & Downside Scenarios' },
      { id: 'exp-gen-governance', title: 'Resource Allocation, Budget & Governance Controls' },
      { id: 'exp-gen-roadmap', title: '90-Day Execution Roadmap & Critical Path Milestones' },
      { id: 'exp-gen-objections', title: 'Executive FAQ & Anticipated Objections Guide' },
      { id: 'exp-gen-kpi', title: 'Key Performance Indicators (KPIs) & Balanced Scorecard' },
      { id: 'exp-gen-change', title: 'Change Management & Stakeholder Communication Strategy' },
      { id: 'exp-gen-appendix', title: 'Appendix: Supporting Metrics & Reference Citations' }
    ],
    'zh-TW': [
      { id: 'exp-gen-benchmark', title: '產業標竿數據對比與宏觀外部環境分析' },
      { id: 'exp-gen-workstreams', title: '詳細工作流（Workstream）拆解與部門責任分工' },
      { id: 'exp-gen-stakeholders', title: '跨部門利害關係人影響度與溝通矩陣' },
      { id: 'exp-gen-sensitivity', title: '敏感度分析：基準情境、樂觀預期與下行風險' },
      { id: 'exp-gen-governance', title: '資源配置、專案預算審批與治理管控機制' },
      { id: 'exp-gen-roadmap', title: '90 天關鍵推進路線圖與關鍵路徑里程碑' },
      { id: 'exp-gen-objections', title: '決策層常見問答集（FAQ）與潛在質疑應對指南' },
      { id: 'exp-gen-kpi', title: '關鍵績效指標 (KPI) 與平衡計分卡衡量體系' },
      { id: 'exp-gen-change', title: '組織變革管理與全員溝通推進宣導策略' },
      { id: 'exp-gen-appendix', title: '附錄：補充驗證數據、參考文獻與引文出處' }
    ],
    es: [
      { id: 'exp-gen-benchmark', title: 'Puntos de referencia del sector y panorama macroeconómico' },
      { id: 'exp-gen-workstreams', title: 'Desglose detallado de flujos de trabajo y responsables' },
      { id: 'exp-gen-stakeholders', title: 'Matriz de impacto en partes interesadas multifuncionales' },
      { id: 'exp-gen-sensitivity', title: 'Análisis de sensibilidad: caso base, escenarios alcista y bajista' },
      { id: 'exp-gen-governance', title: 'Asignación de recursos, presupuesto y controles de gobernanza' },
      { id: 'exp-gen-roadmap', title: 'Hoja de ruta de ejecución a 90 días e hitos críticos' },
      { id: 'exp-gen-objections', title: 'Preguntas frecuentes ejecutivas y guía para resolver objeciones' },
      { id: 'exp-gen-kpi', title: 'Indicadores clave de rendimiento (KPI) y cuadro de mando integral' },
      { id: 'exp-gen-change', title: 'Estrategia de comunicación y adopción del cambio' },
      { id: 'exp-gen-appendix', title: 'Apéndice: Métricas de soporte y citas de referencia' }
    ],
    ja: [
      { id: 'exp-gen-benchmark', title: '業界標準ベンチマークとマクロ市場環境分析' },
      { id: 'exp-gen-workstreams', title: '詳細ワークストリーム分解と運用責任チームの割り当て' },
      { id: 'exp-gen-stakeholders', title: '部門横断ステークホルダー影響度マトリクスと連携計画' },
      { id: 'exp-gen-sensitivity', title: '感応度分析：ベースケース、アップサイド、ダウンサイドリスク' },
      { id: 'exp-gen-governance', title: 'リソース配分、プロジェクト予算、ガバナンス統制基準' },
      { id: 'exp-gen-roadmap', title: '90日実行ロードマップとクリティカルパスの主要節目' },
      { id: 'exp-gen-objections', title: 'エグゼクティブ向け想定問答集と反対意見への対応要領' },
      { id: 'exp-gen-kpi', title: '主要業績評価指標（KPI）とバランススコアカード目標' },
      { id: 'exp-gen-change', title: 'ステークホルダーコミュニケーションと組織変革定着化策' },
      { id: 'exp-gen-appendix', title: '付録：裏付けデータ詳細と信頼できる引用文献リスト' }
    ]
  }
};

export function getCategoryKey(category) {
  const c = String(category || '').toLowerCase();
  if (c.includes('startup') || c.includes('fundraising') || c.includes('pitch')) return 'pitch';
  if (c.includes('sales') || c.includes('revenue')) return 'sales';
  if (c.includes('academic') || c.includes('r&d') || c.includes('research')) return 'research';
  if (c.includes('education') || c.includes('training') || c.includes('lesson')) return 'education';
  if (c.includes('operation') || c.includes('engineering') || c.includes('tech') || c.includes('pm')) return 'operations';
  return 'general';
}

/**
 * Deterministically select an ordered list of slide items { id, role } based on template structural data,
 * slide count, executive summary toggle, and category expansion pools.
 * Language-independent: identical blueprint produced for all locales.
 */
export function selectSlideBlueprint(templateSlides, targetCount, hasExecSummary = true, categoryKey = 'general') {
  if (!Array.isArray(templateSlides) || templateSlides.length === 0) {
    templateSlides = [
      { id: 'slide-1', role: 'title' },
      { id: 'slide-exec-summary', role: 'executive-summary' },
      { id: 'slide-3', role: 'content' },
      { id: 'slide-4', role: 'content' },
      { id: 'slide-closing', role: 'closing' }
    ];
  }

  // 1. Process executive summary role
  let cleanBase = [];
  if (!hasExecSummary) {
    cleanBase = templateSlides.filter((s) => s.role !== 'executive-summary');
  } else {
    cleanBase = [...templateSlides];
    const hasSummary = cleanBase.some((s) => s.role === 'executive-summary');
    if (!hasSummary) {
      // Insert synthetic executive summary right after title
      cleanBase.splice(1, 0, { id: 'slide-exec-summary', role: 'executive-summary' });
    }
  }

  // Guard: ensure minimum 2 slides
  if (cleanBase.length < 2) {
    cleanBase = [
      { id: 'slide-1', role: 'title' },
      { id: 'slide-closing', role: 'closing' }
    ];
  }

  // 2. Adjust count
  const titleSlide = cleanBase[0];
  const closingSlide = cleanBase[cleanBase.length - 1];
  const selected = [];

  if (targetCount <= cleanBase.length) {
    if (targetCount <= 2) {
      for (let i = 0; i < targetCount; i++) {
        selected.push({ id: cleanBase[i].id, role: cleanBase[i].role });
      }
    } else {
      selected.push({ id: titleSlide.id, role: titleSlide.role });

      let middleStart = 1;
      if (hasExecSummary && cleanBase[1] && cleanBase[1].role === 'executive-summary') {
        selected.push({ id: cleanBase[1].id, role: cleanBase[1].role });
        middleStart = 2;
      }

      const middleCount = targetCount - (selected.length + 1);
      const sourceMiddle = cleanBase.slice(middleStart, cleanBase.length - 1);

      if (middleCount > 0 && sourceMiddle.length > 0) {
        for (let i = 0; i < middleCount; i++) {
          const idx = Math.min(
            sourceMiddle.length - 1,
            Math.floor((i * sourceMiddle.length) / Math.max(1, middleCount))
          );
          selected.push({ id: sourceMiddle[idx].id, role: sourceMiddle[idx].role });
        }
      }

      selected.push({ id: closingSlide.id, role: closingSlide.role });
    }
  } else {
    // Expanding beyond base: ensure 100% unique slides by chaining category pool, general pool, and auxiliary pools
    const body = cleanBase.slice(0, cleanBase.length - 1);
    for (const s of body) {
      selected.push({ id: s.id, role: s.role });
    }

    const catKey = getCategoryKey(categoryKey);
    const primaryPool = (EXPANSION_POOLS[catKey] && EXPANSION_POOLS[catKey]['en']) || [];
    const generalPool = (EXPANSION_POOLS['general'] && EXPANSION_POOLS['general']['en']) || [];

    const allCategoryKeys = ['pitch', 'sales', 'operations', 'research', 'education'];
    const otherPools = [];
    for (const k of allCategoryKeys) {
      if (k !== catKey) {
        const p = (EXPANSION_POOLS[k] && EXPANSION_POOLS[k]['en']) || [];
        otherPools.push(...p);
      }
    }

    const combinedPool = [...primaryPool, ...generalPool, ...otherPools];
    const existingIds = new Set(selected.map((s) => s.id));

    let poolIdx = 0;
    while (selected.length < targetCount - 1 && poolIdx < combinedPool.length) {
      const expItem = combinedPool[poolIdx];
      if (!existingIds.has(expItem.id)) {
        selected.push({
          id: expItem.id,
          role: 'content'
        });
        existingIds.add(expItem.id);
      }
      poolIdx++;
    }

    selected.push({ id: closingSlide.id, role: closingSlide.role });
  }

  return selected;
}

/**
 * Render a slide blueprint into an array of localized slide title strings.
 */
export function renderSlideOutline(blueprint, templateSlides = [], localizedSlides = [], categoryKey = 'general', lang = 'en') {
  const catKey = getCategoryKey(categoryKey);
  const prefixFn = SLIDE_PREFIXES[lang] || SLIDE_PREFIXES['en'];
  const idToTitle = new Map();

  const sourceSlides = (lang !== 'en' && Array.isArray(localizedSlides) && localizedSlides.length > 0)
    ? localizedSlides
    : templateSlides;

  if (Array.isArray(sourceSlides)) {
    for (const s of sourceSlides) {
      if (s && s.id) {
        const clean = String(s.title || s).replace(/^(Slide|投影片|Diapositiva|スライド)\s+\d+[:：]\s*/i, '').trim();
        idToTitle.set(s.id, clean);
      }
    }
  }

  if (!idToTitle.has('slide-exec-summary') || !idToTitle.get('slide-exec-summary')) {
    idToTitle.set('slide-exec-summary', FALLBACK_EXEC_TITLES[lang] || FALLBACK_EXEC_TITLES['en']);
  }

  const allCategoryKeys = ['pitch', 'sales', 'operations', 'research', 'education', 'general'];
  for (const k of allCategoryKeys) {
    const pool = (EXPANSION_POOLS[k] && (EXPANSION_POOLS[k][lang] || EXPANSION_POOLS[k]['en'])) || [];
    for (const item of pool) {
      if (!idToTitle.has(item.id)) {
        idToTitle.set(item.id, item.title);
      }
    }
  }

  return blueprint.map((item, idx) => {
    const rawTitle = idToTitle.get(item.id) || (item.role === 'executive-summary' ? (FALLBACK_EXEC_TITLES[lang] || FALLBACK_EXEC_TITLES['en']) : `Topic Section ${idx + 1}`);
    return `${prefixFn(idx + 1)}${rawTitle}`;
  });
}

/**
 * Legacy wrapper: selects blueprint and renders in one step
 */
export function buildSlideOutline(slidesInput, targetCount, hasExecSummary = true, categoryKey = 'general', lang = 'en') {
  let templateSlides = [];
  if (Array.isArray(slidesInput) && slidesInput.length > 0) {
    if (typeof slidesInput[0] === 'object' && slidesInput[0] !== null && slidesInput[0].id) {
      templateSlides = slidesInput;
    } else {
      templateSlides = slidesInput.map((s, idx) => {
        const clean = String(s).replace(/^(Slide|投影片|Diapositiva|スライド)\s+\d+[:：]\s*/i, '').trim();
        let role = 'content';
        let id = `slide-${idx + 1}`;
        if (idx === 0) {
          role = 'title';
          id = 'slide-1';
        } else if (idx === slidesInput.length - 1) {
          role = 'closing';
          id = 'slide-closing';
        } else if (/executive summary|executive overview|executive abstract|ceo summary|ceo executive summary|thesis in one slide|brand strategy summary|specific aims page summary|topline executive summary|tl;dr executive summary|執行摘要|摘要|resumen ejecutivo|サマリー/i.test(clean)) {
          role = 'executive-summary';
          id = 'slide-exec-summary';
        }
        return { id, role, title: clean };
      });
    }
  }

  const blueprint = selectSlideBlueprint(templateSlides, targetCount, hasExecSummary, categoryKey);
  return renderSlideOutline(blueprint, templateSlides, lang === 'en' ? templateSlides : null, categoryKey, lang);
}

/**
 * Compatibility helper for annotating legacy slide string arrays
 */
export function annotateSlides(slideStructure) {
  if (!Array.isArray(slideStructure)) return [];
  return slideStructure.map((s, idx) => {
    if (typeof s === 'object' && s !== null && s.id && s.role) {
      return {
        id: s.id,
        role: s.role,
        title: String(s.title || '').replace(/^(Slide|投影片|Diapositiva|スライド)\s+\d+[:：]\s*/i, '').trim()
      };
    }
    const clean = String(s || '').replace(/^(Slide|投影片|Diapositiva|スライド)\s+\d+[:：]\s*/i, '').trim();
    let role = 'content';
    let id = `slide-${idx + 1}`;
    if (idx === 0) {
      role = 'title';
      id = 'slide-1';
    } else if (idx === slideStructure.length - 1) {
      role = 'closing';
      id = 'slide-closing';
    } else if (/executive summary|executive overview|executive abstract|ceo summary|ceo executive summary|thesis in one slide|brand strategy summary|specific aims page summary|topline executive summary|tl;dr executive summary|執行摘要|摘要|resumen ejecutivo|サマリー/i.test(clean)) {
      role = 'executive-summary';
      id = 'slide-exec-summary';
    }
    return { id, role, title: clean };
  });
}

/**
 * Validated Mapping for Hubs, Catalogs, Guides, and Programmatic Templates
 * Covers all 51 route groups across EN, zh-TW, ES, and JA.
 */
export const KNOWN_HUB_SLUGS = {
  'chatgpt-slides-prompt-generator': '/chatgpt-slides-prompt-generator',
  'chatgpt-slides-templates': '/chatgpt-slides-templates',
  'chatgpt-slides-to-powerpoint': '/chatgpt-slides-to-powerpoint',
  'chatgpt-slides-not-showing': '/chatgpt-slides-not-showing'
};

export const TEMPLATE_SLUGS = [
  'sales-presentation', 'pitch-deck', 'project-update', 'research-presentation',
  'lesson-plan', 'lesson-deck', 'business-proposal', 'conference-presentation',
  'product-launch', 'real-estate-presentation', 'financial-report',
  'quarterly-business-review', 'marketing-strategy', 'board-meeting',
  'employee-onboarding', 'case-study', 'consulting-deck', 'thesis-defense',
  'webinar-slides', 'company-all-hands', 'product-roadmap', 'investor-update',
  'training-workshop', 'medical-case-presentation', 'grant-proposal',
  'architecture-review', 'post-mortem', 'brand-guidelines', 'agency-credentials',
  'keynote-speech', 'competitive-analysis', 'go-to-market-strategy',
  'budget-proposal', 'partnership-pitch', 'customer-success-review',
  'change-management', 'cybersecurity-briefing', 'ai-strategy-roadmap',
  'mergers-and-acquisitions', 'clinical-trial-results', 'ux-research-readout',
  'supply-chain-review', 'sustainability-esg-report', 'crisis-communication',
  'nonprofit-donor-pitch', 'franchise-opportunity', 'private-equity-ic-memo'
];

/**
 * Resolves a templateId or page slug to its validated canonical route.
 * Returns null if the slug is not recognized, preventing arbitrary path injection.
 */
export function resolveCanonicalPath(slug, uiLang = 'en') {
  if (!slug || typeof slug !== 'string') return null;
  const langPrefix = (uiLang && uiLang !== 'en') ? `/${uiLang}` : '';

  if (KNOWN_HUB_SLUGS[slug]) {
    return `${langPrefix}${KNOWN_HUB_SLUGS[slug]}`;
  }

  if (TEMPLATE_SLUGS.includes(slug)) {
    return `${langPrefix}/prompts/${slug}`;
  }

  return null;
}
