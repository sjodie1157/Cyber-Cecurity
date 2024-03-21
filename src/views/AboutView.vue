<template>
  <div class="container-fluid">
    <h1 class="heading">
      About Cyber Security
    </h1>
    <CarouselComp />
  </div>
  <section class="nonimage-sec">
  </section>

  <section class="image-sec d-flex flex-column ">
    <h1 class="sec-paragraph text-white" data-aos="fade-down" data-aos-easing="linear" data-aos-duration="800">
      Cyber Security
    </h1>
    <h3 class="text-white" data-aos="fade-down" data-aos-easing="linear" data-aos-duration="800">
      In the dynamic landscape of contemporary security, Cyber Security emerges as a beacon of innovation and
      dependability. Committed to protecting homes, businesses, and institutions, Cyber Security offers an extensive
      array of state-of-the-art technological products. From advanced surveillance systems featuring AI-driven analytics
      to seamlessly integrated smart locks and access control solutions, our offerings redefine security standards.
      Meticulously crafted by our team of experts, each product not only boasts cutting-edge functionality but also
      user-friendly interfaces, empowering clients to effortlessly manage their security needs. Entrust Cyber Security
      to fortify your world,
      safeguarding what matters most with the latest innovations in security technology.
    </h3>
  </section>

  <section class="nonimage-secfade">
  </section>

  <section class="nonimage-secBlue d-flex flex-column justify-content-around">
    <h1 class="sec-paragraph" data-aos="fade-down" data-aos-easing="linear" data-aos-duration="700">
      paragraph
    </h1>
    <h2 class="sec-paragraph" data-aos="fade-down" data-aos-easing="linear" data-aos-duration="700">
      this is the companies mission paragraph
    </h2>
    <div class="container d-flex" data-aos="fade-down" data-aos-easing="linear" data-aos-duration="700">
      <div class="col">
        <img src="https://i.postimg.cc/52fzzHRQ/Placeholder-view-vector-svg.png" alt="statsImg">
      </div>
      <div class="col">
        <h1>stats heading</h1>
        <p>stats paragraph</p>
      </div>
    </div>
  </section>

  <section class="nonimage-secfadeRev">
  </section>

  <section class="nonimage-secMtt nonimage-secBlue d-flex flex-column justify-content-around">
    <h1 class="sec-paragraph" data-aos="fade-down" data-aos-easing="linear" data-aos-duration="700">
      Meet The Development Team
    </h1>
    <div class="container d-flex" data-aos="fade-down" data-aos-easing="linear" data-aos-duration="700">
      <div class="col">
        <img src="https://i.postimg.cc/52fzzHRQ/Placeholder-view-vector-svg.png" alt="statsImg">
        <h1>Name</h1>
        <h3>Title</h3>
      </div>
      <div class="col">
        <img src="https://i.postimg.cc/52fzzHRQ/Placeholder-view-vector-svg.png" alt="statsImg">
        <h1>Name</h1>
        <h3>Title</h3>
      </div>
      <div class="col">
        <img src="https://i.postimg.cc/52fzzHRQ/Placeholder-view-vector-svg.png" alt="statsImg">
        <h1>Name</h1>
        <h3>Title</h3>
      </div>
    </div>
  </section>

  <section class="nonimage-secLg">
  </section>

  <div class="container" data-aos="fade-down" data-aos-easing="linear" data-aos-duration="700">
    <div class="col">
      <h1>App Compatibilities & Features</h1>
      <div class="row">
        <div class="col">
          <div class="col d-flex justify-content-center">
            <h4>Android</h4>
            <div>(icon)</div>
          </div>
          <div class="col d-flex justify-content-center">
            <h4>iOS</h4>
            <div>(icon)</div>
          </div>
          <img src="https://i.postimg.cc/wBG6Qv9k/Notfication.gif" alt="phone">
        </div>
        <div class="col d-flex align-items-center">
          <div class="row">
            <div class="col d-flex flex-column align-items-start">
              <li> 1-year limited warranty</li>
              <li> Motion-activated notifications</li>
              <li> Live View</li>
              <li> Video Saving and Sharing</li>
              <li> Enhanced Notification</li>
              <li> Theft protection</li>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="col">
            <div class="col d-flex justify-content-center">
              <h4>Windows</h4>
              <div>(icon)</div>
            </div>
            <div class="col d-flex justify-content-center">
              <h4>Mac</h4>
              <div>(icon)</div>
            </div>
            <img src="https://i.postimg.cc/MGr8qsTD/macNotif.gif" alt="mac">
          </div>
          <div class="col">
          </div>
        </div>
      </div>
    </div>
  </div>

  <section class="footer">

  </section>
</template>

<script>
import CarouselComp from '../components/CarouselComp.vue'

export default {
  components: {
    CarouselComp
  }
}
</script>

<style scoped>
.heading {
  padding: 2em 0;
  color: white;
}

.container-fluid {
  min-height: 100vh;
  background-color: rgb(53, 53, 53);
  padding: 7px auto;
}

.nonimage-sec {
  height: 10vh;
  background-color: white;
}

.nonimage-secBlue {
  height: 100vh;
  background-color: rgb(0, 173, 239);
  position: relative;
  bottom: 11.7em;
}

.nonimage-secfade {
  height: 25vh;
  position: relative;
  bottom: 11.6em;
  /* change to the correct blue */
  background-image: linear-gradient(rgba(0, 0, 255, 0), rgb(0, 173, 239));
}

.nonimage-secfadeRev {
  height: 25vh;
  position: relative;
  bottom: 11.9em;
  background-image: linear-gradient(rgb(0, 173, 239), rgb(53, 53, 53));
}

.image-sec {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 85vh;
  background-image: url('https://i.postimg.cc/1tjBbvxF/The-Ultimate-Beginner-s-Guide-To-IT-Infrastructure-Management.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
}

img[alt="statsImg"] {
  max-width: 250px;
}

img[alt="phone"] {
  width: 450px;
}

img[alt="mac"] {
  width: 500px;
}

.nonimage-secMtt {
  height: 70vh;
  background-color: rgb(53, 53, 53);
  position: relative;
  bottom: 11.9em;
}


.nonimage-secLg {
  height: 25vh;
  background-image: linear-gradient(rgb(53, 53, 53), rgb(0, 173, 239), white);
  position: relative;
  bottom: 11.9em;
}

.footer {
  height: 20vh;
  background-color: aqua;
}
</style>
