module.exports = {
  get: jest.fn(() =>
    Promise.resolve({
      data: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Mock Data</title>
        </head>
        <body>
          <main>
            <article>
              <a href="https://path/to/article">
                Pension fund opposes AGL Energy split, but Morningstar recommends in favour
              </a>
            </article>
            <article>
              <a href="https://path/to/article">
                Pension fund opposes AGL Energy split, but Morningstar recommends in favour
              </a>
            </article>
            <article>
              <a href="https://path/to/article">
                Pension fund opposes AGL Energy split, but Morningstar recommends in favour
              </a>
            </article>
            </main>
        </body>
        </html>
    `,
    })
  ),
};
