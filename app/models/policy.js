import Model, { attr, hasMany } from '@ember-data/model';

export default Model.extend({
  title: attr('string'),
  description: attr('string'),
  policyUrl: attr('string'),

  repositories: hasMany('repository'),
  institution: attr('string'),
  // funder: DS.hasMany('funder'),

  _type: attr('string')
});
