import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { SendsmsPage } from '../Sendsms/Sendsms';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = SendsmsPage;

  constructor() {

  }
}
