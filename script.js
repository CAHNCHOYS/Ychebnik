const allInputs = document.querySelectorAll("input, textarea");
const resetBtn = document.querySelector(".tests__clear");
const correct = document.querySelector(".tests__answers");

let correctAnswers = 0;

for (const input of allInputs) {
  const placeholder = input.placeholder;

  input.addEventListener("focus", (e) => {
    input.placeholder = "";
  });
  input.addEventListener("blur", (e) => {
    input.placeholder = placeholder;
  });
}

const testForm = document.forms.tests;

testForm.addEventListener("submit", function (e) {
  e.preventDefault();
  correctAnswers = 0;

  checkSingleQuestions(testForm);
  const MultiplyAnswers = [
    ["fs.write", "fs.readFileSync"],

    ["readable", "writable", "duplex", "transform"],
    ["fs.writeFile", "fs.writeFileSync", "fs.write"],
  ];

  checkMultiplyAnswers(testForm, MultiplyAnswers);

  const radios1 = testForm.files;

  const arr1 = Array.from(radios1).filter((el) => el.checked);
  if (arr1.length != 0) {
    if (arr1[0].value === "utf8/utf-8") {
      correctAnswers++;
    } else arr1[0].closest(".tests__choices").classList.add("false");
  } else radios1[0].closest(".tests__choices").classList.add("false");

  const radios2 = testForm.modules;
  const arr2 = Array.from(radios2).filter((el) => el.checked);
  if (arr2.length != 0) {
    if (arr2[0].value === "CommonJS") {
      correctAnswers++;
    } else arr2[0].closest(".tests__choices").classList.add("false");
  } else radios2[0].closest(".tests__choices").classList.add("false");

  correct.innerHTML = `Верно ${correctAnswers} из 15`;

  const sequences = [
    [
      "сonsole.log(`Start`);",
      "console.log(`end`);",
      "setTimeout(()=&gt;console.log(`inside Tiemout 0`), 0 );",
      "setTimeout(()=&gt;console.log(`inside Tiemout 2000`),2000);"
    ],
    [
      "require()",
      "createServer()",
      "respond()",
      "listen()"
    ]
  ];


  checkSequences(testForm, sequences);



});

function checkSingleQuestions(form) {
  clearTest();
  const singleQuestions = form.querySelectorAll("[data-single-answer]");

  for (const question of singleQuestions) {
    const input = question.querySelector("input")
      ? question.querySelector("input")
      : question.querySelector("textarea");
    const questionAnswer = question.dataset.rightAnswer;
    const inputValue = input.value;

    if (questionAnswer == "npm install *пакет") {
      if (input.value.split(" ").includes("install")) correctAnswers++;
      else input.classList.add("false");
    } else if (
      inputValue.trim().toLowerCase() != questionAnswer.toLowerCase()
    ) {
      input.classList.add("false");
    } else {
      correctAnswers++;
    }
  }
}

function checkMultiplyAnswers(form, questions) {
  const Multiplyquestions = form.querySelectorAll("[data-multiple-answers]");

  console.log(Multiplyquestions);

  for (let index = 0; index < Multiplyquestions.length; index++) {
    const question = Multiplyquestions[index];

    const inputs = question.querySelectorAll("input");
    let arr = Array.from(inputs).filter((el) => el.checked);

    if (arr.length === questions[index].length) {
      let i = 0;

      for (const item of arr) {
        if (questions[index].includes(item.value)) {
          i++;
        }
      }

      console.log(i);
      if (i !== arr.length) {
        inputs[0].closest(".tests__choices").classList.add("false");
      } else correctAnswers++;
    } else inputs[0].closest(".tests__choices").classList.add("false");
  }
}

function checkSequences(form, sequences){
   const testItems = form.querySelectorAll('[data-sequence]');
   
   let index = 0;
   for (const test of testItems) {
      const singleSe = test.querySelector('.sequence__items');
      let check = 0;
      let j = 0;
      let c = sequences[index].length;
      if(singleSe.children.length != c){
        singleSe.classList.add('false');
        break;
      }else{
        for (const item of singleSe.children) {
           let value = item.innerHTML;
           console.log(value);
           let split = value.split('-')[1].trim();
           console.log(split);
           console.log(sequences[index][j]);
          if(split === sequences[index][j]){
             check++;
          }
          console.log(check);


          j++;
        }
         console.log(check);
        if(check === c){
          correctAnswers++;
        }else singleSe.classList.add('false');
      }




      index++;
   }
}




function clearTest() {
  for (const item of document.querySelectorAll(".false")) {
    item.classList.remove("false");
  }
}

resetBtn.addEventListener("click", clearTest);

const sequences = document.querySelectorAll("[data-sequence]");
for (const sequence of sequences) {
  let count = 1;
  const sequenceHeaderText = sequence.querySelector(".sequence__text");
  const select = sequence.querySelector("select");
  const sequenceItems = sequence.querySelector(".sequence__items");
  const selectOptionsCount = select.options.length;

  select.addEventListener("change", (e) => {
    if (select.selectedIndex == 0) return;
    console.log(select.value);

    let div = document.createElement("div");
    div.classList.add("sequence__item");
    let index = select.selectedIndex;

    select.options[index].disabled = true;

    div.innerHTML = `
        <span> ${count++}  </span> - ${select.value}
      `;
    if (count >= selectOptionsCount) {
      sequenceHeaderText.innerHTML = `Вы выбрали все варианты`;
    } else sequenceHeaderText.innerHTML = `Выберете ${count} элемент`;

    sequenceItems.insertAdjacentElement("beforeend", div);
  });

  const resetSelect = sequence.querySelector("button");
  resetSelect.addEventListener("click", function (e) {
    for (const option of select.options) {
      option.disabled = false;
    }
    count = 1;
    sequenceHeaderText.innerHTML = `Выберете ${count} элемент`;
    sequenceItems.innerHTML = "";
  });
}
