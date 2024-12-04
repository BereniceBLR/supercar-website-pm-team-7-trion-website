window.onload = function() {

    let dropdowns = document.querySelectorAll("button:has(~ ul.dropdown)")

    dropdowns.forEach( function(elem) {
        elem.addEventListener("mouseleave", unfocus);
    })
    
    function unfocus(event) {
        event.target.blur();
    }
}