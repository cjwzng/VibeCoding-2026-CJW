// =====================================================
// main.js : 메인 페이지 전용 기능 (메인 배너)
// - 메인 배너 이미지(.main-visual-img)가 있는 페이지에서만 동작
// - common.js 다음에 불러온다. (변수명은 common.js 와 겹치지 않게!)
// =====================================================

// 요구사항
// -> 상단 배너 클릭시
// 상단 메뉴 배경색을 변경하고
// 상단 메뉴는 360도 회전함
// 트랜지션으로 애니메이션 2초간 되게함

// 대상선정:
// 1. 이벤트 대상 : 상단배너 (.main-visual-img)
let 너를클릭해 = document.querySelector('.main-visual-img');
// 2. 변경대상 : 상단영역(.top-area)
let 나야나 = document.querySelector('.top-area');

// 페이지 전용 요소가 없으면 아래 코드는 실행하지 않는다!
// (없는 요소에 .onclick 을 넣으면 오류가 나기 때문)
if (너를클릭해 && 나야나) {
  console.log('나는 누구인가?', 나야나);

  // const 는 상수 또는 함수를 담는 변수선언
  const 나야나함수 = (색상) => {
    console.log('함수호출! 전달값은?', 색상);
    // 상단요소의 배경색 바꾸기
    나야나.style.backgroundColor = 색상;
    나야나.style.transition = '2s ease-in-out';
    // 회전은 로고가 하도록 변경
    const 로고 = 나야나.querySelector('.logo-box');
    if (로고) {
      로고.style.rotate = '360deg';
      // 로고 트랜지션 : 2초후 1초간 ease-in-out
      로고.style.transition = '1s ease-in-out 2s';
    }
  }; ///////// 나야나함수 /////////

  // 3. 이벤트 설정하기 : 클릭이벤트
  너를클릭해.onclick = () => {
    // 해당요소에 클릭이벤트가 발생하면 이 구역을 실행함
    나야나함수('orange');
  }; ///// onclik 함수 ///////
} ///////// if /////////
