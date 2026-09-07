import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {environment} from '../environments/environment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PageModule} from './page/page.module';
import {BioDareEndPoints, bioDareRestConfigurator} from './backend/biodare-rest.dom';
import { provideHttpClient, withInterceptorsFromDi, withXhr } from '@angular/common/http';
import {FeedbackModule} from './feedback/feedback.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import {StaticContentModule} from './documents/static-content/static-content.module';
import {SharedDialogsModule} from './shared/shared-dialogs/shared-dialogs.module';
import { UsageModule } from './usage/usage.module';
import { FeaturedDatasetModule } from './page/featured-dataset/featured-dataset.module';

const endPoints: BioDareEndPoints = bioDareRestConfigurator(environment);


@NgModule({ declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        BrowserAnimationsModule,
        MatSidenavModule,
        SharedDialogsModule,
        StaticContentModule,
        PageModule,
        FeedbackModule,
        UsageModule,
        FeaturedDatasetModule,
        AppRoutingModule], providers: [
        { provide: BioDareEndPoints, useValue: endPoints },
        provideHttpClient(withXhr(), withInterceptorsFromDi())
    ] })
export class AppModule { }
