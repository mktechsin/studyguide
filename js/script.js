// Pages & sidebar
const sidebar = document.querySelector(".sidebar");
const PAGES = Array.from(document.querySelectorAll(".page")).map(p=>p.id);

// Populate sidebar
function buildSidebar() {
    sidebar.innerHTML = "<h3>📘 Notes</h3>";
    PAGES.forEach(id=>{
        const title = document.getElementById(id).querySelector("h1")?.innerText || id;
        const div = document.createElement("div");
        div.innerText = title;
        div.onclick = ()=>{ 
            PAGES.forEach(pid=>document.getElementById(pid).classList.remove("active"));
            document.getElementById(id).classList.add("active");
            if(window.innerWidth<=768) sidebar.classList.remove("show");
            highlightSidebar(id);
            generateTOC();
        };
        sidebar.appendChild(div);
    });
}

// Highlight sidebar
function highlightSidebar(activeId){
    sidebar.querySelectorAll("div").forEach((div,i)=>{
        div.style.fontWeight = (PAGES[i]===activeId)?"bold":"normal";
    });
}

// Hamburger toggle
function toggleSidebar(){ sidebar.classList.toggle("show"); }
window.toggleSidebar = toggleSidebar;

// Dark mode toggle
function toggleDark(){ document.body.classList.toggle("dark"); }
window.toggleDark = toggleDark;

// TOC toggle
const tocToggle = document.getElementById("toc-toggle");
const tocContent = document.getElementById("toc");
tocToggle.onclick = ()=>{
    if(tocContent.style.display==="none"){ 
        tocContent.style.display="block"; 
        tocToggle.innerText="Hide TOC ▲"; 
    } else { 
        tocContent.style.display="none"; 
        tocToggle.innerText="Show TOC ▼"; 
    }
};

// Generate TOC
function generateTOC(){
    tocContent.innerHTML = "<b>Contents:</b><br>";
    document.querySelectorAll(".page.active h1, .page.active h2, .page.active h3").forEach((h,i)=>{
        if(!h.id) h.id = "heading-" + i;
        const link = document.createElement("a");
        link.href = "#" + h.id;
        link.innerText = h.innerText;
        link.style.marginLeft = h.tagName==="H2"?"10px":h.tagName==="H3"?"20px":"0px";
        link.onclick = (e)=>{ 
            e.preventDefault(); 
            document.getElementById(h.id).scrollIntoView({behavior:"smooth"}); 
        };
        tocContent.appendChild(link);
    });
}

// Block templates
const BLOCK_TEMPLATES = {
    note: `<div class="box note">New Note</div>`,
    code: `<div class="code"><button class="copy-btn">Copy</button><pre>code here</pre></div>`,
    syntax: `<div class="syntax">syntax here</div>`,
    table: `<table><tr><th>Col1</th><th>Col2</th></tr><tr><td>1</td><td>2</td></tr></table>`,
    list: `<ul><li>Item</li></ul>`,
    collapsible: `<button class="collapsible">Open</button><div class="content-box">Content</div>`,
    diagram: `<div class="diagram">A → B → C</div>`
};
const templatePage = document.getElementById("template");
if(templatePage){
    Object.keys(BLOCK_TEMPLATES).forEach(type=>{
        const btn = document.createElement("button");
        btn.className = "template-btn";
        btn.innerText = `Add ${type.charAt(0).toUpperCase()+type.slice(1)}`;
        btn.onclick = ()=>{ navigator.clipboard.writeText(BLOCK_TEMPLATES[type]); alert("Block copied! Paste in notes page."); };
        templatePage.appendChild(btn);
    });
}

// Copy code blocks
document.addEventListener("click", e=>{
    if(e.target.classList.contains("copy-btn")){
        let code=e.target.nextElementSibling.innerText;
        navigator.clipboard.writeText(code);
        e.target.innerText="Copied!";
    }
});

// Collapsible
document.addEventListener("click", e=>{
    if(e.target.classList.contains("collapsible")){
        let c=e.target.nextElementSibling;
        c.style.display = (c.style.display==="block")?"none":"block";
    }
});

// Search
document.getElementById("search")?.addEventListener("input", function(){
    let val=this.value.toLowerCase();
    document.querySelectorAll(".page.active *").forEach(el=>{
        if(el.children.length===0){
            el.style.display = el.innerText.toLowerCase().includes(val)?"":"none";
        }
    });
});

// Initialize
window.onload = ()=>{
    buildSidebar();
    highlightSidebar("home");
    generateTOC();
};