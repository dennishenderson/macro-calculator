'use strict';

class Height {
  constructor() {
    this.defaults();
  }

  defaults() {
    this._cm = 0;
    this._inches = 0;
  }

  get cm() {
    return this._cm;
  }

  set cm(cm) {
    this._cm = cm;
    this._inches = convert_cm_to_in(cm);
  }

  get inches() {
    return this._inches;
  }

  set inches(inches) {
    this._inches = inches;
    this._cm = convert_in_to_cm(inches);
  }
}
