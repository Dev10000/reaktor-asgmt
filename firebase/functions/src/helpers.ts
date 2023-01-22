/**
 * Get Distance
 * Function takes two arguments - sideA and sideB of a triangle
 * Returns the distance using pythagorean theorem
 *
 * @param {Number} sideA     3
 * @param {Number} sideB     4
 * @return {Number}          5 Returns the distance
 */
const getDistance = (sideA: number, sideB: number) =>
  Math.sqrt(sideA ** 2 + sideB ** 2);

export default getDistance;
