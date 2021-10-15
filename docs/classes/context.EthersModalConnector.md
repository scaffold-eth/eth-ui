[eth-hooks - v3.2.0beta09](../README.md) / [Modules](../modules.md) / [context](../modules/context.md) / EthersModalConnector

# Class: EthersModalConnector

[context](../modules/context.md).EthersModalConnector

## Hierarchy

- `AbstractConnector`

  ↳ **`EthersModalConnector`**

## Table of contents

### Methods

- [once](context.EthersModalConnector.md#once)
- [on](context.EthersModalConnector.md#on)
- [listenerCount](context.EthersModalConnector.md#listenercount)
- [getEventListeners](context.EthersModalConnector.md#geteventlisteners)
- [addListener](context.EthersModalConnector.md#addlistener)
- [on](context.EthersModalConnector.md#on)
- [once](context.EthersModalConnector.md#once)
- [removeListener](context.EthersModalConnector.md#removelistener)
- [off](context.EthersModalConnector.md#off)
- [removeAllListeners](context.EthersModalConnector.md#removealllisteners)
- [setMaxListeners](context.EthersModalConnector.md#setmaxlisteners)
- [getMaxListeners](context.EthersModalConnector.md#getmaxlisteners)
- [listeners](context.EthersModalConnector.md#listeners)
- [rawListeners](context.EthersModalConnector.md#rawlisteners)
- [emit](context.EthersModalConnector.md#emit)
- [listenerCount](context.EthersModalConnector.md#listenercount)
- [prependListener](context.EthersModalConnector.md#prependlistener)
- [prependOnceListener](context.EthersModalConnector.md#prependoncelistener)
- [eventNames](context.EthersModalConnector.md#eventnames)
- [emitUpdate](context.EthersModalConnector.md#emitupdate)
- [emitError](context.EthersModalConnector.md#emiterror)
- [emitDeactivate](context.EthersModalConnector.md#emitdeactivate)
- [load](context.EthersModalConnector.md#load)
- [activate](context.EthersModalConnector.md#activate)
- [deactivate](context.EthersModalConnector.md#deactivate)
- [getProvider](context.EthersModalConnector.md#getprovider)
- [getChainId](context.EthersModalConnector.md#getchainid)
- [getAccount](context.EthersModalConnector.md#getaccount)
- [getSigner](context.EthersModalConnector.md#getsigner)
- [changeSigner](context.EthersModalConnector.md#changesigner)
- [validState](context.EthersModalConnector.md#validstate)
- [resetModal](context.EthersModalConnector.md#resetmodal)
- [setModalTheme](context.EthersModalConnector.md#setmodaltheme)

### Properties

- [errorMonitor](context.EthersModalConnector.md#errormonitor)
- [captureRejectionSymbol](context.EthersModalConnector.md#capturerejectionsymbol)
- [captureRejections](context.EthersModalConnector.md#capturerejections)
- [defaultMaxListeners](context.EthersModalConnector.md#defaultmaxlisteners)
- [supportedChainIds](context.EthersModalConnector.md#supportedchainids)
- [options](context.EthersModalConnector.md#options)
- [providerBase](context.EthersModalConnector.md#providerbase)
- [ethersProvider](context.EthersModalConnector.md#ethersprovider)
- [web3Modal](context.EthersModalConnector.md#web3modal)
- [id](context.EthersModalConnector.md#id)
- [debug](context.EthersModalConnector.md#debug)
- [config](context.EthersModalConnector.md#config)
- [signer](context.EthersModalConnector.md#signer)
- [theme](context.EthersModalConnector.md#theme)

### Constructors

- [constructor](context.EthersModalConnector.md#constructor)

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

▸ **addListener**(`eventName`, `listener`): [`EthersModalConnector`](context.EthersModalConnector.md)

Alias for `emitter.on(eventName, listener)`.

**`since`** v0.1.26

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`EthersModalConnector`](context.EthersModalConnector.md)

#### Inherited from

AbstractConnector.addListener

#### Defined in

node_modules/@types/node/events.d.ts:299

___

### on

▸ **on**(`eventName`, `listener`): [`EthersModalConnector`](context.EthersModalConnector.md)

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

[`EthersModalConnector`](context.EthersModalConnector.md)

#### Inherited from

AbstractConnector.on

#### Defined in

node_modules/@types/node/events.d.ts:330

___

### once

▸ **once**(`eventName`, `listener`): [`EthersModalConnector`](context.EthersModalConnector.md)

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

[`EthersModalConnector`](context.EthersModalConnector.md)

#### Inherited from

AbstractConnector.once

#### Defined in

node_modules/@types/node/events.d.ts:359

___

### removeListener

▸ **removeListener**(`eventName`, `listener`): [`EthersModalConnector`](context.EthersModalConnector.md)

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

[`EthersModalConnector`](context.EthersModalConnector.md)

#### Inherited from

AbstractConnector.removeListener

#### Defined in

node_modules/@types/node/events.d.ts:439

___

### off

▸ **off**(`eventName`, `listener`): [`EthersModalConnector`](context.EthersModalConnector.md)

Alias for `emitter.removeListener()`.

**`since`** v10.0.0

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`EthersModalConnector`](context.EthersModalConnector.md)

#### Inherited from

AbstractConnector.off

#### Defined in

node_modules/@types/node/events.d.ts:444

___

### removeAllListeners

▸ **removeAllListeners**(`event?`): [`EthersModalConnector`](context.EthersModalConnector.md)

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

[`EthersModalConnector`](context.EthersModalConnector.md)

#### Inherited from

AbstractConnector.removeAllListeners

#### Defined in

node_modules/@types/node/events.d.ts:455

___

### setMaxListeners

▸ **setMaxListeners**(`n`): [`EthersModalConnector`](context.EthersModalConnector.md)

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

[`EthersModalConnector`](context.EthersModalConnector.md)

#### Inherited from

AbstractConnector.setMaxListeners

#### Defined in

node_modules/@types/node/events.d.ts:465

___

### getMaxListeners

▸ **getMaxListeners**(): `number`

Returns the current max listener value for the `EventEmitter` which is either
set by `emitter.setMaxListeners(n)` or defaults to [defaultMaxListeners](context.EthersModalConnector.md#defaultmaxlisteners).

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

▸ **prependListener**(`eventName`, `listener`): [`EthersModalConnector`](context.EthersModalConnector.md)

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

[`EthersModalConnector`](context.EthersModalConnector.md)

#### Inherited from

AbstractConnector.prependListener

#### Defined in

node_modules/@types/node/events.d.ts:579

___

### prependOnceListener

▸ **prependOnceListener**(`eventName`, `listener`): [`EthersModalConnector`](context.EthersModalConnector.md)

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

[`EthersModalConnector`](context.EthersModalConnector.md)

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

node_modules/@web3-react/abstract-connector/dist/index.d.ts:12

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

node_modules/@web3-react/abstract-connector/dist/index.d.ts:13

___

### emitDeactivate

▸ `Protected` **emitDeactivate**(): `void`

#### Returns

`void`

#### Inherited from

AbstractConnector.emitDeactivate

#### Defined in

node_modules/@web3-react/abstract-connector/dist/index.d.ts:14

___

### load

▸ **load**(): `void`

#### Returns

`void`

#### Defined in

[src/context/connectors/EthersModalConnector.ts:103](https://github.com/scaffold-eth/eth-hooks/blob/9f8998d/src/context/connectors/EthersModalConnector.ts#L103)

___

### activate

▸ **activate**(): `Promise`<`ConnectorUpdate`<`string` \| `number`\>\>

#### Returns

`Promise`<`ConnectorUpdate`<`string` \| `number`\>\>

#### Overrides

AbstractConnector.activate

#### Defined in

[src/context/connectors/EthersModalConnector.ts:109](https://github.com/scaffold-eth/eth-hooks/blob/9f8998d/src/context/connectors/EthersModalConnector.ts#L109)

___

### deactivate

▸ **deactivate**(): `void`

#### Returns

`void`

#### Overrides

AbstractConnector.deactivate

#### Defined in

[src/context/connectors/EthersModalConnector.ts:165](https://github.com/scaffold-eth/eth-hooks/blob/9f8998d/src/context/connectors/EthersModalConnector.ts#L165)

___

### getProvider

▸ **getProvider**(): `Promise`<`undefined` \| [`TEthersProvider`](../modules/models.md#tethersprovider)\>

#### Returns

`Promise`<`undefined` \| [`TEthersProvider`](../modules/models.md#tethersprovider)\>

#### Overrides

AbstractConnector.getProvider

#### Defined in

[src/context/connectors/EthersModalConnector.ts:187](https://github.com/scaffold-eth/eth-hooks/blob/9f8998d/src/context/connectors/EthersModalConnector.ts#L187)

___

### getChainId

▸ **getChainId**(): `Promise`<`string` \| `number`\>

#### Returns

`Promise`<`string` \| `number`\>

#### Overrides

AbstractConnector.getChainId

#### Defined in

[src/context/connectors/EthersModalConnector.ts:191](https://github.com/scaffold-eth/eth-hooks/blob/9f8998d/src/context/connectors/EthersModalConnector.ts#L191)

___

### getAccount

▸ **getAccount**(): `Promise`<``null`` \| `string`\>

#### Returns

`Promise`<``null`` \| `string`\>

#### Overrides

AbstractConnector.getAccount

#### Defined in

[src/context/connectors/EthersModalConnector.ts:201](https://github.com/scaffold-eth/eth-hooks/blob/9f8998d/src/context/connectors/EthersModalConnector.ts#L201)

___

### getSigner

▸ **getSigner**(): `undefined` \| `Signer`

#### Returns

`undefined` \| `Signer`

#### Defined in

[src/context/connectors/EthersModalConnector.ts:213](https://github.com/scaffold-eth/eth-hooks/blob/9f8998d/src/context/connectors/EthersModalConnector.ts#L213)

___

### changeSigner

▸ **changeSigner**(`signer`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `signer` | `Signer` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/context/connectors/EthersModalConnector.ts:217](https://github.com/scaffold-eth/eth-hooks/blob/9f8998d/src/context/connectors/EthersModalConnector.ts#L217)

___

### validState

▸ `Protected` **validState**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/context/connectors/EthersModalConnector.ts:225](https://github.com/scaffold-eth/eth-hooks/blob/9f8998d/src/context/connectors/EthersModalConnector.ts#L225)

___

### resetModal

▸ **resetModal**(): `void`

#### Returns

`void`

#### Defined in

[src/context/connectors/EthersModalConnector.ts:229](https://github.com/scaffold-eth/eth-hooks/blob/9f8998d/src/context/connectors/EthersModalConnector.ts#L229)

___

### setModalTheme

▸ **setModalTheme**(`theme`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `theme` | ``"light"`` \| ``"dark"`` |

#### Returns

`void`

#### Defined in

[src/context/connectors/EthersModalConnector.ts:238](https://github.com/scaffold-eth/eth-hooks/blob/9f8998d/src/context/connectors/EthersModalConnector.ts#L238)

## Properties

### errorMonitor

▪ `Static` `Readonly` **errorMonitor**: typeof [`errorMonitor`](context.EthersModalConnector.md#errormonitor)

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

▪ `Static` `Readonly` **captureRejectionSymbol**: typeof [`captureRejectionSymbol`](context.EthersModalConnector.md#capturerejectionsymbol)

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

node_modules/@web3-react/abstract-connector/dist/index.d.ts:5

___

### options

• `Protected` **options**: `Partial`<`ICoreOptions`\>

#### Defined in

[src/context/connectors/EthersModalConnector.ts:34](https://github.com/scaffold-eth/eth-hooks/blob/9f8998d/src/context/connectors/EthersModalConnector.ts#L34)

___

### providerBase

• `Protected` `Optional` **providerBase**: `any`

#### Defined in

[src/context/connectors/EthersModalConnector.ts:35](https://github.com/scaffold-eth/eth-hooks/blob/9f8998d/src/context/connectors/EthersModalConnector.ts#L35)

___

### ethersProvider

• `Protected` `Optional` **ethersProvider**: [`TEthersProvider`](../modules/models.md#tethersprovider)

#### Defined in

[src/context/connectors/EthersModalConnector.ts:36](https://github.com/scaffold-eth/eth-hooks/blob/9f8998d/src/context/connectors/EthersModalConnector.ts#L36)

___

### web3Modal

• `Protected` `Optional` **web3Modal**: `Core`

#### Defined in

[src/context/connectors/EthersModalConnector.ts:37](https://github.com/scaffold-eth/eth-hooks/blob/9f8998d/src/context/connectors/EthersModalConnector.ts#L37)

___

### id

• `Protected` **id**: `undefined` \| `string`

#### Defined in

[src/context/connectors/EthersModalConnector.ts:38](https://github.com/scaffold-eth/eth-hooks/blob/9f8998d/src/context/connectors/EthersModalConnector.ts#L38)

___

### debug

• `Protected` **debug**: `boolean` = `false`

#### Defined in

[src/context/connectors/EthersModalConnector.ts:39](https://github.com/scaffold-eth/eth-hooks/blob/9f8998d/src/context/connectors/EthersModalConnector.ts#L39)

___

### config

• `Protected` **config**: `IEthersModalConfig`

#### Defined in

[src/context/connectors/EthersModalConnector.ts:40](https://github.com/scaffold-eth/eth-hooks/blob/9f8998d/src/context/connectors/EthersModalConnector.ts#L40)

___

### signer

• `Protected` **signer**: `undefined` \| `Signer`

#### Defined in

[src/context/connectors/EthersModalConnector.ts:41](https://github.com/scaffold-eth/eth-hooks/blob/9f8998d/src/context/connectors/EthersModalConnector.ts#L41)

___

### theme

• `Protected` **theme**: `ThemeColors` \| `TWeb3ModalTheme`

#### Defined in

[src/context/connectors/EthersModalConnector.ts:42](https://github.com/scaffold-eth/eth-hooks/blob/9f8998d/src/context/connectors/EthersModalConnector.ts#L42)

## Constructors

### constructor

• **new EthersModalConnector**(`web3modalOptions`, `config`, `id?`, `debug?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `web3modalOptions` | `Partial`<`ICoreOptions`\> | `undefined` |
| `config` | `IEthersModalConfig` | `undefined` |
| `id?` | `string` | `undefined` |
| `debug` | `boolean` | `false` |

#### Overrides

AbstractConnector.constructor

#### Defined in

[src/context/connectors/EthersModalConnector.ts:44](https://github.com/scaffold-eth/eth-hooks/blob/9f8998d/src/context/connectors/EthersModalConnector.ts#L44)
