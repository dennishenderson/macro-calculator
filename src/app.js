/**
 * This application is used to calculate Macros
 * This will eventually be moved into calculate a front end macro calculator
 * using DOM connectivity
 */

'use strict';

// For males:
// 10 x weight (kg) + 6.25 x height (cm) – 5 x age (y) + 5 = REE
//
// For females:
// 10 x weight (kg) + 6.25 x height (cm) – 5 x age (y) – 161 = REE

/**
 * Function takes a lbs weight and converts it to kilograms
 * @param  {[float]} lbs [receives lbs weight]
 * @return {[float]}     [returns kilograms]
 */
function lbsToKg(lbs) {
  const kgRatio = 0.45359237;
  return round(lbs * kgRatio, 2);
}

/**
 * Function rounds to the decimales passed in
 * @param  {[float]} value    [description]
 * @param  {[float]} decimals [description]
 * @return {[float]}          [description]
 */
function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

/**
 * Function converts inches to centimeters
 * @param  {[float]} inches [inches]
 * @return {[float]}        [centimeters]
 */
function inToCm(inches)
{
  const cmRatio = .39370;
  return round(inches / cmRatio, 0);
}

/**
 * Calculates Resting Energy Expenditure
 * @param  {[float]} weight [weight in kg]
 * @param  {[float]} height [height in cm]
 * @param  {[int]} age    [age]
 * @return {[float]}        [returns REE (Resting Energy Expenditure) calories]
 */
function calcREE(weight, height, age) {
  // 10 x weight (kg) + 6.25 x height (cm) – 5 x age (y) + 5 = REE
  let ree = (10 * weight) + (6.25 * height) - (5 * age) + 5;
  return ree;
}

// weight in lbs
let weight = 175.4;
weight = lbsToKg(weight);

// height in cm
let height = 70;
height = inToCm(height);

let age = 36;

let ree = calcREE(weight, height, age);


console.log(weight);
console.log(height);
console.log(age);
console.log(`REE: ${ree}`);
