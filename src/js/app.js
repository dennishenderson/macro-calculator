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

// log input values
const calcButton = document.querySelector('button.calculate');
const macroForm = document.forms.macroForm;

calcButton.addEventListener('click', () => {
  let age = Number(macroForm.age.value);
  let male = macroForm.gender.value;
  let mass = Number(macroForm.weight.value);
  let height = Number(macroForm.feet.value) * 12
             + Number(macroForm.inches.value);
  let bodyFat = Number(macroForm.bodyFat.value);
  let activity = macroForm.activity.value;
  let goal = macroForm.goal.value;
  let goalPercent = Number(macroForm.goalPercent.value);

  console.log('Inputs...');
  console.log(age);
  console.log(male);
  console.log(height);
  console.log(mass);
  console.log(bodyFat);
  console.log(activity);
  console.log(goal);
  console.log(goalPercent);

  // lbs and in conversions
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

  console.log('Values...');
  console.log(`age: ${age}`);
  console.log(`gender: ${male}`);
  console.log(`kg: ${mass}`);
  console.log(`lbs: ${convert_kg_to_lbs(mass)}`);
  console.log(`cm: ${height}`);
  console.log(`in: ${convert_cm_to_in(height)}`);
  console.log(`LBM kg: ${lbm}`);
  console.log(`LBM lbs: ${convert_kg_to_lbs(lbm)}`);
  console.log(`RDEE MSJE: ${rdee_msje}`);
  console.log(`TDEE MSJE: ${tdee_msje}`);
  console.log(document.querySelector('#tdee_msje').textContent = `TDEE MSJE Goal: ${tdee_msje_goal}`);
  console.log(`RDEE KMF: ${rdee_kmf}`);
  console.log(`TDEE KMF: ${tdee_kmf}`);
  console.log(document.querySelector('#tdee_kmf').textContent = `TDEE KMF Goal: ${tdee_kmf_goal}`);
});
