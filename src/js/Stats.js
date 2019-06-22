/**
 * This Stats class is used to store statistics for the Macro Calculator
 *
 * Dependencies:
 *   Mass Class - Mass.js
 *   Height Class - Height.js
 *   Energy Class - Energy.js
 *   Macros Class - Macros.js
 *   calculations functions - calc.js
 *   converstion functions - convert.js
 */

'use strict';

class Stats {
  constructor() {
    this.defaults();
  }

  defaults() {
    this.age = 0;
    this.gender = null;
    this.mass = new Mass();
    this.height = new Height();
    this.bodyFat = 0;
    this.activityLevel = null;
    this.goal = null;
    this.lbm = new Mass();
    this.energy = new Energy();
    this.macros = new Macros();
  }

  update() {
    // Sets LBM (Lean Body Mass)
    if (this.mass.kg !== 0 && this.bodyFat !== 0) {
      this.lbm.kg = calc_LBM(this.mass.kg, this.bodyFat);
      this.lbm.lbs = convert_kg_to_lbs(this.lbm.kg);
    }

    // updates Energy Values
    this.energy.update(this);
  }
}
