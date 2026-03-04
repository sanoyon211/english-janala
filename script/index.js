const createElement = (arr) => {
  const htmlElements = arr.map((el) => `<span class="btn">${el}</span>`);
  return htmlElements.join(" ");
}

const manageSpinner = (status) => {
  if (status == true) {
    document.getElementById('spinner').classList.remove("hidden");
    document.getElementById('word-container').classList.add("hidden");
  } else {
    document.getElementById('word-container').classList.remove('hidden');
    document.getElementById('spinner').classList.add('hidden');
  }
}

const loadLesson = () => {
  fetch('https://openapi.programming-hero.com/api/levels/all')
    .then(res => res.json())
    .then(json => displayLesson(json.data));
};

const removeActive = () => {
  const lessonButtons = document.querySelectorAll('.lesson-btn');
  // console.log(lessonButtons)
  lessonButtons.forEach(btn => btn.classList.remove('active'));
};

const loadLevelWord = id => {
  manageSpinner(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then(res => res.json())
    .then(data => {
      removeActive();
      const clickBtn = document.getElementById(`lesson-btn-${id}`);
      // console.log(clickBtn)
      clickBtn.classList.add('active');
      displayLevelWord(data.data);
    });
};

const loadWordDetail = async id => {
  url = `https://openapi.programming-hero.com/api/word/${id}`;
  console.log(url);
  const res = await fetch(url);
  const details = await res.json();
  wordDetails(details.data);
};

// {
//     "word": "Eager",
//     "meaning": "আগ্রহী",
//     "pronunciation": "ইগার",
//     "level": 1,
//     "sentence": "The kids were eager to open their gifts.",
//     "points": 1,
//     "partsOfSpeech": "adjective",
//     "synonyms": [
//         "enthusiastic",
//         "excited",
//         "keen"
//     ],
//     "id": 5
// }

const wordDetails = word => {
  console.log(word);

  const detailsBox = document.getElementById('details-box');
  detailsBox.innerHTML = `<div id="details-container" class="space-y-3 font-bangla">
          <div class="font-bangla">
          <h2 class="text-xl font-bold">${word.word} ( <i class="fa-solid fa-microphone-lines"></i> :${word.meaning})</h2>
        </div>
        <div>
          <p class="text-lg font-bold">Meaning</p>
          <p class="text-lg font-medium">${word.meaning}</p>
        </div>
        <div>
          <p class="text-lg font-bold">Example</p>
          <p class="text-lg font-medium">${word.sentence}</p>
        </div>
        <div>
          <p class="text-lg font-bold">সমার্থক শব্দ গুলো</p>
          <div class="">
          ${createElement(word.synonyms)}
          </div>
        </div>
        </div>`;
  document.getElementById('word_modal').showModal();
};
// {
//     "id": 19,
//     "level": 1,
//     "word": "Sincere",
//     "meaning": "সত্‍ / আন্তরিক",
//     "pronunciation": "সিনসিয়ার"
// }

const displayLevelWord = words => {
  const wordContainer = document.getElementById('word-container');
  wordContainer.innerHTML = '';

  if (words.length == 0) {
    wordContainer.innerHTML = `
        <div class="text-center col-span-full font-bangla space-y-4 py-10 ">
          <img class="mx-auto" src="assets/alert-error.png" alt="">
          <p class="text-sm leading-6 text-gray-600">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
          <h4 class="font-medium text-4xl text-gray-950">নেক্সট Lesson এ যান।</h4>
        </div>`;
    manageSpinner(false);
    return;
  }

  words.forEach(word => {
    // console.log(word);
    const card = document.createElement('div');
    card.innerHTML = `
    <div class="bg-white rounded-xl shadow-sm text-center py-6 px-3 md:py-10 md:px-5 space-y-3 hight-full">
          <h2 class="text-lg md:text-2xl font-bold">${word.word ? word.word : 'শব্দ পাওয়া যায়নি'}</h2>
          <p class="text-sm md:text-lg font-semibold">Meaning /Pronounciation</p>
          <div class="font-bangla text-lg md:text-2xl font-medium">"${word.meaning ? word.meaning : 'অর্থ পাওয়া যায়নি'} / ${word.pronunciation ? word.pronunciation : 'pronunciation পাওয়া যায়নি'}"</div>
          <div class="flex justify-between items-center">
            <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF]/10 hover:bg-[#1A91FF]/80"><i class="fa-solid fa-circle-info"></i></button>
            <button class="btn bg-[#1A91FF]/10 hover:bg-[#1A91FF]/80"><i class="fa-solid fa-volume-high"></i></button>
          </div>
        </div>`;
    wordContainer.appendChild(card);
  });
  manageSpinner(false);
};

const displayLesson = lessons => {
  // 1. get the container and empty
  const levelContainer = document.getElementById('level-container');
  levelContainer.innerHTML = '';

  // 2.get into every lesson
  for (let lesson of lessons) {
    // 3.create Element
    const btnDiv = document.createElement('div');
    btnDiv.innerHTML = `
                <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})"  class="btn btn-outline btn-primary lesson-btn"
                  ><i class="fa-solid fa-book-open"></i> Learn ${lesson.level_no}</button
                >`;
    // 4.appendChild
    levelContainer.appendChild(btnDiv);
  }
};
loadLesson();

document.getElementById("btn-search").addEventListener('click', () => {
  removeActive();
  const input = document.getElementById('input-search');
  const searchValue = input.value.trim().toLowerCase();
  console.log(searchValue);

  fetch('https://openapi.programming-hero.com/api/words/all')
    .then((res) => res.json())
    .then((data) => {
      const allWords = data.data;
      const filterWords = allWords.filter(word => word.word.toLowerCase().includes(searchValue));
      displayLevelWord(filterWords);
    });
  
})