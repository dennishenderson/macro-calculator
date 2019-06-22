'use strict';

/**
 * Calculates LBM (Lean Body Mass)
 * @param  {[float]} massKg  [mass in kg]
 * @param  {[float]} bodyFat [body fat percentage in whole number format]
 * @return {[float]}         [returns LBM (Lean Body Mass) in kg]
 */
function calc_LBM(massKg, bodyFat) {
  let lbm = (massKg * (100 - bodyFat)) / 100;
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
 * @param  {[float]}  massKg   [mass in kg]
 * @param  {[float]}  height [height in cm]
 * @param  {[int]}    age    [age]
 * @param  {[string]} gender   ['male' or 'female']
 * @return {[float]}         [returns RDEE calories]
 */
function calc_RDEE_MSJE(massKg, height, age, gender) {
  let rdee;
  if (gender === 'male') {
    // RDEE = 10 x mass (kg) + 6.25 x height (cm) – 5 x age (y) + 5
    rdee = (10 * massKg) + (6.25 * height) - (5 * age) + 5;
  } else {
    // RDEE = 10 x mass (kg) + 6.25 x height (cm) – 5 x age (y) – 161
    rdee = (10 * massKg) + (6.25 * height) - (5 * age) - 161;
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
    very: 1.725,
    extra: 1.9
  };

  return rdee * activityLevel[activity];
}

/**
 * Calculates TDEE Goal in calories
 * @param  {[float]}  tdee    [TDEE in calories]
 * @param  {[number]} goal    [negative for loss positive for gain]
 * @return {[float]}          [Returnts TDEE goal in calories]
 */
function calc_TDEE_Goal(tdee, goal) {
  let tdeeGoal;
  if (goal === 0) {
    // Maintenance
    tdeeGoal = tdee;
  } else if (goal > 0) {
    // Gain Weight
    tdeeGoal = tdee + (tdee * (goal / 100));
  } else {
    // Lose Weight
    tdeeGoal = tdee - (tdee * (Math.abs(goal) / 100));
  }

  return tdeeGoal;
}
