/**
 * This application is used to calculate Macros
 * This will eventually be moved into calculate a front end macro calculator
 * using DOM manipulation
 */

'use strict';

/**
 * Function rounds to the decimales passed in
 * @param  {[float]} value    [receives a number to be rounded]
 * @param  {[float]} decimals [how many decimal places to round to]
 * @return {[float]}          [returns rounded number]
 */
function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

/**
 * Function takes a lbs mass and converts it to kilograms
 * @param  {[float]} lbs [mass in pounds]
 * @return {[float]}     [mass in kilograms]
 */
function convert_lbs_to_kg(lbs) {
  const kgRatio = 0.45359237;
  return lbs * kgRatio;
}

/**
 * Function takes a kg mass an converts it to lbs
 * @param  {[float]} kg [mass in kilograms]
 * @return {[float]}    [mass in pounds]
 */
function convert_kg_to_lbs(kg) {
  const lbRatio = 2.20462262185;
  return kg * lbRatio;
}

/**
 * Function converts inches to centimeters
 * @param  {[float]} inches [inches]
 * @return {[float]}        [centimeters]
 */
function convert_in_to_cm(inches) {
  const cmRatio = .39370079;
  return inches / cmRatio;
}

/**
 * Converts centimeters to inches
 * @param  {[float]} centimeters [centimeters]
 * @return {[float]}             [inches]
 */
function convert_cm_to_in(centimeters) {
  const inRatio = .39370079;
  return centimeters * inRatio;
}

/**
 * Calculates LBM (Lean Body Mass)
 * @param  {[float]} mass    [mass or mass in kg]
 * @param  {[float]} bodyFat [body fat percentage in whole number format]
 * @return {[float]}         [returns LBM (Lean Body Mass) in kg]
 */
function calc_LBM(mass, bodyFat) {
  let lbm = (mass * (100 - bodyFat)) / 100;
  return lbm;
}

/**
 * Calculates RDEE (Resting Daily Energy Expenditure)
 * This uses the Katch-McArdle Formula
 * @param  {[float]} lbm [lean body mass]
 * @return {[float]}     [returns RDEE calories]
 */
function calc_RDEE_KMF(lbm) {
  let rdee = 370 + (21.6 * lbm);
  return rdee;
}

/**
 * Calculates RDEE (Resting Daily Energy Expenditure)
 * This uses the the Mifflin St Jeor Equation
 * @param  {[float]} mass [mass in kg]
 * @param  {[float]} height [height in cm]
 * @param  {[int]}   age    [age]
 * @param  {[bool]}  male   [male = true, female = false]
 * @return {[float]}        [returns RDEE calories]
 */
function calc_RDEE_MSJE(mass, height, age, male) {
  let rdee;
  if (male) {
    // RDEE = 10 x mass (kg) + 6.25 x height (cm) – 5 x age (y) + 5
    rdee = (10 * mass) + (6.25 * height) - (5 * age) + 5;
  } else {
    // RDEE = 10 x mass (kg) + 6.25 x height (cm) – 5 x age (y) – 161
    rdee = (10 * mass) + (6.25 * height) - (5 * age) - 161;
  }

  return rdee;
}

/**
 * Calculates TDEE (Total Daily Energy Expenditure)
 * @param  {[float]} rdee      [Resting Daily Energy Expenditure]
 * @param  {[string]} activity [activity level]
 * @return {[float]}           [TDEE in calories]
 */
function calc_TDEE(rdee, activity) {
  const activityLevel = {
    sedetary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725
  };

  return rdee * activityLevel[activity];
}

/**
 * Calculates TDEE Goal in calories
 * @param  {[float]}  tdee    [TDEE in calories]
 * @param  {[string]} goal    [Goal Type: gain, loss, maintain]
 * @param  {int}      percent [Default Value = 0, whole percentage number of gain or loss]
 * @return {[float]}          [Returnts TDEE goal in calories]
 */
function calc_TDEE_Goal(tdee, goal, percent = 0) {
  let tdeeGoal;
  if (goal === 'maintain') {
    tdeeGoal = tdee;
  } else if (goal === 'gain') {
    tdeeGoal = tdee + (tdee * (percent / 100));
  } else if (goal === 'loss') {
    tdeeGoal = tdee - (tdee * (percent / 100));
  }

  return tdeeGoal;
}

// person stats
let mass = 175.4;
let bodyFat = 16;
let height = 70;
let age = 36;
let male = true;
let activity = 'light';
let goal = 'gain';
let goalPercent = 20;

mass = convert_lbs_to_kg(mass);
height = convert_in_to_cm(height);

// Mifflin St Jeor Equation
let rdee_msje = calc_RDEE_MSJE(mass, height, age, male);
let tdee_msje = calc_TDEE(rdee_msje, activity);
let tdee_msje_goal = calc_TDEE_Goal(tdee_msje, goal, goalPercent);

// Katch-McArdle Formula
let lbm = calc_LBM(mass, bodyFat);
let rdee_kmf = calc_RDEE_KMF(lbm);
let tdee_kmf = calc_TDEE(rdee_kmf, activity);
let tdee_kmf_goal = calc_TDEE_Goal(tdee_kmf, goal, goalPercent);

console.log(`kg: ${mass}`);
console.log(`lbs: ${convert_kg_to_lbs(mass)}`);
console.log(`cm: ${height}`);
console.log(`in: ${convert_cm_to_in(height)}`);
console.log(`age: ${age}`);
console.log(`sex: ${male ? 'Male' : 'Female'}`);
console.log(`LBM kg: ${lbm}`);
console.log(`LBM lbs: ${convert_kg_to_lbs(lbm)}`);
console.log(`RDEE MSJE: ${rdee_msje}`);
console.log(`TDEE MSJE: ${tdee_msje}`);
console.log(`TDEE MSJE Goal: ${tdee_msje_goal}`);
console.log(`RDEE KMF: ${rdee_kmf}`);
console.log(`TDEE KMF: ${tdee_kmf}`);
console.log(`TDEE KMF Goal: ${tdee_kmf_goal}`);
