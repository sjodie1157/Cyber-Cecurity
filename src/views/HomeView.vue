<template>
  <div class="home">
    <video src="../assets/CSS/videos/Cyber Cecurity.mp4" autoplay loop>
    </video>

    <section class="nonimage-sec">
    </section>

    <section class="image-sec">
      <h1 class="sec-paragraph" data-aos="fade-down" data-aos-easing="linear" data-aos-duration="700">
        Control your home from any <span>device</span> you logged into
      </h1>
    </section>

    <section class="nonimage-sec">
    </section>

    <section class="image-sec-two">
      <h1 class="sec-paragraph" data-aos="fade-down" data-aos-easing="linear" data-aos-duration="700">
        Not home? Let<span> Astro bot</span> secure the place.
      </h1>
    </section>

    <section class="nonimage-sec">
    </section>
  </div>
</template>

<script>
export default {
  components: {
  }
}
</script>
<style scoped>
video {
  width: 100%;
  height: auto;
}

.nonimage-sec {
  height: 10vh;
  background-color: white;
}

.image-sec {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 85vh;
  background-image: url('https://i.postimg.cc/Zq3w6kyp/image-2024-03-13-222322419.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
}

.image-sec-two {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 85vh;
  background-image: url('https://i.postimg.cc/4xXb37qH/astro-business-new.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
}

h1 {
  color: white;
}

span {
  color: rgb(0, 173, 239);
}
</style>
