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
  stats.goal = Number(statsForm.goal.value);
  setResults();
}

function updateProteinText(val) {
  stats.macros.ProteinChoice = val;
  setResults();
}

function setStats() {
  stats.age = Number(statsForm.age.value);
  stats.gender = statsForm.gender.value;
  stats.mass.lbs = Number(statsForm.weight.value);
  stats.height.inches = Number(statsForm.feet.value) * 12
    + Number(statsForm.inches.value);
  stats.bodyFat = Number(statsForm.bodyFat.value);
  stats.activityLevel = statsForm.activity.value;
  stats.goal = Number(statsForm.goal.value);

  setResults();
}

function setResults() {
  stats.update();

  let calorieText = `Goal: ${round(stats.energy.tdeeGoal, 0)} Calories Per Day`;
  let proteinText = `Protein: ${round(stats.macros.protein.grams, 0)}g (${round(stats.macros.protein.percent * 100, 2)}%)`;
  let fatText = `Fat: ${round(stats.macros.fat.grams, 0)}g (${round(stats.macros.fat.percent * 100, 2)}%)`;
  let carbohydrateText = `Carbohydrates: ${round(stats.macros.carb.grams, 0)}g (${round(stats.macros.carb.percent * 100, 2)}%)`;

  document.getElementById('calorieText').textContent = calorieText;
  document.getElementById('proteinText').textContent = proteinText;
  document.getElementById('fatText').textContent = fatText;
  document.getElementById('carbohydrateText').textContent = carbohydrateText;

  console.log(stats);
}

calcButton.addEventListener('click', () => {
  setStats();
  console.log(stats);
});
//
//
proteinChoice.addEventListener('click', () => {
  stats.macros.proteinChoice = macroForm.protein.value;

  setResults();
});
