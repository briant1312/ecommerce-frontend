<script setup>
</script>

<template>
  <img class="hero" src="../assets/images/hero.avif" alt="wall of clothing store">
  <main>
    <div class="section-container">
      <p>Be Creative</p>
      <div class="image-container">
        <img class="section-image" src="../assets/images/woman-in-sweater.avif" alt="">
      </div>
    </div>
    <div class="section-container">
      <div class="image-container">
        <img class="section-image" src="../assets/images/shirts.avif" alt="">
      </div>
      <p>Be Unique</p>
    </div>
    <div class="section-container">
      <p>Be Adventurous</p>
      <div class="image-container">
        <img class="section-image" src="../assets/images/man-in-hoodie.avif" alt="">
      </div>
    </div>
  </main>
</template>

<style>
.hero {
  width: 100%;
  aspect-ratio: 4/2;
  margin-bottom: 4rem;
}

.section-container {
  display: grid;
  grid-template-columns: 50% 50%;
  margin-bottom: 4rem;
}

p {
  font-size: 3.2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-self: center;
}

.image-container {
  background-color: black;
}

.section-image {
  display: block;
  margin-inline: auto;
}

</style>
