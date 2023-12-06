import MyDatabase from './db/MyDatabase';

export interface Context {
  db: MyDatabase;
  userId?: number;
}
