const reviewLikeButton = document.querySelector('.review-card-footer button');
const HELPFUL = "도움됨";
const NOT_HELPFUL = "도움이 돼요";
const checkIcon = '<i class="ic-check" aria-hidden></i>';

function toggleReviewLikeButton() {
  /*
    1. btn 클래스 변경 : btn-primary <--> btn-outlined
    2. 텍스트 변경 : 도움이 돼요 <--> 도움됨
    3. count 변경 : N명에게 도움이 되었습니다.
  */

    const isLiked = this.classList.contains('btn-primary')//버튼이 활성화가 된 것인지를 알아 보기 위한 변수
    console.log(isLiked)

  if(isLiked){//true -> 도움이 돼요
    //비활성화
    this.innerHTML = NOT_HELPFUL;
  } else {//false -> 도움된
    //활성화
    this.innerHTML = checkIcon + HELPFUL;
  }

  this.classList.toggle('btn-primary');
  this.classList.toggle('btn-outlined');
}

reviewLikeButton.addEventListener('click', toggleReviewLikeButton);