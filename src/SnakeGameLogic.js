import { ROWS, COLS } from './config';

function SnakeGameLogic() {
  // 각 마디의 좌표를 저장하는 배열
  this.joints = [
    { x: 2, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: 0 },
  ];

  // 먹이의 좌표
  this.fruit = { x: 3, y: 5 };

  this.direction = 'right';
}

SnakeGameLogic.prototype.up = function () {
  // 위쪽 화살표 키를 누르면 실행되는 함수
  console.log('up');
  this.direction = 'up';
}

SnakeGameLogic.prototype.down = function () {
  // 아래쪽 화살표 키를 누르면 실행되는 함수
  console.log('down');
  this.direction = 'down';
}

SnakeGameLogic.prototype.left = function () {
  // 왼쪽 화살표 키를 누르면 실행되는 함수
  console.log('left');
  this.direction = 'left';
}

SnakeGameLogic.prototype.right = function () {
  // 오른쪽 화살표 키를 누르면 실행되는 함수
  console.log('right');
  this.direction = 'right';
}

SnakeGameLogic.prototype.nextState = function () {
  // 한 번 움직여야 할 타이밍마다 실행되는 함수
  // 게임이 아직 끝나지 않았으면 `true`를 반환
  // 게임이 끝났으면 `false`를 반환
  console.log(`nextState`);

  let newHead;

  // 방향키 이동 설정
  if (this.direction === 'up') {
    newHead = {
      x: this.joints[0].x,
      y: this.joints[0].y - 1
    };
  } else if (this.direction === 'down') {
    newHead = {
      x: this.joints[0].x,
      y: this.joints[0].y + 1
    };
  } else if (this.direction === 'left') {
    newHead = {
      x: this.joints[0].x - 1,
      y: this.joints[0].y
    };
  } else if (this.direction === 'right') {
    newHead = {
      x: this.joints[0].x + 1,
      y: this.joints[0].y
    };
  }

  // 게임 종료해야하는 경우
  if (
    // 1. 벽에 부딪힘
    newHead.x < 0 ||
    newHead.x >= COLS ||
    newHead.y < 0 ||
    newHead.y >= ROWS ||
    // 2. 자기몸에 부딪힘
    this.joints.some(j => j.x === newHead.x && j.y === newHead.y)
  ) {
    return false;
  }

  // 먹이를 먹었을 경우
  // 게임종료해야하는 경우코드보다 위에 있으면, 과일이 벽옆에 생성됬을 때 자동종료될 에러가 생길 수 있다.
  if (newHead.x === this.fruit.x && newHead.y === this.fruit.y) {
    do {
      // 일단 먹이 뿌려준다
      this.fruit.x = Math.floor(Math.random() * COLS);
      this.fruit.y = Math.floor(Math.random() * ROWS);
    } while (
      // 뱀의 몸체에 먹이가 뿌려지는 경우가 없을 때 까지
      this.joints.some(j => j.x === this.fruit.x && j.y === this.fruit.y) ||
      // 코드 가독성을 위해 먼저 실행할코드 ()로 묶어주기. (안묶어줘도 상관없음 : 연산자 우선순위 "&& > ||")
      (newHead.x === this.fruit.x && newHead.y === this.fruit.y)
    )
  } else {
    this.joints.pop();
  }

  this.joints.unshift(newHead);
  return true;
}

export default SnakeGameLogic;
