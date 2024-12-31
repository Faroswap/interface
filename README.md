This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

Fork 仓库之后,修改当前链配置

##### 增加环境变量

按照 `.env.sample` 文件夹增加 `.env` 文件

##### 修改图片

1. 替换 `public/favicon.svg` 图片后,使用 rsvg-covert 生成图片

```Bash
cd public

rsvg-convert favicon.svg -o ../app/icon.png
rsvg-convert --width=192 --height=192 favicon.svg -o favicon-192x192.png
rsvg-convert --width=512 --height=512 favicon.svg -o favicon-512x512.png
```

2. 替换 `assets/logo` 文件夹下 logo 和 chain 的图片

3. 模板没有背景图片,如果页面有背景图片需要另外加

##### 修改当前链配置

1. 修改 `manifest.json` 文件中的以下字段 (Safe 钱包需要用到)

```JSON
{
  "short_name": "",
  "name": "",
  "description": "",

  "id": "com.momo.pwa",

  "theme_color": "#ED5AD5",
  "background_color": "#F4F5F6",
  "providedBy": {
    "name": "MOMO",
    "url": "https://momoswap.io"
  }
}
```

2. 修改 `constants/config.ts` 文件配置

##### 修改主题

1. 修改 widget 主题配置 `constants/theme.ts`
2. 修改 `tailwind.config.js`

## License

- [GPL-3.0 ](https://github.com/DODOEX/widgets-single-chain-template/blob/main/LICENSE)
