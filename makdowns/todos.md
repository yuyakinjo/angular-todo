[map]: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Map
[object_vs_map]: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Map#objects_vs._maps
[angular_pipe_introduction]: https://angular.jp/guide/pipes
[keyvalue_pipe]: https://angular.jp/api/common/KeyValuePipe
[uppercase_pipe]: https://angular.jp/api/common/UpperCasePipe

# todo リストを表示

実際に todo を表示していきましょう。

## todo リストの要件

- todo のタイトルを入力すると、未完了リストに登録。
- チェックボックスをクリックすると、完了リストに登録。
- もし同じタイトルを入力した場合は、そのタイトルを未完了にする。

上記を実装するには、key: タイトル(string)、value: 完了・未完了(boolean)の 2 つのプロパティがあれば良さそうです。

# パイプを使ってみる

まずは[Angular のパイプ][angular_pipe_introduction]を使ってみましょう。
Pipe とは AngularJS でいう「フィルター」です。
使用場所はテンプレート側で、`{{ hello | uppercase }}`のように使用します。

まずは title を`hello world` → `todo`にしてみましょう。

### **`src/app/app.component.ts`**

```diff
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
+  title = 'todo';
}
```

このままだと、小文字で「todo」が表示されると思います。

![スクリーンショット 2022-03-04 15 09 25](https://user-images.githubusercontent.com/20474933/156709399-03398510-6ff8-4a57-a4a5-e87ce8f59cd0.png)

これをすべて大文字にするには、２つ方法があります。

1. コンポーネントで `title = 'todo'.toUpperCase();` にして uppercase メソッドを使う。
2. テンプレート側でパイプを使って、`{{ hello | uppercase }}` のように書き換える。

1 の方法だと、別のコンポーネントでも同じ処理があった場合、また同じ処理をコードで書く必要があります。
2 の方法では、パイプを使って、コードを書く必要がなくなります。

今回はパイプを使ってみましょう。

### **`src/app/app.component.html`**

```diff
<h1>{{ title | uppercase }}</h1>
```

すると、下記のように大文字の TODO になります。

![スクリーンショット 2022-03-04 15 09 36](https://user-images.githubusercontent.com/20474933/156709406-4ed65697-7b3f-41c9-b402-4f3592743a20.png)

ちなみに、[uppercase][uppercase_pipe]は Angular が最初から備えているパイプです。

# todo リストを表示

つづいて、todo リストを表示してみましょう。
todo は複数を想定あるはずなので、配列にいれちゃえ、となりそうですが
[Map オブジェクト][map]を使って、簡単にデータの操作ができるので今回はそちらを使います。

### **`src/app/app.component.ts`**

```diff
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
   title = 'todo';

+  todos = new Map([
+    ['todo1', false],
+    ['todo2', false],
+    ['todo3', true],
+  ]);
}
```

### **`src/app/app.component.html`**

```diff
<h1>{{ title | uppercase }}</h1>

+ <ul>
+   <li *ngFor="let todo of todos | keyvalue">
+     <h2>{{ todo.key }}</h2>
+     <span>{{ todo.value ? "完了" : "未完了" }}</span>
+   </li>
+ </ul>
```

すると、下記のような画面が表示されます。

![スクリーンショット 2022-03-04 15 08 22](https://user-images.githubusercontent.com/20474933/156709268-4ada937a-1356-4ad1-9acd-f7ccdfbb615d.png)

## ポイント

1. [Map オブジェクト][map]を使って、todo リストを表示している
2. new Map の中に引数で、key が todo1, todo2, todo3 の 3 つの todo で、value は、`false`で作成している。

3. コンポーネントで作成された`todos`は html の`todos`にバインディングされます。
4. Angular では、繰り返し処理を行うときに、`*ngFor`を使います。
5. Map オブジェクトはそのままでは、`*ngFor`で繰り返し処理可能な形ではないので、`keyvalue`パイプを使って、`key`と`value`を分けて取り出しています。
6. [`keyvalue`パイプ][keyvalue_pipe]は、Object や Map オブジェクトを繰り返し処理するときに使います。

## Map オブジェクトを使用した理由は下記です

1. 想定される todos の基本的な動き、表示・追加・削除 を行うことができる
2. 今回は同じ名前のキーを持つ todo は登録しない（ステータスを元に戻す動きにする）
3. 2 の動きをするときに、配列操作だと重複チェックをするが、Map オブジェクトはキーが重複していると、value を上書きする動きをするので、重複チェックが省ける

※その他、細かい性能などの点については MDN の[Object と Map の比較][object_vs_map]を確認してください。

いきなり初見殺しかもしれませんが、`new Map`は ES6 で追加された Javascript の API です。
インスタンス化（new）した後に、map オブジェクトのメソッドを使って、Map オブジェクトを操作していきます。

以下 Map と配列のコードを比較しています。

```typescript
const todosMap = new Map();
const todosArr: Record<string, boolean>[] = [];

const addTitle = "todo1";
const undo = false;

// 追加アクション

// ******* Map ********
todosMap.set(addTitle, undo);

// ******* Object Array ********
todosArr.filter((todo) => !Reflect.has(todo, addTitle)).push({ [addTitle]: undo });

// 削除アクション

const deleteTitle = "todo1";

// ******* Map ********
todosMap.delete(deleteTitle);

// ******* Object Array ********
todosArr.filter((todo) => !Reflect.has(todo, deleteTitle));
```

※あくまでも、上記は、新規追加・上書きを想定した配列操作の「一例」です。

存在チェックは省いてもエラーが出ないように、かつ、配列操作ができる、filter と Reflect が個人的には好きで使うので、短く書いてますが、存在チェックを Object.keys で行う人もいるでしょう。

push は配列に破壊的操作をするので、concat を使って、元の配列に影響なくやるべきだという人もいそうです。他には find を使ったり、indexOf つかって index から攻める方法もあったりするでしょう。

オブジェクトのキーの確認方法も Object.keys().some()とかでやったり、lodash などのライブラリを使ったりしたり・・・。

また、そういう繰り返し処理の中で、別の処理を入れたりして複雑さが増えていく箇所でもあります。

## Map と Object の比較まとめ

Map オブジェクトは、データ操作の実装に差がつかないですが、配列操作のほうはやり方に差がだいぶ出そうですね。
そしてなにより、Map オブジェクトは短くて直感的です。
