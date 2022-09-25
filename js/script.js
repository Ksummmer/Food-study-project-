window.addEventListener('DOMContentLoaded', () => {

    const tabs =document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');
    
    function hideTabContent() {
        tabsContent.forEach(item => {
        //    item.style.display = 'none';
        //либо вместо данной строки (выше) мы после изменений в css (там добавили строку -
        //.show{display:block}.hide{display: none}.fade{animation-name: fade;animation-duration:1.5s;}
        //@keyframes fade{from{oopacity: 0.1;}to{opacity: 1;}})
        //т.е. добавили анимацию под названием fade с прозрачностью от 1 до 100%
            item.classList.add('hide');
            //добавили класс hide  т.к. скрываем элементы
            item.classList.remove('show', 'fade');
            //убрали класс show

        });
//скрываем табы из видимости
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
//скрываем также у каждого элемента табов  классы активности. точу  перед tabheader__item_active не ставим, так как
//команда classlist итак задает работу с классами
    }

    function showTabContent (i = 0) {
        // tabsContent[i].style.display = 'block';
        //либо вместо данной строки (выше) мы после изменений в css (там добавили строку -
        //.show{display:block}.hide{display: none}.fade{animation-name: fade;animation-duration:1.5s;}
        //@keyframes fade{from{oopacity: 0.1;}to{opacity: 1;}})
        //т.е. добавили анимацию под названием fade с прозрачностью от 1 до 100%
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
        //добавляем класс активности обратно
    }

    hideTabContent();
    showTabContent();

    // то же самое через вызов аргумента (0)-
    //function showTabContent (i) {
    //     tabsContent[i].style.display = 'block';
    //     tabs[i].classList.add('tabheader__item_active');
    // }

    // hideTabContent();
    // showTabContent(0);

    tabsParent.addEventListener ('click', (event) => {

    const target = event.target;
    //пропишем переменную для дальнейшей краткости указания переменной event.target:
    if (target && target.classList.contains('tabheader__item')) {
        tabs.forEach((item, i) => {
            if (target == item) {
                hideTabContent();
                showTabContent(i);
            }
            //функция обращается к табам, перебирает их и при клике на определенный таб (==) запускает функции
            // "спрятать все табы" и "показать таб с порядковым номером i"
        });

    }
    });


    //Timer

    const deadline = '2022-05-25';

    function getTimeRemaining (endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
              days = Math.floor(t/(1000*60*60*24)),
              // Math.floor(округляет)
              hours = Math.floor(t/(1000*60*60)%24),
              //% возвращает остаток от деления, т.е.например 5/2 = 1
              minutes = Math.floor(t/(1000*60)%60),
              seconds = Math.floor(t/1000%60);

        return{
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };

    }

    function getZero (num) {
    if (num >= 0 && num < 10) {
        return `0${num}`;
    }
        else {
            return num;
        }
    }
    //добавляем 0 там где числа меньше 10. потом эту функцию
    //передаем в функцию updateClock

    function setClock (selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

            updateClock();
            //чтобы страница не моргала - функция установит время

            function updateClock () {
                const t = getTimeRemaining(endtime);

                days.innerHTML = getZero(t.days);
                hours.innerHTML = getZero(t.hours);
                minutes.innerHTML = getZero(t.minutes);
                seconds.innerHTML = getZero(t.seconds); 

                if (t.total <= 0) {
                    clearInterval(timeInterval);
                }

            }


    }


    setClock('.timer', deadline);


    //modal - добавили в html атрибут data-modal для кнопки 
    //"связаться с нами" и атрибут data-close в завершении диалога
    
    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal'),
          modalCloseBtn = document.querySelector('[data-close]');


    function openModal () {
            modal.classList.add('show');
            modal.classList.remove('hide');
            document.body.style.overflow = 'hidden';
            clearInterval (modalTimerID);
            //добавляем clearInterval чтобы при самостоятельном нажатии
            //кнопки "связаться с нами" модальное окно   не вылезало
            // потом еще раз по установленному таймеру
        }

    modalTrigger.forEach(btn => {
          btn.addEventListener('click', openModal);
        //добавили стиль для остановки прокрутки страницы, 
        //пока открыто модальное окно
    });

    


    // modalCloseBtn.addEventListener('click', () => {
    //     modal.classList.add('hide');
    //     modal.classList.remove('show');
    //     document.body.style.overflow = '';
    //     //убрали стиль для восстановоения прокрутки страницы 
    //     //при закрытии модального окна 
    // });

    // modal.addEventListener('click', (e) => {
    //     if(e.target === modal) {
    //        modal.classList.add('hide');
    //        modal.classList.remove('show');
    //        document.body.style.overflow = '';
    //        /*теперь при нажатии куда-то вне модального окна 
    //        (см инспектор в браузере: если навести на вне 
    //         модального окна, светится div class = modal show)
    //        модальное окно закроется  */ 
    //     }
    // });
    
    //выносим повторяющиеся части по закрытию кода в отдельную функцию
    
   
    
    
    function closeModal () {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
//используем функцию далее для оптимизации кода 
//(вместо двух частей кода выше)

    modalCloseBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if(e.target === modal) {
           closeModal();
        }
    });

    //сделаем закрытие модального окна при нажатии escape на клаве
    document.addEventListener('keydown', (e) => {
        if(e.code === "Escape" && modal.classList.contains('show')) {
            closeModal();
        }
        //код клавиш можно найти в гугле - event.code
        //добавили,чтоб esc так работал только при открытом модальном окне
    });

    // const modalTimerID = setTimeout (openModal, 5000);

    
    
    /*добавим всплытие модального окна при прокручивании
     страницы до самого низа*/

    function showModalByScroll() {
         if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
             /*выражение означает,что пользователь дошел до низа страницы - длина его прокрутки и открытой страницы равна длине всей прокрутки*/
             openModal();
             window.removeEventListener('scroll', showModalByScroll);
             /*добавили удаление обработчика событий из обработчика ниже, чтобы окно всплывало только один раз */
       }
    }
    window.addEventListener('scroll', showModalByScroll);

     /*
     window.addEventListener('scroll', () => {
       if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
           openModal();
       }
       {once: true});
     чтобы модальное окно появлялось только раз, мы могли бы использовать здесь {once: true}, но тогда оно прмиенится к первому же прокручиванию scroll и дальше не сработает, т.е. это в нашем случае не вариант. использовали вариант выше с функциями  */

// 30 !!!Используем классы для карточек

class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
        this.src = src;
        this.alt = alt;
        this.title = title;
        this.descr = descr;
        this.price = price;
        this.classes = classes;
        this.parent = document.querySelector(parentSelector);
        this.transfer = 27;
        this.changeToUAH();
    }

    changeToUAH() {
        this.price = this.price * this.transfer;
    }

    render() {
        const element = document.createElement('div');
        if(this.classes.length === 0) {
            this.element = 'menu__item';
            element.classList.add(this.element);
        } else {
            this.classes.forEach(className => element.classList.add(className));
        }

        element.innerHTML = `
        <img src=${this.src} alt=${this.alt}>
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">${this.descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
        </div>
        `;
        this.parent.append(element);
    }
}

new MenuCard(
    "img/tabs/vegy.jpg",
    "vegy",
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    9,
    '.menu .container'
).render();

new MenuCard(
    "img/tabs/post.jpg",
    "post",
    'Меню "Постное"',
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    21,
    '.menu .container'
).render();

new MenuCard(
    "img/tabs/elite.jpg",
    "elite",
    'Меню “Премиум”',
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    14,
    '.menu .container'
).render();

    });