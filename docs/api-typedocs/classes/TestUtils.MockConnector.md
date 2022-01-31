[eth-hooks - v4.0.27](../README.md) / [TestUtils](../modules/TestUtils.md) / MockConnector

# Class: MockConnector

[TestUtils](../modules/TestUtils.md).MockConnector

## Hierarchy

- `AbstractConnector`

  ↳ **`MockConnector`**

## Implements

- [`ICommonModalConnector`](../interfaces/EthersContext.ICommonModalConnector.md)

## Table of contents

### Methods

- [once](TestUtils.MockConnector.md#once)
- [on](TestUtils.MockConnector.md#on)
- [listenerCount](TestUtils.MockConnector.md#listenercount)
- [getEventListeners](TestUtils.MockConnector.md#geteventlisteners)
- [addListener](TestUtils.MockConnector.md#addlistener)
- [on](TestUtils.MockConnector.md#on)
- [once](TestUtils.MockConnector.md#once)
- [removeListener](TestUtils.MockConnector.md#removelistener)
- [off](TestUtils.MockConnector.md#off)
- [removeAllListeners](TestUtils.MockConnector.md#removealllisteners)
- [setMaxListeners](TestUtils.MockConnector.md#setmaxlisteners)
- [getMaxListeners](TestUtils.MockConnector.md#getmaxlisteners)
- [listeners](TestUtils.MockConnector.md#listeners)
- [rawListeners](TestUtils.MockConnector.md#rawlisteners)
- [emit](TestUtils.MockConnector.md#emit)
- [listenerCount](TestUtils.MockConnector.md#listenercount)
- [prependListener](TestUtils.MockConnector.md#prependlistener)
- [prependOnceListener](TestUtils.MockConnector.md#prependoncelistener)
- [eventNames](TestUtils.MockConnector.md#eventnames)
- [emitUpdate](TestUtils.MockConnector.md#emitupdate)
- [emitError](TestUtils.MockConnector.md#emiterror)
- [emitDeactivate](TestUtils.MockConnector.md#emitdeactivate)
- [replaceWithSpies](TestUtils.MockConnector.md#replacewithspies)
- [hasCachedProvider](TestUtils.MockConnector.md#hascachedprovider)
- [getSigner](TestUtils.MockConnector.md#getsigner)
- [setModalTheme](TestUtils.MockConnector.md#setmodaltheme)
- [resetModal](TestUtils.MockConnector.md#resetmodal)
- [changeSigner](TestUtils.MockConnector.md#changesigner)
- [activate](TestUtils.MockConnector.md#activate)
- [getProvider](TestUtils.MockConnector.md#getprovider)
- [getChainId](TestUtils.MockConnector.md#getchainid)
- [getAccount](TestUtils.MockConnector.md#getaccount)
- [setMockAccount](TestUtils.MockConnector.md#setmockaccount)
- [deactivate](TestUtils.MockConnector.md#deactivate)

### Properties

- [errorMonitor](TestUtils.MockConnector.md#errormonitor)
- [captureRejectionSymbol](TestUtils.MockConnector.md#capturerejectionsymbol)
- [captureRejections](TestUtils.MockConnector.md#capturerejections)
- [defaultMaxListeners](TestUtils.MockConnector.md#defaultmaxlisteners)
- [supportedChainIds](TestUtils.MockConnector.md#supportedchainids)
- [provider](TestUtils.MockConnector.md#provider)
- [mockChainId](TestUtils.MockConnector.md#mockchainid)
- [mockSigner](TestUtils.MockConnector.md#mocksigner)
- [mockAccount](TestUtils.MockConnector.md#mockaccount)
- [spyResetModal](TestUtils.MockConnector.md#spyresetmodal)
- [spySetModalTheme](TestUtils.MockConnector.md#spysetmodaltheme)
- [spyChangeSigner](TestUtils.MockConnector.md#spychangesigner)
- [spyActivate](TestUtils.MockConnector.md#spyactivate)
- [spyDeactivate](TestUtils.MockConnector.md#spydeactivate)

### Constructors

- [constructor](TestUtils.MockConnector.md#constructor)

## Methods

### once

▸ `Static` **once**(`emitter`, `eventName`, `options?`): `Promise`<`any`[]\>

Creates a `Promise` that is fulfilled when the `EventEmitter` emits the given
event or that is rejected if the `EventEmitter` emits `'error'` while waiting.
The `Promise` will resolve with an array of all the arguments emitted to the
given event.

This method is intentionally generic and works with the web platform [EventTarget](https://dom.spec.whatwg.org/#interface-eventtarget) interface, which has no special`'error'` event
semantics and does not listen to the `'error'` event.

```js
const { once, EventEmitter } = require('events');

async function run() {
  const ee = new EventEmitter();

  process.nextTick(() => {
    ee.emit('myevent', 42);
  });

  const [value] = await once(ee, 'myevent');
  console.log(value);

  const err = new Error('kaboom');
  process.nextTick(() => {
    ee.emit('error', err);
  });

  try {
    await once(ee, 'myevent');
  } catch (err) {
    console.log('error happened', err);
  }
}

run();
```

The special handling of the `'error'` event is only used when `events.once()`is used to wait for another event. If `events.once()` is used to wait for the
'`error'` event itself, then it is treated as any other kind of event without
special handling:

```js
const { EventEmitter, once } = require('events');

const ee = new EventEmitter();

once(ee, 'error')
  .then(([err]) => console.log('ok', err.message))
  .catch((err) => console.log('error', err.message));

ee.emit('error', new Error('boom'));

// Prints: ok boom
```

An `AbortSignal` can be used to cancel waiting for the event:

```js
const { EventEmitter, once } = require('events');

const ee = new EventEmitter();
const ac = new AbortController();

async function foo(emitter, event, signal) {
  try {
    await once(emitter, event, { signal });
    console.log('event emitted!');
  } catch (error) {
    if (error.name === 'AbortError') {
      console.error('Waiting for the event was canceled!');
    } else {
      console.error('There was an error', error.message);
    }
  }
}

foo(ee, 'foo', ac.signal);
ac.abort(); // Abort waiting for the event
ee.emit('foo'); // Prints: Waiting for the event was canceled!
```

**`since`** v11.13.0, v10.16.0

#### Parameters

| Name | Type |
| :------ | :------ |
| `emitter` | `NodeEventTarget` |
| `eventName` | `string` \| `symbol` |
| `options?` | `StaticEventEmitterOptions` |

#### Returns

`Promise`<`any`[]\>

#### Inherited from

AbstractConnector.once

#### Defined in

node_modules/@types/node/events.d.ts:157

▸ `Static` **once**(`emitter`, `eventName`, `options?`): `Promise`<`any`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `emitter` | `DOMEventTarget` |
| `eventName` | `string` |
| `options?` | `StaticEventEmitterOptions` |

#### Returns

`Promise`<`any`[]\>

#### Inherited from

AbstractConnector.once

#### Defined in

node_modules/@types/node/events.d.ts:158

___

### on

▸ `Static` **on**(`emitter`, `eventName`, `options?`): `AsyncIterableIterator`<`any`\>

```js
const { on, EventEmitter } = require('events');

(async () => {
  const ee = new EventEmitter();

  // Emit later on
  process.nextTick(() => {
    ee.emit('foo', 'bar');
    ee.emit('foo', 42);
  });

  for await (const event of on(ee, 'foo')) {
    // The execution of this inner block is synchronous and it
    // processes one event at a time (even with await). Do not use
    // if concurrent execution is required.
    console.log(event); // prints ['bar'] [42]
  }
  // Unreachable here
})();
```

Returns an `AsyncIterator` that iterates `eventName` events. It will throw
if the `EventEmitter` emits `'error'`. It removes all listeners when
exiting the loop. The `value` returned by each iteration is an array
composed of the emitted event arguments.

An `AbortSignal` can be used to cancel waiting on events:

```js
const { on, EventEmitter } = require('events');
const ac = new AbortController();

(async () => {
  const ee = new EventEmitter();

  // Emit later on
  process.nextTick(() => {
    ee.emit('foo', 'bar');
    ee.emit('foo', 42);
  });

  for await (const event of on(ee, 'foo', { signal: ac.signal })) {
    // The execution of this inner block is synchronous and it
    // processes one event at a time (even with await). Do not use
    // if concurrent execution is required.
    console.log(event); // prints ['bar'] [42]
  }
  // Unreachable here
})();

process.nextTick(() => ac.abort());
```

**`since`** v13.6.0, v12.16.0

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `emitter` | `EventEmitter` | - |
| `eventName` | `string` | The name of the event being listened for |
| `options?` | `StaticEventEmitterOptions` | - |

#### Returns

`AsyncIterableIterator`<`any`\>

that iterates `eventName` events emitted by the `emitter`

#### Inherited from

AbstractConnector.on

#### Defined in

node_modules/@types/node/events.d.ts:217

___

### listenerCount

▸ `Static` **listenerCount**(`emitter`, `eventName`): `number`

A class method that returns the number of listeners for the given `eventName`registered on the given `emitter`.

```js
const { EventEmitter, listenerCount } = require('events');
const myEmitter = new EventEmitter();
myEmitter.on('event', () => {});
myEmitter.on('event', () => {});
console.log(listenerCount(myEmitter, 'event'));
// Prints: 2
```

**`since`** v0.9.12

**`deprecated`** Since v3.2.0 - Use `listenerCount` instead.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `emitter` | `EventEmitter` | The emitter to query |
| `eventName` | `string` \| `symbol` | The event name |

#### Returns

`number`

#### Inherited from

AbstractConnector.listenerCount

#### Defined in

node_modules/@types/node/events.d.ts:234

___

### getEventListeners

▸ `Static` **getEventListeners**(`emitter`, `name`): `Function`[]

Returns a copy of the array of listeners for the event named `eventName`.

For `EventEmitter`s this behaves exactly the same as calling `.listeners` on
the emitter.

For `EventTarget`s this is the only way to get the event listeners for the
event target. This is useful for debugging and diagnostic purposes.

```js
const { getEventListeners, EventEmitter } = require('events');

{
  const ee = new EventEmitter();
  const listener = () => console.log('Events are fun');
  ee.on('foo', listener);
  getEventListeners(ee, 'foo'); // [listener]
}
{
  const et = new EventTarget();
  const listener = () => console.log('Events are fun');
  et.addEventListener('foo', listener);
  getEventListeners(et, 'foo'); // [listener]
}
```

**`since`** v15.2.0

#### Parameters

| Name | Type |
| :------ | :------ |
| `emitter` | `DOMEventTarget` \| `EventEmitter` |
| `name` | `string` \| `symbol` |

#### Returns

`Function`[]

#### Inherited from

AbstractConnector.getEventListeners

#### Defined in

node_modules/@types/node/events.d.ts:262

___

### addListener

▸ **addListener**(`eventName`, `listener`): [`MockConnector`](TestUtils.MockConnector.md)

Alias for `emitter.on(eventName, listener)`.

**`since`** v0.1.26

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`MockConnector`](TestUtils.MockConnector.md)

#### Inherited from

AbstractConnector.addListener

#### Defined in

node_modules/@types/node/events.d.ts:299

___

### on

▸ **on**(`eventName`, `listener`): [`MockConnector`](TestUtils.MockConnector.md)

Adds the `listener` function to the end of the listeners array for the
event named `eventName`. No checks are made to see if the `listener` has
already been added. Multiple calls passing the same combination of `eventName`and `listener` will result in the `listener` being added, and called, multiple
times.

```js
server.on('connection', (stream) => {
  console.log('someone connected!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

By default, event listeners are invoked in the order they are added. The`emitter.prependListener()` method can be used as an alternative to add the
event listener to the beginning of the listeners array.

```js
const myEE = new EventEmitter();
myEE.on('foo', () => console.log('a'));
myEE.prependListener('foo', () => console.log('b'));
myEE.emit('foo');
// Prints:
//   b
//   a
```

**`since`** v0.1.101

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event. |
| `listener` | (...`args`: `any`[]) => `void` | The callback function |

#### Returns

[`MockConnector`](TestUtils.MockConnector.md)

#### Inherited from

AbstractConnector.on

#### Defined in

node_modules/@types/node/events.d.ts:330

___

### once

▸ **once**(`eventName`, `listener`): [`MockConnector`](TestUtils.MockConnector.md)

Adds a **one-time**`listener` function for the event named `eventName`. The
next time `eventName` is triggered, this listener is removed and then invoked.

```js
server.once('connection', (stream) => {
  console.log('Ah, we have our first user!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

By default, event listeners are invoked in the order they are added. The`emitter.prependOnceListener()` method can be used as an alternative to add the
event listener to the beginning of the listeners array.

```js
const myEE = new EventEmitter();
myEE.once('foo', () => console.log('a'));
myEE.prependOnceListener('foo', () => console.log('b'));
myEE.emit('foo');
// Prints:
//   b
//   a
```

**`since`** v0.3.0

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event. |
| `listener` | (...`args`: `any`[]) => `void` | The callback function |

#### Returns

[`MockConnector`](TestUtils.MockConnector.md)

#### Inherited from

AbstractConnector.once

#### Defined in

node_modules/@types/node/events.d.ts:359

___

### removeListener

▸ **removeListener**(`eventName`, `listener`): [`MockConnector`](TestUtils.MockConnector.md)

Removes the specified `listener` from the listener array for the event named`eventName`.

```js
const callback = (stream) => {
  console.log('someone connected!');
};
server.on('connection', callback);
// ...
server.removeListener('connection', callback);
```

`removeListener()` will remove, at most, one instance of a listener from the
listener array. If any single listener has been added multiple times to the
listener array for the specified `eventName`, then `removeListener()` must be
called multiple times to remove each instance.

Once an event is emitted, all listeners attached to it at the
time of emitting are called in order. This implies that any`removeListener()` or `removeAllListeners()` calls _after_ emitting and_before_ the last listener finishes execution will
not remove them from`emit()` in progress. Subsequent events behave as expected.

```js
const myEmitter = new MyEmitter();

const callbackA = () => {
  console.log('A');
  myEmitter.removeListener('event', callbackB);
};

const callbackB = () => {
  console.log('B');
};

myEmitter.on('event', callbackA);

myEmitter.on('event', callbackB);

// callbackA removes listener callbackB but it will still be called.
// Internal listener array at time of emit [callbackA, callbackB]
myEmitter.emit('event');
// Prints:
//   A
//   B

// callbackB is now removed.
// Internal listener array [callbackA]
myEmitter.emit('event');
// Prints:
//   A
```

Because listeners are managed using an internal array, calling this will
change the position indices of any listener registered _after_ the listener
being removed. This will not impact the order in which listeners are called,
but it means that any copies of the listener array as returned by
the `emitter.listeners()` method will need to be recreated.

When a single function has been added as a handler multiple times for a single
event (as in the example below), `removeListener()` will remove the most
recently added instance. In the example the `once('ping')`listener is removed:

```js
const ee = new EventEmitter();

function pong() {
  console.log('pong');
}

ee.on('ping', pong);
ee.once('ping', pong);
ee.removeListener('ping', pong);

ee.emit('ping');
ee.emit('ping');
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

**`since`** v0.1.26

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`MockConnector`](TestUtils.MockConnector.md)

#### Inherited from

AbstractConnector.removeListener

#### Defined in

node_modules/@types/node/events.d.ts:439

___

### off

▸ **off**(`eventName`, `listener`): [`MockConnector`](TestUtils.MockConnector.md)

Alias for `emitter.removeListener()`.

**`since`** v10.0.0

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`MockConnector`](TestUtils.MockConnector.md)

#### Inherited from

AbstractConnector.off

#### Defined in

node_modules/@types/node/events.d.ts:444

___

### removeAllListeners

▸ **removeAllListeners**(`event?`): [`MockConnector`](TestUtils.MockConnector.md)

Removes all listeners, or those of the specified `eventName`.

It is bad practice to remove listeners added elsewhere in the code,
particularly when the `EventEmitter` instance was created by some other
component or module (e.g. sockets or file streams).

Returns a reference to the `EventEmitter`, so that calls can be chained.

**`since`** v0.1.26

#### Parameters

| Name | Type |
| :------ | :------ |
| `event?` | `string` \| `symbol` |

#### Returns

[`MockConnector`](TestUtils.MockConnector.md)

#### Inherited from

AbstractConnector.removeAllListeners

#### Defined in

node_modules/@types/node/events.d.ts:455

___

### setMaxListeners

▸ **setMaxListeners**(`n`): [`MockConnector`](TestUtils.MockConnector.md)

By default `EventEmitter`s will print a warning if more than `10` listeners are
added for a particular event. This is a useful default that helps finding
memory leaks. The `emitter.setMaxListeners()` method allows the limit to be
modified for this specific `EventEmitter` instance. The value can be set to`Infinity` (or `0`) to indicate an unlimited number of listeners.

Returns a reference to the `EventEmitter`, so that calls can be chained.

**`since`** v0.3.5

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

[`MockConnector`](TestUtils.MockConnector.md)

#### Inherited from

AbstractConnector.setMaxListeners

#### Defined in

node_modules/@types/node/events.d.ts:465

___

### getMaxListeners

▸ **getMaxListeners**(): `number`

Returns the current max listener value for the `EventEmitter` which is either
set by `emitter.setMaxListeners(n)` or defaults to [defaultMaxListeners](TestUtils.MockConnector.md#defaultmaxlisteners).

**`since`** v1.0.0

#### Returns

`number`

#### Inherited from

AbstractConnector.getMaxListeners

#### Defined in

node_modules/@types/node/events.d.ts:471

___

### listeners

▸ **listeners**(`eventName`): `Function`[]

Returns a copy of the array of listeners for the event named `eventName`.

```js
server.on('connection', (stream) => {
  console.log('someone connected!');
});
console.log(util.inspect(server.listeners('connection')));
// Prints: [ [Function] ]
```

**`since`** v0.1.26

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |

#### Returns

`Function`[]

#### Inherited from

AbstractConnector.listeners

#### Defined in

node_modules/@types/node/events.d.ts:484

___

### rawListeners

▸ **rawListeners**(`eventName`): `Function`[]

Returns a copy of the array of listeners for the event named `eventName`,
including any wrappers (such as those created by `.once()`).

```js
const emitter = new EventEmitter();
emitter.once('log', () => console.log('log once'));

// Returns a new Array with a function `onceWrapper` which has a property
// `listener` which contains the original listener bound above
const listeners = emitter.rawListeners('log');
const logFnWrapper = listeners[0];

// Logs "log once" to the console and does not unbind the `once` event
logFnWrapper.listener();

// Logs "log once" to the console and removes the listener
logFnWrapper();

emitter.on('log', () => console.log('log persistently'));
// Will return a new Array with a single function bound by `.on()` above
const newListeners = emitter.rawListeners('log');

// Logs "log persistently" twice
newListeners[0]();
emitter.emit('log');
```

**`since`** v9.4.0

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |

#### Returns

`Function`[]

#### Inherited from

AbstractConnector.rawListeners

#### Defined in

node_modules/@types/node/events.d.ts:514

___

### emit

▸ **emit**(`eventName`, ...`args`): `boolean`

Synchronously calls each of the listeners registered for the event named`eventName`, in the order they were registered, passing the supplied arguments
to each.

Returns `true` if the event had listeners, `false` otherwise.

```js
const EventEmitter = require('events');
const myEmitter = new EventEmitter();

// First listener
myEmitter.on('event', function firstListener() {
  console.log('Helloooo! first listener');
});
// Second listener
myEmitter.on('event', function secondListener(arg1, arg2) {
  console.log(`event with parameters ${arg1}, ${arg2} in second listener`);
});
// Third listener
myEmitter.on('event', function thirdListener(...args) {
  const parameters = args.join(', ');
  console.log(`event with parameters ${parameters} in third listener`);
});

console.log(myEmitter.listeners('event'));

myEmitter.emit('event', 1, 2, 3, 4, 5);

// Prints:
// [
//   [Function: firstListener],
//   [Function: secondListener],
//   [Function: thirdListener]
// ]
// Helloooo! first listener
// event with parameters 1, 2 in second listener
// event with parameters 1, 2, 3, 4, 5 in third listener
```

**`since`** v0.1.26

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `...args` | `any`[] |

#### Returns

`boolean`

#### Inherited from

AbstractConnector.emit

#### Defined in

node_modules/@types/node/events.d.ts:555

___

### listenerCount

▸ **listenerCount**(`eventName`): `number`

Returns the number of listeners listening to the event named `eventName`.

**`since`** v3.2.0

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event being listened for |

#### Returns

`number`

#### Inherited from

AbstractConnector.listenerCount

#### Defined in

node_modules/@types/node/events.d.ts:561

___

### prependListener

▸ **prependListener**(`eventName`, `listener`): [`MockConnector`](TestUtils.MockConnector.md)

Adds the `listener` function to the _beginning_ of the listeners array for the
event named `eventName`. No checks are made to see if the `listener` has
already been added. Multiple calls passing the same combination of `eventName`and `listener` will result in the `listener` being added, and called, multiple
times.

```js
server.prependListener('connection', (stream) => {
  console.log('someone connected!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

**`since`** v6.0.0

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event. |
| `listener` | (...`args`: `any`[]) => `void` | The callback function |

#### Returns

[`MockConnector`](TestUtils.MockConnector.md)

#### Inherited from

AbstractConnector.prependListener

#### Defined in

node_modules/@types/node/events.d.ts:579

___

### prependOnceListener

▸ **prependOnceListener**(`eventName`, `listener`): [`MockConnector`](TestUtils.MockConnector.md)

Adds a **one-time**`listener` function for the event named `eventName` to the_beginning_ of the listeners array. The next time `eventName` is triggered, this
listener is removed, and then invoked.

```js
server.prependOnceListener('connection', (stream) => {
  console.log('Ah, we have our first user!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

**`since`** v6.0.0

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event. |
| `listener` | (...`args`: `any`[]) => `void` | The callback function |

#### Returns

[`MockConnector`](TestUtils.MockConnector.md)

#### Inherited from

AbstractConnector.prependOnceListener

#### Defined in

node_modules/@types/node/events.d.ts:595

___

### eventNames

▸ **eventNames**(): (`string` \| `symbol`)[]

Returns an array listing the events for which the emitter has registered
listeners. The values in the array are strings or `Symbol`s.

```js
const EventEmitter = require('events');
const myEE = new EventEmitter();
myEE.on('foo', () => {});
myEE.on('bar', () => {});

const sym = Symbol('symbol');
myEE.on(sym, () => {});

console.log(myEE.eventNames());
// Prints: [ 'foo', 'bar', Symbol(symbol) ]
```

**`since`** v6.0.0

#### Returns

(`string` \| `symbol`)[]

#### Inherited from

AbstractConnector.eventNames

#### Defined in

node_modules/@types/node/events.d.ts:614

___

### emitUpdate

▸ `Protected` **emitUpdate**(`update`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `update` | `ConnectorUpdate`<`string` \| `number`\> |

#### Returns

`void`

#### Inherited from

AbstractConnector.emitUpdate

#### Defined in

node_modules/@web3-react/core/node_modules/@web3-react/abstract-connector/dist/index.d.ts:12

___

### emitError

▸ `Protected` **emitError**(`error`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `Error` |

#### Returns

`void`

#### Inherited from

AbstractConnector.emitError

#### Defined in

node_modules/@web3-react/core/node_modules/@web3-react/abstract-connector/dist/index.d.ts:13

___

### emitDeactivate

▸ `Protected` **emitDeactivate**(): `void`

#### Returns

`void`

#### Inherited from

AbstractConnector.emitDeactivate

#### Defined in

node_modules/@web3-react/core/node_modules/@web3-react/abstract-connector/dist/index.d.ts:14

___

### replaceWithSpies

▸ **replaceWithSpies**(): `void`

#### Returns

`void`

#### Defined in

[src/helpers/test-utils/wrapper/MockConnector.ts:33](https://github.com/scaffold-eth/eth-hooks/blob/3bb312e/src/helpers/test-utils/wrapper/MockConnector.ts#L33)

___

### hasCachedProvider

▸ **hasCachedProvider**(): `boolean`

#### Returns

`boolean`

#### Implementation of

[ICommonModalConnector](../interfaces/EthersContext.ICommonModalConnector.md).[hasCachedProvider](../interfaces/EthersContext.ICommonModalConnector.md#hascachedprovider)

#### Defined in

[src/helpers/test-utils/wrapper/MockConnector.ts:39](https://github.com/scaffold-eth/eth-hooks/blob/3bb312e/src/helpers/test-utils/wrapper/MockConnector.ts#L39)

___

### getSigner

▸ **getSigner**(): `undefined` \| `Signer`

#### Returns

`undefined` \| `Signer`

#### Implementation of

[ICommonModalConnector](../interfaces/EthersContext.ICommonModalConnector.md).[getSigner](../interfaces/EthersContext.ICommonModalConnector.md#getsigner)

#### Defined in

[src/helpers/test-utils/wrapper/MockConnector.ts:43](https://github.com/scaffold-eth/eth-hooks/blob/3bb312e/src/helpers/test-utils/wrapper/MockConnector.ts#L43)

___

### setModalTheme

▸ **setModalTheme**(`_theme`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `_theme` | ``"light"`` \| ``"dark"`` \| `ThemeColors` |

#### Returns

`void`

#### Implementation of

[ICommonModalConnector](../interfaces/EthersContext.ICommonModalConnector.md).[setModalTheme](../interfaces/EthersContext.ICommonModalConnector.md#setmodaltheme)

#### Defined in

[src/helpers/test-utils/wrapper/MockConnector.ts:46](https://github.com/scaffold-eth/eth-hooks/blob/3bb312e/src/helpers/test-utils/wrapper/MockConnector.ts#L46)

___

### resetModal

▸ **resetModal**(): `void`

#### Returns

`void`

#### Implementation of

[ICommonModalConnector](../interfaces/EthersContext.ICommonModalConnector.md).[resetModal](../interfaces/EthersContext.ICommonModalConnector.md#resetmodal)

#### Defined in

[src/helpers/test-utils/wrapper/MockConnector.ts:49](https://github.com/scaffold-eth/eth-hooks/blob/3bb312e/src/helpers/test-utils/wrapper/MockConnector.ts#L49)

___

### changeSigner

▸ **changeSigner**(`_signer`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_signer` | `Signer` |

#### Returns

`Promise`<`void`\>

#### Implementation of

[ICommonModalConnector](../interfaces/EthersContext.ICommonModalConnector.md).[changeSigner](../interfaces/EthersContext.ICommonModalConnector.md#changesigner)

#### Defined in

[src/helpers/test-utils/wrapper/MockConnector.ts:53](https://github.com/scaffold-eth/eth-hooks/blob/3bb312e/src/helpers/test-utils/wrapper/MockConnector.ts#L53)

___

### activate

▸ **activate**(): `Promise`<`ConnectorUpdate`<`string` \| `number`\>\>

#### Returns

`Promise`<`ConnectorUpdate`<`string` \| `number`\>\>

#### Overrides

AbstractConnector.activate

#### Defined in

[src/helpers/test-utils/wrapper/MockConnector.ts:61](https://github.com/scaffold-eth/eth-hooks/blob/3bb312e/src/helpers/test-utils/wrapper/MockConnector.ts#L61)

___

### getProvider

▸ **getProvider**(): `Promise`<[`TEthersProvider`](../modules/Models.md#tethersprovider) \| `MockProvider`\>

#### Returns

`Promise`<[`TEthersProvider`](../modules/Models.md#tethersprovider) \| `MockProvider`\>

#### Overrides

AbstractConnector.getProvider

#### Defined in

[src/helpers/test-utils/wrapper/MockConnector.ts:69](https://github.com/scaffold-eth/eth-hooks/blob/3bb312e/src/helpers/test-utils/wrapper/MockConnector.ts#L69)

___

### getChainId

▸ **getChainId**(): `Promise`<`number`\>

#### Returns

`Promise`<`number`\>

#### Overrides

AbstractConnector.getChainId

#### Defined in

[src/helpers/test-utils/wrapper/MockConnector.ts:73](https://github.com/scaffold-eth/eth-hooks/blob/3bb312e/src/helpers/test-utils/wrapper/MockConnector.ts#L73)

___

### getAccount

▸ **getAccount**(): `Promise`<`string`\>

#### Returns

`Promise`<`string`\>

#### Overrides

AbstractConnector.getAccount

#### Defined in

[src/helpers/test-utils/wrapper/MockConnector.ts:77](https://github.com/scaffold-eth/eth-hooks/blob/3bb312e/src/helpers/test-utils/wrapper/MockConnector.ts#L77)

___

### setMockAccount

▸ **setMockAccount**(`hardhatAccountIndex`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `hardhatAccountIndex` | `number` |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/helpers/test-utils/wrapper/MockConnector.ts:82](https://github.com/scaffold-eth/eth-hooks/blob/3bb312e/src/helpers/test-utils/wrapper/MockConnector.ts#L82)

___

### deactivate

▸ **deactivate**(): `void`

#### Returns

`void`

#### Overrides

AbstractConnector.deactivate

#### Defined in

[src/helpers/test-utils/wrapper/MockConnector.ts:87](https://github.com/scaffold-eth/eth-hooks/blob/3bb312e/src/helpers/test-utils/wrapper/MockConnector.ts#L87)

## Properties

### errorMonitor

▪ `Static` `Readonly` **errorMonitor**: typeof [`errorMonitor`](EthersContext.EthersModalConnector.md#errormonitor)

This symbol shall be used to install a listener for only monitoring `'error'`
events. Listeners installed using this symbol are called before the regular
`'error'` listeners are called.

Installing a listener using this symbol does not change the behavior once an
`'error'` event is emitted, therefore the process will still crash if no
regular `'error'` listener is installed.

#### Inherited from

AbstractConnector.errorMonitor

#### Defined in

node_modules/@types/node/events.d.ts:272

___

### captureRejectionSymbol

▪ `Static` `Readonly` **captureRejectionSymbol**: typeof [`captureRejectionSymbol`](EthersContext.EthersModalConnector.md#capturerejectionsymbol)

#### Inherited from

AbstractConnector.captureRejectionSymbol

#### Defined in

node_modules/@types/node/events.d.ts:273

___

### captureRejections

▪ `Static` **captureRejections**: `boolean`

Sets or gets the default captureRejection value for all emitters.

#### Inherited from

AbstractConnector.captureRejections

#### Defined in

node_modules/@types/node/events.d.ts:278

___

### defaultMaxListeners

▪ `Static` **defaultMaxListeners**: `number`

#### Inherited from

AbstractConnector.defaultMaxListeners

#### Defined in

node_modules/@types/node/events.d.ts:279

___

### supportedChainIds

• `Optional` `Readonly` **supportedChainIds**: `number`[]

#### Inherited from

AbstractConnector.supportedChainIds

#### Defined in

node_modules/@web3-react/core/node_modules/@web3-react/abstract-connector/dist/index.d.ts:5

___

### provider

• `Protected` **provider**: `MockProvider`

#### Defined in

[src/helpers/test-utils/wrapper/MockConnector.ts:14](https://github.com/scaffold-eth/eth-hooks/blob/3bb312e/src/helpers/test-utils/wrapper/MockConnector.ts#L14)

___

### mockChainId

• `Protected` **mockChainId**: `number`

#### Defined in

[src/helpers/test-utils/wrapper/MockConnector.ts:15](https://github.com/scaffold-eth/eth-hooks/blob/3bb312e/src/helpers/test-utils/wrapper/MockConnector.ts#L15)

___

### mockSigner

• `Protected` **mockSigner**: `undefined` \| `Signer`

#### Defined in

[src/helpers/test-utils/wrapper/MockConnector.ts:17](https://github.com/scaffold-eth/eth-hooks/blob/3bb312e/src/helpers/test-utils/wrapper/MockConnector.ts#L17)

___

### mockAccount

• `Protected` **mockAccount**: `undefined` \| `string`

#### Defined in

[src/helpers/test-utils/wrapper/MockConnector.ts:18](https://github.com/scaffold-eth/eth-hooks/blob/3bb312e/src/helpers/test-utils/wrapper/MockConnector.ts#L18)

___

### spyResetModal

• **spyResetModal**: `SinonStub`<[], `void`\>

#### Defined in

[src/helpers/test-utils/wrapper/MockConnector.ts:20](https://github.com/scaffold-eth/eth-hooks/blob/3bb312e/src/helpers/test-utils/wrapper/MockConnector.ts#L20)

___

### spySetModalTheme

• **spySetModalTheme**: `SinonStub`<[\_theme: "light" \| "dark" \| ThemeColors], `void`\>

#### Defined in

[src/helpers/test-utils/wrapper/MockConnector.ts:21](https://github.com/scaffold-eth/eth-hooks/blob/3bb312e/src/helpers/test-utils/wrapper/MockConnector.ts#L21)

___

### spyChangeSigner

• **spyChangeSigner**: `SinonStub`<[\_signer: Signer], `Promise`<`void`\>\>

#### Defined in

[src/helpers/test-utils/wrapper/MockConnector.ts:22](https://github.com/scaffold-eth/eth-hooks/blob/3bb312e/src/helpers/test-utils/wrapper/MockConnector.ts#L22)

___

### spyActivate

• **spyActivate**: `SinonStub`<`any`[], `any`\>

#### Defined in

[src/helpers/test-utils/wrapper/MockConnector.ts:23](https://github.com/scaffold-eth/eth-hooks/blob/3bb312e/src/helpers/test-utils/wrapper/MockConnector.ts#L23)

___

### spyDeactivate

• **spyDeactivate**: `SinonStub`<`any`[], `any`\>

#### Defined in

[src/helpers/test-utils/wrapper/MockConnector.ts:24](https://github.com/scaffold-eth/eth-hooks/blob/3bb312e/src/helpers/test-utils/wrapper/MockConnector.ts#L24)

## Constructors

### constructor

• **new MockConnector**(`provider`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `provider` | `MockProvider` |

#### Overrides

AbstractConnector.constructor

#### Defined in

[src/helpers/test-utils/wrapper/MockConnector.ts:26](https://github.com/scaffold-eth/eth-hooks/blob/3bb312e/src/helpers/test-utils/wrapper/MockConnector.ts#L26)
