<template>
    <div>
        <div id="container">
            <div id="image-container">
                <!-- Duplicate original images before -->
                <div class="col">
                    <img class="image" src="https://i.postimg.cc/nr6WKjsm/image-2024-03-20-151808934.png" alt="Image1">
                </div>
                <div class="col">
                    <div class="col d-flex">
                        <div class="col">
                            <img class="image"
                                src="https://i.postimg.cc/d18Lr1qx/One-Orange-Braincell-50-Times-Orange-Cats-Acted-So-Dorky-Their-Pics-Ended-Up-On-This-Online-Grou.jpg"
                                alt="Image2">
                        </div>
                        <div class="col">
                            <img class="image"
                                src="https://i.postimg.cc/GhXzGgNC/Best-Selling-Smart-Video-Doorbell-Enhance-Your-Home-Security.jpg"
                                alt="Image3">
                        </div>
                    </div>
                    <div class="col d-flex">
                        <div class="col">
                            <img class="image"
                                src="https://i.postimg.cc/DwR4L1P6/Rich-De-Muro-on-Instagram-First-in-person-look-at-ring-s-security-camera-drone-flying-Available-in.jpg"
                                alt="Image4">
                        </div>
                        <div class="col">
                            <img class="image"
                                src="https://i.postimg.cc/jShggdCG/Amazon-announces-Astro-the-home-robot.jpg"
                                alt="Image5">
                        </div>
                    </div>
                </div>
                <!-- End of original images before -->

                <!-- Original set of images -->
                <div class="col">
                    <img class="image" src="https://i.postimg.cc/nr6WKjsm/image-2024-03-20-151808934.png" alt="Image1">
                </div>
                <div class="col">
                    <div class="col d-flex">
                        <div class="col">
                            <img class="image"
                                src="https://i.postimg.cc/d18Lr1qx/One-Orange-Braincell-50-Times-Orange-Cats-Acted-So-Dorky-Their-Pics-Ended-Up-On-This-Online-Grou.jpg"
                                alt="Image2">
                        </div>
                        <div class="col">
                            <img class="image"
                                src="https://i.postimg.cc/GhXzGgNC/Best-Selling-Smart-Video-Doorbell-Enhance-Your-Home-Security.jpg"
                                alt="Image3">
                        </div>
                    </div>
                    <div class="col d-flex">
                        <div class="col">
                            <img class="image"
                                src="https://i.postimg.cc/DwR4L1P6/Rich-De-Muro-on-Instagram-First-in-person-look-at-ring-s-security-camera-drone-flying-Available-in.jpg"
                                alt="Image4">
                        </div>
                        <div class="col">
                            <img class="image"
                                src="https://i.postimg.cc/jShggdCG/Amazon-announces-Astro-the-home-robot.jpg"
                                alt="Image5">
                        </div>
                    </div>
                </div>
                <!-- End of original set of images -->

                <!-- Duplicate original images after -->
                <div class="col">
                    <img class="image" src="https://i.postimg.cc/nr6WKjsm/image-2024-03-20-151808934.png" alt="Image1">
                </div>
                <div class="col">
                    <div class="col d-flex">
                        <div class="col">
                            <img class="image"
                                src="https://i.postimg.cc/d18Lr1qx/One-Orange-Braincell-50-Times-Orange-Cats-Acted-So-Dorky-Their-Pics-Ended-Up-On-This-Online-Grou.jpg"
                                alt="Image2">
                        </div>
                        <div class="col">
                            <img class="image"
                                src="https://i.postimg.cc/GhXzGgNC/Best-Selling-Smart-Video-Doorbell-Enhance-Your-Home-Security.jpg"
                                alt="Image3">
                        </div>
                    </div>
                    <div class="col d-flex">
                        <div class="col">
                            <img class="image"
                                src="https://i.postimg.cc/DwR4L1P6/Rich-De-Muro-on-Instagram-First-in-person-look-at-ring-s-security-camera-drone-flying-Available-in.jpg"
                                alt="Image4">
                        </div>
                        <div class="col">
                            <img class="image"
                                src="https://i.postimg.cc/jShggdCG/Amazon-announces-Astro-the-home-robot.jpg"
                                alt="Image5">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    mounted() {
        this.startAnimation();
    },
    methods: {
        startAnimation() {
            const container = document.getElementById('container');
            const imageContainer = document.getElementById('image-container');
            const images = imageContainer.querySelectorAll('.image');
            const imageWidth = images[0].offsetWidth;
            const totalWidth = images.length * imageWidth;
            let pos = 0;

            const animate = () => {
                pos += 0.1;
                if (pos >= totalWidth) {
                    pos = 0;
                }
                imageContainer.style.transform = `translateX(-${pos}px)`;
                requestAnimationFrame(animate);
            };
            animate();
        }
    }
};

</script>

<style scoped>
#container {
    width: 100%;
    overflow: hidden;
    position: relative;
}

#image-container {
    display: flex;
}

.image {
    margin: .3em;
    border: 3px solid rgb(0, 173, 239);
    border-radius: .5pc;
}


img[alt="Image1"] {
    width: 380px;
    height: 410px;
}

.btn {
    position: relative;
    bottom: 5em;
    right: 6em;
    font-weight: 600;
    color: rgb(0, 173, 239);
    border: 2px solid rgb(0, 173, 239);
}

.btn:hover {
    background-color:rgb(0, 173, 239);
    border: 2px solid rgb(0, 173, 239);
    color: white;
}


img[alt="Image2"] {
    width: 300px;
    height: 200px;
}

img[alt="Image3"] {
    width: 180px;
    height: 200px;
}

img[alt="Image4"] {
    width: 150px;
    height: 200px;
}

img[alt="Image5"] {
    width: 330px;
    height: 200px;
}
</style>