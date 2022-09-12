const gnbSearch = document.querySelector(".gnb-search");
const gnbSearchInput = gnbSearch.querySelector("input");
const gnbSearchHistory = gnbSearch.querySelector(".search-history");

const deleteAllBtn = gnbSearchHistory.querySelector(".search-history-header button");
const gnbSearchHistoryList =gnbSearchHistory.querySelector('.search-history-list');

const deleteBtnList =gnbSearchHistoryList.querySelectorAll('.delete-button');

function closeGnbSearchHistory() {
  gnbSearchHistory.classList.remove('is-active');
    window.removeEventListener('click', closeGnbSearchHistoryOnClickingOutside);
}

function closeGnbSearchHistoryOnClickingOutside(e){
  if(!gnbSearch.contains(e.target)) {
    closeGnbSearchHistory();
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
  closeGnbSearchHistory();
}
function deleteSearchHistoryItem(e) {
  e.stopPropagation();//이벤트 전파 막기, window 클릭이벤트 막기, closeGnbSearchHistoryOnClickingOutside -> X
  //부모인 li를 삭제 시킨다.
  const itemToDelete = this.parentNode; //지울 리스트 아이템
  gnbSearchHistoryList.removeChild(itemToDelete);
  //removechild는 자식을 지우는 건데 무조건 부모에게만 권한이(?) 있다.

  if(gnbSearchHistoryList.children.length === 0){
    closeGnbSearchHistory();
  }
}

deleteBtnList.forEach(button => {
  button.addEventListener('click', deleteSearchHistoryItem);
});

gnbSearchInput.addEventListener('focus', openGnbSearchHistory);
deleteAllBtn.addEventListener('click', deleteAllSearchHistoryItems);
