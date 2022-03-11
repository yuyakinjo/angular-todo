[material]: https://material.angular.io/
[list]: https://material.angular.io/components/list/api
[icons]: https://fonts.google.com/icons?selected=Material+Icons

# [Angular Material][material] とは

Angular 専用に用意された マテリアルデザイン規約に沿って作られている コンポーネントです。
基本的なコンポーネントは[こちら](https://material.angular.io/components/categories)で用意されています。

# Angular Material 追加

追加するにはコマンドを実行します。

```fish
npm run ng add @angular/material
```

プロンプトで設定を聞かれますが、すべて Enter で大丈夫です。

# todo-list コンポーネントを置き換え

今回は `todo-list` コンポーネントを置き換えます。

[公式ページの List のコンポーネント][list]を参照してください。

![スクリーンショット 2022-03-11 15 37 06](https://user-images.githubusercontent.com/20474933/157815481-189a0eec-ef4b-4448-b1a3-011b237df4cc.png)

使いたいアイコンは[こちら][icons]から参照してください。

## 1. Module 追加

まずは モジュールを追加します。

## **`src/app/app.module.ts`**

```diff

+ import { MatButtonModule } from '@angular/material/button';
+ import { MatCheckboxModule } from '@angular/material/checkbox';
+ import { MatIconModule } from '@angular/material/icon';
+ import { MatListModule } from '@angular/material/list';

@NgModule({
  // 省略
+  imports: [
    // 省略
+    MatListModule,
+    MatButtonModule,
+    MatIconModule,
+    MatCheckboxModule,
],
  // 省略
```

## 2. コンポーネント追加

必要そうなモジュールを追加したら、あとはコンポーネントを追加して、それぞれに必要な値を対応させると完了です。

## **`src/app/todo-list/todo-list.component.html`**

```html
<ng-container *ngIf="todos | keyvalue | done: status as filterd">
  <h3 *ngIf="filterd.length">{{ status ? doneLabel : inProcessLabel }} {{ filterd.length }}</h3>
  <mat-list role="list">
    <mat-list-item role="listitem" *ngFor="let todo of filterd">
      <mat-checkbox [checked]="todo.value" (change)="changeStatus(todo)">{{ todo.key }}</mat-checkbox>
      <button mat-icon-button (click)="remove(todo.key)"><mat-icon color="warn">delete</mat-icon></button>
    </mat-list-item>
  </mat-list>
</ng-container>
```

![スクリーンショット 2022-03-11 16 58 04](https://user-images.githubusercontent.com/20474933/157826229-c33634c8-e920-453a-a93b-9cab2402778c.png)

残り、`todo-form` なども [`Form Field`](https://material.angular.io/components/form-field/api) などを使って、マテリアルデザインを使ってみましょう。

参考例は下記になります。

## **`src/app/app.module.ts`**

```diff
+ import { MatFormFieldModule } from '@angular/material/form-field';
+ import { MatInputModule } from '@angular/material/input';

@NgModule({
  // 省略
  imports: [
    // 省略
+    MatFormFieldModule,
+    MatInputModule,
  ],
  // 省略
})

```

## **`src/styles.scss`**

```diff
/* You can add global styles to this file, and also import other style files */

html,
body {
  height: 100%;
}
body {
  margin: 0;
  font-family: Roboto, "Helvetica Neue", sans-serif;
}
+ body {
+  display: grid;
+  justify-items: center;
+  width: 100vw;
+ }

```

## **`src/app/todo-form/todo-form.component.html`**

```html
<mat-form-field appearance="standard" [style.width]="'50vw'">
  <mat-label>タイトル</mat-label>
  <input matInput type="text" [formControl]="form" placeholder="タイトルを入力してください" />
  <mat-hint
    >見たい<a href="https://www.amazon.co.jp/gp/video/storefront" rel="noopener noreferrer" target="blank"
      >Primeチャンネル</a
    >など</mat-hint
  >
</mat-form-field>
<button mat-raised-button (click)="add()" *ngIf="!!form.value" color="primary" [style.margin-left]="'1vw'">
  <mat-icon>add</mat-icon>
  <span>追加</span>
</button>
```

![スクリーンショット 2022-03-11 17 43 02](https://user-images.githubusercontent.com/20474933/157832837-a5d4fd6c-0ef1-4b78-983c-421431cbc7de.png)
