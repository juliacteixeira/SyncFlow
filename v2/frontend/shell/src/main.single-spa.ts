declare var System: any;

import { NgZone } from '@angular/core';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NavigationStart, Router } from '@angular/router';

import { getSingleSpaExtraProviders, singleSpaAngular } from 'single-spa-angular';


import { registerApplication, start } from 'single-spa';
import { AppModule } from './app/app.module';
import { singleSpaPropsSubject } from './single-spa/single-spa-props';


const lifecycles = singleSpaAngular({
  bootstrapFunction: singleSpaProps => {
    singleSpaPropsSubject.next(singleSpaProps);
    return platformBrowserDynamic(getSingleSpaExtraProviders()).bootstrapModule(AppModule);
  },
  template: '<app-root />',
  Router,
  NavigationStart,
  NgZone,
});

registerApplication({
  name: 'authentication',
  app: () => {
    return System.import('authentication')
      .then((module: any) => {
        console.log('Module loaded successfully:', module);
        return module;
      })
      .catch((err: any) => {
        console.error('Error loading module:', err);
        throw err;
      });
  },
  activeWhen: '/login'
});


export const bootstrap = lifecycles.bootstrap;
export const mount = lifecycles.mount;
export const unmount = lifecycles.unmount;

start();
