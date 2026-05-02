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

from unittest import mock

import pytest
import requests

from superset.charts.data.query_context_sidecar import (
    fetch_query_context_from_sidecar,
    QueryContextSidecarError,
)


@mock.patch("superset.charts.data.query_context_sidecar.requests.post")
def test_fetch_query_context_from_sidecar_success(mock_post: mock.MagicMock) -> None:
    mock_post.return_value.status_code = 200
    mock_post.return_value.json.return_value = {"query_context": {"foo": "bar"}}

    payload = fetch_query_context_from_sidecar(
        sidecar_url="http://sidecar.internal",
        form_data={"viz_type": "pie"},
        timeout=15,
    )

    assert payload == {"foo": "bar"}
    mock_post.assert_called_once_with(
        "http://sidecar.internal/api/v1/build-query-context",
        json={"form_data": {"viz_type": "pie"}},
        timeout=15,
    )


@mock.patch("superset.charts.data.query_context_sidecar.requests.post")
def test_fetch_query_context_from_sidecar_connection_error(
    mock_post: mock.MagicMock,
) -> None:
    mock_post.side_effect = requests.RequestException()

    with pytest.raises(QueryContextSidecarError, match="sidecar unavailable"):
        fetch_query_context_from_sidecar(
            sidecar_url="http://sidecar.internal",
            form_data={"viz_type": "pie"},
            timeout=15,
        )


@mock.patch("superset.charts.data.query_context_sidecar.requests.post")
def test_fetch_query_context_from_sidecar_bad_status(mock_post: mock.MagicMock) -> None:
    mock_post.return_value.status_code = 500

    with pytest.raises(QueryContextSidecarError, match="sidecar error"):
        fetch_query_context_from_sidecar(
            sidecar_url="http://sidecar.internal",
            form_data={"viz_type": "pie"},
            timeout=15,
        )


@mock.patch("superset.charts.data.query_context_sidecar.requests.post")
def test_fetch_query_context_from_sidecar_invalid_payload(
    mock_post: mock.MagicMock,
) -> None:
    mock_post.return_value.status_code = 200
    mock_post.return_value.json.return_value = {"not_query_context": {}}

    with pytest.raises(QueryContextSidecarError, match="invalid response"):
        fetch_query_context_from_sidecar(
            sidecar_url="http://sidecar.internal",
            form_data={"viz_type": "pie"},
            timeout=15,
        )
