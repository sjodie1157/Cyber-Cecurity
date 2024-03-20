<template>
    <div>
        <div id="container">
            <div id="image-container">
                <!-- Duplicate original images before -->
                <div class="col">
                    <img class="image"
                        src="https://i.postimg.cc/52fzzHRQ/Placeholder-view-vector-svg.png"
                        alt="Image1">
                </div>
                <div class="col">
                    <div class="col d-flex">
                        <div class="col">
                            <img class="image"
                                src="https://i.postimg.cc/52fzzHRQ/Placeholder-view-vector-svg.png"
                                alt="Image2">
                        </div>
                        <div class="col">
                            <img class="image"
                                src="https://i.postimg.cc/52fzzHRQ/Placeholder-view-vector-svg.png"
                                alt="Image3">
                        </div>
                    </div>
                    <div class="col d-flex">
                        <div class="col">
                            <img class="image"
                                src="https://i.postimg.cc/52fzzHRQ/Placeholder-view-vector-svg.png"
                                alt="Image4">
                        </div>
                        <div class="col">
                            <img class="image"
                                src="https://i.postimg.cc/52fzzHRQ/Placeholder-view-vector-svg.png"
                                alt="Image5">
                        </div>
                    </div>
                </div>
                <!-- End of original images before -->

                <!-- Original set of images -->
                <div class="col">
                    <img class="image"
                        src="https://i.postimg.cc/52fzzHRQ/Placeholder-view-vector-svg.png"
                        alt="Image1">
                </div>
                <div class="col">
                    <div class="col d-flex">
                        <div class="col">
                            <img class="image"
                                src="https://i.postimg.cc/52fzzHRQ/Placeholder-view-vector-svg.png"
                                alt="Image2">
                        </div>
                        <div class="col">
                            <img class="image"
                                src="https://i.postimg.cc/52fzzHRQ/Placeholder-view-vector-svg.png"
                                alt="Image3">
                        </div>
                    </div>
                    <div class="col d-flex">
                        <div class="col">
                            <img class="image"
                                src="https://i.postimg.cc/52fzzHRQ/Placeholder-view-vector-svg.png"
                                alt="Image4">
                        </div>
                        <div class="col">
                            <img class="image"
                                src="https://i.postimg.cc/52fzzHRQ/Placeholder-view-vector-svg.png"
                                alt="Image5">
                        </div>
                    </div>
                </div>
                <!-- End of original set of images -->

                <!-- Duplicate original images after -->
                <div class="col">
                    <img class="image"
                        src="https://i.postimg.cc/52fzzHRQ/Placeholder-view-vector-svg.png"
                        alt="Image1">
                </div>
                <div class="col">
                    <div class="col d-flex">
                        <div class="col">
                            <img class="image"
                                src="https://i.postimg.cc/52fzzHRQ/Placeholder-view-vector-svg.png"
                                alt="Image2">
                        </div>
                        <div class="col">
                            <img class="image"
                                src="https://i.postimg.cc/52fzzHRQ/Placeholder-view-vector-svg.png"
                                alt="Image3">
                        </div>
                    </div>
                    <div class="col d-flex">
                        <div class="col">
                            <img class="image"
                                src="https://i.postimg.cc/52fzzHRQ/Placeholder-view-vector-svg.png"
                                alt="Image4">
                        </div>
                        <div class="col">
                            <img class="image"
                                src="https://i.postimg.cc/52fzzHRQ/Placeholder-view-vector-svg.png"
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
    filter: grayscale(100%);
    transition: filter 0.3s ease;
}

    .image:hover {
        filter: grayscale(0%);
}

    img[alt="Image1"] {
        width: 400px;
    height: 410px;
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