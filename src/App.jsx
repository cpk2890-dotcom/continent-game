import { useState, useCallback, useEffect, useRef } from "react";

// ════════════════════════════════════════════════════════════════
// 카드 데이터
// ════════════════════════════════════════════════════════════════
const CARD_DATA = [
  { id:"AS01",name:"몽골",          continent:"아시아",    score:-3 },
  { id:"AS02",name:"베트남",        continent:"아시아",    score: 1 },
  { id:"AS03",name:"타이",          continent:"아시아",    score: 1 },
  { id:"AS04",name:"인도",          continent:"아시아",    score: 1 },
  { id:"AS05",name:"파키스탄",      continent:"아시아",    score: 1 },
  { id:"AS06",name:"사우디아라비아",continent:"아시아",    score:-2 },
  { id:"AS07",name:"우즈베키스탄",  continent:"아시아",    score:-3 },
  { id:"AS08",name:"카자흐스탄",    continent:"아시아",    score:-3 },
  { id:"AS09",name:"이란",          continent:"아시아",    score:-3 },
  { id:"EU01",name:"에스파냐",      continent:"유럽",      score:-2 },
  { id:"EU02",name:"그리스",        continent:"유럽",      score: 1 },
  { id:"EU03",name:"노르웨이",      continent:"유럽",      score:-2 },
  { id:"EU04",name:"핀란드",        continent:"유럽",      score: 1 },
  { id:"EU05",name:"오스트리아",    continent:"유럽",      score: 1 },
  { id:"EU06",name:"독일",          continent:"유럽",      score:-2 },
  { id:"EU07",name:"우크라이나",    continent:"유럽",      score: 1 },
  { id:"EU08",name:"러시아",        continent:"유럽",      score: 1 },
  { id:"EU09",name:"벨기에",        continent:"유럽",      score:-2 },
  { id:"AF01",name:"이집트",        continent:"아프리카",  score: 1 },
  { id:"AF02",name:"알제리",        continent:"아프리카",  score: 1 },
  { id:"AF03",name:"나이지리아",    continent:"아프리카",  score: 1 },
  { id:"AF04",name:"코트디부아르",  continent:"아프리카",  score: 1 },
  { id:"AF05",name:"에티오피아",    continent:"아프리카",  score:-2 },
  { id:"AF06",name:"케냐",          continent:"아프리카",  score:-2 },
  { id:"AF07",name:"보츠와나",      continent:"아프리카",  score: 1 },
  { id:"AF08",name:"남아프리카공화국",continent:"아프리카",score:-2 },
  { id:"AF09",name:"마다가스카르",  continent:"아프리카",  score: 1 },
  { id:"NA01",name:"캐나다",        continent:"북아메리카",score:-3 },
  { id:"NA02",name:"미국",          continent:"북아메리카",score:-2 },
  { id:"NA03",name:"멕시코",        continent:"북아메리카",score: 1 },
  { id:"NA04",name:"과테말라",      continent:"북아메리카",score: 1 },
  { id:"NA05",name:"자메이카",      continent:"북아메리카",score:-2 },
  { id:"NA06",name:"쿠바",          continent:"북아메리카",score: 1 },
  { id:"NA07",name:"코스타리카",    continent:"북아메리카",score: 1 },
  { id:"NA08",name:"파나마",        continent:"북아메리카",score: 1 },
  { id:"NA09",name:"온두라스",      continent:"북아메리카",score: 1 },
  { id:"SA01",name:"아르헨티나",    continent:"남아메리카",score: 1 },
  { id:"SA02",name:"우루과이",      continent:"남아메리카",score:-2 },
  { id:"SA03",name:"브라질",        continent:"남아메리카",score: 1 },
  { id:"SA04",name:"칠레",          continent:"남아메리카",score:-2 },
  { id:"SA05",name:"페루",          continent:"남아메리카",score:-2 },
  { id:"SA06",name:"콜롬비아",      continent:"남아메리카",score:-3 },
  { id:"SA07",name:"에콰도르",      continent:"남아메리카",score:-2 },
  { id:"SA08",name:"베네수엘라",    continent:"남아메리카",score:-3 },
  { id:"SA09",name:"볼리비아",      continent:"남아메리카",score: 1 },
  { id:"OC01",name:"뉴질랜드",      continent:"오세아니아",score:-2 },
  { id:"OC02",name:"오스트레일리아",continent:"오세아니아",score: 1 },
  { id:"OC03",name:"파푸아뉴기니",  continent:"오세아니아",score:-2 },
  { id:"OC04",name:"사모아",        continent:"오세아니아",score:-2 },
  { id:"OC05",name:"키리바시",      continent:"오세아니아",score: 1 },
  { id:"OC06",name:"피지",          continent:"오세아니아",score:-2 },
  { id:"OC07",name:"통가",          continent:"오세아니아",score: 1 },
  { id:"OC08",name:"팔라우",        continent:"오세아니아",score: 1 },
  { id:"OC09",name:"나우루",        continent:"오세아니아",score:-2 },
  { id:"SP01",name:"지구",          continent:"전체",      score: 0, isWild:true },
];

// ════════════════════════════════════════════════════════════════
// 스타일 상수
// ════════════════════════════════════════════════════════════════
const C_STYLE = {
  아시아:    {bg:"#FFF7ED",border:"#FB923C",text:"#C2410C",badge:"#FB923C",emoji:"🌏"},
  유럽:      {bg:"#EFF6FF",border:"#60A5FA",text:"#1D4ED8",badge:"#60A5FA",emoji:"🏰"},
  아프리카:  {bg:"#FEFCE8",border:"#EAB308",text:"#854D0E",badge:"#EAB308",emoji:"🌍"},
  북아메리카:{bg:"#F0FDF4",border:"#22C55E",text:"#15803D",badge:"#22C55E",emoji:"🗽"},
  남아메리카:{bg:"#F7FEE7",border:"#84CC16",text:"#3F6212",badge:"#84CC16",emoji:"🌿"},
  오세아니아:{bg:"#ECFEFF",border:"#06B6D4",text:"#0E7490",badge:"#06B6D4",emoji:"🐨"},
  전체:      {bg:"#FAF5FF",border:"#A855F7",text:"#7E22CE",badge:"#A855F7",emoji:"🌐"},
};

const P_META = [
  {name:"플레이어 1",grad:["#EF4444","#DC2626"],light:"#FEF2F2",border:"#FCA5A5",avatar:"🔴",color:"#EF4444"},
  {name:"플레이어 2",grad:["#3B82F6","#2563EB"],light:"#EFF6FF",border:"#93C5FD",avatar:"🔵",color:"#3B82F6"},
  {name:"플레이어 3",grad:["#22C55E","#16A34A"],light:"#F0FDF4",border:"#86EFAC",avatar:"🟢",color:"#22C55E"},
  {name:"플레이어 4",grad:["#EAB308","#CA8A04"],light:"#FEFCE8",border:"#FDE047",avatar:"🟡",color:"#EAB308"},
];

const MEDAL = ["🥇","🥈","🥉","4️⃣"];

// ════════════════════════════════════════════════════════════════
// 피라미드 로직
// ════════════════════════════════════════════════════════════════
const MAX_ROW1 = 10;

function getRow1Range(board) {
  const cols = Object.keys(board[0]||{}).map(Number);
  if (!cols.length) return {min:null,max:null};
  return {min:Math.min(...cols),max:Math.max(...cols)};
}
function getRow1Count(board){ return Object.keys(board[0]||{}).length; }

function isValidPlacement(board,row,col,card){
  if(!card) return false;
  if(row===0){
    const {min,max}=getRow1Range(board);
    const cnt=getRow1Count(board);
    if(cnt>=MAX_ROW1) return false;
    if(min===null) return true;
    if(col===min-1||col===max+1) return !(board[0]&&board[0][col]);
    return false;
  }
  if(board[row]&&board[row][col]) return false;
  const b1=(board[row-1]||{})[col];
  const b2=(board[row-1]||{})[col+1];
  if(!b1||!b2) return false;
  if(card.isWild) return true;
  return (b1.isWild||b1.continent===card.continent)||(b2.isWild||b2.continent===card.continent);
}

function computeValidSlots(board,card){
  if(!card) return new Set();
  const valid=new Set();
  const {min,max}=getRow1Range(board);
  const cnt=getRow1Count(board);
  if(cnt===0){
    valid.add("r0c0");
  } else if(cnt<MAX_ROW1){
    if(isValidPlacement(board,0,min-1,card)) valid.add(`r0c${min-1}`);
    if(isValidPlacement(board,0,max+1,card)) valid.add(`r0c${max+1}`);
  }
  if(min!==null){
    for(let r=1;r<=9;r++){
      const lower=board[r-1]||{};
      const cols=Object.keys(lower).map(Number).sort((a,b)=>a-b);
      for(let i=0;i<cols.length-1;i++){
        const c=cols[i];
        if(cols[i+1]===c+1 && isValidPlacement(board,r,c,card)) valid.add(`r${r}c${c}`);
      }
    }
  }
  return valid;
}

/** 손패에서 단 1장이라도 놓을 수 있는 슬롯이 있는지 확인 */
function canPlay(board,hand){
  return hand.some(card=>computeValidSlots(board,card).size>0);
}

// ════════════════════════════════════════════════════════════════
// 유틸
// ════════════════════════════════════════════════════════════════
function shuffle(arr){
  const a=[...arr];
  for(let i=a.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [a[i],a[j]]=[a[j],a[i]];
  }
  return a;
}
function dealCards(n=4){
  const s=shuffle(CARD_DATA);
  const per=Math.floor(s.length/n);
  return Array.from({length:n},(_,i)=>s.slice(i*per,(i+1)*per));
}
function handScore(hand){ return hand.reduce((s,c)=>s+c.score,0); }
function slotToRC(key){
  const [r,c]=key.split("c");
  return {row:parseInt(r.replace("r",""),10),col:parseInt(c,10)};
}

// ════════════════════════════════════════════════════════════════
// 게임 초기 상태
// ════════════════════════════════════════════════════════════════
function initGame(){
  const hands=dealCards(4);
  return {
    hands,                        // [p0..p3] 손패 배열
    board:{},                     // { [row]: { [col]: card } }
    penalties:[0,0,0,0],          // 각 플레이어 벌점
    activePlayers:[0,1,2,3],      // 아직 탈락하지 않은 플레이어 인덱스
    turnIdx:0,                    // activePlayers 내 현재 인덱스
    phase:"playing",              // "playing" | "passScreen" | "result"
    lastPlaced:null,              // 직전에 내려놓은 { card, slotKey, playerIdx } - 지적용
    canChallenge:false,           // 지적 버튼 활성화 여부
    challengeWindow:false,        // 지적 가능 턴인지
    passTarget:null,              // passScreen 에서 보여줄 다음 플레이어 인덱스
    results:null,                 // 게임 종료 시 결과 배열
  };
}

// ════════════════════════════════════════════════════════════════
// 미니 카드 (공용)
// ════════════════════════════════════════════════════════════════
function MiniCard({card,size="md",dimmed=false}){
  const st=C_STYLE[card.continent]||C_STYLE["전체"];
  const [w,h,f1,f2]=size==="sm"?[60,82,9,10]:[70,96,10,11];
  const scoreColor=card.score>0?"#059669":card.score<0?"#DC2626":"#7C3AED";
  return(
    <div style={{
      width:w,height:h,borderRadius:10,
      border:`2px solid ${st.border}`,background:st.bg,
      display:"flex",flexDirection:"column",overflow:"hidden",
      opacity:dimmed?0.45:1,
      boxShadow:"0 2px 6px rgba(0,0,0,0.15)",
      flexShrink:0,
    }}>
      <div style={{background:st.badge,padding:"2px 3px",textAlign:"center"}}>
        <span style={{color:"#fff",fontSize:f1,fontWeight:700,whiteSpace:"nowrap"}}>
          {st.emoji} {card.continent==="전체"?"지구":card.continent.length>3?card.continent.slice(0,3):card.continent}
        </span>
      </div>
      <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",padding:"0 3px"}}>
        <span style={{color:st.text,fontSize:f2,fontWeight:700,textAlign:"center",lineHeight:1.2}}>
          {card.name}
        </span>
      </div>
      <div style={{background:"rgba(255,255,255,0.6)",textAlign:"center",padding:"3px 0"}}>
        <span style={{fontSize:f2+1,fontWeight:800,color:scoreColor}}>
          {card.score>0?`+${card.score}`:card.isWild?"★":card.score}
        </span>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// 드래그 고스트
// ════════════════════════════════════════════════════════════════
function DragGhost({card,pos}){
  if(!card||!pos) return null;
  return(
    <div style={{
      position:"fixed",left:pos.x+12,top:pos.y-30,
      zIndex:9999,pointerEvents:"none",
      transform:"rotate(5deg) scale(1.1)",
      filter:"drop-shadow(0 8px 20px rgba(0,0,0,0.5))",
    }}>
      <MiniCard card={card} size="md"/>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// 드롭 슬롯
// ════════════════════════════════════════════════════════════════
function DropSlot({slotKey,isValid,isDragOver,onDragOver,onDragLeave,onDrop}){
  return(
    <div
      onDragOver={e=>{e.preventDefault();onDragOver(slotKey);}}
      onDragLeave={()=>onDragLeave()}
      onDrop={e=>{e.preventDefault();onDrop(slotKey);}}
      style={{
        width:70,height:96,borderRadius:10,
        border:`2.5px dashed ${isValid?(isDragOver?"#6366F1":"#34D399"):"rgba(255,255,255,0.1)"}`,
        background:isDragOver?"rgba(99,102,241,0.25)":isValid?"rgba(52,211,153,0.08)":"rgba(255,255,255,0.02)",
        display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
        transition:"all 0.12s",
        cursor:isValid?"copy":"default",
        transform:isDragOver?"scale(1.07)":"scale(1)",
        boxShadow:isDragOver?"0 0 0 3px rgba(99,102,241,0.5),0 4px 16px rgba(99,102,241,0.3)":"none",
      }}
    >
      {isValid&&(
        <>
          <span style={{fontSize:20}}>{isDragOver?"✅":"⬇️"}</span>
          <span style={{fontSize:9,color:isDragOver?"#A5B4FC":"#6EE7B7",fontWeight:700,marginTop:2}}>
            {isDragOver?"놓기":"가능"}
          </span>
        </>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// 피라미드 보드
// ════════════════════════════════════════════════════════════════
function PyramidBoard({board,dragCard,validSlots,onDragOver,onDragLeave,onDrop,hoveredSlot,lastPlaced}){
  const allRows=Object.keys(board).map(Number);
  const maxRow=allRows.length>0?Math.max(...allRows):0;
  const row0Cols=Object.keys(board[0]||{}).map(Number);
  const {min:minCol}=row0Cols.length>0?{min:Math.min(...row0Cols)}:{min:0};
  const {max:maxCol}=row0Cols.length>0?{max:Math.max(...row0Cols)}:{max:0};

  const validRows=[...validSlots].map(k=>parseInt(k.split("c")[0].replace("r",""),10));
  const displayMaxRow=Math.max(maxRow,validRows.length>0?Math.max(...validRows):0);

  const CARD_W=70,CARD_H=96,GAP=8,STEP=CARD_W+GAP;

  const slotsToRender=new Set();
  for(const [r,cols] of Object.entries(board))
    for(const c of Object.keys(cols)) slotsToRender.add(`r${r}c${c}`);
  for(const s of validSlots) slotsToRender.add(s);
  if(dragCard&&slotsToRender.size===0) slotsToRender.add("r0c0");

  if(slotsToRender.size===0&&!dragCard){
    return(
      <div style={{minHeight:140,display:"flex",alignItems:"center",justifyContent:"center",
        color:"rgba(255,255,255,0.3)",fontSize:14,fontStyle:"italic"}}>
        손패에서 카드를 드래그해 여기에 놓으세요
      </div>
    );
  }

  const parsed=[...slotsToRender].map(key=>{
    const [rP,cP]=key.split("c");
    return{key,row:parseInt(rP.replace("r",""),10),col:parseInt(cP,10)};
  });
  const allC=parsed.map(s=>s.col);
  const gMin=Math.min(...allC),gMax=Math.max(...allC);
  const boardW=(gMax-gMin+1)*STEP-GAP+20;
  const boardH=(displayMaxRow+1)*(CARD_H+GAP)-GAP+20;

  return(
    <div style={{position:"relative",width:boardW,height:boardH,margin:"0 auto",minHeight:140}}>
      {parsed.map(({key,row,col})=>{
        const card=(board[row]||{})[col];
        const isValid=validSlots.has(key);
        const isDragOver=hoveredSlot===key;
        const isLastPlaced=lastPlaced&&`r${lastPlaced.row}c${lastPlaced.col}`===key;
        const x=(col-gMin)*STEP+10;
        const y=(displayMaxRow-row)*(CARD_H+GAP)+10;
        return(
          <div key={key} style={{
            position:"absolute",left:x,top:y,
            outline:isLastPlaced?"3px solid #FBBF24":"none",
            outlineOffset:3,borderRadius:12,
            animation:isLastPlaced?"pulseGlow 1.5s ease-in-out infinite":"none",
          }}>
            {card?(
              <MiniCard card={card}/>
            ):(
              <DropSlot slotKey={key} isValid={isValid} isDragOver={isDragOver}
                onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}/>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// 손패 카드 (드래그 가능)
// ════════════════════════════════════════════════════════════════
function HandCard({card,canPlace,onDragStart,disabled}){
  const st=C_STYLE[card.continent]||C_STYLE["전체"];
  const scoreColor=card.score>0?"#059669":card.score<0?"#DC2626":"#7C3AED";
  const [hov,setHov]=useState(false);
  return(
    <div
      draggable={!disabled&&canPlace}
      onDragStart={e=>{
        if(disabled||!canPlace) return;
        e.dataTransfer.effectAllowed="move";
        e.dataTransfer.setData("cardId",card.id);
        const blank=document.createElement("div");
        blank.style.cssText="position:fixed;top:-9999px;left:-9999px;width:1px;height:1px";
        document.body.appendChild(blank);
        e.dataTransfer.setDragImage(blank,0,0);
        setTimeout(()=>document.body.removeChild(blank),0);
        onDragStart(card);
      }}
      onMouseEnter={()=>setHov(true)}
      onMouseLeave={()=>setHov(false)}
      style={{
        width:74,height:102,borderRadius:12,
        border:`2px solid ${st.border}`,
        background:st.bg,
        display:"flex",flexDirection:"column",
        cursor:disabled?"not-allowed":canPlace?"grab":"not-allowed",
        userSelect:"none",flexShrink:0,
        boxShadow:hov&&canPlace&&!disabled?"0 8px 20px rgba(0,0,0,0.3)":"0 2px 6px rgba(0,0,0,0.15)",
        transform:hov&&canPlace&&!disabled?"translateY(-6px)":"translateY(0)",
        transition:"transform 0.15s,box-shadow 0.15s,opacity 0.15s",
        opacity:disabled?0.35:canPlace?1:0.5,
        overflow:"hidden",
        filter:canPlace&&!disabled?"none":"grayscale(0.3)",
      }}
    >
      <div style={{background:st.badge,padding:"3px 4px",textAlign:"center"}}>
        <span style={{color:"#fff",fontSize:9,fontWeight:700,whiteSpace:"nowrap"}}>
          {st.emoji} {card.continent==="전체"?"지구":card.continent.length>3?card.continent.slice(0,3):card.continent}
        </span>
      </div>
      <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",padding:"0 3px"}}>
        <span style={{color:st.text,fontSize:10,fontWeight:700,textAlign:"center",lineHeight:1.3}}>
          {card.name}
        </span>
      </div>
      <div style={{background:"rgba(255,255,255,0.6)",textAlign:"center",padding:"3px 0"}}>
        <span style={{fontSize:13,fontWeight:800,color:scoreColor}}>
          {card.score>0?`+${card.score}`:card.isWild?"★":card.score}
        </span>
      </div>
      {/* 놓을 수 없는 카드 표시 */}
      {!canPlace&&!disabled&&(
        <div style={{
          position:"absolute",inset:0,borderRadius:10,
          background:"rgba(0,0,0,0.08)",
          display:"flex",alignItems:"center",justifyContent:"center",
        }}>
          <span style={{fontSize:16,opacity:0.6}}>🚫</span>
        </div>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// Pass & Play 전환 화면
// ════════════════════════════════════════════════════════════════
function PassScreen({nextPlayerIdx,onReady}){
  const pm=P_META[nextPlayerIdx];
  const [countdown,setCountdown]=useState(3);
  useEffect(()=>{
    if(countdown<=0) return;
    const t=setTimeout(()=>setCountdown(c=>c-1),1000);
    return()=>clearTimeout(t);
  },[countdown]);

  return(
    <div style={{
      position:"fixed",inset:0,zIndex:1000,
      background:"linear-gradient(135deg,#0f172a 0%,#1e1b4b 60%,#0f172a 100%)",
      display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
      gap:24,
    }}>
      {/* 잠금 아이콘 */}
      <div style={{fontSize:56,animation:"bounceIn 0.4s ease-out"}}>🔒</div>
      <div style={{
        textAlign:"center",
        animation:"fadeUp 0.5s ease-out",
      }}>
        <div style={{color:"rgba(255,255,255,0.5)",fontSize:15,marginBottom:8,letterSpacing:1}}>
          화면을 다음 플레이어에게 넘겨주세요
        </div>
        <div style={{
          display:"flex",alignItems:"center",gap:12,justifyContent:"center",
          background:"rgba(255,255,255,0.07)",
          border:`2px solid ${pm.color}`,
          borderRadius:20,padding:"16px 32px",
          boxShadow:`0 0 40px ${pm.color}40`,
        }}>
          <span style={{fontSize:40}}>{pm.avatar}</span>
          <div>
            <div style={{color:"#fff",fontSize:22,fontWeight:900}}>{pm.name}</div>
            <div style={{color:pm.color,fontSize:14,fontWeight:600}}>의 차례입니다</div>
          </div>
        </div>
      </div>

      {/* 준비 버튼 */}
      <button
        onClick={onReady}
        style={{
          background:`linear-gradient(135deg,${pm.grad[0]},${pm.grad[1]})`,
          color:"#fff",border:"none",
          padding:"14px 40px",borderRadius:16,
          fontSize:17,fontWeight:800,cursor:"pointer",
          boxShadow:`0 4px 20px ${pm.color}60`,
          transform:"scale(1)",transition:"transform 0.15s",
          animation:"fadeUp 0.6s ease-out 0.2s both",
        }}
        onMouseEnter={e=>e.currentTarget.style.transform="scale(1.05)"}
        onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}
      >
        ✅ 준비 완료 — 시작하기
      </button>
      <div style={{color:"rgba(255,255,255,0.25)",fontSize:12}}>
        다른 플레이어는 화면을 보지 마세요
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// 게임 결과창
// ════════════════════════════════════════════════════════════════
function ResultScreen({results,hands,penalties,onRestart}){
  // results: [{playerIdx, finalScore, rank}]
  const sorted=[...results].sort((a,b)=>b.finalScore-a.finalScore);
  const winner=sorted[0];

  return(
    <div style={{
      position:"fixed",inset:0,zIndex:1000,
      background:"linear-gradient(135deg,#0f172a 0%,#1e1b4b 50%,#0f172a 100%)",
      display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
      padding:24,overflowY:"auto",
    }}>
      {/* 타이틀 */}
      <div style={{textAlign:"center",marginBottom:24,animation:"bounceIn 0.5s ease-out"}}>
        <div style={{fontSize:52,marginBottom:8}}>🏆</div>
        <h1 style={{color:"#fff",fontSize:28,fontWeight:900,margin:0}}>게임 종료!</h1>
        <div style={{color:"#94A3B8",fontSize:14,marginTop:4}}>
          최종 점수가 가장 높은 플레이어가 승리합니다
        </div>
      </div>

      {/* 승자 하이라이트 */}
      {winner&&(()=>{
        const pm=P_META[winner.playerIdx];
        return(
          <div style={{
            background:`linear-gradient(135deg,${pm.grad[0]},${pm.grad[1]})`,
            borderRadius:20,padding:"16px 32px",
            display:"flex",alignItems:"center",gap:16,
            marginBottom:24,
            boxShadow:`0 8px 32px ${pm.color}60`,
            animation:"fadeUp 0.5s ease-out 0.2s both",
          }}>
            <span style={{fontSize:44}}>🥇</span>
            <div>
              <div style={{color:"rgba(255,255,255,0.8)",fontSize:13}}>우승자</div>
              <div style={{color:"#fff",fontSize:24,fontWeight:900,display:"flex",alignItems:"center",gap:8}}>
                <span>{pm.avatar}</span>{pm.name}
              </div>
              <div style={{color:"rgba(255,255,255,0.9)",fontSize:18,fontWeight:700}}>
                최종 점수: {winner.finalScore>=0?`+${winner.finalScore}`:winner.finalScore}점
              </div>
            </div>
          </div>
        );
      })()}

      {/* 전체 순위 */}
      <div style={{
        width:"100%",maxWidth:480,
        display:"flex",flexDirection:"column",gap:10,
        marginBottom:24,
        animation:"fadeUp 0.5s ease-out 0.35s both",
      }}>
        {sorted.map((r,i)=>{
          const pm=P_META[r.playerIdx];
          const hand=hands[r.playerIdx];
          const pen=penalties[r.playerIdx];
          const handSc=handScore(hand);
          return(
            <div key={r.playerIdx} style={{
              background:i===0?"rgba(251,191,36,0.15)":"rgba(255,255,255,0.06)",
              border:`1.5px solid ${i===0?"#FBBF24":"rgba(255,255,255,0.12)"}`,
              borderRadius:16,padding:"12px 16px",
              display:"flex",alignItems:"center",gap:12,
            }}>
              <span style={{fontSize:26}}>{MEDAL[i]}</span>
              <span style={{fontSize:28}}>{pm.avatar}</span>
              <div style={{flex:1}}>
                <div style={{color:"#fff",fontWeight:800,fontSize:15}}>{pm.name}</div>
                <div style={{color:"#94A3B8",fontSize:11,marginTop:2}}>
                  잔여 카드 점수 {handSc>=0?`+${handSc}`:handSc}
                  {pen<0?` ｜ 벌점 ${pen}`:""} 점
                </div>
                {/* 잔여 카드 */}
                {hand.length>0&&(
                  <div style={{display:"flex",flexWrap:"wrap",gap:4,marginTop:6}}>
                    {hand.map(c=><MiniCard key={c.id} card={c} size="sm"/>)}
                  </div>
                )}
                {hand.length===0&&(
                  <div style={{color:"#34D399",fontSize:11,marginTop:4,fontWeight:600}}>
                    ✅ 모든 카드 소진!
                  </div>
                )}
              </div>
              <div style={{
                background:r.finalScore>=0?"rgba(52,211,153,0.2)":"rgba(248,113,113,0.2)",
                border:`1px solid ${r.finalScore>=0?"#34D399":"#F87171"}`,
                borderRadius:10,padding:"6px 12px",textAlign:"center",
              }}>
                <div style={{color:r.finalScore>=0?"#34D399":"#F87171",fontSize:18,fontWeight:900}}>
                  {r.finalScore>=0?`+${r.finalScore}`:r.finalScore}
                </div>
                <div style={{color:"#94A3B8",fontSize:10}}>점</div>
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={onRestart}
        style={{
          background:"linear-gradient(135deg,#6366F1,#4F46E5)",
          color:"#fff",border:"none",
          padding:"14px 40px",borderRadius:16,
          fontSize:16,fontWeight:800,cursor:"pointer",
          boxShadow:"0 4px 20px rgba(99,102,241,0.5)",
          animation:"fadeUp 0.5s ease-out 0.5s both",
        }}
        onMouseEnter={e=>e.currentTarget.style.opacity="0.85"}
        onMouseLeave={e=>e.currentTarget.style.opacity="1"}
      >
        🔄 새 게임 시작
      </button>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// 지적 확인 모달
// ════════════════════════════════════════════════════════════════
function ChallengeModal({lastPlaced,onConfirm,onCancel}){
  if(!lastPlaced) return null;
  return(
    <div style={{
      position:"fixed",inset:0,zIndex:2000,
      background:"rgba(0,0,0,0.75)",
      display:"flex",alignItems:"center",justifyContent:"center",padding:24,
    }}>
      <div style={{
        background:"#1E293B",border:"2px solid #F87171",
        borderRadius:20,padding:28,maxWidth:380,width:"100%",
        textAlign:"center",boxShadow:"0 20px 60px rgba(0,0,0,0.6)",
        animation:"bounceIn 0.3s ease-out",
      }}>
        <div style={{fontSize:40,marginBottom:12}}>⚠️</div>
        <div style={{color:"#F87171",fontSize:18,fontWeight:900,marginBottom:8}}>
          잘못된 배치 지적!
        </div>
        <div style={{color:"#94A3B8",fontSize:13,marginBottom:16,lineHeight:1.6}}>
          {P_META[lastPlaced.playerIdx].name}이(가) 놓은<br/>
          <strong style={{color:"#fff"}}>"{lastPlaced.card.name}"</strong> 카드의 배치가<br/>
          정말 잘못되었나요?
        </div>
        <div style={{
          background:"rgba(248,113,113,0.1)",border:"1px solid #F87171",
          borderRadius:12,padding:"10px 16px",marginBottom:20,
          color:"#FCA5A5",fontSize:13,
        }}>
          확인 시 카드는 손패로 돌아가고<br/>
          해당 플레이어는 <strong>-3점 벌점</strong>을 받습니다
        </div>
        <div style={{display:"flex",gap:10}}>
          <button onClick={onCancel} style={{
            flex:1,background:"rgba(255,255,255,0.08)",color:"#94A3B8",
            border:"1px solid rgba(255,255,255,0.15)",
            padding:"10px",borderRadius:12,fontSize:14,fontWeight:700,cursor:"pointer",
          }}>
            취소
          </button>
          <button onClick={onConfirm} style={{
            flex:1,background:"linear-gradient(135deg,#EF4444,#DC2626)",color:"#fff",
            border:"none",padding:"10px",borderRadius:12,
            fontSize:14,fontWeight:800,cursor:"pointer",
          }}>
            지적 확정 🚨
          </button>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// 메인 게임 컴포넌트
// ════════════════════════════════════════════════════════════════
export default function ContinentMaster(){
  const [gs,setGs]=useState(()=>initGame());
  const [dragCard,setDragCard]=useState(null);
  const [hoveredSlot,setHoveredSlot]=useState(null);
  const [ghostPos,setGhostPos]=useState(null);
  const [toast,setToast]=useState(null);       // {msg,ok}
  const [showChallenge,setShowChallenge]=useState(false);
  const toastRef=useRef(null);

  // 현재 플레이어
  const currentPlayerIdx=gs.activePlayers[gs.turnIdx]??0;
  const pm=P_META[currentPlayerIdx];
  const currentHand=gs.hands[currentPlayerIdx];

  // 유효 슬롯
  const validSlots=dragCard?computeValidSlots(gs.board,dragCard):new Set();

  // 현재 손패에서 놓을 수 있는 카드들
  const playableIds=new Set(
    currentHand.filter(c=>computeValidSlots(gs.board,c).size>0).map(c=>c.id)
  );

  // 토스트 표시
  const showToast=(msg,ok=true)=>{
    setToast({msg,ok});
    clearTimeout(toastRef.current);
    toastRef.current=setTimeout(()=>setToast(null),3000);
  };

  // 마우스 위치 추적 (고스트용)
  useEffect(()=>{
    const fn=e=>setGhostPos({x:e.clientX,y:e.clientY});
    window.addEventListener("mousemove",fn);
    return()=>window.removeEventListener("mousemove",fn);
  },[]);

  // ── 카드 드래그 시작 ─────────────────────────────────────────
  const handleDragStart=useCallback(card=>{
    setDragCard(card);
  },[]);

  const handleDragEnd=useCallback(()=>{
    setDragCard(null);
    setHoveredSlot(null);
  },[]);

  // ── 카드 드롭 ────────────────────────────────────────────────
  const handleDrop=useCallback((slotKey)=>{
    if(!dragCard||!validSlots.has(slotKey)) return;
    const {row,col}=slotToRC(slotKey);

    setGs(prev=>{
      // 보드에 카드 추가
      const newBoard={
        ...prev.board,
        [row]:{...(prev.board[row]||{}),[col]:dragCard},
      };
      // 손패에서 제거
      const newHands=prev.hands.map((h,i)=>
        i===currentPlayerIdx?h.filter(c=>c.id!==dragCard.id):h
      );

      // 게임 종료 조건 체크는 턴 넘길 때 처리
      return{
        ...prev,
        board:newBoard,
        hands:newHands,
        lastPlaced:{card:dragCard,row,col,playerIdx:currentPlayerIdx,slotKey},
        canChallenge:true,
      };
    });

    showToast(`✅ ${dragCard.name} 배치!`);
    setDragCard(null);
    setHoveredSlot(null);
  },[dragCard,validSlots,currentPlayerIdx]);

  // ── 턴 종료 (다음 플레이어로) ────────────────────────────────
  const handleEndTurn=()=>{
    setGs(prev=>{
      let {hands,activePlayers,turnIdx,penalties,board}=prev;

      // 현재 플레이어 탈락 조건 체크
      const curIdx=activePlayers[turnIdx];
      const curHand=hands[curIdx];
      const eliminated=curHand.length===0||!canPlay(board,curHand);

      let newActive=[...activePlayers];
      let newTurnIdx=turnIdx;

      if(eliminated){
        newActive=activePlayers.filter(i=>i!==curIdx);
        // turnIdx 조정 (제거 후 같은 위치 or wrap)
        newTurnIdx=newActive.length>0?turnIdx%newActive.length:0;
      } else {
        newTurnIdx=(turnIdx+1)%activePlayers.length;
      }

      // 게임 종료: 남은 플레이어가 0명이거나 아무도 낼 수 없으면
      const gameOver=
        newActive.length===0||
        newActive.every(pi=>hands[pi].length===0||!canPlay(board,hands[pi]));

      if(gameOver){
        // 결과 계산: 잔여 손패 점수 + 벌점
        const results=[0,1,2,3].map(pi=>({
          playerIdx:pi,
          finalScore:handScore(hands[pi])+penalties[pi],
        }));
        return{...prev,hands,activePlayers:newActive,penalties,phase:"result",results,lastPlaced:null,canChallenge:false};
      }

      // 다음 플레이어 준비 화면
      const nextPlayerIdx=newActive[newTurnIdx];
      return{
        ...prev,
        activePlayers:newActive,
        turnIdx:newTurnIdx,
        phase:"passScreen",
        passTarget:nextPlayerIdx,
        lastPlaced:null,
        canChallenge:false,
      };
    });
  };

  // ── 패스 화면 → 게임 재개 ───────────────────────────────────
  const handlePassReady=()=>{
    setGs(prev=>({...prev,phase:"playing"}));
  };

  // ── 지적 처리 ────────────────────────────────────────────────
  const handleChallengeConfirm=()=>{
    setGs(prev=>{
      const lp=prev.lastPlaced;
      if(!lp) return prev;
      // 보드에서 카드 제거
      const newBoard={...prev.board};
      if(newBoard[lp.row]){
        newBoard[lp.row]={...newBoard[lp.row]};
        delete newBoard[lp.row][lp.col];
        if(Object.keys(newBoard[lp.row]).length===0) delete newBoard[lp.row];
      }
      // 손패에 되돌리기
      const newHands=prev.hands.map((h,i)=>
        i===lp.playerIdx?[...h,lp.card]:h
      );
      // 벌점 -3
      const newPenalties=[...prev.penalties];
      newPenalties[lp.playerIdx]-=3;
      return{
        ...prev,
        board:newBoard,
        hands:newHands,
        penalties:newPenalties,
        lastPlaced:null,
        canChallenge:false,
      };
    });
    setShowChallenge(false);
    showToast("🚨 지적 확정! -3점 벌점 부여",false);
  };

  // ── 새 게임 ──────────────────────────────────────────────────
  const handleRestart=()=>{
    setGs(initGame());
    setDragCard(null);
    setHoveredSlot(null);
    setToast(null);
    setShowChallenge(false);
  };

  // ─────────────────────────────────────────────────────────────
  // 렌더
  // ─────────────────────────────────────────────────────────────
  const boardScore=Object.values(gs.board)
    .flatMap(row=>Object.values(row))
    .reduce((s,c)=>s+c.score,0);

  const totalPenalty=gs.penalties[currentPlayerIdx];
  const myScore=handScore(currentHand)+totalPenalty;

  // 손패에 카드가 있는데 전부 놓을 수 없는 상태
  const noMovePossible=currentHand.length>0&&!canPlay(gs.board,currentHand);

  return(
    <>
      <style>{`
        @keyframes popIn   { from{transform:scale(0.5);opacity:0} to{transform:scale(1);opacity:1} }
        @keyframes bounceIn{ 0%{transform:scale(0.7);opacity:0} 70%{transform:scale(1.08)} 100%{transform:scale(1);opacity:1} }
        @keyframes fadeUp  { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideDown{ from{opacity:0;transform:translateY(-14px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulseGlow{
          0%,100%{box-shadow:0 0 0 0 rgba(251,191,36,0)}
          50%{box-shadow:0 0 0 6px rgba(251,191,36,0.5)}
        }
        @keyframes shake{
          0%,100%{transform:translateX(0)}
          20%,60%{transform:translateX(-6px)}
          40%,80%{transform:translateX(6px)}
        }
      `}</style>

      {/* ── 드래그 고스트 ── */}
      <DragGhost card={dragCard} pos={ghostPos}/>

      {/* ── Pass & Play 전환 화면 ── */}
      {gs.phase==="passScreen"&&(
        <PassScreen nextPlayerIdx={gs.passTarget} onReady={handlePassReady}/>
      )}

      {/* ── 결과 화면 ── */}
      {gs.phase==="result"&&(
        <ResultScreen
          results={gs.results}
          hands={gs.hands}
          penalties={gs.penalties}
          onRestart={handleRestart}
        />
      )}

      {/* ── 지적 확인 모달 ── */}
      {showChallenge&&(
        <ChallengeModal
          lastPlaced={gs.lastPlaced}
          onConfirm={handleChallengeConfirm}
          onCancel={()=>setShowChallenge(false)}
        />
      )}

      {/* ── 메인 게임 화면 ── */}
      <div
        onDragEnd={handleDragEnd}
        style={{
          minHeight:"100vh",
          background:"linear-gradient(135deg,#1e293b 0%,#0f172a 60%,#1e1b4b 100%)",
          padding:"14px",
          fontFamily:"'Segoe UI','Apple SD Gothic Neo',sans-serif",
        }}
      >
        {/* 토스트 */}
        {toast&&(
          <div style={{
            position:"fixed",top:20,left:"50%",transform:"translateX(-50%)",
            zIndex:500,
            background:toast.ok?"rgba(52,211,153,0.95)":"rgba(248,113,113,0.95)",
            color:"#fff",padding:"10px 24px",borderRadius:999,
            fontSize:14,fontWeight:700,
            boxShadow:"0 4px 20px rgba(0,0,0,0.4)",
            animation:"slideDown 0.2s ease-out",
            whiteSpace:"nowrap",
          }}>{toast.msg}</div>
        )}

        {/* ── 헤더 ── */}
        <div style={{
          display:"flex",alignItems:"center",justifyContent:"space-between",
          marginBottom:14,flexWrap:"wrap",gap:8,
        }}>
          <div>
            <h1 style={{color:"#fff",fontSize:22,fontWeight:900,margin:0}}>🌍 대륙 구분의 달인</h1>
            <p style={{color:"#64748B",fontSize:11,margin:"2px 0 0"}}>Pass & Play · 4인용</p>
          </div>
          {/* 현재 플레이어 배지 */}
          <div style={{
            background:`linear-gradient(135deg,${pm.grad[0]},${pm.grad[1]})`,
            borderRadius:14,padding:"8px 16px",
            display:"flex",alignItems:"center",gap:8,
            boxShadow:`0 2px 12px ${pm.color}50`,
          }}>
            <span style={{fontSize:24}}>{pm.avatar}</span>
            <div>
              <div style={{color:"rgba(255,255,255,0.75)",fontSize:10}}>현재 차례</div>
              <div style={{color:"#fff",fontWeight:800,fontSize:15}}>{pm.name}</div>
            </div>
            <div style={{
              background:"rgba(255,255,255,0.2)",
              borderRadius:8,padding:"4px 8px",
              color:"#fff",fontSize:12,fontWeight:700,
            }}>
              {currentHand.length}장
            </div>
          </div>

          {/* 플레이어 상태 요약 */}
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
            {[0,1,2,3].map(i=>{
              const m=P_META[i];
              const active=gs.activePlayers.includes(i);
              const isCurrent=i===currentPlayerIdx;
              return(
                <div key={i} style={{
                  background:isCurrent?`${m.color}30`:"rgba(255,255,255,0.04)",
                  border:`1.5px solid ${isCurrent?m.color:"rgba(255,255,255,0.1)"}`,
                  borderRadius:10,padding:"5px 10px",
                  opacity:active?1:0.35,
                  display:"flex",alignItems:"center",gap:5,
                }}>
                  <span style={{fontSize:14}}>{m.avatar}</span>
                  <span style={{color:active?"#fff":"#475569",fontSize:11,fontWeight:600}}>{m.name.replace("플레이어 ","P")}</span>
                  <span style={{color:"#94A3B8",fontSize:10}}>{gs.hands[i].length}장</span>
                  {gs.penalties[i]<0&&(
                    <span style={{color:"#F87171",fontSize:10,fontWeight:700}}>{gs.penalties[i]}</span>
                  )}
                  {!active&&<span style={{fontSize:10}}>🚫</span>}
                </div>
              );
            })}
          </div>
        </div>

        <div style={{maxWidth:1100,margin:"0 auto",display:"flex",flexDirection:"column",gap:14}}>

          {/* ── 피라미드 보드 ── */}
          <div style={{
            background:"rgba(255,255,255,0.04)",
            borderRadius:20,border:"1.5px solid rgba(255,255,255,0.1)",
            padding:"16px",backdropFilter:"blur(8px)",
          }}>
            {/* 보드 상단 바 */}
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12,flexWrap:"wrap",gap:8}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <span style={{color:"#fff",fontWeight:800,fontSize:15}}>🏔 피라미드 보드</span>
                <span style={{color:"#64748B",fontSize:12}}>
                  {Object.values(gs.board).reduce((s,r)=>s+Object.keys(r).length,0)}장
                </span>
                {dragCard&&(
                  <span style={{
                    background:"rgba(99,102,241,0.2)",border:"1px solid #818CF8",
                    color:"#A5B4FC",fontSize:11,padding:"3px 10px",borderRadius:999,fontWeight:600,
                    animation:"fadeUp 0.2s",
                  }}>
                    드래그 중: {dragCard.name} · 유효 {validSlots.size}곳
                  </span>
                )}
              </div>
              <div style={{display:"flex",gap:8,alignItems:"center"}}>
                {/* 지적하기 버튼 */}
                <button
                  onClick={()=>setShowChallenge(true)}
                  disabled={!gs.canChallenge}
                  style={{
                    background:gs.canChallenge
                      ?"linear-gradient(135deg,#EF4444,#DC2626)"
                      :"rgba(255,255,255,0.06)",
                    color:gs.canChallenge?"#fff":"#475569",
                    border:gs.canChallenge?"none":"1px solid rgba(255,255,255,0.1)",
                    padding:"7px 14px",borderRadius:10,
                    fontSize:12,fontWeight:700,
                    cursor:gs.canChallenge?"pointer":"not-allowed",
                    transition:"all 0.2s",
                    boxShadow:gs.canChallenge?"0 2px 12px rgba(239,68,68,0.4)":"none",
                    animation:gs.canChallenge?"pulseGlow 2s infinite":"none",
                  }}
                >
                  🚨 잘못된 배치 지적하기
                </button>
                <span style={{
                  background:boardScore>=0?"rgba(52,211,153,0.15)":"rgba(248,113,113,0.15)",
                  border:`1px solid ${boardScore>=0?"#34D399":"#F87171"}`,
                  color:boardScore>=0?"#34D399":"#F87171",
                  fontSize:12,padding:"6px 14px",borderRadius:10,fontWeight:700,
                }}>
                  보드 {boardScore>=0?`+${boardScore}`:boardScore}점
                </span>
              </div>
            </div>

            {/* 규칙 한줄 요약 */}
            <div style={{
              display:"flex",flexWrap:"wrap",gap:5,marginBottom:12,
            }}>
              {["1층 최대 10장 · 양옆 확장","2층+: 아래 두 칸 사이만 배치","아래 카드 1개 이상 대륙 일치 필수","🌐 지구카드=조커"].map(t=>(
                <span key={t} style={{
                  background:"rgba(255,255,255,0.06)",color:"#94A3B8",
                  fontSize:10,padding:"2px 8px",borderRadius:5,
                }}>{t}</span>
              ))}
            </div>

            {/* 보드 */}
            <div style={{overflowX:"auto",paddingBottom:4}}>
              <PyramidBoard
                board={gs.board}
                dragCard={dragCard}
                validSlots={validSlots}
                onDragOver={setHoveredSlot}
                onDragLeave={()=>setHoveredSlot(null)}
                onDrop={handleDrop}
                hoveredSlot={hoveredSlot}
                lastPlaced={gs.lastPlaced}
              />
            </div>
          </div>

          {/* ── 손패 + 턴 액션 ── */}
          <div style={{
            borderRadius:20,overflow:"hidden",
            border:`2px solid ${pm.border}`,
            background:pm.light,
            boxShadow:`0 4px 20px rgba(0,0,0,0.25)`,
          }}>
            {/* 손패 헤더 */}
            <div style={{
              background:`linear-gradient(135deg,${pm.grad[0]},${pm.grad[1]})`,
              padding:"10px 16px",
              display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:8,
            }}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <span style={{fontSize:26}}>{pm.avatar}</span>
                <div>
                  <div style={{color:"rgba(255,255,255,0.8)",fontSize:11}}>현재 차례</div>
                  <div style={{color:"#fff",fontWeight:900,fontSize:16}}>{pm.name}의 손패</div>
                </div>
              </div>
              <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
                <span style={{
                  background:"rgba(255,255,255,0.2)",color:"#fff",
                  fontSize:12,padding:"4px 12px",borderRadius:8,fontWeight:600,
                }}>🃏 {currentHand.length}장 보유</span>
                <span style={{
                  background:myScore>=0?"rgba(52,211,153,0.3)":"rgba(248,113,113,0.3)",
                  color:"#fff",fontSize:12,padding:"4px 12px",borderRadius:8,fontWeight:700,
                }}>
                  내 점수: {myScore>=0?`+${myScore}`:myScore}
                </span>
                {totalPenalty<0&&(
                  <span style={{
                    background:"rgba(248,113,113,0.3)",color:"#FCA5A5",
                    fontSize:11,padding:"3px 10px",borderRadius:8,fontWeight:600,
                  }}>
                    벌점 {totalPenalty}
                  </span>
                )}
              </div>
            </div>

            {/* 카드 목록 */}
            <div style={{padding:"12px 14px",display:"flex",flexWrap:"wrap",gap:8,minHeight:110}}>
              {currentHand.length===0?(
                <div style={{
                  width:"100%",display:"flex",alignItems:"center",justifyContent:"center",
                  color:"#16A34A",fontSize:14,fontWeight:700,gap:6,
                }}>
                  ✅ 모든 카드를 냈습니다! 턴 종료를 눌러주세요.
                </div>
              ):noMovePossible?(
                <div style={{
                  width:"100%",display:"flex",flexDirection:"column",
                  alignItems:"center",justifyContent:"center",gap:8,
                }}>
                  <div style={{color:"#F87171",fontSize:13,fontWeight:700}}>
                    ⛔ 놓을 수 있는 카드가 없습니다. 게임에서 제외됩니다.
                  </div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:6,justifyContent:"center"}}>
                    {[...currentHand].sort((a,b)=>a.continent.localeCompare(b.continent,"ko")||a.score-b.score)
                      .map(card=><HandCard key={card.id} card={card} canPlace={false} onDragStart={()=>{}} disabled={true}/>)}
                  </div>
                </div>
              ):(
                [...currentHand].sort((a,b)=>a.continent.localeCompare(b.continent,"ko")||a.score-b.score)
                  .map(card=>(
                    <HandCard
                      key={card.id}
                      card={card}
                      canPlace={playableIds.has(card.id)}
                      onDragStart={handleDragStart}
                      disabled={false}
                    />
                  ))
              )}
            </div>

            {/* 턴 액션 바 */}
            <div style={{
              borderTop:`1px solid ${pm.border}`,
              padding:"10px 14px",
              display:"flex",alignItems:"center",justifyContent:"space-between",
              background:"rgba(255,255,255,0.4)",flexWrap:"wrap",gap:8,
            }}>
              <div style={{color:"#64748B",fontSize:12}}>
                {noMovePossible
                  ?"놓을 수 없는 경우 바로 턴 종료를 눌러주세요"
                  :currentHand.length===0
                  ?"카드를 모두 냈습니다!"
                  :`초록 테두리 카드만 드래그 가능 (${playableIds.size}/${currentHand.length}장 가능)`}
              </div>
              <button
                onClick={handleEndTurn}
                style={{
                  background:`linear-gradient(135deg,${pm.grad[0]},${pm.grad[1]})`,
                  color:"#fff",border:"none",
                  padding:"10px 24px",borderRadius:12,
                  fontSize:14,fontWeight:800,cursor:"pointer",
                  boxShadow:`0 3px 14px ${pm.color}50`,
                  transition:"opacity 0.15s,transform 0.15s",
                }}
                onMouseEnter={e=>{e.currentTarget.style.opacity="0.85";e.currentTarget.style.transform="scale(1.03)";}}
                onMouseLeave={e=>{e.currentTarget.style.opacity="1";e.currentTarget.style.transform="scale(1)";}}
              >
                ▶ 턴 종료 &amp; 다음 플레이어
              </button>
            </div>
          </div>

          {/* ── 대륙 범례 ── */}
          <div style={{
            background:"rgba(255,255,255,0.04)",borderRadius:14,
            padding:"12px 14px",border:"1px solid rgba(255,255,255,0.08)",
          }}>
            <div style={{color:"#64748B",fontSize:11,fontWeight:700,marginBottom:7}}>📊 대륙 범례</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
              {Object.entries(C_STYLE).map(([cont,st])=>(
                <div key={cont} style={{
                  display:"flex",alignItems:"center",gap:5,
                  background:st.bg,border:`1.5px solid ${st.border}`,
                  borderRadius:7,padding:"3px 8px",
                }}>
                  <span style={{fontSize:11}}>{st.emoji}</span>
                  <span style={{color:st.text,fontSize:10,fontWeight:700}}>{cont}</span>
                </div>
              ))}
              <div style={{display:"flex",gap:12,alignItems:"center",marginLeft:8}}>
                <span style={{color:"#6EE7B7",fontSize:10}}>🟢 +점 = 내기 쉬움</span>
                <span style={{color:"#FCA5A5",fontSize:10}}>🔴 -점 = 내기 어려움</span>
                <span style={{color:"#C4B5FD",fontSize:10}}>⭐ 지구=조커</span>
              </div>
            </div>
          </div>

        </div>{/* maxWidth container */}
      </div>{/* main bg */}
    </>
  );
}
