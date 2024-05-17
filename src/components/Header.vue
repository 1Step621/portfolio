<template>
  <header>
    <div :class="$style.content">
      <RouterLink to="/" :class="$style.left">
        <img :class="$style.icon" src="../assets/icon.svg" alt="icon" />
        <span :class="$style.title">1Step621</span>
      </RouterLink>
      <nav :class="$style.right">
        <RouterLink to="/" :exact-active-class="$style.current">Home</RouterLink>
        <RouterLink to="/works" :exact-active-class="$style.current">Works</RouterLink>
      </nav>
    </div>
  </header>
</template>

<style module>
header {
  background-color: var(--c-panel);
  display: flex;
  justify-content: center;
}

.content {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px 30px;
  width: min(100%, var(--main-width));
}

.left {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: var(--c-text);
  font-weight: 400;

  &:hover {
    .icon {
      transform: rotate(360deg);
    }
  }
}

.icon {
  width: 30px;
  height: 30px;
  transform: rotate(0deg);
  transition: transform 0.3s;
}

.title {
  font-size: var(--h4-size);
  font-weight: bold;
}

.right {
  display: flex;
  gap: 20px;
}

.right * {
  text-decoration: none;
  color: var(--c-text);
  font-weight: 400;
  transition: color 0.3s;
}

.current {
  color: var(--c-primary);
}
</style>
