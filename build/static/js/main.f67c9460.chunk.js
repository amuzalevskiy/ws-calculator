(this["webpackJsonpws-calculator"]=this["webpackJsonpws-calculator"]||[]).push([[0],{100:function(e,t,a){e.exports={selectLabel:"DirectSelect_selectLabel__1SGL6"}},112:function(e,t,a){e.exports=a(159)},117:function(e,t,a){},14:function(e,t,a){e.exports={mapContainer:"WSField_mapContainer__2pkEj",hexagonContainer:"WSField_hexagonContainer__3Wumq",trapezoidUpOut:"WSField_trapezoidUpOut__2rSzF",trapezoidDownOut:"WSField_trapezoidDownOut__3LHow",trapezoidUpIn:"WSField_trapezoidUpIn__1UbrC",trapezoidDownIn:"WSField_trapezoidDownIn__2zCDP",A1:"WSField_A1__2GwA6",B1:"WSField_B1__1Jtrw",C1:"WSField_C1__2h60E",D1:"WSField_D1__XfQOW",E1:"WSField_E1__9JWCp",F1:"WSField_F1__1U0ms",G1:"WSField_G1__cLlDH",A2:"WSField_A2__29Zv6",B2:"WSField_B2__1fhRH",C2:"WSField_C2__f0Rbi",D2:"WSField_D2__MZDge",E2:"WSField_E2__2cp3u",F2:"WSField_F2__3jw7R",G2:"WSField_G2__1fKUm",A3:"WSField_A3__2wBAv",B3:"WSField_B3__bKn0Q",C3:"WSField_C3__11p5H",D3:"WSField_D3__1HjH1",E3:"WSField_E3__5-eRB",F3:"WSField_F3__26mbx",G3:"WSField_G3__2emw4",A4:"WSField_A4__3B3-R",B4:"WSField_B4__3odVy",C4:"WSField_C4__1SczW",D4:"WSField_D4__2UwSK",E4:"WSField_E4__2xd09",F4:"WSField_F4__3DCyY",G4:"WSField_G4__1zOnZ",B5:"WSField_B5__QlOPw",C5:"WSField_C5__2VaBa",D5:"WSField_D5__xgLz8",E5:"WSField_E5__1uCuG",F5:"WSField_F5__3lM3t",C6:"WSField_C6__22oAh",D6:"WSField_D6__2wo5N",E6:"WSField_E6__2r97j",D7:"WSField_D7__1Thsq",lineA:"WSField_lineA__5h5Kj",lineB:"WSField_lineB__25vcr",lineC:"WSField_lineC__2tg4Q",lineD:"WSField_lineD__2RBoc",lineE:"WSField_lineE__1ICtD",lineF:"WSField_lineF__yP4GR",lineG:"WSField_lineG__3yw7Y",hexLabel:"WSField_hexLabel__6Bbr-",cellType:"WSField_cellType__2g9he",hydro:"WSField_hydro__2h_CG",asteroids:"WSField_asteroids__1m0kP"}},159:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),r=a(10),c=a.n(r),o=(a(117),a(7)),i=a(199),s=a(200),u=a(103),d=a(204),m=a(201),f=a(160),p=a(210),v=a(202),b=a(15),E=a.n(b),h=a(13),_=a.n(h),y=a(25),g=a(44),C=a(45),w=(a(30),a(101)),O=a.n(w),S=a(24),j=a(63),F=a(71),k=a(70),x=a(26),N=a.n(x),L=a(41),T=a(92),W=a.n(T),D={},B=a(32),A=a.n(B),G="ec2-3-68-118-180.eu-central-1.compute.amazonaws.com",P="".concat("https","://").concat(G).concat(":3030","/api"),z=Symbol("empty"),R=Symbol("listeners");function I(e){if("string"===typeof e){if(""===(e=e.split("/"))[0])return e;throw new Error("Invalid JSON pointer.")}if(Array.isArray(e))return e;throw new Error("Invalid JSON pointer.")}function U(e,t){return function(a){var n=t(N.a.get(a,e));"undefined"!==typeof n&&N.a.set(a,e,n)}}Object(L.c)();var M=function(e){Object(F.a)(a,e);var t=Object(k.a)(a);function a(){var e;Object(g.a)(this,a);for(var n=arguments.length,l=new Array(n),r=0;r<n;r++)l[r]=arguments[r];return(e=t.call.apply(t,[this].concat(l))).enableSave=!1,e.unsavedChanges=[],e.unsavedInverseChanges=[],e.syncTimeout=0,e.get=function(t){return"~"===t[0]&&(t=t.substr(1)),N.a.get(e.value,t)},e.set=function(t,a){return e.modify((function(e){"~"===t[0]&&(t=t.substr(1)),N.a.set(e,t,a)}))},e.modify=function(t,a){a||(a=t);var n=e.enableSave;"dontSendUpdateToServer"===t&&(n=!1);var l=200;"instant"===t&&(l=0);var r=Object(L.b)(e.value,a,(function(t,a){var r,c;n?((r=e.unsavedChanges).push.apply(r,Object(S.a)(t)),(c=e.unsavedInverseChanges).push.apply(c,Object(S.a)(a)),e.syncTimeout||(e.syncTimeout=setTimeout(e.sync,l))):(clearTimeout(e.syncTimeout),e.unsavedChanges=[],e.unsavedInverseChanges=[])}));if(r!==e.value){var c=e.value;e.value=r,e.onChange(c,r)}},e.sync=function(){e.unsavedChanges.length&&(A.a.post(P+"/file/"+e.value.filename,e.unsavedChanges).catch((function(e){})),e.unsavedChanges=[],e.unsavedInverseChanges=[]),e.syncTimeout=0},e.createChildContext=function(t,a){return a&&a.value===N.a.get(e.value,t)?a:new Q(Object(j.a)(e),t)},e}return Object(C.a)(a,[{key:"getRootContext",value:function(){return this}},{key:"onChange",value:function(e,t){}},{key:"addChangeListener",value:function(e,t){throw new Error("Abstract")}},{key:"removeChangeListener",value:function(e,t){throw new Error("Abstract")}},{key:"useState",value:function(e){var t=this,a=Object(n.useState)(z),l=Object(o.a)(a,2),r=l[0],c=l[1];r===z&&(r=this.get(e));var i=Object(n.useCallback)((function(a){if("function"===typeof a){var n=U(e,a);t.modify(n)}else t.set(e,a)}),[this,e]);return Object(n.useEffect)((function(){return t.addChangeListener(e,c),function(){t.removeChangeListener(e,c)}}),[this,e,i]),[r,i]}},{key:"basepath",get:function(){return""}}]),a}(W.a),H=function(e){Object(F.a)(a,e);var t=Object(k.a)(a);function a(e){var n;return Object(g.a)(this,a),(n=t.call(this)).enableSave=!0,n.listenersTree={},n.value=e,n}return Object(C.a)(a,[{key:"cloneDeep",value:function(){return new a(E.a.cloneDeep(this.value))}},{key:"addChangeListener",value:function(e,t){"~"===e[0]&&(e=e.substr(1));for(var a=I(e),n=this.listenersTree,l=1;l<a.length;l++){var r=a[l];n[r]||(n[r]={}),n=n[r]}n[R]||(n[R]=[]),n[R].push(t)}},{key:"removeChangeListener",value:function(e,t){"~"===e[0]&&(e=e.substr(1));var a=N.a.get(this.listenersTree,e),n=a[R],l=n.indexOf(t);-1!==l&&n.splice(l,1),0===n.length&&(delete a[R],this.cascadeDeleteChangeListeners(I(e)))}},{key:"cascadeDeleteChangeListeners",value:function(e){var t=N.a.get(this.listenersTree,e);if(!Object.keys(t).length&&!t[R]){var a=e.pop();delete N.a.get(this.listenersTree,e)[a],e.length>1&&this.cascadeDeleteChangeListeners(e)}}},{key:"onChange",value:function(e,t){console.log("context value",t),this.onChangeRec(e,t,this.listenersTree)}},{key:"onChangeRec",value:function(e,t,a){for(var n in a[R]&&a[R].forEach((function(e){e(t)})),a){var l=void 0===e?void 0:e[n],r=void 0===t?void 0:t[n];l!==r&&this.onChangeRec(l,r,a[n])}}}]),a}(M),Q=function(e){Object(F.a)(a,e);var t=Object(k.a)(a);function a(e,n){var l;return Object(g.a)(this,a),(l=t.call(this)).get=function(e){return"~"===e[0]?l.getRootContext().get(e):N.a.get(l.value,e)},l.set=function(e,t){return"~"===e[0]?l.getRootContext().set(e,t):l.modify((function(a){N.a.set(a,e,t)}))},l.modify=function(e,t){t||(t=e,e=void 0);var a=U(l.pointer,t);l.previosContext.modify(e||a,e?a:void 0)},l.previosContext=e,l.pointer=n,l}return Object(C.a)(a,[{key:"getRootContext",value:function(){return this.previosContext.getRootContext()}},{key:"addChangeListener",value:function(e,t){return"~"===e[0]?this.getRootContext().addChangeListener(e,t):this.previosContext.addChangeListener(this.pointer+e,t)}},{key:"removeChangeListener",value:function(e,t){return"~"===e[0]?this.getRootContext().removeChangeListener(e,t):this.previosContext.removeChangeListener(this.pointer+e,t)}},{key:"basepath",get:function(){return this.previosContext.basepath+this.pointer}},{key:"value",get:function(){return this.previosContext.get(this.pointer)},set:function(e){this.previosContext.set(this.pointer,e)}}]),a}(M),V=Object(n.createContext)(),q=function(e){var t=e.pointer,a=e.children,r=Object(n.useContext)(V);"object"!==typeof r.get(t)&&r.set(t,{});var c=Object(n.useState)(r),i=Object(o.a)(c,2),s=i[0],u=i[1],d=r.createChildContext(t,s);return d!==s&&u(d),l.a.createElement(V.Provider,{value:d},a)},J=function(e){var t=e.children,a=Object(n.useRef)(null);return null===a.current&&(a.current=new H(D)),l.a.createElement(V.Provider,{value:a.current},t)},Y=a(50),K=a(93),X=a.n(K),Z=function(e){var t=e.children;return l.a.createElement("div",{className:X.a.container},t)},$=a(189),ee=a(94),te=a.n(ee),ae=function(e){return l.a.createElement($.a,Object.assign({className:"".concat(te.a.main," ").concat(e.className),variant:"outlined",color:"primary",disableElevation:!0},e))},ne=a(194),le=a(193),re=a(206),ce=a(99),oe=a.n(ce),ie=a(51),se=a.n(ie),ue=a(205),de=function(e){var t=e.label,a=e.pointer,r=e.disabled,c=Object(n.useContext)(V).useState(a),i=Object(o.a)(c,2),s=i[0],u=i[1],d=Object(n.useCallback)((function(e){var t=e.target.checked;u(t)}),[u]),m=Object(n.useMemo)((function(){return l.a.createElement(ue.a,{disabled:r,color:"default",checked:!!s,onChange:d})}),[r,d,s]);return l.a.createElement(le.a,{control:m,label:t})};E.a.defaultsDeep(D,{editor:{collapse:{}}});var me=function(e){var t=e.label,a=e.pointer,r=e.checkboxPointer,c=e.children,i=e.designLess,s=Object(n.useContext)(V),u="~/editor/collapse"+s.basepath+(r||a)+"_$",d=s.useState(u),m=Object(o.a)(d,1)[0],f=!((a||r)&&!i)||!m,p=l.a.createElement("div",{className:se.a.container+(i?" "+se.a.designLess:"")+(f?"":" "+se.a.collapsed)},t&&l.a.createElement("div",{className:se.a.title},!a&&!r||i?l.a.createElement("div",{className:se.a.titleTextOnly},t):l.a.createElement(de,{label:t,pointer:u})),f?l.a.createElement(ne.a,null,c):null);return a?l.a.createElement(q,{pointer:a},p):p},fe=a(69),pe=a.n(fe);E.a.defaultsDeep(D,{revision:0,filename:"",gameType:"absent"});var ve=function(){var e=Object(n.useContext)(V),t=Object(n.useState)([]),a=Object(o.a)(t,2),r=a[0],c=a[1],i=Object(n.useState)(0),s=Object(o.a)(i,2),u=s[0],d=s[1],m=Object(n.useState)(""),f=Object(o.a)(m,2),p=f[0],v=f[1],b=Object(n.useCallback)((function(){d(u+1)}),[u]);Object(n.useEffect)((function(){A.a.get(P+"/list").then((function(e){var t=e.data;c(t)}))}),[u]);var E=Object(n.useCallback)((function(){/^[a-z0-9_-]{5,}$/.test(p)?(e.modify("dontSendUpdateToServer",(function(){return{}})),e.modify("instant",(function(e){var t=Object(Y.a)(Object(Y.a)({},D),{},{gameType:"unknown"});Object.assign(e,t),e.filename=p})),setTimeout((function(){b()}),700)):alert('Filename must contain a-z, 0-9, "_", "-" symbols and length should be at least at least 5')}),[e,p,b]),h=Object(n.useState)(!1),g=Object(o.a)(h,2),C=g[0],w=g[1];return l.a.createElement(Z,{name:"Field"},l.a.createElement(ne.a,{row:!0},!C&&l.a.createElement(ae,{onClick:function(){return w(!0)}},"\u041f\u043e\u043a\u0430\u0437\u0430\u0442\u044c \u0430\u0440\u0445\u0438\u0432"),C&&l.a.createElement(ae,{onClick:function(){return w(!1)}},"\u0421\u043a\u0440\u044b\u0442\u044c \u0430\u0440\u0445\u0438\u0432")),r.filter((function(e){var t=e.name;return C?"_"===t[0]:"_"!==t[0]})).map((function(t){var a=t.name,n=t.mtime,r=a.split("."),c=Object(o.a)(r,1)[0];return l.a.createElement(ne.a,{className:c===e.value.filename?pe.a.selected:void 0,key:c,row:!0},l.a.createElement(le.a,{className:pe.a.filenameLabel,label:c,labelPlacement:"start",control:l.a.createElement("div",null)}),l.a.createElement(le.a,{className:pe.a.mtimeLabel,label:oe()(n).format("MMM D YY, HH:mm"),labelPlacement:"start",control:l.a.createElement("div",null)}),l.a.createElement(ae,{onClick:function(){localStorage.setItem("filename",c),e.modify("dontSendUpdateToServer",(function(){return{filename:c+"*"}}))}},"\u0420\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u0442\u044c"),l.a.createElement(ae,{onClick:Object(y.a)(_.a.mark((function e(){var t,a;return _.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=window.prompt("Please enter new filename"),e.next=3,A.a.post(P+"/file/"+c+"/clone",{name:t});case 3:(a=e.sent).data.error&&alert(a.data.error),b();case 6:case"end":return e.stop()}}),e)})))},"\u041a\u043b\u043e\u043d\u0438\u0440\u043e\u0432\u0430\u0442\u044c"),l.a.createElement(ae,{onClick:function(){window.confirm("Include design?")?window.location.href=P+"/file/"+c+"/export":window.location.href=P+"/file/"+c+"/export?excludeDesign=true"}},"\u042d\u043a\u0441\u043f\u043e\u0440\u0442"),"_"!==c[0]&&l.a.createElement(ae,{onClick:Object(y.a)(_.a.mark((function e(){var t;return _.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,A.a.post(P+"/file/"+c+"/archive");case 2:(t=e.sent).data.error&&alert(t.data.error),b();case 5:case"end":return e.stop()}}),e)})))},"\u0412 \u0430\u0440\u0445\u0438\u0432"),"_"===c[0]&&l.a.createElement(ae,{onClick:Object(y.a)(_.a.mark((function e(){var t;return _.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,A.a.post(P+"/file/"+c+"/unarchive");case 2:(t=e.sent).data.error&&alert(t.data.error),b();case 5:case"end":return e.stop()}}),e)})))},"\u0418\u0437 \u0430\u0440\u0445\u0438\u0432\u0430"))})),l.a.createElement(me,{label:"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0444\u0430\u0439\u043b"},l.a.createElement(ne.a,{row:!0},l.a.createElement(re.a,{size:"small",variant:"outlined",label:"\u0418\u043c\u044f \u043d\u043e\u0432\u043e\u0433\u043e \u0444\u0430\u0439\u043b\u0430",value:void 0===p?"":p,onChange:function(e){var t=e.target.value;v(t)}}),l.a.createElement(ae,{onClick:E},"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u043d\u043e\u0432\u044b\u0439 \u0444\u0430\u0439\u043b"))))},be=a(14),Ee=a.n(be),he=a(197),_e=a(208),ye=a(203),ge=a(209),Ce=a(100),we=a.n(Ce),Oe=function(e){var t=e.label,a=e.pointer,r=e.options,c=e.onBeforeSet,i=e.onChange,s=e.className,u=Object(n.useContext)(V).useState(a),d=Object(o.a)(u,2),m=d[0],f=d[1],p=Object(n.useCallback)(function(){var e=Object(y.a)(_.a.mark((function e(t){var a;return _.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(""===(a=t.target.value)&&(a=void 0),"function"!==typeof c){e.next=5;break}return e.next=5,c(a);case 5:f(a),"function"===typeof i&&i();case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),[c,i,f]);return l.a.createElement(he.a,{variant:"outlined",margin:"dense",className:s},t&&l.a.createElement(_e.a,{className:we.a.selectLabel},t),l.a.createElement(ye.a,{margin:"dense",value:m||"",onChange:p},r.map((function(e,t){var a=e.label,n=e.value;return l.a.createElement(ge.a,{key:t,value:n},a)}))))};function Se(e){var t="#ffffff";switch(e.type){case"our-gates":case"their-gates":t="#ffeeee";break;case"L1":t="#f8fff8";break;case"L5":t="#eeffee";break;case"L10":t="#d0ffd0"}return 3e3===e.hydro&&(t="#eeeeff"),t}E.a.defaultsDeep(D,{ws:{field:{sectors:{A1:{asteroids:4,hydro:350},A2:{asteroids:4,hydro:350},A3:{asteroids:4,hydro:350},A4:{asteroids:4,hydro:350},B1:{asteroids:4,hydro:350},B2:{asteroids:4,hydro:350},B3:{asteroids:4,hydro:350},B4:{asteroids:4,hydro:350},B5:{asteroids:4,hydro:350},C1:{asteroids:4,hydro:350},C2:{asteroids:4,hydro:350},C3:{asteroids:4,hydro:350},C4:{asteroids:4,hydro:350},C5:{asteroids:4,hydro:350},C6:{asteroids:4,hydro:350},D1:{asteroids:4,hydro:350},D2:{asteroids:4,hydro:350},D3:{asteroids:4,hydro:350},D4:{asteroids:0,hydro:0},D5:{asteroids:4,hydro:350},D6:{asteroids:4,hydro:350},D7:{asteroids:4,hydro:350},E1:{asteroids:4,hydro:350},E2:{asteroids:4,hydro:350},E3:{asteroids:4,hydro:350},E4:{asteroids:4,hydro:350},E5:{asteroids:4,hydro:350},E6:{asteroids:4,hydro:350},F1:{asteroids:4,hydro:350},F2:{asteroids:4,hydro:350},F3:{asteroids:4,hydro:350},F4:{asteroids:4,hydro:350},F5:{asteroids:4,hydro:350},G1:{asteroids:4,hydro:350},G2:{asteroids:4,hydro:350},G3:{asteroids:4,hydro:350},G4:{asteroids:4,hydro:350}}}}});var je=[{label:"---"},{label:"\u041d\u0430\u0448\u0438 \u0432\u043e\u0440\u043e\u0442\u0430",value:"our-gates"},{label:"\u0412\u043e\u0440\u043e\u0442\u0430 \u0432\u0440\u0430\u0433\u0430",value:"their-gates"},{label:"\u0415\u0434\u0438\u043d\u0438\u0447\u043a\u0430",value:"L1"},{label:"\u041f\u044f\u0442\u0435\u0440\u043a\u0430",value:"L5"},{label:"\u0414\u0435\u0441\u044f\u0442\u043a\u0430",value:"L10"}],Fe=[{label:"3",value:3},{label:"4",value:4},{label:"5",value:5},{label:"6",value:6}],ke=[{label:"160",value:160},{label:"300",value:300},{label:"350",value:350},{label:"400",value:400},{label:"3000",value:3e3}],xe=function(e){var t=e.place,a=Se(e.sectors[t]);return l.a.createElement("div",{className:"".concat(Ee.a.hexagonContainer," ").concat(Ee.a[t]),style:{"--hexagonColor":a}},l.a.createElement("div",{className:Ee.a.trapezoidUpOut}),l.a.createElement("div",{className:Ee.a.trapezoidDownOut}),l.a.createElement("div",{className:Ee.a.trapezoidUpIn}),l.a.createElement("div",{className:Ee.a.trapezoidDownIn}),l.a.createElement("div",{className:Ee.a.hexLabel},t),"D4"!==t&&l.a.createElement(q,{pointer:"/".concat(t)},l.a.createElement("div",{className:Ee.a.cellType},l.a.createElement(Oe,{label:"\u0422\u0438\u043f",pointer:"/type",options:je})),l.a.createElement("div",{className:Ee.a.hydro},l.a.createElement(Oe,{label:"\u0412",pointer:"/hydro",options:ke})),l.a.createElement("div",{className:Ee.a.asteroids},l.a.createElement(Oe,{label:"A",pointer:"/asteroids",options:Fe}))))},Ne=function(){var e=Object(n.useContext)(V).useState("/ws/field/sectors"),t=Object(o.a)(e,1)[0];return l.a.createElement(Z,{name:"WSField"},l.a.createElement(q,{pointer:"/ws/field/sectors"},l.a.createElement("div",{className:Ee.a.mapContainer},l.a.createElement("div",{className:Ee.a.lineA},l.a.createElement(xe,{place:"A1",sectors:t}),l.a.createElement(xe,{place:"A2",sectors:t}),l.a.createElement(xe,{place:"A3",sectors:t}),l.a.createElement(xe,{place:"A4",sectors:t})),l.a.createElement("div",{className:Ee.a.lineB},l.a.createElement(xe,{place:"B1",sectors:t}),l.a.createElement(xe,{place:"B2",sectors:t}),l.a.createElement(xe,{place:"B3",sectors:t}),l.a.createElement(xe,{place:"B4",sectors:t}),l.a.createElement(xe,{place:"B5",sectors:t})),l.a.createElement("div",{className:Ee.a.lineC},l.a.createElement(xe,{place:"C1",sectors:t}),l.a.createElement(xe,{place:"C2",sectors:t}),l.a.createElement(xe,{place:"C3",sectors:t}),l.a.createElement(xe,{place:"C4",sectors:t}),l.a.createElement(xe,{place:"C5",sectors:t}),l.a.createElement(xe,{place:"C6",sectors:t})),l.a.createElement("div",{className:Ee.a.lineD},l.a.createElement(xe,{place:"D1",sectors:t}),l.a.createElement(xe,{place:"D2",sectors:t}),l.a.createElement(xe,{place:"D3",sectors:t}),l.a.createElement(xe,{place:"D4",sectors:t}),l.a.createElement(xe,{place:"D5",sectors:t}),l.a.createElement(xe,{place:"D6",sectors:t}),l.a.createElement(xe,{place:"D7",sectors:t})),l.a.createElement("div",{className:Ee.a.lineE},l.a.createElement(xe,{place:"E1",sectors:t}),l.a.createElement(xe,{place:"E2",sectors:t}),l.a.createElement(xe,{place:"E3",sectors:t}),l.a.createElement(xe,{place:"E4",sectors:t}),l.a.createElement(xe,{place:"E5",sectors:t}),l.a.createElement(xe,{place:"E6",sectors:t})),l.a.createElement("div",{className:Ee.a.lineF},l.a.createElement(xe,{place:"F1",sectors:t}),l.a.createElement(xe,{place:"F2",sectors:t}),l.a.createElement(xe,{place:"F3",sectors:t}),l.a.createElement(xe,{place:"F4",sectors:t}),l.a.createElement(xe,{place:"F5",sectors:t})),l.a.createElement("div",{className:Ee.a.lineG},l.a.createElement(xe,{place:"G1",sectors:t}),l.a.createElement(xe,{place:"G2",sectors:t}),l.a.createElement(xe,{place:"G3",sectors:t}),l.a.createElement(xe,{place:"G4",sectors:t})))))};E.a.defaultsDeep(D,{revision:0,filename:""});var Le=[{label:"\u0411\u0417 (\u043c\u0430\u0439\u043d\u0438\u043d\u0433)",value:"ws-mining"}],Te=function(){var e=Object(n.useContext)(V),t=e.useState("~/gameType"),a=Object(o.a)(t,1)[0],r=Le.find((function(e){return e.value===a}));if(r&&r.extra){var c=r.extra;return l.a.createElement(c,{context:e})}return null},We=function(){return l.a.createElement(Z,{name:"Field"},l.a.createElement(me,{label:"\u0422\u0438\u043f \u0438\u0433\u0440\u044b"},l.a.createElement(Oe,{label:"\u0422\u0438\u043f \u0438\u0433\u0440\u044b",pointer:"~/gameType",options:Le}),l.a.createElement(Te,null)))},De=a(52),Be=a.n(De),Ae=a(198),Ge={string:{isValid:function(){return!0},parse:function(e){return e}},number:{isValid:function(e){return!isNaN(Number(e))||void 0===e},parse:function(e){if(void 0!==e&&""!==e)return parseFloat(e)}}},Pe=function(e){var t=e.label,a=e.disabled,r=e.pointer,c=e.type,i=void 0===c?"number":c,s=e.multiplier,u=void 0===s?1:s,d=e.helperText,m=e.units,f=e.defaultValue,p=void 0===f?"":f,v=e.inputProps,b=void 0===v?{}:v,E=Object(n.useContext)(V),h=Ge[i]||Ge.text,_=E.useState(r),y=Object(o.a)(_,2),g=y[0],C=y[1],w=Object(n.useState)(h.isValid(g)),O=Object(o.a)(w,2),S=O[0],j=O[1],F=Object(n.useState)("number"===i?isNaN(g)?void 0:g*u:g),k=Object(o.a)(F,2),x=k[0],N=k[1];Object(n.useEffect)((function(){isNaN(g)||g*u===parseFloat(x)||N(g*u)}),[g,x,u]);var L=Object(n.useMemo)((function(){return Object(Y.a)(Object(Y.a)({},b),{},{endAdornment:m?l.a.createElement(Ae.a,{position:"start"},m):void 0})}),[m,b]),T=Object(n.useCallback)((function(e){var t=Ge[i],a=e.target.value;if(N(a),t.isValid(a))if(j(!0),"number"===i){var n=t.parse(a);C(void 0===n?void 0:n/u)}else C(t.parse(a));else j(!1)}),[C,i,u]);return l.a.createElement(re.a,{size:"small",variant:"outlined",disabled:a,InputProps:L,helperText:d,error:!S,label:t,value:void 0===x?p:x,onChange:T})},ze=a(17),Re=a.n(ze);E.a.defaultsDeep(D,{ws:{players:[]}});var Ie=function(){var e=Object(n.useContext)(V).useState("/ws/players"),t=Object(o.a)(e,2),a=t[0],r=t[1],c=Object(n.useCallback)((function(){r([].concat(Object(S.a)(a),[{}]))}),[r,a]),i=Object(n.useCallback)((function(e){r(Object(S.a)(a).filter((function(t){return t!==e})))}),[r,a]);return l.a.createElement(Z,{name:"Field"},l.a.createElement("table",null,l.a.createElement("tr",null,l.a.createElement("th",null,l.a.createElement("span",null,"\u0418\u043c\u044f")),l.a.createElement("th",{className:Re.a.verticalLabels,style:{width:50}},l.a.createElement("span",null,"\u0423\u0440\u043e\u0432\u0435\u043d\u044c \u043c\u0430\u0439\u043d\u0435\u0440\u0430")),l.a.createElement("th",{className:Re.a.verticalLabels,style:{width:75}},l.a.createElement("span",null,"\u041e\u0431\u044a\u0435\u043c")),l.a.createElement("th",{className:Re.a.verticalLabels,style:{width:50,background:"#e1c5ed"}},l.a.createElement("span",null,"\u0423\u0434\u0430\u043b\u0435\u043d\u043d\u0430\u044f \u0434\u043e\u0431\u044b\u0447\u0430")),l.a.createElement("th",{className:Re.a.verticalLabels,style:{width:50,background:"#e1c5ed"}},l.a.createElement("span",null,"\u0420\u043e\u0441\u0442 \u0434\u043e\u0431\u044b\u0447\u0438")),l.a.createElement("th",{className:Re.a.verticalLabels,style:{width:50,background:"#e1c5ed"}},l.a.createElement("span",null,"\u041f\u0440\u043e\u0444\u0441\u043e\u044e\u0437")),l.a.createElement("th",{className:Re.a.verticalLabels,style:{width:50,background:"#e1c5ed"}},l.a.createElement("span",null,"\u041e\u0431\u043e\u0433\u0430\u0449\u0435\u043d\u0438\u0435")),l.a.createElement("th",{className:Re.a.verticalLabels,style:{width:50,background:"#e1c5ed"}},l.a.createElement("span",null,"\u0413\u0435\u043d\u0435\u0437\u0438\u0441")),l.a.createElement("th",{className:Re.a.verticalLabels,style:{width:50,background:"#e1c5ed"}},l.a.createElement("span",null,"\u041a\u0440\u0438\u0437\u0438\u0441")),l.a.createElement("th",{className:Re.a.verticalLabels,style:{width:50,background:"#edddc5"}},l.a.createElement("span",null,"\u0413\u0440\u0443\u0437\u043e\u043f\u043e\u0434\u044a\u0435\u043c\u043d\u043e\u0441\u0442\u044c")),l.a.createElement("th",{className:Re.a.verticalLabels,style:{width:50,background:"#edddc5"}},l.a.createElement("span",null,"\u0412\u0440\u0443\u0447\u0435\u043d\u0438\u0435")),l.a.createElement("th",{className:Re.a.verticalLabels,style:{width:50,background:"#edddc5"}},l.a.createElement("span",null,"\u042d\u043a\u0441\u043f\u0435\u0434\u0438\u0446\u0438\u044f")),l.a.createElement("th",{className:Re.a.verticalLabels,style:{width:50,background:"#edddc5"}},l.a.createElement("span",null,"\u0420\u0435\u043b\u0438\u043a\u0442\u043e\u0432\u044b\u0439 \u0434\u0440\u043e\u043d")),l.a.createElement("th",{className:Re.a.verticalLabels,style:{width:50,background:"#bfe3bf"}},l.a.createElement("span",null,"\u0418\u0441\u043a\u0430\u0436\u0435\u043d\u0438\u0435 \u0432\u0440\u0435\u043c\u0435\u043d\u0438")),l.a.createElement("th",{className:Re.a.verticalLabels,style:{width:50,background:"#bfe3bf"}},l.a.createElement("span",null,"\u0422\u0435\u043b\u0435\u043f\u043e\u0440\u0442")),l.a.createElement("th",{className:Re.a.verticalLabels,style:{width:50,background:"#bfe3bf"}},l.a.createElement("span",null,"\u0421\u043a\u0430\u0447\u043e\u043a")),l.a.createElement("th",null)),a.map((function(e,t){return l.a.createElement(q,{pointer:"/ws/players/"+t},l.a.createElement("tr",null,l.a.createElement("td",null,l.a.createElement(Pe,{pointer:"/name",type:"string"})),l.a.createElement("td",null,l.a.createElement(Pe,{pointer:"/minerLevel"})),l.a.createElement("td",null,l.a.createElement(Pe,{pointer:"/capacity"})),l.a.createElement("td",{style:{width:50,background:"#e1c5ed"}},l.a.createElement(Pe,{pointer:"/remoteMining"})),l.a.createElement("td",{style:{width:50,background:"#e1c5ed"}},l.a.createElement(Pe,{pointer:"/miningBoost"})),l.a.createElement("td",{style:{width:50,background:"#e1c5ed"}},l.a.createElement(Pe,{pointer:"/minerUnity"})),l.a.createElement("td",{style:{width:50,background:"#e1c5ed"}},l.a.createElement(Pe,{pointer:"/enrich"})),l.a.createElement("td",{style:{width:50,background:"#e1c5ed"}},l.a.createElement(Pe,{pointer:"/genesic"})),l.a.createElement("td",{style:{width:50,background:"#e1c5ed"}},l.a.createElement(Pe,{pointer:"/crunch"})),l.a.createElement("td",{style:{width:50,background:"#edddc5"}},l.a.createElement(Pe,{pointer:"/relicsInTransport"})),l.a.createElement("td",{style:{width:50,background:"#edddc5"}},l.a.createElement(Pe,{pointer:"/entrust"})),l.a.createElement("td",{style:{width:50,background:"#edddc5"}},l.a.createElement(Pe,{pointer:"/dispatch"})),l.a.createElement("td",{style:{width:50,background:"#edddc5"}},l.a.createElement(Pe,{pointer:"/relicDrone"})),l.a.createElement("td",{style:{width:50,background:"#bfe3bf"}},l.a.createElement(Pe,{pointer:"/timeWarp"})),l.a.createElement("td",{style:{width:50,background:"#bfe3bf"}},l.a.createElement(Pe,{pointer:"/teleport"})),l.a.createElement("td",{style:{width:50,background:"#bfe3bf"}},l.a.createElement(Pe,{pointer:"/leap"})),l.a.createElement("td",null,l.a.createElement($.a,{onClick:function(){i(e)}},"\u0423\u0434\u0430\u043b\u0438\u0442\u044c"))))}))),l.a.createElement($.a,{onClick:c},"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0438\u0433\u0440\u043e\u043a\u0430"))},Ue=a(53),Me=a.n(Ue),He=[6,7.5,12,24,60,80];function Qe(e){return 60*He[e-1]/600}var Ve=[2,2.5,3,3.5,4,4.5,5,6,7,8,9,10];function qe(e){return Ve[e-1]}var Je=[.36,.4,.45,.51,.57,.64,.72,.81,.9,1];function Ye(e){return Je[e-1]}E.a.defaultsDeep(D,{ws:{players:[]}});var Ke=function(){var e=Object(n.useContext)(V).useState("/ws/players"),t=Object(o.a)(e,1)[0];return l.a.createElement(Z,{name:"Field"},l.a.createElement("table",null,l.a.createElement("tr",null,l.a.createElement("th",null,l.a.createElement("span",null,"\u0418\u043c\u044f")),l.a.createElement("th",{className:Me.a.verticalLabels,style:{width:50}},l.a.createElement("span",null,"\u0423\u0440\u043e\u0432\u0435\u043d\u044c \u043c\u0430\u0439\u043d\u0435\u0440\u0430")),l.a.createElement("th",{className:Me.a.verticalLabels,style:{width:75}},l.a.createElement("span",null,"\u041e\u0431\u044a\u0435\u043c")),l.a.createElement("th",{className:Me.a.verticalLabels,style:{width:50}},l.a.createElement("span",null,"\u0421\u043a\u043e\u0440\u043e\u0441\u0442\u044c \u0434\u043e\u0431\u044b\u0447\u0438")),l.a.createElement("th",{className:Me.a.verticalLabels,style:{width:50}},l.a.createElement("span",null,"\u0411\u0443\u0441\u0442")),l.a.createElement("th",{className:Me.a.verticalLabels,style:{width:50}},l.a.createElement("span",null,"\u0423\u0434\u0430\u043b\u0435\u043d\u043d\u0430\u044f \u0434\u043e\u0431\u044b\u0447\u0430"))),t.map((function(e,t){return l.a.createElement("tr",null,l.a.createElement("td",null,e.name),l.a.createElement("td",null,e.minerLevel),l.a.createElement("td",null,e.capacity),l.a.createElement("td",null,Qe(e.minerLevel)),l.a.createElement("td",null,"x",qe(e.miningBoost)),l.a.createElement("td",null,"x",Ye(e.remoteMining)))}))))},Xe=a(42),Ze=a(18),$e=a.n(Ze),et=a(74),tt=a.n(et),at=function(e){var t=e.pointer,a=(e.children,Object(n.useContext)(V)),r=a.useState(t),c=Object(o.a)(r,2),i=c[0],s=c[1],u=a.useState("~/ws/players"),d=Object(o.a)(u,1)[0],m=Object(n.useCallback)((function(){s([].concat(Object(S.a)(i),[""]))}),[i,s]),f=Object(n.useCallback)((function(e){s(i.filter((function(t){return t!==e})))}),[i,s]);return l.a.createElement("div",{className:tt.a.container},i.map((function(e,a){var n=[{name:e}].concat(Object(S.a)(d.filter((function(e){return-1===i.indexOf(e.name)})))).map((function(e){return{label:e.name,value:e.name}}));return l.a.createElement("div",null,l.a.createElement(Oe,{pointer:"".concat(t,"/").concat(a),options:n}),l.a.createElement("button",{className:tt.a.minusButton,onClick:function(){return f(e)}},"-"))})),l.a.createElement("button",{onClick:m},"+"))};E.a.defaultsDeep(D,{ws:{minerGroups:[]}});var nt=["green","blue","yellow","coral","seagreen"];function lt(e){return nt.find((function(t){return!e.some((function(e){return e.color===t}))}))}function rt(e){return e.path?e.path.split(" ").filter((function(e){return 2===e.length})):[]}var ct=function(){return l.a.createElement(J,null,l.a.createElement(st,null))},ot={absent:["File"],unknown:["File","Game"],"ws-mining":["File","Game","Players","WSField","PlayerStats","TimeToCollect"]},it={File:{name:"File",render:ve},Game:{name:"Game",render:We},WSField:{name:"Field",render:Ne},Players:{name:"Players",render:Ie},PlayerStats:{name:"PlayerStats",render:Ke},TimeToCollect:{name:"TimeToCollect",render:function(){var e=Object(n.useContext)(V),t=e.useState("/ws/minerGroups"),a=Object(o.a)(t,2),r=a[0],c=a[1],i=e.useState("/ws/field/sectors"),s=Object(o.a)(i,1)[0],u=e.useState("/ws/players"),d=Object(o.a)(u,1)[0],m=Xe.GridGenerator.hexagon(3),f=function(e){var t={},a=["A","B","C","D","E","F","G"],n=[-3,-3,-3,-3,-2,-1,0];return e.forEach((function(e){var l=a[e.q+3]+(1-e.s-n[e.q+3]);e.shortcut=l,t[l]=e})),t}(m),p=Object(n.useCallback)((function(){c([].concat(Object(S.a)(r),[{color:lt(r),players:[],path:""}]))}),[r,c]),v=Object(n.useCallback)((function(e){c(r.filter((function(t){return t!==e})))}),[r,c]);return l.a.createElement(Z,{name:"CollectRoutes"},l.a.createElement("div",{className:$e.a.twoColumnLayout},l.a.createElement("div",{className:$e.a.columnOne},l.a.createElement(Xe.HexGrid,{width:400,height:400},l.a.createElement(Xe.Layout,{size:{x:7,y:7},flat:!0,spacing:1.1},m.map((function(e,t){return l.a.createElement(Xe.Hexagon,{className:$e.a.cell+" "+$e.a[Se(s[e.shortcut]).replace("#","color-")],key:t,q:e.q,r:e.r,s:e.s},l.a.createElement(Xe.Text,{className:$e.a.cellName},e.shortcut))})),r.map((function(e,t){if(!e.path)return l.a.createElement(l.a.Fragment,null);var a=rt(e);return a.map((function(t,n){if(n===a.length-1)return l.a.createElement(l.a.Fragment,null);var r=a[n+1];return l.a.createElement("g",{style:{stroke:"light"+e.color,strokeWidth:2,strokeLinecap:"round"}},l.a.createElement(Xe.Path,{start:f[t],end:f[r]}))}))}))))),l.a.createElement("div",{className:$e.a.columnTwo},l.a.createElement(ae,{onClick:p},"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0433\u0440\u0443\u043f\u043f\u0443 \u043c\u0430\u0439\u043d\u0435\u0440\u043e\u0432"),l.a.createElement("div",{className:$e.a.columnLayout},r.map((function(e,t){var a=rt(e),n=a.reduce((function(e,t){var a;return e+((null===(a=s[t])||void 0===a?void 0:a.hydro)||0)}),0),r=e.players.reduce((function(e,t){return e+(d.find((function(e){return e.name===t}))||{}).capacity||0}),0),c=e.players.reduce((function(e,t){var a=d.find((function(e){return e.name===t}));return a?e+Qe(a.minerLevel)*qe(a.miningBoost)*Ye(a.remoteMining):e}),0),o=10*(a.length-1);console.log(a);var i=a.reduce((function(e,t){var a,n;return e+((null===(a=s[t])||void 0===a?void 0:a.hydro)||0)/((null===(n=s[t])||void 0===n?void 0:n.asteroids)||1)}),0)/c;return l.a.createElement(q,{pointer:"/ws/minerGroups/".concat(t)},l.a.createElement("div",{className:$e.a.column},l.a.createElement("div",{className:$e.a.columnLabel},"\u0426\u0432\u0435\u0442: ",l.a.createElement("span",{style:{background:"light".concat(e.color)}},e.color)),l.a.createElement(ae,{className:$e.a.keepTopRight,onClick:function(){return v(e)}},"\u0423\u0434\u0430\u043b\u0438\u0442\u044c"),l.a.createElement(Pe,{label:"\u041f\u0443\u0442\u044c",pointer:"/path",type:"string",defaultValue:""}),"\u0418\u0433\u0440\u043e\u043a\u0438: ",l.a.createElement(at,{pointer:"/players"}),l.a.createElement("div",{className:$e.a.columnLabel},"\u041e\u0431\u0449\u0438\u0439 \u0431\u0430\u043a: ",r),l.a.createElement("div",{className:$e.a.columnLabel},"\u0412\u0441\u0435\u0433\u043e \u0432\u043e\u0434\u044b: ",n),l.a.createElement("div",{className:$e.a.columnLabel},"\u0421\u043a\u043e\u0440\u043e\u0441\u0442\u044c \u0434\u043e\u0431\u044b\u0447\u0438: ",c.toFixed(2)," \u0432 \u0447\u0430\u0441"),l.a.createElement("div",{className:$e.a.columnLabel},"\u0412\u0440\u0435\u043c\u044f \u0434\u0432\u0438\u0436\u0435\u043d\u0438\u044f: ",o.toFixed(2)," \u0447\u0430\u0441\u043e\u0432"),l.a.createElement("div",{className:$e.a.columnLabel},"\u0412\u0440\u0435\u043c\u044f \u0434\u043e\u0431\u044b\u0447\u0438: ",i.toFixed(2)," \u0447\u0430\u0441\u043e\u0432")))}))))))}}};function st(){var e=Object(n.useContext)(V),t=e.useState("/filename"),a=Object(o.a)(t,1)[0],r=""!==a,c=Object(n.useState)(parseInt(localStorage.getItem("openedTab"))||0),b=Object(o.a)(c,2),h=b[0],_=b[1],y=Object(n.useState)(!0),g=Object(o.a)(y,2),C=g[0],w=g[1],S=e.useState("~/gameType"),j=Object(o.a)(S,1)[0];j||(j="absent"),ot[j]||(j="unknown",console.warn("Unknown game type"));var F=ot[j].map((function(e){return it[e]}));return Object(n.useEffect)((function(){var t=localStorage.getItem("filename");t!==a&&(w(!0),A.a.get(P+"/file/"+t,{transformResponse:function(e){return e}}).then((function(a){for(var n=a.data.split("\n"),l={},r=0,c=1;c<n.length;c++){var o=JSON.parse(n[c]);switch(o.action){case"modify":try{l=Object(L.a)(l,o.payload)}catch(s){r++,console.log(s)}break;default:throw new Error("Unknown operation")}}r>0&&alert("File is recovered. Please doublecheck everything. Unable to apply ".concat(r," patches")),l.filename!==t&&(l=Object(L.b)(l,(function(e){e.filename=t})));var i=Object(L.b)(l,(function(e){E.a.defaultsDeep(e,D)}));i===l?e.modify("dontSendUpdateToServer",(function(){return l})):e.modify((function(){return i})),w(!1)}),(function(){e.modify("dontSendUpdateToServer",(function(){return D})),w(!1)})))}),[e,a]),l.a.createElement(l.a.Fragment,null,l.a.createElement(i.a,{position:"fixed"},l.a.createElement(s.a,{variant:"dense"},l.a.createElement(O.a,null),"\xa0\xa0",l.a.createElement(u.a,{variant:"h6"},j," - ",e.value.filename))),l.a.createElement("div",{className:Be.a.container},l.a.createElement("div",{className:Be.a.menu},l.a.createElement(d.a,{orientation:"vertical",className:Be.a.tabs,value:r?h:0,onChange:function(e,t){localStorage.setItem("openedTab",t),_(t)},"aria-label":"simple tabs example"},F.map((function(e){var t=e.name;return l.a.createElement(m.a,{key:t,label:t})})))),l.a.createElement("div",{className:Be.a.content},l.a.createElement(f.a,{elevation:3},F[h]&&"function"===typeof F[h].render?l.a.createElement(F[h].render,{key:F[h].label}):l.a.createElement(ve,null)))),C&&l.a.createElement(p.a,{open:!0,className:Be.a.backdrop},l.a.createElement(v.a,{color:"inherit"})))}Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(ct,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},17:function(e,t,a){e.exports={verticalLabels:"Players_verticalLabels__2XYvG"}},18:function(e,t,a){e.exports={cell:"TimeToCollect_cell__1gM5N",cellName:"TimeToCollect_cellName__2qQQ3",twoColumnLayout:"TimeToCollect_twoColumnLayout__w8tPd",columnOne:"TimeToCollect_columnOne__2Q7sT",columnTwo:"TimeToCollect_columnTwo__37Q3v",columnLayout:"TimeToCollect_columnLayout__3jc8f",column:"TimeToCollect_column__6XaFn",columnLabel:"TimeToCollect_columnLabel__czAph",keepTopRight:"TimeToCollect_keepTopRight__2eqY6","color-ffffff":"TimeToCollect_color-ffffff__1NPz8","color-ffeeee":"TimeToCollect_color-ffeeee__2oMEy","color-f8fff8":"TimeToCollect_color-f8fff8__1U6kP","color-eeffee":"TimeToCollect_color-eeffee__3P05E","color-d0ffd0":"TimeToCollect_color-d0ffd0__iJT5K","color-eeeeff":"TimeToCollect_color-eeeeff__1foKn"}},51:function(e,t,a){e.exports={container:"FieldSet_container__3lQKl",collapsed:"FieldSet_collapsed__2naRb",title:"FieldSet_title__1wVzu",titleTextOnly:"FieldSet_titleTextOnly__2YN4_",designLess:"FieldSet_designLess__XBaxO"}},52:function(e,t,a){e.exports={backdrop:"App_backdrop__1J_fz",tabs:"App_tabs__1Z93U",container:"App_container__1MQN3",menu:"App_menu__3dqVM",content:"App_content__3La4L"}},53:function(e,t,a){e.exports={verticalLabels:"PlayerStats_verticalLabels__1Pua5"}},69:function(e,t,a){e.exports={filenameLabel:"File_filenameLabel__10GN8",mtimeLabel:"File_mtimeLabel__1LYAp",selected:"File_selected__2Tjaj"}},74:function(e,t,a){e.exports={minusButton:"PlayersSelector_minusButton__3nR-r"}},93:function(e,t,a){e.exports={container:"TabContainer_container__70pTv"}},94:function(e,t,a){e.exports={main:"Button_main__1l7aS"}}},[[112,1,2]]]);
//# sourceMappingURL=main.f67c9460.chunk.js.map