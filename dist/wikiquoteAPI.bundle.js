"use strict";(self.webpackChunkquotes_emojis=self.webpackChunkquotes_emojis||[]).push([[628],{1814:(e,t,o)=>{o.d(t,{R:()=>l,s:()=>u});var n=o(698),s=o(4295);const r="fr",i=["Coluche","Dieudonné","Pierre_Desproges","Chevaliers_du_fiel","Anthony_Kavanagh","Jean-Marie_Bigard","Laurent_Gerra","Patrick_Sébastien"];let a=0,c="";function l(e){statusResults.innerHTML="",fetch(`https://${r}.wikiquote.org/w/api.php?format=json&action=opensearch&search=${e}`).then((e=>{if(200===e.status)return e.text()})).then((e=>{const t=JSON.parse(e);console.log(t),t[1].forEach(((e,t)=>{const o=t+e.replace(/\s/g,""),n=document.createElement("div");n.id=o,n.className="elementResult",n.innerHTML=e,statusResults.appendChild(n),n.addEventListener("click",(function(){u(e),resultResearch.style.display="none"}))}))})).catch((e=>{console.log(e)}))}function u(e=i[Math.floor(Math.random()*i.length)]){console.log("appelsWikiQuote()"),c=e,console.log(c),fetch(`https://${r}.wikiquote.org/w/api.php?action=query&format=json&titles=${c}`).then((e=>{if(200===e.status)return e.text()})).then((e=>{const t=JSON.parse(e).query.pages;let o=-1;for(let e in t){let n=t[e];if(!("missing"in n)){o=n.pageid;break}}a=o,fetch(`https://${r}.wikiquote.org/w/api.php?format=json&action=parse&pageid=${a}&section=1`).then((e=>{if(200===e.status)return e.text()})).then((e=>{document.querySelector("#emojis").innerHTML="";const t=JSON.parse(e).parse.text["*"],o=(0,n.parse)(t).querySelectorAll(".citation"),r=o[Math.floor(Math.random()*o.length)];document.querySelector("#quoteLine").innerHTML=r,quoteAuthor.href=`https://fr.wikipedia.org/wiki/${c}`,quoteAuthor.innerHTML=c,quoteAuthor.target="_blank",(0,s.E)(c).then((e=>{const t=e;console.log("imageWikipedia "+t),document.querySelector("#imageAuthor").innerHTML=t})),document.querySelector("#quoteLoader").style.display="none",document.querySelector("#quoteContent").style.visibility="visible"})).catch((e=>{console.log(e)}))})).catch((e=>{console.log(e)}))}}},e=>{e.O(0,[899],(()=>(1814,e(e.s=1814)))),e.O()}]);