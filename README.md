# Industry Atlas

Site to display imputed U.S. employment by industry and county.

This is a rework of `industryatlas.org` ([kenny101/industryatlas](https://github.com/kenny101/industryatlas)) with data served statically.

## Data

The [scripts/build_data.py](scripts/build_data.py) script downloads original data from [fpeckert.me/cbp](https://www.fpeckert.me/cbp/),
and reformats it to [public/data](public/data).

```sh
python scripts/build_data.py
```

## Site

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

Preview the site:

```sh
npm run dev
```

Update the served version:

```sh
npm run build
```
