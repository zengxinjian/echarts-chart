var Cango,Path,Shape,Img,Text,ClipMask,Group,LinearGradient,RadialGradient,Tweener,initZoomPan,shapeDefs
!function(){"use strict"
function t(t){return t?JSON.parse(JSON.stringify(t)):void 0}function e(){this.p2dWC=null,this.p2dPX=null}function s(t,e,s){var i,r,a=this
this.cgo=null,this.layer=null,this.target=null,this.grabCallback=t||null,this.dragCallback=e||null,this.dropCallback=s||null,this.grabCsrPos={x:0,y:0},this.dwgOrg={x:0,y:0},this.grabOfs={x:0,y:0},this.grab=function(t){var e,s=t||window.event
return i=this.cgo.bkgCanvas.layers.length,r=this.cgo.bkgCanvas.layers[i-1].cElem,r.onmouseup=function(t){a.drop(t)},r.onmouseout=function(t){a.drop(t)},e=this.cgo.getCursorPosWC(s),this.grabCsrPos.x=e.x,this.grabCsrPos.y=e.y,this.dwgOrg.x=this.target.dwgOrg.x,this.dwgOrg.y=this.target.dwgOrg.y,this.target.parent?this.grabOfs={x:e.x-this.dwgOrg.x+this.target.parent.dwgOrg.x,y:e.y-this.dwgOrg.y+this.target.parent.dwgOrg.y}:this.grabOfs={x:e.x-this.dwgOrg.x,y:e.y-this.dwgOrg.y},this.grabCallback&&this.grabCallback(e),r.onmousemove=function(t){a.drag(t)},s.preventDefault?s.preventDefault():window.event.returnValue=!1,!1},this.drag=function(t){var e
this.dragCallback&&(e=this.cgo.getCursorPosWC(t),window.requestAnimationFrame(function(){a.dragCallback(e)}))},this.drop=function(t){var e=this.cgo.getCursorPosWC(t)
r.onmouseup=null,r.onmouseout=null,r.onmousemove=null,this.dropCallback&&this.dropCallback(e)},this.cancelDrag=function(t){r.onmouseup=null,r.onmouseout=null,r.onmousemove=null,this.dropCallback&&this.dropCallback(t)}}function i(t,e,s){return{x:t*s.a+e*s.c+s.e,y:t*s.b+e*s.d+s.f}}function r(t){t.a=1,t.b=0,t.c=0,t.d=1,t.e=0,t.f=0}function a(t){var e=Array.prototype.slice.call(arguments).slice(1)
this.type=t,this.args=e}function n(t){var e=this
this.parent=t,this.translate=function(t,s){var i=new a("TRN",t,s)
e.parent.ofsTfmAry.unshift(i)},this.scale=function(t,s){var i=new a("SCL",t,s)
e.parent.ofsTfmAry.push(i)},this.rotate=function(t){var s=new a("ROT",t)
e.parent.ofsTfmAry.push(s)},this.skew=function(t,s){var i=new a("SKW",t,s)
e.parent.ofsTfmAry.push(i)},this.revolve=function(t){var s=new a("REV",t)
e.parent.ofsTfmAry.unshift(s)},this.reset=function(){e.parent.ofsTfmAry=[],r(e.parent.ofsTfm)}}function o(t){var e=this
this.parent=t,this.translate=function(t,s){var i=new a("TRN",t,s)
e.parent.hardTfmAry.unshift(i)},this.scale=function(t,s){var i=new a("SCL",t,s)
e.parent.hardTfmAry.unshift(i)},this.rotate=function(t){var s=new a("ROT",t)
e.parent.hardTfmAry.unshift(s)},this.skew=function(t,s){var i=new a("SKW",t,s)
e.parent.hardTfmAry.unshift(i)},this.reset=function(){e.parent.hardTfmAry=[]}}function h(t,e){var s=[1,2,3,4,5,6,7,8,9]
if("string"==typeof t&&void 0!==e)switch(t.toLowerCase()){case"fillrule":if("string"!=typeof e)return;("evenodd"===e||"nonzero"===e)&&(this.fillRule=e)
break
case"fillcolor":this.fillCol=e
break
case"strokecolor":this.strokeCol=e
break
case"linewidth":case"strokewidth":"number"==typeof e&&e>0&&(this.lineWidth=e)
break
case"linewidthwc":"number"==typeof e&&e>0&&(this.lineWidthWC=e)
break
case"linecap":if("string"!=typeof e)return;("butt"===e||"round"===e||"square"===e)&&(this.lineCap=e)
break
case"iso":case"isotropic":1==e||"iso"===e||"isotropic"===e?this.iso=!0:this.iso=!1
break
case"dashed":Array.isArray(e)&&e[0]?this.dashed=e:this.dashed=[]
break
case"dashoffset":this.dashOffset=e||0
break
case"border":e===!0&&(this.border=!0),e===!1&&(this.border=!1)
break
case"fontsize":"number"==typeof e&&e>0&&(this.fontSize=e)
break
case"fontweight":("string"==typeof e||"number"==typeof e&&e>=100&&900>=e)&&(this.fontWeight=e)
break
case"fontfamily":"string"==typeof e&&(this.fontFamily=e)
break
case"bgfillcolor":this.bgFillColor=e
break
case"imgwidth":this.imgWidth=Math.abs(e)
break
case"imgheight":this.imgHeight=Math.abs(e)
break
case"lorg":-1!==s.indexOf(e)&&(this.lorg=e)
break
case"shadowoffsetx":this.shadowOffsetX=e||0
break
case"shadowoffsety":this.shadowOffsetY=e||0
break
case"shadowblur":this.shadowBlur=e||0
break
case"shadowcolor":this.shadowColor=e
break
default:return}}function l(){this.type="OBJ2D",this.drawCmds=[],this.pthCmds=new e,this.lineWidthWC=null,this.lineWidth=null,this.savScale=1,this.iso=!0,this.parent=null,this.dwgOrg={x:0,y:0},this.hardTfmAry=[],this.ofsTfmAry=[],this.netTfmAry=[],this.ofsTfm=document.createElementNS("http://www.w3.org/2000/svg","svg").createSVGMatrix(),this.netTfm=document.createElementNS("http://www.w3.org/2000/svg","svg").createSVGMatrix(),this.hardTransform=new o(this),this.transform=new n(this),this.dragNdrop=null}function c(t,e){void 0===e?t.setTransform(1,0,0,0,1,0):t.setTransform(e.matrix[0][0],e.matrix[0][1],e.matrix[1][0],e.matrix[1][1],e.matrix[2][0],e.matrix[2][1])}function d(t,e,s,i,r,a){var n
this.id=t,this.gc=e,this.drawFn=i,this.pathFn=r,this.options=a,this.currState={time:0},this.nextState={time:0},this.gc.ctx.save(),"function"==typeof s&&s.call(this,this.options),"function"==typeof this.drawFn?this.drawFn.call(this,this.options):console.log("invalid animation draw function"),this.gc.ctx.restore()
for(n in this.nextState)this.nextState.hasOwnProperty(n)&&(this.currState[n]=this.nextState[n])}function p(t){var e,s,i=null,r=!1,a=Date.now()
t.prevAnimMode===t.modes.STOPPED&&(t.startTime=a-t.startOfs),e=a-t.startTime,t.animTasks.forEach(function(a){a.gc.cId!==i&&(r=!0,i=a.gc.cId),a.gc.ctx.save(),t.prevAnimMode===t.modes.STOPPED&&(a.currState.time=0),r&&a.gc.clearCanvas(),"function"==typeof a.pathFn&&a.pathFn.call(a,e,a.options),"function"==typeof a.drawFn&&a.drawFn.call(a,a.options),r=!1,a.gc.ctx.restore(),s=a.currState,a.currState=a.nextState,a.nextState=s,a.currState.time=e}),t.currTime=e}function u(){this.animTasks=[],this.timer=null,this.modes={PAUSED:1,STOPPED:2,PLAYING:3,STEPPING:4},this.animMode=this.modes.STOPPED,this.prevAnimMode=this.modes.STOPPED,this.startTime=0,this.startOfs=0,this.currTime=0,this.stepTime=50}function f(t,e){this.id=t,this.cElem=e,this.dragObjects=[]}function g(t){var e,s=t.bkgCanvas.layers[0]
for(e=1;e<t.bkgCanvas.layers.length;e++)if(t.bkgCanvas.layers[e].id===t.cId){s=t.bkgCanvas.layers[e]
break}return s}function v(t){function e(e){function s(e){var s=t.cnvs.getBoundingClientRect()
return{x:e.clientX-s.left,y:e.clientY-s.top}}function i(t,e,s){var i,r=t.dragNdrop.cgo,a=r.yDown?r.xscl:-r.xscl,n=x.translate(r.vpOrgX+r.xoffset,r.vpOrgY+r.yoffset).scaleNonUniform(r.xscl,a).multiply(t.netTfm)
return"IMG"!==t.type||r.yDown?"TEXT"===t.type&&(n=n.scaleNonUniform(1/r.xscl,1/a)):n=n.flipY(),r.ctx.save(),r.ctx.setTransform(n.a,n.b,n.c,n.d,n.e,n.f),r.ctx.beginPath(),t.drawCmds.forEach(function(t){r.ctx[C[t.type]].apply(r.ctx,t.values)}),i=r.ctx.isPointInPath(e,s),r.ctx.restore(),i}var r,a,n,o,h,l,c=e||window.event
r=s(c),n=t.bkgCanvas.layers.length
t:for(h=n-1;h>=0;h--)for(o=t.bkgCanvas.layers[h],l=o.dragObjects.length-1;l>=0;l--)if(a=o.dragObjects[l],i(a,r.x,r.y)&&a.dragNdrop){a.dragNdrop.grab(c)
break t}}t.cnvs.onmousedown=e}var y,m=0,x=document.createElementNS("http://www.w3.org/2000/svg","svg").createSVGMatrix()
const C={M:"moveTo",L:"lineTo",C:"bezierCurveTo",Z:"closePath"}
return SVGPathElement.prototype.getPathData&&SVGPathElement.prototype.setPathData||!function(){var t={Z:"Z",M:"M",L:"L",C:"C",Q:"Q",A:"A",H:"H",V:"V",S:"S",T:"T",z:"Z",m:"m",l:"l",c:"c",q:"q",a:"a",h:"h",v:"v",s:"s",t:"t"},e=function(t){this._string=t,this._currentIndex=0,this._endIndex=this._string.length,this._prevCommand=null,this._skipOptionalSpaces()},s=-1!==window.navigator.userAgent.indexOf("MSIE ")
e.prototype={parseSegment:function(){var e=this._string[this._currentIndex],s=t[e]?t[e]:null
if(null===s){if(null===this._prevCommand)return null
if(s=("+"===e||"-"===e||"."===e||e>="0"&&"9">=e)&&"Z"!==this._prevCommand?"M"===this._prevCommand?"L":"m"===this._prevCommand?"l":this._prevCommand:null,null===s)return null}else this._currentIndex+=1
this._prevCommand=s
var i=null,r=s.toUpperCase()
return"H"===r||"V"===r?i=[this._parseNumber()]:"M"===r||"L"===r||"T"===r?i=[this._parseNumber(),this._parseNumber()]:"S"===r||"Q"===r?i=[this._parseNumber(),this._parseNumber(),this._parseNumber(),this._parseNumber()]:"C"===r?i=[this._parseNumber(),this._parseNumber(),this._parseNumber(),this._parseNumber(),this._parseNumber(),this._parseNumber()]:"A"===r?i=[this._parseNumber(),this._parseNumber(),this._parseNumber(),this._parseArcFlag(),this._parseArcFlag(),this._parseNumber(),this._parseNumber()]:"Z"===r&&(this._skipOptionalSpaces(),i=[]),null===i||i.indexOf(null)>=0?null:{type:s,values:i}},hasMoreData:function(){return this._currentIndex<this._endIndex},peekSegmentType:function(){var e=this._string[this._currentIndex]
return t[e]?t[e]:null},initialCommandIsMoveTo:function(){if(!this.hasMoreData())return!0
var t=this.peekSegmentType()
return"M"===t||"m"===t},_isCurrentSpace:function(){var t=this._string[this._currentIndex]
return" ">=t&&(" "===t||"\n"===t||"	"===t||"\r"===t||"\f"===t)},_skipOptionalSpaces:function(){for(;this._currentIndex<this._endIndex&&this._isCurrentSpace();)this._currentIndex+=1
return this._currentIndex<this._endIndex},_skipOptionalSpacesOrDelimiter:function(){return this._currentIndex<this._endIndex&&!this._isCurrentSpace()&&","!==this._string[this._currentIndex]?!1:(this._skipOptionalSpaces()&&this._currentIndex<this._endIndex&&","===this._string[this._currentIndex]&&(this._currentIndex+=1,this._skipOptionalSpaces()),this._currentIndex<this._endIndex)},_parseNumber:function(){var t=0,e=0,s=1,i=0,r=1,a=1,n=this._currentIndex
if(this._skipOptionalSpaces(),this._currentIndex<this._endIndex&&"+"===this._string[this._currentIndex]?this._currentIndex+=1:this._currentIndex<this._endIndex&&"-"===this._string[this._currentIndex]&&(this._currentIndex+=1,r=-1),this._currentIndex===this._endIndex||(this._string[this._currentIndex]<"0"||this._string[this._currentIndex]>"9")&&"."!==this._string[this._currentIndex])return null
for(var o=this._currentIndex;this._currentIndex<this._endIndex&&this._string[this._currentIndex]>="0"&&this._string[this._currentIndex]<="9";)this._currentIndex+=1
if(this._currentIndex!==o)for(var h=this._currentIndex-1,l=1;h>=o;)e+=l*(this._string[h]-"0"),h-=1,l*=10
if(this._currentIndex<this._endIndex&&"."===this._string[this._currentIndex]){if(this._currentIndex+=1,this._currentIndex>=this._endIndex||this._string[this._currentIndex]<"0"||this._string[this._currentIndex]>"9")return null
for(;this._currentIndex<this._endIndex&&this._string[this._currentIndex]>="0"&&this._string[this._currentIndex]<="9";)s*=10,i+=(this._string.charAt(this._currentIndex)-"0")/s,this._currentIndex+=1}if(this._currentIndex!==n&&this._currentIndex+1<this._endIndex&&("e"===this._string[this._currentIndex]||"E"===this._string[this._currentIndex])&&"x"!==this._string[this._currentIndex+1]&&"m"!==this._string[this._currentIndex+1]){if(this._currentIndex+=1,"+"===this._string[this._currentIndex]?this._currentIndex+=1:"-"===this._string[this._currentIndex]&&(this._currentIndex+=1,a=-1),this._currentIndex>=this._endIndex||this._string[this._currentIndex]<"0"||this._string[this._currentIndex]>"9")return null
for(;this._currentIndex<this._endIndex&&this._string[this._currentIndex]>="0"&&this._string[this._currentIndex]<="9";)t*=10,t+=this._string[this._currentIndex]-"0",this._currentIndex+=1}var c=e+i
return c*=r,t&&(c*=Math.pow(10,a*t)),n===this._currentIndex?null:(this._skipOptionalSpacesOrDelimiter(),c)},_parseArcFlag:function(){if(this._currentIndex>=this._endIndex)return null
var t=null,e=this._string[this._currentIndex]
if(this._currentIndex+=1,"0"===e)t=0
else{if("1"!==e)return null
t=1}return this._skipOptionalSpacesOrDelimiter(),t}}
var i=function(t){if(!t||0===t.length)return[]
var s=new e(t),i=[]
if(s.initialCommandIsMoveTo())for(;s.hasMoreData();){var r=s.parseSegment()
if(null===r)break
i.push(r)}return i},r=SVGPathElement.prototype.setAttribute,a=SVGPathElement.prototype.removeAttribute,n=window.Symbol?Symbol():"__cachedPathData",o=window.Symbol?Symbol():"__cachedNormalizedPathData",h=function(t,e,s,i,r,a,n,o,l,c){var d,p,u,f,g=function(t){return Math.PI*t/180},v=function(t,e,s){var i=t*Math.cos(s)-e*Math.sin(s),r=t*Math.sin(s)+e*Math.cos(s)
return{x:i,y:r}},y=g(n),m=[]
if(c)d=c[0],p=c[1],u=c[2],f=c[3]
else{var x=v(t,e,-y)
t=x.x,e=x.y
var C=v(s,i,-y)
s=C.x,i=C.y
var w=(t-s)/2,b=(e-i)/2,O=w*w/(r*r)+b*b/(a*a)
O>1&&(O=Math.sqrt(O),r=O*r,a=O*a)
var T
T=o===l?-1:1
var S=r*r,k=a*a,_=S*k-S*b*b-k*w*w,A=S*b*b+k*w*w,P=T*Math.sqrt(Math.abs(_/A))
u=P*r*b/a+(t+s)/2,f=P*-a*w/r+(e+i)/2,d=Math.asin(parseFloat(((e-f)/a).toFixed(9))),p=Math.asin(parseFloat(((i-f)/a).toFixed(9))),u>t&&(d=Math.PI-d),u>s&&(p=Math.PI-p),0>d&&(d=2*Math.PI+d),0>p&&(p=2*Math.PI+p),l&&d>p&&(d-=2*Math.PI),!l&&p>d&&(p-=2*Math.PI)}var I=p-d
if(Math.abs(I)>120*Math.PI/180){var W=p,M=s,N=i
p=l&&p>d?d+120*Math.PI/180*1:d+120*Math.PI/180*-1,s=u+r*Math.cos(p),i=f+a*Math.sin(p),m=h(s,i,M,N,r,a,n,0,l,[p,W,u,f])}I=p-d
var E=Math.cos(d),L=Math.sin(d),G=Math.cos(p),D=Math.sin(p),Y=Math.tan(I/4),H=4/3*r*Y,R=4/3*a*Y,V=[t,e],X=[t+H*L,e-R*E],F=[s+H*D,i-R*G],B=[s,i]
if(X[0]=2*V[0]-X[0],X[1]=2*V[1]-X[1],c)return[X,F,B].concat(m)
m=[X,F,B].concat(m)
for(var j=[],z=0;z<m.length;z+=3){var r=v(m[z][0],m[z][1],y),a=v(m[z+1][0],m[z+1][1],y),Z=v(m[z+2][0],m[z+2][1],y)
j.push([r.x,r.y,a.x,a.y,Z.x,Z.y])}return j},l=function(t){return t.map(function(t){return{type:t.type,values:Array.prototype.slice.call(t.values)}})},c=function(t){var e=[],s=null,i=null,r=null,a=null
return t.forEach(function(t){var n=t.type
if("M"===n){var o=t.values[0],h=t.values[1]
e.push({type:"M",values:[o,h]}),r=o,a=h,s=o,i=h}else if("m"===n){var o=s+t.values[0],h=i+t.values[1]
e.push({type:"M",values:[o,h]}),r=o,a=h,s=o,i=h}else if("L"===n){var o=t.values[0],h=t.values[1]
e.push({type:"L",values:[o,h]}),s=o,i=h}else if("l"===n){var o=s+t.values[0],h=i+t.values[1]
e.push({type:"L",values:[o,h]}),s=o,i=h}else if("C"===n){var l=t.values[0],c=t.values[1],d=t.values[2],p=t.values[3],o=t.values[4],h=t.values[5]
e.push({type:"C",values:[l,c,d,p,o,h]}),s=o,i=h}else if("c"===n){var l=s+t.values[0],c=i+t.values[1],d=s+t.values[2],p=i+t.values[3],o=s+t.values[4],h=i+t.values[5]
e.push({type:"C",values:[l,c,d,p,o,h]}),s=o,i=h}else if("Q"===n){var l=t.values[0],c=t.values[1],o=t.values[2],h=t.values[3]
e.push({type:"Q",values:[l,c,o,h]}),s=o,i=h}else if("q"===n){var l=s+t.values[0],c=i+t.values[1],o=s+t.values[2],h=i+t.values[3]
e.push({type:"Q",values:[l,c,o,h]}),s=o,i=h}else if("A"===n){var o=t.values[5],h=t.values[6]
e.push({type:"A",values:[t.values[0],t.values[1],t.values[2],t.values[3],t.values[4],o,h]}),s=o,i=h}else if("a"===n){var o=s+t.values[5],h=i+t.values[6]
e.push({type:"A",values:[t.values[0],t.values[1],t.values[2],t.values[3],t.values[4],o,h]}),s=o,i=h}else if("H"===n){var o=t.values[0]
e.push({type:"H",values:[o]}),s=o}else if("h"===n){var o=s+t.values[0]
e.push({type:"H",values:[o]}),s=o}else if("V"===n){var h=t.values[0]
e.push({type:"V",values:[h]}),i=h}else if("v"===n){var h=i+t.values[0]
e.push({type:"V",values:[h]}),i=h}else if("S"===n){var d=t.values[0],p=t.values[1],o=t.values[2],h=t.values[3]
e.push({type:"S",values:[d,p,o,h]}),s=o,i=h}else if("s"===n){var d=s+t.values[0],p=i+t.values[1],o=s+t.values[2],h=i+t.values[3]
e.push({type:"S",values:[d,p,o,h]}),s=o,i=h}else if("T"===n){var o=t.values[0],h=t.values[1]
e.push({type:"T",values:[o,h]}),s=o,i=h}else if("t"===n){var o=s+t.values[0],h=i+t.values[1]
e.push({type:"T",values:[o,h]}),s=o,i=h}else("Z"===n||"z"===n)&&(e.push({type:"Z",values:[]}),s=r,i=a)}),e},d=function(t){var e=[],s=null,i=null,r=null,a=null,n=null,o=null,l=null
return t.forEach(function(t){if("M"===t.type){var c=t.values[0],d=t.values[1]
e.push({type:"M",values:[c,d]}),o=c,l=d,a=c,n=d}else if("C"===t.type){var p=t.values[0],u=t.values[1],f=t.values[2],g=t.values[3],c=t.values[4],d=t.values[5]
e.push({type:"C",values:[p,u,f,g,c,d]}),i=f,r=g,a=c,n=d}else if("L"===t.type){var c=t.values[0],d=t.values[1]
e.push({type:"L",values:[c,d]}),a=c,n=d}else if("H"===t.type){var c=t.values[0]
e.push({type:"L",values:[c,n]}),a=c}else if("V"===t.type){var d=t.values[0]
e.push({type:"L",values:[a,d]}),n=d}else if("S"===t.type){var v,y,f=t.values[0],g=t.values[1],c=t.values[2],d=t.values[3]
"C"===s||"S"===s?(v=a+(a-i),y=n+(n-r)):(v=a,y=n),e.push({type:"C",values:[v,y,f,g,c,d]}),i=f,r=g,a=c,n=d}else if("T"===t.type){var p,u,c=t.values[0],d=t.values[1]
"Q"===s||"T"===s?(p=a+(a-i),u=n+(n-r)):(p=a,u=n)
var v=a+2*(p-a)/3,y=n+2*(u-n)/3,m=c+2*(p-c)/3,x=d+2*(u-d)/3
e.push({type:"C",values:[v,y,m,x,c,d]}),i=p,r=u,a=c,n=d}else if("Q"===t.type){var p=t.values[0],u=t.values[1],c=t.values[2],d=t.values[3],v=a+2*(p-a)/3,y=n+2*(u-n)/3,m=c+2*(p-c)/3,x=d+2*(u-d)/3
e.push({type:"C",values:[v,y,m,x,c,d]}),i=p,r=u,a=c,n=d}else if("A"===t.type){var C=Math.abs(t.values[0]),w=Math.abs(t.values[1]),b=t.values[2],O=t.values[3],T=t.values[4],c=t.values[5],d=t.values[6]
if(0===C||0===w)e.push({type:"C",values:[a,n,c,d,c,d]}),a=c,n=d
else if(a!==c||n!==d){var S=h(a,n,c,d,C,w,b,O,T)
S.forEach(function(t){e.push({type:"C",values:t})}),a=c,n=d}}else"Z"===t.type&&(e.push(t),a=o,n=l)
s=t.type}),e}
SVGPathElement.prototype.setAttribute=function(t,e){"d"===t&&(this[n]=null,this[o]=null),r.call(this,t,e)},SVGPathElement.prototype.removeAttribute=function(t,e){"d"===t&&(this[n]=null,this[o]=null),a.call(this,t)},SVGPathElement.prototype.getPathData=function(t){if(t&&t.normalize){if(this[o])return l(this[o])
var e
this[n]?e=l(this[n]):(e=i(this.getAttribute("d")||""),this[n]=l(e))
var s=d(c(e))
return this[o]=l(s),s}if(this[n])return l(this[n])
var e=i(this.getAttribute("d")||"")
return this[n]=l(e),e},SVGPathElement.prototype.setPathData=function(t){if(0===t.length)s?this.setAttribute("d",""):this.removeAttribute("d")
else{for(var e="",i=0,r=t.length;r>i;i+=1){var a=t[i]
i>0&&(e+=" "),e+=a.type,a.values&&a.values.length>0&&(e+=" "+a.values.join(" "))}this.setAttribute("d",e)}},SVGRectElement.prototype.getPathData=function(t){var e=this.x.baseVal.value,s=this.y.baseVal.value,i=this.width.baseVal.value,r=this.height.baseVal.value,a=this.hasAttribute("rx")?this.rx.baseVal.value:this.ry.baseVal.value,n=this.hasAttribute("ry")?this.ry.baseVal.value:this.rx.baseVal.value
a>i/2&&(a=i/2),n>r/2&&(n=r/2)
var o=[{type:"M",values:[e+a,s]},{type:"H",values:[e+i-a]},{type:"A",values:[a,n,0,0,1,e+i,s+n]},{type:"V",values:[s+r-n]},{type:"A",values:[a,n,0,0,1,e+i-a,s+r]},{type:"H",values:[e+a]},{type:"A",values:[a,n,0,0,1,e,s+r-n]},{type:"V",values:[s+n]},{type:"A",values:[a,n,0,0,1,e+a,s]},{type:"Z",values:[]}]
return o=o.filter(function(t){return"A"!==t.type||0!==t.values[0]&&0!==t.values[1]?!0:!1}),t&&t.normalize===!0&&(o=d(o)),o},SVGCircleElement.prototype.getPathData=function(t){var e=this.cx.baseVal.value,s=this.cy.baseVal.value,i=this.r.baseVal.value,r=[{type:"M",values:[e+i,s]},{type:"A",values:[i,i,0,0,1,e,s+i]},{type:"A",values:[i,i,0,0,1,e-i,s]},{type:"A",values:[i,i,0,0,1,e,s-i]},{type:"A",values:[i,i,0,0,1,e+i,s]},{type:"Z",values:[]}]
return t&&t.normalize===!0&&(r=d(r)),r},SVGEllipseElement.prototype.getPathData=function(t){var e=this.cx.baseVal.value,s=this.cy.baseVal.value,i=this.rx.baseVal.value,r=this.ry.baseVal.value,a=[{type:"M",values:[e+i,s]},{type:"A",values:[i,r,0,0,1,e,s+r]},{type:"A",values:[i,r,0,0,1,e-i,s]},{type:"A",values:[i,r,0,0,1,e,s-r]},{type:"A",values:[i,r,0,0,1,e+i,s]},{type:"Z",values:[]}]
return t&&t.normalize===!0&&(a=d(a)),a},SVGLineElement.prototype.getPathData=function(){return[{type:"M",values:[this.x1.baseVal.value,this.y1.baseVal.value]},{type:"L",values:[this.x2.baseVal.value,this.y2.baseVal.value]}]},SVGPolylineElement.prototype.getPathData=function(){for(var t=[],e=0;e<this.points.numberOfItems;e+=1){var s=this.points.getItem(e)
t.push({type:0===e?"M":"L",values:[s.x,s.y]})}return t},SVGPolygonElement.prototype.getPathData=function(){for(var t=[],e=0;e<this.points.numberOfItems;e+=1){var s=this.points.getItem(e)
t.push({type:0===e?"M":"L",values:[s.x,s.y]})}return t.push({type:"Z",values:[]}),t}}(),void 0===shapeDefs&&(shapeDefs={circle:function(t){var e=t||1
return["m",-.5*e,0,"c",0,-.27614*e,.22386*e,-.5*e,.5*e,-.5*e,"c",.27614*e,0,.5*e,.22386*e,.5*e,.5*e,"c",0,.27614*e,-.22386*e,.5*e,-.5*e,.5*e,"c",-.27614*e,0,-.5*e,-.22386*e,-.5*e,-.5*e,"z"]},ellipse:function(t,e){var s=t||1,i=s
return"number"==typeof e&&e>0&&(i=e),["m",-.5*s,0,"c",0,-.27614*i,.22386*s,-.5*i,.5*s,-.5*i,"c",.27614*s,0,.5*s,.22386*i,.5*s,.5*i,"c",0,.27614*i,-.22386*s,.5*i,-.5*s,.5*i,"c",-.27614*s,0,-.5*s,-.22386*i,-.5*s,-.5*i,"z"]},square:function(t){var e=t||1
return["m",.5*e,-.5*e,"l",0,e,-e,0,0,-e,"z"]},rectangle:function(t,e,s){var i,r=t||1,a=e||r
return void 0===s||0>=s?["m",-r/2,-a/2,"l",r,0,0,a,-r,0,"z"]:(i=Math.min(r/2,a/2,s),["m",-r/2+i,-a/2,"l",r-2*i,0,"a",i,i,0,0,1,i,i,"l",0,a-2*i,"a",i,i,0,0,1,-i,i,"l",-r+2*i,0,"a",i,i,0,0,1,-i,-i,"l",0,-a+2*i,"a",i,i,0,0,1,i,-i,"z"])},triangle:function(t){var e=t||1
return["m",.5*e,-.289*e,"l",-.5*e,.866*e,-.5*e,-.866*e,"z"]},cross:function(t){var e=t||1
return["m",-.5*e,0,"l",e,0,"m",-.5*e,-.5*e,"l",0,e]},ex:function(t){var e=t||1
return["m",-.3535*e,-.3535*e,"l",.707*e,.707*e,"m",-.707*e,0,"l",.707*e,-.707*e]}}),LinearGradient=function(t,e,s,i){this.grad=[t,e,s,i],this.colorStops=[],this.addColorStop=function(){this.colorStops.push(arguments)}},RadialGradient=function(t,e,s,i,r,a){this.grad=[t,e,s,i,r,a],this.colorStops=[],this.addColorStop=function(){this.colorStops.push(arguments)}},Tweener=function(t,e,s){this.delay=t||0,this.dur=e||5e3,this.reStartOfs=0,this.loop=!1,this.loopAll=!1
var i=this,r="noloop"
"string"==typeof s&&(r=s.toLowerCase()),"loop"===r?this.loop=!0:"loopall"===r&&(this.loopAll=!0),this.getVal=function(t,e,s){var r,a,n,o,h,l,c,d,p,u=0
if(0===t&&(i.reStartOfs=0),c=t-i.reStartOfs,c>i.dur+i.delay&&i.dur>0&&(i.loop||i.loopAll)&&(i.reStartOfs=i.loop?t-i.delay:t,c=0),u=0,c>i.delay&&(u=c-i.delay),!Array.isArray(e))return e
if(!e.length)return 0
if(1===e.length)return e[0]
if(0===u)return e[0]
if(u>=i.dur)return e[e.length-1]
if(r=e.length-1,!Array.isArray(s)||e.length!==s.length)return a=i.dur/r,n=Math.floor(u/a),o=(u-n*a)/a,e[n]+o*(e[n+1]-e[n])
for(d=[].concat(e),p=[].concat(s),0!==p[0]&&(d.unshift(d[0]),p.unshift(0)),100!==p[p.length-1]&&(d.push(d[d.length-1]),p.push(100)),h=0,l=u/i.dur;h<p.length-1&&p[h+1]/100<l;)h++
return a=(p[h+1]-p[h])/100,o=(l-p[h]/100)/a,d[h]+o*(d[h+1]-d[h])}},y={TRN:function(t){var e=t[0]||0,s=t[1]||0
return this.hasOwnProperty("type")?void(this.ofsTfm=this.ofsTfm.translate(e,s)):{x:this.x+e,y:this.y+s}},SCL:function(t){var e=t[0]||1,s=t[1]||e
return this.hasOwnProperty("type")?void(this.ofsTfm=this.ofsTfm.scaleNonUniform(e,s)):{x:this.x*e,y:this.y*s}},ROT:function(t){var e=t[0]||0,s=Math.PI/180,i=Math.sin(-e*s),r=Math.cos(-e*s)
return this.hasOwnProperty("type")?void(this.ofsTfm=this.ofsTfm.rotate(e)):{x:this.x*r+this.y*i,y:-this.x*i+this.y*r}},SKW:function(t){var e=t[0]||0,s=t[1]||0,i=Math.PI/180,r=Math.tan(-e*i),a=Math.tan(s*i)
return this.hasOwnProperty("type")?(this.ofsTfm=this.ofsTfm.skewX(e*i),void(this.ofsTfm=this.ofsTfm.skewY(s*i))):{x:this.x+this.y*r,y:this.x*a+this.y}},REV:function(t){var e=t[0]||0,s=Math.PI/180,i=Math.sin(-e*s),r=Math.cos(-e*s)
return this.hasOwnProperty("type")?void(this.ofsTfm=this.ofsTfm.rotate(e*s)):{x:this.x*r+this.y*i,y:-this.x*i+this.y*r}}},Group=function(){this.type="GRP",this.parent=null,this.children=[],this.ofsTfmAry=[],this.netTfmAry=[],this.ofsTfm=document.createElementNS("http://www.w3.org/2000/svg","svg").createSVGMatrix(),this.netTfm=document.createElementNS("http://www.w3.org/2000/svg","svg").createSVGMatrix(),this.transform=new n(this),this.dragNdropHandlers=null,this.addObj.apply(this,arguments)},Group.prototype.deleteObj=function(t){var e=this.children.indexOf(t)
e>=0&&(this.children.splice(e,1),t.parent=null)},Group.prototype.addObj=function(){function t(t){t.parent=s,s.children.push(t),!t.dragNdrop&&s.dragNdropHandlers&&(t.enableDrag.apply(t,s.dragNdropHandlers),t.dragNdrop.target=s)}function e(s){s.forEach(function(s){Array.isArray(s)?e(s):s&&s.type&&t(s)})}var s=this
e(Array.prototype.slice.call(arguments))},Group.prototype.translate=function(t,e){function s(i){i.children.forEach(function(i){"GRP"===i.type?s(i):i.translate(t,e)})}s(this)},Group.prototype.rotate=function(t){function e(s){s.children.forEach(function(s){"GRP"===s.type?e(s):s.rotate(t)})}e(this)},Group.prototype.skew=function(t,e){function s(i){i.children.forEach(function(i){"GRP"===i.type?s(i):i.skew(t,e)})}s(this)},Group.prototype.scale=function(t,e){function s(t){t.children.forEach(function(t){"GRP"===t.type?s(t):t.scale(i,r)})}var i=t,r=e||i
s(this)},Group.prototype.enableDrag=function(t,e,s){function i(a){a.children.forEach(function(a){"GRP"===a.type?i(a):null===a.dragNdrop&&(a.enableDrag(t,e,s),a.dragNdrop.target=r)})}var r=this
this.dragNdropHandlers=arguments,i(this)},Group.prototype.disableDrag=function(){function t(e){e.children.forEach(function(e){"GRP"===e.type?t(e):e.disableDrag()})}this.dragNdropHandlers=void 0,t(this)},l.prototype.enableDrag=function(t,e,i){this.dragNdrop=new s(t,e,i),this.dragNdrop.target=this},l.prototype.disableDrag=function(){var t
this.dragNdrop&&(t=this.dragNdrop.layer.dragObjects.indexOf(this),this.dragNdrop.layer.dragObjects.splice(t,1),this.dragNdrop=null)},ClipMask=function(t,e){var s,i=e||{}
l.call(this),this.type="CLIP",this.iso=!1,this.fillRule="nonzero",this.drawCmds=[],"string"==typeof t&&t.length?(s=document.createElementNS("http://www.w3.org/2000/svg","path"),s.setAttribute("d",t),this.drawCmds=s.getPathData({normalize:!0})):Array.isArray(t)&&t.length&&(s=document.createElementNS("http://www.w3.org/2000/svg","path"),"number"==typeof t[0]?s.setAttribute("d","M "+t.join(" ")):s.setAttribute("d",t.join(" ")),this.drawCmds=s.getPathData({normalize:!0})),i.hasOwnProperty("iso")?this.setProperty("iso",i.iso):i.hasOwnProperty("isotropic")?this.setProperty("iso",i.isotropic):this.iso=!1,i.hasOwnProperty("fillRule")&&(this.fillRule=i.fillRule)},ClipMask.prototype=Object.create(l.prototype),ClipMask.prototype.constructor=ClipMask,ClipMask.prototype.setProperty=h,ClipMask.prototype.appendPath=function(e){var s=this,a=t(this.drawCmds),n=t(e.drawCmds)
this.hardTfmAry.length&&(this.hardTfmAry.forEach(function(t){y[t.type].call(s,t.args)}),a.forEach(function(t){var e,r,a
if(t.values.length){for(r=[],a=0;a<t.values.length;a+=2)e=i(t.values[a],t.values[a+1],s.ofsTfm),r.push(e.x,e.y)
t.values=r}}),r(this.ofsTfm),this.hardTfmAry.length=0),e.hardTfmAry.length&&(e.hardTfmAry.forEach(function(t){y[t.type].call(e,t.args)}),n.forEach(function(t){var s,r,a
if(t.values.length){for(r=[],a=0;a<t.values.length;a+=2)s=i(t.values[a],t.values[a+1],e.ofsTfm),r.push(s.x,s.y)
t.values=r}}),r(e.ofsTfm)),this.drawCmds=a.concat(n)},ClipMask.prototype.translate=function(t,e){this.hardTransform.translate(t,e)},ClipMask.prototype.rotate=function(t){this.hardTransform.rotate(t)},ClipMask.prototype.skew=function(t,e){this.hardTransform.skew(t,e)},ClipMask.prototype.scale=function(t,e){this.hardTransform.scale(t,e)},ClipMask.prototype.dup=function(){var e=new ClipMask
return e.type=this.type,e.drawCmds=t(this.drawCmds),e.parent=null,e.dwgOrg=t(this.dwgOrg),e.hardTfmAry=t(this.hardTfmAry),e.ofsTfmAry=t(this.ofsTfmAry),e.fillRule=this.fillRule,e.border=this.border,e.strokeCol=this.strokeCol,e.lineWidth=this.lineWidth,e.lineWidthWC=this.lineWidthWC,e.lineCap=this.lineCap,e.iso=this.iso,e},Path=function(t,e){var s,i
ClipMask.call(this,t),this.type="PATH",this.border=!1,this.strokeCol=null,this.fillCol=null,this.lineCap=null,this.iso=!1,this.shadowOffsetX=0,this.shadowOffsetY=0,this.shadowBlur=0,this.shadowColor="#000000",this.dashed=[],this.dashOffset=0,s="object"==typeof e?e:{}
for(i in s)s.hasOwnProperty(i)&&this.setProperty(i,s[i])},Path.prototype=Object.create(ClipMask.prototype),Path.prototype.constructor=Path,Path.prototype.setProperty=h,Path.prototype.dup=function(){var e=new Path
return e.type=this.type,e.drawCmds=t(this.drawCmds),e.parent=null,e.dwgOrg=t(this.dwgOrg),e.hardTfmAry=t(this.hardTfmAry),e.ofsTfmAry=t(this.ofsTfmAry),e.border=this.border,e.strokeCol=this.strokeCol,e.fillCol=this.fillCol,e.lineWidth=this.lineWidth,e.lineWidthWC=this.lineWidthWC,e.lineCap=this.lineCap,e.savScale=1,e.iso=this.iso,e.fillRule=this.fillRule,e.shadowOffsetX=this.shadowOffsetX,e.shadowOffsetY=this.shadowOffsetY,e.shadowBlur=this.shadowBlur,e.shadowColor=this.shadowColor,e.dashed=t(this.dashed),e.dashOffset=this.dashOffset,e},Shape=function(t,e){var s=e||{}
Path.call(this,t,e),this.type="SHAPE",this.clearFlag=!1,s.hasOwnProperty("iso")?this.setProperty("iso",s.iso):s.hasOwnProperty("isotropic")?this.setProperty("iso",s.isotropic):this.iso=!0},Shape.prototype=Object.create(Path.prototype),Shape.prototype.constructor=Shape,Img=function(t,s){var i,r
l.call(this),this.type="IMG","string"==typeof t?(this.imgBuf=new Image,this.imgBuf.src=t):t instanceof Image?this.imgBuf=t:t instanceof HTMLCanvasElement?this.imgBuf=t:console.error("Img data type unrecognised"),this.pthCmds=new e,this.drawCmds=[],this.width=0,this.height=0,this.imgWidth=0,this.imgHeight=0,this.imgLorgX=0,this.imgLorgY=0,this.lorg=1,this.border=!1,this.strokeCol=null,this.lineWidthWC=null,this.lineWidth=null,this.lineCap=null,this.savScale=1,this.shadowOffsetX=0,this.shadowOffsetY=0,this.shadowBlur=0,this.shadowColor="#000000",i="object"==typeof s?s:{}
for(r in i)i.hasOwnProperty(r)&&this.setProperty(r,i[r])
this.imgWidth||(this.imgWidth=this.width),this.imgHeight||(this.imgHeight=this.height)},Img.prototype=Object.create(l.prototype),Img.prototype.constructor=Img,Img.prototype.setProperty=h,Img.prototype.translate=function(t,e){this.hardTransform.translate(t,e)},Img.prototype.rotate=function(t){this.hardTransform.rotate(t)},Img.prototype.skew=function(t,e){this.hardTransform.skew(t,e)},Img.prototype.scale=function(t,e){this.hardTransform.scale(t,e)},Img.prototype.dup=function(){var s=new Img
return s.type=this.type,s.pthCmds=new e,s.drawCmds=t(this.drawCmds),s.imgBuf=this.imgBuf,s.dwgOrg=t(this.dwgOrg),s.dragNdrop=null,s.hardTfmAry=t(this.hardTfmAry),s.ofsTfmAry=t(this.ofsTfmAry),s.border=this.border,s.strokeCol=this.strokeCol,s.lineWidth=this.lineWidth,s.lineWidthWC=this.lineWidthWC,s.lineCap=this.lineCap,s.savScale=1,s.iso=this.iso,s.dashed=t(this.dashed),s.dashOffset=this.dashOffset,s.width=this.width,s.height=this.height,s.imgWidth=this.imgWidth,s.imgHeight=this.imgHeight,s.imgLorgX=this.imgLorgX,s.imgLorgY=this.imgLorgY,s.lorg=this.lorg,s.shadowOffsetX=this.shadowOffsetX,s.shadowOffsetY=this.shadowOffsetY,s.shadowBlur=this.shadowBlur,s.shadowColor=this.shadowColor,s},Img.prototype.formatImg=function(t){var e,s,i,r,a,n,o,h,l,c,d,p,u,f=Math.abs(t.yscl/t.xscl),g=0,v=0
this.iso=!0,this.imgBuf.width||console.log("in image onload handler yet image NOT loaded!"),this.imgWidth&&this.imgHeight?(e=this.imgWidth,s=this.imgHeight*f):this.imgWidth&&!this.imgHeight?(e=this.imgWidth,s=e*this.imgBuf.height/this.imgBuf.width):this.imgHeight&&!this.imgWidth?(s=this.imgHeight*f,e=s*this.imgBuf.width/this.imgBuf.height):(e=this.imgBuf.width,s=e*this.imgBuf.height/this.imgBuf.width),i=e/2,r=s/2,u=[0,[0,0],[i,0],[e,0],[0,r],[i,r],[e,r],[0,s],[i,s],[e,s]],void 0!==u[this.lorg]&&(g=-u[this.lorg][0],v=-u[this.lorg][1]),this.imgLorgX=g,this.imgLorgY=v,this.width=e,this.height=s,a=g,n=v,o=g,h=v+s,l=g+e,c=v+s,d=g+e,p=v,this.drawCmds=[{type:"M",values:[a,n]},{type:"L",values:[o,h]},{type:"L",values:[l,c]},{type:"L",values:[d,p]},{type:"Z",values:[]}]},Text=function(t,s){var i,r
l.call(this),this.type="TEXT",this.txtStr=t,this.pthCmds=new e,this.drawCmds=[],this.width=0,this.height=0,this.imgLorgX=0,this.imgLorgY=0,this.lorg=1,this.border=!1,this.fillCol=null,this.bgFillColor=null,this.strokeCol=null,this.fontSize=null,this.fontSizeZC=null,this.fontWeight=null,this.fontFamily=null,this.lineWidthWC=null,this.lineWidth=null,this.lineCap=null,this.savScale=1,this.shadowOffsetX=0,this.shadowOffsetY=0,this.shadowBlur=0,this.shadowColor="#000000",i="object"==typeof s?s:{}
for(r in i)i.hasOwnProperty(r)&&this.setProperty(r,i[r])},Text.prototype=Object.create(l.prototype),Text.prototype.constructor=Text,Text.prototype.setProperty=h,Text.prototype.translate=function(t,e){this.hardTransform.translate(t,e)},Text.prototype.rotate=function(t){this.hardTransform.rotate(t)},Text.prototype.skew=function(t,e){this.hardTransform.skew(t,e)},Text.prototype.scale=function(t,e){this.hardTransform.scale(t,e)},Text.prototype.dup=function(){var s=new Text
return s.type=this.type,s.txtStr=this.txtStr.slice(0),s.pthCmds=new e,s.drawCmds=t(this.drawCmds),s.dwgOrg=t(this.dwgOrg),s.hardTfmAry=t(this.hardTfmAry),s.ofsTfmAry=t(this.ofsTfmAry),s.border=this.border,s.strokeCol=this.strokeCol,s.fillCol=this.fillCol,s.bgFillColor=this.bgFillColor,s.lineWidth=this.lineWidth,s.lineWidthWC=this.lineWidthWC,s.lineCap=this.lineCap,s.savScale=1,s.dashed=t(this.dashed),s.dashOffset=this.dashOffset,s.width=this.width,s.height=this.height,s.imgLorgX=this.imgLorgX,s.imgLorgY=this.imgLorgY,s.lorg=this.lorg,s.fontSize=this.fontSize,s.fontWeight=this.fontWeight,s.fontFamily=this.fontFamily,s.shadowOffsetX=this.shadowOffsetX,s.shadowOffsetY=this.shadowOffsetY,s.shadowBlur=this.shadowBlur,s.shadowColor=this.shadowColor,s},Text.prototype.formatText=function(t){var e,s,i,r,a,n,o,h,l,d,p,u,f,g,v=this.fontSize||t.fontSize,y=this.fontFamily||t.fontFamily,m=this.fontWeight||t.fontWeight,x=this.lorg||1,C=0,w=0
this.orgXscl||(this.orgXscl=t.xscl),g=t.xscl/this.orgXscl,this.fontSizeZC=v*g,t.ctx.save(),c(t.ctx),t.ctx.font=m+" "+v+"px "+y,e=t.ctx.measureText(this.txtStr).width,t.ctx.restore(),e*=g,s=v,s*=g,i=e/2,r=s/2,a=[0,[0,s],[i,s],[e,s],[0,r],[i,r],[e,r],[0,0],[i,0],[e,0]],void 0!==a[x]&&(C=-a[x][0],w=a[x][1]),this.imgLorgX=C,this.imgLorgY=w-.25*s,n=C,o=w,h=C,l=w-s,d=C+e,p=w-s,u=C+e,f=w,this.drawCmds=[{type:"M",values:[n,o]},{type:"L",values:[h,l]},{type:"L",values:[d,p]},{type:"L",values:[u,f]},{type:"Z",values:[]}]},u.prototype.stopAnimation=function(){window.cancelAnimationFrame(this.timer),this.prevAnimMode=this.animMode,this.animMode=this.modes.STOPPED,this.currTime=0,this.startOfs=0},u.prototype.pauseAnimation=function(){window.cancelAnimationFrame(this.timer),this.prevAnimMode=this.animMode,this.animMode=this.modes.PAUSED},u.prototype.stepAnimation=function(){function t(){p(e),e.prevAnimMode=e.modes.PAUSED,e.animMode=e.modes.PAUSED}var e=this
this.animMode!==this.modes.PLAYING&&(this.animMode===this.modes.PAUSED&&(this.startTime=Date.now()-this.currTime),this.prevAnimMode=this.animMode,this.animMode=this.modes.STEPPING,setTimeout(t,this.stepTime))},u.prototype.redrawAnimation=function(){this.animMode!==this.modes.PLAYING&&(this.startTime=Date.now()-this.currTime,p(this))},u.prototype.playAnimation=function(t,e){function s(){p(i),i.prevAnimMode=i.modes.PLAYING,e?i.currTime<e?i.timer=window.requestAnimationFrame(s):i.stopAnimation():i.timer=window.requestAnimationFrame(s)}var i=this
this.startOfs=t||0,this.animMode!==this.modes.PLAYING&&(this.animMode===this.modes.PAUSED&&(this.startTime=Date.now()-this.currTime),this.prevAnimMode=this.animMode,this.animMode=this.modes.PLAYING,this.timer=window.requestAnimationFrame(s))},Cango=function(t){function e(t,e){var s=void 0
window.addEventListener("resize",function(){void 0!=s&&(clearTimeout(s),s=void 0),s=setTimeout(function(){s=void 0,t()},e)})}function s(){var t,e,s=a.bkgCanvas.offsetTop+a.bkgCanvas.clientTop,i=a.bkgCanvas.offsetLeft+a.bkgCanvas.clientLeft,r=a.bkgCanvas.offsetWidth,n=a.bkgCanvas.offsetHeight
if(!(Math.abs(r-a.rawWidth)/r<.01&&Math.abs(n-a.rawHeight)/n<.01)&&(a.bkgCanvas.timeline&&a.bkgCanvas.timeline.animTasks.length&&a.deleteAllAnimations(),a.rawWidth=r,a.rawHeight=n,a.aRatio=r/n,a.bkgCanvas===a.cnvs))for(a.cnvs.setAttribute("width",r),a.cnvs.setAttribute("height",n),t=1;t<a.bkgCanvas.layers.length;t++)e=a.bkgCanvas.layers[t].cElem,e&&(e.style.top=s+"px",e.style.left=i+"px",e.style.width=r+"px",e.style.height=n+"px",e.setAttribute("width",r),e.setAttribute("height",n))}var i,r,a=this
return this.cId=t,this.cnvs=document.getElementById(t),null===this.cnvs?void alert("can't find canvas "+t):(this.bkgCanvas=this.cnvs,-1!==t.indexOf("_ovl_")&&(i=t.slice(0,t.indexOf("_ovl_")),this.bkgCanvas=document.getElementById(i)),this.rawWidth=this.cnvs.offsetWidth,this.rawHeight=this.cnvs.offsetHeight,this.aRatio=this.rawWidth/this.rawHeight,this.widthPW=100,this.heightPW=100/this.aRatio,this.bkgCanvas.hasOwnProperty("layers")||(this.bkgCanvas.layers=[],r=new f(this.cId,this.cnvs),this.bkgCanvas.layers[0]=r,e(s,250)),void 0===u||this.bkgCanvas.hasOwnProperty("timeline")||(this.bkgCanvas.timeline=new u),this.cnvs.hasOwnProperty("resized")||(this.cnvs.setAttribute("width",this.rawWidth),this.cnvs.setAttribute("height",this.rawHeight),this.cnvs.resized=!0),this.ctx=this.cnvs.getContext("2d"),this.yDown=!0,this.vpW=this.rawWidth,this.vpH=this.rawHeight,this.vpOrgX=0,this.vpOrgYsvg=0,this.vpOrgYrhc=this.rawHeight,this.vpOrgY=this.vpOrgYsvg,this.xscl=1,this.yscl=1,this.xoffset=0,this.yoffset=0,this.savWC={xscl:this.xscl,yscl:this.yscl,xoffset:this.xoffset,yoffset:this.yoffset},this.ctx.textAlign="left",this.ctx.textBaseline="alphabetic",this.penCol="rgba(0, 0, 0, 1.0)",this.penWid=1,this.lineCap="butt",this.paintCol="rgba(128,128,128,1.0)",this.fontSize=12,this.fontWeight=400,this.fontFamily="Consolas, Monaco, 'Andale Mono', monospace",this.clipCount=0,this.getUnique=function(){return m+=1},void v(this))},Cango.prototype.animation=function(t,e,s,i){var r,a
return a=this.cId+"_"+this.getUnique(),r=new d(a,this,t,e,s,i),this.stopAnimation(),this.bkgCanvas.timeline.animTasks.push(r),r.id},Cango.prototype.pauseAnimation=function(){this.bkgCanvas.timeline.pauseAnimation()},Cango.prototype.playAnimation=function(t,e){this.bkgCanvas.timeline.playAnimation(t,e)},Cango.prototype.stopAnimation=function(){this.bkgCanvas.timeline.stopAnimation()},Cango.prototype.stepAnimation=function(){this.bkgCanvas.timeline.stepAnimation()},Cango.prototype.deleteAnimation=function(t){var e=this
this.pauseAnimation(),this.bkgCanvas.timeline.animTasks.forEach(function(s,i){return s.id===t?void e.bkgCanvas.timeline.animTasks.splice(i,1):void 0})},Cango.prototype.deleteAllAnimations=function(){this.stopAnimation(),this.bkgCanvas.timeline.animTasks=[]},Cango.prototype.toPixelCoords=function(t,e){var s=this.vpOrgX+this.xoffset+t*this.xscl,i=this.vpOrgY+this.yoffset+e*this.yscl
return{x:s,y:i}},Cango.prototype.toWorldCoords=function(t,e){var s=(t-this.vpOrgX-this.xoffset)/this.xscl,i=(e-this.vpOrgY-this.yoffset)/this.yscl
return{x:s,y:i}},Cango.prototype.getCursorPosWC=function(t){var e=t||window.event,s=this.cnvs.getBoundingClientRect(),i=(e.clientX-s.left-this.vpOrgX-this.xoffset)/this.xscl,r=(e.clientY-s.top-this.vpOrgY-this.yoffset)/this.yscl
return{x:i,y:r}},Cango.prototype.clearCanvas=function(t){function e(t){var e=r.toPixelCoords(t.grad[0],t.grad[1]),s=r.toPixelCoords(t.grad[2],t.grad[3]),i=r.ctx.createLinearGradient(e.x,e.y,s.x,s.y)
return t.colorStops.forEach(function(t){i.addColorStop(t[0],t[1])}),i}function s(t){var e=r.toPixelCoords(t.grad[0],t.grad[1]),s=t.grad[2]*r.xscl,i=r.toPixelCoords(t.grad[3],t.grad[4]),a=t.grad[5]*r.xscl,n=r.ctx.createRadialGradient(e.x,e.y,s,i.x,i.y,a)
return t.colorStops.forEach(function(t){n.addColorStop(t[0],t[1])}),n}var i,r=this
t?(this.ctx.save(),t instanceof LinearGradient?this.ctx.fillStyle=e(t):t instanceof RadialGradient?this.ctx.fillStyle=s(t):this.ctx.fillStyle=t,this.ctx.fillRect(0,0,this.rawWidth,this.rawHeight),this.ctx.restore()):this.ctx.clearRect(0,0,this.rawWidth,this.rawHeight),i=g(this),i.dragObjects.length=0,this.cnvs.alphaOvl&&this.cnvs.alphaOvl.parentNode&&this.cnvs.alphaOvl.parentNode.removeChild(this.cnvs.alphaOvl)},Cango.prototype.gridboxPadding=function(t,e,s,i){function r(){o.vpW=o.rawWidth,o.vpH=o.rawHeight,o.vpOrgX=0,o.vpOrgY=0,o.setWorldCoordsSVG()}var a,n,o=this
if(void 0===t)return void r()
if(void 0===e){if(t>=50||0>t)return console.error("gridbox right must be greater than left"),void r()
e=t}return(0>t||t>99)&&(t=0),(0>e||e>99/this.aRatio)&&(e=0),void 0===s?s=t:0>s&&(s=0),void 0===i?i=e:0>i&&(i=0),a=100-t-s,n=100/this.aRatio-i-e,0>a||0>n?(console.error("invalid gridbox dimensions"),void r()):(this.vpW=a*this.rawWidth/100,this.vpH=n*this.rawWidth/100,this.vpOrgX=t*this.rawWidth/100,this.vpOrgYsvg=i*this.rawWidth/100,this.vpOrgYrhc=this.vpOrgYsvg+this.vpH,this.vpOrgY=this.vpOrgYsvg,this.yDown=!0,void this.setWorldCoordsSVG())},Cango.prototype.fillGridbox=function(t){function e(t){var e=i.toPixelCoords(t.grad[0],t.grad[1]),s=i.toPixelCoords(t.grad[2],t.grad[3]),r=i.ctx.createLinearGradient(e.x,e.y,s.x,s.y)
return t.colorStops.forEach(function(t){r.addColorStop(t[0],t[1])}),r}function s(t){var e=i.toPixelCoords(t.grad[0],t.grad[1]),s=t.grad[2]*i.xscl,r=i.toPixelCoords(t.grad[3],t.grad[4]),a=t.grad[5]*i.xscl,n=i.ctx.createRadialGradient(e.x,e.y,s,r.x,r.y,a)
return t.colorStops.forEach(function(t){n.addColorStop(t[0],t[1])}),n}var i=this,r=t||this.paintCol,a=this.vpOrgYsvg
this.ctx.save(),r instanceof LinearGradient?this.ctx.fillStyle=e(r):r instanceof RadialGradient?this.ctx.fillStyle=s(r):this.ctx.fillStyle=r,this.ctx.fillRect(this.vpOrgX,a,this.vpW,this.vpH),this.ctx.restore()},Cango.prototype.setWorldCoordsSVG=function(t,e,s,i){var r=t||0,a=e||0
this.yDown=!0,this.vpOrgY=this.vpOrgYsvg,s&&s>0?this.xscl=this.vpW/s:this.xscl=1,i&&i>0?this.yscl=this.vpH/i:this.yscl=this.xscl,this.xoffset=-r*this.xscl,this.yoffset=-a*this.yscl,this.savWC={xscl:this.xscl,yscl:this.yscl,xoffset:this.xoffset,yoffset:this.yoffset}},Cango.prototype.setWorldCoordsRHC=function(t,e,s,i){var r=t||0,a=e||0
this.yDown=!1,this.vpOrgY=this.vpOrgYrhc,s&&s>0?this.xscl=this.vpW/s:this.xscl=1,i&&i>0?this.yscl=-this.vpH/i:this.yscl=-this.xscl,this.xoffset=-r*this.xscl,this.yoffset=-a*this.yscl,this.savWC={xscl:this.xscl,yscl:this.yscl,xoffset:this.xoffset,yoffset:this.yoffset}},Cango.prototype.setPropertyDefault=function(t,e){if("string"==typeof t&&void 0!==e&&null!==e)switch(t.toLowerCase()){case"fillcolor":("string"==typeof e||"object"==typeof e)&&(this.paintCol=e)
break
case"strokecolor":("string"==typeof e||"object"==typeof e)&&(this.penCol=e)
break
case"linewidth":case"strokewidth":this.penWid=e
break
case"linecap":"string"!=typeof e||"butt"!==e&&"round"!==e&&"square"!==e||(this.lineCap=e)
break
case"fontfamily":"string"==typeof e&&(this.fontFamily=e)
break
case"fontsize":this.fontSize=e
break
case"fontweight":("string"==typeof e||e>=100&&900>=e)&&(this.fontWeight=e)
break
case"steptime":e>=15&&500>=e&&(this.stepTime=e)
break
default:return}},Cango.prototype.dropShadow=function(t){var e=0,s=0,i=0,r="#000000",a=1,n=1
void 0!=t&&(e=t.shadowOffsetX||0,s=t.shadowOffsetY||0,i=t.shadowBlur||0,r=t.shadowColor||"#000000","SHAPE"===t.type||"PATH"===t.type&&!t.iso?(a*=this.xscl,n*=this.yscl):(a*=this.xscl,n*=-this.xscl)),this.ctx.shadowOffsetX=e*a,this.ctx.shadowOffsetY=s*n,this.ctx.shadowBlur=i*a,this.ctx.shadowColor=r},Cango.prototype.render=function(t,e){function s(t){var e
t.iso||(e=new a("SCL",1,d),t.netTfmAry.unshift(e)),r(t.ofsTfm),t.savScale=1,t.netTfmAry.forEach(function(e){"SCL"===e.type&&(t.savScale*=Math.abs(e.args[0])),"TRN"===e.type?t.iso?y[e.type].call(t,[e.args[0],e.args[1]*d]):y[e.type].call(t,[e.args[0],e.args[1]]):y[e.type].call(t,e.args)}),t.netTfm=t.ofsTfm.multiply(t.grpTfm)}function i(t){var e,s,i
t.parent?(e=t.parent.netTfmAry,s=t.parent.netTfm):(e=[],s=document.createElementNS("http://www.w3.org/2000/svg","svg").createSVGMatrix()),i=e.concat(t.ofsTfmAry),"GRP"===t.type?t.netTfmAry=i:(t.netTfmAry=i.concat(t.hardTfmAry),t.grpTfm=s),t.dwgOrg={x:0,y:0},i.forEach(function(e){t.dwgOrg=y[e.type].call(t.dwgOrg,e.args)})}function n(){function e(t,i){t(i),"GRP"===i.type?i.children.forEach(function(s){e(t,s)}):s.push(i)}var s=[]
return e(i,t),s}function o(t){function e(){t.formatImg(c),s(t),c.paintImg(t)}"IMG"===t.type?t.imgBuf.complete||t.imgBuf instanceof HTMLCanvasElement?e():t.imgBuf.addEventListener("load",e):"TEXT"===t.type?(t.formatText(c),s(t),c.paintText(t)):"CLIP"===t.type?(s(t),c.applyClipMask(t)):(s(t),c.paintPath(t))}function h(t){t.transform.reset(),"GRP"===t.type&&t.children.forEach(function(t){h(t)})}var l,c=this,d=Math.abs(c.yscl/c.xscl)
return"string"!=typeof t.type?void console.log("render called on bad object type"):(e===!0&&this.clearCanvas(),"GRP"===t.type?(l=n(),l.forEach(o)):(i(t),o(t)),h(t),void this.resetClip())},Cango.prototype.genLinGrad=function(t,e){var s=t.grad[0],r=t.grad[1],a=t.grad[2],n=t.grad[3],o=i(s,r,e),h=i(a,n,e),l=this.ctx.createLinearGradient(o.x,o.y,h.x,h.y)
return t.colorStops.forEach(function(t){l.addColorStop(t[0],t[1])}),l},Cango.prototype.genRadGrad=function(t,e,s){var r=t.grad[0],a=t.grad[1],n=t.grad[2]*s,o=t.grad[3],h=t.grad[4],l=t.grad[5]*s,c=i(r,a,e),d=i(o,h,e),p=this.ctx.createRadialGradient(c.x,c.y,n,d.x,d.y,l)
return t.colorStops.forEach(function(t){p.addColorStop(t[0],t[1])}),p},Cango.prototype.paintImg=function(t){var e,s,i,r,a=this,n=t.imgBuf,o=this.yDown?this.xscl:-this.xscl,h=x.translate(this.vpOrgX+this.xoffset,this.vpOrgY+this.yoffset).scaleNonUniform(this.xscl,o).multiply(t.netTfm)
this.yDown||(h=h.flipY()),this.ctx.save(),this.ctx.setTransform(h.a,h.b,h.c,h.d,h.e,h.f),this.dropShadow(t),this.ctx.drawImage(n,t.imgLorgX,t.imgLorgY,t.width,t.height),t.border&&(this.ctx.beginPath(),t.drawCmds.forEach(function(t){a.ctx[C[t.type]].apply(a.ctx,t.values)}),this.ctx.restore(),this.ctx.save(),i=t.strokeCol||this.penCol,r=i instanceof LinearGradient?this.genLinGrad(i,h):i instanceof RadialGradient?this.genRadGrad(i,h,t.savScale*this.xscl):i,t.lineWidthWC?this.ctx.lineWidth=t.lineWidthWC*t.savScale*this.xscl:this.ctx.lineWidth=t.lineWidth||this.penWid,this.ctx.strokeStyle=r,this.ctx.lineCap=t.lineCap||this.lineCap,this.ctx.stroke()),this.ctx.restore(),null!==t.dragNdrop&&(e=g(this),e!==t.dragNdrop.layer&&t.dragNdrop.layer&&(s=t.dragNdrop.layer.dragObjects.indexOf(this),-1!==s&&t.dragNdrop.layer.dragObjects.splice(s,1)),t.dragNdrop.cgo=this,t.dragNdrop.layer=e,t.dragNdrop.layer.dragObjects.includes(t)||t.dragNdrop.layer.dragObjects.push(t))},Cango.prototype.paintPath=function(t){var e,s,i,r,a,n=this,o=this.yDown?this.xscl:-this.xscl,h=x.translate(this.vpOrgX+this.xoffset,this.vpOrgY+this.yoffset).scaleNonUniform(this.xscl,o).multiply(t.netTfm)
this.ctx.save(),this.ctx.transform(h.a,h.b,h.c,h.d,h.e,h.f),this.ctx.beginPath(),t.drawCmds.forEach(function(t){n.ctx[C[t.type]].apply(n.ctx,t.values)}),this.ctx.restore(),this.ctx.save(),e=t.fillCol||this.paintCol,s=e instanceof LinearGradient?this.genLinGrad(e,h):e instanceof RadialGradient?this.genRadGrad(e,h,t.savScale*this.xscl):e,e=t.strokeCol||this.penCol,i=e instanceof LinearGradient?this.genLinGrad(e,h):e instanceof RadialGradient?this.genRadGrad(e,h,t.savScale*this.xscl):e,this.dropShadow(t),"SHAPE"===t.type&&(this.ctx.fillStyle=s,t.clearFlag?(this.ctx.save(),this.ctx.globalCompositeOperation="destination-out",this.ctx.fill(t.fillRule),this.ctx.restore()):this.ctx.fill(t.fillRule)),("PATH"===t.type||t.border)&&(t.border&&this.dropShadow(),Array.isArray(t.dashed)&&t.dashed.length&&(this.ctx.setLineDash(t.dashed),this.ctx.lineDashOffset=t.dashOffset||0),t.lineWidthWC?this.ctx.lineWidth=t.lineWidthWC*t.savScale*this.xscl:this.ctx.lineWidth=t.lineWidth||this.penWid,this.ctx.strokeStyle=i,this.ctx.lineCap=t.lineCap||this.lineCap,this.ctx.stroke(),this.ctx.setLineDash([]),this.ctx.lineDashOffset=0),this.ctx.restore(),null!==t.dragNdrop&&(r=g(this),r!==t.dragNdrop.layer&&t.dragNdrop.layer&&(a=t.dragNdrop.layer.dragObjects.indexOf(this),-1!==a&&t.dragNdrop.layer.dragObjects.splice(a,1)),t.dragNdrop.cgo=this,t.dragNdrop.layer=r,t.dragNdrop.layer.dragObjects.includes(t)||t.dragNdrop.layer.dragObjects.push(t))},Cango.prototype.applyClipMask=function(t){if(!t.drawCmds.length)return void this.resetClip()
var e=this,s=this.yDown?this.xscl:-this.xscl,i=x.translate(this.vpOrgX+this.xoffset,this.vpOrgY+this.yoffset).scaleNonUniform(this.xscl,s).multiply(t.netTfm)
this.ctx.save(),this.clipCount+=1,this.ctx.save(),this.ctx.transform(i.a,i.b,i.c,i.d,i.e,i.f),this.ctx.beginPath(),t.drawCmds.forEach(function(t){e.ctx[C[t.type]].apply(e.ctx,t.values)}),this.ctx.closePath(),this.ctx.restore(),this.ctx.clip(t.fillRule),this.ctx.fillStyle="rgba(0, 0, 0, 0.0)",this.ctx.fillRect(0,0,1,1)},Cango.prototype.resetClip=function(){for(;this.clipCount>0;)this.ctx.restore(),this.clipCount--},Cango.prototype.paintText=function(t){var e,s,i,r,a,n=this,o=this.yDown?this.xscl:-this.xscl,h=x.translate(this.vpOrgX+this.xoffset,this.vpOrgY+this.yoffset).scaleNonUniform(this.xscl,o).multiply(t.netTfm).scaleNonUniform(1/this.xscl,1/o)
e=t.fontWeight||this.fontWeight,s=t.fontSizeZC,i=t.fontFamily||this.fontFamily,this.ctx.save(),this.ctx.setTransform(h.a,h.b,h.c,h.d,h.e,h.f),"string"==typeof t.bgFillColor&&(this.ctx.save(),this.ctx.fillStyle=t.bgFillColor,this.ctx.strokeStyle=t.bgFillColor,this.ctx.lineWidth=.1*s,this.ctx.beginPath(),t.drawCmds.forEach(function(t){n.ctx[C[t.type]].apply(n.ctx,t.values)}),this.ctx.fill(),this.ctx.stroke(),this.ctx.restore()),this.ctx.font=e+" "+s+"px "+i,this.ctx.fillStyle=t.fillCol||this.paintCol,this.ctx.fillText(t.txtStr,t.imgLorgX,t.imgLorgY),t.border&&(this.dropShadow(),t.lineWidthWC?this.ctx.lineWidth=t.lineWidthWC*this.xscl:this.ctx.lineWidth=t.lineWidth||this.penWid,this.ctx.strokeStyle=t.strokeCol||this.penCol,this.ctx.lineCap=t.lineCap||this.lineCap,this.ctx.strokeText(t.txtStr,t.imgLorgX,t.imgLorgY)),this.ctx.restore(),null!==t.dragNdrop&&(r=g(this),r!==t.dragNdrop.layer&&t.dragNdrop.layer&&(a=t.dragNdrop.layer.dragObjects.indexOf(this),-1!==a&&t.dragNdrop.layer.dragObjects.splice(a,1)),t.dragNdrop.cgo=this,t.dragNdrop.layer=r,t.dragNdrop.layer.dragObjects.includes(t)||t.dragNdrop.layer.dragObjects.push(t))},Cango.prototype.drawPath=function(t,e){var s=e||{},i=s.x||0,r=s.y||0,a=s.scl||1,n=s.degs||0,o=new Path(t,e)
n&&o.transform.rotate(n),1!==a&&o.transform.scale(a),(i||r)&&o.transform.translate(i,r),this.render(o)},Cango.prototype.drawShape=function(t,e){var s=e||{},i=s.x||0,r=s.y||0,a=s.scl||1,n=s.degs||0,o=new Shape(t,e)
n&&o.transform.rotate(n),1!==a&&o.transform.scale(a),(i||r)&&o.transform.translate(i,r),this.render(o)},Cango.prototype.drawText=function(t,e){var s=e||{},i=s.x||0,r=s.y||0,a=s.scl||1,n=s.degs||0,o=new Text(t,e)
n&&o.transform.rotate(n),1!==a&&o.transform.scale(a),(i||r)&&o.transform.translate(i,r),this.render(o)},Cango.prototype.drawImg=function(t,e){var s=e||{},i=s.x||0,r=s.y||0,a=s.scl||1,n=s.degs||0,o=new Img(t,e)
n&&o.transform.rotate(n),1!==a&&o.transform.scale(a),(i||r)&&o.transform.translate(i,r),this.render(o)},Cango.prototype.clearShape=function(t,e){var s=e||{},i=s.x||0,r=s.y||0,a=s.scl||1,n=s.degs||0,o=new Shape(t,e)
n&&o.transform.rotate(n),1!==a&&o.transform.scale(a),(i||r)&&o.transform.translate(i,r),o.fillCol="rgba(0,0,0,1.0)",o.clearFlag=!0,this.render(o)},Cango.prototype.createLayer=function(){var t,e,s,i,r,a,n=this.rawWidth,o=this.rawHeight,h=this.bkgCanvas.layers.length
return-1!==this.cId.indexOf("_ovl_")?(console.log("canvas layers can't create layers"),""):(s=this.getUnique(),i=this.cId+"_ovl_"+s,t="<canvas id='"+i+"' style='position:absolute' width='"+n+"' height='"+o+"'></canvas>",a=this.bkgCanvas.layers[h-1].cElem,a.insertAdjacentHTML("afterend",t),e=document.getElementById(i),e.style.backgroundColor="transparent",e.style.left=this.bkgCanvas.offsetLeft+this.bkgCanvas.clientLeft+"px",e.style.top=this.bkgCanvas.offsetTop+this.bkgCanvas.clientTop+"px",e.style.width=this.bkgCanvas.offsetWidth+"px",e.style.height=this.bkgCanvas.offsetHeight+"px",r=new f(i,e),this.bkgCanvas.layers.push(r),i)},Cango.prototype.deleteLayer=function(t){var e,s
for(s=1;s<this.bkgCanvas.layers.length;s++)this.bkgCanvas.layers[s].id===t&&(e=this.bkgCanvas.layers[s].cElem,e&&(e.alphaOvl&&e.alphaOvl.parentNode&&e.alphaOvl.parentNode.removeChild(e.alphaOvl),e.parentNode.removeChild(e)),this.bkgCanvas.layers.splice(s,1))},Cango.prototype.deleteAllLayers=function(){var t,e
for(t=this.bkgCanvas.layers.length-1;t>0;t--)e=this.bkgCanvas.layers[t].cElem,e&&(e.alphaOvl&&e.alphaOvl.parentNode&&e.alphaOvl.parentNode.removeChild(e.alphaOvl),e.parentNode.removeChild(e)),this.bkgCanvas.layers.splice(t,1)},Cango.prototype.dupCtx=function(e){this.yDown=e.yDown,this.vpW=e.vpW,this.vpH=e.vpH,this.vpOrgYsvg=e.vpOrgYsvg,this.vpOrgYrhc=e.vpOrgYrhc,this.vpOrgX=e.vpOrgX,this.vpOrgY=e.vpOrgY,this.xscl=e.xscl,this.yscl=e.yscl,this.xoffset=e.xoffset,this.yoffset=e.yoffset,this.savWC=t(e.savWC),this.penCol=e.penCol.slice(0),this.penWid=e.penWid,this.lineCap=e.lineCap.slice(0),this.paintCol=e.paintCol.slice(0),this.fontSize=e.fontSize,this.fontWeight=e.fontWeight,this.fontFamily=e.fontFamily.slice(0)},initZoomPan=function(t,e,s){function i(t){function e(e){var s=e.toPixelCoords(0,0),i=e.rawWidth/2-s.x,r=e.rawHeight/2-s.y
e.xoffset+=i-i/t,e.yoffset+=r-r/t,e.xscl/=t,e.yscl/=t}f.forEach(e),s()}function r(t,e){function i(s){s.xoffset-=t,s.yoffset-=e}f.forEach(i),s()}function a(){function t(t){t.xscl=t.savWC.xscl,t.yscl=t.savWC.yscl,t.xoffset=t.savWC.xoffset,t.yoffset=t.savWC.yoffset}f.forEach(t),s()}var n,o,h,l,c,d,p,u,f,g=["m",-7,-2,"l",7,5,7,-5],v=["m",-6,-6,"l",12,12,"m",0,-12,"l",-12,12],y=["m",-7,0,"l",14,0,"m",-7,-7,"l",0,14],m=["m",-7,0,"l",14,0]
u=new Cango(t),u.clearCanvas(),u.setWorldCoordsRHC(-u.rawWidth+44,-u.rawHeight+44),u.drawShape(shapeDefs.rectangle(114,80),{x:-17,y:0,fillColor:"rgba(0, 50, 0, 0.12)"}),h=new Shape(shapeDefs.rectangle(20,20,2),{fillColor:"rgba(0,0,0,0.2)"}),h.enableDrag(null,null,a),u.render(h),p=new Shape(shapeDefs.rectangle(20,20,2),{fillColor:"rgba(0,0,0,0.2)"}),p.enableDrag(null,null,function(){r(50,0)}),p.translate(22,0),u.render(p),l=new Shape(shapeDefs.rectangle(20,20,2),{fillColor:"rgba(0,0,0,0.2)"}),l.enableDrag(null,null,function(){r(0,-50)}),l.translate(0,22),u.render(l),d=new Shape(shapeDefs.rectangle(20,20,2),{fillColor:"rgba(0,0,0,0.2)"}),d.enableDrag(null,null,function(){r(-50,0)}),d.translate(-22,0),u.render(d),c=new Shape(shapeDefs.rectangle(20,20,2),{fillColor:"rgba(0,0,0,0.2)"}),c.enableDrag(null,null,function(){r(0,50)}),c.translate(0,-22),u.render(c),n=new Shape(shapeDefs.rectangle(20,20,2),{fillColor:"rgba(0,0,0,0.2)"}),n.enableDrag(null,null,function(){i(1/1.2)}),n.translate(-56,11),u.render(n),o=new Shape(shapeDefs.rectangle(20,20,2),{fillColor:"rgba(0,0,0,0.2)"}),o.enableDrag(null,null,function(){i(1.2)}),o.translate(-56,-11),u.render(o),g=["m",-7,-2,"l",7,5,7,-5],u.drawPath(g,{x:0,y:22,strokeColor:"white",lineWidth:2}),u.drawPath(g,{x:22,y:0,strokeColor:"white",lineWidth:2,degs:-90}),u.drawPath(g,{x:-22,y:0,strokeColor:"white",lineWidth:2,degs:90}),u.drawPath(g,{x:0,y:-22,strokeColor:"white",lineWidth:2,degs:180}),u.drawPath(y,{x:-56,y:11,strokeColor:"white",lineWidth:2}),u.drawPath(m,{x:-56,y:-11,strokeColor:"white",lineWidth:2}),u.drawPath(v,{strokeColor:"white",lineWidth:2}),f=Array.isArray(e)?e:[e]},Cango}()