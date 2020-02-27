import Model, { attr } from '@ember-data/model';
import { computed } from '@ember/object';

export default Model.extend({
  /**
   * (Required)
   */
  username: attr('string'),
  firstName: attr('string'),
  middleName: attr('string'),
  lastName: attr('string'),
  displayName: attr('string'),
  email: attr('string'),

  affiliation: attr('set'),
  locatorIds: attr('set'),
  orcidId: attr('string'),
  /** Possible values: admin, submitter */
  roles: attr('set'),

  isSubmitter: computed('roles.[]', function () {
    return this.get('roles') ? this.get('roles').includes('submitter') : false;
  }),
  isAdmin: computed('roles.[]', function () {
    return this.get('roles') ? this.get('roles').includes('admin') : false;
  })
});
