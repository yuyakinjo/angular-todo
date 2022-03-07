[map]: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Map
[object_vs_map]: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Map#objects_vs._maps
[angular_pipe_introduction]: https://angular.jp/guide/pipes
[keyvalue_pipe]: https://angular.jp/api/common/KeyValuePipe
[uppercase_pipe]: https://angular.jp/api/common/UpperCasePipe
[binding-syntax]: https://angular.jp/guide/binding-syntax#types-of-data-binding

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

# フォームの追加

タイトルを入力して、「追加」ボタンを押すと、追加されたタスクが表示されるようにします。

Angular では、[テンプレート駆動](https://angular.jp/guide/forms)と[リアクティブフォーム](https://angular.jp/guide/reactive-forms)の 2 種類でフォームを作ることができます。

# 2. [テンプレート駆動](https://angular.jp/guide/forms)と[リアクティブフォーム](https://angular.jp/guide/reactive-forms)

簡単にいうと、[テンプレート駆動](https://angular.jp/guide/forms)はテンプレート側(HTML)にモデルを記述し、[リアクティブフォーム](https://angular.jp/guide/reactive-forms)はコンポーネント側でモデル(入力値)を管理します。

テンプレート駆動とリアクティブフォームの違いについての詳細は[こちら](https://angular.jp/guide/forms-overview)に公式で比較がまとめられています。

フォームを作る上で、どちらも重要なアプローチですが、[リアクティブフォーム](https://angular.jp/guide/reactive-forms)のほうが Typescript で書ける（HTML 知らん）のでリアクティブフォームを採用します。

## ReactiveFormsModule の追加

まずは`app.component.ts`に`ReactiveFormModule`を追加します。

### **`src/app/app.module.ts`**

```diff
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
+  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

これで、`ReactiveFormsModule`を使用することができます。

# todo のタイトル入力フォームを表示

### **`src/app/app.component.ts`**

```diff
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'todo';

+  readonly form = new FormControl('');

+  todos = new Map();

+  add() {
+    this.todos.set(this.form.value, false);
+    this.form.setValue('');
+  }
}
```

### **`src/app/app.component.html`**

```diff
<h1>{{ title | uppercase }}</h1>

+ <input type="text" [formControl]="form" placeholder="タイトルを入力" />
+ <button (click)="add()">追加</button>

<ul>
  <li *ngFor="let todo of todos | keyvalue">
+   <input type="checkbox" [checked]="todo.value" />
    <span>{{ todo.key }}</span>
  </li>
</ul>
```

## ポイント

1. `new FormControl('')` で ReactiveForm を初期化。初期値は空文字列。
2. テンプレートの `<input type="text" [formControl]="form" />` に `form` をバインド。
3. `(click)` は クリックイベントをバインドでき、コンポーネント側の `add()` メソッドを呼び出す
4. `[checked]` は input の チェックボックスのプロパティとバインドできる。

[テンプレートとコンポーネント側を結びつける構文][binding-syntax]はいくつか種類があります。

今回使用するのは下記です。

1. 変数にバインド `{{ title }}` のように波括弧で囲む
2. イベントにバインド `(click)` のように丸括弧
3. プロパティにバインド `[checked]` のように四角い括弧

画面をみると、下記のようになっていると思います。

![スクリーンショット 2022-03-04 16 42 30](https://user-images.githubusercontent.com/20474933/156720790-59c11ef3-3d19-411e-ac75-c5b5e9a10f73.png)

フォームになにかタイトルを入力して、追加ボタンを押すと、`todos` に追加されます。

↓

![スクリーンショット 2022-03-04 16 43 07](https://user-images.githubusercontent.com/20474933/156720753-1934ec60-6623-4def-aeae-8e47233e64d5.png)

# todos のデータ更新

実は、追加した todo をのチェックボックスをクリックしても、`todos` は更新されてません。

html 上のチェックボックスがチェックついたり消えたりしているだけです。
なので、チェックボックスのイベントもバインドしましょう。

### **`src/app/app.component.ts`**

```diff
import { KeyValue } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'todo';

  readonly form = new FormControl('');

  todos = new Map<string, boolean>();

  add() {
    this.todos.set(this.form.value, false);
    this.form.setValue('');
  }

+  changeStatus(todo: KeyValue<string, boolean>) {
+    this.todos.set(todo.key, !todo.value);
+  }
}
```

### **`src/app/app.component.html`**

```diff
<h1>{{ title | uppercase }}</h1>

<input type="text" [formControl]="form" placeholder="タイトルを入力" />
<button (click)="add()">追加</button>

<ul>
  <li *ngFor="let todo of todos | keyvalue">
    <input
      type="checkbox"
      [checked]="todo.value"
+      (click)="changeStatus(todo)"
    />
    <span>{{ todo.key }}</span>
  </li>
</ul>
```

これで、チェックボックスをクリックすると、`todos` のステータスが更新されます。
見た目上は変わりません。

# 空文字対応

空文字のまま、追加ボタンを押すと、空文字が追加されてしまいます。

![スクリーンショット 2022-03-04 16 45 04](https://user-images.githubusercontent.com/20474933/156721016-800d36ce-1b4a-46f9-8dc1-31f0dafdfa5a.png)

これを防ぐには 2 つあります。

1. 空文字の時は追加ボタンを表示しない（テンプレート側の対処）
2. 空文字の時は追加しない（コンポーネント側の対処）

両方やっていきましょう。

### **`src/app/app.component.html`**

```diff
<h1>{{ title | uppercase }}</h1>

<input type="text" [formControl]="form" placeholder="タイトルを入力" />
+ <button (click)="add()" *ngIf="!!form.value">追加</button>

<ul>
  <li *ngFor="let todo of todos | keyvalue">
    <input
      type="checkbox"
      [checked]="todo.value"
      (click)="changeStatus(todo)"
    />
    <span>{{ todo.key }}</span>
  </li>
</ul>

```

### **`src/app/app.component.ts`**

```diff
import { KeyValue } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'todo';

  readonly form = new FormControl('');

  todos = new Map<string, boolean>();

  add() {
+    if (!this.form.value) return;
    this.todos.set(this.form.value, false);
    this.form.setValue('');
  }

  changeStatus(todo: KeyValue<string, boolean>) {
    this.todos.set(todo.key, !todo.value);
  }
}
```

## ポイント

1. `*ngIf` に true → 表示、false → 非表示
2. `!!form.value` は空文字のとき、false, それ以外は true になります。(`!!` は 値を boolean に変換する演算子でよく使われます)

# 未完了・完了 を 分けて表示

現在、完了・未完了の todo を一緒に表示していますが、ふたつに分けて表示するとなったら、どうしますか？

例として下記のようになります。

![スクリーンショット 2022-03-04 17 27 53](https://user-images.githubusercontent.com/20474933/156727229-0edd35d1-46e0-4e79-bbcb-c4a78f136276.png)

データが配列の場合、コンポーネント側で `filter` などで分割しておいて、それぞれの要素を表示します。

```typescript
const todos = [{ title1: true }, { title2: false }];

const dones = todos.filter((todo) => Reflect.get(todo, Reflect.ownKeys(todo).at(0)));
const undones = todos.filter((todo) => !Reflect.get(todo, Reflect.ownKeys(todo).at(0)));
```

- すごく見通し悪いです(Object.keys などを使っても同じでしょう) 💦
- `at(0)` は `Reflect.ownKeys(todo)` の 0 番目の要素を取得していますが、0 とか使いたくないですね

しかし、今回は Map オブジェクトを使用していて、Map オブジェクトには、現在のデータを分割するようなメソッドはありません。

## パイプを自作

今回は自作でパイプを作って、パイプで条件分岐を行ってみます。

AngularCLI で `ng generate pipe` を実行して、パイプを作成します。

```fish
npx ng g pipe pipes/done --skip-tests
```

## 未完了のみを表示してみる

パイプをつかって、未完了のみを表示してみます。

### **`src/app/app.component.ts`**

```diff
<h1>{{ title | uppercase }}</h1>

<input type="text" [formControl]="form" placeholder="タイトルを入力" />
<button (click)="add()" *ngIf="!!form.value">追加</button>

<ul>
  <h2>未完了</h2>
+  <li *ngFor="let todo of todos | keyvalue | done">
    <input
      type="checkbox"
      [checked]="todo.value"
      (click)="changeStatus(todo)"
    />
    <span>{{ todo.key }}</span>
  </li>
</ul>
```

### **`src/app/pipes/done.pipe.ts`**

```diff
import { KeyValue } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'done',
})
export class DonePipe implements PipeTransform {
+  transform(todos: KeyValue<string, boolean>[]) {
+    return todos.filter(({ value }) => !value);
+  }
}
```

## ポイント

1. テンプレート側に`done`という名前をつけて、パイプを使用するようにしました。
2. `done` は、`@Pipe`　の`name: 'done'` で指定しています。
3. KeyValue パイプのあとで使用しているので、`transform`の第一引数に渡ってくる値は `KeyValue<string, boolean>[]` です。
4. Map オブジェクト が 配列に変換されているので、`filter` で分割しています。

画面で todo 作成してみてください。

![スクリーンショット 2022-03-04 18 19 11](https://user-images.githubusercontent.com/20474933/156735343-2e4a3386-b227-46f1-baef-b01faaec53ac.png)

今作成した todo を完了してみてください。
そうすると、未完了のみが表示されるので、完了した todo が消えるようになります。

## 未完了・完了を表示

donePipe は、未完了を表示するようになっていますが、柔軟に使いまわせるように、第 2 引数をとって完了・未完了を表示するようにしましょう。
テンプレート側でパイプに`:`をつけて、パイプの引数を渡します。

## **`src/app/app.component.html`**

```diff
<h1>{{ title | uppercase }}</h1>

<input type="text" [formControl]="form" placeholder="タイトルを入力" />
<button (click)="add()" *ngIf="!!form.value">追加</button>

<ul>
  <h2>未完了</h2>
+  <li *ngFor="let todo of todos | keyvalue | done: false">
    <input
      type="checkbox"
      [checked]="todo.value"
      (click)="changeStatus(todo)"
    />
    <span>{{ todo.key }}</span>
  </li>
+  <h2>完了</h2>
+  <li *ngFor="let todo of todos | keyvalue | done: true">
+    <input
+      type="checkbox"
+      [checked]="todo.value"
+      (click)="changeStatus(todo)"
+    />
+    <span>{{ todo.key }}</span>
+  </li>
</ul>
```

### **`src/app/pipes/done.pipe.ts`**

```diff
import { KeyValue } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'done',
})
export class DonePipe implements PipeTransform {
+  transform(todos: KeyValue<string, boolean>[], done = true) {
+    return todos.filter(({ value }) => value === done);
+  }
}
```

## ポイント

1. パイプの引数に `:` をつけて、パイプの引数を渡します。
2. 渡された引数は、transform の第 2 引数に渡されます。
3. transform の第 2 引数 `done` は初期値をとることもでき、その場合は 引数を省略もできます。

これで下記のように条件分けができました。

![スクリーンショット 2022-03-04 18 33 34](https://user-images.githubusercontent.com/20474933/156737816-f8772790-11b4-429d-9d22-b2066f22c381.png)

# 各 todo の個数表示

各 todo の個数を表示するようにしましょう。

それには一度、`done`パイプを通過した後の個数が知りたいです。

## **`src/app/app.component.html`**

```diff
<h1>{{ title | uppercase }}</h1>

<input type="text" [formControl]="form" placeholder="タイトルを入力" />
<button (click)="add()" *ngIf="!!form.value">追加</button>
+ <h2>登録数 {{ todos.size }}</h2>

<ul>
+  <ng-container *ngIf="todos | keyvalue | done: false as undones">
+    <h3>未完了 {{ undones.length }}</h3>
+    <li *ngFor="let todo of undones">
+      <input
+        type="checkbox"
+        [checked]="todo.value"
+        (click)="changeStatus(todo)"
+      />
+      <span>{{ todo.key }}</span>
+    </li>
+  </ng-container>
+
+  <ng-container *ngIf="todos | keyvalue | done: true as dones">
+    <h3>完了 {{ dones.length }}</h3>
+    <li *ngFor="let todo of dones">
+      <input
+        type="checkbox"
+        [checked]="todo.value"
+        (click)="changeStatus(todo)"
+      />
+      <span>{{ todo.key }}</span>
+    </li>
+  </ng-container>
</ul>
```

## ポイント

1. Map オブジェクトは `size` というメソッドで個数を取得できます。
2. `ng-container` は React でいう `Fragment` と同じです。実際にはレンダリングされません。
3. `done`パイプ通過後のデータは `as` を使って、`undoens` と `dones` として取得します。

下記のように表示ができれば OK です。

![スクリーンショット 2022-03-04 19 15 36](https://user-images.githubusercontent.com/20474933/156744685-612e3999-faf6-4b69-bc39-d778aa54b1cd.png)

# コンポーネントを作成

テンプレートが膨らんできたので、コンポーネントを用意してみましょう。
完了・未完了での違いを抽出することで、リストの記述はひとつにしたいです。
違いをまとめると 2 つです。

- タイトル (string)
- ステータス（boolean）

上記を変更できるコンポーネントを作っていきます。

AngularCLI でコンポーネントを生成するコマンドを実行します。

```fish
npx ng generate component components/todo-list
```

略することも可能です ↓

```fish
npx ng g c components/todo-list
```

## `todo-list` コンポーネント表示

まずは新しく作成したコンポーネントを表示してみます。
他コンポーネントに表示するときは接頭辞に「app」をつけるとルールになってます。
これは各コンポーネントの TS ファイルの `selector` で定義されています。

## **`src/app/app.component.html`**

```diff
<h1>{{ title | uppercase }}</h1>

<input type="text" [formControl]="form" placeholder="タイトルを入力" />
<button (click)="add()" *ngIf="!!form.value">追加</button>

+ <app-todo-list></app-todo-list>
<ul>
  <h2>未完了</h2>
  <li *ngFor="let todo of todos | keyvalue | done: false">
    <input
      type="checkbox"
      [checked]="todo.value"
      (click)="changeStatus(todo)"
    />
    <span>{{ todo.key }}</span>
  </li>
  <h2>完了</h2>
  <li *ngFor="let todo of todos | keyvalue | done: true">
    <input
      type="checkbox"
      [checked]="todo.value"
      (click)="changeStatus(todo)"
    />
    <span>{{ todo.key }}</span>
  </li>
</ul>

```

まずは、「todo-list wroks!」と表示されました。
ここに移植していきます。

![スクリーンショット 2022-03-05 10 45 20](https://user-images.githubusercontent.com/20474933/156862683-1a54b56f-b96d-4c53-ab37-38e3bf9bd3a8.png)

## コンポーネント移植

app.component.ts に 記述されている todo-list の箇所を移植します。

まずは

## **`src/app/components/todo-list/todo-list.component.html`**

```diff
+ <ul>
+   <h2>未完了</h2>
+   <li *ngFor="let todo of todos | keyvalue | done: false">
+     <input
+       type="checkbox"
+       [checked]="todo.value"
+       (click)="changeStatus(todo)"
+     />
+     <span>{{ todo.key }}</span>
+   </li>
+   <h2>完了</h2>
+   <li *ngFor="let todo of todos | keyvalue | done: true">
+     <input
+       type="checkbox"
+       [checked]="todo.value"
+       (click)="changeStatus(todo)"
+     />
+     <span>{{ todo.key }}</span>
+   </li>
+ </ul>
```

## **`src/app/components/todo-list/todo-list.component.ts`**

```diff
+ import { KeyValue } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {
+  todos = new Map<string, boolean>();

+  changeStatus(todo: KeyValue<string, boolean>) {
+    this.todos.set(todo.key, !todo.value);
+  }
}

```

## **`src/app/app.component.html`**

```diff
<h1>{{ title | uppercase }}</h1>

<input type="text" [formControl]="form" placeholder="タイトルを入力" />
<button (click)="add()" *ngIf="!!form.value">追加</button>

<app-todo-list></app-todo-list>
- <ul>
-  <h2>未完了</h2>
-  <li *ngFor="let todo of todos | keyvalue | done: false">
-    <input
-      type="checkbox"
-      [checked]="todo.value"
-      (click)="changeStatus(todo)"
-    />
-    <span>{{ todo.key }}</span>
-  </li>
-  <h2>完了</h2>
-  <li *ngFor="let todo of todos | keyvalue | done: true">
-    <input
-      type="checkbox"
-      [checked]="todo.value"
-      (click)="changeStatus(todo)"
-    />
-    <span>{{ todo.key }}</span>
-  </li>
- </ul>

```

## **`src/app/app.component.ts`**

```diff
- import { KeyValue } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'todo';

  readonly form = new FormControl('');

  todos = new Map<string, boolean>();

  add() {
    if (!this.form.value) return;
    this.todos.set(this.form.value, false);
    this.form.setValue('');
  }

-  changeStatus(todo: KeyValue<string, boolean>) {
-    this.todos.set(todo.key, !todo.value);
-  }
}
```

これだと、各コンポーネントの `todos` が一致していないので、
todo のタイトルを入力して追加しても、リストに表示されません。
そこで、簡易的に親コンポーネント（`app.component.ts`）から子コンポーネント(`todo-list-component.ts`)に`todos`を渡しましょう。

# `Input`を使って、親コンポーネントから子コンポーネントに値を渡す

## **`src/app/app.component.ts`**

```diff
<h1>{{ title | uppercase }}</h1>

<input type="text" [formControl]="form" placeholder="タイトルを入力" />
<button (click)="add()" *ngIf="!!form.value">追加</button>

+ <app-todo-list [todos]="todos"></app-todo-list>
```

## **`src/app/components/todo-list/todo-list.component.ts`**

```diff
import { KeyValue } from '@angular/common';
+ import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {
+  @Input() todos = new Map<string, boolean>();

  changeStatus(todo: KeyValue<string, boolean>) {
    this.todos.set(todo.key, !todo.value);
  }
}
```

## サービス追加

ただ、このままでは、親コンポーネントと子コンポーネント で二重に `todos` が定義されている上、その他コンポーネントが作成されていくたびに、どのコンポーネントでどの値を渡さなきゃいけないのか把握する・そのままでは機能しないのは面倒です。

この場合、todos がそれぞれ別のどこかで独立した値になっていると良さそうです。

そこで、コンポーネントを横断できるサービスを作成します。

```fish
new: npx ng g service services/todo --skip-tests
```

このサービスは、シングルトンで、複数で定義しても、一意のクラスです。

まずは、`todos` を `TodoService` で定義します。

## **`src/app/services/todo.service.ts`**

```diff
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
+  readonly todos = new Map<string, boolean>();
}
```

コンポーネント内でサービスを使用するには、constructor で定義をします。

## **`src/app/app.component.ts`**

```diff
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TodoService } from './services/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'todo';

  readonly form = new FormControl('');

+  todos = this.todoService.todos;

+  constructor(private todoService: TodoService) {}

  add() {
    if (!this.form.value) return;
    this.todos.set(this.form.value, false);
    this.form.setValue('');
  }
}
```

## **`src/app/components/todo-list/todo-list.component.ts`**

```diff
import { KeyValue } from '@angular/common';
import { Component } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {
+ readonly todos = this.todoService.todos;

+ constructor(private todoService: TodoService) {}

  changeStatus(todo: KeyValue<string, boolean>) {
    this.todos.set(todo.key, !todo.value);
  }
}
```

これで `@Input()` は、不要になったので、テンプレート側で削除しておきます。

## **`src/app/app.component.html`**

```diff
<h1>{{ title | uppercase }}</h1>

<input type="text" [formControl]="form" placeholder="タイトルを入力" />
<button (click)="add()" *ngIf="!!form.value">追加</button>

- <app-todo-list [todos]="todos"></app-todo-list>
+ <app-todo-list></app-todo-list>
```

これで、`todos` は、`TodoService` から取得して、コンポーネントが単独で機能するようになりました。

ビジネスロジックは、サービスで定義されているのが良しとされているので
`changeStatus`も、サービスで定義してそれを使いましょう。

## **`src/app/services/todo.service.ts`**

```diff
import { KeyValue } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  readonly todos = new Map<string, boolean>();

+  changeStatus(todo: KeyValue<string, boolean>) {
+    this.todos.set(todo.key, !todo.value);
+  }
}
```

## **`src/app/components/todo-list/todo-list.component.ts`**

```diff
import { KeyValue } from '@angular/common';
import { Component } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {
  readonly todos = this.todoService.todos;

  constructor(private todoService: TodoService) {}

  changeStatus(todo: KeyValue<string, boolean>) {
+    this.todoService.changeStatus(todo);
  }
}
```

# todo-form 作成

`app.component.ts` には 構成だけが見える状態にしておけば、見通しがよくなるので `todo-form` を作成します。

```fish
npx ng g c components/todo-form --skip-tests
```

## **`src/app/app.component.html`**

```diff
<h1>{{ title | uppercase }}</h1>

+ <app-todo-form></app-todo-form>
- <input type="text" [formControl]="form" placeholder="タイトルを入力" />
- <button (click)="add()" *ngIf="!!form.value">追加</button>

<app-todo-list></app-todo-list>
```

## **`src/app/app.component.ts`**

```diff
import { Component } from '@angular/core';
- import { FormControl } from '@angular/forms';
- import { TodoService } from './services/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'todo';
-
-  readonly form = new FormControl('');
-
-  todos = this.todoService.todos;
-
-  constructor(private todoService: TodoService) {}
-
-  add() {
-    if (!this.form.value) return;
-    this.todos.set(this.form.value, false);
-    this.form.setValue('');
-  }
}

```

## **`src/app/components/todo-form/todo-form.component.html`**

```diff
+ <input type="text" [formControl]="form" placeholder="タイトルを入力" />
+ <button (click)="add()" *ngIf="!!form.value">追加</button>
```

## **`src/app/components/todo-form/todo-form.component.ts`**

```diff
import { Component } from '@angular/core';
+ import { FormControl } from '@angular/forms';
+ import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
})
export class TodoFormComponent {
+  readonly form = new FormControl('');

+  todos = this.todoService.todos;

+  constructor(private todoService: TodoService) {}

+  add() {
+    if (!this.form.value) return;
+    this.todos.set(this.form.value, false);
+    this.form.setValue('');
+  }
}
```

これで、`app.component.ts` に `todo-form` を追加して、`todo-form` を使えるようになりました。
実際の `app.component.html` にビジネスロジックがなく、各コンポーネントで独立して責務を果たせる形になっているかと思います。

```html
<h1>{{ title | uppercase }}</h1>

<app-todo-form></app-todo-form>

<app-todo-list></app-todo-list>
```

### 実際の画面

![スクリーンショット 2022-03-07 10 27 45](https://user-images.githubusercontent.com/20474933/156952660-fb70321c-8ed2-42cf-9fd5-91652d9ab6bb.png)

# 削除機能追加

残りの機能を追加していきます。

- 削除機能
- リロードしても消えないように LocalStorage に保存

削除から実装しましょう。

まずはサービスに削除機能を追加 → コンポーネントで実装という流れにしましょう。

## サービスで削除機能追加

## **`src/app/services/todo.service.ts`**

```diff
import { KeyValue } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  readonly todos = new Map<string, boolean>();

  changeStatus(todo: KeyValue<string, boolean>) {
    this.todos.set(todo.key, !todo.value);
  }

+  remove(title: string) {
+    this.todos.delete(title);
+  }
}
```

Map オブジェクト には、delete メソッドに、key を渡すことで削除できるようになっています。
今 key は todo-form で入力した `title` になっているので、`title` を引数で受け取ります。

続いて、remove をコンポーネント側で実装します。

完了・未完了の両方で追加します。

## **`src/app/components/todo-list/todo-list.component.html`**

```diff
<ul>
  <h2>未完了</h2>
  <li *ngFor="let todo of todos | keyvalue | done: false">
    <input
      type="checkbox"
      [checked]="todo.value"
      (click)="changeStatus(todo)"
    />
    <span>{{ todo.key }}</span>
+    <button (click)="remove(todo.key)">削除</button>
  </li>
  <h2>完了</h2>
  <li *ngFor="let todo of todos | keyvalue | done: true">
    <input
      type="checkbox"
      [checked]="todo.value"
      (click)="changeStatus(todo)"
    />
    <span>{{ todo.key }}</span>
+    <button (click)="remove(todo.key)">削除</button>
  </li>
</ul>
```

## **`src/app/components/todo-list/todo-list.component.ts`**

```diff
import { KeyValue } from '@angular/common';
import { Component } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {
  readonly todos = this.todoService.todos;

  constructor(private todoService: TodoService) {}

  changeStatus(todo: KeyValue<string, boolean>) {
    this.todoService.changeStatus(todo);
  }

+  remove(title: string) {
+    this.todoService.remove(title);
+  }
}
```

下記のような画面になって、削除ボタンを押すと、サービスの `remove` メソッドが実行され 対象の`todo`が消えるようになっていれば OK です。

![スクリーンショット 2022-03-07 10 46 29](https://user-images.githubusercontent.com/20474933/156953963-d25e0a2f-8bb7-4a6d-91ca-139cd7a9dd95.png)

お疲れ様でした。
