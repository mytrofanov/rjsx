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

    }
}
