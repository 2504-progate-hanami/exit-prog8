# Exit-prog8
Progate版 8番出口ライクゲームです

## 準備
### `.env` を作成する
プロジェクトルートの `.env.example` をコピーし、`.env` という名前にリネームして作成してください
- supabase の環境変数まわり：[こちら](https://discordapp.com/channels/1353648286208360479/1353648286732652548/1364390807603384420)

## 各操作
### サーバを起動する
```sh
# デバッグ環境（ホットリロード）
npm run dev

# 本番環境
npm run build
npm start
```

### コードを成型する
```sh
npm run format:fix
```