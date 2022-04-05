const pageList = document.querySelector('.product-pagination');
const pageCurrent = pageList.getAttribute('pageCurrent');

(pageList.children)[pageCurrent].classList.add('current');
