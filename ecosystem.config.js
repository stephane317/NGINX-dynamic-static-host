module.exports = {
  apps : [{
    name: 'Landing page system',
    script: 'app.js',
    args: '',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],
  deploy : {
    production : {
      user : 'ubuntu',
      host : '', // ec2 instance
      ref  : 'origin/master',
      repo : '',
      path : '/home/ubuntu/landing',
      'post-deploy' : 'make down up'
    }
  }
};
