const sidebarMenuButton = document.querySelector('.gnb-icon-button.is-menu');
const sidebar = document.querySelector('.sidebar');
const sidebarOverlay = document.querySelector('.overlay');

//console.log(sidebarMenuButton, sidebar, sidebarOverlay)

function openSidebar() {
  sidebar.classList.add("is-active");
  sidebarOverlay.classList.add("is-active");

  // if(sidebarOverlay.contains(is-active)) {
    
  // }
}
function closeSidebar() {
  sidebar.classList.remove("is-active");
  sidebarOverlay.classList.remove("is-active");

  // if(sidebarOverlay.contains(is-active)) {
    
  // }
}

sidebarMenuButton.addEventListener("click", openSidebar);
sidebarOverlay.addEventListener("click", closeSidebar);

/*
  햄버거를 누르면 사이드바 나오고, 오버레이 나온다. 
  오버레이 클릭시 사이드바 삭제


*/