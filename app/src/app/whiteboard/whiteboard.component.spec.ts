import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WhiteboardComponent } from './whiteboard.component';

describe('WhiteboardComponent', () => {
  let component: WhiteboardComponent;
  let fixture: ComponentFixture<WhiteboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhiteboardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(WhiteboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a canvas element', () => {
    const canvas = fixture.nativeElement.querySelector('canvas');
    expect(canvas).toBeTruthy();
    expect(canvas.width).toBe(800);
    expect(canvas.height).toBe(600);
  });

  it('should have a clear button', () => {
    const button = fixture.nativeElement.querySelector('button');
    expect(button).toBeTruthy();
    expect(button.textContent).toContain('Clear');
  });

  it('should start drawing when mouse is pressed', () => {
    const mouseEvent = new MouseEvent('mousedown', {
      clientX: 100,
      clientY: 100
    });

    component.startDrawing(mouseEvent);

    expect(component.getDrawingState()).toBe(true);
  });

  it('should stop drawing when mouse is released', () => {
    // First start drawing
    const mouseEvent = new MouseEvent('mousedown', {
      clientX: 100,
      clientY: 100
    });
    component.startDrawing(mouseEvent);

    // Then stop drawing
    component.stopDrawing();

    expect(component.getDrawingState()).toBe(false);
  });

  it('should clear canvas when clear button is clicked', () => {
    const canvas = fixture.nativeElement.querySelector('canvas');
    const ctx = canvas.getContext('2d');

    // Mock clearRect to verify it's called
    spyOn(ctx, 'clearRect');

    component.clearCanvas();

    expect(ctx.clearRect).toHaveBeenCalledWith(0, 0, 800, 600);
  });

  it('should return canvas context', () => {
    const context = component.getCanvasContext();
    expect(context).toBeTruthy();
    expect(context).toBeInstanceOf(CanvasRenderingContext2D);
  });
});
