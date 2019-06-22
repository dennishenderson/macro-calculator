'use strict';

class Macros {
  constructor() {
    this.defaults();
  }

  defaults() {
    this.protein = new Macro();
    this.carb = new Macro();
    this.fat = new Macro ();
    this.proteinChoice = 'recommended';
    this.proteinRatio = {
      adequate: .64,     // .64 grams per pound
      recommended: .82,  // .82 grams per pounds
      maximum: 1         // 1 gram per pound
    };
  }

  update(stats) {
    this.protein.update('protein', stats);
    this.fat.update('fat', stats);
    this.carb.update('carb', stats);
  }
}
