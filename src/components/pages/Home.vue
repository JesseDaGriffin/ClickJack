<template>
    <div id="home-screen">
        <div id="header-line">
            <img id="jack-card" src="../../assets/jackCard.jpg" />
            <div id="game-title">
                Click <br />
                Jack
            </div>
            <img id="jack-card" src="../../assets/jackCard.jpg" />
        </div>
        <div id="home-menu">
            <div class="router-button">
                <router-link to="/inGame">
                    <img id="play-button" src="../../assets/icons/icons8-play-64.png" />
                </router-link>
            </div>
            
            <div class="router-button">
                <div class="dark-cover"></div>
                <div class="coming-soon">
                    Coming <br> Soon
                </div>
                <router-link to="/">
                    <img
                        id="settings-button"
                        src="../../assets/icons/icons8-settings-64.png"
                    />
                </router-link>
            </div>
        </div>
        <div class="included-text">
            Icons by <a target="_blank" href="https://icons8.com">Icons8</a>
        </div>
    </div>
</template>

<script setup>
</script>

<style scoped>
</style>
