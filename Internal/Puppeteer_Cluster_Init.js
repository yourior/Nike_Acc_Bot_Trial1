const { Cluster } = require('puppeteer-cluster');
exports.Cluster = async(maxConcurrency)=>
{
  // Create a cluster with 2 workers
    const cluster = await Cluster.launch({
        concurrency: Cluster.CONCURRENCY_CONTEXT,
        maxConcurrency: maxConcurrency,
        puppeteerOptions : {
            args: [
              '--use-gl=egl',
              // '--disable-web-security',
              // '--disable-features=IsolateOrigins',
              // '--disable-site-isolation-trials',
              '--no-sandbox',
              '--disable-setuid-sandbox',
              '--window-size=1280x720',
              // '--disable-accelerated-2d-canvas',
              // '--no-zygote',
              // '--renderer-process-limit=1',
              // '--no-first-run',
              '--ignore-certificate-errors',
              '--ignore-certificate-errors-spki-list',
              // '--disable-dev-shm-usage',
              // '--disable-infobars',
              '--lang=en-US,en',
              '--window-size=1920x1080',
              // '--disable-extensions',
              // '--disable-blink-features=AutomationControlled',
            //   '--proxy-server=http://'+proxyUrl
            ], 
            headless: false, 
            // slowMo: 150,
            executablePath: Chrome ,
            // devtools: true
          }
    });

    // Define a task (in this case: screenshot of page)
    await cluster.task(async ({ page, data: url }) => {
        await page.goto(url);

        const path = url.replace(/[^a-zA-Z]/g, '_') + '.png';
        await page.screenshot({ path });
        console.log(`Screenshot of ${url} saved: ${path}`);
    });

    // Add some pages to queue
    cluster.queue('https://www.google.com');
    cluster.queue('https://www.wikipedia.org');
    cluster.queue('https://github.com/');

    // Shutdown after everything is done
    await cluster.idle();
    await cluster.close();

}