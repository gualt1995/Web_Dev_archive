myFunction();


function myFunction() {
    var ring = document.getElementById("ring");
    var w = window.innerWidth;
    var h = window.innerHeight;
    var halfRingWidth = Math.ceil(ring.offsetWidth/2)
    var halfRingHeight = Math.ceil(ring.offsetHeight/2)
    placeDiv(Math.floor(w/2)-halfRingWidth  ,h-halfRingHeight)
}

function placeDiv(x_pos, y_pos) {
    var d = document.getElementById('ring');
    d.style.position = "fixed";
    d.style.left = x_pos+'px';
    d.style.top = y_pos+'px';
  }

function circle() {

    var el = document.getElementById("ring");

    var elDisplay = el.children[0];
    var elInteraction = el.children[1];

    var elTextProjects = document.getElementById("projects");
    var elTextProfile = document.getElementById("profile");
    var elTextResume = document.getElementById("resume");
    var elTextSettings = document.getElementById("settings");
    var arrow = document.getElementById("arrow-down");

    var ringWrapper = document.getElementById("ring-wrapper");



    var offsetRad = null;
    var targetRad = -0.785398;
    var newRad = null
    var previousRad ;


    try {
        elInteraction.addEventListener('mousedown', down);
        ringWrapper.addEventListener('mouseover', hover)
        ringWrapper.addEventListener('mouseout', out)

    }
    catch (err) {
        console.log("Interaction not found");
    }

    

    function out(event){
        arrow.style.transform = "translate(0, 200px)"
        ringWrapper.style.transform = "translate(0, 75%)"
        elTextProjects.style.visibility = "hidden";
        elTextProfile.style.visibility = "hidden";
        elTextResume.style.visibility = "hidden";
        elTextSettings.style.visibility = "hidden";
    }

    function hover(event){
        arrow.style.transform = "translate(0, 75%)"
        ringWrapper.style.transform = "translate(0, 60%)"
        elTextProjects.style.visibility = "visible";
        elTextProfile.style.visibility = "visible";
        elTextResume.style.visibility = "visible";
        elTextSettings.style.visibility = "visible";
    }

    function down(event) {
        offsetRad = getRotation(event);
        previousRad = offsetRad;
        window.addEventListener('mousemove', move);
        window.addEventListener('mouseup', up);
        elDisplay.style.transition = ""
    }

    function move(event) {
        newRad = getRotation(event);
        targetRad += (newRad - previousRad) * 0.5
        if(targetRad  >= 0.3926991){
            targetRad = 0.3926991
        }
        if(targetRad  <= -2.7488936){
            targetRad = -2.7488936
        }
        previousRad = newRad;
        elDisplay.style.transform = 'rotate(' + (targetRad / Math.PI * 180) + 'deg)';
    }

    function up() {
        elDisplay.style.transition = "transform 0.2s ease-in-out";
        window.removeEventListener('mousemove', move);
        window.removeEventListener('mouseup', up);
        if(targetRad <= 0.3926991 && targetRad >= -0.3926991){
            targetRad = 0
        }else if(targetRad < -0.3926991 && targetRad >= -1.178097){
            targetRad = -0.785398
        }else if(targetRad < -1.178097 && targetRad >= -1.9634954){
            targetRad = -1.5708
        }else if(targetRad < -1.9634954 && targetRad >= -2.7488936){
            targetRad = -2.35619
        }
        previousRad = newRad;
        elDisplay.style.transform = 'rotate(' + (targetRad / Math.PI * 180) + 'deg)';
        
    }

    function getRotation(event) {
        var pos = mousePos(event, elInteraction);
        var x = pos.x - elInteraction.clientWidth * .5;
        var y = pos.y - elInteraction.clientHeight * .5; 
        return Math.atan2(y, x);
    }

    function mousePos(event, currentElement) {
        var totalOffsetX = 0;
        var totalOffsetY = 0;
        var canvasX = 0;
        var canvasY = 0;

        do {
            totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
            totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
        }
        while (currentElement = currentElement.offsetParent)

        canvasX = event.pageX - totalOffsetX;
        canvasY = event.pageY - totalOffsetY*2;

        console.log(canvasX, canvasY)
        return {
            x: canvasX,
            y: canvasY
        };
    }
}