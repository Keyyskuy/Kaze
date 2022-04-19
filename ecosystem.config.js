module.exports = {
  apps : [{
    name: `LazyDev`,
    max_memory_restart: `512M`,
    script: 'index.js',
    cron_restart: "0 0 * * SUN"
  }]
};
