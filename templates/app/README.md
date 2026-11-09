# __APP_NAME__

สตาร์ทเตอร์ OREVRK PLUS — ธีมเดียวกับ orevrkplus.site, dev ที่พอร์ต 3000, build ออกเป็น dist/ ที่พกไป deploy ได้ทุกที่

## เส้นทางไฟล์

| ก้อน | ที่อยู่ | ใช้ทำอะไร |
| --- | --- | --- |
| ต้นฉบับ | `src/` | โค้ดที่แก้ |
| ไฟล์นิ่ง | `public/` | ก็อปขึ้น dist/ ตรงๆ |
| ดูระหว่างทำ | `http://localhost:3000` | เซิร์ฟเวอร์ชั่วคราว ไม่ใช่ไฟล์จริง |
| ผลลัพธ์ | `dist/` | เกิดจาก `npm run build` — ก้อนนี้คือของจริง |
| ไฟล์ส่งต่อ | `__APP_NAME__-dist.zip` | เกิดจาก `npm run export` เอาไปอัปโหลดที่ไหนก็ได้ |

## คำสั่ง

```sh
npm install
npm run dev       # http://localhost:3000 แก้ src/ แล้วรีเฟรชเอง
npm run build     # เขียนไฟล์จริงลง dist/
npm run preview   # ดู dist/ จริงที่ http://localhost:4173
npm run export    # build แล้วแพ็กเป็น __APP_NAME__-dist.zip
```

## จะเอาไป deploy ที่ไหนก็ได้

หลัง `npm run build` ให้เอาโฟลเดอร์ `dist/` หรือไฟล์ `__APP_NAME__-dist.zip` ไปวางที่โฮสต์ใดก็ได้ ไม่ผูกกับเจ้าไหน

| โฮสต์ | วิธี |
| --- | --- |
| Netlify | ลากโฟลเดอร์ dist ไปที่ app.netlify.com/drop หรือ `npx netlify deploy --dir dist --prod` |
| Vercel | `npx vercel deploy dist --prod` |
| GitHub Pages | push dist ขึ้น branch `gh-pages` แล้วเปิด Pages |
| Cloudflare | `npm run deploy:cloudflare` |
| S3 / R2 / เว็บโฮสต์ทั่วไป | อัปโหลดเนื้อหาของ dist/ ขึ้นไปทั้งโฟลเดอร์ |

ถ้าโฮสต์ถามค่า build ให้ใส่: build command `npm run build`, output directory `dist`

## เก็บโค้ดขึ้น repo

```sh
git init -b main
git add -A
git commit -m "initial commit"
git remote add origin <repo-url>
git push -u origin main
```

`dist/` ถูก ignore ไว้ เพราะสร้างใหม่ได้ทุกครั้งด้วย `npm run build` — แต่ถ้าโฮสต์อ่านจาก repo โดยตรง ให้ตั้ง build command ตามด้านบน
