const path = require('path');
const fs = require('fs');
const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 10000;
const pool = process.env.DATABASE_URL ? new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } }) : null;
app.use(express.json({ limit: '1mb' }));

const pageFiveCss = `<style>
.page-five-gallery{min-height:100svh;box-sizing:border-box;padding:28px 24px 40px;background:linear-gradient(145deg,#fffaf4,#edf5f1);text-align:center;overflow:hidden}
.page-five-gallery h1{margin:0 0 24px;color:#24332f;font-size:clamp(30px,6vw,58px);font-family:Georgia,serif;font-style:italic}
.page-five-grid{max-width:900px;margin:auto;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));grid-template-rows:repeat(2,1fr);gap:0 16px;align-items:center}
.page-five-grid figure{position:relative;margin:-18px;padding:10px;background:#fff;border-radius:22px;box-shadow:0 14px 30px #24332f2b;z-index:1;transition:transform .25s ease,box-shadow .25s ease}
.page-five-grid figure:nth-child(1){transform:rotate(-7deg);z-index:4}.page-five-grid figure:nth-child(2){transform:rotate(6deg);z-index:3}.page-five-grid figure:nth-child(3){transform:rotate(5deg);z-index:2}.page-five-grid figure:nth-child(4){transform:rotate(-8deg);z-index:3}
.page-five-grid figure:before{content:"";position:absolute;top:-7px;left:50%;width:54px;height:16px;transform:translateX(-50%) rotate(-4deg);background:#f4b7a5cc;border-radius:2px;z-index:2}
.page-five-grid figure:nth-child(2):before{background:#b9d9c7cc;transform:translateX(-50%) rotate(5deg)}.page-five-grid figure:nth-child(3):before{background:#c9b9e8cc;transform:translateX(-50%) rotate(-7deg)}.page-five-grid figure:nth-child(4):before{background:#f1d18dcc;transform:translateX(-50%) rotate(4deg)}
.page-five-grid figure:hover{transform:rotate(0deg) scale(1.04);box-shadow:0 20px 34px #24332f35;z-index:10}.page-five-grid img{display:block;width:100%;height:330px;object-fit:cover;border-radius:15px}
@media(max-width:700px){.page-five-gallery{padding:18px 12px 28px}.page-five-gallery h1{font-size:32px;margin-bottom:18px}.page-five-grid{gap:0 8px}.page-five-grid figure{margin:-10px;padding:6px;border-radius:15px}.page-five-grid img{height:190px;border-radius:10px}.page-five-grid figure:before{width:34px;height:10px;top:-4px}.page-five-grid figure:hover{transform:rotate(0deg) scale(1.02)}}
.page-five-next{display:block;margin:28px auto 0;border:0;border-radius:999px;padding:13px 32px;background:#24332f;color:#fff;font-size:17px;font-weight:800;cursor:pointer}
.site-home-icon{position:fixed;top:20px;left:24px;z-index:50;width:48px;height:48px;border-radius:14px;background:#ed9275;color:#24332f;text-decoration:none;display:grid;place-items:center;font-size:28px;font-weight:800;box-shadow:0 8px 18px #24332f25}
.page-number-label{position:fixed;bottom:8px;left:50%;transform:translateX(-50%);z-index:50;border-top:1px solid #24332f55;padding:5px 22px 0;color:#24332f99;font-size:11px;letter-spacing:.08em}
</style>`;

function decoratePage(html, page) {
  let result = html.replace(/Being horny is completely normal\./g, 'These Feelings, Emotions and Hormones are completely normal.')
    .replace(/Being horny is a fundamental of being a living creature\./g, 'These Feelings, Emotions and Hormones are completely normal.')
    .replace(/Feelings, emotions, and hormones are completely normal\./g, 'These Feelings, Emotions and Hormones are completely normal.')
    .replace(/<section class="card" style="margin-top:18px">[\s\S]*?<\/section>/, '')
    .replace('<span>Made for choice, not shame.</span>', '');
  if (page >= 4) result = result.replace('</head>', '<style>html.blank-forward body>*{display:none!important}</style></head>');
  if (page >= 6) result = result.replace(/<body[^>]*>[\s\S]*?<\/body>/i, '<body></body>');
  if (page === 5) {
    const gallery = `<a class="site-home-icon" href="/" aria-label="Homepage">↗</a><main class="page-five-gallery"><h1>A little sky, a little joy</h1><div class="page-five-grid"><figure><img src="/page5-photo-1.jpg" alt="Clouds with a pink heart"></figure><figure><img src="/page5-photo-5.png" alt="Bare tree branches"></figure><figure><img src="/page5-photo-6.png" alt="Trees in the fog"></figure><figure><img src="/page5-photo-7.png" alt="Pink evening sky"></figure></div><button class="page-five-next" onclick="location.href=location.pathname+'?page=6'">Next</button></main><script>setInterval(function(){document.querySelectorAll("button").forEach(function(b){if(b.textContent.trim()==="Skip")b.remove()})},100)</script>`;
    result = result.replace(/<body[^>]*>[\s\S]*?<\/body>/i, `<body>${pageFiveCss}${gallery}</body>`);
  } else {
    result = result.replace('</head>', '<style>html,body{overflow-x:hidden}@media(max-width:700px){html,body{height:auto!important;min-height:100%;overflow-y:auto!important}main{height:auto!important;min-height:0!important;overflow:visible!important;padding-bottom:110px!important}.toprow .steps{grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:3px!important}.toprow .steps .step{padding:5px 2px!important;min-width:0!important}.toprow .steps .step strong{font-size:9px!important}.toprow .steps .step span{font-size:7px!important;line-height:1.05!important}}</style></head>');
    result = result.replace('</body>', `<div class="page-number-label">Page ${page || 1}</div><script src="/feedback.js?v=4"></script><script src="/pwa.js?v=2"></script><script src="/streak.js?v=1"></script></body>`);
    if (page > 1) result = result.replace('</body>', '<a class="site-home-icon" href="/" aria-label="Homepage">↗</a><script>setInterval(function(){if(!document.querySelector(".site-home-icon")){var a=document.createElement("a");a.className="site-home-icon";a.href="/";a.setAttribute("aria-label","Homepage");a.textContent="↗";document.body.appendChild(a)}},100)</script></body>');
  }
  return result;
}

app.get('/', (req, res) => { const page = Number.parseInt(req.query.page || '0', 10) || 0; const source = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8'); res.set('Cache-Control', 'no-store'); res.type('html').send(decoratePage(source, page)); });
app.get('/streak.js', (req, res) => { res.set('Cache-Control', 'no-store, no-cache, must-revalidate'); res.sendFile(path.join(__dirname, 'streak.js')); });
app.use(express.static(__dirname));
async function initDb() { if (pool) await pool.query('CREATE TABLE IF NOT EXISTS feedback (id BIGSERIAL PRIMARY KEY, message TEXT NOT NULL, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW())'); }
app.post('/api/feedback', async (req, res) => { const message = typeof req.body?.message === 'string' ? req.body.message.trim() : ''; if (!message) return res.status(400).json({ error: 'Please enter feedback.' }); if (!pool) return res.status(503).json({ error: 'Feedback storage is not configured yet.' }); try { await pool.query('INSERT INTO feedback (message) VALUES ($1)', [message]); res.status(201).json({ ok: true }); } catch (error) { console.error(error); res.status(500).json({ error: 'Unable to save feedback right now.' }); } });
function adminAuthorized(req) { return Boolean(process.env.ADMIN_PASSWORD && req.get('x-admin-token') === process.env.ADMIN_PASSWORD); }
app.put('/api/admin/feedback/:id', async (req, res) => { if (!adminAuthorized(req)) return res.status(401).json({ error: 'Unauthorized.' }); const id = Number.parseInt(req.params.id, 10); const message = typeof req.body?.message === 'string' ? req.body.message.trim() : ''; if (!Number.isInteger(id) || !message) return res.status(400).json({ error: 'A valid message is required.' }); if (!pool) return res.status(503).json({ error: 'Feedback storage is not configured yet.' }); try { const result = await pool.query('UPDATE feedback SET message = $1 WHERE id = $2 RETURNING id, message, created_at', [message, id]); if (!result.rowCount) return res.status(404).json({ error: 'Feedback not found.' }); res.json(result.rows[0]); } catch (error) { console.error(error); res.status(500).json({ error: 'Unable to update feedback right now.' }); } });
app.delete('/api/admin/feedback/:id', async (req, res) => { if (!adminAuthorized(req)) return res.status(401).json({ error: 'Unauthorized.' }); const id = Number.parseInt(req.params.id, 10); if (!Number.isInteger(id)) return res.status(400).json({ error: 'Invalid feedback id.' }); if (!pool) return res.status(503).json({ error: 'Feedback storage is not configured yet.' }); try { const result = await pool.query('DELETE FROM feedback WHERE id = $1', [id]); if (!result.rowCount) return res.status(404).json({ error: 'Feedback not found.' }); res.json({ ok: true }); } catch (error) { console.error(error); res.status(500).json({ error: 'Unable to delete feedback right now.' }); } });
app.post('/api/admin/login', (req, res) => { const { email, password } = req.body || {}; if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) return res.json({ ok: true, token: process.env.ADMIN_PASSWORD }); res.status(401).json({ error: 'Invalid admin credentials.' }); });
app.get('/api/admin/feedback', async (req, res) => { if (!process.env.ADMIN_PASSWORD || req.get('x-admin-token') !== process.env.ADMIN_PASSWORD) return res.status(401).json({ error: 'Unauthorized.' }); if (!pool) return res.status(503).json({ error: 'Feedback storage is not configured yet.' }); try { const result = await pool.query('SELECT id, message, created_at FROM feedback ORDER BY created_at DESC'); res.json(result.rows); } catch (error) { console.error(error); res.status(500).json({ error: 'Unable to load feedback right now.' }); } });
initDb().then(() => app.listen(port, () => console.log(`HelpMeNow listening on ${port}`))).catch(error => { console.error(error); process.exit(1); });
