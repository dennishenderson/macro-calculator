'use strict';

class Macros {
  constructor() {
    this.defaults();
  }

  defaults() {
    this.protein = {grams: 0, calories: 0, percent: 0};
    this.proteinChoice = 'recommended';
    this.carbohydrate = {grams: 0, calories: 0, percent: 0};
    this.fat = {grams: 0, calories: 0, percent: 0};
    this.proteinRatio = {
      adequate: .64,     // .64 grams per pound
      recommended: .82,  // .82 grams per pounds
      maximum: 1         // 1 gram per pound
    };
  }

  update(lbs, tdeeGoal) {
    this.protein.grams = lbs * this.proteinRatio[this.proteinChoice];
    this.protein.calories = this.protein.grams * 4;
    this.protein.percent = this.protein.calories / tdeeGoal;

    this.fat.calories = tdeeGoal * .25;
    this.fat.grams = this.fat.calories / 9;
    this.fat.percent = this.fat.calories / tdeeGoal;

    this.carbohydrate.calories = tdeeGoal - this.protein.calories - this.fat.calories;
    this.carbohydrate.grams = this.carbohydrate.calories / 4;
    this.carbohydrate.percent = this.carbohydrate.calories / tdeeGoal;
  }
}
