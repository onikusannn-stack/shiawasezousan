(() => {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const progress = document.getElementById("progress");
  const walker = document.getElementById("walker");
  const walkerBody = walker?.querySelector(".walker-body");
  const walkerImg = walker?.querySelector(".walker-img");
  const walkerShadow = walker?.querySelector(".walker-shadow");
  const journey = document.querySelector(".journey");
  const journeySticky = document.querySelector(".journey-sticky");
  const header = document.getElementById("siteHeader");

  const clamp = (v, min = 0, max = 1) => Math.max(min, Math.min(max, v));
  const smoothstep = (a, b, x) => {
    const t = clamp((x - a) / (b - a));
    return t * t * (3 - 2 * t);
  };

  const frames = { urls: [], images: [], loaded: false, current: -1 };
  const frameCount = parseInt(walker?.dataset.walkFrames || "0", 10);
  const framePattern = walker?.dataset.framePath || "";

  async function preloadFrames() {
    if (!walkerImg || !frameCount || !framePattern.includes("{n}")) return;
    const urls = Array.from({ length: frameCount }, (_, i) =>
      framePattern.replace("{n}", String(i + 1).padStart(2, "0"))
    );
    const images = urls.map((src) => {
      const img = new Image();
      img.decoding = "async";
      img.src = src;
      return img;
    });
    const waitForLoad = (img) => new Promise((resolve, reject) => {
      if (img.complete && img.naturalWidth) return resolve(img);
      img.addEventListener("load", () => resolve(img), { once: true });
      img.addEventListener("error", reject, { once: true });
    });
    try {
      await Promise.all(images.map(async (img) => {
        await waitForLoad(img);
        if (typeof img.decode === "function") {
          try { await img.decode(); } catch (_) { /* load succeeded: continue */ }
        }
      }));
      frames.urls = urls;
      frames.images = images;
      frames.loaded = true;
      requestUpdate();
    } catch (err) {
      console.warn("歩行画像を読み込めません:", err);
    }
  }

  function setFrame(i) {
    if (!frames.loaded || !walkerImg) return;
    const idx = ((i % frames.urls.length) + frames.urls.length) % frames.urls.length;
    if (idx !== frames.current) {
      frames.current = idx;
      walkerImg.src = frames.urls[idx];
    }
  }

  const layout = { top: 0, height: 1, vh: innerHeight, sceneH: innerHeight, vw: innerWidth, walkerW: 120, maxScroll: 1 };
  function measure() {
    const y = scrollY;
    layout.vh = innerHeight;
    layout.vw = document.documentElement.clientWidth;
    layout.maxScroll = Math.max(document.documentElement.scrollHeight - layout.vh, 1);
    layout.walkerW = walker?.offsetWidth || 120;
    if (journey) {
      layout.top = journey.getBoundingClientRect().top + y;
      layout.sceneH = journeySticky?.getBoundingClientRect().height || layout.vh;
      layout.height = Math.max(journey.offsetHeight - layout.sceneH, 1);
    }
  }

  function journeyProgress() {
    return clamp((scrollY - layout.top) / layout.height);
  }

  function renderWalker(p) {
    if (!walker || !walkerBody || !walkerShadow) return;
    const active = scrollY > layout.top - layout.vh * .38 && scrollY < layout.top + layout.height + layout.vh * .5;
    walker.classList.toggle("active", active && !reduceMotion.matches);
    if (!active || reduceMotion.matches) return;

    // 同じスクロール位置なら必ず同じ位置・同じコマ。
    // 下へ進む = フレーム順送り / 上へ戻る = 同じ式を逆に辿るため自然に逆再生。
    const leftMargin = layout.vw < 600 ? layout.walkerW * .58 : layout.walkerW * .7;
    const rightMargin = leftMargin;
    const x = leftMargin + p * Math.max(layout.vw - leftMargin - rightMargin, 0);
    const cycles = layout.vw < 600 ? 7 : 10;
    const phase = p * cycles;
    const frameFloat = phase * frameCount;
    setFrame(Math.floor(frameFloat));

    const bob = -Math.abs(Math.sin(phase * Math.PI * 2)) * layout.walkerW * .025;
    const tilt = Math.sin(phase * Math.PI * 2) * 1.2;
    const lift = Math.abs(Math.sin(phase * Math.PI * 2));
    walker.style.transform = `translate3d(${(x - layout.walkerW / 2).toFixed(2)}px,0,0)`;
    walkerBody.style.transform = `translate3d(0,${bob.toFixed(2)}px,0) rotate(${tilt.toFixed(2)}deg)`;
    walkerShadow.style.transform = `scaleX(${(1 - lift * .1).toFixed(3)})`;
    walkerShadow.style.opacity = (1 - lift * .28).toFixed(3);
  }

  function bell(p, center, width) {
    return clamp(1 - Math.abs(p - center) / width);
  }

  function renderScene(p) {
    const root = document.documentElement.style;
    root.setProperty("--scene-p", p.toFixed(5));
    root.setProperty("--scene-wave", Math.sin(p * Math.PI * 2).toFixed(5));
    root.setProperty("--opa-head", clamp(1 - p * 2.15, .15, 1).toFixed(3));
    root.setProperty("--opa-a", bell(p, .20, .22).toFixed(3));
    root.setProperty("--opa-b", bell(p, .53, .22).toFixed(3));
    root.setProperty("--opa-c", bell(p, .84, .22).toFixed(3));
  }

  function renderProgress() {
    if (!progress) return;
    progress.style.transform = `scaleX(${clamp(scrollY / layout.maxScroll)})`;
  }

  function renderHeader() {
    header?.classList.toggle("scrolled", scrollY > 30);
  }

  let ticking = false;
  function update() {
    ticking = false;
    const p = journeyProgress();
    renderProgress();
    renderHeader();
    renderScene(p);
    renderWalker(p);
  }
  function requestUpdate() {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }

  const reveals = document.querySelectorAll(".reveal, .card");
  function setupReveal() {
    if (reduceMotion.matches || !("IntersectionObserver" in window)) {
      reveals.forEach((el) => el.classList.add("visible"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: .14 });
    reveals.forEach((el, i) => {
      if (el.classList.contains("card")) el.style.transitionDelay = `${(i % 4) * 80}ms`;
      io.observe(el);
    });
  }

  preloadFrames();
  setupReveal();
  measure();
  update();

  addEventListener("scroll", requestUpdate, { passive: true });
  addEventListener("resize", () => { measure(); requestUpdate(); });
  addEventListener("load", () => { measure(); requestUpdate(); });
  if ("ResizeObserver" in window) new ResizeObserver(() => { measure(); requestUpdate(); }).observe(document.body);
  const motionChange = () => { if (reduceMotion.matches) reveals.forEach((el) => el.classList.add("visible")); requestUpdate(); };
  reduceMotion.addEventListener?.("change", motionChange);

  // 確認用
  window.__zouPrototypeV2 = { frames, layout, journeyProgress };
})();
