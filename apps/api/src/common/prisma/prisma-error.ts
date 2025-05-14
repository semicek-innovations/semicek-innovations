import {
  BadRequestException,
  ConflictException,
  GatewayTimeoutException,
  HttpException,
  NotFoundException
} from '@nestjs/common'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

export type MessageKeys =
  // ─── Common (P1xxx) ───────────────────────────────────────────────────────────
  | 'authenticationFailed' // P1000
  | 'cannotConnect' // P1001, P1017
  | 'connectionTimedOut' // P1002, P1008
  | 'databaseNotFound' // P1003
  | 'databaseAlreadyExists' // P1009
  | 'accessDenied' // P1010
  | 'tlsConnectionError' // P1011
  | 'schemaValidationError' // P1012
  | 'invalidConnectionString' // P1013
  | 'missingConnector' // P1014
  | 'unsupportedFeature' // P1015
  | 'wrongParameterCount' // P1016

  // ─── Query Engine (P2xxx) ────────────────────────────────────────────────────
  | 'valueTooLong' // P2000
  | 'recordNotFound' // P2001, P2015, P2025
  | 'uniqueConstraintViolation' // P2002
  | 'foreignKeyViolation' // P2003
  | 'databaseConstraintViolation' // P2004
  | 'invalidFieldValue' // P2005, P2006
  | 'validationError' // P2007
  | 'queryParseError' // P2008
  | 'queryValidationError' // P2009
  | 'rawQueryFailed' // P2010
  | 'nullConstraintViolation' // P2011
  | 'missingValue' // P2012
  | 'missingArgument' // P2013
  | 'relationViolation' // P2014, P2017, P2018
  | 'interpretationError' // P2016
  | 'inputError' // P2019
  | 'outOfRange' // P2020
  | 'tableNotExist' // P2021
  | 'columnNotExist' // P2022
  | 'inconsistentData' // P2023
  | 'poolTimeout' // P2024
  | 'featureNotSupported' // P2026
  | 'multipleDatabaseErrors' // P2027
  | 'transactionError' // P2028
  | 'parameterLimitExceeded' // P2029
  | 'fulltextIndexMissing' // P2030
  | 'mongodbReplicaSetRequired' // P2031
  | 'bigIntOverflow' // P2033
  | 'transactionConflict' // P2034
  | 'assertionViolation' // P2035
  | 'externalConnectorError' // P2036
  | 'tooManyConnections' // P2037

  // ─── Migrate (P3xxx) ─────────────────────────────────────────────────────────
  | 'createDatabaseFailed' // P3000
  | 'destructiveChangesWarning' // P3001
  | 'migrationRolledBack' // P3002
  | 'invalidMigrationFormat' // P3003
  | 'systemDatabaseAlteration' // P3004
  | 'schemaNotEmpty' // P3005
  | 'shadowDatabaseApplyFailed' // P3006
  | 'previewFeatureNotAllowed' // P3007
  | 'alreadyAppliedMigration' // P3008
  | 'failedMigrationsInTarget' // P3009
  | 'migrationNameTooLong' // P3010
  | 'cannotRollbackMigration' // P3011, P3012
  | 'unsupportedDatasourceArray' // P3013
  | 'migrateCreateShadow' // P3014
  | 'migrateFileNotFound' // P3015
  | 'migrateFallback' // P3016
  | 'migrateNotFound' // P3017
  | 'applyMigrationFailed' // P3018
  | 'providerMismatchMigration' // P3019
  | 'azureShadowDbDisabled' // P3020
  | 'noForeignKeysSupported' // P3021
  | 'directDDLDisabled' // P3022

  // ─── Introspection (prisma db pull) ─────────────────────────────────────────
  | 'introspectionFailed' // P4000
  | 'emptyIntrospectedDatabase' // P4001
  | 'inconsistentIntrospection' // P4002

  // ─── Prisma Accelerate (P6xxx & P5011) ───────────────────────────────────────
  | 'accelerateServerError' // P6000
  | 'invalidAccelerateDataSource' // P6001
  | 'accelerateUnauthorized' // P6002
  | 'planLimitReached' // P6003
  | 'accelerateQueryTimeout' // P6004
  | 'accelerateInvalidParameters' // P6005
  | 'accelerateVersionNotSupported' // P6006
  | 'accelerateConnectionError' // P6008
  | 'responseSizeLimitExceeded' // P6009
  | 'projectDisabled' // P6010
  | 'tooManyRequests' // P5011

const codeToKey: Record<string, MessageKeys> = {
  P1000: 'authenticationFailed',
  P1001: 'cannotConnect',
  P1002: 'connectionTimedOut',
  P1003: 'databaseNotFound',
  P1008: 'connectionTimedOut',
  P1009: 'databaseAlreadyExists',
  P1010: 'accessDenied',
  P1011: 'tlsConnectionError',
  P1012: 'schemaValidationError',
  P1013: 'invalidConnectionString',
  P1014: 'missingConnector',
  P1015: 'unsupportedFeature',
  P1016: 'wrongParameterCount',
  P1017: 'cannotConnect',
  P2000: 'valueTooLong',
  P2001: 'recordNotFound',
  P2002: 'uniqueConstraintViolation',
  P2003: 'foreignKeyViolation',
  P2004: 'databaseConstraintViolation',
  P2005: 'invalidFieldValue',
  P2006: 'invalidFieldValue',
  P2007: 'validationError',
  P2008: 'queryParseError',
  P2009: 'queryValidationError',
  P2010: 'rawQueryFailed',
  P2011: 'nullConstraintViolation',
  P2012: 'missingValue',
  P2013: 'missingArgument',
  P2014: 'relationViolation',
  P2015: 'recordNotFound',
  P2016: 'interpretationError',
  P2017: 'relationViolation',
  P2018: 'relationViolation',
  P2019: 'inputError',
  P2020: 'outOfRange',
  P2021: 'tableNotExist',
  P2022: 'columnNotExist',
  P2023: 'inconsistentData',
  P2024: 'poolTimeout',
  P2025: 'recordNotFound',
  P2026: 'featureNotSupported',
  P2027: 'multipleDatabaseErrors',
  P2028: 'transactionError',
  P2029: 'parameterLimitExceeded',
  P2030: 'fulltextIndexMissing',
  P2031: 'mongodbReplicaSetRequired',
  P2033: 'bigIntOverflow',
  P2034: 'transactionConflict',
  P2035: 'assertionViolation',
  P2036: 'externalConnectorError',
  P2037: 'tooManyConnections',
  P3000: 'createDatabaseFailed',
  P3001: 'destructiveChangesWarning',
  P3002: 'migrationRolledBack',
  P3003: 'invalidMigrationFormat',
  P3004: 'systemDatabaseAlteration',
  P3005: 'schemaNotEmpty',
  P3006: 'shadowDatabaseApplyFailed',
  P3007: 'previewFeatureNotAllowed',
  P3008: 'alreadyAppliedMigration',
  P3009: 'failedMigrationsInTarget',
  P3010: 'migrationNameTooLong',
  P3011: 'cannotRollbackMigration',
  P3012: 'cannotRollbackMigration',
  P3013: 'unsupportedDatasourceArray',
  P3014: 'migrateCreateShadow',
  P3015: 'migrateFileNotFound',
  P3016: 'migrateFallback',
  P3017: 'migrateNotFound',
  P3018: 'applyMigrationFailed',
  P3019: 'providerMismatchMigration',
  P3020: 'azureShadowDbDisabled',
  P3021: 'noForeignKeysSupported',
  P3022: 'directDDLDisabled',
  P4000: 'introspectionFailed',
  P4001: 'emptyIntrospectedDatabase',
  P4002: 'inconsistentIntrospection',
  P6000: 'accelerateServerError',
  P6001: 'invalidAccelerateDataSource',
  P6002: 'accelerateUnauthorized',
  P6003: 'planLimitReached',
  P6004: 'accelerateQueryTimeout',
  P6005: 'accelerateInvalidParameters',
  P6006: 'accelerateVersionNotSupported',
  P6008: 'accelerateConnectionError',
  P6009: 'responseSizeLimitExceeded',
  P6010: 'projectDisabled',
  P5011: 'tooManyRequests'
}

export function prismaError(error: unknown, messages: Partial<Record<MessageKeys, string>>) {
  if (error instanceof PrismaClientKnownRequestError || typeof (error as any)?.code === 'string') {
    const code = (error as any).code as string
    const key = codeToKey[code]
    const msg = (key && messages[key]) || (error as any).message

    if (msg) {
      // Map to HTTP status
      if (/^P20(0[2-4]|0[6-9]|1\d|2[0-5])$/.test(code)) {
        // Unique, FK, record not found → 409 or 404
        if (/^P2001|P2015|P2025$/.test(code)) {
          throw new NotFoundException(msg)
        }
        throw new ConflictException(msg)
      }

      if (/^P10[0-3]$/.test(code) || /^P1008$/.test(code) || /^P1017$/.test(code)) {
        // Connection/auth issues → 504 Gateway Timeout
        throw new GatewayTimeoutException(msg)
      }

      // Default: 400 Bad Request
      throw new BadRequestException(msg)
    }
  }

  if (error instanceof HttpException) {
    throw error
  }

  throw new BadRequestException((error as any)?.message || 'An unexpected error occurred')
}
