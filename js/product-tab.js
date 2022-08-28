const productTab = document.querySelector('.product-tab');
const productTabButtonList = productTab.querySelectorAll('button');

let currentActiveTab = productTab.querySelector('.is-active');;//현재 active 되어 있는 녀석이 누구인지를 담아두는 변수

function toggleActiveTab() {
  /*
    1. is-active
  */
  const tabItem = this.parentNode;

  if(currentActiveTab !== tabItem){//기존에 있는 is-active를 눌렀을때 꺼지는 현상이 있어 조건문을 걸어준다. 
    tabItem.classList.add('is-active');
    currentActiveTab.classList.remove('is-active');
    currentActiveTab = tabItem;
  }
}

productTabButtonList.forEach((button) => {
  button.addEventListener('click', toggleActiveTab);
})
