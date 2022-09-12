const productTab = document.querySelector('.product-tab');
const productTabButtonList = productTab.querySelectorAll('button');

const TOP_HEADER_DESKTOP = 80 + 50 + 54;//header + navibar + lnb
const TOP_HEADER_MOBILE = 50 + 40 + 40;//header + navibar + lnb

let currentActiveTab = productTab.querySelector('.is-active');//현재 active 되어 있는 녀석이 누구인지를 담아두는 변수
let disableUpdating = false; //상태바를 누를땐 바로 가고, 스크롤때만 스르륵 되게.

function toggleActiveTab() {
  /*
    1. is-active
  */
  const tabItem = this.parentNode;

  if(currentActiveTab !== tabItem){//기존에 있는 is-active를 눌렀을때 꺼지는 현상이 있어 조건문을 걸어준다. 
    disableUpdating = true;
    tabItem.classList.add('is-active');
    currentActiveTab.classList.remove('is-active');
    currentActiveTab = tabItem;

    //disableUpdating가 계속 true이면 스크롤때 액티브가 안됨, 1초 후에는 다시 false로 해야 updateActiveTabOnScroll()가 돌아감!
    setTimeout(() => {
      disableUpdating = false;
    }, 1000)
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
    });

    updateActiveTabOnScroll();
}

function updateActiveTabOnScroll() {
  //스크롤 위치에 따라서 activeTab 업데이트

  if(disableUpdating) {
    return //아무것도 하지말고 바로 종료해라.
  }
//1. 현재 유저가 얼마만큼 스크롤을 했느냐 -> window.scrollY
//2. 각 tabPanel의 y축 위치 -> productTabPanelPositionMap

  const scrolledAmount = window.scrollY + (window.innerWidth >= 768 ? TOP_HEADER_DESKTOP + 80 : TOP_HEADER_MOBILE + 8);
  
  let newActiveTab;
  if(scrolledAmount >= productTabPanelPositionMap['product-recommendation']) {
    newActiveTab = productTabButtonList[4] //추천
  } else if (scrolledAmount >= productTabPanelPositionMap['product-shipment']) {
    newActiveTab = productTabButtonList[3] //배송환불
  } else if (scrolledAmount >= productTabPanelPositionMap['product-inquiry']) {
    newActiveTab = productTabButtonList[2] //문의
  } else if (scrolledAmount >= productTabPanelPositionMap['product-review']) {
    newActiveTab = productTabButtonList[1] //리뷰
  } else {
    newActiveTab = productTabButtonList[0] //상품정보
  }

  //추가 : 끝까지 스크롤한 경우 newActiveTab = productTabButtonList[4]
  //window.scrollY + window.innerHeight === body의 전체 height
  /*
    태블릿 이슈: 태블릿에서 푸터에 56을 마진으로 주었기 때문에 html과 body의 길이가 56px 차이가 난다.
    window.innerWidth < 1200 - orderCta, 56px
  */
  const bodyHeight = document.body.offsetHeight + (window.innerWidth < 1200 ? 56 : 0)
  if(Math.floor(window.scrollY + window.innerHeight) === bodyHeight) { //나는 왜 소수점까지 나오지..?ㅜㅜ 강제로 소수점 버림 넣어줌 
    newActiveTab = productTabButtonList[4]
  }

  if(newActiveTab) {
    newActiveTab = newActiveTab.parentNode;

    if(newActiveTab !== currentActiveTab) {
      newActiveTab.classList.add('is-active');
      if(currentActiveTab !== null) {
        currentActiveTab.classList.remove('is-active');
      }
      currentActiveTab = newActiveTab;
    }
  }
}

window.addEventListener('load', detectTabPanelPosition);//모든 페이지가 다 로드 됐을때 함수 실행
window.addEventListener('resize', _.throttle(detectTabPanelPosition, 1000));//화면 사이즈가 바뀌면 업데이트
window.addEventListener('scroll', _.throttle(updateActiveTabOnScroll, 300));