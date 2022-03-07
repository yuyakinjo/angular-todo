[プライベートフィールド]: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Classes/Private_class_fields
[マテリアルデザイン]: https://material.angular.io/

# LocalStorage に保存

現在はリロードを行うと、追加した `todo` は消えてしまいます。
API サーバーなどがある場合は、起動時に `todo` を取得してリストに表示されるのですが、現状は冗長的に保存する仕組みはありません。
[LocalStorage](https://developer.mozilla.org/ja/docs/Web/API/Window/localStorage) を使って、ブラウザにデータを保存したり、読み込んだりすることで、追加した `todo` を消えないようにしましょう。
普段、LocalStorage を使う時は、プライバシー上漏れても問題のない設定がよいでしょう（ダークテーマとか)。

# 保存するために文字列に変換

LocalStorage は、キーと値を保存することができます。
LocalStorage に保存するときの値は `string` 形式 になります。
今、todos は Map オブジェクトなので、少し面倒ですが、下記の変換方法になります。

- 保存時の変換の流れ

```fish
Map オブジェクト → オブジェクト → JSON 文字列
```

- 読み取り時の変換の流れ

```fish
JSON 文字列　 → オブジェクト → Map オブジェクト
```

キー名はなんでもよいので、今回は `todos` としましょう。

1. Map オブジェクトをオブジェクトに変換するときは、[Object.fromEntries](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries)を使用します。
2. オブジェクトを JSON 文字列に変換するときは、[JSON.stringify](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)を使用します。

上記をまとめると、以下のようクラスメソッドになります。

```typescript
  #backup(){
    const mapToObject = Object.fromEntries(this.todos);
    localStorage.setItem('todos', JSON.stringify(mapToObject));
  }
```

`todos` が変化した後に `backup` メソッドを呼び込むと良さそうです。

また、`Object.fromEntries` を使用するには、tsconfig の lib を`es2019`にしてください。

## **`tsconfig.json`**

```diff
/* To learn more about this file see: https://angular.io/config/tsconfig. */
{
    // 省略
+    "lib": ["es2019", "dom"],
    // 省略
}
```

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
+    this.#backup();
  }

  remove(title: string) {
    this.todos.delete(title);
+    this.#backup();
  }

+  #backup() {
+    const mapToObject = Object.fromEntries(this.todos);
+    localStorage.setItem('todos', JSON.stringify(mapToObject));
+  }
}
```

基本的に、`todos` が変化するのは サービス内でのみなので、コンポーネントなどで呼び出されても、backup を`backup` メソッドは呼び出す必要がありません。 メソッドとして呼び出させたくないときは、[プライベートフィールド(#)][プライベートフィールド]を使用します。[プライベートフィールド(#)][プライベートフィールド]は、クラス内でのみ使用できます。

# LocalStorage から 読み出し

次は、LocalStorage から `todos` を読み込んで、Map オブジェクトの初期値として使用します。
Map オブジェクトの初期値として使用するには、new Map()の第一引数に取り込むと良さそうです。
コードが長くなるので、`snapshot`　という名前のメンバーにして切り出しておきます。

## **`src/app/services/todo.service.ts`**

```diff
import { KeyValue } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
+  snapshot = Object.entries<boolean>(
+    JSON.parse(localStorage.getItem('todos') ?? '{}')
+  );

+  readonly todos = new Map<string, boolean>(this.snapshot);

  changeStatus(todo: KeyValue<string, boolean>) {
    this.todos.set(todo.key, !todo.value);
    this.#backup();
  }

  remove(title: string) {
    this.todos.delete(title);
    this.#backup();
  }

  add(title: string) {
    this.todos.set(title, false);
    this.#backup();
  }

  #backup() {
    const mapToObject = Object.fromEntries(this.todos);
    localStorage.setItem('todos', JSON.stringify(mapToObject));
  }
}
```

LocalStorage から読み込むには、`localStorage.getItem` を使用します。
しかし、対象のキーが存在しない場合は、`null` を返します。
`null`を返すと、Object.entries() は エラー を返してしまいます。

`??` は [Null 合体演算子](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator) といい `null` と `undefined` だった時のみ、`"{}"` を返すという挙動をさせています。

もし`localStorage`が `null`を返した時は、空のオブジェクト`{}` を 返してあげると、Object.entries はエラーを返さなくなります。

ちなみに、LocalStorage で保存したデータは、下記のように検証ウィンドウで確認することができます。

![スクリーンショット 2022-03-07 12 57 47](https://user-images.githubusercontent.com/20474933/156965521-19a530be-bddd-4653-8cec-ad7633d4e3f0.png)

todo を追加したり、ブラウザをリロードしたりしてみても、操作前と同じのはずです。

これで、`todos` を保存することができました。

TODO 作成編はここまでです。

要件は満たした実装は完了です。

しかし、このアプリにはまだスタイルがいけてないため、[マテリアルデザイン][マテリアルデザイン]に挑戦するのもおすすめです。

こちらも React や Vue などのフレームワークに用意されているデザインフレームワークと同じような API で[マテリアルデザイン][マテリアルデザイン]を構築することができます。
