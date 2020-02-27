/* eslint-disable prefer-arrow-callback */
import Service from '@ember/service';

import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import {
  find,
  click,
  visit,
  currentURL,
  fillIn,
  waitFor,
  triggerKeyEvent,
  triggerEvent
} from '@ember/test-helpers';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import nihSubmission from '../../mirage/scenarios/nih-submission';

module('Acceptance | submission', function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function () {
    const mockStaticConfig = Service.extend({
      getStaticConfig: () => Promise.resolve({
        assetsUri: '',
        branding: {
          stylesheet: ''
        }
      }),
      addCss: () => {}
    });

    this.owner.register('service:app-static-config', mockStaticConfig);
  });

  test('can walk through an nih submission workflow and make a submission - base case', async function (assert) {
    nihSubmission(this.server);

    await visit('/?userToken=https://pass.local/fcrepo/rest/users/0f/46/19/45/0f461945-d381-460e-9cc1-be4b246faa95');
    assert.equal(currentURL(), '/?userToken=https://pass.local/fcrepo/rest/users/0f/46/19/45/0f461945-d381-460e-9cc1-be4b246faa95');

    assert.dom('[data-test-start-new-submission]').exists();
    await click(find('[data-test-start-new-submission]'));

    assert.equal(currentURL(), '/submissions/new/basics');
    assert.dom('[data-test-doi-input]').exists();
    await fillIn('[data-test-doi-input]', '10.1039/c7an01256j');

    await waitFor(document.querySelector('.toast-message'));
    assert.dom(document.querySelector('.toast-message')).includesText('We\'ve pre-populated information from the DOI provided!');
    assert.dom('[data-test-article-title-text-area]').hasValue('Quantitative profiling of carbonyl metabolites directly in crude biological extracts using chemoselective tagging and nanoESI-FTMS');
    assert.dom('[data-test-journal-name-input]').hasValue('The Analyst');

    await focus('[data-test-article-title-text-area]');
    await triggerKeyEvent('[data-test-article-title-text-area]', 'keydown', 77 /* m */);
    await triggerKeyEvent('[data-test-article-title-text-area]', 'keydown', 79 /* o */);
    await triggerKeyEvent('[data-test-article-title-text-area]', 'keydown', 79 /* o */);

    await focus('[data-test-journal-name-input]');
    await triggerKeyEvent('[data-test-journal-name-input]', 'keydown', 77 /* m */);
    await triggerKeyEvent('[data-test-journal-name-input]', 'keydown', 79 /* o */);
    await triggerKeyEvent('[data-test-journal-name-input]', 'keydown', 79 /* o */);

    assert.dom('[data-test-article-title-text-area]').hasValue('Quantitative profiling of carbonyl metabolites directly in crude biological extracts using chemoselective tagging and nanoESI-FTMS');
    assert.dom('[data-test-journal-name-input]').hasValue('The Analyst');

    await waitFor('[data-test-workflow-basics-next]');
    await click('[data-test-workflow-basics-next]');

    await waitFor('[data-test-grants-selection-table] tbody tr td.projectname-date-column');
    assert.equal(currentURL(), '/submissions/new/grants');
    assert.dom('[data-test-grants-selection-table] tbody tr td.projectname-date-column').includesText('Regulation of Synaptic Plasticity in Visual Cortex');
    await click('[data-test-grants-selection-table] tbody tr td.projectname-date-column');
    await waitFor('[data-test-submission-funding-table] tbody tr td.projectname-date-column');
    assert.dom('[data-test-submission-funding-table] tbody tr td.projectname-date-column').includesText('Regulation of Synaptic Plasticity in Visual Cortex');

    await click('[data-test-workflow-grants-next]');

    await waitFor('[data-test-workflow-policies-next]');
    assert.equal(currentURL(), '/submissions/new/policies');
    await waitFor('input[type=radio]:checked');
    assert.dom('[data-test-workflow-policies-radio-no-direct-deposit:checked');

    await click('[data-test-workflow-policies-next]');

    await waitFor('[data-test-workflow-repositories-next]');
    assert.equal(currentURL(), '/submissions/new/repositories');
    assert.dom('[data-test-workflow-repositories-required-list] li').includesText('PubMed Central - NATIONAL INSTITUTE OF HEALTH');
    assert.dom('[data-test-workflow-repositories-optional-list] li').includesText('JScholarship');
    assert.dom('[data-test-workflow-repositories-optional-list] li input:checked').hasValue('on');

    await click('[data-test-workflow-repositories-next]');

    await waitFor('[data-test-metadata-form] textarea[name=title]');
    assert.equal(currentURL(), '/submissions/new/metadata');
    assert.dom('[data-test-metadata-form] textarea[name=title]').hasValue('Quantitative profiling of carbonyl metabolites directly in crude biological extracts using chemoselective tagging and nanoESI-FTMS');
    assert.dom('[data-test-metadata-form] input[name=journal-title]').hasValue('The Analyst');

    await click('.alpaca-form-button-Next');

    await waitFor('[data-test-workflow-files-next]');
    assert.equal(currentURL(), '/submissions/new/files');
    const submissionFile = new Blob(['moo'], { type: 'application/pdf' });
    submissionFile.name = 'my-submission.pdf';
    await triggerEvent(
      'input[type=file]',
      'change',
      { files: [submissionFile] }
    );

    await click('[data-test-workflow-files-next]');

    await waitFor('[data-test-workflow-review-submit]');
    assert.equal(currentURL(), '/submissions/new/review');
    assert.dom('[data-test-workflow-review-title]').includesText('Quantitative profiling of carbonyl metabolites directly in crude biological extracts using chemoselective tagging and nanoESI-FTMS');
    assert.dom('[data-test-workflow-review-doi]').includesText('10.1039/c7an01256j');
    assert.dom('[data-test-workflow-review-grant-list] li').includesText('Regulation of Synaptic Plasticity in Visual Cortex');
    assert.dom('[data-test-workflow-review-file-name]').includesText('my-submission.pdf');

    await click('[data-test-workflow-review-submit]');

    await waitFor(document.querySelector('#swal2-title'));
    assert.dom(document.querySelector('#swal2-title')).includesText('Deposit requirements for JScholarship');
    await click(document.querySelector('#swal2-checkbox'));
    await click(document.querySelector('.swal2-confirm'));

    await waitFor(document.querySelector('#swal2-title'));
    assert.dom(document.querySelector('#swal2-title')).includesText('Confirm submission');
    await click(document.querySelector('.swal2-confirm'));

    await waitFor('[data-test-workflow-thanks-thank-you]');
    assert.dom('[data-test-workflow-thanks-thank-you]').includesText('Thank you!');
    assert.equal(currentURL(), '/thanks?submission=https%3A%2F%2Fpass.local%2Ffcrepo%2Frest%2Fsubmissions%2F6a%2Fe3%2Fc0%2F91%2F6ae3c091-e87e-4249-a744-72cb93415a95');
  });
});

