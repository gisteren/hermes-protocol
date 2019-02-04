const ref = require('ref')
const Struct = require('ref-struct')

const coerce = ref.coerceType
const pointer = ref.refType

/* Misc. */

const CStringArray = Struct({
  data: coerce('char **'),
  size: coerce('int')
})

const CMqttOptions = Struct({
  broker_address: coerce('char *'),
  username: coerce('char *'),
  password: coerce('char *'),
  tls_hostname: coerce('char *'),
  tls_ca_file: pointer(CStringArray),
  tls_ca_path: pointer(CStringArray),
  tls_client_key: coerce('char *'),
  tls_client_cert: coerce('char *'),
  tls_disable_root_store: coerce('uchar'),
})

const CActionSessionInit = Struct({
  text: coerce('char *'),
  intent_filter: pointer(CStringArray),
  can_be_enqueued: coerce('uchar'),
  send_intent_not_recognized: coerce('uchar')
})

const CSessionInit = Struct({
  init_type: coerce('int'),
  value: coerce('void *')
})

const CNluIntentClassifierResult = Struct({
  intent_name: coerce('char *'),
  confidence_score: coerce('float')
})

const CSlotValue = Struct({
  value: coerce('void *'),
  value_type: 'int'
})

const CSlot = Struct({
  value: CSlotValue,
  raw_value: coerce('char *'),
  entity: coerce('char *'),
  slot_name: coerce('char *'),
  range_start: coerce('int'),
  range_end: coerce('int'),
  confidence_score: coerce('float')
})

const CNluSlot = Struct({
  nlu_slot: pointer(CSlot),
})

const CNluSlotArray = Struct({
  entries: pointer(pointer(CNluSlot)),
  count: coerce('int'),
})

const CSessionTermination = Struct({
  termination_type: coerce('int'),
  data: coerce('char *')
})

const CInstantTimeValue = Struct({
  value: coerce('char *'),
  grain: coerce('int'),
  precision: coerce('int')
})

const CTimeIntervalValue = Struct({
  from: coerce('char *'),
  to: coerce('char *')
})

const CAmountOfMoneyValue = Struct({
  unit: coerce('char *'),
  value: coerce('float'),
  precision: coerce('int')
})

const CTemperatureValue = Struct({
  unit: coerce('char *'),
  value: coerce('float')
})

const CDurationValue = Struct({
  years: coerce('int64'),
  quarters: coerce('int64'),
  months: coerce('int64'),
  weeks: coerce('int64'),
  days: coerce('int64'),
  hours: coerce('int64'),
  minutes: coerce('int64'),
  seconds: coerce('int64'),
  precision: coerce('int')
})

const CAsrDecodingDuration = Struct({
    start: coerce('float'),
    end: coerce('float'),
})

const CAsrToken = Struct({
    value: coerce('string'),
    confidence: coerce('float'),
    range_start: coerce('int'),
    range_end: coerce('int'),
    time: CAsrDecodingDuration,
})

const CAsrTokenArray = Struct({
    entries: pointer(pointer(CAsrToken)),
    count: coerce('int')
})

const CAsrTokenDoubleArray = Struct({
    entries: pointer(pointer(CAsrTokenArray)),
    count: coerce('int')
})

const misc = {
  CMqttOptions,
  CStringArray,
  CActionSessionInit,
  CSessionInit,
  CNluIntentClassifierResult,
  CSlotValue,
  CSlot,
  CNluSlot,
  CNluSlotArray,
  CSessionTermination,
  CInstantTimeValue,
  CTimeIntervalValue,
  CAmountOfMoneyValue,
  CTemperatureValue,
  CDurationValue,
  CAsrDecodingDuration,
  CAsrToken,
  CAsrTokenArray,
  CAsrTokenDoubleArray
}

/* Protocol Handler */

const CProtocolHandler = Struct({
  handler: coerce('void *'),
  user_data: coerce('void *')
})

/* Messages */

// Dialogue

const CIntentMessage = Struct({
  session_id: coerce('char *'),
  custom_data: coerce('char *'),
  site_id: coerce('char *'),
  input: coerce('char *'),
  intent: pointer(CNluIntentClassifierResult),
  slots:  pointer(CNluSlotArray),
  asr_tokens: pointer(CAsrTokenDoubleArray)
})

const CIntentNotRecognizedMessage = Struct({
  site_id: coerce('char *'),
  session_id: coerce('char *'),
  input: coerce('char *'),
  custom_data: coerce('char *'),
  confidence_score: coerce('float')
})

const CSessionEndedMessage = Struct({
  session_id: coerce('char *'),
  custom_data: coerce('char *'),
  termination: CSessionTermination,
  site_id: coerce('char *')
})

const CSessionQueuedMessage = Struct({
  session_id: coerce('char *'),
  custom_data: coerce('char *'),
  site_id: coerce('char *')
})

const CSessionStartedMessage = Struct({
  session_id: coerce('char *'),
  custom_data: coerce('char *'),
  site_id: coerce('char *'),
  reactivated_from_session_id: coerce('char *')
})

const CEndSessionMessage = Struct({
  session_id: coerce('char *'),
  text: coerce('char *')
})

const CContinueSessionMessage = Struct({
  session_id: coerce('char *'),
  text: coerce('char *'),
  intent_filter: pointer(CStringArray),
  custom_data: coerce('char *'),
  send_intent_not_recognized: coerce('uchar')
})

const CStartSessionMessage = Struct({
  session_init: CSessionInit,
  custom_data: coerce('char *'),
  site_id: coerce('char *')
})

const CSayMessage = Struct({
  text: coerce('char *'),
  lang: coerce('char *'),
  id: coerce('char *'),
  site_id: coerce('char *'),
  session_id: coerce('char *')
})

// Injection

const CMapStringToStringArrayEntry = Struct({
  key: coerce('char *'),
  value: pointer(CStringArray)
})

const CMapStringToStringArray = Struct({
  entries: pointer(pointer(CMapStringToStringArrayEntry)),
  count: coerce('int')
})

const CInjectionRequestOperation = Struct({
  values: pointer(CMapStringToStringArray),
  kind: coerce('int')
})

const CInjectionRequestOperations = Struct({
  operations: pointer(pointer(CInjectionRequestOperation)),
  count: coerce('int')
})

const CInjectionRequestMessage = Struct({
  operations: pointer(CInjectionRequestOperations),
  lexicon: pointer(CMapStringToStringArray),
  cross_language: coerce('char *'),
  id: coerce('char *')
})

const CInjectionStatusMessage = Struct({
  last_injection_date: coerce('char *')
})

// Feedback

const CSiteMessage = Struct({
  site_id: coerce('char *'),
  session_id: coerce('char *')
})

// Audio server

const CPlayBytesMessage = Struct({
  id: coerce('char *'),
  wav_bytes: coerce('uint8 *'),
  wav_bytes_len:  coerce('int'),
  site_id: coerce('char *')
})

const CPlayFinishedMessage = Struct({
  id: coerce('char *'),
  site_id: coerce('char *')
})

const messages = {
  CSessionStartedMessage,
  CSessionQueuedMessage,
  CSessionEndedMessage,
  CStartSessionMessage,
  CEndSessionMessage,
  CContinueSessionMessage,
  CIntentMessage,
  CIntentNotRecognizedMessage,
  CSayMessage,
  CSiteMessage,
  CInjectionRequestMessage,
  CInjectionRequestOperations,
  CInjectionRequestOperation,
  CMapStringToStringArray,
  CMapStringToStringArrayEntry,
  CInjectionStatusMessage,
  CPlayBytesMessage,
  CPlayFinishedMessage
}

/* Exports */

module.exports = {
  CProtocolHandler,
  ...messages,
  ...misc
}
