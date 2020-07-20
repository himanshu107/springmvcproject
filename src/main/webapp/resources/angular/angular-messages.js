/*
 AngularJS v1.3.0-local+sha.a92ccd2
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(r,f,t){f.module("ngMessages",[]).directive("ngMessages",["$compile","$animate","$http","$templateCache",function(q,l,m,n){return{restrict:"AE",controller:function(h){this.$renderNgMessageClasses=f.noop;var b=[];this.registerMessage=function(a,e){for(var c=0;c<b.length;c++)if(b[c].type==e.type){if(a!=c){var g=b[a];b[a]=b[c];a<b.length?b[c]=g:b.splice(0,c)}return}b.splice(a,0,e)};this.renderMessages=function(a,e){a=a||{};var c;f.forEach(b,function(b){var d;if(d=!c||e)d=a[b.type],d=null!==
d&&!1!==d&&d;d?(b.attach(),c=!0):b.detach()});this.renderElementClasses(c)}},require:"ngMessages",link:function(h,b,a,e){e.renderElementClasses=function(a){a?l.setClass(b,"ng-active","ng-inactive"):l.setClass(b,"ng-inactive","ng-active")};var c=f.isString(a.ngMessagesMultiple)||f.isString(a.multiple),g;h.$watchCollection(a.ngMessages||a["for"],function(a){g=a;e.renderMessages(a,c)});(a=a.ngMessagesInclude||a.include)&&m.get(a,{cache:n}).success(function(a){h.$evalAsync(function(){var d,k=f.element("<div/>").html(a);
f.forEach(k.children(),function(a){a=f.element(a);d?d.after(a):b.prepend(a);d=a;q(a)(h)});e.renderMessages(g,c)})})}}}]).directive("ngMessage",["$animate",function(f){return{require:"^ngMessages",transclude:"element",terminal:!0,restrict:"AE",link:function(l,m,n,h,b){for(var a,e,c=m[0],g=c.parentNode,d=0,p=0;d<g.childNodes.length;d++){var k=g.childNodes[d];if(8==k.nodeType&&0<=k.nodeValue.indexOf("ngMessage")){if(k===c){a=p;break}p++}}h.registerMessage(a,{type:n.ngMessage||n.when,attach:function(){e||
b(l,function(a){f.enter(a,null,m);e=a})},detach:function(a){e&&(f.leave(e),e=null)}})}}}])})(window,window.angular);
