#! /usr/bin/env node

import inquirer from "inquirer";

let todo: string[] = [];

let condition = true;

while (condition) {
  let taskOptions = await inquirer.prompt([
    {
      message: "Select one option",
      name: "Options",
      type: "list",
      choices: ["add", "read", "update", "delete"],
    },
  ]);

  if (taskOptions.Options === "add") {
    let addInfo = await inquirer.prompt([
      {
        message: "What would you like to add?",
        name: "firstTask",
        type: "input",
        validate: (value) => {
          if (value.trim().length > 0) {
            return true;
          }
          return "Please enter a valid task.";
        },
      },
      {
        message: "Would you like to add more?",
        name: "moreTask",
        type: "confirm",
        default: true,
      },
    ]);
    todo.push(addInfo.firstTask);
    console.log(todo.join("\n"));
    condition = addInfo.moreTask;
  }
  if (taskOptions.Options === "read") {
    console.log(todo.join("\n"));
  }
  if (taskOptions.Options === "update") {
    let updateInfo = await inquirer.prompt([
      {
        message: "What would you like to update?",
        name: "update",
        type: "list",
        choices: todo,
      },
    ]);
    let newTask = await inquirer.prompt([
      {
        name: "newTask",
        message: "Enter your new task.",
        type: "input",
        validate: (value) => {
          if (value.trim().length > 0) {
            return true;
          }
          return "Please enter a valid task.";
        },
      },
    ]);
    let taskIndex = todo.indexOf(updateInfo.update);
    if (taskIndex !== -1) {
      todo[taskIndex] = newTask.newTask;
    } else {
      console.log("Please select valid task index");
    }
  }
  if (taskOptions.Options === "delete") {
    let deleteInfo = await inquirer.prompt([
      {
        message: "Select the one you want to delete",
        name: "delete",
        type: "list",
        choices: todo,
      },
    ]);
    let selected = todo.indexOf(deleteInfo.delete);
    if (selected !== -1) {
      todo.splice(selected, 1);
    } else {
      console.log("Please select valid one.");
    }
  }
}
