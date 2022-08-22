const gnbSearch = document.querySelector(".gnb-search");
const gnbSearchInput = gnbSearch.querySelector("input");
const gnbSearchHistory = gnbSearch.querySelector(".search-history");

const deleteAllBtn = gnbSearchHistory.querySelector(".search-history-header button");
const gnbSearchHistoryList =gnbSearchHistory.querySelector('.search-history-list');

function closeGnbSearchHistoryOnClickingOutside(e){
  if(!gnbSearch.contains(e.target)) {
    gnbSearchHistory.classList.remove('is-active');
    window.removeEventListener('click', closeGnbSearchHistoryOnClickingOutside);
  }
}

function openGnbSearchHistory(){
  //check!! => gnbSearchHistoryList에 li가 몇개가 있는지  
  //li가 0 => 실행 X
  //li가 1~ => 실행 O
  if(gnbSearchHistoryList.children.length === 0) {
    return; //다음의 코드 다 멈춰!!
  }
  if(!gnbSearchHistory.classList.contains('is-active')) {
    window.addEventListener('click', closeGnbSearchHistoryOnClickingOutside);
  }
  gnbSearchHistory.classList.add('is-active');
}

function deleteAllSearchHistoryItems(){
  //gnbSearchHistoryList 안에 들어있는 모든 li를 삭제해!
  gnbSearchHistoryList.innerHTML = '';//빈 문자열로 변경
  gnbSearchHistory.classList.remove('is-active');
}

gnbSearchInput.addEventListener('focus', openGnbSearchHistory);
deleteAllBtn.addEventListener('click', deleteAllSearchHistoryItems);
