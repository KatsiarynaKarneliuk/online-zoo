// burger
let menuBtn = document.querySelector('.menu-btn');
let menu = document.querySelector('.menu');
menuBtn.addEventListener('click', function(){
	menuBtn.classList.toggle('active');
	menu.classList.toggle('active');
})

// testimonials
let fragment = new DocumentFragment();
let feedbacks = document.querySelector('.feedbacks');

function getFeedbacks(){ 
    fetch('../main/feedbacks.json')
        .then(res =>{
            return res.json();
        })
            .then(data =>{
                for (let i = 0; i < data.length; i++) {
                    // name   
                    let personName = document.createElement('h3');
                    personName.append(data[i].personName);
                    // content
                    let feedbackText = document.createElement('p');
                    feedbackText.append(data[i].text);
                    let feedback = document.createElement('div');
                                  
                    //modal window
                    let modal = document.createElement('div');
                    let modal_content = document.createElement('div');
                    let close_modal_button = document.createElement('div');
                    close_modal_button.innerHTML = "Close";
                    let modal_content_text= document.createElement('p');
                    let modal_content_personName = document.createElement('h3');
                    modal_content_text.append(data[i].personName,data[i].text);
                    modal_content.append(modal_content_text,close_modal_button);
                    modal.append(modal_content);
                    close_modal_button.addEventListener("click", function() {if(modal.classList==='show'){
                    modal.classList.toggle('close')};
                    });
                    modal.classList.add('modal');
                    modal_content.classList.add('modal_content');
                    modal_content_text.classList.add('modal_content_text');
                    modal_content_personName.classList.add('modal_content_personName');
                    close_modal_button.classList.add('close_modal_button');
                    feedback.addEventListener('click', function () {
                        modal.classList.toggle('show');
                    });

                    feedback.append(personName, feedbackText, modal);
                    fragment.append(feedback);
                    feedbacks.append(fragment);
                    feedback.classList.add('feedback');
                    feedback.setAttribute('id', data[i].id);
                }             
            })
};
getFeedbacks();

// feedback slider
let sliderCircle = document.querySelector('input[type="range"]');
let rangeValue = function(){
    let newValue = sliderCircle.value;
    let target = document.querySelector('.value');
    target.innerHTML = newValue;
}

sliderCircle.addEventListener("input", rangeValue);



let position = 0;
const btnNext = document.querySelector('.btnNext');
const btnPrev = document.querySelector('.btnPrev');
const nextFeedback = () =>{
    if(position<165){          //width of fedback*amount , exchange with dots.length
    position += 15
    feedbacks.style.left = -position + `rem`;
    }else{
        position = 0;
    }
}

const prevFeedback = () =>{
    if(position>0){          //width of fedback*amount , exchange with dots.length
    position -= 15
    feedbacks.style.left = -position + `rem`;
    }else{
        position = 0;
    }
}
btnNext.addEventListener('click', nextFeedback);
btnPrev.addEventListener('click', prevFeedback);

// pets carusel
const gap = 16;

const carousel = document.querySelector(".animals_cards_container"),
  content = document.querySelector(".animals_cards"),
  next = document.querySelector(".arrow_right"),
  prev = document.querySelector(".arrow_left");

next.addEventListener("click", e => {
  carousel.scrollBy(width + gap, 0);
  if (carousel.scrollWidth !== 0) {
    prev.style.display = "flex";
  }
  if (content.scrollWidth - width - gap <= carousel.scrollLeft + width) {
    next.style.display = "none";
  }
});
prev.addEventListener("click", e => {
  carousel.scrollBy(-(width + gap), 0);
  if (carousel.scrollLeft - width - gap <= 0) {
    prev.style.display = "none";
  }
  if (!content.scrollWidth - width - gap <= carousel.scrollLeft + width) {
    next.style.display = "flex";
  }
});

let width = carousel.offsetWidth;
window.addEventListener("resize", e => (width = carousel.offsetWidth));


/* variant with generated pet's carusel
const pets =[
  {
    id: 1,
    img: "../../assets/images/animalsСards/panda.png",
    header:"giant Pandas",
    text: "Native to Southwest China",
  },
  {
    id: 2,
    img: "../../assets/images/animalsСards/bird.png",
    header:"Eagles",
    text: "Native to South America",
  },
  {
    id: 3,
    img: "../../assets/images/animalsСards/gorila.png",
    header:"Gorilas",
    text: "Native to Congo",
  },
  {
    id: 4,
    img: "../../assets/images/animalsСards/lenivec.png" ,
    header:"Two-toed Sloth",
    text: "Mesoamerica, South America",
  },
  {
      id: 5,
      img: "../../assets/images/animalsСards/leop.png",
      header:"cheetahs",
      text: "Native to Africa",
  },
  {
      id: 6,
      img: "../../assets/images/animalsСards/pinguin.png",
      header:"Penguins",
      text: "Native to Antarctica",
  }
]
let fragment1 = new DocumentFragment();
let fragment2 = new DocumentFragment();
let slider1 = document.querySelector(".animals_cards1");
let slider2 = document.querySelector(".animals_cards2");
next = document.querySelector(".arrow_right"),
prev = document.querySelector(".arrow_left");

function shuffle(array){
  let currentIndex = array.length, randomIdex;
  while (currentIndex  !==0){   //while there remain elements to shuffle
    randomIdex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    
    // swap random with current
    [array[currentIndex], array[randomIdex]] = [
      array[randomIdex], array[currentIndex]
    ];
  }
  return array;
}
let pets1 = shuffle(pets);
let pets2 = shuffle(pets);
console.log(pets1);
console.log(pets2);

for (let i = 0; i < pets1.length; i++) {  
  let galeryItem=document.createElement('div')
  let img = document.createElement('img');
  img.append(pets1[i].img);
  img.classList.add('galery_img');
  img.setAttribute('src', pets1[i].src);
  let header = document.createElement('p');
  header.append(pets1[i].text);
  let text = document.createElement('p');
  text.append(pets1[i].text);
  header.classList.add('galery_header');
  text.classList.add('galery_text');
  galeryItem.append(img, header, text);
  galeryItem.classList.add('galery-item');
  galeryItem.setAttribute('id', pets1[i].id);
  fragment1.append(galeryItem);
  
  slider1.append(fragment1);
}
for (let i = 0; i < pets2.length; i++) { 
  let galeryItem=document.createElement('div')
  let img = document.createElement('img');
  img.append(pets2[i].img);
  let header = document.createElement('p');
  header.append(pets2[i].text);
  let text = document.createElement('p');
  text.append(pets2[i].text);
  img.classList.add('galery_img');
  img.setAttribute('src', pets2[i].src);
  header.classList.add('galery_header');
  text.classList.add('galery_text');
  galeryItem.append(img, header, text);
  galeryItem.classList.add('galery-item');
  galeryItem.setAttribute('id', pets2[i].id);
  fragment2.append(galeryItem);
  
  slider2.append(fragment2);
}

next.addEventListener("click", shuffle(pets1));
prev.addEventListener("click", shuffle(pets2));*/
