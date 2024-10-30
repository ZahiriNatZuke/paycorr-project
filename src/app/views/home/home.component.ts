import { Component, Signal, inject } from '@angular/core';
import { Doc } from '@app/core/interfaces';
import { SafeImagePipe } from '@app/core/pipes';
import { AppStore } from 'src/app/store';

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [SafeImagePipe],
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss',
})
export class HomeComponent {
	docs: Signal<Doc[]> = inject(AppStore).entities;
}
