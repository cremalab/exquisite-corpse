# CorpseDrawings

This plugin exposes an endpoint to add an _existing Drawing_ to a Corpse. Just make a `POST` to `/corpses/{corpseId}/drawings` with a payload of:

```js
{
  drawing: 'drawingId', // required
  section: 'sectionId', // optional. If not specified, will use the section ID stored in the drawing
}
```

This will _copy_ the Drawing's attributes to the Corpse object in the `corpses` collection at its specified section attribute.
