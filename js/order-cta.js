const orderCta = document.querySelector('.order-cta');
const orderCtaBuyButton = orderCta.children[1];
const orderCtaBookmarkkButton = orderCta.children[0];
// const orderCtaBuyButton = orderCta.querySelector('.btn-48.btn-primary');
// const orderCtaBookmarkkButton = orderCta.querySelector('.btn-48.btn-ghost');
// const orderCtaBuyButton = orderCta.children[1];
// const orderCtaBookmarkkButton = orderCta.children[0];
// const [orderCtaBuyButton, orderCtaBookmarkkButton] = orderCta.children; -> 최신 방법임!
const orderModal = document.querySelector('.order-form-modal');
const orderModalOverlay = document.querySelector('.overlay');

//previousElementSibling, nextElementSibling, parentNode, children

function openOrderCta() {
  orderModal.classList.add('is-open');
  orderModalOverlay.classList.add('is-active');
}
function closeOrderCta() {
  orderModal.classList.remove('is-open');
  orderModalOverlay.classList.remove('is-active');
}

function toggleOrderCtaBookmark() {
  /*
      1. 버튼한테 .is-active 활성화
      2. icon 클래스가 변경 ic-bookmark vs ic-bookmark-filled로 변경
      3. 북마크 횟수 증가 ( aira-label 도 함께)
    */

  const [icon, countSpan] = this.children //[아이콘, 카운트 span]
  const count = Number(countSpan.innerHTML.replaceAll(',', '')) //string인 형을 number로 형변환
  console.log(typeof count)

  let newCount = count

  if(this.classList.contains('is-active')) {
    //NOTE : 활성화가 된 상태이니 -> 비활성화(ic-bookmark)
    icon.classList.add('ic-bookmark')
    icon.classList.remove('ic-bookmark-filled')
    //활성화 되어있다면 비활성화 시켜줘야하기 때문에 -1
    newCount = newCount - 1
  } else {
    //NOTE : 비활성화가 된 상태이니 -> 활성화(ic-bookmark-filled)
    icon.classList.add('ic-bookmark-filled')
    icon.classList.remove('ic-bookmark')
    //비활성화 되어있다면 활성화 시켜줘야하기 때문에 +1
    newCount = newCount + 1
  }
  countSpan.innerHTML = newCount.toLocaleString()//3자리수마다 , 찍어줌
  countSpan.setAttribute('aria-label', `북마크 ${newCount.toLocaleString()}회`)
  this.classList.toggle('is-active');
  }
  
  orderCtaBuyButton.addEventListener('click', openOrderCta)
  orderModalOverlay.addEventListener('click', closeOrderCta)
  orderCtaBookmarkkButton.addEventListener('click', toggleOrderCtaBookmark)