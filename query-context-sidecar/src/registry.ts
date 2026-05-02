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

import bigNumberBuildQuery from '@superset-ui/plugin-chart-echarts/BigNumber/BigNumberWithTrendline/buildQuery';
import bigNumberPoPBuildQuery from '@superset-ui/plugin-chart-echarts/BigNumber/BigNumberPeriodOverPeriod/buildQuery';
import bigNumberTotalBuildQuery from '@superset-ui/plugin-chart-echarts/BigNumber/BigNumberTotal/buildQuery';
import boxPlotBuildQuery from '@superset-ui/plugin-chart-echarts/BoxPlot/buildQuery';
import bubbleBuildQuery from '@superset-ui/plugin-chart-echarts/Bubble/buildQuery';
import funnelBuildQuery from '@superset-ui/plugin-chart-echarts/Funnel/buildQuery';
import ganttBuildQuery from '@superset-ui/plugin-chart-echarts/Gantt/buildQuery';
import gaugeBuildQuery from '@superset-ui/plugin-chart-echarts/Gauge/buildQuery';
import graphBuildQuery from '@superset-ui/plugin-chart-echarts/Graph/buildQuery';
import heatmapBuildQuery from '@superset-ui/plugin-chart-echarts/Heatmap/buildQuery';
import histogramBuildQuery from '@superset-ui/plugin-chart-echarts/Histogram/buildQuery';
import mixedTimeseriesBuildQuery from '@superset-ui/plugin-chart-echarts/MixedTimeseries/buildQuery';
import pieBuildQuery from '@superset-ui/plugin-chart-echarts/Pie/buildQuery';
import radarBuildQuery from '@superset-ui/plugin-chart-echarts/Radar/buildQuery';
import sankeyBuildQuery from '@superset-ui/plugin-chart-echarts/Sankey/buildQuery';
import sunburstBuildQuery from '@superset-ui/plugin-chart-echarts/Sunburst/buildQuery';
import timeseriesBuildQuery from '@superset-ui/plugin-chart-echarts/Timeseries/buildQuery';
import treeBuildQuery from '@superset-ui/plugin-chart-echarts/Tree/buildQuery';
import treemapBuildQuery from '@superset-ui/plugin-chart-echarts/Treemap/buildQuery';
import waterfallBuildQuery from '@superset-ui/plugin-chart-echarts/Waterfall/buildQuery';
import handlebarsBuildQuery from '@superset-ui/plugin-chart-handlebars/plugin/buildQuery';
import pivotTableBuildQuery from '@superset-ui/plugin-chart-pivot-table/plugin/buildQuery';
import wordCloudBuildQuery from '@superset-ui/plugin-chart-word-cloud/plugin/buildQuery';
import tableBuildQuery from '@superset-ui/plugin-chart-table/buildQuery';
import agGridTableBuildQuery from '@superset-ui/plugin-chart-ag-grid-table/buildQuery';
import pointClusterMapBuildQuery from '@superset-ui/plugin-chart-point-cluster-map/buildQuery';
import deckArcBuildQuery from '@superset-ui/preset-chart-deckgl/layers/Arc/buildQuery';
import deckContourBuildQuery from '@superset-ui/preset-chart-deckgl/layers/Contour/buildQuery';
import deckGridBuildQuery from '@superset-ui/preset-chart-deckgl/layers/Grid/buildQuery';
import deckHeatmapBuildQuery from '@superset-ui/preset-chart-deckgl/layers/Heatmap/buildQuery';
import deckHexBuildQuery from '@superset-ui/preset-chart-deckgl/layers/Hex/buildQuery';
import deckPathBuildQuery from '@superset-ui/preset-chart-deckgl/layers/Path/buildQuery';
import deckPolygonBuildQuery from '@superset-ui/preset-chart-deckgl/layers/Polygon/buildQuery';
import deckScatterBuildQuery from '@superset-ui/preset-chart-deckgl/layers/Scatter/buildQuery';
import deckScreengridBuildQuery from '@superset-ui/preset-chart-deckgl/layers/Screengrid/buildQuery';
import filterRangeBuildQuery from 'src/filters/components/Range/buildQuery';
import filterSelectBuildQuery from 'src/filters/components/Select/buildQuery';
import filterTimeColumnBuildQuery from 'src/filters/components/TimeColumn/buildQuery';
import filterTimeGrainBuildQuery from 'src/filters/components/TimeGrain/buildQuery';

import cartodiagramBuildQuery from './buildQuery/cartodiagram';
import { registerBuildQuery } from './runtimeRegistry';

export function registerAllBuildQueries(): void {
  registerBuildQuery('big_number', bigNumberBuildQuery as any);
  registerBuildQuery('big_number_total', bigNumberTotalBuildQuery as any);
  registerBuildQuery('pop_kpi', bigNumberPoPBuildQuery as any);
  registerBuildQuery('box_plot', boxPlotBuildQuery as any);
  registerBuildQuery('bubble_v2', bubbleBuildQuery as any);
  registerBuildQuery('funnel', funnelBuildQuery as any);
  registerBuildQuery('gantt_chart', ganttBuildQuery as any);
  registerBuildQuery('gauge_chart', gaugeBuildQuery as any);
  registerBuildQuery('graph_chart', graphBuildQuery as any);
  registerBuildQuery('heatmap_v2', heatmapBuildQuery as any);
  registerBuildQuery('histogram_v2', histogramBuildQuery as any);
  registerBuildQuery('mixed_timeseries', mixedTimeseriesBuildQuery as any);
  registerBuildQuery('pie', pieBuildQuery as any);
  registerBuildQuery('radar', radarBuildQuery as any);
  registerBuildQuery('sankey_v2', sankeyBuildQuery as any);
  registerBuildQuery('sunburst_v2', sunburstBuildQuery as any);
  registerBuildQuery('tree_chart', treeBuildQuery as any);
  registerBuildQuery('treemap_v2', treemapBuildQuery as any);
  registerBuildQuery('waterfall', waterfallBuildQuery as any);

  registerBuildQuery('echarts_timeseries', timeseriesBuildQuery as any);
  registerBuildQuery('echarts_area', timeseriesBuildQuery as any);
  registerBuildQuery('echarts_timeseries_bar', timeseriesBuildQuery as any);
  registerBuildQuery('echarts_timeseries_line', timeseriesBuildQuery as any);
  registerBuildQuery('echarts_timeseries_smooth', timeseriesBuildQuery as any);
  registerBuildQuery('echarts_timeseries_scatter', timeseriesBuildQuery as any);
  registerBuildQuery('echarts_timeseries_step', timeseriesBuildQuery as any);

  registerBuildQuery('pivot_table_v2', pivotTableBuildQuery as any);
  registerBuildQuery('table', tableBuildQuery as any);
  registerBuildQuery('ag-grid-table', agGridTableBuildQuery as any);
  registerBuildQuery('point_cluster', pointClusterMapBuildQuery as any);
  registerBuildQuery('handlebars', handlebarsBuildQuery as any);
  registerBuildQuery('word_cloud', wordCloudBuildQuery as any);
  registerBuildQuery('cartodiagram', cartodiagramBuildQuery as any);

  registerBuildQuery('deck_arc', deckArcBuildQuery as any);
  registerBuildQuery('deck_contour', deckContourBuildQuery as any);
  registerBuildQuery('deck_grid', deckGridBuildQuery as any);
  registerBuildQuery('deck_heatmap', deckHeatmapBuildQuery as any);
  registerBuildQuery('deck_hex', deckHexBuildQuery as any);
  registerBuildQuery('deck_path', deckPathBuildQuery as any);
  registerBuildQuery('deck_polygon', deckPolygonBuildQuery as any);
  registerBuildQuery('deck_scatter', deckScatterBuildQuery as any);
  registerBuildQuery('deck_screengrid', deckScreengridBuildQuery as any);

  registerBuildQuery('filter_select', filterSelectBuildQuery as any);
  registerBuildQuery('filter_range', filterRangeBuildQuery as any);
  registerBuildQuery('filter_timecolumn', filterTimeColumnBuildQuery as any);
  registerBuildQuery('filter_timegrain', filterTimeGrainBuildQuery as any);
}
