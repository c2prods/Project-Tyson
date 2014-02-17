var $ = function (query) { return document.querySelector(query); };
var $$ = function (query) { return document.querySelectorAll(query); };

var slideOpts = {
    sl:     ['slin',   'slout' ],    
    sr:     ['srin',   'srout' ],    
    popin:  ['popin',  'noanim'],    
    popout: ['noanim', 'popout'],    
};

var clearNode = function (node) {
    while(node.firstChild){
        node.removeChild(node.firstChild);
    }
};

var SwitchTabs = function () {
    var vIn = $('#'+this.dataset.vin),
        vOut = $('section.active'),
        vInCmd = this,
        vOutCmd = $('nav button.active');
    vOut.classList.remove('active');
    vIn.classList.add('active');
    vOut.classList.add('hidden');
    vIn.classList.remove('hidden');
    vOutCmd.classList.remove('active');
    vInCmd.classList.add('active');
}

var Slide = function (callback) {
    var vIn = $('#'+this.dataset.vin),
        vOut = $('section.active'),
        slideType = this.dataset.sd,
        onAnimationEnd = function () {
            vOut.classList.add('hidden');
            vIn.classList.add('active');
            vIn.classList.remove(slideOpts[slideType][0]);
            vOut.classList.remove(slideOpts[slideType][1]);
            vOut.removeEventListener('webkitAnimationEnd', onAnimationEnd, false);
            vOut.removeEventListener('animationend',       onAnimationEnd);
        };
    vOut.addEventListener('webkitAnimationEnd', onAnimationEnd, false);
    vOut.addEventListener('animationend',       onAnimationEnd);
    if (callback && typeof(callback) === 'function') {
        callback();
    }
    vOut.classList.remove('active');
    vIn.classList.remove('hidden');
    vIn.classList.add(slideOpts[slideType][0]);
    vOut.classList.add(slideOpts[slideType][1]);
};

var ScrollTop = function () {
    var el = this.parentNode.parentNode.childNodes[5].childNodes[1],
        offset = el.scrollTop,
        interval = setInterval(function() {
            el.scrollTop = offset;
            offset -= 24; 
            if (offset <= -24) {
                clearInterval(interval);
            }
        }, 8);
};

var TextboxResize = function (el) {
    el.removeEventListener('click', ScrollTop, false);
    el.addEventListener('click', ScrollTop, false);
    var leftbtn = el.parentNode.querySelectorAll('button.left')[0];
    var rightbtn = el.parentNode.querySelectorAll('button.right')[0];
    if (typeof leftbtn === 'undefined') {
        leftbtn = {
            offsetWidth: 0,
            className: ''
        };
    }
    if (typeof rightbtn === 'undefined') {
        rightbtn = {
            offsetWidth: 0,
            className: ''
        };
    }
    var margin = Math.max(leftbtn.offsetWidth, rightbtn.offsetWidth);
    el.style.marginLeft = margin + 'px';
    el.style.marginRight = margin + 'px';
    var tooLong = (el.offsetWidth < el.scrollWidth) ? true : false;
    if (tooLong) {
        if (leftbtn.offsetWidth < rightbtn.offsetWidth) {
            el.style.marginLeft = leftbtn.offsetWidth + 'px';
            el.style.textAlign = 'right';
        } else {
            el.style.marginRight = rightbtn.offsetWidth + 'px';
            el.style.textAlign = 'left';
        }
        tooLong = (el.offsetWidth<el.scrollWidth) ? true : false;
        if (tooLong) {
            if (new RegExp('arrow').test(leftbtn.className)) {
                clearNode(leftbtn.childNodes[1]);
                el.style.marginLeft = '26px';
            }
            if (new RegExp('arrow').test(rightbtn.className)) {
                clearNode(rightbtn.childNodes[1]);
                el.style.marginRight = '26px';
            }
        }
    }
};

var App = {
    init: function () {
        FastClick.attach(document.body);
        
        var textboxes = $$('h1');
        for (var i = 0; i<textboxes.length; i++) TextboxResize(textboxes[i]);
        
        var tabbtns = $$('nav button');
        for (var i = 0; i<tabbtns.length; i++) tabbtns[i].addEventListener('click', SwitchTabs, false);

        var navbtns = $$('header button');
        for (var i = 0; i<navbtns.length; i++) navbtns[i].addEventListener('click', Slide, false);
                
        var listitems = $$('#view-home li');
        for (var i = 0; i<listitems.length; i++) listitems[i].addEventListener('click', Slide, false);
        
    }
};

App.init();
