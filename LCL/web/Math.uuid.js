function RandomString(e){var d="0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";if(!e){e=8}var c="";for(var b=0;b<e;++b){var a=Math.floor(Math.random()*d.length);c+=d.substring(a,a+1)}return c}function IsValidUnsignedStr(b){if(typeof b!="string"){return false}var a=/^[0-9]+$/;return b.match(a)}function IsValidIntegerStr(b){if(typeof b!="string"){return false}var a=/^-?[0-9]+$/;return b.match(a)}function Debug(a){var b=document.getElementById("debug");b.innerHTML=a}function GetMouseCoords(a){if(a.targetTouches){return{x:a.targetTouches[0].pageX,y:a.targetTouches[0].pageY}}if(a.pageX&&a.pageY){return{x:a.pageX,y:a.pageY}}else{return{x:a.clientX+document.body.scrollLeft-document.body.clientLeft,y:a.clientY+document.body.scrollTop-document.body.clientTop}}}function GetElementPos(d){var c=d.offsetLeft;var b=d.offsetTop;while(d.offsetParent!=null){var a=d.offsetParent;c+=a.offsetLeft;b+=a.offsetTop;d=a}return{x:c,y:b}}function GetMouseCoordsRel(c,d){var a=GetMouseCoords(c);var b=GetElementPos(d);if(d.offsetParent!=null){b.x-=d.offsetParent.scrollLeft;b.y-=d.offsetParent.scrollTop}return{x:a.x-b.x,y:a.y-b.y}}function clipPx(a){a.replace(/px,*\)*/g,"");return parseInt(a)}function RemoveAllChildren(b){if(b&&b.childNodes){for(var a=b.childNodes.length-1;a>=0;--a){b.removeChild(b.childNodes[a])}}}function RemoveAllChildrenExcept(b,c){if(b&&b.childNodes){for(var a=b.childNodes.length-1;a>=0;--a){if(b.childNodes[a]!=c){b.removeChild(b.childNodes[a])}}}}function DisableDragAndDrop(a){a=a||window.event;if(a.preventDefault){a.preventDefault()}else{a.returnValue=false}return false}function DisableSelection(a){if(typeof a.onselectstart!="undefined"){a.onselectstart=function(){return false}}else{if(typeof a.style.MozUserSelect!="undefined"){a.style.MozUserSelect="none"}else{a.onmousedown=function(){return false}}}a.style.cursor="default"}function GetCaretPosition(c){var a=0;if(document.selection){c.focus();var b=document.selection.createRange();b.moveStart("character",-c.value.length);a=b.text.length}else{if(c.selectionStart||c.selectionStart=="0"){a=c.selectionStart}}return a}function SetCaretPosition(b,c){if(b.setSelectionRange){b.focus();b.setSelectionRange(c,c)}else{if(b.createTextRange){var a=b.createTextRange();a.collapse(true);a.moveEnd("character",c);a.moveStart("character",c);a.select()}}}function msieversion(){var b=window.navigator.userAgent;var a=b.indexOf("MSIE ");if(a>0){return parseInt(b.substring(a+5,b.indexOf(".",a)))}else{return 0}}function EncodeStringForHtml(a){var b=a.replace("&","&amp;");b=b.replace("<","&lt;");b=b.replace(">","&gt;");return b}function DecodeStringFromHtml(a){var b=a.replace("&lt;","<");b=b.replace("&gt;",">");b=b.replace("&amp;","&");return b}function Rect(a,d,b,c){this.x=a;this.y=d;this.w=b;this.h=c}function ExtractBackgroundImage(b){var a=b.style.backgroundImage;if(a!=""){var c=a.indexOf("url(");a=a.substring(c+4);c=a.indexOf(")");a=a.substring(0,c);c=a.lastIndexOf(".");b.imageBase=a.substring(0,c);b.imageExt=a.substring(c)}}function ExtractImageWidth(a){if(document.defaultView){a.imageWidth=clipPx(document.defaultView.getComputedStyle(a,"").getPropertyValue("width"))}else{if(a.currentStyle){a.imageWidth=clipPx(a.currentStyle.width)}}}function PreLoadImageSrc(b){var a=new Image();a.src=b;return a}function MakeButton(c,a){var b=document.getElementById(c);ExtractImageWidth(b);b.onmousedown=function(d){if(!this.disabled){this.style.backgroundPosition="-"+this.imageWidth+"px 0px"}return false};b.onmouseup=b.onmouseout=function(d){if(!this.disabled){this.style.backgroundPosition="0px 0px"}return false};b.onclick=function(){if(!this.disabled&&a){a()}};b.disabled=false;b.checked=false}function MakeCheckButton(c,a){var b=document.getElementById(c);ExtractImageWidth(b);b.onmousedown=function(e){if(!this.disabled){var d=this.checked?2:2;this.style.backgroundPosition="-"+(this.imageWidth*d)+"px 0px"}return false};b.onmouseup=b.onmouseout=function(e){var d=this.checked?1:0;this.style.backgroundPosition="-"+(this.imageWidth*d)+"px 0px";return false};b.onclick=function(){if(!this.disabled){this.checked=!this.checked;var d=this.checked?1:0;this.style.backgroundPosition="-"+(this.imageWidth*d)+"px 0px";if(this.onchange){this.onchange()}}};b.checked=false;b.onchange=a;b.disabled=false}function SetCheckButton(c,b){var a=null;if(typeof(c)=="string"){a=document.getElementById(c)}else{a=c}if(a.checked!=b){a.onclick()}}function SetButtonDisabled(d,b){var c=null;if(typeof(d)=="string"){c=document.getElementById(d)}else{c=d}if(c.disabled!=b){c.disabled=b;var a=c.disabled?2:(c.checked?1:0);c.style.backgroundPosition="-"+(c.imageWidth*a)+"px 0px"}}function MakeRadioButtonGroup(f,d){var c=new Array();for(var e=0;e<f.length;++e){c.push(document.getElementById(f[e]))}var b=function(i){if(!this.disabled){var h=this.checked?2:2;this.style.backgroundPosition="-"+(this.imageWidth*h)+"px 0px"}return false};var a=function(i){var h=this.checked?1:0;this.style.backgroundPosition="-"+(this.imageWidth*h)+"px 0px";return false};var g=function(){if(!this.disabled&&!this.checked){this.checked=true;var h=null;for(var j=0;j<this.elems.length;++j){if(this.elems[j]!=this){this.elems[j].checked=false;this.elems[j].style.backgroundPosition="-"+(this.elems[j].imageWidth*0)+"px 0px"}else{h=f[j]}}this.style.backgroundPosition="-"+(this.imageWidth*1)+"px 0px";if(this.onchange){this.onchange(h)}}};for(var e=0;e<c.length;++e){ExtractImageWidth(c[e]);c[e].id=f[e];c[e].elems=c;c[e].onmousedown=b;c[e].onmouseup=c[e].onmouseout=a;c[e].onclick=g;c[e].checked=false;c[e].onchange=d;c[e].disabled=false}}function SelectRadioButton(d){var c=null;if(typeof(d)=="string"){c=document.getElementById(d)}else{c=d}if(!c.checked&&!c.disabled){c.checked=true;var a=null;for(var b=0;b<c.elems.length;++b){if(c.elems[b]!=c){c.elems[b].checked=false;c.elems[b].style.backgroundPosition="-"+(c.elems[b].imageWidth*0)+"px 0px"}else{a=c.elems[b].id}}c.style.backgroundPosition/*!
Math.uuid.js (v1.4)
http://www.broofa.com
mailto:robert@broofa.com

Copyright (c) 2010 Robert Kieffer
Dual licensed under the MIT and GPL licenses.
*/

/*
 * Generate a random uuid.
 *
 * USAGE: Math.uuid(length, radix)
 *   length - the desired number of characters
 *   radix  - the number of allowable values for each character.
 *
 * EXAMPLES:
 *   // No arguments  - returns RFC4122, version 4 ID
 *   >>> Math.uuid()
 *   "92329D39-6F5C-4520-ABFC-AAB64544E172"
 * 
 *   // One argument - returns ID of the specified length
 *   >>> Math.uuid(15)     // 15 character ID (default base=62)
 *   "VcydxgltxrVZSTV"
 *
 *   // Two arguments - returns ID of the specified length, and radix. (Radix must be <= 62)
 *   >>> Math.uuid(8, 2)  // 8 character ID (base=2)
 *   "01001010"
 *   >>> Math.uuid(8, 10) // 8 character ID (base=10)
 *   "47473046"
 *   >>> Math.uuid(8, 16) // 8 character ID (base=16)
 *   "098F4D35"
 */
(function() {
  // Private array of chars to use
  var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(''); 

  Math.uuid = function (len, radix) {
    var chars = CHARS, uuid = [];
    radix = radix || chars.length;

    if (len) {
      // Compact form
      for (var i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
    } else {
      // rfc4122, version 4 form
      var r;

      // rfc4122 requires these characters
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
      uuid[14] = '4';

      // Fill in random data.  At i==19 set the high bits of clock sequence as
      // per rfc4122, sec. 4.1.5
      for (var i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random()*16;
          uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
        }
      }
    }

    return uuid.join('');
  };

  // A more performant, but slightly bulkier, RFC4122v4 solution.  We boost performance
  // by minimizing calls to random()
  Math.uuidFast = function() {
    var chars = CHARS, uuid = new Array(36), rnd=0, r;
    for (var i = 0; i < 36; i++) {
      if (i==8 || i==13 ||  i==18 || i==23) {
        uuid[i] = '-';
      } else if (i==14) {
        uuid[i] = '4';
      } else {
        if (rnd <= 0x02) rnd = 0x2000000 + (Math.random()*0x1000000)|0;
        r = rnd & 0xf;
        rnd = rnd >> 4;
        uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
      }
    }
    return uuid.join('');
  };

  // A more compact, but less performant, RFC4122v4 solution:
  Math.uuidCompact = function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    }).toUpperCase();
  };
})();="-"+(c.imageWidth*1)+"px 0px";if(c.onchange){c.onchange(a)}}}function MakeColorButton(e,a,d,b){var c=document.getElementById(e);ExtractBackgroundImage(c);ExtractImageWidth(c);if(d&&b){c.style.backgroundImage="url("+c.imageBase+"Transparent"+c.imageExt+")"}else{c.style.backgroundImage="url("+c.imageBase+c.imageExt+")"}c.onmousedown=function(f){if(!this.disabled){this.style.backgroundPosition="-"+this.imageWidth+"px 0px"}return false};c.onmouseup=c.onmouseout=function(f){if(!this.disabled){this.style.backgroundPosition="0px 0px"}return false};c.onclick=function(){a.PopUp(this,this.allowTransparent)};c.disabled=false;c.checked=false;c.allowTransparent=d};