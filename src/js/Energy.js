'use strict';

class Energy {
  constructor() {
    this.defaults();
  }

  defaults() {
    this._rdee = 0;
    this._tdee = 0;
    this._tdeeGoal = 0;
  }

  get rdee() {
    return this._rdee;
  }

  set rdee(stats) {
    let rdee = 0;

    if (
      stats.bodyFat === 0 &&
      stats.mass.kg !== 0 &&
      ststs.height.cm !== 0 &&
      stats.age !== 0 &&
      stats.gender !== null
    ) {
      // Calculate RDEE using MSJE (Mifflin St Jeor Equation)
      rdee = calc_RDEE_MSJE(stats.mass.kg, stats.height.cm, stats.age, stats.gender);
    } else if (
      stats.bodyFat !== 0 &&
      stats.lbm.kg !== 0
    ) {
      // Calculate RDEE using KMF (Katch-McArdle Formula)
      rdee = calc_RDEE_KMF(stats.lbm.kg);
    }

    // Sets RDEE
    this._rdee = rdee;
  }

  get tdee() {
    return this._tdee;
  }

  set tdee(stats) {
    let tdee = 0;

    // Calculate TDEE
    if (stats.energy.rdee !== 0 && stats.activityLevel !== null){
      tdee = calc_TDEE(stats.energy.rdee, stats.activityLevel);
    }

    // Sets TDEE
    this._tdee = tdee;
  }

  get tdeeGoal() {
    return this._tdeeGoal;
  }

  set tdeeGoal(stats) {
    let tdeeGoal = 0;

    // Calculate TDEE Goal
    if (stats.energy.tdee !== 0 && stats.goal !== null){
      tdeeGoal = calc_TDEE_Goal(stats.energy.tdee, stats.goal);
    }

    // Sets TDEE Goal
    this._tdeeGoal = tdeeGoal;
  }

  update(stats) {
    this.rdee = stats;
    this.tdee = stats;
    this.tdeeGoal = stats;
  }
}
