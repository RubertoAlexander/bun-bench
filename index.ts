import { Serve } from 'bun'

const complicatedFunc = async () => {
  console.log('Complicated function called')
  const largeBlob = await fetch('https://raw.githubusercontent.com/json-iterator/test-data/master/large-file.json');
  const json = await largeBlob.json();

  console.log('Writing files')

  console.log('bun write:', Bun.write)

  // for (let i = 0; i < 3; i++) {
    const file = Bun.file(`./large-file-${i}.json`);
    console.log('file:', file)
    await Bun.write(Bun.file(`./large-file-${i}.json`), JSON.stringify(json));
  // }

  console.log('Done writing files')
  
  return json;
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