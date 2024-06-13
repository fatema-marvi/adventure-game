import inquirer from "inquirer";
import chalk from 'chalk';
class player {
    name;
    fuel = 100;
    constructor(name) {
        this.name = name;
    }
    fuelDecrease() {
        let fuel = this.fuel - 25;
        this.fuel = fuel;
    }
    fuelIncrease() {
        this.fuel = 100;
    }
}
class opponent {
    name;
    fuel = 100;
    constructor(name) {
        this.name = name;
    }
    fuelDecrease() {
        let fuel = this.fuel - 25;
        this.fuel = fuel;
    }
}
let Player = await inquirer.prompt({
    name: "name",
    type: "input",
    message: "Please enter your name:"
});
let Oponent = await inquirer.prompt({
    type: "list",
    name: "select",
    message: "Kindly select your opponenet",
    choices: ["Zombie", "skeleton", "assassin"]
});
//gather all data
let P1 = new player(Player.name);
let O1 = new opponent(Oponent.select);
do {
    if (Oponent.select == "skeleton") {
        console.log(`${chalk.bold.green(P1.name)} vs ${chalk.bold.red(O1.name)}`);
    }
    let ask = await inquirer.prompt({
        type: "list",
        name: "option",
        message: "Kindly select your option",
        choices: ["attack", "booster", "run for your life"]
    });
    if (ask.option == 'attack') {
        let num = Math.floor(Math.random() * 2);
        // greater than 0
        if (num > 0) {
            P1.fuelDecrease();
            console.log(chalk.bold.red(`${P1.name} fuel is ${P1.fuel}`));
            console.log(chalk.bold.green(`${O1.name} fuel is ${O1.fuel}`));
        }
        if (P1.fuel <= 0) {
            console.log(chalk.red.bold.italic('You loose, Better luck next time.'));
            process.exit();
        }
        // smaaller or equal to 0
        if (num <= 0) {
            O1.fuelDecrease();
            console.log(chalk.bold.red(`${O1.name} fuel is ${O1.fuel}`));
            console.log(chalk.bold.green(`${P1.name} fuel is ${P1.fuel}`));
            if (O1.fuel <= 0) {
                console.log(chalk.green.bold.italic('You Win.'));
                process.exit();
            }
        }
    }
    {
        if (ask.option == 'booster') {
            P1.fuelIncrease();
            console.log(chalk.bold.green.italic('have your energy drink'));
        }
        if (ask.option == 'run for your life') {
            console.log(chalk.red.bold.italic('You loose, Better luck next time.'));
        }
    }
} while (true);
