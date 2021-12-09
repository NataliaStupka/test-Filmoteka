// кнопка back-to-top
const goTopBtn = document.querySelector('.back-to-top');

// отслеживать прокрутку документа, будем добавлять/удалять кнопке класс back-to-top-show.
window.addEventListener('scroll', trackScroll);
goTopBtn.addEventListener('click', backToTop);


export function upArrow(trackScroll, backToTop) {
   
}

// Когда прокручиваем документ на «один экран», кнопка появляется, и наоборот
function trackScroll() {
    const scrolled = window.pageYOffset;
    const coords = document.documentElement.clientHeight;

    if (scrolled > coords) {
      goTopBtn.classList.add('back-to-top-show');
    }
    if (scrolled < coords) {
      goTopBtn.classList.remove('back-to-top-show');
    }
  }

//   при клике на кнопку, прокручиваем страницу вверх (-40 - быстрота прокручивания)
function backToTop() {
    if (window.pageYOffset > 0) {
      window.scrollBy(0, -40);
      setTimeout(backToTop, 0);
    }
  }