var GameOverScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { key: "GameOverScene" });
    },
    init: function(data) {
        this.player = data;
    },
    preload: function() {},
    create: async function() {
        try {
            if (this.player.username && this.player.score) {
                await fetch("http://localhost:3000/create", {
                    "method": "POST",
                    "headers": {
                        "content-type": "application/json"
                    },
                    "body": JSON.stringify(this.player)
                });
            }

            this.globalScores = await fetch("http://localhost:3000/get")
                .then(response => response.json());

            // this.nearbyScores = await fetch("http://localhost:3000/getNearLocation?latitude=&longitude=")
            //     .then(response => response.json());

            this.add.text(10, 100, "GLOBAL HIGH SCORES", { fontSize: 40, color: '#000000', fontStyle: "bold", backgroundColor: "#FFFFFF", padding: 10 });
            this.add.text(400, 100, "NEARBY HIGH SCORES", { fontSize: 40, color: '#000000', fontStyle: "bold", backgroundColor: "#FFFFFF", padding: 10 });

            this.add.text(10, 10, "YOUR SCORE: " + this.player.score, { fontSize: 40, color: '#000000', fontStyle: "bold", backgroundColor: "#FFFFFF", padding: 10 });

            for(let i = 0; i < this.globalScores.length; i++) {
                this.add.text(10, 100 * (i + 2), `${this.globalScores[i].username}: ${this.globalScores[i].score}`, { fontSize: 40, color: '#000000', fontStyle: "bold", backgroundColor: "#FFFFFF", padding: 10 });
            }

            this.retryButton = this.add.text(1125, 640, "RETRY", { fontSize: 40, color: '#000000', fontStyle: "bold", backgroundColor: "#FFFFFF", padding: 10 });
            this.retryButton.setInteractive();

            this.retryButton.on("pointerdown", () => {
                this.scene.start("MainScene");
            }, this);
        } catch (e) {
            console.error(e);
        }
    },
    update: function() {}
});