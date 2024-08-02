# React Server Components Demo

This repo is a simple demo to show the magic of React Server Components. It recreates the RSC demo [Ryan Florence](https://x.com/ryanflorence) presented in his talk "Mind The Gap" at Big Sky Dev Con 2024 ([Youtube](https://www.youtube.com/watch?v=zqhE-CepH2g&t=1549s)).

## To get started

1. clone this repo
2. install the npm dependencies (`npm install` or `pnpm install`)
3. run the next dev server (`npm run dev` or `pnpm dev`)

## What to look for

This project consists of a single page containing a payment table with some fake data. If you render the 'PaymentsTable', everything will be server rendered and no additional JS is send to the client for hydration. But if you render the 'PaymentsTableSortable' instead, for some reason (the "use client" on top of the component) react knows that it needs to send some additional data over the wire. Check your browser's network tab, filter for JS files, and you will see an additional page.js file being sent over. This is where the magic of react server components begins

To continue, you can also enable sort persistence by passing the initial sort from the mock DB and calling the 'saveUserSort' method inside the 'PaymentsTableSortable' client component. Since the 'saveUserSort' method is a server action, it feels like just using a simple JS method, but actually there is an RPC call to react that calls this method on the server. 
