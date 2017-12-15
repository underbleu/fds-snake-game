import { ROWS, COLS } from './config';

function SnakeGameLogic() {
  // 각 마디의 좌표를 저장하는 배열
  this.joints = [{ x: 0, y: 0 }, { x: 1, y: 0 }];
  this.direction = 'right';
  // 먹이의 좌표
  this.fruit = { x: 5, y: 10 };
}

SnakeGameLogic.prototype.up = function up() {
  // 위쪽 화살표 키를 누르면 실행되는 함수
  this.direction = 'up';
  console.log('up');

}
SnakeGameLogic.prototype.down = function down() {
  // 아래쪽 화살표 키를 누르면 실행되는 함수
  this.direction = 'down';
  console.log('down');
}

SnakeGameLogic.prototype.left = function left() {
  // 왼쪽 화살표 키를 누르면 실행되는 함수
  this.direction = 'left';
  console.log('left');
};
SnakeGameLogic.prototype.right = function right() {
  // 오른쪽 화살표 키를 누르면 실행되는 함수
  this.direction = 'right';
  console.log('right');
};

SnakeGameLogic.prototype.nextState = function nextState() {
  this.joints.unshift(this.joints.pop());
  // nextState가 실행될때마다 새로 생기는 지역변수 -> let 대신 const
  // const로 선언한 변수는 재할당이 안될뿐, 할당된 객체의 프로퍼티는 변경가능하다
  const tail = { x: this.joints[this.joints.length - 1].x, y: this.joints[this.joints.length - 1].y };
  console.log(`바뀌기전: ${tail.x}, ${tail.y}`)
    // const tailX = this.joints[this.joints.length - 1].x;
    // const tailY = this.joints[this.joints.length - 1].y;
    // console.log(`바뀌기전: ${tailX}, ${tailY}`)

  // 키보드 방향키
  switch (this.direction) {
    case 'up':
      this.joints[0].x = this.joints[1].x;
      this.joints[0].y = this.joints[1].y - 1;
      console.log(this.joints);
      break;

    case 'down':
      this.joints[0].x = this.joints[1].x;
      this.joints[0].y = this.joints[1].y + 1;
      console.log(this.joints);
      break;

    case 'left':
      this.joints[0].x = this.joints[1].x - 1;
      this.joints[0].y = this.joints[1].y;
      console.log(this.joints);
      break;

    case 'right':
      this.joints[0].x = this.joints[1].x + 1;
      this.joints[0].y = this.joints[1].y;
      console.log(this.joints);
      break;
  }
  console.log(`바뀐후: ${tail.x}, ${tail.y}`)
    // 먹이를 먹었을 때
  const head = { x: this.joints[0].x, y: this.joints[0].y };

  if (head.x === this.fruit.x && head.y === this.fruit.y) {
    this.fruit = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
    this.joints.push(tail);
  }

  // 한 번 움직여야 할 타이밍마다 실행되는 함수
  // 게임이 아직 끝나지 않았으면 `true`를 반환
  // 게임이 끝났으면 `false`를 반환
  console.log(`nextState`);
  return true;
};

export default SnakeGameLogic;