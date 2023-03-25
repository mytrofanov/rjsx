import {fromEvent, map, pairwise, switchMap} from 'rxjs'

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
            return {
                x: clientX,
                y: clientY,
            }
        }),
        pairwise<Position>()
    )

    mouseDown$.pipe(
        switchMap(()=> points$)
    ).subscribe(drawLine)
}
