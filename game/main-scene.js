var MainScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { key: "MainScene" });
    },
    init: function(data) {
        this.username = data.username;
        this.score = data.score;
    },
    preload: function() {
        this.load.image("leaf", "leaf.png");
        this.load.image("bomb", "bomb.png");
        this.load.image("box", "box.png");
    },
    create: function() {

        this.player = this.physics.add.sprite(640, 650, "box");
        this.player.setScale(0.25);
        this.player.setDepth(1);
        this.player.setData("score", this.score);
        this.player.setData("username", this.username);

        this.leafGroup = this.physics.add.group({
            defaultKey: "leaf",
            maxSize: 30,
            visible: false,
            active: false
        });

        this.bombGroup = this.physics.add.group({
            defaultKey: "bomb",
            maxSize: 30,
            visible: false,
            active: false
        });

        this.scoreText = this.add.text(10, 10, "SCORE: 0", { fontSize: 40, color: '#000000', fontStyle: "bold", backgroundColor: "#FFFFFF", padding: 10 });
        this.scoreText.setDepth(1);

        this.physics.add.collider(this.player, this.leafGroup, (player, leaf) => {
            if (leaf.active) {
                this.score = player.getData("score");
                this.score++;
                player.setData("score", this.score);
                this.scoreText.setText("SCORE: " + this.score);
                this.leafGroup.killAndHide(leaf);
            }
        });

        this.physics.add.collider(this.player, this.bombGroup, (player, bomb) => {
            if (bomb.active) {
                this.bombGroup.killAndHide(bomb);
                this.scene.start("GameOverScene", { 
                    "username": this.player.getData("username"), 
                    "score": this.player.getData("score") 
                });
            }
        });

        this.time.addEvent({
            delay: 250,
            loop: true,
            callback: () => {
                let leafPositionX = Math.floor(Math.random() * 1280);
                let bombPositionX = Math.floor(Math.random() * 1280);
                this.leafGroup.get(leafPositionX, 0)
                    .setScale(0.1)
                    .setActive(true)
                    .setVisible(true);
                this.bombGroup.get(bombPositionX, 0)
                    .setScale(0.1)
                    .setActive(true)
                    .setVisible(true);
            }
        });
    },
    update: function() {
        this.leafGroup.incY(6);
        this.leafGroup.getChildren().forEach(leaf => {
            if (leaf.y > 800) {
                this.leafGroup.killAndHide(leaf);
            }
        });
        this.bombGroup.incY(6);
        this.bombGroup.getChildren().forEach(bomb => {
            if (bomb.y > 800) {
                this.bombGroup.killAndHide(bomb);
            }
        });
        if (this.input.activePointer.isDown) {
            this.player.x = this.input.activePointer.position.x;
        }
    }
});

