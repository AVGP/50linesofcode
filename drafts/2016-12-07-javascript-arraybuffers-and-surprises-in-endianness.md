<!-- JavaScript ArrayBuffers and surprises in endianness -->

## TL;DR

Depending on how you access an `ArrayBuffer` you get different byte order on the same machine, across the browsers I tested:

* Using a [Typed Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) to write into an ArrayBuffer you different results than using the setters on a DataView without forcing `littleEndian`.
