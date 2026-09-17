/* 3言語の切り替え（日本語／English／Português）
   公開中HP（homepage/index.html）と同じ仕組み：
   - 訳す要素に data-i18n="キー"（画像の代替テキストは data-i18n-alt）
   - 日本語はページに書かれた文を読み込み時に控える
   - 選んだ言語は localStorage の "szLang" に保存（ガイドのページと共通）
   訳：AI（Claude Fable）による。母語話者の確認は未実施。 */
(() => {
  "use strict";
  const TRANSLATIONS = {
  "en": {
    "logo_name": "Shiawase Zousan",
    "nav_guide": "First-time Care Guide (Japanese)",
    "nav_jigyosho": "Find Care Providers (Japanese)",
    "nav_about": "About Us",
    "nav_features": "Features",
    "nav_role": "Our Role",
    "nav_flow": "How It Works",
    "header_cta": "Contact Us",
    "h1_l1": "Beside you every day,",
    "h1_l2": "walking together.",
    "hero_lead": "\"Care for my parent... I don't even know where to start.\" You can talk to us at that stage. Shiawase Zousan is a care management office that thinks together with you and your family about everyday life.",
    "guide_b_title": "First-time care guide",
    "guide_b_sub": "Where do I start? Read by situation — a guide to 6 common situations (in Japanese)",
    "jig_b_title": "Find care providers in Izumo",
    "jig_b_sub": "Narrow down about 440 local care providers by service type and area (in Japanese)",
    "sign_text": "The support you need,<br>sorted out one by one",
    "sign_title": "Care",
    "j_h2_l1": "You don't have to",
    "j_h2_l2": "carry this alone.",
    "jc_a_h3": "Start from \"What should I do?\"",
    "jc_a_p": "Hospital discharge, forgetfulness, balancing work and caregiving. Even if you don't yet know how long-term care insurance works, you can talk to us in your own words.",
    "jc_b_h3": "Connecting you to people and services",
    "jc_b_p": "Hospitals, the city office, day services, home helpers, welfare equipment. We sort out the support you need and coordinate with the organizations involved.",
    "jc_c_h3": "Living, and rethinking together",
    "jc_c_p": "Deciding once is not the end. When things change, we pause, go back, and build the plan again together.",
    "jcopy_a": "Putting your worries<br><strong>into words</strong>",
    "jcopy_b": "The support you need,<br><strong>connected</strong>",
    "jcopy_c": "Toward a life with peace of mind,<br><strong>moving forward together</strong>",
    "feat_h2": "So you can say,<br>\"I'm glad I asked.\"",
    "feat_lead": "We don't just explain the system. We start from how you and your family want to live, and think it through together.",
    "card1_h3": "Consultations and care plans<br>Free of charge",
    "card1_p": "The cost of creating your care plan and of consultations is fully covered by long-term care insurance, so as a rule there is no out-of-pocket cost. (Each service you use, such as day services, is charged separately at 10–30% of its cost.)",
    "card2_h3": "A Chief Care Manager<br>in charge",
    "card2_p": "Working closely with medical and care providers, we think together about the support that fits your situation.",
    "card3_h3": "Fair and neutral<br>service coordination",
    "card3_p": "We never favor specific providers. Together, we choose the services that suit you and your family.",
    "card4_h3": "Multilingual support<br>with digital tools",
    "card4_p": "Using translation apps and video calls, we aim to make it easier for you to reach out.",
    "story_caption": "\"I can't keep this up.\"<br>The day you think that is the day to talk to us.",
    "story_h2": "Building support<br>around your life.",
    "story_lead": "Applying for long-term care insurance, creating a care plan, day services, home helpers, welfare equipment, coordination with medical providers. We sort out the services you need one by one and think together about a way of living that suits you and your family.",
    "story_link": "See how it works",
    "flow_h2": "Four steps,<br>starting with a conversation.",
    "flow1_h3": "Contact us",
    "flow1_p": "Call us or message us on LINE. First time dealing with care insurance? No problem.",
    "flow2_h3": "Home visit and interview",
    "flow2_p": "We listen carefully to your and your family's daily life and wishes.",
    "flow3_h3": "Creating your care plan",
    "flow3_p": "If you haven't applied for long-term care insurance yet, we help you with that procedure. Together we sort out the support and care services you need and put them into a care plan (a plan of which services to use and how).",
    "flow4_h3": "Services begin",
    "flow4_p": "After services start, we keep checking how things are going and review the care plan when needed.",
    "contact_h2": "Today is a good day to ask.",
    "contact_p": "It's fine even if you haven't decided whether to use any services.<br>Just tell us what is troubling you right now.",
    "contact_line": "Chat on LINE",
    "contact_wa": "Chat on WhatsApp",
    "contact_mail": "Email us",
    "contact_qr_note": "On a computer? Scan the QR code with your phone.",
    "contact_hours": "Office hours: weekdays 9:00–17:00 (if we are out on a visit and cannot answer, we will call you back)",
    "contact_area": "Service area: Izumo City (former Izumo area) and Taisha. We also serve other areas — please ask.",
    "footer_name": "Shiawase Zousan Care Management Office (Shiawase Zousan LLC)",
    "footer_addr": "663-25 Yokan, Taisha-cho, Izumo City, Shimane 699-0731, Japan",
    "footer_no": "Care insurance office no. 3270403482",
    "mcta_tel": "📞 Call us",
    "mcta_contact": "How to reach us",
    "manga_alt": "A four-panel comic showing how it works, from first contact to starting services (the image text is in Japanese)",
    "_title": "Shiawase Zousan | Care Management Office in Izumo & Taisha, Shimane"
  },
  "pt": {
    "logo_name": "Shiawase Zousan",
    "nav_guide": "Guia para começar (em japonês)",
    "nav_jigyosho": "Buscar serviços de cuidados (em japonês)",
    "nav_about": "Sobre Nós",
    "nav_features": "Diferenciais",
    "nav_role": "Nosso Papel",
    "nav_flow": "Como Funciona",
    "header_cta": "Fale Conosco",
    "h1_l1": "Ao seu lado no dia a dia,",
    "h1_l2": "caminhando juntos.",
    "hero_lead": "\"Cuidar dos meus pais... nem sei por onde começar.\" Você pode falar conosco já nessa fase. A Shiawase Zousan é um escritório de gestão de cuidados que pensa junto com você e sua família sobre o dia a dia.",
    "guide_b_title": "Guia para começar",
    "guide_b_sub": "Por onde começar? Leia pela sua situação — guia com 6 situações comuns (em japonês)",
    "jig_b_title": "Buscar serviços de cuidados em Izumo",
    "jig_b_sub": "Filtre cerca de 440 estabelecimentos da cidade por tipo de serviço e região (em japonês)",
    "sign_text": "O apoio necessário,<br>organizado passo a passo",
    "sign_title": "Cuidado",
    "j_h2_l1": "Você não precisa",
    "j_h2_l2": "enfrentar isso sozinho.",
    "jc_a_h3": "Comece pelo \"O que eu faço?\"",
    "jc_a_p": "Alta hospitalar, esquecimento, conciliar trabalho e cuidados. Mesmo sem conhecer ainda o seguro de cuidados (kaigo hoken), você pode falar conosco com suas próprias palavras.",
    "jc_b_h3": "Conectar às pessoas e aos serviços certos",
    "jc_b_p": "Hospitais, prefeitura, day service, cuidadores domiciliares, equipamentos de bem-estar. Organizamos o apoio necessário e fazemos a ponte com os órgãos e serviços envolvidos.",
    "jc_c_h3": "Viver, e repensar juntos",
    "jc_c_p": "Decidir uma vez não é o fim. Quando a situação muda, paramos, voltamos e montamos tudo de novo, juntos.",
    "jcopy_a": "Colocar as dificuldades<br><strong>em palavras</strong>",
    "jcopy_b": "O apoio necessário,<br><strong>conectado</strong>",
    "jcopy_c": "Rumo a uma vida tranquila,<br><strong>avançando juntos</strong>",
    "feat_h2": "Para você pensar:<br>\"que bom que perguntei\".",
    "feat_lead": "Não explicamos apenas o sistema. Partimos de como você e sua família querem viver, e pensamos juntos.",
    "card1_h3": "Consultas e planos de cuidados<br>Custo zero",
    "card1_p": "O custo da elaboração do plano de cuidados e das consultas é totalmente coberto pelo seguro de cuidados de longa duração (kaigo hoken), por isso, em regra, você não paga nada por isso. (Já cada serviço utilizado, como o day service, tem um custo à parte de 10% a 30% do valor.)",
    "card2_h3": "Gestor de Cuidados Chefe<br>como responsável",
    "card2_p": "Em conjunto com médicos e prestadores de serviços de cuidados, pensamos juntos no apoio adequado à sua situação.",
    "card3_h3": "Coordenação de serviços<br>imparcial e neutra",
    "card3_p": "Sem favorecer empresas específicas, escolhemos juntos os serviços que combinam com você e sua família.",
    "card4_h3": "Atendimento multilíngue<br>com ferramentas digitais",
    "card4_p": "Com aplicativos de tradução e videochamadas, buscamos tornar a conversa ainda mais fácil para você.",
    "story_caption": "\"Acho que não aguento mais.\"<br>O dia em que você pensa isso é o dia de falar conosco.",
    "story_h2": "Apoio construído<br>em torno da sua vida.",
    "story_lead": "Solicitação do seguro de cuidados, elaboração do plano de cuidados, day service, cuidadores domiciliares, equipamentos de bem-estar, contato com hospitais e médicos. Organizamos um a um os serviços necessários e pensamos juntos em um modo de vida que combine com você e sua família.",
    "story_link": "Veja como funciona",
    "flow_h2": "Quatro passos,<br>a partir de uma conversa.",
    "flow1_h3": "Entre em contato",
    "flow1_p": "Ligue ou mande mensagem pelo LINE. Primeira vez com o seguro de cuidados? Sem problema.",
    "flow2_h3": "Visita e conversa",
    "flow2_p": "Ouvimos com atenção a rotina e os desejos de você e da sua família.",
    "flow3_h3": "Elaboração do plano de cuidados",
    "flow3_p": "Se ainda não solicitou o seguro de cuidados, ajudamos desde esse trâmite. Organizamos juntos o apoio e os serviços de cuidados necessários e reunimos tudo em um plano de cuidados (um plano de quais serviços usar e como).",
    "flow4_h3": "Início dos serviços",
    "flow4_p": "Depois do início, continuamos acompanhando e revisamos o plano de cuidados quando necessário.",
    "contact_h2": "Hoje é um bom dia para perguntar.",
    "contact_p": "Tudo bem se ainda não decidiu se vai usar algum serviço.<br>Conte-nos primeiro o que está preocupando você agora.",
    "contact_line": "Falar pelo LINE",
    "contact_wa": "Falar pelo WhatsApp",
    "contact_mail": "Enviar e-mail",
    "contact_qr_note": "No computador? Leia o código QR com o celular.",
    "contact_hours": "Horário: dias úteis, das 9h às 17h (se estivermos em visita e não pudermos atender, retornamos a ligação)",
    "contact_area": "Área de atendimento: Cidade de Izumo (área antiga) e Taisha. Também atendemos outras regiões — consulte-nos.",
    "footer_name": "Shiawase Zousan — Escritório de Gestão de Cuidados (Shiawase Zousan LLC)",
    "footer_addr": "663-25 Yokan, Taisha-cho, Izumo, Shimane 699-0731, Japão",
    "footer_no": "Nº de registro (seguro de cuidados): 3270403482",
    "mcta_tel": "📞 Ligar",
    "mcta_contact": "Como falar conosco",
    "manga_alt": "Quadrinho de quatro cenas mostrando como funciona, do primeiro contato ao início dos serviços (o texto da imagem está em japonês)",
    "_title": "Shiawase Zousan | Escritório de Gestão de Cuidados em Izumo e Taisha, Shimane"
  }
};
  const KEY = "szLang";

  const ja = {};
  document.querySelectorAll("[data-i18n]").forEach((el) => { ja[el.getAttribute("data-i18n")] = el.innerHTML; });
  document.querySelectorAll("[data-i18n-alt]").forEach((el) => { ja[el.getAttribute("data-i18n-alt")] = el.getAttribute("alt") || ""; });
  ja._title = document.title;
  TRANSLATIONS.ja = ja;

  function setLang(lang) {
    if (!TRANSLATIONS[lang]) lang = "ja";
    const dict = TRANSLATIONS[lang];
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const k = el.getAttribute("data-i18n");
      if (dict[k] != null) el.innerHTML = dict[k];
    });
    document.querySelectorAll("[data-i18n-alt]").forEach((el) => {
      const k = el.getAttribute("data-i18n-alt");
      if (dict[k] != null) el.setAttribute("alt", dict[k]);
    });
    if (dict._title) document.title = dict._title;
    document.documentElement.lang = lang === "pt" ? "pt-BR" : lang;
    document.querySelectorAll(".lang-switch button").forEach((b) => {
      const on = b.getAttribute("data-lang") === lang;
      b.classList.toggle("active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
    try { localStorage.setItem(KEY, lang); } catch (e) { /* 保存できない環境でも表示は切り替える */ }
    // 文の長さが変わるので、ゾウの区間の寸法を main.js に測り直してもらう
    window.dispatchEvent(new Event("resize"));
  }

  document.querySelectorAll(".lang-switch button").forEach((b) => {
    b.addEventListener("click", () => setLang(b.getAttribute("data-lang")));
  });

  let saved = "ja";
  try { saved = localStorage.getItem(KEY) || "ja"; } catch (e) { /* 読めなければ日本語 */ }
  setLang(saved);

  // 確認用
  window.__szI18n = { setLang, TRANSLATIONS };
})();
