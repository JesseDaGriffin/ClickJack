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
            <!-- <img id="play-button" src="../../assets/redPlayButton.png" /> -->
            <router-link to="/inGame">
                <img id="play-button" src="../../assets/redPlayButton.png" />
            </router-link>
            <img
                id="settings-button"
                src="../../assets/redSettingsButton.png"
            />
        </div>
    </div>
</template>

<script>
export default {};
</script>
