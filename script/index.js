const loadLesson = () => {
  fetch('https://openapi.programming-hero.com/api/levels/all')
    .then(res => res.json())
    .then(json => displayLesson(json.data));
};

const loadLevelWord = id => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then(res => res.json())
    .then(data => displayLevelWord(data.data));
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

  words.forEach(word => {
    console.log(word);
    const card = document.createElement('div');
    card.innerHTML = `
    <div class="bg-white rounded-xl shadow-sm text-center py-6 px-3 md:py-10 md:px-5 space-y-3 hight-full">
          <h2 class="text-lg md:text-2xl font-bold">${word.word}</h2>
          <p class="text-sm md:text-lg font-semibold">Meaning /Pronounciation</p>
          <div class="font-bangla text-lg md:text-2xl font-bold">"${word.meaning} / ${word.pronunciation}"</div>
          <div class="flex justify-between items-center">
            <button class="btn bg-[#1A91FF]/10 hover:bg-[#1A91FF]/80"><i class="fa-solid fa-circle-info"></i></button>
            <button class="btn bg-[#1A91FF]/10 hover:bg-[#1A91FF]/80"><i class="fa-solid fa-volume-high"></i></button>
          </div>
        </div>`;
    wordContainer.appendChild(card);
  });
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
                <button onclick="loadLevelWord(${lesson.level_no})"  class="btn btn-outline btn-primary"
                  ><i class="fa-solid fa-book-open"></i> Learn ${lesson.level_no}</button
                >`;
    // 4.appendChild
    levelContainer.appendChild(btnDiv);
  }
};
loadLesson();
