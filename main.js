let arrImgs = ["1", "2", "3", "4", "5"];
let landingPage = document.querySelector(".landing-page");
let gear = document.querySelector(".fa-gear");
let span = document.querySelector(".setting > span");
let setting = document.querySelector(".setting");
let overlay2 = document.querySelector(".overlay2");
let Colors = document.querySelectorAll(".setting .colors ul li");
let randomBackground = document.querySelectorAll(".setting .random-background ul li");
let img = document.querySelector(".about-us .imgs img");
let arrow_up = document.querySelector(".arrow-up");
let imgCounter;
let scroll = document.querySelector(".scroll");
let skills = document.querySelector(".skills");
let spans = document.querySelectorAll(".skills .skill div span");
let percentages = document.querySelectorAll(".skills .skill .percentage");
let imgs = document.querySelectorAll(".gallery .image img");
let bars = document.querySelector(".bars");
let linksParent = document.getElementById("links");
let bullets = document.querySelector(".bullets");
let liBullets = document.querySelectorAll(".setting .random-background + div ul li");
let resetBtn = document.querySelector(".setting > button");
let bulletOne = document.querySelectorAll(".bullet.one");
let bulletTwo = document.querySelectorAll(".bullet.two");

let flag = true;
let showBullets = true;

document.querySelector(".date").innerHTML = new Date().getFullYear();
document.body.offsetWidth > 900 ? greaterThan900px() : lessThan900px();
window.onresize = () => document.body.offsetWidth > 900 ? greaterThan900px() : lessThan900px();
function greaterThan900px() {
    document.querySelector(".line").style.top = `0px`;
    document.querySelector(".Date").style.top = `0px`;
    document.querySelector(".bullet.one").style.top = `60px`;
    bulletTwo.forEach(bullet => bullet.style.top = `${document.querySelector(".timeline .left").offsetHeight + 60}px`);
}
function lessThan900px() {
    document.querySelector(".line").style.top = `${document.querySelector(".timeline .left").offsetHeight + 40}px`;
    document.querySelector(".Date").style.top = `${document.querySelector(".timeline .left").offsetHeight + 40}px`;
    document.querySelector(".bullet.one").style.top = `${document.querySelector(".timeline .left").offsetHeight + 40}px`;
    bulletTwo.forEach(e => e.style.top = `${document.querySelector(".timeline .left").offsetHeight + 40}px`);
}
let allLinksOfSections = document.querySelectorAll("body > *").forEach(e => {
    if (e.dataset.categ) {
        linksParent.innerHTML += `<li class="text-center position-relative w-100"><a href="#" class="text-decoration-none text-capitalize">${e.dataset.categ}</a></li>`;
        bullets.innerHTML += `<div class="sec d-flex align-items-center"><span class="bullet"></span><div class="sec-name fw-bold position-relative">${e.dataset.categ}</div></div>`;
    }
    bullets.querySelectorAll(".bullet").forEach((bullet, index) => {
        bullet.onclick = function () {
            document.querySelector(`.${document.querySelectorAll(".sec-name")[index].innerHTML}`).scrollIntoView({
                behavior:"smooth"
            });
        }
    })
})
bars.onclick = function(e) {
    e.stopPropagation();
    linksParent.classList.toggle("active");
} 
let links = linksParent.querySelectorAll("li").forEach(li => 
    li.onclick =  (e) => {
        e.preventDefault();
        linksParent.classList.remove("active");
        document.querySelector(`.${li.querySelector("a").innerHTML}`).scrollIntoView({
            behavior: "smooth"
        });
    }
)
liBullets.forEach(li => 
    li.onclick =  function ()  {
        liBullets.forEach(li => li.classList.remove("active"));
        this.classList.add("active");
        if (this.classList.contains("no")) {
            bullets.style.setProperty("display", "none", "important");
            showBullets = false;
        } else {
            bullets.style.setProperty("display", "flex" , "important"); 
            showBullets = true;
        }
        localStorage.setItem("showbullets", showBullets);
    }
)
resetBtn.onclick = () => {
    localStorage.clear();
    location.reload();
} 
imgs.forEach(img => {
    img.onclick =  () => {
        let overlay3 = document.createElement("div");
        overlay3.className = "overlay3";
        document.body.appendChild(overlay3);
        let parent = document.createElement("div");
        parent.className = "parent";
        overlay3.appendChild(parent);
        let currentImg = document.createElement("img");
        currentImg.src = img.src;
        parent.appendChild(currentImg);
        let h4 = document.createElement("h4");
        let text = document.createTextNode(img.alt);
        h4.appendChild(text);
        parent.prepend(h4);
        let x = document.createElement("button");
        x.innerHTML = "X";
        parent.append(x);
        x.onclick = () => x.closest(".overlay3").remove();
        overlay3.onclick = () => overlay3.remove();
    }
})
spans.forEach((span, index) => percentages[index].innerHTML = span.dataset.percentage);
window.onscroll = function()  {
    arrow_up.style.right = scrollY ? "20px" : "-43px"; 
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    scroll.style.width = `${Math.ceil((document.documentElement.scrollTop / height) * 100)}%`;
    if (scrollY > skills.offsetTop + skills.offsetHeight - this.innerHeight - 300) 
        spans.forEach(span => span.style.width = span.dataset.percentage);
}
arrow_up.style.right = scrollY ? "20px" : "-43px"
arrow_up.onclick = () => window.scrollTo({
    top: "0",
    left: "0",
    behavior: "smooth"
});
// Start local Storage
if (localStorage.getItem("showbullets")) {
    liBullets.forEach(li => {
        if (localStorage.getItem("showbullets") === "true") {
            if (li.classList.contains("yes")) 
                li.classList.add("active");
            else 
                li.classList.remove("active");
        } else {
            if (li.classList.contains("yes")) 
                li.classList.remove("active");
            else
                li.classList.add("active");
        } 
    });
    if (localStorage.getItem("showbullets") === "false") 
        bullets.style.setProperty("display", "none", "important");
    else 
        bullets.style.setProperty("display", "flex", "important");
}
if (localStorage.getItem("img")) {
    landingPage.style.backgroundImage = `url(imgs/${localStorage.getItem("img")}.jpg)`;
    if (localStorage.getItem("flag") === "false") {
        flag = false;
        randomBackground.forEach(li => li.classList.contains("yes") ? li.classList.remove("active") : li.classList.add("active"));
    }
}
if (localStorage.getItem("color")) {
    document.documentElement.style.setProperty("--main-color", localStorage.getItem("color"));
    img.src = localStorage.getItem("color") === "#FF5722" ? `imgs/6.jpg` : localStorage.getItem("color") === "#e91e63" ? `imgs/7.jpg` : localStorage.getItem("color") === "#3f51b5" ? `imgs/8.jpg` : localStorage.getItem("color") === "#009688" ? `imgs/9.jpg` : `imgs/10.jpg`;
    Colors.forEach(color => color.dataset.color === localStorage.getItem("color") ? color.classList.add("active") : color.classList.remove("active"));
}
// End local Storage
function randomizeImgs() {
    if (flag) {
        imgCounter = setInterval(() => {
            let randomImg = Math.floor(Math.random() * arrImgs.length);
            landingPage.style.backgroundImage = `url(imgs/${arrImgs[randomImg]}.jpg)`;
            localStorage.setItem("img", arrImgs[randomImg]);
        }, 4000);
    }
}
randomizeImgs();
Colors.forEach(color => {
    color.style.background = color.dataset.color;
    color.addEventListener("click", () => {
        img.src = color.dataset.color === "#FF5722" ? `imgs/6.jpg` : color.dataset.color === "#e91e63" ? `imgs/7.jpg` : color.dataset.color === "#3f51b5" ? `imgs/8.jpg` : color.dataset.color === "#009688" ? `imgs/9.jpg` : `imgs/10.jpg`;
        document.documentElement.style.setProperty("--main-color", color.dataset.color);
        localStorage.setItem("color", color.dataset.color);
        Colors.forEach(color => color.classList.remove("active"));
        color.classList.add("active");
    });
});
randomBackground.forEach(li => {
    li.addEventListener("click", () => {
        if (li.classList.contains("yes")) {
            flag = true;
            randomizeImgs();
        } else {
            clearInterval(imgCounter);
            flag = false;
        }
        localStorage.setItem("flag", flag);
        randomBackground.forEach(li => li.classList.remove("active"));
        li.classList.add("active");
    } );
})
function functionOne() {
    setting.classList.toggle("open");
    overlay2.classList.toggle("active");
    gear.classList.toggle("fa-spin");
}
span.onclick = functionOne;
overlay2.onclick = functionOne;
document.addEventListener("click", (e) => {
    if (e.target !== bars && linksParent.classList.contains("active"))
        linksParent.classList.remove("active");
})