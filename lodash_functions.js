const _ = require("lodash");
const samples = require("./data/samples.json");

import { samples } from "./data/samples.json";

function ageUnder30(data) {
    return _.filter(data, (item) => item.age < 30);
}

function ageUnder30AndRun(data) {
    return _.filter(data, (item) => item.age < 30 && item.skills.includes("run"));
}

function marriedPeopleThatRun(data) {
    return _.filter(data, (item) => item.married && item.skills.includes("run"));
}

function peopleWithMarriedChildren(data) {
    return _.filter(data, (item) => {
        if (_.isEmpty(item.children)) {
            return false;
        }

        return _.filter(item.children, (child) => child.married).length > 0;
    });
}

function getPeopleAges(data) {
    return _.reduce(data, (result, item) => {
        result.push(item.age);

        _.forEach(item.children, (child) => {
            result.push(child.age);
        });
    
        return result;
    }, []);
}

function removeChildrenFromSamples(data) {
    const newArray = _.cloneDeep(data);

    return _.map(newArray, (item) => {
        item.children = undefined;
        return item;
    });
}

function getChildrenArray(data) {
    return _.reduce(data, (result, item) => {
        _.forEach(item.children, (child) => {
            result.push(child);
        });

        return result;
    }, []);
}

function getPopulationArray(data) {
    return _.reduce(data, (result, item) => {
        _.forEach(item.children, (child) => {
            result.push(child);
        });

        result.push(item);

        return result;
    }, []);
}

function doSomething(action, x) {
    return _.throttle(action, 1000 / x, { trailing: false });
}

function myAction() {
    console.log("This is an action!");
}

const executeAtMostOnceInX = doSomething(myAction, 5);

function executeOncePerXSeconds(func, x) {
    return _.throttle(func, x * 1000, { trailing: false });
}

const executeOncePer5Seconds = executeOncePerXSeconds(myAction, 5);

console.log("Under 30 People: " + ageUnder30(samples).length);
console.log("Running under 30 People: " + ageUnder30AndRun(samples).length);
console.log("Married People that run: " + marriedPeopleThatRun(samples).length);
console.log("People with married children: " + peopleWithMarriedChildren(samples).length);
console.log("People ages: " + getPeopleAges(samples));
console.log("People without children: " + JSON.stringify(removeChildrenFromSamples(samples)));
console.log("Children: " + JSON.stringify(getChildrenArray(samples)));
console.log("Population: " + getPopulationArray(samples).length);

console.log("Executing at most once in 5 times:");
executeAtMostOnceInX();
executeAtMostOnceInX();
executeAtMostOnceInX();
executeAtMostOnceInX();
executeAtMostOnceInX();

console.log("Executing once per 5 seconds:");
executeOncePer5Seconds();
executeOncePer5Seconds();
executeOncePer5Seconds();
executeOncePer5Seconds();
executeOncePer5Seconds();
executeOncePer5Seconds();
executeOncePer5Seconds();