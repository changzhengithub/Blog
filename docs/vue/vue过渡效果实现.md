# vue过渡效果实现

## 单行消息水平循环滚动

页面顶部或者底部消息提示文字，一直在水平无限循环滚动，一般使用 `animation` 动画一直循环滚动就可以了。

```css
.scroll {
  width: 100%;
  height: 40px;
  overflow: hidden;
  background-color: #ccc;
}

.scroll p {
  font-size: 20px;
  color: coral;
  line-height: 36px;
  animation: adScroll 5s linear infinite;
  animation-fill-mode: forwards;
}

@keyframes adScroll {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-80%);
  }
}
```
```html
<div class="scroll">
  <p>我是广告内容！！！！！</p>
</div>
```

## 多行无缝循环滚动

在一个固定容器中，显示多行内容垂直方向无限循环滚动，还是和单行滚动一样，使用 `animation` ，但是需要再多加一倍的元素来进行首位连接才行，单单一个列表无法进行衔接。这种方式知不知道元素个数都可以使用。
```css
.wrap {
  width: 400px;
  height: 150px;
  margin: 0 auto;
  border: 1px solid #999;
  overflow: hidden;
}
.list {
  width: 100%;
  animation: infiniteScroll 3s linear infinite normal;
}
.list-item {
  width: 100%;
  height: 50px;
  font-size: 20px;
  color: coral;
  line-height: 36px;
  text-align: center;
  background-color: #f2f2f2;
}

@keyframes infiniteScroll {
  0% {
    transform: translateY(0%);
  }
  100% {
    transform: translateY(-100%);
  }
}
```
```html
<div class="wrap">
  <div class="list">
    <div class="list-item" v-for="(item, index) in lists" ::key="index">
      <span>{{item}}</span>
    </div>
  </div>
  <div class="list">
    <div class="list-item" v-for="(item, index) in lists" ::key="index">
      <span>{{item}}</span>
    </div>
  </div>
</div>
```

## 广告停顿滚动效果

在固定容器中，显示一行内容，像轮播图一样，滚动一下停止一段时间后接着无缝滚动，最直接的办法就是使用插件 swiper 进行加载，也可以 `<transition>` 组件来进行模拟，但需要借助定时器 `setInterval` 来进行定时更新显示内容。
```css
.wrap {
  position: relative;
  width: 400px;
  height: 100px;
  margin: 0 auto;
  border: 1px solid #999;
  overflow: hidden;
}

.list-item {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 9;
  
  width: 100%;
  height: 100px;
  font-size: 20px;
  color: coral;
  line-height: 90px;
  text-align: center;
  background-color: #f2f2f2;
}

.fade-enter-active, .fade-leave-active {
  transition: all 1s linear;
}

/* 定义离开和进入效果 */
.fade-enter {
  transform: translateY(100%);
  opacity: 0;
}
.fade-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}
```
```html
<div id="app">
  <div class="wrap">
    <transition name="fade">
      <div v-if="activeIndex == index" class="list-item" v-for="(item, index) in lists" :key="index">
        <span>{{item}}</span>
      </div>
    </transition>
  </div>
</div>
```
```js
var vm = new Vue({
  el: '#app',
  data: {
    activeIndex: 0,
    timer: null,
    lists: [
      '我是广告内容1',
      '我是广告内容2',
      '我是广告内容3',
      '我是广告内容4',
      '我是广告内容5',
    ]
  },
  mounted() {
    this.startScroll();
  },
  methods: {
    startScroll: function() {
      // 定时切换显示内容
      this.timer = setInterval(() => {
        this.activeIndex++
        if (this.activeIndex >= this.lists.length) {
          this.activeIndex = 0
        }
      }, 2000);

      this.$once('hook:beforeDestroy', function () {
        clearInterval(this.timer)
      })
    }
  }
})
```

## 多个元素切换效果

多个元素切换效果使用 `transition`的多个元素过渡，结合过渡模式 `mode` 或者绝对定位来实现多种效果，mode过渡模式虽然看起来效果好一点，但是效果不够连贯，一个消失后才显示另一个。要想过渡比较连贯，一个开始消失，另一个就开始显示另一个可以使用 `position: absolute;` 让所有元素都浮动起来，这样切换效果就会连贯起来了。

一个滑动离开一个滑动进入效果：

上面的广告效果就是使用此方法进行实现的。
```css
.fade-enter-active, .fade-leave-active {
  transition: all 1s;
}
/* 定义离开和进入效果 */
.fade-enter {
  transform: translateX(100%);
  opacity: 0;
}
.fade-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
/* 元素都浮动起来 */
.btn {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 9;
}
```
```html
<div id="app">
  <button @click="isEditing = !isEditing">切换状态</button>
  <transition name="fade">
    <button class="btn" v-if="isEditing" key="Save">Save</button>
    <button class="btn" v-if="!isEditing" key="Edit">Edit</button>
  </transition>
</div>
```

一个滑动离开后一个再显示效果： 

配合 `mode="out-in"` 模式使用，不使用绝对定位
```css
.fade-enter-active, .fade-leave-active {
  transition: all 1s;
}
/* 定义离开和进入效果 */
.fade-enter {
  opacity: 0;
}
.fade-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
```
```html
<div id="app">
  <button @click="isEditing = !isEditing">切换状态</button>
  <transition name="fade" mode="out-in">
    <button class="btn" v-if="isEditing" key="Save">Save</button>
    <button class="btn" v-if="!isEditing" key="Edit">Edit</button>
  </transition>
</div>
```

一个显示一个消失效果： 

绝对定位 和 `mode="out-in"` 模式使用哪个模式都可以，两个一起使用也可以。
```css
.fade-enter-active, .fade-leave-active {
  transition: all 1s;
}
/* 定义离开和进入效果 */
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.btn {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 9;
}
```
```html
<div id="app">
  <button @click="isEditing = !isEditing">切换状态</button>
  <transition name="fade" mode="out-in">
    <button class="btn" v-if="isEditing" key="Save">Save</button>
    <button class="btn" v-if="!isEditing" key="Edit">Edit</button>
  </transition>
</div>
```

多个组件实现切换过渡：

多个组件的过渡不需要使用 key 属性。只需要使用动态组件就可以了，其他的设置效果和多个元素设置效果一样。

```html
<transition name="fade">
  <component :is="componentName"></component>
</transition>
```

## 订单切换效果

还是使用 `transition` 组件加上绝对定位实现。具备了轮播图基本的滚动效果，左右按钮切换和切换模式可以再添加。手势滑动也已经添加。
```css
 * {
  margin: 0;
  padding: 0;
  border: 0;
  box-sizing: border-box;
  border: none;
  outline: none;
}
.wrap {
  position: relative;
  width: 100%;
  height: 500px;
  margin: 0 auto;
  border: 1px solid #999;
  overflow: hidden;
}
.wrap-nav {
  display: flex;
  width: 100%;
  height: 50px;
  overflow: auto;
  cursor: pointer;
}
.nav-item {
  width: 100px;
  height: 100%;
  line-height: 50px;
  text-align: center;
}
.nav-active {
  font-size: 20px;
  font-weight: bold;
}
.wrap-container {
  position: relative;
  width: 100%;
  height: 400px;
}
.list-item {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 9;
  width: 100%;
  height: 100%;
  font-size: 20px;
  color: coral;
  line-height: 90px;
  text-align: center;
  background-color: #f2f2f2;
}

/* 左滑 */
.fadel-enter-active, .fadel-leave-active {
  transition: all 0.6s linear;
}
.fadel-enter {
  transform: translateX(100%);
  opacity: 1;
}
.fadel-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
/* 右滑 */
.fader-enter-active, .fader-leave-active {
  transition: all 0.6s linear;
}
/* 定义离开和进入效果 */
.fader-enter {
  transform: translateX(-100%);
  opacity: 1;
}
.fader-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
```
```html
<div id="app">
  <div class="wrap">
    <div class="wrap-nav">
      <div class="nav-item" :class="{'nav-active': activeIndex == index}" v-for="(item, index) in navList" @click="switchNav(index)">{{item}}</div>
    </div>
    <div class="wrap-container">
      <transition :name="transitionName">
        <div v-if="activeIndex == index" class="list-item" v-for="(item, index) in detailList" :key="index" 
          @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
          <span>{{item}}</span>
        </div>
      </transition>
    </div>
  </div>
</div>
```
```js
var vm = new Vue({
  el: '#app',
  data: {
    activeIndex: 0,
    timer: null,
    transitionName: 'fadel',
    navList: ['待付款', '待收货', '待评价', '全部订单', '售后'],
    detailList: [
      '我是待付款',
      '我是待收货',
      '我是待评价',
      '我是全部订单',
      '我是售后',
    ],
    touchPageX: 0,
    touchPageY: 0,
    touchScale: 0,
    touchPageXMounts: 0,
    touchPageYMounts: 0, 
  },
  methods: {
    switchNav: function(index) {
      if (this.activeIndex === index) return
      if (this.activeIndex > index) {
        this.transitionName = 'fader'
      } else {
        this.transitionName = 'fadel'
      }
      this.activeIndex = index
    },
    touchStart: function(event) {
      this.touchPageX = event.targetTouches[0].pageX
      this.touchPageY = event.targetTouches[0].pageY
    },
    touchMove: function(event) {
      this.touchPageXMounts = this.touchPageX - event.targetTouches[0].pageX
      this.touchPageYMounts = this.touchPageY - event.targetTouches[0].pageY
    },
    touchEnd: function(event) {
      if (Math.abs(this.touchPageYMounts) > Math.abs(this.touchPageXMounts)) return
      var screenWidth = screen.width
      this.touchScale = parseFloat(this.touchPageXMounts / screenWidth).toFixed(2)
      if (Math.abs(this.touchScale) < 0.20) return
      if (this.touchScale > 0.20) this.touchLeft()
      if (this.touchScale < -0.20) this.touchRight();
    },
    touchLeft: function() {
      this.transitionName = 'fadel'
      this.activeIndex++
      if (this.activeIndex >= this.detailList.length) {
        this.activeIndex = 0
      }
    },
    touchRight: function() {
      this.transitionName = 'fader'
      this.activeIndex--
      if (this.activeIndex < 0) {
        this.activeIndex = this.detailList.length - 1
      }
    }
  }
})
```





