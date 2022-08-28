const reviewLikeButtonList = document.querySelectorAll('.review-card-footer button');
const HELPFUL = "도움됨";
const NOT_HELPFUL = "도움이 돼요";

function toggleReviewLikeButton() {
  /*
    1. btn 클래스 변경 : btn-primary <--> btn-outlined
    2. 텍스트 변경 : 도움이 돼요 <--> 도움됨
    3. count 변경 : N명에게 도움이 되었습니다.
  */

    const isLiked = this.classList.contains('btn-primary');//버튼이 활성화가 된 것인지를 알아 보기 위한 변수
    const textElement = this.nextElementSibling;
    const reviewCardFooter = this.parentNode;

  if(isLiked){//true -> 도움이 돼요
    //비활성화
    this.innerHTML = NOT_HELPFUL;
  } else {//false -> 도움된
    //활성화
    this.innerHTML = HELPFUL;

    const checkIcon = document.createElement('i');
    checkIcon.classList.add('ic-check');
    checkIcon.setAttribute('aria-hidden', true);
    this.prepend(checkIcon)
  }

  if(textElement) {//도움된 사람이 있을때 
    //N명 => N값을 업데이트
    const countSpan = textElement.querySelector('span');
    const count = Number(countSpan.innerHTML.replaceAll(',', ''));
    let newCount = count;

    if(isLiked) {//비활성화 count - 1
      newCount = newCount - 1;
      if(newCount === 0) {
        reviewCardFooter.removeChild(textElement);
      } else {
        countSpan.innerHTML = newCount.toLocaleString();//toLocaleString 3자리씩 콤마가 들어감
      }

    } else {//활성화 count + 1
      newCount = newCount + 1;
      countSpan.innerHTML = newCount.toLocaleString();;
    }
    
  } else {//도움된 사람이 없을때
    if(!isLiked) {
      //앞으로는 활성화가 될것이다. => 1명
      const newTextElement = document.createElement('p');
      newTextElement.innerHTML = `
      <strong><span>1</span>명</strong>에게 도움이 되었습니다.
      `;
      reviewCardFooter.appendChild(newTextElement);
    }
  }

  this.classList.toggle('btn-primary');
  this.classList.toggle('btn-outlined');
}

reviewLikeButtonList.forEach((button) => {
  button.addEventListener('click', toggleReviewLikeButton);
});

