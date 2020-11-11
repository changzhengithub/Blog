b# 浏览器端数据库indexedDB

indexedDB和localStorage一样，用来本地存储，但比localStorage存储内存大，并且是异步，如果数据大不会阻塞流程。

操作数据库无异于最基本的增、删、改、查四点，新建数据库，然后增删改查，各自操作所对应的逻辑。

indexedDB大概思路就是创建一个数据库，创建好后再创建需要的表格。表格创建好，然后通过事务来操作表格存储对象来进行增删改查。

## 数据库中的几个常见概念

**事务：**

数据库事务（transaction），指数据库操作的一系列操作组成一个不可分割的单位，比如银行转账，一个账号钱少了一个账号钱多了，这两个操作要么都执行，要么都不执行。要么这个事务执行，要么回滚不执行。具有以下四个特性：

>原子性(Atomicity)：事务中的所有操作作为一个整体提交或回滚。</br>
>一致性(Consistemcy)：事物完成时，数据必须是一致的，以保证数据的无损。</br>
>隔离性(Isolation)：对数据进行修改的多个事务是彼此隔离的。</br>
>持久性(Durability)：事务完成之后，它对于系统的影响是永久的，该修改即使出现系统故障也将一直保留。

**游标：**

游标是一段内存区域,用于暂时存放受操作影响到的数据。通俗理解就是将受影响的数据暂时放到了一个内存区域的虚表中，这个虚表就是游标。游标可以逐条访问这个内存区域的数据。

**锁-lock：**

多个事务同时对一个对象进行读写，这就发生了冲突，当一个事务进行时，进行锁定，强行进行限制资源访问，其他事务就无法操作了。


## 打开数据库

```js
// 数据库对象
var db;
// 数据库名称
var dbName = 'project'
// 存储对象名称
var osName = 'person'

// 打开数据库
var DBOpenRequest = window.indexedDB.open(dbName, version)
```

使用indexedDB.open() 打开数据库，接收两个参数dbName数据库名称和version版本号，不存在该版本就新建一个，如果省略，打开已有数据库。该方法返回一个 IDBRequest 对象。这个对象通过三种事件error、success、upgradeneeded，处理打开数据库的操作结果。

error和success事件表示新建或打开数据库成功或失败。upgradeneeded事件表示新建数据库或者版本升级会被触发，这时表示数据库创建成功，所以后续操作，不如建表都在这里操作。upgradeneeded 事件要在success事件前先被调用。

```js
// error事件
request.onerror = function(event) {
  console.log('数据库打开报错');
};

// success事件，表示打开成功，这时可以拿到数据库对象。
request.onsuccess = function(event) {
  db = request.result;
  console.log('数据库打开成功');
};

// upgradeneeded 事件
request.onupgradeneeded = function(event) {
  // 获取数据库对象，然后就可以创建对象仓库了。
  var db = event.target.result;
}
```

## 创建存储对象

通常，新建数据库以后，第一件事是新建对象仓库（即新建表），表格创建好后就通过，下一步在创建其他索引。

```js
// upgradeneeded 事件
request.onupgradeneeded = function(event) {
  // 获取数据库对象
  var db = event.target.result;
  // 新建数据库以后，第一件事是新建对象仓库（即新建表）
  // osName 表示表名称，'id'表的主键
  var objectStore = db.createObjectStore(osName, { keyPath: 'id' });
  // 创建其他索引
  objectStore.createIndex('name', 'name', { unique: false });
  objectStore.createIndex('email', 'email', { unique: true });
}
```
通过`db.createObjectStore`创建了一个存储对象，也就是数据库表，并且创建了表的主键，然后通过返回`objectStore`存储对象的createIndex()方法接着创建其他索引。`unique`表示该字段值是否唯一，不能重复。`name`索引名字可以重复，设置为`false`，然`email`索引每个都不相同，所以是唯一的。

## 增删改查

数据库和表格建好之后就可以对这个表进行操作了，我们可以通过获取我们创建的存储对象`objectStore`来进行增删改查，**但是由于数据库的操作都是基于事务（transaction）来进行，所以，无论是添加编辑还是删除数据库，我们都要先建立一个事务（transaction），然后通过事务拿个存储对象`objectStore`才能继续下面的操作**。

**新建事务：**

事务接收连个参数，并返回一个事务对象，第一个表示事务希望跨越的对象存储空间的列表，可以传入数据库名称，第二个事务的模式：`readonly`、`readwrite` 和 `versionchange`，表示只读，读写和版本改变，默认为 readyonly 模式。

可以用`error`、`abort` 和 `complete`三个事件来监听事务的创建。

```js
var transaction = db.transaction(dbName, "readwrite");
// 获取存储对象（表格） osName为存储对象名称
var objectStore = transaction.objectStore(osName);
// var objectStore = db.transaction(dbName, "readwrite").objectStore(osName);
// 在所有数据添加完毕后的处理，整个事务完成
transaction.oncomplete = function(event) {
  alert("All done!");
};
transaction.onerror = function(event) {
  // 不要忘记错误处理！
};
```

现在拥有了一个事务，只需要从中取出一个对象仓库。只能在创建事务时指定的对象仓库中取出一个对象仓库。然后就可以添加任何你需要的数据。

**添加数据：objectStore.add()**

```js
var data = {
  id: 1,
  name: 'xxxx',
  email: 'xxxxxxxx@qq.com'
}
var objectStore = db.transaction(dbName, "readwrite").objectStore(osName);
var objectStoreRequest = objectStore.add(data);
objectStoreRequest.onsuccess = function() {
  console.log('数据写入成功');
  // other code...
}
objectStoreRequest.onerror = function (event) {
  console.log('数据写入失败');
}
```

**删除数据：objectStore.delete()**

和添加数据类似，参数是主键id

```js
var objectStore = db.transaction(dbName, "readwrite").objectStore(osName);
var requestDelete = objectStore.delete(id);
requestDelete.onsuccess = function(event) {
  // 删除成功！
};
```

**读取数据：objectStore.get()**

和删除数据类似，参数是主键id，读取数据只能读取一条数据，要想获取表格全部数据，要使用指针对象游标API IDBCursor。

```js
var objectStore = db.transaction(dbName, "readwrite").objectStore(osName);
var requestGet = objectStore.get(id);
requestGet.onsuccess = function(event) {
  var resultData = requestGet.result;
};
```

**修改数据：objectStore.put()**

修改数据，首先要获取数据，修改获取的数据后再替换上去。或者知道要修改的全部数据，然后直接替换掉。

```js
var objectStore = db.transaction(dbName, "readwrite").objectStore(osName);
var requestGet = objectStore.get(1);
requestGet.onsuccess = function(event) {
  var resultData = requestGet.result; // 获取到要修改的数据
  resultData.name = 'aaaa'; // 修改数据
  // 把修改后的数据放回数据库
  var requestUpdate = objectStore.put(resultData);
  requestUpdate.onerror = function(event) {
    // 错误处理
  };
  requestUpdate.onsuccess = function(event) {
    // 完成，数据已更新！
  };
};

// 或者直接更换
var data = {
  id: 1,
  name: 'cccc',
  email: '1111111@qq.com'
}
var requestUpdate = objectStore.put(data);
requestUpdate.onerror = function(event) {
  // 错误处理
};
requestUpdate.onsuccess = function(event) {
  // 完成，数据已更新！
};
```

**获取indexedDB数据库：游标API openCursor**

使用get()是根据知道的某一个键来获取数据，如果你想要遍历对象存储空间中的所有值，那么你可以使用游标API 。

使用存储对象的openCursor()打开游标，在onsuccess回调中就可以遍历我们的游标对象了，每次遍历一条数据，实际的 key 和 value 可以根据游标对象的 key 和 value 属性被找到。如果想继续往下遍历，需要调用游标上的 continue()。

```js
var personArr = []
var objectStore = db.transaction(dbName).objectStore(osName);

objectStore.openCursor().onsuccess = function(event) {
  var cursor = event.target.result;
  if (cursor) {
    personArr.push(cursor.value) // 获取当前游标数据
    cursor.continue(); // 继续往下遍历游标。
  }
  else {
    console.log('没有更多数据了');
  }
}
```

**指定游标的范围和方向获取数据：**

上面是获取整个数据库数据，我们可以指定游标的范围来获取特定范围之间的一段数据，使用IDBKeyRange的方法来确定获取的范围，然后再遍历获取。IDBKeyRange的方法主要有bound(), only(), lowerBound()和upperBound()这几个，意思就是范围内、仅仅是、小于某值和大于某值。

```js
var personArr = []
// 使用IDBKeyRange确定打开的游标的主键范围
var objectStore = db.transaction(dbName).objectStore(osName);
var boundKeyRange = IDBKeyRange.bound(4, 10);

// 使用其中的一个键范围，把它作为 openCursor()/openKeyCursor 的第一个参数
objectStore.openCursor(boundKeyRange).onsuccess = function(event) {
  var cursor = event.target.result;
  if (cursor) {
    personArr.push(cursor.value) // 获取当前游标数据
    cursor.continue();
  }
};
```

有时候想要以倒序而不是正序（所有游标的默认顺序）来遍历。切换方向是通过传递 prev 到 openCursor() 方法来实现的：

```js
objectStore.openCursor(boundKeyRange, "prev").onsuccess = function(event) {
  var cursor = event.target.result;
  if (cursor) {
    // 进行一些操作
    cursor.continue();
  }
};
```

只改变遍历的方向，而不取范围，只需要给第一个参数传入 null。

```js
objectStore.openCursor(null, "prev").onsuccess = function(event) {
  var cursor = event.target.result;
  if (cursor) {
    // Do something with the entries.
    cursor.continue();
  }
};
```

**使用索引获取数据：**

```js
var objectStore = db.transaction(dbName, "readwrite").objectStore(osName);
var index = objectStore.index("name"); // 获取名为name的索引
// 获取索引值为'xxxx'的数据，因为name值可能不止一个，返回是键值最小的
index.get('xxxx').onsuccess = function(event) {
  var result = event.target.result;
  if (result) {
    // ...
  } else {
    // ...
  }
};
```

**清空数据：objectStore.clear()**

```js
var objectStore = db.transaction(dbName, "readwrite").objectStore(osName);
objectStore.clear()  // 删除当前对象仓库的所有记录
```


