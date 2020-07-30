var InformationScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function () {
        Phaser.Scene.call(this, { key: "InformationScene" });
    },
    init: function () {},
    preload: function () {
        this.load.html("form", "form.html");
    },
    create: async function () {

        this.usernameInput = this.add.dom(640, 360).createFromCache("form");

        this.returnKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        this.returnKey.on("down", event => {
            let username = this.usernameInput.getChildByName("username");
            if(username.value != "") {
                this.scene.start("MainScene", { username: username.value, score: 0 });
            }
        })

    },
    update: function () { }
});