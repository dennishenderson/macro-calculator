'use strict';

class Stats {
  constructor(
    age = null,
    gender = null,
    mass = {kg: null, lbs: null},
    height = {cm: null, in: null},
    bodyFat = null,
    activityLevel = null,
    goal = null,
    lbm = {kg: null, lbs: null},
    rdee = {msje: null, kmf: null},
    tdee = {msje: null, kmf: null},
    tdeeGoal = {msje: null, kmf: null}
  ) {
    this.age = age;
    this.gender = gender;
    this.mass = mass;
    this.height = height;
    this.bodyFat = bodyFat;
    this.activityLevel = activityLevel;
    this.goal = goal;
    this.lbm = lbm;
    this.rdee = rdee;
    this.tdee = tdee;
    this.tdeeGoal = tdeeGoal;
  }

  clear() {
    this.age = null;
    this.gender = null;
    this.mass = {kg: null, lbs: null};
    this.height = {cm: null, in: null};
    this.bodyFat = null;
    this.activityLevel = null;
    this.goal = null;
    this.lbm = {kg: null, lbs: null};
    this.rdee = {msje: null, kmf: null};
    this.tdee = {msje: null, kmf: null};
    this.tdeeGoal = {msje: null, kmf: null};
  }

  setMass(kg = null) {
    if (kg !== null) {
      this.mass.kg = kg;
      this.mass.lbs = convert_kg_to_lbs(kg);
    }
  }

  setHeight(cm = null) {
    if (cm !== null) {
      this.height.cm = cm;
      this.height.in = convert_cm_to_in(cm);
    }
  }

  update() {
    // Sets LBM (Lean Body Mass)
    if (this.mass.kg !== null && this.bodyFat !== null) {
      this.lbm.kg = calc_LBM(this.mass.kg, this.bodyFat);
      this.lbm.lbs = convert_kg_to_lbs(this.lbm.kg);
    }

    // Sets RDEE using MSJE (Resting Daily Energy Expenditure)
    //   using (Mifflin St Jeor Equation)
    if (this.mass.kg !== null
      && this.height.cm !== null
      && this.age !== null
      && this.gender !== null)
    {
      this.rdee.msje = calc_RDEE_MSJE(this.mass.kg, this.height.cm, this.age, this.gender);
    }

    // Sets RDEE using KMF (Resting Daily Energy Expenditure)
    //   using (Katch-McArdle Formula)
    if (this.lbm.kg !== null) {
      this.rdee.kmf = calc_RDEE_KMF(this.lbm.kg);
    }

    // Sets TDEE using MSJE (Total Daily Energy Expenditure)
    //   using (Mifflin St Jeor Equation)
    if (this.rdee.msje !== null && this.activityLevel !== null) {
      this.tdee.msje = calc_TDEE(this.rdee.msje, this.activityLevel);
    }

    // Sets TDEE using KMF (Resting Daily Energy Expenditure)
    //   using (Katch-McArdle Formula)
    if (this.rdee.kmf !== null && this.activityLevel !== null) {
      this.tdee.kmf = calc_TDEE(this.rdee.kmf, this.activityLevel);
    }

    // Sets TDEE Goal using MSJE (Total Daily Energy Expenditure)
    //   using (Mifflin St Jeor Equation)
    if (this.tdee.msje !== null && this.goal !== null) {
      this.tdeeGoal.msje = calc_TDEE_Goal(this.tdee.msje, this.goal);
    }

    // Sets TDEE Goal using KMF (Resting Daily Energy Expenditure)
    //   using (Katch-McArdle Formula)
    if (this.tdee.kmf !== null && this.goal !== null) {
      this.tdeeGoal.kmf = calc_TDEE_Goal(this.tdee.kmf, this.goal);
    }
  }
}
