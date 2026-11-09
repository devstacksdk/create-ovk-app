import './style.css';

const app = document.querySelector('#app');

const icon = (name) => {
  const paths = {
    code: '<path d="M8 6 3 12l5 6M16 6l5 6-5 6"/>',
    layers: '<path d="M12 3 3 8l9 5 9-5-9-5Z"/><path d="m3 13 9 5 9-5"/>',
    cloud: '<path d="M6 17a3.5 3.5 0 0 1 .4-6.98A5 5 0 0 1 16 9.5a3.75 3.75 0 0 1 .5 7.5"/><path d="M12 12v7"/><path d="m9 16 3-3 3 3"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  };
  return `<svg viewBox="0 0 24 24" aria-hidden="true">${paths[name]}</svg>`;
};

const features = [
  { icon: 'code', label: 'สร้างโปรเจกต์' },
  { icon: 'layers', label: 'ปรับแก้โค้ด' },
  { icon: 'cloud', label: 'Deploy ขึ้นคลาวด์' },
  { icon: 'grid', label: 'ต่อยอดด้วยเทมเพลต' },
];

const pathNodes = [
  { step: '01 ต้นฉบับ', title: 'src/', copy: 'โค้ดที่คุณแก้ ไฟล์จริงอยู่ในนี้' },
  { step: '02 ดูระหว่างทำ', title: 'localhost:3000', copy: 'เซิร์ฟเวอร์ชั่วคราว ปิดแล้วหาย ไม่ใช่เว็บ' },
  { step: '03 สร้างไฟล์จริง', title: 'npm run build', copy: 'รวมทุกอย่างเป็นไฟล์เปิดได้ ลงใน dist/' },
  { step: '04 เอาขึ้นเน็ต', title: 'dist/', copy: 'โฟลเดอร์เดียวที่เอาไปวางบนโฮสต์ไหนก็ได้' },
];

const steps = [
  { cmd: 'npm install', hint: 'ติดตั้งครั้งแรกครั้งเดียว' },
  { cmd: 'npm run dev', hint: 'เปิด http://localhost:3000 แก้โค้ดแล้วรีเฟรชเอง' },
  { cmd: 'npm run build', hint: 'ได้โฟลเดอร์ dist/ ที่เอาไป deploy ได้จริง' },
  { cmd: 'npm run export', hint: 'แพ็ก dist/ เป็นไฟล์ zip สำหรับอัปโหลดที่โฮสต์ใดก็ได้' },
  { cmd: 'git add -A && git commit -m "ready" && git push', hint: 'เก็บโค้ดขึ้น repo ของคุณเอง แล้วให้โฮสต์นั้น build จาก repo' },
];

app.innerHTML = `
<div class="glow"></div>
<header class="top">
  <div class="wrap top-inner">
    <a class="brand" href="/"><span class="mark">O+</span><span>orevrkplus</span></a>
    <button class="menu-btn" id="menuBtn" aria-label="เปิดเมนู" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </div>
</header>
<nav class="menu" id="menu">
  <a href="#path-map">เส้นทางไฟล์</a>
  <a href="#steps">เริ่มใช้งาน</a>
  <a href="https://orevrkplus.site/docs">เอกสารการใช้งาน</a>
</nav>

<main>
  <section class="hero">
    <div class="wrap">
      <h1>orevrkplus</h1>
      <p class="tag">Build · Edit · Deploy</p>
      <p class="lead">แพลตฟอร์มสำหรับสร้างและต่อยอดโปรเจกต์ด้วย AI</p>
      <div class="features">
        ${features.map((f) => `<div class="feature">${icon(f.icon)}<span>${f.label}</span></div>`).join('')}
      </div>
      <div class="cta">
        <a class="btn primary" href="#steps">เริ่มสร้างโปรเจกต์ →</a>
        <a class="btn ghost" href="https://orevrkplus.site/docs">ดูเอกสารการใช้งาน</a>
      </div>
    </div>
  </section>

  <section class="block" id="path-map">
    <div class="wrap">
      <p class="eyebrow">Path map</p>
      <h2>โค้ดอยู่ไหน ไฟล์จริงอยู่ไหน</h2>
      <p class="sub">อ่านสี่ช่องนี้ครั้งเดียว แล้วจะรู้ว่าอะไรคือที่แก้ อะไรคือที่ deploy</p>
      <div class="pathmap">
        ${pathNodes.map((n) => `<article class="node"><p class="step">${n.step}</p><h3>${n.title}</h3><p>${n.copy}</p></article>`).join('')}
      </div>
    </div>
  </section>

  <section class="block" id="steps">
    <div class="wrap">
      <p class="eyebrow">Step by step</p>
      <h2>สี่คำสั่งจากศูนย์ถึงเว็บจริง</h2>
      <p class="sub">รันตามลำดับในโฟลเดอร์โปรเจกต์ ไม่ต้องตั้งค่าอะไรก่อน</p>
      <div class="steps">
        ${steps.map((s, i) => `
          <div class="step-row">
            <span class="num">${String(i + 1).padStart(2, '0')}</span>
            <div><code>${s.cmd}</code><span class="hint">${s.hint}</span></div>
            <button class="copy" data-cmd="${s.cmd}">คัดลอก</button>
          </div>`).join('')}
      </div>
    </div>
  </section>
</main>

<footer class="wrap">
  <span>orevrkplus starter · Vite + Cloudflare</span>
  <a href="https://orevrkplus.site">orevrkplus.site</a>
</footer>
`;

const menuBtn = document.querySelector('#menuBtn');
const menu = document.querySelector('#menu');
menuBtn.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(open));
});
menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => {
  menu.classList.remove('open');
  menuBtn.setAttribute('aria-expanded', 'false');
}));

document.querySelectorAll('.copy').forEach((btn) => {
  btn.addEventListener('click', async () => {
    const cmd = btn.getAttribute('data-cmd');
    try {
      await navigator.clipboard.writeText(cmd);
      btn.textContent = 'คัดลอกแล้ว';
      setTimeout(() => { btn.textContent = 'คัดลอก'; }, 1500);
    } catch (_error) {
      btn.textContent = 'คัดลอกไม่ได้';
    }
  });
});
