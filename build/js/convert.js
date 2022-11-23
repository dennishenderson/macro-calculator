'use strict';

/**
 * Function takes a lbs mass and converts it to kilograms
 * @param  {[float]} lbs [mass in pounds]
 * @return {[float]}     [mass in kilograms]
 */
function convert_lbs_to_kg(lbs) {
  const kgRatio = 0.45359237;
  return lbs * kgRatio;
}

/**
 * Function takes a kg mass an converts it to lbs
 * @param  {[float]} kg [mass in kilograms]
 * @return {[float]}    [mass in pounds]
 */
function convert_kg_to_lbs(kg) {
  const lbRatio = 2.20462262185;
  return kg * lbRatio;
}

/**
 * Function converts inches to centimeters
 * @param  {[float]} inches [inches]
 * @return {[float]}        [centimeters]
 */
function convert_in_to_cm(inches) {
  const cmRatio = .39370079;
  return inches / cmRatio;
}

/**
 * Converts centimeters to inches
 * @param  {[float]} centimeters [centimeters]
 * @return {[float]}             [inches]
 */
function convert_cm_to_in(centimeters) {
  const inRatio = .39370079;
  return centimeters * inRatio;
}
