/*
 * Copyright (c) 2018 Bonnie Schulkin. All Rights Reserved.
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
 * Tests for the UserProfile component
 * @module
 * UserProfile-spec
 */

import React from 'react'
import '../../jest/setupTests'
import { shallow } from 'enzyme'
import { findWrapperNodeByTestId } from '../../jest/clientTestUtils'
import { UserProfile } from './UserProfile'
import { userData } from '../../../shared/test/utilities/test_data/add_user'

// More tests to come as this component gets built out...

describe('UserProfile', () => {
  test('displays user charts', () => {
    const wrapper = shallow(<UserProfile auth={{ authenticated: true }} />)
    const userCharts = findWrapperNodeByTestId(wrapper, 'user-charts-section')
    expect(userCharts.length).toBe(1)
  })
})