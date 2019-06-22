'use strict';

class Macros {
  constructor(
    protein = {grams: null, calories: null, percent: null},
    proteinChoice = 'recommended',
    carbohydrate = {grams: null, calories: null, percent: null},
    fat = {grams: null, calories: null, percent: null}
  ) {
    this.protein = protein;
    this.proteinChoice = proteinChoice;
    this.carbohydrate = carbohydrate;
    this.fat = fat;
    this.proteinRatio = this.setProteinRatio();
  }

  setProteinRatio() {
    const proteinRatio = {
      adequate: .64,     // .64 grams per pound
      recommended: .82,  // .82 grams per pounds
      maximum: 1         // 1 gram per pound
    };

    return proteinRatio;
  }

  update(lbs, tdeeGoal) {
    this.protein.grams = lbs * this.proteinRatio[this.proteinChoice];
    this.protein.calories = this.protein.grams * 4;
    this.protein.percent = this.protein.calories / tdeeGoal;
  }
}
