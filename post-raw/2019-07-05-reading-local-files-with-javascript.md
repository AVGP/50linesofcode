<!-- Reading local files with JavaScript -->

For security and privacy reasons web apps do not have direct access to the files
on the user's device. If you need to read one or multiple local files, you can do
this through the usage of a file input and a FileReader. In this post we will take a look
at how this works through a few examples.

## TL;DR

* JavaScript does not have direct access to the local files due to security and privacy.
* We can offer the user the possibility to select files via a `file` input element that we can then process.
* The `file` input has a `files` property with the selected file(s).
* We can use a `FileReader` to access the content of the selected file(s).

## How it works

As JavaScript in the browser cannot access the local files from the user's device,
we need to provide the user with a way to select one or multiple files for us to use.
This can be done with the HTML file input element:

```html
<input type="file" id="fileInput">
```

If we want to allow the selection of multiple files, we can add the `multiple` attribute:

```html
<input type="file" id="fileInput" multiple>
```

We can either use the `change` event of the input field to respond to a file selection
or add another UI element to let the user explicitly start the processing of the selected file.

Also note: The selection of a file with the input element does not upload the file anywhere,
the only thing that happens is that the file becomes available to the JavaScript on the page.

The file input has a `files` property that is a list (as there could be multiple selected files) of `File` objects.

```html
<input type="file" id="fileInput">
<script>
    document.getElementById('fileInput').addEventListener('change', function selectedFileChanged() {
      console.log(this.files); // will contain information about the file that was selected.
    });
</script>
```

A [`File](https://developer.mozilla.org/en-US/docs/Web/API/File) object looks like this:

```javascript
{
  name: 'test.txt',         // the name of the selected file
  size: 1024,               // the size in bytes
  type: 'text/plain',       // the assumed file type based on file extension. This might be incorrect.
  lastModified: 12345567890 // timestamp of the last change according to the user's system
  lastModifiedDate: 'Thu Jul 04 2019 09:22:51 GMT+0200 (Central European Summer Time)' // a date object for the last modified timestamp
}
```

Now we have the ability to select a file and see the metadata, but how can we access the file content?
To get the actual content of a selected file, we need a [`FileReader`](https://developer.mozilla.org/en-US/docs/Web/API/FileReader).

A file reader takes a `File` object and offers us methods to get access to the data as:

* a string of text data
* a [data URL](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs)
* a string of binary data
* an ArrayBuffer containing raw binary data

In the following examples, we will use the `readAsText` and `readAsDataURL` methods to show the content of text and image files.

## Example one: Reading text files

To show the file content as text, we change the `change` event handler:

```javascript
document.getElementById('fileInput').addEventListener('change', function selectedFileChanged() {
  if (this.files.length === 0) {
    console.log('No file selected.');
    return;
  }
  
  const reader = new FileReader();
  reader.onload = function fileReadCompleted() {
    // when the reader is done, the content is in reader.result.
    console.log(reader.result);
  };
  reader.readAsText(this.files[0]);
});
```

First we make sure that there is a file that can be read. If the user cancels or otherwise
closes the file selection dialog without selecting a file, we have nothing to read and exit our function.

We then proceed to create a `FileReader`. The reader works asychronously in order 
to not block the main thread and UI updates which is important when reading large files (like videos).

The reader emits a 'load' event (similar to images for example) that tells our code that the reading is finished.
The reader keeps the file content in its `result` property. The data in this property depends on which method we used to read the file.

In our example we read the file with the `readAsText` method, so the `result` will be a string of text.

## Example two: Displaying an image from the user's device

If we want to display images, reading the file into a string isn't very helpful.
Conveniently the `FileReader` has a `readAsDataURL` method that reads the file into 
an encoded string that can be used as the source for an `<img>` element. The code is pretty much the same as previously,
with the exceptions that we read the file with `readAsDataURL` and display the result as an image:

```javascript
document.getElementById('fileInput').addEventListener('change', function selectedFileChanged() {
  if (this.files.length === 0) {
    console.log('No file selected.');
    return;
  }
  
  const reader = new FileReader();
  reader.onload = function fileReadCompleted() {
      const img = new Image();          // creates an <img> element
      img.src = reader.result;          // loads the data URL as the image source
      document.body.appendChild(img);   // adds the image to the body
  };
  reader.readAsDataURL(this.files[0]);
});
```