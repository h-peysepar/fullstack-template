import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client: RedisClientType;

  async onModuleInit() {
    this.client = createClient({
      url: process.env.REDIS_URL, // e.g. redis://localhost:6379
    });
    this.client.on('error', (err) => console.error('Redis Client Error', err));
    await this.client.connect();
    console.log('Redis connected');
  }

  async onModuleDestroy() {
    await this.client.disconnect();
    console.log('Redis disconnected');
  }

  getClient() {
    return this.client;
  }

}
