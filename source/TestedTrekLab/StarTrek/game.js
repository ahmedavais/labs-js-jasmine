class Weapon {

    fire(game, ui){
        if(_hasAmmo(game, ui)){

        }
    }
    _hasAmmo() {
        throw new Error("You must specify the derived method");
    }
}

class Photon extends Weapon {
    _hasAmmo(game, __unusedUI){
        return game.torpedoes > 0;
    }
}

class Phaser extends Weapon {
    _hasAmmo(game, ui){
        return game.power >= parseInt(ui.paramter("amount"), 10);
    }
}

Game = function() {
    this.energy = 10000;
    this.torpedoes = 8;
    this.maxPhaserRange = 4000;
};


Game.prototype = {
    generator: function() {
        return Math.random();
    },
    randomWithinLimitOf: function(n) {
        return Math.floor(this.generator() * n);
    },
    processCommand: function(ui) {
        var enemy = ui.variable("target");
        //var distance;
        //var damage;

        if(ui.parameter("command") === "phaser") {

            this.phaserCommand(ui, enemy);
            //extracted phaserCommand
            
        } else if(ui.parameter("command") === "photon") {
            
            this.photonCommand(ui, enemy);
            //extracted photonCommand

        }
    },

/*
processCommand(ui) {
    var enemy = ui.variable("target");
    if (ui.parameter("command")) === "phaser"){
        this.firePhasers(ui, enemy);
    } else if (ui.parameter("command") === "photon") {
        this.firePhotonTorpedoes(ui,enemey);
    }
    // fireweapon(ui, enemy, weapon)
}



*/




    phaserCommand: function(ui, enemy) {
        var amount = parseInt(ui.parameter("amount"), 10);
           
            if (this.energy >= amount) {
                distance = enemy.distance;
                if (distance > this.maxPhaserRange) {
                    ui.writeLine("Klingon out of range of phasers at " + distance + " sectors...");
                } else {
                    damage = amount - (((amount / 20) * distance / 200) + this.randomWithinLimitOf(200));
                    if (damage < 1) {
                        damage = 1;
                    }
                    ui.writeLine("Phasers hit Klingon at " + distance + " sectors with " + damage + " units");
                    if (damage < enemy.energy) {
                        enemy.energy = enemy.energy - damage;
                        ui.writeLine("Klingon has " + enemy.energy + " remaining");
                    } else {
                        ui.writeLine("Klingon destroyed!");
                        enemy.destroy();
                    }
                }
                this.energy -= amount;
            } else {
                ui.writeLine("Insufficient energy to fire phasers!");
            }
    },

    photonCommand: function(ui, enemy) {
    
            if(this.torpedoes > 0) {
                distance = enemy.distance;
                if ((this.randomWithinLimitOf(4) + ((distance / 500) + 1) > 7)) {
                    ui.writeLine("Torpedo missed Klingon at " + distance + " sectors...");
                } else {
                    damage = 800 + this.randomWithinLimitOf(50);
                    ui.writeLine("Photons hit Klingon at " + distance + " sectors with " + damage + " units");
                    if (damage < enemy.energy) {
                        enemy.energy = enemy.energy - damage;
                        ui.writeLine("Klingon has " + enemy.energy + " remaining");
                    } else {
                        ui.writeLine("Klingon destroyed!");
                        enemy.destroy();
                    }
                }
                this.torpedoes--;
            } else {
                ui.writeLine("No more photon torpedoes!");
            }
    }

};