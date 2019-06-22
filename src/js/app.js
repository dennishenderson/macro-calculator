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

const stats = new Stats();
const macros = new Macros();

// log input values
const calcButton = document.querySelector('button.calculate');
const proteinChoice = document.querySelector('.protein');
const statsForm = document.forms.statsForm;
const macroForm = document.forms.macroForm;

function updateGoalText(val) {
  let goalText = '';
  if (val > 0) {
    goalText = `Bulk Up (${val}% Over Maintenance)`;
  } else if (val < 0) {
    goalText = `Lose Weight (${Math.abs(val)}% Under Maintenance)`
  } else {
    goalText = 'Maintain Weight';
  }

  document.getElementById('goalText').textContent = goalText;

}

function updateProteinText(val) {
  macros.ProteinChoice = val;
  setMacros();
}

function setStats() {
  stats.clear();
  console.log(stats.lbm.kg);
  console.log(stats.tdee.kmf);

  stats.age = Number(statsForm.age.value);
  stats.gender = statsForm.gender.value;
  stats.setMass(convert_lbs_to_kg(Number(statsForm.weight.value)));
  stats.setHeight(convert_in_to_cm(Number(statsForm.feet.value) * 12
    + Number(statsForm.inches.value)));
  stats.bodyFat = Number(statsForm.bodyFat.value);
  stats.activityLevel = statsForm.activity.value;
  stats.goal = statsForm.goal.value;

  stats.update();
}

function setMacros() {
  let tdeeGoal = null;
  if (stats.tdeeGoal.kmf !== null) {
    macros.update(stats.mass.lbs, stats.tdeeGoal.kmf);
    tdeeGoal = stats.tdeeGoal.kmf;
  } else if (stats.tdeeGoal.msje !== null) {
    macros.update(stats.mass.lbs, stats.tdeeGoal.msje);
    tdeeGoal = stats.tdeeGoal.msje;
  }

  let calorieText = `Goal: ${round(tdeeGoal, 0)} Calories Per Day`;
  let proteinText = `Protein: ${round(macros.protein.grams, 0)}g (${round(macros.protein.percent * 100, 2)}%)`;
  let fatText = `Fat: ${round(macros.fat.grams, 0)}g (${round(macros.fat.percent * 100, 2)}%)`;
  let carbohydrateText = `Carbohydrates: ${round(macros.carbohydrate.grams, 0)}g (${round(macros.carbohydrate.percent * 100, 2)}%)`;

  document.getElementById('calorieText').textContent = calorieText;
  document.getElementById('proteinText').textContent = proteinText;
  document.getElementById('fatText').textContent = fatText;
  document.getElementById('carbohydrateText').textContent = carbohydrateText;
}

calcButton.addEventListener('click', () => {
  setStats();
  setMacros();
  console.log(stats);
  console.log(macros);
});


proteinChoice.addEventListener('click', () => {
  macros.proteinChoice = macroForm.protein.value;

  macros.update(stats.mass.lbs, stats.tdeeGoal.kmf);

  console.log(macros);
});
