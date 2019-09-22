ember-flipper
==============================================================================

Ember addon to build flipping cards. It uses contextual components to add front and back content. This addon was mainly inpsired from [react-flippy](https://github.com/sbayd/react-flippy).

Installation
------------------------------------------------------------------------------

```
ember install ember-flipper
```

Usage
------------------------------------------------------------------------------

<EmberFlipper
  @flipOn="click"
as |flipper|>
  <flipper.Front>
    <!-- Front Content -->
  </flipper.Front>
  <flipper.Back>
    <!-- Back Content -->
  </flipper.Back>
</EmberFlipper>

Options
------------------------------------------------------------------------------

`flipOn` - Trigger for flipping - `click | hover | none` 
`vertical` - Flips card vertically if `true`. Defaults to `false`
`flipDuration` - Duration for the flip in ms. Defaults to `600`. Separate durations for the front card and back card may be speficied, but the transition may not be smooth.
`flipped` - Prop to manually flip the card. It is recommended to not combine this with `flipOn` unless `flipOn` is set to `none`

Compatibility
------------------------------------------------------------------------------

* Ember.js v2.18 or above
* Ember CLI v2.13 or above
* Node.js v8 or above

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
