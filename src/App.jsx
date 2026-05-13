import { useState, useEffect } from "react";

const ALL_MARKETS = [
  // ───── 🇦🇱 ALBANIA ─────
  { id:101, category:"Albania", icon:"🇪🇺", title:"Will Albania complete EU accession negotiations by end of 2027?", yesProb:58, volume:"1.2M", expiry:"Dec 31, 2027", trending:true, featured:true, desc:"EU Commissioner Marta Kos calls it 'on track' but warns on judiciary benchmarks." },
  { id:102, category:"Albania", icon:"🛡️", title:"Will Albania successfully host the 2027 NATO Summit in Tirana?", yesProb:89, volume:"430K", expiry:"Oct 31, 2027", trending:true, featured:true, desc:"Confirmed at The Hague Summit. Task force established, infrastructure assessed." },
  { id:103, category:"Albania", icon:"⚖️", title:"Will SPAK secure a conviction against Deputy PM Belinda Balluku?", yesProb:42, volume:"680K", expiry:"Dec 31, 2026", trending:true, featured:false, desc:"SPAK filed for arrest in 2025. Parliament voted on immunity. Court proceedings underway." },
  { id:104, category:"Albania", icon:"🏛️", title:"Will Tirana Mayor Erion Veliaj be found guilty of corruption?", yesProb:55, volume:"920K", expiry:"Jun 30, 2027", trending:true, featured:false, desc:"Detained on corruption & money laundering. Signaled potential ECHR appeal." },
  { id:105, category:"Albania", icon:"🗳️", title:"Will Sali Berisha step down as PD leader before end of 2026?", yesProb:22, volume:"310K", expiry:"Dec 31, 2026", trending:false, featured:false },
  { id:106, category:"Albania", icon:"🏖️", title:"Will Albania's tourism exceed 13 million visitors in 2026?", yesProb:71, volume:"200K", expiry:"Dec 31, 2026", trending:false, featured:false },
  { id:107, category:"Albania", icon:"🌟", title:"Will Albania join the EU before 2031?", yesProb:47, volume:"550K", expiry:"Jan 1, 2031", trending:false, featured:false },
  { id:108, category:"Albania", icon:"🎯", title:"Will Edi Rama win a potential 5th term as PM?", yesProb:39, volume:"470K", expiry:"Dec 31, 2029", trending:false, featured:false },
  { id:109, category:"Albania", icon:"💸", title:"Will Albania's GDP growth exceed 4% in 2026?", yesProb:62, volume:"140K", expiry:"Dec 31, 2026", trending:false, featured:false },
  { id:110, category:"Albania", icon:"🏗️", title:"Will Tirana be ranked a top-10 emerging tourism city by 2027?", yesProb:53, volume:"95K", expiry:"Dec 31, 2027", trending:false, featured:false },
  { id:111, category:"Albania", icon:"⚡", title:"Will Albania complete its Skavica hydropower dam by 2030?", yesProb:44, volume:"80K", expiry:"Dec 31, 2030", trending:false, featured:false },
  { id:112, category:"Albania", icon:"🤝", title:"Will Albania and Kosovo sign a full economic union agreement by 2028?", yesProb:31, volume:"220K", expiry:"Dec 31, 2028", trending:false, featured:false },
  { id:113, category:"Albania", icon:"📉", title:"Will Albania's emigration rate decline in 2026 vs 2025?", yesProb:35, volume:"110K", expiry:"Dec 31, 2026", trending:false, featured:false },
  { id:114, category:"Albania", icon:"🏟️", title:"Will Albania qualify for the 2026 FIFA World Cup?", yesProb:18, volume:"340K", expiry:"Jun 1, 2026", trending:true, featured:false },
  // ───── 🏛️ POLITICS ─────
  { id:1, category:"Politics", icon:"🏛️", title:"Will the US Federal Reserve cut rates before September 2026?", yesProb:67, volume:"2.4M", expiry:"Sep 1, 2026", trending:true, featured:true },
  { id:5, category:"Politics", icon:"🌍", title:"Will there be a G20 summit addressing AI regulation in 2026?", yesProb:83, volume:"340K", expiry:"Dec 31, 2026", trending:false, featured:false },
  { id:11, category:"Politics", icon:"🕊️", title:"Will there be a formal Ukraine–Russia peace agreement by 2027?", yesProb:29, volume:"3.8M", expiry:"Jan 1, 2027", trending:true, featured:false },
  { id:12, category:"Politics", icon:"🇺🇳", title:"Will the UN Security Council pass a binding AI governance resolution?", yesProb:31, volume:"190K", expiry:"Dec 31, 2026", trending:false, featured:false },
  { id:30, category:"Politics", icon:"🇩🇪", title:"Will Germany's new government last a full term until 2029?", yesProb:58, volume:"620K", expiry:"Dec 31, 2029", trending:false, featured:false },
  { id:31, category:"Politics", icon:"🇫🇷", title:"Will Macron's approval rating exceed 40% by end of 2026?", yesProb:24, volume:"280K", expiry:"Dec 31, 2026", trending:false, featured:false },
  { id:32, category:"Politics", icon:"🇬🇧", title:"Will UK rejoin the EU single market by 2030?", yesProb:17, volume:"950K", expiry:"Jan 1, 2030", trending:false, featured:false },
  { id:33, category:"Politics", icon:"🇹🇷", title:"Will Turkey's EU accession talks formally resume in 2026?", yesProb:12, volume:"310K", expiry:"Dec 31, 2026", trending:false, featured:false },
  { id:34, category:"Politics", icon:"🇮🇱", title:"Will there be a lasting ceasefire in Gaza by end of 2026?", yesProb:48, volume:"4.1M", expiry:"Dec 31, 2026", trending:true, featured:false },
  { id:35, category:"Politics", icon:"🇨🇳", title:"Will China hold military exercises near Taiwan in H2 2026?", yesProb:61, volume:"1.7M", expiry:"Dec 31, 2026", trending:false, featured:false },
  { id:36, category:"Politics", icon:"🇮🇳", title:"Will India surpass China as world's largest economy by 2035?", yesProb:22, volume:"890K", expiry:"Jan 1, 2035", trending:false, featured:false },
  { id:37, category:"Politics", icon:"🌐", title:"Will a new G7 member be admitted before 2030?", yesProb:19, volume:"210K", expiry:"Jan 1, 2030", trending:false, featured:false },
  // ───── ₿ CRYPTO ─────
  { id:2, category:"Crypto", icon:"₿", title:"Will Bitcoin exceed $150,000 by end of 2026?", yesProb:44, volume:"5.1M", expiry:"Dec 31, 2026", trending:true, featured:true },
  { id:6, category:"Crypto", icon:"⟠", title:"Will Ethereum flip Bitcoin in market cap by 2027?", yesProb:18, volume:"3.2M", expiry:"Jan 1, 2027", trending:true, featured:false },
  { id:13, category:"Crypto", icon:"🔗", title:"Will a spot Ethereum ETF see $10B+ inflows by end of 2026?", yesProb:52, volume:"1.6M", expiry:"Dec 31, 2026", trending:false, featured:false },
  { id:14, category:"Crypto", icon:"💎", title:"Will Solana reach $500 before year end?", yesProb:37, volume:"2.1M", expiry:"Dec 31, 2026", trending:true, featured:false },
  { id:40, category:"Crypto", icon:"🏦", title:"Will a major central bank issue a CBDC by end of 2026?", yesProb:71, volume:"880K", expiry:"Dec 31, 2026", trending:false, featured:false },
  { id:41, category:"Crypto", icon:"📉", title:"Will crypto total market cap drop below $1T in 2026?", yesProb:21, volume:"2.3M", expiry:"Dec 31, 2026", trending:false, featured:false },
  { id:42, category:"Crypto", icon:"⚡", title:"Will XRP be classified as a non-security by US regulators?", yesProb:64, volume:"1.4M", expiry:"Dec 31, 2026", trending:true, featured:false },
  { id:43, category:"Crypto", icon:"🐕", title:"Will Dogecoin reach $1 in 2026?", yesProb:28, volume:"1.9M", expiry:"Dec 31, 2026", trending:false, featured:false },
  { id:44, category:"Crypto", icon:"🌕", title:"Will Bitcoin hit $200,000 by end of 2027?", yesProb:38, volume:"3.7M", expiry:"Dec 31, 2027", trending:false, featured:false },
  { id:45, category:"Crypto", icon:"🔐", title:"Will a top-10 crypto exchange face a major hack in 2026?", yesProb:33, volume:"760K", expiry:"Dec 31, 2026", trending:false, featured:false },
  // ───── ⚽ SPORTS ─────
  { id:3, category:"Sports", icon:"⚽", title:"Will Real Madrid win the 2026 Champions League?", yesProb:28, volume:"1.8M", expiry:"Jun 30, 2026", trending:false, featured:true },
  { id:8, category:"Sports", icon:"🏆", title:"Will the 2026 FIFA World Cup final be held in North America?", yesProb:91, volume:"600K", expiry:"Jul 19, 2026", trending:false, featured:false },
  { id:15, category:"Sports", icon:"🎾", title:"Will Jannik Sinner win Wimbledon 2026?", yesProb:33, volume:"870K", expiry:"Jul 13, 2026", trending:true, featured:false },
  { id:16, category:"Sports", icon:"🏀", title:"Will the Golden State Warriors make the 2026 NBA Playoffs?", yesProb:44, volume:"510K", expiry:"Apr 20, 2026", trending:false, featured:false },
  { id:50, category:"Sports", icon:"🥊", title:"Will Tyson Fury fight again in 2026?", yesProb:57, volume:"720K", expiry:"Dec 31, 2026", trending:false, featured:false },
  { id:51, category:"Sports", icon:"🏎️", title:"Will Max Verstappen win a 5th F1 World Championship in 2026?", yesProb:41, volume:"1.3M", expiry:"Nov 30, 2026", trending:true, featured:false },
  { id:52, category:"Sports", icon:"🎿", title:"Will the USA top the 2026 Winter Olympics medal table?", yesProb:36, volume:"480K", expiry:"Feb 28, 2026", trending:false, featured:false },
  { id:53, category:"Sports", icon:"⛳", title:"Will Rory McIlroy win a major in 2026?", yesProb:38, volume:"390K", expiry:"Dec 31, 2026", trending:false, featured:false },
  { id:55, category:"Sports", icon:"🏉", title:"Will South Africa win the 2027 Rugby World Cup?", yesProb:32, volume:"560K", expiry:"Oct 31, 2027", trending:false, featured:false },
  { id:56, category:"Sports", icon:"⚾", title:"Will the New York Yankees win the 2026 World Series?", yesProb:14, volume:"820K", expiry:"Oct 31, 2026", trending:false, featured:false },
  { id:57, category:"Sports", icon:"🥅", title:"Will Kylian Mbappe top-score at the 2026 World Cup?", yesProb:22, volume:"1.1M", expiry:"Jul 19, 2026", trending:true, featured:false },
  // ───── 🤖 TECH ─────
  { id:4, category:"Tech", icon:"🤖", title:"Will OpenAI release GPT-5 to the public before Q3 2026?", yesProb:72, volume:"890K", expiry:"Jul 1, 2026", trending:true, featured:false },
  { id:7, category:"Tech", icon:"🥽", title:"Will Apple release AR glasses to consumers in 2026?", yesProb:35, volume:"1.1M", expiry:"Dec 31, 2026", trending:false, featured:false },
  { id:17, category:"Tech", icon:"🚗", title:"Will Tesla's Robotaxi launch commercially in the US in 2026?", yesProb:48, volume:"2.2M", expiry:"Dec 31, 2026", trending:true, featured:false },
  { id:18, category:"Tech", icon:"🛸", title:"Will SpaceX land humans on the Moon before end of 2026?", yesProb:24, volume:"1.4M", expiry:"Dec 31, 2026", trending:false, featured:false },
  { id:60, category:"Tech", icon:"🧬", title:"Will a human receive an AI-designed drug treatment in a clinical trial?", yesProb:68, volume:"540K", expiry:"Dec 31, 2026", trending:false, featured:false },
  { id:61, category:"Tech", icon:"💻", title:"Will Microsoft's AI revenue exceed $50B in FY2026?", yesProb:59, volume:"1.1M", expiry:"Jun 30, 2026", trending:false, featured:false },
  { id:62, category:"Tech", icon:"🔋", title:"Will a solid-state EV battery enter mass production in 2026?", yesProb:31, volume:"670K", expiry:"Dec 31, 2026", trending:false, featured:false },
  { id:63, category:"Tech", icon:"🌐", title:"Will Meta's Llama surpass OpenAI in benchmark performance?", yesProb:44, volume:"830K", expiry:"Dec 31, 2026", trending:true, featured:false },
  { id:64, category:"Tech", icon:"🛰️", title:"Will Starlink reach 10 million subscribers by end of 2026?", yesProb:66, volume:"490K", expiry:"Dec 31, 2026", trending:false, featured:false },
  { id:65, category:"Tech", icon:"⚛️", title:"Will a quantum computer break RSA-2048 encryption by 2030?", yesProb:14, volume:"720K", expiry:"Jan 1, 2030", trending:false, featured:false },
  // ───── 💹 ECONOMY ─────
  { id:9, category:"Economy", icon:"📈", title:"Will US inflation drop below 2% by end of 2026?", yesProb:54, volume:"780K", expiry:"Dec 31, 2026", trending:true, featured:false },
  { id:10, category:"Economy", icon:"💹", title:"Will the S&P 500 hit 7,000 before the year ends?", yesProb:61, volume:"2.9M", expiry:"Dec 31, 2026", trending:false, featured:false },
  { id:19, category:"Economy", icon:"🛢️", title:"Will Brent crude oil exceed $100/barrel in 2026?", yesProb:38, volume:"1.3M", expiry:"Dec 31, 2026", trending:false, featured:false },
  { id:20, category:"Economy", icon:"🏦", title:"Will the ECB cut rates below 2% in 2026?", yesProb:45, volume:"660K", expiry:"Dec 31, 2026", trending:false, featured:false },
  { id:70, category:"Economy", icon:"🇯🇵", title:"Will Japan's Nikkei 225 hit 50,000 before 2027?", yesProb:43, volume:"870K", expiry:"Dec 31, 2026", trending:false, featured:false },
  { id:71, category:"Economy", icon:"🥇", title:"Will gold reach $4,000/oz in 2026?", yesProb:52, volume:"1.4M", expiry:"Dec 31, 2026", trending:true, featured:false },
  { id:72, category:"Economy", icon:"🏠", title:"Will US housing prices fall more than 5% in 2026?", yesProb:27, volume:"960K", expiry:"Dec 31, 2026", trending:false, featured:false },
  { id:73, category:"Economy", icon:"📊", title:"Will the US enter a technical recession in 2026?", yesProb:33, volume:"2.1M", expiry:"Dec 31, 2026", trending:true, featured:false },
  { id:74, category:"Economy", icon:"🇨🇳", title:"Will China's GDP growth exceed 5% in 2026?", yesProb:48, volume:"1.1M", expiry:"Dec 31, 2026", trending:false, featured:false },
  // ───── 🌍 CLIMATE ─────
  { id:21, category:"Climate", icon:"🌡️", title:"Will 2026 be ranked among the top 3 hottest years on record?", yesProb:79, volume:"450K", expiry:"Jan 31, 2027", trending:false, featured:false },
  { id:22, category:"Climate", icon:"⚡", title:"Will global solar capacity additions exceed 700GW in 2026?", yesProb:63, volume:"320K", expiry:"Dec 31, 2026", trending:false, featured:false },
  { id:23, category:"Climate", icon:"🌊", title:"Will a major G7 nation commit to coal phase-out before 2035?", yesProb:41, volume:"280K", expiry:"Dec 31, 2026", trending:false, featured:false },
  { id:80, category:"Climate", icon:"🧊", title:"Will Arctic summer sea ice hit a new record low in 2026?", yesProb:55, volume:"210K", expiry:"Sep 30, 2026", trending:false, featured:false },
  { id:81, category:"Climate", icon:"🌿", title:"Will global EV sales exceed 25 million units in 2026?", yesProb:69, volume:"540K", expiry:"Dec 31, 2026", trending:false, featured:false },
  { id:82, category:"Climate", icon:"💨", title:"Will the US fully rejoin the Paris Agreement climate targets?", yesProb:38, volume:"390K", expiry:"Dec 31, 2026", trending:false, featured:false },
  { id:84, category:"Climate", icon:"🐋", title:"Will a new global ocean protection treaty be ratified in 2026?", yesProb:44, volume:"170K", expiry:"Dec 31, 2026", trending:false, featured:false },
  // ───── 🎬 ENTERTAINMENT ─────
  { id:24, category:"Entertainment", icon:"🎬", title:"Will an AI-generated film win an Oscar by 2027?", yesProb:19, volume:"730K", expiry:"Mar 1, 2027", trending:true, featured:false },
  { id:25, category:"Entertainment", icon:"🎵", title:"Will Taylor Swift release a new album in 2026?", yesProb:55, volume:"1.8M", expiry:"Dec 31, 2026", trending:true, featured:false },
  { id:26, category:"Entertainment", icon:"📺", title:"Will Netflix surpass 350M subscribers by end of 2026?", yesProb:66, volume:"590K", expiry:"Dec 31, 2026", trending:false, featured:false },
  { id:90, category:"Entertainment", icon:"🎮", title:"Will GTA VI sell 30M copies in its first month?", yesProb:71, volume:"2.4M", expiry:"Dec 31, 2026", trending:true, featured:false },
  { id:91, category:"Entertainment", icon:"🦸", title:"Will a Marvel film gross $1B+ at box office in 2026?", yesProb:58, volume:"980K", expiry:"Dec 31, 2026", trending:false, featured:false },
  { id:92, category:"Entertainment", icon:"🎤", title:"Will Kendrick Lamar headline Coachella 2027?", yesProb:37, volume:"560K", expiry:"Apr 30, 2027", trending:false, featured:false },
  { id:94, category:"Entertainment", icon:"🎲", title:"Will the Nintendo Switch 2 sell 10M units by end of 2026?", yesProb:62, volume:"870K", expiry:"Dec 31, 2026", trending:true, featured:false },
  { id:96, category:"Entertainment", icon:"🎸", title:"Will Oasis gross $1B+ on their reunion world tour?", yesProb:54, volume:"780K", expiry:"Dec 31, 2026", trending:true, featured:false },
  // ───── 🏥 HEALTH ─────
  { id:200, category:"Health", icon:"💉", title:"Will a new mRNA cancer vaccine receive FDA approval in 2026?", yesProb:46, volume:"670K", expiry:"Dec 31, 2026", trending:true, featured:false },
  { id:201, category:"Health", icon:"🧬", title:"Will a CRISPR gene therapy cure a major genetic disease by 2027?", yesProb:53, volume:"490K", expiry:"Dec 31, 2027", trending:false, featured:false },
  { id:202, category:"Health", icon:"🦠", title:"Will there be a new WHO-declared pandemic by end of 2027?", yesProb:21, volume:"1.3M", expiry:"Dec 31, 2027", trending:false, featured:false },
  { id:203, category:"Health", icon:"🧠", title:"Will Alzheimer's disease have an approved cure by 2030?", yesProb:29, volume:"820K", expiry:"Jan 1, 2030", trending:false, featured:false },
  { id:204, category:"Health", icon:"⚖️", title:"Will a major country ban ultra-processed foods in schools by 2027?", yesProb:48, volume:"220K", expiry:"Dec 31, 2027", trending:false, featured:false },
  { id:205, category:"Health", icon:"🤖", title:"Will an AI system outperform doctors in diagnosing cancer?", yesProb:72, volume:"560K", expiry:"Dec 31, 2026", trending:true, featured:false },
  // ───── 🚀 SCIENCE ─────
  { id:300, category:"Science", icon:"🚀", title:"Will Mars receive its first human mission before 2030?", yesProb:19, volume:"1.6M", expiry:"Jan 1, 2030", trending:true, featured:false },
  { id:301, category:"Science", icon:"🔭", title:"Will James Webb telescope detect signs of life on an exoplanet?", yesProb:8, volume:"940K", expiry:"Dec 31, 2028", trending:false, featured:false },
  { id:302, category:"Science", icon:"⚛️", title:"Will nuclear fusion net-energy gain be repeated commercially?", yesProb:35, volume:"720K", expiry:"Dec 31, 2027", trending:false, featured:false },
  { id:303, category:"Science", icon:"🧫", title:"Will lab-grown meat reach price parity with beef by 2028?", yesProb:27, volume:"310K", expiry:"Dec 31, 2028", trending:false, featured:false },
  { id:304, category:"Science", icon:"🌊", title:"Will ocean plastic cleanup projects remove 1M tonnes by 2030?", yesProb:41, volume:"190K", expiry:"Jan 1, 2030", trending:false, featured:false },
  { id:305, category:"Science", icon:"🧪", title:"Will AGI be declared achieved by a major lab before 2030?", yesProb:31, volume:"3.2M", expiry:"Jan 1, 2030", trending:true, featured:false },
];

const CATS = ["All","Albania","Politics","Crypto","Sports","Tech","Economy","Climate","Entertainment","Health","Science"];
const CAT_ICONS = {All:"🌐",Albania:"🇦🇱",Politics:"🏛️",Crypto:"₿",Sports:"⚽",Tech:"🤖",Economy:"💹",Climate:"🌍",Entertainment:"🎬",Health:"🏥",Science:"🚀"};

const TICKER = [
  {l:"Albania EU '27",v:"58%",up:false},{l:"BTC >$150K",v:"44%",up:true},{l:"NATO Tirana '27",v:"89%",up:true},
  {l:"Veliaj Guilty",v:"55%",up:false},{l:"Fed Cut Sep'26",v:"67%",up:true},{l:"Balluku Conviction",v:"42%",up:false},
  {l:"Tesla Robotaxi",v:"48%",up:true},{l:"S&P 7000",v:"61%",up:true},{l:"GTA VI 30M",v:"71%",up:true},
  {l:"GPT-5 Q3",v:"72%",up:true},{l:"Albania Tourism 13M",v:"71%",up:true},{l:"Gold $4K",v:"52%",up:true},
  {l:"AGI by 2030",v:"31%",up:false},{l:"Oasis $1B Tour",v:"54%",up:true},{l:"mRNA Cancer Vaccine",v:"46%",up:true},
];

function BetModal({ market, onClose }) {
  const [side, setSide] = useState("YES");
  const [amount, setAmount] = useState("");
  const [done, setDone] = useState(false);
  const price = side === "YES" ? market.yesProb : 100 - market.yesProb;
  const shares = amount ? (parseFloat(amount) / (price / 100)).toFixed(2) : "0.00";
  const profit = amount ? (parseFloat(shares) - parseFloat(amount)).toFixed(2) : "0.00";

  if (done) return (
    <div style={ms.ov} onClick={onClose}>
      <div style={ms.box} onClick={e=>e.stopPropagation()}>
        <div style={ms.check}>✓</div>
        <div style={ms.dTitle}>Order Executed</div>
        <div style={ms.dSub}>${amount} on <b style={{color:side==="YES"?"#22c55e":"#ef4444"}}>{side}</b> · {shares} shares</div>
        <div style={ms.dNote}>{market.title}</div>
        <button style={ms.dBtn} onClick={onClose}>Close</button>
      </div>
    </div>
  );

  return (
    <div style={ms.ov} onClick={onClose}>
      <div style={ms.box} onClick={e=>e.stopPropagation()}>
        <button style={ms.x} onClick={onClose}>✕</button>
        <div style={{fontSize:32,textAlign:"center",marginBottom:6}}>{market.icon}</div>
        <div style={ms.mCat}>{market.category}</div>
        <div style={ms.mTitle}>{market.title}</div>
        <div style={{display:"flex",gap:10,marginBottom:20}}>
          {["YES","NO"].map(s=>{
            const isY=s==="YES", active=side===s;
            return (
              <button key={s} onClick={()=>setSide(s)} style={{flex:1,padding:"12px",borderRadius:10,fontWeight:800,fontSize:13,cursor:"pointer",fontFamily:"inherit",
                background:active?(isY?"rgba(34,197,94,0.2)":"rgba(239,68,68,0.2)"):(isY?"rgba(34,197,94,0.06)":"rgba(239,68,68,0.06)"),
                border:active?`2px solid ${isY?"#22c55e":"#ef4444"}`:`2px solid ${isY?"rgba(34,197,94,0.2)":"rgba(239,68,68,0.2)"}`,
                color:isY?"#4ade80":"#f87171"}}>
                {s} <span style={{fontSize:11,fontWeight:400,opacity:0.8}}>{isY?market.yesProb:100-market.yesProb}¢</span>
              </button>
            );
          })}
        </div>
        <div style={ms.fLbl}>Amount (USD)</div>
        <div style={ms.iRow}>
          <span style={{color:"rgba(200,200,230,0.4)",fontSize:16}}>$</span>
          <input style={ms.inp} type="number" placeholder="0.00" value={amount} onChange={e=>setAmount(e.target.value)}/>
          {[10,50,100,500].map(v=><button key={v} style={ms.q} onClick={()=>setAmount(String(v))}>${v}</button>)}
        </div>
        {amount && (
          <div style={ms.calc}>
            {[["Shares acquired",shares],["Potential profit",`+$${profit}`],["Price per share",`${price}¢`],["Expiry",market.expiry]].map(([k,v])=>(
              <div key={k} style={{display:"flex",justifyContent:"space-between",fontSize:13}}>
                <span style={{color:"rgba(200,200,230,0.5)"}}>{k}</span>
                <span style={{fontWeight:700,color:k==="Potential profit"?"#22c55e":"#E8EAF6"}}>{v}</span>
              </div>
            ))}
          </div>
        )}
        <button style={{...ms.place,opacity:amount?1:0.4}} disabled={!amount} onClick={()=>setDone(true)}>Place Order</button>
      </div>
    </div>
  );
}

function FeatCard({market,onBet}) {
  const [hov,setHov]=useState(false);
  return (
    <div style={{background:"linear-gradient(145deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))",border:"1px solid rgba(212,168,67,0.15)",borderRadius:20,padding:28,cursor:"default",transition:"all 0.25s",position:"relative",overflow:"hidden",boxShadow:hov?"0 24px 60px rgba(0,0,0,0.5),0 0 0 1px rgba(212,168,67,0.2)":"none",transform:hov?"translateY(-5px)":"none"}} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}>
      <div style={{position:"absolute",top:0,left:0,right:0,height:1,background:"linear-gradient(90deg,transparent,rgba(212,168,67,0.5),transparent)"}}/>
      {market.category==="Albania"&&<div style={{position:"absolute",top:16,right:16,background:"rgba(220,38,38,0.18)",border:"1px solid rgba(220,38,38,0.3)",borderRadius:999,padding:"3px 10px",fontSize:11,color:"#fca5a5",fontWeight:700}}>🇦🇱 Albania</div>}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
        <span style={{fontSize:34}}>{market.icon}</span>
        {market.trending&&<span style={{background:"rgba(250,204,21,0.1)",border:"1px solid rgba(250,204,21,0.25)",borderRadius:999,padding:"3px 10px",fontSize:11,color:"#FACC15",fontWeight:700}}>🔥 Trending</span>}
      </div>
      <div style={{fontFamily:"Georgia,serif",fontSize:17,fontWeight:700,lineHeight:1.45,color:"#f1f5f9",marginBottom:10,minHeight:50}}>{market.title}</div>
      {market.desc&&<div style={{fontSize:12,color:"rgba(200,200,230,0.45)",lineHeight:1.6,marginBottom:16,borderLeft:"2px solid rgba(212,168,67,0.25)",paddingLeft:10}}>{market.desc}</div>}
      <div style={{display:"flex",alignItems:"baseline",gap:8,marginBottom:10}}>
        <span style={{fontFamily:"Georgia,serif",fontSize:38,fontWeight:900,color:"#22c55e"}}>{market.yesProb}%</span>
        <span style={{fontSize:13,color:"rgba(200,200,230,0.45)"}}>chance YES</span>
        <span style={{fontSize:13,color:"#ef4444",marginLeft:"auto"}}>{100-market.yesProb}% NO</span>
      </div>
      <div style={{height:4,background:"rgba(220,38,38,0.2)",borderRadius:4,overflow:"hidden",marginBottom:12}}>
        <div style={{height:"100%",background:"linear-gradient(90deg,#22c55e,#16a34a)",borderRadius:4,width:`${market.yesProb}%`}}/>
      </div>
      <div style={{fontSize:11,color:"rgba(200,200,230,0.35)",marginBottom:18}}>Vol ${market.volume} · Exp {market.expiry}</div>
      <div style={{display:"flex",gap:10}}>
        <button style={{flex:1,padding:11,background:"linear-gradient(135deg,#15803d,#166534)",border:"none",borderRadius:10,color:"#fff",fontWeight:800,fontSize:13,cursor:"pointer",fontFamily:"inherit"}} onClick={()=>onBet(market)}>BUY YES</button>
        <button style={{flex:1,padding:11,background:"linear-gradient(135deg,#b91c1c,#991b1b)",border:"none",borderRadius:10,color:"#fff",fontWeight:800,fontSize:13,cursor:"pointer",fontFamily:"inherit"}} onClick={()=>onBet(market)}>BUY NO</button>
      </div>
    </div>
  );
}

function Card({market,onBet}) {
  const [hov,setHov]=useState(false);
  const isAlb=market.category==="Albania";
  return (
    <div style={{background:hov?"rgba(255,255,255,0.06)":"rgba(255,255,255,0.035)",border:`1px solid ${hov?"rgba(212,168,67,0.25)":isAlb?"rgba(220,38,38,0.15)":"rgba(255,255,255,0.07)"}`,borderRadius:16,padding:20,position:"relative",overflow:"hidden",transition:"all 0.22s",transform:hov?"translateY(-3px)":"none",boxShadow:hov?"0 12px 40px rgba(0,0,0,0.3)":"none"}} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}>
      {market.trending&&<span style={{position:"absolute",top:12,right:isAlb?32:12,fontSize:13}}>🔥</span>}
      {isAlb&&<span style={{position:"absolute",top:10,right:10,fontSize:13}}>🇦🇱</span>}
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
        <span style={{fontSize:20}}>{market.icon}</span>
        <span style={{fontSize:"10px",fontWeight:800,textTransform:"uppercase",letterSpacing:"1px",color:isAlb?"#fbbf24":"#93c5fd"}}>{market.category}</span>
      </div>
      <div style={{fontSize:14,fontWeight:600,lineHeight:1.5,color:"#f1f5f9",marginBottom:14,minHeight:44,fontFamily:"Georgia,serif"}}>{market.title}</div>
      <div style={{display:"flex",alignItems:"baseline",gap:6,marginBottom:8}}>
        <span style={{fontSize:26,fontWeight:800,color:"#22c55e",fontFamily:"Georgia,serif"}}>{market.yesProb}%</span>
        <span style={{fontSize:11,color:"rgba(200,200,230,0.45)"}}>yes</span>
        <span style={{fontSize:11,color:"#ef4444",marginLeft:"auto"}}>{100-market.yesProb}% no</span>
      </div>
      <div style={{height:4,background:"rgba(220,38,38,0.2)",borderRadius:4,overflow:"hidden",marginBottom:12}}>
        <div style={{height:"100%",background:"linear-gradient(90deg,#22c55e,#16a34a)",borderRadius:4,width:`${market.yesProb}%`}}/>
      </div>
      <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:"rgba(200,200,230,0.4)",marginBottom:12}}>
        <span>Vol ${market.volume}</span><span>{market.expiry}</span>
      </div>
      <div style={{display:"flex",gap:8}}>
        <button onClick={()=>onBet(market)} style={{flex:1,padding:"9px",background:"rgba(34,197,94,0.1)",border:"1px solid rgba(34,197,94,0.3)",borderRadius:8,color:"#4ade80",fontWeight:700,fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>YES {market.yesProb}¢</button>
        <button onClick={()=>onBet(market)} style={{flex:1,padding:"9px",background:"rgba(220,38,38,0.1)",border:"1px solid rgba(220,38,38,0.3)",borderRadius:8,color:"#f87171",fontWeight:700,fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>NO {100-market.yesProb}¢</button>
      </div>
    </div>
  );
}

export default function App() {
  const [cat,setCat]=useState("All");
  const [q,setQ]=useState("");
  const [bet,setBet]=useState(null);
  const [scrolled,setScrolled]=useState(false);
  const [sort,setSort]=useState("trending");

  useEffect(()=>{
    const h=()=>setScrolled(window.scrollY>30);
    window.addEventListener("scroll",h);
    return()=>window.removeEventListener("scroll",h);
  },[]);

  const featured=ALL_MARKETS.filter(m=>m.featured);
  const albFeatured=ALL_MARKETS.filter(m=>m.category==="Albania"&&m.featured);

  let filtered=ALL_MARKETS.filter(m=>(cat==="All"||m.category===cat)&&m.title.toLowerCase().includes(q.toLowerCase()));
  if(sort==="trending") filtered=[...filtered].sort((a,b)=>(b.trending?1:0)-(a.trending?1:0));
  else if(sort==="volume") filtered=[...filtered].sort((a,b)=>parseFloat(b.volume)-parseFloat(a.volume));
  else if(sort==="expiry") filtered=[...filtered].sort((a,b)=>new Date(a.expiry)-new Date(b.expiry));

  return (
    <div style={{minHeight:"100vh",background:"#070910",color:"#E8EAF6",fontFamily:"'DM Sans','Segoe UI',system-ui,sans-serif",overflowX:"hidden",position:"relative"}}>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0;}
        ::placeholder{color:rgba(200,200,230,0.3);}
        input[type=number]::-webkit-inner-spin-button{-webkit-appearance:none;}
        button:hover{filter:brightness(1.1);}
        a{text-decoration:none;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);}}
        @keyframes ticker{0%{transform:translateX(0);}100%{transform:translateX(-50%);}}
        @keyframes glow{0%,100%{box-shadow:0 0 20px rgba(212,168,67,0.15);}50%{box-shadow:0 0 40px rgba(212,168,67,0.35);}}
      `}</style>

      <div style={{position:"fixed",top:-300,left:-200,width:700,height:700,borderRadius:"50%",background:"radial-gradient(circle,rgba(29,78,216,0.1) 0%,transparent 70%)",pointerEvents:"none",zIndex:0}}/>
      <div style={{position:"fixed",bottom:-200,right:-100,width:600,height:600,borderRadius:"50%",background:"radial-gradient(circle,rgba(220,38,38,0.08) 0%,transparent 70%)",pointerEvents:"none",zIndex:0}}/>
      <div style={{position:"fixed",top:"35%",left:"50%",transform:"translateX(-50%)",width:900,height:400,background:"radial-gradient(ellipse,rgba(212,168,67,0.035) 0%,transparent 70%)",pointerEvents:"none",zIndex:0}}/>

      {/* NAV */}
      <nav style={{position:"sticky",top:0,zIndex:200,padding:"0 32px",backdropFilter:"blur(20px)",borderBottom:"1px solid rgba(255,255,255,0.05)",transition:"all 0.3s",background:scrolled?"rgba(7,9,16,0.95)":"rgba(7,9,16,0.4)",boxShadow:scrolled?"0 4px 40px rgba(0,0,0,0.5)":"none"}}>
        <div style={{maxWidth:1280,margin:"0 auto",height:68,display:"flex",alignItems:"center",justifyContent:"space-between",gap:24}}>
          <div style={{display:"flex",alignItems:"baseline",cursor:"pointer"}}>
            <span style={{fontFamily:"Georgia,serif",fontSize:28,fontWeight:900,color:"#FACC15",letterSpacing:-0.5}}>Dony</span>
            <span style={{fontFamily:"Georgia,serif",fontSize:28,fontWeight:900,color:"#ef4444",letterSpacing:-0.5}}>market</span>
          </div>
          <div style={{display:"flex",gap:28,flex:1,justifyContent:"center"}}>
            {["Markets","Portfolio","Leaderboard","Analytics","Docs"].map(l=>(
              <span key={l} style={{color:"rgba(232,234,246,0.5)",fontSize:14,fontWeight:500,cursor:"pointer"}}>{l}</span>
            ))}
          </div>
          <div style={{display:"flex",gap:10,alignItems:"center"}}>
            <div style={{padding:"7px 14px",background:"rgba(212,168,67,0.1)",border:"1px solid rgba(212,168,67,0.25)",borderRadius:999,color:"#D4A843",fontSize:13,fontWeight:600}}>💰 $1,240.00</div>
            <button style={{padding:"8px 18px",background:"linear-gradient(135deg,#1d4ed8,#ef4444)",border:"none",borderRadius:10,color:"#fff",fontWeight:700,fontSize:13,cursor:"pointer"}}>Connect Wallet</button>
          </div>
        </div>
      </nav>

      {/* TICKER */}
      <div style={{background:"rgba(212,168,67,0.04)",borderBottom:"1px solid rgba(212,168,67,0.08)",overflow:"hidden",position:"relative",zIndex:10}}>
        <div style={{display:"inline-flex",whiteSpace:"nowrap",animation:"ticker 55s linear infinite",padding:"9px 0"}}>
          {[...TICKER,...TICKER].map((t,i)=>(
            <span key={i} style={{display:"inline-flex",alignItems:"center",gap:8,padding:"0 28px"}}>
              <span style={{width:5,height:5,borderRadius:"50%",background:"#D4A843",opacity:0.6,flexShrink:0,display:"inline-block"}}/>
              <span style={{fontSize:12,color:"rgba(232,234,246,0.4)",fontWeight:500}}>{t.l}</span>
              <span style={{fontSize:12,fontWeight:800,color:t.up?"#22c55e":"#ef4444"}}>{t.v}</span>
            </span>
          ))}
        </div>
      </div>

      {/* HERO */}
      <section style={{maxWidth:1100,margin:"0 auto",padding:"80px 32px 56px",textAlign:"center",position:"relative",zIndex:1,animation:"fadeUp 0.7s ease both"}}>
        <div style={{display:"inline-block",background:"rgba(212,168,67,0.08)",border:"1px solid rgba(212,168,67,0.2)",borderRadius:999,padding:"5px 18px",fontSize:11,color:"#D4A843",marginBottom:24,letterSpacing:2,fontWeight:700,textTransform:"uppercase"}}>🎯 Prediction Markets · Est. 2026</div>
        <h1 style={{fontFamily:"Georgia,serif",fontSize:"clamp(44px,6.5vw,78px)",fontWeight:900,lineHeight:1.05,marginBottom:20,color:"#F1F5F9",letterSpacing:-2}}>
          Trade on the<br/>
          <span style={{background:"linear-gradient(105deg,#F0C060 0%,#ef4444 50%,#a855f7 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>World's Future</span>
        </h1>
        <p style={{fontSize:17,color:"rgba(232,234,246,0.5)",lineHeight:1.8,marginBottom:36}}>
          Real markets. Real outcomes. From Tirana to Tokyo —<br/>bet on what matters with precision and style.
        </p>
        <div style={{display:"flex",gap:12,justifyContent:"center",marginBottom:52,flexWrap:"wrap"}}>
          <button style={{padding:"13px 28px",background:"linear-gradient(135deg,rgba(212,168,67,0.9),rgba(239,68,68,0.85))",border:"none",borderRadius:12,color:"#000",fontWeight:800,fontSize:14,cursor:"pointer",animation:"glow 3s ease infinite"}} onClick={()=>setCat("Albania")}>🇦🇱 Albanian Markets</button>
          <button style={{padding:"13px 28px",background:"transparent",border:"1px solid rgba(255,255,255,0.1)",borderRadius:12,color:"#E8EAF6",fontWeight:600,fontSize:14,cursor:"pointer"}} onClick={()=>setCat("All")}>Explore All {ALL_MARKETS.length} Markets</button>
        </div>
        <div style={{display:"inline-flex",flexWrap:"wrap",justifyContent:"center",background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:16,overflow:"hidden"}}>
          {[["$48.2M","Total Volume"],[ALL_MARKETS.length+"+","Active Markets"],["89,000","Traders"],["11","Categories"]].map(([n,l],i)=>(
            <div key={l} style={{padding:"20px 28px",borderRight:i<3?"1px solid rgba(255,255,255,0.07)":"none",textAlign:"center",minWidth:120}}>
              <div style={{fontFamily:"Georgia,serif",fontSize:22,fontWeight:700,color:"#D4A843",marginBottom:4}}>{n}</div>
              <div style={{fontSize:11,color:"rgba(232,234,246,0.4)",letterSpacing:"0.8px",textTransform:"uppercase"}}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ALBANIA SPOTLIGHT */}
      <section style={{maxWidth:1280,margin:"0 auto",padding:"0 32px 64px",position:"relative",zIndex:1}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",background:"linear-gradient(135deg,rgba(220,38,38,0.1),rgba(29,78,216,0.08))",border:"1px solid rgba(220,38,38,0.18)",borderRadius:16,padding:"20px 24px",marginBottom:24,flexWrap:"wrap",gap:16}}>
          <div style={{display:"flex",alignItems:"center",gap:16}}>
            <span style={{fontSize:44}}>🇦🇱</span>
            <div>
              <div style={{fontFamily:"Georgia,serif",fontSize:20,fontWeight:700,color:"#F1F5F9",marginBottom:4}}>Albania Spotlight</div>
              <div style={{fontSize:13,color:"rgba(232,234,246,0.5)",lineHeight:1.5}}>Live markets on EU accession, SPAK prosecutions, NATO summit & political future — backed by real 2026 news</div>
            </div>
          </div>
          <button style={{padding:"10px 20px",background:"rgba(220,38,38,0.15)",border:"1px solid rgba(220,38,38,0.3)",borderRadius:10,color:"#fca5a5",fontWeight:700,fontSize:13,cursor:"pointer",whiteSpace:"nowrap"}} onClick={()=>setCat("Albania")}>View All 14 Markets →</button>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(340px,1fr))",gap:20}}>
          {albFeatured.map(m=><FeatCard key={m.id} market={m} onBet={setBet}/>)}
        </div>
      </section>

      {/* FEATURED */}
      <section style={{maxWidth:1280,margin:"0 auto",padding:"0 32px 64px",position:"relative",zIndex:1}}>
        <div style={{marginBottom:28}}>
          <div style={{fontSize:11,color:"#D4A843",letterSpacing:2,textTransform:"uppercase",marginBottom:6,fontWeight:700}}>Hand-picked</div>
          <div style={{fontFamily:"Georgia,serif",fontSize:26,fontWeight:700,color:"#F1F5F9"}}>⭐ Featured Markets</div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(340px,1fr))",gap:20}}>
          {featured.filter(m=>m.category!=="Albania").map(m=><FeatCard key={m.id} market={m} onBet={setBet}/>)}
        </div>
      </section>

      {/* ALL MARKETS */}
      <section style={{maxWidth:1280,margin:"0 auto",padding:"0 32px 72px",position:"relative",zIndex:1}}>
        <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",marginBottom:28,flexWrap:"wrap",gap:12}}>
          <div>
            <div style={{fontSize:11,color:"#D4A843",letterSpacing:2,textTransform:"uppercase",marginBottom:6,fontWeight:700}}>Browse</div>
            <div style={{fontFamily:"Georgia,serif",fontSize:26,fontWeight:700,color:"#F1F5F9"}}>📊 All Markets</div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
            <span style={{fontSize:12,color:"rgba(232,234,246,0.35)"}}>Sort:</span>
            {[["trending","🔥 Trending"],["volume","📊 Volume"],["expiry","📅 Expiry"]].map(([v,l])=>(
              <button key={v} onClick={()=>setSort(v)} style={{padding:"6px 12px",borderRadius:8,fontSize:12,fontWeight:sort===v?700:500,cursor:"pointer",fontFamily:"inherit",background:sort===v?"rgba(212,168,67,0.15)":"rgba(255,255,255,0.04)",border:sort===v?"1px solid rgba(212,168,67,0.35)":"1px solid rgba(255,255,255,0.07)",color:sort===v?"#D4A843":"rgba(232,234,246,0.45)"}}>{l}</button>
            ))}
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:16,flexWrap:"wrap"}}>
          <div style={{display:"flex",alignItems:"center",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:12,padding:"0 14px",flex:1,minWidth:220}}>
            <span style={{fontSize:13,marginRight:8,opacity:0.4}}>🔍</span>
            <input style={{background:"transparent",border:"none",outline:"none",color:"#E8EAF6",fontSize:14,padding:"11px 0",width:"100%",fontFamily:"inherit"}} placeholder="Search all markets..." value={q} onChange={e=>setQ(e.target.value)}/>
            {q&&<button style={{background:"none",border:"none",color:"rgba(200,200,230,0.4)",cursor:"pointer",fontSize:12}} onClick={()=>setQ("")}>✕</button>}
          </div>
          <span style={{fontSize:12,color:"rgba(232,234,246,0.3)"}}>{filtered.length} results</span>
        </div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:28}}>
          {CATS.map(c=>(
            <button key={c} onClick={()=>setCat(c)} style={{padding:"8px 16px",borderRadius:999,fontSize:13,fontWeight:cat===c?700:500,cursor:"pointer",fontFamily:"inherit",transition:"all 0.2s",background:cat===c?"linear-gradient(135deg,rgba(212,168,67,0.2),rgba(239,68,68,0.15))":"rgba(255,255,255,0.04)",border:cat===c?"1px solid rgba(212,168,67,0.4)":"1px solid rgba(255,255,255,0.07)",color:cat===c?"#F0C060":"rgba(232,234,246,0.55)"}}>
              {CAT_ICONS[c]} {c}
            </button>
          ))}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))",gap:16}}>
          {filtered.map((m,i)=>(
            <div key={m.id} style={{animation:`fadeUp 0.35s ease ${(i%15)*0.03}s both`}}>
              <Card market={m} onBet={setBet}/>
            </div>
          ))}
        </div>
        {filtered.length===0&&<div style={{textAlign:"center",padding:"60px",color:"rgba(232,234,246,0.2)",fontSize:16}}>No markets found for "{q}"</div>}
      </section>

      {/* FOOTER */}
      <footer style={{borderTop:"1px solid rgba(255,255,255,0.06)",padding:"48px 32px 32px",position:"relative",zIndex:1}}>
        <div style={{maxWidth:1280,margin:"0 auto"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:32,flexWrap:"wrap",gap:24}}>
            <div>
              <div style={{display:"flex",alignItems:"baseline"}}>
                <span style={{fontFamily:"Georgia,serif",fontSize:26,fontWeight:900,color:"#FACC15"}}>Dony</span>
                <span style={{fontFamily:"Georgia,serif",fontSize:26,fontWeight:900,color:"#ef4444"}}>market</span>
              </div>
              <div style={{fontSize:13,color:"rgba(232,234,246,0.35)",marginTop:6}}>Precision prediction. Elegant markets.</div>
            </div>
            <div style={{display:"flex",gap:48,flexWrap:"wrap"}}>
              {[["Product",["Markets","Portfolio","Leaderboard","Analytics"]],["Company",["About","Blog","Careers","Press"]],["Legal",["Terms","Privacy","Cookies","Disclaimer"]]].map(([heading,links])=>(
                <div key={heading}>
                  <div style={{fontSize:11,fontWeight:800,color:"#D4A843",letterSpacing:1.5,textTransform:"uppercase",marginBottom:12}}>{heading}</div>
                  {links.map(l=><div key={l} style={{fontSize:13,color:"rgba(232,234,246,0.35)",cursor:"pointer",marginBottom:8}}>{l}</div>)}
                </div>
              ))}
            </div>
          </div>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:"rgba(232,234,246,0.18)",paddingTop:24,borderTop:"1px solid rgba(255,255,255,0.04)",flexWrap:"wrap",gap:8}}>
            <span>© 2026 DonyMarket. All rights reserved.</span>
            <span>For entertainment purposes only. Not financial advice.</span>
          </div>
        </div>
      </footer>

      {bet&&<BetModal market={bet} onClose={()=>setBet(null)}/>}
    </div>
  );
}

const ms = {
  ov:{position:"fixed",inset:0,background:"rgba(0,0,0,0.82)",backdropFilter:"blur(14px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:999,padding:20},
  box:{background:"#0c0e1a",border:"1px solid rgba(212,168,67,0.2)",borderRadius:24,padding:36,width:"100%",maxWidth:440,position:"relative",boxShadow:"0 32px 80px rgba(0,0,0,0.7)",animation:"fadeUp 0.3s ease both",fontFamily:"inherit"},
  x:{position:"absolute",top:16,right:16,background:"rgba(255,255,255,0.06)",border:"none",borderRadius:"50%",width:30,height:30,color:"#E8EAF6",cursor:"pointer",fontSize:12,fontFamily:"inherit"},
  mCat:{textAlign:"center",fontSize:10,fontWeight:800,color:"#D4A843",letterSpacing:2,textTransform:"uppercase",marginBottom:8},
  mTitle:{fontFamily:"Georgia,serif",fontSize:16,fontWeight:700,textAlign:"center",color:"#f1f5f9",lineHeight:1.5,marginBottom:24},
  fLbl:{display:"block",fontSize:10,fontWeight:800,letterSpacing:1.5,textTransform:"uppercase",color:"rgba(200,200,230,0.4)",marginBottom:8},
  iRow:{display:"flex",alignItems:"center",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:12,padding:"0 14px",marginBottom:16,gap:8},
  inp:{background:"transparent",border:"none",outline:"none",color:"#f1f5f9",fontSize:20,fontWeight:800,padding:"12px 0",flex:1,fontFamily:"inherit"},
  q:{padding:"5px 9px",background:"rgba(212,168,67,0.1)",border:"1px solid rgba(212,168,67,0.2)",borderRadius:6,color:"#D4A843",fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"inherit",flexShrink:0},
  calc:{background:"rgba(255,255,255,0.025)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:12,padding:"14px 16px",marginBottom:18,display:"flex",flexDirection:"column",gap:10},
  place:{width:"100%",padding:14,background:"linear-gradient(135deg,#1d4ed8,#ef4444)",border:"none",borderRadius:12,color:"#fff",fontWeight:800,fontSize:15,cursor:"pointer",letterSpacing:0.3,transition:"opacity 0.2s",fontFamily:"inherit"},
  check:{width:64,height:64,background:"rgba(34,197,94,0.15)",border:"2px solid #22c55e",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:"#22c55e",fontSize:28,margin:"0 auto 20px"},
  dTitle:{fontFamily:"Georgia,serif",fontSize:24,fontWeight:800,textAlign:"center",color:"#f1f5f9",marginBottom:10},
  dSub:{fontSize:14,textAlign:"center",color:"rgba(200,200,230,0.55)",marginBottom:8,lineHeight:1.6},
  dNote:{fontSize:12,textAlign:"center",color:"rgba(200,200,230,0.4)",marginBottom:24,lineHeight:1.5,borderTop:"1px solid rgba(255,255,255,0.06)",paddingTop:16},
  dBtn:{width:"100%",padding:12,background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:10,color:"#E8EAF6",fontWeight:600,fontSize:13,cursor:"pointer",fontFamily:"inherit"},
};
