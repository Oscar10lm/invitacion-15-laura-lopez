/* ═══════════════════════════════════════════════════════
   DATOS DEL EVENTO — edita solo este bloque
   ═══════════════════════════════════════════════════════ */
const EVENTO = {
  nombre: "Laura Isabella López Ávila",
  fechaISO: "2026-12-05T18:00:00-05:00",       // Fecha y hora en Colombia (UTC-5)
  diaSemana: "Sábado",
  diaNum: "05",
  mesAnio: "Diciembre 2026",
  fechaLarga: "Sábado 5 de diciembre de 2026",
  fechaCorta: "5 de diciembre",
  fechaClaqueta: "05 · 12 · 2026",
  hora: "6:00 p. m.",
  lugar: "Rancho La Doma",
  vestuario: "Traje tipo cóctel",
  whatsapp: "573158777684",                    // Prefijo +57 + número
  telefonoVisible: "+57 315 877 7684",
  limiteDia: "22",
  limiteTexto: "22 de noviembre de 2026",
  foto: "assets/quinceanera.webp",
  mapa: "https://maps.app.goo.gl/Bq9iNpNo4b9584mU9?g_st=ic",
  fechaStub: "05.12.2026",
  sticker: ""                                  // ← Ruta del sticker PNG, p. ej. "assets/sticker.png"
};

(function(){
  const NS = "http://www.w3.org/2000/svg";
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => [...r.querySelectorAll(s)];
  const el = (tag, attrs={}, parent) => { const n=document.createElementNS(NS, tag); for(const k in attrs){ if(k==="stroke"||k==="fill") n.style[k]=attrs[k]; else n.setAttribute(k, attrs[k]); } if(parent) parent.appendChild(n); return n; };
  const rng = seed => () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };

  /* ── Datos → página ── */
  $$("[data-bind]").forEach(n => { const v = EVENTO[n.dataset.bind]; if(v != null) n.textContent = v; });
  const quien = EVENTO.nombre.trim() || "la quinceañera";
  $("[data-name]").textContent = EVENTO.nombre.trim() || "[ Nombre de la quinceañera ]";
  $("[data-signoff]").textContent = EVENTO.nombre.trim() ? EVENTO.nombre + "\u00a0·\u00a0XV" : "XV · Noche Flapper";
  $$("[data-foto]").forEach((img,i) => { img.src = EVENTO.foto; img.alt = "Retrato de " + quien; });
  $("#mapBtn").href = EVENTO.mapa;
  const st = $("[data-sticker]");
  if (EVENTO.sticker) { st.src = EVENTO.sticker; st.hidden = false; }

  /* ── Perlas a lo largo de un trazo ── */
  function strand(svg, d, o={}){
    const g = el("g", {}, svg);
    const p = el("path", {d, class:"thread"}, g);
    if (o.thread === false) p.setAttribute("opacity", "0");
    const L = p.getTotalLength();
    const step = o.step || 12, r0 = o.r || 4, grad = o.graduate || 0, r = rng(o.seed || 7);
    for (let s = (o.offset ?? step/2); s <= L - (o.endPad ?? 0); s += step) {
      const t = s / L, pt = p.getPointAtLength(s);
      const k = 1 + grad * Math.sin(Math.PI * t);
      el("circle", {cx:pt.x.toFixed(2), cy:pt.y.toFixed(2), r:(r0 * k * (0.94 + r()*0.1)).toFixed(2)}, g);
    }
    return g;
  }

  /* ── Pluma de avestruz procedimental ── */
  function feather(svg, o){
    const r = rng(o.seed), g = el("g", {}, svg);
    const a = o.ang * Math.PI/180;
    const dir = [Math.sin(a), -Math.cos(a)], nor = [Math.cos(a), Math.sin(a)];
    const B = [o.x, o.y];
    const T = [B[0]+dir[0]*o.len + nor[0]*o.bend, B[1]+dir[1]*o.len + nor[1]*o.bend];
    const C = [B[0]+dir[0]*o.len*.5 + nor[0]*o.bend*1.7, B[1]+dir[1]*o.len*.5 + nor[1]*o.bend*1.7];
    const bez = t => [ (1-t)*(1-t)*B[0]+2*(1-t)*t*C[0]+t*t*T[0], (1-t)*(1-t)*B[1]+2*(1-t)*t*C[1]+t*t*T[1] ];
    const tan = t => { const x=2*(1-t)*(C[0]-B[0])+2*t*(T[0]-C[0]), y=2*(1-t)*(C[1]-B[1])+2*t*(T[1]-C[1]); const m=Math.hypot(x,y); return [x/m,y/m]; };
    const col = o.color || "var(--champagne)";
    el("path", {d:`M${B} Q${C} ${T}`, stroke:col, "stroke-width":o.rachis||1.1, opacity:.9}, g);
    const N = o.n || 46;
    for (const side of [-1, 1]) for (let i=1;i<=N;i++){
      const t = .1 + .9*i/N, P = bez(t), tg = tan(t), nm = [-tg[1]*side, tg[0]*side];
      const prof = Math.pow(Math.sin(Math.PI*Math.min(t,.97)), .55) * (t < .35 ? .45 + t*1.6 : 1);
      const w = o.width * prof * (.82 + r()*.3);
      const droop = (r()-.5) * w * .25;
      const E = [P[0]+nm[0]*w+tg[0]*w*.75, P[1]+nm[1]*w+tg[1]*w*.75 + droop];
      const Q = [P[0]+nm[0]*w*.7+tg[0]*w*.05, P[1]+nm[1]*w*.7+tg[1]*w*.05];
      el("path", {d:`M${P[0].toFixed(1)} ${P[1].toFixed(1)} Q${Q[0].toFixed(1)} ${Q[1].toFixed(1)} ${E[0].toFixed(1)} ${E[1].toFixed(1)}`,
        stroke:col, "stroke-width":(o.barb||.7)*(.7+r()*.6), opacity:(o.op||.6)*(.55+r()*.45)}, g);
    }
    return g;
  }

  /* ── Abanico de rayos ── */
  function fan(svg, cx, cy, R, from, to, step, inner=0){
    const g = el("g", {}, svg);
    for (let a=from; a<=to+.001; a+=step){
      const rad = a*Math.PI/180;
      el("line", {x1:(cx+Math.cos(rad)*inner).toFixed(1), y1:(cy+Math.sin(rad)*inner).toFixed(1), x2:(cx+Math.cos(rad)*R).toFixed(1), y2:(cy+Math.sin(rad)*R).toFixed(1)}, g);
    }
    return g;
  }

  /* ── Poste dorado y cordón de terciopelo (alfombra roja) ── */
  function post(svg, x, y, h){
    const g = el("g", {}, svg), w = h*.09;
    el("ellipse", {cx:x, cy:y, rx:w*2.6, ry:w*.8, fill:"url(#goldGrad)"}, g);
    el("rect", {x:x-w/2, y:y-h, width:w, height:h, fill:"url(#goldGrad)"}, g);
    el("circle", {cx:x, cy:y-h-w*.9, r:w*1.25, fill:"url(#goldGrad)"}, g);
  }
  function rope(svg, x1, y1, x2, y2, sag, w){
    const mx = (x1+x2)/2, my = Math.max(y1,y2) + sag;
    el("path", {d:`M${x1} ${y1} Q${mx} ${my} ${x2} ${y2}`, fill:"none", stroke:"var(--vino-claro)", "stroke-width":w, "stroke-linecap":"round"}, svg);
    el("path", {d:`M${x1} ${y1-w*.2} Q${mx} ${my-w*.2} ${x2} ${y2-w*.2}`, fill:"none", stroke:"#c0566b", "stroke-width":w*.25, opacity:.6, "stroke-linecap":"round"}, svg);
  }
  function carpet(svg, top, bottom, H){
    // Alfombra en perspectiva: borde superior estrecho, inferior ancho
    const [t1,t2] = top, [b1,b2] = bottom;
    el("polygon", {points:`${t1},0 ${t2},0 ${b2},${H} ${b1},${H}`, fill:"url(#carpetGrad)"}, svg);
    el("line", {x1:t1+3, y1:0, x2:b1+8, y2:H, stroke:"var(--oro-vivo)", "stroke-width":1.2, opacity:.8}, svg);
    el("line", {x1:t2-3, y1:0, x2:b2-8, y2:H, stroke:"var(--oro-vivo)", "stroke-width":1.2, opacity:.8}, svg);
  }

  /* Portada */
  fan($('[data-fan="hero"]'), 500, 500, 520, 0, 359, 6, 120);
  { const s = $('[data-carpet="hero"]');
    carpet(s, [140,260], [30,370], 110);
    post(s, 118, 46, 36); post(s, 70, 104, 46); post(s, 282, 46, 36); post(s, 330, 104, 46);
    rope(s, 118, 13, 70, 61, 14, 5); rope(s, 282, 13, 330, 61, 14, 5);
  }
  feather($('[data-feather="hero"]'), {x:250, y:290, len:270, ang:-28, bend:-30, width:30, seed:11, op:.8, color:"var(--oro-vivo)"});
  feather($('[data-feather="hero"]'), {x:255, y:292, len:210, ang:-50, bend:-20, width:24, seed:5, op:.8, color:"var(--plata)"});
  feather($('[data-feather="hero"]'), {x:258, y:294, len:150, ang:-68, bend:-12, width:16, seed:6, op:.8, color:"var(--champagne)"});
  { const s = $('[data-swag="hero"]');
    strand(s, "M20 20 C 160 112, 440 112, 580 20", {step:15, r:5.4, graduate:.45, seed:3});
    strand(s, "M60 26 C 190 86, 410 86, 540 26", {step:11, r:3.4, graduate:.2, seed:9, offset:4});
    strand(s, "M300 92 L300 116", {step:8, r:3, thread:false, seed:2, offset:2});
  }

  /* Mensaje */
  strand($('[data-strand="long"]'), "M70 0 C 20 120, 20 230, 55 300 C 90 370, 90 470, 40 600", {step:14, r:4.6, graduate:.35, seed:21});
  strand($('[data-strand="long"]'), "M86 40 C 52 150, 50 240, 72 300 C 96 370, 96 450, 70 540", {step:9, r:2.6, graduate:.1, seed:22, offset:3});
  strand($('[data-swag="msg"]'), "M4 6 C 70 46, 180 46, 296 10", {step:11, r:3.8, graduate:.4, seed:24});

  /* Contador: arcos en blanco y negro */
  { const s = $("[data-arcs]");
    for (let i=0;i<7;i++){ const R = 200 + i*70; el("path", {d:`M${700-R} 400 A ${R} ${R} 0 0 1 ${700+R} 400`}, s); } }

  /* Emblema de apertura */
  { const s = $("[data-mask-emblem]");
    const g = fan(s, 120, 70, 120, 190, 350, 10, 66);
    $$("line", g).forEach(l => { l.style.stroke = "var(--oro)"; l.setAttribute("stroke-width", ".7"); l.setAttribute("opacity", ".5"); });
    const u = el("use", {href:"#mask", x:20, y:24, width:200, height:92}, s); u.style.color = "var(--champagne)";
    strand(s, "M44 104 C 80 128, 160 128, 196 104", {step:9, r:3, graduate:.3, seed:51, thread:false});
  }

  /* Vestuario */
  { const s = $('[data-swag="dress"]');
    strand(s, "M0 10 C 120 70, 260 70, 420 18", {step:13, r:4.4, graduate:.4, seed:61});
    strand(s, "M0 24 C 150 92, 280 88, 400 44", {step:9, r:2.8, graduate:.15, seed:62, offset:5});
  }
  strand($("[data-acc]"), "M3 5 C 14 26, 44 26, 55 5", {step:6, r:2.5, graduate:.4, seed:71, thread:false});

  /* Franjas: joyas en vino y azul noche, o película en blanco y negro */
  $$("[data-band]").forEach((b,i) => {
    const svg = el("svg", {width:"100%", height:"22"}); b.appendChild(svg);
    const defs = el("defs", {}, svg), id = "band" + i;
    if (b.dataset.band === "film") {
      const pat = el("pattern", {id, width:24, height:22, patternUnits:"userSpaceOnUse"}, defs);
      el("rect", {width:24, height:22, fill:"var(--bn-negro)"}, pat);
      el("rect", {x:7, y:3, width:10, height:5, rx:1.4, fill:"var(--bn-blanco)"}, pat);
      el("rect", {x:7, y:14, width:10, height:5, rx:1.4, fill:"var(--bn-blanco)"}, pat);
      el("rect", {width:"100%", height:22, fill:`url(#${id})`}, svg);
      return;
    }
    const pal = ["var(--vino)","var(--azul-noche)"];
    const pat = el("pattern", {id, width:96, height:22, patternUnits:"userSpaceOnUse", x:(i*17)%96}, defs);
    el("rect", {width:96, height:22, fill:"var(--carbon)"}, pat);
    for (let k=0;k<4;k++){
      const cx = 12 + k*24;
      el("polygon", {points:`${cx},2 ${cx+9},11 ${cx},20 ${cx-9},11`, fill:pal[(k+i)%2], stroke:"var(--oro-vivo)", "stroke-width":.8}, pat);
      const pc = el("circle", {cx:cx+12, cy:11, r:2.2}, pat); pc.setAttribute("fill","url(#pearlGrad)");
    }
    el("rect", {width:"100%", height:22, fill:`url(#${id})`}, svg);
    el("line", {x1:0, y1:.5, x2:"100%", y2:.5, stroke:"var(--oro)", "stroke-width":1}, svg);
    el("line", {x1:0, y1:21.5, x2:"100%", y2:21.5, stroke:"var(--oro)", "stroke-width":1}, svg);
  });

  /* Destellos de flash (estáticos) */
  const STAR = "M0 -10 L2.2 -2.2 L10 0 L2.2 2.2 L0 10 L-2.2 2.2 L-10 0 L-2.2 -2.2Z";
  function sparks(host, list){
    const narrow = innerWidth < 560;
    list.forEach(([x,y,size,color,shape]) => {
      if (narrow) return;   // en celular se omiten para no tapar texto
      const svg = el("svg", {viewBox:"-11 -11 22 22", class:"spark", "aria-hidden":"true"});
      svg.style.cssText = `left:${x}%;top:${y}%;width:${size}px;height:${size}px`;
      if (shape === "d") el("polygon", {points:"0,-10 7,0 0,10 -7,0", fill:color, stroke:"var(--oro-vivo)", "stroke-width":1}, svg);
      else if (shape === "o") el("circle", {r:6, fill:color}, svg);
      else el("path", {d:STAR, fill:color}, svg);
      host.appendChild(svg);
    });
  }
  sparks($(".hero"), [[47,9,18,"var(--marfil)"],[5,88,14,"var(--plata)"],[50,86,12,"var(--oro-vivo)"],[93,6,14,"var(--champagne)"],[41,52,10,"var(--vino-claro)","d"],[96,70,11,"var(--azul-noche)","d"],[28,4,8,"var(--plata)","o"]]);
  sparks($(".event"), [[6,12,14,"var(--plata)"],[94,88,16,"var(--oro-vivo)"],[52,8,11,"var(--vino-claro)","d"]]);
  sparks($(".rsvp"), [[95,10,14,"var(--champagne)"],[3,92,12,"var(--vino-claro)","d"]]);
  sparks($(".closing"), [[12,14,16,"var(--plata)"],[88,10,18,"var(--oro-vivo)"],[8,45,9,"var(--plata)","o"],[92,48,9,"var(--oro-vivo)","o"]]);

  /* Cierre: camafeo de perlas, plumas plata y oro, alfombra con postes */
  { const g = fan($('[data-fan="closing"]'), 500, 500, 560, 180, 360, 5, 150); }
  strand($("[data-rule]"), "M4 8 L66 8", {step:9, r:2.6, graduate:.8, seed:99, thread:false});

  /* ── Contador regresivo (hora de Colombia) ── */
  const target = Date.parse(EVENTO.fechaISO);
  const units = {d:$('[data-u="d"]'), h:$('[data-u="h"]'), m:$('[data-u="m"]'), s:$('[data-u="s"]')};
  const pad = n => String(n).padStart(2, "0");
  let timer;
  function tick(){
    const diff = target - Date.now();
    if (diff <= 0) {
      $("#clock").hidden = true;
      const done = $("#clockDone"); done.hidden = false;
      done.textContent = (Date.now() - target) < 12*3600*1000 ? "¡Acción! La fiesta ha comenzado" : "Gracias por celebrar esta noche con nosotros";
      $("#cdTitle").textContent = "Llegó la gran noche";
      clearInterval(timer); return;
    }
    const s = Math.floor(diff/1000);
    units.d.textContent = pad(Math.floor(s/86400));
    units.h.textContent = pad(Math.floor(s%86400/3600));
    units.m.textContent = pad(Math.floor(s%3600/60));
    units.s.textContent = pad(s%60);
  }
  tick(); timer = setInterval(tick, 1000);
  document.addEventListener("visibilitychange", () => { if (!document.hidden) tick(); });

  /* Golpe de claqueta al aparecer */
  const clapper = $("#clapper");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { clapper.classList.add("is-clap"); io.disconnect(); } }), {threshold:.5});
    io.observe(clapper);
  }

  /* ── Confirmación por WhatsApp ── */
  const msg = $("#rsvpMsg"), wa = $("#waBtn");
  const DRAFT_KEY = "xv-flapper-rsvp-v3";
  const defaultMsg = `¡Hola! Con mucho gusto confirmo mi asistencia a los quince años de ${quien} el ${EVENTO.fechaLarga.toLowerCase()} en ${EVENTO.lugar}.\n\nMi nombre: \nNúmero de asistentes: `;
  let saved = null; try { saved = localStorage.getItem(DRAFT_KEY); } catch(e) {}
  msg.value = saved || defaultMsg;
  const syncWa = () => { wa.href = `https://wa.me/${EVENTO.whatsapp}?text=${encodeURIComponent(msg.value.trim())}`; };
  syncWa();
  msg.addEventListener("input", () => { syncWa(); try { localStorage.setItem(DRAFT_KEY, msg.value); } catch(e) {} });
  $("#rsvpForm").addEventListener("submit", e => e.preventDefault());
  $("#copyBtn").addEventListener("click", async e => {
    const b = e.currentTarget;
    try { await navigator.clipboard.writeText(EVENTO.telefonoVisible); b.textContent = "Copiado"; }
    catch(err){ const o = $(".phone output"); const r = document.createRange(); r.selectNodeContents(o); const s = getSelection(); s.removeAllRanges(); s.addRange(r); b.textContent = "Seleccionado"; }
    setTimeout(() => b.textContent = "Copiar", 2200);
  });

  /* ── Apertura (telón) ── */
  const opening = $("#opening"), main = $("#top");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  opening.hidden = false;
  document.body.classList.add("is-locked");
  main.setAttribute("aria-hidden", "true");
  $("#openBtn").focus({preventScroll:true});
  const bgm = $("#bgm"), musicBtn = $("#musicBtn");
  const setMusic = on => { musicBtn.setAttribute("aria-pressed", on); musicBtn.setAttribute("aria-label", on ? "Pausar música" : "Reproducir música"); };
  function playMusic(){ bgm.volume = .8; const p = bgm.play(); if (p) p.then(() => setMusic(true)).catch(() => setMusic(false)); }
  bgm.addEventListener("play", () => setMusic(true));
  bgm.addEventListener("pause", () => setMusic(false));
  musicBtn.addEventListener("click", () => { bgm.paused ? playMusic() : bgm.pause(); });
  try { history.scrollRestoration = "manual"; } catch(e) {}
  window.scrollTo(0, 0);
  function openInvite(){
    if (opening.classList.contains("is-open")) return;
    window.scrollTo(0, 0);
    playMusic();
    musicBtn.hidden = false;
    opening.classList.add("is-open");
    document.body.classList.remove("is-locked");
    main.removeAttribute("aria-hidden");
    document.body.classList.add("is-revealing");
    setTimeout(() => { opening.hidden = true; }, reduce ? 50 : 1300);
  }
  $("#openBtn").addEventListener("click", openInvite);
  opening.addEventListener("keydown", e => { if (e.key === "Escape") openInvite(); });
})();
