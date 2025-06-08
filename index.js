const lessons_body = document.getElementById("lessons");

// Fetch data and render buttons
fetch("https://openapi.programming-hero.com/api/levels/all")
  .then((response) => response.json())
  .then((datas) => lessons_func(datas.data));

function lessons_func(datas) {
  datas.forEach((data) => {
    const button_div = document.createElement("div");
    button_div.innerHTML = `<button onclick="lessonlist(${data.level_no})" id="${data.level_no}" class="btn btn-outline btn-primary me-[20px] font-semibold text-[14px]">
                    <img src="assets/fa-book-open.png">
                    Lesson -${data.level_no}</button>`;
    lessons_body.appendChild(button_div);
  });
}

// Lesson Card List
function lessonlist(lesson_id) {
  const lesson_list = document.getElementById("lesson_list");
  lesson_list.innerHTML = "";

  // Fetch data and render words
  fetch("https://openapi.programming-hero.com/api/level/" + lesson_id)
    .then((response) => response.json())
    .then((datas) => {
      if (datas.data.length > 0) {
        const grid = document.createElement("div");
        grid.className = "grid lg:grid-cols-3 sm:grid-cols-1 gap-[30px]";

        datas.data.forEach((word) => {
          const card_div = document.createElement("div");
          card_div.innerHTML = `
          <div class="card bg-white p-[56px]">
              <div class="flex flex-col items-center justify-center">
                  <div class="inter text-[32px] font-bold mb-[24px]">${word.word}</div>
                  <div class="inter text-[20px] font-medium">Meaning /Pronounciation</div>
                  <div class="siliguri text-[32px] font-semibold mt-[24px]">"${word.meaning}/${word.pronunciation}"</div>
                  <div class="w-full flex flex-row items-center justify-between mt-[56px]">
                      <button
                          class="w-[56px] h-[56px] rounded-lg bg-[#1a91ff1a] flex items-center justify-center">
                          <i class="fa-solid fa-circle-info text-[24px]"></i>
                      </button>
                      <div class="w-[56px] h-[56px] rounded-lg bg-[#1a91ff1a] flex items-center justify-center">
                          <i class="fa-solid fa-volume-high text-[24px]"></i>
                      </div>
                  </div>
              </div>
          </div>
          `;
          grid.appendChild(card_div);
        });

        lesson_list.appendChild(grid);
      } else {
        const card_div = document.createElement("div");
        card_div.className =
          "w-full h-[338px] flex flex-col items-center justify-center";
        card_div.innerHTML = `
        <img src = "assets/alert-error.png" class="w-[96px] h-[96px] mb-[15px]">
        <p class="siliguri text-[14px] font-normal mb-[12px]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                <p class="siliguri text-[35px] font-medium">নেক্সট Lesson এ যান</p>
                `;
        lesson_list.appendChild(card_div);
      }
    });
}
