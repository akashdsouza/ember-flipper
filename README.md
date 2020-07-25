ember-flipper
==============================================================================

Ember addon to build flipping cards. It provides both a component and a modifier for flipping. Component is just a tiny wrapper around the modifier. This addon was mainly inpsired from [react-flippy](https://github.com/sbayd/react-flippy).

[Demo](https://akashdsouza.github.io/ember-flipper/)

Installation
------------------------------------------------------------------------------

```
ember install ember-flipper
```

Usage
------------------------------------------------------------------------------
Component
------------------------------------------------------------------------------
```hbs
<EmberFlipper
  @flipOn="click"
>
  <div data-ember-flipper-front>
    {{!-- Front Content --}}
  </div>
  <div data-ember-flipper-back>
    {{!-- Back Content --}}
  </div>
</EmberFlipper>
```

It is necessary to wrap the front content in an element with attribute `data-ember-flipper-front` and the back content in an element with the attribute `data-ember-flipper-back`

Modifier
------------------------------------------------------------------------------
```hbs
<div data-ember-flipper-container>
  <div {{ember-flip "click"}}>
    <div data-ember-flipper-front>
      {{!-- Front Content --}}
    </div>
    <div data-ember-flipper-back>
      {{!-- Back Content --}}
    </div>
  </div>
</div>
```

It is necessary to add the `data-ember-flipper-container` attribute to the parent element of the flipping container to provide `perspective` style(1000px). If you are omitting the `data-ember-flipper-container` attribute, please be sure to add the perspective style to the parent element. Alternatively, you can use the component form which contains the wrapping logic.

Options
------------------------------------------------------------------------------

`flipOn` - Trigger for flipping - `click | hover | none`. If you are using the modifier, this parameter should be passed as a positional param.

`vertical` - Flips card vertically if `true`. Defaults to `false`

`flipDuration` - Duration for the flip in ms. Defaults to `600`. Separate durations for the front card and back card may be speficied, but the transition may not be smooth.

`flipped` - Prop to manually flip the card. It is recommended to not combine this with `flipOn` unless `flipOn` is set to `none`

Credits
------------------------------------------------------------------------------

Styles have mostly been ported from [David Walsh's blog](https://davidwalsh.name/css-flip)

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
