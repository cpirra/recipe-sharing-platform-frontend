<script>
</script>
<template>
    <footer class="p-10 bg-[#f8fafc] text-black flex justify-around text-center flex-wrap">
        <div class="footermain ">
          <img src="../assets/images/logo.png" alt="">
          <h3>Contact us</h3>
          <div class="socials flex justify-around text-center">
            <img src="../assets/images/facebookLogo.png" alt="">
            <img src="../assets/images/instagramLogo.png" alt="">
            <img src="../assets/images/twitterLogo.png" alt="">
          </div>
          <div class="search p-10">
            <input class="footer-input" type="text" placeholder="Search..">
            <button class="footer-button">Search</button>
          </div>
        </div>
        <div class="recipes p-10">
          <h3 class="footer-links"><b><a href="">Meals</a></b></h3>
          <h3 class="p-4"><b><a href="">Cuisines</a></b></h3>
          <h3 class="p-4"><b><a href="">Categories</a></b></h3>
          <h3 class="p-4"><b><a href="">Home</a></b></h3>
        </div>
        <div class="footerabout p-10">
          <h3 class="p-4"><a href="/src/views/general/AboutView.vue">About Us</a></h3>
          <h3 class="p-4"><a href="/src/views/general/AboutView.vue">About Our Recipes</a></h3>
          <h3 class="p-4"><a href="/src/views/general/AboutView.vue">About Terms&Conditions</a></h3>
        </div>
    </footer>
</template>
<style>

footer{
  width: 100%;
}
.socials img{
  width: 40px;
  height: auto;
  padding: 10px;
}
.footer-input,
.footer-button {
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
}
a:hover{
  border-bottom: 1px solid rgb(248, 108, 108);
}
</style>