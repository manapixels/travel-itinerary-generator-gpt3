import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <meta property="og:title" content="Travel Itinerary Generator with GPT-3" key="title"/>
        <meta property="og:description" content="Generate travel itineraries for free" key="description"/>
        <meta
          property="og:image"
          content="https://github.com/manapixels/travel-itinerary-generator-gpt3/blob/main/assets/screenshot-for-web.png?raw=true"
        />
        <meta name="twitter:card" content="summary_large_image"></meta>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
