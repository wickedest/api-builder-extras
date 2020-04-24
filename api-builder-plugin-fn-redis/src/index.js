const createRedisClient = require('./redis-client');
const { createPluginWithContext } = require('./utils');

/**
 * Resolves the API Builder plugin.
 * @returns {object} An API Builder plugin.
 */
async function getPlugin(pluginConfig, options) {
	let redisClient;
	try {
		redisClient = await createRedisClient(pluginConfig, options);
	} catch (ex) {
		options.logger.error(
			`Failed to connect to Redis server. Make Redis server is running and conf/redis.default.js is configured`
		);
		return Promise.reject(ex);
	}
	// All you pass here will be set as context for your actions
	return createPluginWithContext({ redisClient });
}

module.exports = getPlugin;