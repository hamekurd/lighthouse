/**
 * @license Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */
'use strict';

const MetricArtifact = require('./metric');

class SpeedIndex extends MetricArtifact {
  get name() {
    return 'SpeedIndex';
  }

  /**
   * @param {LH.Artifacts.MetricComputationData} data
   * @param {LH.ComputedArtifacts} artifacts
   * @return {Promise<LH.Artifacts.Metric>}
   */
  async computeObservedMetric(data, artifacts) {
    const speedline = await artifacts.requestSpeedline(data.trace);
    const timing = Math.round(speedline.speedIndex);
    const timestamp = (timing + speedline.beginning) * 1000;
    return Promise.resolve({timing, timestamp});
  }
}

module.exports = SpeedIndex;
