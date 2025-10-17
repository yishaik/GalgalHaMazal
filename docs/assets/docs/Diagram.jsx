import React from "react";

// תרשים חיווט מפורט ל"גלגל המזל" – היקף 10 מ׳, תצורה A (GX16‑3 משולב כוח+דאטה)
// הנחיות שימוש:
// 1) כל צבע בקווים מייצג פונקציה: אדום=V+, שחור=GND, ירוק=DATA, כחול=UART, סגול=חיישנים.
// 2) לחץ על מקרא/כרטיס כדי לראות פרטים טכניים (AWG, פיוזים, פין-אאוט).
// 3) ניתן להדפיס את המסמך – הפריסה מותאמת A4 רוחבי.

export default function Diagram() {
  return (
    <div className="w-full min-h-screen bg-gray-50 text-gray-900 p-6" dir="rtl">
      {/* כותרת */}
      <header className="max-w-6xl mx-auto mb-6">
        <h1 className="text-3xl font-bold">תרשים חיווט – גלגל המזל (היקף 10 מ׳) · תצורה A</h1>
        <p className="text-sm text-gray-600 mt-1">GX16‑3 משולב כוח+דאטה · פס הפצה מרכזי · חיישני Hall במרחק ~2 מ׳</p>
      </header>

      <main className="grid grid-cols-1 2xl:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {/* תרשים SVG כללי */}
        <section className="bg-white rounded-2xl shadow p-4">
          <h2 className="text-xl font-semibold mb-2">מפת חיווט כללית (SVG)</h2>
          <p className="text-sm text-gray-600 mb-4">הקווים הצבעוניים מייצגים חוטים בפועל. נקודות הזרקת כוח מסומנות סביב הטבעת כל ~2 מ׳ (סה"כ 5 נק׳). שמור על GND משותף עבה לכל המערכת.</p>
          <div className="w-full overflow-auto">
            <svg viewBox="0 0 1200 740" className="w-full h-auto">
              {/* רקע */}
              <rect x="0" y="0" width="1200" height="740" fill="#ffffff"/>

              {/* ארון בקרה + ספקים */}
              <g>
                <rect x="40" y="60" width="380" height="220" rx="16" fill="#f8fafc" stroke="#94a3b8"/>
                <text x="230" y="85" textAnchor="middle" fontSize="16" fontWeight="700">ארון בקרה</text>

                {/* IEC C14 + מפסק */}
                <rect x="60" y="110" width="90" height="36" rx="6" fill="#111827"/>
                <text x="105" y="133" textAnchor="middle" fontSize="11" fill="#ffffff">IEC C14</text>

                {/* פיוזים 5x20 */}
                <rect x="170" y="108" width="70" height="40" rx="6" fill="#fee2e2" stroke="#ef4444"/>
                <text x="205" y="132" textAnchor="middle" fontSize="11">פיוזים 5×20</text>
                <text x="205" y="146" textAnchor="middle" fontSize="10" fill="#ef4444">T‑10A (24V) · T‑15A (5V)</text>

                {/* ספק 24V */}
                <rect x="60" y="170" width="160" height="90" rx="10" fill="#e0f2fe" stroke="#0284c7"/>
                <text x="140" y="195" textAnchor="middle" fontSize="12" fontWeight="700">ספק 24V</text>
                <text x="140" y="214" textAnchor="middle" fontSize="10">300W</text>
                <text x="140" y="232" textAnchor="middle" fontSize="10">יציאה: +24V / GND</text>

                {/* ספק 5V */}
                <rect x="240" y="170" width="160" height="90" rx="10" fill="#dcfce7" stroke="#16a34a"/>
                <text x="320" y="195" textAnchor="middle" fontSize="12" fontWeight="700">ספק 5V</text>
                <text x="320" y="214" textAnchor="middle" fontSize="10">60A</text>
                <text x="320" y="232" textAnchor="middle" fontSize="10">יציאה: +5V / GND</text>

                {/* פס הפצה מרכזי */}
                <rect x="40" y="310" width="380" height="80" rx="12" fill="#f1f5f9" stroke="#64748b"/>
                <text x="230" y="330" textAnchor="middle" fontSize="12" fontWeight="700">פס הפצה מרכזי</text>
                <text x="230" y="350" textAnchor="middle" fontSize="10">24V, 5V, GND משותף (GND 2.5 מ"מ²)</text>

                {/* חיבורי ספקים לפס – אדום/שחור */}
                {/* 24V */}
                <line x1="140" y1="260" x2="140" y2="310" stroke="#ef4444" strokeWidth="4"/>
                <line x1="120" y1="260" x2="120" y2="310" stroke="#111827" strokeWidth="4"/>
                {/* 5V */}
                <line x1="320" y1="260" x2="320" y2="310" stroke="#ef4444" strokeWidth="4"/>
                <line x1="300" y1="260" x2="300" y2="310" stroke="#111827" strokeWidth="4"/>
              </g>

              {/* GX16-3 יציאות מהפס לטבעת ולמטריצה */}
              <g>
                {/* לבל */}
                <text x="60" y="420" fontSize="12" fontWeight="700">יציאות GX16‑3 מפס ההפצה</text>

                {/* נקודות GX לטבעת ולמטריצה */}
                <rect x="60" y="430" width="160" height="70" rx="10" fill="#fff7ed" stroke="#fb923c"/>
                <text x="140" y="450" textAnchor="middle" fontSize="12">GX16‑3 → טבעת 24V</text>
                <text x="140" y="468" textAnchor="middle" fontSize="10">[1:+24V | 2:GND | 3:DATA]</text>

                <rect x="260" y="430" width="160" height="70" rx="10" fill="#fefce8" stroke="#eab308"/>
                <text x="340" y="450" textAnchor="middle" fontSize="12">GX16‑3 → מטריצה 5V</text>
                <text x="340" y="468" textAnchor="middle" fontSize="10">[1:+5V | 2:GND | 3:DATA]</text>

                {/* כבלי יציאה מהפס אל ה-GX */}
                {/* טבעת 24V */}
                <line x1="140" y1="390" x2="140" y2="430" stroke="#ef4444" strokeWidth="4"/>
                <line x1="120" y1="390" x2="120" y2="430" stroke="#111827" strokeWidth="4"/>
                <line x1="100" y1="390" x2="100" y2="430" stroke="#22c55e" strokeDasharray="6 4" strokeWidth="3"/>
                {/* מטריצה 5V */}
                <line x1="320" y1="390" x2="320" y2="430" stroke="#ef4444" strokeWidth="4"/>
                <line x1="300" y1="390" x2="300" y2="430" stroke="#111827" strokeWidth="4"/>
                <line x1="280" y1="390" x2="280" y2="430" stroke="#22c55e" strokeDasharray="6 4" strokeWidth="3"/>
              </g>

              {/* טבעת 10 מ׳ עם 5 נק׳ הזרקה */}
              <g>
                <rect x="520" y="40" width="640" height="640" rx="24" fill="#f8fafc" stroke="#cbd5e1"/>
                <text x="840" y="66" textAnchor="middle" fontSize="14" fontWeight="700">הטבעת – היקף 10 מ׳</text>

                {/* עיגול הטבעת */}
                <circle cx="840" cy="360" r="250" fill="none" stroke="#9ca3af" strokeWidth="10"/>
                <text x="840" y="360" textAnchor="middle" fontSize="12" fill="#6b7280">WS2814 · 24V · 160 מקטעים</text>

                {/* נק׳ הזרקה כל ~2 מ׳ (5 נקודות) */}
                {Array.from({ length: 5 }).map((_, i) => {
                  const angle = (i * 72 - 90) * (Math.PI / 180);
                  const x = 840 + Math.cos(angle) * 250;
                  const y = 360 + Math.sin(angle) * 250;
                  const xInner = 840 + Math.cos(angle) * 210;
                  const yInner = 360 + Math.sin(angle) * 210;
                  return (
                    <g key={i}>
                      <circle cx={x} cy={y} r="10" fill="#ef4444" stroke="#111827"/>
                      <line x1={x} y1={y} x2={xInner} y2={yInner} stroke="#111827" strokeWidth="3"/>
                      <text x={xInner} y={yInner} fontSize="10" textAnchor="middle" fill="#111827">הזרקה</text>
                    </g>
                  );
                })}

                {/* כבל GX16‑3 לטבעת – כוח + GND + DATA */}
                <path d="M 220 465 C 420 465, 520 360, 600 360" stroke="#ef4444" strokeWidth="4" fill="none"/>
                <path d="M 210 470 C 410 470, 520 370, 600 370" stroke="#111827" strokeWidth="4" fill="none"/>
                <path d="M 200 475 C 400 475, 520 380, 600 380" stroke="#22c55e" strokeWidth="3" strokeDasharray="6 4" fill="none"/>
                <circle cx="600" cy="370" r="8" fill="#fb923c" stroke="#78350f"/>
                <text x="600" y="390" fontSize="11" textAnchor="middle">GX16‑3 לטבעת</text>

                {/* מטריצה 5V (מיוצגת כמלבן) */}
                <rect x="760" y="300" width="160" height="120" rx="8" fill="#dcfce7" stroke="#16a34a"/>
                <text x="840" y="318" textAnchor="middle" fontSize="12" fontWeight="700">מטריצה 32×32</text>
                <text x="840" y="336" textAnchor="middle" fontSize="10">5V · WS2812B</text>

                {/* כבל GX16‑3 למטריצה – כוח + GND + DATA */}
                <path d="M 420 465 C 540 520, 660 520, 780 430" stroke="#ef4444" strokeWidth="4" fill="none"/>
                <path d="M 410 470 C 530 525, 650 525, 770 435" stroke="#111827" strokeWidth="4" fill="none"/>
                <path d="M 400 475 C 520 530, 640 530, 760 440" stroke="#22c55e" strokeWidth="3" strokeDasharray="6 4" fill="none"/>
                <circle cx="760" cy="440" r="8" fill="#eab308" stroke="#713f12"/>
                <text x="760" y="458" fontSize="11" textAnchor="middle">GX16‑3 למטריצה</text>

                {/* חיישני Hall – 2 מ׳ מהבקר (כאן משויכים לימין המסך) */}
                {/* חיישן A */}
                <circle cx="1040" cy="200" r="12" fill="#ede9fe" stroke="#7c3aed"/>
                <text x="1040" y="190" textAnchor="middle" fontSize="10">Hall A</text>
                <path d="M 1040 200 C 960 220, 880 240, 800 260" stroke="#7c3aed" strokeWidth="2" fill="none"/>
                <text x="942" y="230" fontSize="10" fill="#7c3aed">3×22‑24AWG מסוכך · ~2 מ׳</text>

                {/* חיישן B */}
                <circle cx="1040" cy="520" r="12" fill="#ede9fe" stroke="#7c3aed"/>
                <text x="1040" y="510" textAnchor="middle" fontSize="10">Hall B</text>
                <path d="M 1040 520 C 960 500, 880 480, 800 460" stroke="#7c3aed" strokeWidth="2" fill="none"/>

              </g>

              {/* מקרא צבעים */}
              <g>
                <rect x="40" y="540" width="380" height="140" rx="12" fill="#ffffff" stroke="#94a3b8"/>
                <text x="230" y="562" textAnchor="middle" fontSize="13" fontWeight="700">מקרא צבעים וחוטים</text>
                {/* אדום */}
                <line x1="60" y1="585" x2="100" y2="585" stroke="#ef4444" strokeWidth="4"/>
                <text x="115" y="589" fontSize="12">V+ 5V / 24V · 1.5–2.5 מ"מ² (AWG16–14)</text>
                {/* שחור */}
                <line x1="60" y1="605" x2="100" y2="605" stroke="#111827" strokeWidth="4"/>
                <text x="115" y="609" fontSize="12">GND משותף · 2.5 מ"מ² לפס הראשי</text>
                {/* ירוק */}
                <line x1="60" y1="625" x2="100" y2="625" stroke="#22c55e" strokeWidth="3" strokeDasharray="6 4"/>
                <text x="115" y="629" fontSize="12">DATA WS281x · 22AWG מסוכך + נגד 330Ω</text>
                {/* כחול */}
                <line x1="60" y1="645" x2="100" y2="645" stroke="#3b82f6" strokeWidth="3"/>
                <text x="115" y="649" fontSize="12">UART/I²C · 24–26AWG זוג שזור</text>
                {/* סגול */}
                <line x1="60" y1="665" x2="100" y2="665" stroke="#7c3aed" strokeWidth="3"/>
                <text x="115" y="669" fontSize="12">חיישני Hall · כבל 3 ליבות מסוכך 22–24AWG</text>
              </g>
            </svg>
          </div>
        </section>

        {/* כרטיסי מפרטים */}
        <section className="space-y-4">
          <div className="bg-white rounded-2xl shadow p-4">
            <h3 className="text-lg font-semibold">פין‑אאוטים קבועים (שמור עקביות בכל הזוגות)</h3>
            <ul className="mt-2 text-sm leading-7">
              <li><b>GX16‑3 לטבעת 24V:</b> 1=+24V · 2=GND · 3=DATA</li>
              <li><b>GX16‑3 למטריצה 5V:</b> 1=+5V · 2=GND · 3=DATA</li>
              <li><b>JST‑SM 3‑Pin (לפי פס):</b> בדרך כלל 1=+V · 2=DATA · 3=GND (בדוק הדפסת החץ/IN)</li>
              <li><b>JST‑XH 3‑Pin (Hall):</b> VCC (5V/3.3V) · GND · SIG</li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl shadow p-4">
            <h3 className="text-lg font-semibold">גדלי חוטים (AWG/מ"מ²) לפי מקטע</h3>
            <ul className="mt-2 text-sm leading-7">
              <li>כוח 24V/5V למודולים: <b>1.5–2.5 מ"מ² (AWG16–14)</b></li>
              <li>GND ראשי (פס): <b>2.5 מ"מ²</b></li>
              <li>DATA WS281x: <b>22 AWG מסוכך</b> + נגד 330Ω בטור + קבל 1000µF על 5V במטריצה</li>
              <li>Hall (2×): <b>כבל מסוכך 3 ליבות 22–24AWG</b> עד 2 מ׳</li>
              <li>UART/I²C קצר: <b>24–26 AWG</b> זוג שזור</li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl shadow p-4">
            <h3 className="text-lg font-semibold">פיוזים והגנות</h3>
            <ul className="mt-2 text-sm leading-7">
              <li>כניסת 24V: <b>T‑10A</b> (5×20mm)</li>
              <li>כניסת 5V: <b>T‑15A</b> (5×20mm)</li>
              <li>מיקום: <b>כמה שיותר קרוב לספקים</b>, לפני היציאה לפס</li>
              <li>GND משותף: <b>חובה</b> בין כל הספקים והמודולים</li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl shadow p-4">
            <h3 className="text-lg font-semibold">אורכי הזרקה מומלצים לטבעת 10 מ׳</h3>
            <ul className="mt-2 text-sm leading-7">
              <li>5 נק׳ הזרקת כוח (כל ~2 מ׳) – להפחית נפילות מתח ולהשיג אחידות בהירות</li>
              <li>שמור על <b>DATA קצר</b> ככל האפשר (≤1 מ׳) מהבקר/פס עד נקודת ה‑IN</li>
              <li>השתמש ב‑<b>חוטים זוגיים</b> (V+/GND) בכוח, ודאג לחיבור GND סמוך ל‑DATA</li>
            </ul>
          </div>
        </section>
      </main>

      <footer className="max-w-6xl mx-auto mt-6 text-xs text-gray-500">
        © תרשים מותאם אישית · גלגל המזל · היקף 10 מ׳ · תצורה A · צבעים: אדום=V+, שחור=GND, ירוק=DATA, כחול=UART, סגול=חיישנים
      </footer>
    </div>
  );
}