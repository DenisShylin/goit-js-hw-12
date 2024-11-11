import{a as p,S as b}from"./assets/vendor-CzqEfwIO.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function a(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(e){if(e.ep)return;e.ep=!0;const o=a(e);fetch(e.href,o)}})();const L="46842310-1eff6901abe3b896058131b9e",w="https://pixabay.com/api/";async function y(s,t=1){const a=new URLSearchParams({key:L,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:t});return(await p.get(`${w}?${a}`)).data}function S({webformatURL:s,largeImageURL:t,tags:a,likes:r,views:e,comments:o,downloads:i}){return`
    <li class="gallery-item">
      <a class="gallery-link" href="${t}">
        <img class="gallery-image" src="${s}" alt="${a}" loading="lazy" />
        <div class="image-info">
          <p class="info-item"><b>Likes:</b> ${r}</p>
          <p class="info-item"><b>Views:</b> ${e}</p>
          <p class="info-item"><b>Comments:</b> ${o}</p>
          <p class="info-item"><b>Downloads:</b> ${i}</p>
        </div>
      </a>
    </li>
  `}function g(s,t,a=!1){const r=s.map(S).join("");a?t.insertAdjacentHTML("beforeend",r):t.innerHTML=r}function c(s,t,a){const r=document.querySelector(".load-more");r&&(s&&a<t?r.style.display="block":r.style.display="none")}function u(s){const t=document.querySelector(".loader");t.style.display=s?"block":"none"}function f(s){const t=document.querySelector(".end-message");t&&(t.style.display=s?"block":"none")}let d=1,h="",m=null,l=0,n=0;document.addEventListener("DOMContentLoaded",()=>{const s=document.querySelector(".search-form"),t=document.querySelector(".gallery");document.body.insertAdjacentHTML("beforeend",`
    <button type="button" class="load-more" style="display: none;">Load more</button>
    <p class="end-message" style="display: none; text-align: center;">
      We're sorry, but you've reached the end of search results.
    </p>
    `);const a=document.querySelector(".load-more");m=new b(".gallery a",{captionsData:"alt",captionDelay:250}),s.addEventListener("submit",async r=>{r.preventDefault();const e=r.target.elements.searchQuery.value.trim();if(e){h=e,d=1,n=0;try{u(!0),c(!1),f(!1);const o=await y(e,d);if(l=o.totalHits,n=o.hits.length,o.hits.length===0){alert("Sorry, there are no images matching your search query. Please try again.");return}g(o.hits,t),m.refresh(),c(!0,l,n),n>=l&&f(!0)}catch(o){console.error("Error fetching images:",o),alert("An error occurred while fetching images. Please try again.")}finally{u(!1)}}}),a.addEventListener("click",async()=>{d+=1;try{u(!0),c(!1);const r=await y(h,d);n+=r.hits.length,g(r.hits,t,!0),m.refresh();const{height:e}=t.firstElementChild.getBoundingClientRect();window.scrollBy({top:e*2,behavior:"smooth"}),c(!0,l,n),n>=l&&f(!0)}catch(r){console.error("Error fetching more images:",r),alert("An error occurred while fetching more images. Please try again.")}finally{u(!1)}})});
//# sourceMappingURL=index.js.map
