var $ = function (id) { return document.getElementById(id); };

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

var Slide = function (slideType, vin, vout, callback) {
    var vIn = $(vin),
        vOut = $(vout),
        onAnimationEnd = function () {
            vOut.classList.remove(slideOpts[slideType][1]);
            vOut.classList.add('hidden');
            vIn.classList.remove(slideOpts[slideType][0]);
            vOut.removeEventListener('webkitAnimationEnd', onAnimationEnd, false);
            vOut.removeEventListener('animationend',       onAnimationEnd);
        };
    vIn.classList.remove('hidden');
    vIn.classList.add(slideOpts[slideType][0]);
    vOut.classList.add(slideOpts[slideType][1]);
    vOut.addEventListener('webkitAnimationEnd', onAnimationEnd, false);
    vOut.addEventListener('animationend',       onAnimationEnd);
    if (callback && typeof(callback) === 'function') {
        callback();
    }
};

var ScrollTop = function () {
    var el = this.parentNode.parentNode.childNodes[5],
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
    var leftbtn = el.parentNode.querySelectorAll('.left-nav-btn')[0];
    var rightbtn = el.parentNode.querySelectorAll('.right-nav-btn')[0];
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
        
        var i;
        
        var textboxes = document.querySelectorAll('.textbox');
        for ( i = textboxes.length; i--;) {
            TextboxResize(textboxes[i]);
        }
        
        document.querySelector('#view-home .left-nav-btn').addEventListener('click', function(){
            Slide('popin', 'view-about', 'view-home');
        });
        document.querySelector('#view-forms .left-nav-btn').addEventListener('click', function(){
            Slide('sr', 'view-home', 'view-forms');
        });
        document.querySelector('#view-forms .right-nav-btn').addEventListener('click', function(){
            Slide('sl', 'view-done', 'view-forms');
        });
        document.querySelector('#view-done .center').addEventListener('click', function(){
            Slide('popout', 'view-home', 'view-done');
        });
        document.querySelector('#view-about .right-nav-btn').addEventListener('click', function(){
            Slide('popout', 'view-home', 'view-about');
        });
        
        var listitems = document.querySelectorAll('#view-home li'),
            listitemAction = function(){
                Slide('sl', 'view-forms', 'view-home', true, false, false, false);
            };
        for ( i = listitems.length; i--;) {
            listitems[i].addEventListener('click', listitemAction);
        }
    }
};

App.init();
