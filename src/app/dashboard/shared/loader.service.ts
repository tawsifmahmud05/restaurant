import { Injectable } from '@angular/core';
import { Overlay } from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";
import { LoaderComponent } from './loader/loader.component';
import { Observable, tap } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class LoaderService {

    overlayRef = this.overlay.create({
        positionStrategy: this.overlay.position()
            .global()
            .centerHorizontally()
            .centerVertically(),
        hasBackdrop: true
    })

    constructor(private overlay: Overlay) {
    }

    showLoader() {
        this.overlayRef.attach(new ComponentPortal(LoaderComponent))
    }

    hideLoader() {
        this.overlayRef.detach()
    }

    attachLoader<T>(): (source: Observable<T>) => Observable<T> {
        return tap<T>({
            subscribe: () => this.showLoader(),
            next: () => this.hideLoader()
        }
        );
    }
}