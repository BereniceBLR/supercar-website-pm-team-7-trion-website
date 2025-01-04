window.onload = function() {

    let body = document.getElementsByTagName("body")[0];

    let dropdowns = document.querySelectorAll("button:has(~ ul.dropdown)");

    dropdowns.forEach( function(elem) {
        elem.addEventListener("mouseleave", unfocus);
    })

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function scroll(element, amount) {
        for (let i = 0; i < 20; i++) {
            element.scrollLeft += amount/20;
            await sleep(10);
        }
    }

    if (body.id == "customize") {
        let custom_exterior_buttons = document.querySelectorAll(".color-select input");
        let custom_exterior_labels = document.querySelectorAll(".color-select label");
        let car = document.getElementsByClassName("customization-exterior-car")[0];
        car.classList.add(localStorage.getItem("exterior_color"));

        if (localStorage.getItem("exterior_button")) {
            let activeLabel = document.querySelector(`[for=${localStorage.getItem("exterior_button")}]`);
            activeLabel.classList.add("active");
        }
    
        custom_exterior_buttons.forEach( function(elem) {
            elem.addEventListener("change", checkCustomizerButtons);
        })

        function checkCustomizerButtons (event) {
            let button = event.target;
            custom_exterior_labels.forEach( function(label) {
                label.classList.remove("active");
            })
            let label = document.querySelector(`[for=${button.id}]`);
            label.classList.toggle("active");
            car.classList.forEach(function(classItem) {
                if (classItem.includes("custom-color")) {
                    car.classList.remove(classItem)
                }
            })
            if (button.checked) {
                car.classList.add(button.value);
                localStorage.setItem("exterior_color", button.value);
                localStorage.setItem("exterior_button", button.id);
            }
        }
    }

    if (body.id == "settings") {
        let car = document.getElementsByClassName("customization-exterior-car")[0];
        car.classList.add(localStorage.getItem("exterior_color"));
    }
    
    function unfocus(event) {
        event.target.blur();
    }

    if (document.querySelector(".scroll-arrow")) {
        const scroll_parents = document.querySelectorAll(":has(> .scroll-arrow)");
        scroll_parents.forEach(function(scroll_parent) {

            const content = scroll_parent.querySelector(".content");
            if (content.scrollWidth > content.offsetWidth) {
                const arrow_left = scroll_parent.querySelector(".button-left");
                const arrow_right = scroll_parent.querySelector(".button-right");
                arrow_left.classList.remove("hidden");
                arrow_right.classList.remove("hidden");

                arrow_left.addEventListener("click", function(event) {
                    scroll(content, -200);
                })
                arrow_right.addEventListener("click", function(event) {
                    scroll(content, 200);
                })
            }


        })
    }

}