import { useState, useEffect } from "react";

// ═══════════════════════════════════════════════════════════════
// TRANSLATIONS (7 languages + English)
// ═══════════════════════════════════════════════════════════════
const T = {
  en: { home:"Home", search:"Search", breaking:"Breaking", more:"More", trending:"Trending", new:"New", politics:"Politics", sports:"Sports", crypto:"Crypto", login:"Log In", signup:"Sign Up", logout:"Log Out", portfolio:"Portfolio", betslip:"Bet Slip", help:"Help Center", profile:"Profile", balance:"Balance", deposit:"Deposit", placeOrder:"Place Order", buyYes:"Buy YES", buyNo:"Buy NO", yes:"YES", no:"NO", volume:"Volume", expires:"Expires", chance:"chance", today:"Today", thisWeek:"This Week", thisMonth:"This Month", allTime:"All Time", allCategories:"All", country:"Country", world:"World", email:"Email", password:"Password", username:"Username", welcome:"Welcome", noAccount:"Don't have an account?", hasAccount:"Already have an account?", emptySlip:"Your bet slip is empty", addToSlip:"Add to Slip", removeFromSlip:"Remove", totalStake:"Total Stake", potentialPayout:"Potential Payout", submitSlip:"Submit All Bets", myPositions:"My Positions", noPositions:"No positions yet", marketDetail:"Market Detail", relatedMarkets:"Related Markets", aboutMarket:"About this Market", priceHistory:"Price History", faqs:"Frequently Asked Questions", contactSupport:"Contact Support", tagline:"Trade on the World's Future", heroSub:"Real markets. Real outcomes. From Tirana to Tokyo." },
  sq: { home:"Kreu", search:"Kërko", breaking:"Lajme", more:"Më shumë", trending:"Në trend", new:"E re", politics:"Politikë", sports:"Sport", crypto:"Kripto", login:"Hyr", signup:"Regjistrohu", logout:"Dil", portfolio:"Portofoli", betslip:"Bileta", help:"Ndihmë", profile:"Profili", balance:"Bilanci", deposit:"Depozitë", placeOrder:"Vendos Porosinë", buyYes:"Bli PO", buyNo:"Bli JO", yes:"PO", no:"JO", volume:"Volumi", expires:"Skadon", chance:"shansi", today:"Sot", thisWeek:"Këtë Javë", thisMonth:"Këtë Muaj", allTime:"Gjithçka", allCategories:"Të Gjitha", country:"Shteti", world:"Bota", email:"Email", password:"Fjalëkalimi", username:"Përdoruesi", welcome:"Mirë se vini", noAccount:"S'keni llogari?", hasAccount:"Keni llogari?", emptySlip:"Bileta është bosh", addToSlip:"Shto në Biletë", removeFromSlip:"Hiq", totalStake:"Bastet Gjithsej", potentialPayout:"Fitimi i Mundshëm", submitSlip:"Vendos të Gjitha", myPositions:"Pozicionet e Mia", noPositions:"S'ka pozicione", marketDetail:"Detajet e Tregut", relatedMarkets:"Tregje të Lidhura", aboutMarket:"Rreth këtij Tregu", priceHistory:"Historia e Çmimeve", faqs:"Pyetjet e Shpeshta", contactSupport:"Kontakto Mbështetjen", tagline:"Trego mbi të Ardhmen", heroSub:"Tregje reale. Rezultate reale. Nga Tirana në Tokio." },
  es: { home:"Inicio", search:"Buscar", breaking:"Últimas", more:"Más", trending:"Tendencias", new:"Nuevo", politics:"Política", sports:"Deportes", crypto:"Cripto", login:"Iniciar Sesión", signup:"Registrarse", logout:"Salir", portfolio:"Portafolio", betslip:"Boleto", help:"Ayuda", profile:"Perfil", balance:"Saldo", deposit:"Depositar", placeOrder:"Hacer Apuesta", buyYes:"Comprar SÍ", buyNo:"Comprar NO", yes:"SÍ", no:"NO", volume:"Volumen", expires:"Vence", chance:"probabilidad", today:"Hoy", thisWeek:"Esta Semana", thisMonth:"Este Mes", allTime:"Todo", allCategories:"Todas", country:"País", world:"Mundo", email:"Correo", password:"Contraseña", username:"Usuario", welcome:"Bienvenido", noAccount:"¿No tienes cuenta?", hasAccount:"¿Ya tienes cuenta?", emptySlip:"Boleto vacío", addToSlip:"Añadir", removeFromSlip:"Quitar", totalStake:"Apuesta Total", potentialPayout:"Pago Potencial", submitSlip:"Enviar Todo", myPositions:"Mis Posiciones", noPositions:"Sin posiciones", marketDetail:"Detalle", relatedMarkets:"Relacionados", aboutMarket:"Acerca de", priceHistory:"Historial", faqs:"Preguntas", contactSupport:"Contactar", tagline:"Comercia con el Futuro", heroSub:"Mercados reales. Resultados reales." },
  fr: { home:"Accueil", search:"Recherche", breaking:"Actualités", more:"Plus", trending:"Tendances", new:"Nouveau", politics:"Politique", sports:"Sports", crypto:"Crypto", login:"Connexion", signup:"S'inscrire", logout:"Déconnexion", portfolio:"Portefeuille", betslip:"Pari", help:"Aide", profile:"Profil", balance:"Solde", deposit:"Dépôt", placeOrder:"Placer l'Ordre", buyYes:"Acheter OUI", buyNo:"Acheter NON", yes:"OUI", no:"NON", volume:"Volume", expires:"Expire", chance:"chance", today:"Aujourd'hui", thisWeek:"Cette Semaine", thisMonth:"Ce Mois", allTime:"Tout", allCategories:"Tout", country:"Pays", world:"Monde", email:"Email", password:"Mot de passe", username:"Utilisateur", welcome:"Bienvenue", noAccount:"Pas de compte?", hasAccount:"Vous avez un compte?", emptySlip:"Pari vide", addToSlip:"Ajouter", removeFromSlip:"Retirer", totalStake:"Mise Totale", potentialPayout:"Gain Potentiel", submitSlip:"Soumettre Tout", myPositions:"Mes Positions", noPositions:"Aucune position", marketDetail:"Détails", relatedMarkets:"Liés", aboutMarket:"À propos", priceHistory:"Historique", faqs:"FAQ", contactSupport:"Contact", tagline:"Pariez sur l'Avenir", heroSub:"Marchés réels. Résultats réels." },
  de: { home:"Start", search:"Suche", breaking:"Aktuell", more:"Mehr", trending:"Trends", new:"Neu", politics:"Politik", sports:"Sport", crypto:"Krypto", login:"Anmelden", signup:"Registrieren", logout:"Abmelden", portfolio:"Portfolio", betslip:"Wettschein", help:"Hilfe", profile:"Profil", balance:"Guthaben", deposit:"Einzahlen", placeOrder:"Bestellen", buyYes:"JA Kaufen", buyNo:"NEIN Kaufen", yes:"JA", no:"NEIN", volume:"Volumen", expires:"Läuft ab", chance:"Chance", today:"Heute", thisWeek:"Diese Woche", thisMonth:"Diesen Monat", allTime:"Alle Zeit", allCategories:"Alle", country:"Land", world:"Welt", email:"E-Mail", password:"Passwort", username:"Benutzer", welcome:"Willkommen", noAccount:"Kein Konto?", hasAccount:"Konto vorhanden?", emptySlip:"Leer", addToSlip:"Hinzufügen", removeFromSlip:"Entfernen", totalStake:"Gesamt", potentialPayout:"Mögliche Auszahlung", submitSlip:"Alle Einreichen", myPositions:"Meine Positionen", noPositions:"Keine Positionen", marketDetail:"Details", relatedMarkets:"Verwandt", aboutMarket:"Über", priceHistory:"Verlauf", faqs:"FAQ", contactSupport:"Kontakt", tagline:"Handle mit der Zukunft", heroSub:"Echte Märkte. Echte Ergebnisse." },
  it: { home:"Home", search:"Cerca", breaking:"Ultime", more:"Altro", trending:"Tendenze", new:"Nuovo", politics:"Politica", sports:"Sport", crypto:"Cripto", login:"Accedi", signup:"Registrati", logout:"Esci", portfolio:"Portafoglio", betslip:"Schedina", help:"Aiuto", profile:"Profilo", balance:"Saldo", deposit:"Deposita", placeOrder:"Piazza Ordine", buyYes:"Compra SÌ", buyNo:"Compra NO", yes:"SÌ", no:"NO", volume:"Volume", expires:"Scade", chance:"probabilità", today:"Oggi", thisWeek:"Questa Settimana", thisMonth:"Questo Mese", allTime:"Sempre", allCategories:"Tutte", country:"Paese", world:"Mondo", email:"Email", password:"Password", username:"Utente", welcome:"Benvenuto", noAccount:"Non hai un account?", hasAccount:"Hai un account?", emptySlip:"Schedina vuota", addToSlip:"Aggiungi", removeFromSlip:"Rimuovi", totalStake:"Puntata", potentialPayout:"Vincita Possibile", submitSlip:"Invia Tutto", myPositions:"Mie Posizioni", noPositions:"Nessuna posizione", marketDetail:"Dettagli", relatedMarkets:"Correlati", aboutMarket:"Info", priceHistory:"Storico", faqs:"FAQ", contactSupport:"Contatta", tagline:"Scommetti sul Futuro", heroSub:"Mercati veri. Risultati veri." },
  tr: { home:"Ana Sayfa", search:"Ara", breaking:"Son Dakika", more:"Daha Fazla", trending:"Popüler", new:"Yeni", politics:"Siyaset", sports:"Spor", crypto:"Kripto", login:"Giriş", signup:"Kayıt Ol", logout:"Çıkış", portfolio:"Portföy", betslip:"Bahis Kuponu", help:"Yardım", profile:"Profil", balance:"Bakiye", deposit:"Para Yatır", placeOrder:"Bahis Yap", buyYes:"EVET Al", buyNo:"HAYIR Al", yes:"EVET", no:"HAYIR", volume:"Hacim", expires:"Bitiş", chance:"olasılık", today:"Bugün", thisWeek:"Bu Hafta", thisMonth:"Bu Ay", allTime:"Tümü", allCategories:"Hepsi", country:"Ülke", world:"Dünya", email:"E-posta", password:"Şifre", username:"Kullanıcı", welcome:"Hoş geldiniz", noAccount:"Hesabınız yok mu?", hasAccount:"Hesabınız var mı?", emptySlip:"Kupon boş", addToSlip:"Ekle", removeFromSlip:"Kaldır", totalStake:"Toplam", potentialPayout:"Olası Kazanç", submitSlip:"Tümünü Gönder", myPositions:"Pozisyonlarım", noPositions:"Pozisyon yok", marketDetail:"Detay", relatedMarkets:"İlgili", aboutMarket:"Hakkında", priceHistory:"Geçmiş", faqs:"SSS", contactSupport:"Destek", tagline:"Geleceğe Yatırım Yap", heroSub:"Gerçek piyasalar. Gerçek sonuçlar." },
  ar: { home:"الرئيسية", search:"بحث", breaking:"عاجل", more:"المزيد", trending:"الرائج", new:"جديد", politics:"سياسة", sports:"رياضة", crypto:"عملات", login:"دخول", signup:"تسجيل", logout:"خروج", portfolio:"المحفظة", betslip:"القسيمة", help:"المساعدة", profile:"الملف", balance:"الرصيد", deposit:"إيداع", placeOrder:"إرسال", buyYes:"شراء نعم", buyNo:"شراء لا", yes:"نعم", no:"لا", volume:"الحجم", expires:"ينتهي", chance:"الفرصة", today:"اليوم", thisWeek:"الأسبوع", thisMonth:"الشهر", allTime:"الكل", allCategories:"الكل", country:"الدولة", world:"العالم", email:"البريد", password:"كلمة المرور", username:"المستخدم", welcome:"مرحباً", noAccount:"ليس لديك حساب؟", hasAccount:"لديك حساب؟", emptySlip:"القسيمة فارغة", addToSlip:"إضافة", removeFromSlip:"حذف", totalStake:"المجموع", potentialPayout:"الربح المحتمل", submitSlip:"إرسال الكل", myPositions:"مراكزي", noPositions:"لا توجد مراكز", marketDetail:"التفاصيل", relatedMarkets:"مرتبطة", aboutMarket:"حول", priceHistory:"السجل", faqs:"الأسئلة", contactSupport:"اتصل بنا", tagline:"تداول على المستقبل", heroSub:"أسواق حقيقية. نتائج حقيقية." },
};

const LANGS = [
  {code:"en",name:"English",flag:"🇬🇧"},
  {code:"sq",name:"Shqip",flag:"🇦🇱"},
  {code:"es",name:"Español",flag:"🇪🇸"},
  {code:"fr",name:"Français",flag:"🇫🇷"},
  {code:"de",name:"Deutsch",flag:"🇩🇪"},
  {code:"it",name:"Italiano",flag:"🇮🇹"},
  {code:"tr",name:"Türkçe",flag:"🇹🇷"},
  {code:"ar",name:"العربية",flag:"🇸🇦"},
];

// ═══════════════════════════════════════════════════════════════
// MARKETS DATA
// ═══════════════════════════════════════════════════════════════
const today = new Date("2026-05-14");
const daysFromNow = (d) => Math.ceil((new Date(d) - today) / (1000*60*60*24));

const MARKETS = [
  // SHORT-TERM (this week / month)
  { id:1, q:"Will Albania beat Italy in next friendly match?", icon:"⚽", cat:"Sports", country:"Albania", yes:34, vol:"240K", exp:"2026-05-21", trending:true, featured:true, term:"week" },
  { id:2, q:"Will Bitcoin close above $110,000 this week?", icon:"₿", cat:"Crypto", country:"World", yes:58, vol:"3.2M", exp:"2026-05-18", trending:true, featured:true, term:"week" },
  { id:3, q:"Will SPAK file new charges against a minister this week?", icon:"⚖️", cat:"Politics", country:"Albania", yes:47, vol:"180K", exp:"2026-05-21", trending:true, featured:true, term:"week" },
  { id:4, q:"Will Trump tweet more than 50 times this week?", icon:"📱", cat:"Politics", country:"USA", yes:72, vol:"890K", exp:"2026-05-21", trending:true, featured:true, term:"week" },
  { id:5, q:"Will ETH outperform BTC this week?", icon:"⟠", cat:"Crypto", country:"World", yes:41, vol:"1.4M", exp:"2026-05-18", trending:true, featured:false, term:"week" },
  { id:6, q:"Will Real Madrid score 3+ goals in next match?", icon:"⚽", cat:"Sports", country:"Spain", yes:52, vol:"680K", exp:"2026-05-19", trending:true, featured:false, term:"week" },
  { id:7, q:"Will Tirana Mayor Veliaj be released this month?", icon:"🏛️", cat:"Politics", country:"Albania", yes:18, vol:"520K", exp:"2026-05-31", trending:true, featured:true, term:"month" },
  { id:8, q:"Will the Fed announce rate decision this month?", icon:"🏦", cat:"Economy", country:"USA", yes:96, vol:"1.8M", exp:"2026-05-31", trending:false, featured:false, term:"month" },
  { id:9, q:"Will GTA VI release date be confirmed this month?", icon:"🎮", cat:"Entertainment", country:"World", yes:38, vol:"2.1M", exp:"2026-05-31", trending:true, featured:true, term:"month" },
  { id:10, q:"Will Verstappen win Monaco GP 2026?", icon:"🏎️", cat:"Sports", country:"World", yes:44, vol:"1.1M", exp:"2026-05-24", trending:true, featured:false, term:"week" },
  // ALBANIA
  { id:101, q:"Will Albania complete EU accession by end of 2027?", icon:"🇪🇺", cat:"Politics", country:"Albania", yes:58, vol:"1.2M", exp:"2027-12-31", trending:true, featured:true, term:"year" },
  { id:102, q:"Will Albania host 2027 NATO Summit successfully?", icon:"🛡️", cat:"Politics", country:"Albania", yes:89, vol:"430K", exp:"2027-10-31", trending:true, featured:true, term:"year" },
  { id:103, q:"Will SPAK convict Deputy PM Balluku?", icon:"⚖️", cat:"Politics", country:"Albania", yes:42, vol:"680K", exp:"2026-12-31", trending:true, featured:false, term:"year" },
  { id:104, q:"Will Tirana Mayor Veliaj be found guilty?", icon:"🏛️", cat:"Politics", country:"Albania", yes:55, vol:"920K", exp:"2027-06-30", trending:true, featured:false, term:"year" },
  { id:105, q:"Will Albania's tourism exceed 13M visitors in 2026?", icon:"🏖️", cat:"Economy", country:"Albania", yes:71, vol:"200K", exp:"2026-12-31", trending:false, featured:false, term:"year" },
  { id:106, q:"Will Albania qualify for 2026 FIFA World Cup?", icon:"⚽", cat:"Sports", country:"Albania", yes:18, vol:"340K", exp:"2026-06-01", trending:true, featured:false, term:"month" },
  { id:107, q:"Will Albania-Kosovo customs union be signed in 2026?", icon:"🤝", cat:"Politics", country:"Albania", yes:31, vol:"220K", exp:"2026-12-31", trending:false, featured:false, term:"year" },
  { id:108, q:"Will Albania's GDP grow above 4% in 2026?", icon:"💸", cat:"Economy", country:"Albania", yes:62, vol:"140K", exp:"2026-12-31", trending:false, featured:false, term:"year" },
  // USA
  { id:201, q:"Will Trump approval rating exceed 50% by Q3 2026?", icon:"🇺🇸", cat:"Politics", country:"USA", yes:34, vol:"4.2M", exp:"2026-09-30", trending:true, featured:true, term:"month" },
  { id:202, q:"Will US enter recession in 2026?", icon:"📉", cat:"Economy", country:"USA", yes:33, vol:"2.1M", exp:"2026-12-31", trending:true, featured:false, term:"year" },
  { id:203, q:"Will S&P 500 hit 7,000 in 2026?", icon:"💹", cat:"Economy", country:"USA", yes:61, vol:"2.9M", exp:"2026-12-31", trending:false, featured:false, term:"year" },
  { id:204, q:"Will Fed cut rates by September 2026?", icon:"🏦", cat:"Economy", country:"USA", yes:67, vol:"2.4M", exp:"2026-09-01", trending:true, featured:true, term:"month" },
  { id:205, q:"Will Lakers win NBA championship 2026?", icon:"🏀", cat:"Sports", country:"USA", yes:12, vol:"890K", exp:"2026-06-30", trending:false, featured:false, term:"month" },
  // UK
  { id:301, q:"Will UK inflation drop below 2% in 2026?", icon:"🇬🇧", cat:"Economy", country:"UK", yes:38, vol:"650K", exp:"2026-12-31", trending:false, featured:false, term:"year" },
  { id:302, q:"Will Keir Starmer remain PM through 2026?", icon:"🏛️", cat:"Politics", country:"UK", yes:81, vol:"420K", exp:"2026-12-31", trending:false, featured:false, term:"year" },
  { id:303, q:"Will UK rejoin EU single market by 2030?", icon:"🇪🇺", cat:"Politics", country:"UK", yes:17, vol:"950K", exp:"2030-01-01", trending:false, featured:false, term:"year" },
  // Germany
  { id:401, q:"Will Germany's coalition government collapse in 2026?", icon:"🇩🇪", cat:"Politics", country:"Germany", yes:28, vol:"380K", exp:"2026-12-31", trending:false, featured:false, term:"year" },
  { id:402, q:"Will Bayern Munich win Bundesliga 2025-26?", icon:"⚽", cat:"Sports", country:"Germany", yes:73, vol:"540K", exp:"2026-05-18", trending:true, featured:false, term:"week" },
  // France
  { id:501, q:"Will Macron's approval rise above 35% in 2026?", icon:"🇫🇷", cat:"Politics", country:"France", yes:24, vol:"280K", exp:"2026-12-31", trending:false, featured:false, term:"year" },
  { id:502, q:"Will PSG win Champions League 2026?", icon:"⚽", cat:"Sports", country:"France", yes:22, vol:"720K", exp:"2026-05-30", trending:true, featured:false, term:"month" },
  // Italy
  { id:601, q:"Will Meloni call early elections in 2026?", icon:"🇮🇹", cat:"Politics", country:"Italy", yes:14, vol:"190K", exp:"2026-12-31", trending:false, featured:false, term:"year" },
  { id:602, q:"Will Inter Milan win Serie A 2025-26?", icon:"⚽", cat:"Sports", country:"Italy", yes:48, vol:"410K", exp:"2026-05-25", trending:false, featured:false, term:"week" },
  // Turkey
  { id:701, q:"Will Turkey's inflation drop below 30% in 2026?", icon:"🇹🇷", cat:"Economy", country:"Turkey", yes:41, vol:"320K", exp:"2026-12-31", trending:false, featured:false, term:"year" },
  { id:702, q:"Will Galatasaray win Süper Lig 2025-26?", icon:"⚽", cat:"Sports", country:"Turkey", yes:68, vol:"230K", exp:"2026-05-20", trending:false, featured:false, term:"week" },
  // Spain
  { id:801, q:"Will Real Madrid win La Liga 2025-26?", icon:"⚽", cat:"Sports", country:"Spain", yes:64, vol:"890K", exp:"2026-05-24", trending:true, featured:false, term:"week" },
  { id:802, q:"Will Real Madrid win Champions League 2026?", icon:"🏆", cat:"Sports", country:"Spain", yes:28, vol:"1.8M", exp:"2026-05-30", trending:true, featured:false, term:"month" },
  // China
  { id:901, q:"Will China's GDP exceed 5% growth in 2026?", icon:"🇨🇳", cat:"Economy", country:"China", yes:48, vol:"1.1M", exp:"2026-12-31", trending:false, featured:false, term:"year" },
  { id:902, q:"Will China invade Taiwan before 2028?", icon:"⚠️", cat:"Politics", country:"China", yes:8, vol:"3.4M", exp:"2028-01-01", trending:true, featured:false, term:"year" },
  // CRYPTO
  { id:1001, q:"Will Bitcoin exceed $150,000 in 2026?", icon:"₿", cat:"Crypto", country:"World", yes:44, vol:"5.1M", exp:"2026-12-31", trending:true, featured:true, term:"year" },
  { id:1002, q:"Will Ethereum flip Bitcoin by 2027?", icon:"⟠", cat:"Crypto", country:"World", yes:18, vol:"3.2M", exp:"2027-01-01", trending:false, featured:false, term:"year" },
  { id:1003, q:"Will Solana reach $500 in 2026?", icon:"💎", cat:"Crypto", country:"World", yes:37, vol:"2.1M", exp:"2026-12-31", trending:true, featured:false, term:"year" },
  { id:1004, q:"Will Dogecoin reach $1 in 2026?", icon:"🐕", cat:"Crypto", country:"World", yes:28, vol:"1.9M", exp:"2026-12-31", trending:false, featured:false, term:"year" },
  { id:1005, q:"Will XRP be classified non-security?", icon:"⚡", cat:"Crypto", country:"World", yes:64, vol:"1.4M", exp:"2026-12-31", trending:true, featured:false, term:"year" },
  // TECH
  { id:1101, q:"Will GPT-5 release before Q3 2026?", icon:"🤖", cat:"Tech", country:"World", yes:72, vol:"890K", exp:"2026-07-01", trending:true, featured:false, term:"month" },
  { id:1102, q:"Will Apple release AR glasses in 2026?", icon:"🥽", cat:"Tech", country:"World", yes:35, vol:"1.1M", exp:"2026-12-31", trending:false, featured:false, term:"year" },
  { id:1103, q:"Will Tesla Robotaxi launch in 2026?", icon:"🚗", cat:"Tech", country:"World", yes:48, vol:"2.2M", exp:"2026-12-31", trending:true, featured:false, term:"year" },
  { id:1104, q:"Will SpaceX land humans on Moon in 2026?", icon:"🛸", cat:"Tech", country:"World", yes:24, vol:"1.4M", exp:"2026-12-31", trending:false, featured:false, term:"year" },
  // ENTERTAINMENT
  { id:1201, q:"Will Taylor Swift release new album in 2026?", icon:"🎵", cat:"Entertainment", country:"World", yes:55, vol:"1.8M", exp:"2026-12-31", trending:true, featured:false, term:"year" },
  { id:1202, q:"Will Netflix reach 350M subscribers by 2026?", icon:"📺", cat:"Entertainment", country:"World", yes:66, vol:"590K", exp:"2026-12-31", trending:false, featured:false, term:"year" },
  { id:1203, q:"Will Oasis tour gross $1B+?", icon:"🎸", cat:"Entertainment", country:"World", yes:54, vol:"780K", exp:"2026-12-31", trending:true, featured:false, term:"year" },
  // ECONOMY
  { id:1301, q:"Will gold exceed $4,000/oz in 2026?", icon:"🥇", cat:"Economy", country:"World", yes:52, vol:"1.4M", exp:"2026-12-31", trending:true, featured:false, term:"year" },
  { id:1302, q:"Will Brent oil exceed $100/barrel in 2026?", icon:"🛢️", cat:"Economy", country:"World", yes:38, vol:"1.3M", exp:"2026-12-31", trending:false, featured:false, term:"year" },
];

const COUNTRIES = ["All","Albania","USA","UK","Germany","France","Italy","Turkey","Spain","China","World"];
const COUNTRY_FLAGS = {All:"🌐",Albania:"🇦🇱",USA:"🇺🇸",UK:"🇬🇧",Germany:"🇩🇪",France:"🇫🇷",Italy:"🇮🇹",Turkey:"🇹🇷",Spain:"🇪🇸",China:"🇨🇳",World:"🌍"};
const CATEGORIES = ["All","Politics","Crypto","Sports","Tech","Economy","Entertainment"];
const CAT_ICONS = {All:"📊",Politics:"🏛️",Crypto:"₿",Sports:"⚽",Tech:"🤖",Economy:"💹",Entertainment:"🎬"};

const FAQS = [
  {q:"What is DonyMarket?", a:"DonyMarket is a prediction market platform where you can trade on real-world events. Each market resolves to YES or NO based on the outcome."},
  {q:"How do I sign up?", a:"Tap the 'Sign Up' button at the top right and create an account with email and password. Your account is saved on this device."},
  {q:"What is a bet slip?", a:"A bet slip lets you collect multiple predictions before submitting them all at once. Add markets to your slip, then place all bets together."},
  {q:"How is YES/NO price calculated?", a:"The price reflects the market's estimated probability. If YES is 60¢, the market thinks there's a 60% chance the event happens."},
  {q:"Can I withdraw money?", a:"This is a demo prediction market. Real money trading requires regulatory licenses and is not yet available."},
  {q:"How are markets resolved?", a:"Markets resolve when the underlying event reaches its outcome. Trusted oracles verify results before payouts."},
  {q:"What countries are supported?", a:"DonyMarket displays markets globally with a special focus on Albanian politics and economy."},
];

// ═══════════════════════════════════════════════════════════════
// LOCALSTORAGE HELPERS
// ═══════════════════════════════════════════════════════════════
const ls = {
  get: (k, def) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : def; } catch { return def; } },
  set: (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
};

// ═══════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════
export default function App() {
  const [page, setPage] = useState("home"); // home, market, portfolio, slip, profile, auth, help, search
  const [authMode, setAuthMode] = useState("login"); // login or signup
  const [selectedMarket, setSelectedMarket] = useState(null);
  const [user, setUser] = useState(() => ls.get("dm_user", null));
  const [slip, setSlip] = useState(() => ls.get("dm_slip", []));
  const [positions, setPositions] = useState(() => ls.get("dm_positions", []));
  const [lang, setLang] = useState(() => ls.get("dm_lang", "en"));
  const [countryFilter, setCountryFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [timeFilter, setTimeFilter] = useState("allTime");
  const [search, setSearch] = useState("");
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [toast, setToast] = useState(null);

  const t = T[lang];
  const isRTL = lang === "ar";

  // Persist state
  useEffect(() => ls.set("dm_user", user), [user]);
  useEffect(() => ls.set("dm_slip", slip), [slip]);
  useEffect(() => ls.set("dm_positions", positions), [positions]);
  useEffect(() => ls.set("dm_lang", lang), [lang]);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  const addToSlip = (market, side) => {
    if (slip.find(s => s.id === market.id)) {
      showToast("Already in slip");
      return;
    }
    setSlip([...slip, { ...market, side, stake: "" }]);
    showToast(`Added to slip: ${side}`);
  };

  const removeFromSlip = (id) => setSlip(slip.filter(s => s.id !== id));

  const updateStake = (id, stake) => setSlip(slip.map(s => s.id === id ? {...s, stake} : s));

  const submitSlip = () => {
    if (!user) { setPage("auth"); setAuthMode("login"); return; }
    const valid = slip.filter(s => parseFloat(s.stake) > 0);
    if (valid.length === 0) { showToast("Enter stake amounts first"); return; }
    const newPositions = valid.map(s => ({
      ...s,
      placedAt: new Date().toISOString(),
      currentPrice: s.side === "YES" ? s.yes : 100 - s.yes,
      shares: (parseFloat(s.stake) / ((s.side === "YES" ? s.yes : 100 - s.yes) / 100)).toFixed(2),
    }));
    setPositions([...positions, ...newPositions]);
    setSlip([]);
    showToast(`${valid.length} bet${valid.length>1?'s':''} placed!`);
    setPage("portfolio");
  };

  const handleAuth = (email, password, username) => {
    if (authMode === "signup") {
      const newUser = { email, username: username || email.split("@")[0], balance: 1000, joinedAt: new Date().toISOString() };
      setUser(newUser);
      showToast(`Welcome, ${newUser.username}!`);
    } else {
      // Demo login
      setUser({ email, username: email.split("@")[0], balance: 1000, joinedAt: new Date().toISOString() });
      showToast("Logged in!");
    }
    setPage("home");
  };

  const logout = () => { setUser(null); showToast("Logged out"); setPage("home"); };

  // Filter markets
  const filteredMarkets = MARKETS.filter(m => {
    if (countryFilter !== "All" && m.country !== countryFilter) return false;
    if (categoryFilter !== "All" && m.cat !== categoryFilter) return false;
    if (timeFilter === "today" && daysFromNow(m.exp) > 1) return false;
    if (timeFilter === "thisWeek" && daysFromNow(m.exp) > 7) return false;
    if (timeFilter === "thisMonth" && daysFromNow(m.exp) > 31) return false;
    if (search && !m.q.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const featuredMarkets = MARKETS.filter(m => m.featured);
  const trendingMarkets = MARKETS.filter(m => m.trending).slice(0, 6);

  return (
    <div style={{minHeight:"100vh",background:"#070910",color:"#E8EAF6",fontFamily:"'DM Sans','Segoe UI',system-ui,sans-serif",paddingBottom:80,direction:isRTL?"rtl":"ltr"}}>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0;}
        ::placeholder{color:rgba(200,200,230,0.3);}
        input{font-family:inherit;}
        input[type=number]::-webkit-inner-spin-button{-webkit-appearance:none;}
        button:hover{filter:brightness(1.1);}
        button:active{transform:scale(0.97);}
        a{text-decoration:none;color:inherit;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(15px);}to{opacity:1;transform:translateY(0);}}
        @keyframes ticker{0%{transform:translateX(0);}100%{transform:translateX(-50%);}}
        @keyframes pulse{0%,100%{opacity:0.6;}50%{opacity:1;}}
        @keyframes slideUp{from{transform:translateY(100%);}to{transform:translateY(0);}}
        ::-webkit-scrollbar{width:6px;height:6px;}
        ::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.1);border-radius:3px;}
      `}</style>

      {/* Ambient backgrounds */}
      <div style={{position:"fixed",top:-200,left:-150,width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle,rgba(29,78,216,0.08) 0%,transparent 70%)",pointerEvents:"none",zIndex:0}}/>
      <div style={{position:"fixed",bottom:-100,right:-100,width:400,height:400,borderRadius:"50%",background:"radial-gradient(circle,rgba(220,38,38,0.06) 0%,transparent 70%)",pointerEvents:"none",zIndex:0}}/>

      {/* TOP BAR */}
      <Header user={user} setPage={setPage} setAuthMode={setAuthMode} slip={slip}
        showLangMenu={showLangMenu} setShowLangMenu={setShowLangMenu} lang={lang} setLang={setLang} t={t} logout={logout}/>

      {/* PAGES */}
      <div style={{position:"relative",zIndex:1}}>
        {page === "home" && <HomePage t={t} markets={filteredMarkets} featured={featuredMarkets} trending={trendingMarkets}
          setSelectedMarket={setSelectedMarket} setPage={setPage} addToSlip={addToSlip} slip={slip}
          countryFilter={countryFilter} setCountryFilter={setCountryFilter}
          categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter}
          timeFilter={timeFilter} setTimeFilter={setTimeFilter}/>}
        {page === "market" && selectedMarket && <MarketDetail t={t} market={selectedMarket} setPage={setPage}
          addToSlip={addToSlip} slip={slip} markets={MARKETS} setSelectedMarket={setSelectedMarket}/>}
        {page === "portfolio" && <PortfolioPage t={t} positions={positions} user={user} setPage={setPage} setAuthMode={setAuthMode}/>}
        {page === "slip" && <SlipPage t={t} slip={slip} updateStake={updateStake} removeFromSlip={removeFromSlip}
          submitSlip={submitSlip} user={user} setPage={setPage} setAuthMode={setAuthMode}/>}
        {page === "profile" && <ProfilePage t={t} user={user} setPage={setPage} setAuthMode={setAuthMode} logout={logout}
          lang={lang} setLang={setLang} positions={positions}/>}
        {page === "auth" && <AuthPage t={t} authMode={authMode} setAuthMode={setAuthMode} handleAuth={handleAuth} setPage={setPage}/>}
        {page === "help" && <HelpPage t={t} setPage={setPage}/>}
        {page === "search" && <SearchPage t={t} search={search} setSearch={setSearch} markets={MARKETS}
          setSelectedMarket={setSelectedMarket} setPage={setPage}/>}
      </div>

      {/* BOTTOM NAV (Polymarket-style) */}
      <BottomNav page={page} setPage={setPage} t={t} slipCount={slip.length}/>

      {/* TOAST */}
      {toast && (
        <div style={{position:"fixed",bottom:90,left:"50%",transform:"translateX(-50%)",background:"rgba(29,78,216,0.95)",backdropFilter:"blur(12px)",color:"#fff",padding:"12px 24px",borderRadius:999,fontSize:14,fontWeight:600,zIndex:9999,boxShadow:"0 10px 30px rgba(0,0,0,0.5)",animation:"fadeUp 0.3s ease"}}>
          {toast}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// HEADER
// ═══════════════════════════════════════════════════════════════
function Header({ user, setPage, setAuthMode, slip, showLangMenu, setShowLangMenu, lang, setLang, t, logout }) {
  return (
    <header style={{position:"sticky",top:0,zIndex:200,background:"rgba(7,9,16,0.92)",backdropFilter:"blur(20px)",borderBottom:"1px solid rgba(255,255,255,0.05)",padding:"0 16px"}}>
      <div style={{maxWidth:1280,margin:"0 auto",height:60,display:"flex",alignItems:"center",justifyContent:"space-between",gap:12}}>
        <div onClick={()=>setPage("home")} style={{display:"flex",alignItems:"baseline",cursor:"pointer"}}>
          <span style={{fontFamily:"Georgia,serif",fontSize:24,fontWeight:900,color:"#FACC15",letterSpacing:-0.5}}>Dony</span>
          <span style={{fontFamily:"Georgia,serif",fontSize:24,fontWeight:900,color:"#ef4444",letterSpacing:-0.5}}>market</span>
        </div>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          {/* Language switcher */}
          <div style={{position:"relative"}}>
            <button onClick={()=>setShowLangMenu(!showLangMenu)} style={{padding:"7px 10px",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:8,color:"#E8EAF6",fontSize:14,cursor:"pointer",fontFamily:"inherit"}}>
              {LANGS.find(l=>l.code===lang)?.flag} ▾
            </button>
            {showLangMenu && (
              <div style={{position:"absolute",top:"100%",right:0,marginTop:6,background:"#0c0e1a",border:"1px solid rgba(255,255,255,0.1)",borderRadius:12,padding:6,minWidth:160,boxShadow:"0 16px 40px rgba(0,0,0,0.6)",zIndex:500}}>
                {LANGS.map(l=>(
                  <button key={l.code} onClick={()=>{setLang(l.code);setShowLangMenu(false);}} style={{display:"flex",alignItems:"center",gap:10,width:"100%",padding:"9px 12px",background:lang===l.code?"rgba(212,168,67,0.15)":"transparent",border:"none",borderRadius:8,color:lang===l.code?"#FACC15":"#E8EAF6",fontSize:13,cursor:"pointer",fontFamily:"inherit",textAlign:"left"}}>
                    <span>{l.flag}</span><span>{l.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          {user ? (
            <button onClick={()=>setPage("profile")} style={{padding:"7px 14px",background:"linear-gradient(135deg,#1d4ed8,#ef4444)",border:"none",borderRadius:8,color:"#fff",fontWeight:700,fontSize:13,cursor:"pointer",fontFamily:"inherit"}}>
              👤 {user.username}
            </button>
          ) : (
            <>
              <button onClick={()=>{setAuthMode("login");setPage("auth");}} style={{padding:"7px 14px",background:"transparent",border:"1px solid rgba(255,255,255,0.15)",borderRadius:8,color:"#E8EAF6",fontWeight:600,fontSize:13,cursor:"pointer",fontFamily:"inherit"}}>{t.login}</button>
              <button onClick={()=>{setAuthMode("signup");setPage("auth");}} style={{padding:"7px 14px",background:"linear-gradient(135deg,#1d4ed8,#ef4444)",border:"none",borderRadius:8,color:"#fff",fontWeight:700,fontSize:13,cursor:"pointer",fontFamily:"inherit"}}>{t.signup}</button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

// ═══════════════════════════════════════════════════════════════
// HOME PAGE
// ═══════════════════════════════════════════════════════════════
function HomePage({ t, markets, featured, trending, setSelectedMarket, setPage, addToSlip, slip, countryFilter, setCountryFilter, categoryFilter, setCategoryFilter, timeFilter, setTimeFilter }) {
  return (
    <>
      {/* HERO */}
      <section style={{maxWidth:1100,margin:"0 auto",padding:"40px 16px 24px",textAlign:"center"}}>
        <div style={{display:"inline-block",background:"rgba(212,168,67,0.08)",border:"1px solid rgba(212,168,67,0.2)",borderRadius:999,padding:"4px 14px",fontSize:11,color:"#D4A843",marginBottom:18,letterSpacing:1.5,fontWeight:700,textTransform:"uppercase"}}>🎯 Prediction Markets</div>
        <h1 style={{fontFamily:"Georgia,serif",fontSize:"clamp(32px,5vw,52px)",fontWeight:900,lineHeight:1.05,marginBottom:14,color:"#F1F5F9",letterSpacing:-1.5}}>
          <span style={{background:"linear-gradient(105deg,#F0C060 0%,#ef4444 50%,#a855f7 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{t.tagline}</span>
        </h1>
        <p style={{fontSize:15,color:"rgba(232,234,246,0.55)",lineHeight:1.6,marginBottom:24}}>{t.heroSub}</p>
      </section>

      {/* TIME FILTERS */}
      <section style={{maxWidth:1280,margin:"0 auto",padding:"0 16px 16px"}}>
        <div style={{display:"flex",gap:6,overflowX:"auto",paddingBottom:4}}>
          {[["today",t.today,"⚡"],["thisWeek",t.thisWeek,"📅"],["thisMonth",t.thisMonth,"📆"],["allTime",t.allTime,"♾️"]].map(([key,label,icon])=>(
            <button key={key} onClick={()=>setTimeFilter(key)} style={{flexShrink:0,padding:"8px 14px",background:timeFilter===key?"linear-gradient(135deg,rgba(212,168,67,0.25),rgba(239,68,68,0.18))":"rgba(255,255,255,0.04)",border:timeFilter===key?"1px solid rgba(212,168,67,0.4)":"1px solid rgba(255,255,255,0.07)",borderRadius:10,color:timeFilter===key?"#F0C060":"rgba(232,234,246,0.6)",fontSize:13,fontWeight:timeFilter===key?700:500,cursor:"pointer",fontFamily:"inherit",whiteSpace:"nowrap"}}>
              {icon} {label}
            </button>
          ))}
        </div>
      </section>

      {/* COUNTRY FILTER */}
      <section style={{maxWidth:1280,margin:"0 auto",padding:"0 16px 16px"}}>
        <div style={{fontSize:11,fontWeight:800,color:"#D4A843",letterSpacing:1.5,textTransform:"uppercase",marginBottom:10}}>{t.country}</div>
        <div style={{display:"flex",gap:6,overflowX:"auto",paddingBottom:4}}>
          {COUNTRIES.map(c=>(
            <button key={c} onClick={()=>setCountryFilter(c)} style={{flexShrink:0,padding:"7px 12px",background:countryFilter===c?"rgba(220,38,38,0.18)":"rgba(255,255,255,0.04)",border:countryFilter===c?"1px solid rgba(220,38,38,0.4)":"1px solid rgba(255,255,255,0.07)",borderRadius:999,color:countryFilter===c?"#fca5a5":"rgba(232,234,246,0.55)",fontSize:13,fontWeight:countryFilter===c?700:500,cursor:"pointer",fontFamily:"inherit",whiteSpace:"nowrap"}}>
              {COUNTRY_FLAGS[c]} {c}
            </button>
          ))}
        </div>
      </section>

      {/* CATEGORY FILTER */}
      <section style={{maxWidth:1280,margin:"0 auto",padding:"0 16px 20px"}}>
        <div style={{display:"flex",gap:6,overflowX:"auto",paddingBottom:4}}>
          {CATEGORIES.map(c=>(
            <button key={c} onClick={()=>setCategoryFilter(c)} style={{flexShrink:0,padding:"7px 12px",background:categoryFilter===c?"rgba(29,78,216,0.18)":"rgba(255,255,255,0.04)",border:categoryFilter===c?"1px solid rgba(29,78,216,0.4)":"1px solid rgba(255,255,255,0.07)",borderRadius:999,color:categoryFilter===c?"#93c5fd":"rgba(232,234,246,0.55)",fontSize:13,fontWeight:categoryFilter===c?700:500,cursor:"pointer",fontFamily:"inherit",whiteSpace:"nowrap"}}>
              {CAT_ICONS[c]} {c}
            </button>
          ))}
        </div>
      </section>

      {/* MARKETS GRID */}
      <section style={{maxWidth:1280,margin:"0 auto",padding:"0 16px 80px"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
          <h2 style={{fontFamily:"Georgia,serif",fontSize:20,fontWeight:700}}>📊 Markets</h2>
          <span style={{fontSize:12,color:"rgba(232,234,246,0.4)"}}>{markets.length} results</span>
        </div>
        {markets.length === 0 ? (
          <div style={{padding:60,textAlign:"center",color:"rgba(232,234,246,0.3)",fontSize:14}}>No markets match your filters</div>
        ) : (
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:14}}>
            {markets.map((m,i)=>(
              <div key={m.id} style={{animation:`fadeUp 0.3s ease ${(i%12)*0.03}s both`}}>
                <MarketCard market={m} t={t} onView={()=>{setSelectedMarket(m);setPage("market");}} onAdd={addToSlip} inSlip={slip.some(s=>s.id===m.id)}/>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════
// MARKET CARD
// ═══════════════════════════════════════════════════════════════
function MarketCard({ market, t, onView, onAdd, inSlip }) {
  return (
    <div style={{background:"rgba(255,255,255,0.035)",border:`1px solid ${inSlip?"rgba(212,168,67,0.4)":"rgba(255,255,255,0.07)"}`,borderRadius:14,padding:16,position:"relative",transition:"all 0.2s",cursor:"pointer"}}>
      {market.trending && <span style={{position:"absolute",top:10,right:10,background:"rgba(250,204,21,0.12)",border:"1px solid rgba(250,204,21,0.3)",borderRadius:999,padding:"2px 8px",fontSize:10,color:"#FACC15",fontWeight:700}}>🔥</span>}
      <div onClick={onView} style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
        <span style={{fontSize:20}}>{market.icon}</span>
        <span style={{fontSize:10,fontWeight:800,textTransform:"uppercase",letterSpacing:0.8,color:"#93c5fd"}}>{COUNTRY_FLAGS[market.country]} {market.country}</span>
      </div>
      <div onClick={onView} style={{fontFamily:"Georgia,serif",fontSize:14,fontWeight:600,lineHeight:1.45,color:"#f1f5f9",marginBottom:12,minHeight:42}}>{market.q}</div>
      <div onClick={onView} style={{display:"flex",alignItems:"baseline",gap:6,marginBottom:8}}>
        <span style={{fontSize:22,fontWeight:800,color:"#22c55e",fontFamily:"Georgia,serif"}}>{market.yes}%</span>
        <span style={{fontSize:10,color:"rgba(200,200,230,0.45)"}}>{t.chance}</span>
        <span style={{fontSize:10,color:"#ef4444",marginLeft:"auto"}}>{100-market.yes}%</span>
      </div>
      <div style={{height:3,background:"rgba(220,38,38,0.2)",borderRadius:3,overflow:"hidden",marginBottom:10}}>
        <div style={{height:"100%",background:"linear-gradient(90deg,#22c55e,#16a34a)",borderRadius:3,width:`${market.yes}%`,transition:"width 0.5s"}}/>
      </div>
      <div onClick={onView} style={{display:"flex",justifyContent:"space-between",fontSize:10,color:"rgba(200,200,230,0.4)",marginBottom:10}}>
        <span>{t.volume} ${market.vol}</span><span>{market.exp}</span>
      </div>
      <div style={{display:"flex",gap:6}}>
        <button onClick={(e)=>{e.stopPropagation();onAdd(market,"YES");}} style={{flex:1,padding:8,background:"rgba(34,197,94,0.1)",border:"1px solid rgba(34,197,94,0.3)",borderRadius:7,color:"#4ade80",fontWeight:700,fontSize:11,cursor:"pointer",fontFamily:"inherit"}}>{t.yes} {market.yes}¢</button>
        <button onClick={(e)=>{e.stopPropagation();onAdd(market,"NO");}} style={{flex:1,padding:8,background:"rgba(220,38,38,0.1)",border:"1px solid rgba(220,38,38,0.3)",borderRadius:7,color:"#f87171",fontWeight:700,fontSize:11,cursor:"pointer",fontFamily:"inherit"}}>{t.no} {100-market.yes}¢</button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MARKET DETAIL
// ═══════════════════════════════════════════════════════════════
function MarketDetail({ t, market, setPage, addToSlip, slip, markets, setSelectedMarket }) {
  const related = markets.filter(m=>m.cat===market.cat && m.id!==market.id).slice(0,4);
  const inSlip = slip.some(s=>s.id===market.id);

  // Fake price history sparkline data
  const historyPoints = Array.from({length:20},(_,i)=> market.yes + Math.sin(i*0.5)*8 + (Math.random()-0.5)*4);

  return (
    <div style={{maxWidth:900,margin:"0 auto",padding:"20px 16px 100px"}}>
      <button onClick={()=>setPage("home")} style={{display:"flex",alignItems:"center",gap:6,padding:"7px 12px",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:8,color:"#E8EAF6",fontSize:13,cursor:"pointer",fontFamily:"inherit",marginBottom:20}}>← Back</button>
      
      <div style={{background:"linear-gradient(145deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))",border:"1px solid rgba(212,168,67,0.15)",borderRadius:20,padding:24,marginBottom:20}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
          <span style={{fontSize:36}}>{market.icon}</span>
          <div>
            <div style={{fontSize:11,fontWeight:800,color:"#FACC15",letterSpacing:1,textTransform:"uppercase"}}>{COUNTRY_FLAGS[market.country]} {market.country} · {market.cat}</div>
            {market.trending && <span style={{fontSize:11,color:"#FACC15"}}>🔥 Trending</span>}
          </div>
        </div>
        <h1 style={{fontFamily:"Georgia,serif",fontSize:22,fontWeight:700,lineHeight:1.4,marginBottom:18,color:"#F1F5F9"}}>{market.q}</h1>
        
        <div style={{display:"flex",alignItems:"baseline",gap:10,marginBottom:14}}>
          <span style={{fontFamily:"Georgia,serif",fontSize:48,fontWeight:900,color:"#22c55e"}}>{market.yes}%</span>
          <span style={{fontSize:14,color:"rgba(200,200,230,0.5)"}}>{t.chance} {t.yes}</span>
        </div>
        <div style={{height:6,background:"rgba(220,38,38,0.2)",borderRadius:4,overflow:"hidden",marginBottom:18}}>
          <div style={{height:"100%",background:"linear-gradient(90deg,#22c55e,#16a34a)",borderRadius:4,width:`${market.yes}%`}}/>
        </div>

        {/* Price history sparkline */}
        <div style={{marginBottom:18}}>
          <div style={{fontSize:11,fontWeight:800,color:"rgba(212,168,67,0.8)",letterSpacing:1,textTransform:"uppercase",marginBottom:10}}>{t.priceHistory}</div>
          <svg width="100%" height="60" viewBox="0 0 400 60" preserveAspectRatio="none">
            <polyline fill="none" stroke="url(#grad)" strokeWidth="2" points={historyPoints.map((y,i)=>`${i*(400/19)},${60-(y/100)*60}`).join(" ")}/>
            <defs>
              <linearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#1d4ed8"/>
                <stop offset="100%" stopColor="#22c55e"/>
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16,fontSize:13}}>
          <div style={{background:"rgba(255,255,255,0.03)",padding:"10px 12px",borderRadius:8}}>
            <div style={{fontSize:10,color:"rgba(200,200,230,0.5)",marginBottom:2}}>{t.volume}</div>
            <div style={{fontWeight:700}}>${market.vol}</div>
          </div>
          <div style={{background:"rgba(255,255,255,0.03)",padding:"10px 12px",borderRadius:8}}>
            <div style={{fontSize:10,color:"rgba(200,200,230,0.5)",marginBottom:2}}>{t.expires}</div>
            <div style={{fontWeight:700}}>{market.exp}</div>
          </div>
        </div>

        <div style={{display:"flex",gap:10}}>
          <button onClick={()=>addToSlip(market,"YES")} style={{flex:1,padding:14,background:"linear-gradient(135deg,#15803d,#166534)",border:"none",borderRadius:10,color:"#fff",fontWeight:800,fontSize:14,cursor:"pointer",fontFamily:"inherit"}}>{t.buyYes} {market.yes}¢</button>
          <button onClick={()=>addToSlip(market,"NO")} style={{flex:1,padding:14,background:"linear-gradient(135deg,#b91c1c,#991b1b)",border:"none",borderRadius:10,color:"#fff",fontWeight:800,fontSize:14,cursor:"pointer",fontFamily:"inherit"}}>{t.buyNo} {100-market.yes}¢</button>
        </div>
        {inSlip && <div style={{marginTop:10,padding:10,background:"rgba(212,168,67,0.1)",border:"1px solid rgba(212,168,67,0.3)",borderRadius:8,color:"#FACC15",fontSize:12,textAlign:"center"}}>✓ Added to bet slip</div>}
      </div>

      {/* About */}
      <div style={{background:"rgba(255,255,255,0.025)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:14,padding:18,marginBottom:18}}>
        <div style={{fontSize:11,fontWeight:800,color:"#D4A843",letterSpacing:1.2,textTransform:"uppercase",marginBottom:10}}>{t.aboutMarket}</div>
        <p style={{fontSize:14,lineHeight:1.6,color:"rgba(232,234,246,0.7)"}}>This market resolves based on the outcome described in the question. The resolution date is {market.exp}. Trading volume is currently ${market.vol} with active liquidity.</p>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div>
          <h3 style={{fontFamily:"Georgia,serif",fontSize:18,fontWeight:700,marginBottom:14}}>{t.relatedMarkets}</h3>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:12}}>
            {related.map(m=>(
              <MarketCard key={m.id} market={m} t={t} onView={()=>{setSelectedMarket(m);window.scrollTo(0,0);}} onAdd={addToSlip} inSlip={slip.some(s=>s.id===m.id)}/>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// BET SLIP
// ═══════════════════════════════════════════════════════════════
function SlipPage({ t, slip, updateStake, removeFromSlip, submitSlip, user, setPage, setAuthMode }) {
  const total = slip.reduce((a,s)=>a+(parseFloat(s.stake)||0),0);
  const potential = slip.reduce((a,s)=>{
    const stake = parseFloat(s.stake)||0;
    const price = s.side==="YES"?s.yes:100-s.yes;
    return a + (stake / (price/100));
  },0);

  return (
    <div style={{maxWidth:700,margin:"0 auto",padding:"20px 16px 100px"}}>
      <h1 style={{fontFamily:"Georgia,serif",fontSize:24,fontWeight:800,marginBottom:20}}>📝 {t.betslip}</h1>

      {slip.length === 0 ? (
        <div style={{padding:60,textAlign:"center",background:"rgba(255,255,255,0.03)",borderRadius:14,color:"rgba(232,234,246,0.4)"}}>
          <div style={{fontSize:40,marginBottom:12}}>📭</div>
          <div style={{fontSize:14}}>{t.emptySlip}</div>
          <button onClick={()=>setPage("home")} style={{marginTop:18,padding:"10px 20px",background:"linear-gradient(135deg,#1d4ed8,#ef4444)",border:"none",borderRadius:10,color:"#fff",fontWeight:700,fontSize:13,cursor:"pointer",fontFamily:"inherit"}}>Browse Markets</button>
        </div>
      ) : (
        <>
          <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:20}}>
            {slip.map(s=>(
              <div key={s.id} style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:12,padding:14}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"start",gap:10,marginBottom:10}}>
                  <div style={{flex:1}}>
                    <div style={{fontSize:11,color:"rgba(200,200,230,0.5)",marginBottom:4}}>{s.icon} {s.cat}</div>
                    <div style={{fontSize:13,fontWeight:600,lineHeight:1.4,fontFamily:"Georgia,serif"}}>{s.q}</div>
                  </div>
                  <button onClick={()=>removeFromSlip(s.id)} style={{background:"rgba(220,38,38,0.15)",border:"1px solid rgba(220,38,38,0.3)",borderRadius:8,padding:"4px 10px",color:"#f87171",fontSize:11,cursor:"pointer",fontFamily:"inherit",flexShrink:0}}>✕</button>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  <span style={{padding:"4px 10px",borderRadius:6,fontSize:11,fontWeight:800,background:s.side==="YES"?"rgba(34,197,94,0.18)":"rgba(220,38,38,0.18)",color:s.side==="YES"?"#22c55e":"#ef4444"}}>{s.side} {s.side==="YES"?s.yes:100-s.yes}¢</span>
                  <input type="number" placeholder="$0.00" value={s.stake} onChange={e=>updateStake(s.id,e.target.value)} style={{flex:1,background:"rgba(0,0,0,0.3)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:8,padding:"8px 12px",color:"#E8EAF6",fontSize:14,fontWeight:700,outline:"none"}}/>
                </div>
              </div>
            ))}
          </div>

          <div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(212,168,67,0.2)",borderRadius:12,padding:16,marginBottom:18}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:8,fontSize:13}}>
              <span style={{color:"rgba(200,200,230,0.6)"}}>{t.totalStake}</span>
              <span style={{fontWeight:800}}>${total.toFixed(2)}</span>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:14}}>
              <span style={{color:"rgba(200,200,230,0.7)",fontWeight:600}}>{t.potentialPayout}</span>
              <span style={{fontWeight:800,color:"#22c55e",fontSize:16}}>${potential.toFixed(2)}</span>
            </div>
          </div>

          <button onClick={submitSlip} style={{width:"100%",padding:16,background:"linear-gradient(135deg,#1d4ed8,#ef4444)",border:"none",borderRadius:12,color:"#fff",fontWeight:800,fontSize:15,cursor:"pointer",fontFamily:"inherit",letterSpacing:0.3}}>
            {user ? `${t.submitSlip} (${slip.length})` : `${t.login} to Submit`}
          </button>
        </>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PORTFOLIO
// ═══════════════════════════════════════════════════════════════
function PortfolioPage({ t, positions, user, setPage, setAuthMode }) {
  if (!user) {
    return (
      <div style={{maxWidth:500,margin:"0 auto",padding:"60px 16px",textAlign:"center"}}>
        <div style={{fontSize:48,marginBottom:14}}>🔒</div>
        <h2 style={{fontFamily:"Georgia,serif",fontSize:22,marginBottom:10}}>{t.login} to view {t.portfolio}</h2>
        <p style={{color:"rgba(232,234,246,0.5)",fontSize:14,marginBottom:24}}>Track your predictions and earnings</p>
        <button onClick={()=>{setAuthMode("login");setPage("auth");}} style={{padding:"12px 28px",background:"linear-gradient(135deg,#1d4ed8,#ef4444)",border:"none",borderRadius:10,color:"#fff",fontWeight:700,fontSize:14,cursor:"pointer",fontFamily:"inherit"}}>{t.login}</button>
      </div>
    );
  }

  const totalStake = positions.reduce((a,p)=>a+parseFloat(p.stake||0),0);

  return (
    <div style={{maxWidth:900,margin:"0 auto",padding:"20px 16px 100px"}}>
      <h1 style={{fontFamily:"Georgia,serif",fontSize:24,fontWeight:800,marginBottom:20}}>💼 {t.portfolio}</h1>

      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:10,marginBottom:24}}>
        <div style={{background:"linear-gradient(135deg,rgba(34,197,94,0.1),rgba(34,197,94,0.05))",border:"1px solid rgba(34,197,94,0.2)",borderRadius:12,padding:14}}>
          <div style={{fontSize:10,color:"rgba(200,200,230,0.5)",textTransform:"uppercase",letterSpacing:1,marginBottom:4}}>{t.balance}</div>
          <div style={{fontSize:20,fontWeight:800,color:"#22c55e",fontFamily:"Georgia,serif"}}>${user.balance.toFixed(2)}</div>
        </div>
        <div style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:12,padding:14}}>
          <div style={{fontSize:10,color:"rgba(200,200,230,0.5)",textTransform:"uppercase",letterSpacing:1,marginBottom:4}}>Active Bets</div>
          <div style={{fontSize:20,fontWeight:800,fontFamily:"Georgia,serif"}}>{positions.length}</div>
        </div>
        <div style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:12,padding:14}}>
          <div style={{fontSize:10,color:"rgba(200,200,230,0.5)",textTransform:"uppercase",letterSpacing:1,marginBottom:4}}>Total Staked</div>
          <div style={{fontSize:20,fontWeight:800,fontFamily:"Georgia,serif",color:"#FACC15"}}>${totalStake.toFixed(2)}</div>
        </div>
      </div>

      <h2 style={{fontFamily:"Georgia,serif",fontSize:18,fontWeight:700,marginBottom:14}}>{t.myPositions}</h2>
      {positions.length === 0 ? (
        <div style={{padding:50,textAlign:"center",background:"rgba(255,255,255,0.03)",borderRadius:12,color:"rgba(232,234,246,0.4)",fontSize:14}}>{t.noPositions}</div>
      ) : (
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {positions.map((p,i)=>(
            <div key={i} style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:12,padding:14}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"start",gap:10,marginBottom:8}}>
                <div style={{flex:1}}>
                  <div style={{fontSize:11,color:"rgba(200,200,230,0.5)",marginBottom:4}}>{p.icon} {p.cat} · {COUNTRY_FLAGS[p.country]} {p.country}</div>
                  <div style={{fontSize:13,fontWeight:600,fontFamily:"Georgia,serif",lineHeight:1.4}}>{p.q}</div>
                </div>
                <span style={{padding:"4px 10px",borderRadius:6,fontSize:11,fontWeight:800,background:p.side==="YES"?"rgba(34,197,94,0.18)":"rgba(220,38,38,0.18)",color:p.side==="YES"?"#22c55e":"#ef4444"}}>{p.side}</span>
              </div>
              <div style={{display:"flex",gap:14,fontSize:11,color:"rgba(200,200,230,0.5)"}}>
                <span>Stake: <b style={{color:"#E8EAF6"}}>${parseFloat(p.stake).toFixed(2)}</b></span>
                <span>Shares: <b style={{color:"#E8EAF6"}}>{p.shares}</b></span>
                <span>Price: <b style={{color:"#E8EAF6"}}>{p.currentPrice}¢</b></span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// AUTH PAGE (Login / Signup)
// ═══════════════════════════════════════════════════════════════
function AuthPage({ t, authMode, setAuthMode, handleAuth, setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [err, setErr] = useState("");

  const submit = () => {
    if (!email || !password) { setErr("Please fill in all fields"); return; }
    if (!email.includes("@")) { setErr("Invalid email"); return; }
    if (password.length < 4) { setErr("Password too short"); return; }
    handleAuth(email, password, username);
  };

  return (
    <div style={{maxWidth:420,margin:"0 auto",padding:"40px 16px"}}>
      <button onClick={()=>setPage("home")} style={{display:"flex",alignItems:"center",gap:6,padding:"7px 12px",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:8,color:"#E8EAF6",fontSize:13,cursor:"pointer",fontFamily:"inherit",marginBottom:20}}>← Back</button>

      <div style={{background:"linear-gradient(145deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))",border:"1px solid rgba(212,168,67,0.15)",borderRadius:18,padding:28}}>
        <h1 style={{fontFamily:"Georgia,serif",fontSize:26,fontWeight:800,marginBottom:6,textAlign:"center"}}>{authMode==="login" ? t.welcome : `${t.signup}`}</h1>
        <p style={{fontSize:13,color:"rgba(232,234,246,0.5)",textAlign:"center",marginBottom:24}}>{authMode==="login" ? "Log in to your DonyMarket account" : "Join 89,000+ traders worldwide"}</p>

        {authMode==="signup" && (
          <div style={{marginBottom:14}}>
            <label style={{display:"block",fontSize:11,fontWeight:700,color:"rgba(200,200,230,0.6)",letterSpacing:1,textTransform:"uppercase",marginBottom:6}}>{t.username}</label>
            <input type="text" value={username} onChange={e=>setUsername(e.target.value)} placeholder="donny99" style={{width:"100%",padding:"12px 14px",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:10,color:"#E8EAF6",fontSize:14,outline:"none"}}/>
          </div>
        )}

        <div style={{marginBottom:14}}>
          <label style={{display:"block",fontSize:11,fontWeight:700,color:"rgba(200,200,230,0.6)",letterSpacing:1,textTransform:"uppercase",marginBottom:6}}>{t.email}</label>
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" style={{width:"100%",padding:"12px 14px",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:10,color:"#E8EAF6",fontSize:14,outline:"none"}}/>
        </div>

        <div style={{marginBottom:18}}>
          <label style={{display:"block",fontSize:11,fontWeight:700,color:"rgba(200,200,230,0.6)",letterSpacing:1,textTransform:"uppercase",marginBottom:6}}>{t.password}</label>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" style={{width:"100%",padding:"12px 14px",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:10,color:"#E8EAF6",fontSize:14,outline:"none"}}/>
        </div>

        {err && <div style={{padding:"10px 12px",background:"rgba(220,38,38,0.15)",border:"1px solid rgba(220,38,38,0.3)",borderRadius:8,color:"#fca5a5",fontSize:12,marginBottom:14}}>{err}</div>}

        <button onClick={submit} style={{width:"100%",padding:14,background:"linear-gradient(135deg,#1d4ed8,#ef4444)",border:"none",borderRadius:12,color:"#fff",fontWeight:800,fontSize:14,cursor:"pointer",fontFamily:"inherit",marginBottom:14}}>
          {authMode==="login" ? t.login : t.signup}
        </button>

        <div style={{textAlign:"center",fontSize:13,color:"rgba(232,234,246,0.5)"}}>
          {authMode==="login" ? t.noAccount : t.hasAccount}{" "}
          <button onClick={()=>{setAuthMode(authMode==="login"?"signup":"login");setErr("");}} style={{background:"none",border:"none",color:"#FACC15",fontWeight:700,cursor:"pointer",fontFamily:"inherit",fontSize:13}}>
            {authMode==="login" ? t.signup : t.login}
          </button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PROFILE PAGE
// ═══════════════════════════════════════════════════════════════
function ProfilePage({ t, user, setPage, setAuthMode, logout, lang, setLang, positions }) {
  if (!user) {
    return (
      <div style={{maxWidth:500,margin:"0 auto",padding:"60px 16px",textAlign:"center"}}>
        <div style={{fontSize:48,marginBottom:14}}>👤</div>
        <h2 style={{fontFamily:"Georgia,serif",fontSize:22,marginBottom:10}}>Log in to view profile</h2>
        <button onClick={()=>{setAuthMode("login");setPage("auth");}} style={{padding:"12px 28px",background:"linear-gradient(135deg,#1d4ed8,#ef4444)",border:"none",borderRadius:10,color:"#fff",fontWeight:700,fontSize:14,cursor:"pointer",fontFamily:"inherit"}}>{t.login}</button>
      </div>
    );
  }

  return (
    <div style={{maxWidth:600,margin:"0 auto",padding:"20px 16px 100px"}}>
      <div style={{background:"linear-gradient(135deg,rgba(212,168,67,0.15),rgba(239,68,68,0.1))",border:"1px solid rgba(212,168,67,0.25)",borderRadius:18,padding:24,marginBottom:20,textAlign:"center"}}>
        <div style={{width:72,height:72,background:"linear-gradient(135deg,#1d4ed8,#ef4444)",borderRadius:"50%",margin:"0 auto 14px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:30,fontFamily:"Georgia,serif",fontWeight:800,color:"#fff"}}>
          {user.username.charAt(0).toUpperCase()}
        </div>
        <h2 style={{fontFamily:"Georgia,serif",fontSize:20,fontWeight:800,marginBottom:4}}>{user.username}</h2>
        <div style={{fontSize:13,color:"rgba(232,234,246,0.5)",marginBottom:14}}>{user.email}</div>
        <div style={{display:"inline-block",padding:"6px 14px",background:"rgba(34,197,94,0.15)",border:"1px solid rgba(34,197,94,0.3)",borderRadius:999,fontSize:13,fontWeight:700,color:"#22c55e"}}>💰 {t.balance}: ${user.balance.toFixed(2)}</div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:24}}>
        <div style={{background:"rgba(255,255,255,0.04)",borderRadius:10,padding:12,textAlign:"center"}}>
          <div style={{fontSize:20,fontWeight:800,fontFamily:"Georgia,serif"}}>{positions.length}</div>
          <div style={{fontSize:10,color:"rgba(200,200,230,0.5)",textTransform:"uppercase",letterSpacing:1}}>Bets</div>
        </div>
        <div style={{background:"rgba(255,255,255,0.04)",borderRadius:10,padding:12,textAlign:"center"}}>
          <div style={{fontSize:20,fontWeight:800,fontFamily:"Georgia,serif",color:"#22c55e"}}>0</div>
          <div style={{fontSize:10,color:"rgba(200,200,230,0.5)",textTransform:"uppercase",letterSpacing:1}}>Won</div>
        </div>
        <div style={{background:"rgba(255,255,255,0.04)",borderRadius:10,padding:12,textAlign:"center"}}>
          <div style={{fontSize:20,fontWeight:800,fontFamily:"Georgia,serif",color:"#FACC15"}}>$0</div>
          <div style={{fontSize:10,color:"rgba(200,200,230,0.5)",textTransform:"uppercase",letterSpacing:1}}>Profit</div>
        </div>
      </div>

      {/* Settings */}
      <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:20}}>
        <SettingsItem icon="💼" label={t.portfolio} onClick={()=>setPage("portfolio")}/>
        <SettingsItem icon="📝" label={t.betslip} onClick={()=>setPage("slip")}/>
        <SettingsItem icon="❓" label={t.help} onClick={()=>setPage("help")}/>
        <div style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:12,padding:14}}>
          <div style={{fontSize:12,fontWeight:700,color:"rgba(200,200,230,0.6)",marginBottom:10}}>🌐 Language</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
            {LANGS.map(l=>(
              <button key={l.code} onClick={()=>setLang(l.code)} style={{padding:"6px 10px",background:lang===l.code?"rgba(212,168,67,0.2)":"rgba(255,255,255,0.04)",border:lang===l.code?"1px solid rgba(212,168,67,0.4)":"1px solid rgba(255,255,255,0.07)",borderRadius:8,color:lang===l.code?"#FACC15":"rgba(232,234,246,0.7)",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>
                {l.flag} {l.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button onClick={logout} style={{width:"100%",padding:14,background:"rgba(220,38,38,0.12)",border:"1px solid rgba(220,38,38,0.3)",borderRadius:12,color:"#fca5a5",fontWeight:700,fontSize:14,cursor:"pointer",fontFamily:"inherit"}}>🚪 {t.logout}</button>
    </div>
  );
}

function SettingsItem({icon, label, onClick}) {
  return (
    <button onClick={onClick} style={{display:"flex",alignItems:"center",gap:12,width:"100%",padding:"14px 16px",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:12,color:"#E8EAF6",fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"inherit",textAlign:"left"}}>
      <span style={{fontSize:18}}>{icon}</span>
      <span style={{flex:1}}>{label}</span>
      <span style={{color:"rgba(200,200,230,0.4)"}}>›</span>
    </button>
  );
}

// ═══════════════════════════════════════════════════════════════
// HELP PAGE
// ═══════════════════════════════════════════════════════════════
function HelpPage({ t, setPage }) {
  const [openIdx, setOpenIdx] = useState(null);
  return (
    <div style={{maxWidth:700,margin:"0 auto",padding:"20px 16px 100px"}}>
      <button onClick={()=>setPage("home")} style={{display:"flex",alignItems:"center",gap:6,padding:"7px 12px",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:8,color:"#E8EAF6",fontSize:13,cursor:"pointer",fontFamily:"inherit",marginBottom:20}}>← Back</button>
      
      <h1 style={{fontFamily:"Georgia,serif",fontSize:26,fontWeight:800,marginBottom:8}}>❓ {t.help}</h1>
      <p style={{fontSize:14,color:"rgba(232,234,246,0.55)",marginBottom:24}}>{t.faqs}</p>

      <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:24}}>
        {FAQS.map((f,i)=>(
          <div key={i} style={{background:"rgba(255,255,255,0.03)",border:`1px solid ${openIdx===i?"rgba(212,168,67,0.3)":"rgba(255,255,255,0.07)"}`,borderRadius:12,overflow:"hidden"}}>
            <button onClick={()=>setOpenIdx(openIdx===i?null:i)} style={{width:"100%",padding:"14px 16px",background:"transparent",border:"none",color:"#E8EAF6",fontWeight:600,fontSize:14,fontFamily:"Georgia,serif",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",textAlign:"left"}}>
              <span style={{flex:1}}>{f.q}</span>
              <span style={{color:"#D4A843",fontSize:18}}>{openIdx===i?"−":"+"}</span>
            </button>
            {openIdx===i && (
              <div style={{padding:"0 16px 14px",fontSize:13,color:"rgba(232,234,246,0.65)",lineHeight:1.6}}>{f.a}</div>
            )}
          </div>
        ))}
      </div>

      <div style={{background:"linear-gradient(135deg,rgba(29,78,216,0.1),rgba(239,68,68,0.08))",border:"1px solid rgba(29,78,216,0.2)",borderRadius:14,padding:18,textAlign:"center"}}>
        <div style={{fontSize:24,marginBottom:8}}>💬</div>
        <div style={{fontWeight:700,fontFamily:"Georgia,serif",marginBottom:4}}>{t.contactSupport}</div>
        <div style={{fontSize:13,color:"rgba(232,234,246,0.55)",marginBottom:12}}>Email us at support@donymarket.com</div>
        <button onClick={()=>window.location.href="mailto:support@donymarket.com"} style={{padding:"10px 20px",background:"rgba(29,78,216,0.2)",border:"1px solid rgba(29,78,216,0.4)",borderRadius:8,color:"#93c5fd",fontWeight:700,fontSize:13,cursor:"pointer",fontFamily:"inherit"}}>📧 Email Support</button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SEARCH PAGE
// ═══════════════════════════════════════════════════════════════
function SearchPage({ t, search, setSearch, markets, setSelectedMarket, setPage }) {
  const results = search ? markets.filter(m=>m.q.toLowerCase().includes(search.toLowerCase())) : [];
  return (
    <div style={{maxWidth:800,margin:"0 auto",padding:"20px 16px 100px"}}>
      <h1 style={{fontFamily:"Georgia,serif",fontSize:24,fontWeight:800,marginBottom:18}}>🔍 {t.search}</h1>
      <div style={{display:"flex",alignItems:"center",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:12,padding:"0 14px",marginBottom:20}}>
        <span style={{fontSize:16,opacity:0.5,marginRight:8}}>🔍</span>
        <input autoFocus value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search markets, topics, countries..." style={{flex:1,background:"transparent",border:"none",outline:"none",color:"#E8EAF6",fontSize:15,padding:"14px 0",fontFamily:"inherit"}}/>
        {search && <button onClick={()=>setSearch("")} style={{background:"none",border:"none",color:"rgba(200,200,230,0.4)",cursor:"pointer",fontSize:14}}>✕</button>}
      </div>

      {search && (
        <div style={{fontSize:12,color:"rgba(232,234,246,0.4)",marginBottom:14}}>{results.length} result{results.length!==1?"s":""}</div>
      )}

      {!search ? (
        <div style={{padding:40,textAlign:"center",color:"rgba(232,234,246,0.4)",fontSize:14}}>
          <div style={{fontSize:36,marginBottom:10}}>🔎</div>
          Start typing to search across all markets
        </div>
      ) : results.length === 0 ? (
        <div style={{padding:40,textAlign:"center",color:"rgba(232,234,246,0.4)",fontSize:14}}>No results for "{search}"</div>
      ) : (
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {results.map(m=>(
            <button key={m.id} onClick={()=>{setSelectedMarket(m);setPage("market");}} style={{display:"flex",alignItems:"center",gap:12,padding:14,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:12,color:"#E8EAF6",cursor:"pointer",fontFamily:"inherit",textAlign:"left"}}>
              <span style={{fontSize:22}}>{m.icon}</span>
              <div style={{flex:1}}>
                <div style={{fontSize:11,color:"rgba(200,200,230,0.5)",marginBottom:2}}>{COUNTRY_FLAGS[m.country]} {m.country} · {m.cat}</div>
                <div style={{fontSize:13,fontWeight:600,fontFamily:"Georgia,serif"}}>{m.q}</div>
              </div>
              <div style={{fontSize:16,fontWeight:800,color:"#22c55e",fontFamily:"Georgia,serif"}}>{m.yes}%</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// BOTTOM NAV (Polymarket-style)
// ═══════════════════════════════════════════════════════════════
function BottomNav({ page, setPage, t, slipCount }) {
  const items = [
    {key:"home", icon:"🏠", label:t.home},
    {key:"search", icon:"🔍", label:t.search},
    {key:"slip", icon:"📝", label:t.betslip, badge: slipCount},
    {key:"portfolio", icon:"💼", label:t.portfolio},
    {key:"profile", icon:"👤", label:t.profile},
  ];
  return (
    <nav style={{position:"fixed",bottom:0,left:0,right:0,background:"rgba(7,9,16,0.95)",backdropFilter:"blur(20px)",borderTop:"1px solid rgba(255,255,255,0.08)",zIndex:300,padding:"8px 4px",display:"flex",justifyContent:"space-around"}}>
      {items.map(it=>{
        const active = page===it.key;
        return (
          <button key={it.key} onClick={()=>setPage(it.key)} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2,padding:"6px 8px",background:"transparent",border:"none",color:active?"#FACC15":"rgba(232,234,246,0.5)",fontWeight:active?700:500,fontSize:10,cursor:"pointer",fontFamily:"inherit",position:"relative",flex:1,maxWidth:80}}>
            <span style={{fontSize:20,filter:active?"none":"grayscale(0.5)"}}>{it.icon}</span>
            <span>{it.label}</span>
            {it.badge > 0 && (
              <span style={{position:"absolute",top:2,right:"20%",background:"#ef4444",color:"#fff",fontSize:9,fontWeight:800,padding:"1px 5px",borderRadius:999,minWidth:16,textAlign:"center"}}>{it.badge}</span>
            )}
          </button>
        );
      })}
    </nav>
  );
}
