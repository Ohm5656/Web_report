const params = new URLSearchParams(window.location.search);
const year = Number(params.get("year")) || 2024;
const lang = params.get("lang") === "en" ? "en" : "th";

const reportYears = {
  2024: { growth: 15, projects: 39, satisfaction: 90, theme: "digital scale", revenue: 9180, profit: 1340, focus: "expanded customer data platform and improved service reliability" },
  2023: { growth: 11, projects: 34, satisfaction: 88, theme: "operational resilience", revenue: 8420, profit: 1120, focus: "strengthened operating discipline and partner coverage" },
  2022: { growth: 9, projects: 31, satisfaction: 86, theme: "business recovery", revenue: 7590, profit: 960, focus: "rebuilt demand through enterprise service packages" },
  2021: { growth: 7, projects: 28, satisfaction: 84, theme: "hybrid service", revenue: 6960, profit: 820, focus: "supported customers through hybrid work and remote operations" },
  2020: { growth: 4, projects: 24, satisfaction: 81, theme: "continuity", revenue: 6420, profit: 690, focus: "protected business continuity and accelerated online channels" },
  2019: { growth: 12, projects: 26, satisfaction: 85, theme: "market expansion", revenue: 6180, profit: 760, focus: "entered new regional accounts and upgraded core systems" },
  2018: { growth: 10, projects: 23, satisfaction: 83, theme: "service excellence", revenue: 5520, profit: 650, focus: "improved customer support standards and delivery quality" },
  2017: { growth: 8, projects: 19, satisfaction: 80, theme: "platform foundation", revenue: 5010, profit: 570, focus: "built the first unified service platform for enterprise customers" },
  2016: { growth: 6, projects: 17, satisfaction: 78, theme: "capability building", revenue: 4630, profit: 510, focus: "developed internal capability and expanded specialist teams" },
  2015: { growth: 5, projects: 15, satisfaction: 76, theme: "network growth", revenue: 4310, profit: 460, focus: "grew the partner network and standardized service delivery" },
  2014: { growth: 4, projects: 13, satisfaction: 74, theme: "process improvement", revenue: 3990, profit: 410, focus: "improved internal processes and management reporting" },
  2013: { growth: 3, projects: 11, satisfaction: 72, theme: "business foundation", revenue: 3720, profit: 360, focus: "established the operating foundation for long-term growth" }
};

const labels = {
  th: {
    language: "Thai Version",
    subtitle: (y, d) => `รายงานประจำปี ${y} ของ Nova Group สรุปผลการดำเนินงาน กลยุทธ์ และความคืบหน้าสำคัญภายใต้ธีม ${d.theme}`,
    summaryTitle: "ภาพรวมประจำปี",
    summary1: (y, d) => `ปี ${y} บริษัทให้ความสำคัญกับ ${toThaiFocus(d.focus)} พร้อมรักษาวินัยด้านต้นทุนและคุณภาพการให้บริการในทุกกลุ่มธุรกิจ`,
    summary2: (y, d) => `ผลการดำเนินงานสะท้อนการเติบโตของรายได้ ${d.growth}% รายได้รวม ${formatNumber(d.revenue)} ล้านบาท และความพึงพอใจลูกค้า ${d.satisfaction}%`,
    growthLabel: "การเติบโตของรายได้",
    projectsLabel: "โครงการสำคัญ",
    satisfactionLabel: "ความพึงพอใจลูกค้า",
    messageTitle: "สารจากประธานเจ้าหน้าที่บริหาร",
    message1: (y) => `ตลอดปี ${y} Nova Group เดินหน้าพัฒนาองค์กรให้คล่องตัวขึ้น ทั้งด้านเทคโนโลยี กระบวนการทำงาน และการดูแลลูกค้าองค์กร`,
    message2: "เรายังคงสร้างสมดุลระหว่างการเติบโต ผลตอบแทนผู้ถือหุ้น และความรับผิดชอบต่อสังคม เพื่อให้ธุรกิจมีความแข็งแรงในระยะยาว",
    quote: "เรามุ่งสร้างคุณค่าที่วัดผลได้ ผ่านบริการที่เชื่อถือได้ ทีมงานที่มีคุณภาพ และการตัดสินใจบนข้อมูลจริง",
    companyTitle: "ข้อมูลเกี่ยวกับบริษัท",
    companyCopy: "Nova Group ดำเนินธุรกิจด้านโซลูชันองค์กร บริการดิจิทัล และเครือข่ายพันธมิตร โดยเชื่อมโยงเทคโนโลยี ข้อมูล และทีมงานมืออาชีพเข้าด้วยกัน",
    info: [
      ["Vision", "เป็นองค์กรที่เติบโตอย่างยั่งยืนด้วยนวัตกรรมและความน่าเชื่อถือ"],
      ["Mission", "ส่งมอบบริการที่ใช้งานง่าย มีมาตรฐาน และช่วยให้ลูกค้าบรรลุเป้าหมายทางธุรกิจ"],
      ["Business Scope", "ดิจิทัลแพลตฟอร์ม บริการลูกค้า โซลูชันองค์กร และระบบสนับสนุนธุรกิจ"]
    ],
    performanceTitle: "ผลการดำเนินงานตามกลุ่มธุรกิจ",
    performanceIntro: "บริษัทแบ่งผลการดำเนินงานเป็น 3 กลุ่มหลัก เพื่อให้เห็นภาพรายได้ คุณภาพกำไร และโอกาสการเติบโตของแต่ละด้าน",
    units: (d) => [
      ["Digital Solutions", `รายได้ ${formatNumber(Math.round(d.revenue * 0.41))} ล้านบาท`, "เติบโตจากการใช้งานแพลตฟอร์มและบริการออนไลน์ของลูกค้าองค์กร"],
      ["Enterprise Services", `รายได้ ${formatNumber(Math.round(d.revenue * 0.36))} ล้านบาท`, "ขยายฐานลูกค้าในกลุ่มองค์กรขนาดกลางและขนาดใหญ่ พร้อมเพิ่มบริการดูแลหลังการขาย"],
      ["Partner Network", `รายได้ ${formatNumber(Math.round(d.revenue * 0.23))} ล้านบาท`, "พัฒนาเครือข่ายพันธมิตรและยกระดับมาตรฐานบริการในพื้นที่สำคัญ"]
    ],
    highlightsTitle: "ไฮไลต์สำคัญ",
    highlights: (y, d) => [
      ["01", "ยกระดับบริการดิจิทัล", `ดำเนินโครงการสำคัญ ${d.projects} โครงการ เพื่อเพิ่มประสิทธิภาพบริการและลดเวลาการทำงานของลูกค้า`],
      ["02", "เพิ่มความน่าเชื่อถือ", `ปรับปรุงระบบติดตามผลและการบริหารความเสี่ยงให้สอดคล้องกับการเติบโตของปี ${y}`],
      ["03", "สร้างคุณค่าผู้ถือหุ้น", `รักษาการเติบโตของรายได้ ${d.growth}% พร้อมเพิ่มคุณภาพกำไรและความโปร่งใสในการรายงาน`]
    ],
    metricsTitle: "ตัวเลขสำคัญ",
    metricHeaders: ["Metric", "Revenue", "Operating Profit", "Projects", "Satisfaction"],
    metricRow: (y, d) => [String(y), `${formatNumber(d.revenue)} ลบ.`, `${formatNumber(d.profit)} ลบ.`, d.projects, `${d.satisfaction}%`],
    futureTitle: "ทิศทางในอนาคต",
    future: (y) => `หลังปี ${y} บริษัทจะเดินหน้าพัฒนาแพลตฟอร์มดิจิทัล เพิ่มการใช้ข้อมูลในการบริหาร และขยายบริการที่สร้างรายได้ประจำมากขึ้น`,
    downloadTitle: "ดาวน์โหลดรายงานฉบับเต็ม",
    downloadButton: "Download PDF Thai",
    switchLanguage: "English Version",
    footer: (y) => `Annual Report ${y} Thai Version`
  },
  en: {
    language: "English Version",
    subtitle: (y, d) => `Nova Group Annual Report ${y}, covering performance, strategy and key progress under the theme of ${d.theme}.`,
    summaryTitle: "Year in Review",
    summary1: (y, d) => `In ${y}, the company focused on ${d.focus}, while maintaining cost discipline and service quality across all business units.`,
    summary2: (y, d) => `Performance reflected ${d.growth}% revenue growth, total revenue of THB ${formatNumber(d.revenue)} million and customer satisfaction of ${d.satisfaction}%.`,
    growthLabel: "Revenue growth",
    projectsLabel: "Strategic projects",
    satisfactionLabel: "Customer satisfaction",
    messageTitle: "Message to Shareholders",
    message1: (y) => `Throughout ${y}, Nova Group continued to make the organization more agile through technology, operating processes and enterprise customer care.`,
    message2: "We continue to balance growth, shareholder returns and social responsibility so the business can remain resilient over the long term.",
    quote: "We create measurable value through reliable services, capable teams and decisions grounded in real operating data.",
    companyTitle: "Company Overview",
    companyCopy: "Nova Group operates across enterprise solutions, digital services and partner networks, connecting technology, data and professional teams into scalable services.",
    info: [
      ["Vision", "To grow sustainably through innovation, reliability and accountable operations."],
      ["Mission", "To deliver simple, high-quality services that help customers achieve measurable business outcomes."],
      ["Business Scope", "Digital platforms, customer services, enterprise solutions and business support systems."]
    ],
    performanceTitle: "Performance by Business Unit",
    performanceIntro: "The company reports across three operating groups to show revenue, margin quality and growth opportunities in a clear structure.",
    units: (d) => [
      ["Digital Solutions", `Revenue: THB ${formatNumber(Math.round(d.revenue * 0.41))} million`, "Growth was driven by enterprise adoption of platforms and online services."],
      ["Enterprise Services", `Revenue: THB ${formatNumber(Math.round(d.revenue * 0.36))} million`, "The business expanded across mid-sized and large enterprise customers with stronger after-sales support."],
      ["Partner Network", `Revenue: THB ${formatNumber(Math.round(d.revenue * 0.23))} million`, "Partner coverage improved and service standards were strengthened in priority regions."]
    ],
    highlightsTitle: "Key Highlights",
    highlights: (y, d) => [
      ["01", "Advanced digital services", `${d.projects} strategic projects improved service efficiency and reduced operating time for customers.`],
      ["02", "Strengthened reliability", `Monitoring and risk management processes were improved to support the growth profile of ${y}.`],
      ["03", "Created shareholder value", `Revenue grew ${d.growth}% while management improved earnings quality and reporting transparency.`]
    ],
    metricsTitle: "Key Metrics",
    metricHeaders: ["Metric", "Revenue", "Operating Profit", "Projects", "Satisfaction"],
    metricRow: (y, d) => [String(y), `THB ${formatNumber(d.revenue)}m`, `THB ${formatNumber(d.profit)}m`, d.projects, `${d.satisfaction}%`],
    futureTitle: "Future Direction",
    future: (y) => `After ${y}, the company will continue strengthening its digital platform, increasing data-led management and expanding recurring service revenue.`,
    downloadTitle: "Download the Full Report",
    downloadButton: "Download PDF English",
    switchLanguage: "Thai Version",
    footer: (y) => `Annual Report ${y} English Version`
  }
};

function formatNumber(value) {
  return Number(value).toLocaleString("en-US");
}

function toThaiFocus(focus) {
  const map = {
    "expanded customer data platform and improved service reliability": "การขยายแพลตฟอร์มข้อมูลลูกค้าและยกระดับความน่าเชื่อถือของบริการ",
    "strengthened operating discipline and partner coverage": "การเพิ่มวินัยด้านการดำเนินงานและขยายเครือข่ายพันธมิตร",
    "rebuilt demand through enterprise service packages": "การฟื้นตัวของความต้องการผ่านชุดบริการสำหรับลูกค้าองค์กร",
    "supported customers through hybrid work and remote operations": "การสนับสนุนลูกค้าในรูปแบบการทำงาน hybrid และ remote operations",
    "protected business continuity and accelerated online channels": "การรักษาความต่อเนื่องทางธุรกิจและเร่งช่องทางออนไลน์",
    "entered new regional accounts and upgraded core systems": "การขยายลูกค้าระดับภูมิภาคและยกระดับระบบหลัก",
    "improved customer support standards and delivery quality": "การยกระดับมาตรฐานบริการลูกค้าและคุณภาพการส่งมอบ",
    "built the first unified service platform for enterprise customers": "การสร้างแพลตฟอร์มบริการรวมสำหรับลูกค้าองค์กร",
    "developed internal capability and expanded specialist teams": "การพัฒนาความสามารถภายในและขยายทีมผู้เชี่ยวชาญ",
    "grew the partner network and standardized service delivery": "การขยายเครือข่ายพันธมิตรและมาตรฐานการส่งมอบบริการ",
    "improved internal processes and management reporting": "การปรับปรุงกระบวนการภายในและการรายงานเพื่อการบริหาร",
    "established the operating foundation for long-term growth": "การวางรากฐานการดำเนินงานเพื่อการเติบโตระยะยาว"
  };
  return map[focus] || focus;
}

function setText(id, value) {
  const element = document.getElementById(id);
  if (element) element.textContent = value;
}

function setHref(id, href, label) {
  const element = document.getElementById(id);
  if (element) {
    element.href = href;
    if (label) element.textContent = label;
  }
}

function renderList(id, items) {
  const container = document.getElementById(id);
  if (!container) return;
  container.innerHTML = items.map(([title, copy]) => `
    <div>
      <strong>${title}</strong>
      <span>${copy}</span>
    </div>
  `).join("");
}

function renderCards(id, items) {
  const container = document.getElementById(id);
  if (!container) return;
  container.innerHTML = items.map(([title, meta, copy]) => `
    <article>
      <strong>${title}</strong>
      <span>${meta}</span>
      <p>${copy}</p>
    </article>
  `).join("");
}

function renderHighlights(items) {
  const container = document.getElementById("highlight-grid");
  if (!container) return;
  container.innerHTML = items.map(([number, title, copy]) => `
    <article>
      <span>${number}</span>
      <h3>${title}</h3>
      <p>${copy}</p>
    </article>
  `).join("");
}

function renderMetrics(labelSet, data, selectedYear) {
  const head = document.getElementById("metrics-head");
  const body = document.getElementById("metrics-body");
  if (!head || !body) return;
  head.innerHTML = labelSet.metricHeaders.map((item) => `<th>${item}</th>`).join("");
  const current = labelSet.metricRow(selectedYear, data);
  const previousYear = selectedYear - 1;
  const previousData = reportYears[previousYear] || {
    revenue: Math.round(data.revenue * 0.94),
    profit: Math.round(data.profit * 0.91),
    projects: Math.max(data.projects - 3, 8),
    satisfaction: Math.max(data.satisfaction - 2, 65)
  };
  const previous = labelSet.metricRow(previousYear, previousData);
  body.innerHTML = [previous, current].map((row) => `
    <tr>${row.map((item) => `<td>${item}</td>`).join("")}</tr>
  `).join("");
}

function initReport() {
  const selectedYear = reportYears[year] ? year : 2024;
  const data = reportYears[selectedYear];
  const labelSet = labels[lang];
  const otherLang = lang === "th" ? "en" : "th";
  const pdfPath = `assets/pdf/annual-report-${selectedYear}-${lang}.pdf`;
  const switchPath = `report.html?year=${selectedYear}&lang=${otherLang}`;

  document.documentElement.lang = lang;
  document.title = `${selectedYear} Annual Report | ${labelSet.language} | Nova Group`;

  setText("report-language", labelSet.language);
  setText("report-title", `${selectedYear} Annual Report`);
  setText("report-subtitle", labelSet.subtitle(selectedYear, data));
  setText("summary-title", labelSet.summaryTitle);
  setText("summary-copy-1", labelSet.summary1(selectedYear, data));
  setText("summary-copy-2", labelSet.summary2(selectedYear, data));
  setText("metric-growth", `${data.growth}%`);
  setText("metric-projects", data.projects);
  setText("metric-satisfaction", `${data.satisfaction}%`);
  setText("metric-growth-label", labelSet.growthLabel);
  setText("metric-projects-label", labelSet.projectsLabel);
  setText("metric-satisfaction-label", labelSet.satisfactionLabel);
  setText("message-title", labelSet.messageTitle);
  setText("message-copy-1", labelSet.message1(selectedYear));
  setText("message-copy-2", labelSet.message2);
  setText("message-quote", labelSet.quote);
  setText("company-title", labelSet.companyTitle);
  setText("company-copy", labelSet.companyCopy);
  setText("performance-title", labelSet.performanceTitle);
  setText("performance-intro", labelSet.performanceIntro);
  setText("highlights-title", labelSet.highlightsTitle);
  setText("metrics-title", labelSet.metricsTitle);
  setText("future-title", labelSet.futureTitle);
  setText("future-copy", labelSet.future(selectedYear));
  setText("download-title", labelSet.downloadTitle);
  setText("footer-report-label", labelSet.footer(selectedYear));

  setHref("download-top", pdfPath, labelSet.downloadButton);
  setHref("download-bottom", pdfPath, labelSet.downloadButton);
  setHref("language-link", switchPath, labelSet.switchLanguage);
  setHref("language-link-bottom", switchPath, labelSet.switchLanguage);
  setHref("footer-language-link", switchPath, labelSet.switchLanguage);

  renderList("info-list", labelSet.info);
  renderCards("performance-grid", labelSet.units(data));
  renderHighlights(labelSet.highlights(selectedYear, data));
  renderMetrics(labelSet, data, selectedYear);
}

initReport();
