import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-whiteboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="whiteboard-container">
      <h2>Simple Whiteboard</h2>
      <canvas
        #canvas
        width="800"
        height="600"
        (mousedown)="startDrawing($event)"
        (mousemove)="draw($event)"
        (mouseup)="stopDrawing()"
        (mouseleave)="stopDrawing()">
      </canvas>
      <button (click)="clearCanvas()">Clear</button>
    </div>
  `,
  styles: [`
    .whiteboard-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 2rem;
      font-family: Arial, sans-serif;
    }

    h2 {
      margin-bottom: 1rem;
      color: #333;
    }

    canvas {
      border: 2px solid #333;
      cursor: crosshair;
      background-color: white;
      margin-bottom: 1rem;
    }

    button {
      padding: 0.5rem 1rem;
      background-color: #ff4757;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
    }

    button:hover {
      background-color: #ff3742;
    }
  `]
})
export class WhiteboardComponent implements AfterViewInit {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private isDrawing = false;
  private lastX = 0;
  private lastY = 0;

  ngAfterViewInit(): void {
    this.canvas = this.canvasRef.nativeElement;
    const context = this.canvas.getContext('2d');

    if (context) {
      this.ctx = context;
      this.setupCanvas();
    }
  }

  private setupCanvas(): void {
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
    this.ctx.strokeStyle = '#000000';
    this.ctx.lineWidth = 2;
  }

  startDrawing(event: MouseEvent): void {
    this.isDrawing = true;
    [this.lastX, this.lastY] = this.getMousePosition(event);
  }

  draw(event: MouseEvent): void {
    if (!this.isDrawing) return;

    const [currentX, currentY] = this.getMousePosition(event);

    this.ctx.beginPath();
    this.ctx.moveTo(this.lastX, this.lastY);
    this.ctx.lineTo(currentX, currentY);
    this.ctx.stroke();

    [this.lastX, this.lastY] = [currentX, currentY];
  }

  stopDrawing(): void {
    this.isDrawing = false;
  }

  clearCanvas(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private getMousePosition(event: MouseEvent): [number, number] {
    const rect = this.canvas.getBoundingClientRect();
    return [
      event.clientX - rect.left,
      event.clientY - rect.top
    ];
  }

  // Methods for testing
  getCanvasContext(): CanvasRenderingContext2D | null {
    return this.ctx || null;
  }

  getDrawingState(): boolean {
    return this.isDrawing;
  }
}
