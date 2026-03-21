import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
    console.log("Launching puppeteer...");
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 630 });

    const logoPath = path.join(__dirname, '..', 'src', 'assets', 'MobiusTechLogo.png');
    const logoBuffer = fs.readFileSync(logoPath);
    const logoBase64 = logoBuffer.toString('base64');

    const html = `
    <!DOCTYPE html>
    <html>
    <head>
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
    
    :root {
      --bg-dark: #0a0a0a;
      --purple-main: #a855f7;
      --purple-glow: rgba(168, 85, 247, 0.5);
      --orange-main: #f97316;
      --orange-glow: rgba(249, 115, 22, 0.5);
      --text-primary: #ffffff;
    }
    body {
      margin: 0;
      background-color: var(--bg-dark);
      color: var(--text-primary);
      overflow: hidden;
      width: 1200px;
      height: 630px;
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
    }
    .isometric-grid {
      position: absolute;
      top: 0;
      left: 0;
      width: 200%;
      height: 200%;
      background-image: 
        linear-gradient(var(--purple-glow) 1px, transparent 1px),
        linear-gradient(90deg, var(--purple-glow) 1px, transparent 1px);
      background-size: 50px 50px;
      transform: rotateX(60deg) rotateZ(45deg) translate(-25%, -25%);
      opacity: 0.15;
      z-index: 1;
    }
    .neon-gradient-bg {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: radial-gradient(circle at 20% 30%, rgba(168, 85, 247, 0.15) 0%, transparent 50%),
                  radial-gradient(circle at 80% 70%, rgba(249, 115, 22, 0.1) 0%, transparent 50%);
      z-index: 0;
    }
    .content {
      display: flex;
      align-items: center;
      gap: 30px;
      z-index: 10;
    }
    .logo {
      height: 90px;
      filter: drop-shadow(0 0 30px var(--purple-glow));
    }
    .title {
      font-size: 55px;
      font-weight: 900;
      color: #ffffff;
      text-shadow: 0 0 20px rgba(168, 85, 247, 0.3);
      line-height: 1.1;
      white-space: nowrap;
    }
    .gradient-pipe {
      background: linear-gradient(to right, var(--purple-main), var(--orange-main));
      -webkit-background-clip: text;
      color: transparent;
      margin: 0 10px;
    }
    </style>
    </head>
    <body>
        <div class="neon-gradient-bg"></div>
        <div class="isometric-grid"></div>
        <div class="content">
            <img class="logo" src="data:image/png;base64,${logoBase64}" />
            <div class="title">MobiusTech <span class="gradient-pipe">|</span> Form</div>
        </div>
    </body>
    </html>
    `;

    console.log("Setting HTML content...");
    await page.setContent(html);
    
    // Wait for fonts to load
    await page.evaluateHandle('document.fonts.ready');
    
    // Slight delay to ensure gradient renders correctly
    await new Promise(r => setTimeout(r, 1000));
    
    const outPath = path.join(__dirname, '..', 'public', 'og-image.png');
    console.log("Saving screenshot to", outPath);
    await page.screenshot({ path: outPath });
    
    await browser.close();
    console.log("Done!");
})();
