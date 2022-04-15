//setting all variables
//NOTE      NOTE     NOTE    NOTE  NOTE
//BSP = bamboo stand price, bsl=bamboo stand left
//bslV=bamboo stand left value //bslD= bamboo stand left display
//BESP = black edition stand price, besl=black edition stand left
//beslV=black edition stand left value //beslD= black edition stand left display
let btnBookmark=document.getElementById('btn-bookmark')
const divBtn=document.querySelector('.div-btn')
let updateArr=[]
const popupBackground=document.querySelector('.popup-background')
const thanksPopupBackground=document.querySelector('.thanks-popup-background')
const mobile_menu=document.querySelector('#mobile_menu')
const menulinks=document.querySelector('.div-list')
const nav_container=document.querySelector('.nav-container')
// circleEl=outer circle for BSl! circleEl2=outer circle for BESP
const circleEl=document.querySelector('#circle-el')
const circleEl2=document.querySelector('#circle-el2')
// innercircleEl=inner circle for BSl! innercircleEL2=inner circle for BSP!
const innercircleEl=document.querySelector('#inner-circle')
const innercircleEl2=document.querySelector('#inner-circle2')
//borderTopEl = bordertop for BSP borderTopEl2= bordertop for BESP
const borderTopEl=document.querySelector('#border-top')
const borderTopEl2=document.querySelector('#border-top2')
//continueEl= continue button for BSP continueEl2=continue button for BESP
const continueEl=document.querySelector('#continue')
const continueEl2=document.querySelector('#continue2')
const gotItEl=document.querySelector('#got-it')
const progressBar=document.querySelector('#progress-bar')
const totalSum=document.querySelector('#total-sum')
const totalBackers=document.querySelector('#total-number')
//boxborderEL= boxborder for BSP  boxborderEL2=boxborder for BESP
const boxborderEL=document.querySelector('#box-border')
const boxborderEL2=document.querySelector('#box-border2')
let selectReward=document.querySelector('#Select-reward')
//BSP = bamboo stand price, bsl=bamboo stand left
//bslV=bamboo stand left value //bslD= bamboo stand left display
const bsl = document.querySelector('#BSL')
const bslMain=document.querySelector('#BSL-main')
const bambooStandPrice=25
//BESP = black edition stand price, besl=black edition stand left
//beslV=black edition stand left value //beslD= black edition stand left display
const besl = document.querySelector('#BESL')
const beslMain=document.querySelector('#BESL-main')
const blackEditionStandPrice=75
//get stored update from local storage
let updLocalStorage=JSON.parse(localStorage.getItem('updateArr')); 
//rendering stored update 
if(updLocalStorage){
	updateArr=updLocalStorage
	let bslV= updateArr.bsl_obj
	let beslV=updateArr.besl_Obj
	let progressValue=updateArr.progress_Obj
	let totalBackersD=updateArr.totalBackers_Obj
	renderAll(bsl, bslMain, besl, beslMain, totalSum, totalBackers, progressBar, bslV, beslV, progressValue, totalBackersD)
}
//hamburger event
mobile_menu.addEventListener('click', function() {
	// body...
	nav_container.classList.toggle('mobile-active')
	menulinks.classList.toggle('mobile-active')
	mobile_menu.classList.toggle('mobile-active')
}) 
//Bookmark click event!!
btnBookmark.addEventListener('click', function () {
	// body...
	let btntext= btnBookmark.textContent;
	btnBookmark.classList.toggle('active')
	divBtn.classList.toggle('active')
	if (btntext === "Bookmark") {
		btnBookmark.textContent="Bookmarked"
	} else {
		btnBookmark.textContent="Bookmark"
	}
})
//inner circle color change event for BSP
circleEl.addEventListener('click', function(){
	//body...
	toggleIsactive(innercircleEl, borderTopEl, boxborderEL)
})
// inner circle color change event for BESP
circleEl2.addEventListener('click', function(){
	toggleIsactive(innercircleEl2, borderTopEl2, boxborderEL2)
})
//getting current value, upadting, storing and rendering event for BSP
continueEl.addEventListener('click', function(){
	//body...
	let bslV = parseInt(bsl.textContent)
	let beslV = parseInt(besl.textContent)
	// console.log(beslV)
	let totalBackersV = parseFloat(totalBackers.textContent.replace(/\$|,/g, ''))
	toggleIsactive(innercircleEl, borderTopEl, boxborderEL)
	let bslD = bslV - 1
	let totalBackersD=totalBackersV + 1 
	let progressValue = progressBar.value + bambooStandPrice; 
	progressBar.value=progressValue
	let update = {
		besl_Obj:beslV,
		bsl_obj:bslD,
		progress_Obj:progressValue,
		totalBackers_Obj:totalBackersD
	}
	updateArr =update
	localStorage.setItem('updateArr', JSON.stringify(updateArr))
	console.log(updateArr)
	render(bsl, totalSum, totalBackers,  bslMain, bslD, progressValue, totalBackersD)
	popupBackground.classList.toggle('display')
	thanksPopupBackground.classList.toggle('finalDisplay')
	document.body.scrollTop = document.documentElement.scrollTop = 0
})
//getting current value, upadting, storing and rendering event for BESP
continueEl2.addEventListener('click', function(){
	//body...
	let beslV = parseInt(besl.textContent)
	let bslV = parseInt(bsl.textContent)
	// console.log(beslV);
	let totalBackersV = parseFloat(totalBackers.textContent.replace(/\$|,/g, ''))
	toggleIsactive(innercircleEl2, borderTopEl2, boxborderEL2)
	let beslD=beslV - 1;
	let totalBackersD= totalBackersV + 1
	let  progressValue = progressBar.value + blackEditionStandPrice
	progressBar.value=progressValue
	let update = {
		besl_Obj:beslD,
		bsl_obj:bslV,
		progress_Obj:progressValue,
		totalBackers_Obj:totalBackersD
	}
	updateArr =update
	localStorage.setItem('updateArr', JSON.stringify(updateArr))
	render(besl, totalSum, totalBackers, beslMain, beslD, progressValue, totalBackersD)
	popupBackground.classList.toggle('display')
	thanksPopupBackground.classList.toggle('finalDisplay')
	document.body.scrollTop = document.documentElement.scrollTop = 0
})
//exit thanks popup and go back to pop up
//final confarmation event
gotItEl.addEventListener('click', function() {
	// body...
	thanksPopupBackground.classList.toggle('finalDisplay')
	document.body.scrollTop = document.documentElement.scrollTop = 0
	popupBackground.classList.toggle('display')
})
function popup() {
	// body...
	popupBackground.classList.toggle('display')
	document.body.scrollTop = document.documentElement.scrollTop = 0

}
function toggleIsactive(x, y, z) {
	// body...
	x.classList.toggle('is-active')
	y.classList.toggle('is-active')
	z.classList.toggle('is-active')
}
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function render(a,b,c,d,e,f,g) {
	a.textContent=e
	b.textContent=`$${numberWithCommas(f)}`
	c.textContent=g
	d.textContent=e
}
function renderAll(bsl, bslMain, besl, beslMain, totalSum, totalBackers, progressBar, bslV, beslV, progressValue, totalBackersD) {
	// body...
	bsl.textContent=bslV
	bslMain.textContent=bslV
	besl.textContent=beslV
	beslMain.textContent=beslV
	totalSum.textContent=`$${numberWithCommas(progressValue)}`
	totalBackers.textContent=totalBackersD
	progressBar.value=progressValue
}