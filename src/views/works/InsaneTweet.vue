<script setup lang="ts">
import { useHead } from '@unhead/vue';
import { computed, ref } from 'vue';
import KeyValue from '@/components/utilities/KeyValue.vue';
import Checkboxes from '@/components/utilities/Checkboxes.vue';

useHead({
  title: '奇声ツイートジェネレータ | 1Step621',
});

const vowels = ["ア", "イ", "ウ", "エ", "オ"] as const;
type Vowel = typeof vowels[number];

const settings = ref({
  mainKatakana: 'ゴ',
  subKatakanas: 'ガ',
  vowelTendency: ['オ'] as Vowel[],
  mixWord: '',
  katakanaType: ['zenkaku'] as ('hankaku' | 'zenkaku')[],
  dakuten: randBetween(0, 1),
  handakuten: randBetween(0, 1),
  doubleConsonant: randBetween(0, 0.2),
  longVowel: randBetween(0, 0.2),
  symbolVariants: ['！', '❗', '‼️'] as ('！' | '!' | '❗' | '？' | '?' | '❓' | '⁉️' | '‼️')[],
  symbol: randBetween(0, 0.2),
  partLength: randBetweenInt(2, 10),
  vowelTransition: randBetween(0, 1),
  consonantTransition: randBetween(0, 1),
  spaceVariants: ['　'] as (' ' | '　' | '、')[],
  space: randBetween(0, 1),
});

const result = computed(() => {
  try {
    let res = "";
    let pattern =
      shuffleArray([
        ...Array(randBetweenInt(1, 5)).fill(null).map(() => chooseRandom(settings.value.mainKatakana.split(''))),
        ...Array(randBetweenInt(1, 5)).fill(null).map(() => {
          let vowel = chooseRandom(settings.value.vowelTendency);
          return randBetweenInt(0, 1) == 0 ? vowel : toSmall(vowel);
        })
      ]).join('');
    for (let j = 0; j < settings.value.partLength; j++) {
      pattern = pattern.split('').map((char) => {
        switch (getType(char)) {
          case 'consonant':
            if (Math.random() < settings.value.consonantTransition) {
              return chooseRandom([settings.value.mainKatakana, ...settings.value.subKatakanas.split("")]);
            }
            break;
          case 'vowel':
            if (Math.random() < settings.value.vowelTransition) {
              return chooseRandom(settings.value.vowelTendency);
            }
            break;
        }
        return char;
      }).join('');
      res += pattern;
      res += chooseRandom(settings.value.spaceVariants).repeat(randBetweenInt(0, Math.floor(settings.value.space * 5)));
    }
    res = res.trim();

    res = res.split("").map(c => {
      if ((settings.value.spaceVariants as string[]).includes(c)) return c;

      let tmp = c;
      let operations = [
        () => tmp += "ー".repeat(randBetweenInt(0, settings.value.longVowel * 5)),
        () => { if (settings.value.mixWord !== '') tmp += settings.value.mixWord[randBetweenInt(0, settings.value.mixWord.length - 1)] },
        () => tmp += "゛".repeat(randBetweenInt(0, settings.value.dakuten * 5)),
        () => tmp += "゜".repeat(randBetweenInt(0, settings.value.handakuten * 5)),
        () => tmp += "ッ".repeat(randBetweenInt(0, settings.value.doubleConsonant * 5)),
        () => tmp += Array(randBetweenInt(0, settings.value.symbol * 5)).fill(null).map(() => chooseRandom(settings.value.symbolVariants)).join(""),
      ];
      operations = shuffleArray(operations);
      operations.map((f) => f());
      return tmp;
    }).join("");

    res = res.split("").map(c => {
      if (chooseRandom(settings.value.katakanaType) === 'hankaku') {
        return toHankakuKatakana(c);
      } else {
        return c;
      }
    }).join("");

    return res;
  } catch (e) {
    // 握りつぶす...。
    return e;
  }
});

function toHankakuKatakana(str: string) {
  // https://qiita.com/spm84/items/4ea8c53ac3aafcd4d66c#comment-d2ad84e4ff5303f1ce87
  const kanaMap: Record<string, string> = {
    'ガ': 'ｶﾞ', 'ギ': 'ｷﾞ', 'グ': 'ｸﾞ', 'ゲ': 'ｹﾞ', 'ゴ': 'ｺﾞ',
    'ザ': 'ｻﾞ', 'ジ': 'ｼﾞ', 'ズ': 'ｽﾞ', 'ゼ': 'ｾﾞ', 'ゾ': 'ｿﾞ',
    'ダ': 'ﾀﾞ', 'ヂ': 'ﾁﾞ', 'ヅ': 'ﾂﾞ', 'デ': 'ﾃﾞ', 'ド': 'ﾄﾞ',
    'バ': 'ﾊﾞ', 'ビ': 'ﾋﾞ', 'ブ': 'ﾌﾞ', 'ベ': 'ﾍﾞ', 'ボ': 'ﾎﾞ',
    'パ': 'ﾊﾟ', 'ピ': 'ﾋﾟ', 'プ': 'ﾌﾟ', 'ペ': 'ﾍﾟ', 'ポ': 'ﾎﾟ',
    'ヴ': 'ｳﾞ', 'ヷ': 'ﾜﾞ', 'ヺ': 'ｦﾞ',
    'ア': 'ｱ', 'イ': 'ｲ', 'ウ': 'ｳ', 'エ': 'ｴ', 'オ': 'ｵ',
    'カ': 'ｶ', 'キ': 'ｷ', 'ク': 'ｸ', 'ケ': 'ｹ', 'コ': 'ｺ',
    'サ': 'ｻ', 'シ': 'ｼ', 'ス': 'ｽ', 'セ': 'ｾ', 'ソ': 'ｿ',
    'タ': 'ﾀ', 'チ': 'ﾁ', 'ツ': 'ﾂ', 'テ': 'ﾃ', 'ト': 'ﾄ',
    'ナ': 'ﾅ', 'ニ': 'ﾆ', 'ヌ': 'ﾇ', 'ネ': 'ﾈ', 'ノ': 'ﾉ',
    'ハ': 'ﾊ', 'ヒ': 'ﾋ', 'フ': 'ﾌ', 'ヘ': 'ﾍ', 'ホ': 'ﾎ',
    'マ': 'ﾏ', 'ミ': 'ﾐ', 'ム': 'ﾑ', 'メ': 'ﾒ', 'モ': 'ﾓ',
    'ヤ': 'ﾔ', 'ユ': 'ﾕ', 'ヨ': 'ﾖ',
    'ラ': 'ﾗ', 'リ': 'ﾘ', 'ル': 'ﾙ', 'レ': 'ﾚ', 'ロ': 'ﾛ',
    'ワ': 'ﾜ', 'ヲ': 'ｦ', 'ン': 'ﾝ',
    'ァ': 'ｧ', 'ィ': 'ｨ', 'ゥ': 'ｩ', 'ェ': 'ｪ', 'ォ': 'ｫ',
    'ッ': 'ｯ', 'ャ': 'ｬ', 'ュ': 'ｭ', 'ョ': 'ｮ',
    '。': '｡', '、': '､', 'ー': 'ｰ', '「': '｢', '」': '｣', '・': '･',
    '　': ' ',
    '゛': 'ﾞ', '゜': 'ﾟ',
  };
  return str.replace(/./g, m => kanaMap[m] ?? m);
}

function toSmall(str: string) {
  return str
    .replace(/ア/g, "ァ")
    .replace(/イ/g, "ィ")
    .replace(/ウ/g, "ゥ")
    .replace(/エ/g, "ェ")
    .replace(/オ/g, "ォ")
    .replace(/ｱ/g, "ｧ")
    .replace(/ｲ/g, "ｨ")
    .replace(/ｳ/g, "ｩ")
    .replace(/ｴ/g, "ｪ")
    .replace(/ｵ/g, "ｫ");
}

function getType(char: string): 'consonant' | 'vowel' | 'symbol' {
  if (char.match(/[アイウエオァィゥェォｱｲｳｴｵｧｨｩｪｫ]/)) return 'vowel';
  if (char.match(/[！？!?❗❓⁉️‼️]/)) return 'symbol';
  return 'consonant';
}

// rand utils

function randBetweenInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function chooseRandom<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffleArray<T>(arr: T[]) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
</script>

<template>
  <div class="main">
    <h1>奇声ツイートジェネレータ</h1>
    <p>突然叫びたくなったもののそういうわけにもいかず、せめてツイートしようと思ったものの「だくてん」「はんだくてん」でたくさん変換するのが面倒になってしまったときに使えます。</p>
  </div>
  <div :class="$style.all">
    <div :class="$style.result">
      {{ result }}
    </div>
    <div :class="$style.controls">
      <KeyValue label="メインのカタカナ1字">
        <input type="text" min="0" v-model="settings.mainKatakana" minlength="1" maxlength="1" pattern="[ァ-ヴ]" />
      </KeyValue>
      <KeyValue label="サブのカタカナ(5字)">
        <input type="text" min="0" v-model="settings.subKatakanas" minlength="1" maxlength="5" pattern="[ァ-ヴ]" />
      </KeyValue>
      <KeyValue label="母音の傾向">
        <Checkboxes :checkboxes="[
          { label: 'ア' },
          { label: 'イ' },
          { label: 'ウ' },
          { label: 'エ' },
          { label: 'オ' },
        ]" required v-model="settings.vowelTendency" />
      </KeyValue>
      <KeyValue label="混ぜる単語">
        <input type="text" v-model="settings.mixWord" />
      </KeyValue>
      <KeyValue label="全角カタカナ/半角ｶﾀｶﾅ">
        <Checkboxes :checkboxes="[
          { label: '全角カタカナ', id: 'zenkaku' },
          { label: '半角ｶﾀｶﾅ', id: 'hankaku' },
        ]" required v-model="settings.katakanaType" />
      </KeyValue>
      <KeyValue label="濁点の量">
        <input type="range" min="0" max="1" step="0.01" v-model.number="settings.dakuten" />
      </KeyValue>
      <KeyValue label="半濁点の量">
        <input type="range" min="0" max="1" step="0.01" v-model.number="settings.handakuten" />
      </KeyValue>
      <KeyValue label="促音(ッ)の量">
        <input type="range" min="0" max="1" step="0.01" v-model.number="settings.doubleConsonant" />
      </KeyValue>
      <KeyValue label="長音(ー)の量">
        <input type="range" min="0" max="1" step="0.01" v-model.number="settings.longVowel" />
      </KeyValue>
      <KeyValue label="記号種別">
        <Checkboxes :checkboxes="[
          { label: '！(全角)', id: '！' },
          { label: '!(半角)', id: '!' },
          { label: '❗(絵文字)', id: '❗' },
          { label: '？(全角)', id: '？' },
          { label: '?(半角)', id: '?' },
          { label: '❓(絵文字)', id: '❓' },
          { label: '⁉️(絵文字)', id: '⁉️' },
          { label: '‼️(絵文字)', id: '‼️' },
        ]" required v-model="settings.symbolVariants" />
      </KeyValue>
      <KeyValue label="記号の量">
        <input type="range" min="0" max="1" step="0.01" v-model.number="settings.symbol" />
      </KeyValue>
      <KeyValue label="1パターンで持続させる長さ">
        <input type="range" min="2" max="10" v-model.number="settings.partLength" />
      </KeyValue>
      <KeyValue label="母音の変化">
        <input type="range" min="0" max="1" step="0.01" v-model.number="settings.vowelTransition" />
      </KeyValue>
      <KeyValue label="子音の変化">
        <input type="range" min="0" max="1" step="0.01" v-model.number="settings.consonantTransition" />
      </KeyValue>
      <KeyValue label="スペース種別">
        <Checkboxes :checkboxes="[
          { label: '半角スペース', id: ' ' },
          { label: '全角スペース', id: '　' },
          { label: '、(読点)', id: '、' },
        ]" required v-model="settings.spaceVariants" />
      </KeyValue>
      <KeyValue label="スペースの量">
        <input type="range" min="0" max="1" step="0.01" v-model.number="settings.space" />
      </KeyValue>
      <a :class="$style.tweet" :href="`https://x.com/intent/post?text=${result}`" target="_blank"
        rel="noopener noreferrer">ツイートする</a>
    </div>
  </div>
</template>

<style module>
.all {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  width: 1000px;
  height: 80vh;
  margin-bottom: 50px;
}

.result {
  display: flex;
  font-size: var(--h1-size);
  font-weight: bold;
  justify-content: center;
  align-items: center;
  border: solid 1px var(--c-primary);
  border-radius: 5px;
  padding: 10px;
  overflow: auto;
  word-wrap: break-word;
}

.controls {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: auto;
}

.tweet {
  margin-top: 20px;
  display: block;
  background-color: #1a8cd8;
  color: white;
  text-align: center;
  border-radius: 5px;
  padding: 10px;
}

@media screen and (max-width: 1000px) {
  .all {
    width: 90%;
    height: 180vh;
    grid-template-columns: 1fr;
  }
}

input {
  width: 100%;
}
</style>
