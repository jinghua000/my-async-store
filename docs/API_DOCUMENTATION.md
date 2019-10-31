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
Set an sign to the default async store,


| Param | Type |
| --- | --- |
| sign | <code>\*</code> | 
| [payload] | <code>\*</code> | 

**Example**  
```js
wait('foo').then(
```
<a name="get"></a>

## get ⇒ <code>\*</code>
Read the supplied sign corresponding payload,


| Param | Type |
| --- | --- |
| sign | <code>\*</code> | 

**Example**  
```js
let obj = {}
```
<a name="wait"></a>

## wait ⇒ <code>Promise.&lt;Map&gt;</code>
Check the supplied signs are all been set,


| Param | Type |
| --- | --- |
| ...signs | <code>\*</code> | 

**Example**  
```js
set('foo')
```
<a name="del"></a>

## del ⇒ <code>boolean</code>
Delete a sign from the store,


| Param | Type |
| --- | --- |
| sign | <code>\*</code> | 

**Example**  
```js
set('foo')
```
<a name="has"></a>

## has ⇒ <code>boolean</code>
Check the sign whether exist in the store.


| Param | Type |
| --- | --- |
| sign | <code>\*</code> | 

**Example**  
```js
set('foo')
```
<a name="clear"></a>

## clear ⇒ <code>void</code>
Clear all signs from store.

**Example**  
```js
set('foo')
```
<a name="size"></a>

## size ⇒ <code>number</code>
Return the number of signs.

**Example**  
```js
set('foo')
```
<a name="storeMap"></a>

## storeMap : <code>Map</code>
The property point to the raw `Map` of the store.

**Example**  
```js
set('foo', 123)
```
<a name="namespace"></a>

## namespace ⇒ <code>AsyncStore</code>
Return the async store with the supplied namespace.


| Param | Type |
| --- | --- |
| namespace | <code>any</code> | 

**Example**  
```js
const { set, get, wait } = namesapce('my-space')
```