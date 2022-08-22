const gnbSearch = document.querySelector(".gnb-search");
const gnbSearchInput = gnbSearch.querySelector("input");
const gnbsearchHistory = document.querySelector(".search-history");


function closeGnbSearchHistoryOnClickingOutside(e){
  console.log("dd")
  if(!gnbSearch.contains(e.target)) {
    gnbsearchHistory.classList.remove('is-active');
    window.removeEventListener('click', closeGnbSearchHistoryOnClickingOutside);
  }
}

function openGnbSearchHistory(){
  if(!gnbsearchHistory.classList.contains('is-active')) {
    window.addEventListener('click', closeGnbSearchHistoryOnClickingOutside);
  }
  gnbsearchHistory.classList.add('is-active');
}

gnbSearchInput.addEventListener('focus', openGnbSearchHistory);
