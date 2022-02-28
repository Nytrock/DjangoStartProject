const btn = document.querySelector(".btn-toggle");
const theme = document.querySelector("#theme-link");
btn.addEventListener("click", function() {
  if (theme.getAttribute("href") == "css/light-theme.css") {
    theme.href = "css/dark-theme.css";
  } else {
    theme.href = "css/light-theme.css";
  }
});


const isMobile = {
	Android: function(){
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function(){
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function(){
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function(){
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function(){
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function(){
		return (
			isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
	}
}

if (isMobile.any()){
	document.body.classList.add('_touch')
	
	let menuArrows = document.querySelectorAll('.menu_link');
	if (menuArrows.length > 0){
		for (let index = 0; index < menuArrows.length; index++){
			const menuArrow = menuArrows[index];
			menuArrow.addEventListener("click", function (e) {
				menuArrow.parentElement.classList.toggle("_active");
			});
		}
	}
} else {
	document.body.classList.add('_pc')
}

const iconMenu = document.querySelector('.menu_icon');
if (iconMenu){
	const menuBody = document.querySelector('.menu_body');
	iconMenu.addEventListener("click", function (e){
		iconMenu.classList.toggle('_active');
		menuBody.classList.toggle('_active');
		if (isMobile.any()){
				let menuArrows = document.querySelectorAll('.menu_link');
				if (menuArrows.length > 0){
					for (let index = 0; index < menuArrows.length; index++){
						const menuArrow = menuArrows[index];
						menuArrow.parentElement.classList.remove("_active");
					}
				}
			}
	})
}

const menuLinks = document.querySelectorAll('.menu_linked[data-goto]');
if (menuLinks.length > 0){
	menuLinks.forEach(menuLink => {
		menuLink.addEventListener("click", onMenuLinkClick);
	});
	
	function onMenuLinkClick(e){
		const menuLink = e.target;
		if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)){
			const gotoBlock = document.querySelector(menuLink.dataset.goto);
			const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset;
			
			window.scrollTo({
				top: gotoBlockValue,
				behavior: "smooth"
			});
			const iconMenu = document.querySelector('.menu_icon');
			const menuBody = document.querySelector('.menu_body');
			iconMenu.classList.toggle('_active');
			menuBody.classList.toggle('_active');
			if (isMobile.any()){
				let menuArrows = document.querySelectorAll('.menu_link');
				if (menuArrows.length > 0){
					for (let index = 0; index < menuArrows.length; index++){
						const menuArrow = menuArrows[index];
						menuArrow.parentElement.classList.remove("_active");
					}
				}
			}

			e.preventDefault();
		}
	}
}