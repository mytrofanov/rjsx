import {fromEvent, map, pairwise, switchMap, takeUntil} from 'rxjs'

export function Rxjs(selector: string) {

    const canvas = document.getElementById(selector) as HTMLCanvasElement;
    let cx = canvas.getContext('2d');

    if(!cx) {
        console.log('No context');
        return;
    }

    cx.lineWidth = 4;

    interface Position {
        x: number;
        y: number;
    }

    function drawLine([prev, next]: Position[]) {
        if (!cx) return;
        //start drawing
        cx.beginPath();
        cx.moveTo(prev.x, prev.y); //start line from
        cx.lineTo(next.x, next.y)  //end of line
        cx.stroke();
    }

    const mouseMove$ = fromEvent<MouseEvent>(canvas, 'mousemove');
    const mouseDown$ = fromEvent<MouseEvent>(canvas, 'mousedown');
    const mouseUp$ = fromEvent<MouseEvent>(canvas, 'mouseup');
    const mouseOut$ = fromEvent<MouseEvent>(canvas, 'mouseout');

    const points$ = mouseMove$.pipe(
        map<MouseEvent, Position>(({clientX, clientY}) => {
            const {top, left} = canvas.getBoundingClientRect()
            return {
                x: clientX - left,
                y: clientY - top,
            }
        }),
        pairwise<Position>() //return pair in array
    )

    mouseDown$.pipe(
        switchMap(()=> points$.pipe(   //switchMap for switching to another observer
            takeUntil(mouseOut$),
            takeUntil(mouseUp$)
        ))
    ).subscribe(drawLine)
}
