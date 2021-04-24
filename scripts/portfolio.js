/*eslint-env browser*/
/*jslint plusplus: true */

// Get the container element
var btnContainer = document.getElementById("dot_container");

// Get all buttons with class="btn" inside the container
var btns = btnContainer.getElementsByClassName("dot");

// Loop through the buttons and add the active class to the current/clicked button
var i;
for (i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function (e) {
        "use strict";
        var current = document.querySelector(".dot.active");
        current.classList.remove("active");
        e.target.classList.add("active");
        
        var curr_project = document.querySelector(".project.active");
        curr_project.classList.remove("active");
    
        
        var active_proj = "#project_" + e.target.id.split('_')[1];
        var new_project = document.querySelector(active_proj);
        new_project.classList.add("active");
    });
}