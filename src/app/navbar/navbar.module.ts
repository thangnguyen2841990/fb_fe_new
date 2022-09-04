import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarRoutingModule } from './navbar-routing.module';
import { NavbarComponent } from './navbar.component';
import {NgbAlertModule, NgbDropdownModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {ReactiveFormsModule} from '@angular/forms';
import { SearchByNameComponent } from './search-by-name/search-by-name.component';


@NgModule({
    declarations: [NavbarComponent, SearchByNameComponent],
    exports: [
        NavbarComponent
    ],
    imports: [
        CommonModule,
        NavbarRoutingModule,
        NgbPaginationModule,
        NgbAlertModule,
        NgbDropdownModule,
        ReactiveFormsModule,
    ]
})
export class NavbarModule { }
