<script lang="ts" setup>
import { computed, ref } from 'vue';
import { getHighlighter } from 'shiki';

const highlighter = await getHighlighter({
  themes: ['one-dark-pro'],
  langs: ['typescript'],
});

highlighter.loadTheme('one-dark-pro');
highlighter.loadLanguage('typescript');

const fullCode = `const me = new Person('1Step621');
me.age = 16;
me.location = 'Japan';
me.organization = 'National Institute of Technology, Tokyo College';
me.skills = ['TypeScript', 'Vue.js', 'Flutter', 'Rust'];
me.interests = ['Coding', 'Designing', 'Listening to music (VOCALOID)'];

me.showWebsite();`;
const code = ref('');
const highlightedCode = computed(() => highlighter.codeToHtml(code.value, { lang: 'typescript', theme: 'one-dark-pro' }));

let i = 0;
setInterval(() => {
  code.value += fullCode[i] || '';
  i++;
}, 20);
</script>

<template>
  <pre :class="$style.code" v-html="highlightedCode" />
</template>

<style module>
.code {
  font-family: 'Roboto Mono';
}

.code>pre {
  background-color: transparent !important;
}

.code span {
  text-shadow: currentColor 0 0 5px;
}
</style>
