import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default Model.extend({
  /** Award number from a funder (REQUIRED) */
  awardNumber: attr('string'),
  /** Possible values: active, pre_award, terminated */
  awardStatus: attr('string'),
  localKey: attr('string'),
  projectName: attr('string'),
  awardDate: attr('date'),
  startDate: attr('date'),
  /** Date the grant ended */
  endDate: attr('date'),

  pi: belongsTo('user'),
  coPis: hasMany('user', { async: true }),
  primaryFunder: belongsTo('funder'),
  directFunder: belongsTo('funder'),
});
