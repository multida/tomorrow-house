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

console.log(orderCtaBuyButton, orderCtaBookmarkkButton)

//previousElementSibling, nextElementSibling, parentNode, children

function openOrderCta() {
  orderModal.classList.add('is-open');
  orderModalOverlay.classList.add('is-active');
}
function closeOrderCta() {
  orderModal.classList.remove('is-open');
  orderModalOverlay.classList.remove('is-active');
}

orderCtaBuyButton.addEventListener('click', openOrderCta)
orderModalOverlay.addEventListener('click', closeOrderCta)