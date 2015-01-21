Pixelutils for DataImage manipulation
================================================

This is a sample markdown file to help you write Markdown quickly :)

If you use the fabulous [Sublime Text 2/3 editor][ST] along with the [Markdown Preview plugin][MarkdownPreview], open your ST2 Palette with `CMD+⇧+P` then choose `Markdown Preview in browser` to see the result in your browser.

## Manipulating DataImage objects can be messy
Some Javascript code :

```js
var config = {
    duration: 5,
    comment: 'WTF'
}
// callbacks beauty un action
async_call('/path/to/api', function(json) {
    another_call(json, function(result2) {
        another_another_call(result2, function(result3) {
            another_another_another_call(result3, function(result4) {
                alert('And if all went well, i got my result :)');
            });
        });
    });
})
```

## You can do it easier like so...
Some Javascript code :

```js
var config = {
    duration: 5,
    comment: 'WTF'
}
// callbacks beauty un action
async_call('/path/to/api', function(json) {
    another_call(json, function(result2) {
        another_another_call(result2, function(result3) {
            another_another_another_call(result3, function(result4) {
                alert('And if all went well, i got my result :)');
            });
        });
    });
})
```