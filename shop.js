document.addEventListener("DOMContentLoaded", function() {

    const nav_1 = document.querySelector(".shop-nav-1");
    const nav_2 = document.querySelector(".shop-nav-2");
    const nav_1_ul = document.querySelector(".shop-nav-1 .content");
    const nav_2_ul = document.querySelector(".shop-nav-2 .content");

    let categories = {
        'all': ['all', 'casual', 'hats', 'bags', 'bottles', 'eyewear'], 
        'male': ['all', 'casual', 'hats'], 
        'female': ['all', 'casual', 'hats'], 
        'lifestyle': ['all', 'bags', 'bottles', 'eyewear']
    }
    let subcategories = ['jackets', 'casual', 'hats', 'bags', 'bottles', 'eyewear']

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function createTab(content="", classes=[]) {
        const tab = document.createElement("li");
        tab.classList.add("tab");
        tab.classList.add("creating");
        for (let classItem of classes) {
            tab.classList.add(classItem);
        }
        tab.classList.add("tab");
        tab.innerHTML = `<button type="button" class="no-button" value="${content}">${content.toUpperCase()}</button>`;
        tab.addEventListener("click", nav_2_handler);
        nav_2_ul.appendChild(tab);
        await sleep(200);
        tab.classList.remove("creating");
    }

    function resetTabs() {
        nav_2_ul.innerHTML = ""
    }

    async function populateTabs(list) {
        for (let i = 0; i < list.length; i++) {
            (i == 0) ? createTab(list[i], ['active']) : createTab(list[i])
            await sleep(20);
        }
        checkArrows();
        checkTabBorders();
    }

    //controls whether the borders around the tab lists are shown
    function checkTabBorders() {
        if (nav_1_ul.scrollWidth <= nav_1_ul.offsetWidth) {
            nav_1_ul.style.borderLeftColor = "transparent";
            nav_1_ul.style.borderRightColor = "transparent";
        } else {
            nav_1_ul.style.borderLeftColor = "white";
            nav_1_ul.style.borderRightColor = "white";
        }

        if (nav_2_ul.scrollHeight <= nav_2_ul.offsetHeight) {
            nav_2_ul.style.borderTopColor = "transparent";
            nav_2_ul.style.borderBottomColor = "transparent";
        } else {
            nav_2_ul.style.borderTopColor = "white";
            nav_2_ul.style.borderBottomColor = "white";
        }
    }

    //removes .active from sibilings, then adds .active to button
    function activateButton(button) {
        let parent = button.parentElement;
        for (let i = 0; i < parent.childElementCount; i++) {
            const tab = parent.children[i]
            tab.classList.remove("active");
        }
        button.classList.add("active");
    }

    function checkArrows() {
        const scroll_parents = document.querySelectorAll(":has(> .scroll-arrow)");
        
        scroll_parents.forEach(function(scroll_parent) {
            const content = scroll_parent.querySelector(".content");
            const arrow_left = scroll_parent.querySelector(".button-left");
            const arrow_right = scroll_parent.querySelector(".button-right");
            const arrow_up = scroll_parent.querySelector(".button-up");
            const arrow_down = scroll_parent.querySelector(".button-down");

            if (arrow_left)
                if (content.scrollWidth > content.offsetWidth) {
                    arrow_left.classList.remove("hidden");
                    arrow_right.classList.remove("hidden");
                } else {
                    arrow_left.classList.add("hidden");
                    arrow_right.classList.add("hidden");
                }

            if (arrow_up)
                if (content.scrollHeight > content.offsetHeight) {
                    arrow_up.classList.remove("hidden");
                    arrow_down.classList.remove("hidden");
                } else {
                    arrow_up.classList.add("hidden");
                    arrow_down.classList.add("hidden");
                }
        })
    }
    
    async function nav_1_handler (e) {
        const tab = (e.target.classList.contains("tab")) ? e.target : e.target.parentElement;
        if (tab.classList.contains('active')) return;
        activateButton(tab);
        const btn = tab.querySelector('button');
        for (let i = 0; i < nav_2_ul.childElementCount; i++) {
            const tempTab = nav_2_ul.children[i];
            tempTab.classList.add('deleting');
            tempTab.classList.remove('active');
            await sleep(20);
        }
        await sleep(200);
        resetTabs();
        populateTabs(categories[btn.value]);
    }

    function nav_2_handler (e) {
        const tab = (e.target.classList.contains("tab")) ? e.target : e.target.parentElement;
        activateButton(tab);
    }

    for (let i = 0; i < nav_1_ul.childElementCount; i++) {
        const tab = nav_1_ul.children[i]
        tab.addEventListener("click", nav_1_handler);
    }

    for (let i = 0; i < nav_2_ul.childElementCount; i++) {
        const tab = nav_2_ul.children[i]
        tab.addEventListener("click", nav_2_handler);
    }

    resetTabs();
    populateTabs(categories['all']);

    window.addEventListener("resize", checkTabBorders);
})