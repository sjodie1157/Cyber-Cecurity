<template>
    <div v-if="showSpinner" class="spinner-container">
        <div class="spinner vh-50">
            <pre id="code">{{ code }}</pre>
        </div>
    </div>
</template>

<script>
export default {
    name: "SpinnerComp",
    data() {
        return {
            codeLines: [
                "Welcome to Cyber Security",
                "Please take a moment to enjoy the intro",
                "Initializing Firewall",
                "Encrypting sensitive data",
                "[            ] 0%",
                "[            ] 1%",
                "[            ] 2%",
                "[            ] 3%",
                "[            ] 4%",
                "[=           ] 5%",
                "[=           ] 6%",
                "[=           ] 7%",
                "[=           ] 8%",
                "[=           ] 9%",
                "[==          ] 10%",
                "[==          ] 11%",
                "[==          ] 12%",
                "[==          ] 13%",
                "[==          ] 14%",
                "[===         ] 15%",
                "[===         ] 16%",
                "[===         ] 17%",
                "[===         ] 18%",
                "[===         ] 19%",
                "[====        ] 20%",
                "[====        ] 21%",
                "[====        ] 24%",
                "[====        ] 25%",
                "[====        ] 26%",
                "[=====       ] 34%",
                "[=====       ] 35%",
                "[=====       ] 36%",
                "[=====       ] 37%",
                "[=====       ] 38%",
                "[=====       ] 39%",
                "[======      ] 40%",
                "[======      ] 41%",
                "[======      ] 42%",
                "[======      ] 44%",
                "[======      ] 45%",
                "[======      ] 46%",
                "[======      ] 47%",
                "[======      ] 48%",
                "[=======     ] 50%",
                "[=======     ] 51%",
                "[=======     ] 52%",
                "[=======     ] 54%",
                "[=======     ] 55%",
                "[=======     ] 56%",
                "[=======     ] 57%",
                "[========    ] 60%",
                "[========    ] 61%",
                "[========    ] 62%",
                "[========    ] 63%",
                "[========    ] 64%",
                "[========    ] 65%",
                "[========    ] 67%",
                "[========    ] 68%",
                "[========    ] 69%",
                "[=========   ] 70%",
                "[=========   ] 71%",
                "[=========   ] 72%",
                "[==========  ] 81%",
                "[==========  ] 82%",
                "[==========  ] 83%",
                "[==========  ] 84%",
                "[==========  ] 85%",
                "[==========  ] 87%",
                "[==========  ] 88%",
                "[==========  ] 89%",
                "[=========== ] 90%",
                "[=========== ] 91%",
                "[=========== ] 92%",
                "[=========== ] 93%",
                "[=========== ] 94%",
                "[=========== ] 95%",
                "[=========== ] 96%",
                "[=========== ] 97%",
                "[=========== ] 98%",
                "[=========== ] 99%",
                "[============] 100%",
                "Data encrypted",
                "Access granted.",
                "Welcome",
            ],
            currentLine: 0,
            code: "",
            showSpinner: true,
        };
    },
    mounted() {
        this.updateCode();
    },
    methods: {
        updateCode() {
            if (this.currentLine === this.codeLines.length) {
                setTimeout(() => {
                    this.showSpinner = false;
                    this.$router.push({ name: 'home' });
                }, 750);
                return;
            }
            this.code = this.codeLines[this.currentLine];
            this.currentLine++;
            setTimeout(this.updateCode, 140);
        },
    },
};
</script>

<style scoped>
.spinner-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
}

.spinner {
    font-family: "Courier New", monospace;
    font-size: 31px;
    color: #18c8e3;
    white-space: pre;
}

@media screen and (min-width: 300px) and (max-width: 500px) {
    .spinner-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: black;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .spinner {
        font-family: "Courier New", monospace;
        font-size: 15px;
        color: #18c8e3;
        white-space: pre;
    }
}
</style>
