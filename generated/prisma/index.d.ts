
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model UsersQuestion
 * 
 */
export type UsersQuestion = $Result.DefaultSelection<Prisma.$UsersQuestionPayload>
/**
 * Model UsersEstimation
 * 
 */
export type UsersEstimation = $Result.DefaultSelection<Prisma.$UsersEstimationPayload>
/**
 * Model UsersClients
 * 
 */
export type UsersClients = $Result.DefaultSelection<Prisma.$UsersClientsPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserRoles: {
  admin: 'admin',
  moderator: 'moderator',
  user: 'user'
};

export type UserRoles = (typeof UserRoles)[keyof typeof UserRoles]


export const UserRate: {
  default: 'default',
  standard: 'standard',
  pro: 'pro'
};

export type UserRate = (typeof UserRate)[keyof typeof UserRate]

}

export type UserRoles = $Enums.UserRoles

export const UserRoles: typeof $Enums.UserRoles

export type UserRate = $Enums.UserRate

export const UserRate: typeof $Enums.UserRate

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.usersQuestion`: Exposes CRUD operations for the **UsersQuestion** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UsersQuestions
    * const usersQuestions = await prisma.usersQuestion.findMany()
    * ```
    */
  get usersQuestion(): Prisma.UsersQuestionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.usersEstimation`: Exposes CRUD operations for the **UsersEstimation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UsersEstimations
    * const usersEstimations = await prisma.usersEstimation.findMany()
    * ```
    */
  get usersEstimation(): Prisma.UsersEstimationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.usersClients`: Exposes CRUD operations for the **UsersClients** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UsersClients
    * const usersClients = await prisma.usersClients.findMany()
    * ```
    */
  get usersClients(): Prisma.UsersClientsDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.7.0
   * Query Engine version: 3cff47a7f5d65c3ea74883f1d736e41d68ce91ed
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    UsersQuestion: 'UsersQuestion',
    UsersEstimation: 'UsersEstimation',
    UsersClients: 'UsersClients'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "usersQuestion" | "usersEstimation" | "usersClients"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      UsersQuestion: {
        payload: Prisma.$UsersQuestionPayload<ExtArgs>
        fields: Prisma.UsersQuestionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UsersQuestionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersQuestionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UsersQuestionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersQuestionPayload>
          }
          findFirst: {
            args: Prisma.UsersQuestionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersQuestionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UsersQuestionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersQuestionPayload>
          }
          findMany: {
            args: Prisma.UsersQuestionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersQuestionPayload>[]
          }
          create: {
            args: Prisma.UsersQuestionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersQuestionPayload>
          }
          createMany: {
            args: Prisma.UsersQuestionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UsersQuestionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersQuestionPayload>[]
          }
          delete: {
            args: Prisma.UsersQuestionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersQuestionPayload>
          }
          update: {
            args: Prisma.UsersQuestionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersQuestionPayload>
          }
          deleteMany: {
            args: Prisma.UsersQuestionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UsersQuestionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UsersQuestionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersQuestionPayload>[]
          }
          upsert: {
            args: Prisma.UsersQuestionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersQuestionPayload>
          }
          aggregate: {
            args: Prisma.UsersQuestionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsersQuestion>
          }
          groupBy: {
            args: Prisma.UsersQuestionGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsersQuestionGroupByOutputType>[]
          }
          count: {
            args: Prisma.UsersQuestionCountArgs<ExtArgs>
            result: $Utils.Optional<UsersQuestionCountAggregateOutputType> | number
          }
        }
      }
      UsersEstimation: {
        payload: Prisma.$UsersEstimationPayload<ExtArgs>
        fields: Prisma.UsersEstimationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UsersEstimationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersEstimationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UsersEstimationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersEstimationPayload>
          }
          findFirst: {
            args: Prisma.UsersEstimationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersEstimationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UsersEstimationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersEstimationPayload>
          }
          findMany: {
            args: Prisma.UsersEstimationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersEstimationPayload>[]
          }
          create: {
            args: Prisma.UsersEstimationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersEstimationPayload>
          }
          createMany: {
            args: Prisma.UsersEstimationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UsersEstimationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersEstimationPayload>[]
          }
          delete: {
            args: Prisma.UsersEstimationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersEstimationPayload>
          }
          update: {
            args: Prisma.UsersEstimationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersEstimationPayload>
          }
          deleteMany: {
            args: Prisma.UsersEstimationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UsersEstimationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UsersEstimationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersEstimationPayload>[]
          }
          upsert: {
            args: Prisma.UsersEstimationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersEstimationPayload>
          }
          aggregate: {
            args: Prisma.UsersEstimationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsersEstimation>
          }
          groupBy: {
            args: Prisma.UsersEstimationGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsersEstimationGroupByOutputType>[]
          }
          count: {
            args: Prisma.UsersEstimationCountArgs<ExtArgs>
            result: $Utils.Optional<UsersEstimationCountAggregateOutputType> | number
          }
        }
      }
      UsersClients: {
        payload: Prisma.$UsersClientsPayload<ExtArgs>
        fields: Prisma.UsersClientsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UsersClientsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersClientsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UsersClientsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersClientsPayload>
          }
          findFirst: {
            args: Prisma.UsersClientsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersClientsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UsersClientsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersClientsPayload>
          }
          findMany: {
            args: Prisma.UsersClientsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersClientsPayload>[]
          }
          create: {
            args: Prisma.UsersClientsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersClientsPayload>
          }
          createMany: {
            args: Prisma.UsersClientsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UsersClientsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersClientsPayload>[]
          }
          delete: {
            args: Prisma.UsersClientsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersClientsPayload>
          }
          update: {
            args: Prisma.UsersClientsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersClientsPayload>
          }
          deleteMany: {
            args: Prisma.UsersClientsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UsersClientsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UsersClientsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersClientsPayload>[]
          }
          upsert: {
            args: Prisma.UsersClientsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersClientsPayload>
          }
          aggregate: {
            args: Prisma.UsersClientsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsersClients>
          }
          groupBy: {
            args: Prisma.UsersClientsGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsersClientsGroupByOutputType>[]
          }
          count: {
            args: Prisma.UsersClientsCountArgs<ExtArgs>
            result: $Utils.Optional<UsersClientsCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    usersQuestion?: UsersQuestionOmit
    usersEstimation?: UsersEstimationOmit
    usersClients?: UsersClientsOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    clients: number
    estimation: number
    questions: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    clients?: boolean | UserCountOutputTypeCountClientsArgs
    estimation?: boolean | UserCountOutputTypeCountEstimationArgs
    questions?: boolean | UserCountOutputTypeCountQuestionsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountClientsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UsersClientsWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountEstimationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UsersEstimationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountQuestionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UsersQuestionWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
    telegramId: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
    telegramId: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    telegramId: number | null
    username: string | null
    role: $Enums.UserRoles | null
    rate: $Enums.UserRate | null
    lastAction: Date | null
    firstAction: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    telegramId: number | null
    username: string | null
    role: $Enums.UserRoles | null
    rate: $Enums.UserRate | null
    lastAction: Date | null
    firstAction: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    telegramId: number
    username: number
    role: number
    rate: number
    lastAction: number
    firstAction: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
    telegramId?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
    telegramId?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    telegramId?: true
    username?: true
    role?: true
    rate?: true
    lastAction?: true
    firstAction?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    telegramId?: true
    username?: true
    role?: true
    rate?: true
    lastAction?: true
    firstAction?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    telegramId?: true
    username?: true
    role?: true
    rate?: true
    lastAction?: true
    firstAction?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    telegramId: number
    username: string
    role: $Enums.UserRoles
    rate: $Enums.UserRate
    lastAction: Date
    firstAction: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    telegramId?: boolean
    username?: boolean
    role?: boolean
    rate?: boolean
    lastAction?: boolean
    firstAction?: boolean
    clients?: boolean | User$clientsArgs<ExtArgs>
    estimation?: boolean | User$estimationArgs<ExtArgs>
    questions?: boolean | User$questionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    telegramId?: boolean
    username?: boolean
    role?: boolean
    rate?: boolean
    lastAction?: boolean
    firstAction?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    telegramId?: boolean
    username?: boolean
    role?: boolean
    rate?: boolean
    lastAction?: boolean
    firstAction?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    telegramId?: boolean
    username?: boolean
    role?: boolean
    rate?: boolean
    lastAction?: boolean
    firstAction?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "telegramId" | "username" | "role" | "rate" | "lastAction" | "firstAction", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    clients?: boolean | User$clientsArgs<ExtArgs>
    estimation?: boolean | User$estimationArgs<ExtArgs>
    questions?: boolean | User$questionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      clients: Prisma.$UsersClientsPayload<ExtArgs>[]
      estimation: Prisma.$UsersEstimationPayload<ExtArgs>[]
      questions: Prisma.$UsersQuestionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      telegramId: number
      username: string
      role: $Enums.UserRoles
      rate: $Enums.UserRate
      lastAction: Date
      firstAction: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    clients<T extends User$clientsArgs<ExtArgs> = {}>(args?: Subset<T, User$clientsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsersClientsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    estimation<T extends User$estimationArgs<ExtArgs> = {}>(args?: Subset<T, User$estimationArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsersEstimationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    questions<T extends User$questionsArgs<ExtArgs> = {}>(args?: Subset<T, User$questionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsersQuestionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly telegramId: FieldRef<"User", 'Int'>
    readonly username: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'UserRoles'>
    readonly rate: FieldRef<"User", 'UserRate'>
    readonly lastAction: FieldRef<"User", 'DateTime'>
    readonly firstAction: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.clients
   */
  export type User$clientsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsersClients
     */
    select?: UsersClientsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsersClients
     */
    omit?: UsersClientsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersClientsInclude<ExtArgs> | null
    where?: UsersClientsWhereInput
    orderBy?: UsersClientsOrderByWithRelationInput | UsersClientsOrderByWithRelationInput[]
    cursor?: UsersClientsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UsersClientsScalarFieldEnum | UsersClientsScalarFieldEnum[]
  }

  /**
   * User.estimation
   */
  export type User$estimationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsersEstimation
     */
    select?: UsersEstimationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsersEstimation
     */
    omit?: UsersEstimationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersEstimationInclude<ExtArgs> | null
    where?: UsersEstimationWhereInput
    orderBy?: UsersEstimationOrderByWithRelationInput | UsersEstimationOrderByWithRelationInput[]
    cursor?: UsersEstimationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UsersEstimationScalarFieldEnum | UsersEstimationScalarFieldEnum[]
  }

  /**
   * User.questions
   */
  export type User$questionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsersQuestion
     */
    select?: UsersQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsersQuestion
     */
    omit?: UsersQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersQuestionInclude<ExtArgs> | null
    where?: UsersQuestionWhereInput
    orderBy?: UsersQuestionOrderByWithRelationInput | UsersQuestionOrderByWithRelationInput[]
    cursor?: UsersQuestionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UsersQuestionScalarFieldEnum | UsersQuestionScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model UsersQuestion
   */

  export type AggregateUsersQuestion = {
    _count: UsersQuestionCountAggregateOutputType | null
    _avg: UsersQuestionAvgAggregateOutputType | null
    _sum: UsersQuestionSumAggregateOutputType | null
    _min: UsersQuestionMinAggregateOutputType | null
    _max: UsersQuestionMaxAggregateOutputType | null
  }

  export type UsersQuestionAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    CAC: number | null
    LTV: number | null
  }

  export type UsersQuestionSumAggregateOutputType = {
    id: number | null
    userId: number | null
    CAC: number | null
    LTV: number | null
  }

  export type UsersQuestionMinAggregateOutputType = {
    id: number | null
    userId: number | null
    isTakingBonus: boolean | null
    whatsABusiness: string | null
    conversion: string | null
    about: string | null
    CAC: number | null
    LTV: number | null
  }

  export type UsersQuestionMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    isTakingBonus: boolean | null
    whatsABusiness: string | null
    conversion: string | null
    about: string | null
    CAC: number | null
    LTV: number | null
  }

  export type UsersQuestionCountAggregateOutputType = {
    id: number
    userId: number
    isTakingBonus: number
    whatsABusiness: number
    conversion: number
    about: number
    CAC: number
    LTV: number
    _all: number
  }


  export type UsersQuestionAvgAggregateInputType = {
    id?: true
    userId?: true
    CAC?: true
    LTV?: true
  }

  export type UsersQuestionSumAggregateInputType = {
    id?: true
    userId?: true
    CAC?: true
    LTV?: true
  }

  export type UsersQuestionMinAggregateInputType = {
    id?: true
    userId?: true
    isTakingBonus?: true
    whatsABusiness?: true
    conversion?: true
    about?: true
    CAC?: true
    LTV?: true
  }

  export type UsersQuestionMaxAggregateInputType = {
    id?: true
    userId?: true
    isTakingBonus?: true
    whatsABusiness?: true
    conversion?: true
    about?: true
    CAC?: true
    LTV?: true
  }

  export type UsersQuestionCountAggregateInputType = {
    id?: true
    userId?: true
    isTakingBonus?: true
    whatsABusiness?: true
    conversion?: true
    about?: true
    CAC?: true
    LTV?: true
    _all?: true
  }

  export type UsersQuestionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UsersQuestion to aggregate.
     */
    where?: UsersQuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UsersQuestions to fetch.
     */
    orderBy?: UsersQuestionOrderByWithRelationInput | UsersQuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UsersQuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UsersQuestions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UsersQuestions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UsersQuestions
    **/
    _count?: true | UsersQuestionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UsersQuestionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UsersQuestionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsersQuestionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsersQuestionMaxAggregateInputType
  }

  export type GetUsersQuestionAggregateType<T extends UsersQuestionAggregateArgs> = {
        [P in keyof T & keyof AggregateUsersQuestion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsersQuestion[P]>
      : GetScalarType<T[P], AggregateUsersQuestion[P]>
  }




  export type UsersQuestionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UsersQuestionWhereInput
    orderBy?: UsersQuestionOrderByWithAggregationInput | UsersQuestionOrderByWithAggregationInput[]
    by: UsersQuestionScalarFieldEnum[] | UsersQuestionScalarFieldEnum
    having?: UsersQuestionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsersQuestionCountAggregateInputType | true
    _avg?: UsersQuestionAvgAggregateInputType
    _sum?: UsersQuestionSumAggregateInputType
    _min?: UsersQuestionMinAggregateInputType
    _max?: UsersQuestionMaxAggregateInputType
  }

  export type UsersQuestionGroupByOutputType = {
    id: number
    userId: number
    isTakingBonus: boolean
    whatsABusiness: string
    conversion: string
    about: string
    CAC: number
    LTV: number
    _count: UsersQuestionCountAggregateOutputType | null
    _avg: UsersQuestionAvgAggregateOutputType | null
    _sum: UsersQuestionSumAggregateOutputType | null
    _min: UsersQuestionMinAggregateOutputType | null
    _max: UsersQuestionMaxAggregateOutputType | null
  }

  type GetUsersQuestionGroupByPayload<T extends UsersQuestionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsersQuestionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsersQuestionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsersQuestionGroupByOutputType[P]>
            : GetScalarType<T[P], UsersQuestionGroupByOutputType[P]>
        }
      >
    >


  export type UsersQuestionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    isTakingBonus?: boolean
    whatsABusiness?: boolean
    conversion?: boolean
    about?: boolean
    CAC?: boolean
    LTV?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["usersQuestion"]>

  export type UsersQuestionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    isTakingBonus?: boolean
    whatsABusiness?: boolean
    conversion?: boolean
    about?: boolean
    CAC?: boolean
    LTV?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["usersQuestion"]>

  export type UsersQuestionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    isTakingBonus?: boolean
    whatsABusiness?: boolean
    conversion?: boolean
    about?: boolean
    CAC?: boolean
    LTV?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["usersQuestion"]>

  export type UsersQuestionSelectScalar = {
    id?: boolean
    userId?: boolean
    isTakingBonus?: boolean
    whatsABusiness?: boolean
    conversion?: boolean
    about?: boolean
    CAC?: boolean
    LTV?: boolean
  }

  export type UsersQuestionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "isTakingBonus" | "whatsABusiness" | "conversion" | "about" | "CAC" | "LTV", ExtArgs["result"]["usersQuestion"]>
  export type UsersQuestionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UsersQuestionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UsersQuestionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $UsersQuestionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UsersQuestion"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      isTakingBonus: boolean
      whatsABusiness: string
      conversion: string
      about: string
      CAC: number
      LTV: number
    }, ExtArgs["result"]["usersQuestion"]>
    composites: {}
  }

  type UsersQuestionGetPayload<S extends boolean | null | undefined | UsersQuestionDefaultArgs> = $Result.GetResult<Prisma.$UsersQuestionPayload, S>

  type UsersQuestionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UsersQuestionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsersQuestionCountAggregateInputType | true
    }

  export interface UsersQuestionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UsersQuestion'], meta: { name: 'UsersQuestion' } }
    /**
     * Find zero or one UsersQuestion that matches the filter.
     * @param {UsersQuestionFindUniqueArgs} args - Arguments to find a UsersQuestion
     * @example
     * // Get one UsersQuestion
     * const usersQuestion = await prisma.usersQuestion.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UsersQuestionFindUniqueArgs>(args: SelectSubset<T, UsersQuestionFindUniqueArgs<ExtArgs>>): Prisma__UsersQuestionClient<$Result.GetResult<Prisma.$UsersQuestionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UsersQuestion that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UsersQuestionFindUniqueOrThrowArgs} args - Arguments to find a UsersQuestion
     * @example
     * // Get one UsersQuestion
     * const usersQuestion = await prisma.usersQuestion.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UsersQuestionFindUniqueOrThrowArgs>(args: SelectSubset<T, UsersQuestionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UsersQuestionClient<$Result.GetResult<Prisma.$UsersQuestionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UsersQuestion that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersQuestionFindFirstArgs} args - Arguments to find a UsersQuestion
     * @example
     * // Get one UsersQuestion
     * const usersQuestion = await prisma.usersQuestion.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UsersQuestionFindFirstArgs>(args?: SelectSubset<T, UsersQuestionFindFirstArgs<ExtArgs>>): Prisma__UsersQuestionClient<$Result.GetResult<Prisma.$UsersQuestionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UsersQuestion that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersQuestionFindFirstOrThrowArgs} args - Arguments to find a UsersQuestion
     * @example
     * // Get one UsersQuestion
     * const usersQuestion = await prisma.usersQuestion.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UsersQuestionFindFirstOrThrowArgs>(args?: SelectSubset<T, UsersQuestionFindFirstOrThrowArgs<ExtArgs>>): Prisma__UsersQuestionClient<$Result.GetResult<Prisma.$UsersQuestionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UsersQuestions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersQuestionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UsersQuestions
     * const usersQuestions = await prisma.usersQuestion.findMany()
     * 
     * // Get first 10 UsersQuestions
     * const usersQuestions = await prisma.usersQuestion.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usersQuestionWithIdOnly = await prisma.usersQuestion.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UsersQuestionFindManyArgs>(args?: SelectSubset<T, UsersQuestionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsersQuestionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UsersQuestion.
     * @param {UsersQuestionCreateArgs} args - Arguments to create a UsersQuestion.
     * @example
     * // Create one UsersQuestion
     * const UsersQuestion = await prisma.usersQuestion.create({
     *   data: {
     *     // ... data to create a UsersQuestion
     *   }
     * })
     * 
     */
    create<T extends UsersQuestionCreateArgs>(args: SelectSubset<T, UsersQuestionCreateArgs<ExtArgs>>): Prisma__UsersQuestionClient<$Result.GetResult<Prisma.$UsersQuestionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UsersQuestions.
     * @param {UsersQuestionCreateManyArgs} args - Arguments to create many UsersQuestions.
     * @example
     * // Create many UsersQuestions
     * const usersQuestion = await prisma.usersQuestion.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UsersQuestionCreateManyArgs>(args?: SelectSubset<T, UsersQuestionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UsersQuestions and returns the data saved in the database.
     * @param {UsersQuestionCreateManyAndReturnArgs} args - Arguments to create many UsersQuestions.
     * @example
     * // Create many UsersQuestions
     * const usersQuestion = await prisma.usersQuestion.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UsersQuestions and only return the `id`
     * const usersQuestionWithIdOnly = await prisma.usersQuestion.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UsersQuestionCreateManyAndReturnArgs>(args?: SelectSubset<T, UsersQuestionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsersQuestionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UsersQuestion.
     * @param {UsersQuestionDeleteArgs} args - Arguments to delete one UsersQuestion.
     * @example
     * // Delete one UsersQuestion
     * const UsersQuestion = await prisma.usersQuestion.delete({
     *   where: {
     *     // ... filter to delete one UsersQuestion
     *   }
     * })
     * 
     */
    delete<T extends UsersQuestionDeleteArgs>(args: SelectSubset<T, UsersQuestionDeleteArgs<ExtArgs>>): Prisma__UsersQuestionClient<$Result.GetResult<Prisma.$UsersQuestionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UsersQuestion.
     * @param {UsersQuestionUpdateArgs} args - Arguments to update one UsersQuestion.
     * @example
     * // Update one UsersQuestion
     * const usersQuestion = await prisma.usersQuestion.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UsersQuestionUpdateArgs>(args: SelectSubset<T, UsersQuestionUpdateArgs<ExtArgs>>): Prisma__UsersQuestionClient<$Result.GetResult<Prisma.$UsersQuestionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UsersQuestions.
     * @param {UsersQuestionDeleteManyArgs} args - Arguments to filter UsersQuestions to delete.
     * @example
     * // Delete a few UsersQuestions
     * const { count } = await prisma.usersQuestion.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UsersQuestionDeleteManyArgs>(args?: SelectSubset<T, UsersQuestionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UsersQuestions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersQuestionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UsersQuestions
     * const usersQuestion = await prisma.usersQuestion.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UsersQuestionUpdateManyArgs>(args: SelectSubset<T, UsersQuestionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UsersQuestions and returns the data updated in the database.
     * @param {UsersQuestionUpdateManyAndReturnArgs} args - Arguments to update many UsersQuestions.
     * @example
     * // Update many UsersQuestions
     * const usersQuestion = await prisma.usersQuestion.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UsersQuestions and only return the `id`
     * const usersQuestionWithIdOnly = await prisma.usersQuestion.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UsersQuestionUpdateManyAndReturnArgs>(args: SelectSubset<T, UsersQuestionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsersQuestionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UsersQuestion.
     * @param {UsersQuestionUpsertArgs} args - Arguments to update or create a UsersQuestion.
     * @example
     * // Update or create a UsersQuestion
     * const usersQuestion = await prisma.usersQuestion.upsert({
     *   create: {
     *     // ... data to create a UsersQuestion
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UsersQuestion we want to update
     *   }
     * })
     */
    upsert<T extends UsersQuestionUpsertArgs>(args: SelectSubset<T, UsersQuestionUpsertArgs<ExtArgs>>): Prisma__UsersQuestionClient<$Result.GetResult<Prisma.$UsersQuestionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UsersQuestions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersQuestionCountArgs} args - Arguments to filter UsersQuestions to count.
     * @example
     * // Count the number of UsersQuestions
     * const count = await prisma.usersQuestion.count({
     *   where: {
     *     // ... the filter for the UsersQuestions we want to count
     *   }
     * })
    **/
    count<T extends UsersQuestionCountArgs>(
      args?: Subset<T, UsersQuestionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsersQuestionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UsersQuestion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersQuestionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsersQuestionAggregateArgs>(args: Subset<T, UsersQuestionAggregateArgs>): Prisma.PrismaPromise<GetUsersQuestionAggregateType<T>>

    /**
     * Group by UsersQuestion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersQuestionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UsersQuestionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UsersQuestionGroupByArgs['orderBy'] }
        : { orderBy?: UsersQuestionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UsersQuestionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsersQuestionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UsersQuestion model
   */
  readonly fields: UsersQuestionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UsersQuestion.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UsersQuestionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UsersQuestion model
   */
  interface UsersQuestionFieldRefs {
    readonly id: FieldRef<"UsersQuestion", 'Int'>
    readonly userId: FieldRef<"UsersQuestion", 'Int'>
    readonly isTakingBonus: FieldRef<"UsersQuestion", 'Boolean'>
    readonly whatsABusiness: FieldRef<"UsersQuestion", 'String'>
    readonly conversion: FieldRef<"UsersQuestion", 'String'>
    readonly about: FieldRef<"UsersQuestion", 'String'>
    readonly CAC: FieldRef<"UsersQuestion", 'Float'>
    readonly LTV: FieldRef<"UsersQuestion", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * UsersQuestion findUnique
   */
  export type UsersQuestionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsersQuestion
     */
    select?: UsersQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsersQuestion
     */
    omit?: UsersQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersQuestionInclude<ExtArgs> | null
    /**
     * Filter, which UsersQuestion to fetch.
     */
    where: UsersQuestionWhereUniqueInput
  }

  /**
   * UsersQuestion findUniqueOrThrow
   */
  export type UsersQuestionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsersQuestion
     */
    select?: UsersQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsersQuestion
     */
    omit?: UsersQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersQuestionInclude<ExtArgs> | null
    /**
     * Filter, which UsersQuestion to fetch.
     */
    where: UsersQuestionWhereUniqueInput
  }

  /**
   * UsersQuestion findFirst
   */
  export type UsersQuestionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsersQuestion
     */
    select?: UsersQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsersQuestion
     */
    omit?: UsersQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersQuestionInclude<ExtArgs> | null
    /**
     * Filter, which UsersQuestion to fetch.
     */
    where?: UsersQuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UsersQuestions to fetch.
     */
    orderBy?: UsersQuestionOrderByWithRelationInput | UsersQuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UsersQuestions.
     */
    cursor?: UsersQuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UsersQuestions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UsersQuestions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UsersQuestions.
     */
    distinct?: UsersQuestionScalarFieldEnum | UsersQuestionScalarFieldEnum[]
  }

  /**
   * UsersQuestion findFirstOrThrow
   */
  export type UsersQuestionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsersQuestion
     */
    select?: UsersQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsersQuestion
     */
    omit?: UsersQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersQuestionInclude<ExtArgs> | null
    /**
     * Filter, which UsersQuestion to fetch.
     */
    where?: UsersQuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UsersQuestions to fetch.
     */
    orderBy?: UsersQuestionOrderByWithRelationInput | UsersQuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UsersQuestions.
     */
    cursor?: UsersQuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UsersQuestions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UsersQuestions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UsersQuestions.
     */
    distinct?: UsersQuestionScalarFieldEnum | UsersQuestionScalarFieldEnum[]
  }

  /**
   * UsersQuestion findMany
   */
  export type UsersQuestionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsersQuestion
     */
    select?: UsersQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsersQuestion
     */
    omit?: UsersQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersQuestionInclude<ExtArgs> | null
    /**
     * Filter, which UsersQuestions to fetch.
     */
    where?: UsersQuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UsersQuestions to fetch.
     */
    orderBy?: UsersQuestionOrderByWithRelationInput | UsersQuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UsersQuestions.
     */
    cursor?: UsersQuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UsersQuestions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UsersQuestions.
     */
    skip?: number
    distinct?: UsersQuestionScalarFieldEnum | UsersQuestionScalarFieldEnum[]
  }

  /**
   * UsersQuestion create
   */
  export type UsersQuestionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsersQuestion
     */
    select?: UsersQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsersQuestion
     */
    omit?: UsersQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersQuestionInclude<ExtArgs> | null
    /**
     * The data needed to create a UsersQuestion.
     */
    data: XOR<UsersQuestionCreateInput, UsersQuestionUncheckedCreateInput>
  }

  /**
   * UsersQuestion createMany
   */
  export type UsersQuestionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UsersQuestions.
     */
    data: UsersQuestionCreateManyInput | UsersQuestionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UsersQuestion createManyAndReturn
   */
  export type UsersQuestionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsersQuestion
     */
    select?: UsersQuestionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UsersQuestion
     */
    omit?: UsersQuestionOmit<ExtArgs> | null
    /**
     * The data used to create many UsersQuestions.
     */
    data: UsersQuestionCreateManyInput | UsersQuestionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersQuestionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UsersQuestion update
   */
  export type UsersQuestionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsersQuestion
     */
    select?: UsersQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsersQuestion
     */
    omit?: UsersQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersQuestionInclude<ExtArgs> | null
    /**
     * The data needed to update a UsersQuestion.
     */
    data: XOR<UsersQuestionUpdateInput, UsersQuestionUncheckedUpdateInput>
    /**
     * Choose, which UsersQuestion to update.
     */
    where: UsersQuestionWhereUniqueInput
  }

  /**
   * UsersQuestion updateMany
   */
  export type UsersQuestionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UsersQuestions.
     */
    data: XOR<UsersQuestionUpdateManyMutationInput, UsersQuestionUncheckedUpdateManyInput>
    /**
     * Filter which UsersQuestions to update
     */
    where?: UsersQuestionWhereInput
    /**
     * Limit how many UsersQuestions to update.
     */
    limit?: number
  }

  /**
   * UsersQuestion updateManyAndReturn
   */
  export type UsersQuestionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsersQuestion
     */
    select?: UsersQuestionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UsersQuestion
     */
    omit?: UsersQuestionOmit<ExtArgs> | null
    /**
     * The data used to update UsersQuestions.
     */
    data: XOR<UsersQuestionUpdateManyMutationInput, UsersQuestionUncheckedUpdateManyInput>
    /**
     * Filter which UsersQuestions to update
     */
    where?: UsersQuestionWhereInput
    /**
     * Limit how many UsersQuestions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersQuestionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UsersQuestion upsert
   */
  export type UsersQuestionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsersQuestion
     */
    select?: UsersQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsersQuestion
     */
    omit?: UsersQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersQuestionInclude<ExtArgs> | null
    /**
     * The filter to search for the UsersQuestion to update in case it exists.
     */
    where: UsersQuestionWhereUniqueInput
    /**
     * In case the UsersQuestion found by the `where` argument doesn't exist, create a new UsersQuestion with this data.
     */
    create: XOR<UsersQuestionCreateInput, UsersQuestionUncheckedCreateInput>
    /**
     * In case the UsersQuestion was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UsersQuestionUpdateInput, UsersQuestionUncheckedUpdateInput>
  }

  /**
   * UsersQuestion delete
   */
  export type UsersQuestionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsersQuestion
     */
    select?: UsersQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsersQuestion
     */
    omit?: UsersQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersQuestionInclude<ExtArgs> | null
    /**
     * Filter which UsersQuestion to delete.
     */
    where: UsersQuestionWhereUniqueInput
  }

  /**
   * UsersQuestion deleteMany
   */
  export type UsersQuestionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UsersQuestions to delete
     */
    where?: UsersQuestionWhereInput
    /**
     * Limit how many UsersQuestions to delete.
     */
    limit?: number
  }

  /**
   * UsersQuestion without action
   */
  export type UsersQuestionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsersQuestion
     */
    select?: UsersQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsersQuestion
     */
    omit?: UsersQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersQuestionInclude<ExtArgs> | null
  }


  /**
   * Model UsersEstimation
   */

  export type AggregateUsersEstimation = {
    _count: UsersEstimationCountAggregateOutputType | null
    _avg: UsersEstimationAvgAggregateOutputType | null
    _sum: UsersEstimationSumAggregateOutputType | null
    _min: UsersEstimationMinAggregateOutputType | null
    _max: UsersEstimationMaxAggregateOutputType | null
  }

  export type UsersEstimationAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    estimation: number | null
  }

  export type UsersEstimationSumAggregateOutputType = {
    id: number | null
    userId: number | null
    estimation: number | null
  }

  export type UsersEstimationMinAggregateOutputType = {
    id: number | null
    userId: number | null
    estimation: number | null
  }

  export type UsersEstimationMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    estimation: number | null
  }

  export type UsersEstimationCountAggregateOutputType = {
    id: number
    userId: number
    estimation: number
    _all: number
  }


  export type UsersEstimationAvgAggregateInputType = {
    id?: true
    userId?: true
    estimation?: true
  }

  export type UsersEstimationSumAggregateInputType = {
    id?: true
    userId?: true
    estimation?: true
  }

  export type UsersEstimationMinAggregateInputType = {
    id?: true
    userId?: true
    estimation?: true
  }

  export type UsersEstimationMaxAggregateInputType = {
    id?: true
    userId?: true
    estimation?: true
  }

  export type UsersEstimationCountAggregateInputType = {
    id?: true
    userId?: true
    estimation?: true
    _all?: true
  }

  export type UsersEstimationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UsersEstimation to aggregate.
     */
    where?: UsersEstimationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UsersEstimations to fetch.
     */
    orderBy?: UsersEstimationOrderByWithRelationInput | UsersEstimationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UsersEstimationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UsersEstimations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UsersEstimations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UsersEstimations
    **/
    _count?: true | UsersEstimationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UsersEstimationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UsersEstimationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsersEstimationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsersEstimationMaxAggregateInputType
  }

  export type GetUsersEstimationAggregateType<T extends UsersEstimationAggregateArgs> = {
        [P in keyof T & keyof AggregateUsersEstimation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsersEstimation[P]>
      : GetScalarType<T[P], AggregateUsersEstimation[P]>
  }




  export type UsersEstimationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UsersEstimationWhereInput
    orderBy?: UsersEstimationOrderByWithAggregationInput | UsersEstimationOrderByWithAggregationInput[]
    by: UsersEstimationScalarFieldEnum[] | UsersEstimationScalarFieldEnum
    having?: UsersEstimationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsersEstimationCountAggregateInputType | true
    _avg?: UsersEstimationAvgAggregateInputType
    _sum?: UsersEstimationSumAggregateInputType
    _min?: UsersEstimationMinAggregateInputType
    _max?: UsersEstimationMaxAggregateInputType
  }

  export type UsersEstimationGroupByOutputType = {
    id: number
    userId: number
    estimation: number
    _count: UsersEstimationCountAggregateOutputType | null
    _avg: UsersEstimationAvgAggregateOutputType | null
    _sum: UsersEstimationSumAggregateOutputType | null
    _min: UsersEstimationMinAggregateOutputType | null
    _max: UsersEstimationMaxAggregateOutputType | null
  }

  type GetUsersEstimationGroupByPayload<T extends UsersEstimationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsersEstimationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsersEstimationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsersEstimationGroupByOutputType[P]>
            : GetScalarType<T[P], UsersEstimationGroupByOutputType[P]>
        }
      >
    >


  export type UsersEstimationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    estimation?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["usersEstimation"]>

  export type UsersEstimationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    estimation?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["usersEstimation"]>

  export type UsersEstimationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    estimation?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["usersEstimation"]>

  export type UsersEstimationSelectScalar = {
    id?: boolean
    userId?: boolean
    estimation?: boolean
  }

  export type UsersEstimationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "estimation", ExtArgs["result"]["usersEstimation"]>
  export type UsersEstimationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UsersEstimationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UsersEstimationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $UsersEstimationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UsersEstimation"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      estimation: number
    }, ExtArgs["result"]["usersEstimation"]>
    composites: {}
  }

  type UsersEstimationGetPayload<S extends boolean | null | undefined | UsersEstimationDefaultArgs> = $Result.GetResult<Prisma.$UsersEstimationPayload, S>

  type UsersEstimationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UsersEstimationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsersEstimationCountAggregateInputType | true
    }

  export interface UsersEstimationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UsersEstimation'], meta: { name: 'UsersEstimation' } }
    /**
     * Find zero or one UsersEstimation that matches the filter.
     * @param {UsersEstimationFindUniqueArgs} args - Arguments to find a UsersEstimation
     * @example
     * // Get one UsersEstimation
     * const usersEstimation = await prisma.usersEstimation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UsersEstimationFindUniqueArgs>(args: SelectSubset<T, UsersEstimationFindUniqueArgs<ExtArgs>>): Prisma__UsersEstimationClient<$Result.GetResult<Prisma.$UsersEstimationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UsersEstimation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UsersEstimationFindUniqueOrThrowArgs} args - Arguments to find a UsersEstimation
     * @example
     * // Get one UsersEstimation
     * const usersEstimation = await prisma.usersEstimation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UsersEstimationFindUniqueOrThrowArgs>(args: SelectSubset<T, UsersEstimationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UsersEstimationClient<$Result.GetResult<Prisma.$UsersEstimationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UsersEstimation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersEstimationFindFirstArgs} args - Arguments to find a UsersEstimation
     * @example
     * // Get one UsersEstimation
     * const usersEstimation = await prisma.usersEstimation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UsersEstimationFindFirstArgs>(args?: SelectSubset<T, UsersEstimationFindFirstArgs<ExtArgs>>): Prisma__UsersEstimationClient<$Result.GetResult<Prisma.$UsersEstimationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UsersEstimation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersEstimationFindFirstOrThrowArgs} args - Arguments to find a UsersEstimation
     * @example
     * // Get one UsersEstimation
     * const usersEstimation = await prisma.usersEstimation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UsersEstimationFindFirstOrThrowArgs>(args?: SelectSubset<T, UsersEstimationFindFirstOrThrowArgs<ExtArgs>>): Prisma__UsersEstimationClient<$Result.GetResult<Prisma.$UsersEstimationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UsersEstimations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersEstimationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UsersEstimations
     * const usersEstimations = await prisma.usersEstimation.findMany()
     * 
     * // Get first 10 UsersEstimations
     * const usersEstimations = await prisma.usersEstimation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usersEstimationWithIdOnly = await prisma.usersEstimation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UsersEstimationFindManyArgs>(args?: SelectSubset<T, UsersEstimationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsersEstimationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UsersEstimation.
     * @param {UsersEstimationCreateArgs} args - Arguments to create a UsersEstimation.
     * @example
     * // Create one UsersEstimation
     * const UsersEstimation = await prisma.usersEstimation.create({
     *   data: {
     *     // ... data to create a UsersEstimation
     *   }
     * })
     * 
     */
    create<T extends UsersEstimationCreateArgs>(args: SelectSubset<T, UsersEstimationCreateArgs<ExtArgs>>): Prisma__UsersEstimationClient<$Result.GetResult<Prisma.$UsersEstimationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UsersEstimations.
     * @param {UsersEstimationCreateManyArgs} args - Arguments to create many UsersEstimations.
     * @example
     * // Create many UsersEstimations
     * const usersEstimation = await prisma.usersEstimation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UsersEstimationCreateManyArgs>(args?: SelectSubset<T, UsersEstimationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UsersEstimations and returns the data saved in the database.
     * @param {UsersEstimationCreateManyAndReturnArgs} args - Arguments to create many UsersEstimations.
     * @example
     * // Create many UsersEstimations
     * const usersEstimation = await prisma.usersEstimation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UsersEstimations and only return the `id`
     * const usersEstimationWithIdOnly = await prisma.usersEstimation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UsersEstimationCreateManyAndReturnArgs>(args?: SelectSubset<T, UsersEstimationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsersEstimationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UsersEstimation.
     * @param {UsersEstimationDeleteArgs} args - Arguments to delete one UsersEstimation.
     * @example
     * // Delete one UsersEstimation
     * const UsersEstimation = await prisma.usersEstimation.delete({
     *   where: {
     *     // ... filter to delete one UsersEstimation
     *   }
     * })
     * 
     */
    delete<T extends UsersEstimationDeleteArgs>(args: SelectSubset<T, UsersEstimationDeleteArgs<ExtArgs>>): Prisma__UsersEstimationClient<$Result.GetResult<Prisma.$UsersEstimationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UsersEstimation.
     * @param {UsersEstimationUpdateArgs} args - Arguments to update one UsersEstimation.
     * @example
     * // Update one UsersEstimation
     * const usersEstimation = await prisma.usersEstimation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UsersEstimationUpdateArgs>(args: SelectSubset<T, UsersEstimationUpdateArgs<ExtArgs>>): Prisma__UsersEstimationClient<$Result.GetResult<Prisma.$UsersEstimationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UsersEstimations.
     * @param {UsersEstimationDeleteManyArgs} args - Arguments to filter UsersEstimations to delete.
     * @example
     * // Delete a few UsersEstimations
     * const { count } = await prisma.usersEstimation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UsersEstimationDeleteManyArgs>(args?: SelectSubset<T, UsersEstimationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UsersEstimations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersEstimationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UsersEstimations
     * const usersEstimation = await prisma.usersEstimation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UsersEstimationUpdateManyArgs>(args: SelectSubset<T, UsersEstimationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UsersEstimations and returns the data updated in the database.
     * @param {UsersEstimationUpdateManyAndReturnArgs} args - Arguments to update many UsersEstimations.
     * @example
     * // Update many UsersEstimations
     * const usersEstimation = await prisma.usersEstimation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UsersEstimations and only return the `id`
     * const usersEstimationWithIdOnly = await prisma.usersEstimation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UsersEstimationUpdateManyAndReturnArgs>(args: SelectSubset<T, UsersEstimationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsersEstimationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UsersEstimation.
     * @param {UsersEstimationUpsertArgs} args - Arguments to update or create a UsersEstimation.
     * @example
     * // Update or create a UsersEstimation
     * const usersEstimation = await prisma.usersEstimation.upsert({
     *   create: {
     *     // ... data to create a UsersEstimation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UsersEstimation we want to update
     *   }
     * })
     */
    upsert<T extends UsersEstimationUpsertArgs>(args: SelectSubset<T, UsersEstimationUpsertArgs<ExtArgs>>): Prisma__UsersEstimationClient<$Result.GetResult<Prisma.$UsersEstimationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UsersEstimations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersEstimationCountArgs} args - Arguments to filter UsersEstimations to count.
     * @example
     * // Count the number of UsersEstimations
     * const count = await prisma.usersEstimation.count({
     *   where: {
     *     // ... the filter for the UsersEstimations we want to count
     *   }
     * })
    **/
    count<T extends UsersEstimationCountArgs>(
      args?: Subset<T, UsersEstimationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsersEstimationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UsersEstimation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersEstimationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsersEstimationAggregateArgs>(args: Subset<T, UsersEstimationAggregateArgs>): Prisma.PrismaPromise<GetUsersEstimationAggregateType<T>>

    /**
     * Group by UsersEstimation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersEstimationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UsersEstimationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UsersEstimationGroupByArgs['orderBy'] }
        : { orderBy?: UsersEstimationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UsersEstimationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsersEstimationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UsersEstimation model
   */
  readonly fields: UsersEstimationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UsersEstimation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UsersEstimationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UsersEstimation model
   */
  interface UsersEstimationFieldRefs {
    readonly id: FieldRef<"UsersEstimation", 'Int'>
    readonly userId: FieldRef<"UsersEstimation", 'Int'>
    readonly estimation: FieldRef<"UsersEstimation", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * UsersEstimation findUnique
   */
  export type UsersEstimationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsersEstimation
     */
    select?: UsersEstimationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsersEstimation
     */
    omit?: UsersEstimationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersEstimationInclude<ExtArgs> | null
    /**
     * Filter, which UsersEstimation to fetch.
     */
    where: UsersEstimationWhereUniqueInput
  }

  /**
   * UsersEstimation findUniqueOrThrow
   */
  export type UsersEstimationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsersEstimation
     */
    select?: UsersEstimationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsersEstimation
     */
    omit?: UsersEstimationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersEstimationInclude<ExtArgs> | null
    /**
     * Filter, which UsersEstimation to fetch.
     */
    where: UsersEstimationWhereUniqueInput
  }

  /**
   * UsersEstimation findFirst
   */
  export type UsersEstimationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsersEstimation
     */
    select?: UsersEstimationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsersEstimation
     */
    omit?: UsersEstimationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersEstimationInclude<ExtArgs> | null
    /**
     * Filter, which UsersEstimation to fetch.
     */
    where?: UsersEstimationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UsersEstimations to fetch.
     */
    orderBy?: UsersEstimationOrderByWithRelationInput | UsersEstimationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UsersEstimations.
     */
    cursor?: UsersEstimationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UsersEstimations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UsersEstimations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UsersEstimations.
     */
    distinct?: UsersEstimationScalarFieldEnum | UsersEstimationScalarFieldEnum[]
  }

  /**
   * UsersEstimation findFirstOrThrow
   */
  export type UsersEstimationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsersEstimation
     */
    select?: UsersEstimationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsersEstimation
     */
    omit?: UsersEstimationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersEstimationInclude<ExtArgs> | null
    /**
     * Filter, which UsersEstimation to fetch.
     */
    where?: UsersEstimationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UsersEstimations to fetch.
     */
    orderBy?: UsersEstimationOrderByWithRelationInput | UsersEstimationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UsersEstimations.
     */
    cursor?: UsersEstimationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UsersEstimations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UsersEstimations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UsersEstimations.
     */
    distinct?: UsersEstimationScalarFieldEnum | UsersEstimationScalarFieldEnum[]
  }

  /**
   * UsersEstimation findMany
   */
  export type UsersEstimationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsersEstimation
     */
    select?: UsersEstimationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsersEstimation
     */
    omit?: UsersEstimationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersEstimationInclude<ExtArgs> | null
    /**
     * Filter, which UsersEstimations to fetch.
     */
    where?: UsersEstimationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UsersEstimations to fetch.
     */
    orderBy?: UsersEstimationOrderByWithRelationInput | UsersEstimationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UsersEstimations.
     */
    cursor?: UsersEstimationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UsersEstimations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UsersEstimations.
     */
    skip?: number
    distinct?: UsersEstimationScalarFieldEnum | UsersEstimationScalarFieldEnum[]
  }

  /**
   * UsersEstimation create
   */
  export type UsersEstimationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsersEstimation
     */
    select?: UsersEstimationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsersEstimation
     */
    omit?: UsersEstimationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersEstimationInclude<ExtArgs> | null
    /**
     * The data needed to create a UsersEstimation.
     */
    data: XOR<UsersEstimationCreateInput, UsersEstimationUncheckedCreateInput>
  }

  /**
   * UsersEstimation createMany
   */
  export type UsersEstimationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UsersEstimations.
     */
    data: UsersEstimationCreateManyInput | UsersEstimationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UsersEstimation createManyAndReturn
   */
  export type UsersEstimationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsersEstimation
     */
    select?: UsersEstimationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UsersEstimation
     */
    omit?: UsersEstimationOmit<ExtArgs> | null
    /**
     * The data used to create many UsersEstimations.
     */
    data: UsersEstimationCreateManyInput | UsersEstimationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersEstimationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UsersEstimation update
   */
  export type UsersEstimationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsersEstimation
     */
    select?: UsersEstimationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsersEstimation
     */
    omit?: UsersEstimationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersEstimationInclude<ExtArgs> | null
    /**
     * The data needed to update a UsersEstimation.
     */
    data: XOR<UsersEstimationUpdateInput, UsersEstimationUncheckedUpdateInput>
    /**
     * Choose, which UsersEstimation to update.
     */
    where: UsersEstimationWhereUniqueInput
  }

  /**
   * UsersEstimation updateMany
   */
  export type UsersEstimationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UsersEstimations.
     */
    data: XOR<UsersEstimationUpdateManyMutationInput, UsersEstimationUncheckedUpdateManyInput>
    /**
     * Filter which UsersEstimations to update
     */
    where?: UsersEstimationWhereInput
    /**
     * Limit how many UsersEstimations to update.
     */
    limit?: number
  }

  /**
   * UsersEstimation updateManyAndReturn
   */
  export type UsersEstimationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsersEstimation
     */
    select?: UsersEstimationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UsersEstimation
     */
    omit?: UsersEstimationOmit<ExtArgs> | null
    /**
     * The data used to update UsersEstimations.
     */
    data: XOR<UsersEstimationUpdateManyMutationInput, UsersEstimationUncheckedUpdateManyInput>
    /**
     * Filter which UsersEstimations to update
     */
    where?: UsersEstimationWhereInput
    /**
     * Limit how many UsersEstimations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersEstimationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UsersEstimation upsert
   */
  export type UsersEstimationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsersEstimation
     */
    select?: UsersEstimationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsersEstimation
     */
    omit?: UsersEstimationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersEstimationInclude<ExtArgs> | null
    /**
     * The filter to search for the UsersEstimation to update in case it exists.
     */
    where: UsersEstimationWhereUniqueInput
    /**
     * In case the UsersEstimation found by the `where` argument doesn't exist, create a new UsersEstimation with this data.
     */
    create: XOR<UsersEstimationCreateInput, UsersEstimationUncheckedCreateInput>
    /**
     * In case the UsersEstimation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UsersEstimationUpdateInput, UsersEstimationUncheckedUpdateInput>
  }

  /**
   * UsersEstimation delete
   */
  export type UsersEstimationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsersEstimation
     */
    select?: UsersEstimationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsersEstimation
     */
    omit?: UsersEstimationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersEstimationInclude<ExtArgs> | null
    /**
     * Filter which UsersEstimation to delete.
     */
    where: UsersEstimationWhereUniqueInput
  }

  /**
   * UsersEstimation deleteMany
   */
  export type UsersEstimationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UsersEstimations to delete
     */
    where?: UsersEstimationWhereInput
    /**
     * Limit how many UsersEstimations to delete.
     */
    limit?: number
  }

  /**
   * UsersEstimation without action
   */
  export type UsersEstimationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsersEstimation
     */
    select?: UsersEstimationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsersEstimation
     */
    omit?: UsersEstimationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersEstimationInclude<ExtArgs> | null
  }


  /**
   * Model UsersClients
   */

  export type AggregateUsersClients = {
    _count: UsersClientsCountAggregateOutputType | null
    _avg: UsersClientsAvgAggregateOutputType | null
    _sum: UsersClientsSumAggregateOutputType | null
    _min: UsersClientsMinAggregateOutputType | null
    _max: UsersClientsMaxAggregateOutputType | null
  }

  export type UsersClientsAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    telegramId: number | null
  }

  export type UsersClientsSumAggregateOutputType = {
    id: number | null
    userId: number | null
    telegramId: bigint | null
  }

  export type UsersClientsMinAggregateOutputType = {
    id: number | null
    userId: number | null
    name: string | null
    phone: string | null
    email: string | null
    telegramId: bigint | null
  }

  export type UsersClientsMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    name: string | null
    phone: string | null
    email: string | null
    telegramId: bigint | null
  }

  export type UsersClientsCountAggregateOutputType = {
    id: number
    userId: number
    name: number
    phone: number
    email: number
    telegramId: number
    _all: number
  }


  export type UsersClientsAvgAggregateInputType = {
    id?: true
    userId?: true
    telegramId?: true
  }

  export type UsersClientsSumAggregateInputType = {
    id?: true
    userId?: true
    telegramId?: true
  }

  export type UsersClientsMinAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    phone?: true
    email?: true
    telegramId?: true
  }

  export type UsersClientsMaxAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    phone?: true
    email?: true
    telegramId?: true
  }

  export type UsersClientsCountAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    phone?: true
    email?: true
    telegramId?: true
    _all?: true
  }

  export type UsersClientsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UsersClients to aggregate.
     */
    where?: UsersClientsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UsersClients to fetch.
     */
    orderBy?: UsersClientsOrderByWithRelationInput | UsersClientsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UsersClientsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UsersClients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UsersClients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UsersClients
    **/
    _count?: true | UsersClientsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UsersClientsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UsersClientsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsersClientsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsersClientsMaxAggregateInputType
  }

  export type GetUsersClientsAggregateType<T extends UsersClientsAggregateArgs> = {
        [P in keyof T & keyof AggregateUsersClients]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsersClients[P]>
      : GetScalarType<T[P], AggregateUsersClients[P]>
  }




  export type UsersClientsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UsersClientsWhereInput
    orderBy?: UsersClientsOrderByWithAggregationInput | UsersClientsOrderByWithAggregationInput[]
    by: UsersClientsScalarFieldEnum[] | UsersClientsScalarFieldEnum
    having?: UsersClientsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsersClientsCountAggregateInputType | true
    _avg?: UsersClientsAvgAggregateInputType
    _sum?: UsersClientsSumAggregateInputType
    _min?: UsersClientsMinAggregateInputType
    _max?: UsersClientsMaxAggregateInputType
  }

  export type UsersClientsGroupByOutputType = {
    id: number
    userId: number
    name: string
    phone: string
    email: string
    telegramId: bigint
    _count: UsersClientsCountAggregateOutputType | null
    _avg: UsersClientsAvgAggregateOutputType | null
    _sum: UsersClientsSumAggregateOutputType | null
    _min: UsersClientsMinAggregateOutputType | null
    _max: UsersClientsMaxAggregateOutputType | null
  }

  type GetUsersClientsGroupByPayload<T extends UsersClientsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsersClientsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsersClientsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsersClientsGroupByOutputType[P]>
            : GetScalarType<T[P], UsersClientsGroupByOutputType[P]>
        }
      >
    >


  export type UsersClientsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    phone?: boolean
    email?: boolean
    telegramId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["usersClients"]>

  export type UsersClientsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    phone?: boolean
    email?: boolean
    telegramId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["usersClients"]>

  export type UsersClientsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    phone?: boolean
    email?: boolean
    telegramId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["usersClients"]>

  export type UsersClientsSelectScalar = {
    id?: boolean
    userId?: boolean
    name?: boolean
    phone?: boolean
    email?: boolean
    telegramId?: boolean
  }

  export type UsersClientsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "name" | "phone" | "email" | "telegramId", ExtArgs["result"]["usersClients"]>
  export type UsersClientsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UsersClientsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UsersClientsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $UsersClientsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UsersClients"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      name: string
      phone: string
      email: string
      telegramId: bigint
    }, ExtArgs["result"]["usersClients"]>
    composites: {}
  }

  type UsersClientsGetPayload<S extends boolean | null | undefined | UsersClientsDefaultArgs> = $Result.GetResult<Prisma.$UsersClientsPayload, S>

  type UsersClientsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UsersClientsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsersClientsCountAggregateInputType | true
    }

  export interface UsersClientsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UsersClients'], meta: { name: 'UsersClients' } }
    /**
     * Find zero or one UsersClients that matches the filter.
     * @param {UsersClientsFindUniqueArgs} args - Arguments to find a UsersClients
     * @example
     * // Get one UsersClients
     * const usersClients = await prisma.usersClients.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UsersClientsFindUniqueArgs>(args: SelectSubset<T, UsersClientsFindUniqueArgs<ExtArgs>>): Prisma__UsersClientsClient<$Result.GetResult<Prisma.$UsersClientsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UsersClients that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UsersClientsFindUniqueOrThrowArgs} args - Arguments to find a UsersClients
     * @example
     * // Get one UsersClients
     * const usersClients = await prisma.usersClients.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UsersClientsFindUniqueOrThrowArgs>(args: SelectSubset<T, UsersClientsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UsersClientsClient<$Result.GetResult<Prisma.$UsersClientsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UsersClients that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersClientsFindFirstArgs} args - Arguments to find a UsersClients
     * @example
     * // Get one UsersClients
     * const usersClients = await prisma.usersClients.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UsersClientsFindFirstArgs>(args?: SelectSubset<T, UsersClientsFindFirstArgs<ExtArgs>>): Prisma__UsersClientsClient<$Result.GetResult<Prisma.$UsersClientsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UsersClients that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersClientsFindFirstOrThrowArgs} args - Arguments to find a UsersClients
     * @example
     * // Get one UsersClients
     * const usersClients = await prisma.usersClients.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UsersClientsFindFirstOrThrowArgs>(args?: SelectSubset<T, UsersClientsFindFirstOrThrowArgs<ExtArgs>>): Prisma__UsersClientsClient<$Result.GetResult<Prisma.$UsersClientsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UsersClients that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersClientsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UsersClients
     * const usersClients = await prisma.usersClients.findMany()
     * 
     * // Get first 10 UsersClients
     * const usersClients = await prisma.usersClients.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usersClientsWithIdOnly = await prisma.usersClients.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UsersClientsFindManyArgs>(args?: SelectSubset<T, UsersClientsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsersClientsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UsersClients.
     * @param {UsersClientsCreateArgs} args - Arguments to create a UsersClients.
     * @example
     * // Create one UsersClients
     * const UsersClients = await prisma.usersClients.create({
     *   data: {
     *     // ... data to create a UsersClients
     *   }
     * })
     * 
     */
    create<T extends UsersClientsCreateArgs>(args: SelectSubset<T, UsersClientsCreateArgs<ExtArgs>>): Prisma__UsersClientsClient<$Result.GetResult<Prisma.$UsersClientsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UsersClients.
     * @param {UsersClientsCreateManyArgs} args - Arguments to create many UsersClients.
     * @example
     * // Create many UsersClients
     * const usersClients = await prisma.usersClients.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UsersClientsCreateManyArgs>(args?: SelectSubset<T, UsersClientsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UsersClients and returns the data saved in the database.
     * @param {UsersClientsCreateManyAndReturnArgs} args - Arguments to create many UsersClients.
     * @example
     * // Create many UsersClients
     * const usersClients = await prisma.usersClients.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UsersClients and only return the `id`
     * const usersClientsWithIdOnly = await prisma.usersClients.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UsersClientsCreateManyAndReturnArgs>(args?: SelectSubset<T, UsersClientsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsersClientsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UsersClients.
     * @param {UsersClientsDeleteArgs} args - Arguments to delete one UsersClients.
     * @example
     * // Delete one UsersClients
     * const UsersClients = await prisma.usersClients.delete({
     *   where: {
     *     // ... filter to delete one UsersClients
     *   }
     * })
     * 
     */
    delete<T extends UsersClientsDeleteArgs>(args: SelectSubset<T, UsersClientsDeleteArgs<ExtArgs>>): Prisma__UsersClientsClient<$Result.GetResult<Prisma.$UsersClientsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UsersClients.
     * @param {UsersClientsUpdateArgs} args - Arguments to update one UsersClients.
     * @example
     * // Update one UsersClients
     * const usersClients = await prisma.usersClients.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UsersClientsUpdateArgs>(args: SelectSubset<T, UsersClientsUpdateArgs<ExtArgs>>): Prisma__UsersClientsClient<$Result.GetResult<Prisma.$UsersClientsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UsersClients.
     * @param {UsersClientsDeleteManyArgs} args - Arguments to filter UsersClients to delete.
     * @example
     * // Delete a few UsersClients
     * const { count } = await prisma.usersClients.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UsersClientsDeleteManyArgs>(args?: SelectSubset<T, UsersClientsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UsersClients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersClientsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UsersClients
     * const usersClients = await prisma.usersClients.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UsersClientsUpdateManyArgs>(args: SelectSubset<T, UsersClientsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UsersClients and returns the data updated in the database.
     * @param {UsersClientsUpdateManyAndReturnArgs} args - Arguments to update many UsersClients.
     * @example
     * // Update many UsersClients
     * const usersClients = await prisma.usersClients.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UsersClients and only return the `id`
     * const usersClientsWithIdOnly = await prisma.usersClients.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UsersClientsUpdateManyAndReturnArgs>(args: SelectSubset<T, UsersClientsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsersClientsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UsersClients.
     * @param {UsersClientsUpsertArgs} args - Arguments to update or create a UsersClients.
     * @example
     * // Update or create a UsersClients
     * const usersClients = await prisma.usersClients.upsert({
     *   create: {
     *     // ... data to create a UsersClients
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UsersClients we want to update
     *   }
     * })
     */
    upsert<T extends UsersClientsUpsertArgs>(args: SelectSubset<T, UsersClientsUpsertArgs<ExtArgs>>): Prisma__UsersClientsClient<$Result.GetResult<Prisma.$UsersClientsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UsersClients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersClientsCountArgs} args - Arguments to filter UsersClients to count.
     * @example
     * // Count the number of UsersClients
     * const count = await prisma.usersClients.count({
     *   where: {
     *     // ... the filter for the UsersClients we want to count
     *   }
     * })
    **/
    count<T extends UsersClientsCountArgs>(
      args?: Subset<T, UsersClientsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsersClientsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UsersClients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersClientsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsersClientsAggregateArgs>(args: Subset<T, UsersClientsAggregateArgs>): Prisma.PrismaPromise<GetUsersClientsAggregateType<T>>

    /**
     * Group by UsersClients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersClientsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UsersClientsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UsersClientsGroupByArgs['orderBy'] }
        : { orderBy?: UsersClientsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UsersClientsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsersClientsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UsersClients model
   */
  readonly fields: UsersClientsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UsersClients.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UsersClientsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UsersClients model
   */
  interface UsersClientsFieldRefs {
    readonly id: FieldRef<"UsersClients", 'Int'>
    readonly userId: FieldRef<"UsersClients", 'Int'>
    readonly name: FieldRef<"UsersClients", 'String'>
    readonly phone: FieldRef<"UsersClients", 'String'>
    readonly email: FieldRef<"UsersClients", 'String'>
    readonly telegramId: FieldRef<"UsersClients", 'BigInt'>
  }
    

  // Custom InputTypes
  /**
   * UsersClients findUnique
   */
  export type UsersClientsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsersClients
     */
    select?: UsersClientsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsersClients
     */
    omit?: UsersClientsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersClientsInclude<ExtArgs> | null
    /**
     * Filter, which UsersClients to fetch.
     */
    where: UsersClientsWhereUniqueInput
  }

  /**
   * UsersClients findUniqueOrThrow
   */
  export type UsersClientsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsersClients
     */
    select?: UsersClientsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsersClients
     */
    omit?: UsersClientsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersClientsInclude<ExtArgs> | null
    /**
     * Filter, which UsersClients to fetch.
     */
    where: UsersClientsWhereUniqueInput
  }

  /**
   * UsersClients findFirst
   */
  export type UsersClientsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsersClients
     */
    select?: UsersClientsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsersClients
     */
    omit?: UsersClientsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersClientsInclude<ExtArgs> | null
    /**
     * Filter, which UsersClients to fetch.
     */
    where?: UsersClientsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UsersClients to fetch.
     */
    orderBy?: UsersClientsOrderByWithRelationInput | UsersClientsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UsersClients.
     */
    cursor?: UsersClientsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UsersClients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UsersClients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UsersClients.
     */
    distinct?: UsersClientsScalarFieldEnum | UsersClientsScalarFieldEnum[]
  }

  /**
   * UsersClients findFirstOrThrow
   */
  export type UsersClientsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsersClients
     */
    select?: UsersClientsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsersClients
     */
    omit?: UsersClientsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersClientsInclude<ExtArgs> | null
    /**
     * Filter, which UsersClients to fetch.
     */
    where?: UsersClientsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UsersClients to fetch.
     */
    orderBy?: UsersClientsOrderByWithRelationInput | UsersClientsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UsersClients.
     */
    cursor?: UsersClientsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UsersClients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UsersClients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UsersClients.
     */
    distinct?: UsersClientsScalarFieldEnum | UsersClientsScalarFieldEnum[]
  }

  /**
   * UsersClients findMany
   */
  export type UsersClientsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsersClients
     */
    select?: UsersClientsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsersClients
     */
    omit?: UsersClientsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersClientsInclude<ExtArgs> | null
    /**
     * Filter, which UsersClients to fetch.
     */
    where?: UsersClientsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UsersClients to fetch.
     */
    orderBy?: UsersClientsOrderByWithRelationInput | UsersClientsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UsersClients.
     */
    cursor?: UsersClientsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UsersClients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UsersClients.
     */
    skip?: number
    distinct?: UsersClientsScalarFieldEnum | UsersClientsScalarFieldEnum[]
  }

  /**
   * UsersClients create
   */
  export type UsersClientsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsersClients
     */
    select?: UsersClientsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsersClients
     */
    omit?: UsersClientsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersClientsInclude<ExtArgs> | null
    /**
     * The data needed to create a UsersClients.
     */
    data: XOR<UsersClientsCreateInput, UsersClientsUncheckedCreateInput>
  }

  /**
   * UsersClients createMany
   */
  export type UsersClientsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UsersClients.
     */
    data: UsersClientsCreateManyInput | UsersClientsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UsersClients createManyAndReturn
   */
  export type UsersClientsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsersClients
     */
    select?: UsersClientsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UsersClients
     */
    omit?: UsersClientsOmit<ExtArgs> | null
    /**
     * The data used to create many UsersClients.
     */
    data: UsersClientsCreateManyInput | UsersClientsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersClientsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UsersClients update
   */
  export type UsersClientsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsersClients
     */
    select?: UsersClientsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsersClients
     */
    omit?: UsersClientsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersClientsInclude<ExtArgs> | null
    /**
     * The data needed to update a UsersClients.
     */
    data: XOR<UsersClientsUpdateInput, UsersClientsUncheckedUpdateInput>
    /**
     * Choose, which UsersClients to update.
     */
    where: UsersClientsWhereUniqueInput
  }

  /**
   * UsersClients updateMany
   */
  export type UsersClientsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UsersClients.
     */
    data: XOR<UsersClientsUpdateManyMutationInput, UsersClientsUncheckedUpdateManyInput>
    /**
     * Filter which UsersClients to update
     */
    where?: UsersClientsWhereInput
    /**
     * Limit how many UsersClients to update.
     */
    limit?: number
  }

  /**
   * UsersClients updateManyAndReturn
   */
  export type UsersClientsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsersClients
     */
    select?: UsersClientsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UsersClients
     */
    omit?: UsersClientsOmit<ExtArgs> | null
    /**
     * The data used to update UsersClients.
     */
    data: XOR<UsersClientsUpdateManyMutationInput, UsersClientsUncheckedUpdateManyInput>
    /**
     * Filter which UsersClients to update
     */
    where?: UsersClientsWhereInput
    /**
     * Limit how many UsersClients to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersClientsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UsersClients upsert
   */
  export type UsersClientsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsersClients
     */
    select?: UsersClientsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsersClients
     */
    omit?: UsersClientsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersClientsInclude<ExtArgs> | null
    /**
     * The filter to search for the UsersClients to update in case it exists.
     */
    where: UsersClientsWhereUniqueInput
    /**
     * In case the UsersClients found by the `where` argument doesn't exist, create a new UsersClients with this data.
     */
    create: XOR<UsersClientsCreateInput, UsersClientsUncheckedCreateInput>
    /**
     * In case the UsersClients was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UsersClientsUpdateInput, UsersClientsUncheckedUpdateInput>
  }

  /**
   * UsersClients delete
   */
  export type UsersClientsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsersClients
     */
    select?: UsersClientsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsersClients
     */
    omit?: UsersClientsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersClientsInclude<ExtArgs> | null
    /**
     * Filter which UsersClients to delete.
     */
    where: UsersClientsWhereUniqueInput
  }

  /**
   * UsersClients deleteMany
   */
  export type UsersClientsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UsersClients to delete
     */
    where?: UsersClientsWhereInput
    /**
     * Limit how many UsersClients to delete.
     */
    limit?: number
  }

  /**
   * UsersClients without action
   */
  export type UsersClientsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsersClients
     */
    select?: UsersClientsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsersClients
     */
    omit?: UsersClientsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersClientsInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    telegramId: 'telegramId',
    username: 'username',
    role: 'role',
    rate: 'rate',
    lastAction: 'lastAction',
    firstAction: 'firstAction'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const UsersQuestionScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    isTakingBonus: 'isTakingBonus',
    whatsABusiness: 'whatsABusiness',
    conversion: 'conversion',
    about: 'about',
    CAC: 'CAC',
    LTV: 'LTV'
  };

  export type UsersQuestionScalarFieldEnum = (typeof UsersQuestionScalarFieldEnum)[keyof typeof UsersQuestionScalarFieldEnum]


  export const UsersEstimationScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    estimation: 'estimation'
  };

  export type UsersEstimationScalarFieldEnum = (typeof UsersEstimationScalarFieldEnum)[keyof typeof UsersEstimationScalarFieldEnum]


  export const UsersClientsScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    name: 'name',
    phone: 'phone',
    email: 'email',
    telegramId: 'telegramId'
  };

  export type UsersClientsScalarFieldEnum = (typeof UsersClientsScalarFieldEnum)[keyof typeof UsersClientsScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'UserRoles'
   */
  export type EnumUserRolesFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRoles'>
    


  /**
   * Reference to a field of type 'UserRoles[]'
   */
  export type ListEnumUserRolesFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRoles[]'>
    


  /**
   * Reference to a field of type 'UserRate'
   */
  export type EnumUserRateFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRate'>
    


  /**
   * Reference to a field of type 'UserRate[]'
   */
  export type ListEnumUserRateFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRate[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    telegramId?: IntFilter<"User"> | number
    username?: StringFilter<"User"> | string
    role?: EnumUserRolesFilter<"User"> | $Enums.UserRoles
    rate?: EnumUserRateFilter<"User"> | $Enums.UserRate
    lastAction?: DateTimeFilter<"User"> | Date | string
    firstAction?: DateTimeFilter<"User"> | Date | string
    clients?: UsersClientsListRelationFilter
    estimation?: UsersEstimationListRelationFilter
    questions?: UsersQuestionListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    telegramId?: SortOrder
    username?: SortOrder
    role?: SortOrder
    rate?: SortOrder
    lastAction?: SortOrder
    firstAction?: SortOrder
    clients?: UsersClientsOrderByRelationAggregateInput
    estimation?: UsersEstimationOrderByRelationAggregateInput
    questions?: UsersQuestionOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    telegramId?: number
    username?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    role?: EnumUserRolesFilter<"User"> | $Enums.UserRoles
    rate?: EnumUserRateFilter<"User"> | $Enums.UserRate
    lastAction?: DateTimeFilter<"User"> | Date | string
    firstAction?: DateTimeFilter<"User"> | Date | string
    clients?: UsersClientsListRelationFilter
    estimation?: UsersEstimationListRelationFilter
    questions?: UsersQuestionListRelationFilter
  }, "id" | "telegramId" | "username">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    telegramId?: SortOrder
    username?: SortOrder
    role?: SortOrder
    rate?: SortOrder
    lastAction?: SortOrder
    firstAction?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    telegramId?: IntWithAggregatesFilter<"User"> | number
    username?: StringWithAggregatesFilter<"User"> | string
    role?: EnumUserRolesWithAggregatesFilter<"User"> | $Enums.UserRoles
    rate?: EnumUserRateWithAggregatesFilter<"User"> | $Enums.UserRate
    lastAction?: DateTimeWithAggregatesFilter<"User"> | Date | string
    firstAction?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type UsersQuestionWhereInput = {
    AND?: UsersQuestionWhereInput | UsersQuestionWhereInput[]
    OR?: UsersQuestionWhereInput[]
    NOT?: UsersQuestionWhereInput | UsersQuestionWhereInput[]
    id?: IntFilter<"UsersQuestion"> | number
    userId?: IntFilter<"UsersQuestion"> | number
    isTakingBonus?: BoolFilter<"UsersQuestion"> | boolean
    whatsABusiness?: StringFilter<"UsersQuestion"> | string
    conversion?: StringFilter<"UsersQuestion"> | string
    about?: StringFilter<"UsersQuestion"> | string
    CAC?: FloatFilter<"UsersQuestion"> | number
    LTV?: FloatFilter<"UsersQuestion"> | number
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type UsersQuestionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    isTakingBonus?: SortOrder
    whatsABusiness?: SortOrder
    conversion?: SortOrder
    about?: SortOrder
    CAC?: SortOrder
    LTV?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type UsersQuestionWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: UsersQuestionWhereInput | UsersQuestionWhereInput[]
    OR?: UsersQuestionWhereInput[]
    NOT?: UsersQuestionWhereInput | UsersQuestionWhereInput[]
    userId?: IntFilter<"UsersQuestion"> | number
    isTakingBonus?: BoolFilter<"UsersQuestion"> | boolean
    whatsABusiness?: StringFilter<"UsersQuestion"> | string
    conversion?: StringFilter<"UsersQuestion"> | string
    about?: StringFilter<"UsersQuestion"> | string
    CAC?: FloatFilter<"UsersQuestion"> | number
    LTV?: FloatFilter<"UsersQuestion"> | number
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type UsersQuestionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    isTakingBonus?: SortOrder
    whatsABusiness?: SortOrder
    conversion?: SortOrder
    about?: SortOrder
    CAC?: SortOrder
    LTV?: SortOrder
    _count?: UsersQuestionCountOrderByAggregateInput
    _avg?: UsersQuestionAvgOrderByAggregateInput
    _max?: UsersQuestionMaxOrderByAggregateInput
    _min?: UsersQuestionMinOrderByAggregateInput
    _sum?: UsersQuestionSumOrderByAggregateInput
  }

  export type UsersQuestionScalarWhereWithAggregatesInput = {
    AND?: UsersQuestionScalarWhereWithAggregatesInput | UsersQuestionScalarWhereWithAggregatesInput[]
    OR?: UsersQuestionScalarWhereWithAggregatesInput[]
    NOT?: UsersQuestionScalarWhereWithAggregatesInput | UsersQuestionScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"UsersQuestion"> | number
    userId?: IntWithAggregatesFilter<"UsersQuestion"> | number
    isTakingBonus?: BoolWithAggregatesFilter<"UsersQuestion"> | boolean
    whatsABusiness?: StringWithAggregatesFilter<"UsersQuestion"> | string
    conversion?: StringWithAggregatesFilter<"UsersQuestion"> | string
    about?: StringWithAggregatesFilter<"UsersQuestion"> | string
    CAC?: FloatWithAggregatesFilter<"UsersQuestion"> | number
    LTV?: FloatWithAggregatesFilter<"UsersQuestion"> | number
  }

  export type UsersEstimationWhereInput = {
    AND?: UsersEstimationWhereInput | UsersEstimationWhereInput[]
    OR?: UsersEstimationWhereInput[]
    NOT?: UsersEstimationWhereInput | UsersEstimationWhereInput[]
    id?: IntFilter<"UsersEstimation"> | number
    userId?: IntFilter<"UsersEstimation"> | number
    estimation?: IntFilter<"UsersEstimation"> | number
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type UsersEstimationOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    estimation?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type UsersEstimationWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: UsersEstimationWhereInput | UsersEstimationWhereInput[]
    OR?: UsersEstimationWhereInput[]
    NOT?: UsersEstimationWhereInput | UsersEstimationWhereInput[]
    userId?: IntFilter<"UsersEstimation"> | number
    estimation?: IntFilter<"UsersEstimation"> | number
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type UsersEstimationOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    estimation?: SortOrder
    _count?: UsersEstimationCountOrderByAggregateInput
    _avg?: UsersEstimationAvgOrderByAggregateInput
    _max?: UsersEstimationMaxOrderByAggregateInput
    _min?: UsersEstimationMinOrderByAggregateInput
    _sum?: UsersEstimationSumOrderByAggregateInput
  }

  export type UsersEstimationScalarWhereWithAggregatesInput = {
    AND?: UsersEstimationScalarWhereWithAggregatesInput | UsersEstimationScalarWhereWithAggregatesInput[]
    OR?: UsersEstimationScalarWhereWithAggregatesInput[]
    NOT?: UsersEstimationScalarWhereWithAggregatesInput | UsersEstimationScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"UsersEstimation"> | number
    userId?: IntWithAggregatesFilter<"UsersEstimation"> | number
    estimation?: IntWithAggregatesFilter<"UsersEstimation"> | number
  }

  export type UsersClientsWhereInput = {
    AND?: UsersClientsWhereInput | UsersClientsWhereInput[]
    OR?: UsersClientsWhereInput[]
    NOT?: UsersClientsWhereInput | UsersClientsWhereInput[]
    id?: IntFilter<"UsersClients"> | number
    userId?: IntFilter<"UsersClients"> | number
    name?: StringFilter<"UsersClients"> | string
    phone?: StringFilter<"UsersClients"> | string
    email?: StringFilter<"UsersClients"> | string
    telegramId?: BigIntFilter<"UsersClients"> | bigint | number
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type UsersClientsOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    telegramId?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type UsersClientsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: UsersClientsWhereInput | UsersClientsWhereInput[]
    OR?: UsersClientsWhereInput[]
    NOT?: UsersClientsWhereInput | UsersClientsWhereInput[]
    userId?: IntFilter<"UsersClients"> | number
    name?: StringFilter<"UsersClients"> | string
    phone?: StringFilter<"UsersClients"> | string
    email?: StringFilter<"UsersClients"> | string
    telegramId?: BigIntFilter<"UsersClients"> | bigint | number
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type UsersClientsOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    telegramId?: SortOrder
    _count?: UsersClientsCountOrderByAggregateInput
    _avg?: UsersClientsAvgOrderByAggregateInput
    _max?: UsersClientsMaxOrderByAggregateInput
    _min?: UsersClientsMinOrderByAggregateInput
    _sum?: UsersClientsSumOrderByAggregateInput
  }

  export type UsersClientsScalarWhereWithAggregatesInput = {
    AND?: UsersClientsScalarWhereWithAggregatesInput | UsersClientsScalarWhereWithAggregatesInput[]
    OR?: UsersClientsScalarWhereWithAggregatesInput[]
    NOT?: UsersClientsScalarWhereWithAggregatesInput | UsersClientsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"UsersClients"> | number
    userId?: IntWithAggregatesFilter<"UsersClients"> | number
    name?: StringWithAggregatesFilter<"UsersClients"> | string
    phone?: StringWithAggregatesFilter<"UsersClients"> | string
    email?: StringWithAggregatesFilter<"UsersClients"> | string
    telegramId?: BigIntWithAggregatesFilter<"UsersClients"> | bigint | number
  }

  export type UserCreateInput = {
    telegramId: number
    username: string
    role?: $Enums.UserRoles
    rate?: $Enums.UserRate
    lastAction?: Date | string
    firstAction?: Date | string
    clients?: UsersClientsCreateNestedManyWithoutUserInput
    estimation?: UsersEstimationCreateNestedManyWithoutUserInput
    questions?: UsersQuestionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    telegramId: number
    username: string
    role?: $Enums.UserRoles
    rate?: $Enums.UserRate
    lastAction?: Date | string
    firstAction?: Date | string
    clients?: UsersClientsUncheckedCreateNestedManyWithoutUserInput
    estimation?: UsersEstimationUncheckedCreateNestedManyWithoutUserInput
    questions?: UsersQuestionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    telegramId?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRolesFieldUpdateOperationsInput | $Enums.UserRoles
    rate?: EnumUserRateFieldUpdateOperationsInput | $Enums.UserRate
    lastAction?: DateTimeFieldUpdateOperationsInput | Date | string
    firstAction?: DateTimeFieldUpdateOperationsInput | Date | string
    clients?: UsersClientsUpdateManyWithoutUserNestedInput
    estimation?: UsersEstimationUpdateManyWithoutUserNestedInput
    questions?: UsersQuestionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    telegramId?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRolesFieldUpdateOperationsInput | $Enums.UserRoles
    rate?: EnumUserRateFieldUpdateOperationsInput | $Enums.UserRate
    lastAction?: DateTimeFieldUpdateOperationsInput | Date | string
    firstAction?: DateTimeFieldUpdateOperationsInput | Date | string
    clients?: UsersClientsUncheckedUpdateManyWithoutUserNestedInput
    estimation?: UsersEstimationUncheckedUpdateManyWithoutUserNestedInput
    questions?: UsersQuestionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    telegramId: number
    username: string
    role?: $Enums.UserRoles
    rate?: $Enums.UserRate
    lastAction?: Date | string
    firstAction?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    telegramId?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRolesFieldUpdateOperationsInput | $Enums.UserRoles
    rate?: EnumUserRateFieldUpdateOperationsInput | $Enums.UserRate
    lastAction?: DateTimeFieldUpdateOperationsInput | Date | string
    firstAction?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    telegramId?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRolesFieldUpdateOperationsInput | $Enums.UserRoles
    rate?: EnumUserRateFieldUpdateOperationsInput | $Enums.UserRate
    lastAction?: DateTimeFieldUpdateOperationsInput | Date | string
    firstAction?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsersQuestionCreateInput = {
    isTakingBonus?: boolean
    whatsABusiness: string
    conversion: string
    about: string
    CAC: number
    LTV: number
    user: UserCreateNestedOneWithoutQuestionsInput
  }

  export type UsersQuestionUncheckedCreateInput = {
    id?: number
    userId: number
    isTakingBonus?: boolean
    whatsABusiness: string
    conversion: string
    about: string
    CAC: number
    LTV: number
  }

  export type UsersQuestionUpdateInput = {
    isTakingBonus?: BoolFieldUpdateOperationsInput | boolean
    whatsABusiness?: StringFieldUpdateOperationsInput | string
    conversion?: StringFieldUpdateOperationsInput | string
    about?: StringFieldUpdateOperationsInput | string
    CAC?: FloatFieldUpdateOperationsInput | number
    LTV?: FloatFieldUpdateOperationsInput | number
    user?: UserUpdateOneRequiredWithoutQuestionsNestedInput
  }

  export type UsersQuestionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    isTakingBonus?: BoolFieldUpdateOperationsInput | boolean
    whatsABusiness?: StringFieldUpdateOperationsInput | string
    conversion?: StringFieldUpdateOperationsInput | string
    about?: StringFieldUpdateOperationsInput | string
    CAC?: FloatFieldUpdateOperationsInput | number
    LTV?: FloatFieldUpdateOperationsInput | number
  }

  export type UsersQuestionCreateManyInput = {
    id?: number
    userId: number
    isTakingBonus?: boolean
    whatsABusiness: string
    conversion: string
    about: string
    CAC: number
    LTV: number
  }

  export type UsersQuestionUpdateManyMutationInput = {
    isTakingBonus?: BoolFieldUpdateOperationsInput | boolean
    whatsABusiness?: StringFieldUpdateOperationsInput | string
    conversion?: StringFieldUpdateOperationsInput | string
    about?: StringFieldUpdateOperationsInput | string
    CAC?: FloatFieldUpdateOperationsInput | number
    LTV?: FloatFieldUpdateOperationsInput | number
  }

  export type UsersQuestionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    isTakingBonus?: BoolFieldUpdateOperationsInput | boolean
    whatsABusiness?: StringFieldUpdateOperationsInput | string
    conversion?: StringFieldUpdateOperationsInput | string
    about?: StringFieldUpdateOperationsInput | string
    CAC?: FloatFieldUpdateOperationsInput | number
    LTV?: FloatFieldUpdateOperationsInput | number
  }

  export type UsersEstimationCreateInput = {
    estimation: number
    user: UserCreateNestedOneWithoutEstimationInput
  }

  export type UsersEstimationUncheckedCreateInput = {
    id?: number
    userId: number
    estimation: number
  }

  export type UsersEstimationUpdateInput = {
    estimation?: IntFieldUpdateOperationsInput | number
    user?: UserUpdateOneRequiredWithoutEstimationNestedInput
  }

  export type UsersEstimationUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    estimation?: IntFieldUpdateOperationsInput | number
  }

  export type UsersEstimationCreateManyInput = {
    id?: number
    userId: number
    estimation: number
  }

  export type UsersEstimationUpdateManyMutationInput = {
    estimation?: IntFieldUpdateOperationsInput | number
  }

  export type UsersEstimationUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    estimation?: IntFieldUpdateOperationsInput | number
  }

  export type UsersClientsCreateInput = {
    name: string
    phone: string
    email: string
    telegramId: bigint | number
    user: UserCreateNestedOneWithoutClientsInput
  }

  export type UsersClientsUncheckedCreateInput = {
    id?: number
    userId: number
    name: string
    phone: string
    email: string
    telegramId: bigint | number
  }

  export type UsersClientsUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    telegramId?: BigIntFieldUpdateOperationsInput | bigint | number
    user?: UserUpdateOneRequiredWithoutClientsNestedInput
  }

  export type UsersClientsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    telegramId?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type UsersClientsCreateManyInput = {
    id?: number
    userId: number
    name: string
    phone: string
    email: string
    telegramId: bigint | number
  }

  export type UsersClientsUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    telegramId?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type UsersClientsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    telegramId?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumUserRolesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRoles | EnumUserRolesFieldRefInput<$PrismaModel>
    in?: $Enums.UserRoles[] | ListEnumUserRolesFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRoles[] | ListEnumUserRolesFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRolesFilter<$PrismaModel> | $Enums.UserRoles
  }

  export type EnumUserRateFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRate | EnumUserRateFieldRefInput<$PrismaModel>
    in?: $Enums.UserRate[] | ListEnumUserRateFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRate[] | ListEnumUserRateFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRateFilter<$PrismaModel> | $Enums.UserRate
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type UsersClientsListRelationFilter = {
    every?: UsersClientsWhereInput
    some?: UsersClientsWhereInput
    none?: UsersClientsWhereInput
  }

  export type UsersEstimationListRelationFilter = {
    every?: UsersEstimationWhereInput
    some?: UsersEstimationWhereInput
    none?: UsersEstimationWhereInput
  }

  export type UsersQuestionListRelationFilter = {
    every?: UsersQuestionWhereInput
    some?: UsersQuestionWhereInput
    none?: UsersQuestionWhereInput
  }

  export type UsersClientsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UsersEstimationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UsersQuestionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    telegramId?: SortOrder
    username?: SortOrder
    role?: SortOrder
    rate?: SortOrder
    lastAction?: SortOrder
    firstAction?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
    telegramId?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    telegramId?: SortOrder
    username?: SortOrder
    role?: SortOrder
    rate?: SortOrder
    lastAction?: SortOrder
    firstAction?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    telegramId?: SortOrder
    username?: SortOrder
    role?: SortOrder
    rate?: SortOrder
    lastAction?: SortOrder
    firstAction?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
    telegramId?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumUserRolesWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRoles | EnumUserRolesFieldRefInput<$PrismaModel>
    in?: $Enums.UserRoles[] | ListEnumUserRolesFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRoles[] | ListEnumUserRolesFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRolesWithAggregatesFilter<$PrismaModel> | $Enums.UserRoles
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRolesFilter<$PrismaModel>
    _max?: NestedEnumUserRolesFilter<$PrismaModel>
  }

  export type EnumUserRateWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRate | EnumUserRateFieldRefInput<$PrismaModel>
    in?: $Enums.UserRate[] | ListEnumUserRateFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRate[] | ListEnumUserRateFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRateWithAggregatesFilter<$PrismaModel> | $Enums.UserRate
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRateFilter<$PrismaModel>
    _max?: NestedEnumUserRateFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type UsersQuestionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    isTakingBonus?: SortOrder
    whatsABusiness?: SortOrder
    conversion?: SortOrder
    about?: SortOrder
    CAC?: SortOrder
    LTV?: SortOrder
  }

  export type UsersQuestionAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    CAC?: SortOrder
    LTV?: SortOrder
  }

  export type UsersQuestionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    isTakingBonus?: SortOrder
    whatsABusiness?: SortOrder
    conversion?: SortOrder
    about?: SortOrder
    CAC?: SortOrder
    LTV?: SortOrder
  }

  export type UsersQuestionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    isTakingBonus?: SortOrder
    whatsABusiness?: SortOrder
    conversion?: SortOrder
    about?: SortOrder
    CAC?: SortOrder
    LTV?: SortOrder
  }

  export type UsersQuestionSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    CAC?: SortOrder
    LTV?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type UsersEstimationCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    estimation?: SortOrder
  }

  export type UsersEstimationAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    estimation?: SortOrder
  }

  export type UsersEstimationMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    estimation?: SortOrder
  }

  export type UsersEstimationMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    estimation?: SortOrder
  }

  export type UsersEstimationSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    estimation?: SortOrder
  }

  export type BigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type UsersClientsCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    telegramId?: SortOrder
  }

  export type UsersClientsAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    telegramId?: SortOrder
  }

  export type UsersClientsMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    telegramId?: SortOrder
  }

  export type UsersClientsMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    telegramId?: SortOrder
  }

  export type UsersClientsSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    telegramId?: SortOrder
  }

  export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type UsersClientsCreateNestedManyWithoutUserInput = {
    create?: XOR<UsersClientsCreateWithoutUserInput, UsersClientsUncheckedCreateWithoutUserInput> | UsersClientsCreateWithoutUserInput[] | UsersClientsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UsersClientsCreateOrConnectWithoutUserInput | UsersClientsCreateOrConnectWithoutUserInput[]
    createMany?: UsersClientsCreateManyUserInputEnvelope
    connect?: UsersClientsWhereUniqueInput | UsersClientsWhereUniqueInput[]
  }

  export type UsersEstimationCreateNestedManyWithoutUserInput = {
    create?: XOR<UsersEstimationCreateWithoutUserInput, UsersEstimationUncheckedCreateWithoutUserInput> | UsersEstimationCreateWithoutUserInput[] | UsersEstimationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UsersEstimationCreateOrConnectWithoutUserInput | UsersEstimationCreateOrConnectWithoutUserInput[]
    createMany?: UsersEstimationCreateManyUserInputEnvelope
    connect?: UsersEstimationWhereUniqueInput | UsersEstimationWhereUniqueInput[]
  }

  export type UsersQuestionCreateNestedManyWithoutUserInput = {
    create?: XOR<UsersQuestionCreateWithoutUserInput, UsersQuestionUncheckedCreateWithoutUserInput> | UsersQuestionCreateWithoutUserInput[] | UsersQuestionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UsersQuestionCreateOrConnectWithoutUserInput | UsersQuestionCreateOrConnectWithoutUserInput[]
    createMany?: UsersQuestionCreateManyUserInputEnvelope
    connect?: UsersQuestionWhereUniqueInput | UsersQuestionWhereUniqueInput[]
  }

  export type UsersClientsUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UsersClientsCreateWithoutUserInput, UsersClientsUncheckedCreateWithoutUserInput> | UsersClientsCreateWithoutUserInput[] | UsersClientsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UsersClientsCreateOrConnectWithoutUserInput | UsersClientsCreateOrConnectWithoutUserInput[]
    createMany?: UsersClientsCreateManyUserInputEnvelope
    connect?: UsersClientsWhereUniqueInput | UsersClientsWhereUniqueInput[]
  }

  export type UsersEstimationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UsersEstimationCreateWithoutUserInput, UsersEstimationUncheckedCreateWithoutUserInput> | UsersEstimationCreateWithoutUserInput[] | UsersEstimationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UsersEstimationCreateOrConnectWithoutUserInput | UsersEstimationCreateOrConnectWithoutUserInput[]
    createMany?: UsersEstimationCreateManyUserInputEnvelope
    connect?: UsersEstimationWhereUniqueInput | UsersEstimationWhereUniqueInput[]
  }

  export type UsersQuestionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UsersQuestionCreateWithoutUserInput, UsersQuestionUncheckedCreateWithoutUserInput> | UsersQuestionCreateWithoutUserInput[] | UsersQuestionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UsersQuestionCreateOrConnectWithoutUserInput | UsersQuestionCreateOrConnectWithoutUserInput[]
    createMany?: UsersQuestionCreateManyUserInputEnvelope
    connect?: UsersQuestionWhereUniqueInput | UsersQuestionWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumUserRolesFieldUpdateOperationsInput = {
    set?: $Enums.UserRoles
  }

  export type EnumUserRateFieldUpdateOperationsInput = {
    set?: $Enums.UserRate
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UsersClientsUpdateManyWithoutUserNestedInput = {
    create?: XOR<UsersClientsCreateWithoutUserInput, UsersClientsUncheckedCreateWithoutUserInput> | UsersClientsCreateWithoutUserInput[] | UsersClientsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UsersClientsCreateOrConnectWithoutUserInput | UsersClientsCreateOrConnectWithoutUserInput[]
    upsert?: UsersClientsUpsertWithWhereUniqueWithoutUserInput | UsersClientsUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UsersClientsCreateManyUserInputEnvelope
    set?: UsersClientsWhereUniqueInput | UsersClientsWhereUniqueInput[]
    disconnect?: UsersClientsWhereUniqueInput | UsersClientsWhereUniqueInput[]
    delete?: UsersClientsWhereUniqueInput | UsersClientsWhereUniqueInput[]
    connect?: UsersClientsWhereUniqueInput | UsersClientsWhereUniqueInput[]
    update?: UsersClientsUpdateWithWhereUniqueWithoutUserInput | UsersClientsUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UsersClientsUpdateManyWithWhereWithoutUserInput | UsersClientsUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UsersClientsScalarWhereInput | UsersClientsScalarWhereInput[]
  }

  export type UsersEstimationUpdateManyWithoutUserNestedInput = {
    create?: XOR<UsersEstimationCreateWithoutUserInput, UsersEstimationUncheckedCreateWithoutUserInput> | UsersEstimationCreateWithoutUserInput[] | UsersEstimationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UsersEstimationCreateOrConnectWithoutUserInput | UsersEstimationCreateOrConnectWithoutUserInput[]
    upsert?: UsersEstimationUpsertWithWhereUniqueWithoutUserInput | UsersEstimationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UsersEstimationCreateManyUserInputEnvelope
    set?: UsersEstimationWhereUniqueInput | UsersEstimationWhereUniqueInput[]
    disconnect?: UsersEstimationWhereUniqueInput | UsersEstimationWhereUniqueInput[]
    delete?: UsersEstimationWhereUniqueInput | UsersEstimationWhereUniqueInput[]
    connect?: UsersEstimationWhereUniqueInput | UsersEstimationWhereUniqueInput[]
    update?: UsersEstimationUpdateWithWhereUniqueWithoutUserInput | UsersEstimationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UsersEstimationUpdateManyWithWhereWithoutUserInput | UsersEstimationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UsersEstimationScalarWhereInput | UsersEstimationScalarWhereInput[]
  }

  export type UsersQuestionUpdateManyWithoutUserNestedInput = {
    create?: XOR<UsersQuestionCreateWithoutUserInput, UsersQuestionUncheckedCreateWithoutUserInput> | UsersQuestionCreateWithoutUserInput[] | UsersQuestionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UsersQuestionCreateOrConnectWithoutUserInput | UsersQuestionCreateOrConnectWithoutUserInput[]
    upsert?: UsersQuestionUpsertWithWhereUniqueWithoutUserInput | UsersQuestionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UsersQuestionCreateManyUserInputEnvelope
    set?: UsersQuestionWhereUniqueInput | UsersQuestionWhereUniqueInput[]
    disconnect?: UsersQuestionWhereUniqueInput | UsersQuestionWhereUniqueInput[]
    delete?: UsersQuestionWhereUniqueInput | UsersQuestionWhereUniqueInput[]
    connect?: UsersQuestionWhereUniqueInput | UsersQuestionWhereUniqueInput[]
    update?: UsersQuestionUpdateWithWhereUniqueWithoutUserInput | UsersQuestionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UsersQuestionUpdateManyWithWhereWithoutUserInput | UsersQuestionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UsersQuestionScalarWhereInput | UsersQuestionScalarWhereInput[]
  }

  export type UsersClientsUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UsersClientsCreateWithoutUserInput, UsersClientsUncheckedCreateWithoutUserInput> | UsersClientsCreateWithoutUserInput[] | UsersClientsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UsersClientsCreateOrConnectWithoutUserInput | UsersClientsCreateOrConnectWithoutUserInput[]
    upsert?: UsersClientsUpsertWithWhereUniqueWithoutUserInput | UsersClientsUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UsersClientsCreateManyUserInputEnvelope
    set?: UsersClientsWhereUniqueInput | UsersClientsWhereUniqueInput[]
    disconnect?: UsersClientsWhereUniqueInput | UsersClientsWhereUniqueInput[]
    delete?: UsersClientsWhereUniqueInput | UsersClientsWhereUniqueInput[]
    connect?: UsersClientsWhereUniqueInput | UsersClientsWhereUniqueInput[]
    update?: UsersClientsUpdateWithWhereUniqueWithoutUserInput | UsersClientsUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UsersClientsUpdateManyWithWhereWithoutUserInput | UsersClientsUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UsersClientsScalarWhereInput | UsersClientsScalarWhereInput[]
  }

  export type UsersEstimationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UsersEstimationCreateWithoutUserInput, UsersEstimationUncheckedCreateWithoutUserInput> | UsersEstimationCreateWithoutUserInput[] | UsersEstimationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UsersEstimationCreateOrConnectWithoutUserInput | UsersEstimationCreateOrConnectWithoutUserInput[]
    upsert?: UsersEstimationUpsertWithWhereUniqueWithoutUserInput | UsersEstimationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UsersEstimationCreateManyUserInputEnvelope
    set?: UsersEstimationWhereUniqueInput | UsersEstimationWhereUniqueInput[]
    disconnect?: UsersEstimationWhereUniqueInput | UsersEstimationWhereUniqueInput[]
    delete?: UsersEstimationWhereUniqueInput | UsersEstimationWhereUniqueInput[]
    connect?: UsersEstimationWhereUniqueInput | UsersEstimationWhereUniqueInput[]
    update?: UsersEstimationUpdateWithWhereUniqueWithoutUserInput | UsersEstimationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UsersEstimationUpdateManyWithWhereWithoutUserInput | UsersEstimationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UsersEstimationScalarWhereInput | UsersEstimationScalarWhereInput[]
  }

  export type UsersQuestionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UsersQuestionCreateWithoutUserInput, UsersQuestionUncheckedCreateWithoutUserInput> | UsersQuestionCreateWithoutUserInput[] | UsersQuestionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UsersQuestionCreateOrConnectWithoutUserInput | UsersQuestionCreateOrConnectWithoutUserInput[]
    upsert?: UsersQuestionUpsertWithWhereUniqueWithoutUserInput | UsersQuestionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UsersQuestionCreateManyUserInputEnvelope
    set?: UsersQuestionWhereUniqueInput | UsersQuestionWhereUniqueInput[]
    disconnect?: UsersQuestionWhereUniqueInput | UsersQuestionWhereUniqueInput[]
    delete?: UsersQuestionWhereUniqueInput | UsersQuestionWhereUniqueInput[]
    connect?: UsersQuestionWhereUniqueInput | UsersQuestionWhereUniqueInput[]
    update?: UsersQuestionUpdateWithWhereUniqueWithoutUserInput | UsersQuestionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UsersQuestionUpdateManyWithWhereWithoutUserInput | UsersQuestionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UsersQuestionScalarWhereInput | UsersQuestionScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutQuestionsInput = {
    create?: XOR<UserCreateWithoutQuestionsInput, UserUncheckedCreateWithoutQuestionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutQuestionsInput
    connect?: UserWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutQuestionsNestedInput = {
    create?: XOR<UserCreateWithoutQuestionsInput, UserUncheckedCreateWithoutQuestionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutQuestionsInput
    upsert?: UserUpsertWithoutQuestionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutQuestionsInput, UserUpdateWithoutQuestionsInput>, UserUncheckedUpdateWithoutQuestionsInput>
  }

  export type UserCreateNestedOneWithoutEstimationInput = {
    create?: XOR<UserCreateWithoutEstimationInput, UserUncheckedCreateWithoutEstimationInput>
    connectOrCreate?: UserCreateOrConnectWithoutEstimationInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutEstimationNestedInput = {
    create?: XOR<UserCreateWithoutEstimationInput, UserUncheckedCreateWithoutEstimationInput>
    connectOrCreate?: UserCreateOrConnectWithoutEstimationInput
    upsert?: UserUpsertWithoutEstimationInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutEstimationInput, UserUpdateWithoutEstimationInput>, UserUncheckedUpdateWithoutEstimationInput>
  }

  export type UserCreateNestedOneWithoutClientsInput = {
    create?: XOR<UserCreateWithoutClientsInput, UserUncheckedCreateWithoutClientsInput>
    connectOrCreate?: UserCreateOrConnectWithoutClientsInput
    connect?: UserWhereUniqueInput
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type UserUpdateOneRequiredWithoutClientsNestedInput = {
    create?: XOR<UserCreateWithoutClientsInput, UserUncheckedCreateWithoutClientsInput>
    connectOrCreate?: UserCreateOrConnectWithoutClientsInput
    upsert?: UserUpsertWithoutClientsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutClientsInput, UserUpdateWithoutClientsInput>, UserUncheckedUpdateWithoutClientsInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumUserRolesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRoles | EnumUserRolesFieldRefInput<$PrismaModel>
    in?: $Enums.UserRoles[] | ListEnumUserRolesFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRoles[] | ListEnumUserRolesFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRolesFilter<$PrismaModel> | $Enums.UserRoles
  }

  export type NestedEnumUserRateFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRate | EnumUserRateFieldRefInput<$PrismaModel>
    in?: $Enums.UserRate[] | ListEnumUserRateFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRate[] | ListEnumUserRateFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRateFilter<$PrismaModel> | $Enums.UserRate
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedEnumUserRolesWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRoles | EnumUserRolesFieldRefInput<$PrismaModel>
    in?: $Enums.UserRoles[] | ListEnumUserRolesFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRoles[] | ListEnumUserRolesFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRolesWithAggregatesFilter<$PrismaModel> | $Enums.UserRoles
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRolesFilter<$PrismaModel>
    _max?: NestedEnumUserRolesFilter<$PrismaModel>
  }

  export type NestedEnumUserRateWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRate | EnumUserRateFieldRefInput<$PrismaModel>
    in?: $Enums.UserRate[] | ListEnumUserRateFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRate[] | ListEnumUserRateFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRateWithAggregatesFilter<$PrismaModel> | $Enums.UserRate
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRateFilter<$PrismaModel>
    _max?: NestedEnumUserRateFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedBigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type UsersClientsCreateWithoutUserInput = {
    name: string
    phone: string
    email: string
    telegramId: bigint | number
  }

  export type UsersClientsUncheckedCreateWithoutUserInput = {
    id?: number
    name: string
    phone: string
    email: string
    telegramId: bigint | number
  }

  export type UsersClientsCreateOrConnectWithoutUserInput = {
    where: UsersClientsWhereUniqueInput
    create: XOR<UsersClientsCreateWithoutUserInput, UsersClientsUncheckedCreateWithoutUserInput>
  }

  export type UsersClientsCreateManyUserInputEnvelope = {
    data: UsersClientsCreateManyUserInput | UsersClientsCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UsersEstimationCreateWithoutUserInput = {
    estimation: number
  }

  export type UsersEstimationUncheckedCreateWithoutUserInput = {
    id?: number
    estimation: number
  }

  export type UsersEstimationCreateOrConnectWithoutUserInput = {
    where: UsersEstimationWhereUniqueInput
    create: XOR<UsersEstimationCreateWithoutUserInput, UsersEstimationUncheckedCreateWithoutUserInput>
  }

  export type UsersEstimationCreateManyUserInputEnvelope = {
    data: UsersEstimationCreateManyUserInput | UsersEstimationCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UsersQuestionCreateWithoutUserInput = {
    isTakingBonus?: boolean
    whatsABusiness: string
    conversion: string
    about: string
    CAC: number
    LTV: number
  }

  export type UsersQuestionUncheckedCreateWithoutUserInput = {
    id?: number
    isTakingBonus?: boolean
    whatsABusiness: string
    conversion: string
    about: string
    CAC: number
    LTV: number
  }

  export type UsersQuestionCreateOrConnectWithoutUserInput = {
    where: UsersQuestionWhereUniqueInput
    create: XOR<UsersQuestionCreateWithoutUserInput, UsersQuestionUncheckedCreateWithoutUserInput>
  }

  export type UsersQuestionCreateManyUserInputEnvelope = {
    data: UsersQuestionCreateManyUserInput | UsersQuestionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UsersClientsUpsertWithWhereUniqueWithoutUserInput = {
    where: UsersClientsWhereUniqueInput
    update: XOR<UsersClientsUpdateWithoutUserInput, UsersClientsUncheckedUpdateWithoutUserInput>
    create: XOR<UsersClientsCreateWithoutUserInput, UsersClientsUncheckedCreateWithoutUserInput>
  }

  export type UsersClientsUpdateWithWhereUniqueWithoutUserInput = {
    where: UsersClientsWhereUniqueInput
    data: XOR<UsersClientsUpdateWithoutUserInput, UsersClientsUncheckedUpdateWithoutUserInput>
  }

  export type UsersClientsUpdateManyWithWhereWithoutUserInput = {
    where: UsersClientsScalarWhereInput
    data: XOR<UsersClientsUpdateManyMutationInput, UsersClientsUncheckedUpdateManyWithoutUserInput>
  }

  export type UsersClientsScalarWhereInput = {
    AND?: UsersClientsScalarWhereInput | UsersClientsScalarWhereInput[]
    OR?: UsersClientsScalarWhereInput[]
    NOT?: UsersClientsScalarWhereInput | UsersClientsScalarWhereInput[]
    id?: IntFilter<"UsersClients"> | number
    userId?: IntFilter<"UsersClients"> | number
    name?: StringFilter<"UsersClients"> | string
    phone?: StringFilter<"UsersClients"> | string
    email?: StringFilter<"UsersClients"> | string
    telegramId?: BigIntFilter<"UsersClients"> | bigint | number
  }

  export type UsersEstimationUpsertWithWhereUniqueWithoutUserInput = {
    where: UsersEstimationWhereUniqueInput
    update: XOR<UsersEstimationUpdateWithoutUserInput, UsersEstimationUncheckedUpdateWithoutUserInput>
    create: XOR<UsersEstimationCreateWithoutUserInput, UsersEstimationUncheckedCreateWithoutUserInput>
  }

  export type UsersEstimationUpdateWithWhereUniqueWithoutUserInput = {
    where: UsersEstimationWhereUniqueInput
    data: XOR<UsersEstimationUpdateWithoutUserInput, UsersEstimationUncheckedUpdateWithoutUserInput>
  }

  export type UsersEstimationUpdateManyWithWhereWithoutUserInput = {
    where: UsersEstimationScalarWhereInput
    data: XOR<UsersEstimationUpdateManyMutationInput, UsersEstimationUncheckedUpdateManyWithoutUserInput>
  }

  export type UsersEstimationScalarWhereInput = {
    AND?: UsersEstimationScalarWhereInput | UsersEstimationScalarWhereInput[]
    OR?: UsersEstimationScalarWhereInput[]
    NOT?: UsersEstimationScalarWhereInput | UsersEstimationScalarWhereInput[]
    id?: IntFilter<"UsersEstimation"> | number
    userId?: IntFilter<"UsersEstimation"> | number
    estimation?: IntFilter<"UsersEstimation"> | number
  }

  export type UsersQuestionUpsertWithWhereUniqueWithoutUserInput = {
    where: UsersQuestionWhereUniqueInput
    update: XOR<UsersQuestionUpdateWithoutUserInput, UsersQuestionUncheckedUpdateWithoutUserInput>
    create: XOR<UsersQuestionCreateWithoutUserInput, UsersQuestionUncheckedCreateWithoutUserInput>
  }

  export type UsersQuestionUpdateWithWhereUniqueWithoutUserInput = {
    where: UsersQuestionWhereUniqueInput
    data: XOR<UsersQuestionUpdateWithoutUserInput, UsersQuestionUncheckedUpdateWithoutUserInput>
  }

  export type UsersQuestionUpdateManyWithWhereWithoutUserInput = {
    where: UsersQuestionScalarWhereInput
    data: XOR<UsersQuestionUpdateManyMutationInput, UsersQuestionUncheckedUpdateManyWithoutUserInput>
  }

  export type UsersQuestionScalarWhereInput = {
    AND?: UsersQuestionScalarWhereInput | UsersQuestionScalarWhereInput[]
    OR?: UsersQuestionScalarWhereInput[]
    NOT?: UsersQuestionScalarWhereInput | UsersQuestionScalarWhereInput[]
    id?: IntFilter<"UsersQuestion"> | number
    userId?: IntFilter<"UsersQuestion"> | number
    isTakingBonus?: BoolFilter<"UsersQuestion"> | boolean
    whatsABusiness?: StringFilter<"UsersQuestion"> | string
    conversion?: StringFilter<"UsersQuestion"> | string
    about?: StringFilter<"UsersQuestion"> | string
    CAC?: FloatFilter<"UsersQuestion"> | number
    LTV?: FloatFilter<"UsersQuestion"> | number
  }

  export type UserCreateWithoutQuestionsInput = {
    telegramId: number
    username: string
    role?: $Enums.UserRoles
    rate?: $Enums.UserRate
    lastAction?: Date | string
    firstAction?: Date | string
    clients?: UsersClientsCreateNestedManyWithoutUserInput
    estimation?: UsersEstimationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutQuestionsInput = {
    id?: number
    telegramId: number
    username: string
    role?: $Enums.UserRoles
    rate?: $Enums.UserRate
    lastAction?: Date | string
    firstAction?: Date | string
    clients?: UsersClientsUncheckedCreateNestedManyWithoutUserInput
    estimation?: UsersEstimationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutQuestionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutQuestionsInput, UserUncheckedCreateWithoutQuestionsInput>
  }

  export type UserUpsertWithoutQuestionsInput = {
    update: XOR<UserUpdateWithoutQuestionsInput, UserUncheckedUpdateWithoutQuestionsInput>
    create: XOR<UserCreateWithoutQuestionsInput, UserUncheckedCreateWithoutQuestionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutQuestionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutQuestionsInput, UserUncheckedUpdateWithoutQuestionsInput>
  }

  export type UserUpdateWithoutQuestionsInput = {
    telegramId?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRolesFieldUpdateOperationsInput | $Enums.UserRoles
    rate?: EnumUserRateFieldUpdateOperationsInput | $Enums.UserRate
    lastAction?: DateTimeFieldUpdateOperationsInput | Date | string
    firstAction?: DateTimeFieldUpdateOperationsInput | Date | string
    clients?: UsersClientsUpdateManyWithoutUserNestedInput
    estimation?: UsersEstimationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutQuestionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    telegramId?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRolesFieldUpdateOperationsInput | $Enums.UserRoles
    rate?: EnumUserRateFieldUpdateOperationsInput | $Enums.UserRate
    lastAction?: DateTimeFieldUpdateOperationsInput | Date | string
    firstAction?: DateTimeFieldUpdateOperationsInput | Date | string
    clients?: UsersClientsUncheckedUpdateManyWithoutUserNestedInput
    estimation?: UsersEstimationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutEstimationInput = {
    telegramId: number
    username: string
    role?: $Enums.UserRoles
    rate?: $Enums.UserRate
    lastAction?: Date | string
    firstAction?: Date | string
    clients?: UsersClientsCreateNestedManyWithoutUserInput
    questions?: UsersQuestionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutEstimationInput = {
    id?: number
    telegramId: number
    username: string
    role?: $Enums.UserRoles
    rate?: $Enums.UserRate
    lastAction?: Date | string
    firstAction?: Date | string
    clients?: UsersClientsUncheckedCreateNestedManyWithoutUserInput
    questions?: UsersQuestionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutEstimationInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutEstimationInput, UserUncheckedCreateWithoutEstimationInput>
  }

  export type UserUpsertWithoutEstimationInput = {
    update: XOR<UserUpdateWithoutEstimationInput, UserUncheckedUpdateWithoutEstimationInput>
    create: XOR<UserCreateWithoutEstimationInput, UserUncheckedCreateWithoutEstimationInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutEstimationInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutEstimationInput, UserUncheckedUpdateWithoutEstimationInput>
  }

  export type UserUpdateWithoutEstimationInput = {
    telegramId?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRolesFieldUpdateOperationsInput | $Enums.UserRoles
    rate?: EnumUserRateFieldUpdateOperationsInput | $Enums.UserRate
    lastAction?: DateTimeFieldUpdateOperationsInput | Date | string
    firstAction?: DateTimeFieldUpdateOperationsInput | Date | string
    clients?: UsersClientsUpdateManyWithoutUserNestedInput
    questions?: UsersQuestionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutEstimationInput = {
    id?: IntFieldUpdateOperationsInput | number
    telegramId?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRolesFieldUpdateOperationsInput | $Enums.UserRoles
    rate?: EnumUserRateFieldUpdateOperationsInput | $Enums.UserRate
    lastAction?: DateTimeFieldUpdateOperationsInput | Date | string
    firstAction?: DateTimeFieldUpdateOperationsInput | Date | string
    clients?: UsersClientsUncheckedUpdateManyWithoutUserNestedInput
    questions?: UsersQuestionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutClientsInput = {
    telegramId: number
    username: string
    role?: $Enums.UserRoles
    rate?: $Enums.UserRate
    lastAction?: Date | string
    firstAction?: Date | string
    estimation?: UsersEstimationCreateNestedManyWithoutUserInput
    questions?: UsersQuestionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutClientsInput = {
    id?: number
    telegramId: number
    username: string
    role?: $Enums.UserRoles
    rate?: $Enums.UserRate
    lastAction?: Date | string
    firstAction?: Date | string
    estimation?: UsersEstimationUncheckedCreateNestedManyWithoutUserInput
    questions?: UsersQuestionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutClientsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutClientsInput, UserUncheckedCreateWithoutClientsInput>
  }

  export type UserUpsertWithoutClientsInput = {
    update: XOR<UserUpdateWithoutClientsInput, UserUncheckedUpdateWithoutClientsInput>
    create: XOR<UserCreateWithoutClientsInput, UserUncheckedCreateWithoutClientsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutClientsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutClientsInput, UserUncheckedUpdateWithoutClientsInput>
  }

  export type UserUpdateWithoutClientsInput = {
    telegramId?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRolesFieldUpdateOperationsInput | $Enums.UserRoles
    rate?: EnumUserRateFieldUpdateOperationsInput | $Enums.UserRate
    lastAction?: DateTimeFieldUpdateOperationsInput | Date | string
    firstAction?: DateTimeFieldUpdateOperationsInput | Date | string
    estimation?: UsersEstimationUpdateManyWithoutUserNestedInput
    questions?: UsersQuestionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutClientsInput = {
    id?: IntFieldUpdateOperationsInput | number
    telegramId?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRolesFieldUpdateOperationsInput | $Enums.UserRoles
    rate?: EnumUserRateFieldUpdateOperationsInput | $Enums.UserRate
    lastAction?: DateTimeFieldUpdateOperationsInput | Date | string
    firstAction?: DateTimeFieldUpdateOperationsInput | Date | string
    estimation?: UsersEstimationUncheckedUpdateManyWithoutUserNestedInput
    questions?: UsersQuestionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UsersClientsCreateManyUserInput = {
    id?: number
    name: string
    phone: string
    email: string
    telegramId: bigint | number
  }

  export type UsersEstimationCreateManyUserInput = {
    id?: number
    estimation: number
  }

  export type UsersQuestionCreateManyUserInput = {
    id?: number
    isTakingBonus?: boolean
    whatsABusiness: string
    conversion: string
    about: string
    CAC: number
    LTV: number
  }

  export type UsersClientsUpdateWithoutUserInput = {
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    telegramId?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type UsersClientsUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    telegramId?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type UsersClientsUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    telegramId?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type UsersEstimationUpdateWithoutUserInput = {
    estimation?: IntFieldUpdateOperationsInput | number
  }

  export type UsersEstimationUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    estimation?: IntFieldUpdateOperationsInput | number
  }

  export type UsersEstimationUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    estimation?: IntFieldUpdateOperationsInput | number
  }

  export type UsersQuestionUpdateWithoutUserInput = {
    isTakingBonus?: BoolFieldUpdateOperationsInput | boolean
    whatsABusiness?: StringFieldUpdateOperationsInput | string
    conversion?: StringFieldUpdateOperationsInput | string
    about?: StringFieldUpdateOperationsInput | string
    CAC?: FloatFieldUpdateOperationsInput | number
    LTV?: FloatFieldUpdateOperationsInput | number
  }

  export type UsersQuestionUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    isTakingBonus?: BoolFieldUpdateOperationsInput | boolean
    whatsABusiness?: StringFieldUpdateOperationsInput | string
    conversion?: StringFieldUpdateOperationsInput | string
    about?: StringFieldUpdateOperationsInput | string
    CAC?: FloatFieldUpdateOperationsInput | number
    LTV?: FloatFieldUpdateOperationsInput | number
  }

  export type UsersQuestionUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    isTakingBonus?: BoolFieldUpdateOperationsInput | boolean
    whatsABusiness?: StringFieldUpdateOperationsInput | string
    conversion?: StringFieldUpdateOperationsInput | string
    about?: StringFieldUpdateOperationsInput | string
    CAC?: FloatFieldUpdateOperationsInput | number
    LTV?: FloatFieldUpdateOperationsInput | number
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}