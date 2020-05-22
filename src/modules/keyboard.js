import { fromEvent, merge } from 'rxjs'
import { map, pluck, filter } from 'rxjs/operators'

import {
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
  CODES_LEFT,
  CODES_RIGHT,
  CODES_ATTACK,
} from '../constants'

const isDirectionCode = code => [
  ...CODES_RIGHT,
  ...CODES_LEFT,
].includes(code)

const isAttackCode = code => CODES_ATTACK.includes(code)

const codeToDirection = code => {
  if (CODES_LEFT.includes(code)) return DIRECTION_LEFT
  if (CODES_RIGHT.includes(code)) return DIRECTION_RIGHT
}

const keyDown$ = fromEvent(document, 'keydown')
  .pipe(
    pluck('code'),
  )

const directionKeyDown$ = keyDown$
  .pipe(
    filter(isDirectionCode),
    map(codeToDirection),
    map(direction => ({ direction, status: true })),
  )

const directionKeyUp$ = fromEvent(document, 'keyup')
  .pipe(
    pluck('code'),
    filter(isDirectionCode),
    map(codeToDirection),
    map(direction => ({ direction, status: false })),
  )

export const directionChanges$ = merge(
  directionKeyDown$,
  directionKeyUp$,
)

export const attacks$ = keyDown$
  .pipe(
    filter(isAttackCode),
  )
