# API documentation  

All methods bellow export from the package.  

And internal implementation based on [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map), so they are similar to the API of `Map.prototype` 

- [set](#set)  
- [get](#get)  
- [wait](#wait)  
- [del](#del)  
- [has](#has)  
- [keys](#keys)  
- [values](#values)  
- [all](#all)  
- [clear](#clear)  
- [size](#size)  
- [namespace](#namespace)  
  

<a name="set"></a>

## set ⇒ <code>void</code>
Set an sign to the default async store,and only this method can trigger `wait`.And second parameter payload used to carry some extra message.The same sign will replace the old one.


| Param | Type |
| --- | --- |
| sign | <code>\*</code> | 
| [payload] | <code>\*</code> | 

**Example**  
```js
wait('foo').then(  () => console.log(`${get('foo')} is ready`))setTimeout() => set('foo', 'bar'), 30)// after 30 ms logs: bar is ready
```
<a name="get"></a>

## get ⇒ <code>\*</code>
Read the supplied sign corresponding payload,if not exist or not been set return `undefined`.


| Param | Type |
| --- | --- |
| sign | <code>\*</code> | 

**Example**  
```js
let obj = {}set('foo', obj)get('foo') === obj // => trueget('bar') // => undefined
```
<a name="wait"></a>

## wait ⇒ <code>Promise.&lt;void&gt;</code>
Check the supplied signs are all been set,when succeed, return a `Promise`, resolve `undefined`.And first set signs, then call this method will also work.


| Param | Type |
| --- | --- |
| ...signs | <code>\*</code> | 

**Example**  
```js
set('foo')set('bar')wait('foo', 'bar').then(  () => console.log('foo, bar is ready') // => logs succeed.)
```
<a name="del"></a>

## del ⇒ <code>boolean</code>
Delete a sign from the store,if not exist will return false, else true.


| Param | Type |
| --- | --- |
| sign | <code>\*</code> | 

**Example**  
```js
set('foo')del('foo') // => truedel('foo') // => false
```
<a name="has"></a>

## has ⇒ <code>boolean</code>
Check the sign whether exist in the store.


| Param | Type |
| --- | --- |
| sign | <code>\*</code> | 

**Example**  
```js
set('foo')has('foo') // => truedel('foo')has('foo') // => false
```
<a name="keys"></a>

## keys ⇒ <code>array</code>
Return all keys of the store.

**Example**  
```js
set('foo')set('bar')keys() // => ['foo', 'bar']
```
<a name="values"></a>

## values ⇒ <code>array</code>
Return all values of the store.

**Example**  
```js
set('foo')set('bar', 123)values() // => [undefined, 'foo']
```
<a name="all"></a>

## all ⇒ <code>array</code>
Return all keys and values of the store.

**Example**  
```js
set('foo')set('bar', 123)all() // => [['foo', undefined], ['bar', 123]]
```
<a name="clear"></a>

## clear ⇒ <code>void</code>
Clear all signs from store.

**Example**  
```js
set('foo')set('bar')clear()has('foo') // => falsehas('bar') // => false
```
<a name="size"></a>

## size ⇒ <code>number</code>
Return the number of signs.

**Example**  
```js
set('foo')size() // => 1set('bar')size() // => 2clear()size() // => 0
```
<a name="namespace"></a>

## namespace ⇒ <code>AsyncStore</code>
Return the async store with the supplied namespace.The result object has all other exports methods,and have the extra property `namespace`, means the namespace's name.Store with Different namespace will not make influence to each other.API declare detail check [AsyncStore](../types/core.d.ts)


| Param | Type |
| --- | --- |
| namespace | <code>\*</code> | 

**Example**  
```js
const { set, get, wait } = namesapce('my-space')set('foo', 'bar')get('foo') // => barwait('foo').then(() => console.log('works')) // logs: worksnamespace('my-space').namespace // => my-space
```
