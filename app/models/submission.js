import Model, { attr, belongsTo, hasMany } from '@ember-data/model';
import { computed } from '@ember/object';

export default Model.extend({
  /** Possible values: not-started, in-progress, accepted */
  aggregatedDepositStatus: attr('string', {
    defaultValue: 'not-started'
  }),
  submittedDate: attr('date'),
  source: attr('string', { defaultValue: 'pass' }),
  metadata: attr('string'), // Stringified JSON
  submitted: attr('boolean', { defaultValue: false }),
  submissionStatus: attr('string'),
  submitterName: attr('string'),
  submitterEmail: attr('string'), // format: "mailto:jane@example.com"
  submitter: belongsTo('user'),
  preparers: hasMany('user'),
  publication: belongsTo('publication'),
  repositories: hasMany('repository', {
    async: true
  }),
  effectivePolicies: hasMany('policy', { async: true }),

  // not on this model on API
  _submissionEvents: hasMany('submissionEvent', {
    async: true
  }),
  /**
   * List of grants related to the item being submitted. The grant PI determines who can perform
   * the submission and in the case that there are mutliple associated grants, they all should
   * have the same PI. If a grant has a different PI, it should be a separate submission.
   */
  grants: hasMany('grant', {
    async: true
  }),

  // computed attributes for tables and to support some logic
  isProxySubmission: computed(
    'submitterEmail', 'submitterEmail.length',
    'submitterName', 'submitterName.length',
    'preparers', 'preparers.length',
    function () {
      return (
        (this.get('submitterEmail') && this.get('submitterEmail.length') > 0
          && this.get('submitterName') && this.get('submitterName.length') > 0
        ) || (this.get('preparers') && this.get('preparers.length') > 0)
      );
    }
  ),

  submitterEmailDisplay: computed('submitterEmail', function () {
    if (this.get('submitterEmail')) {
      return this.get('submitterEmail').replace('mailto:', '');
    }
    return this.get('submitterEmail');
  }),

  publicationTitle: computed('publication', function () {
    return this.get('publication.title');
  }),

  repositoryNames: computed('repositories', function () {
    let repoNames = [];
    this.get('repositories').forEach((repo) => {
      repoNames.push(repo.get('name'));
    });
    return repoNames;
  }),
  grantInfo: computed('grants', function () {
    let grants = [];
    this.get('grants').forEach((grant) => {
      grants.push(grant.get('awardNumber'));
      grants.push(grant.get('primaryFunder.name'));
      grants.push(grant.get('projectName'));
    });
    return grants;
  }),
  isStub: computed('source', 'submitted', function () {
    return this.get('source') === 'other' && !(this.get('submitted'));
  }),

  /**
   * @returns {boolean} is this a draft submission?
   */
  isDraft: computed('submitted', 'submissionStatus', function () {
    return this.get('submissionStatus') === 'draft';
    // return !this.get('submitted') && !this.get('submissionStatus');
  })
});
