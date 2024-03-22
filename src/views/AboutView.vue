<template>
  <div class="container-fluid py-md-5 py-sm-3">
    <h1 class="heading display-4">
      About Us
    </h1>
    <h5 class="text-white fs-md-4 fs-sm-2" data-aos="fade-down" data-aos-easing="linear" data-aos-duration="800">
      In the dynamic landscape of contemporary security, Cyber Security emerges as a beacon of innovation and
      dependability. Committed to protecting homes, businesses, and institutions, Cyber Security offers an extensive
      array of state-of-the-art technological products.
    </h5>
    <CarouselComp />
  </div>
  <section class="nonimage-sec">
  </section>

  <section class="image-sec d-flex flex-column text-white">
    <h1 class="fs-md-4 fs-sm-2">24/7 Online Customer Support</h1>
  </section>

  <section class="nonimage-secfade">
  </section>

  <section class="nonimage-secBlue d-flex flex-column justify-content-around">
    <h1 class="sec-paragraph text-white fs-md-4 fs-sm-2" data-aos="fade-down" data-aos-easing="linear"
      data-aos-duration="700">
      Our Companies Mission
    </h1>
    <h5 class="text-white fs-md-2 fs-sm-1" data-aos="fade-down" data-aos-easing="linear" data-aos-duration="800">From
      advanced
      As a security company, our mission is simple: to reduce crime and keep our clients safe. We achieve this through a
      combination of careful planning, cutting-edge technology, and constant vigilance. By implementing proactive
      measures like regular patrols and advanced alarm systems, we deter criminal activity before it happens. We work
      closely with law enforcement and analyze data to stay ahead of emerging threats. Our goal is to create secure
      environments where people can live and work without fear, providing peace of mind for our clients and contributing
      to safer communities.</h5>
  </section>

  <section class="nonimage-secfadeRev">
  </section>

  <section class="nonimage-secMtt nonimage-secBlue d-flex flex-column justify-content-around">
    <h1 class="sec-paragraph text-white fs-md-4 fs-sm-2" data-aos="fade-down" data-aos-easing="linear"
      data-aos-duration="700">
      Meet The Development Team
    </h1>
    <div class="container d-flex flex-wrap justify-content-center" data-aos="fade-down" data-aos-easing="linear"
      data-aos-duration="700">
      <div class="col-md-4 col-sm-12 mb-md-3 mb-sm-2">
        <img src="https://i.postimg.cc/fLM3sSwY/IMG-9731.jpg" alt="devTeam" class="img-fluid">
        <h2 class="fs-md-3 fs-sm-2">J.Smith</h2>
        <h5 class="fs-md-2 fs-sm-1">Full Stack Dev</h5>
      </div>
      <div class="col-md-4 col-sm-12 mb-md-3 mb-sm-2">
        <img src="https://i.postimg.cc/d1J9f0px/kendrick-lamar-2-1517199991.jpg" alt="devTeam" class="img-fluid">
        <h2 class="fs-md-3 fs-sm-2">K.Dott</h2>
        <h5 class="fs-md-2 fs-sm-1">Coffee Guy</h5>
      </div>
      <div class="col-md-4 col-sm-12 mb-md-3 mb-sm-2">
        <img src="https://i.postimg.cc/NMLKLqH0/j-cole-live-2018-j-b-billboard-1548.jpg" alt="devTeam"
          class="img-fluid">
        <h2 class="fs-md-3 fs-sm-2">J.Cole</h2>
        <h5 class="fs-md-2 fs-sm-1">Rapper</h5>
      </div>
    </div>
  </section>

  <section class="nonimage-secLg">
  </section>

  <div class="container my-5" data-aos="fade-down" data-aos-easing="linear" data-aos-duration="700">
    <div class="col">
      <h1 class="featuresHeading">App Compatibilities & Features</h1>
      <div class="row">
        <div class="col-md-4 col-sm-12">
          <div class="col d-flex justify-content-center">
            <h4 class="mx-2">Android</h4>
            <div><i class="bi bi-android2"></i></div>
          </div>
          <div class="col d-flex justify-content-center">
            <h4 class="mx-2">iOS</h4>
            <div><i class="bi bi-apple"></i></div>
          </div>
          <img src="https://i.postimg.cc/wBG6Qv9k/Notfication.gif" alt="phone" class="img-fluid">
        </div>
        <div class="col-md-4 col-sm-12 d-flex align-items-center">
          <div class="row">
            <div class="col">
              <ul class="fs-md-2 fs-sm-1">
                <li>1-year limited warranty</li>
                <li>Motion-activated notifications</li>
                <li>Live View</li>
                <li>Video Saving and Sharing</li>
                <li>Enhanced Notification</li>
                <li>Theft protection</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-md-4 col-sm-12">
          <div class="col d-flex justify-content-center">
            <h4 class="mx-2">Windows</h4>
            <div><i class="bi bi-windows"></i></div>
          </div>
          <div class="col d-flex justify-content-center">
            <h4 class="mx-2">Mac</h4>
            <div><i class="bi bi-apple"></i></div>
          </div>
          <img src="https://i.postimg.cc/MGr8qsTD/macNotif.gif" alt="mac" class="img-fluid">
        </div>
      </div>
    </div>
  </div>
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
.heading, h1 {
  padding: 2em 0;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);

}

.featuresHeading {
  margin: 0 0 2em 0;
  color: black;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

li {
  list-style: none;
  display: flex;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.container-fluid {
  background-image: linear-gradient(rgb(53, 53, 53), rgb(0, 173, 239), white, white);
  padding: 7px auto;
}

.heading {
  padding: 2em 0;
  color: white;
}

.featuresHeading {
  margin: 0 0 2em 0;
}

li {
  list-style: none;
  display: flex;

}

.container-fluid {
  background-image: linear-gradient(rgb(53, 53, 53), rgb(0, 173, 239), white, white);
  padding: 7px auto;
}

.nonimage-sec {
  height: 10vh;
  background-color: rgb(0, 173, 239);
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
  background-image: url('https://i.postimg.cc/8zm8f7Ry/image-2024-03-21-194738873.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
}

img[alt="devTeam"] {
  width: 250px;
  aspect-ratio: 1/1;
  border-radius: 10pc;
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

h2,
h5 {
  color: white;
}


/* Media Queries */
@media (max-width: 300px) {
  .heading {
    font-size: 2rem;
  }

  .text-white {
    font-size: 1rem;
  }

  img[alt="devTeam"] {
    width: 95px;
  }

  img[alt="phone"] {
    width: 250px;
  }

  img[alt="mac"] {
    width: 300px;
  }

  .fs-md-4,
  .fs-md-3,
  .fs-md-2,
  .fs-sm-2,
  .fs-sm-1 {
    font-size: unset !important;
  }

  .display-4 {
    font-size: 2.5rem !important;
  }

  .col-md-4,
  .col-sm-12 {
    flex: 0 0 100% !important;
    max-width: 100% !important;
  }
}

@media (min-width: 301px) and (max-width: 720px) {
  .heading {
    font-size: 2rem;
  }

  .text-white {
    font-size: 1rem;
  }

  img[alt="devTeam"] {
    width: 95px;
  }

  img[alt="phone"] {
    width: 250px;
  }

  img[alt="mac"] {
    width: 300px;
  }

  .fs-md-4,
  .fs-md-3,
  .fs-md-2,
  .fs-sm-2,
  .fs-sm-1 {
    font-size: unset !important;
  }

  .display-4 {
    font-size: 2.5rem !important;
  }

  .col-md-4,
  .col-sm-12 {
    flex: 0 0 100% !important;
    max-width: 100% !important;
  }
}

@media (min-width: 721px) and (max-width: 1440px) {}
</style>
