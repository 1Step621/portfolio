<script lang="ts" setup>
import { ref, computed, watch } from 'vue';
import hokora from './hokora.svg';
import flag from './flag.svg';
import { useHead } from '@unhead/vue';
import Button from '@/components/utilities/Button.vue';
import JSConfetti from 'js-confetti';
import hokoranime0 from './hokoranime/hokoranime0.svg';
import hokoranime1 from './hokoranime/hokoranime1.svg';
import hokoranime2 from './hokoranime/hokoranime2.svg';
import hokoranime3 from './hokoranime/hokoranime3.svg';
import hokoranime4 from './hokoranime/hokoranime4.svg';
import hokoranime5 from './hokoranime/hokoranime5.svg';
import hokoranime6 from './hokoranime/hokoranime6.svg';
import hokoranime7 from './hokoranime/hokoranime7.svg';
import hokoranime8 from './hokoranime/hokoranime8.svg';

const hokoranimeFrames = [
  hokoranime0,
  hokoranime1,
  hokoranime2,
  hokoranime3,
  hokoranime4,
  hokoranime5,
  hokoranime6,
  hokoranime7,
  hokoranime8,
];
const frame = ref(0);
const hokoranime = computed(() => hokoranimeFrames[frame.value]);
setInterval(() => {
  frame.value = (frame.value + 1) % hokoranimeFrames.length;
}, 100);

useHead({
  title: '祠スイーパー | 1Step621',
});

const confetti = new JSConfetti()

const width = 8;
const height = 8;
const hokoraCount = 10

const initGrid = (width: number, height: number, hokoraCount: number) => {
  let grid = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => ({
      isOpened: false,
      isHokora: false,
      isMarked: false,
    }))
  );

  for (let i = 0; i < hokoraCount; i++) {
    let x, y;
    do {
      x = Math.floor(Math.random() * width);
      y = Math.floor(Math.random() * height);
    } while (grid[y][x].isHokora);
    grid[y][x].isHokora = true;
  }

  return grid;
}

type Cell = {
  isOpened: boolean
  isHokora: boolean
  isMarked: boolean
}
const grid = ref<Cell[][]>(initGrid(width, height, hokoraCount));

const gameOver = ref(false);
const gameClear = ref(false);

const startTime = ref(Date.now());
const nowTime = ref(Date.now());
const interval = ref(setInterval(() => {
  nowTime.value = Date.now();
}, 30));
const stopWatch = computed(() => {
  return Math.floor((nowTime.value - startTime.value) / 1000);
});

const flagMode = ref(false);

const onClick = (x: number, y: number) => {
  if (flagMode.value) {
    onAuxClick(x, y);
    return;
  }

  const cell = grid.value[y]?.[x];
  if (!cell) return;
  if (cell.isOpened) return;
  if (cell.isMarked) return;

  cell.isOpened = true;

  if (cell.isHokora) {
    grid.value = grid.value.map(row =>
      row.map(cell => {
        if (cell.isHokora) {
          setTimeout(() => {
            cell.isOpened = true;
          }, Math.random() * 1000);
        }
        return cell;
      })
    );
    gameOver.value = true;
    return;
  }

  if (!cell.isHokora && countNeighborHokoras(x, y) == 0) {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        onClick(x + j, y + i);
      }
    }
  }

  if (grid.value.every(row => row.every(cell => cell.isOpened || cell.isHokora))) {
    gameClear.value = true;
  }
}

const onAuxClick = (x: number, y: number) => {
  const cell = grid.value[y]?.[x];
  if (!cell) return;
  if (cell.isOpened) return;

  cell.isMarked = !cell.isMarked;
}

watch(() => gameOver.value, (v) => {
  if (!v) return;
  clearInterval(interval.value);
});

watch(() => gameClear.value, (v) => {
  if (!v) return;
  confetti.addConfetti();
  clearInterval(interval.value);
})

const retry = () => {
  grid.value = initGrid(width, height, hokoraCount);
  startTime.value = Date.now();
  clearInterval(interval.value);
  interval.value = setInterval(() => {
    nowTime.value = Date.now();
  }, 30);
}

const forceClear = () => {
  const safeCells = grid.value.flatMap((row, y) =>
    row.flatMap((cell, x) => {
      if (cell.isHokora) return [];
      return { x: x, y: y };
    })
  );
  for (const cell of safeCells) {
    onClick(cell.x, cell.y);
  }
}

const countNeighborHokoras = (x: number, y: number) => {
  let count = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;
      if (grid.value[y + i]?.[x + j]?.isHokora) count++;
    }
  }
  return count;
}
</script>

<template>
  <div :class="$style.all">
    <h1>祠スイーパー</h1>
    <p>
      クリック(タップ)で掘り返す / 右クリックで旗を立てる<br>
      <a href="https://x.com/orangegnaro1106/status/1844640393528578107">
        https://x.com/orangegnaro1106/status/1844640393528578107
      </a>
    </p>
    <span>経過時間: {{ stopWatch }}秒</span>
    <Button :class="{ [$style.flagMode]: true, [$style.enabled]: flagMode }" @click="flagMode = !flagMode">
      <img :src="flag">旗モード
    </Button>
    <div :class="$style.main">
      <div :class="$style.grid">
        <div :class="$style.row" v-for="(row, y) in grid">
          <Button :class="{ [$style.cell]: true, [$style.opened]: cell.isOpened }" v-for="(cell, x) in row"
            @click="onClick(x, y)" @auxclick="onAuxClick(x, y)" @contextmenu="(e: Event) => e.preventDefault()"
            :disabled="cell.isOpened">
            <img :src="hokora" v-if="cell.isOpened && cell.isHokora" :class="$style.hokora" />
            <img :src="flag" v-if="!cell.isOpened && cell.isMarked" :class="$style.flag" />
            <span v-if="cell.isOpened && !cell.isHokora">{{ countNeighborHokoras(x, y) || "" }}</span>
          </Button>
        </div>
      </div>
    </div>
    <Button :class="$style.retry" @click="retry()">リセット</Button>
    <!-- <Button :class="$style.forceClear" @click="forceClear()">デバッグ用</Button> -->
  </div>
  <Transition appear>
    <div :class="$style.message" v-if="gameOver">
      <img :src="hokoranime" :height="170" />
      <h1>祠をぶっ壊したので呪われてしまった...</h1>
      <Button :class="$style.retry" @click="gameOver = false; retry();">リトライ</Button>
    </div>
  </Transition>
  <Transition appear>
    <div :class="$style.message" v-if="gameClear">
      <h1>Game Clear!</h1>
      <p>クリアタイム: {{ stopWatch }}秒</p>
      <Button :class="$style.retry" @click="gameClear = false; retry();">もう一回やる</Button>
    </div>
  </Transition>
</template>

<style module>
.all {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 120vh;
  width: 100vw;
  padding: 0 10px;
  gap: 20px;
}

.all p {
  max-width: 100%;
  word-break: break-all;
  line-break: anywhere;
}

.main {
  display: flex;
  max-width: 100%;
  overflow: auto;
}

.grid {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.row {
  display: flex;
  flex-direction: row;
  gap: 5px;
}

.cell {
  width: clamp(40px, 10vw, 50px);
  height: clamp(40px, 10vw, 50px);
  border-radius: 5px;
}

.cell:not(.opened) {
  background-color: #272727;
}

.cell:not(.opened):hover {
  background-color: #3a3a3a;
}

.cell.opened {
  border: solid 2px var(--c-divider);
}

.cell span {
  font-size: 24px;
  font-weight: bold;
  user-select: none;
}

.cell .hokora {
  width: 90%;
  height: 90%;
}

.cell .flag {
  width: 60%;
  height: 60%;
}

.flagMode {
  display: flex;
  gap: 10px;
  padding: 0 15px;
  height: 40px;
}

.flagMode img {
  width: 15px;
}

.flagMode.enabled {
  background-color: var(--c-divider);
  color: var(--c-text);
  outline: solid 2px var(--c-primary);
}

.message {
  display: flex;
  flex-direction: column;
  position: fixed;
  gap: 10px;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  padding: 0 40px;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.retry {
  height: 40px;
  padding: 0 15px;
}

.forceClear {
  height: 40px;
  padding: 0 15px;
}
</style>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s;
}

.v-enter-active {
  transition-delay: 1s;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
