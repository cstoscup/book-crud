// tracing.js
'use strict';

import { NodeSDK, logs } from '@opentelemetry/sdk-node';
import { BunyanInstrumentation } from '@opentelemetry/instrumentation-bunyan';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPLogExporter } from '@opentelemetry/exporter-logs-otlp-http';

export const sdk = new NodeSDK({
  traceExporter: new OTLPTraceExporter(),
  logRecordProcessors: [
    new logs.SimpleLogRecordProcessor(new OTLPLogExporter()),
  ],
  instrumentations: [
    getNodeAutoInstrumentations({
      // we recommend disabling fs autoinstrumentation since it can be noisy
      // and expensive during startup
      '@opentelemetry/instrumentation-fs': {
        enabled: false,
      },
    }),
    new BunyanInstrumentation(),
  ],
});
