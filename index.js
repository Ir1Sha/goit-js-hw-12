import{S as f,i as d}from"./assets/vendor-5ObWk2rO.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function s(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(t){if(t.ep)return;t.ep=!0;const r=s(t);fetch(t.href,r)}})();function p(o){return fetch(`https://pixabay.com/api/?key=47416183-73bb296483032a9a16a802376&q=${o}&image_type=photo&orientation=horizontal&safesearch=true`).then(n=>{if(!n.ok)throw new Error("Sorry, there are no images matching your search query. Please try again!");return n.json()})}function m(o){return o.map(e=>`
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
    `).join("")}const u=document.querySelector("#search-form"),h=u.querySelector('input[name="searchQuery"]'),c=document.querySelector(".gallery"),l=document.querySelector("#loader"),y=new f(".gallery a",{captions:!0,captionsData:"title",captionType:"attr",captionSelector:"self",captionDelay:250});function a(o){o?l.classList.remove("hidden"):l.classList.add("hidden")}u.addEventListener("submit",o=>{o.preventDefault();const e=h.value.trim();c.innerHTML="",e&&(a(!0),p(e).then(s=>{if(a(!1),!s.hits||s.hits.length===0){d.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}const n=m(s.hits);c.insertAdjacentHTML("beforeend",n),y.refresh()}).catch(s=>{a(!1),console.error(s)}))});
//# sourceMappingURL=index.js.map
