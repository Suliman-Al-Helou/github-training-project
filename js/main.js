const toggleBtn = document.querySelector(".fa-angles-left");
const aside = document.querySelector("aside");
const content = document.querySelector(".content");
const nav = document.querySelector("nav");
const togglebtniconeTow = document.querySelector(".fa-angles-right");
const projects = document.querySelectorAll(".list-info span");
const projecTitle = document.querySelector(".edite h2");
const projecTitleInput = document.querySelector(".edite div");
const serchicon = document.querySelector(".fa-magnifying-glass");
const serchinput = document.querySelector(".serch");
const notifIcon = document.querySelector(".notifation i");
const notifationMessage = document.querySelector(".notifationmassage ");
const copyLinkApp = document.querySelector(".edite .fa-link");
const filtterBtn = document.querySelector(".filter .fillter-btn");
const dateBtn = document.querySelector(".filter .date-btn");
const editeicon = document.querySelector(".edite .fa-pen");
const share = document.querySelector(".share")
const ivite = document.querySelector(".ivite i");
const userGroup = document.querySelector(".user-group")
// ================== Search Hide Icon ==================
serchinput.addEventListener("click", () => {
    serchicon.style.display = "none";
    serchinput.style.paddingLeft = "10px";
});

// ================== Toggle Sidebar Open ==================
toggleBtn.addEventListener("click", () => {
    aside.classList.toggle("collapsed");
    if (aside.classList.contains("collapsed")) {
        toggleBtn.style.display = "none";
        content.style.marginLeft = "60px";
        content.style.width = "calc(100% - 60px)";
        nav.style.left = "60px";
        nav.style.width = "calc(100% - 60px)";
        togglebtniconeTow.style.display = "block";
    }
});
// ================== Toggle Sidebar Close ==================
togglebtniconeTow.addEventListener("click", () => {
    if (!aside.classList.toggle("collapsed")) {
        content.style.marginLeft = "250px";
        content.style.width = "calc(100% - 250px)";
        nav.style.left = "250px";
        nav.style.width = "calc(100% - 250px)";
        togglebtniconeTow.style.display = "none";
        toggleBtn.style.display = "block";
    }
});

// ================== Search Project ==================
serchinput.addEventListener("keyup", () => {
    const value = serchinput.value.toLowerCase();
    document.querySelectorAll(".list-info span").forEach(project => {
        project.parentElement.style.display = project.textContent
            .toLowerCase()
            .includes(value)
            ? "flex"
            : "none";
    });
});

// ================== Click Project Show Title ==================
projects.forEach((porject) => {
    porject.addEventListener("click", () => {
        projecTitle.textContent = porject.textContent;
    });
});

// Notifation Count
// let notifationCount = 3;
// notifationCount.setAttribute('data-count', notifationCount);

// ================== Toggle Notification ==================
notifIcon.addEventListener("click", () => {
    notifationMessage.classList.toggle("active");
    if (notifationMessage.classList.contains("active")) {
        notifationMessage.style.display = "block";
    } else {
        notifationMessage.style.display = "none";
    }
});

// ================== Copy Link ==================
copyLinkApp.addEventListener("click", () => {
    navigator.clipboard.writeText(projecTitle.textContent);
    let messageCopyed = document.createElement("div");
    let messageText = document.createTextNode("Copied to clipboard");
    messageCopyed.classList.add("toast-messsage");
    messageCopyed.classList.add("show");
    messageCopyed.appendChild(messageText);
    document.body.appendChild(messageCopyed);
    setTimeout(() => {
        messageCopyed.classList.remove("show");
        messageCopyed.addEventListener("transitionend", () => {
            messageCopyed.remove();
        });
    }, 400);
});

// ================== Filter Button ==================
document.querySelectorAll(".btnfilterdate").forEach((btnfildat) => {
    let listfilterUl = document.querySelector(".myListUlFilter");
    btnfildat.addEventListener("click", () => {
        if (!listfilterUl) {
            listfilterUl = document.createElement("ul");
            listfilterUl.classList.add("myListUlFilter");
            listfilterUl.style.cssText = `
            position:absolute;
            top:37px;
            border-radius:5px;
            z-index:1000;
            width:118px;
            background-color:#fff;
            `;
            // Read Data From The Button
            let dataFilter = btnfildat.dataset.filter.split(",");

            dataFilter.forEach((data) => {
                let listfilterLi = document.createElement("li");
                let listfilterA = document.createElement("a");
                listfilterUl.appendChild(listfilterLi);
                listfilterLi.appendChild(listfilterA);
                listfilterLi.style.cssText = `
                    transition: .3s;
                    border-bottom:1px solid #0d062d;
                    color:#0d062d;
                    padding:15px 20px;
                    word-wrap: break-word;
                    font-size:12px;
                    font-weight:bold;
                    `;
                listfilterA.textContent = data;
            });
            btnfildat.appendChild(listfilterUl);
        } else {
            btnfildat.classList.toggle("acitive");
            listfilterUl.style.display = btnfildat.classList.contains("acitive")
                ? "block"
                : "none";
        }
    });
});

// ================== Edit Title ==================
let iconpen = document.querySelector(".edite .fa-pen");
let iconcopy = document.querySelector(".edite .fa-link");
// For storage Span Data
let currentSpan = null;
let currentIndex = null;
iconpen.addEventListener("click", () => {
    let existinginputEdite = document.querySelector(".editeInput");
    if (!existinginputEdite) {
        // Get Value To Change It
        let editName = document.querySelector(".edite h2");
        let appendinput = document.querySelector(".edite div");
        // Create Input
        let inputEdite = document.createElement("input");
        inputEdite.classList.add("editeInput");
        inputEdite.value = editName.textContent;
        // Create Button
        let doneBtn = document.createElement("button");
        doneBtn.classList.add("subedit");
        doneBtn.textContent = "Edit";
        // Hide The Form
        editName.style.cssText = "transition:.3s ; display:none;";
        // editName.style.display = "none";
        iconcopy.style.display = "none";
        iconpen.style.display = "none";
        // Add Input & Button
        appendinput.appendChild(inputEdite);
        appendinput.appendChild(doneBtn);

        inputEdite.addEventListener("keydown", (e) => {
            if (e.key === "Enter") doneBtn.click();
        });

        doneBtn.addEventListener("click", () => {
            if (currentSpan !== null && currentIndex !== null) {
                currentSpan.textContent = inputEdite.value;
                let allProjects = JSON.parse(localStorage.getItem(`projects`) || "[]");
                allProjects[currentIndex] = inputEdite.value;
                localStorage.setItem("projects", JSON.stringify(allProjects));
            }
            editName.textContent = inputEdite.value;
            editName.style.display = "block";
            inputEdite.remove();
            doneBtn.remove();
            iconpen.style.display = "block";
            iconcopy.style.display = "block";
        });

        // When Click Any Span

    }
});

function attachSpanClickHandlers() {

    let allProjects = document.querySelectorAll(".list-info");
    let editName = document.querySelector(".edite h2");
    allProjects.forEach((span, index) => {
        span.onclick = () => {
            currentSpan = span;
            currentIndex = index;
            editName.textContent = span.textContent;
            localStorage.setItem("lastSelectIndex", index);
            let saveValue = JSON.parse(localStorage.getItem("projects") || "[]");
            console.log(saveValue)
            if (saveValue[index]) {
                editName.textContent = saveValue[index];
                span.textContent = saveValue[index];
            }

        };
    });
}

// ================== Add New Project ==================
let addInputToList = document.querySelector(".list-projects");
let addProject = document.querySelector(".add-icon");
addProject.addEventListener("click", () => {
    let inputAdd = document.createElement("input");
    inputAdd.type = "text";
    inputAdd.placeholder = "Click Enter To Add";
    inputAdd.classList.add("addProject");

    addInputToList.prepend(inputAdd);
    inputAdd.focus()


    inputAdd.addEventListener("keydown", (event) => {
        if (event.key == "Enter") {
            if (inputAdd.value.trim() !== "") {
                let listInfo = document.createElement("div")
                listInfo.classList.add("list-info")
                let span = document.createElement("span");
                let iconsetting = document.createElement("i")
                iconsetting.classList.add("fa-solid", "fa-ellipsis");
                span.textContent = inputAdd.value;
                listInfo.prepend(span)
                listInfo.appendChild(iconsetting)
                addInputToList.appendChild(listInfo)

                // add text to h2
                let editName = document.querySelector(".edite h2");

                editName.textContent = inputAdd.value;

                // Save New porject Name To LocalStorage
                let allProjects = JSON.parse(localStorage.getItem(`projects`) || "[]")
                allProjects.push((inputAdd.value));
                localStorage.setItem("projects", JSON.stringify(allProjects))
                inputAdd.remove();
                attachSpanClickHandlers();
            }
        }
    })
})

// ================== Click Share Button ==================

share.addEventListener("click", async (e) => {

    let divshare = document.createElement("div");
    divshare.classList.add("shareAleart");

    let titleclose = document.createElement("div");
    titleclose.classList.add("titleclose")

    let titleshar = document.createElement("h4");
    titleshar.textContent = "Share"

    let closIcon = document.createElement("i")
    closIcon.classList.add("fa-solid", "fa-xmark")

    let iconsShar = document.createElement("div")
    iconsShar.classList.add("iconsShar")

    let formshar = document.createElement("div")
    formshar.classList.add("formshar");

    let inputshar = document.createElement("input")
    inputshar.classList.add("inputshar");

    let btnshar = document.createElement("button");
    btnshar.textContent = "Copy"
    btnshar.classList.add("btnshar");

    let abtnicon = document.createElement("a");
    let toast = document.createElement("div");

    let twitter = document.createElement("i")
    twitter.classList.add("fa-brands", "fa-x-twitter")
    twitter.dataset.link = "https://twitter.com";

    let facebook = document.createElement("i")
    facebook.classList.add("fa-brands", "fa-facebook-f")
    facebook.dataset.link = "https://facebook.com";

    let instagram = document.createElement("i")
    instagram.classList.add("fa-brands", "fa-instagram")
    instagram.dataset.link = "https://instagram.com";

    let youtube = document.createElement("i")
    youtube.classList.add("fa-brands", "fa-youtube")
    youtube.dataset.link = "https://youtube.com";

    let whatsapp = document.createElement("i")
    whatsapp.classList.add("fa-brands", "fa-whatsapp")
    whatsapp.dataset.link = "https://whatsapp.com";



    divshare.appendChild(titleclose);
    titleclose.append(closIcon, titleshar)
    divshare.append(toast, iconsShar, iconsShar, formshar);
    formshar.append(inputshar, btnshar)
    iconsShar.append(twitter, facebook, whatsapp, instagram, youtube)
    document.body.appendChild(divshare)



    inputshar.type = "text";
    inputshar.setAttribute("readonly", true);
    const defultlink = "https://whatsapp.com";
    inputshar.value = defultlink;

    // For Message Alerts
    toast.classList.add("toast");
    function showToast(message) {
        toast.textContent = message
        toast.classList.add("show");
        setTimeout(() => {
            toast.style.cssText = "margin-bottom:20px"
            toast.classList.remove("show");
        }
            , 3000)
    }
    // Copy Method
    async function copyText(text) {
        try {
            await navigator.clipboard.writeText(text);
            showToast("Copited To clipboard")
        } catch {
            const temp = document.createElement("textarea");
            temp.value = text;
            document.body.appendChild(temp);
            temp.select();
            document.execCommand("copy");
            temp.remove();
            showToast("Copied to clipboard");
        }
    }

    iconsShar.addEventListener("click", async (e) => {
        const btn = e.target.closest("i");
        if (!btn) return;
        const link = btn.dataset.link;
        if (!link) {
            showToast("No Link Found");
            return;
        }
        inputshar.value = link;
        await copyText(link);
        localStorage.setItem("lastSharlink", link);
    })

    btnshar.addEventListener("click", async () => {
        const link = inputshar.value.trim();
        if (!link) {
            showToast("Nothing To Copy")
            return;
        }
        await copyText(link);

    })
    // Close
    closIcon.addEventListener("click", () => {
        divshare.remove()
    })
})



// ================== Add Image ==================
function addUserImage(src) {
    const img = document.createElement("img");
    img.src = src;
    img.alt = "user"

    userGroup.insertBefore(img, userGroup.querySelector(".more"))
}
addUserImage("image/users-1.jpg")
addUserImage("image/users-2.jpg")
addUserImage("image/users-3.jpeg")
addUserImage("image/users-4.jpg")

// ================== Count Users Image ==================
function updateMoreCount() {
    const morespan = userGroup.querySelector(".more");
    const count = userGroup.querySelectorAll("img").length;

    morespan.textContent = "+" + (count - 4)
}
updateMoreCount()

// ================== Reload Page ==================
window.addEventListener("DOMContentLoaded", () => {
    let editName = document.querySelector(".edite h2");
    let listContainer = document.querySelector(".list-projects");

    // استرجاع المشاريع من LocalStorage
    let savedProjects = JSON.parse(localStorage.getItem("projects") || "[]");

    // Get The Last Index
    let lastindex = localStorage.getItem("lastSelectIndex")
    if (savedProjects.length === 0) {
        editName.textContent = "Add Project";
    } else {
        // تفريغ القائمة القديمة
        listContainer.innerHTML = "";

        // إعادة بناء القائمة من المشاريع المحفوظة
        savedProjects.forEach((proj) => {
            let listInfo = document.createElement("div");
            listInfo.classList.add("list-info");

            let span = document.createElement("span");
            span.textContent = proj;

            let iconsetting = document.createElement("i");
            iconsetting.classList.add("fa-solid", "fa-ellipsis");

            listInfo.appendChild(span);
            listInfo.appendChild(iconsetting);
            listContainer.appendChild(listInfo);
        });


        attachSpanClickHandlers()
        // عرض آخر مشروع في العنوان
        if (lastindex !== null && savedProjects[lastindex]) {
            editName.textContent = savedProjects[lastindex];
        } else {
            editName.textContent = savedProjects[savedProjects.length - 1];

        }

    }
});


