# CorpseCleaner

### Purpose
Free up drawing slots from users that didn't cancel out of drawing or just plain didn't mean to draw. If you're authenticated as a guest, you've got **2 hours** to finish a drawing from when you started it. If you're authenticated through a different means, you've got a day.

### Configuration
You can pass options to the plugin at registration:

```js
// all times in milliseconds
const options = {
  interval: 60000, // how often CorpseCleaner will clean up
  cleaner: {
    guestWindow: 20 * 60000, // how long a guest has to finish a drawing
    memberWindow: 100 * 60000, // how long a member has to finish a drawing
  },
}
```

### Process
First, all `incomplete` drawings created before the `memberWindow` get their `corpse` attribute removed and their `status` changed to `expired`. Then, all `incomplete` drawings created before the `guestWindow` where the creator has a `guest` provider go through the same process.

Socket events for corpse and lobby subscriptions are broadcast.
