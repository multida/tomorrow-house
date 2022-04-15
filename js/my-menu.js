const myMenu = document.querySelector('.my-menu')
const myMenuButton = myMenu.querySelector('.my-menu-button')

function closeMyMenuOnClickingOutside(e) {
  console.log('CLICK') //내가 실행하고자 할때만 나와야 하기 때문에 밑에 지워주고, 위치 변경해줌
  //1. 내가 클릭한 요소가 무엇인지? - 이벤트 객체 이용 (e, evt, event) -> e.target
  //2. myMenu가 요소를 포함하고 있는지를 알 수 있는 방법 (contains)
  // => myMenu가 e.target을 포함하고 있지 않은 경우에 -> .my-menu에서 is-active 삭제

  if (!myMenu.contains(e.target)) {
    myMenu.classList.remove('is-active')
    window.removeEventListener('click', closeMyMenuOnClickingOutside)
  }
}

function toggleMyMenu() {
  if(!myMenu.classList.contains('is-active')) {
    //앞으로 활성화 시키겠음!
    window.addEventListener('click', closeMyMenuOnClickingOutside)
  }
  myMenu.classList.toggle('is-active')
}

myMenuButton.addEventListener('click', toggleMyMenu)
