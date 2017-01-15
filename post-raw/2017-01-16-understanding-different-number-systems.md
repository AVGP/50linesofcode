<!-- Understanding different number systems -->
# Understanding different number systems

## TL;DR

* The fact that we use a number system with 10 symbols (0-9),aka "Base 10" or decimal is an arbitrary choice
* Systems with different bases can help us express numbers in specific contexts more intuitively (e.g. hexadecimal or binary when working with digital systems)
* Reading numbers in any number system can be done by multiplying each digit value with a power of the base, starting with the zero-th power for the right most digit and increasing the exponent by one for each step to the left, e.g. 123 = `3x10^0 + 2x10^1 + 1x10^2` for decimal numbers (base 10)

## Why bother with other number systems?

We are very used to the decimal system. We learned this system as young kids and use it nearly all the time in our day to day life. Since we are so familiar with it, it does feel "natural" for us to use ten symbols (0, 1, ..., 9) to count.

Besides the fact that most of us happen to have ten fingers and ten toes (which kids often use as support when counting) there's not much "natural" about it, we might as well use more or less symbols to count just as well.

Yet, why would we bother? The decimal system is well-established and feels like a good choice to us.

But there's good reason to change the amount of symbols in some cases:

* in digital systems, it is easier to work with just two states: some electrical current or none. This gives us two symbols "off" (0) and "on" (1)
* When we define time in hours, we have a base of 60 minutes that we could hypothetically express with 60 different symbols to get easier conversion between hours and minutes

Computers, being digital systems themselves, use 8 of these symbols (aka "bits") grouped together as a byte, which can hold 256 (2^^8^^) different values.
Using decimal numbers it is not easy to spot how many byte a number will take up. In contrast, knowing that the hexadecimal system with 16 symbols 0, ..., 9, A (10), B (11), C (12), D (13), E (14) and F (15) is easier for this purpose. Two digits of any hexadecimal number take up one byte.

Knowing this, finding out how many bytes the number 10895 takes is trivial if this number is written in hexadecimal instead of decimal:

```
10895 (decimal) = 2a8f (hex) = 2 bytes
```

This comes in handy when we need to deal with data that is too big to fit into a single byte but we want to access it byte-wise. In that case we can work with each pair of digits independently (for our last example we would work with `2a` and `8f` independently).

## Reinventing numbers with Emoji

To get a little more familiar with bits and non-decimal numbers, let's pretend that we are the first to invent numbers.

So let's say that we have three symbols: ★, ♥ and ☻.

Now we can use them to mean something for our counting system:

* ★ for "nothing" / "zero"
* ♥ for "a single thing" / "one"
* ☻ for twice as much as ♥ / "two"

Note that this association is arbitrary. We just give each symbol a specific meaning, but which symbol means what and even which symbols we picked doesn't matter, as long as we stick to the meaning once we've defined it.

Okay, but how does that allow us to count?

Well counting up to "two is easy: ★, ♥, ☻,  aka zero, one, two.
After this we need to become inventive. We could use more emojis and simply have more symbols for numbers. Now let's say we can't have more than the three symbols (maybe we are communicating via a set of printed tiles and all our tiles are divided into the three symbols).

Another way of counting more things is by chalking up how often we have gone through all of our three symbols.  So when we count to five, we would do:

```
★, ♥, ☻, ♥★, ♥♥, ♥☻
```

Once we reach "☻", the biggest digit in our system, we know we've gone through all of our symbols, so we remember that we did that full walk through once (or "♥" times, as we express that in our symbols) and start from zero (aka ★) behind it. Any reader who knows the meaning of our symbol system then sees "They went through all the symbols once and that's it, so the number must be the one after "two".

Then for the following numbers we repeat this. Here are the numbers up to ten:

```
★, ♥, ☻, ♥★, ♥♥, ♥☻, ☻★, ☻♥, ☻☻, ♥★★, ♥★♥
```

If this looks weird, think it through with our decimal system: We use 10 symbols (0-9) and once we run out, we start chalking up how much we ran through our symbols before: (8, 9, 10, 11,..., 19, 20, 21,..., 99, 100, 101,...).

Now there's something convenient about this kind of system. To explain what I mean, let's see how we would convert 3 hours and 35 minutes into minutes.

Each hour contains 60 minutes, so we can say 3h35m is the equivalent of `3x60m + 35x1m = 180 + 35 = 215` minutes.

If you look at the decimal numbers digit-by-digit, you may say a number like 123 like "one times hundred, two times ten,  three times one" - when summed up it's our number: `1x100 + 2x10 + 3x1`.

Surprisingly this kind of works for our emoji-system,  system too when you look at the symbols.

Take for example the numbers three, six and nine:

* ♥★ (three) = ♥ times three plus ★ times one = `1x3 + 0x1 = 3`
* ☻★ (six) = ☻ times three plus ★ times one = `2x3 + 0x1 = 6`
* ♥★★ (nine) = ♥ times nine plus ★ times three plus ★ times one = `1x9 + 0x3 + 0x1 = 9`

This works for all numbers in between, e.g. seven:

☻♥ = ☻x3 + ♥x1 = `2x3 + 1x1 = 7`

And indeed, this does have a regularity in it, as the amount of symbols we have for a single digit determines how many numbers we can express. Every time we add a digit to a number, we have all the symbols available again for all previous digits, so the number of things doesn't double, but increase by a power of the number of symbols.

For our three symbols system we can see that a single digit can express three numbers (3^^1^^), two digits can express nine (3^^2^^) and three digits can already express twenty-seven (3^^3^^) numbers.

For our decimal numbers it's the same but with a base of ten: One digit can express 10, two digits 100 and three digits 1000 different numbers.

This holds true for any number system: Each digit adds one to the exponent while the base is the number of symbols the system has available.

## The one weird trick to convert numbers to and from decimal:

Now, different number systems can be useful but reading numbers is hard, when they aren't decimal, isn't it?

Conveniently there's one little trick that, with some practice, makes it easier to read numbers in any arbitrary system, using simple multiplication and addition.

Remember when we read the decimal number 123 as `1x100 + 2x10 + 3x1`?

From your math lessons you may remember that any number to its zero-th power is always one, so `x^0 = 1` no matter which natural number we use for `x`.

We can generalize the way we find the value of a number in any system, given that we know its base:

Starting from the right, multiply the first digit with `base^0`, the next digits with `base^1`, `base^2`, `base^3` and so on.

Here are some examples:

* `1011` (binary, base 2): `1x2^0 + 1x2^1 + 0x2^2 + 1x2^3 = 1x1 + 1x2 + 0 + 1x8 = 11` (decimal)
* `1a8` (hexadecimal, base 16) = `8x16^0 + 10x16^1 + 1x16^2 = 8 + 160 + 256 = 424` (decimal)
* `256` (octal, base 8) = `6x8^0 + 5x8^1 + 2x8^2 = 6 + 40 + 128 = 174` (decimal)

It works the other way around as well:

To find the representation of a decimal number in any other base, you find the largest power of the base to fit into that number, which gives you the left-most digit of the other system, then you repeat that step for the rest until you are done.

Say you want to convert the decimal number 6 into binary.
The largest power of two that fits into 6 is 2^^2^^=4. So you take a 1 and remember that this will be the left-most number of three digits (we haven't checked if 2^^1^^ and 2^^0^^ fit into the rest yet).
6-4 gives us a rest of 2. The largest power of two that fits into 2 is 2^^1^^=2. So we now have `1x2^2 + 1x2^1` and `6-4-2=0`, i.e leaves no rest, so we know that 2^^0^^ didn't fit, which means our number in binary is `1x2^2 + 1x2^1 + 0x2^0` or simply `110` (binary).

Some other examples:

* 75 decimal to binary = `1x64 + 1x8 + 1x2 + 1x1 = 1x2^6 + 0x2^5 + 0x2^4 + 1x2^3 + 0x2^2 + 1x2^1 + 1x2^0 = 1001011`
* 75 decimal to hexadecimal = `4x16^1 + 11x16^0 = 4B`

## Wrap up

Now that we have seen that number systems can use an arbitrary number of symbols to encode any natural number without much trouble and how we can convert between our familiar decimal system and systems with any other number of symbols, we can pick whatever system is convenient for working with different types of data and represent it in a way that is easiest for the task at hand.

For instance, as two hexadecimal digits neatly fit the data in a single byte, we may use a [hex editor]() when looking at binary files when we wish to see the individual bytes.

Equipped with this, we can take on working with binary data of any kind: images, videos, audio files and others.
