# Wheel of Fortune / גלגל המזל

## English

### Project Overview
The **Wheel of Fortune** repository collects the documentation, wiring diagrams, and supporting assets for a large-scale techno-art installation that combines a 10-meter LED ring, a central LED matrix, and motion sensors. The material in this repo mirrors the specification produced by the installation designers and centralizes everything needed to assemble, validate, and maintain the system over time.

### Repository Structure
- `docs/` – Static documentation website (Hebrew and English) with wiring diagrams, bill of materials, gallery, and simulator pages.
- `docs/assets/` – Shared images, fonts, and JavaScript used by the documentation site.
- `docs/en/` – English documentation bundle, including an English translation of the wiring guide and the `BOM.csv` spreadsheet.
- `serve.mjs` – Lightweight Node.js server for browsing the documentation locally and handling asset uploads.
- `uploads/` – Destination directory for files uploaded through the documentation interface.
- Additional ZIP/PDF resources – Source reference material from the designers that informed the documentation set.

### Getting Started Locally
1. Ensure [Node.js](https://nodejs.org/) 18 or newer is installed.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the local docs server:
   ```bash
   node serve.mjs
   ```
4. Open `http://localhost:8000` in your browser to explore the documentation site. The server automatically serves `docs/index.html` and all supporting assets.

### Upload Endpoint
The local server exposes a `POST /upload` endpoint powered by [`formidable`](https://www.npmjs.com/package/formidable). Files uploaded via the documentation interface are saved into the `uploads/` folder using their original filenames (up to 10 MB each). This allows collaborators to exchange updated diagrams or spreadsheets while previewing the static site.

### Contributing Updates
- Update HTML pages or assets directly inside `docs/`. Keep both the Hebrew root pages and the English versions under `docs/en/` in sync.
- When editing the bill of materials, update `docs/en/BOM.csv` and any mirrored Hebrew tables to ensure consistency.
- If you add new supporting files, remember to reference them from the appropriate HTML page so they appear in the documentation site.
- Run the local server after changes to verify that links, diagrams, and uploads behave as expected.

### Additional Resources
The repository also contains the original design PDFs and archives supplied by the project partners. These files provide the authoritative specifications for power distribution, controller logic, and physical assembly.

---

## עברית

### סקירת הפרויקט
מאגר **גלגל המזל** מרכז את התיעוד, תרשימי החיווט והמשאבים הנלווים למיצב טֶכנוֹ־אומנותי רחב־היקף הכולל טבעת לד בקוטר 10 מטר, מטריצת לד מרכזית וחיישני תנועה. התוכן במאגר משקף את המפרט שנמסר על ידי צוות התכנון ומאפשר לבנות, לבדוק ולתחזק את המערכת לאורך זמן ממקום אחד מרוכז.

### מבנה המאגר
- `docs/` – אתר תיעוד סטטי (עברית ואנגלית) עם תרשימי חיווט, רשימת רכיבים, גלריה וסימולטור.
- `docs/assets/` – תמונות, פונטים וקבצי JavaScript משותפים המשמשים את אתר התיעוד.
- `docs/en/` – חבילת התיעוד באנגלית, כולל תרגום מלא של מדריך החיווט וקובץ `BOM.csv`.
- `serve.mjs` – שרת Node.js קליל לגלישה מקומית בתיעוד ולקבלת קבצים שהועלו.
- `uploads/` – תיקיית היעד לקבצים שמועלים דרך ממשק האתר (שומרים את שם הקובץ המקורי עד 10MB).
- קובצי ZIP/PDF נוספים – חומרי מקור שנמסרו מהמעצבים ומהווים בסיס לכל סט התיעוד.

### התחלת עבודה מקומית
1. ודאו ש- [Node.js](https://nodejs.org/) בגרסה 18 ומעלה מותקן.
2. התקינו את התלויות:
   ```bash
   npm install
   ```
3. הפעילו את שרת התיעוד המקומי:
   ```bash
   node serve.mjs
   ```
4. פתחו את `http://localhost:8000` בדפדפן כדי לסייר באתר התיעוד. השרת מגיש אוטומטית את `docs/index.html` ואת כל המשאבים הנלווים.

### נקודת העלאת קבצים
השרת המקומי מספק נתיב `POST /upload` המבוסס על הספרייה [`formidable`](https://www.npmjs.com/package/formidable). קבצים שמועלים דרך ממשק התיעוד נשמרים בתיקיית `uploads/` בשם המקורי שלהם (עד 10MB לקובץ). כך ניתן לשתף דיאגרמות או גיליונות מעודכנים בזמן שמדפדפים באתר.

### עדכון התיעוד
- עדכנו עמודי HTML או משאבים ישירות בתוך `docs/`. שמרו על התאמה בין הגרסה העברית בשורש לבין הגרסה האנגלית תחת `docs/en/`.
- בעת עריכת רשימת הרכיבים, עדכנו את `docs/en/BOM.csv` ואת הטבלאות העבריות המקבילות כדי לוודא אחידות.
- אם נוספו קבצים תומכים חדשים, ודאו שהם מקושרים בעמוד המתאים כדי שיופיעו באתר.
- הריצו את השרת המקומי לאחר שינויים כדי לוודא שהקישורים, התרשימים והעלאת הקבצים פועלים כראוי.

### משאבים נוספים
במאגר זמינים גם קובצי התכנון המקוריים (PDF וארכיונים) שסופקו על ידי שותפי הפרויקט. קבצים אלו מהווים מקור סמכותי לחלוקת החשמל, לוגיקת הבקרה ולהרכבה הפיזית.

