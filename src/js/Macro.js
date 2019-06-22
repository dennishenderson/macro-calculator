'use strict';

class Macro {
  constructor() {
    this.defaults();
  }

  defaults() {
    this.grams = 0;
    this.calories = 0;
    this.percent = 0;
  }

  update(type, stats) {
    if (type === 'protein') {
      this.grams = stats.mass.lbs * stats.macros.proteinRatio[stats.macros.proteinChoice];
      this.calories = this.grams * 4;
      this.percent = this.calories / stats.energy.tdeeGoal;
    } else if (type === 'fat') {
      this.calories = stats.energy.tdeeGoal * .25;
      this.grams = this.calories / 9;
      this.percent = this.calories / stats.energy.tdeeGoal;
    } else if (type = 'carb') {
      this.calories = stats.energy.tdeeGoal - stats.macros.protein.calories - stats.macros.fat.calories;
      this.grams = this.calories / 4;
      this.percent = this.calories / stats.energy.tdeeGoal;
    } else {
      this.defaults();
    }
  }
}
