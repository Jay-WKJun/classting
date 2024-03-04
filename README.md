# Quiz! (with Classting)

간단한 퀴즈를 진행할 수 있는 App입니다! 🤩

Url -> 

# 🎉 How to start

```shell
$ git clone https://github.com/Jay-WKJun/classting

$ cd classting

// pnpm이 이미 있다면 생략가능
$ npm install -g pnpm

$ pnpm i

$ pnpm dev

-> http://localhost:3000/ 에 접속
```

## 📕 Storybook

```shell
$ pnpm storybook

-> http://localhost:6006/ 에 접속
```

# 📋 Task requirements

[x] 사용자는 '퀴즈 풀기' 버튼을 클릭하여 퀴즈 풀기를 시작할 수 있다.
[x] 사용자는 문항에 대한 답안을 4개 보기 중에 선택할 수 있다.
[x] 사용자는 답안을 선택하면 다음 문항을 볼 수 있다.
  [x] 답안 선택 후 다음 문항 버튼을 볼 수 있다.
  [x] 답안이 맞았는지 틀렸는지 바로 알 수 있다.
  [x] 다음 문항 버튼을 클릭하여 다음 문항으로 이동할 수 있다.
[x] 모든 문항을 다 풀면 사용자는 다음과 같은 결과 정보를 볼 수 있다.
  [x] 퀴즈를 마칠 때까지 소요된 시간
  [x] 정답 개수
  [x] 오답 수
  [x] 정 오답에 대한 비율을 차트로 표기
[x] 오답 노트 기능

# 테스트 선정 이유

## Component test

/Components/*에 있는 컴포넌트들을 storybook으로 단위 테스트를 진행했습니다.

/Components 하위 컴포넌트들은 모두 외부의 환경에 관계 없이 독립적으로 사용할 수 있는 컴포넌트들입니다.

따라서, 어떤 prop을 설정하느냐에 따라 구현이 달라지기 때문에, 각각의 컴포넌트들이 어떻게 동작하는지에 대한 테스트를 진행했습니다.

## Unit test

모든 util 함수 및 quiz 생성 및 진행에 대한 비즈니스 로직에 테스트를 추가했습니다.

### 비즈니스 로직 테스트

**quiz 생성 및 진행은 복잡한 객체를 다루기 때문에**, 테스트코드로 로직들이 의도한 대로 작동하는지 확인했습니다.

quiz를 받아 사용자의 상태로 받을 수 있는 QuizModel로 잘 변환되었는지,

사용자 선택에 따른 QuizModel이 잘 변경되었는지,

확신할 수 있도록 테스트를 추가했습니다.
