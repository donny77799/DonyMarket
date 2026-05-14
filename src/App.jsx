import { useState, useEffect } from "react";

// ═══════════════════════════════════════════════════════════════
// UI TRANSLATIONS
// ═══════════════════════════════════════════════════════════════
const T = {
  en: { home:"Home", search:"Search", breaking:"Breaking", more:"More", trending:"Trending", new:"New", politics:"Politics", sports:"Sports", crypto:"Crypto", login:"Log In", signup:"Sign Up", logout:"Log Out", portfolio:"Portfolio", betslip:"Bet Slip", help:"Help Center", profile:"Profile", balance:"Balance", deposit:"Deposit", placeOrder:"Place Order", buyYes:"Buy YES", buyNo:"Buy NO", yes:"YES", no:"NO", volume:"Volume", expires:"Expires", chance:"chance", today:"Today", thisWeek:"This Week", thisMonth:"This Month", allTime:"All Time", allCategories:"All", country:"Country", world:"World", email:"Email", password:"Password", username:"Username", welcome:"Welcome", noAccount:"Don't have an account?", hasAccount:"Already have an account?", emptySlip:"Your bet slip is empty", addToSlip:"Add to Slip", removeFromSlip:"Remove", totalStake:"Total Stake", potentialPayout:"Potential Payout", submitSlip:"Submit All Bets", myPositions:"My Positions", noPositions:"No positions yet", marketDetail:"Market Detail", relatedMarkets:"Related Markets", aboutMarket:"About this Market", priceHistory:"Price History", faqs:"Frequently Asked Questions", contactSupport:"Contact Support", tagline:"Trade on the World's Future", heroSub:"Real markets. Real outcomes. From Tirana to Tokyo.", markets:"Markets", results:"results", browseMarkets:"Browse Markets", activeBets:"Active Bets", totalStaked:"Total Staked", bets:"Bets", won:"Won", profit:"Profit", language:"Language", stake:"Stake", shares:"Shares", price:"Price", emailSupport:"Email Support", searchPlaceholder:"Search markets, topics, countries...", aboutDesc:"This market resolves based on the outcome described in the question. The resolution date is", andTradingVol:"and trading volume is currently" },
  sq: { home:"Kreu", search:"Kërko", breaking:"Lajme", more:"Më shumë", trending:"Në trend", new:"E re", politics:"Politikë", sports:"Sport", crypto:"Kripto", login:"Hyr", signup:"Regjistrohu", logout:"Dil", portfolio:"Portofoli", betslip:"Bileta", help:"Ndihmë", profile:"Profili", balance:"Bilanci", deposit:"Depozitë", placeOrder:"Vendos Porosinë", buyYes:"Bli PO", buyNo:"Bli JO", yes:"PO", no:"JO", volume:"Volumi", expires:"Skadon", chance:"shansi", today:"Sot", thisWeek:"Këtë Javë", thisMonth:"Këtë Muaj", allTime:"Gjithçka", allCategories:"Të Gjitha", country:"Shteti", world:"Bota", email:"Email", password:"Fjalëkalimi", username:"Përdoruesi", welcome:"Mirë se vini", noAccount:"S'keni llogari?", hasAccount:"Keni llogari?", emptySlip:"Bileta është bosh", addToSlip:"Shto në Biletë", removeFromSlip:"Hiq", totalStake:"Bastet Gjithsej", potentialPayout:"Fitimi i Mundshëm", submitSlip:"Vendos të Gjitha", myPositions:"Pozicionet e Mia", noPositions:"S'ka pozicione", marketDetail:"Detajet e Tregut", relatedMarkets:"Tregje të Lidhura", aboutMarket:"Rreth këtij Tregu", priceHistory:"Historia e Çmimeve", faqs:"Pyetjet e Shpeshta", contactSupport:"Kontakto Mbështetjen", tagline:"Trego mbi të Ardhmen", heroSub:"Tregje reale. Rezultate reale. Nga Tirana në Tokio.", markets:"Tregjet", results:"rezultate", browseMarkets:"Shfleto Tregjet", activeBets:"Baste Aktive", totalStaked:"Vlera e Bastit", bets:"Baste", won:"Fituar", profit:"Fitimi", language:"Gjuha", stake:"Basti", shares:"Aksione", price:"Çmimi", emailSupport:"Email Mbështetje", searchPlaceholder:"Kërko tregje, tema, shtete...", aboutDesc:"Ky treg zgjidhet bazuar në rezultatin e përshkruar në pyetje. Data e zgjidhjes është", andTradingVol:"dhe volumi i tregtimit aktualisht është" },
  es: { home:"Inicio", search:"Buscar", breaking:"Últimas", more:"Más", trending:"Tendencias", new:"Nuevo", politics:"Política", sports:"Deportes", crypto:"Cripto", login:"Iniciar Sesión", signup:"Registrarse", logout:"Salir", portfolio:"Portafolio", betslip:"Boleto", help:"Ayuda", profile:"Perfil", balance:"Saldo", deposit:"Depositar", placeOrder:"Hacer Apuesta", buyYes:"Comprar SÍ", buyNo:"Comprar NO", yes:"SÍ", no:"NO", volume:"Volumen", expires:"Vence", chance:"probabilidad", today:"Hoy", thisWeek:"Esta Semana", thisMonth:"Este Mes", allTime:"Todo", allCategories:"Todas", country:"País", world:"Mundo", email:"Correo", password:"Contraseña", username:"Usuario", welcome:"Bienvenido", noAccount:"¿No tienes cuenta?", hasAccount:"¿Ya tienes cuenta?", emptySlip:"Boleto vacío", addToSlip:"Añadir", removeFromSlip:"Quitar", totalStake:"Apuesta Total", potentialPayout:"Pago Potencial", submitSlip:"Enviar Todo", myPositions:"Mis Posiciones", noPositions:"Sin posiciones", marketDetail:"Detalle", relatedMarkets:"Relacionados", aboutMarket:"Acerca de", priceHistory:"Historial", faqs:"Preguntas Frecuentes", contactSupport:"Contactar", tagline:"Comercia con el Futuro", heroSub:"Mercados reales. Resultados reales.", markets:"Mercados", results:"resultados", browseMarkets:"Ver Mercados", activeBets:"Apuestas Activas", totalStaked:"Total Apostado", bets:"Apuestas", won:"Ganadas", profit:"Beneficio", language:"Idioma", stake:"Apuesta", shares:"Acciones", price:"Precio", emailSupport:"Email Soporte", searchPlaceholder:"Buscar mercados, temas, países...", aboutDesc:"Este mercado se resuelve según el resultado descrito en la pregunta. La fecha de resolución es", andTradingVol:"y el volumen actual es" },
  fr: { home:"Accueil", search:"Recherche", breaking:"Actualités", more:"Plus", trending:"Tendances", new:"Nouveau", politics:"Politique", sports:"Sports", crypto:"Crypto", login:"Connexion", signup:"S'inscrire", logout:"Déconnexion", portfolio:"Portefeuille", betslip:"Pari", help:"Aide", profile:"Profil", balance:"Solde", deposit:"Dépôt", placeOrder:"Placer l'Ordre", buyYes:"Acheter OUI", buyNo:"Acheter NON", yes:"OUI", no:"NON", volume:"Volume", expires:"Expire", chance:"chance", today:"Aujourd'hui", thisWeek:"Cette Semaine", thisMonth:"Ce Mois", allTime:"Tout", allCategories:"Tout", country:"Pays", world:"Monde", email:"Email", password:"Mot de passe", username:"Utilisateur", welcome:"Bienvenue", noAccount:"Pas de compte?", hasAccount:"Vous avez un compte?", emptySlip:"Pari vide", addToSlip:"Ajouter", removeFromSlip:"Retirer", totalStake:"Mise Totale", potentialPayout:"Gain Potentiel", submitSlip:"Soumettre Tout", myPositions:"Mes Positions", noPositions:"Aucune position", marketDetail:"Détails", relatedMarkets:"Liés", aboutMarket:"À propos", priceHistory:"Historique", faqs:"Questions Fréquentes", contactSupport:"Contact", tagline:"Pariez sur l'Avenir", heroSub:"Marchés réels. Résultats réels.", markets:"Marchés", results:"résultats", browseMarkets:"Voir les Marchés", activeBets:"Paris Actifs", totalStaked:"Total Misé", bets:"Paris", won:"Gagnés", profit:"Bénéfice", language:"Langue", stake:"Mise", shares:"Parts", price:"Prix", emailSupport:"Email Support", searchPlaceholder:"Rechercher marchés, sujets, pays...", aboutDesc:"Ce marché se résout selon le résultat décrit dans la question. La date de résolution est", andTradingVol:"et le volume actuel est" },
  de: { home:"Start", search:"Suche", breaking:"Aktuell", more:"Mehr", trending:"Trends", new:"Neu", politics:"Politik", sports:"Sport", crypto:"Krypto", login:"Anmelden", signup:"Registrieren", logout:"Abmelden", portfolio:"Portfolio", betslip:"Wettschein", help:"Hilfe", profile:"Profil", balance:"Guthaben", deposit:"Einzahlen", placeOrder:"Bestellen", buyYes:"JA Kaufen", buyNo:"NEIN Kaufen", yes:"JA", no:"NEIN", volume:"Volumen", expires:"Läuft ab", chance:"Chance", today:"Heute", thisWeek:"Diese Woche", thisMonth:"Diesen Monat", allTime:"Alle Zeit", allCategories:"Alle", country:"Land", world:"Welt", email:"E-Mail", password:"Passwort", username:"Benutzer", welcome:"Willkommen", noAccount:"Kein Konto?", hasAccount:"Konto vorhanden?", emptySlip:"Leer", addToSlip:"Hinzufügen", removeFromSlip:"Entfernen", totalStake:"Gesamt", potentialPayout:"Mögliche Auszahlung", submitSlip:"Alle Einreichen", myPositions:"Meine Positionen", noPositions:"Keine Positionen", marketDetail:"Details", relatedMarkets:"Verwandt", aboutMarket:"Über", priceHistory:"Verlauf", faqs:"Häufige Fragen", contactSupport:"Kontakt", tagline:"Handle mit der Zukunft", heroSub:"Echte Märkte. Echte Ergebnisse.", markets:"Märkte", results:"Ergebnisse", browseMarkets:"Märkte ansehen", activeBets:"Aktive Wetten", totalStaked:"Gesamteinsatz", bets:"Wetten", won:"Gewonnen", profit:"Gewinn", language:"Sprache", stake:"Einsatz", shares:"Anteile", price:"Preis", emailSupport:"Email Support", searchPlaceholder:"Märkte, Themen, Länder suchen...", aboutDesc:"Dieser Markt wird basierend auf dem in der Frage beschriebenen Ergebnis aufgelöst. Das Auflösungsdatum ist", andTradingVol:"und das aktuelle Handelsvolumen beträgt" },
  it: { home:"Home", search:"Cerca", breaking:"Ultime", more:"Altro", trending:"Tendenze", new:"Nuovo", politics:"Politica", sports:"Sport", crypto:"Cripto", login:"Accedi", signup:"Registrati", logout:"Esci", portfolio:"Portafoglio", betslip:"Schedina", help:"Aiuto", profile:"Profilo", balance:"Saldo", deposit:"Deposita", placeOrder:"Piazza Ordine", buyYes:"Compra SÌ", buyNo:"Compra NO", yes:"SÌ", no:"NO", volume:"Volume", expires:"Scade", chance:"probabilità", today:"Oggi", thisWeek:"Questa Settimana", thisMonth:"Questo Mese", allTime:"Sempre", allCategories:"Tutte", country:"Paese", world:"Mondo", email:"Email", password:"Password", username:"Utente", welcome:"Benvenuto", noAccount:"Non hai un account?", hasAccount:"Hai un account?", emptySlip:"Schedina vuota", addToSlip:"Aggiungi", removeFromSlip:"Rimuovi", totalStake:"Puntata", potentialPayout:"Vincita Possibile", submitSlip:"Invia Tutto", myPositions:"Mie Posizioni", noPositions:"Nessuna posizione", marketDetail:"Dettagli", relatedMarkets:"Correlati", aboutMarket:"Info", priceHistory:"Storico", faqs:"Domande Frequenti", contactSupport:"Contatta", tagline:"Scommetti sul Futuro", heroSub:"Mercati veri. Risultati veri.", markets:"Mercati", results:"risultati", browseMarkets:"Vedi Mercati", activeBets:"Scommesse Attive", totalStaked:"Totale Puntato", bets:"Scommesse", won:"Vinte", profit:"Profitto", language:"Lingua", stake:"Puntata", shares:"Azioni", price:"Prezzo", emailSupport:"Email Supporto", searchPlaceholder:"Cerca mercati, argomenti, paesi...", aboutDesc:"Questo mercato si risolve in base al risultato descritto nella domanda. La data di risoluzione è", andTradingVol:"e il volume di trading attuale è" },
  tr: { home:"Ana Sayfa", search:"Ara", breaking:"Son Dakika", more:"Daha Fazla", trending:"Popüler", new:"Yeni", politics:"Siyaset", sports:"Spor", crypto:"Kripto", login:"Giriş", signup:"Kayıt Ol", logout:"Çıkış", portfolio:"Portföy", betslip:"Bahis Kuponu", help:"Yardım", profile:"Profil", balance:"Bakiye", deposit:"Para Yatır", placeOrder:"Bahis Yap", buyYes:"EVET Al", buyNo:"HAYIR Al", yes:"EVET", no:"HAYIR", volume:"Hacim", expires:"Bitiş", chance:"olasılık", today:"Bugün", thisWeek:"Bu Hafta", thisMonth:"Bu Ay", allTime:"Tümü", allCategories:"Hepsi", country:"Ülke", world:"Dünya", email:"E-posta", password:"Şifre", username:"Kullanıcı", welcome:"Hoş geldiniz", noAccount:"Hesabınız yok mu?", hasAccount:"Hesabınız var mı?", emptySlip:"Kupon boş", addToSlip:"Ekle", removeFromSlip:"Kaldır", totalStake:"Toplam", potentialPayout:"Olası Kazanç", submitSlip:"Tümünü Gönder", myPositions:"Pozisyonlarım", noPositions:"Pozisyon yok", marketDetail:"Detay", relatedMarkets:"İlgili", aboutMarket:"Hakkında", priceHistory:"Geçmiş", faqs:"Sık Sorulan Sorular", contactSupport:"Destek", tagline:"Geleceğe Yatırım Yap", heroSub:"Gerçek piyasalar. Gerçek sonuçlar.", markets:"Piyasalar", results:"sonuç", browseMarkets:"Piyasalara Göz At", activeBets:"Aktif Bahisler", totalStaked:"Toplam Bahis", bets:"Bahisler", won:"Kazanılan", profit:"Kar", language:"Dil", stake:"Bahis", shares:"Hisse", price:"Fiyat", emailSupport:"E-posta Destek", searchPlaceholder:"Piyasa, konu, ülke ara...", aboutDesc:"Bu piyasa sorudaki sonuca göre çözümlenir. Çözüm tarihi", andTradingVol:"ve mevcut işlem hacmi" },
  ar: { home:"الرئيسية", search:"بحث", breaking:"عاجل", more:"المزيد", trending:"الرائج", new:"جديد", politics:"سياسة", sports:"رياضة", crypto:"عملات", login:"دخول", signup:"تسجيل", logout:"خروج", portfolio:"المحفظة", betslip:"القسيمة", help:"المساعدة", profile:"الملف", balance:"الرصيد", deposit:"إيداع", placeOrder:"إرسال", buyYes:"شراء نعم", buyNo:"شراء لا", yes:"نعم", no:"لا", volume:"الحجم", expires:"ينتهي", chance:"الفرصة", today:"اليوم", thisWeek:"الأسبوع", thisMonth:"الشهر", allTime:"الكل", allCategories:"الكل", country:"الدولة", world:"العالم", email:"البريد", password:"كلمة المرور", username:"المستخدم", welcome:"مرحباً", noAccount:"ليس لديك حساب؟", hasAccount:"لديك حساب؟", emptySlip:"القسيمة فارغة", addToSlip:"إضافة", removeFromSlip:"حذف", totalStake:"المجموع", potentialPayout:"الربح المحتمل", submitSlip:"إرسال الكل", myPositions:"مراكزي", noPositions:"لا توجد مراكز", marketDetail:"التفاصيل", relatedMarkets:"مرتبطة", aboutMarket:"حول", priceHistory:"السجل", faqs:"الأسئلة الشائعة", contactSupport:"اتصل بنا", tagline:"تداول على المستقبل", heroSub:"أسواق حقيقية. نتائج حقيقية.", markets:"الأسواق", results:"نتيجة", browseMarkets:"تصفح الأسواق", activeBets:"الرهانات النشطة", totalStaked:"إجمالي الرهان", bets:"رهانات", won:"فاز", profit:"الربح", language:"اللغة", stake:"الرهان", shares:"أسهم", price:"السعر", emailSupport:"بريد الدعم", searchPlaceholder:"ابحث عن أسواق، مواضيع، دول...", aboutDesc:"يتم حل هذا السوق بناءً على النتيجة الموصوفة في السؤال. تاريخ الحل هو", andTradingVol:"وحجم التداول الحالي هو" },
};

// COUNTRY NAMES TRANSLATED
const COUNTRY_NAMES = {
  en:{All:"All",Albania:"Albania",USA:"USA",UK:"UK",Germany:"Germany",France:"France",Italy:"Italy",Turkey:"Turkey",Spain:"Spain",China:"China",World:"World"},
  sq:{All:"Të Gjitha",Albania:"Shqipëri",USA:"SHBA",UK:"Mbretëria e Bashkuar",Germany:"Gjermani",France:"Francë",Italy:"Itali",Turkey:"Turqi",Spain:"Spanjë",China:"Kinë",World:"Bota"},
  es:{All:"Todos",Albania:"Albania",USA:"EE.UU.",UK:"Reino Unido",Germany:"Alemania",France:"Francia",Italy:"Italia",Turkey:"Turquía",Spain:"España",China:"China",World:"Mundo"},
  fr:{All:"Tous",Albania:"Albanie",USA:"États-Unis",UK:"Royaume-Uni",Germany:"Allemagne",France:"France",Italy:"Italie",Turkey:"Turquie",Spain:"Espagne",China:"Chine",World:"Monde"},
  de:{All:"Alle",Albania:"Albanien",USA:"USA",UK:"Großbritannien",Germany:"Deutschland",France:"Frankreich",Italy:"Italien",Turkey:"Türkei",Spain:"Spanien",China:"China",World:"Welt"},
  it:{All:"Tutti",Albania:"Albania",USA:"USA",UK:"Regno Unito",Germany:"Germania",France:"Francia",Italy:"Italia",Turkey:"Turchia",Spain:"Spagna",China:"Cina",World:"Mondo"},
  tr:{All:"Hepsi",Albania:"Arnavutluk",USA:"ABD",UK:"Birleşik Krallık",Germany:"Almanya",France:"Fransa",Italy:"İtalya",Turkey:"Türkiye",Spain:"İspanya",China:"Çin",World:"Dünya"},
  ar:{All:"الكل",Albania:"ألبانيا",USA:"أمريكا",UK:"بريطانيا",Germany:"ألمانيا",France:"فرنسا",Italy:"إيطاليا",Turkey:"تركيا",Spain:"إسبانيا",China:"الصين",World:"العالم"},
};

// CATEGORY NAMES TRANSLATED
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
// MARKETS — questions translated to all 8 languages
// ═══════════════════════════════════════════════════════════════
const today = new Date("2026-05-14");
const daysFromNow = (d) => Math.ceil((new Date(d) - today) / (1000*60*60*24));

// Each market has q={en,sq,es,fr,de,it,tr,ar}
const MARKETS = [
  // SHORT-TERM
  { id:1, icon:"⚽", cat:"Sports", country:"Albania", yes:34, vol:"240K", exp:"2026-05-21", trending:true, featured:true, term:"week",
    q:{ en:"Will Albania beat Italy in next friendly match?", sq:"A do ta mundë Shqipëria Italinë në miqësoren e ardhshme?", es:"¿Albania vencerá a Italia en el próximo amistoso?", fr:"L'Albanie battra-t-elle l'Italie au prochain amical?", de:"Wird Albanien Italien im nächsten Freundschaftsspiel schlagen?", it:"L'Albania batterà l'Italia nella prossima amichevole?", tr:"Arnavutluk bir sonraki hazırlık maçında İtalya'yı yenecek mi?", ar:"هل ستفوز ألبانيا على إيطاليا في المباراة الودية القادمة؟" }},
  { id:2, icon:"₿", cat:"Crypto", country:"World", yes:58, vol:"3.2M", exp:"2026-05-18", trending:true, featured:true, term:"week",
    q:{ en:"Will Bitcoin close above $110,000 this week?", sq:"A do të mbyllet Bitcoin mbi $110,000 këtë javë?", es:"¿Bitcoin cerrará por encima de $110,000 esta semana?", fr:"Bitcoin clôturera-t-il au-dessus de 110 000 $ cette semaine?", de:"Wird Bitcoin diese Woche über 110.000 $ schließen?", it:"Bitcoin chiuderà sopra i $110.000 questa settimana?", tr:"Bitcoin bu hafta $110.000 üzerinde kapanacak mı?", ar:"هل سيغلق البيتكوين فوق 110,000 دولار هذا الأسبوع؟" }},
  { id:3, icon:"⚖️", cat:"Politics", country:"Albania", yes:47, vol:"180K", exp:"2026-05-21", trending:true, featured:true, term:"week",
    q:{ en:"Will SPAK file new charges against a minister this week?", sq:"A do të ngrejë SPAK akuza të reja kundër një ministri këtë javë?", es:"¿Presentará SPAK nuevos cargos contra un ministro esta semana?", fr:"Le SPAK déposera-t-il de nouvelles accusations contre un ministre cette semaine?", de:"Wird SPAK diese Woche neue Anklagen gegen einen Minister erheben?", it:"SPAK presenterà nuove accuse contro un ministro questa settimana?", tr:"SPAK bu hafta bir bakana yeni suçlamalar yöneltecek mi?", ar:"هل ستوجه سباك اتهامات جديدة لوزير هذا الأسبوع؟" }},
  { id:4, icon:"📱", cat:"Politics", country:"USA", yes:72, vol:"890K", exp:"2026-05-21", trending:true, featured:true, term:"week",
    q:{ en:"Will Trump tweet more than 50 times this week?", sq:"A do të postojë Trump më shumë se 50 herë në Twitter këtë javë?", es:"¿Trump tuiteará más de 50 veces esta semana?", fr:"Trump tweetera-t-il plus de 50 fois cette semaine?", de:"Wird Trump diese Woche mehr als 50 Mal twittern?", it:"Trump twitterà più di 50 volte questa settimana?", tr:"Trump bu hafta 50'den fazla tweet atacak mı?", ar:"هل سيغرد ترامب أكثر من 50 مرة هذا الأسبوع؟" }},
  { id:5, icon:"⟠", cat:"Crypto", country:"World", yes:41, vol:"1.4M", exp:"2026-05-18", trending:true, featured:false, term:"week",
    q:{ en:"Will ETH outperform BTC this week?", sq:"A do ta tejkalojë ETH performancën e BTC këtë javë?", es:"¿ETH superará a BTC esta semana?", fr:"ETH surpassera-t-il BTC cette semaine?", de:"Wird ETH diese Woche besser abschneiden als BTC?", it:"ETH supererà BTC questa settimana?", tr:"ETH bu hafta BTC'den daha iyi performans gösterecek mi?", ar:"هل ستتفوق ETH على BTC هذا الأسبوع؟" }},
  { id:6, icon:"⚽", cat:"Sports", country:"Spain", yes:52, vol:"680K", exp:"2026-05-19", trending:true, featured:false, term:"week",
    q:{ en:"Will Real Madrid score 3+ goals in next match?", sq:"A do të shënojë Real Madridi 3+ gola në ndeshjen e ardhshme?", es:"¿Real Madrid marcará 3+ goles en el próximo partido?", fr:"Le Real Madrid marquera-t-il 3+ buts au prochain match?", de:"Wird Real Madrid im nächsten Spiel 3+ Tore schießen?", it:"Il Real Madrid segnerà 3+ gol nella prossima partita?", tr:"Real Madrid bir sonraki maçta 3+ gol atacak mı?", ar:"هل سيسجل ريال مدريد 3+ أهداف في المباراة القادمة؟" }},
  { id:7, icon:"🏛️", cat:"Politics", country:"Albania", yes:18, vol:"520K", exp:"2026-05-31", trending:true, featured:true, term:"month",
    q:{ en:"Will Tirana Mayor Veliaj be released this month?", sq:"A do të lirohet Kryetari i Tiranës Veliaj këtë muaj?", es:"¿Será liberado el alcalde de Tirana Veliaj este mes?", fr:"Le maire de Tirana Veliaj sera-t-il libéré ce mois-ci?", de:"Wird Tiranas Bürgermeister Veliaj diesen Monat freigelassen?", it:"Il sindaco di Tirana Veliaj sarà rilasciato questo mese?", tr:"Tiran Belediye Başkanı Veliaj bu ay serbest bırakılacak mı?", ar:"هل سيُفرج عن رئيس بلدية تيرانا فيلياج هذا الشهر؟" }},
  { id:8, icon:"🏦", cat:"Economy", country:"USA", yes:96, vol:"1.8M", exp:"2026-05-31", trending:false, featured:false, term:"month",
    q:{ en:"Will the Fed announce rate decision this month?", sq:"A do ta shpallë Fed-i vendimin për normat këtë muaj?", es:"¿Anunciará la Fed la decisión de tasas este mes?", fr:"La Fed annoncera-t-elle sa décision de taux ce mois-ci?", de:"Wird die Fed diesen Monat ihre Zinsentscheidung bekannt geben?", it:"La Fed annuncerà la decisione sui tassi questo mese?", tr:"Fed bu ay faiz kararını açıklayacak mı?", ar:"هل سيعلن الفيدرالي قرار سعر الفائدة هذا الشهر؟" }},
  { id:9, icon:"🎮", cat:"Entertainment", country:"World", yes:38, vol:"2.1M", exp:"2026-05-31", trending:true, featured:true, term:"month",
    q:{ en:"Will GTA VI release date be confirmed this month?", sq:"A do të konfirmohet data e lëshimit të GTA VI këtë muaj?", es:"¿Se confirmará la fecha de lanzamiento de GTA VI este mes?", fr:"La date de sortie de GTA VI sera-t-elle confirmée ce mois-ci?", de:"Wird das Veröffentlichungsdatum von GTA VI diesen Monat bestätigt?", it:"La data di uscita di GTA VI sarà confermata questo mese?", tr:"GTA VI çıkış tarihi bu ay onaylanacak mı?", ar:"هل سيتم تأكيد تاريخ إصدار GTA VI هذا الشهر؟" }},
  { id:10, icon:"🏎️", cat:"Sports", country:"World", yes:44, vol:"1.1M", exp:"2026-05-24", trending:true, featured:false, term:"week",
    q:{ en:"Will Verstappen win Monaco GP 2026?", sq:"A do ta fitojë Verstappen Monaco GP 2026?", es:"¿Verstappen ganará el GP de Mónaco 2026?", fr:"Verstappen gagnera-t-il le GP de Monaco 2026?", de:"Wird Verstappen den Monaco GP 2026 gewinnen?", it:"Verstappen vincerà il GP di Monaco 2026?", tr:"Verstappen 2026 Monako GP'sini kazanacak mı?", ar:"هل سيفوز فيرستابن بسباق موناكو 2026؟" }},
  // ALBANIA
  { id:101, icon:"🇪🇺", cat:"Politics", country:"Albania", yes:58, vol:"1.2M", exp:"2027-12-31", trending:true, featured:true, term:"year",
    q:{ en:"Will Albania complete EU accession by end of 2027?", sq:"A do ta përfundojë Shqipëria anëtarësimin në BE deri në fund të vitit 2027?", es:"¿Albania completará la adhesión a la UE para fines de 2027?", fr:"L'Albanie achèvera-t-elle son adhésion à l'UE d'ici fin 2027?", de:"Wird Albanien den EU-Beitritt bis Ende 2027 abschließen?", it:"L'Albania completerà l'adesione UE entro fine 2027?", tr:"Arnavutluk 2027 sonuna kadar AB üyeliğini tamamlayacak mı?", ar:"هل ستكمل ألبانيا الانضمام للاتحاد الأوروبي بنهاية 2027؟" }},
  { id:102, icon:"🛡️", cat:"Politics", country:"Albania", yes:89, vol:"430K", exp:"2027-10-31", trending:true, featured:true, term:"year",
    q:{ en:"Will Albania host 2027 NATO Summit successfully?", sq:"A do ta presë Shqipëria me sukses Samitin e NATO-s 2027?", es:"¿Albania albergará con éxito la cumbre OTAN 2027?", fr:"L'Albanie organisera-t-elle avec succès le sommet OTAN 2027?", de:"Wird Albanien den NATO-Gipfel 2027 erfolgreich ausrichten?", it:"L'Albania ospiterà con successo il vertice NATO 2027?", tr:"Arnavutluk 2027 NATO Zirvesine başarıyla ev sahipliği yapacak mı?", ar:"هل ستستضيف ألبانيا قمة الناتو 2027 بنجاح؟" }},
  { id:103, icon:"⚖️", cat:"Politics", country:"Albania", yes:42, vol:"680K", exp:"2026-12-31", trending:true, featured:false, term:"year",
    q:{ en:"Will SPAK convict Deputy PM Balluku?", sq:"A do ta dënojë SPAK Zëvendëskryeministren Balluku?", es:"¿SPAK condenará a la Viceprimera Ministra Balluku?", fr:"Le SPAK condamnera-t-il la vice-Première ministre Balluku?", de:"Wird SPAK Vizepremier Balluku verurteilen?", it:"SPAK condannerà il Vicepremier Balluku?", tr:"SPAK Başbakan Yardımcısı Balluku'yu mahkum edecek mi?", ar:"هل ستدين سباك نائبة رئيس الوزراء بالوكو؟" }},
  { id:104, icon:"🏛️", cat:"Politics", country:"Albania", yes:55, vol:"920K", exp:"2027-06-30", trending:true, featured:false, term:"year",
    q:{ en:"Will Tirana Mayor Veliaj be found guilty?", sq:"A do të shpallet fajtor Kryetari i Tiranës Veliaj?", es:"¿Será declarado culpable el alcalde de Tirana Veliaj?", fr:"Le maire de Tirana Veliaj sera-t-il déclaré coupable?", de:"Wird Tiranas Bürgermeister Veliaj für schuldig befunden?", it:"Il sindaco di Tirana Veliaj sarà dichiarato colpevole?", tr:"Tiran Belediye Başkanı Veliaj suçlu bulunacak mı?", ar:"هل سيُدان رئيس بلدية تيرانا فيلياج؟" }},
  { id:105, icon:"🏖️", cat:"Economy", country:"Albania", yes:71, vol:"200K", exp:"2026-12-31", trending:false, featured:false, term:"year",
    q:{ en:"Will Albania's tourism exceed 13M visitors in 2026?", sq:"A do ta kalojë turizmi shqiptar 13 milionë vizitorë në 2026?", es:"¿El turismo de Albania superará 13M de visitantes en 2026?", fr:"Le tourisme albanais dépassera-t-il 13M de visiteurs en 2026?", de:"Wird Albaniens Tourismus 2026 13 Mio. Besucher überschreiten?", it:"Il turismo albanese supererà i 13M di visitatori nel 2026?", tr:"Arnavutluk turizmi 2026'da 13M ziyaretçiyi aşacak mı?", ar:"هل ستتجاوز سياحة ألبانيا 13 مليون زائر في 2026؟" }},
  { id:106, icon:"⚽", cat:"Sports", country:"Albania", yes:18, vol:"340K", exp:"2026-06-01", trending:true, featured:false, term:"month",
    q:{ en:"Will Albania qualify for 2026 FIFA World Cup?", sq:"A do të kualifikohet Shqipëria për Botërorin 2026?", es:"¿Albania se clasificará para el Mundial 2026?", fr:"L'Albanie se qualifiera-t-elle pour la Coupe du Monde 2026?", de:"Wird sich Albanien für die WM 2026 qualifizieren?", it:"L'Albania si qualificherà ai Mondiali 2026?", tr:"Arnavutluk 2026 Dünya Kupasına katılacak mı?", ar:"هل ستتأهل ألبانيا لكأس العالم 2026؟" }},
  { id:107, icon:"🤝", cat:"Politics", country:"Albania", yes:31, vol:"220K", exp:"2026-12-31", trending:false, featured:false, term:"year",
    q:{ en:"Will Albania-Kosovo customs union be signed in 2026?", sq:"A do të nënshkruhet bashkimi doganor Shqipëri-Kosovë në 2026?", es:"¿Se firmará la unión aduanera Albania-Kosovo en 2026?", fr:"L'union douanière Albanie-Kosovo sera-t-elle signée en 2026?", de:"Wird die Zollunion Albanien-Kosovo 2026 unterzeichnet?", it:"L'unione doganale Albania-Kosovo sarà firmata nel 2026?", tr:"Arnavutluk-Kosova gümrük birliği 2026'da imzalanacak mı?", ar:"هل سيتم توقيع اتحاد جمركي ألبانيا-كوسوفو في 2026؟" }},
  { id:108, icon:"💸", cat:"Economy", country:"Albania", yes:62, vol:"140K", exp:"2026-12-31", trending:false, featured:false, term:"year",
    q:{ en:"Will Albania's GDP grow above 4% in 2026?", sq:"A do të rritet PBB-ja e Shqipërisë mbi 4% në 2026?", es:"¿El PIB de Albania crecerá más del 4% en 2026?", fr:"Le PIB albanais croîtra-t-il de plus de 4% en 2026?", de:"Wird Albaniens BIP 2026 über 4% wachsen?", it:"Il PIL albanese crescerà oltre il 4% nel 2026?", tr:"Arnavutluk GSYİH'sı 2026'da %4'ün üzerinde büyüyecek mi?", ar:"هل سينمو الناتج المحلي لألبانيا فوق 4% في 2026؟" }},
  // USA
  { id:201, icon:"🇺🇸", cat:"Politics", country:"USA", yes:34, vol:"4.2M", exp:"2026-09-30", trending:true, featured:true, term:"month",
    q:{ en:"Will Trump approval rating exceed 50% by Q3 2026?", sq:"A do ta kalojë miratimi i Trump 50% deri në tremujorin e 3-të 2026?", es:"¿La aprobación de Trump superará el 50% para Q3 2026?", fr:"L'approbation de Trump dépassera-t-elle 50% au T3 2026?", de:"Wird Trumps Zustimmung Q3 2026 über 50% liegen?", it:"L'approvazione di Trump supererà il 50% nel Q3 2026?", tr:"Trump'ın onay oranı 2026 3. çeyrekte %50'yi aşacak mı?", ar:"هل ستتجاوز نسبة موافقة ترامب 50% في الربع الثالث 2026؟" }},
  { id:202, icon:"📉", cat:"Economy", country:"USA", yes:33, vol:"2.1M", exp:"2026-12-31", trending:true, featured:false, term:"year",
    q:{ en:"Will US enter recession in 2026?", sq:"A do të hyjë SHBA-ja në recesion në 2026?", es:"¿EE.UU. entrará en recesión en 2026?", fr:"Les États-Unis entreront-ils en récession en 2026?", de:"Werden die USA 2026 in eine Rezession geraten?", it:"Gli USA entreranno in recessione nel 2026?", tr:"ABD 2026'da resesyona girecek mi?", ar:"هل ستدخل أمريكا في ركود في 2026؟" }},
  { id:203, icon:"💹", cat:"Economy", country:"USA", yes:61, vol:"2.9M", exp:"2026-12-31", trending:false, featured:false, term:"year",
    q:{ en:"Will S&P 500 hit 7,000 in 2026?", sq:"A do ta arrijë S&P 500 nivelin 7,000 në 2026?", es:"¿S&P 500 alcanzará 7,000 en 2026?", fr:"Le S&P 500 atteindra-t-il 7 000 en 2026?", de:"Wird der S&P 500 2026 7.000 erreichen?", it:"Lo S&P 500 raggiungerà i 7.000 nel 2026?", tr:"S&P 500 2026'da 7.000'e ulaşacak mı?", ar:"هل سيصل مؤشر S&P 500 إلى 7000 في 2026؟" }},
  { id:204, icon:"🏦", cat:"Economy", country:"USA", yes:67, vol:"2.4M", exp:"2026-09-01", trending:true, featured:true, term:"month",
    q:{ en:"Will Fed cut rates by September 2026?", sq:"A do t'i ulë Fed-i normat deri në shtator 2026?", es:"¿La Fed bajará las tasas para septiembre 2026?", fr:"La Fed baissera-t-elle les taux d'ici septembre 2026?", de:"Wird die Fed bis September 2026 die Zinsen senken?", it:"La Fed taglierà i tassi entro settembre 2026?", tr:"Fed Eylül 2026'ya kadar faiz indirecek mi?", ar:"هل سيخفض الفيدرالي الفائدة بحلول سبتمبر 2026؟" }},
  { id:205, icon:"🏀", cat:"Sports", country:"USA", yes:12, vol:"890K", exp:"2026-06-30", trending:false, featured:false, term:"month",
    q:{ en:"Will Lakers win NBA championship 2026?", sq:"A do ta fitojnë Lakers kampionatin NBA 2026?", es:"¿Los Lakers ganarán el campeonato NBA 2026?", fr:"Les Lakers gagneront-ils le championnat NBA 2026?", de:"Werden die Lakers die NBA-Meisterschaft 2026 gewinnen?", it:"I Lakers vinceranno il campionato NBA 2026?", tr:"Lakers 2026 NBA şampiyonluğunu kazanacak mı?", ar:"هل سيفوز الليكرز ببطولة NBA 2026؟" }},
  // UK
  { id:301, icon:"🇬🇧", cat:"Economy", country:"UK", yes:38, vol:"650K", exp:"2026-12-31", trending:false, featured:false, term:"year",
    q:{ en:"Will UK inflation drop below 2% in 2026?", sq:"A do të bjerë inflacioni në MB nën 2% në 2026?", es:"¿La inflación del Reino Unido bajará del 2% en 2026?", fr:"L'inflation britannique passera-t-elle sous 2% en 2026?", de:"Wird die britische Inflation 2026 unter 2% fallen?", it:"L'inflazione UK scenderà sotto il 2% nel 2026?", tr:"İngiltere enflasyonu 2026'da %2'nin altına düşecek mi?", ar:"هل سينخفض تضخم بريطانيا تحت 2% في 2026؟" }},
  { id:302, icon:"🏛️", cat:"Politics", country:"UK", yes:81, vol:"420K", exp:"2026-12-31", trending:false, featured:false, term:"year",
    q:{ en:"Will Keir Starmer remain PM through 2026?", sq:"A do të vazhdojë Keir Starmer si kryeministër gjatë 2026?", es:"¿Keir Starmer seguirá siendo PM durante 2026?", fr:"Keir Starmer restera-t-il Premier ministre en 2026?", de:"Wird Keir Starmer 2026 Premierminister bleiben?", it:"Keir Starmer rimarrà Primo Ministro per tutto il 2026?", tr:"Keir Starmer 2026 boyunca başbakan kalacak mı?", ar:"هل سيبقى كير ستارمر رئيسًا للوزراء طوال 2026؟" }},
  // Germany
  { id:401, icon:"🇩🇪", cat:"Politics", country:"Germany", yes:28, vol:"380K", exp:"2026-12-31", trending:false, featured:false, term:"year",
    q:{ en:"Will Germany's coalition government collapse in 2026?", sq:"A do të shpërbëhet qeveria koalicioniste e Gjermanisë në 2026?", es:"¿El gobierno de coalición alemán colapsará en 2026?", fr:"Le gouvernement de coalition allemand s'effondrera-t-il en 2026?", de:"Wird Deutschlands Koalitionsregierung 2026 zusammenbrechen?", it:"Il governo di coalizione tedesco crollerà nel 2026?", tr:"Almanya koalisyon hükümeti 2026'da çökecek mi?", ar:"هل سينهار الائتلاف الحاكم الألماني في 2026؟" }},
  { id:402, icon:"⚽", cat:"Sports", country:"Germany", yes:73, vol:"540K", exp:"2026-05-18", trending:true, featured:false, term:"week",
    q:{ en:"Will Bayern Munich win Bundesliga 2025-26?", sq:"A do ta fitojë Bayern Munich Bundesligën 2025-26?", es:"¿Bayern Múnich ganará la Bundesliga 2025-26?", fr:"Le Bayern Munich gagnera-t-il la Bundesliga 2025-26?", de:"Wird Bayern München die Bundesliga 2025-26 gewinnen?", it:"Il Bayern Monaco vincerà la Bundesliga 2025-26?", tr:"Bayern Münih 2025-26 Bundesliga'yı kazanacak mı?", ar:"هل سيفوز بايرن ميونيخ بالبوندسليغا 2025-26؟" }},
  // France
  { id:501, icon:"🇫🇷", cat:"Politics", country:"France", yes:24, vol:"280K", exp:"2026-12-31", trending:false, featured:false, term:"year",
    q:{ en:"Will Macron's approval rise above 35% in 2026?", sq:"A do të rritet miratimi i Macron mbi 35% në 2026?", es:"¿La aprobación de Macron subirá del 35% en 2026?", fr:"L'approbation de Macron dépassera-t-elle 35% en 2026?", de:"Wird Macrons Zustimmung 2026 über 35% steigen?", it:"L'approvazione di Macron salirà sopra il 35% nel 2026?", tr:"Macron'un onay oranı 2026'da %35'in üzerine çıkacak mı?", ar:"هل سترتفع شعبية ماكرون فوق 35% في 2026؟" }},
  { id:502, icon:"⚽", cat:"Sports", country:"France", yes:22, vol:"720K", exp:"2026-05-30", trending:true, featured:false, term:"month",
    q:{ en:"Will PSG win Champions League 2026?", sq:"A do ta fitojë PSG Champions League 2026?", es:"¿PSG ganará la Champions League 2026?", fr:"Le PSG gagnera-t-il la Ligue des Champions 2026?", de:"Wird PSG die Champions League 2026 gewinnen?", it:"Il PSG vincerà la Champions League 2026?", tr:"PSG 2026 Şampiyonlar Ligi'ni kazanacak mı?", ar:"هل سيفوز باريس سان جيرمان بدوري الأبطال 2026؟" }},
  // Italy
  { id:601, icon:"🇮🇹", cat:"Politics", country:"Italy", yes:14, vol:"190K", exp:"2026-12-31", trending:false, featured:false, term:"year",
    q:{ en:"Will Meloni call early elections in 2026?", sq:"A do të shpallë Meloni zgjedhje të parakohshme në 2026?", es:"¿Meloni convocará elecciones anticipadas en 2026?", fr:"Meloni convoquera-t-elle des élections anticipées en 2026?", de:"Wird Meloni 2026 vorgezogene Wahlen ausrufen?", it:"Meloni indirà elezioni anticipate nel 2026?", tr:"Meloni 2026'da erken seçim çağrısı yapacak mı?", ar:"هل ستدعو ميلوني لانتخابات مبكرة في 2026؟" }},
  { id:602, icon:"⚽", cat:"Sports", country:"Italy", yes:48, vol:"410K", exp:"2026-05-25", trending:false, featured:false, term:"week",
    q:{ en:"Will Inter Milan win Serie A 2025-26?", sq:"A do ta fitojë Inter Milan Serien A 2025-26?", es:"¿Inter de Milán ganará la Serie A 2025-26?", fr:"L'Inter Milan gagnera-t-il la Serie A 2025-26?", de:"Wird Inter Mailand die Serie A 2025-26 gewinnen?", it:"L'Inter vincerà la Serie A 2025-26?", tr:"Inter Milan 2025-26 Serie A'yı kazanacak mı?", ar:"هل سيفوز إنتر ميلان بالدوري الإيطالي 2025-26؟" }},
  // Turkey
  { id:701, icon:"🇹🇷", cat:"Economy", country:"Turkey", yes:41, vol:"320K", exp:"2026-12-31", trending:false, featured:false, term:"year",
    q:{ en:"Will Turkey's inflation drop below 30% in 2026?", sq:"A do të bjerë inflacioni i Turqisë nën 30% në 2026?", es:"¿La inflación de Turquía bajará del 30% en 2026?", fr:"L'inflation turque passera-t-elle sous 30% en 2026?", de:"Wird die Türkei-Inflation 2026 unter 30% fallen?", it:"L'inflazione turca scenderà sotto il 30% nel 2026?", tr:"Türkiye enflasyonu 2026'da %30'un altına düşecek mi?", ar:"هل سينخفض تضخم تركيا تحت 30% في 2026؟" }},
  { id:702, icon:"⚽", cat:"Sports", country:"Turkey", yes:68, vol:"230K", exp:"2026-05-20", trending:false, featured:false, term:"week",
    q:{ en:"Will Galatasaray win Süper Lig 2025-26?", sq:"A do ta fitojë Galatasaray Superligen Turke 2025-26?", es:"¿Galatasaray ganará la Süper Lig 2025-26?", fr:"Galatasaray gagnera-t-il la Süper Lig 2025-26?", de:"Wird Galatasaray die Süper Lig 2025-26 gewinnen?", it:"Il Galatasaray vincerà la Süper Lig 2025-26?", tr:"Galatasaray 2025-26 Süper Lig'i kazanacak mı?", ar:"هل سيفوز غلطة سراي بالدوري التركي الممتاز 2025-26؟" }},
  // Spain
  { id:801, icon:"⚽", cat:"Sports", country:"Spain", yes:64, vol:"890K", exp:"2026-05-24", trending:true, featured:false, term:"week",
    q:{ en:"Will Real Madrid win La Liga 2025-26?", sq:"A do ta fitojë Real Madrid La Ligan 2025-26?", es:"¿Real Madrid ganará La Liga 2025-26?", fr:"Le Real Madrid gagnera-t-il La Liga 2025-26?", de:"Wird Real Madrid La Liga 2025-26 gewinnen?", it:"Il Real Madrid vincerà La Liga 2025-26?", tr:"Real Madrid 2025-26 La Liga'yı kazanacak mı?", ar:"هل سيفوز ريال مدريد بالدوري الإسباني 2025-26؟" }},
  { id:802, icon:"🏆", cat:"Sports", country:"Spain", yes:28, vol:"1.8M", exp:"2026-05-30", trending:true, featured:false, term:"month",
    q:{ en:"Will Real Madrid win Champions League 2026?", sq:"A do ta fitojë Real Madrid Champions League 2026?", es:"¿Real Madrid ganará la Champions League 2026?", fr:"Le Real Madrid gagnera-t-il la Ligue des Champions 2026?", de:"Wird Real Madrid die Champions League 2026 gewinnen?", it:"Il Real Madrid vincerà la Champions League 2026?", tr:"Real Madrid 2026 Şampiyonlar Ligi'ni kazanacak mı?", ar:"هل سيفوز ريال مدريد بدوري الأبطال 2026؟" }},
  // China
  { id:901, icon:"🇨🇳", cat:"Economy", country:"China", yes:48, vol:"1.1M", exp:"2026-12-31", trending:false, featured:false, term:"year",
    q:{ en:"Will China's GDP exceed 5% growth in 2026?", sq:"A do ta tejkalojë rritja e PBB-së së Kinës 5% në 2026?", es:"¿El PIB de China superará el 5% de crecimiento en 2026?", fr:"La croissance du PIB chinois dépassera-t-elle 5% en 2026?", de:"Wird Chinas BIP 2026 über 5% wachsen?", it:"Il PIL cinese supererà il 5% di crescita nel 2026?", tr:"Çin GSYİH büyümesi 2026'da %5'i aşacak mı?", ar:"هل سيتجاوز نمو الناتج المحلي الصيني 5% في 2026؟" }},
  { id:902, icon:"⚠️", cat:"Politics", country:"China", yes:8, vol:"3.4M", exp:"2028-01-01", trending:true, featured:false, term:"year",
    q:{ en:"Will China invade Taiwan before 2028?", sq:"A do ta pushtojë Kina Tajvanin para vitit 2028?", es:"¿China invadirá Taiwán antes de 2028?", fr:"La Chine envahira-t-elle Taïwan avant 2028?", de:"Wird China Taiwan vor 2028 angreifen?", it:"La Cina invaderà Taiwan prima del 2028?", tr:"Çin 2028'den önce Tayvan'ı işgal edecek mi?", ar:"هل ستغزو الصين تايوان قبل 2028؟" }},
  // CRYPTO
  { id:1001, icon:"₿", cat:"Crypto", country:"World", yes:44, vol:"5.1M", exp:"2026-12-31", trending:true, featured:true, term:"year",
    q:{ en:"Will Bitcoin exceed $150,000 in 2026?", sq:"A do ta tejkalojë Bitcoin $150,000 në 2026?", es:"¿Bitcoin superará $150,000 en 2026?", fr:"Bitcoin dépassera-t-il 150 000 $ en 2026?", de:"Wird Bitcoin 2026 150.000 $ überschreiten?", it:"Bitcoin supererà i $150.000 nel 2026?", tr:"Bitcoin 2026'da $150.000'i aşacak mı?", ar:"هل سيتجاوز البيتكوين 150 ألف دولار في 2026؟" }},
  { id:1002, icon:"⟠", cat:"Crypto", country:"World", yes:18, vol:"3.2M", exp:"2027-01-01", trending:false, featured:false, term:"year",
    q:{ en:"Will Ethereum flip Bitcoin by 2027?", sq:"A do ta kalojë Ethereum Bitcoin-in deri në 2027?", es:"¿Ethereum superará a Bitcoin para 2027?", fr:"Ethereum dépassera-t-il Bitcoin d'ici 2027?", de:"Wird Ethereum Bitcoin bis 2027 überholen?", it:"Ethereum supererà Bitcoin entro il 2027?", tr:"Ethereum 2027'ye kadar Bitcoin'i geçecek mi?", ar:"هل ستتفوق إيثريوم على بيتكوين بحلول 2027؟" }},
  { id:1003, icon:"💎", cat:"Crypto", country:"World", yes:37, vol:"2.1M", exp:"2026-12-31", trending:true, featured:false, term:"year",
    q:{ en:"Will Solana reach $500 in 2026?", sq:"A do ta arrijë Solana $500 në 2026?", es:"¿Solana llegará a $500 en 2026?", fr:"Solana atteindra-t-il 500 $ en 2026?", de:"Wird Solana 2026 500 $ erreichen?", it:"Solana raggiungerà $500 nel 2026?", tr:"Solana 2026'da $500'e ulaşacak mı?", ar:"هل ستصل سولانا إلى 500 دولار في 2026؟" }},
  { id:1004, icon:"🐕", cat:"Crypto", country:"World", yes:28, vol:"1.9M", exp:"2026-12-31", trending:false, featured:false, term:"year",
    q:{ en:"Will Dogecoin reach $1 in 2026?", sq:"A do ta arrijë Dogecoin $1 në 2026?", es:"¿Dogecoin llegará a $1 en 2026?", fr:"Dogecoin atteindra-t-il 1 $ en 2026?", de:"Wird Dogecoin 2026 1 $ erreichen?", it:"Dogecoin raggiungerà $1 nel 2026?", tr:"Dogecoin 2026'da $1'e ulaşacak mı?", ar:"هل ستصل دوجكوين إلى دولار واحد في 2026؟" }},
  { id:1005, icon:"⚡", cat:"Crypto", country:"World", yes:64, vol:"1.4M", exp:"2026-12-31", trending:true, featured:false, term:"year",
    q:{ en:"Will XRP be classified non-security?", sq:"A do të klasifikohet XRP si jo-letër me vlerë?", es:"¿XRP será clasificado como no-valor?", fr:"XRP sera-t-il classé non-titre?", de:"Wird XRP als Nicht-Wertpapier eingestuft?", it:"XRP sarà classificato non-titolo?", tr:"XRP menkul kıymet olmayan olarak sınıflandırılacak mı?", ar:"هل سيُصنف XRP كغير ورقة مالية؟" }},
  // TECH
  { id:1101, icon:"🤖", cat:"Tech", country:"World", yes:72, vol:"890K", exp:"2026-07-01", trending:true, featured:false, term:"month",
    q:{ en:"Will GPT-5 release before Q3 2026?", sq:"A do të lëshohet GPT-5 para tremujorit të 3-të 2026?", es:"¿GPT-5 se lanzará antes de Q3 2026?", fr:"GPT-5 sortira-t-il avant le T3 2026?", de:"Wird GPT-5 vor Q3 2026 erscheinen?", it:"GPT-5 uscirà prima del Q3 2026?", tr:"GPT-5 2026 3. çeyrekten önce çıkacak mı?", ar:"هل سيُطلق GPT-5 قبل الربع الثالث 2026؟" }},
  { id:1102, icon:"🥽", cat:"Tech", country:"World", yes:35, vol:"1.1M", exp:"2026-12-31", trending:false, featured:false, term:"year",
    q:{ en:"Will Apple release AR glasses in 2026?", sq:"A do t'i lëshojë Apple syzet AR në 2026?", es:"¿Apple lanzará gafas AR en 2026?", fr:"Apple sortira-t-il des lunettes AR en 2026?", de:"Wird Apple 2026 AR-Brillen veröffentlichen?", it:"Apple rilascerà occhiali AR nel 2026?", tr:"Apple 2026'da AR gözlük çıkaracak mı?", ar:"هل ستصدر آبل نظارات الواقع المعزز في 2026؟" }},
  { id:1103, icon:"🚗", cat:"Tech", country:"World", yes:48, vol:"2.2M", exp:"2026-12-31", trending:true, featured:false, term:"year",
    q:{ en:"Will Tesla Robotaxi launch in 2026?", sq:"A do të lansohet Tesla Robotaxi në 2026?", es:"¿Tesla Robotaxi se lanzará en 2026?", fr:"Le Tesla Robotaxi sera-t-il lancé en 2026?", de:"Wird Tesla Robotaxi 2026 starten?", it:"Tesla Robotaxi sarà lanciato nel 2026?", tr:"Tesla Robotaxi 2026'da çıkacak mı?", ar:"هل سيُطلق تيسلا روبوتاكسي في 2026؟" }},
  { id:1104, icon:"🛸", cat:"Tech", country:"World", yes:24, vol:"1.4M", exp:"2026-12-31", trending:false, featured:false, term:"year",
    q:{ en:"Will SpaceX land humans on Moon in 2026?", sq:"A do të ulë SpaceX njerëz në Hënë në 2026?", es:"¿SpaceX aterrizará humanos en la Luna en 2026?", fr:"SpaceX posera-t-il des humains sur la Lune en 2026?", de:"Wird SpaceX 2026 Menschen auf dem Mond landen?", it:"SpaceX porterà uomini sulla Luna nel 2026?", tr:"SpaceX 2026'da Ay'a insan indirecek mi?", ar:"هل ستهبط سبيس إكس ببشر على القمر في 2026؟" }},
  // ENTERTAINMENT
  { id:1201, icon:"🎵", cat:"Entertainment", country:"World", yes:55, vol:"1.8M", exp:"2026-12-31", trending:true, featured:false, term:"year",
    q:{ en:"Will Taylor Swift release new album in 2026?", sq:"A do të lëshojë Taylor Swift album të ri në 2026?", es:"¿Taylor Swift lanzará un nuevo álbum en 2026?", fr:"Taylor Swift sortira-t-elle un nouvel album en 2026?", de:"Wird Taylor Swift 2026 ein neues Album veröffentlichen?", it:"Taylor Swift pubblicherà un nuovo album nel 2026?", tr:"Taylor Swift 2026'da yeni albüm çıkaracak mı?", ar:"هل ستصدر تايلور سويفت ألبومًا جديدًا في 2026؟" }},
  { id:1202, icon:"📺", cat:"Entertainment", country:"World", yes:66, vol:"590K", exp:"2026-12-31", trending:false, featured:false, term:"year",
    q:{ en:"Will Netflix reach 350M subscribers by 2026?", sq:"A do t'i arrijë Netflix 350M abonentë deri në 2026?", es:"¿Netflix llegará a 350M de suscriptores para 2026?", fr:"Netflix atteindra-t-il 350M d'abonnés d'ici 2026?", de:"Wird Netflix bis 2026 350 Mio. Abonnenten erreichen?", it:"Netflix raggiungerà 350M di abbonati entro il 2026?", tr:"Netflix 2026'ya kadar 350M aboneye ulaşacak mı?", ar:"هل ستصل نتفليكس إلى 350 مليون مشترك بحلول 2026؟" }},
  { id:1203, icon:"🎸", cat:"Entertainment", country:"World", yes:54, vol:"780K", exp:"2026-12-31", trending:true, featured:false, term:"year",
    q:{ en:"Will Oasis tour gross $1B+?", sq:"A do të arrijë turneu i Oasis 1 miliard $+?", es:"¿La gira de Oasis recaudará $1B+?", fr:"La tournée d'Oasis rapportera-t-elle 1 Md$+?", de:"Wird die Oasis-Tour 1 Mrd. $+ einspielen?", it:"Il tour degli Oasis incasserà $1B+?", tr:"Oasis turnesi 1 milyar $+ hasılat yapacak mı?", ar:"هل ستحقق جولة أوايسس مليار دولار+؟" }},
  // ECONOMY
  { id:1301, icon:"🥇", cat:"Economy", country:"World", yes:52, vol:"1.4M", exp:"2026-12-31", trending:true, featured:false, term:"year",
    q:{ en:"Will gold exceed $4,000/oz in 2026?", sq:"A do ta tejkalojë ari $4,000/ons në 2026?", es:"¿El oro superará $4,000/oz en 2026?", fr:"L'or dépassera-t-il 4 000 $/oz en 2026?", de:"Wird Gold 2026 $4.000/oz überschreiten?", it:"L'oro supererà $4.000/oz nel 2026?", tr:"Altın 2026'da $4.000/ons'u aşacak mı?", ar:"هل سيتجاوز الذهب 4000 دولار/أونصة في 2026؟" }},
  { id:1302, icon:"🛢️", cat:"Economy", country:"World", yes:38, vol:"1.3M", exp:"2026-12-31", trending:false, featured:false, term:"year",
    q:{ en:"Will Brent oil exceed $100/barrel in 2026?", sq:"A do ta tejkalojë nafta Brent $100/fuçi në 2026?", es:"¿El petróleo Brent superará $100/barril en 2026?", fr:"Le Brent dépassera-t-il 100 $/baril en 2026?", de:"Wird Brent-Öl 2026 $100/Barrel überschreiten?", it:"Il petrolio Brent supererà $100/barile nel 2026?", tr:"Brent petrol 2026'da varil başına $100'ü aşacak mı?", ar:"هل سيتجاوز نفط برنت 100 دولار/برميل في 2026؟" }},
];

const COUNTRIES = ["All","Albania","USA","UK","Germany","France","Italy","Turkey","Spain","China","World"];
const COUNTRY_FLAGS = {All:"🌐",Albania:"🇦🇱",USA:"🇺🇸",UK:"🇬🇧",Germany:"🇩🇪",France:"🇫🇷",Italy:"🇮🇹",Turkey:"🇹🇷",Spain:"🇪🇸",China:"🇨🇳",World:"🌍"};
const CATEGORIES = ["All","Politics","Crypto","Sports","Tech","Economy","Entertainment"];
const CAT_ICONS = {All:"📊",Politics:"🏛️",Crypto:"₿",Sports:"⚽",Tech:"🤖",Economy:"💹",Entertainment:"🎬"};

// FAQs translated
const FAQS = {
  en: [{q:"What is DonyMarket?",a:"DonyMarket is a prediction market platform where you can trade on real-world events. Each market resolves YES or NO based on the outcome."},{q:"How do I sign up?",a:"Tap 'Sign Up' at the top right and create an account with email and password. Your account is saved on this device."},{q:"What is a bet slip?",a:"A bet slip lets you collect multiple predictions before submitting. Add markets, set stakes, then place all bets together."},{q:"How is YES/NO price calculated?",a:"The price reflects market-estimated probability. If YES is 60¢, the market thinks there's a 60% chance the event happens."},{q:"Can I withdraw money?",a:"This is a demo prediction market. Real money trading requires regulatory licenses and is not yet available."},{q:"How are markets resolved?",a:"Markets resolve when the underlying event reaches its outcome. Trusted oracles verify results before payouts."},{q:"What countries are supported?",a:"DonyMarket displays markets globally with a special focus on Albanian politics and economy."}],
  sq: [{q:"Çfarë është DonyMarket?",a:"DonyMarket është një platformë e tregjeve të parashikimit ku mund të tregtoni mbi ngjarje reale. Çdo treg zgjidhet PO ose JO bazuar në rezultat."},{q:"Si të regjistrohem?",a:"Shtypni 'Regjistrohu' lart djathtas dhe krijoni një llogari me email dhe fjalëkalim. Llogaria ruhet në këtë pajisje."},{q:"Çfarë është një biletë baste?",a:"Bileta ju lejon të mblidhni shumë parashikime para se t'i dorëzoni. Shtoni tregje, vendosni shuma, pastaj vendosni të gjitha bastet."},{q:"Si llogaritet çmimi PO/JO?",a:"Çmimi reflekton probabilitetin e parashikuar nga tregu. Nëse PO është 60¢, tregu mendon se ka 60% shanse që ngjarja të ndodhë."},{q:"A mund të tërheq para?",a:"Ky është një treg demo parashikimi. Tregtimi me para reale kërkon licenca dhe nuk është ende i disponueshëm."},{q:"Si zgjidhen tregjet?",a:"Tregjet zgjidhen kur ngjarja arrin përfundimin. Orakuj të besueshëm verifikojnë rezultatet para pagesave."},{q:"Cilat vende mbështeten?",a:"DonyMarket shfaq tregje globale me fokus të veçantë në politikën dhe ekonominë shqiptare."}],
  es: [{q:"¿Qué es DonyMarket?",a:"DonyMarket es una plataforma de mercados de predicción donde puedes operar sobre eventos del mundo real. Cada mercado se resuelve SÍ o NO según el resultado."},{q:"¿Cómo me registro?",a:"Toca 'Registrarse' arriba a la derecha y crea una cuenta con correo y contraseña. Tu cuenta se guarda en este dispositivo."},{q:"¿Qué es un boleto?",a:"El boleto te permite recopilar varias predicciones antes de enviarlas. Añade mercados, establece apuestas, luego envía todo junto."},{q:"¿Cómo se calcula el precio SÍ/NO?",a:"El precio refleja la probabilidad estimada por el mercado. Si SÍ vale 60¢, el mercado piensa que hay 60% de probabilidad."},{q:"¿Puedo retirar dinero?",a:"Esto es un mercado demo. El comercio con dinero real requiere licencias regulatorias y aún no está disponible."},{q:"¿Cómo se resuelven los mercados?",a:"Los mercados se resuelven cuando el evento alcanza su resultado. Oráculos confiables verifican antes del pago."},{q:"¿Qué países se admiten?",a:"DonyMarket muestra mercados globales con énfasis en política y economía de Albania."}],
  fr: [{q:"Qu'est-ce que DonyMarket?",a:"DonyMarket est une plateforme de marchés de prédiction où vous pouvez trader sur des événements réels. Chaque marché se résout OUI ou NON selon le résultat."},{q:"Comment m'inscrire?",a:"Appuyez sur 'S'inscrire' en haut à droite et créez un compte avec email et mot de passe. Votre compte est enregistré sur cet appareil."},{q:"Qu'est-ce qu'un pari?",a:"Le pari vous permet de regrouper plusieurs prédictions avant de soumettre. Ajoutez des marchés, définissez les mises, puis placez tout ensemble."},{q:"Comment le prix OUI/NON est-il calculé?",a:"Le prix reflète la probabilité estimée. Si OUI est à 60¢, le marché estime 60% de chance que l'événement se produise."},{q:"Puis-je retirer de l'argent?",a:"Il s'agit d'un marché démo. Le trading avec argent réel nécessite des licences et n'est pas encore disponible."},{q:"Comment les marchés sont-ils résolus?",a:"Les marchés se résolvent quand l'événement atteint son résultat. Des oracles vérifient avant paiement."},{q:"Quels pays sont pris en charge?",a:"DonyMarket affiche des marchés mondiaux avec un focus sur la politique et l'économie albanaises."}],
  de: [{q:"Was ist DonyMarket?",a:"DonyMarket ist eine Plattform für Vorhersagemärkte, auf der Sie auf reale Ereignisse handeln können. Jeder Markt löst sich basierend auf dem Ergebnis JA oder NEIN auf."},{q:"Wie registriere ich mich?",a:"Tippen Sie oben rechts auf 'Registrieren' und erstellen Sie ein Konto. Das Konto wird auf diesem Gerät gespeichert."},{q:"Was ist ein Wettschein?",a:"Mit dem Wettschein können Sie mehrere Vorhersagen sammeln, bevor Sie sie einreichen. Märkte hinzufügen, Einsätze festlegen, alle Wetten zusammen platzieren."},{q:"Wie wird der JA/NEIN-Preis berechnet?",a:"Der Preis spiegelt die geschätzte Marktwahrscheinlichkeit wider. Wenn JA bei 60¢ liegt, schätzt der Markt 60% Wahrscheinlichkeit."},{q:"Kann ich Geld abheben?",a:"Dies ist ein Demo-Markt. Echtgeldhandel erfordert Lizenzen und ist noch nicht verfügbar."},{q:"Wie werden Märkte aufgelöst?",a:"Märkte lösen sich auf, wenn das Ereignis sein Ergebnis erreicht. Vertrauenswürdige Oracles überprüfen vor der Auszahlung."},{q:"Welche Länder werden unterstützt?",a:"DonyMarket zeigt globale Märkte mit Fokus auf albanische Politik und Wirtschaft."}],
  it: [{q:"Cos'è DonyMarket?",a:"DonyMarket è una piattaforma di mercati di previsione dove puoi scambiare su eventi reali. Ogni mercato si risolve SÌ o NO in base al risultato."},{q:"Come mi registro?",a:"Tocca 'Registrati' in alto a destra e crea un account con email e password. L'account è salvato su questo dispositivo."},{q:"Cos'è una schedina?",a:"La schedina ti permette di raccogliere più previsioni prima di inviarle. Aggiungi mercati, imposta puntate, poi piazza tutte insieme."},{q:"Come si calcola il prezzo SÌ/NO?",a:"Il prezzo riflette la probabilità stimata dal mercato. Se SÌ è 60¢, il mercato pensa che ci sia 60% di possibilità."},{q:"Posso prelevare denaro?",a:"Questo è un mercato demo. Il trading con denaro reale richiede licenze e non è ancora disponibile."},{q:"Come si risolvono i mercati?",a:"I mercati si risolvono quando l'evento raggiunge il suo esito. Oracoli affidabili verificano prima del pagamento."},{q:"Quali paesi sono supportati?",a:"DonyMarket mostra mercati globali con focus speciale sulla politica ed economia albanesi."}],
  tr: [{q:"DonyMarket nedir?",a:"DonyMarket, gerçek dünya olayları üzerine işlem yapabileceğiniz bir tahmin piyasası platformudur. Her piyasa sonuca göre EVET veya HAYIR olarak çözümlenir."},{q:"Nasıl kayıt olurum?",a:"Sağ üstteki 'Kayıt Ol' düğmesine dokunun ve e-posta ile şifre kullanarak hesap oluşturun. Hesabınız bu cihazda kaydedilir."},{q:"Bahis kuponu nedir?",a:"Kupon birden fazla tahmini göndermeden önce toplamanızı sağlar. Piyasaları ekleyin, bahisleri belirleyin, sonra hepsini birlikte oynayın."},{q:"EVET/HAYIR fiyatı nasıl hesaplanır?",a:"Fiyat piyasanın tahmin ettiği olasılığı yansıtır. EVET 60¢ ise, piyasa olayın olma olasılığını %60 olarak tahmin ediyor."},{q:"Para çekebilir miyim?",a:"Bu bir demo piyasadır. Gerçek para ile işlem yapmak için lisanslar gereklidir ve henüz mevcut değildir."},{q:"Piyasalar nasıl çözümlenir?",a:"Piyasalar olay sonucuna ulaştığında çözümlenir. Güvenilir oracle'lar ödeme öncesi sonuçları doğrular."},{q:"Hangi ülkeler destekleniyor?",a:"DonyMarket Arnavut politika ve ekonomisine özel odaklanarak küresel piyasaları gösterir."}],
  ar: [{q:"ما هو DonyMarket؟",a:"DonyMarket هو منصة أسواق توقعات حيث يمكنك التداول على الأحداث الحقيقية. كل سوق يحل بنعم أو لا بناءً على النتيجة."},{q:"كيف أسجل؟",a:"اضغط 'تسجيل' أعلى اليمين وأنشئ حسابًا بالبريد وكلمة المرور. حسابك محفوظ على هذا الجهاز."},{q:"ما هي قسيمة الرهان؟",a:"القسيمة تتيح لك جمع عدة توقعات قبل الإرسال. أضف الأسواق، حدد الرهانات، ثم ضع الكل معًا."},{q:"كيف يحسب سعر نعم/لا؟",a:"السعر يعكس الاحتمال المقدر من السوق. إذا كان نعم 60¢، فالسوق يعتقد أن هناك 60% فرصة."},{q:"هل يمكنني سحب الأموال؟",a:"هذا سوق تجريبي. التداول بأموال حقيقية يتطلب تراخيص وغير متاح حاليًا."},{q:"كيف يتم حل الأسواق؟",a:"تُحل الأسواق عندما يصل الحدث إلى نتيجته. تتحقق المصادر الموثوقة قبل الدفع."},{q:"ما الدول المدعومة؟",a:"يعرض DonyMarket أسواقًا عالمية مع تركيز خاص على السياسة والاقتصاد الألباني."}],
};

const ls = {
  get: (k, def) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : def; } catch { return def; } },
  set: (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
};

// ═══════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════
export default function App() {
  const [page, setPage] = useState("home");
  const [authMode, setAuthMode] = useState("login");
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

  useEffect(() => ls.set("dm_user", user), [user]);
  useEffect(() => ls.set("dm_slip", slip), [slip]);
  useEffect(() => ls.set("dm_positions", positions), [positions]);
  useEffect(() => ls.set("dm_lang", lang), [lang]);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2500); };
  const getQ = (m) => m.q[lang] || m.q.en;

  const addToSlip = (market, side) => {
    if (slip.find(s => s.id === market.id)) { showToast("Already in slip"); return; }
    setSlip([...slip, { ...market, side, stake: "" }]);
    showToast(`+ ${side}`);
  };
  const removeFromSlip = (id) => setSlip(slip.filter(s => s.id !== id));
  const updateStake = (id, stake) => setSlip(slip.map(s => s.id === id ? {...s, stake} : s));
  const submitSlip = () => {
    if (!user) { setPage("auth"); setAuthMode("login"); return; }
    const valid = slip.filter(s => parseFloat(s.stake) > 0);
    if (valid.length === 0) { showToast("Enter stake amounts"); return; }
    const newPositions = valid.map(s => ({...s, placedAt: new Date().toISOString(), currentPrice: s.side==="YES"?s.yes:100-s.yes, shares: (parseFloat(s.stake) / ((s.side==="YES"?s.yes:100-s.yes) / 100)).toFixed(2)}));
    setPositions([...positions, ...newPositions]);
    setSlip([]);
    showToast(`${valid.length} bet${valid.length>1?'s':''} placed!`);
    setPage("portfolio");
  };
  const handleAuth = (email, password, username) => {
    const newUser = { email, username: username || email.split("@")[0], balance: 1000, joinedAt: new Date().toISOString() };
    setUser(newUser);
    showToast(`Welcome, ${newUser.username}!`);
    setPage("home");
  };
  const logout = () => { setUser(null); showToast("Logged out"); setPage("home"); };

  const filteredMarkets = MARKETS.filter(m => {
    if (countryFilter !== "All" && m.country !== countryFilter) return false;
    if (categoryFilter !== "All" && m.cat !== categoryFilter) return false;
    if (timeFilter === "today" && daysFromNow(m.exp) > 1) return false;
    if (timeFilter === "thisWeek" && daysFromNow(m.exp) > 7) return false;
    if (timeFilter === "thisMonth" && daysFromNow(m.exp) > 31) return false;
    if (search && !getQ(m).toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div style={{minHeight:"100vh",background:"#070910",color:"#E8EAF6",fontFamily:"'DM Sans','Segoe UI',system-ui,sans-serif",paddingBottom:80,direction:isRTL?"rtl":"ltr"}}>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0;}
        ::placeholder{color:rgba(200,200,230,0.3);}
        input{font-family:inherit;}
        button:hover{filter:brightness(1.1);}
        button:active{transform:scale(0.97);}
        a{text-decoration:none;color:inherit;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(15px);}to{opacity:1;transform:translateY(0);}}
        @keyframes pulse{0%,100%{opacity:0.6;}50%{opacity:1;}}
        ::-webkit-scrollbar{width:6px;height:6px;}
        ::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.1);border-radius:3px;}
      `}</style>

      <div style={{position:"fixed",top:-200,left:-150,width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle,rgba(29,78,216,0.08) 0%,transparent 70%)",pointerEvents:"none",zIndex:0}}/>
      <div style={{position:"fixed",bottom:-100,right:-100,width:400,height:400,borderRadius:"50%",background:"radial-gradient(circle,rgba(220,38,38,0.06) 0%,transparent 70%)",pointerEvents:"none",zIndex:0}}/>

      <Header user={user} setPage={setPage} setAuthMode={setAuthMode} slip={slip} showLangMenu={showLangMenu} setShowLangMenu={setShowLangMenu} lang={lang} setLang={setLang} t={t}/>

      <div style={{position:"relative",zIndex:1}}>
        {page === "home" && <HomePage t={t} lang={lang} markets={filteredMarkets} getQ={getQ} setSelectedMarket={setSelectedMarket} setPage={setPage} addToSlip={addToSlip} slip={slip} countryFilter={countryFilter} setCountryFilter={setCountryFilter} categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter} timeFilter={timeFilter} setTimeFilter={setTimeFilter}/>}
        {page === "market" && selectedMarket && <MarketDetail t={t} lang={lang} market={selectedMarket} getQ={getQ} setPage={setPage} addToSlip={addToSlip} slip={slip} markets={MARKETS} setSelectedMarket={setSelectedMarket}/>}
        {page === "portfolio" && <PortfolioPage t={t} lang={lang} positions={positions} getQ={getQ} user={user} setPage={setPage} setAuthMode={setAuthMode}/>}
        {page === "slip" && <SlipPage t={t} lang={lang} slip={slip} getQ={getQ} updateStake={updateStake} removeFromSlip={removeFromSlip} submitSlip={submitSlip} user={user} setPage={setPage}/>}
        {page === "profile" && <ProfilePage t={t} user={user} setPage={setPage} setAuthMode={setAuthMode} logout={logout} lang={lang} setLang={setLang} positions={positions}/>}
        {page === "auth" && <AuthPage t={t} authMode={authMode} setAuthMode={setAuthMode} handleAuth={handleAuth} setPage={setPage}/>}
        {page === "help" && <HelpPage t={t} lang={lang} setPage={setPage}/>}
        {page === "search" && <SearchPage t={t} lang={lang} search={search} setSearch={setSearch} markets={MARKETS} getQ={getQ} setSelectedMarket={setSelectedMarket} setPage={setPage}/>}
      </div>

      <BottomNav page={page} setPage={setPage} t={t} slipCount={slip.length}/>

      {toast && <div style={{position:"fixed",bottom:90,left:"50%",transform:"translateX(-50%)",background:"rgba(29,78,216,0.95)",backdropFilter:"blur(12px)",color:"#fff",padding:"12px 24px",borderRadius:999,fontSize:14,fontWeight:600,zIndex:9999,boxShadow:"0 10px 30px rgba(0,0,0,0.5)",animation:"fadeUp 0.3s ease"}}>{toast}</div>}
    </div>
  );
}

function Header({ user, setPage, setAuthMode, slip, showLangMenu, setShowLangMenu, lang, setLang, t }) {
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
            <button onClick={()=>setPage("profile")} style={{padding:"7px 14px",background:"linear-gradient(135deg,#1d4ed8,#ef4444)",border:"none",borderRadius:8,color:"#fff",fontWeight:700,fontSize:13,cursor:"pointer",fontFamily:"inherit"}}>👤 {user.username}</button>
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
            <button key={c} onClick={()=>setCountryFilter(c)} style={{flexShrink:0,padding:"7px 12px",background:countryFilter===c?"rgba(220,38,38,0.18)":"rgba(255,255,255,0.04)",border:countryFilter===c?"1px solid rgba(220,38,38,0.4)":"1px solid rgba(255,255,255,0.07)",borderRadius:999,color:countryFilter===c?"#fca5a5":"rgba(232,234,246,0.55)",fontSize:13,fontWeight:countryFilter===c?700:500,cursor:"pointer",fontFamily:"inherit",whiteSpace:"nowrap"}}>
              {COUNTRY_FLAGS[c]} {COUNTRY_NAMES[lang][c]}
            </button>
          ))}
        </div>
      </section>

      <section style={{maxWidth:1280,margin:"0 auto",padding:"0 16px 20px"}}>
        <div style={{display:"flex",gap:6,overflowX:"auto",paddingBottom:4}}>
          {CATEGORIES.map(c=>(
            <button key={c} onClick={()=>setCategoryFilter(c)} style={{flexShrink:0,padding:"7px 12px",background:categoryFilter===c?"rgba(29,78,216,0.18)":"rgba(255,255,255,0.04)",border:categoryFilter===c?"1px solid rgba(29,78,216,0.4)":"1px solid rgba(255,255,255,0.07)",borderRadius:999,color:categoryFilter===c?"#93c5fd":"rgba(232,234,246,0.55)",fontSize:13,fontWeight:categoryFilter===c?700:500,cursor:"pointer",fontFamily:"inherit",whiteSpace:"nowrap"}}>
              {CAT_ICONS[c]} {CAT_NAMES[lang][c]}
            </button>
          ))}
        </div>
      </section>

      <section style={{maxWidth:1280,margin:"0 auto",padding:"0 16px 80px"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
          <h2 style={{fontFamily:"Georgia,serif",fontSize:20,fontWeight:700}}>📊 {t.markets}</h2>
          <span style={{fontSize:12,color:"rgba(232,234,246,0.4)"}}>{markets.length} {t.results}</span>
        </div>
        {markets.length === 0 ? (
          <div style={{padding:60,textAlign:"center",color:"rgba(232,234,246,0.3)",fontSize:14}}>No markets match your filters</div>
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
      <div onClick={onView} style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
        <span style={{fontSize:20}}>{market.icon}</span>
        <span style={{fontSize:10,fontWeight:800,textTransform:"uppercase",letterSpacing:0.8,color:"#93c5fd"}}>{COUNTRY_FLAGS[market.country]} {COUNTRY_NAMES[lang][market.country]}</span>
      </div>
      <div onClick={onView} style={{fontFamily:"Georgia,serif",fontSize:14,fontWeight:600,lineHeight:1.45,color:"#f1f5f9",marginBottom:12,minHeight:42}}>{getQ(market)}</div>
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
            {market.trending && <span style={{fontSize:11,color:"#FACC15"}}>🔥 {t.trending}</span>}
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
        {inSlip && <div style={{marginTop:10,padding:10,background:"rgba(212,168,67,0.1)",border:"1px solid rgba(212,168,67,0.3)",borderRadius:8,color:"#FACC15",fontSize:12,textAlign:"center"}}>✓ {t.addToSlip}</div>}
      </div>

      <div style={{background:"rgba(255,255,255,0.025)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:14,padding:18,marginBottom:18}}>
        <div style={{fontSize:11,fontWeight:800,color:"#D4A843",letterSpacing:1.2,textTransform:"uppercase",marginBottom:10}}>{t.aboutMarket}</div>
        <p style={{fontSize:14,lineHeight:1.6,color:"rgba(232,234,246,0.7)"}}>{t.aboutDesc} {market.exp} {t.andTradingVol} ${market.vol}.</p>
      </div>

      {related.length > 0 && (
        <div>
          <h3 style={{fontFamily:"Georgia,serif",fontSize:18,fontWeight:700,marginBottom:14}}>{t.relatedMarkets}</h3>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:12}}>
            {related.map(m=>(
              <MarketCard key={m.id} market={m} t={t} lang={lang} getQ={getQ} onView={()=>{setSelectedMarket(m);window.scrollTo(0,0);}} onAdd={addToSlip} inSlip={slip.some(s=>s.id===m.id)}/>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function SlipPage({ t, lang, slip, getQ, updateStake, removeFromSlip, submitSlip, user, setPage }) {
  const total = slip.reduce((a,s)=>a+(parseFloat(s.stake)||0),0);
  const potential = slip.reduce((a,s)=>{const stake=parseFloat(s.stake)||0;const price=s.side==="YES"?s.yes:100-s.yes;return a+(stake/(price/100));},0);

  return (
    <div style={{maxWidth:700,margin:"0 auto",padding:"20px 16px 100px"}}>
      <h1 style={{fontFamily:"Georgia,serif",fontSize:24,fontWeight:800,marginBottom:20}}>📝 {t.betslip}</h1>
      {slip.length === 0 ? (
        <div style={{padding:60,textAlign:"center",background:"rgba(255,255,255,0.03)",borderRadius:14,color:"rgba(232,234,246,0.4)"}}>
          <div style={{fontSize:40,marginBottom:12}}>📭</div>
          <div style={{fontSize:14}}>{t.emptySlip}</div>
          <button onClick={()=>setPage("home")} style={{marginTop:18,padding:"10px 20px",background:"linear-gradient(135deg,#1d4ed8,#ef4444)",border:"none",borderRadius:10,color:"#fff",fontWeight:700,fontSize:13,cursor:"pointer",fontFamily:"inherit"}}>{t.browseMarkets}</button>
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
          <button onClick={submitSlip} style={{width:"100%",padding:16,background:"linear-gradient(135deg,#1d4ed8,#ef4444)",border:"none",borderRadius:12,color:"#fff",fontWeight:800,fontSize:15,cursor:"pointer",fontFamily:"inherit",letterSpacing:0.3}}>{user ? `${t.submitSlip} (${slip.length})` : `${t.login}`}</button>
        </>
      )}
    </div>
  );
}

function PortfolioPage({ t, lang, positions, getQ, user, setPage, setAuthMode }) {
  if (!user) {
    return (
      <div style={{maxWidth:500,margin:"0 auto",padding:"60px 16px",textAlign:"center"}}>
        <div style={{fontSize:48,marginBottom:14}}>🔒</div>
        <h2 style={{fontFamily:"Georgia,serif",fontSize:22,marginBottom:10}}>{t.login}</h2>
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
          {positions.map((p,i)=>(
            <div key={i} style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:12,padding:14}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"start",gap:10,marginBottom:8}}>
                <div style={{flex:1}}>
                  <div style={{fontSize:11,color:"rgba(200,200,230,0.5)",marginBottom:4}}>{p.icon} {CAT_NAMES[lang][p.cat]} · {COUNTRY_FLAGS[p.country]} {COUNTRY_NAMES[lang][p.country]}</div>
                  <div style={{fontSize:13,fontWeight:600,fontFamily:"Georgia,serif",lineHeight:1.4}}>{getQ(p)}</div>
                </div>
                <span style={{padding:"4px 10px",borderRadius:6,fontSize:11,fontWeight:800,background:p.side==="YES"?"rgba(34,197,94,0.18)":"rgba(220,38,38,0.18)",color:p.side==="YES"?"#22c55e":"#ef4444"}}>{p.side==="YES"?t.yes:t.no}</span>
              </div>
              <div style={{display:"flex",gap:14,fontSize:11,color:"rgba(200,200,230,0.5)"}}>
                <span>{t.stake}: <b style={{color:"#E8EAF6"}}>${parseFloat(p.stake).toFixed(2)}</b></span>
                <span>{t.shares}: <b style={{color:"#E8EAF6"}}>{p.shares}</b></span>
                <span>{t.price}: <b style={{color:"#E8EAF6"}}>{p.currentPrice}¢</b></span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

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
        <h1 style={{fontFamily:"Georgia,serif",fontSize:26,fontWeight:800,marginBottom:6,textAlign:"center"}}>{authMode==="login" ? t.welcome : t.signup}</h1>
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
        <button onClick={submit} style={{width:"100%",padding:14,background:"linear-gradient(135deg,#1d4ed8,#ef4444)",border:"none",borderRadius:12,color:"#fff",fontWeight:800,fontSize:14,cursor:"pointer",fontFamily:"inherit",marginBottom:14}}>{authMode==="login" ? t.login : t.signup}</button>
        <div style={{textAlign:"center",fontSize:13,color:"rgba(232,234,246,0.5)"}}>
          {authMode==="login" ? t.noAccount : t.hasAccount}{" "}
          <button onClick={()=>{setAuthMode(authMode==="login"?"signup":"login");setErr("");}} style={{background:"none",border:"none",color:"#FACC15",fontWeight:700,cursor:"pointer",fontFamily:"inherit",fontSize:13}}>{authMode==="login" ? t.signup : t.login}</button>
        </div>
      </div>
    </div>
  );
}

function ProfilePage({ t, user, setPage, setAuthMode, logout, lang, setLang, positions }) {
  if (!user) {
    return (
      <div style={{maxWidth:500,margin:"0 auto",padding:"60px 16px",textAlign:"center"}}>
        <div style={{fontSize:48,marginBottom:14}}>👤</div>
        <h2 style={{fontFamily:"Georgia,serif",fontSize:22,marginBottom:10}}>{t.login}</h2>
        <button onClick={()=>{setAuthMode("login");setPage("auth");}} style={{padding:"12px 28px",background:"linear-gradient(135deg,#1d4ed8,#ef4444)",border:"none",borderRadius:10,color:"#fff",fontWeight:700,fontSize:14,cursor:"pointer",fontFamily:"inherit"}}>{t.login}</button>
      </div>
    );
  }
  return (
    <div style={{maxWidth:600,margin:"0 auto",padding:"20px 16px 100px"}}>
      <div style={{background:"linear-gradient(135deg,rgba(212,168,67,0.15),rgba(239,68,68,0.1))",border:"1px solid rgba(212,168,67,0.25)",borderRadius:18,padding:24,marginBottom:20,textAlign:"center"}}>
        <div style={{width:72,height:72,background:"linear-gradient(135deg,#1d4ed8,#ef4444)",borderRadius:"50%",margin:"0 auto 14px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:30,fontFamily:"Georgia,serif",fontWeight:800,color:"#fff"}}>{user.username.charAt(0).toUpperCase()}</div>
        <h2 style={{fontFamily:"Georgia,serif",fontSize:20,fontWeight:800,marginBottom:4}}>{user.username}</h2>
        <div style={{fontSize:13,color:"rgba(232,234,246,0.5)",marginBottom:14}}>{user.email}</div>
        <div style={{display:"inline-block",padding:"6px 14px",background:"rgba(34,197,94,0.15)",border:"1px solid rgba(34,197,94,0.3)",borderRadius:999,fontSize:13,fontWeight:700,color:"#22c55e"}}>💰 {t.balance}: ${user.balance.toFixed(2)}</div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:24}}>
        <div style={{background:"rgba(255,255,255,0.04)",borderRadius:10,padding:12,textAlign:"center"}}>
          <div style={{fontSize:20,fontWeight:800,fontFamily:"Georgia,serif"}}>{positions.length}</div>
          <div style={{fontSize:10,color:"rgba(200,200,230,0.5)",textTransform:"uppercase",letterSpacing:1}}>{t.bets}</div>
        </div>
        <div style={{background:"rgba(255,255,255,0.04)",borderRadius:10,padding:12,textAlign:"center"}}>
          <div style={{fontSize:20,fontWeight:800,fontFamily:"Georgia,serif",color:"#22c55e"}}>0</div>
          <div style={{fontSize:10,color:"rgba(200,200,230,0.5)",textTransform:"uppercase",letterSpacing:1}}>{t.won}</div>
        </div>
        <div style={{background:"rgba(255,255,255,0.04)",borderRadius:10,padding:12,textAlign:"center"}}>
          <div style={{fontSize:20,fontWeight:800,fontFamily:"Georgia,serif",color:"#FACC15"}}>$0</div>
          <div style={{fontSize:10,color:"rgba(200,200,230,0.5)",textTransform:"uppercase",letterSpacing:1}}>{t.profit}</div>
        </div>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:20}}>
        <SettingsItem icon="💼" label={t.portfolio} onClick={()=>setPage("portfolio")}/>
        <SettingsItem icon="📝" label={t.betslip} onClick={()=>setPage("slip")}/>
        <SettingsItem icon="❓" label={t.help} onClick={()=>setPage("help")}/>
        <div style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:12,padding:14}}>
          <div style={{fontSize:12,fontWeight:700,color:"rgba(200,200,230,0.6)",marginBottom:10}}>🌐 {t.language}</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
            {LANGS.map(l=>(
              <button key={l.code} onClick={()=>setLang(l.code)} style={{padding:"6px 10px",background:lang===l.code?"rgba(212,168,67,0.2)":"rgba(255,255,255,0.04)",border:lang===l.code?"1px solid rgba(212,168,67,0.4)":"1px solid rgba(255,255,255,0.07)",borderRadius:8,color:lang===l.code?"#FACC15":"rgba(232,234,246,0.7)",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>{l.flag} {l.name}</button>
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

function HelpPage({ t, lang, setPage }) {
  const [openIdx, setOpenIdx] = useState(null);
  const faqs = FAQS[lang] || FAQS.en;
  return (
    <div style={{maxWidth:700,margin:"0 auto",padding:"20px 16px 100px"}}>
      <button onClick={()=>setPage("home")} style={{display:"flex",alignItems:"center",gap:6,padding:"7px 12px",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:8,color:"#E8EAF6",fontSize:13,cursor:"pointer",fontFamily:"inherit",marginBottom:20}}>← Back</button>
      <h1 style={{fontFamily:"Georgia,serif",fontSize:26,fontWeight:800,marginBottom:8}}>❓ {t.help}</h1>
      <p style={{fontSize:14,color:"rgba(232,234,246,0.55)",marginBottom:24}}>{t.faqs}</p>
      <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:24}}>
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
      <div style={{background:"linear-gradient(135deg,rgba(29,78,216,0.1),rgba(239,68,68,0.08))",border:"1px solid rgba(29,78,216,0.2)",borderRadius:14,padding:18,textAlign:"center"}}>
        <div style={{fontSize:24,marginBottom:8}}>💬</div>
        <div style={{fontWeight:700,fontFamily:"Georgia,serif",marginBottom:4}}>{t.contactSupport}</div>
        <div style={{fontSize:13,color:"rgba(232,234,246,0.55)",marginBottom:12}}>support@donymarket.com</div>
        <button onClick={()=>window.location.href="mailto:support@donymarket.com"} style={{padding:"10px 20px",background:"rgba(29,78,216,0.2)",border:"1px solid rgba(29,78,216,0.4)",borderRadius:8,color:"#93c5fd",fontWeight:700,fontSize:13,cursor:"pointer",fontFamily:"inherit"}}>📧 {t.emailSupport}</button>
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
        <div style={{padding:40,textAlign:"center",color:"rgba(232,234,246,0.4)",fontSize:14}}>
          <div style={{fontSize:36,marginBottom:10}}>🔎</div>
          {t.searchPlaceholder}
        </div>
      ) : results.length === 0 ? (
        <div style={{padding:40,textAlign:"center",color:"rgba(232,234,246,0.4)",fontSize:14}}>No results for "{search}"</div>
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

