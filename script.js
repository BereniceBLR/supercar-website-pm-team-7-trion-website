window.onload = function() {

    let body = document.getElementsByTagName("body")[0];

    let dropdowns = document.querySelectorAll("button:has(~ ul.dropdown)");

    dropdowns.forEach( function(elem) {
        elem.addEventListener("mouseleave", unfocus);
    })

    if (body.id == "customize") {
        let custom_exterior_buttons = document.querySelectorAll(".color-select input");
        let car = document.getElementsByClassName("customization-exterior-car")[0];
    
        custom_exterior_buttons.forEach( function(elem) {
            elem.addEventListener("change", checkExteriorButtons);
        })

        function checkExteriorButtons (event) {
            let button = event.target;
            car.classList.forEach(function(classItem) {
                if (classItem.includes("custom-color")) {
                    car.classList.remove(classItem)
                }
            })
            if (button.checked) {
                car.classList.add(button.value);
                localStorage.setItem("exterior_color", button.value);
            }
        }
    }

    if (body.id == "settings" || body.id == "customize") {
        let car = document.getElementsByClassName("customization-exterior-car")[0];
        car.classList.add(localStorage.getItem("exterior_color"));
    }
    
    function unfocus(event) {
        event.target.blur();
    }

}