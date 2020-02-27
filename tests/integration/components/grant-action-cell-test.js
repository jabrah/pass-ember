import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';

module('Integration | Component | grant action cell', (hooks) => {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    await this.render(hbs`{{grant-action-cell}}`);

    assert.dom().hasText('New submission');

    // Template block usage:
    await this.render(hbs`{{#grant-action-cell}}template block text{{/grant-action-cell}}`);

    assert.dom().hasText('New submission template block text');
  });
});
