#! /usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
const apilink = "https://opentdb.com/api.php?amount=20&category=9&difficulty=medium&type=multiple";
let fetchData = async (data) => {
    let fetchQuiz = await fetch(data);
    let res = await fetchQuiz.json();
    return res.results;
};
let data = await fetchData(apilink);
let startQuiz = async () => {
    let score = 0;
    let name = await inquirer.prompt({
        name: "candidate",
        type: "input",
        message: "What is your name?",
    });
    for (let i = 1; i < 20; i++) {
        let answers = [...data[i].incorrect_answers, data[i].correct_answer];
        let ans = await inquirer.prompt({
            name: "quiz",
            type: "list",
            message: data[i].question,
            choices: answers.map((val) => val),
        });
        if (ans.quiz == data[i].correct_answer) {
            ++score;
        }
    }
    if (score <= 5) {
        console.log(`Dear ${chalk.bgRedBright.black(name.candidate)}. Sorry! You have failed this test. Your score is ${chalk.bold.red(score)}`);
    }
    else {
        console.log(`Dear ${chalk.bgGreen.blackBright(name.candidate)}. Congratulations! You have passed this test. Your score is ${chalk.bold.bgGreenBright.whiteBright(score)}`);
    }
};
startQuiz();
