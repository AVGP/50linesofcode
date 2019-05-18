<!-- Bits and bytes in JavaScript -->
# Bits and bytes in JavaScript

## TL;DR

* when dealing with binary data or communicating with hardware, you may find yourself needing ways to manipulate individual bits
* JavaScript has operations for this case:
** bit-shift operators push bits to the left or right
** bit-wise arithmetic operators merge two sets of bits or flip the bits
* when dealing with bytes, ArrayBuffers allow different ways of handling the data without needing to copy it around

## Bits and bytes, revisited

In [a previous article on number systems]() I have explained how numbers can be expressed (or *encoded*) with any arbitrary number of symbols. We are used to having ten symbols (0...9) to do so, but computers use only two symbols (0, 1), also referred to as **bits**, internally. The mentioned article also explains how to convert between the system we're used to (decimal) and the system the computer uses internally (binary).

Computers also group bits in bunches of eight, referred to as **bytes**, each of which can hold 256 (2^^8^^) different values.

## Encoding other things into bits and bytes

But how can we represent other forms of data with bits and bytes? That's a matter of **encoding**.

Let's take for example simple text. No fancy emojis, no complications like Umlauts. Just A-Z, 26 characters. How do we express or *encode* them in bits? The answer is we define a system to map bits to these characters, just as the binary number system is just a system mapping bits to numbers. Such a system is called an **encoding**.

Encoding means a set of rules how we interpret the symbols.
If we want to store numbers, each of the bits can be understood as a digit of a binary number, but nothing stops us from giving bits a different meaning.

You have probably heard of the [ASCII](https://en.wikipedia.org/wiki/ASCII) or the [Unicode](https://en.m.wikipedia.org/wiki/Unicode), sometimes referred to as `utf8`, encodings. These are rules assigning numbers to characters and, well, we know how to turn numbers into a bunch of bits, don't we?

ASCII for instance defines a character as a set of eight bits or, conveniently, one byte.

This means that they can be at most 256 ASCII characters. That's plenty of space for the 26 Latin characters in upper- (A-Z) and lowercase (a-z), our ten Arabic digits (0-9) and a bunch of handy interpunctation (such as `,`, `.`, `;` and other characters (some invisibles such as "space" or "new line" or "end of file", often referred to as "non-printable characters").

The ASCII encoding is usually documented as [a table](http://www.asciitable.com) showing the number for each character and the character belonging to that number side by side.

But if we consider all the different writing systems with their numerous characters, it becomes clear that ASCII isn't enough to hold all the world's scriptures. And then there's emojis, characters that are little handy pictograms such as the infamous "pile of poo" (💩), ubiquitous icons such as the copyright symbol (©) or simply the popular smileys (e.g. ☺).

The need to find a single, all-encompassing encoding for all the world's texts (and a vast amount of symbols) lead to Unicode, which defines special bytes that mean a different way of combining the following bytes to form a single character. This is less straightforward to turn into characters than ASCII, which [created some quirks in JavaScript as Matthias Bynens has humorously pointed out in the past](https://youtu.be/zi0w7J7MCrk) .

There are other encodings as well:

* JPEG, PNG, GIF and others define what bits mean to form images
* OGG, MP3, WAV, MID and the like define the meaning of bits to produce sound
* HTTP, TCP, IP, Ethernet, ATM, 802.11 and many more define the meaning of bits in ways to transmit data over all sorts of layers of all sorts of networks
* EXE, ELF and others define how bits can form instructions and data to run programs

So we see that the same bunch of bits can mean many different things, depending on the encoding imposed on them. This is the reason why, when opening an image or any other binary file with a text editor, you will see a readable character here and there, whenever a byte happens to be a printable ASCII or Unicode character.

Also, given the right colours at the right positions, you can probably create an image file that reads as some perfectly fine ASCII text.

# Playing musical chairs with bits

Say for example we may have a system with eight lights and a computer to control them. We could say that each bit in a single byte means "on" (1) or "off" (0) for each of the lights.

So in that case we might say that the lowest bit (the right-most bit) controls light number 0, the second bit from the right is light number 1,and so on...

To turn all lights on, we will have to send a byte with all bits set to one - looking like this: `1111 1111` (spaces added to make reading a little easier).  If we want to turn on the four first lights (lights no. 0-3) we would set only the four right-most bits to one: `0000 1111`. Easy, isn't it?

How could we write a program to create an effect where a single light is "moving" from the right to the left?

We would, in succession, need to create the following bit patterns:

```
0000 0001
0000 0010
0000 0100
0000 1000
0001 0000
0010 0000
0100 0000
1000 0000
```

So how could we create these patterns using Javascript, packaging them into a single byte and send them to the computer to turn on and off the lights according to our pattern?

Let's assume we can use a given function `setLights(bitPattern)` to send a byte to the controlling computer for the lights.

But how do we get a single byte? The following won't work:

```javascript
var pattern = '00000001'
setLights(pattern)
```
 This does not work, because each of the characters is at least one byte itself as it is encoded in Unicode.

But we can use numbers!

| Decimal number | Power of 2 | bit pattern |
| --- | --- | --- |
|   0 |     -- | 00000000 |
|   1 | 2<sup>0</sup> | 00000001 |
|   2 | 2<sup>1</sup> | 00000010 |
|   4 | 2<sup>2</sup> | 00000100 |
|   8 | 2<sup>3</sup> | 00001000 |
|  16 | 2<sup>4</sup> | 00010000 |
|  32 | 2<sup>5</sup> | 00100000 |
|  64 | 2<sup>6</sup> | 01000000 |
| 128 | 2<sup>7</sup> | 10000000 |

Now that might give you an idea how to write a program to generate each of these bit patterns:

```javascript
for(var position = 0; position < 8; position++) {
  var pattern = Math.pow(2, position)
  setLights(pattern)
}
```

Great, but what if I told you there is another way, a way to literally describe shifting a bit to the left?

This is possible using one of the two **bit shift operators**:

```javascript
var pattern = 1
for(var pos = 0; pos < 8; pos++) {
  pattern = pattern << 1 // shift all bits one to the left
}
```

The bit shift operators take a bunch of bits on the left hand side of the operator and how far the bits will be shifted on the right hand side.
Here are a few examples:

```javascript
1 << 3 // will become 8 (binary 1000 as the bit shifts three places to the left)
8 >> 1 // will become 4 (going from 1000 binary to 100 binary, moving all bits one to the right
23 >> 2 // will become 5 (10111 shifting two places to the right will become 101)
```

Generally we can think of a left shift as a multiplication by two and of a right shift of a remainder-free division by two for each bit we are shifting:

```
 2 << 1 // equals 2x2
 5 << 3 // equals 5x(2x2x2)
 4 >> 1 // equals 4 / 2
16 >> 2 // equals 16 / (2x2)
```

## Bit-wise operations

If you ever wondered why comparison operators for "or" and "and" are `||` and `&&`, then here comes your answer: Because `|` and `&` are used for two fundamental bit-wise operations, together with `^`, known as **exclusive or**, **XOR** for short, and `~`, known as *not*.

These three operations give us very useful binary arithmetics to work on the bit level.

These operations work on *each bit of their arguments* and merge their values bit per bit.
The way each operator does the merging of two bits differs between operators.

Here are a few examples:

### Bit-wise OR

```
  01011
| 10010
-------
  11011
```
 The OR operator compares the bits of both arguments on the same position and returns a one on each position where *at least* one of the arguments had its bit set to one.

### Bit-wise AND

```
  01011
& 10010
-------
  00010
```
The AND operator will only put a one in every position where *all* arguments had a one.

### Bit-wise XOR

```
  01011
^ 10010
-------
  11001
```
The XOR operator will put a one in every position where *exactly one* of the arguments had a one.

### Bit-wise NOT

```
~ 01011
-------
  10100
```
The NOT operator *inverts* all bits by putting a one where the argument had a zero and putting a zero where the argument had a one.

## What's it good for?

All the knowledge of binary encodings and bit-wise operations can be very useful when dealing with all sorts of data.

For instance, when we deal with a [Canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_usage) and want to change all pixels so that they no longer contain any green, the things we've just learned come in handy. Let's look into that with an example:

```javascript
let canvas = document.createElement('canvas'), // create a fresh <canvas> element to draw on
    context = canvas.getContext('2d') // this context allows us to draw on our canvas and manipulate its pixels

let img = new Image()
img.onload = function() {
  /*
  when the image is ready, we do six things:
  1. resize the canvas so that it fits the image
  2. draw the image on the canvas
  3. get the colour of all pixels from the canvas
  4. remove the green part from all pixels
  5. put the changed pixels back on the canvas
  6. put the canvas into the body to show the result
  */

  // Resize canvas
  canvas.width = img.width
  canvas.height = img.height

  // Draw the image onto the canvas
  context.drawImage(img, 0, 0)
  // now we can get the pixels from the canvas
  let pixels = context.getImageData(0, 0, img.width, img.height)
  // removes green
  removeGreen(pixels.data) // writes the new colours directly into pixels.data
  // put the new pixel data onto the canvas
  context.putImageData(pixels, 0, 0)
  document.body.appendChild(canvas)
}
img.src = 'test.jpg' // load "test.jpg"
```

Now the interesting part is the `removeGreen` function.

### Using typed arrays

With `pixels.data` we get an array of the colours in each pixel. Each colour is encoded as [RGBA](https://en.m.wikipedia.org/wiki/RGBA_color_space) , each of the four channels is stored in one byte (i.e. four bytes describe red, green, blue and transparency for each pixel).

Now let's think about how we could use our know-how of binary operations to remove the green from each pixel.

If we think of each pixel as a single package of 4 bytes, or 32 bits, we can interpret each pixel's colour as a single number with 32 instead of 8 bits.

Under the hood, the `pixels.data` is a [`Uint8ClampedArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8ClampedArray) which provides a byte-wise view into an array of bytes called an [`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer).

We can access the raw ArrayBuffer via the `pixels.data.buffer` property. This is handy, because we can then get another view which does not interpret the ArrayBuffer byte-per-byte, but using 32 bit to get us a colour-per-colour view with colours as numbers:

```javascript
var colours = new Uint32Array(pixels.data.buffer)
```

Note that this does not copy data, but uses the same data in the ArrayBuffer, it's just accessing it four bytes at a time instead of one byte at a time.

There is one little detail though and that is how computers assemble larger numbers encoded in multiple bytes.
The order of bytes forming multi-byte mumbers is called *endianess* and I have covered it in [this article on byte order in TypedArrays](https://hacks.mozilla.org/2017/01/typedarray-or-dataview-understanding-byte-order/) if you want the details.
For us it is enough to know that the `Uint32Array` inverts the order of the four bytes it uses to create one 32 bit number:

```
Byte  |     4    |     3    |     2    |     1    |
Bits  | 11111111 | 10101010 | 11001100 | 11100111 |
Data  |   alpha  |   blue   |   green  |    red   |
Value |    255   |    170   |    204   |    231   |
```

### Masking bits with binary operators

Now we want to change this 32 bit number, so that green is always set to zero, but the remaining bits are unchanged.

This is where our knowledge of bit operators comes to shine!

If we use the AND operator with the colour and a second bunch of bits (often referred to as a *bit mask*) only the bits from the colour will come out as one _where the bit mask also has a one_. All bits where either the colour or the mask are zero will be turned to zero:

```
Colour | 11111111 | 10101010 | 11001100 | 11100111 |
Mask   | 11111111 | 11111111 | 00000000 | 11111111 |
Result | 11111111 | 10101010 | 00000000 | 11100111 |
```

Voila, there we go! We have used bit-wise AND to remove only the bits belonging to the green channel.

Putting this long line of bits into code would be pretty tedious, though.

As we've explored in [the article on number systems](), the hexadecimal system is quite nice to make things easier as two digits snugly accomodate 8 bits, so one byte fits into two hexadecimal digits instead of eight binary digits.

So we can write our bitmask as `FFFF00FF`. JavaScript, just like many other programming languages allow us to write hexadecimal numbers when we use a prefix to tell it about the number being something else then decimal. For hexadecimal the.prefix is `0x`.

```javascript
function removeGreen(rgbaArray) {
  const REMOVE_GREEN_BITMASK = 0xFFFF00FF
  let colours = new Uint32Array(rgbaArray.buffer)
  for(var i=0; i<colours.length; i++) {
    colours[i] = colours[i] & REMOVE_GREEN_BITMASK
  }
}
```

With a similar technique we could also read just the blue value from a 32 bit colour:

```javascript
let blueValue = (colour >> 16) & 0xFF
```
When shifting the value 16 bits to the right, we throw away the 8 bits for red and the next 8 bits for green leaving us with alpha and blue. Then we do a bit-wise AND to ignore the byte of the alpha channel by only preserving the right-most byte with the value for the blue channel.

## The result

Here is a test image
![](/images/post-images/binary-in-js/input.jpg)

And here is the output of the program:

![](/images/post-images/binary-in-js/output.jpg)

## Common uses for binary operations

We've already seen examples of *bit masking* (i.e. setting undesired bits to zero using `&`).

The other bit-wise operators also have relatively common uses when dealing with bits:

* bit-wise AND for ensuring certain bits are _not_ set to one, *masking* them
* bit-wise OR for ensuring certain bits are set to one or *combining* multiple values
* bit-wise XOR for simple *checks* if two values are identical, as XOR will always return zero when called with two identical values
* bit-wise NOT switches all bits, *flipping* between two states when repeatedly used

## Wrap up

In this article we have discussed that the mere bits in a file can convey an infinite list of different meanings, depending on the way we interpret them. This "way of interpreting" is called the *encoding*.

There are a range of different standard encodings for all sorts of data: image, audio and video formats, network protocols, text encodings such as ASCII or Unicode and many more. But if needed, we can create our own and access raw bytes or groups of them using TypedArrays.

But sometimes bytes aren't enough and we need to read or change individual bits. That's when the bit operations such as `&`, `|`, `^` and `~`w along with the bit-shift operations `>>` and `<<` help us achieve our goals.

Whenever you deal with binary data or hardware programming, these tools will be a great addition to your toolbox.
