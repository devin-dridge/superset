/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import http from 'http';
import { URL } from 'url';

import buildQueryContext from './stubs/buildQueryContext';
import { getBuildQuery, listVizTypes } from './runtimeRegistry';

const PORT = parseInt(process.env.PORT || '3030', 10);
const MAX_BODY_BYTES = parseInt(
  process.env.QUERY_CONTEXT_MAX_BODY_BYTES || `${10 * 1024 * 1024}`,
  10,
);
const ALLOWED_ORIGINS = new Set(
  (process.env.QUERY_CONTEXT_ALLOWED_ORIGINS || '')
    .split(',')
    .map(origin => origin.trim())
    .filter(Boolean),
);

class HttpRequestError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

function readBody(req: http.IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    let totalBytes = 0;

    req.on('data', (chunk: Buffer) => {
      totalBytes += chunk.length;
      if (totalBytes > MAX_BODY_BYTES) {
        req.destroy();
        reject(new HttpRequestError(413, 'Request body too large'));
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => resolve(Buffer.concat(chunks).toString()));
    req.on('error', reject);
  });
}

function isAllowedOrigin(origin?: string): boolean {
  if (!origin) {
    return true;
  }
  if (ALLOWED_ORIGINS.size === 0) {
    return true;
  }
  return ALLOWED_ORIGINS.has(origin);
}

function jsonResponse(res: http.ServerResponse, status: number, data: unknown): void {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

async function handleBuildQueryContext(
  req: http.IncomingMessage,
  res: http.ServerResponse,
): Promise<void> {
  if (!isAllowedOrigin(req.headers.origin)) {
    jsonResponse(res, 403, { error: 'Origin not allowed' });
    return;
  }

  let body: string;
  try {
    body = await readBody(req);
  } catch (err: any) {
    if (err instanceof HttpRequestError) {
      jsonResponse(res, err.statusCode, { error: err.message });
      return;
    }
    throw err;
  }

  let parsed: any;
  try {
    parsed = JSON.parse(body);
  } catch {
    jsonResponse(res, 400, { error: 'Invalid JSON body' });
    return;
  }

  const formData = parsed.form_data;
  if (!formData || !formData.viz_type) {
    jsonResponse(res, 400, {
      error: 'Missing form_data or form_data.viz_type',
    });
    return;
  }

  try {
    const buildQuery = getBuildQuery(formData.viz_type);
    const queryContext = buildQuery
      ? buildQuery(formData)
      : buildQueryContext(formData);

    jsonResponse(res, 200, { query_context: queryContext });
  } catch (err: any) {
    console.error('Error building query context for %s:', formData.viz_type, err);
    jsonResponse(res, 500, {
      error: `Failed to build query context: ${err.message}`,
    });
  }
}

function handleVizTypes(res: http.ServerResponse): void {
  const vizTypes = listVizTypes();
  jsonResponse(res, 200, { viz_types: vizTypes, count: vizTypes.length });
}

function handleHealth(res: http.ServerResponse): void {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('OK');
}

export function startServer(): void {
  const server = http.createServer(async (req, res) => {
    const url = req.url ? new URL(req.url, `http://localhost:${PORT}`).pathname : '';
    const method = req.method || '';

    try {
      if (url === '/health' && (method === 'GET' || method === 'HEAD')) {
        handleHealth(res);
      } else if (url === '/api/v1/viz-types' && method === 'GET') {
        handleVizTypes(res);
      } else if (url === '/api/v1/build-query-context' && method === 'POST') {
        await handleBuildQueryContext(req, res);
      } else {
        jsonResponse(res, 404, { error: 'Not found' });
      }
    } catch (err) {
      console.error('Unhandled error:', err);
      jsonResponse(res, 500, { error: 'Internal server error' });
    }
  });

  server.listen(PORT, () => {
    console.log(`Query context sidecar listening on port ${PORT}`);
  });
}
