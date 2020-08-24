const withOffline = require('next-offline')

const nextConfig = {
  workboxOpts: {
    clientsClaim: true,
    runtimeCaching: [
      {
        handler: 'cacheFirst',
        options: {
          cacheName: 'images',
        },
        urlPattern: /(http[s]?:\/\/.*\.(?:png|webp|jpg|jpeg|svg))/,
      },
      {
        handler: 'cacheFirst',
        options: {
          cacheName: 'fonts',
        },
        urlPattern: /\.(?:woff|woff2|otf|ttf)$/,
      },
      {
        handler: 'networkFirst',
        options: {
          cacheName: 'scripts',
        },
        urlPattern: /\.(?:js|jsx)$/,
      },
      {
        handler: 'networkFirst',
        options: {
          cacheableResponse: {
            statuses: [0, 200],
          },
          cacheName: 'offlineCache',
        },
        urlPattern: /http[s]?:\/\/.*/,
      },
    ],
    skipWaiting: true,
    swDest: 'service-worker.js',
  },
}

module.exports = withOffline(nextConfig)