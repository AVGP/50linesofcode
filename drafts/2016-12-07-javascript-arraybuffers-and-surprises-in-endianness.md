<!-- JavaScript ArrayBuffers and surprises in endianness -->

## TL;DR

Depending on how you access an `ArrayBuffer` you get different byte order on the same machine, across the browsers I tested:

* Using a [Typed Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) to write into an ArrayBuffer will be little-endian
* Writing using a setter on a [DataView]() without using the optional third parameter results in the data being written in big-endian.
