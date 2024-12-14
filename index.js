import{a as y,S as b,i as p}from"./assets/vendor-DEenWwFD.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const d of o.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&s(d)}).observe(document,{childList:!0,subtree:!0});function l(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(r){if(r.ep)return;r.ep=!0;const o=l(r);fetch(r.href,o)}})();const L="47416183-73bb296483032a9a16a802376",w="https://pixabay.com/api/";function m(t,e=1,l=15){return y.get(w,{params:{key:L,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,page:e,per_page:l}}).then(s=>s.data).catch(s=>{throw console.error("Error fetching images:",s),new Error("Failed to fetch images.")})}function v(t){return t.map(e=>`
        <div class="photo-card">
            <a href="${e.largeImageURL}" class="gallery-link" title="${e.tags.replace(/,/g," ")}">
                <img src="${e.webformatURL}" alt="${e.tags}" loading="lazy" class="gallery-image" />
            </a>
            <div class="info">
                <p>
                    <span class="info-item"><b>Likes:</b> ${e.likes}</span>
                    <span class="info-item"><b>Views:</b> ${e.views}</span>
                    <span class="info-item"><b>Comments:</b> ${e.comments}</span>
                    <span class="info-item"><b>Downloads:</b> ${e.downloads}</span>
                </p>
            </div>
        </div>
    `).join("")}const g=document.querySelector("#search-form"),E=g.querySelector('input[name="searchQuery"]'),c=document.querySelector(".gallery"),S=document.querySelector("#loader"),u=document.querySelector("#load-more"),q=new b(".gallery a",{captions:!0,captionsData:"title",captionType:"attr",captionSelector:"self",captionDelay:250});let i="",a=1;const f=15;function n(t){S.classList.toggle("hidden",!t)}function h(t){const e=v(t.hits);c.insertAdjacentHTML("beforeend",e),q.refresh(),$(t.totalHits)}function $(t){a*f>=t?(u.classList.add("hidden"),p.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):u.classList.remove("hidden")}function P(){if(!c.firstElementChild)return;const{height:t}=c.firstElementChild.getBoundingClientRect();window.scrollBy({top:t*2})}g.addEventListener("submit",async t=>{if(t.preventDefault(),i=E.value.trim(),a=1,c.innerHTML="",!!i){n(!0);try{const e=await m(i,a,f);if(n(!1),!e.hits||e.hits.length===0){p.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}h(e)}catch(e){n(!1),console.error("Error fetching images:",e)}}});u.addEventListener("click",async()=>{n(!0);try{a+=1;const t=await m(i,a,f);h(t),P()}catch(t){console.error("Error loading more images:",t)}finally{n(!1)}});
//# sourceMappingURL=index.js.map
