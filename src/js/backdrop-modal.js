

// НУЖНЫ ИСПРАВЛЕНИЯ 
const refs = {
    openModal: document.querySelector('.gallery'),
    closeModal: document.querySelector('[data-modal-close]'),
 modal: document.querySelector('[data-modal]'),
}

refs.openModal.addEventListener('click', toggleModal);
refs.closeModal.addEventListener('click', toggleModal);

function toggleModal(event) {
    
    if (event.target === event.currentTarget) {
        console.log('не что-то?')
       return
   }
    refs.modal.classList.toggle('is-hidden');
    console.log('event.target', event.target.classList);
    console.log('event.currentTarget', event.currentTarget.classList);

    
}








  // закрытие модального окна Esc (1)
    //  window.addEventListener("keydown", (event) => {
    //     if (event.key === "Escape") {
    //         instance.close();
    //     };
    // });

//  закрытие модалки через Ecs (2вариант)
// function onEscKeyPress(event) {
//   if (event.code === 'Escape') {onCloseModal();}
  
// }


    // сделаем, что бы модалка закрывалась по клику не по кнопке, а по бекдропе
// refsModal.backdrop.addEventListener('click', onBackdropClick);