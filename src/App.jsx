import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

// ═══════════════════════════════════════════════════════════════
// UI TRANSLATIONS
// ═══════════════════════════════════════════════════════════════
const T = {
  en: { home:"Home", search:"Search", trending:"Trending", politics:"Politics", sports:"Sports", crypto:"Crypto", login:"Log In", signup:"Sign Up", logout:"Log Out", portfolio:"Portfolio", betslip:"Bet Slip", help:"Help Center", profile:"Profile", balance:"Balance", buyYes:"Buy YES", buyNo:"Buy NO", yes:"YES", no:"NO", volume:"Volume", expires:"Expires", chance:"chance", today:"Today", thisWeek:"This Week", thisMonth:"This Month", allTime:"All Time", country:"Country", email:"Email", password:"Password", username:"Username", welcome:"Welcome", noAccount:"Don't have an account?", hasAccount:"Already have an account?", emptySlip:"Your bet slip is empty", addToSlip:"Added to Slip", totalStake:"Total Stake", potentialPayout:"Potential Payout", submitSlip:"Submit All Bets", myPositions:"My Positions", noPositions:"No positions yet", relatedMarkets:"Related Markets", aboutMarket:"About this Market", priceHistory:"Price History", faqs:"Frequently Asked Questions", contactSupport:"Contact Support", tagline:"Trade on the World's Future", heroSub:"Real markets. Real outcomes. From Tirana to Tokyo.", markets:"Markets", results:"results", browseMarkets:"Browse Markets", activeBets:"Active Bets", totalStaked:"Total Staked", bets:"Bets", won:"Won", profit:"Profit", language:"Language", stake:"Stake", shares:"Shares", price:"Price", emailSupport:"Email Support", searchPlaceholder:"Search markets...", aboutDesc:"This market resolves based on the outcome. Expiry:", andTradingVol:"Volume:", loading:"Loading...", confirmPassword:"Confirm Password", passwordMismatch:"Passwords don't match", checkEmail:"Check your email to verify!", invalidLogin:"Invalid email or password", live:"LIVE", currentPrice:"Current Price" },
  sq: { home:"Kreu", search:"Kërko", trending:"Në trend", politics:"Politikë", sports:"Sport", crypto:"Kripto", login:"Hyr", signup:"Regjistrohu", logout:"Dil", portfolio:"Portofoli", betslip:"Bileta", help:"Ndihmë", profile:"Profili", balance:"Bilanci", buyYes:"Bli PO", buyNo:"Bli JO", yes:"PO", no:"JO", volume:"Volumi", expires:"Skadon", chance:"shansi", today:"Sot", thisWeek:"Këtë Javë", thisMonth:"Këtë Muaj", allTime:"Gjithçka", country:"Shteti", email:"Email", password:"Fjalëkalimi", username:"Përdoruesi", welcome:"Mirë se vini", noAccount:"S'keni llogari?", hasAccount:"Keni llogari?", emptySlip:"Bileta është bosh", addToSlip:"U shtua", totalStake:"Bastet Gjithsej", potentialPayout:"Fitimi i Mundshëm", submitSlip:"Vendos të Gjitha", myPositions:"Pozicionet e Mia", noPositions:"S'ka pozicione", relatedMarkets:"Të Lidhura", aboutMarket:"Rreth Tregut", priceHistory:"Historia e Çmimeve", faqs:"Pyetjet e Shpeshta", contactSupport:"Kontakto", tagline:"Trego mbi të Ardhmen", heroSub:"Tregje reale. Rezultate reale.", markets:"Tregjet", results:"rezultate", browseMarkets:"Shfleto", activeBets:"Baste Aktive", totalStaked:"Vlera e Bastit", bets:"Baste", won:"Fituar", profit:"Fitimi", language:"Gjuha", stake:"Basti", shares:"Aksione", price:"Çmimi", emailSupport:"Email", searchPlaceholder:"Kërko tregje...", aboutDesc:"Ky treg zgjidhet bazuar në rezultatin. Skadon:", andTradingVol:"Volumi:", loading:"Duke u ngarkuar...", confirmPassword:"Konfirmo Fjalëkalimin", passwordMismatch:"Fjalëkalimet s'përputhen", checkEmail:"Kontrollo email-in për verifikim!", invalidLogin:"Email ose fjalëkalim i pasaktë", live:"LIVE", currentPrice:"Çmimi Aktual" },
  es: { home:"Inicio", search:"Buscar", trending:"Tendencias", politics:"Política", sports:"Deportes", crypto:"Cripto", login:"Iniciar Sesión", signup:"Registrarse", logout:"Salir", portfolio:"Portafolio", betslip:"Boleto", help:"Ayuda", profile:"Perfil", balance:"Saldo", buyYes:"Comprar SÍ", buyNo:"Comprar NO", yes:"SÍ", no:"NO", volume:"Volumen", expires:"Vence", chance:"probabilidad", today:"Hoy", thisWeek:"Esta Semana", thisMonth:"Este Mes", allTime:"Todo", country:"País", email:"Correo", password:"Contraseña", username:"Usuario", welcome:"Bienvenido", noAccount:"¿No tienes cuenta?", hasAccount:"¿Ya tienes cuenta?", emptySlip:"Boleto vacío", addToSlip:"Añadido", totalStake:"Apuesta Total", potentialPayout:"Pago Potencial", submitSlip:"Enviar Todo", myPositions:"Mis Posiciones", noPositions:"Sin posiciones", relatedMarkets:"Relacionados", aboutMarket:"Acerca de", priceHistory:"Historial", faqs:"Preguntas Frecuentes", contactSupport:"Contactar", tagline:"Comercia con el Futuro", heroSub:"Mercados reales. Resultados reales.", markets:"Mercados", results:"resultados", browseMarkets:"Ver Mercados", activeBets:"Apuestas Activas", totalStaked:"Total Apostado", bets:"Apuestas", won:"Ganadas", profit:"Beneficio", language:"Idioma", stake:"Apuesta", shares:"Acciones", price:"Precio", emailSupport:"Email", searchPlaceholder:"Buscar mercados...", aboutDesc:"Este mercado resuelve según el resultado. Vence:", andTradingVol:"Volumen:", loading:"Cargando...", confirmPassword:"Confirmar Contraseña", passwordMismatch:"Contraseñas no coinciden", checkEmail:"¡Revisa tu correo!", invalidLogin:"Email o contraseña inválida", live:"EN VIVO", currentPrice:"Precio Actual" },
  fr: { home:"Accueil", search:"Recherche", trending:"Tendances", politics:"Politique", sports:"Sports", crypto:"Crypto", login:"Connexion", signup:"S'inscrire", logout:"Déconnexion", portfolio:"Portefeuille", betslip:"Pari", help:"Aide", profile:"Profil", balance:"Solde", buyYes:"Acheter OUI", buyNo:"Acheter NON", yes:"OUI", no:"NON", volume:"Volume", expires:"Expire", chance:"chance", today:"Aujourd'hui", thisWeek:"Cette Semaine", thisMonth:"Ce Mois", allTime:"Tout", country:"Pays", email:"Email", password:"Mot de passe", username:"Utilisateur", welcome:"Bienvenue", noAccount:"Pas de compte?", hasAccount:"Vous avez un compte?", emptySlip:"Pari vide", addToSlip:"Ajouté", totalStake:"Mise Totale", potentialPayout:"Gain Potentiel", submitSlip:"Soumettre Tout", myPositions:"Mes Positions", noPositions:"Aucune position", relatedMarkets:"Liés", aboutMarket:"À propos", priceHistory:"Historique", faqs:"Questions Fréquentes", contactSupport:"Contact", tagline:"Pariez sur l'Avenir", heroSub:"Marchés réels.", markets:"Marchés", results:"résultats", browseMarkets:"Voir Marchés", activeBets:"Paris Actifs", totalStaked:"Total Misé", bets:"Paris", won:"Gagnés", profit:"Bénéfice", language:"Langue", stake:"Mise", shares:"Parts", price:"Prix", emailSupport:"Email", searchPlaceholder:"Rechercher...", aboutDesc:"Ce marché se résout selon le résultat. Expire:", andTradingVol:"Volume:", loading:"Chargement...", confirmPassword:"Confirmer", passwordMismatch:"Mots de passe différents", checkEmail:"Vérifiez votre email!", invalidLogin:"Email ou mot de passe invalide", live:"EN DIRECT", currentPrice:"Prix Actuel" },
  de: { home:"Start", search:"Suche", trending:"Trends", politics:"Politik", sports:"Sport", crypto:"Krypto", login:"Anmelden", signup:"Registrieren", logout:"Abmelden", portfolio:"Portfolio", betslip:"Wettschein", help:"Hilfe", profile:"Profil", balance:"Guthaben", buyYes:"JA Kaufen", buyNo:"NEIN Kaufen", yes:"JA", no:"NEIN", volume:"Volumen", expires:"Läuft ab", chance:"Chance", today:"Heute", thisWeek:"Diese Woche", thisMonth:"Diesen Monat", allTime:"Alle Zeit", country:"Land", email:"E-Mail", password:"Passwort", username:"Benutzer", welcome:"Willkommen", noAccount:"Kein Konto?", hasAccount:"Konto vorhanden?", emptySlip:"Leer", addToSlip:"Hinzugefügt", totalStake:"Gesamt", potentialPayout:"Mögliche Auszahlung", submitSlip:"Alle Einreichen", myPositions:"Meine Positionen", noPositions:"Keine Positionen", relatedMarkets:"Verwandt", aboutMarket:"Über", priceHistory:"Verlauf", faqs:"Häufige Fragen", contactSupport:"Kontakt", tagline:"Handle mit der Zukunft", heroSub:"Echte Märkte.", markets:"Märkte", results:"Ergebnisse", browseMarkets:"Märkte", activeBets:"Aktive Wetten", totalStaked:"Gesamteinsatz", bets:"Wetten", won:"Gewonnen", profit:"Gewinn", language:"Sprache", stake:"Einsatz", shares:"Anteile", price:"Preis", emailSupport:"Email", searchPlaceholder:"Suchen...", aboutDesc:"Markt löst sich auf nach Ergebnis. Endet:", andTradingVol:"Volumen:", loading:"Lädt...", confirmPassword:"Bestätigen", passwordMismatch:"Passwörter stimmen nicht überein", checkEmail:"E-Mail prüfen!", invalidLogin:"Ungültige Anmeldedaten", live:"LIVE", currentPrice:"Aktueller Preis" },
  it: { home:"Home", search:"Cerca", trending:"Tendenze", politics:"Politica", sports:"Sport", crypto:"Cripto", login:"Accedi", signup:"Registrati", logout:"Esci", portfolio:"Portafoglio", betslip:"Schedina", help:"Aiuto", profile:"Profilo", balance:"Saldo", buyYes:"Compra SÌ", buyNo:"Compra NO", yes:"SÌ", no:"NO", volume:"Volume", expires:"Scade", chance:"probabilità", today:"Oggi", thisWeek:"Questa Settimana", thisMonth:"Questo Mese", allTime:"Sempre", country:"Paese", email:"Email", password:"Password", username:"Utente", welcome:"Benvenuto", noAccount:"Non hai un account?", hasAccount:"Hai un account?", emptySlip:"Schedina vuota", addToSlip:"Aggiunto", totalStake:"Puntata", potentialPayout:"Vincita", submitSlip:"Invia Tutto", myPositions:"Posizioni", noPositions:"Nessuna posizione", relatedMarkets:"Correlati", aboutMarket:"Info", priceHistory:"Storico", faqs:"Domande Frequenti", contactSupport:"Contatta", tagline:"Scommetti sul Futuro", heroSub:"Mercati veri.", markets:"Mercati", results:"risultati", browseMarkets:"Vedi", activeBets:"Attive", totalStaked:"Puntato", bets:"Scommesse", won:"Vinte", profit:"Profitto", language:"Lingua", stake:"Puntata", shares:"Azioni", price:"Prezzo", emailSupport:"Email", searchPlaceholder:"Cerca...", aboutDesc:"Si risolve in base al risultato. Scade:", andTradingVol:"Volume:", loading:"Caricamento...", confirmPassword:"Conferma", passwordMismatch:"Le password non coincidono", checkEmail:"Controlla email!", invalidLogin:"Credenziali non valide", live:"LIVE", currentPrice:"Prezzo Attuale" },
  tr: { home:"Ana Sayfa", search:"Ara", trending:"Popüler", politics:"Siyaset", sports:"Spor", crypto:"Kripto", login:"Giriş", signup:"Kayıt Ol", logout:"Çıkış", portfolio:"Portföy", betslip:"Bahis Kuponu", help:"Yardım", profile:"Profil", balance:"Bakiye", buyYes:"EVET Al", buyNo:"HAYIR Al", yes:"EVET", no:"HAYIR", volume:"Hacim", expires:"Bitiş", chance:"olasılık", today:"Bugün", thisWeek:"Bu Hafta", thisMonth:"Bu Ay", allTime:"Tümü", country:"Ülke", email:"E-posta", password:"Şifre", username:"Kullanıcı", welcome:"Hoş geldiniz", noAccount:"Hesabınız yok mu?", hasAccount:"Hesabınız var mı?", emptySlip:"Kupon boş", addToSlip:"Eklendi", totalStake:"Toplam", potentialPayout:"Olası Kazanç", submitSlip:"Gönder", myPositions:"Pozisyonlarım", noPositions:"Pozisyon yok", relatedMarkets:"İlgili", aboutMarket:"Hakkında", priceHistory:"Geçmiş", faqs:"Sık Sorulan Sorular", contactSupport:"Destek", tagline:"Geleceğe Yatırım Yap", heroSub:"Gerçek piyasalar.", markets:"Piyasalar", results:"sonuç", browseMarkets:"Göz At", activeBets:"Aktif", totalStaked:"Toplam Bahis", bets:"Bahisler", won:"Kazanılan", profit:"Kar", language:"Dil", stake:"Bahis", shares:"Hisse", price:"Fiyat", emailSupport:"E-posta", searchPlaceholder:"Ara...", aboutDesc:"Sonuca göre çözümlenir. Bitiş:", andTradingVol:"Hacim:", loading:"Yükleniyor...", confirmPassword:"Onayla", passwordMismatch:"Şifreler uyuşmuyor", checkEmail:"E-postanızı kontrol edin!", invalidLogin:"Geçersiz bilgiler", live:"CANLI", currentPrice:"Mevcut Fiyat" },
  ar: { home:"الرئيسية", search:"بحث", trending:"الرائج", politics:"سياسة", sports:"رياضة", crypto:"عملات", login:"دخول", signup:"تسجيل", logout:"خروج", portfolio:"المحفظة", betslip:"القسيمة", help:"المساعدة", profile:"الملف", balance:"الرصيد", buyYes:"شراء نعم", buyNo:"شراء لا", yes:"نعم", no:"لا", volume:"الحجم", expires:"ينتهي", chance:"الفرصة", today:"اليوم", thisWeek:"الأسبوع", thisMonth:"الشهر", allTime:"الكل", country:"الدولة", email:"البريد", password:"كلمة المرور", username:"المستخدم", welcome:"مرحباً", noAccount:"ليس لديك حساب؟", hasAccount:"لديك حساب؟", emptySlip:"فارغة", addToSlip:"أضيف", totalStake:"المجموع", potentialPayout:"الربح المحتمل", submitSlip:"إرسال", myPositions:"مراكزي", noPositions:"لا مراكز", relatedMarkets:"مرتبطة", aboutMarket:"حول", priceHistory:"السجل", faqs:"الأسئلة الشائعة", contactSupport:"اتصل", tagline:"تداول على المستقبل", heroSub:"أسواق حقيقية.", markets:"الأسواق", results:"نتيجة", browseMarkets:"تصفح", activeBets:"نشطة", totalStaked:"المجموع", bets:"رهانات", won:"فاز", profit:"الربح", language:"اللغة", stake:"الرهان", shares:"أسهم", price:"السعر", emailSupport:"بريد", searchPlaceholder:"ابحث...", aboutDesc:"يحل بناءً على النتيجة. ينتهي:", andTradingVol:"الحجم:", loading:"جاري التحميل...", confirmPassword:"تأكيد", passwordMismatch:"كلمات المرور غير متطابقة", checkEmail:"تحقق من البريد!", invalidLogin:"بيانات غير صحيحة", live:"مباشر", currentPrice:"السعر الحالي" },
};

const COUNTRY_NAMES = {
  en:{All:"All",Albania:"Albania",USA:"USA",UK:"UK",Germany:"Germany",France:"France",Italy:"Italy",Turkey:"Turkey",Spain:"Spain",World:"World"},
  sq:{All:"Të Gjitha",Albania:"Shqipëri",USA:"SHBA",UK:"MB",Germany:"Gjermani",France:"Francë",Italy:"Itali",Turkey:"Turqi",Spain:"Spanjë",World:"Bota"},
  es:{All:"Todos",Albania:"Albania",USA:"EE.UU.",UK:"Reino Unido",Germany:"Alemania",France:"Francia",Italy:"Italia",Turkey:"Turquía",Spain:"España",World:"Mundo"},
  fr:{All:"Tous",Albania:"Albanie",USA:"États-Unis",UK:"R-U",Germany:"Allemagne",France:"France",Italy:"Italie",Turkey:"Turquie",Spain:"Espagne",World:"Monde"},
  de:{All:"Alle",Albania:"Albanien",USA:"USA",UK:"GB",Germany:"Deutschland",France:"Frankreich",Italy:"Italien",Turkey:"Türkei",Spain:"Spanien",World:"Welt"},
  it:{All:"Tutti",Albania:"Albania",USA:"USA",UK:"Regno Unito",Germany:"Germania",France:"Francia",Italy:"Italia",Turkey:"Turchia",Spain:"Spagna",World:"Mondo"},
  tr:{All:"Hepsi",Albania:"Arnavutluk",USA:"ABD",UK:"BK",Germany:"Almanya",France:"Fransa",Italy:"İtalya",Turkey:"Türkiye",Spain:"İspanya",World:"Dünya"},
  ar:{All:"الكل",Albania:"ألبانيا",USA:"أمريكا",UK:"بريطانيا",Germany:"ألمانيا",France:"فرنسا",Italy:"إيطاليا",Turkey:"تركيا",Spain:"إسبانيا",World:"العالم"},
};
const CAT_NAMES = {
  en:{All:"All",Politics:"Politics",Crypto:"Crypto",Sports:"Sports",Tech:"Tech",Economy:"Economy",Entertainment:"Entertainment"},
  sq:{All:"Të Gjitha",Politics:"Politikë",Crypto:"Kripto",Sports:"Sport",Tech:"Teknologji",Economy:"Ekonomi",Entertainment:"Argëtim"},
  es:{All:"Todas",Politics:"Política",Crypto:"Cripto",Sports:"Deportes",Tech:"Tecnología",Economy:"Economía",Entertainment:"Entretenimiento"},
  fr:{All:"Tout",Politics:"Politique",Crypto:"Crypto",Sports:"Sports",Tech:"Tech",Economy:"Économie",Entertainment:"Divertissement"},
  de:{All:"Alle",Politics:"Politik",Crypto:"Krypto",Sports:"Sport",Tech:"Tech",Economy:"Wirtschaft",Entertainment:"Unterhaltung"},
  it:{All:"Tutte",Politics:"Politica",Crypto:"Cripto",Sports:"Sport",Tech:"Tech",Economy:"Economia",Entertainment:"Intrattenimento"},
  tr:{All:"Hepsi",Politics:"Siyaset",Crypto:"Kripto",Sports:"Spor",Tech:"Teknoloji",Economy:"Ekonomi",Entertainment:"Eğlence"},
  ar:{All:"الكل",Politics:"سياسة",Crypto:"عملات",Sports:"رياضة",Tech:"تقنية",Economy:"اقتصاد",Entertainment:"ترفيه"},
};
const LANGS = [
  {code:"en",name:"English",flag:"🇬🇧"},{code:"sq",name:"Shqip",flag:"🇦🇱"},{code:"es",name:"Español",flag:"🇪🇸"},
  {code:"fr",name:"Français",flag:"🇫🇷"},{code:"de",name:"Deutsch",flag:"🇩🇪"},{code:"it",name:"Italiano",flag:"🇮🇹"},
  {code:"tr",name:"Türkçe",flag:"🇹🇷"},{code:"ar",name:"العربية",flag:"🇸🇦"},
];

// ═══════════════════════════════════════════════════════════════
// MARKETS — Crypto markets have livePrice for CoinGecko API!
// ═══════════════════════════════════════════════════════════════
const today = new Date("2026-05-14");
const daysFromNow = (d) => Math.ceil((new Date(d) - today) / (1000*60*60*24));

const MARKETS = [
  // LIVE crypto markets — yes% adjusts based on actual price
  { id:1001, icon:"₿", cat:"Crypto", country:"World", yes:44, vol:"5.1M", exp:"2026-12-31", trending:true, term:"year", livePrice:"bitcoin", target:150000,
    q:{ en:"Will Bitcoin exceed $150,000 in 2026?", sq:"A do ta tejkalojë Bitcoin $150,000 në 2026?", es:"¿Bitcoin superará $150,000 en 2026?", fr:"Bitcoin dépassera-t-il 150 000 $ en 2026?", de:"Wird Bitcoin 2026 $150.000 überschreiten?", it:"Bitcoin supererà $150.000 nel 2026?", tr:"Bitcoin 2026'da $150.000'i aşacak mı?", ar:"هل سيتجاوز البيتكوين 150 ألف دولار في 2026؟" }},
  { id:2, icon:"₿", cat:"Crypto", country:"World", yes:58, vol:"3.2M", exp:"2026-05-21", trending:true, term:"week", livePrice:"bitcoin", target:110000,
    q:{ en:"Will Bitcoin close above $110,000 this week?", sq:"A do të mbyllet Bitcoin mbi $110,000 këtë javë?", es:"¿Bitcoin cerrará por encima de $110,000?", fr:"Bitcoin clôturera-t-il au-dessus de 110 000 $?", de:"Wird Bitcoin diese Woche über $110.000 schließen?", it:"Bitcoin chiuderà sopra $110.000 questa settimana?", tr:"Bitcoin bu hafta $110.000 üzerinde kapanacak mı?", ar:"هل سيغلق البيتكوين فوق 110 ألف هذا الأسبوع؟" }},
  { id:1003, icon:"💎", cat:"Crypto", country:"World", yes:37, vol:"2.1M", exp:"2026-12-31", trending:true, term:"year", livePrice:"solana", target:500,
    q:{ en:"Will Solana reach $500 in 2026?", sq:"A do ta arrijë Solana $500 në 2026?", es:"¿Solana llegará a $500 en 2026?", fr:"Solana atteindra-t-il 500 $?", de:"Wird Solana $500 erreichen?", it:"Solana raggiungerà $500?", tr:"Solana $500'e ulaşacak mı?", ar:"هل ستصل سولانا إلى 500 دولار؟" }},
  { id:1004, icon:"⟠", cat:"Crypto", country:"World", yes:32, vol:"3.2M", exp:"2027-01-01", trending:true, term:"year", livePrice:"ethereum", target:8000,
    q:{ en:"Will Ethereum reach $8,000 by 2027?", sq:"A do ta arrijë Ethereum $8,000 deri 2027?", es:"¿Ethereum llegará a $8,000?", fr:"Ethereum atteindra-t-il 8 000 $?", de:"Wird Ethereum $8.000 erreichen?", it:"Ethereum raggiungerà $8.000?", tr:"Ethereum $8.000'e ulaşacak mı?", ar:"هل ستصل إيثريوم إلى 8000 دولار؟" }},
  // ALBANIA
  { id:101, icon:"🇪🇺", cat:"Politics", country:"Albania", yes:58, vol:"1.2M", exp:"2027-12-31", trending:true, term:"year",
    q:{ en:"Will Albania complete EU accession by end of 2027?", sq:"A do ta përfundojë Shqipëria anëtarësimin në BE deri 2027?", es:"¿Albania completará la adhesión a la UE para 2027?", fr:"L'Albanie achèvera-t-elle son adhésion à l'UE d'ici 2027?", de:"Wird Albanien den EU-Beitritt bis 2027 abschließen?", it:"L'Albania completerà l'adesione UE entro 2027?", tr:"Arnavutluk 2027'ye kadar AB üyeliğini tamamlayacak mı?", ar:"هل ستكمل ألبانيا الانضمام للاتحاد الأوروبي بنهاية 2027؟" }},
  { id:102, icon:"🛡️", cat:"Politics", country:"Albania", yes:89, vol:"430K", exp:"2027-10-31", trending:true, term:"year",
    q:{ en:"Will Albania host 2027 NATO Summit successfully?", sq:"A do ta presë Shqipëria me sukses Samitin e NATO-s 2027?", es:"¿Albania albergará la cumbre OTAN 2027?", fr:"L'Albanie organisera-t-elle le sommet OTAN 2027?", de:"Wird Albanien den NATO-Gipfel 2027 ausrichten?", it:"L'Albania ospiterà il vertice NATO 2027?", tr:"Arnavutluk 2027 NATO Zirvesine ev sahipliği yapacak mı?", ar:"هل ستستضيف ألبانيا قمة الناتو 2027؟" }},
  { id:103, icon:"⚖️", cat:"Politics", country:"Albania", yes:42, vol:"680K", exp:"2026-12-31", trending:true, term:"year",
    q:{ en:"Will SPAK convict Deputy PM Balluku?", sq:"A do ta dënojë SPAK Zëvendëskryeministren Balluku?", es:"¿SPAK condenará a la Viceprimera Ministra Balluku?", fr:"Le SPAK condamnera-t-il Balluku?", de:"Wird SPAK Vizepremier Balluku verurteilen?", it:"SPAK condannerà il Vicepremier Balluku?", tr:"SPAK Balluku'yu mahkum edecek mi?", ar:"هل ستدين سباك بالوكو؟" }},
  { id:7, icon:"🏛️", cat:"Politics", country:"Albania", yes:18, vol:"520K", exp:"2026-05-31", trending:true, term:"month",
    q:{ en:"Will Tirana Mayor Veliaj be released this month?", sq:"A do të lirohet Kryetari Veliaj këtë muaj?", es:"¿Será liberado el alcalde Veliaj este mes?", fr:"Le maire Veliaj sera-t-il libéré ce mois-ci?", de:"Wird Veliaj diesen Monat freigelassen?", it:"Veliaj sarà rilasciato questo mese?", tr:"Veliaj bu ay serbest bırakılacak mı?", ar:"هل سيُفرج عن فيلياج هذا الشهر؟" }},
  { id:1, icon:"⚽", cat:"Sports", country:"Albania", yes:34, vol:"240K", exp:"2026-05-21", trending:true, term:"week",
    q:{ en:"Will Albania beat Italy in next friendly match?", sq:"A do ta mundë Shqipëria Italinë në miqësoren e ardhshme?", es:"¿Albania vencerá a Italia en el próximo amistoso?", fr:"L'Albanie battra-t-elle l'Italie?", de:"Wird Albanien Italien schlagen?", it:"L'Albania batterà l'Italia?", tr:"Arnavutluk İtalya'yı yenecek mi?", ar:"هل ستفوز ألبانيا على إيطاليا؟" }},
  { id:106, icon:"⚽", cat:"Sports", country:"Albania", yes:18, vol:"340K", exp:"2026-06-01", trending:true, term:"month",
    q:{ en:"Will Albania qualify for 2026 FIFA World Cup?", sq:"A do të kualifikohet Shqipëria për Botërorin 2026?", es:"¿Albania se clasificará para el Mundial 2026?", fr:"L'Albanie se qualifiera-t-elle pour la CDM 2026?", de:"Wird sich Albanien für die WM 2026 qualifizieren?", it:"L'Albania si qualificherà ai Mondiali 2026?", tr:"Arnavutluk 2026 Dünya Kupasına katılacak mı?", ar:"هل ستتأهل ألبانيا لكأس العالم 2026؟" }},
  // USA
  { id:201, icon:"🇺🇸", cat:"Politics", country:"USA", yes:34, vol:"4.2M", exp:"2026-09-30", trending:true, term:"month",
    q:{ en:"Will Trump approval rating exceed 50% by Q3 2026?", sq:"A do ta kalojë miratimi i Trump 50%?", es:"¿La aprobación de Trump superará el 50%?", fr:"L'approbation de Trump dépassera-t-elle 50%?", de:"Wird Trumps Zustimmung 50% übersteigen?", it:"L'approvazione di Trump supererà il 50%?", tr:"Trump'ın onayı %50'yi aşacak mı?", ar:"هل ستتجاوز موافقة ترامب 50%؟" }},
  { id:204, icon:"🏦", cat:"Economy", country:"USA", yes:67, vol:"2.4M", exp:"2026-09-01", trending:true, term:"month",
    q:{ en:"Will Fed cut rates by September 2026?", sq:"A do t'i ulë Fed-i normat deri shtator 2026?", es:"¿La Fed bajará tasas para septiembre 2026?", fr:"La Fed baissera-t-elle les taux d'ici septembre 2026?", de:"Wird die Fed bis September 2026 senken?", it:"La Fed taglierà i tassi entro settembre 2026?", tr:"Fed Eylül 2026'ya kadar faiz indirecek mi?", ar:"هل سيخفض الفيدرالي الفائدة بحلول سبتمبر 2026؟" }},
  // SPORTS
  { id:6, icon:"⚽", cat:"Sports", country:"Spain", yes:52, vol:"680K", exp:"2026-05-19", trending:true, term:"week",
    q:{ en:"Will Real Madrid score 3+ goals in next match?", sq:"A do të shënojë Real Madridi 3+ gola?", es:"¿Real Madrid marcará 3+ goles?", fr:"Le Real Madrid marquera-t-il 3+ buts?", de:"Wird Real Madrid 3+ Tore schießen?", it:"Il Real Madrid segnerà 3+ gol?", tr:"Real Madrid 3+ gol atacak mı?", ar:"هل سيسجل ريال مدريد 3+ أهداف؟" }},
  { id:802, icon:"🏆", cat:"Sports", country:"Spain", yes:28, vol:"1.8M", exp:"2026-05-30", trending:true, term:"month",
    q:{ en:"Will Real Madrid win Champions League 2026?", sq:"A do ta fitojë Real Madrid Champions League 2026?", es:"¿Real Madrid ganará la Champions 2026?", fr:"Le Real Madrid gagnera-t-il la LDC 2026?", de:"Wird Real Madrid die CL 2026 gewinnen?", it:"Il Real Madrid vincerà la CL 2026?", tr:"Real Madrid 2026 Şampiyonlar Ligi'ni kazanacak mı?", ar:"هل سيفوز ريال مدريد بدوري الأبطال 2026؟" }},
  { id:402, icon:"⚽", cat:"Sports", country:"Germany", yes:73, vol:"540K", exp:"2026-05-18", trending:true, term:"week",
    q:{ en:"Will Bayern Munich win Bundesliga 2025-26?", sq:"A do ta fitojë Bayern Munich Bundesligën?", es:"¿Bayern ganará la Bundesliga?", fr:"Le Bayern gagnera-t-il la Bundesliga?", de:"Wird Bayern die Bundesliga gewinnen?", it:"Il Bayern vincerà la Bundesliga?", tr:"Bayern Bundesliga'yı kazanacak mı?", ar:"هل سيفوز بايرن بالبوندسليغا؟" }},
  // TECH
  { id:1101, icon:"🤖", cat:"Tech", country:"World", yes:72, vol:"890K", exp:"2026-07-01", trending:true, term:"month",
    q:{ en:"Will GPT-5 release before Q3 2026?", sq:"A do të lëshohet GPT-5 para Q3 2026?", es:"¿GPT-5 se lanzará antes de Q3 2026?", fr:"GPT-5 sortira-t-il avant le T3 2026?", de:"Wird GPT-5 vor Q3 2026 erscheinen?", it:"GPT-5 uscirà prima del Q3 2026?", tr:"GPT-5 2026 3.çeyrekten önce çıkacak mı?", ar:"هل سيُطلق GPT-5 قبل الربع الثالث 2026؟" }},
  { id:1103, icon:"🚗", cat:"Tech", country:"World", yes:48, vol:"2.2M", exp:"2026-12-31", trending:true, term:"year",
    q:{ en:"Will Tesla Robotaxi launch in 2026?", sq:"A do të lansohet Tesla Robotaxi në 2026?", es:"¿Tesla Robotaxi se lanzará en 2026?", fr:"Le Tesla Robotaxi sortira-t-il en 2026?", de:"Wird Tesla Robotaxi 2026 starten?", it:"Tesla Robotaxi sarà lanciato nel 2026?", tr:"Tesla Robotaxi 2026'da çıkacak mı?", ar:"هل سيُطلق تيسلا روبوتاكسي في 2026؟" }},
  // ENTERTAINMENT & ECONOMY
  { id:9, icon:"🎮", cat:"Entertainment", country:"World", yes:38, vol:"2.1M", exp:"2026-05-31", trending:true, term:"month",
    q:{ en:"Will GTA VI release date be confirmed this month?", sq:"A do të konfirmohet data e GTA VI?", es:"¿Se confirmará la fecha de GTA VI?", fr:"La date de GTA VI sera-t-elle confirmée?", de:"Wird das Datum von GTA VI bestätigt?", it:"La data di GTA VI sarà confermata?", tr:"GTA VI çıkış tarihi onaylanacak mı?", ar:"هل سيتم تأكيد تاريخ إصدار GTA VI؟" }},
  { id:1201, icon:"🎵", cat:"Entertainment", country:"World", yes:55, vol:"1.8M", exp:"2026-12-31", trending:true, term:"year",
    q:{ en:"Will Taylor Swift release new album in 2026?", sq:"A do të lëshojë Taylor Swift album të ri?", es:"¿Taylor Swift lanzará un álbum?", fr:"Taylor Swift sortira-t-elle un album?", de:"Wird Taylor Swift ein Album veröffentlichen?", it:"Taylor Swift pubblicherà un album?", tr:"Taylor Swift albüm çıkaracak mı?", ar:"هل ستصدر تايلور سويفت ألبوماً؟" }},
  { id:1301, icon:"🥇", cat:"Economy", country:"World", yes:52, vol:"1.4M", exp:"2026-12-31", trending:true, term:"year",
    q:{ en:"Will gold exceed $4,000/oz in 2026?", sq:"A do ta tejkalojë ari $4,000/ons?", es:"¿El oro superará $4,000/oz?", fr:"L'or dépassera-t-il 4 000 $/oz?", de:"Wird Gold $4.000/oz überschreiten?", it:"L'oro supererà $4.000/oz?", tr:"Altın $4.000/ons'u aşacak mı?", ar:"هل سيتجاوز الذهب 4000 دولار/أونصة؟" }},
];

const COUNTRIES = ["All","Albania","USA","UK","Germany","France","Italy","Turkey","Spain","World"];
const COUNTRY_FLAGS = {All:"🌐",Albania:"🇦🇱",USA:"🇺🇸",UK:"🇬🇧",Germany:"🇩🇪",France:"🇫🇷",Italy:"🇮🇹",Turkey:"🇹🇷",Spain:"🇪🇸",World:"🌍"};
const CATEGORIES = ["All","Politics","Crypto","Sports","Tech","Economy","Entertainment"];
const CAT_ICONS = {All:"📊",Politics:"🏛️",Crypto:"₿",Sports:"⚽",Tech:"🤖",Economy:"💹",Entertainment:"🎬"};

const ls = {
  get: (k, def) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : def; } catch { return def; } },
  set: (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
};

// ═══════════════════════════════════════════════════════════════
// MAIN APP — Supabase auth + Live CoinGecko prices
// ═══════════════════════════════════════════════════════════════
export default function App() {
  const [page, setPage] = useState("home");
  const [authMode, setAuthMode] = useState("login");
  const [selectedMarket, setSelectedMarket] = useState(null);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [slip, setSlip] = useState(() => ls.get("dm_slip", []));
  const [positions, setPositions] = useState([]);
  const [lang, setLang] = useState(() => ls.get("dm_lang", "en"));
  const [countryFilter, setCountryFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [timeFilter, setTimeFilter] = useState("allTime");
  const [search, setSearch] = useState("");
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [livePrices, setLivePrices] = useState({});

  const t = T[lang];
  const isRTL = lang === "ar";

  useEffect(() => ls.set("dm_slip", slip), [slip]);
  useEffect(() => ls.set("dm_lang", lang), [lang]);

  // SUPABASE AUTH
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        loadProfile(session.user.id);
        loadBets(session.user.id);
      }
      setLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session?.user) {
        setUser(session.user);
        loadProfile(session.user.id);
        loadBets(session.user.id);
      } else {
        setUser(null); setProfile(null); setPositions([]);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  // LIVE COINGECKO PRICES (every 60 seconds)
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd");
        const data = await res.json();
        setLivePrices(data);
      } catch (e) { console.log("Price fetch failed"); }
    };
    fetchPrices();
    const interval = setInterval(fetchPrices, 60000);
    return () => clearInterval(interval);
  }, []);

  const loadProfile = async (userId) => {
    const { data } = await supabase.from("profiles").select("*").eq("id", userId).single();
    if (data) setProfile(data);
  };
  const loadBets = async (userId) => {
    const { data } = await supabase.from("bets").select("*").eq("user_id", userId).order("placed_at", { ascending: false });
    if (data) setPositions(data);
  };

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2800); };
  const getQ = (m) => m.q?.[lang] || m.q?.en || m.market_question || "Market";

  const addToSlip = (market, side) => {
    if (slip.find(s => s.id === market.id)) { showToast("Already in slip"); return; }
    setSlip([...slip, { ...market, side, stake: "" }]);
    showToast(`+ ${side}`);
  };
  const removeFromSlip = (id) => setSlip(slip.filter(s => s.id !== id));
  const updateStake = (id, stake) => setSlip(slip.map(s => s.id === id ? {...s, stake} : s));

  const submitSlip = async () => {
    if (!user) { setPage("auth"); setAuthMode("login"); return; }
    const valid = slip.filter(s => parseFloat(s.stake) > 0);
    if (valid.length === 0) { showToast("Enter stake amounts"); return; }
    const newBets = valid.map(s => ({
      user_id: user.id, market_id: s.id, market_question: getQ(s), market_icon: s.icon,
      market_category: s.cat, market_country: s.country, side: s.side,
      stake: parseFloat(s.stake), price: s.side === "YES" ? s.yes : 100 - s.yes,
      shares: parseFloat(s.stake) / ((s.side === "YES" ? s.yes : 100 - s.yes) / 100),
    }));
    const { error } = await supabase.from("bets").insert(newBets);
    if (error) { showToast("Error: " + error.message); return; }
    await loadBets(user.id);
    setSlip([]);
    showToast(`${valid.length} bet${valid.length>1?'s':''} placed!`);
    setPage("portfolio");
  };

  const handleSignup = async (email, password, username) => {
    const { error } = await supabase.auth.signUp({ email, password, options: { data: { username: username || email.split("@")[0] } } });
    if (error) return { error: error.message };
    showToast(t.checkEmail);
    setPage("home");
    return { success: true };
  };
  const handleLogin = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: t.invalidLogin };
    showToast("Welcome back!");
    setPage("home");
    return { success: true };
  };
  const logout = async () => { await supabase.auth.signOut(); showToast("Logged out"); setPage("home"); };

  // Enrich markets with live prices
  const enrichedMarkets = MARKETS.map(m => {
    if (m.livePrice && livePrices[m.livePrice]) {
      const current = livePrices[m.livePrice].usd;
      const target = m.target;
      const ratio = current / target;
      let adjustedYes = m.yes;
      if (ratio > 0.95 && ratio < 1.05) adjustedYes = 50 + (ratio - 1) * 200;
      else if (ratio >= 1.05) adjustedYes = Math.min(95, 60 + (ratio - 1) * 30);
      else adjustedYes = Math.max(5, m.yes * ratio);
      return { ...m, yes: Math.round(adjustedYes), currentLivePrice: current };
    }
    return m;
  });

  const filteredMarkets = enrichedMarkets.filter(m => {
    if (countryFilter !== "All" && m.country !== countryFilter) return false;
    if (categoryFilter !== "All" && m.cat !== categoryFilter) return false;
    if (timeFilter === "today" && daysFromNow(m.exp) > 1) return false;
    if (timeFilter === "thisWeek" && daysFromNow(m.exp) > 7) return false;
    if (timeFilter === "thisMonth" && daysFromNow(m.exp) > 31) return false;
    if (search && !getQ(m).toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  if (loading) {
    return <div style={{minHeight:"100vh",background:"#070910",color:"#E8EAF6",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'DM Sans',sans-serif"}}>
      <div style={{textAlign:"center"}}>
        <div style={{fontFamily:"Georgia,serif",fontSize:32,marginBottom:8}}><span style={{color:"#FACC15"}}>Dony</span><span style={{color:"#ef4444"}}>market</span></div>
        <div style={{fontSize:14,color:"rgba(232,234,246,0.5)",animation:"pulse 1.5s infinite"}}>{t.loading}</div>
      </div>
      <style>{`@keyframes pulse{0%,100%{opacity:0.5}50%{opacity:1}}`}</style>
    </div>;
  }

  return (
    <div style={{minHeight:"100vh",background:"#070910",color:"#E8EAF6",fontFamily:"'DM Sans','Segoe UI',system-ui,sans-serif",paddingBottom:80,direction:isRTL?"rtl":"ltr"}}>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0;}
        ::placeholder{color:rgba(200,200,230,0.3);}
        input{font-family:inherit;}
        button:hover{filter:brightness(1.1);}
        button:active{transform:scale(0.97);}
        @keyframes fadeUp{from{opacity:0;transform:translateY(15px);}to{opacity:1;transform:translateY(0);}}
        @keyframes pulse{0%,100%{opacity:0.6;}50%{opacity:1;}}
        @keyframes livePulse{0%,100%{box-shadow:0 0 0 0 rgba(34,197,94,0.7);}70%{box-shadow:0 0 0 6px rgba(34,197,94,0);}}
        ::-webkit-scrollbar{width:6px;height:6px;}
        ::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.1);border-radius:3px;}
      `}</style>

      <div style={{position:"fixed",top:-200,left:-150,width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle,rgba(29,78,216,0.08) 0%,transparent 70%)",pointerEvents:"none",zIndex:0}}/>
      <div style={{position:"fixed",bottom:-100,right:-100,width:400,height:400,borderRadius:"50%",background:"radial-gradient(circle,rgba(220,38,38,0.06) 0%,transparent 70%)",pointerEvents:"none",zIndex:0}}/>

      <Header user={user} profile={profile} setPage={setPage} setAuthMode={setAuthMode} showLangMenu={showLangMenu} setShowLangMenu={setShowLangMenu} lang={lang} setLang={setLang} t={t}/>

      {/* LIVE PRICES TICKER */}
      {Object.keys(livePrices).length > 0 && (
        <div style={{background:"rgba(34,197,94,0.05)",borderBottom:"1px solid rgba(34,197,94,0.15)",padding:"8px 16px",display:"flex",alignItems:"center",gap:16,overflowX:"auto",position:"relative",zIndex:10}}>
          <div style={{display:"flex",alignItems:"center",gap:6,fontSize:11,color:"#22c55e",fontWeight:700,flexShrink:0}}>
            <span style={{width:6,height:6,background:"#22c55e",borderRadius:"50%",animation:"livePulse 1.5s infinite"}}/>
            {t.live}
          </div>
          {livePrices.bitcoin && <span style={{fontSize:12,whiteSpace:"nowrap"}}>₿ <b>${livePrices.bitcoin.usd.toLocaleString()}</b></span>}
          {livePrices.ethereum && <span style={{fontSize:12,whiteSpace:"nowrap"}}>⟠ <b>${livePrices.ethereum.usd.toLocaleString()}</b></span>}
          {livePrices.solana && <span style={{fontSize:12,whiteSpace:"nowrap"}}>💎 <b>${livePrices.solana.usd.toLocaleString()}</b></span>}
        </div>
      )}

      <div style={{position:"relative",zIndex:1}}>
        {page === "home" && <HomePage t={t} lang={lang} markets={filteredMarkets} getQ={getQ} setSelectedMarket={setSelectedMarket} setPage={setPage} addToSlip={addToSlip} slip={slip} countryFilter={countryFilter} setCountryFilter={setCountryFilter} categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter} timeFilter={timeFilter} setTimeFilter={setTimeFilter}/>}
        {page === "market" && selectedMarket && <MarketDetail t={t} lang={lang} market={enrichedMarkets.find(m=>m.id===selectedMarket.id)||selectedMarket} getQ={getQ} setPage={setPage} addToSlip={addToSlip} slip={slip} markets={enrichedMarkets} setSelectedMarket={setSelectedMarket}/>}
        {page === "portfolio" && <PortfolioPage t={t} positions={positions} profile={profile} user={user} setPage={setPage} setAuthMode={setAuthMode}/>}
        {page === "slip" && <SlipPage t={t} lang={lang} slip={slip} getQ={getQ} updateStake={updateStake} removeFromSlip={removeFromSlip} submitSlip={submitSlip} user={user}/>}
        {page === "profile" && <ProfilePage t={t} user={user} profile={profile} setPage={setPage} setAuthMode={setAuthMode} logout={logout} lang={lang} setLang={setLang} positions={positions}/>}
        {page === "auth" && <AuthPage t={t} authMode={authMode} setAuthMode={setAuthMode} handleSignup={handleSignup} handleLogin={handleLogin} setPage={setPage}/>}
        {page === "help" && <HelpPage t={t} setPage={setPage}/>}
        {page === "search" && <SearchPage t={t} lang={lang} search={search} setSearch={setSearch} markets={enrichedMarkets} getQ={getQ} setSelectedMarket={setSelectedMarket} setPage={setPage}/>}
      </div>

      <BottomNav page={page} setPage={setPage} t={t} slipCount={slip.length}/>

      {toast && <div style={{position:"fixed",bottom:90,left:"50%",transform:"translateX(-50%)",background:"rgba(29,78,216,0.95)",backdropFilter:"blur(12px)",color:"#fff",padding:"12px 24px",borderRadius:999,fontSize:14,fontWeight:600,zIndex:9999,boxShadow:"0 10px 30px rgba(0,0,0,0.5)",animation:"fadeUp 0.3s ease",maxWidth:"90%",textAlign:"center"}}>{toast}</div>}
    </div>
  );
}

function Header({ user, profile, setPage, setAuthMode, showLangMenu, setShowLangMenu, lang, setLang, t }) {
  return (
    <header style={{position:"sticky",top:0,zIndex:200,background:"rgba(7,9,16,0.92)",backdropFilter:"blur(20px)",borderBottom:"1px solid rgba(255,255,255,0.05)",padding:"0 16px"}}>
      <div style={{maxWidth:1280,margin:"0 auto",height:60,display:"flex",alignItems:"center",justifyContent:"space-between",gap:12}}>
        <div onClick={()=>setPage("home")} style={{display:"flex",alignItems:"baseline",cursor:"pointer"}}>
          <span style={{fontFamily:"Georgia,serif",fontSize:24,fontWeight:900,color:"#FACC15",letterSpacing:-0.5}}>Dony</span>
          <span style={{fontFamily:"Georgia,serif",fontSize:24,fontWeight:900,color:"#ef4444",letterSpacing:-0.5}}>market</span>
        </div>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          <div style={{position:"relative"}}>
            <button onClick={()=>setShowLangMenu(!showLangMenu)} style={{padding:"7px 10px",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:8,color:"#E8EAF6",fontSize:14,cursor:"pointer",fontFamily:"inherit"}}>{LANGS.find(l=>l.code===lang)?.flag} ▾</button>
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
            <button onClick={()=>setPage("profile")} style={{padding:"7px 14px",background:"linear-gradient(135deg,#1d4ed8,#ef4444)",border:"none",borderRadius:8,color:"#fff",fontWeight:700,fontSize:13,cursor:"pointer",fontFamily:"inherit"}}>👤 {profile?.username || "User"}</button>
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

function HomePage({ t, lang, markets, getQ, setSelectedMarket, setPage, addToSlip, slip, countryFilter, setCountryFilter, categoryFilter, setCategoryFilter, timeFilter, setTimeFilter }) {
  return (
    <>
      <section style={{maxWidth:1100,margin:"0 auto",padding:"40px 16px 24px",textAlign:"center"}}>
        <div style={{display:"inline-block",background:"rgba(212,168,67,0.08)",border:"1px solid rgba(212,168,67,0.2)",borderRadius:999,padding:"4px 14px",fontSize:11,color:"#D4A843",marginBottom:18,letterSpacing:1.5,fontWeight:700,textTransform:"uppercase"}}>🎯 {t.markets}</div>
        <h1 style={{fontFamily:"Georgia,serif",fontSize:"clamp(32px,5vw,52px)",fontWeight:900,lineHeight:1.05,marginBottom:14,color:"#F1F5F9",letterSpacing:-1.5}}>
          <span style={{background:"linear-gradient(105deg,#F0C060 0%,#ef4444 50%,#a855f7 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{t.tagline}</span>
        </h1>
        <p style={{fontSize:15,color:"rgba(232,234,246,0.55)",lineHeight:1.6,marginBottom:24}}>{t.heroSub}</p>
      </section>
      <section style={{maxWidth:1280,margin:"0 auto",padding:"0 16px 16px"}}>
        <div style={{display:"flex",gap:6,overflowX:"auto",paddingBottom:4}}>
          {[["today",t.today,"⚡"],["thisWeek",t.thisWeek,"📅"],["thisMonth",t.thisMonth,"📆"],["allTime",t.allTime,"♾️"]].map(([key,label,icon])=>(
            <button key={key} onClick={()=>setTimeFilter(key)} style={{flexShrink:0,padding:"8px 14px",background:timeFilter===key?"linear-gradient(135deg,rgba(212,168,67,0.25),rgba(239,68,68,0.18))":"rgba(255,255,255,0.04)",border:timeFilter===key?"1px solid rgba(212,168,67,0.4)":"1px solid rgba(255,255,255,0.07)",borderRadius:10,color:timeFilter===key?"#F0C060":"rgba(232,234,246,0.6)",fontSize:13,fontWeight:timeFilter===key?700:500,cursor:"pointer",fontFamily:"inherit",whiteSpace:"nowrap"}}>{icon} {label}</button>
          ))}
        </div>
      </section>
      <section style={{maxWidth:1280,margin:"0 auto",padding:"0 16px 16px"}}>
        <div style={{fontSize:11,fontWeight:800,color:"#D4A843",letterSpacing:1.5,textTransform:"uppercase",marginBottom:10}}>{t.country}</div>
        <div style={{display:"flex",gap:6,overflowX:"auto",paddingBottom:4}}>
          {COUNTRIES.map(c=>(
            <button key={c} onClick={()=>setCountryFilter(c)} style={{flexShrink:0,padding:"7px 12px",background:countryFilter===c?"rgba(220,38,38,0.18)":"rgba(255,255,255,0.04)",border:countryFilter===c?"1px solid rgba(220,38,38,0.4)":"1px solid rgba(255,255,255,0.07)",borderRadius:999,color:countryFilter===c?"#fca5a5":"rgba(232,234,246,0.55)",fontSize:13,fontWeight:countryFilter===c?700:500,cursor:"pointer",fontFamily:"inherit",whiteSpace:"nowrap"}}>{COUNTRY_FLAGS[c]} {COUNTRY_NAMES[lang][c]}</button>
          ))}
        </div>
      </section>
      <section style={{maxWidth:1280,margin:"0 auto",padding:"0 16px 20px"}}>
        <div style={{display:"flex",gap:6,overflowX:"auto",paddingBottom:4}}>
          {CATEGORIES.map(c=>(
            <button key={c} onClick={()=>setCategoryFilter(c)} style={{flexShrink:0,padding:"7px 12px",background:categoryFilter===c?"rgba(29,78,216,0.18)":"rgba(255,255,255,0.04)",border:categoryFilter===c?"1px solid rgba(29,78,216,0.4)":"1px solid rgba(255,255,255,0.07)",borderRadius:999,color:categoryFilter===c?"#93c5fd":"rgba(232,234,246,0.55)",fontSize:13,fontWeight:categoryFilter===c?700:500,cursor:"pointer",fontFamily:"inherit",whiteSpace:"nowrap"}}>{CAT_ICONS[c]} {CAT_NAMES[lang][c]}</button>
          ))}
        </div>
      </section>
      <section style={{maxWidth:1280,margin:"0 auto",padding:"0 16px 80px"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
          <h2 style={{fontFamily:"Georgia,serif",fontSize:20,fontWeight:700}}>📊 {t.markets}</h2>
          <span style={{fontSize:12,color:"rgba(232,234,246,0.4)"}}>{markets.length} {t.results}</span>
        </div>
        {markets.length === 0 ? (
          <div style={{padding:60,textAlign:"center",color:"rgba(232,234,246,0.3)",fontSize:14}}>No markets match</div>
        ) : (
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:14}}>
            {markets.map((m,i)=>(
              <div key={m.id} style={{animation:`fadeUp 0.3s ease ${(i%12)*0.03}s both`}}>
                <MarketCard market={m} t={t} lang={lang} getQ={getQ} onView={()=>{setSelectedMarket(m);setPage("market");}} onAdd={addToSlip} inSlip={slip.some(s=>s.id===m.id)}/>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

function MarketCard({ market, t, lang, getQ, onView, onAdd, inSlip }) {
  return (
    <div style={{background:"rgba(255,255,255,0.035)",border:`1px solid ${inSlip?"rgba(212,168,67,0.4)":"rgba(255,255,255,0.07)"}`,borderRadius:14,padding:16,position:"relative",transition:"all 0.2s",cursor:"pointer"}}>
      {market.trending && <span style={{position:"absolute",top:10,right:10,background:"rgba(250,204,21,0.12)",border:"1px solid rgba(250,204,21,0.3)",borderRadius:999,padding:"2px 8px",fontSize:10,color:"#FACC15",fontWeight:700}}>🔥</span>}
      {market.livePrice && <span style={{position:"absolute",top:10,left:10,background:"rgba(34,197,94,0.12)",border:"1px solid rgba(34,197,94,0.3)",borderRadius:999,padding:"2px 8px",fontSize:10,color:"#22c55e",fontWeight:700,display:"flex",alignItems:"center",gap:4}}><span style={{width:5,height:5,background:"#22c55e",borderRadius:"50%",animation:"livePulse 1.5s infinite"}}/>{t.live}</span>}
      <div onClick={onView} style={{display:"flex",alignItems:"center",gap:8,marginBottom:8,marginTop:market.livePrice?14:0}}>
        <span style={{fontSize:20}}>{market.icon}</span>
        <span style={{fontSize:10,fontWeight:800,textTransform:"uppercase",letterSpacing:0.8,color:"#93c5fd"}}>{COUNTRY_FLAGS[market.country]} {COUNTRY_NAMES[lang][market.country]}</span>
      </div>
      <div onClick={onView} style={{fontFamily:"Georgia,serif",fontSize:14,fontWeight:600,lineHeight:1.45,color:"#f1f5f9",marginBottom:8,minHeight:42}}>{getQ(market)}</div>
      {market.currentLivePrice && <div style={{fontSize:11,color:"#22c55e",marginBottom:8,fontWeight:600}}>Now: ${market.currentLivePrice.toLocaleString()}</div>}
      <div onClick={onView} style={{display:"flex",alignItems:"baseline",gap:6,marginBottom:8}}>
        <span style={{fontSize:22,fontWeight:800,color:"#22c55e",fontFamily:"Georgia,serif"}}>{market.yes}%</span>
        <span style={{fontSize:10,color:"rgba(200,200,230,0.45)"}}>{t.chance}</span>
        <span style={{fontSize:10,color:"#ef4444",marginLeft:"auto"}}>{100-market.yes}%</span>
      </div>
      <div style={{height:3,background:"rgba(220,38,38,0.2)",borderRadius:3,overflow:"hidden",marginBottom:10}}>
        <div style={{height:"100%",background:"linear-gradient(90deg,#22c55e,#16a34a)",borderRadius:3,width:`${market.yes}%`,transition:"width 0.5s"}}/>
      </div>
      <div onClick={onView} style={{display:"flex",justifyContent:"space-between",fontSize:10,color:"rgba(200,200,230,0.4)",marginBottom:10}}>
        <span>${market.vol}</span><span>{market.exp}</span>
      </div>
      <div style={{display:"flex",gap:6}}>
        <button onClick={(e)=>{e.stopPropagation();onAdd(market,"YES");}} style={{flex:1,padding:8,background:"rgba(34,197,94,0.1)",border:"1px solid rgba(34,197,94,0.3)",borderRadius:7,color:"#4ade80",fontWeight:700,fontSize:11,cursor:"pointer",fontFamily:"inherit"}}>{t.yes} {market.yes}¢</button>
        <button onClick={(e)=>{e.stopPropagation();onAdd(market,"NO");}} style={{flex:1,padding:8,background:"rgba(220,38,38,0.1)",border:"1px solid rgba(220,38,38,0.3)",borderRadius:7,color:"#f87171",fontWeight:700,fontSize:11,cursor:"pointer",fontFamily:"inherit"}}>{t.no} {100-market.yes}¢</button>
      </div>
    </div>
  );
}

function MarketDetail({ t, lang, market, getQ, setPage, addToSlip, slip, markets, setSelectedMarket }) {
  const related = markets.filter(m=>m.cat===market.cat && m.id!==market.id).slice(0,4);
  const inSlip = slip.some(s=>s.id===market.id);
  const historyPoints = Array.from({length:20},(_,i)=> market.yes + Math.sin(i*0.5)*8 + (Math.random()-0.5)*4);
  return (
    <div style={{maxWidth:900,margin:"0 auto",padding:"20px 16px 100px"}}>
      <button onClick={()=>setPage("home")} style={{display:"flex",alignItems:"center",gap:6,padding:"7px 12px",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:8,color:"#E8EAF6",fontSize:13,cursor:"pointer",fontFamily:"inherit",marginBottom:20}}>← Back</button>
      <div style={{background:"linear-gradient(145deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))",border:"1px solid rgba(212,168,67,0.15)",borderRadius:20,padding:24,marginBottom:20}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
          <span style={{fontSize:36}}>{market.icon}</span>
          <div>
            <div style={{fontSize:11,fontWeight:800,color:"#FACC15",letterSpacing:1,textTransform:"uppercase"}}>{COUNTRY_FLAGS[market.country]} {COUNTRY_NAMES[lang][market.country]} · {CAT_NAMES[lang][market.cat]}</div>
            {market.livePrice && market.currentLivePrice && <div style={{fontSize:13,color:"#22c55e",marginTop:4,fontWeight:700}}>● {t.live}: ${market.currentLivePrice.toLocaleString()}</div>}
          </div>
        </div>
        <h1 style={{fontFamily:"Georgia,serif",fontSize:22,fontWeight:700,lineHeight:1.4,marginBottom:18,color:"#F1F5F9"}}>{getQ(market)}</h1>
        <div style={{display:"flex",alignItems:"baseline",gap:10,marginBottom:14}}>
          <span style={{fontFamily:"Georgia,serif",fontSize:48,fontWeight:900,color:"#22c55e"}}>{market.yes}%</span>
          <span style={{fontSize:14,color:"rgba(200,200,230,0.5)"}}>{t.chance} {t.yes}</span>
        </div>
        <div style={{height:6,background:"rgba(220,38,38,0.2)",borderRadius:4,overflow:"hidden",marginBottom:18}}>
          <div style={{height:"100%",background:"linear-gradient(90deg,#22c55e,#16a34a)",borderRadius:4,width:`${market.yes}%`}}/>
        </div>
        <div style={{marginBottom:18}}>
          <div style={{fontSize:11,fontWeight:800,color:"rgba(212,168,67,0.8)",letterSpacing:1,textTransform:"uppercase",marginBottom:10}}>{t.priceHistory}</div>
          <svg width="100%" height="60" viewBox="0 0 400 60" preserveAspectRatio="none">
            <polyline fill="none" stroke="url(#grad)" strokeWidth="2" points={historyPoints.map((y,i)=>`${i*(400/19)},${60-(y/100)*60}`).join(" ")}/>
            <defs><linearGradient id="grad" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#1d4ed8"/><stop offset="100%" stopColor="#22c55e"/></linearGradient></defs>
          </svg>
        </div>
        <div style={{display:"flex",gap:10}}>
          <button onClick={()=>addToSlip(market,"YES")} style={{flex:1,padding:14,background:"linear-gradient(135deg,#15803d,#166534)",border:"none",borderRadius:10,color:"#fff",fontWeight:800,fontSize:14,cursor:"pointer",fontFamily:"inherit"}}>{t.buyYes} {market.yes}¢</button>
          <button onClick={()=>addToSlip(market,"NO")} style={{flex:1,padding:14,background:"linear-gradient(135deg,#b91c1c,#991b1b)",border:"none",borderRadius:10,color:"#fff",fontWeight:800,fontSize:14,cursor:"pointer",fontFamily:"inherit"}}>{t.buyNo} {100-market.yes}¢</button>
        </div>
        {inSlip && <div style={{marginTop:10,padding:10,background:"rgba(212,168,67,0.1)",border:"1px solid rgba(212,168,67,0.3)",borderRadius:8,color:"#FACC15",fontSize:12,textAlign:"center"}}>✓ {t.addToSlip}</div>}
      </div>
      <div style={{background:"rgba(255,255,255,0.025)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:14,padding:18,marginBottom:18}}>
        <div style={{fontSize:11,fontWeight:800,color:"#D4A843",letterSpacing:1.2,textTransform:"uppercase",marginBottom:10}}>{t.aboutMarket}</div>
        <p style={{fontSize:14,lineHeight:1.6,color:"rgba(232,234,246,0.7)"}}>{t.aboutDesc} {market.exp}. {t.andTradingVol} ${market.vol}.</p>
      </div>
      {related.length > 0 && (
        <div>
          <h3 style={{fontFamily:"Georgia,serif",fontSize:18,fontWeight:700,marginBottom:14}}>{t.relatedMarkets}</h3>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:12}}>
            {related.map(m=>(<MarketCard key={m.id} market={m} t={t} lang={lang} getQ={getQ} onView={()=>{setSelectedMarket(m);window.scrollTo(0,0);}} onAdd={addToSlip} inSlip={slip.some(s=>s.id===m.id)}/>))}
          </div>
        </div>
      )}
    </div>
  );
}

function SlipPage({ t, lang, slip, getQ, updateStake, removeFromSlip, submitSlip, user }) {
  const total = slip.reduce((a,s)=>a+(parseFloat(s.stake)||0),0);
  const potential = slip.reduce((a,s)=>{const stake=parseFloat(s.stake)||0;const price=s.side==="YES"?s.yes:100-s.yes;return a+(stake/(price/100));},0);
  return (
    <div style={{maxWidth:700,margin:"0 auto",padding:"20px 16px 100px"}}>
      <h1 style={{fontFamily:"Georgia,serif",fontSize:24,fontWeight:800,marginBottom:20}}>📝 {t.betslip}</h1>
      {slip.length === 0 ? (
        <div style={{padding:60,textAlign:"center",background:"rgba(255,255,255,0.03)",borderRadius:14,color:"rgba(232,234,246,0.4)"}}>
          <div style={{fontSize:40,marginBottom:12}}>📭</div>
          <div style={{fontSize:14}}>{t.emptySlip}</div>
        </div>
      ) : (
        <>
          <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:20}}>
            {slip.map(s=>(
              <div key={s.id} style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:12,padding:14}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"start",gap:10,marginBottom:10}}>
                  <div style={{flex:1}}>
                    <div style={{fontSize:11,color:"rgba(200,200,230,0.5)",marginBottom:4}}>{s.icon} {CAT_NAMES[lang][s.cat]}</div>
                    <div style={{fontSize:13,fontWeight:600,lineHeight:1.4,fontFamily:"Georgia,serif"}}>{getQ(s)}</div>
                  </div>
                  <button onClick={()=>removeFromSlip(s.id)} style={{background:"rgba(220,38,38,0.15)",border:"1px solid rgba(220,38,38,0.3)",borderRadius:8,padding:"4px 10px",color:"#f87171",fontSize:11,cursor:"pointer",fontFamily:"inherit",flexShrink:0}}>✕</button>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  <span style={{padding:"4px 10px",borderRadius:6,fontSize:11,fontWeight:800,background:s.side==="YES"?"rgba(34,197,94,0.18)":"rgba(220,38,38,0.18)",color:s.side==="YES"?"#22c55e":"#ef4444"}}>{s.side==="YES"?t.yes:t.no} {s.side==="YES"?s.yes:100-s.yes}¢</span>
                  <input type="number" placeholder="$0.00" value={s.stake} onChange={e=>updateStake(s.id,e.target.value)} style={{flex:1,background:"rgba(0,0,0,0.3)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:8,padding:"8px 12px",color:"#E8EAF6",fontSize:14,fontWeight:700,outline:"none"}}/>
                </div>
              </div>
            ))}
          </div>
          <div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(212,168,67,0.2)",borderRadius:12,padding:16,marginBottom:18}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:8,fontSize:13}}><span style={{color:"rgba(200,200,230,0.6)"}}>{t.totalStake}</span><span style={{fontWeight:800}}>${total.toFixed(2)}</span></div>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:14}}><span style={{color:"rgba(200,200,230,0.7)",fontWeight:600}}>{t.potentialPayout}</span><span style={{fontWeight:800,color:"#22c55e",fontSize:16}}>${potential.toFixed(2)}</span></div>
          </div>
          <button onClick={submitSlip} style={{width:"100%",padding:16,background:"linear-gradient(135deg,#1d4ed8,#ef4444)",border:"none",borderRadius:12,color:"#fff",fontWeight:800,fontSize:15,cursor:"pointer",fontFamily:"inherit"}}>{user ? `${t.submitSlip} (${slip.length})` : t.login}</button>
        </>
      )}
    </div>
  );
}

function PortfolioPage({ t, positions, profile, user, setPage, setAuthMode }) {
  if (!user) return (
    <div style={{maxWidth:500,margin:"0 auto",padding:"60px 16px",textAlign:"center"}}>
      <div style={{fontSize:48,marginBottom:14}}>🔒</div>
      <h2 style={{fontFamily:"Georgia,serif",fontSize:22,marginBottom:10}}>{t.login}</h2>
      <button onClick={()=>{setAuthMode("login");setPage("auth");}} style={{padding:"12px 28px",background:"linear-gradient(135deg,#1d4ed8,#ef4444)",border:"none",borderRadius:10,color:"#fff",fontWeight:700,fontSize:14,cursor:"pointer",fontFamily:"inherit"}}>{t.login}</button>
    </div>
  );
  const totalStake = positions.reduce((a,p)=>a+parseFloat(p.stake||0),0);
  return (
    <div style={{maxWidth:900,margin:"0 auto",padding:"20px 16px 100px"}}>
      <h1 style={{fontFamily:"Georgia,serif",fontSize:24,fontWeight:800,marginBottom:20}}>💼 {t.portfolio}</h1>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:10,marginBottom:24}}>
        <div style={{background:"linear-gradient(135deg,rgba(34,197,94,0.1),rgba(34,197,94,0.05))",border:"1px solid rgba(34,197,94,0.2)",borderRadius:12,padding:14}}>
          <div style={{fontSize:10,color:"rgba(200,200,230,0.5)",textTransform:"uppercase",letterSpacing:1,marginBottom:4}}>{t.balance}</div>
          <div style={{fontSize:20,fontWeight:800,color:"#22c55e",fontFamily:"Georgia,serif"}}>${(profile?.balance || 0).toFixed(2)}</div>
        </div>
        <div style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:12,padding:14}}>
          <div style={{fontSize:10,color:"rgba(200,200,230,0.5)",textTransform:"uppercase",letterSpacing:1,marginBottom:4}}>{t.activeBets}</div>
          <div style={{fontSize:20,fontWeight:800,fontFamily:"Georgia,serif"}}>{positions.length}</div>
        </div>
        <div style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:12,padding:14}}>
          <div style={{fontSize:10,color:"rgba(200,200,230,0.5)",textTransform:"uppercase",letterSpacing:1,marginBottom:4}}>{t.totalStaked}</div>
          <div style={{fontSize:20,fontWeight:800,fontFamily:"Georgia,serif",color:"#FACC15"}}>${totalStake.toFixed(2)}</div>
        </div>
      </div>
      <h2 style={{fontFamily:"Georgia,serif",fontSize:18,fontWeight:700,marginBottom:14}}>{t.myPositions}</h2>
      {positions.length === 0 ? (
        <div style={{padding:50,textAlign:"center",background:"rgba(255,255,255,0.03)",borderRadius:12,color:"rgba(232,234,246,0.4)",fontSize:14}}>{t.noPositions}</div>
      ) : (
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {positions.map((p)=>(
            <div key={p.id} style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:12,padding:14}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"start",gap:10,marginBottom:8}}>
                <div style={{flex:1}}>
                  <div style={{fontSize:11,color:"rgba(200,200,230,0.5)",marginBottom:4}}>{p.market_icon} {p.market_category}</div>
                  <div style={{fontSize:13,fontWeight:600,fontFamily:"Georgia,serif",lineHeight:1.4}}>{p.market_question}</div>
                </div>
                <span style={{padding:"4px 10px",borderRadius:6,fontSize:11,fontWeight:800,background:p.side==="YES"?"rgba(34,197,94,0.18)":"rgba(220,38,38,0.18)",color:p.side==="YES"?"#22c55e":"#ef4444"}}>{p.side}</span>
              </div>
              <div style={{display:"flex",gap:14,fontSize:11,color:"rgba(200,200,230,0.5)"}}>
                <span>{t.stake}: <b style={{color:"#E8EAF6"}}>${parseFloat(p.stake).toFixed(2)}</b></span>
                <span>{t.shares}: <b style={{color:"#E8EAF6"}}>{parseFloat(p.shares).toFixed(2)}</b></span>
                <span>{t.price}: <b style={{color:"#E8EAF6"}}>{p.price}¢</b></span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function AuthPage({ t, authMode, setAuthMode, handleSignup, handleLogin, setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    setErr("");
    if (!email || !password) { setErr("Please fill all fields"); return; }
    if (!email.includes("@")) { setErr("Invalid email"); return; }
    if (password.length < 6) { setErr("Password must be 6+ characters"); return; }
    if (authMode === "signup" && password !== confirmPwd) { setErr(t.passwordMismatch); return; }
    setBusy(true);
    const result = authMode === "login"
      ? await handleLogin(email, password)
      : await handleSignup(email, password, username);
    setBusy(false);
    if (result?.error) setErr(result.error);
  };

  return (
    <div style={{maxWidth:420,margin:"0 auto",padding:"40px 16px"}}>
      <button onClick={()=>setPage("home")} style={{display:"flex",alignItems:"center",gap:6,padding:"7px 12px",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:8,color:"#E8EAF6",fontSize:13,cursor:"pointer",fontFamily:"inherit",marginBottom:20}}>← Back</button>
      <div style={{background:"linear-gradient(145deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))",border:"1px solid rgba(212,168,67,0.15)",borderRadius:18,padding:28}}>
        <h1 style={{fontFamily:"Georgia,serif",fontSize:26,fontWeight:800,marginBottom:6,textAlign:"center"}}>{authMode==="login" ? t.welcome : t.signup}</h1>
        <p style={{fontSize:13,color:"rgba(232,234,246,0.5)",textAlign:"center",marginBottom:24}}>DonyMarket</p>
        {authMode==="signup" && (
          <div style={{marginBottom:14}}>
            <label style={{display:"block",fontSize:11,fontWeight:700,color:"rgba(200,200,230,0.6)",letterSpacing:1,textTransform:"uppercase",marginBottom:6}}>{t.username}</label>
            <input type="text" value={username} onChange={e=>setUsername(e.target.value)} placeholder="donny99" style={{width:"100%",padding:"12px 14px",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:10,color:"#E8EAF6",fontSize:14,outline:"none"}}/>
          </div>
        )}
        <div style={{marginBottom:14}}>
          <label style={{display:"block",fontSize:11,fontWeight:700,color:"rgba(200,200,230,0.6)",letterSpacing:1,textTransform:"uppercase",marginBottom:6}}>{t.email}</label>
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" autoCapitalize="none" autoCorrect="off" style={{width:"100%",padding:"12px 14px",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:10,color:"#E8EAF6",fontSize:14,outline:"none"}}/>
        </div>
        <div style={{marginBottom:authMode==="signup"?14:18}}>
          <label style={{display:"block",fontSize:11,fontWeight:700,color:"rgba(200,200,230,0.6)",letterSpacing:1,textTransform:"uppercase",marginBottom:6}}>{t.password}</label>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" style={{width:"100%",padding:"12px 14px",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:10,color:"#E8EAF6",fontSize:14,outline:"none"}}/>
        </div>
        {authMode==="signup" && (
          <div style={{marginBottom:18}}>
            <label style={{display:"block",fontSize:11,fontWeight:700,color:"rgba(200,200,230,0.6)",letterSpacing:1,textTransform:"uppercase",marginBottom:6}}>{t.confirmPassword}</label>
            <input type="password" value={confirmPwd} onChange={e=>setConfirmPwd(e.target.value)} placeholder="••••••••" style={{width:"100%",padding:"12px 14px",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:10,color:"#E8EAF6",fontSize:14,outline:"none"}}/>
          </div>
        )}
        {err && <div style={{padding:"10px 12px",background:"rgba(220,38,38,0.15)",border:"1px solid rgba(220,38,38,0.3)",borderRadius:8,color:"#fca5a5",fontSize:12,marginBottom:14}}>{err}</div>}
        <button onClick={submit} disabled={busy} style={{width:"100%",padding:14,background:"linear-gradient(135deg,#1d4ed8,#ef4444)",border:"none",borderRadius:12,color:"#fff",fontWeight:800,fontSize:14,cursor:busy?"wait":"pointer",fontFamily:"inherit",marginBottom:14,opacity:busy?0.6:1}}>{busy ? t.loading : (authMode==="login" ? t.login : t.signup)}</button>
        <div style={{textAlign:"center",fontSize:13,color:"rgba(232,234,246,0.5)"}}>
          {authMode==="login" ? t.noAccount : t.hasAccount}{" "}
          <button onClick={()=>{setAuthMode(authMode==="login"?"signup":"login");setErr("");}} style={{background:"none",border:"none",color:"#FACC15",fontWeight:700,cursor:"pointer",fontFamily:"inherit",fontSize:13}}>{authMode==="login" ? t.signup : t.login}</button>
        </div>
      </div>
    </div>
  );
}

function ProfilePage({ t, user, profile, setPage, setAuthMode, logout, lang, setLang, positions }) {
  if (!user) return (
    <div style={{maxWidth:500,margin:"0 auto",padding:"60px 16px",textAlign:"center"}}>
      <div style={{fontSize:48,marginBottom:14}}>👤</div>
      <h2 style={{fontFamily:"Georgia,serif",fontSize:22,marginBottom:10}}>{t.login}</h2>
      <button onClick={()=>{setAuthMode("login");setPage("auth");}} style={{padding:"12px 28px",background:"linear-gradient(135deg,#1d4ed8,#ef4444)",border:"none",borderRadius:10,color:"#fff",fontWeight:700,fontSize:14,cursor:"pointer",fontFamily:"inherit"}}>{t.login}</button>
    </div>
  );
  const username = profile?.username || user.email?.split("@")[0] || "User";
  return (
    <div style={{maxWidth:600,margin:"0 auto",padding:"20px 16px 100px"}}>
      <div style={{background:"linear-gradient(135deg,rgba(212,168,67,0.15),rgba(239,68,68,0.1))",border:"1px solid rgba(212,168,67,0.25)",borderRadius:18,padding:24,marginBottom:20,textAlign:"center"}}>
        <div style={{width:72,height:72,background:"linear-gradient(135deg,#1d4ed8,#ef4444)",borderRadius:"50%",margin:"0 auto 14px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:30,fontFamily:"Georgia,serif",fontWeight:800,color:"#fff"}}>{username.charAt(0).toUpperCase()}</div>
        <h2 style={{fontFamily:"Georgia,serif",fontSize:20,fontWeight:800,marginBottom:4}}>{username}</h2>
        <div style={{fontSize:13,color:"rgba(232,234,246,0.5)",marginBottom:14}}>{user.email}</div>
        <div style={{display:"inline-block",padding:"6px 14px",background:"rgba(34,197,94,0.15)",border:"1px solid rgba(34,197,94,0.3)",borderRadius:999,fontSize:13,fontWeight:700,color:"#22c55e"}}>💰 {t.balance}: ${(profile?.balance || 0).toFixed(2)}</div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:24}}>
        <div style={{background:"rgba(255,255,255,0.04)",borderRadius:10,padding:12,textAlign:"center"}}><div style={{fontSize:20,fontWeight:800,fontFamily:"Georgia,serif"}}>{positions.length}</div><div style={{fontSize:10,color:"rgba(200,200,230,0.5)",textTransform:"uppercase"}}>{t.bets}</div></div>
        <div style={{background:"rgba(255,255,255,0.04)",borderRadius:10,padding:12,textAlign:"center"}}><div style={{fontSize:20,fontWeight:800,fontFamily:"Georgia,serif",color:"#22c55e"}}>0</div><div style={{fontSize:10,color:"rgba(200,200,230,0.5)",textTransform:"uppercase"}}>{t.won}</div></div>
        <div style={{background:"rgba(255,255,255,0.04)",borderRadius:10,padding:12,textAlign:"center"}}><div style={{fontSize:20,fontWeight:800,fontFamily:"Georgia,serif",color:"#FACC15"}}>$0</div><div style={{fontSize:10,color:"rgba(200,200,230,0.5)",textTransform:"uppercase"}}>{t.profit}</div></div>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:20}}>
        <button onClick={()=>setPage("portfolio")} style={{display:"flex",alignItems:"center",gap:12,width:"100%",padding:"14px 16px",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:12,color:"#E8EAF6",fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"inherit",textAlign:"left"}}><span style={{fontSize:18}}>💼</span><span style={{flex:1}}>{t.portfolio}</span><span style={{color:"rgba(200,200,230,0.4)"}}>›</span></button>
        <button onClick={()=>setPage("help")} style={{display:"flex",alignItems:"center",gap:12,width:"100%",padding:"14px 16px",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:12,color:"#E8EAF6",fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"inherit",textAlign:"left"}}><span style={{fontSize:18}}>❓</span><span style={{flex:1}}>{t.help}</span><span style={{color:"rgba(200,200,230,0.4)"}}>›</span></button>
        <div style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:12,padding:14}}>
          <div style={{fontSize:12,fontWeight:700,color:"rgba(200,200,230,0.6)",marginBottom:10}}>🌐 {t.language}</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
            {LANGS.map(l=>(<button key={l.code} onClick={()=>setLang(l.code)} style={{padding:"6px 10px",background:lang===l.code?"rgba(212,168,67,0.2)":"rgba(255,255,255,0.04)",border:lang===l.code?"1px solid rgba(212,168,67,0.4)":"1px solid rgba(255,255,255,0.07)",borderRadius:8,color:lang===l.code?"#FACC15":"rgba(232,234,246,0.7)",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>{l.flag} {l.name}</button>))}
          </div>
        </div>
      </div>
      <button onClick={logout} style={{width:"100%",padding:14,background:"rgba(220,38,38,0.12)",border:"1px solid rgba(220,38,38,0.3)",borderRadius:12,color:"#fca5a5",fontWeight:700,fontSize:14,cursor:"pointer",fontFamily:"inherit"}}>🚪 {t.logout}</button>
    </div>
  );
}

function HelpPage({ t, setPage }) {
  const [openIdx, setOpenIdx] = useState(null);
  const faqs = [
    {q:"How does DonyMarket work?", a:"Trade on real-world events. Buy YES or NO on outcomes."},
    {q:"Is my data safe?", a:"Yes! We use Supabase secure auth with row-level security."},
    {q:"How do live prices work?", a:"Crypto markets update every minute from CoinGecko. Look for the LIVE badge!"},
    {q:"Can I withdraw winnings?", a:"This is a demo platform. Real money requires licenses we don't have yet."},
  ];
  return (
    <div style={{maxWidth:700,margin:"0 auto",padding:"20px 16px 100px"}}>
      <button onClick={()=>setPage("home")} style={{display:"flex",alignItems:"center",gap:6,padding:"7px 12px",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:8,color:"#E8EAF6",fontSize:13,cursor:"pointer",fontFamily:"inherit",marginBottom:20}}>← Back</button>
      <h1 style={{fontFamily:"Georgia,serif",fontSize:26,fontWeight:800,marginBottom:8}}>❓ {t.help}</h1>
      <p style={{fontSize:14,color:"rgba(232,234,246,0.55)",marginBottom:24}}>{t.faqs}</p>
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {faqs.map((f,i)=>(
          <div key={i} style={{background:"rgba(255,255,255,0.03)",border:`1px solid ${openIdx===i?"rgba(212,168,67,0.3)":"rgba(255,255,255,0.07)"}`,borderRadius:12,overflow:"hidden"}}>
            <button onClick={()=>setOpenIdx(openIdx===i?null:i)} style={{width:"100%",padding:"14px 16px",background:"transparent",border:"none",color:"#E8EAF6",fontWeight:600,fontSize:14,fontFamily:"Georgia,serif",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",textAlign:"left"}}>
              <span style={{flex:1}}>{f.q}</span>
              <span style={{color:"#D4A843",fontSize:18}}>{openIdx===i?"−":"+"}</span>
            </button>
            {openIdx===i && <div style={{padding:"0 16px 14px",fontSize:13,color:"rgba(232,234,246,0.65)",lineHeight:1.6}}>{f.a}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

function SearchPage({ t, lang, search, setSearch, markets, getQ, setSelectedMarket, setPage }) {
  const results = search ? markets.filter(m=>getQ(m).toLowerCase().includes(search.toLowerCase())) : [];
  return (
    <div style={{maxWidth:800,margin:"0 auto",padding:"20px 16px 100px"}}>
      <h1 style={{fontFamily:"Georgia,serif",fontSize:24,fontWeight:800,marginBottom:18}}>🔍 {t.search}</h1>
      <div style={{display:"flex",alignItems:"center",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:12,padding:"0 14px",marginBottom:20}}>
        <span style={{fontSize:16,opacity:0.5,marginRight:8}}>🔍</span>
        <input autoFocus value={search} onChange={e=>setSearch(e.target.value)} placeholder={t.searchPlaceholder} style={{flex:1,background:"transparent",border:"none",outline:"none",color:"#E8EAF6",fontSize:15,padding:"14px 0",fontFamily:"inherit"}}/>
        {search && <button onClick={()=>setSearch("")} style={{background:"none",border:"none",color:"rgba(200,200,230,0.4)",cursor:"pointer",fontSize:14}}>✕</button>}
      </div>
      {search && <div style={{fontSize:12,color:"rgba(232,234,246,0.4)",marginBottom:14}}>{results.length} {t.results}</div>}
      {!search ? (
        <div style={{padding:40,textAlign:"center",color:"rgba(232,234,246,0.4)",fontSize:14}}><div style={{fontSize:36,marginBottom:10}}>🔎</div>{t.searchPlaceholder}</div>
      ) : results.length === 0 ? (
        <div style={{padding:40,textAlign:"center",color:"rgba(232,234,246,0.4)",fontSize:14}}>No results</div>
      ) : (
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {results.map(m=>(
            <button key={m.id} onClick={()=>{setSelectedMarket(m);setPage("market");}} style={{display:"flex",alignItems:"center",gap:12,padding:14,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:12,color:"#E8EAF6",cursor:"pointer",fontFamily:"inherit",textAlign:"left"}}>
              <span style={{fontSize:22}}>{m.icon}</span>
              <div style={{flex:1}}>
                <div style={{fontSize:11,color:"rgba(200,200,230,0.5)",marginBottom:2}}>{COUNTRY_FLAGS[m.country]} {COUNTRY_NAMES[lang][m.country]} · {CAT_NAMES[lang][m.cat]}</div>
                <div style={{fontSize:13,fontWeight:600,fontFamily:"Georgia,serif"}}>{getQ(m)}</div>
              </div>
              <div style={{fontSize:16,fontWeight:800,color:"#22c55e",fontFamily:"Georgia,serif"}}>{m.yes}%</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function BottomNav({ page, setPage, t, slipCount }) {
  const items = [
    {key:"home", icon:"🏠", label:t.home},
    {key:"search", icon:"🔍", label:t.search},
    {key:"slip", icon:"📝", label:t.betslip, badge:slipCount},
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
            {it.badge > 0 && <span style={{position:"absolute",top:2,right:"20%",background:"#ef4444",color:"#fff",fontSize:9,fontWeight:800,padding:"1px 5px",borderRadius:999,minWidth:16,textAlign:"center"}}>{it.badge}</span>}
          </button>
        );
      })}
    </nav>
  );
}
