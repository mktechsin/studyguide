// Pages container
const pagesContainer = document.getElementById("pages-container");
const sidebar = document.querySelector(".sidebar");
const tocContent = document.getElementById("toc");
const tocToggle = document.getElementById("toc-toggle");

// Dark mode toggle
function toggleDark(){ document.body.classList.toggle("dark"); }

// Hamburger
function toggleSidebar(){ sidebar.classList.toggle("show"); }

// Load guide pages dynamically
async function loadPages(){
    const guideFiles = ["guides/powerbi.html", "guides/sql.html", "guides/azure.html"];
    for(const file of guideFiles){
        const res = await fetch(file);
        const html = await res.text();
        pagesContainer.insertAdjacentHTML("beforeend", html);
    }
    initSidebar();
    showPage("home");
}

// Initialize sidebar based on loaded pages
function initSidebar(){
    const pages = Array.from(document.querySelectorAll(".page"));
    sidebar.innerHTML = "<h3>📘 Notes</h3>";
    pages.forEach(p => {
        const div = document.createElement("div");
        const title = p.querySelector("h1")?.innerText || p.id;
        div.innerText = title;
        div.onclick = ()=> showPage(p.id);
        sidebar.appendChild(div);
    });
}

// Show selected page
function showPage(id){
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    const page = document.getElementById(id);
    if(page) page.classList.add("active");
    highlightSidebar(id);
    generateTOC();
    if(window.innerWidth <= 768) sidebar.classList.remove("show");
}

// Highlight sidebar
function highlightSidebar(id){
    Array.from(sidebar.querySelectorAll("div")).forEach(div=>{
        div.style.fontWeight = (div.innerText === document.getElementById(id)?.querySelector("h1")?.innerText) ? "bold" : "normal";
    });
}

// TOC
tocToggle.onclick = () => {
    if(tocContent.style.display==="none"){
        tocContent.style.display="block";
        tocToggle.innerText="Hide TOC ▲";
    } else {
        tocContent.style.display="none";
        tocToggle.innerText="Show TOC ▼";
    }
};
function generateTOC(){
    tocContent.innerHTML="<b>Contents:</b><br>";
    document.querySelectorAll(".page.active h1, .page.active h2, .page.active h3").forEach((h,i)=>{
        if(!h.id) h.id="heading-"+i;
        const link=document.createElement("a");
        link.href="#"+h.id;
        link.innerText=h.innerText;
        link.style.marginLeft = h.tagName==="H2"?"10px":h.tagName==="H3"?"20px":"0px";
        link.onclick = e=> { e.preventDefault(); document.getElementById(h.id).scrollIntoView({behavior:"smooth"}); };
        tocContent.appendChild(link);
    });
}

// Search
document.getElementById("search").addEventListener("input", function(){
    const val = this.value.toLowerCase();
    document.querySelectorAll(".page.active *").forEach(el=>{
        if(el.children.length===0) el.style.display = el.innerText.toLowerCase().includes(val)?"":"none";
    });
});

// Load everything
window.onload = loadPages;