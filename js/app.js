var $ = function (id) { return document.getElementById(id); };

var slideOpts = {
	sl:['slin', 'slout'],	
	sr:['srin', 'srout'],	
	popin:['popin', 'noanim'],	
	popout:['noanim', 'popout'],	
};

var Slide = function (slideType, vin, vout, callback) {
	var vIn = $(vin);
	var vOut = $(vout);
	var OnWebkitAnimationEnd = function () {
		vOut.classList.remove(slideOpts[slideType][1]);
		vOut.classList.add('hidden');
		vIn.classList.remove(slideOpts[slideType][0]);
		vOut.removeEventListener('webkitAnimationEnd', OnWebkitAnimationEnd, false);
	};
	vIn.classList.remove('hidden');
	vIn.classList.add(slideOpts[slideType][0]);
	vOut.classList.add(slideOpts[slideType][1]);
	vOut.addEventListener('webkitAnimationEnd', OnWebkitAnimationEnd, false);
	if (callback && typeof(callback) === "function") callback();
};

var ScrollTop = function () {
	var el = this.parentNode.parentNode.childNodes[5];
	var offset = el.scrollTop;
    var interval = setInterval(function() {
        el.scrollTop = offset;
        offset -= 24; 
        if (offset <= -24) {
            clearInterval(interval);
        }
    }, 8);
};

var TextboxResize = function (el) {
	el.removeEventListener("click", ScrollTop, false);
	el.addEventListener("click", ScrollTop, false);
	var leftbtn = el.parentNode.querySelectorAll(".left-nav-btn")[0];
	var rightbtn = el.parentNode.querySelectorAll(".right-nav-btn")[0];
	if (typeof leftbtn === 'undefined') leftbtn = {offsetWidth:0, className:''}
	if (typeof rightbtn === 'undefined') rightbtn = {offsetWidth:0, className:''}
	var margin = Math.max(leftbtn.offsetWidth, rightbtn.offsetWidth);
	el.style.marginLeft = margin+'px';
	el.style.marginRight = margin+'px';
	var tooLong = (el.offsetWidth<el.scrollWidth) ? true : false;
	if (tooLong) {
		if (leftbtn.offsetWidth<rightbtn.offsetWidth) {
			el.style.marginLeft = leftbtn.offsetWidth+'px';
			el.style.textAlign = "right";
		} else {
			el.style.marginRight = rightbtn.offsetWidth+'px';
			el.style.textAlign = "left";
		}
		tooLong = (el.offsetWidth<el.scrollWidth) ? true : false;
		if (tooLong) {
			if (new RegExp('arrow').test(leftbtn.className)) {
				leftbtn.childNodes[1].innerHTML = "";
				el.style.marginLeft = "26px";
			}
			if (new RegExp('arrow').test(rightbtn.className)) {
				rightbtn.childNodes[1].innerHTML = "";
				el.style.marginRight = "26px";
			}
		}
	}
};

var app = {
	Init:function () {
		FastClick.attach(document.body);
		var textboxes = document.querySelectorAll(".textbox");
		for (var i=0; i<(textboxes.length-1); i++) TextboxResize(textboxes[i]);
	},
}