[confirm]: https://developer.mozilla.org/ja/docs/Web/API/Window/confirm
[decorators]: https://www.typescriptlang.org/docs/handbook/decorators.html

# 削除前に、簡易的に確認ダイアログを表示する

デフォルトのダイアログを表示するときは、[confirm][confirm]API を使用します。

window は省略することができます。

また、確認後の結果で、`true`, `false` を受け取ることができます。

これを使って、削除前にガード句を用意して、削除前の確認を促します。

## **`src/app/todo-list/todo-list.component.ts`**

```diff
import { KeyValue } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TodoService } from '../service/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {
  @Input() status = false;

  @Input() doneLabel = '完了';

  @Input() inProcessLabel = '未完了';

  todos = this.todoService.todos;

  constructor(private todoService: TodoService) {}

  changeStatus(todo: KeyValue<string, boolean>) {
    this.todoService.changeStatus(todo);
  }

  remove(title: string) {
+    if (!confirm('削除してもいいですか？')) return;
    this.todoService.delete(title);
  }
}
```

![スクリーンショット 2022-03-11 11 47 18](https://user-images.githubusercontent.com/20474933/157792584-28902b55-2d51-4cde-9e8e-266b11a0be99.png)

これは、confirm のメッセージを表示して、`いいえ` を押すと `false` が返って、そのまま関数を抜けるようにいなっています（正確には undefined を返しています）。

一行でわかりにくい場合もあるかと思いますので、省略しない場合も例示しておきます。

```typescript
  remove(title: string) {
    const agree = confirm('削除してもいいですか？');
    if(!agree) return;
    this.todoService.delete(title);
  }
```

# デコレーターを使用してみる

上記の確認プロセスを実装するには、関数化したり、外部ファイルにしたりすると思いますが
Typescript には[デコレーター][decorators]が備わっていて、Angular でもよく出てきます。
[デコレーター][decorators]を理解するために、[デコレーター][decorators]使用して再利用できるようにしていきます。

# デコレーターとは

[デコレーター][decorators]とは、クラスを修飾（デコレーション）するので、デコレーターと呼ばれています。

中身は関数です。

クラスを使用する場面で使用します。

Angular でも、`@Component`や、`@Input` などもデコーレーターがよく出てきます。

またデコレーションは定義する場所を選択できます。

`constructor`、クラスメンバー、クラスメソッドの直上で定義することで各プロパティに介入することができます。

```typescript
@Logger()
class Person {
  @Uppercase()
  name: string = "bob";

  constructor(name: string) {}

  @Dialog()
  hello() {
    return this.name;
  }
}

new Person().hello();
```

上記の インスタンス化されたあとの `Person` を見た時、なんとなく 大文字の `BOB` が表示されたダイアログが開きそうですね。

# `decorators.ts` を用意

自作のデコレーターを定義するファイルを用意します。
場所は src 配下であればどこでも構いません。
今回は`src/app` 配下に作成します。

```fish
touch ./src/app/decorators.ts
```

# デコレーターの使用方法イメージ

デコレーターの説明が長くなりましたが、
今回は、`confirm` ダイアログを表示し、使用場所は`クラスメソッド`で使えるようなデコレーターを作成します。

下記のような使用イメージです。
`@Confirm` を呼び出すと、delete が呼び出される前に、確認ダイアログが表示されます。

また 確認メッセージ を指定できるようにしたいため、引数もとれるようにします。

```typescript
@Confirm("削除してもいいですか？")
remove(target) {
  this.service.delete(target);
}
```

## @Confirm の実装

実際にコードに落とすと下記になります。

## **`src/app/decorators.ts`**

```typescript
export function Confirm(message: string) {
  return function (target: Object, key: string | symbol, descriptor: PropertyDescriptor) {
    const original = descriptor.value;
    descriptor.value = function (...args: any[]) {
      const agree = confirm(message);
      return confirm(message) ? original.apply(this, args) : null;
    };

    return descriptor;
  };
}
```

## ポイント

- `descriptor.value` は、ここでの中身は `remove` 関数です。
- confirm を呼び出した結果で, remove を呼び出すか(`original.apply(this, args)`)、何もせず(`null`)を返します。

少し複雑にはなりましたが、クラスメソッドで呼び出す場合、

```typescript
const agree = confirm(message);
```

の一行以外はテンプレートみたいなものです。
デコレーターはクラスに介入するので、使用されている言葉などがやや抽象的な実装になりました。

これで下記のように変更をすると、同じ挙動になると思います。

## **`src/app/todo-list/todo-list.component.ts`**

```diff

import { KeyValue } from '@angular/common';
import { Component, Input } from '@angular/core';
+ import { Confirm } from '../decorators';
import { TodoService } from '../service/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {
  @Input() status = false;

  @Input() doneLabel = '完了';

  @Input() inProcessLabel = '未完了';

  todos = this.todoService.todos;

  constructor(private todoService: TodoService) {}

  changeStatus(todo: KeyValue<string, boolean>) {
    this.todoService.changeStatus(todo);
  }

+ @Confirm('削除してもいいですか？')
  remove(title: string) {
-   if(!confirm("削除してもいいですか？")) return;
    this.todoService.delete(title);
  }
}
```

お疲れさまでした 🐴
