import { Serve } from 'bun'

const complicatedFunc = async () => {

  // for (let i = 0; i < 20; i++) {
    const file = Bun.file('large-file-0.json')
    console.log('file', file, file.size)
    const data = await file.json();
  // }
}

export default {
  port: process.env.PORT || 3000,
  async fetch(req) {
    let error = '';

    try {
      await complicatedFunc();
    }
    catch (e) {
      console.log(e)
      error = e.message;
    }
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
            <p>Fetch error: ${error}</p>
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