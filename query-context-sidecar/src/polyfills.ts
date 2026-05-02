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

const g = globalThis as any;

if (typeof g.window === 'undefined') {
  g.window = g;
}

g.window.featureFlags = {};

if (typeof g.document === 'undefined') {
  g.document = {
    getElementById: () => null,
    createElement: () => ({
      setAttribute: () => {},
      style: {},
      appendChild: () => {},
    }),
    createTextNode: () => ({}),
    head: { appendChild: () => {} },
    body: { appendChild: () => {} },
    addEventListener: () => {},
    removeEventListener: () => {},
    querySelectorAll: () => [],
    querySelector: () => null,
  };
}

if (typeof g.navigator === 'undefined') {
  g.navigator = {
    userAgent: 'node.js',
    language: 'en',
  };
}

if (typeof g.HTMLElement === 'undefined') {
  g.HTMLElement = class HTMLElement {};
}

if (typeof g.location === 'undefined') {
  g.location = {
    href: '',
    origin: '',
    protocol: 'http:',
    host: 'localhost',
    hostname: 'localhost',
    port: '',
    pathname: '/',
    search: '',
    hash: '',
  };
}

if (typeof g.getComputedStyle === 'undefined') {
  g.getComputedStyle = () => ({});
}

if (typeof g.requestAnimationFrame === 'undefined') {
  g.requestAnimationFrame = (cb: () => void) => setTimeout(cb, 0);
}

if (typeof g.matchMedia === 'undefined') {
  g.matchMedia = () => ({
    matches: false,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
  });
}
