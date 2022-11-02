module.exports = function override(config, env) {
    console.log('override')
    let loaders = config.resolve
    loaders.fallback = {
        "crypto": require.resolve("crypto-browserify"),
        "stream": require.resolve("stream-browserify"),
        "constants": require.resolve("constants-browserify")
    }

    return { ...config, ignoreWarnings: [/Failed to parse source map/] };
}