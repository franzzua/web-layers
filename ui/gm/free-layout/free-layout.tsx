module.exports = (html, state, events) => html`
    <div layout fit vertical>
      <gm-slide layout fit></gm-slide>
      <div layout fit class="controls">
        <gm-free-settings [state]="freeStore.State$ | async"></gm-free-settings>
      </div>
    </div>
`;