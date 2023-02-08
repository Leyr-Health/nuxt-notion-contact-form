![Leyr Logo](https://leyr.io/images/logo-text.svg)

# Custom Contact Forms with Nuxt 3 Notion Slack

![GitHub Cover](/contact-form-notion-slack.png)

Check the full [story](https://leyr.io/blog/how-we-replaced-3rd-party-feedback-forms-with-notion) in our blog to learn more.

## Setup

Update your environment variables, e.g. in `.env` file.

```bash
NOTION_KEY=your_notion_key

NOTION_DATABASE_ID=your_notion_database_id
```

More on how to get them in [our blog post](https://leyr.io/blog/how-we-replaced-3rd-party-feedback-forms-with-notion).

Make sure to install the dependencies:

```bash
# npm
npm install

# yarn
yarn install
```

We are using [Vuetify.js](https://next.vuetifyjs.com/) as our UI framework.

There are other UI modules, officially supported by Nuxt 3, listed [here](https://nuxt.com/modules?category=UI).

## Development Server

Start the development server on http://localhost:3000

```bash
# npm
npm run dev

# yarn
yarn dev
```
