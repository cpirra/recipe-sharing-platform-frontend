<script setup>

</script>

<template>
  <main>
    <div class="home">
    <!-- <TheWelcome /> -->
    <!-- Emits Component
    <Emits :value="value" @customEvent="handleCustomEvent" /> -->
    <h1>This is root component</h1>
    </div>
  </main>
</template>

<style>
@media (min-width: 1024px) {
  .home{
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
