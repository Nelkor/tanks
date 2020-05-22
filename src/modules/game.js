import { interval } from 'rxjs'
import { scan, map } from 'rxjs/operators'

export const ticker$ = interval(4)
  .pipe(
    scan((acc, _) => ({
      prev: acc.cur,
      cur: Date.now(),
    }), { cur: Date.now() }),
    map(tick => tick.cur - tick.prev),
  )
