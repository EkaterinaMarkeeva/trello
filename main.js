!function(){"use strict";class t{constructor(t){this.target=t,this.activeElement,this.shiftX,this.shiftY,this.activeElementHeight,this.activeElementWidth,this.position=null,this.cursorPosition,this.oldElem=null,this.board=document.querySelector(".board"),this.onMouseDown=this.onMouseDown.bind(this),this.onMouseOver=this.onMouseOver.bind(this),this.onMouseUp=this.onMouseUp.bind(this),this.board.addEventListener("mousedown",this.onMouseDown)}onMouseOver(t){this.cursorPosition=t.clientY,this.activeElement.style.top=t.clientY-this.shiftY+"px",this.activeElement.style.left=t.clientX-this.shiftX+"px";const e=this.createNewElement(),i=this.canDrop(t);e.style.height=this.activeElementHeight,e.style.width=this.activeElementWidth,i&&(this.position&&i.join("")===this.position.join("")||(this.position=i,this.oldElem&&this.oldElem.remove(),this.oldElem=this.addElement(i,e)))}onMouseUp(){this.oldElem&&this.oldElem.remove(),this.target.lists[this.activeElement.getAttribute("data-column-index")]=this.target.lists[this.activeElement.getAttribute("data-column-index")].filter((t=>t.getAttribute("data-index")!==this.activeElement.getAttribute("data-index"))),this.target.lists[this.activeElement.getAttribute("data-column-index")].forEach((t=>{t.getAttribute("data-index")>=this.activeElement.getAttribute("data-index")&&t.setAttribute("data-index",+t.getAttribute("data-index")-1)})),this.activeElement.setAttribute("data-column-index",this.position[0]),this.activeElement.setAttribute("data-index",this.position[1]),this.target.lists[this.activeElement.getAttribute("data-column-index")].push(this.activeElement),this.addElement(this.position,this.activeElement),document.getElementById(this.activeElement.getAttribute("data-column-index")).querySelectorAll(".card").forEach(((t,e)=>{t.setAttribute("data-index",e)})),this.activeElement.classList.remove("dragged"),this.activeElement=null,document.documentElement.removeEventListener("mouseup",this.onMouseUp);for(let t in this.target.lists)document.getElementById(t).removeEventListener("mouseover",this.onMouseOver)}canDrop(t){const e=t.target;if(e.getAttribute("data-index")){const{top:t,height:i}=e.getBoundingClientRect(),s=t+i/2;return this.cursorPosition>=s?[e.getAttribute("data-column-index"),+e.getAttribute("data-index")+1]:[e.getAttribute("data-column-index"),e.getAttribute("data-index")]}if(e.className.includes("column")){const{top:t,height:i}=e.getBoundingClientRect(),s=t+i/2;if(this.cursorPosition>=s){const t=e.querySelector(".cards");return e.querySelector(".card")?[e.id,t.children.length-1]:[e.id,t.children.length]}return[e.id,0]}}addElement(t,e){const i=document.getElementById(t[0]);if(!i)return;const s=i.querySelector(".cards"),n=s.children[t[1]];return n?s.insertBefore(e,n):s.appendChild(e),e}onMouseDown(t){if(this.activeElement=t.target,this.activeElement.className.includes("card")){t.preventDefault();const{left:e,top:i,height:s,width:n}=this.activeElement.getBoundingClientRect();this.activeElementWidth=n+"px",this.activeElementHeight=s+"px",this.shiftX=t.clientX-e,this.shiftY=t.clientY-i,this.activeElement.classList.add("dragged"),this.activeElement.style.width=this.activeElementWidth,this.activeElement.style.height=this.activeElementHeight,document.documentElement.addEventListener("mouseup",this.onMouseUp);for(let t in this.target.lists)document.getElementById(t).addEventListener("mouseover",this.onMouseOver)}}createNewElement(){const t=document.createElement("div");return t.classList.add("possibility"),t}}class e{constructor(t){this.target=t}createForm(){const t=document.createElement("form"),e=document.createElement("textarea"),i=document.createElement("button"),s=document.createElement("button");return e.placeholder="Enter a title for this card...",i.textContent="Add Card",t.classList.add("form"),i.classList.add("btn"),i.classList.add("btn-add-crd"),s.classList.add("btn-delete"),t.appendChild(e),t.appendChild(i),t.appendChild(s),t}createButton(){const t=document.createElement("button");return t.classList.add("btn"),t.classList.add("btn-add"),t.textContent="+ Add another card",t}createNewCard(t,e){const i=t.target.closest(".column"),s=e,n=this.target.lists[i.id].length,a=document.createElement("div"),d=document.createElement("button");return a.classList.add("card"),d.classList.add("btn-delete"),a.dataset.index=n,a.dataset.columnIndex=i.id,a.textContent=s,a.appendChild(d),a}createCardByData(t,e,i){const s=document.getElementById(t).querySelector(".cards"),n=document.createElement("div"),a=document.createElement("button");n.classList.add("card"),a.classList.add("btn-delete"),n.dataset.index=e,n.dataset.columnIndex=t,n.textContent=i,this.target.lists[t].push(n),a.addEventListener("click",this.target.onCellClick),n.appendChild(a),s.appendChild(n)}}class i{constructor(){this.lists={todo:[],progress:[],done:[]}}static from(t){return t?{lists:t.lists}:null}}const s=new class{constructor(t){this.storage=t}save(t){this.storage.setItem("state",JSON.stringify(t))}load(){try{return JSON.parse(this.storage.getItem("state"))}catch(t){throw new Error("Invalid state")}}clear(){this.storage.clear()}}(localStorage),n=new class{constructor(s){this.stateService=s,this.state=new i,this.lists={todo:[],progress:[],done:[]},this.dnd=new t(this),this.view=new e(this)}init(){this.registrationEvents(),window.onload=this.onLoadListener.bind(this),window.onunload=this.onSaveListener.bind(this)}registrationEvents(){const t=document.querySelector(".board").querySelectorAll(".btn-add");this.onCellClick=this.onCellClick.bind(this),t.forEach((t=>t.addEventListener("click",this.onCellClick)))}addForm(t){const e=t.target.closest(".column"),i=this.view.createForm();e.appendChild(i);const s=e.querySelector(".btn-add-crd"),n=e.querySelector(".btn-delete");s.addEventListener("click",this.onCellClick),n.addEventListener("click",this.onCellClick)}addButton(t){const e=t.target.closest(".column"),i=this.view.createButton();i.classList.add("btn"),i.classList.add("btn-add"),i.textContent="+ Add another card",e.appendChild(i),i.addEventListener("click",this.onCellClick)}addNewCard(t,e){const i=t.target.closest(".column"),s=i.querySelector(".cards"),n=this.view.createNewCard(t,e);this.lists[i.id].push(n),s.appendChild(n),n.querySelector(".btn-delete").addEventListener("click",this.onCellClick)}removeForm(t){t.target.closest(".form").remove()}onCellClick(t){t.preventDefault();const e=t.target,i=e.closest(".form"),s=e.closest(".card");i?e.className.includes("delete")?(this.addButton(t),this.removeForm(t)):this.getDataForm()?(this.addNewCard(t,this.getDataForm()),this.addButton(t),this.removeForm(t)):(this.addButton(t),this.removeForm(t)):s?(this.lists[s.getAttribute("data-column-index")]=this.lists[s.getAttribute("data-column-index")].filter((t=>t.getAttribute("data-index")!==s.getAttribute("data-index"))),this.lists[s.getAttribute("data-column-index")].forEach((t=>{t.getAttribute("data-index")>=s.getAttribute("data-index")&&t.setAttribute("data-index",+t.getAttribute("data-index")-1)})),s.remove()):(this.addForm(t),t.target.remove())}getDataForm(){return document.querySelector("textarea").value}onSaveListener(){this.stateService.clear(),this.state={lists:{todo:[],progress:[],done:[]}};for(let t in this.lists)this.lists[t].forEach((e=>{this.state.lists[t][e.getAttribute("data-index")]=e.textContent}));this.stateService.save(this.state)}onLoadListener(){if(!i.from(this.stateService.load()))return;const t=i.from(this.stateService.load());for(let e in this.state)this.state[e]=t[e];for(let t in this.state.lists)this.state.lists[t].forEach(((e,i)=>{this.view.createCardByData(t,i,e)}))}}(s);n.init()}();