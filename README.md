# create-ovk-app

สตาร์ทเตอร์ OREVRK PLUS — ธีมเดียวกับ orevrkplus.site, dev server ที่พอร์ต 3000, build ออกเป็น `dist/` ที่เอาไป deploy บนโฮสต์ไหนก็ได้

```sh
npx create-ovk-app@latest my-app
cd my-app
npm install
npm run dev
```

เปิด http://localhost:3000 แล้วแก้ไฟล์ใน `src/`

## เส้นทางไฟล์

| ก้อน | ที่อยู่ | ใช้ทำอะไร |
| --- | --- | --- |
| ต้นฉบับ | `src/` | โค้ดที่แก้ (`main.js`, `style.css`) |
| ไฟล์นิ่ง | `public/` | ก็อปขึ้น `dist/` ตรงๆ |
| ดูระหว่างทำ | `http://localhost:3000` | dev server ปิดแล้วหาย ไม่ใช่ไฟล์จริง |
| ผลลัพธ์ | `dist/` | เกิดจาก `npm run build` — ก้อนนี้คือของจริง |
| ไฟล์ส่งต่อ | `<ชื่อ>-dist.zip` | เกิดจาก `npm run export` |

## คำสั่ง

| คำสั่ง | ผลลัพธ์ |
| --- | --- |
| `npm run dev` | dev server ที่ http://localhost:3000 |
| `npm run build` | เขียนไฟล์จริงลง `dist/` |
| `npm run preview` | เสิร์ฟ `dist/` ที่ http://localhost:4173 เพื่อตรวจของจริง |
| `npm run export` | build แล้วแพ็กเป็น `<ชื่อ>-dist.zip` |
| `npm run deploy:cloudflare` | ทางเลือก ถ้าจะขึ้น Cloudflare |

## Deploy ที่ไหนก็ได้

หลัง `npm run build` เอาโฟลเดอร์ `dist/` หรือไฟล์ `npm run export` ไปวางที่โฮสต์ใดก็ได้

| โฮสต์ | วิธี |
| --- | --- |
| Netlify | ลาก `dist/` ไปที่ app.netlify.com/drop หรือ `npx netlify deploy --dir dist --prod` |
| Vercel | `npx vercel deploy dist --prod` |
| GitHub Pages | push เนื้อหา `dist/` ขึ้น branch `gh-pages` แล้วเปิด Pages |
| Cloudflare | `npm run deploy:cloudflare` |
| S3 / R2 / เว็บโฮสต์ทั่วไป | อัปโหลดเนื้อหา `dist/` ขึ้นไปทั้งโฟลเดอร์ |

ถ้าโฮสต์ถามค่า build: build command `npm run build`, output directory `dist`

## โครงสร้างที่สร้างให้

```
my-app/
  index.html
  src/main.js        หน้าเว็บและเมนู
  src/style.css      ธีม #050505 พื้นหลัง + #FF0000 แอ็กเซนต์ + Geist
  public/favicon.svg
  scripts/export.mjs แพ็ก dist/ เป็น zip
  vite.config.js     พอร์ต 3000 / 4173
  README.md          คู่มือเส้นทางไฟล์
```

## ข้อกำหนด

Node 20 ขึ้นไป

## License

MIT
