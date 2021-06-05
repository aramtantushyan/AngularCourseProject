import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit, OnDestroy {
    collapsed = true;
    private userSub!: Subscription;
    isAuthenticated = false;
    @Output() tabSelected: EventEmitter<string> = new EventEmitter<string>();
    constructor(
        private dataStorageService: DataStorageService,
        private authService: AuthService
    ) {}



    ngOnInit() {
        this.userSub = this.authService.user.subscribe(user => {
            this.isAuthenticated = !user ? false : true;
        });
    }

    onTabSelect(tabName: string): void {
        this.tabSelected.emit(tabName);
    }

    onSaveData() {
        this.dataStorageService.storeRecipes();
    }

    onFetchData() {
        this.dataStorageService.fetchRecipes().subscribe();
    }

    onLogout() {
        this.authService.logout();
    }

    ngOnDestroy() {
        this.userSub.unsubscribe();
    }
}