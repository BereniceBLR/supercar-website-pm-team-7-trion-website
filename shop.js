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

    function checkTabBorders() {
        if (nav_1_ul.scrollWidth <= nav_1_ul.offsetWidth) {
            nav_1_ul.style.border = "none";
        } else {
            nav_1_ul.style.border = "";
        }

        if (nav_2_ul.scrollHeight <= nav_2_ul.offsetHeight) {
            nav_2_ul.style.border = "none";
        } else {
            nav_2_ul.style.border = "";
        }
    }

    //removes active from sibilings, then adds active to button
    function activateButton(button) {
        let parent = button.parentElement;
        for (let i = 0; i < parent.childElementCount; i++) {
            const tab = parent.children[i]
            tab.classList.remove("active");
        }
        button.classList.add("active");
    }
    
    function nav_1_handler (e) {
        const tab = (e.target.classList.contains("tab")) ? e.target : e.target.parentElement;
        activateButton(tab);
    }

    function nav_2_handler (e) {
        const tab = (e.target.classList.contains("tab")) ? e.target : e.target.parentElement;
        activateButton(tab);
    }

    window.addEventListener("resize", checkTabBorders);
    checkTabBorders();

    for (let i = 0; i < nav_1_ul.childElementCount; i++) {
        const tab = nav_1_ul.children[i]
        tab.addEventListener("click", nav_1_handler);
    }

    for (let i = 0; i < nav_2_ul.childElementCount; i++) {
        const tab = nav_2_ul.children[i]
        tab.addEventListener("click", nav_2_handler);
    }
})