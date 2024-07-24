<template>
  <div class="about-us">
    <h1 class="about-title"><strong>About Us</strong></h1>
    <section class="intro">
      <p>
        Welcome to <strong>{{ platformName }}</strong>, where culinary creativity meets community! We are passionate food enthusiasts committed to creating a space where everyone, from seasoned chefs to home cooks, can share their love for food. Our mission is to inspire, connect, and empower food lovers around the world through the joy of cooking and sharing recipes.
      </p>
    </section>

    <section class="our-story">
      <h2><strong>Our Story</strong></h2>
      <p>
        <strong>{{ platformName }}</strong> was born out of a shared love for cooking and a desire to bring people together through food. We believe that the kitchen is the heart of the home, and sharing recipes is a beautiful way to connect with others, preserve traditions, and explore new culinary horizons. Whether you’re looking for a family recipe passed down through generations or a new dish to impress your friends, you’ll find it here.
      </p>
    </section>

    <section class="what-we-offer">
      <h2><strong>What We Offer</strong></h2>
      <ul>
        <li><strong>Diverse Recipes:</strong> From appetizers to desserts, our platform boasts a wide variety of recipes from different cuisines and cultures. Discover new flavors, learn new techniques, and expand your culinary repertoire.</li>
        <li><strong>User-Friendly Interface:</strong> Our platform is designed with simplicity and ease of use in mind. Powered by Vue.js, our frontend offers a seamless and intuitive user experience, making it easy to search for, share, and save your favorite recipes.</li>
        <li><strong>Community Engagement:</strong> We believe that food brings people together. Our platform encourages community engagement through comments, ratings, and sharing tips and tricks. Connect with fellow food lovers, ask questions, and share your culinary journey.</li>
        <li><strong>Personalized Experience:</strong> Create your own profile to save your favorite recipes and get personalized recommendations based on your tastes and interests.</li>
      </ul>
    </section>

    <section class="our-vision">
      <h2><strong>Our Vision</strong></h2>
      <p>
        We envision a world where cooking is a joyful and inclusive experience for everyone. By fostering a community of passionate food enthusiasts, we aim to celebrate the art of cooking and make it accessible to all. We are committed to continuously improving our platform, adding new features, and expanding our recipe collection to cater to the diverse tastes and preferences of our users.
      </p>
    </section>

    <section class="join-us">
      <h2><strong>Join Us</strong></h2>
      <p>
        Whether you’re a beginner or an expert, we invite you to join our community and start sharing your culinary creations. Sign up today and embark on a delicious journey with <strong>{{ platformName }}</strong>. Together, let’s make every meal a memorable one!
      </p>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      platformName: "Recipe sharing platform"
    };
  }
};
</script>

<style scoped>
.about-us {
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1, h2 {
  color: #333;
  text-align: center;
  padding: 10px;
  font-size: 900;
}

p, ul {
  line-height: 1.6;
  color: #555;
}

ul {
  list-style-type: none;
  padding: 0;
}

ul li {
  margin-bottom: 10px;
}

strong {
  color: #000;
}
</style>
