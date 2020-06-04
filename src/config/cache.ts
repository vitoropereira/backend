import { RedisOptions } from 'ioredis'

interface ICacheConfig {
  drive: 'redis',

  config: {
    redis: RedisOptions
  }
}

export default {
  drive: 'redis',

  config: {
    redis: {
      host: '192.168.99.100',
      port: 6379,
      password: undefined
    }
  }
} as ICacheConfig
