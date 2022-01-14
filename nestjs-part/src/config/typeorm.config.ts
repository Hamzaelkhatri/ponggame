
import {TypeOrmModuleOptions} from '@nestjs/typeorm';

export const typeOrmOptions: TypeOrmModuleOptions = {
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "root",
    "database": "test",
    "entities": [__dirname+"/../**/*.entity{.ts,.js}"],
    "synchronize": true
}