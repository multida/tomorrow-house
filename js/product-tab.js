const productTab = document.querySelector('.product-tab');
const productTabButtonList = productTab.querySelectorAll('button');

const TOP_HEADER_DESKTOP = 80 + 50 + 54;//header + navibar + lnb
const TOP_HEADER_MOBILE = 50 + 40 + 40;//header + navibar + lnb

let currentActiveTab = productTab.querySelector('.is-active');//현재 active 되어 있는 녀석이 누구인지를 담아두는 변수

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

function scollToTabPanel() {
  const tabPanelId = this.parentNode.getAttribute('aria-labelledby');
  const tabPanel = document.querySelector(`#${tabPanelId}`);

  const scrollAmount = tabPanel.getBoundingClientRect().top - (window.innerWidth >= 768 ? TOP_HEADER_DESKTOP : TOP_HEADER_MOBILE);

  window.scrollBy({
    top: scrollAmount,
    behavior: 'smooth'//safari 안됨 ㅠ 
  })
}

productTabButtonList.forEach((button) => {
  button.addEventListener('click', toggleActiveTab);
  button.addEventListener('click', scollToTabPanel);
})


//각 tabPaneldml y축 위치(문서의 시작점에서부터 얼마나 아래에 있는지) -> window.scrollY
// 요소의 y축 위치 = window.scrollY + element.getBoundingClientRect().top

const productTabPanelIdList = [
  'product-spec',
  'product-review',
  'product-inquiry',
  'product-shipment',
  'product-recommendation'
]

const productTabPanelList = productTabPanelIdList.map((panelId) => {
  //return 필수 그 return값들로 새로운 배열을 형성한다
  const tabPanel = document.querySelector(`#${panelId}`);
  return tabPanel;
});

const productTabPanelPositionMap = {};

function detectTabPanelPosition() {
  //각각의 tabPanel의 y축 위치를 찾는다
  //productTabPanelPositionMap에 그 값을 업데이트 
  /*
    예를 들어 
    {
      'product-spec': 1000,
      'product-review' : 5000,
      ...
    }
  */

    productTabPanelList.forEach((panel) => {
      //id : y축 위치 
      const id = panel.getAttribute('id');
      const position = window.scrollY + panel.getBoundingClientRect().top;
      productTabPanelPositionMap[id] = position;
    })
}

window.addEventListener('load', detectTabPanelPosition);//모든 페이지가 다 로드 됐을때 함수 실행
window.addEventListener('resize', detectTabPanelPosition);//화면 사이즈가 바뀌면 업데이트