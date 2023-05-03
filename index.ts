import { Serve } from 'bun'

export default {
  port: 3000,
  hostname: 'localhost',
  fetch(req) {
    return new Response(`
      <html>
        <head>
          <title>Bun Benchmark</title>
        </head>
        <body>
          <main>
            <h1>Bun Benchmark</h1>
            <p>Current time: ${new Date().toISOString()}</p>
            <p>Request to render time (ms): <span id='render-time' /></p>
            <script>
              const renderTime = new Date() - performance.timing.requestStart
              document.getElementById('render-time').innerText = renderTime.toString()
              console.log('Render time (ms):', renderTime)
            </script>
          </main>
        </body>
      </html>
    `, {
      headers: {
        'Content-Type': 'text/html'
      }
    })
  }
} satisfies Serve