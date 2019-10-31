# API documentation  

All methods bellow export from the package.  

- [set](#set)  
- [get](#get)  
- [wait](#wait)  
- [del](#del)  
- [has](#has)  
- [clear](#clear)  
- [size](#size)  
- [storeMap](#storeMap)  
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
wait('foo').then(  map => console.log(`${map.get('foo')} is ready`))setTimeout() => set('foo', 'bar'), 30)// after 30 ms logs: bar is ready
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

## wait ⇒ <code>Promise.&lt;Map&gt;</code>
Check the supplied signs are all been set,when succeed, return a `Promise`,it will resolve the [storeMap](#storeMap)where can get the message you have ever set.And first set signs, then call this method will also work.


| Param | Type |
| --- | --- |
| ...signs | <code>\*</code> | 

**Example**  
```js
set('foo')set('bar')wait('foo', 'bar').then(  map => map === storeMap // => true)
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
<a name="storeMap"></a>

## storeMap : <code>Map</code>
The property point to the raw `Map` of the store.When set signs to the store, first parameter as the Map key,second parameter as the Map value.And it's only used to read,**DO NOT** edit this object directly.

**Example**  
```js
set('foo', 123)set('bar', 234)storeMap.get('foo') // => 123storeMap.get('bar') // => 123[...storeMap.keys()] // => ['foo', 'bar'][...storeMap.values()] // => [123, 234]
```
<a name="namespace"></a>

## namespace ⇒ <code>AsyncStore</code>
Return the async store with the supplied namespace.The result object has all other exports methods,and have the extra property `namespace`, means the namespace's name.Different namespace store will not make influence to each other.API declare detail check [AsyncStore](../types/core.d.ts)


| Param | Type |
| --- | --- |
| namespace | <code>any</code> | 

**Example**  
```js
const { set, get, wait } = namesapce('my-space')set('foo', 'bar')get('foo') // => barwait('foo').then(() => console.log('works')) // logs: worksnamespace('my-space').namespace // => my-space
```
