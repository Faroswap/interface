This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

This is the public repository for Faroswap front-end interfaces, including the Web App, Wallet Mobile App（about Wallet Connection references other public repositories.Faroswap is a protocol for decentralized exchange of pharos-based assets.

## Getting Started

After forking the repository, modify the current chain configuration.

##### Add Environment Variables

Create a `.env` file based on the `.env.sample` file.

##### Modify Images

1.  After replacing the `public/favicon.svg` image, use `rsvg-convert` to generate the other icon files.

<!-- end list -->

```bash
cd public

rsvg-convert favicon.svg -o ../app/icon.png
rsvg-convert --width=192 --height=192 favicon.svg -o favicon-192x192.png
rsvg-convert --width=512 --height=512 favicon.svg -o favicon-512x512.png
```

2.  Replace the logo and chain images in the `assets/logo` folder.

3.  The template does not have a background image. If your page requires a background image, you will need to add it.

##### Modify the Current Chain Configuration

1.  Modify the following fields in the `manifest.json` file (this is required for the Safe wallet):

<!-- end list -->

```json
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

2.  Modify the configuration in the `constants/config.ts` file.

##### Modify the Theme

1.  Modify the widget theme configuration in `constants/theme.ts`.
2.  Modify `tailwind.config.js`.

## Relevant Links
Website: https://faroswap.xyz/

Docs: https://docs.faroswap.xyz/

## License

  - [GPL-3.0 ](https://github.com/DODOEX/widgets-single-chain-template/blob/main/LICENSE)
