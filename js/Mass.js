'use strict';

class Mass {
  constructor() {
    this.defaults();
  }

  defaults() {
    this._kg = 0;
    this._lbs = 0;
  }

  get kg() {
    return this._kg;
  }

  set kg(kg) {
    this._kg = kg;
    this._lbs = convert_kg_to_lbs(kg);
  }

  get lbs() {
    return this._lbs;
  }

  set lbs(lbs) {
    this._lbs = lbs;
    this._kg = convert_lbs_to_kg(lbs);
  }
}
