class Student {
  constructor(lastName, firstName, age, score, certificate, certificateDate) {
    this.lastName = lastName;
    this.firstName = firstName;
    this.age = age;
    this.score = score;
    this.certificate = certificate;
    this.certificateDate = certificateDate;
  }
}

const students = [
  new Student("이", "민아", 23, 95, true, "2023/03/30"),
  new Student("김", "민수", 24, 98, true, "2023/03/27"),
  new Student("이", "강한", 32, 76, false, "2023/03/13"),
  new Student("박", "문대", 21, 79, true, "2023/03/10"),
  new Student("송", "민중", 26, 80, true, "2023/03/29"),
  new Student("조", "아현", 22, 55, false, "2023/02/12"),
  new Student("이", "용수", 21, 90, true, "2023/02/13"),
  new Student("김", "대웅", 23, 45, false, "2023/03/30"),
];

const schoolClass = document.querySelector(".school_class");

students.forEach((student) => {
  schoolClass.innerHTML += `
  <div class="student">
  이름: ${student.lastName} ${student.firstName} <br/>
  나이: ${student.age} <br/>256800
  시험점수: ${student.score} <br/>
  자격증: ${student.certificate ? "취득" : "미취득"} <br/>
  자격증취득일: ${student.certificateDate} <br/>
  </div>
  `;
});



// 1.학생들의 이름을 배열이 아닌 문자열로 나열 - forEach 반복문 (idx:배열의 순번)
const quiz01Class = document.querySelector(".quiz01");

students.forEach((student, idx) => {
  quiz01Class.innerHTML += `${student.lastName} ${student.firstName}`;
  if (idx < students.length - 1) {
    quiz01Class.innerHTML += ", ";
  }
})

// 2.가장 먼저 자격증을 취득한 학생 - sort 배열 정렬 split 문자열 자르기 join 합치기
students.sort((a, b) => {
  a = a.certificateDate.split("/").join();
  b = b.certificateDate.split("/").join();
  

  return a > b ? 1 : a < b ? -1 : 0; // 오름차순
});

const quiz02Class = document.querySelector(".quiz02");
quiz02Class.innerHTML += `${students[0].lastName} ${students[0].firstName}`;

// 3.학생들의 나이 평균 - map 새로운 배열 반환, reduce 실행 결과 누적 반환값 (acc:반환값을 누적 cur:배열의 현재요소)
const sumAges = students.map(student => student.age).reduce((acc, cur, idx) => {
  return acc += cur;
})

const quiz03Class = document.querySelector(".quiz03");
quiz03Class.innerHTML += `${sumAges / students.length}`;

// 4.학생들의 이름으로 새로운 배열 반환 - map 새로운 배열 반환
const studentsName = students.map((student) => {
  return `${student.lastName} ${student.firstName}`;
});

const quiz04Class = document.querySelector(".quiz04");
quiz04Class.innerHTML += `${studentsName.join(", ")}`;

// 5.시험점수가 80점 미만인 학생을 제외한 새로운 배열 - filter 조건에 맞는 요소만 반환 map 새로운 배열 반환
const highScoreStudents = students.filter((student) => {
  return student.score >= 80;
});

const highScoreStudentsName = highScoreStudents.map((student) => `${student.lastName} ${student.firstName}`);
const quiz05Class = document.querySelector(".quiz05");
quiz05Class.innerHTML += `${highScoreStudentsName.join(", ")}`;

// 6.시험점수가 100점인 학생이 있나요? 결과값만 반환(있다,없다) - some 리턴값 하나라도 true라면 true 반환 (리턴값 전체 true는 every 사용)
const perfectStudent = students.some((student) => {
  return student.score === 100;
});
console.log(perfectStudent);
const quiz06Class = document.querySelector(".quiz06");
quiz06Class.innerHTML += perfectStudent ? "있다" : "없다";  // (?) 삼항연산자:첫번째항이 true면 두번째항 실행, false면 세번째항 실행

// 7.목표점수라는 새로운 키와 값이 추가 된 배열 만들기. 목표점수는 90점 이상의 학생은 변동없음, 90점 미만의 학생은 +10점
// createElement - 요소 생성, setAttribute - 속성 값 설정, append - 객체 및 text 추가
const quiz07Class = document.querySelector(".quiz07");
const newElement = document.createElement("div");
newElement.setAttribute("class", "school_class");
quiz07Class.append(newElement);
const quiz07ClassInSchoolClass = document.querySelector(".quiz07 .school_class");

students.forEach((student) => {
  if (student.score >= 90) {
    student.goalScore = student.score;
  } else {
    student.goalScore = student.score + 10;
  }

  quiz07ClassInSchoolClass.innerHTML += `
  <div class="student">
  이름: ${student.lastName} ${student.firstName} <br/>
  나이: ${student.age} <br/>
  시험점수: ${student.score} <br/>
  목표점수: ${student.goalScore} <br/>
  자격증: ${student.certificate ? "취득" : "미취득"} <br/>
  자격증취득일: ${student.certificateDate} <br/>
  </div>
  `;
});

// 8.자격증을 취득한 학생은 총 몇명인가요? - filter 조건에 맞는 요소만 반환
const certificateCount = students.filter(student => student.certificate).length;
const quiz08Class = document.querySelector(".quiz08");
quiz08Class.innerHTML += `${certificateCount}명`;

// 9.시험점수 50점 미만은 과락이라고 할 때, 과락한 학생이 있는지 확인
const failStudents = students.filter(student => student.score < 50).length;

const quiz09Class = document.querySelector(".quiz09");
quiz09Class.innerHTML += failStudents.length > 0 ? "있다" : "없다";

// 10.시험점수만으로 이루어진 배열 반환, 단 내림차순으로 반환한다
const scores = students.map(student => student.score);
scores.sort((a, b) => b - a);

const quiz10Class = document.querySelector(".quiz10");
quiz10Class.innerHTML += `${scores.join(", ")}`;

// 11.나이를 오름차순으로 반환한 후 마지막 3인을 배열로 반환한다. - slice 배열에서 원하는 데이터 추출
const ages = students.map(student => student.age);
ages.sort((a, b) => a - b);
const lastThree = ages.slice(ages.length - 3);

const quiz11Class = document.querySelector(".quiz11");
quiz11Class.innerHTML += `${lastThree.join(", ")}`;
