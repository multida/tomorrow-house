const productShipmentIconButton = document.querySelector('.product-shipment .product-section-header.sm-only .icon-button');

function showProductShipment(){
  const productShipment = this.parentNode.parentNode;//부모의 부모찾기
  productShipment.classList.add('is-open');
}

productShipmentIconButton.addEventListener('click', showProductShipment)

