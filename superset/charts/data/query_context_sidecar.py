# Licensed to the Apache Software Foundation (ASF) under one
# or more contributor license agreements.  See the NOTICE file
# distributed with this work for additional information
# regarding copyright ownership.  The ASF licenses this file
# to you under the Apache License, Version 2.0 (the
# "License"); you may not use this file except in compliance
# with the License.  You may obtain a copy of the License at
#
#   http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing,
# software distributed under the License is distributed on an
# "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
# KIND, either express or implied.  See the License for the
# specific language governing permissions and limitations
# under the License.
from __future__ import annotations

from typing import Any

import requests


class QueryContextSidecarError(Exception):
    """Raised when query context cannot be generated via sidecar."""


def fetch_query_context_from_sidecar(
    *,
    sidecar_url: str,
    form_data: dict[str, Any],
    timeout: int,
) -> dict[str, Any]:
    endpoint = f"{sidecar_url.rstrip('/')}/api/v1/build-query-context"

    try:
        response = requests.post(
            endpoint,
            json={"form_data": form_data},
            timeout=timeout,
        )
    except requests.RequestException as ex:
        raise QueryContextSidecarError("Query context sidecar unavailable") from ex

    if response.status_code != 200:
        raise QueryContextSidecarError("Query context sidecar error")

    try:
        payload = response.json()
    except ValueError as ex:
        raise QueryContextSidecarError(
            "Query context sidecar returned invalid response"
        ) from ex

    query_context = payload.get("query_context")
    if not isinstance(query_context, dict):
        raise QueryContextSidecarError(
            "Query context sidecar returned invalid response"
        )

    return query_context
