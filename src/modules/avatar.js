import { ticker$ } from './game'
import { attacks$, directionChanges$ } from './keyboard'

import {
  WORLD_SIDE,
  AVATAR_SPEED_MS,
  AVATAR_WIDTH,
  DIRECTION_NONE,
  DIRECTION_RIGHT,
  DIRECTION_LEFT,
} from '../constants'

const LEFT_BORDER = -WORLD_SIDE + AVATAR_WIDTH / 2
const RIGHT_BORDER = WORLD_SIDE - AVATAR_WIDTH / 2

const state = {
  position: 0,
  direction: DIRECTION_NONE,
  isRightPressed: false,
  isLeftPressed: false,
}

export const avatarState = () => state

const setPress = (direction, status) => {
  if (direction == DIRECTION_LEFT) state.isLeftPressed = status
  if (direction == DIRECTION_RIGHT) state.isRightPressed = status
}

const onDirectionChange = ({ direction, status }) => {
  setPress(direction, status)

  if (state.isLeftPressed && state.isRightPressed) {
    return
  }

  if (state.isLeftPressed) {
    state.direction = DIRECTION_LEFT
  } else if (state.isRightPressed) {
    state.direction = DIRECTION_RIGHT
  } else {
    state.direction = DIRECTION_NONE
  }
}

const onTick = fromPrevTick => {
  if (state.direction == DIRECTION_NONE) {
    return
  }

  const directionMultiptier = {
    [DIRECTION_RIGHT]: 1,
    [DIRECTION_LEFT]: -1,
  }[state.direction]

  state.position += fromPrevTick * AVATAR_SPEED_MS * directionMultiptier

  if (state.position < LEFT_BORDER) {
    state.position = LEFT_BORDER
  }

  if (state.position > RIGHT_BORDER) {
    state.position = RIGHT_BORDER
  }
}

ticker$.subscribe(onTick)
directionChanges$.subscribe(onDirectionChange)

attacks$.subscribe(() => console.log('Attack!'))
