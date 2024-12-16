window.onload = function() {

    let body = document.getElementsByName(body)[0];

    let dropdowns = document.querySelectorAll("button:has(~ ul.dropdown)");

    dropdowns.forEach( function(elem) {
        elem.addEventListener("mouseleave", unfocus);
    })

    if (body.id = "customize") {
        let custom_exterior_buttons = document.querySelectorAll("product-nav input");
        let car = document.getElementsByClassName("customization-exterior-car")[0];
    
        custom_exterior_buttons.forEach( function(elem) {
            elem.addEventListener("change", checkExteriorButtons);
        })

        function checkExteriorButtons (event) {
            let button = event.target;
            if (button.checked) {
                car.classList += button.value;
            }
        }
    }
    
    function unfocus(event) {
        event.target.blur();
    }

}