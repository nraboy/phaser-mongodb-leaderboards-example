var GameOverScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function GameOverScene() {
        Phaser.Scene.call(this, { key: "GameOverScene" });
    },
    init: function(data) {
        this.highScores = [
            {
                "username": "nraboy",
                "score": 999
            },
            {
                "username": "atacke",
                "score": 10
            }
        ];
        this.player = data;
    },
    preload: function() {},
    create: function() {

        this.add.text(10, 100, "HIGH SCORES", { fontSize: 40, color: '#000000', fontStyle: "bold", backgroundColor: "#FFFFFF", padding: 10 });

        this.add.text(10, 10, "YOUR SCORE: " + this.player.score, { fontSize: 40, color: '#000000', fontStyle: "bold", backgroundColor: "#FFFFFF", padding: 10 });

        for(let i = 0; i < this.highScores.length; i++) {
            this.add.text(10, 100 * (i + 2), `${this.highScores[i].username}: ${this.highScores[i].score}`, { fontSize: 40, color: '#000000', fontStyle: "bold", backgroundColor: "#FFFFFF", padding: 10 });
        }

        this.retryButton = this.add.text(1125, 640, "RETRY", { fontSize: 40, color: '#000000', fontStyle: "bold", backgroundColor: "#FFFFFF", padding: 10 });
        this.retryButton.setInteractive();

        this.retryButton.on("pointerdown", () => {
            this.scene.start("MainScene");
        }, this);

    },
    update: function() {}
});