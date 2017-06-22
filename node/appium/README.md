##踩坑记录

### 滑动
官方给的例子是这样的

```js
exports.swipe = function (opts) {
  var action = new wd.TouchAction();
  action
    .press({x: opts.startX, y: opts.startY})
    .wait(opts.duration)
    .moveTo({x: opts.endX, y: opts.endY})
    .release();
  return this.performTouchAction(action);
};
```
实际是要这样

```js
exports.swipe = function (opts) {
  var action = new wd.TouchAction();
  action
    .press({x: opts.startX, y: opts.startY})
    .wait(opts.duration)
    .moveTo({x: opts.xoffset, y: opts.xoffset}) // 这里是offset
    .release();
  return this.performTouchAction(action);
};
```