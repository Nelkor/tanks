import {
  WORLD_SIDE,
  WORLD_HEIGHT,
  AVATAR_HEIGHT,
  AVATAR_WIDTH,
  AVATAR_GUN_LENGTH,
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
} from '../constants'

import { avatarState } from './avatar'

const DRIFT_ANGLE = .07

const canvas = document.querySelector('#main-canvas')
const ctx = canvas.getContext('2d')

canvas.width = WORLD_SIDE * 2
canvas.height = WORLD_HEIGHT

const drawAvatar = ({ position, direction }) => {
  const x = position + WORLD_SIDE

  ctx.save()
  ctx.translate(x, WORLD_HEIGHT - AVATAR_HEIGHT / 2)
  ctx.save()

  if (direction == DIRECTION_RIGHT) ctx.rotate(DRIFT_ANGLE)
  if (direction == DIRECTION_LEFT) ctx.rotate(-DRIFT_ANGLE)

  ctx.fillStyle = '#e77'

  ctx.fillRect(
    -AVATAR_WIDTH / 2,
    -AVATAR_HEIGHT / 2,
    AVATAR_WIDTH,
    AVATAR_HEIGHT,
  )

  ctx.restore()

  ctx.fillStyle = '#a66'

  ctx.beginPath()
  ctx.arc(0, 0, 15, 0, Math.PI * 2)
  ctx.closePath()
  ctx.fill()

  ctx.fillRect(-3, -AVATAR_GUN_LENGTH, 6, AVATAR_GUN_LENGTH)

  ctx.restore()
}

const draw = () => {
  requestAnimationFrame(draw)

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  drawAvatar(avatarState())
}

draw()
