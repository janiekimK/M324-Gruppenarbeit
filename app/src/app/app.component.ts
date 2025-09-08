import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WhiteboardComponent } from './whiteboard/whiteboard.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, WhiteboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Simple Drawing Board';
}
