/*
 * Copyright (c) 2017 Bonnie Schulkin. All Rights Reserved.
 *
 * This file is part of BoxCharter.
 *
 * BoxCharter is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, either version 3 of the License, or (at your option)
 * any later version.
 *
 * BoxCharter is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License
 * for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with BoxCharter. If not, see <http://www.gnu.org/licenses/>.
 *
 */

/**
 * Component for displaying a row in a user's charts table
 * @module
 * ChartRow
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedDate } from '../utils';

const ChartRow = (props) => {
  const { chart } = props;
  return (
    <tr className="chart-row">
      <td data-test="chart-title">{chart.title}</td>
      <td><FormattedDate date={chart.modifiedAt} /></td>
    </tr>
  );
};

ChartRow.propTypes = {
  chart: PropTypes.shape({
    title: PropTypes.string.isRequired,
    modifiedAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default ChartRow;
