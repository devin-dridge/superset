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

from typing import Any

from pytest_mock import MockerFixture


def test_query_form_data_rejects_non_integer_slice_id(
    mocker: MockerFixture, client: Any, full_api_access: None
) -> None:
    """
    Non-integer ``slice_id`` query parameters must be ignored before the
    value reaches the database layer. The endpoint should respond with an
    empty payload rather than forwarding the unparsable value to the ORM.
    """
    query_mock = mocker.patch("superset.views.api.db.session.query")

    response = client.get("/api/v1/form_data/?slice_id=not-an-int")

    assert response.status_code == 200
    assert response.json == {}
    query_mock.assert_not_called()


def test_query_form_data_missing_slice_id(
    mocker: MockerFixture, client: Any, full_api_access: None
) -> None:
    """
    A missing ``slice_id`` query parameter is a no-op and must not trigger
    a database lookup.
    """
    query_mock = mocker.patch("superset.views.api.db.session.query")

    response = client.get("/api/v1/form_data/")

    assert response.status_code == 200
    assert response.json == {}
    query_mock.assert_not_called()
