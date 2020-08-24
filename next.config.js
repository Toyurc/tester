const withOffline = require('next-offline')

const nextConfig = {
  // Target must be serverless
  target: 'serverless',
  workboxOpts: {
    clientsClaim: true,
    runtimeCaching: [
      {
        handler: 'CacheFirst',
        options: {
          cacheName: 'images',
        },
        urlPattern: /(http[s]?:\/\/.*\.(?:png|webp|jpg|jpeg|svg))/,
      },
      {
        handler: 'CacheFirst',
        options: {
          cacheName: 'fonts',
        },
        urlPattern: /\.(?:woff|woff2|otf|ttf)$/,
      },
      {
        handler: 'NetworkFirst',
        options: {
          cacheName: 'scripts',
        },
        urlPattern: /\.(?:js|jsx)$/,
      },
      {
        handler: 'NetworkFirst',
        options: {
          cacheableResponse: {
            statuses: [0, 200],
          },
          cacheName: 'OfflineCache',
        },
        urlPattern: /http[s]?:\/\/.*/,
      },
    ],
    skipWaiting: true,
    swDest: 'service-worker.js',
  },
}

module.exports = withOffline(nextConfig)